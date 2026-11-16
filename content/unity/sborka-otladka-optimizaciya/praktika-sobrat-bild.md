---
title: Практика: собрать билд
description: Собираем Windows-билд, включаем Development Build, проверяем лог и профилируем сцену.
keywords: Unity практика, сборка, Build Profiles, Development Build, Player.log, Profiler, Windows

---

# Практика: собрать билд

Соберём игру под Windows и проверим, что она запускается вне редактора. Заодно
включим отладочную сборку и посмотрим Profiler.

## Что нужно сделать

1. Добавить сцены в список сборки.
2. Задать Product Name и иконку.
3. Включить Development Build.
4. Собрать Windows-билд.
5. Запустить `.exe` и проверить Player.log.
6. Открыть Profiler и найти самый дорогой модуль.

## Решение 1. Сцены

1. Откройте **Build Settings** (2022.3) или **Build Profiles** (Unity 6).
2. Нажмите **Add Open Scenes** или перетащите сцены.
3. Поставьте `Main` первой.
4. Убедитесь, что все сцены, которые загружаются по имени, есть в списке.

## Решение 2. Player Settings

1. **Project Settings → Player**.
2. `Company Name`: `Doka`.
3. `Product Name`: `UnityCourseBuild`.
4. `Version`: `0.1.0`.
5. Назначьте иконку.
6. Проверьте `Fullscreen Mode` и разрешение.

## Решение 3. Development Build

1. В Build Settings/Profiles включите **Development Build**.
2. Включите **Script Debugging**, если нужно подключить отладчик.
3. Соберите игру.

Для релиза эти флаги выключите.

## Решение 4. Сборка

1. Создайте папку `Builds/Windows` вне `Assets`.
2. Нажмите **Build**.
3. Дождитесь окончания.
4. Запустите `.exe`.

Если Unity ругается на сцены, проверьте список сборки.

## Решение 5. Лог

На Windows лог обычно лежит здесь:

```text
%userprofile%\AppData\LocalLow\Doka\UnityCourseBuild\Player.log
```

Откройте файл и проверьте:

- нет ли исключений;
- загрузились ли сцены;
- какие версии графических API использованы.

## Решение 6. Profiler

1. Откройте **Window → Analysis → Profiler**.
2. Запустите игру.
3. Посмотрите CPU Usage.
4. Найдите самый дорогой модуль.
5. Если это GC — проверьте аллокации.
6. Если рендер — откройте Frame Debugger.

## Что должно получиться

- билд запускается без редактора;
- сцены переключаются;
- в Player.log нет критических ошибок;
- Development Build содержит логи;
- Profiler показывает нагрузку;
- вы понимаете, что оптимизировать дальше.

## Частые ошибки

- **Сцена не в списке.** В билде её нет.
- **Сборка внутри `Assets`.** Unity может импортировать билд как ассет.
- **Забыли выключить Development Build.** Релизный билд тяжелее.
- **Смотрят только FPS.** Нужны пики и Profiler.
- **Нет иконки.** Остаётся стандартная.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где хранить папку сборки?",
  "options": [
    {
      "text": "Вне `Assets`, например `Builds/Windows`",
      "correct": true,
      "explanation": "Иначе Unity может импортировать билд как ассет."
    },
    {
      "text": "В `Assets/Scripts`",
      "correct": false,
      "explanation": "Это папка для скриптов."
    },
    {
      "text": "В `Packages`",
      "correct": false,
      "explanation": "`Packages` — для пакетов."
    }
  ],
  "explanation": "Билды хранят вне папки Assets."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить после сборки?",
  "options": [
    {
      "text": "Игра запускается вне редактора",
      "correct": true
    },
    {
      "text": "Сцены переключаются",
      "correct": true
    },
    {
      "text": "В Player.log нет критических ошибок",
      "correct": true
    },
    {
      "text": "В билде есть папка `Library`",
      "correct": false,
      "explanation": "`Library` не входит в билд."
    }
  ],
  "explanation": "Проверяем запуск, сцены, лог и производительность."
}
```

## Куда дальше

- [Сборка, отладка и оптимизация: итог](theme.html?path=content/unity/sborka-otladka-optimizaciya/itog-sborka-otladka-optimizaciya.md)
- [Build Settings и Build Profiles](theme.html?path=content/unity/sborka-otladka-optimizaciya/build-settings-i-profiles.md)
- [Профилирование](theme.html?path=content/unity/sborka-otladka-optimizaciya/profilirovanie.md)
