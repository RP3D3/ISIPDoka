---
title: Папка Assets и метаданные
description: Что лежит в проекте Unity, зачем нужны .meta-файлы и какие папки коммитить в Git.
keywords: Unity Assets, .meta, Library, ProjectSettings, Packages, структура проекта, Git Unity

---

# Папка Assets и метаданные

В проекте Unity много папок, и не все из них нужно трогать руками. Если понять,
что где лежит, станет проще делать бэкапы, работать с Git и не терять ассеты.

## Папка Assets

`Assets` — главная рабочая папка. Всё, что вы создаёте в Unity, обычно попадает
сюда:

- сцены;
- скрипты;
- материалы;
- префабы;
- текстуры;
- модели;
- аудио;
- анимации.

Внутри `Assets` можно делать свои папки: `Scenes`, `Scripts`, `Prefabs`,
`Materials`, `Audio`. Это не обязательно, но так проще ориентироваться.

## Служебные папки

| Папка | Что внутри | Коммитить в Git? |
|---|---|---|
| `Assets` | ваши ассеты и сцены | да |
| `Packages` | список пакетов проекта | да, особенно `manifest.json` и `packages-lock.json` |
| `ProjectSettings` | настройки проекта, физики, ввода, тегов | да |
| `Library` | кэш импорта и временные данные | нет |
| `Temp` | временные файлы | нет |
| `Logs` | логи редактора | нет |
| `obj` | промежуточная сборка | нет |
| `Builds` | собранные игры | обычно нет |

`Library` может занимать гигабайты. Если удалить её, Unity создаст новую при
следующем открытии проекта. Именно поэтому её не коммитят.

## Зачем нужны `.meta`-файлы

Для каждого ассета Unity создаёт файл с расширением `.meta`. Внутри — уникальный
идентификатор `guid` и настройки импорта. По этому `guid` сцены и префабы
ссылаются на ассеты.

Правила простые:

- **не удаляйте `.meta` вручную**;
- **коммитьте `.meta` вместе с ассетом**;
- **не редактируйте `.meta` без необходимости**;
- если скопировать ассет без `.meta`, Unity создаст новый `guid`, и старые
  ссылки могут сломаться.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/start-i-versii/importing-project-window.png"
    alt="Окно Project с импортированными ассетами Unity"
    width="700"
  >
  <figcaption>
    Project показывает ассеты. У каждого из них есть скрытый `.meta`-файл.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/ImportingAssets.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Importing assets
    </a>
  </figcaption>
</figure>

## Импорт ассетов

Чтобы добавить модель, текстуру или звук:

1. Перетащите файл в окно Project или в папку `Assets` через проводник.
2. Выберите ассет и посмотрите его настройки в Inspector.
3. Нажмите **Apply**, если меняли параметры импорта.

У моделей можно настроить масштаб, материалы и анимации. У текстур — тип
(`Texture Type`), сжатие и размер. У звука — формат и загрузку.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/start-i-versii/importing-model-import-settings.png"
    alt="Настройки импорта модели в Unity"
    width="350"
  >
  <figcaption>
    Настройки импорта модели: масштаб, материалы, анимации.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/ImportingAssets.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Importing assets
    </a>
  </figcaption>
</figure>

## Что коммитить в Git

Минимальный набор:

```text
Assets/
Packages/manifest.json
Packages/packages-lock.json
ProjectSettings/
.gitignore
```

Типичный `.gitignore` для Unity:

```gitignore
[Ll]ibrary/
[Tt]emp/
[Oo]bj/
[Bb]uild/
[Bb]uilds/
[Ll]ogs/
[Uu]ser[Ss]ettings/
*.csproj
*.sln
```

Если сомневаетесь, посмотрите официальный шаблон `.gitignore` для Unity.

## Частые ошибки

- **Удалили `.meta`.** Unity создаст новый `guid`, и ссылки на ассет могут
  потеряться.
- **Скопировали ассет без `.meta`.** Старые сцены могут не найти новый файл.
- **Закоммитили `Library`.** Репозиторий раздувается, а пользы нет.
- **Импортировали модель с масштабом 100.** Проверьте `Scale Factor` в настройках
  импорта.
- **Переименовали папку через проводник.** Unity это переживёт, но лучше делать
  переименование внутри Project.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен `.meta`-файл?",
  "options": [
    {
      "text": "Хранит `guid` и настройки импорта ассета",
      "correct": true,
      "explanation": "По `guid` сцены и префабы находят ассеты."
    },
    {
      "text": "Хранит исходный код скрипта",
      "correct": false,
      "explanation": "Код лежит в `.cs`-файле."
    },
    {
      "text": "Заменяет папку `Library`",
      "correct": false,
      "explanation": "`Library` — кэш, а `.meta` — метаданные ассета."
    }
  ],
  "explanation": "`.meta` связывает ассет с проектом через `guid`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что стоит коммитить в Git?",
  "options": [
    {
      "text": "Папку `Assets`",
      "correct": true
    },
    {
      "text": "`ProjectSettings`",
      "correct": true
    },
    {
      "text": "`Packages/manifest.json`",
      "correct": true
    },
    {
      "text": "Папку `Library`",
      "correct": false,
      "explanation": "`Library` — кэш, его не коммитят."
    }
  ],
  "explanation": "В репозиторий попадают ассеты, настройки проекта и список пакетов, а не кэш."
}
```

## Куда дальше

- [Сцена, GameObject и компонент](theme.html?path=content/unity/start-i-versii/scena-gameobject-component.md)
- [Окна редактора](theme.html?path=content/unity/start-i-versii/okna-redaktora.md)
- [Практика: первый проект](theme.html?path=content/unity/start-i-versii/praktika-start.md)
