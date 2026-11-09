// Быстрый санити-тест семантического слоя (Node).
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline, env } from '@xenova/transformers';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
env.allowLocalModels = true;
env.allowRemoteModels = false;
env.localModelPath = path.join(ROOT, 'models');

const docs = JSON.parse(readFileSync(path.join(ROOT, 'data', 'embeddings.json'), 'utf8')).map(
  (d) => ({ ...d, vec: Float32Array.from(d.embedding) })
);

const extractor = await pipeline('feature-extraction', 'rubert-tiny2', { quantized: false });

const queries = ['печать на экран', 'повторение действий', 'вывод текста в консоль'];
for (const q of queries) {
  const out = await extractor(q, { pooling: 'mean', normalize: true });
  const qv = out.data;
  const scored = docs
    .map((d) => {
      let dot = 0;
      for (let i = 0; i < qv.length; i++) dot += qv[i] * d.vec[i];
      return { title: d.title, sim: dot };
    })
    .sort((a, b) => b.sim - a.sim)
    .slice(0, 3);
  console.log(`"${q}" ->`);
  for (const s of scored) console.log(`   ${s.sim.toFixed(4)}  ${s.title}`);
}
