/**
 * Показывает состояние проекта:
 *   - когда последний раз синхронизировалась структура;
 *   - когда последний раз пересчитывались эмбеддинги;
 *   - когда последний раз менялся контент;
 *   - нужно ли запускать sync / build:embeddings.
 *
 * Запуск: node scripts/status.js
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STRUCTURE = path.join(ROOT, 'data', 'structure.json');
const EMBEDDINGS = path.join(ROOT, 'data', 'embeddings.json');
const CONTENT = path.join(ROOT, 'content');

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatDate(date) {
  if (!date) return 'нет';
  return (
    `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

function getMtime(file) {
  try {
    return statSync(file).mtime;
  } catch {
    return null;
  }
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
  } catch {
    return null;
  }
}

function newestContent(dir) {
  if (!existsSync(dir)) return null;
  let newest = null;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_')) continue;

    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = newestContent(abs);
      if (sub && (!newest || sub.mtime > newest.mtime)) newest = sub;
    } else if (entry.isFile() && /\.(html|json)$/i.test(entry.name)) {
      const mtime = getMtime(abs);
      if (mtime && (!newest || mtime > newest.mtime)) {
        newest = { file: path.relative(ROOT, abs).split(path.sep).join('/'), mtime };
      }
    }
  }

  return newest;
}

const structureMtime = getMtime(STRUCTURE);
const embeddingsMtime = getMtime(EMBEDDINGS);
const structure = readJson(STRUCTURE);
const embeddings = readJson(EMBEDDINGS);
const content = newestContent(CONTENT);
const dependenciesReady = existsSync(path.join(ROOT, 'node_modules'));
const modelReady = existsSync(path.join(ROOT, 'models', 'rubert-tiny2', 'onnx', 'model.onnx'));

let domains = 0;
let groups = 0;
let topics = 0;

if (structure && typeof structure === 'object') {
  domains = Object.keys(structure).length;
  for (const domain of Object.values(structure)) {
    const domainGroups = Array.isArray(domain.groups) ? domain.groups : [];
    groups += domainGroups.length;
    for (const group of domainGroups) {
      topics += Array.isArray(group.topics) ? group.topics.length : 0;
    }
  }
}

const embeddingCount = Array.isArray(embeddings) ? embeddings.length : 0;

let syncReason = '';
if (!structureMtime) syncReason = 'data/structure.json отсутствует';
else if (!structure) syncReason = 'data/structure.json не читается';
else if (content && content.mtime > structureMtime) syncReason = `контент новее: ${content.file}`;
const syncNeeded = Boolean(syncReason);

let embeddingsReason = '';
if (!embeddingsMtime) embeddingsReason = 'data/embeddings.json отсутствует';
else if (!embeddings) embeddingsReason = 'data/embeddings.json не читается';
else if (topics !== embeddingCount) embeddingsReason = `тем ${topics}, векторов ${embeddingCount}`;
else if (structureMtime && structureMtime > embeddingsMtime) embeddingsReason = 'structure.json новее embeddings.json';
else if (content && content.mtime > embeddingsMtime) embeddingsReason = `контент новее: ${content.file}`;
const embeddingsNeeded = Boolean(embeddingsReason);

console.log(`  Последняя синхронизация : ${formatDate(structureMtime)}  (${domains} обл. / ${groups} гр. / ${topics} тем)`);
console.log(`  Последний пересчёт       : ${formatDate(embeddingsMtime)}  (${embeddingCount} док.)`);
console.log(`  Контент изменён          : ${content ? `${formatDate(content.mtime)}  (${content.file})` : 'нет файлов'}`);
console.log(`  Синхронизация            : ${syncNeeded ? 'НУЖНА' : 'не нужна'}${syncReason ? ` — ${syncReason}` : ''}`);
console.log(`  Векторизация             : ${embeddingsNeeded ? 'НУЖНА' : 'не нужна'}${embeddingsReason ? ` — ${embeddingsReason}` : ''}`);
console.log(`  Зависимости              : ${dependenciesReady ? 'установлены' : 'НЕ установлены — запустите пункт 10'}`);
console.log(`  Модель rubert-tiny2      : ${modelReady ? 'на месте' : 'НЕ найдена — векторизация не соберётся'}`);

const recommended = syncNeeded || embeddingsNeeded ? 3 : 1;
console.log(
  `  Рекомендация             : ${recommended} — ${
    recommended === 3 ? 'запустить с обновлением и векторизацией' : 'можно запускать как есть'
  }`
);
