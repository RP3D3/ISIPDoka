#!/usr/bin/env node
/**
 * Сканирует content/ и собирает data/structure.json.
 *
 * Источники данных:
 *   content/<область>/meta.json          — title, accent, description, order (seed)
 *   content/<область>/<группа>/meta.json — title, order (seed)
 *   content/<область>/<группа>/*.md      — YAML frontmatter (title, order, keywords), тело в markdown
 *   content/<область>/<группа>/*.html    — интерактивы (самостоятельные страницы с хедером и поиском)
 *
 * Порядок:
 *   - уже существующие в structure.json записи сохраняют свой order;
 *   - новая тема берёт order из frontmatter `order:` (для .md) или <meta name="order"> (для .html);
 *   - иначе получает max(order родителя) + 10;
 *   - после успешной записи structure.json seed-поля удаляются из HTML/meta.json/frontmatter.
 *
 * Запуск:
 *   node scripts/sync-structure.js
 *   node scripts/sync-structure.js --dry-run
 *   node scripts/sync-structure.js --embeddings
 *   node scripts/sync-structure.js --apply-html-order
 *   node scripts/sync-structure.js --reset
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const STRUCTURE_PATH = path.join(ROOT, 'data', 'structure.json');
const LOCAL_STRUCTURE_PATH = path.join(ROOT, 'data', 'structure.local.json');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const WITH_EMBEDDINGS = args.includes('--embeddings');
const APPLY_HTML_ORDER = args.includes('--apply-html-order');
const RESET = args.includes('--reset');
const VERBOSE = args.includes('--verbose');

const warnings = [];
const collator = new Intl.Collator('ru', { numeric: true, sensitivity: 'base' });

/* ------------------------------------------------------------------ *
 * Утилиты                                                             *
 * ------------------------------------------------------------------ */

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function readText(file) {
  return readFileSync(file, 'utf8');
}

function readJson(file, fallback = null) {
  try {
    return JSON.parse(readText(file));
  } catch (err) {
    if (existsSync(file)) {
      warnings.push(`${path.relative(ROOT, file)}: не удалось прочитать JSON (${err.message})`);
    }
    return fallback;
  }
}

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function atomicWrite(file, content) {
  mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  writeFileSync(tmp, content, 'utf8');

  // На Windows rename поверх файла может падать с EPERM/EBUSY, если файл
  // в этот момент читает браузер, редактор или антивирус. Пробуем ещё раз,
  // а в крайнем случае пишем напрямую.
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      renameSync(tmp, file);
      return;
    } catch (err) {
      if (!['EPERM', 'EACCES', 'EBUSY'].includes(err.code)) throw err;
      sleepSync(30);
    }
  }

  writeFileSync(file, content, 'utf8');
  try {
    unlinkSync(tmp);
  } catch {
    /* временный файл мог уже исчезнуть */
  }
}

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

function parseTitle(html, fallback) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  let title = m ? decodeEntities(m[1]).trim() : '';
  // На случай старых страниц с суффиксом «— C# — Дока ИСИП».
  title = title.replace(/\s+—\s+[^—]+?\s+—\s+Дока ИСИП\s*$/i, '').trim();
  return title || fallback;
}

/* ------------------------------------------------------------------ *
 * YAML frontmatter для .md-файлов                                     *
 * ------------------------------------------------------------------ */

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

function extractTitleFromMd(md, fallback) {
  const { data, body } = parseFrontmatter(md);
  if (data.title) return { title: data.title, data, body };
  const h1 = body.match(/^#\s+(.+)/m);
  if (h1) return { title: h1[1].trim(), data, body };
  return { title: fallback, data, body };
}

function extractOrderFromMd(data) {
  if (data.order == null) return null;
  const n = Number(data.order);
  return Number.isInteger(n) && n >= 0 ? n : null;
}

/**
 * Аккуратно удаляет одно поле из YAML-frontmatter, не пересобирая остальные
 * строки. Это важно для многострочных значений (`key: |`), которые нельзя
 * терять при удалении seed-поля `order`.
 */
function stripFrontmatterKey(md, key) {
  const match = md.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!match) return md;

  const raw = match[1];
  const rawStart = match.index + match[0].indexOf(raw);
  const rawEnd = rawStart + raw.length;
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const lineRe = new RegExp(
    `^${escaped}:[^\\r\\n]*(?:\\r?\\n[ \\t]+[^\\r\\n]*)*\\r?\\n?`,
    'm'
  );

  if (!lineRe.test(raw)) return md;

  return md.slice(0, rawStart) + raw.replace(lineRe, '') + md.slice(rawEnd);
}

