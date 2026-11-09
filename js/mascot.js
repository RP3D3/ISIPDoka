/* ==========================================================================
   МАСКОТ «ДОКА ИСИП» В ШАПКЕ
   --------------------------------------------------------------------------
   Заменяет текстовый логотип «U•ᴥ•U» на дракончика-маскота, сохраняя название
   проекта «Дока ИСИП» рядом. Скрипт общий для index.html, domain.html,
   admin.html и страниц тем (шапку там создаёт js/page.js асинхронно).

   Поведение:
   - зрачки следят за курсором всегда;
   - моргание — случайный интервал 4–8 секунд (иногда двойное);
   - язык дёргается только при наведении (это делает CSS в style.css).
   ========================================================================== */

(() => {
  'use strict';

  let uid = 0;

  /* SVG из Figma (Frame.svg, профиль, viewBox 60×44).
     Цвета переведены на currentColor, id маски уникален для каждого
     экземпляра, чтобы несколько логотипов на странице не конфликтовали. */
  function createMascot() {
    const maskId = `doka-dragon-mask-${++uid}`;

    const wrapper = document.createElement('span');
    wrapper.className = 'brand-mascot';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.innerHTML =
      `<svg class="dragon-mascot" xmlns="http://www.w3.org/2000/svg" ` +
      // viewBox как в Figma: голова уже центрирована по вертикали.
      `viewBox="0 0 60 44" fill="none" focusable="false">` +
      `<defs>` +
      `<mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="-3" width="60" height="44">` +
      `<path d="M60 -3H0V41H60V-3Z" fill="white"/>` +
      `<g class="dragon-eye-socket">` +
      `<path d="M29.1599 20.2422C31.7706 19.7819 33.5915 17.7332 33.2271 15.6664C32.8627 13.5996 30.4508 12.2973 27.8401 12.7577C25.2295 13.218 23.4085 15.2667 23.7729 17.3335C24.1374 19.4003 26.5492 20.7025 29.1599 20.2422Z" fill="black"/>` +
      `<g class="dragon-pupil">` +
      `<path d="M29.8 19.6C30.5732 19.6 31.2 18.212 31.2 16.5C31.2 14.7879 30.5732 13.4 29.8 13.4C29.0268 13.4 28.4 14.7879 28.4 16.5C28.4 18.212 29.0268 19.6 29.8 19.6Z" fill="white"/>` +
      `<path d="M27.2 16.1C27.8075 16.1 28.3 15.6075 28.3 15C28.3 14.3925 27.8075 13.9 27.2 13.9C26.5925 13.9 26.1 14.3925 26.1 15C26.1 15.6075 26.5925 16.1 27.2 16.1Z" fill="white"/>` +
      `</g>` +
      `</g>` +
      `<path d="M23.5 12.2C24.1627 12.2 24.7 11.6627 24.7 11C24.7 10.3372 24.1627 9.79999 23.5 9.79999C22.8373 9.79999 22.3 10.3372 22.3 11C22.3 11.6627 22.8373 12.2 23.5 12.2Z" fill="black"/>` +
      `<path d="M20 13.5C20.5523 13.5 21 13.0523 21 12.5C21 11.9477 20.5523 11.5 20 11.5C19.4477 11.5 19 11.9477 19 12.5C19 13.0523 19.4477 13.5 20 13.5Z" fill="black"/>` +
      `<path d="M46.9104 19.6276C47.9484 19.2498 48.6061 18.4387 48.3794 17.8159C48.1527 17.1932 47.1275 16.9946 46.0896 17.3724C45.0516 17.7501 44.3939 18.5613 44.6206 19.184C44.8473 19.8068 45.8725 20.0054 46.9104 19.6276Z" fill="black"/>` +
      `<path d="M52.5 24.5L44 26.5L38 24L31 27L25.5 24.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` +
      `</mask>` +
      `</defs>` +
      `<path d="M15.6516 12.2839L14.932 5.13752L21.5156 8.00891L15.6516 12.2839Z" fill="currentColor"/>` +
      `<path d="M21 8.9L23.6 4L26.2 8.9H21Z" fill="currentColor"/>` +
      `<path d="M26 9.3L28.6 5L31 10.4L26 9.3Z" fill="currentColor"/>` +
      `<path d="M18 11.2414L13.2353 18L9 11L18 11.2414Z" fill="currentColor"/>` +
      `<path d="M14.1818 15L16 21L10 19.6875L14.1818 15Z" fill="currentColor"/>` +
      `<g mask="url(#${maskId})">` +
      `<path d="M17 8H31.5L38 12.5L49.5 14.5L53 20.5L51.5 24.5L49 31.5L35 33.5L23.5 31L17 36L16 29.5L9.5 27.5L14 22.5L12 16L17 8Z" fill="currentColor"/>` +
      `</g>` +
      `<path d="M46 25.5L44 29.8L41.8 25.2L46 25.5Z" fill="currentColor"/>` +
      `<path d="M35.5 25L33.5 29.2L31.5 26L35.5 25Z" fill="currentColor"/>` +
      `<path class="dragon-tongue" d="M49 25.5L54.5 26.5M54.5 26.5L58 24M54.5 26.5L57.5 29.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>` +
      `</svg>`;

    return wrapper;
  }

  /* Достаёт из текста бейджа название проекта, отбрасывая логотип «U•ᴥ•U». */
  function extractName(badge) {
    const raw = (badge.textContent || '').replace(/\s+/g, ' ').trim();
    const stripped = raw
      .replace(/^U[^A-Za-zА-Яа-яЁё0-9]{1,6}U\s*/u, '')
      .replace(/^U\s*[^\s]{1,6}\s*U\s*/u, '')
      .trim();

    return stripped || 'Дока ИСИП';
  }

  /* Слежение зрачков за курсором — работает постоянно, без привязки к hover.
     Язык при этом по-прежнему реагирует только на наведение (см. style.css). */
  const mascots = new Set();
  const MAX_X = 1.0;
  const MAX_Y = 1.2;
  const RADIUS = 280;

  let frame = 0;
  let pointer = null;

  function applyTracking() {
    frame = 0;
    if (!pointer) return;

    mascots.forEach((svg) => {
      const rect = svg.getBoundingClientRect();
      const dx = pointer.clientX - (rect.left + rect.width * 0.48);
      const dy = pointer.clientY - (rect.top + rect.height * 0.375);
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const factor = Math.min(1, distance / RADIUS);

      svg.style.setProperty('--pupil-x', `${(Math.cos(angle) * MAX_X * factor).toFixed(2)}px`);
      svg.style.setProperty('--pupil-y', `${(Math.sin(angle) * MAX_Y * factor).toFixed(2)}px`);
    });
  }

  function resetTracking() {
    pointer = null;
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    mascots.forEach((svg) => {
      svg.style.removeProperty('--pupil-x');
      svg.style.removeProperty('--pupil-y');
    });
  }

  window.addEventListener(
    'mousemove',
    (event) => {
      pointer = event;
      if (!frame) frame = requestAnimationFrame(applyTracking);
    },
    { passive: true }
  );

  /* Курсор ушёл из окна — взгляд возвращается в центр. */
  window.addEventListener('mouseleave', resetTracking);
  window.addEventListener('blur', resetTracking);

  /* Моргание: случайный интервал 4–8 секунд, в 25% случаев — двойное.
     Управляется классом .is-blinking на глазнице. */
  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function triggerBlink(isDouble = false) {
    const sockets = document.querySelectorAll('.dragon-eye-socket');
    if (!sockets.length) return;

    const setBlinking = (state) => {
      sockets.forEach((socket) => socket.classList.toggle('is-blinking', state));
    };

    setBlinking(true);
    setTimeout(() => {
      setBlinking(false);

      if (!isDouble) return;
      setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 100);
      }, 120);
    }, 110);
  }

  function scheduleBlink() {
    if (prefersReducedMotion) return;
    const delay = 4000 + Math.random() * 4000;
    setTimeout(() => {
      triggerBlink(Math.random() < 0.25);
      scheduleBlink();
    }, delay);
  }

  scheduleBlink();

  function mount(badge) {
    if (!badge || badge.dataset.mascotMounted === 'true') return;

    const name = extractName(badge);
    badge.dataset.mascotMounted = 'true';
    badge.textContent = '';

    const label = document.createElement('span');
    label.className = 'brand-name';
    label.textContent = name;

    badge.appendChild(createMascot());
    badge.appendChild(label);

    const svg = badge.querySelector('.dragon-mascot');
    if (svg) mascots.add(svg);
  }

  function mountAll() {
    document.querySelectorAll('.brand-badge').forEach(mount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll, { once: true });
  } else {
    mountAll();
  }

  /* Шапку на страницах тем js/page.js создаёт после загрузки structure.json,
     поэтому ждём появления новых .brand-badge. */
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.addedNodes.length === 0) continue;
      if (document.querySelector('.brand-badge:not([data-mascot-mounted])')) {
        mountAll();
        return;
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
