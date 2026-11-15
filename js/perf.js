/* Диагностический оверлей для замера фризов при наборе в поиске.
 *
 * Включается только вручную — добавьте ?perf=1 к адресу страницы:
 *   /index.html?perf=1
 *   /theme.html?path=content/csharp/konsol/console-write.md&perf=1
 *
 * Зачем отдельный файл: фриз виден не у всех и не всегда, а открытые
 * DevTools сами меняют картину (сжимают вьюпорт). Оверлей показывает три
 * вещи, по которым видно, куда уходит время:
 *   fps / худший кадр  — проваливаются кадры значит тормозит отрисовка
 *                        (композитор, растр, размер вьюпорта в пикселях);
 *   ввод               — сколько занимает обработчик нажатия и его отрисовка;
 *   длинные кадры      — какие скрипты блокировали главный поток, в том числе
 *                        content-скрипты расширений (видно их адрес).
 *
 * Клик по плашке сбрасывает счётчики: сбросить, набрать пару слов, прочитать.
 * На работу сайта не влияет, когда параметра ?perf=1 в адресе нет.
 */
(() => {
  'use strict';

  if (!/[?&]perf=1(?:&|$)/.test(window.location.search)) return;

  function mount() {
    if (document.getElementById('perfOverlay')) return;

    const box = document.createElement('div');
    box.id = 'perfOverlay';
    box.title = 'Клик — сбросить счётчики';
    box.style.cssText = [
      'position:fixed',
      'left:8px',
      'bottom:8px',
      'z-index:2147483647',
      'max-width:52ch',
      'padding:8px 10px',
      'border-radius:8px',
      'background:rgba(10,10,14,0.92)',
      'border:1px solid rgba(255,255,255,0.25)',
      'color:#e8e8ef',
      'font:12px/1.45 ui-monospace,Consolas,monospace',
      'white-space:pre-wrap',
      'pointer-events:auto',
      'cursor:pointer',
    ].join(';');
    document.body.appendChild(box);

    let frames = [];
    let loaf = [];
    let inputs = [];
    let lastFrame = performance.now();

    const reset = () => {
      frames = [];
      loaf = [];
      inputs = [];
    };
    box.addEventListener('click', reset);

    const tick = (t) => {
      frames.push(+(t - lastFrame).toFixed(1));
      lastFrame = t;
      if (frames.length > 5000) frames.shift();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    try {
      new PerformanceObserver((list) => {
        loaf.push(...list.getEntries());
        if (loaf.length > 40) loaf = loaf.slice(-40);
      }).observe({ type: 'long-animation-frame' });
    } catch (_) {
      /* браузер без LoAF — покажем то, что есть */
    }

    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.name === 'input' || e.name === 'keydown') inputs.push(e);
        }
        if (inputs.length > 40) inputs = inputs.slice(-40);
      }).observe({ type: 'event', durationThreshold: 16 });
    } catch (_) {
      /* браузер без Event Timing */
    }

    const render = () => {
      const recent = frames.slice(-90);
      const sum = recent.reduce((s, x) => s + x, 0);
      const fps = sum ? Math.round((recent.length * 1000) / sum) : 0;
      // Провалы считаем за всё время с последнего сброса: если брать только свежие
      // кадры, после набора цифры «успокоятся» и покажут норму, хотя фриз был.
      const worst = frames.length ? Math.max(...frames) : 0;
      const over50 = frames.filter((x) => x > 50).length;
      const over100 = frames.filter((x) => x > 100).length;

      const evMax = inputs.length ? Math.max(...inputs.map((e) => e.duration)) : 0;
      const evProc = inputs.length
        ? Math.max(...inputs.map((e) => e.processingEnd - e.processingStart))
        : 0;

      const loafMax = loaf.length ? Math.max(...loaf.map((e) => e.duration)) : 0;
      let culprit = null;
      for (const entry of loaf) {
        for (const s of entry.scripts || []) {
          if (!culprit || s.duration > culprit.duration) {
            culprit = { src: s.sourceURL || s.invoker || '?', duration: s.duration };
          }
        }
      }

      box.textContent =
        'перф ' + window.innerWidth + '×' + window.innerHeight + ' @' + window.devicePixelRatio + '\n' +
        'fps ' + fps + '   худший кадр ' + Math.round(worst) + ' мс\n' +
        'кадры >50 мс: ' + over50 + '   >100 мс: ' + over100 + '\n' +
        (inputs.length
          ? 'ввод: max ' + Math.round(evMax) + ' мс, обработка ' + Math.round(evProc) + ' мс\n'
          : 'ввод: событий >=16 мс нет\n') +
        (loaf.length ? 'длинные кадры: ' + loaf.length + ', max ' + Math.round(loafMax) + ' мс' : 'длинных кадров нет') +
        (culprit ? '\n  ' + culprit.src + '\n  ' + Math.round(culprit.duration) + ' мс' : '') +
        '\n\nклик — сброс';
    };

    render();
    setInterval(render, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
