---
title: Установка и первый проект
description: Unity Hub, выбор редактора и шаблона, создание первого 3D-проекта и запуск сцены.
keywords: Unity Hub, установка Unity, создать проект Unity, шаблон 3D URP, Universal 3D, первая сцена

---

# Установка и первый проект

Установка Unity — это два шага: сначала ставится **Unity Hub**, а через него уже
нужная версия редактора. Hub удобен тем, что позволяет держать несколько версий
Unity рядом и открывать проекты в правильной.

## Unity Hub

1. Скачайте Unity Hub с официального сайта Unity.
2. Установите и запустите.
3. Войдите в аккаунт Unity. Для бесплатной лицензии Personal этого достаточно.
4. Перейдите в раздел **Installs** и нажмите **Install Editor**.
5. Выберите **Unity 6 LTS** (или Unity 2022.3 LTS, если проект уже на ней).

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/start-i-versii/unity-hub.png"
    alt="Окно Unity Hub с проектами и версиями редактора"
    width="720"
  >
  <figcaption>
    Unity Hub: здесь устанавливают редакторы, создают и открывают проекты.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/hub/manual/InstallHub.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Install Unity Hub
    </a>
  </figcaption>
</figure>

### Какие модули ставить

Для первого проекта достаточно минимума:

- **Windows Build Support** — если будете собирать игру под Windows;
- **Documentation** — локальная документация, по желанию;
- **Microsoft Visual Studio** или Rider — редактор кода.

Не ставьте сразу все платформы: это занимает десятки гигабайт. Android, iOS и
WebGL можно добавить позже, когда они понадобятся.

## Какой шаблон выбрать

| Шаблон | Когда выбирать |
|---|---|
| **3D (URP)** или **Universal 3D** | основной вариант курса: 3D-игра и современный рендер |
| **3D (Built-In)** | если нужен максимально простой и старый рендер |
| **2D (URP)** или **Universal 2D** | для 2D-платформера и спрайтов |

В Unity 6 шаблон может называться **Universal 3D**, в Unity 2022.3 — **3D (URP)**.
Это один и тот же современный шаблон, просто интерфейс Hub менялся.

## Создание проекта

1. В Unity Hub откройте **Projects**.
2. Нажмите **New project**.
3. Выберите шаблон **Universal 3D** или **3D (URP)**.
4. Укажите имя проекта, например `UnityCourse`.
5. Выберите папку без кириллицы и пробелов в пути.
6. Нажмите **Create project**.

Первый запуск может занять несколько минут: Unity импортирует пакеты и создаёт
служебные папки. Это нормально.

## Первая сцена

После создания проекта Unity открывает сцену `SampleScene`. В окне **Hierarchy**
обычно уже есть:

- `Main Camera` — камера, через которую мы видим игру;
- `Directional Light` — направленный свет.

Нажмите **Play** на панели сверху. Сцена запустится, но визуально почти ничего не
изменится: пока в ней нет объектов, кроме камеры и света.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/start-i-versii/new-empty-scene.png"
    alt="Новая пустая сцена Unity с камерой и направленным светом"
    width="845"
  >
  <figcaption>
    Новая сцена: Hierarchy, Scene и Inspector с камерой и светом.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/CreatingScenes.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Creating scenes
    </a>
  </figcaption>
</figure>

Сохраните сцену: **File → Save** или `Ctrl + S`. Файл сцены имеет расширение
`.unity` и лежит в `Assets/Scenes`.

## Если что-то пошло не так

- **Hub не видит редактор.** Проверьте, что установка завершилась и версия
  появилась в **Installs**.
- **Проект открывается в неправильной версии.** В Hub у проекта есть выпадающий
  список версий: выберите нужную.
- **Ошибки при первом импорте.** Подождите: Unity может несколько минут
  компилировать пакеты.
- **Не запускается Play.** Посмотрите в Console: чаще всего там ошибка компиляции
  скрипта.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен Unity Hub?",
  "options": [
    {
      "text": "Чтобы устанавливать версии Unity и открывать проекты",
      "correct": true,
      "explanation": "Hub управляет редакторами и списком проектов."
    },
    {
      "text": "Чтобы писать C#-код вместо Visual Studio",
      "correct": false,
      "explanation": "Код пишут в отдельном редакторе, например в Visual Studio или Rider."
    },
    {
      "text": "Чтобы заменять игровой движок",
      "correct": false,
      "explanation": "Hub — только менеджер установок и проектов."
    }
  ],
  "explanation": "Unity Hub — точка входа: установка редакторов и запуск проектов."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что выбрать для 3D-курса?",
  "options": [
    {
      "text": "Шаблон 3D (URP) или Universal 3D",
      "correct": true
    },
    {
      "text": "Unity 6 LTS как основную версию",
      "correct": true
    },
    {
      "text": "Только 2D-шаблон",
      "correct": false,
      "explanation": "2D-шаблон нужен для отдельного 2D-трека."
    },
    {
      "text": "Alpha- или beta-версию редактора",
      "correct": false,
      "explanation": "Для обучения лучше LTS."
    }
  ],
  "explanation": "Для курса берём LTS и 3D-шаблон с URP."
}
```

## Куда дальше

- [Окна редактора](theme.html?path=content/unity/start-i-versii/okna-redaktora.md)
- [Сцена, GameObject и компонент](theme.html?path=content/unity/start-i-versii/scena-gameobject-component.md)
- [Практика: первый проект](theme.html?path=content/unity/start-i-versii/praktika-start.md)
