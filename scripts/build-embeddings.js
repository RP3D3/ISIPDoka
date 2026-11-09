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
import { collectTopics } from './content-text.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const STRUCTURE_PATH = path.join(ROOT, 'data', 'structure.json');
const LOCAL_STRUCTURE_PATH = path.join(ROOT, 'data', 'structure.local.json');
const OUTPUT_PATH = path.join(ROOT, 'data', 'embeddings.json');
const LOCAL_OUTPUT_PATH = path.join(ROOT, 'data', 'embeddings.local.json');
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

async function main() {
  const publicStructure = JSON.parse(readFileSync(STRUCTURE_PATH, 'utf8'));
  let localStructure = {};
  if (existsSync(LOCAL_STRUCTURE_PATH)) {
    try {
      localStructure = JSON.parse(readFileSync(LOCAL_STRUCTURE_PATH, 'utf8'));
    } catch (err) {
      throw new Error(
        `Не удалось прочитать data/structure.local.json: ${err.message}`
      );
    }
  }

  const structure = { ...publicStructure, ...localStructure };
  const docs = collectTopics(structure, ROOT);

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
    localOnly: Boolean(structure[doc.domainId]?.localOnly),
  }));

  const publicVectors = result
    .filter((item) => !item.localOnly)
    .map(({ localOnly, ...rest }) => rest);
  const localVectors = result
    .filter((item) => item.localOnly)
    .map(({ localOnly, ...rest }) => rest);

  writeFileSync(OUTPUT_PATH, JSON.stringify(publicVectors, null, 0));
  console.log(
    `[build-embeddings] Готово → data/embeddings.json ` +
      `(${publicVectors.length} тем, ${vectors[0].length}-мерные векторы).`
  );

  if (localVectors.length) {
    writeFileSync(LOCAL_OUTPUT_PATH, JSON.stringify(localVectors, null, 0));
    console.log(
      `[build-embeddings] Локальные векторы → data/embeddings.local.json ` +
        `(${localVectors.length} тем).`
    );
  } else if (existsSync(LOCAL_OUTPUT_PATH)) {
    writeFileSync(LOCAL_OUTPUT_PATH, '[]');
  }
}

main().catch((err) => {
  console.error('[build-embeddings] Ошибка:', err);
  process.exit(1);
});
