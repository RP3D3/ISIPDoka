---
title: Сборка и Build Profiles
description: Перенос сборки с Build Settings на Build Profiles в Unity 6.
keywords: Unity миграция сборки, Build Settings, Build Profiles, сцены, Development Build, Unity 6

---

# Сборка и Build Profiles

В Unity 6 окно **Build Settings** заменили на **Build Profiles**. Сцены и
настройки остались, но интерфейс и структура другие.

## Было и стало

| Unity 2022.3 | Unity 6 |
|---|---|
| `File → Build Settings` | `File → Build Profiles` |
| `Scenes In Build` | Список сцен в профиле |
| Один список для платформы | Профили для платформ и конфигураций |
| `Build` / `Build And Run` | `Build` / `Build And Run` |

## Что проверить

1. Все сцены добавлены в профиль.
2. Первая сцена — стартовая.
3. Платформа выбрана.
4. Development Build выключен для релиза.
5. Scripting Backend совпадает с ожиданиями.
6. Иконка и Product Name заданы.

## Несколько профилей

В Unity 6 можно держать профили:

- `Windows Development`;
- `Windows Release`;
- `WebGL`;
- `Android`.

У каждого свой список сцен и настройки. Это удобнее, чем один общий Build
Settings.

## Сборка в CI

Если вы собираете игру на сервере, используйте batch mode и методы
`BuildPipeline`. Интерфейс Build Profiles не нужен, но список сцен и настройки
должны быть корректны.

## Частые ошибки

- **Сцена не добавлена в профиль.** В билде её нет.
- **Собирают Development Build как релиз.** Билд тяжелее и содержит отладку.
- **Один профиль на все платформы.** Легко перепутать настройки.
- **Забыли вернуть `timeScale`.** Игра стартует замороженной.
- **Сборка внутри `Assets`.** Unity импортирует её как ассет.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем заменили Build Settings в Unity 6?",
  "options": [
    {
      "text": "Build Profiles",
      "correct": true,
      "explanation": "В Unity 6 сборка настраивается профилями."
    },
    {
      "text": "Package Manager",
      "correct": false,
      "explanation": "Он управляет пакетами."
    },
    {
      "text": "Profiler",
      "correct": false,
      "explanation": "Он измеряет производительность."
    }
  ],
  "explanation": "Build Profiles — новое окно сборки Unity 6."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить перед сборкой?",
  "options": [
    {
      "text": "Сцены в профиле",
      "correct": true
    },
    {
      "text": "Платформу",
      "correct": true
    },
    {
      "text": "Development Build",
      "correct": true
    },
    {
      "text": "Наличие папки `Library` в билде",
      "correct": false,
      "explanation": "`Library` не входит в билд."
    }
  ],
  "explanation": "Сцены, платформа и режим сборки — минимум."
}
```

## Куда дальше

- [Версии и миграция: итог](theme.html?path=content/unity/versii-i-migraciya/itog-versii-i-migraciya.md)
- [Пакеты, URP и TMP](theme.html?path=content/unity/versii-i-migraciya/pakety-urp-tmp.md)
- [Матрица API 2022.3 и Unity 6](theme.html?path=content/unity/versii-i-migraciya/matrica-api.md)
