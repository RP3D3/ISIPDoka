---
title: Debug и Console
description: Логи, предупреждения, ошибки, DrawLine и отладка через Console и точки останова.
keywords: Unity Debug, Console, Debug.Log, LogWarning, LogError, DrawLine, Assert, отладка

---

# Debug и Console

Console — первое место, куда смотрят при ошибке. Но Console нужен не только для
падений: через `Debug` можно проверять значения, рисовать линии и ловить
неожиданные состояния.

## Основные методы

```csharp
using UnityEngine;

public class DebugExample : MonoBehaviour
{
    private void Start()
    {
        Debug.Log("Обычное сообщение");
        Debug.LogWarning("Что-то выглядит подозрительно");
        Debug.LogError("Это ошибка");
    }
}
```

- `Debug.Log` — информация.
- `Debug.LogWarning` — предупреждение, игра продолжается.
- `Debug.LogError` — ошибка, часто с исключением.

В Console можно фильтровать сообщения по типу и искать по тексту.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/skripty-i-zhiznennyy-cikl/console.png"
    alt="Окно Console с сообщениями, предупреждениями и ошибками Unity"
    width="1000"
  >
  <figcaption>
    Console: фильтры, очистка, свернуть повторы и переход к объекту.
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

## Контекст сообщения

Второй аргумент `Debug.Log` — объект, к которому относится сообщение:

```csharp
Debug.Log("Игрок получил урон", this);
```

В Console можно нажать на сообщение и подсветить объект в Hierarchy. Это удобно,
когда одинаковых врагов много.

## Рисование в Scene

```csharp
private void Update()
{
    Debug.DrawLine(transform.position, transform.position + Vector3.forward * 3f, Color.red);
    Debug.DrawRay(transform.position, transform.up * 2f, Color.green);
}
```

`DrawLine` и `DrawRay` видны только в Scene, не в игре. Они помогают проверить
направления, дистанции и лучи.

## Assert

`Debug.Assert` проверяет условие и пишет ошибку, если оно ложно:

```csharp
Debug.Assert(_target != null, "Target не назначен");
```

Это не заменяет обычную проверку `if`, но помогает ловить ошибки настройки в
редакторе.

## Точки останова

В Visual Studio или Rider можно поставить breakpoint на строку кода. Когда
игра дойдёт до неё, выполнение остановится, и вы увидите значения переменных.

Это мощнее логов, но требует подключённого отладчика. Для Unity:
**Debug → Attach to Unity** или запуск через IDE.

## Частые ошибки

- **Оставляют `Debug.Log` в `Update`.** Console забивается, FPS падает.
- **Пишут `Debug.Log` вместо проверки `null`.** Лог не предотвращает падение.
- **Игнорируют предупреждения.** Часто они указывают на будущую ошибку.
- **Не указывают контекст.** Потом непонятно, какой объект пишет лог.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой метод пишет ошибку в Console?",
  "options": [
    {
      "text": "`Debug.LogError`",
      "correct": true,
      "explanation": "`LogError` помечает сообщение как ошибку."
    },
    {
      "text": "`Debug.DrawLine`",
      "correct": false,
      "explanation": "Он рисует линию в Scene."
    },
    {
      "text": "`Debug.Assert`",
      "correct": false,
      "explanation": "`Assert` пишет ошибку только при ложном условии."
    }
  ],
  "explanation": "`Debug.LogError` — явное сообщение об ошибке."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает отлаживать игру?",
  "options": [
    {
      "text": "`Debug.Log` с контекстом объекта",
      "correct": true
    },
    {
      "text": "`Debug.DrawLine` в Scene",
      "correct": true
    },
    {
      "text": "Точки останова в IDE",
      "correct": true
    },
    {
      "text": "`Debug.Log` в `Update` без условий",
      "correct": false,
      "explanation": "Это забивает Console и снижает производительность."
    }
  ],
  "explanation": "Логи, рисунки и breakpoint'ы дополняют друг друга."
}
```

## Куда дальше

- [Time и корутины](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/time-i-korutiny.md)
- [Ссылки на компоненты](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/ssylki-na-komponenty.md)
- [Практика: жизненный цикл](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/praktika-zhiznennyy-cikl.md)
