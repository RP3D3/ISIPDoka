/* Гибридный поиск: мгновенный лексический (MiniSearch, fuzzy+prefix) +
 * семантический векторный слой (transformers.js + rubert-tiny2). Веса
 * модели загружаются лениво — при первом открытии окна поиска. Вся база
 * заранее векторизована (data/embeddings.json), в браузере вектора
 * считаются только для запроса.
 */
(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Пути: определяем корень сайта от адреса этого скрипта               *
   * (скрипт лежит в js/, страницы — на разных глубинах вложенности)     *
   * ------------------------------------------------------------------ */
  const scriptEl =
    document.currentScript || document.querySelector('script[src$="search.js"]');
  const libsDir = new URL('./libs/', scriptEl ? scriptEl.src : window.location.href);
  const siteRoot = new URL('../../', libsDir); // из js/libs/ поднимаемся на два уровня → корень сайта

  /* ------------------------------------------------------------------ *
   * Константы гибридного поиска                                         *
   * ------------------------------------------------------------------ */
  const AI_SEMANTIC_THRESHOLD = 0.45; // нижняя граница косинусной близости
  const AI_DEBOUNCE_MS = 250;         // пауза перед векторизацией запроса
  const MAX_RENDERED = 12;            // сколько пунктов показываем в списке

  /** Экранирование для вставки данных из structure.json в innerHTML. */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** URL темы из structure.json всегда относителен корня сайта. */
  function topicHref(url) {
    return new URL(url, siteRoot).href;
  }

  /** Markdown-тема (а не standalone .html) открывается через theme.html. */
  function isMarkdownTopic(item) {
    return item.type === 'md' || /\.md$/i.test(item.url || '');
  }

  /** Ссылка на тему: .md → theme.html?path=..., .html → напрямую. */
  function itemHref(item) {
    if (!isMarkdownTopic(item)) return topicHref(item.url);
    // encodeURI (а не encodeURIComponent) сохраняет слэши в пути.
    return new URL(`theme.html?path=${encodeURI(item.url)}`, siteRoot).href;
  }

  /**
   * Последовательная подгрузка UMD-бандлов (MiniSearch). Скрипт не требует
   * правок в HTML каждой страницы: если window.MiniSearch ещё не подключён
   * отдельным <script>, добавляем тег динамически.
   */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.onload = () => resolve();
      el.onerror = () => reject(new Error('Не удалось загрузить ' + src));
      document.head.appendChild(el);
    });
  }

  /* ------------------------------------------------------------------ *
   * Состояние                                                           *
   * ------------------------------------------------------------------ */
  let docs = [];               // плоский список тем: {title, domain, group, url, keywords}
  let miniIndex = null;        // MiniSearch-инстанс
  let embeddings = null;       // [{...,vec:Float32Array}] из data/embeddings.json
  let extractor = null;        // ИИ-пайплайн feature-extraction
  let extractorPromise = null; // чтобы не стартовать загрузку модели дважды
  let semanticState = 'idle';  // idle | loading | ready | error
  let debounceTimer = null;
  let aiStatusEl = null;
  let currentQuery = '';       // последний запрос, для защиты от гонки ответов

  const statusEl = () => aiStatusEl;

  /* ------------------------------------------------------------------ *
   * Загрузка базы + MiniSearch-индекс                                   *
   * ------------------------------------------------------------------ */
  async function loadDocs() {
    // гарантируем наличие MiniSearch (UMD-глобал) до создания индекса
    if (typeof MiniSearch === 'undefined') {
      await loadScript(new URL('minisearch.min.js', libsDir).href);
    }

    const res = await fetch(new URL('data/structure.json', siteRoot).href);
    if (!res.ok) throw new Error('structure.json: HTTP ' + res.status);
    const data = await res.json();

    // Применяем акцентные цвета всех доменов из structure.json.
    for (const [domainId, d] of Object.entries(data)) {
      if (d?.accent) {
        document.documentElement.style.setProperty(`--${domainId}-accent`, d.accent);
      }
    }

    // Для текущей страницы применяем --domain-accent (шапка и hero).
    const currentDomain = document.body.dataset.domain;
    const domain = currentDomain ? data[currentDomain] : null;
    if (domain?.accent) {
      document.documentElement.style.setProperty('--domain-accent', domain.accent);
    }

    docs = [];
    for (const [domainId, domain] of Object.entries(data)) {
      (domain.groups || []).forEach((group) => {
        (group.topics || []).forEach((topic) => {
          docs.push({
            title: topic.title || '',
            domain: domain.title || domainId,
            domainId,
            accent: domain.accent || '#6c47ff',
            group: group.name || '',
            url: topic.url,
            keywords: topic.keywords || '',
            type: topic.type || (/\.md$/i.test(topic.url || '') ? 'md' : 'html'),
            interactive: Boolean(topic.interactive),
          });
        });
      });
    }

    miniIndex = new MiniSearch({
      idField: 'url', // url уникален → естественно выступает в роли id документа
      fields: ['title', 'keywords', 'group', 'domain'],
      // группу и домен храним для вывода, но не несём в выдачу лишнего
      storeFields: ['title', 'domain', 'domainId', 'accent', 'group', 'url', 'keywords', 'type', 'interactive'],
      searchOptions: {
        boost: { title: 3, keywords: 1.5, group: 1 },
        prefix: true, //  «свич» → «switch», «переме… → «переменные»
        fuzzy: 0.2,   // опечатки: «стрка» → «строка»
      },
    });
    miniIndex.addAll(docs);
  }

  /* ------------------------------------------------------------------ *
   * Модель rubert-tiny2: склейка частей model.onnx.part_aa / .part_ab   *
   * ------------------------------------------------------------------ *
   * GitHub не принимает файлы больше 100 МБ, поэтому веса лежат в       *
   * репозитории двумя частями. transformers.js ищет единый model.onnx,  *
   * которого на диске нет. Скачиваем обе части, склеиваем их в Blob и   *
   * кладём готовый ответ в тот же кэш, который читает transformers.js.  *
   * ------------------------------------------------------------------ */
  const modelRootUrl = new URL('models/rubert-tiny2/', siteRoot);
  const modelDirUrl = new URL('onnx/', modelRootUrl);
  const modelUrl = new URL('model.onnx', modelDirUrl).href;
  // Порядок частей важен: файл склеивается именно в этой последовательности.
  const MODEL_PART_NAMES = ['part_aa', 'part_ab'];
  // Файлы, которые transformers.js читает рядом с весами. Их тоже нужно
  // положить в Cache API: иначе при повторном открытии поиска (особенно при
  // недоступной сети) tokenizer.json запрашивается заново и может вернуть 403.
  const MODEL_AUX_FILES = [
    'config.json',
    'tokenizer.json',
    'tokenizer_config.json',
  ];
  const MODEL_AUX_URLS = MODEL_AUX_FILES.map((name) => ({
    name,
    url: new URL(name, modelRootUrl).href,
  }));
  // Собственный кэш: подключаем его к transformers.js через env.customCache,
  // чтобы не зависеть от внутреннего имени кэша библиотеки.
  const MODEL_CACHE_NAME = 'rubert-local-cache-v1';

  function formatMb(bytes) {
    return (bytes / (1024 * 1024)).toFixed(1).replace('.', ',');
  }

  /** Прогресс скачивания в консоль (не чаще, чем раз в 10%). */
  function makeProgressLogger(label, total) {
    let nextMark = 10;
    return (loaded, done) => {
      if (!total) {
        if (done) console.log(`[model] ${label}: ${formatMb(loaded)} МБ`);
        return;
      }
      const pct = Math.min(100, Math.floor((loaded / total) * 100));
      if (done) {
        console.log(`[model] ${label}: ${formatMb(loaded)} МБ (100%)`);
      } else if (pct >= nextMark) {
        console.log(
          `[model] ${label}: ${pct}% (${formatMb(loaded)} / ${formatMb(total)} МБ)`
        );
        nextMark = Math.min(100, (Math.floor(pct / 10) + 1) * 10);
      }
    };
  }

  /** fetch с потоковым чтением и логом прогресса, возвращает Uint8Array. */
  async function downloadWithProgress(url, label) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${label}: HTTP ${res.status}`);

    const total = Number(res.headers.get('content-length')) || 0;
    const report = makeProgressLogger(label, total);

    // Старые браузеры без ReadableStream — читаем целиком.
    if (!res.body || typeof res.body.getReader !== 'function') {
      const buf = new Uint8Array(await res.arrayBuffer());
      report(buf.byteLength, true);
      return buf;
    }

    const reader = res.body.getReader();
    const chunks = [];
    let loaded = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.byteLength;
      report(loaded, false);
    }
    report(loaded, true);

    const out = new Uint8Array(loaded);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return out;
  }

  /**
   * Кладёт в Cache API config.json, tokenizer.json и tokenizer_config.json. Без этого
   * transformers.js после перезапуска снова идёт в сеть за токенизатором,
   * хотя сама модель уже лежит в кэше.
   */
  async function ensureAuxCached(cache) {
    const missing = [];
    for (const asset of MODEL_AUX_URLS) {
      if (!(await cache.match(asset.url))) missing.push(asset);
    }
    if (!missing.length) return;

    console.log('[model] Кэширую служебные файлы токенизатора...');
    for (const asset of missing) {
      let res;
      try {
        // force-cache: если файл уже есть в HTTP-кэше браузера, берём его
        // оттуда даже после истечения срока свежести. Это спасает при 403,
        // когда сеть частично недоступна, а файл уже загружался ранее.
        res = await fetch(asset.url, { cache: 'force-cache' });
      } catch (err) {
        throw new Error(`${asset.name}: ${err.message || 'сетевая ошибка'}`);
      }
      if (!res.ok) throw new Error(`${asset.name}: HTTP ${res.status}`);

      // Защита от кэширования HTML-страницы ошибки (например, 403 от
      // провайдера/антивируса): в кэш кладём только валидный JSON.
      const text = await res.text();
      if (!/^\s*\{/.test(text)) {
        throw new Error(`${asset.name}: сервер вернул не JSON`);
      }
      try {
        JSON.parse(text);
      } catch {
        throw new Error(`${asset.name}: некорректный JSON`);
      }

      await cache.put(
        asset.url,
        new Response(text, {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
      );
    }
    console.log('[model] Служебные файлы токенизатора в кэше.');
  }

  /**
   * Гарантирует, что в кэше браузера лежит собранный model.onnx.
   * При первом визите скачивает части и склеивает их, при повторном —
   * просто сообщает, что модель уже установлена.
   * Возвращает Cache, который затем отдаём transformers.js.
   */
  async function ensureModelCached() {
    if (typeof caches === 'undefined') {
      throw new Error(
        'Cache API недоступен: откройте сайт по https:// или http://localhost'
      );
    }

    const cache = await caches.open(MODEL_CACHE_NAME);
    const alreadyCached = await cache.match(modelUrl);
    if (alreadyCached) {
      console.log(
        '[model] Модель уже скачана в браузер — повторная загрузка не нужна.'
      );
      await ensureAuxCached(cache);
      return cache;
    }

    console.log(
      '[model] Модель не найдена в кэше браузера. Начинаю установку нейросети...'
    );
    console.log(
      `[model] Файл разбит на ${MODEL_PART_NAMES.length} части — скачаю и склею их.`
    );

    const partBuffers = [];
    for (let i = 0; i < MODEL_PART_NAMES.length; i++) {
      const partName = MODEL_PART_NAMES[i];
      const partUrl = new URL(`model.onnx.${partName}`, modelDirUrl).href;
      const label = `Часть ${i + 1}/${MODEL_PART_NAMES.length} (${partName})`;
      console.log(`[model] Скачивание: ${label}...`);
      partBuffers.push(await downloadWithProgress(partUrl, label));
    }

    console.log('[model] Части скачаны. Склеиваю в единый model.onnx...');
    const blob = new Blob(partBuffers, { type: 'application/octet-stream' });
    partBuffers.length = 0; // отпускаем ссылки на части, дальше живёт только Blob
    console.log(
      `[model] Модель собрана (${formatMb(blob.size)} МБ). Сохраняю в кэш браузера...`
    );

    // Ответ кладём ровно под тем URL, который запрашивает transformers.js.
    await cache.put(
      modelUrl,
      new Response(blob, {
        status: 200,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': String(blob.size),
        },
      })
    );

    console.log('[model] Модель сохранена в кэш браузера.');
    await ensureAuxCached(cache);
    return cache;
  }

  /* ------------------------------------------------------------------ *
   * Ленивая инициализация ИИ (transformers.js + модель + векторы базы)  *
   * ------------------------------------------------------------------ */
  function setAiStatus(text, state) {
    if (!aiStatusEl) return;
    semanticState = state || semanticState;
    if (!text) {
      aiStatusEl.classList.remove('visible', 'error');
      return;
    }
    aiStatusEl.classList.toggle('error', state === 'error');
    aiStatusEl.querySelector('.search-ai-status-text').textContent = text;
    aiStatusEl.classList.add('visible');
  }

  async function initSemantic() {
    if (semanticState === 'ready' || semanticState === 'loading') return;

    if (aiStatusEl) {
      aiStatusEl.querySelector('.search-ai-status-text').textContent =
        'Инициализация ИИ-поиска...';
      aiStatusEl.classList.add('visible');
      aiStatusEl.classList.remove('error');
    }
    semanticState = 'loading';

    try {
      // 1) Векторы базы (наши, оффлайн)
      const embRes = await fetch(new URL('data/embeddings.json', siteRoot).href);
      if (!embRes.ok) throw new Error('embeddings.json: HTTP ' + embRes.status);
      const raw = await embRes.json();
      embeddings = raw.map((d) => ({
        title: d.title,
        domain: d.domain,
        group: d.group,
        url: d.url,
        vec: Float32Array.from(d.embedding),
      }));

      // 2) Transformers.js и модель rubert-tiny2
      const mod = await import(new URL('transformers.min.js', libsDir).href);
      envConfigure(mod.env);

      // Веса лежат двумя частями (<100 МБ каждая) — склеиваем и кэшируем.
      // Повторные визиты берут готовый model.onnx прямо из кэша браузера.
      // Этот же Cache отдаём transformers.js: он будет читать из него
      // model.onnx, config.json и tokenizer.json, не ходя в сеть повторно.
      mod.env.customCache = await ensureModelCached();

      console.log('[model] Инициализация нейросети (ONNX Runtime)...');
      extractor = await mod.pipeline('feature-extraction', 'rubert-tiny2', {
        quantized: false, // у нас только fp32 model.onnx
      });
      console.log('[model] Модель скачана в браузер и работает.');

      semanticState = 'ready';
      setAiStatus(null, 'ready'); // индикатор исчезает

      // если пользователь уже успел набрать запрос — досчитаем смысловой слой
      if (currentQuery) {
        debounceTimer = setTimeout(() => semanticUpdate(currentQuery), 25);
      }
    } catch (err) {
      console.error('[search] ИИ-слой недоступен:', err);
      semanticState = 'error';
      setAiStatus('ИИ-поиск недоступен, работает быстрый поиск', 'error');
    }
  }

  function envConfigure(env) {
    env.allowLocalModels = true;
    env.allowRemoteModels = false; // никакой сети, всё локально
    env.localModelPath = new URL('models/', siteRoot).href;
    // Вместо внутреннего кэша библиотеки используем свой (см. ensureModelCached).
    env.useBrowserCache = false;
    env.useCustomCache = true;
    const onnx = env.backends.onnx || (env.backends = { onnx: {} }).onnx;
    if (onnx && onnx.wasm) {
      onnx.wasm.wasmPaths = libsDir.href; // ort-wasm-*.wasm лежат рядом с transformers.min.js
      onnx.wasm.numThreads = 1;           // без SharedArrayBuffer/Cross-Origin-Isolation
    }
  }

  /* ------------------------------------------------------------------ *
   * Векторизация запроса + косинусное сходство                          *
   * ------------------------------------------------------------------ */
  const queryVecCache = new Map(); // text -> Float32Array

  async function getQueryVector(text) {
    if (queryVecCache.has(text)) return queryVecCache.get(text);
    const res = await extractor(text, { pooling: 'mean', normalize: true });
    const vec = res.data;
    queryVecCache.set(text, vec);
    return vec;
  }

  function cosine(queryVec, docVec) {
    let dot = 0;
    for (let i = 0; i < queryVec.length; i++) dot += queryVec[i] * docVec[i];
    return dot; // оба вектора нормализованы → это и есть cosine similarity
  }

  function semanticMatches(queryVec) {
    if (!embeddings || !queryVec) return [];
    const matches = [];
    for (const d of embeddings) {
      const sim = cosine(queryVec, d.vec);
      if (sim > AI_SEMANTIC_THRESHOLD) matches.push({ ...d, _sim: sim });
    }
    matches.sort((a, b) => b._sim - a._sim);
    return matches.slice(0, 8);
  }

  /* ------------------------------------------------------------------ *
   * Объединение лексической и семантической выдачи                      *
   * ------------------------------------------------------------------ */
  function mergeResults(lexical, semantic) {
    const seen = new Set();
    const out = [];
    for (const item of lexical) {
      if (seen.has(item.url)) continue;
      seen.add(item.url);
      out.push(item);
    }
    if (semantic) {
      for (const item of semantic) {
        if (seen.has(item.url)) continue;
        seen.add(item.url);
        out.push({ ...item, viaAI: true });
      }
    }
    return out;
  }

  function lexicalSearch(q) {
    if (!q) return docs.slice(0, MAX_RENDERED);
    return miniIndex.search(q, { boost: { title: 3, keywords: 1.5, group: 1 } });
  }

  /* ------------------------------------------------------------------ *
   * Рендер                                                              *
   * ------------------------------------------------------------------ */
  function renderResults(items, opts = {}) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    if (!items || items.length === 0) {
      container.innerHTML =
        '<li class="search-empty">Ничего не найдено</li>' +
        (opts.showAiHint && semanticState === 'ready'
          ? '<li class="search-empty search-empty-ai">Попробуйте смысловой запрос — «вывод текста в консоль»</li>'
          : '');
      return;
    }

    container.innerHTML = items
      .slice(0, opts.limit || MAX_RENDERED)
      .map(
        (item) => {
          const domainClass =
            'domain-' +
            String(item.domainId || item.domain || '')
              .toLowerCase()
              .replace('#', 'sharp')
              .replace(/[^a-z0-9]/g, '');
          return `
        <li class="${domainClass}" style="--item-accent: ${escapeHtml(item.accent || '#6c47ff')};">
          <a href="${itemHref(item)}"
             data-domain="${escapeHtml(item.domain)}" ${item.viaAI ? 'data-via="ai"' : ''}>
            <div class="item-category">${escapeHtml(item.domain)} / ${escapeHtml(item.group)}</div>
            <div class="item-title">
              ${escapeHtml(item.title)}
              ${item.interactive ? ' 🔧' : ''}
              ${item.viaAI ? '<span class="result-badge-ai">смысл</span>' : ''}
            </div>
          </a>
        </li>`;
        }
      )
      .join('');
  }

  async function semanticUpdate(q, requestId) {
    if (!q || semanticState !== 'ready' || semanticUpdate._running) return;
    semanticUpdate._running = true;
    try {
      const qvec = await getQueryVector(q);
      if (currentQuery !== q) {
        // пользователь успел напечатать что-то ещё — этот ответ неактуален
        return;
      }
      const sem = semanticMatches(qvec);
      renderResults(mergeResults(lexicalSearch(q), sem));
    } finally {
      semanticUpdate._running = false;
    }
  }

  /* ------------------------------------------------------------------ *
   * Модальное окно + события                                            *
   * ------------------------------------------------------------------ */
  function initSearchModal() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInput');
    const container = document.getElementById('searchResults');
    const triggerBtn = document.getElementById('searchTriggerBtn');
    if (!modal || !input || !container) return;

    // Строка статуса ИИ внизу окна поиска (создаётся только на страницах с модалкой)
    aiStatusEl = document.createElement('div');
    aiStatusEl.className = 'search-ai-status';
    aiStatusEl.innerHTML =
      '<span class="search-ai-status-spinner"></span>' +
      '<span class="search-ai-status-text"></span>';
    modal.querySelector('.search-box').appendChild(aiStatusEl);

    function openSearch() {
      modal.classList.add('active');
      input.value = '';
      currentQuery = '';
      renderResults(docs);
      // лениво запускаем ИИ при первом открытии окна
      if (!extractorPromise) {
        extractorPromise = initSemantic();
      } else if (semanticState === 'ready') {
        setAiStatus(null);
      }
      setTimeout(() => input.focus(), 50);
    }

    function closeSearch() {
      modal.classList.remove('active');
    }

    triggerBtn && triggerBtn.addEventListener('click', openSearch);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSearch(); // клик по затемнению
    });

    input.addEventListener('input', () => {
      const q = input.value.trim();
      currentQuery = q;

      // сброс выделения при изменении запроса
      container.querySelectorAll('a.search-item-selected').forEach((a) =>
        a.classList.remove('search-item-selected')
      );

      // 1) мгновенная лексическая выдача
      renderResults(mergeResults(lexicalSearch(q), null), {
        showAiHint: q.length > 0,
      });

      // 2) семантический слой с дебаунсом
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        semanticUpdate(q);
      }, AI_DEBOUNCE_MS);
    });

    // Открыть поиск: «/» на английской раскладке, «.» на русской (когда не в поле ввода)
    document.addEventListener('keydown', (e) => {
      const inField =
        document.activeElement &&
        ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
      if (
        (e.key === '/' || e.key === '.') &&
        !inField &&
        !modal.classList.contains('active')
      ) {
        e.preventDefault();
        openSearch();
      }
    });

    // Навигация внутри модалки — вешаем на input, чтобы preventDefault
    // срабатывал до того, как браузер переместит курсор в тексте
    input.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeSearch();
        return;
      }

      const links = container.querySelectorAll('li > a');
      if (links.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveSelection(links, 1);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveSelection(links, -1);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = container.querySelector(
          'li > a.search-item-selected'
        );
        if (selected) {
          window.location.href = selected.href;
        } else {
          links[0].click();
        }
        return;
      }
    });

    function moveSelection(links, direction) {
      const current = container.querySelector('li > a.search-item-selected');
      let idx = current ? Array.from(links).indexOf(current) : -1;
      idx = (idx + direction + links.length) % links.length;
      links.forEach((link, i) => {
        const sel = i === idx;
        link.classList.toggle('search-item-selected', sel);
        link.parentElement.setAttribute('aria-selected', sel ? 'true' : 'false');
      });
      links[idx].scrollIntoView({ block: 'nearest' });
    }
  }

  /* ------------------------------------------------------------------ *
   * Перезапуск анимации горения (CSS .active-flash)                     *
   * ------------------------------------------------------------------ */
  function triggerSectionFlash(targetId) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    // ID теперь стоит на заголовке h2/h3, а анимация — на родительской
    // .topic-section. Раньше ID был на самой секции, поэтому искали
    // ближайшую секцию, чтобы подсветка работала и для заголовков.
    const section = targetEl.closest('.topic-section') || targetEl;

    document
      .querySelectorAll('.topic-section.active-flash')
      .forEach((el) => el.classList.remove('active-flash'));

    void section.offsetWidth; // форсируем reflow — перезапуск keyframes
    section.classList.add('active-flash');
  }

  function initFlash() {
    // ссылки в оглавлении
    document.querySelectorAll('.toc-nav a').forEach((link) => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) triggerSectionFlash(href.slice(1));
      });
    });

    // любые якорные ссылки на странице (в т.ч. из выдачи поиска)
    document.addEventListener('click', (e) => {
      const link = e.target.closest && e.target.closest('a[href^="#"]');
      if (link) triggerSectionFlash(link.getAttribute('href').slice(1));
    });

    if (window.location.hash) {
      triggerSectionFlash(window.location.hash.slice(1));
    }
  }

  /* ------------------------------------------------------------------ *
   * Старт                                                               *
   * ------------------------------------------------------------------ */
  async function startSearch() {
    initFlash();
    initSearchModal();
    try {
      await loadDocs();
      renderResults(docs);
    } catch (err) {
      console.error('[search] Ошибка инициализации лексического индекса:', err);
      renderResults([]);
    }
  }

  // page.js подключает search.js динамически уже после DOMContentLoaded,
  // поэтому проверяем состояние готовности вручную.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSearch);
  } else {
    startSearch();
  }
})();
