/**
 * Общие помощники для извлечения текста тем.
 *
 * Используются и офлайн-сборкой эмбеддингов, и админ-статистикой,
 * чтобы «контекст» считался одинаково.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';

/** Сколько символов темы максимум попадает в эмбеддинг. */
export const MAX_TEXT_CHARS = 6000;

export function decodeEntities(value) {
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

export function parseFrontmatter(md) {
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

export function extractArticleText(html) {
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  let body = article ? article[1] : html;
  body = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return decodeEntities(body).replace(/\s+/g, ' ').trim();
}

export function extractMdBody(md) {
  const { body } = parseFrontmatter(md);
  return body.replace(/\s+/g, ' ').trim();
}

/**
 * Собирает все темы сайта вместе с текстом, который уходит в эмбеддинг.
 *
 * Возвращает для каждой темы:
 *   text            — обрезанный до MAX_TEXT_CHARS текст (то, что видит модель);
 *   fullTextLength  — полная длина текста до обрезки (для статистики потерь).
 */
export function collectTopics(structure, root) {
  const docs = [];

  for (const [domainId, domain] of Object.entries(structure)) {
    (domain.groups || []).forEach((group) => {
      (group.topics || []).forEach((topic) => {
        let pageText = '';
        try {
          const abs = path.join(root, topic.url);
          const raw = readFileSync(abs, 'utf8');
          pageText = topic.type === 'md'
            ? extractMdBody(raw)
            : extractArticleText(raw);
        } catch (err) {
          console.warn(
            `[content-text] Не удалось прочитать ${topic.url}: ${err.message}`
          );
        }

        const fullText = `${domain.title} ${group.name} ${topic.title} ${
          topic.keywords || ''
        } ${pageText}`;

        docs.push({
          id: `${domainId}::${topic.url}`,
          domainId,
          domain: domain.title || domainId,
          group: group.name || '',
          title: topic.title || '',
          url: topic.url,
          keywords: topic.keywords || '',
          text: fullText.slice(0, MAX_TEXT_CHARS),
          fullTextLength: fullText.length,
        });
      });
    });
  }

  return docs;
}
