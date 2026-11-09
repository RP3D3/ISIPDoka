/* Собирает models/rubert-tiny2/meta.bin — gzip-бандл с JSON-файлами
 * токенизатора. Нужен, чтобы браузер не запрашивал tokenizer.json напрямую:
 * некоторые фильтры отдают на него 403, а на нейтральный .bin — нет. */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'models',
  'rubert-tiny2'
);
const files = ['config.json', 'tokenizer.json', 'tokenizer_config.json'];

const meta = {};
for (const name of files) {
  meta[name] = JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
}

const json = JSON.stringify(meta);
const out = path.join(root, 'meta.bin');
fs.writeFileSync(out, zlib.gzipSync(Buffer.from(json), { level: 9 }));

console.log(
  `[model] ${out}: ${json.length} байт JSON → ${fs.statSync(out).size} байт gzip`
);
