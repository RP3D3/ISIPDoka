---
title: Оптимизация
description: Draw calls, батчинг, текстуры, LOD, пул объектов и размер билда.
keywords: Unity оптимизация, draw calls, batching, атлас, LOD, occlusion, текстуры, размер билда, IL2CPP

---

# Оптимизация

Оптимизация начинается после Profiler. Сначала находим узкое место, потом
выбираем приём: меньше draw calls, меньше аллокаций, меньше текстуры или
проще материал.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/sborka-otladka-optimizaciya/file-size.png"
    alt="Способы уменьшения размера сборки Unity"
    width="831"
  >
  <figcaption>
    Размер билда уменьшают текстуры, сжатие, stripping и удаление лишних ассетов.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/ReducingFilesize.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Reducing File Size
    </a>
  </figcaption>
</figure>

## Рендер

- **Draw calls** — количество вызовов отрисовки. Чем меньше, тем лучше.
- **Batching** — объединение объектов с одинаковым материалом.
- **Atlas** — несколько текстур в одной.
- **LOD** — упрощённые модели на расстоянии.
- **Occlusion Culling** — не рисовать скрытое.
- **Shadow distance** — не считать тени на всей сцене.

## Текстуры

- включайте **Compression**;
- используйте **Mip Maps** для 3D;
- уменьшайте разрешение, если текстура не видна крупно;
- не держите текстуры 4K для иконок.

## Звук

- сжимайте длинные клипы;
- используйте **Streaming** для музыки;
- короткие эффекты — **Decompress On Load**;
- не держите десятки одинаковых AudioSource.

## Код и GC

- кэшируйте `GetComponent`;
- не создавайте списки и строки в `Update`;
- используйте пул объектов;
- избегайте LINQ в горячем коде;
- проверяйте аллокации в Profiler.

## Размер билда

- **Managed Stripping Level** убирает неиспользуемый код;
- **IL2CPP** часто меньше и быстрее Mono;
- удаляйте неиспользуемые ассеты;
- сжимайте текстуры и звук;
- не включайте лишние пакеты и сэмплы.

## Частые ошибки

- **Оптимизируют вслепую.** Без Profiler легко ухудшить проект.
- **Ставят LOD на всё.** Для маленьких объектов это лишняя сложность.
- **Сжимают всё подряд.** Интерфейс и мелкие текстуры могут стать хуже.
- **Забывают про GC.** Фризы часто из-за аллокаций, а не рендера.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое draw call?",
  "options": [
    {
      "text": "Вызов отрисовки объекта или группы",
      "correct": true,
      "explanation": "Чем меньше draw calls, тем легче рендер."
    },
    {
      "text": "Вызов метода `Update`",
      "correct": false,
      "explanation": "Это жизненный цикл, а не рендер."
    },
    {
      "text": "Сохранение игры",
      "correct": false,
      "explanation": "Сохранение — отдельная система."
    }
  ],
  "explanation": "Draw call — команда отрисовки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает оптимизировать игру?",
  "options": [
    {
      "text": "Батчинг и атласы",
      "correct": true
    },
    {
      "text": "LOD и occlusion culling",
      "correct": true
    },
    {
      "text": "Пул объектов и кэширование",
      "correct": true
    },
    {
      "text": "`Debug.Log` в `Update`",
      "correct": false,
      "explanation": "Это создаёт лишнюю нагрузку."
    }
  ],
  "explanation": "Оптимизация — это рендер, память, звук и код."
}
```

## Куда дальше

- [Платформы и модули](theme.html?path=content/unity/sborka-otladka-optimizaciya/platformy-i-moduli.md)
- [Сборка, отладка и оптимизация: итог](theme.html?path=content/unity/sborka-otladka-optimizaciya/itog-sborka-otladka-optimizaciya.md)
- [Практика: собрать билд](theme.html?path=content/unity/sborka-otladka-optimizaciya/praktika-sobrat-bild.md)
