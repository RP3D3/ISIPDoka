/*
 * Футер со статистикой сайта.
 *
 * Подключается на index.html, domain.html и admin.html после js/admin.js.
 * Показывается только когда доступен локальный админ-бэкенд и включён
 * админ-режим (в режиме просмотра его скрывает CSS).
 *
 * index.html — футер виден всегда.
 * domain.html и admin.html — только если есть проблемы (нужна векторизация).
 *
 * Данные берутся из /api/admin/stats (см. scripts/dev-server.js):
 * количество тем/векторов, потери контекста, ключевые слова и статус
 * векторизации.
 */
(() => {
  'use strict';

  const Admin = window.DokaAdmin;
  if (!Admin) return;

  const escapeHtml = Admin.escapeHtml || ((value) => String(value ?? ''));
  const api = Admin.api;
  const toast = Admin.toast;

  const PAGE_KIND = (() => {
    const file = (
      window.location.pathname.split('/').pop() || 'index.html'
    ).toLowerCase();
    if (file === '' || file === 'index.html') return 'index';
    if (file === 'domain.html') return 'domain';
    if (file === 'admin.html') return 'admin';
    return 'other';
  })();

  let footer = null;
  let loaded = false;
  let lastStats = null;
  let activeDomain = 'all';

  function formatNumber(value) {
    return Number(value || 0).toLocaleString('ru-RU');
  }

  function pluralRu(count, one, few, many) {
    const value = Math.abs(Number(count) || 0);
    const mod100 = value % 100;
    const mod10 = value % 10;
    if (mod100 > 10 && mod100 < 20) return many;
    if (mod10 === 1) return one;
    if (mod10 >= 2 && mod10 <= 4) return few;
    return many;
  }

  function topicsWord(count) {
    return pluralRu(count, 'тема', 'темы', 'тем');
  }

  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function statsItem(label, value, hint) {
    return (
      '<div class="doka-stats-item"' +
      (hint ? ` title="${escapeHtml(hint)}"` : '') +
      `><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`
    );
  }

  function statsList(items, renderItem) {
    if (!items || !items.length) return '';
    return (
      '<ul class="doka-stats-list">' +
      items.map((item) => `<li>${renderItem(item)}</li>`).join('') +
      '</ul>'
    );
  }

  function shouldShowFooter(data) {
    if (!data) return false;
    if (PAGE_KIND === 'index') return true;
    if (PAGE_KIND === 'domain' || PAGE_KIND === 'admin') {
      return Boolean(data.needsEmbeddings);
    }
    return false;
  }

  function renderFooter(data) {
    if (!footer) return;

    const context = data.context || {};
    const keywords = data.keywords || {};
    const ok = !data.needsEmbeddings;

    const chips = footer.querySelector('[data-role="chips"]');
    chips.innerHTML = [
      statsItem('тем', formatNumber(data.topics)),
      statsItem('векторов', formatNumber(data.vectors)),
      statsItem(
        'контекст',
        formatNumber(context.totalChars) + ' симв.',
        'Суммарно по всем темам'
      ),
      statsItem(
        'потеряно',
        formatNumber(context.lostChars) + ' симв.',
        `Лимит сборки: ${context.limitChars} символов на одну тему`
      ),
      statsItem('ключ. слов', `${keywords.min ?? 0}–${keywords.max ?? 0}`),
    ].join('');

    const status = footer.querySelector('[data-role="status"]');
    status.className = 'doka-stats-status ' + (ok ? 'is-ok' : 'is-warn');
    status.textContent = ok ? '✓ Векторы актуальны' : '⚠ Нужна векторизация';
    status.title = ok ? '' : (data.reasons || []).join('; ');

    const show = shouldShowFooter(data);
    footer.hidden = !show;
    document.body.classList.toggle('doka-has-stats', show);
  }

  /* ====================================================================== *
   * Темы: фильтры по областям, группы и превышения                        *
   * ====================================================================== */

  function topicLimit(topic) {
    return Number(topic.limit) || 6000;
  }

  function topicGroups(topics) {
    const map = new Map();

    for (const topic of topics) {
      const domainId = topic.domainId || topic.domain || 'other';
      const group = topic.group || '';
      const key = `${domainId}::${group}`;
      if (!map.has(key)) {
        map.set(key, {
          key,
          domain: topic.domain || domainId,
          group,
          topics: [],
        });
      }
      map.get(key).topics.push(topic);
    }

    const groups = [...map.values()];
    for (const group of groups) {
      group.topics.sort((a, b) => {
        const aOver = a.chars > topicLimit(a) ? 1 : 0;
        const bOver = b.chars > topicLimit(b) ? 1 : 0;
        if (aOver !== bOver) return bOver - aOver;
        return b.chars - a.chars;
      });
      group.hasOver = group.topics.some((t) => t.chars > topicLimit(t));
      group.maxChars = Math.max(...group.topics.map((t) => t.chars));
    }

    // Группа с превышением — всегда выше; дальше по длине темы.
    groups.sort((a, b) => {
      if (a.hasOver !== b.hasOver) return a.hasOver ? -1 : 1;
      if (b.maxChars !== a.maxChars) return b.maxChars - a.maxChars;
      return `${a.domain} ${a.group}`.localeCompare(
        `${b.domain} ${b.group}`,
        'ru'
      );
    });

    return groups;
  }

  function topicItemHtml(item) {
    const limit = topicLimit(item);
    const over = item.chars > limit;
    const percent =
      item.percent ?? Math.min(100, Math.round((item.chars / limit) * 100));
    const remaining = Math.max(0, limit - item.chars);

    return (
      `<li class="${over ? 'is-over' : ''}">` +
      '<div class="doka-stats-topic-head">' +
      `<b>${escapeHtml(item.title || item.url)}` +
      (over
        ? `<span class="doka-stats-over-badge">+${formatNumber(item.chars - limit)}</span>`
        : '') +
      '</b>' +
      `<span>${formatNumber(item.chars)} / ${formatNumber(limit)} · осталось ${formatNumber(remaining)}</span>` +
      '</div>' +
      `<div class="doka-stats-bar"><i style="width:${percent}%"></i></div>` +
      '</li>'
    );
  }

  function smartRowHtml(label, current, capacity, over, active) {
    const percent = capacity
      ? Math.round((current / capacity) * 100)
      : 0;
    const barPercent = Math.min(100, percent);
    return (
      `<div class="doka-stats-smart-row${over ? ' is-over' : ''}${
        active ? ' is-active' : ''
      }">` +
      '<div class="doka-stats-smart-head">' +
      `<b>${escapeHtml(label)}</b>` +
      `<span>${formatNumber(current)} / ${formatNumber(capacity)} симв. · ${percent}%</span>` +
      '</div>' +
      `<div class="doka-stats-smart-bar"><i style="width:${barPercent}%"></i></div>` +
      '</div>'
    );
  }

  function renderSmartDomains(topics) {
    const domains = new Map();
    let totalChars = 0;
    let totalLimit = 0;
    let totalOver = false;

    for (const topic of topics) {
      const id = topic.domainId || topic.domain || 'other';
      const limit = topicLimit(topic);
      if (!domains.has(id)) {
        domains.set(id, {
          id,
          title: topic.domain || id,
          chars: 0,
          limit: 0,
          over: false,
        });
      }
      const entry = domains.get(id);
      entry.chars += topic.chars;
      entry.limit += limit;
      if (topic.chars > limit) entry.over = true;

      totalChars += topic.chars;
      totalLimit += limit;
      if (topic.chars > limit) totalOver = true;
    }

    const rows = [
      smartRowHtml(
        'Все области',
        totalChars,
        totalLimit,
        totalOver,
        activeDomain === 'all'
      ),
      ...[...domains.values()]
        .sort((a, b) => b.chars - a.chars)
        .map((domain) =>
          smartRowHtml(
            domain.title,
            domain.chars,
            domain.limit,
            domain.over,
            activeDomain === domain.id
          )
        ),
    ];

    return (
      '<p class="doka-stats-smart-title">Смарт-папки · текущий объём / лимит</p>' +
      rows.join('')
    );
  }

  function renderTopicsSection() {
    const modal = document.getElementById('dokaStatsModal');
    if (!modal || !lastStats) return;

    const topics = lastStats.context?.topics || [];
    const filterHost = modal.querySelector('[data-role="domain-filters"]');
    const smart = modal.querySelector('[data-role="smart-domains"]');
    const scroll = modal.querySelector('[data-role="topics-scroll"]');
    if (!filterHost || !smart || !scroll) return;

    const domains = new Map();
    for (const topic of topics) {
      const id = topic.domainId || topic.domain || 'other';
      if (!domains.has(id)) {
        domains.set(id, {
          id,
          title: topic.domain || id,
          count: 0,
          limit: 0,
        });
      }
      const entry = domains.get(id);
      entry.count += 1;
      entry.limit += topicLimit(topic);
    }

    if (activeDomain !== 'all' && !domains.has(activeDomain)) {
      activeDomain = 'all';
    }

    const totalLimit = topics.reduce(
      (sum, topic) => sum + topicLimit(topic),
      0
    );

    const chips = [
      `<button type="button" class="doka-stats-filter${
        activeDomain === 'all' ? ' is-active' : ''
      }" data-domain="all" title="Все темы: ${topics.length}, лимит ${formatNumber(
        totalLimit
      )} симв.">Все <span>${topics.length}</span></button>`,
      ...[...domains.values()].map(
        (domain) =>
          `<button type="button" class="doka-stats-filter${
            activeDomain === domain.id ? ' is-active' : ''
          }" data-domain="${escapeHtml(domain.id)}" title="${escapeHtml(
            domain.title
          )}: ${domain.count} ${topicsWord(domain.count)}, лимит ${formatNumber(
            domain.limit
          )} симв.">${escapeHtml(domain.title)} <span>${
            domain.count
          }</span></button>`
      ),
    ];
    filterHost.innerHTML = chips.join('');
    smart.innerHTML = renderSmartDomains(topics);

    const visible =
      activeDomain === 'all'
        ? topics
        : topics.filter(
            (topic) =>
              (topic.domainId || topic.domain || 'other') === activeDomain
          );

    if (!visible.length) {
      scroll.innerHTML =
        '<p class="doka-stats-note">В этой выборке нет тем.</p>';
      return;
    }

    scroll.innerHTML = topicGroups(visible)
      .map(
        (group) =>
          '<section class="doka-stats-group">' +
          '<p class="doka-stats-group-title">' +
          `<span>${escapeHtml(group.domain)}${
            group.group ? ' · ' + escapeHtml(group.group) : ''
          }</span>` +
          `<small>${group.topics.length} ${topicsWord(
            group.topics.length
          )}</small>` +
          '</p>' +
          '<ul class="doka-stats-topics">' +
          group.topics.map(topicItemHtml).join('') +
          '</ul>' +
          '</section>'
      )
      .join('');
  }

  function renderModal(data) {
    const modal = document.getElementById('dokaStatsModal');
    if (!modal) return;

    const body = modal.querySelector('[data-role="body"]');
    const context = data.context || {};
    const keywords = data.keywords || {};
    const missing = data.missingVectors || [];
    const orphan = data.orphanVectors || [];
    const truncated = context.truncatedTopics || [];
    const topicsContext = context.topics || [];
    const longest = topicsContext[0] || null;
    const overloaded = keywords.overloaded || [];
    const reasons = data.reasons || [];

    lastStats = data;

    body.innerHTML = `
      <div class="doka-stats-grid">
        ${statsItem('Области', String(data.domains))}
        ${statsItem('Группы', String(data.groups))}
        ${statsItem('Темы', String(data.topics))}
        ${statsItem(
          'Векторы',
          data.vectors + (data.dimensions ? ` × ${data.dimensions}` : '')
        )}
      </div>

      <h3>Контекст</h3>
      <p>
        Суммарно по всем темам: <b>${formatNumber(context.totalChars)}</b>
        символов в ${data.topics} темах. Лимит
        <b>${formatNumber(context.limitChars)}</b> действует на
        <b>каждую тему отдельно</b>, а не на весь сайт.
      </p>
      <p>
        ${
          context.lostChars
            ? `Потеряно <b>${formatNumber(context.lostChars)}</b> (${context.lostPercent}%).`
            : 'Потерь нет: все темы укладываются в лимит.'
        }
      </p>
      ${
        longest
          ? `<p>Самая длинная тема: <b>${escapeHtml(longest.title || longest.url)}</b> — ${formatNumber(longest.chars)} из ${formatNumber(longest.limit)} символов, осталось <b>${formatNumber(longest.remaining)}</b>.</p>`
          : ''
      }
      <p class="doka-stats-note">
        ${formatNumber(context.limitChars)} символов — лимит сборки на одну
        тему. ${
          context.modelMaxTokens
            ? `Модель читает до ${formatNumber(context.modelMaxTokens)} токенов — это отдельное ограничение, токены не равны символам.`
            : ''
        }
      </p>
      ${
        topicsContext.length
          ? '<h3>Использование контекста по темам</h3>' +
            '<div class="doka-stats-smart" data-role="smart-domains"></div>' +
            '<button type="button" class="doka-stats-more" data-role="toggle-topics" aria-expanded="false">Подробнее</button>' +
            '<div class="doka-stats-topics-panel" data-role="topics-panel" hidden>' +
            '<div class="doka-stats-filters" data-role="domain-filters"></div>' +
            '<div class="doka-stats-topics-scroll" data-role="topics-scroll"></div>' +
            '</div>'
          : ''
      }
      ${
        truncated.length
          ? '<h3>Обрезанные темы</h3>' +
            statsList(
              truncated,
              (item) =>
                `<b>${escapeHtml(item.title || item.url)}</b> — ` +
                `${formatNumber(item.chars)} симв., потеряно ${formatNumber(item.lost)}`
            )
          : ''
      }

      <h3>Ключевые слова</h3>
      <p>
        Мин: <b>${keywords.min ?? 0}</b> ·
        Макс: <b>${keywords.max ?? 0}</b> ·
        Среднее: <b>${keywords.avg ?? 0}</b> ·
        Без слов: <b>${keywords.empty ?? 0}</b>
      </p>
      ${
        overloaded.length
          ? '<p class="doka-stats-warn">Слишком много слов (&gt; 20):</p>' +
            statsList(
              overloaded,
              (item) =>
                `<a class="doka-stats-topic-link" href="admin.html?path=${encodeURIComponent(
                  item.url
                )}" target="_blank" rel="noopener" title="Открыть в редакторе">${escapeHtml(
                  item.title || item.url
                )}</a> — ${item.count}`
            )
          : ''
      }

      <h3>Статус векторизации</h3>
      ${
        data.needsEmbeddings
          ? `<p class="doka-stats-warn">Требуется: ${escapeHtml(reasons.join('; '))}</p>`
          : '<p class="doka-stats-ok">Всё актуально.</p>'
      }
      ${
        missing.length
          ? `<h3>Нет векторов (${missing.length})</h3>` +
            statsList(
              missing,
              (item) =>
                `<b>${escapeHtml(item.title || item.url)}</b> — ${escapeHtml(item.url)}`
            )
          : ''
      }
      ${
        orphan.length
          ? `<h3>Лишние векторы (${orphan.length})</h3>` +
            statsList(
              orphan,
              (item) =>
                `<b>${escapeHtml(item.title || item.url)}</b> — ${escapeHtml(item.url)}`
            )
          : ''
      }

      <h3>Файлы</h3>
      <p class="doka-stats-note">
        structure.json: ${formatDate(data.files?.structureMtime)}<br>
        embeddings.json: ${formatDate(data.files?.embeddingsMtime)}<br>
        свежий контент: ${formatDate(data.files?.newestContentMtime)}
      </p>
      <p class="doka-stats-note">Обновлено: ${formatDate(data.generatedAt)}</p>
    `;

    if (topicsContext.length) {
      activeDomain = 'all';
      renderTopicsSection();
    }
  }

  function ensureModal() {
    let modal = document.getElementById('dokaStatsModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'dokaStatsModal';
    modal.className = 'doka-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="doka-modal-card doka-stats-card" role="dialog" aria-modal="true" aria-labelledby="dokaStatsTitle">
        <h2 id="dokaStatsTitle">Статистика сайта</h2>
        <p class="doka-modal-desc">
          Темы, векторы и контекст. Данные отдаёт локальный dev-сервер.
        </p>
        <div class="doka-stats-body" data-role="body"></div>
        <p class="doka-modal-error" data-role="error" aria-live="polite"></p>
        <div class="doka-modal-actions">
          <button type="button" class="doka-btn doka-btn-ghost" data-role="refresh">Обновить</button>
          <button type="button" class="doka-btn doka-btn-ghost" data-role="close">Закрыть</button>
          <button type="button" class="doka-btn doka-btn-primary" data-role="rebuild">Пересобрать векторы</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
    modal
      .querySelector('[data-role="close"]')
      .addEventListener('click', closeModal);
    modal
      .querySelector('[data-role="refresh"]')
      .addEventListener('click', () => loadStats({ modal: true }));
    modal
      .querySelector('[data-role="rebuild"]')
      .addEventListener('click', rebuildStats);

    // Делегирование для кнопок-фильтров: innerHTML обновляется, а сам
    // контейнер body остаётся тем же.
    modal
      .querySelector('[data-role="body"]')
      .addEventListener('click', (event) => {
        const link = event.target.closest('.doka-stats-topic-link');
        if (link) {
          closeModal();
          return;
        }
        const toggle = event.target.closest('[data-role="toggle-topics"]');
        if (toggle) {
          const panel = modal.querySelector('[data-role="topics-panel"]');
          if (panel) {
            const opening = panel.hidden;
            panel.hidden = !opening;
            toggle.textContent = opening ? 'Свернуть' : 'Подробнее';
            toggle.setAttribute('aria-expanded', String(opening));
          }
          return;
        }
        const button = event.target.closest('.doka-stats-filter');
        if (!button) return;
        activeDomain = button.dataset.domain || 'all';
        renderTopicsSection();
      });

    return modal;
  }

  async function loadStats(options = {}) {
    if (!(await Admin.ready())) return;

    const modal = options.modal ? ensureModal() : null;
    if (modal) {
      modal.hidden = false;
      document.body.classList.add('doka-modal-open');
      modal.querySelector('[data-role="error"]').textContent = '';
    }

    try {
      const data = await api('/api/admin/stats');
      loaded = true;
      renderFooter(data);
      if (modal) renderModal(data);
    } catch (error) {
      if (modal) {
        modal.querySelector('[data-role="error"]').textContent =
          error?.message || String(error);
      } else if (!loaded) {
        console.warn('[admin-stats] статистика недоступна:', error);
      }
    }
  }

  async function openModal() {
    await loadStats({ modal: true });
  }

  function closeModal() {
    const modal = document.getElementById('dokaStatsModal');
    if (modal) modal.hidden = true;
    document.body.classList.remove('doka-modal-open');
  }

  async function rebuildStats() {
    const modal = ensureModal();
    const button = modal.querySelector('[data-role="rebuild"]');
    const errorEl = modal.querySelector('[data-role="error"]');
    if (button.disabled) return;

    const label = button.textContent;
    button.disabled = true;
    button.textContent = 'Векторизация…';
    errorEl.textContent = '';

    try {
      await api('/api/admin/rebuild', {
        method: 'POST',
        body: { embeddings: true },
      });
      if (toast) toast('Векторы пересобраны.', 'success');
      await loadStats({ modal: true });
    } catch (error) {
      errorEl.textContent = error?.message || String(error);
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  }

  function mount() {
    if (footer) {
      loadStats();
      return;
    }

    footer = document.createElement('footer');
    footer.className = 'doka-stats-footer';
    footer.hidden = true;
    footer.innerHTML = `
      <div class="doka-stats-main">
        <span class="doka-stats-brand">Дока · статистика</span>
        <span class="doka-stats-chips" data-role="chips"></span>
        <span class="doka-stats-status" data-role="status"></span>
      </div>
      <div class="doka-stats-actions">
        <button type="button" class="doka-stats-btn" data-role="refresh" title="Обновить статистику">↻</button>
        <button type="button" class="doka-stats-btn doka-stats-btn--primary" data-role="details">Подробнее</button>
      </div>
    `;

    document.body.appendChild(footer);
    footer
      .querySelector('[data-role="refresh"]')
      .addEventListener('click', () => loadStats());
    footer
      .querySelector('[data-role="details"]')
      .addEventListener('click', openModal);

    loadStats();
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const modal = document.getElementById('dokaStatsModal');
    if (modal && !modal.hidden) {
      event.preventDefault();
      closeModal();
    }
  });

  Admin.ready().then((available) => {
    if (available) mount();
  });
})();
