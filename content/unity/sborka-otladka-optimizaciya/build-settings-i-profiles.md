---
title: Build Settings и Build Profiles
description: Как собрать игру в Unity 2022.3 и Unity 6, добавить сцены и выбрать платформу.
keywords: Unity сборка, Build Settings, Build Profiles, Build And Run, сцены в сборке, Windows, WebGL

---

# Build Settings и Build Profiles

Сборка превращает проект в исполняемый файл. В Unity 2022.3 используется окно
**Build Settings**, в Unity 6 — **Build Profiles**. Смысл один: выбрать
платформу, сцены и настройки.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/sborka-otladka-optimizaciya/build-profiles.svg"
    alt="Схема Build Settings в Unity 2022.3 и Build Profiles в Unity 6"
    width="900"
  >
  <figcaption>
    В 2022.3 — Build Settings, в Unity 6 — Build Profiles.
  </figcaption>
</figure>

## Unity 2022.3

1. **File → Build Settings**.
2. Выберите платформу, например **Windows**.
3. Нажмите **Switch Platform**, если платформа не активна.
4. Добавьте сцены в **Scenes In Build**.
5. Нажмите **Build** или **Build And Run**.

## Unity 6

1. **File → Build Profiles**.
2. Выберите профиль платформы, например **Windows**.
3. Настройте список сцен в профиле.
4. Нажмите **Build** или **Build And Run**.

Профилей может быть несколько: Windows, Web, Android. У каждого свой список
сцен и настройки.

## Сцены

Сцена, которая не добавлена в список сборки, не загрузится в билде. Порядок
важен: первая сцена запускается при старте.

Если вы используете `SceneManager.LoadScene("Game")`, сцена `Game` должна быть
в списке.

## Build или Build And Run

- **Build** — создать файлы.
- **Build And Run** — собрать и сразу запустить.

Для быстрой проверки удобен **Build And Run**, для релиза — **Build** с
отдельной папкой.

## Частые ошибки

- **Сцена не в списке.** В редакторе работает, в билде — нет.
- **Не та платформа.** Сборка создаётся под активный профиль.
- **Кириллица в пути.** Некоторые инструменты сборки её не любят.
- **Сборка в `Assets`.** Не храните билды внутри проекта.
- **Забыли модули платформы.** Unity Hub не установил поддержку.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где в Unity 6 находятся профили сборки?",
  "options": [
    {
      "text": "File → Build Profiles",
      "correct": true,
      "explanation": "В Unity 6 Build Settings заменили на Build Profiles."
    },
    {
      "text": "Window → Console",
      "correct": false,
      "explanation": "Console — для логов."
    },
    {
      "text": "Edit → Preferences",
      "correct": false,
      "explanation": "Там настройки редактора."
    }
  ],
  "explanation": "Unity 6 использует Build Profiles."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для сборки?",
  "options": [
    {
      "text": "Добавить сцены в список сборки",
      "correct": true
    },
    {
      "text": "Выбрать платформу",
      "correct": true
    },
    {
      "text": "Установить модуль платформы",
      "correct": true
    },
    {
      "text": "Удалить `ProjectSettings`",
      "correct": false,
      "explanation": "`ProjectSettings` хранит настройки проекта."
    }
  ],
  "explanation": "Сцены, платформа и модуль — минимум для сборки."
}
```

## Куда дальше

- [Player Settings](theme.html?path=content/unity/sborka-otladka-optimizaciya/player-settings.md)
- [Логи и отладка](theme.html?path=content/unity/sborka-otladka-optimizaciya/logi-i-otladka.md)
- [Практика: собрать билд](theme.html?path=content/unity/sborka-otladka-optimizaciya/praktika-sobrat-bild.md)
