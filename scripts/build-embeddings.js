#!/usr/bin/env node
/**
 * Оффлайн-генератор векторных эмбеддингов для гибридного поиска.
 *
 * Считывает data/structure.json, прогоняет каждую тему через
 * feature-extraction-пайплайн Xenova/rubert-tiny2 (локальная модель,
 * fp32) и сохраняет нормализованные векторы в data/embeddings.json
 * в формате:
 *   [{ title, domain, group, url, embedding: [float ~312] }, ...]
 *
 * Запуск:  node scripts/build-embeddings.js
 * Модель:  models/rubert-tiny2/  (должна лежать локально)
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline, env } from '@xenova/transformers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const STRUCTURE_PATH = path.join(ROOT, 'data', 'structure.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'embeddings.json');
const MODEL_ID = 'rubert-tiny2';
const MODEL_ONNX_PATH = path.join(ROOT, 'models', MODEL_ID, 'onnx', 'model.onnx');
const MODEL_PART_NAMES = ['part_aa', 'part_ab'];

/**
 * GitHub не принимает файлы больше 100 МБ, поэтому веса в репозитории лежат
 * двумя частями. Для Node-сборки склеиваем их в локальный model.onnx
 * (он добавлен в .gitignore и в репозиторий не попадает).
 */
function ensureLocalModelFile() {
  if (existsSync(MODEL_ONNX_PATH)) {
    console.log('[build-embeddings] Локальный model.onnx уже собран.');
    return;
  }

  const partPaths = MODEL_PART_NAMES.map((name) => `${MODEL_ONNX_PATH}.${name}`);
  const missing = partPaths.filter((p) => !existsSync(p));
  if (missing.length) {
    throw new Error(
      'Не найдены части модели: ' +
        missing.map((p) => path.relative(ROOT, p)).join(', ') +
        '. Ожидаются model.onnx.part_aa и model.onnx.part_ab.'
    );
  }

  console.log('[build-embeddings] Склеиваю части модели в единый model.onnx...');
  const buffers = partPaths.map((p) => {
    const buf = readFileSync(p);
    console.log(
      `  - ${path.relative(ROOT, p)}: ${(buf.length / 1024 / 1024).toFixed(1)} МБ`
    );
    return buf;
  });

  const full = Buffer.concat(buffers);
  mkdirSync(path.dirname(MODEL_ONNX_PATH), { recursive: true });
  writeFileSync(MODEL_ONNX_PATH, full);
  console.log(
    `[build-embeddings] Готово: ${path.relative(ROOT, MODEL_ONNX_PATH)} ` +
      `(${(full.length / 1024 / 1024).toFixed(1)} МБ).`
  );
}

// Только локальная модель — никакой сети на этапе сборки не требуется.
env.allowLocalModels = true;
env.allowRemoteModels = false;
env.localModelPath = path.join(ROOT, 'models');
env.cacheDir = path.join(ROOT, '.cache'); // сюда HF-токенайзер мог бы кэшить; не используется

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function parseFrontmatter(md) {
  const frontmatterRe = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/;
  const match = md.match(frontmatterRe);
  if (!match) return { data: {}, body: md };
  const raw = match[1];
  const body = md.slice(match[0].length);
  const data = {};
  for (const line of raw.split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    data[key] = value;
  }
  return { data, body };
}

function extractArticleText(html) {
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  let body = article ? article[1] : html;
  body = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return decodeEntities(body).replace(/\s+/g, ' ').trim();
}

function extractMdBody(md) {
  const { body } = parseFrontmatter(md);
  return body.replace(/\s+/g, ' ').trim();
}

function collectTopics(structure) {
  const docs = [];
  for (const [domainId, domain] of Object.entries(structure)) {
    (domain.groups || []).forEach((group) => {
      (group.topics || []).forEach((topic) => {
        let pageText = '';
        try {
          const abs = path.join(ROOT, topic.url);
          const raw = readFileSync(abs, 'utf8');
          pageText = topic.type === 'md'
            ? extractMdBody(raw)
            : extractArticleText(raw);
        } catch (err) {
          console.warn(`[build-embeddings] Не удалось прочитать ${topic.url}: ${err.message}`);
        }

        docs.push({
          id: `${domainId}::${topic.url}`,
          domain: domain.title || domainId,
          group: group.name || '',
          title: topic.title || '',
          url: topic.url,
          keywords: topic.keywords || '',
          text: `${domain.title} ${group.name} ${topic.title} ${topic.keywords || ''} ${pageText}`.slice(
            0,
            6000
          )
        });
      });
    });
  }
  return docs;
}

async function main() {
  const structure = JSON.parse(readFileSync(STRUCTURE_PATH, 'utf8'));
  const docs = collectTopics(structure);

  if (docs.length === 0) {
    console.error('[build-embeddings] data/structure.json не содержит ни одной темы.');
    process.exit(1);
  }

  ensureLocalModelFile();

  console.log(`[build-embeddings] Загружаю модель ${MODEL_ID} (fp32, локально)...`);
  const t0 = Date.now();
  const extractor = await pipeline('feature-extraction', MODEL_ID, {
    quantized: false,
  });
  console.log(`[build-embeddings] Модель готова за ${((Date.now() - t0) / 1000).toFixed(1)} с.`);

  const vectors = [];
  const tEmbed = Date.now();
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const res = await extractor(doc.text, {
      pooling: 'mean',
      normalize: true,
    });
    const vec = Array.from(res.data, (v) => Number(v.toFixed(6)));
    vectors.push(vec);
  }
  const dt = (Date.now() - tEmbed) / 1000;
  console.log(`[build-embeddings] Векторизовано ${docs.length} документов за ${dt.toFixed(1)} с.`);

  const result = docs.map((doc, i) => ({
    title: doc.title,
    domain: doc.domain,
    group: doc.group,
    url: doc.url,
    embedding: vectors[i],
  }));

  writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 0));
  console.log(`[build-embeddings] Готово → data/embeddings.json (${vectors[0].length}-мерные векторы).`);
}

main().catch((err) => {
  console.error('[build-embeddings] Ошибка:', err);
  process.exit(1);
});
