/*
 * Модальное руководство по Markdown для админки.
 *
 * Мануал лежит в MANUAL.md — его можно править как обычный текст.
 * Кнопка «Скопировать мануал» копирует исходный Markdown целиком.
 */
(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const MANUAL_URL = new URL('MANUAL.md', window.location.href).href;

  let manualPromise = null;
  let manualText = null;

  function loadManual() {
    if (manualText) return Promise.resolve(manualText);
    if (manualPromise) return manualPromise;

    manualPromise = fetch(MANUAL_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Не удалось загрузить MANUAL.md (HTTP ' + res.status + ')');
        }
        return res.text();
      })
      .then((text) => {
        manualText = text;
        return text;
      })
      .finally(() => {
        manualPromise = null;
      });

    return manualPromise;
  }

  async function renderManual() {
    const body = $('guideBody');
    if (!body) return;

    body.innerHTML = '<p class="admin-guide-loading">Загружаю мануал…</p>';

    try {
      const text = await loadManual();
      if (window.DokaMarkdown) {
        body.innerHTML = window.DokaMarkdown.render(text).html;
      } else {
        body.textContent = text;
      }
      if (window.DokaMarkdownAlerts) {
        window.DokaMarkdownAlerts.enhance(body);
      }
    } catch (error) {
      body.innerHTML =
        '<p class="doka-modal-error">' + escapeHtml(error.message) + '</p>';
    }
  }

  function openGuide() {
    const modal = $('guideModal');
    if (!modal) return;

    modal.hidden = false;
    document.body.classList.add('doka-modal-open');
    renderManual();
    requestAnimationFrame(() => $('guideCloseX')?.focus());
  }

  function closeGuide() {
    const modal = $('guideModal');
    if (modal) modal.hidden = true;
    document.body.classList.remove('doka-modal-open');
    $('adminInfoBtn')?.focus();
  }

  async function copyManual() {
    const status = $('guideStatus');
    const button = $('guideCopy');
    const label = button ? button.textContent : '';

    try {
      const text = await loadManual();
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

      if (status) status.textContent = 'Мануал скопирован.';
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

  function init() {
    const openButton = $('adminInfoBtn');
    if (!openButton) return;

    openButton.addEventListener('click', openGuide);
    $('guideCloseX')?.addEventListener('click', closeGuide);
    $('guideCloseBtn')?.addEventListener('click', closeGuide);
    $('guideCopy')?.addEventListener('click', copyManual);

    const modal = $('guideModal');
    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) closeGuide();
      });
      modal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeGuide();
        }
      });
    }

    // Прогреваем мануал, чтобы модалка открывалась без задержки.
    loadManual().catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
