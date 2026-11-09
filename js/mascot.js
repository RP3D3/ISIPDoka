/* ==========================================================================
   МАСКОТ «ДОКА ИСИП» В ШАПКЕ
   --------------------------------------------------------------------------
   Заменяет текстовый логотип «U•ᴥ•U» на ящерицу-маскота, сохраняя название
   проекта «Дока ИСИП» рядом. Скрипт общий для index.html, domain.html,
   admin.html и страниц тем (шапку там создаёт js/page.js асинхронно).

   Поведение:
   - дыхание и моргание — лёгкая фоновая анимация;
   - зрачки следят за курсором только пока курсор над логотипом;
   - язык дёргается только при наведении (это делает CSS в style.css).
   ========================================================================== */

(() => {
  'use strict';

  let uid = 0;

  /* SVG из mascot_live_preview.html (компактная версия, viewBox 58×46).
     id маски уникален для каждого экземпляра, чтобы несколько логотипов
     на странице (например, в предпросмотре админки) не конфликтовали. */
  function createMascot() {
    const maskId = `doka-mascot-mask-${++uid}`;

    const wrapper = document.createElement('span');
    wrapper.className = 'brand-mascot';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.innerHTML =
      `<svg class="doka-mascot" xmlns="http://www.w3.org/2000/svg" ` +
      // Сдвиг viewBox на 2.5 вниз компенсирует убранные антенну и уши:
      // рисунок снова стоит по центру своей области.
      `viewBox="0 2.5 58 46" fill="none" focusable="false">` +
      `<defs>` +
      `<mask id="${maskId}">` +
      `<rect width="58" height="46" fill="white"/>` +
      `<circle cx="29" cy="14" r="1.3" fill="black"/>` +
      `<circle cx="26" cy="17" r="1.1" fill="black"/>` +
      `<circle cx="32" cy="17" r="1.1" fill="black"/>` +
      `<g class="eyes-blinker">` +
      `<ellipse cx="18" cy="22.5" rx="4.8" ry="3.6" transform="rotate(14 18 22.5)" fill="black"/>` +
      `<ellipse cx="40" cy="22.5" rx="4.8" ry="3.6" transform="rotate(-14 40 22.5)" fill="black"/>` +
      `<g class="pupils-layer">` +
      `<ellipse cx="18.2" cy="22.5" rx="1.4" ry="3" fill="white"/>` +
      `<circle cx="16.2" cy="21" r="1" fill="white"/>` +
      `<ellipse cx="39.8" cy="22.5" rx="1.4" ry="3" fill="white"/>` +
      `<circle cx="37.8" cy="21" r="1" fill="white"/>` +
      `</g>` +
      `</g>` +
      `<path d="M25.5 26C24.5 26.5 24.5 28 25.5 28.5" stroke="black" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M32.5 26C33.5 26.5 33.5 28 32.5 28.5" stroke="black" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M16.5 31C19.5 34 25 34 29 31.5C33 34 38.5 34 41.5 31" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` +
      `</mask>` +
      `</defs>` +
      `<g class="mascot-breathe">` +
      `<g mask="url(#${maskId})">` +
      `<path d="M18 9.5H40L47 16.5L53 21L48.5 24.5L52 28.5L45.5 30.5L41 37H17L12.5 30.5L6 28.5L9.5 24.5L5 21L11 16.5L18 9.5Z" fill="currentColor"/>` +
      `</g>` +
      `<polygon points="18.5,32 20.5,35.8 22.8,33" fill="currentColor"/>` +
      `<polygon points="39.5,32 37.5,35.8 35.2,33" fill="currentColor"/>` +
      `<path class="tongue-anim" d="M29 32.5V38.5M29 38.5L26.5 41.5M29 38.5L31.5 41.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>` +
      `</g>` +
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
  const MAX_X = 2.3;
  const MAX_Y = 1.35;
  const RADIUS = 280;

  let frame = 0;
  let pointer = null;

  function applyTracking() {
    frame = 0;
    if (!pointer) return;

    mascots.forEach((svg) => {
      const rect = svg.getBoundingClientRect();
      const dx = pointer.clientX - (rect.left + rect.width / 2);
      const dy = pointer.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const factor = Math.min(1, distance / RADIUS);

      svg.style.setProperty('--pupil-dx', `${(Math.cos(angle) * MAX_X * factor).toFixed(2)}px`);
      svg.style.setProperty('--pupil-dy', `${(Math.sin(angle) * MAX_Y * factor).toFixed(2)}px`);
    });
  }

  function resetTracking() {
    pointer = null;
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    mascots.forEach((svg) => {
      svg.style.removeProperty('--pupil-dx');
      svg.style.removeProperty('--pupil-dy');
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

    const svg = badge.querySelector('.doka-mascot');
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
