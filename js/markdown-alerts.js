/*
 * GitHub-style alerts для markdown, который рендерит marked.js.
 *
 * Поддерживается синтаксис:
 *   > [!NOTE]
 *   > Текст
 *
 * Теги: NOTE, TIP, IMPORTANT, WARNING, CAUTION (регистр не важен).
 * Вложенные alert-блоки не поддерживаются.
 */
(() => {
  'use strict';

  const TITLES = {
    NOTE: 'Примечание',
    TIP: 'Совет',
    IMPORTANT: 'Важно',
    WARNING: 'Внимание',
    CAUTION: 'Осторожно',
  };

  const MARKER_RE = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i;

  function textNodes(root) {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      nodes.push(node);
      node = walker.nextNode();
    }
    return nodes;
  }

  function stripMarker(paragraph, match) {
    let remaining = match[0].length;

    for (const node of textNodes(paragraph)) {
      if (remaining <= 0) break;
      const value = node.nodeValue || '';
      if (remaining >= value.length) {
        remaining -= value.length;
        node.nodeValue = '';
      } else {
        node.nodeValue = value.slice(remaining);
        remaining = 0;
      }
    }

    if (!paragraph.textContent.trim()) paragraph.remove();
  }

  function enhance(root) {
    if (!root) return;

    // Снимок нужен, потому что blockquote заменяются на div во время обхода.
    for (const quote of Array.from(root.querySelectorAll('blockquote'))) {
      // Вложенные alert-блоки не поддерживаем.
      if (quote.closest('.markdown-alert')) continue;

      const first = quote.firstElementChild;
      if (!first || first.tagName !== 'P') continue;

      const match = (first.textContent || '').match(MARKER_RE);
      if (!match) continue;

      const type = match[1].toUpperCase();
      stripMarker(first, match);

      const alert = document.createElement('div');
      alert.className =
        'markdown-alert markdown-alert-' + type.toLowerCase();

      const title = document.createElement('p');
      title.className = 'markdown-alert-title';
      title.textContent = TITLES[type];
      alert.appendChild(title);

      while (quote.firstChild) {
        alert.appendChild(quote.firstChild);
      }

      quote.replaceWith(alert);
    }
  }

  window.DokaMarkdownAlerts = { enhance };
})();
