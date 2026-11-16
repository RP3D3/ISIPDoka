---
title: Логи и отладка
description: Console, Debug.Log, точки останова, логи билда и отладочные сборки.
keywords: Unity отладка, Console, Debug.Log, breakpoint, Player.log, Development Build, logMessageReceived

---

# Логи и отладка

Отладка в билде сложнее, чем в редакторе: Console нет, а ошибки нужно где-то
смотреть. Поэтому логи и отладочные сборки лучше подготовить заранее.

## Console в редакторе

В редакторе сообщения видны в **Console**:

- `Debug.Log` — информация;
- `Debug.LogWarning` — предупреждение;
- `Debug.LogError` — ошибка.

Фильтры сверху позволяют скрыть лишнее. Кнопка **Collapse** сворачивает
одинаковые сообщения.

## Контекст

```csharp
Debug.Log("Игрок получил урон", this);
```

Второй аргумент — объект. По клику на сообщение Unity подсветит его в
Hierarchy. Это особенно полезно, когда одинаковых врагов много.

## Отладочная сборка

В **Build Settings / Build Profiles** включите **Development Build** и
**Script Debugging**. Тогда в билде будут логи и возможность подключить
отладчик.

Для релиза эти флаги выключают: они замедляют игру и раскрывают отладочную
информацию.

## Где искать лог билда

- **Windows** — `%userprofile%\AppData\LocalLow\<company>\<product>\Player.log`;
- **macOS** — `~/Library/Logs/<company>/<product>/Player.log`;
- **Linux** — `~/.config/unity3d/<company>/<product>/Player.log`.

Точный путь зависит от платформы и настроек.

## Сбор логов в игре

```csharp
using System.IO;
using UnityEngine;

public class RuntimeLog : MonoBehaviour
{
    private string _path;

    private void Awake()
    {
        _path = Path.Combine(Application.persistentDataPath, "runtime.log");
        Application.logMessageReceived += OnLog;
    }

    private void OnDestroy()
    {
        Application.logMessageReceived -= OnLog;
    }

    private void OnLog(string message, string stackTrace, LogType type)
    {
        File.AppendAllText(_path, $"[{type}] {message}\n{stackTrace}\n");
    }
}
```

Так можно получить лог от игрока, если игра падает на его компьютере.

## Точки останова

В Visual Studio или Rider поставьте breakpoint и запустите **Attach to Unity**.
Игра остановится на строке, и вы увидите значения переменных.

## Частые ошибки

- **`Debug.Log` в `Update`.** Console забивается, FPS падает.
- **Нет Development Build.** В билде не видно логов.
- **Логи содержат пароли и токены.** Не пишите чувствительные данные.
- **Игнорируют warning.** Часто это будущая ошибка.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что включает логи в билде?",
  "options": [
    {
      "text": "Development Build",
      "correct": true,
      "explanation": "В отладочной сборке доступны логи и отладчик."
    },
    {
      "text": "Удаление `ProjectSettings`",
      "correct": false,
      "explanation": "Это сломает проект."
    },
    {
      "text": "Смена имени сцены",
      "correct": false,
      "explanation": "Имя сцены не влияет на логи."
    }
  ],
  "explanation": "Development Build включает отладочные возможности."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает отлаживать билд?",
  "options": [
    {
      "text": "`Debug.Log` с контекстом",
      "correct": true
    },
    {
      "text": "Development Build",
      "correct": true
    },
    {
      "text": "Файл `Player.log`",
      "correct": true
    },
    {
      "text": "Удаление всех логов перед тестом",
      "correct": false,
      "explanation": "Тогда не будет информации об ошибке."
    }
  ],
  "explanation": "Логи, отладочная сборка и Player.log — основные инструменты."
}
```

## Куда дальше

- [Профилирование](theme.html?path=content/unity/sborka-otladka-optimizaciya/profilirovanie.md)
- [Оптимизация](theme.html?path=content/unity/sborka-otladka-optimizaciya/optimizaciya.md)
- [Практика: собрать билд](theme.html?path=content/unity/sborka-otladka-optimizaciya/praktika-sobrat-bild.md)
