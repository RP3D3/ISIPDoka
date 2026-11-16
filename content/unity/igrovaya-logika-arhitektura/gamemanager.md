---
title: GameManager
description: Управление состоянием игры: меню, игра, пауза, победа и поражение без жёстких связей.
keywords: Unity GameManager, состояние игры, singleton, DontDestroyOnLoad, архитектура, ссылки через Inspector

---

# GameManager

`GameManager` — не обязательный класс Unity, а удобный паттерн. Он хранит общее
состояние игры и решает, что происходит при старте, паузе, победе и поражении.

## Состояния игры

Типичные состояния:

```csharp
public enum GameState
{
    Menu,
    Playing,
    Paused,
    GameOver
}
```

Игра переходит между состояниями, а не проверяет десятки флагов в каждом
скрипте.

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public GameState State { get; private set; } = GameState.Menu;

    public void StartGame()
    {
        State = GameState.Playing;
        Time.timeScale = 1f;
    }

    public void Pause()
    {
        State = GameState.Paused;
        Time.timeScale = 0f;
    }

    public void Resume()
    {
        State = GameState.Playing;
        Time.timeScale = 1f;
    }

    public void GameOver()
    {
        State = GameState.GameOver;
        Time.timeScale = 0f;
    }
}
```

## Singleton или ссылка

Два подхода:

### Ссылка через Inspector

```csharp
[SerializeField] private GameManager _gameManager;
```

Плюсы: явные зависимости, легко тестировать, нет глобального состояния.
Минусы: нужно назначать ссылки.

### Singleton

```csharp
public static GameManager Instance { get; private set; }

private void Awake()
{
    if (Instance != null && Instance != this)
    {
        Destroy(gameObject);
        return;
    }

    Instance = this;
}
```

Плюсы: быстрый доступ из любого места.
Минусы: скрытые зависимости, сложнее тестировать, легко превратить в свалку.

Для учебного проекта допустим singleton, но лучше начинать со ссылок через
Inspector.

## Сохранение между сценами

Если менеджер должен жить между сценами:

```csharp
private void Awake()
{
    DontDestroyOnLoad(gameObject);
}
```

Не делайте так всё подряд: объект останется в памяти и может дублироваться при
возврате в сцену.

## Частые ошибки

- **GameManager делает всё.** Логика игрока, UI, звук и сохранения в одном
  классе — это свалка.
- **Синглтон создаётся в `Start`.** Другие объекты могут обратиться раньше.
- **`DontDestroyOnLoad` на всех объектах.** Получаются дубликаты.
- **Меняют `Time.timeScale`, но забывают вернуть.** После паузы игра остаётся
  замороженной.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен GameManager?",
  "options": [
    {
      "text": "Хранить общее состояние игры",
      "correct": true,
      "explanation": "Меню, игра, пауза, победа и поражение."
    },
    {
      "text": "Рисовать модели",
      "correct": false,
      "explanation": "Это делает рендер."
    },
    {
      "text": "Считать физику",
      "correct": false,
      "explanation": "Физика — отдельная система."
    }
  ],
  "explanation": "GameManager управляет состояниями и общими правилами."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про GameManager?",
  "options": [
    {
      "text": "Может хранить текущее состояние игры",
      "correct": true
    },
    {
      "text": "Может управлять паузой через `Time.timeScale`",
      "correct": true
    },
    {
      "text": "Может жить между сценами через `DontDestroyOnLoad`",
      "correct": true
    },
    {
      "text": "Обязан быть синглтоном",
      "correct": false,
      "explanation": "Можно передавать ссылку через Inspector."
    }
  ],
  "explanation": "GameManager — паттерн, а не обязательный singleton."
}
```

## Куда дальше

- [Счёт и здоровье](theme.html?path=content/unity/igrovaya-logika-arhitektura/schet-i-zdorove.md)
- [Делегаты и события](theme.html?path=content/unity/igrovaya-logika-arhitektura/delegaty-i-sobytiya.md)
- [Практика: игровой цикл](theme.html?path=content/unity/igrovaya-logika-arhitektura/praktika-igrovoy-cikl.md)
