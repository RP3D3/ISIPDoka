/*
 * Общий рендер Markdown для theme.html и админского предпросмотра.
 *
 * Отличия от «голого» marked:
 *  1. Лишние пустые строки между блоками не схлопываются, а превращаются
 *     в вертикальные отступы. Автор темы может управлять «воздухом»
 *     обычными переносами строк.
 *  2. Блокам проставляется data-source-line — по нему предпросмотр
 *     в админке находит место, где стоит курсор.
 */
(() => {
  'use strict';

  const SPACER_CLASS = 'md-blank-line';
  const SPACER_RE = new RegExp(`\\b${SPACER_CLASS}\\b`);

  function normalize(source) {
    return String(source ?? '').replace(/\r\n?/g, '\n');
  }

  // Строки, внутри которых пустая строка — часть синтаксиса, а не «воздух».
  function isStructural(line) {
    return (
      /^\s{2,}/.test(line) ||
      /^\s*(?:[-*+]|\d+[.)])(?:\s|$)/.test(line) ||
      /^\s*>/.test(line) ||
      /^\s*\|/.test(line)
    );
  }

  /*
   * Заменяет серии пустых строк (2+) на обычный разделитель + блок-распорку.
   * Внутри code fence и вложенных структур ничего не трогаем.
   */
  function preserveBlankLines(source) {
    const lines = source.split('\n');
    const out = [];
    let inFence = false;
    let fenceChar = '';

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const fence = line.match(/^\s{0,3}(```+|~~~+)/);

      if (fence) {
        if (!inFence) {
          inFence = true;
          fenceChar = fence[1][0];
        } else if (fence[1][0] === fenceChar) {
          inFence = false;
        }
        out.push(line);
        continue;
      }

      if (inFence || line.trim() !== '') {
        out.push(line);
        continue;
      }

      let end = i;
      while (end < lines.length && lines[end].trim() === '') end += 1;

      const blankCount = end - i;
      const prev = i > 0 ? lines[i - 1] : '';
      const next = end < lines.length ? lines[end] : '';
      const canExpand =
        blankCount > 1 &&
        prev.trim() !== '' &&
        next.trim() !== '' &&
        !(isStructural(prev) && isStructural(next));

      out.push('');
      if (canExpand) {
        const height = ((blankCount - 1) * 1.7).toFixed(2).replace(/\.?0+$/, '');
        out.push(
          `<div class="${SPACER_CLASS}" style="height:${height}em" aria-hidden="true"></div>`
        );
        out.push('');
      }

      i = end - 1;
    }

    return out.join('\n');
  }

  function isSpacerToken(token) {
    return (
      token &&
      token.type === 'html' &&
      typeof token.raw === 'string' &&
      SPACER_RE.test(token.raw)
    );
  }

  /*
   * Сопоставляет токены marked с номерами строк исходника.
   * Обход рекурсивный: так находятся и пункты списков, и вложенные блоки.
   */
  function computeTokenLines(tokens, source) {
    const lines = new WeakMap();

    function walk(list, start, end) {
      let cursor = start;
      for (const token of list) {
        if (!token || !token.raw || token.type === 'space') continue;

        let index = source.indexOf(token.raw, cursor);
        if (index === -1 || index >= end) index = source.indexOf(token.raw, start);
        if (index === -1) continue;

        lines.set(token, source.slice(0, index).split('\n').length);
        cursor = index + token.raw.length;

        if (Array.isArray(token.tokens)) walk(token.tokens, index, cursor);
        if (Array.isArray(token.items)) walk(token.items, index, cursor);
      }
    }

    walk(tokens, 0, source.length);
    return lines;
  }

  function addSourceLine(html, line) {
    if (line == null) return html;
    return html.replace(
      /^<([a-z0-9]+)/i,
      `<$1 data-source-line="${line}"`
    );
  }

  function alignTokenLines(preparedTokens, originalTokens, originalLines, lineMap) {
    let originalIndex = 0;
    for (const token of preparedTokens) {
      if (token.type === 'space' || isSpacerToken(token)) continue;
      while (
        originalIndex < originalTokens.length &&
        originalTokens[originalIndex].type === 'space'
      ) {
        originalIndex += 1;
      }

      const original = originalTokens[originalIndex];
      if (original) {
        if (originalLines.has(original)) {
          lineMap.set(token, originalLines.get(original));
        }
        if (Array.isArray(token.tokens) && Array.isArray(original.tokens)) {
          alignTokenLines(token.tokens, original.tokens, originalLines, lineMap);
        }
        if (Array.isArray(token.items) && Array.isArray(original.items)) {
          alignTokenLines(token.items, original.items, originalLines, lineMap);
        }
      }

      originalIndex += 1;
    }
  }

  function render(markdown) {
    const source = normalize(markdown);
    const prepared = preserveBlankLines(source);

    const originalTokens = marked.lexer(source);
    const originalLines = computeTokenLines(originalTokens, source);
    const tokens = marked.lexer(prepared);

    // Токены подготовленного текста → строки исходника (без учёта распорок).
    const lineMap = new WeakMap();
    alignTokenLines(tokens, originalTokens, originalLines, lineMap);

    const renderer = new marked.Renderer();
    const blockTypes = [
      'heading',
      'paragraph',
      'list',
      'listitem',
      'code',
      'blockquote',
      'table',
      'hr',
    ];

    for (const name of blockTypes) {
      const original = renderer[name];
      renderer[name] = function renderWithLine(token) {
        return addSourceLine(original.call(this, token), lineMap.get(token));
      };
    }

    const instance = new marked.Marked({ renderer });
    return {
      html: instance.parser(tokens),
      source,
      spacerClass: SPACER_CLASS,
    };
  }

  window.DokaMarkdown = {
    render,
    preserveBlankLines,
    SPACER_CLASS,
  };
})();
