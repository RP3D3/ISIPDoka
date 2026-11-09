/**
 * Локальный dev-сервер + админ-API проекта.
 *
 * Запуск: node scripts/dev-server.js [порт=5173]
 *
 * Отдаёт статику сайта и предоставляет /api/admin/* для локальной админки.
 * Бэкенд работает только на 127.0.0.1; на GitHub Pages сайт остаётся
 * чистой статикой, а админ-эндпоинты просто недоступны.
 *
 * Пароль: DOKA_ADMIN_PASSWORD или isip-admin по умолчанию.
 */
import { createServer } from 'node:http';
import {
  readFile,
  writeFile,
  mkdir,
  stat,
  rename,
  rm,
  unlink,
} from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const SCRIPTS_DIR = path.join(ROOT, 'scripts');
const PORT = Number(process.argv[2] || 5173);
const ADMIN_PASSWORD = process.env.DOKA_ADMIN_PASSWORD || 'isip-admin';
const MAX_BODY_SIZE = 8 * 1024 * 1024;
const SCRIPT_TIMEOUT = 5 * 60 * 1000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.wasm': 'application/wasm',
  '.onnx': 'application/octet-stream',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/* ========================================================================== *
 * Общие утилиты                                                               *
 * ========================================================================== */

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, status, text) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(text);
}

function safeEqual(a, b) {
  const left = String(a ?? '');
  const right = String(b ?? '');
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) {
    diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return diff === 0;
}

function isAuthorized(req) {
  return safeEqual(req.headers['x-admin-password'], ADMIN_PASSWORD);
}

function requireAuthorized(req) {
  if (!isAuthorized(req)) {
    throw new HttpError(401, 'Требуется пароль администратора.');
  }
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_SIZE) {
      throw new HttpError(413, 'Слишком большой запрос.');
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function readJsonBody(req) {
  const raw = await readBody(req);
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw);
  } catch (_) {
    throw new HttpError(400, 'Некорректный JSON в запросе.');
  }
}

function yamlLine(value) {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim();
}

