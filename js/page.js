/* Сборка страницы темы: шапка, хлебные крошки, оглавление, поиск.
 *
 * Страница содержит только hero (с уникальным SVG) и <article class="article-content">.
 * Всё остальное добавляет этот скрипт. Пути считаются от расположения самого
 * скрипта, поэтому страницы могут лежать на любой глубине.
 */
(() => {
  'use strict';

  const scriptEl =
    document.currentScript || document.querySelector('script[src$="page.js"]');
  const jsDir = new URL('./', scriptEl ? scriptEl.src : window.location.href);
  const siteRoot = new URL('../', jsDir);

  const TRANSLIT = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c',
    ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e',
    ю: 'yu', я: 'ya',
  };

  function slugify(value) {
    const text = String(value).toLowerCase().trim();
    let out = '';
    for (const ch of text) {
      if (TRANSLIT[ch] !== undefined) out += TRANSLIT[ch];
      else if (/[a-z0-9]/.test(ch)) out += ch;
      else out += '-';
    }
    return out.replace(/-+/g, '-').replace(/^-|-$/g, '') || 'section';
  }

  function uniqueId(base, used) {
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return id;
  }

  function getCurrentUrlKey() {
    let pathname = window.location.pathname;
    try {
      pathname = decodeURIComponent(pathname);
    } catch (_) {
      /* оставляем как есть */
    }
    const rootPath = new URL(siteRoot).pathname;
    if (rootPath !== '/' && pathname.startsWith(rootPath)) {
      pathname = pathname.slice(rootPath.length);
    } else {
      pathname = pathname.replace(/^\/+/, '');
    }
    return pathname.replace(/^\/+/, '');
  }

  function contextFromPath() {
    const key = getCurrentUrlKey();
    const parts = key.split('/');
    const domainId = parts[0] === 'content' ? parts[1] || '' : parts[0] || '';
    const groupId = parts[0] === 'content' ? parts[2] || '' : parts[1] || '';
    const rawTitle = document.title.replace(/\s+—\s+Дока ИСИП\s*$/i, '').trim();
    return {
      urlKey: key,
      domainId,
      domainTitle: domainId,
      groupId,
      groupName: groupId,
      topicTitle: rawTitle || 'Тема',
      accent: '',
    };
  }

  function findContext(structure, urlKey) {
    if (!structure) return null;
    for (const [domainId, domain] of Object.entries(structure)) {
      for (const group of domain.groups || []) {
        for (const topic of group.topics || []) {
          if (topic.url === urlKey) {
            return {
              urlKey,
              domainId,
              domainTitle: domain.title || domainId,
              groupId: group.id || '',
              groupName: group.name || '',
              topicTitle: topic.title || document.title,
              accent: domain.accent || '',
              topic,
              domain,
              group,
            };
          }
        }
      }
    }
    return null;
  }

  async function fetchStructure() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    try {
      const res = await fetch(new URL('data/structure.json', siteRoot).href, {
        signal: controller.signal,
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (err) {
      console.warn('[page] structure.json недоступен:', err);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  function applyTheme(ctx, structure) {
    document.body.dataset.domain = ctx.domainId;

    if (ctx.accent) {
      document.documentElement.style.setProperty('--domain-accent', ctx.accent);
    }

    if (structure) {
      for (const [domainId, domain] of Object.entries(structure)) {
        if (domain.accent) {
          document.documentElement.style.setProperty(`--${domainId}-accent`, domain.accent);
        }
      }
    }

    document.title = ctx.domainTitle
      ? `${ctx.topicTitle} — ${ctx.domainTitle} — Дока ИСИП`
      : `${ctx.topicTitle} — Дока ИСИП`;
  }

  function renderHeader(ctx) {
    if (document.querySelector('.site-header')) return;

    const header = document.createElement('header');
    header.className = 'site-header';

    const left = document.createElement('div');
    left.className = 'header-left';

    const brand = document.createElement('a');
    brand.className = 'brand-badge';
    brand.href = new URL('index.html', siteRoot).href;
    brand.textContent = 'U•ᴥ•U Дока ИСИП';
    left.appendChild(brand);

    const crumbs = document.createElement('div');
    crumbs.className = 'breadcrumbs';

    const sep = () => {
      const s = document.createElement('span');
      s.textContent = '/';
      crumbs.appendChild(s);
    };

    const domainUrl = ctx.domainId
      ? new URL(`domain.html?id=${encodeURIComponent(ctx.domainId)}`, siteRoot).href
      : '';

    sep();
    if (ctx.domainId) {
      const domainLink = document.createElement('a');
      domainLink.href = domainUrl;
      domainLink.textContent = ctx.domainTitle;
      crumbs.appendChild(domainLink);
      sep();
    }
    if (ctx.groupName) {
      // Отдельной страницы у группы нет — ссылка ведёт в область.
      if (domainUrl) {
        const groupLink = document.createElement('a');
        groupLink.href = domainUrl;
        groupLink.textContent = ctx.groupName;
        crumbs.appendChild(groupLink);
      } else {
        const group = document.createElement('span');
        group.textContent = ctx.groupName;
        crumbs.appendChild(group);
      }
      sep();
    }
    const current = document.createElement('span');
    current.className = 'current';
    current.textContent = ctx.topicTitle;
    crumbs.appendChild(current);

    left.appendChild(crumbs);

    const right = document.createElement('div');
    right.className = 'header-right';

    const searchBtn = document.createElement('button');
    searchBtn.className = 'search-trigger-btn';
    searchBtn.id = 'searchTriggerBtn';
    searchBtn.innerHTML = 'Поиск <kbd>/</kbd>';
    right.appendChild(searchBtn);

    header.appendChild(left);
    header.appendChild(right);
    document.body.insertBefore(header, document.body.firstChild);
  }

  function ensureHero(ctx) {
    if (document.querySelector('.topic-hero')) return;

    const article = document.querySelector('.article-content');
    const hero = document.createElement('section');
    hero.className = 'topic-hero';

    const container = document.createElement('div');
    container.className = 'topic-hero-container';

    const h1 = document.createElement('h1');
    h1.textContent = ctx.topicTitle;
    container.appendChild(h1);

    hero.appendChild(container);

    if (article && article.parentNode) {
      article.parentNode.insertBefore(hero, article);
    } else {
      document.body.appendChild(hero);
    }
  }

  function buildToc() {
    const article = document.querySelector('.article-content');
    if (!article) return;

    // Заголовки могут лежать как прямо в article (Markdown после marked),
    // так и внутри готовых .topic-section (standalone .html-интерактивы).
    const headings = Array.from(article.querySelectorAll('h2, h3')).filter(
      (h) => h.textContent.trim()
    );
    const used = new Set();
    const links = [];

    const aside = document.createElement('aside');
    aside.className = 'toc-nav';
    const list = document.createElement('ul');

    // 1) Проставляем id и собираем оглавление для всех заголовков.
    for (const heading of headings) {
      const base = heading.id.trim() || slugify(heading.textContent);
      const id = uniqueId(base, used);
      heading.id = id;

      const li = document.createElement('li');
      if (heading.tagName === 'H3') li.className = 'toc-level-3';

      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading.textContent.trim();
      li.appendChild(link);
      list.appendChild(li);
      links.push(link);
    }

    // 2) Оборачиваем «свободный» контент между h2/h3 в .topic-section.
    //    Уже существующие секции (standalone HTML) не трогаем.
    let currentSection = null;
    for (const child of Array.from(article.children)) {
      if (child.classList.contains('topic-section')) {
        currentSection = null;
        continue;
      }

      if (child.tagName === 'H2' || child.tagName === 'H3') {
        currentSection = document.createElement('section');
        currentSection.className = 'topic-section';
        article.insertBefore(currentSection, child);
        currentSection.appendChild(child);
      } else if (currentSection) {
        currentSection.appendChild(child);
      }
    }

    aside.appendChild(list);

    let layout = article.closest('.topic-main-layout');
    if (!layout) {
      layout = document.createElement('div');
      layout.className = 'topic-main-layout';
      if (!headings.length) layout.classList.add('topic-main-layout--single');
      article.parentNode.insertBefore(layout, article);
      layout.appendChild(article);
    } else {
      const oldToc = layout.querySelector('.toc-nav');
      if (oldToc) oldToc.remove();
    }

    if (headings.length) {
      layout.insertBefore(aside, layout.firstChild);
      initScrollSpy(headings, links);
    }
  }

  function initScrollSpy(headings, links) {
    if (!headings.length) return;

    const byId = new Map(headings.map((heading, i) => [heading.id, links[i]]));
    const setActive = (id) => {
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
      });
    };

    // Во время программного smooth-скролла не даём IntersectionObserver
    // перебить активный пункт, который выбрал пользователь.
    let observerLocked = false;
    let observerLockTimer = null;
    function lockObserver() {
      observerLocked = true;
      if (observerLockTimer) window.clearTimeout(observerLockTimer);
      observerLockTimer = window.setTimeout(() => {
        observerLocked = false;
        observerLockTimer = null;
      }, 900);
    }

    function flashSection(section) {
      document
        .querySelectorAll('.topic-section.active-flash')
        .forEach((el) => el.classList.remove('active-flash'));

      void section.offsetHeight; // форсируем reflow — перезапуск keyframes
      section.classList.add('active-flash');
    }

    // Последняя секция статьи — та, после которой в .article-content
    // ничего нет (кроме пустых служебных узлов).
    function isLastSection(section) {
      const article = section.closest('.article-content');
      if (!article) return !section.nextElementSibling;

      const sections = article.querySelectorAll('.topic-section');
      if (sections.length && sections[sections.length - 1] !== section) return false;

      let node = section.nextElementSibling;
      while (node) {
        if (node.textContent.trim()) return false;
        node = node.nextElementSibling;
      }
      return true;
    }

    // Ставим секцию по центру экрана. Если до середины документ докрутить
    // нельзя — ведём себя по-разному:
    //   * последняя секция — прижимаем её низ к низу окна (вспышка снизу);
    //   * промежуточная — докручиваем страницу до конца, чтобы секция была
    //     видна целиком вместе с тем, что идёт после неё.
    // Позицию считаем вручную, а не через scrollIntoView: у .topic-section
    // задан scroll-margin-top, из-за чего секция встаёт на 34 px выше центра.
    // Возвращает целевой scrollY.
    function scrollToSection(section) {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const rect = section.getBoundingClientRect();
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);

      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = rect.bottom + window.scrollY;

      // Идеальная позиция — середина секции в середине экрана.
      let target = sectionTop - (viewportHeight - rect.height) / 2;

      if (target > maxScroll) {
        target = isLastSection(section)
          ? Math.min(maxScroll, Math.max(0, sectionBottom - viewportHeight))
          : maxScroll;
      }
      if (target < 0) target = 0;

      const y = Math.round(target);
      window.scrollTo({ top: y, behavior: 'smooth' });
      return y;
    }

    // Клик по оглавлению: плавно центрируем секцию и подсвечиваем её.
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        // search.js тоже умеет подсвечивать якоря; здесь вспышку запускает
        // page.js, поэтому не даём обработать этот же клик повторно.
        event.stopImmediatePropagation();

        const href = link.getAttribute('href') || '';
        if (!href.startsWith('#')) return;

        const id = href.slice(1);
        if (!byId.has(id)) return;

        const target = document.getElementById(id);
        if (!target) return;

        const section = target.closest('.topic-section') || target;
        lockObserver();
        scrollToSection(section);
        flashSection(section);

        if (window.location.hash !== `#${id}`) {
          history.pushState(null, '', `#${id}`);
        }
        setActive(id);
      });
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (observerLocked) return;
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) setActive(visible[0].target.id);
        },
        { rootMargin: '-80px 0px -65% 0px', threshold: [0, 1] }
      );

      headings.forEach((heading) => observer.observe(heading));
    }

    // Если страницу открыли сразу с #hash — центрируем и подсвечиваем секцию.
    const rawHash = window.location.hash.slice(1);
    if (rawHash) {
      let id = rawHash;
      try {
        id = decodeURIComponent(rawHash);
      } catch (_) {
        /* оставляем исходный hash */
      }

      const target = document.getElementById(id);
      if (target) {
        const section = target.closest('.topic-section') || target;
        lockObserver();
        window.setTimeout(() => {
          scrollToSection(section);
          flashSection(section);
          setActive(id);
        }, 120);
      }
    }

    // Переход по якорю без перезагрузки страницы (смена hash в адресной
    // строке, кнопка «назад»): центрируем секцию и подсвечиваем её.
    function handleHashChange(delay) {
      const raw = window.location.hash.slice(1);
      if (!raw) return;

      let id = raw;
      try {
        id = decodeURIComponent(raw);
      } catch (_) {
        /* оставляем исходный hash */
      }

      const target = document.getElementById(id);
      if (!target) return;

      const section = target.closest('.topic-section') || target;
      const apply = () => {
        lockObserver();
        scrollToSection(section);
        flashSection(section);
        setActive(id);
      };

      if (delay) {
        // При переходе по истории браузер сам восстанавливает позицию
        // скролла — даём ему это сделать первым, а затем центрируем секцию.
        window.setTimeout(apply, delay);
      } else {
        apply();
      }
    }

    window.addEventListener('hashchange', () => handleHashChange(0));
    window.addEventListener('popstate', () => handleHashChange(120));
  }

  function ensureSearchModal() {
    if (document.getElementById('searchModal')) return;

    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.id = 'searchModal';
    modal.innerHTML =
      '<div class="search-box">' +
      '<input type="text" class="search-box-input" id="searchInput" placeholder="Поиск по доке..." autocomplete="off">' +
      '<ul class="search-results-list" id="searchResults"></ul>' +
      '</div>';
    document.body.appendChild(modal);
  }

  function loadScriptOnce(src) {
    const existing = Array.from(document.scripts).find((s) => s.src === src);
    if (existing) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Не удалось загрузить ' + src));
      document.body.appendChild(script);
    });
  }

  async function loadRuntime() {
    const assetVersion = '?v=20261108-1';
    const searchSrc = new URL('search.js' + assetVersion, jsDir).href;
    const highlightSrc = new URL('highlight.min.js' + assetVersion, jsDir).href;

    const results = await Promise.allSettled([
      loadScriptOnce(searchSrc),
      loadScriptOnce(highlightSrc),
    ]);

    for (const result of results) {
      if (result.status === 'rejected') {
        console.warn('[page]', result.reason);
      }
    }

    if (window.hljs) {
      window.hljs.highlightAll();
    }
  }

  async function main() {
    // Для theme.html контекст передаётся через window.__themeContext (domain, group, topicTitle).
    const fallback = window.__themeContext || contextFromPath();
    ensureHero(fallback);

    // На theme.html контент загружается асинхронно — ждём события themeContentLoaded
    // и только потом строим оглавление из h2/h3.
    if (window.__themeContext) {
      await new Promise((resolve) => {
        const article = document.getElementById('theme-article');
        if (article && article.children.length > 0) {
          resolve();
          return;
        }
        const handler = () => resolve();
        window.addEventListener('themeContentLoaded', handler, { once: true });
        setTimeout(handler, 8000); // страховка, если событие не пришло
      });
    }

    buildToc();

    const structure = await fetchStructure();
    const ctx = findContext(structure, fallback.urlKey) || fallback;

    applyTheme(ctx, structure);
    renderHeader(ctx);
    ensureSearchModal();

    await loadRuntime();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
