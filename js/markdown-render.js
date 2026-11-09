/*
 * Общий рендер Markdown для theme.html и админского предпросмотра.
 *
 * Правила:
 *  1. Несколько пустых строк подряд — это обычный разделитель блоков,
 *     а не «дополнительный воздух». Так же работает GitHub: вертикальный
 *     ритм задаёт CSS (см. .article-content в css/style.css).
 *  2. Явный отступ задаётся маркером на отдельной строке:
 *
 *         :::gap        — одна дополнительная пустая строка
 *         :::gap 2      — две
 *         :::gap:2      — то же самое
 *
 *     Маркер — обычный блок, поэтому перед ним нужна пустая строка.
 *     Внутри блоков кода маркер не срабатывает.
 *  3. Блокам проставляется data-source-line — по нему предпросмотр
 *     в админке находит место, где стоит курсор.
 */
(() => {
  'use strict';

  const GAP_RE =
    /^[ \t]{0,3}:::gap(?:[ \t]*[:=]?[ \t]*(\d+(?:\.\d+)?))?[ \t]*(?:\n+|$)/i;
  const GAP_UNIT_EM = 1.5;
  const GAP_MIN = 0.5;
  const GAP_MAX = 20;

  function normalize(source) {
    return String(source ?? '').replace(/\r\n?/g, '\n');
  }

  /*
   * Блочное расширение marked для маркера :::gap.
   * Токенизатор срабатывает только в начале блока, поэтому внутри
   * fenced-кода маркер остаётся обычным текстом.
   */
  const gapExtension = {
    name: 'gap',
    level: 'block',
    tokenizer(src) {
      const match = GAP_RE.exec(src);
      if (!match) return undefined;

      const units = Math.min(
        GAP_MAX,
        Math.max(GAP_MIN, Number(match[1]) || 1)
      );
      const height = (units * GAP_UNIT_EM)
        .toFixed(2)
        .replace(/\.?0+$/, '');

      return {
        type: 'gap',
        raw: match[0],
        height,
      };
    },
    renderer(token) {
      return (
        `<div class="md-gap" style="height:${token.height}em" ` +
        'aria-hidden="true"></div>\n'
      );
    },
  };

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

  function render(markdown) {
    const source = normalize(markdown);

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

    let lineMap = new WeakMap();
    for (const name of blockTypes) {
      const original = renderer[name];
      renderer[name] = function renderWithLine(token) {
        return addSourceLine(original.call(this, token), lineMap.get(token));
      };
    }

    const instance = new marked.Marked({ renderer });
    instance.use({ extensions: [gapExtension] });

    const tokens = instance.lexer(source);
    lineMap = computeTokenLines(tokens, source);

    return {
      html: instance.parser(tokens),
      source,
    };
  }

  window.DokaMarkdown = { render };
})();