/* Ключевые слова для поиска из frontmatter (через запятую или пробел) */
function extractKeywordsFromFrontmatter(data) {
  if (!data.keywords) return null;
  return String(data.keywords)
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join(' ');
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

const STOP_WORDS = new Set(
  (
    'это этот эта эти того этому этом этим этой всех всего всю вся всё ' +
    'который которая которое которые котором котором котором ' +
    'как так тоже также только даже если или либо чтобы чтоб когда где ' +
    'потому поэтому зачем почему чем что кто чей чья чьё ' +
    'для без при над под перед после между через около ' +
    'есть был была было были быть будет будут можно нужно надо ' +
    'очень более менее самый самая самое самые ' +
    'его ему ей её их них ним ними нас нам вас вам меня мне тебя тебе ' +
    'себя себе собой один одна одно одни два три четыре пять ' +
    'мой моя моё мои твой твоя твоё твои наш наша наше наши ваш ваша ваше ваши ' +
    'этот этот эта эти тот та то те такой такая такое такие ' +
    'когда тогда теперь сейчас потом уже ещё еще нет да ну вот тут там здесь ' +
    'который которая которое которые котором которой которых ' +
    'использовать используется используются позволяет позволяет можно ' +
    'пример примеры например случае случай также такой такие ' +
    'данные данный данная данное данных ' +
    'код кода коде программу программа программы ' +
    'csharp sharp html css javascript sql'
  ).split(/\s+/)
);

function extractKeywords(text, title) {
  const raw = `${title} ${text}`.toLowerCase();
  const words = raw.match(/[a-zа-яё0-9_+#.]{3,}/gi) || [];
  const titleWords = new Set((title.toLowerCase().match(/[a-zа-яё0-9_+#.]{3,}/gi) || []));
  const freq = new Map();

  for (const word of words) {
    const cleaned = word.replace(/^[^a-zа-яё0-9+#]+|[^a-zа-яё0-9+#]+$/gi, '');
    if (cleaned.length < 4) continue;
    if (STOP_WORDS.has(cleaned)) continue;
    freq.set(cleaned, (freq.get(cleaned) || 0) + 1);
  }

  const sorted = [...freq.entries()].sort((a, b) => {
    const aTitle = titleWords.has(a[0]) ? 1 : 0;
    const bTitle = titleWords.has(b[0]) ? 1 : 0;
    if (aTitle !== bTitle) return bTitle - aTitle;
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0], 'ru');
  });

  return sorted.slice(0, 16).map(([word]) => word).join(' ');
}

function getAttr(tag, name) {
  const re = new RegExp(
    '\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s>]+))',
    'i'
  );
  const m = tag.match(re);
  return m ? (m[1] ?? m[2] ?? m[3] ?? '') : null;
}

function removeStandaloneTag(html, tag) {
  const idx = html.indexOf(tag);
  if (idx === -1) return html;

  const lineStart = html.lastIndexOf('\n', idx) + 1;
  const lineEndNl = html.indexOf('\n', idx + tag.length);
  const lineEnd = lineEndNl === -1 ? html.length : lineEndNl;
  const line = html.slice(lineStart, lineEnd);

  if (line.trim() === tag.trim()) {
    const rest = lineEndNl === -1 ? '' : html.slice(lineEndNl + 1);
    return html.slice(0, lineStart) + rest;
  }
  return html.slice(0, idx) + html.slice(idx + tag.length);
}

function extractOrderMeta(html) {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch ? headMatch[1] : html;
  const tags = head.match(/<meta\b[^>]*>/gi) || [];

  for (const tag of tags) {
    const name = getAttr(tag, 'name');
    if (!name || name.toLowerCase() !== 'order') continue;

    const raw = getAttr(tag, 'content');
    const trimmed = raw == null ? '' : String(raw).trim();
    const valid = /^\d+$/.test(trimmed) && Number.isInteger(Number(trimmed)) && Number(trimmed) >= 0;
    return {
      raw,
      order: valid ? Number(trimmed) : null,
      valid,
      tag,
      html: valid ? removeStandaloneTag(html, tag) : html,
    };
  }

  return { raw: null, order: null, valid: false, tag: null, html };
}

function readMeta(dir) {
  const file = path.join(dir, 'meta.json');
  if (!existsSync(file)) return { file, exists: false, data: null };
  const data = readJson(file, null);
  return { file, exists: true, data: data && typeof data === 'object' ? data : null };
}

function isInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

function nextOrder(orders) {
  const known = orders.filter(isInteger);
  return known.length ? Math.max(...known) + 10 : 10;
}

function sortByOrder(items) {
  return items.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return collator.compare(a.title || a.name || '', b.title || b.name || '');
  });
}

function warnDuplicates(items, label) {
  const seen = new Map();
  for (const item of items) {
    if (seen.has(item.order)) {
      warnings.push(
        `${label}: одинаковый order ${item.order} у «${seen.get(item.order)}» и «${item.title || item.name}»`
      );
    } else {
      seen.set(item.order, item.title || item.name);
    }
  }
}

/* ------------------------------------------------------------------ *
 * Сканирование                                                        *
 * ------------------------------------------------------------------ */

function scanContent() {
  const domains = [];
  if (!existsSync(CONTENT_DIR)) return domains;

  const domainDirs = readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
    .map((e) => e.name)
    .sort(collator.compare);

  for (const domainId of domainDirs) {
    const domainDir = path.join(CONTENT_DIR, domainId);
    const meta = readMeta(domainDir);
    const metaData = meta.data || {};

    if (!meta.exists) warnings.push(`${domainId}/meta.json отсутствует — название взято из имени папки`);
    if (meta.exists && !metaData.title) warnings.push(`${domainId}/meta.json: нет поля title`);

    const domain = {
      id: domainId,
      dir: domainDir,
      meta,
      title: metaData.title || domainId,
      accent: metaData.accent || '#6c47ff',
      description: metaData.description || '',
      localOnly: Boolean(metaData.localOnly),
      seedOrder: isInteger(metaData.order) ? metaData.order : null,
      seedOrderValid: metaData.order === undefined || isInteger(metaData.order),
      order: null,
      groups: [],
    };

    if (metaData.order !== undefined && !isInteger(metaData.order)) {
      warnings.push(`${domainId}/meta.json: order должен быть целым неотрицательным числом`);
    }

    const groupDirs = readdirSync(domainDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
      .map((e) => e.name)
      .sort(collator.compare);

    for (const groupId of groupDirs) {
      const groupDir = path.join(domainDir, groupId);
      const groupMeta = readMeta(groupDir);
      const groupData = groupMeta.data || {};

      if (!groupMeta.exists) warnings.push(`${domainId}/${groupId}/meta.json отсутствует — название взято из имени папки`);
      if (groupMeta.exists && !groupData.title) warnings.push(`${domainId}/${groupId}/meta.json: нет поля title`);

      const group = {
        id: groupId,
        dir: groupDir,
        meta: groupMeta,
        name: groupData.title || groupId,
        seedOrder: isInteger(groupData.order) ? groupData.order : null,
        order: null,
        topics: [],
      };

      if (groupData.order !== undefined && !isInteger(groupData.order)) {
        warnings.push(`${domainId}/${groupId}/meta.json: order должен быть целым неотрицательным числом`);
      }

      const files = readdirSync(groupDir, { withFileTypes: true })
        .filter(
          (e) =>
            e.isFile() &&
            (e.name.toLowerCase().endsWith('.html') ||
              e.name.toLowerCase().endsWith('.md')) &&
            !e.name.startsWith('_')
        )
        .map((e) => e.name)
        .sort(collator.compare);

      for (const file of files) {
        const abs = path.join(groupDir, file);
        const isMd = file.toLowerCase().endsWith('.md');
        const fallbackTitle = file.replace(/\.(html|md)$/i, '');

        if (isMd) {
          const md = readText(abs);
          const { title, data, body } = extractTitleFromMd(md, fallbackTitle);
          const mdOrder = extractOrderFromMd(data);
          const keywords = extractKeywordsFromFrontmatter(data) || extractKeywords(body, title);

          if (mdOrder == null && data.order !== undefined) {
            warnings.push(
              `${domainId}/${groupId}/${file}: frontmatter order должен быть целым неотрицательным числом — поле оставлено`
            );
          }

          group.topics.push({
            file,
            abs,
            title,
            url: toPosix(path.relative(ROOT, abs)),
            type: 'md',
            interactive: false,
            mdOrder,
            mdOrderFrontmatter: data.order,
            keywords,
          });
        } else {
          const html = readText(abs);
          const title = parseTitle(html, fallbackTitle);
          const orderMeta = extractOrderMeta(html);
          const text = extractArticleText(html);

          if (orderMeta.tag && !orderMeta.valid) {
            warnings.push(
              `${domainId}/${groupId}/${file}: <meta name="order"> должен быть целым неотрицательным числом — тег оставлен`
            );
          }

          group.topics.push({
            file,
            abs,
            html,
            cleanHtml: orderMeta.html,
            title,
            url: toPosix(path.relative(ROOT, abs)),
            type: 'html',
            interactive: true,
            htmlOrder: orderMeta.order,
            htmlOrderTag: orderMeta.tag,
            htmlOrderValid: orderMeta.valid,
            keywords: extractKeywords(text, title),
          });
        }
      }

      domain.groups.push(group);
    }

    domains.push(domain);
  }

  return domains;
}

/* ------------------------------------------------------------------ *
 * Слияние со старым structure.json                                    *
 * ------------------------------------------------------------------ */

function buildOldIndex(structure) {
  const domains = new Map();
  const groups = new Map();

  if (!structure || typeof structure !== 'object') return { domains, groups };

  Object.entries(structure).forEach(([domainId, domain], domainIndex) => {
    const domainOrder = isInteger(domain.order)
      ? domain.order
      : (domainIndex + 1) * 10;
    domains.set(domainId, domainOrder);

    (domain.groups || []).forEach((group, groupIndex) => {
      const groupOrder = isInteger(group.order)
        ? group.order
        : (groupIndex + 1) * 10;
      const groupId = group.id || group.name || `group-${groupIndex + 1}`;
      const topics = new Map();
      (group.topics || []).forEach((topic, topicIndex) => {
        topics.set(
          topic.url,
          isInteger(topic.order) ? topic.order : (topicIndex + 1) * 10
        );
      });

      const entry = { order: groupOrder, topics };
      groups.set(`${domainId}/${groupId}`, entry);
      if (group.name) groups.set(`${domainId}/name:${group.name}`, entry);
    });
  });

  return { domains, groups };
}

function applyOrders(domains, old) {
  /* --- области --- */
  for (const domain of domains) {
    domain.order = old.domains.get(domain.id) ?? domain.seedOrder;
  }
  let domainNext = nextOrder(domains.map((d) => d.order));
  for (const domain of domains) {
    if (!isInteger(domain.order)) domain.order = domainNext++;
  }
  sortByOrder(domains);
  warnDuplicates(domains, 'Области');

  /* --- группы и темы --- */
  for (const domain of domains) {
    for (const group of domain.groups) {
      const oldGroup =
        old.groups.get(`${domain.id}/${group.id}`) ||
        old.groups.get(`${domain.id}/name:${group.name}`);
      group.order = oldGroup?.order ?? group.seedOrder;
    }

    let groupNext = nextOrder(domain.groups.map((g) => g.order));
    for (const group of domain.groups) {
      if (!isInteger(group.order)) group.order = groupNext++;
    }
    sortByOrder(domain.groups);
    warnDuplicates(domain.groups, `Группы области ${domain.title}`);

    for (const group of domain.groups) {
      const oldGroup =
        old.groups.get(`${domain.id}/${group.id}`) ||
        old.groups.get(`${domain.id}/name:${group.name}`);
      const oldTopics = oldGroup?.topics || new Map();

      for (const topic of group.topics) {
        const existing = oldTopics.get(topic.url);
        topic.order = null;
        topic.orderSource = 'new';
        const topicOrder = topic.type === 'md' ? topic.mdOrder : topic.htmlOrder;

        if (existing != null && !APPLY_HTML_ORDER) {
          topic.order = existing;
          topic.orderSource = 'structure';
          if (topicOrder != null && topicOrder !== existing) {
            warnings.push(
              `${domain.id}/${group.id}/${topic.file}: order ${topicOrder} из источника проигнорирован, в structure.json уже ${existing}`
            );
          }
        } else if (topicOrder != null) {
          topic.order = topicOrder;
          topic.orderSource = topic.type === 'md' ? 'frontmatter' : 'html';
          if (existing != null && existing !== topicOrder) {
            console.log(
              `[sync] ${topic.url}: order ${existing} → ${topicOrder} (--apply-html-order)`
            );
          } else if (existing == null) {
            console.log(
              `[sync] ${topic.url}: order ${topicOrder} взят из источника`
            );
          }
        } else if (existing != null) {
          topic.order = existing;
          topic.orderSource = 'structure';
        }
      }

      let topicNext = nextOrder(group.topics.map((t) => t.order));
      for (const topic of group.topics) {
        if (!isInteger(topic.order)) {
          topic.order = topicNext++;
          topic.orderSource = 'auto';
        }
      }
      sortByOrder(group.topics);
      warnDuplicates(group.topics, `Темы группы ${domain.title} / ${group.name}`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * Сборка и запись                                                     *
 * ------------------------------------------------------------------ */

function buildStructure(domains) {
  const structure = {};

  for (const domain of domains) {
    const result = {
      order: domain.order,
      title: domain.title,
    };
    if (domain.accent) result.accent = domain.accent;
    if (domain.description) result.description = domain.description;
    if (domain.localOnly) result.localOnly = true;

    result.groups = domain.groups.map((group) => ({
      id: group.id,
      order: group.order,
      name: group.name,
      topics: group.topics.map((topic) => ({
        order: topic.order,
        title: topic.title,
        url: topic.url,
        keywords: topic.keywords,
        type: topic.type || 'html',
        interactive: Boolean(topic.interactive),
      })),
    }));

    structure[domain.id] = result;
  }

  return structure;
}

function collectCleanup(domains) {
  const actions = [];

  for (const domain of domains) {
    if (
      domain.meta.exists &&
      domain.meta.data &&
      domain.meta.data.order !== undefined &&
      domain.seedOrderValid
    ) {
      const data = { ...domain.meta.data };
      delete data.order;
      actions.push({ type: 'json', file: domain.meta.file, data });
    }

    for (const group of domain.groups) {
      if (
        group.meta.exists &&
        group.meta.data &&
        group.meta.data.order !== undefined &&
        isInteger(group.meta.data.order)
      ) {
        const data = { ...group.meta.data };
        delete data.order;
        actions.push({ type: 'json', file: group.meta.file, data });
      }

      for (const topic of group.topics) {
        if (topic.type === 'md' && topic.mdOrderFrontmatter !== undefined) {
          const md = readText(topic.abs);
          const content = stripFrontmatterKey(md, 'order');
          if (content !== md) {
            actions.push({ type: 'md', file: topic.abs, content });
          }
        } else if (topic.htmlOrderValid && topic.htmlOrderTag) {
          actions.push({ type: 'html', file: topic.abs, content: topic.cleanHtml });
        }
      }
    }
  }

  return actions;
}

function applyCleanup(actions) {
  for (const action of actions) {
    if (action.type === 'json') {
      atomicWrite(action.file, JSON.stringify(action.data, null, 2) + '\n');
      console.log(`[sync] seed order удалён из ${path.relative(ROOT, action.file)}`);
    } else if (action.type === 'html') {
      atomicWrite(action.file, action.content);
      console.log(`[sync] seed <meta name="order"> удалён из ${path.relative(ROOT, action.file)}`);
    } else if (action.type === 'md') {
      atomicWrite(action.file, action.content);
      console.log(`[sync] seed order удалён из frontmatter ${path.relative(ROOT, action.file)}`);
    }
  }
}

function printTree(domains) {
  for (const domain of domains) {
    console.log(`  ${domain.order}  ${domain.title}  (${domain.id})`);
    for (const group of domain.groups) {
      console.log(`    ${group.order}  ${group.name}  (${group.id})`);
      for (const topic of group.topics) {
        console.log(`      ${topic.order}  ${topic.title}  [${topic.orderSource}]`);
      }
    }
  }
}

/* ------------------------------------------------------------------ *
 * main                                                                *
 * ------------------------------------------------------------------ */

function main() {
  const domains = scanContent();
  const oldStructure = RESET
    ? null
    : {
        ...(readJson(LOCAL_STRUCTURE_PATH, null) || {}),
        ...(readJson(STRUCTURE_PATH, null) || {}),
      };
  const old = buildOldIndex(oldStructure);

  applyOrders(domains, old);

  const structure = buildStructure(domains);
  const publicStructure = {};
  const localStructure = {};
  for (const [id, domain] of Object.entries(structure)) {
    if (domain.localOnly) localStructure[id] = domain;
    else publicStructure[id] = domain;
  }

  const totalGroups = domains.reduce((sum, d) => sum + d.groups.length, 0);
  const totalTopics = domains.reduce(
    (sum, d) => sum + d.groups.reduce((s, g) => s + g.topics.length, 0),
    0
  );

  console.log(
    `[sync] Найдено: ${domains.length} областей, ${totalGroups} групп, ${totalTopics} тем.`
  );
  const localCount = Object.keys(localStructure).length;
  if (localCount) {
    console.log(
      `[sync] Локальных областей: ${localCount} → ${path.relative(ROOT, LOCAL_STRUCTURE_PATH)}`
    );
  }
  if (VERBOSE || DRY_RUN) printTree(domains);

  if (DRY_RUN) {
    console.log('[sync] --dry-run: structure.json и исходные файлы не изменены.');
  } else {
    atomicWrite(STRUCTURE_PATH, JSON.stringify(publicStructure, null, 2) + '\n');
    console.log(`[sync] Записан ${path.relative(ROOT, STRUCTURE_PATH)}.`);

    if (localCount) {
      atomicWrite(
        LOCAL_STRUCTURE_PATH,
        JSON.stringify(localStructure, null, 2) + '\n'
      );
      console.log(`[sync] Записан ${path.relative(ROOT, LOCAL_STRUCTURE_PATH)}.`);
    } else if (existsSync(LOCAL_STRUCTURE_PATH)) {
      try {
        unlinkSync(LOCAL_STRUCTURE_PATH);
        console.log(
          `[sync] Удалён пустой ${path.relative(ROOT, LOCAL_STRUCTURE_PATH)}.`
        );
      } catch (_) {
        /* не критично */
      }
    }

    const cleanup = collectCleanup(domains);
    if (cleanup.length) {
      applyCleanup(cleanup);
    } else {
      console.log('[sync] Seed-полей order для удаления нет.');
    }
  }

  if (warnings.length) {
    console.log('');
    console.log(`[sync] Предупреждения (${warnings.length}):`);
    for (const warning of warnings) console.log(`  - ${warning}`);
  }

  if (WITH_EMBEDDINGS) {
    if (DRY_RUN) {
      console.log('[sync] --embeddings вместе с --dry-run не запускается.');
    } else {
      console.log('[sync] Пересобираю эмбеддинги...');
      const result = spawnSync(
        process.execPath,
        [path.join(ROOT, 'scripts', 'build-embeddings.js')],
        { cwd: ROOT, stdio: 'inherit' }
      );
      if (result.status !== 0) {
        console.error('[sync] build-embeddings.js завершился с ошибкой.');
        process.exitCode = result.status || 1;
      }
    }
  }
}

try {
  main();
} catch (err) {
  console.error('[sync] Ошибка:', err);
  process.exit(1);
}
