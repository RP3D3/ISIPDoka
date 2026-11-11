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
 *
 * Сборка инкрементальная: текст каждой темы хешируется, а готовые векторы
 * складываются в .cache/embeddings-cache.json. При повторном запуске модель
 * прогоняет только те темы, чей текст (или заголовок, ключевые слова,
 * название области/группы) изменился. Это важно для админки: каждое
 * сохранение темы раньше заново векторизовало весь сайт.
 */

import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
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
 * Кэш готовых векторов. Лежит в .cache/ (не коммитится и не отдаётся
 * dev-сервером). Ключ — url темы, значение — хеш текста и сам вектор.
 * При смене модели или формата кэш автоматически сбрасывается.
 */
const CACHE_PATH = path.join(ROOT, '.cache', 'embeddings-cache.json');
const CACHE_VERSION = 1;

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

/* ========================================================================== *
 * Инкрементальный кэш векторов                                                *
 * ========================================================================== */

function textHash(text) {
  return createHash('sha1').update(text).digest('hex');
}

function loadCache() {
  try {
    const parsed = JSON.parse(readFileSync(CACHE_PATH, 'utf8'));
    if (
      parsed &&
      parsed.version === CACHE_VERSION &&
      parsed.model === MODEL_ID &&
      parsed.entries &&
      typeof parsed.entries === 'object'
    ) {
      return parsed.entries;
    }
  } catch (_) {
    /* кэша нет или он повреждён — просто пересоберём всё */
  }
  return {};
}

function saveCache(entries) {
  try {
    mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
    writeFileSync(
      CACHE_PATH,
      JSON.stringify({ version: CACHE_VERSION, model: MODEL_ID, entries })
    );
  } catch (err) {
    console.warn(
      `[build-embeddings] Не удалось сохранить кэш векторов: ${err.message}`
    );
  }
}

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

  const cached = loadCache();
  const entries = {};
  const hashes = new Array(docs.length);
  const vectors = new Array(docs.length);
  const pending = [];

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const hash = textHash(doc.text);
    hashes[i] = hash;
    const hit = cached[doc.url];
    if (hit && hit.h === hash && Array.isArray(hit.v) && hit.v.length) {
      vectors[i] = hit.v;
      entries[doc.url] = hit;
    } else {
      pending.push(i);
    }
  }

  if (pending.length === 0) {
    console.log(
      `[build-embeddings] Все ${docs.length} тем не изменились — векторы взяты из кэша.`
    );
  } else {
    ensureLocalModelFile();

    console.log(
      `[build-embeddings] Изменилось ${pending.length} из ${docs.length} тем. ` +
        `Загружаю модель ${MODEL_ID} (fp32, локально)...`
    );
    const t0 = Date.now();
    const extractor = await pipeline('feature-extraction', MODEL_ID, {
      quantized: false,
    });
    console.log(
      `[build-embeddings] Модель готова за ${((Date.now() - t0) / 1000).toFixed(1)} с.`
    );

    const tEmbed = Date.now();
    for (const i of pending) {
      const doc = docs[i];
      const res = await extractor(doc.text, {
        pooling: 'mean',
        normalize: true,
      });
      const vec = Array.from(res.data, (v) => Number(v.toFixed(6)));
      vectors[i] = vec;
      entries[doc.url] = { h: hashes[i], v: vec };
    }
    const dt = (Date.now() - tEmbed) / 1000;
    console.log(
      `[build-embeddings] Векторизовано ${pending.length} документов за ${dt.toFixed(1)} с ` +
        `(остальные ${docs.length - pending.length} — из кэша).`
    );
  }

  // Пишем кэш и в «холостом» прогоне: так из него вычищаются векторы
  // удалённых тем и он не растёт бесконечно.
  saveCache(entries);

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
