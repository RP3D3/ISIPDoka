---
title: Окна редактора
description: Основные окна Unity Editor: Toolbar, Hierarchy, Scene, Game, Inspector, Project и Console.
keywords: Unity Editor, окна Unity, Hierarchy, Scene, Game, Inspector, Project, Console, Toolbar, layout

---

# Окна редактора

Unity Editor состоит из нескольких окон. Их можно двигать, делить на вкладки и
сохранять в раскладки. Поначалу окон много, но реальная работа идёт в пяти-шести
из них.

## Схема расположения

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/start-i-versii/editor-layout.svg"
    alt="Схема основных окон Unity Editor: Toolbar, Hierarchy, Scene, Inspector, Project, Console"
    width="900"
  >
  <figcaption>
    Типичная раскладка Unity: сверху Toolbar, слева Hierarchy, в центре Scene,
    справа Inspector, снизу Project и Console.
  </figcaption>
</figure>

## Toolbar

Верхняя панель управляет запуском и общим видом редактора:

- **Play** — запустить игру прямо в редакторе;
- **Pause** — поставить игру на паузу;
- **Step** — выполнить один кадр;
- выпадающий список **Layers** — какие слои показывать;
- **Layout** — сохранённые раскладки окон.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/start-i-versii/toolbar-callout.png"
    alt="Панель Toolbar в Unity Editor с кнопками Play, Pause и Step"
    width="900"
  >
  <figcaption>
    Toolbar: запуск игры, пауза, пошаговое выполнение и управление раскладкой.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/Toolbar.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Toolbar
    </a>
  </figcaption>
</figure>

## Hierarchy

**Hierarchy** показывает все GameObject текущей сцены. Если объект есть на
сцене, он есть и в Hierarchy. Здесь же задаются родительские связи: перетащите
один объект на другой, и он станет дочерним.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/start-i-versii/hierarchy-window.png"
    alt="Окно Hierarchy со списком объектов сцены"
    width="359"
  >
  <figcaption>
    Hierarchy: камера, свет и другие объекты сцены.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/Hierarchy.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Hierarchy
    </a>
  </figcaption>
</figure>

## Scene

**Scene** — рабочее 3D-окно. Здесь вы расставляете объекты, двигаете камеру и
вращаете сцену. Основная навигация:

- зажать правую кнопку мыши и двигать мышь — осмотреться;
- колесо мыши — приблизиться или отдалиться;
- `F` — приблизить выбранный объект;
- `Q`, `W`, `E`, `R` — инструменты выбора, перемещения, вращения и масштаба.

В Scene вы видите служебные gizmos, которых не будет в игре. Это нормально:
Scene — рабочая сцена, а не итоговая картинка.

## Game

**Game** показывает то, что видит камера. Именно это окно превращается в экран
игры после сборки. В режиме Play сюда смотрим, как выглядит результат.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/start-i-versii/game-view-window.png"
    alt="Окно Game в Unity Editor"
    width="849"
  >
  <figcaption>
    Game: вид из камеры и итоговое изображение игры.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/GameView.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Game view
    </a>
  </figcaption>
</figure>

## Inspector

**Inspector** показывает свойства выбранного объекта. Если выбрать куб, там
будут `Transform`, `Mesh Filter`, `Mesh Renderer`, `Box Collider` и, возможно,
ваш скрипт.

В Inspector можно:

- менять позицию, поворот и масштаб;
- включать и выключать компоненты;
- задавать значения полям скрипта;
- перетаскивать ссылки на другие объекты и ассеты.

Именно поэтому в Unity так много настраивают мышью: код читает значения, которые
вы задали в Inspector.

## Project

**Project** — файлы проекта. Здесь лежат папки `Assets`, `Packages` и
`ProjectSettings`. Внутри `Assets` — сцены, скрипты, материалы, префабы и
импортированные модели.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/start-i-versii/project-window-context.png"
    alt="Окно Project с файлами и папками проекта Unity"
    width="783"
  >
  <figcaption>
    Project: файловая структура проекта. Папка Assets — основная рабочая.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/ProjectView.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Project view
    </a>
  </figcaption>
</figure>

## Console

**Console** показывает сообщения `Debug.Log`, предупреждения и ошибки. Если
скрипт не компилируется или падает с исключением, первым делом смотрите сюда.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/start-i-versii/console.png"
    alt="Окно Console с сообщениями, предупреждениями и ошибками Unity"
    width="1000"
  >
  <figcaption>
    Console: логи, предупреждения и ошибки. Кнопки сверху фильтруют сообщения.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/Console.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Console
    </a>
  </figcaption>
</figure>

## Раскладка окон

Если окна разъехались:

1. Откройте меню **Window → Layouts**.
2. Выберите **Default** или **Reset all layouts**.
3. Настройте окна под себя.
4. Сохраните раскладку через **Window → Layouts → Save Layout**.

Для курса удобна раскладка: Hierarchy слева, Scene в центре, Inspector справа,
Project и Console снизу.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "В каком окне искать объекты текущей сцены?",
  "options": [
    {
      "text": "Hierarchy",
      "correct": true,
      "explanation": "Hierarchy — список GameObject сцены."
    },
    {
      "text": "Project",
      "correct": false,
      "explanation": "Project показывает файлы, а не объекты сцены."
    },
    {
      "text": "Console",
      "correct": false,
      "explanation": "Console показывает логи и ошибки."
    }
  ],
  "explanation": "Объекты сцены живут в Hierarchy, а их свойства — в Inspector."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Inspector?",
  "options": [
    {
      "text": "Показывает компоненты выбранного объекта",
      "correct": true
    },
    {
      "text": "Позволяет менять значения полей скрипта",
      "correct": true
    },
    {
      "text": "Показывает все файлы проекта",
      "correct": false,
      "explanation": "Файлы показывает Project."
    },
    {
      "text": "Позволяет перетаскивать ссылки на другие объекты",
      "correct": true
    }
  ],
  "explanation": "Inspector — панель свойств выбранного объекта и его компонентов."
}
```

## Куда дальше

- [Сцена, GameObject и компонент](theme.html?path=content/unity/start-i-versii/scena-gameobject-component.md)
- [Папка Assets и метаданные](theme.html?path=content/unity/start-i-versii/papka-assets-i-metadannye.md)
- [Практика: первый проект](theme.html?path=content/unity/start-i-versii/praktika-start.md)
