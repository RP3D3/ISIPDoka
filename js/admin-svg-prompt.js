/*
 * Адаптивный промпт для SVG hero-блока.
 *
 * Шаблон лежит в content/admin/prompty/svg.md. Скрипт подставляет текущую
 * палитру темы, контекст темы и (по желанию) текущий SVG для перекраски
 * без смены композиции.
 */
(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);

  const TEMPLATE_URL = new URL(
    'content/admin/prompty/svg.md',
    window.location.href
  ).href;
  const STRUCTURE_URL = new URL('data/structure.json', window.location.href).href;

  const DEFAULT_PALETTE = {
    text: '#ffffff',
    bg: '#222429',
    accent: '#6c47ff',
  };

  let templatePromise = null;
  let templateText = null;
  let structurePromise = null;
  let structureData = null;

  /* ================================================================ *
   * Данные темы и палитра                                             *
   * ================================================================ */

  function getPath() {
    return new URLSearchParams(window.location.search).get('path') || '';
  }

  function getDomainId() {
    const parts = getPath().split('/').filter(Boolean);
    return (parts[1] || '').toLowerCase();
  }

  function normalizeHex(value) {
    let hex = String(value || '').trim();
    if (/^#[0-9a-f]{3}$/i.test(hex)) {
      hex = '#' + hex.slice(1).split('').map((c) => c + c).join('');
    }
    return /^#[0-9a-f]{6}$/i.test(hex) ? hex.toLowerCase() : null;
  }

  function cssColor(name, fallback) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return normalizeHex(value) || fallback;
  }

  function hexToRgb(hex) {
    const value = normalizeHex(hex);
    if (!value) return null;
    const n = parseInt(value.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function relativeLuminance(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const channel = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return (
      0.2126 * channel(rgb.r) +
      0.7152 * channel(rgb.g) +
      0.0722 * channel(rgb.b)
    );
  }

  function contrastRatio(a, b) {
    const la = relativeLuminance(a);
    const lb = relativeLuminance(b);
    if (la == null || lb == null) return null;
    const hi = Math.max(la, lb);
    const lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  function accentTone(accent) {
    const lum = relativeLuminance(accent);
    if (lum == null) return 'средний';
    if (lum > 0.6) return 'светлый';
    if (lum < 0.25) return 'тёмный';
    return 'средний';
  }

  function bestOnAccent(accent, bg, text) {
    const vsText = contrastRatio(accent, text) ?? 0;
    const vsBg = contrastRatio(accent, bg) ?? 0;
    return vsText >= vsBg ? text : bg;
  }

  function accentNote(accent, bg, text) {
    const notes = [];

    const vsText = contrastRatio(accent, text);
    const vsBg = contrastRatio(accent, bg);

    if (vsText != null && vsText < 3) {
      notes.push(
        'На белой подложке этот акцент слабый — используй его на тёмных плашках.'
      );
      notes.push(
        'Светлый `var(--text-main, ' + text + ')` на фоне акцента тоже слабый (контраст ' +
          vsText.toFixed(2) +
          ':1): не рассчитывай на белые контуры без тёмной подложки.'
      );
    }
    if (vsBg != null && vsBg < 3) {
      notes.push(
        'На тёмной подложке этот акцент слабый — используй его на белых плашках.'
      );
      notes.push(
        'Тёмный `var(--bg-main, ' + bg + ')` на фоне акцента тоже близок по яркости (контраст ' +
          vsBg.toFixed(2) +
          ':1): обводи тёмные фигуры светлым `var(--text-main, ' + text + ')` или размещай их на светлой плашке.'
      );
    }
    if (vsText != null && vsBg != null && vsText < 3 && vsBg < 3) {
      notes.push(
        'Акцент близок и к белому, и к тёмному — оставь его только для тонких деталей с контрастной обводкой.'
      );
    }
    if (!notes.length) {
      notes.push(
        'Акцент контрастен и светлой, и тёмной подложке; всё равно используй его только на плашках, потому что фон hero — тот же акцент.'
      );
    }

    return notes.join(' ');
  }

  function currentPalette() {
    const text = cssColor('--text-main', DEFAULT_PALETTE.text);
    const bg = cssColor('--bg-main', DEFAULT_PALETTE.bg);
    const domainId = getDomainId();
    const accent =
      normalizeHex(structureData?.[domainId]?.accent) ||
      cssColor('--domain-accent', DEFAULT_PALETTE.accent);

    return { text, bg, accent, domainId };
  }

  function currentSvg() {
    const field = $('fieldSvg');
    return field ? field.value.trim() : '';
  }

  function updateRecolorState() {
    const recolor = $('svgPromptRecolor');
    if (!recolor) return;

    const hasSvg = Boolean(currentSvg());
    recolor.disabled = !hasSvg;
    if (!hasSvg) recolor.checked = false;
  }

  function syncSvgFromModal() {
    const modalSvg = $('svgPromptSvg');
    const field = $('fieldSvg');
    if (!modalSvg || !field) return;

    if (field.value !== modalSvg.value) {
      field.value = modalSvg.value;
      field.dispatchEvent(new Event('input', { bubbles: true }));
    }

    updateRecolorState();
    updateMeta();
  }

  let promptUpdateTimer = null;

  function schedulePromptUpdate() {
    clearTimeout(promptUpdateTimer);
    promptUpdateTimer = setTimeout(() => {
      updatePrompt();
    }, 350);
  }

  function summaryFromMarkdown(markdown) {
    const lines = String(markdown || '').split(/\r?\n/);
    let seenH1 = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!seenH1) {
        if (/^#\s+/.test(trimmed)) seenH1 = true;
        continue;
      }
      if (!trimmed) continue;
      if (/^(#{1,6}\s|```|~~~|[-*+]\s|\d+[.)]\s|>)/.test(trimmed)) break;
      return trimmed.replace(/[*_`]/g, '');
    }

    return '';
  }

  /* ================================================================ *
   * Загрузка шаблона и структуры                                      *
   * ================================================================ */

  function loadTemplate() {
    if (templateText) return Promise.resolve(templateText);
    if (templatePromise) return templatePromise;

    templatePromise = fetch(TEMPLATE_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            'Не удалось загрузить content/admin/prompty/svg.md (HTTP ' +
              res.status +
              ')'
          );
        }
        return res.text();
      })
      .then((text) => {
        // В файле есть YAML frontmatter — в промпт он не нужен.
        templateText = text.replace(
          /^---\s*\r?\n[\s\S]*?\r?\n---\s*\r?\n?/,
          ''
        );
        return templateText;
      })
      .finally(() => {
        templatePromise = null;
      });

    return templatePromise;
  }

  function loadStructure() {
    if (structureData) return Promise.resolve(structureData);
    if (structurePromise) return structurePromise;

    structurePromise = fetch(STRUCTURE_URL, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => ({}))
      .then((data) => {
        structureData = data && typeof data === 'object' ? data : {};
        return structureData;
      })
      .finally(() => {
        structurePromise = null;
      });

    return structurePromise;
  }

  /* ================================================================ *
   * Сборка промпта                                                    *
   * ================================================================ */

  function buildRecolorBlock(svg, palette) {
    if (!svg) return '';

    return [
      '# Режим: перекраска текущей иллюстрации',
      '',
      'Не меняй композицию, геометрию, текст, пропорции и анимации. Замени только цвета:',
      '- белые/светлые элементы → `var(--text-main, ' + palette.text + ')`;',
      '- тёмные/чёрные элементы → `var(--bg-main, ' + palette.bg + ')`;',
      '- прежний акцентный/сигнальный цвет → `var(--domain-accent, ' + palette.accent + ')`, но только если элемент лежит на белой или тёмной плашке. Если акцентный элемент лежит прямо на фоне hero, переведи его на `var(--text-main)` / `var(--bg-main)` или добавь контрастную плашку/обводку;',
      '- сохрани читаемость и контраст. Верни только обновлённый `<svg>...</svg>`.',
      '',
      'Текущий SVG:',
      '',
      '~~~svg',
      svg,
      '~~~',
    ].join('\n');
  }

  function fillTemplate(template, values) {
    let out = template;
    for (const [key, value] of Object.entries(values)) {
      out = out.split('{{' + key + '}}').join(String(value));
    }
    return out;
  }

  function buildPrompt() {
    const palette = currentPalette();
    const structure = structureData || {};
    const domainTitle = structure[palette.domainId]?.title || palette.domainId || 'не указана';
    const recolor = Boolean($('svgPromptRecolor')?.checked);
    const svg = currentSvg();
    const style = $('svgPromptStyle')?.value || '4';
    const animation = $('svgPromptAnimation')?.value || 'Да';

    const description =
      ($('fieldDescription')?.value || '').trim() ||
      summaryFromMarkdown($('fieldMarkdown')?.value || '') ||
      '—';

    const template = templateText || '';
    const hasRecolorPlaceholder = template.includes('{{RECOLOR_BLOCK}}');

    let prompt = fillTemplate(template, {
      TITLE: ($('fieldTitle')?.value || '').trim() || 'Без названия',
      DESCRIPTION: description,
      KEYWORDS: ($('fieldKeywords')?.value || '').trim() || '—',
      DOMAIN: palette.domainId ? domainTitle + ' (' + palette.domainId + ')' : 'не указана',
      STYLE: style,
      ANIMATION: animation,
      TEXT_HEX: palette.text,
      BG_HEX: palette.bg,
      ACCENT_HEX: palette.accent,
      ON_ACCENT_HEX: bestOnAccent(palette.accent, palette.bg, palette.text),
      ACCENT_NOTE: accentNote(palette.accent, palette.bg, palette.text),
      RECOLOR_BLOCK: recolor ? buildRecolorBlock(svg, palette) : '',
    });

    // Если шаблон статичный (без плейсхолдера), всё равно даём
    // возможность дописать блок перекраски.
    if (recolor && !hasRecolorPlaceholder) {
      prompt += '\n\n' + buildRecolorBlock(svg, palette);
    }

    return prompt;
  }

  function updateTemplateControls() {
    const template = templateText || '';
    const options = document.querySelector('.admin-svg-prompt-options');
    if (!options) return;

    options.hidden = !(
      template.includes('{{STYLE}}') || template.includes('{{ANIMATION}}')
    );
  }

  /* ================================================================ *
   * Хардкод-цвета в текущем SVG                                       *
   * ================================================================ */

  function findHardcodedColors(svg) {
    if (!svg) return [];

    // Fallback внутри var(--x, #hex) — это не хардкод.
    const withoutFallbacks = svg.replace(
      /var\(\s*--[\w-]+\s*,\s*#[0-9a-f]{3,8}\s*\)/gi,
      ''
    );
    const found = withoutFallbacks.match(/#[0-9a-f]{6}\b/gi) || [];
    return [...new Set(found.map((hex) => hex.toLowerCase()))];
  }

  /* ================================================================ *
   * Модалка                                                           *
   * ================================================================ */

  function updateMeta() {
    const palette = currentPalette();
    const structure = structureData || {};
    const domainTitle = structure[palette.domainId]?.title || palette.domainId || 'не указана';
    const meta = $('svgPromptMeta');
    const warn = $('svgPromptWarn');

    if (meta) {
      meta.textContent =
        'Палитра: фон ' + palette.bg +
        ' · текст ' + palette.text +
        ' · акцент ' + palette.accent +
        ' (' + accentTone(palette.accent) + ', текст на акценте ' +
        bestOnAccent(palette.accent, palette.bg, palette.text) + ')' +
        ' · область: ' + domainTitle;
    }

    if (warn) {
      const hardcoded = findHardcodedColors(currentSvg());
      if (!currentSvg()) {
        warn.textContent = '';
      } else if (hardcoded.length) {
        warn.textContent =
          'В текущем SVG есть хардкод-цвета: ' + hardcoded.join(', ') +
          '. Включите «Перекрасить текущую», чтобы промпт попросил заменить их на переменные.';
      } else {
        warn.textContent = '';
      }
    }
  }

  function updatePrompt() {
    const textarea = $('svgPromptText');
    if (!textarea) return;

    if (!templateText) {
      textarea.value = 'Загружаю шаблон промпта…';
      return;
    }

    updateTemplateControls();
    textarea.value = buildPrompt();
    textarea.scrollTop = 0;
    textarea.setSelectionRange(0, 0);
    requestAnimationFrame(() => {
      textarea.scrollTop = 0;
    });
    updateMeta();
  }

  async function openModal() {
    const modal = $('svgPromptModal');
    if (!modal) return;

    modal.hidden = false;
    document.body.classList.add('doka-modal-open');

    const modalSvg = $('svgPromptSvg');
    if (modalSvg) modalSvg.value = currentSvg();
    updateRecolorState();

    const status = $('svgPromptStatus');
    if (status) status.textContent = '';

    try {
      await Promise.all([loadTemplate(), loadStructure()]);
      updatePrompt();
    } catch (error) {
      const textarea = $('svgPromptText');
      if (textarea) textarea.value = '';
      if (status) {
        status.textContent =
          'Не удалось собрать промпт: ' + (error?.message || error);
      }
    }

    requestAnimationFrame(() => $('svgPromptCopy')?.focus());
  }

  function closeModal() {
    syncSvgFromModal();

    const modal = $('svgPromptModal');
    if (modal) modal.hidden = true;
    document.body.classList.remove('doka-modal-open');
    $('svgPromptBtn')?.focus();
  }

  function saveAndClose() {
    syncSvgFromModal();
    closeModal();

    const saveButton = $('adminSave');
    if (saveButton && !saveButton.disabled) {
      saveButton.click();
    }
  }

  async function copyPrompt() {
    const textarea = $('svgPromptText');
    const status = $('svgPromptStatus');
    const button = $('svgPromptCopy');
    const label = button ? button.textContent : '';
    const text = textarea ? textarea.value : '';

    if (!text.trim()) {
      if (status) status.textContent = 'Промпт ещё не готов.';
      return;
    }

    try {
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch (_) {
          /* ниже попробуем старый способ */
        }
      }

      if (!copied) {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        if (!ok) throw new Error('Браузер запретил копирование');
      }

      if (status) status.textContent = 'Промпт скопирован.';
      if (button) {
        button.textContent = '✓ Скопировано';
        setTimeout(() => {
          button.textContent = label;
        }, 1600);
      }
    } catch (error) {
      if (status) {
        status.textContent =
          'Не удалось скопировать: ' + (error?.message || error);
      }
    }
  }

  /* ================================================================ *
   * Запуск                                                           *
   * ================================================================ */

  function init() {
    const openButton = $('svgPromptBtn');
    if (!openButton) return;

    openButton.addEventListener('click', openModal);
    $('svgPromptCloseX')?.addEventListener('click', closeModal);
    $('svgPromptCloseBtn')?.addEventListener('click', closeModal);
    $('svgPromptCopy')?.addEventListener('click', copyPrompt);
    $('svgPromptSave')?.addEventListener('click', saveAndClose);
    $('svgPromptRecolor')?.addEventListener('change', updatePrompt);
    $('svgPromptStyle')?.addEventListener('change', updatePrompt);
    $('svgPromptAnimation')?.addEventListener('change', updatePrompt);
    $('svgPromptSvg')?.addEventListener('input', () => {
      syncSvgFromModal();
      if ($('svgPromptRecolor')?.checked) schedulePromptUpdate();
    });

    const modal = $('svgPromptModal');
    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
      });
      modal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeModal();
        }
      });
    }

    // Прогреваем шаблон, чтобы модалка открывалась без задержки.
    loadTemplate().catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