function requireTitle(value) {
  const title = yamlLine(value);
  if (!title) throw new HttpError(400, 'Укажите название.');
  if (title.length > 200) throw new HttpError(400, 'Название слишком длинное.');
  return title;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function requireSlug(value, label) {
  const slug = String(value ?? '').trim();
  if (!slug) throw new HttpError(400, `Укажите ${label}.`);
  if (slug.length > 64 || !SLUG_RE.test(slug)) {
    throw new HttpError(
      400,
      `${label}: только латиница в нижнем регистре, цифры и дефис (до 64 символов).`
    );
  }
  return slug;
}

function normalizeAccent(value) {
  let accent = String(value ?? '').trim();
  if (!accent) return '#6c47ff';
  if (/^#[0-9a-fA-F]{3}$/.test(accent)) {
    accent = '#' + accent.slice(1).split('').map((c) => c + c).join('');
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(accent)) {
    throw new HttpError(400, 'Акцентный цвет должен быть в формате #RRGGBB.');
  }
  return accent.toLowerCase();
}

function resolveContentFile(relativePath) {
  const raw = String(relativePath ?? '')
    .replace(/\\/g, '/')
    .trim()
    .replace(/^\/+/, '');

  if (!raw.startsWith('content/')) {
    throw new HttpError(400, 'Путь должен начинаться с content/.');
  }

  const parts = raw.split('/');
  if (parts.some((part) => part === '' || part === '.' || part === '..')) {
    throw new HttpError(400, 'Некорректный путь.');
  }

  const ext = path.extname(raw).toLowerCase();
  if (ext !== '.md' && ext !== '.html') {
    throw new HttpError(400, 'Редактировать можно только .md и .html.');
  }

  const abs = path.resolve(ROOT, raw);
  if (!abs.startsWith(CONTENT_DIR + path.sep)) {
    throw new HttpError(403, 'Путь вне папки content/.');
  }

  return { abs, rel: raw, ext };
}

async function ensureDirectory(dir, message) {
  const info = await stat(dir).catch(() => null);
  if (!info || !info.isDirectory()) {
    throw new HttpError(404, message);
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ========================================================================== *
 * Шаблоны новых тем                                                           *
 * ========================================================================== */

function markdownTopicTemplate(title, description) {
  const summary =
    description || 'Краткое описание темы: о чём она и что читатель узнает.';
  return [
    '---',
    `title: ${title}`,
    'keywords: ',
    'svg: ',
    '---',
    '',
    `# ${title}`,
    '',
    summary,
    '',
    '## Первый раздел',
    '',
    'Текст раздела. Здесь можно использовать **выделение**, `код` и [ссылки](https://example.com).',
    '',
    '```cs',
    'Console.WriteLine("Привет, мир!");',
    '```',
    '',
  ].join('\n');
}

function htmlTopicTemplate(title, description) {
  const summary =
    description || 'Краткое описание темы: о чём она и что читатель узнает.';
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="../../../css/libs/atom-one-dark.min.css">
  <link rel="stylesheet" href="../../../css/style.css?v=20261109-1">
</head>
<body>
  <section class="topic-hero">
    <div class="topic-hero-container">
      <h1>${escapeHtml(title)}</h1>
      <p class="summary">${escapeHtml(summary)}</p>
    </div>
  </section>

  <article class="article-content">
    <section class="topic-section">
      <h2>Первый раздел</h2>
      <p>Текст раздела. Здесь можно использовать <strong>выделение</strong>,
        <code>код</code> и интерактивные элементы.</p>
    </section>
  </article>

  <script src="../../../js/page.js?v=20261107-2"></script>
</body>
</html>
`;
}

/* ========================================================================== *
 * Запуск sync-structure / build-embeddings                                   *
 * ========================================================================== */

function runNodeScript(scriptName) {
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      [path.join(SCRIPTS_DIR, scriptName)],
      {
        cwd: ROOT,
        timeout: SCRIPT_TIMEOUT,
        maxBuffer: 20 * 1024 * 1024,
        windowsHide: true,
      },
      (error, stdout, stderr) => {
        if (error) {
          const details = (stderr || stdout || error.message || '').trim();
          reject(new Error(`${scriptName}: ${details || 'не удалось выполнить'}`));
          return;
        }
        resolve(String(stdout || '').trim());
      }
    );
  });
}

// Все пересборки идут строго по очереди: sync, затем (при необходимости) embeddings.
let rebuildQueue = Promise.resolve();

function rebuild(withEmbeddings) {
  const task = rebuildQueue.then(async () => {
    const syncLog = await runNodeScript('sync-structure.js');
    let embeddingsLog = '';
    if (withEmbeddings) {
      embeddingsLog = await runNodeScript('build-embeddings.js');
    }
    return { syncLog, embeddingsLog };
  });

  rebuildQueue = task.catch(() => {});
  return task;
}

/* ========================================================================== *
 * Структура сайта (order)                                                     *
 * ========================================================================== */

const STRUCTURE_PATH = path.join(ROOT, 'data', 'structure.json');

async function readStructure() {
  let raw;
  try {
    raw = await readFile(STRUCTURE_PATH, 'utf8');
  } catch (_) {
    throw new HttpError(500, 'Не удалось прочитать data/structure.json.');
  }
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('корневой элемент должен быть объектом');
    }
    return data;
  } catch (_) {
    throw new HttpError(500, 'data/structure.json повреждён.');
  }
}

async function writeStructure(structure) {
  await mkdir(path.dirname(STRUCTURE_PATH), { recursive: true });
  await writeFile(STRUCTURE_PATH, JSON.stringify(structure, null, 2) + '\n', 'utf8');
}

function findTopic(structure, url) {
  for (const domain of Object.values(structure)) {
    for (const group of domain.groups || []) {
      for (const topic of group.topics || []) {
        if (topic.url === url) return topic;
      }
    }
  }
  return null;
}

function requireOrder(value) {
  const order = Number(value);
  if (!Number.isInteger(order) || order < 0 || order > 1000000) {
    throw new HttpError(400, 'Порядок должен быть целым неотрицательным числом.');
  }
  return order;
}

async function readJsonObject(file, fallback = {}) {
  try {
    const data = JSON.parse(await readFile(file, 'utf8'));
    return data && typeof data === 'object' && !Array.isArray(data) ? data : fallback;
  } catch (_) {
    return fallback;
  }
}

/* ========================================================================== *
 * Админ-API                                                                  *
 * ========================================================================== */

async function handleApi(req, res, url) {
  const { pathname } = url;

  if (pathname === '/api/admin/status' && req.method === 'GET') {
    sendJson(res, 200, { ok: true, admin: true });
    return;
  }

  if (pathname === '/api/admin/login' && req.method === 'POST') {
    const body = await readJsonBody(req);
    if (!safeEqual(body.password, ADMIN_PASSWORD)) {
      throw new HttpError(401, 'Неверный пароль.');
    }
    sendJson(res, 200, { ok: true });
    return;
  }

  requireAuthorized(req);

  if (pathname === '/api/admin/domain' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const title = requireTitle(body.title);
    const slug = requireSlug(body.slug, 'фактическое имя области');
    const accent = normalizeAccent(body.accent);
    const description = String(body.description ?? '').trim();

    const domainDir = path.join(CONTENT_DIR, slug);
    if (existsSync(domainDir)) {
      throw new HttpError(409, `Область «${slug}» уже существует.`);
    }

    await mkdir(domainDir, { recursive: true });
    const meta = { title, accent };
    if (description) meta.description = description;
    await writeFile(
      path.join(domainDir, 'meta.json'),
      JSON.stringify(meta, null, 2) + '\n',
      'utf8'
    );

    const logs = await rebuild(false);
    console.log(`[admin] создана область ${slug}`);
    sendJson(res, 200, { ok: true, slug, ...logs });
    return;
  }

  if (pathname === '/api/admin/domain' && req.method === 'PUT') {
    const body = await readJsonBody(req);
    const currentSlug = requireSlug(body.domain, 'фактическое имя области');
    const nextSlug = body.slug
      ? requireSlug(body.slug, 'новое фактическое имя области')
      : currentSlug;
    const title = requireTitle(body.title);
    const description = String(body.description ?? '').trim();

    const currentDir = path.join(CONTENT_DIR, currentSlug);
    await ensureDirectory(currentDir, `Область «${currentSlug}» не найдена.`);

    const targetDir = path.join(CONTENT_DIR, nextSlug);
    if (nextSlug !== currentSlug) {
      if (existsSync(targetDir)) {
        throw new HttpError(409, `Область «${nextSlug}» уже существует.`);
      }
      await rename(currentDir, targetDir);
    }

    const metaPath = path.join(targetDir, 'meta.json');
    const meta = await readJsonObject(metaPath);
    const accent =
      body.accent === undefined
        ? normalizeAccent(meta.accent)
        : normalizeAccent(body.accent);

    meta.title = title;
    meta.accent = accent;
    if (description) meta.description = description;
    else delete meta.description;

    await writeFile(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf8');

    // При переименовании переносим order на новый ключ, чтобы область
    // не уехала в конец списка после sync-structure. Заодно обновляем
    // префиксы URL тем, чтобы сохранить их порядок внутри групп.
    if (nextSlug !== currentSlug) {
      const structure = await readStructure();
      if (structure[currentSlug]) {
        const entry = structure[currentSlug];
        const oldPrefix = `content/${currentSlug}/`;
        const newPrefix = `content/${nextSlug}/`;
        for (const group of entry.groups || []) {
          for (const topic of group.topics || []) {
            if (typeof topic.url === 'string' && topic.url.startsWith(oldPrefix)) {
              topic.url = newPrefix + topic.url.slice(oldPrefix.length);
            }
          }
        }
        structure[nextSlug] = entry;
        delete structure[currentSlug];
        await writeStructure(structure);
      }
    }

    const logs = await rebuild(true);
    console.log(`[admin] изменена область ${currentSlug}${nextSlug !== currentSlug ? ` → ${nextSlug}` : ''}`);
    sendJson(res, 200, { ok: true, slug: nextSlug, ...logs });
    return;
  }

  if (pathname === '/api/admin/group' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const domain = requireSlug(body.domain, 'фактическое имя области');
    const slug = requireSlug(body.slug, 'фактическое имя группы');
    const title = requireTitle(body.title);

    const domainDir = path.join(CONTENT_DIR, domain);
    await ensureDirectory(domainDir, `Область «${domain}» не найдена.`);

    const groupDir = path.join(domainDir, slug);
    if (existsSync(groupDir)) {
      throw new HttpError(409, `Группа «${slug}» уже существует в этой области.`);
    }

    await mkdir(groupDir, { recursive: true });
    await writeFile(
      path.join(groupDir, 'meta.json'),
      JSON.stringify({ title }, null, 2) + '\n',
      'utf8'
    );

    const logs = await rebuild(false);
    console.log(`[admin] создана группа ${domain}/${slug}`);
    sendJson(res, 200, { ok: true, domain, slug, ...logs });
    return;
  }

  if (pathname === '/api/admin/group' && req.method === 'PUT') {
    const body = await readJsonBody(req);
    const domain = requireSlug(body.domain, 'фактическое имя области');
    const currentSlug = requireSlug(body.group, 'фактическое имя группы');
    const nextSlug = body.slug
      ? requireSlug(body.slug, 'новое фактическое имя группы')
      : currentSlug;
    const title = requireTitle(body.title);

    const domainDir = path.join(CONTENT_DIR, domain);
    await ensureDirectory(domainDir, `Область «${domain}» не найдена.`);

    const currentDir = path.join(domainDir, currentSlug);
    await ensureDirectory(
      currentDir,
      `Группа «${domain}/${currentSlug}» не найдена.`
    );

    const targetDir = path.join(domainDir, nextSlug);
    if (nextSlug !== currentSlug) {
      if (existsSync(targetDir)) {
        throw new HttpError(
          409,
          `Группа «${nextSlug}» уже существует в этой области.`
        );
      }
      await rename(currentDir, targetDir);
    }

    const metaPath = path.join(targetDir, 'meta.json');
    const meta = await readJsonObject(metaPath);
    meta.title = title;
    await writeFile(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf8');

    // При переименовании сохраняем order группы и её тем в structure.json.
    if (nextSlug !== currentSlug) {
      const structure = await readStructure();
      const groups = structure[domain]?.groups || [];
      const group = groups.find((item) => item.id === currentSlug);
      if (group) {
        group.id = nextSlug;
        group.name = title;
        const oldPrefix = `content/${domain}/${currentSlug}/`;
        const newPrefix = `content/${domain}/${nextSlug}/`;
        for (const topic of group.topics || []) {
          if (typeof topic.url === 'string' && topic.url.startsWith(oldPrefix)) {
            topic.url = newPrefix + topic.url.slice(oldPrefix.length);
          }
        }
        await writeStructure(structure);
      }
    }

    const logs = await rebuild(true);
    console.log(`[admin] изменена группа ${domain}/${currentSlug}${nextSlug !== currentSlug ? ` → ${nextSlug}` : ''}`);
    sendJson(res, 200, { ok: true, domain, slug: nextSlug, ...logs });
    return;
  }

  if (pathname === '/api/admin/topic' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const domain = requireSlug(body.domain, 'фактическое имя области');
    const group = requireSlug(body.group, 'фактическое имя группы');
    const slug = requireSlug(body.slug, 'фактическое имя темы');
    const title = requireTitle(body.title);
    const type = body.type === 'html' ? 'html' : 'md';
    const description = String(body.description ?? '').trim();

    const groupDir = path.join(CONTENT_DIR, domain, group);
    await ensureDirectory(groupDir, `Группа «${domain}/${group}» не найдена.`);

    const fileName = `${slug}.${type}`;
    const abs = path.join(groupDir, fileName);
    if (existsSync(abs)) {
      throw new HttpError(409, `Файл «${fileName}» уже существует.`);
    }

    const content =
      type === 'html'
        ? htmlTopicTemplate(title, description)
        : markdownTopicTemplate(title, description);

    await writeFile(abs, content, 'utf8');
    const logs = await rebuild(true);
    const relPath = `content/${domain}/${group}/${fileName}`;

    console.log(`[admin] создана тема ${relPath}`);
    sendJson(res, 200, { ok: true, path: relPath, type, ...logs });
    return;
  }

  if (pathname === '/api/admin/topic/move' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const info = resolveContentFile(body.path);
    const targetGroup = requireSlug(
      body.targetGroup,
      'фактическое имя группы назначения'
    );

    const parts = info.rel.split('/');
    if (parts.length !== 4 || parts[0] !== 'content') {
      throw new HttpError(400, 'Ожидается путь content/<область>/<группа>/<файл>.');
    }

    const domain = requireSlug(parts[1], 'фактическое имя области');
    const sourceGroup = requireSlug(parts[2], 'фактическое имя группы');
    const fileName = parts[3];

    if (targetGroup === sourceGroup) {
      throw new HttpError(400, 'Тема уже находится в этой группе.');
    }

    const sourceStat = await stat(info.abs).catch(() => null);
    if (!sourceStat || !sourceStat.isFile()) {
      throw new HttpError(404, 'Файл темы не найден.');
    }

    const targetDir = path.join(CONTENT_DIR, domain, targetGroup);
    await ensureDirectory(
      targetDir,
      `Группа «${domain}/${targetGroup}» не найдена.`
    );

    const targetAbs = path.join(targetDir, fileName);
    if (existsSync(targetAbs)) {
      throw new HttpError(
        409,
        `В группе «${targetGroup}» уже есть файл «${fileName}».`
      );
    }

    await rename(info.abs, targetAbs);
    const logs = await rebuild(true);
    const targetRel = `content/${domain}/${targetGroup}/${fileName}`;

    console.log(`[admin] тема перемещена ${info.rel} → ${targetRel}`);
    sendJson(res, 200, {
      ok: true,
      path: targetRel,
      fromGroup: sourceGroup,
      toGroup: targetGroup,
      ...logs,
    });
    return;
  }

  if (pathname === '/api/admin/delete' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const kind = String(body.kind ?? '');

    if (kind === 'domain') {
      const domain = requireSlug(body.domain, 'фактическое имя области');
      const domainDir = path.join(CONTENT_DIR, domain);
      await ensureDirectory(domainDir, `Область «${domain}» не найдена.`);

      await rm(domainDir, { recursive: true, force: true });
      const logs = await rebuild(true);

      console.log(`[admin] удалена область ${domain}`);
      sendJson(res, 200, { ok: true, kind, domain, ...logs });
      return;
    }

    if (kind === 'group') {
      const domain = requireSlug(body.domain, 'фактическое имя области');
      const group = requireSlug(body.group, 'фактическое имя группы');
      const groupDir = path.join(CONTENT_DIR, domain, group);

      await ensureDirectory(
        path.join(CONTENT_DIR, domain),
        `Область «${domain}» не найдена.`
      );
      await ensureDirectory(
        groupDir,
        `Группа «${domain}/${group}» не найдена.`
      );

      await rm(groupDir, { recursive: true, force: true });
      const logs = await rebuild(true);

      console.log(`[admin] удалена группа ${domain}/${group}`);
      sendJson(res, 200, { ok: true, kind, domain, group, ...logs });
      return;
    }

    if (kind === 'topic') {
      const info = resolveContentFile(body.path);
      const topicStat = await stat(info.abs).catch(() => null);
      if (!topicStat || !topicStat.isFile()) {
        throw new HttpError(404, 'Файл темы не найден.');
      }

      await unlink(info.abs);
      const logs = await rebuild(true);

      console.log(`[admin] удалена тема ${info.rel}`);
      sendJson(res, 200, { ok: true, kind, path: info.rel, ...logs });
      return;
    }

    throw new HttpError(400, 'Неизвестный тип удаления.');
  }

  if (pathname === '/api/admin/order' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const kind = String(body.kind ?? '');
    const order = requireOrder(body.order);

    if (kind !== 'domain' && kind !== 'group' && kind !== 'topic') {
      throw new HttpError(400, 'Неизвестный тип сортировки.');
    }

    const structure = await readStructure();
    let item = null;

    if (kind === 'domain') {
      const domain = requireSlug(body.domain, 'фактическое имя области');
      item = structure[domain] || null;
    } else if (kind === 'group') {
      const domain = requireSlug(body.domain, 'фактическое имя области');
      const group = requireSlug(body.group, 'фактическое имя группы');
      item = (structure[domain]?.groups || []).find((entry) => entry.id === group) || null;
    } else {
      const topicUrl = String(body.url ?? '').trim();
      if (!topicUrl) throw new HttpError(400, 'Не указана тема.');
      item = findTopic(structure, topicUrl);
    }

    if (!item) {
      throw new HttpError(404, 'Элемент для сортировки не найден.');
    }

    item.order = order;
    await writeStructure(structure);
    const logs = await rebuild(false);

    console.log(`[admin] порядок ${kind} ${order}`);
    sendJson(res, 200, { ok: true, kind, order, ...logs });
    return;
  }

  if (pathname === '/api/admin/file' && req.method === 'GET') {
    const info = resolveContentFile(url.searchParams.get('path'));
    if (!existsSync(info.abs)) {
      throw new HttpError(404, 'Файл не найден.');
    }
    const content = await readFile(info.abs, 'utf8');
    sendJson(res, 200, {
      ok: true,
      path: info.rel,
      type: info.ext === '.md' ? 'md' : 'html',
      content,
    });
    return;
  }

  if (pathname === '/api/admin/file' && req.method === 'PUT') {
    const body = await readJsonBody(req);
    const info = resolveContentFile(body.path);

    if (typeof body.content !== 'string') {
      throw new HttpError(400, 'Поле content должно быть строкой.');
    }
    if (!existsSync(info.abs)) {
      throw new HttpError(404, 'Файл не найден.');
    }

    await writeFile(info.abs, body.content.replace(/\r\n/g, '\n'), 'utf8');
    const logs = await rebuild(true);

    console.log(`[admin] сохранён ${info.rel}`);
    sendJson(res, 200, { ok: true, path: info.rel, ...logs });
    return;
  }

  if (pathname === '/api/admin/rebuild' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const withEmbeddings = body.embeddings !== false;
    const logs = await rebuild(withEmbeddings);
    sendJson(res, 200, { ok: true, embeddings: withEmbeddings, ...logs });
    return;
  }

  throw new HttpError(404, 'Неизвестный метод API.');
}

/* ========================================================================== *
 * Статика                                                                    *
 * ========================================================================== */

async function serveStatic(req, res, url) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    throw new HttpError(405, 'Метод не поддерживается.');
  }

  let relativePath;
  try {
    relativePath = decodeURIComponent(url.pathname);
  } catch (_) {
    throw new HttpError(400, 'Некорректный URL.');
  }

  if (relativePath === '/' || relativePath.endsWith('/')) {
    relativePath += 'index.html';
  }

  let abs = path.resolve(ROOT, relativePath.replace(/^\/+/, ''));
  if (abs !== ROOT && !abs.startsWith(ROOT + path.sep)) {
    throw new HttpError(403, 'Forbidden');
  }

  let info = await stat(abs).catch(() => null);
  if (info && info.isDirectory()) {
    abs = path.join(abs, 'index.html');
    info = await stat(abs).catch(() => null);
  }
  if (!info || !info.isFile()) {
    throw new HttpError(404, 'Not Found');
  }

  // Не отдаём служебные папки и dot-файлы.
  const relative = path.relative(ROOT, abs).split(path.sep).join('/');
  if (
    relative.split('/').some((part) => part.startsWith('.')) ||
    relative.startsWith('node_modules/') ||
    relative.startsWith('scripts/transit/')
  ) {
    throw new HttpError(404, 'Not Found');
  }

  const body = await readFile(abs);
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream',
    'Content-Length': body.length,
    'Cache-Control': 'no-cache',
  });
  if (req.method === 'HEAD') {
    res.end();
  } else {
    res.end(body);
  }
}

/* ========================================================================== *
 * Сервер                                                                     *
 * ========================================================================== */

createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);

  try {
    if (url.pathname.startsWith('/api/')) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Ошибка сервера';

    if (url.pathname.startsWith('/api/')) {
      sendJson(res, status, { ok: false, error: message });
    } else {
      sendText(res, status, status === 404 ? '404 Not Found' : 'Ошибка сервера');
    }

    if (status >= 500) {
      console.error('[dev-server]', error);
    }
  }
}).listen(PORT, '127.0.0.1', () => {
  console.log(`[dev-server] http://127.0.0.1:${PORT}/  (root: ${ROOT})`);
  console.log(
    `[dev-server] админка: пароль ${process.env.DOKA_ADMIN_PASSWORD ? 'из DOKA_ADMIN_PASSWORD' : 'по умолчанию (isip-admin)'}`
  );
});
