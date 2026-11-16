---
title: Платформы и модули
description: Windows, WebGL, Android и iOS: модули Unity Hub, переключение платформы и особенности сборки.
keywords: Unity платформы, модули, Windows, WebGL, Android, iOS, Switch Platform, Build Profiles

---

# Платформы и модули

Unity может собирать игру под разные платформы, но не «из коробки»: нужны
модули и правильные настройки.

## Модули Unity Hub

В Unity Hub выберите установленный редактор → **Add modules** и добавьте:

- **Windows Build Support**;
- **Mac Build Support**;
- **Linux Build Support**;
- **Android Build Support** (SDK/NDK/OpenJDK);
- **iOS Build Support**;
- **WebGL Build Support**.

Не ставьте всё сразу: модули занимают много места.

## Windows

- платформа **Windows**;
- архитектура x86_64;
- Scripting Backend Mono или IL2CPP;
- сборка `.exe` + папка `_Data`.

## WebGL

- платформа **WebGL**;
- сборка в папку с `index.html`;
- нужен веб-сервер, нельзя открыть `index.html` просто из проводника;
- мобильные браузеры ограничены по памяти;
- IL2CPP обязателен.

## Android

- нужен Android SDK/NDK/OpenJDK;
- сборка `.apk` или `.aab`;
- IL2CPP для релиза;
- проверяйте разрешения и ориентацию.

## iOS

- нужен macOS и Xcode;
- Unity создаёт Xcode-проект;
- подпись и provisioning profile настраиваются в Xcode.

## Переключение платформы

В 2022.3: **Build Settings → Switch Platform**.
В Unity 6: выберите профиль платформы в **Build Profiles**.

Переключение может занять время: Unity переимпортирует ассеты под платформу.

## Частые ошибки

- **Модуль не установлен.** Платформа недоступна.
- **WebGL открывают как файл.** Нужен локальный сервер.
- **Android без SDK/NDK.** Сборка падает.
- **Забыли сменить платформу.** Собирается не то, что ожидали.
- **Тестируют только в редакторе.** На устройстве могут быть другие ограничения.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где устанавливаются модули платформ?",
  "options": [
    {
      "text": "В Unity Hub",
      "correct": true,
      "explanation": "Hub управляет модулями редактора."
    },
    {
      "text": "В компоненте Camera",
      "correct": false,
      "explanation": "Камера не связана с модулями."
    },
    {
      "text": "В окне Console",
      "correct": false,
      "explanation": "Console — для логов."
    }
  ],
  "explanation": "Модули платформ ставятся через Unity Hub."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про платформы?",
  "options": [
    {
      "text": "Для WebGL нужен веб-сервер",
      "correct": true
    },
    {
      "text": "Для Android нужны SDK/NDK",
      "correct": true
    },
    {
      "text": "Для iOS нужен macOS и Xcode",
      "correct": true
    },
    {
      "text": "Модули платформ не нужны",
      "correct": false,
      "explanation": "Без модуля платформа недоступна."
    }
  ],
  "explanation": "У каждой платформы свои модули и ограничения."
}
```

## Куда дальше

- [Сборка, отладка и оптимизация: итог](theme.html?path=content/unity/sborka-otladka-optimizaciya/itog-sborka-otladka-optimizaciya.md)
- [Практика: собрать билд](theme.html?path=content/unity/sborka-otladka-optimizaciya/praktika-sobrat-bild.md)
- [Build Settings и Build Profiles](theme.html?path=content/unity/sborka-otladka-optimizaciya/build-settings-i-profiles.md)
