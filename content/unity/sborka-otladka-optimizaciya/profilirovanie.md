---
title: Профилирование
description: Profiler, CPU/GPU-модули, Frame Debugger и поиск узких мест.
keywords: Unity Profiler, профилирование, CPU, GPU, Memory, Frame Debugger, GC, производительность

---

# Профилирование

Оптимизация без измерений — гадание. **Profiler** показывает, сколько времени
тратит каждый кадр и какие системы самые дорогие.

## Окно Profiler

Откройте **Window → Analysis → Profiler**. Основные модули:

- **CPU Usage** — скрипты, физика, рендер, GC;
- **GPU Usage** — нагрузка на видеокарту;
- **Rendering** — вызовы отрисовки;
- **Memory** — память и аллокации;
- **Audio** — звук;
- **Physics** — физика.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/sborka-otladka-optimizaciya/profiler-cpu.png"
    alt="Модуль CPU Usage в Unity Profiler"
    width="850"
  >
  <figcaption>
    Profiler показывает, какие системы тратят время в кадре.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/ProfilerWindow.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Profiler Window
    </a>
  </figcaption>
</figure>

## Как читать

1. Запустите игру и Profiler.
2. Выберите кадр с пиком.
3. Посмотрите, какой модуль занимает больше всего времени.
4. Раскройте иерархию до конкретного метода.
5. Исправьте и измерьте снова.

Не оптимизируйте то, что не видно в Profiler.

## Deep Profile

**Deep Profile** показывает вызовы внутри методов, но сильно замедляет игру.
Используйте его точечно, чтобы найти дорогой метод, а потом выключите.

## Frame Debugger

**Window → Analysis → Frame Debugger** показывает порядок вызовов отрисовки.
Помогает понять, почему кадр рисуется в несколько проходов и где лишние
материалы.

## Память и GC

Аллокации в `Update` создают мусор и вызывают GC-пики. Частые причины:

- конкатенация строк;
- `new List<T>()` каждый кадр;
- LINQ в горячем коде;
- `GetComponent` в `Update`;
- создание массивов.

Кэшируйте и переиспользуйте объекты.

## Частые ошибки

- **Профилируют в редакторе и верят цифрам.** Редактор медленнее билда.
- **Включают Deep Profile на всю игру.** Сильно искажает результат.
- **Оптимизируют рендер, а тормозит GC.** Смотрите CPU и Memory.
- **Смотрят только средний FPS.** Важны пики и стабильность.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что показывает Profiler?",
  "options": [
    {
      "text": "Время и нагрузку систем в кадре",
      "correct": true,
      "explanation": "CPU, GPU, память, физика и рендер."
    },
    {
      "text": "Только ошибки компиляции",
      "correct": false,
      "explanation": "Ошибки показывает Console."
    },
    {
      "text": "Список пакетов проекта",
      "correct": false,
      "explanation": "Пакеты — в Package Manager."
    }
  ],
  "explanation": "Profiler измеряет производительность."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про профилирование?",
  "options": [
    {
      "text": "Deep Profile сильно замедляет игру",
      "correct": true
    },
    {
      "text": "GC-пики могут вызывать фризы",
      "correct": true
    },
    {
      "text": "Frame Debugger показывает вызовы отрисовки",
      "correct": true
    },
    {
      "text": "Достаточно смотреть только средний FPS",
      "correct": false,
      "explanation": "Важны пики и стабильность."
    }
  ],
  "explanation": "Профилирование ищет конкретные узкие места, а не средние цифры."
}
```

## Куда дальше

- [Оптимизация](theme.html?path=content/unity/sborka-otladka-optimizaciya/optimizaciya.md)
- [Платформы и модули](theme.html?path=content/unity/sborka-otladka-optimizaciya/platformy-i-moduli.md)
- [Практика: собрать билд](theme.html?path=content/unity/sborka-otladka-optimizaciya/praktika-sobrat-bild.md)
