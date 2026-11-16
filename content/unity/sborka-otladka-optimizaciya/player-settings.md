---
title: Player Settings
description: Имя продукта, иконка, разрешение, Scripting Backend и другие настройки игрока.
keywords: Unity Player Settings, Product Name, Company Name, Scripting Backend, IL2CPP, resolution, icon

---

# Player Settings

`Player Settings` — настройки конкретной платформы: имя, иконка, разрешение,
графика и скрипты. Они попадают в билд.

## Основное

В **Project Settings → Player**:

- **Company Name** — имя студии;
- **Product Name** — имя игры;
- **Version** — версия билда;
- **Default Icon** — иконка;
- **Splash Image** — заставка.

`Product Name` виден в заголовке окна и в путях сохранения. Лучше задать его до
первой сборки.

## Разрешение и окно

Для Windows:

- **Fullscreen Mode** — эксклюзивный полноэкранный или оконный;
- **Default Is Fullscreen** — запуск в полном экране;
- **Default Screen Width/Height** — разрешение;
- **Resizable Window** — можно ли менять размер.

Для мобильных платформ важны **Default Orientation** и **Auto Rotation**.

## Скрипты и API

- **Scripting Backend** — Mono или IL2CPP;
- **Api Compatibility Level** — версия .NET API;
- **Managed Stripping Level** — уровень обрезки кода.

IL2CPP обычно даёт больше производительности и защиты, но сборка идёт дольше.
Mono быстрее собирается и удобнее для отладки.

## Графика

В URP настройки графики лежат в ассете URP Render Pipeline Asset, а не только
в Player Settings. В Player Settings важны:

- **Color Space** — Linear или Gamma;
- **Graphics APIs** — Vulkan, DirectX, OpenGL;
- **Auto Graphics API** — выбор по умолчанию.

Для Windows и URP обычно оставляют DirectX 11/12 и Linear.

## Иконка и версия

Иконки можно задать для каждой платформы отдельно. Версия билда полезна для
релизов и баг-репортов.

## Частые ошибки

- **Кириллица в Product Name.** Может сломать пути.
- **Сменили Scripting Backend перед сборкой.** Проверьте, что код собирается.
- **Забыли про иконку.** В билде остаётся стандартная.
- **Меняют графику в Player Settings, а URP Asset не трогают.** Часть
  настроек не применится.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где задаётся имя продукта?",
  "options": [
    {
      "text": "Project Settings → Player → Product Name",
      "correct": true,
      "explanation": "Это имя попадёт в билд."
    },
    {
      "text": "В компоненте Transform",
      "correct": false,
      "explanation": "Transform не отвечает за имя продукта."
    },
    {
      "text": "В окне Console",
      "correct": false,
      "explanation": "Console — для логов."
    }
  ],
  "explanation": "Product Name — настройка проекта."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что можно настроить в Player Settings?",
  "options": [
    {
      "text": "Иконку и имя продукта",
      "correct": true
    },
    {
      "text": "Разрешение окна",
      "correct": true
    },
    {
      "text": "Scripting Backend",
      "correct": true
    },
    {
      "text": "Содержимое папки `Library`",
      "correct": false,
      "explanation": "`Library` — служебный кэш."
    }
  ],
  "explanation": "Player Settings — имя, иконка, разрешение и скрипты."
}
```

## Куда дальше

- [Логи и отладка](theme.html?path=content/unity/sborka-otladka-optimizaciya/logi-i-otladka.md)
- [Профилирование](theme.html?path=content/unity/sborka-otladka-optimizaciya/profilirovanie.md)
- [Практика: собрать билд](theme.html?path=content/unity/sborka-otladka-optimizaciya/praktika-sobrat-bild.md)
