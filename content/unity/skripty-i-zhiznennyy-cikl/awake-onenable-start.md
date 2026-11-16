---
title: Awake, OnEnable, Start
description: Порядок инициализации MonoBehaviour: чем Awake отличается от Start и зачем нужен OnEnable.
keywords: Unity Awake, OnEnable, Start, порядок вызовов, инициализация, MonoBehaviour, подписки

---

# Awake, OnEnable, Start

У `MonoBehaviour` несколько методов инициализации. Они вызываются в разном
порядке и для разных задач. Если перепутать `Awake` и `Start`, появляются ошибки
вроде «ссылка ещё не готова» или «объект уже уничтожен».

## Порядок

Для активного объекта порядок такой:

```text
Awake → OnEnable → Start → Update → ... → OnDisable → OnDestroy
```

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/skripty-i-zhiznennyy-cikl/lifecycle.svg"
    alt="Схема жизненного цикла MonoBehaviour: Awake, OnEnable, Start, Update, FixedUpdate, LateUpdate, OnDisable, OnDestroy"
    width="900"
  >
  <figcaption>
    Основные этапы жизненного цикла компонента Unity.
  </figcaption>
</figure>

## Awake

`Awake` вызывается один раз, когда объект создаётся. Даже если компонент
выключен, `Awake` всё равно выполнится.

Что делать в `Awake`:

- инициализировать собственные поля;
- кэшировать компоненты через `GetComponent`;
- создавать внутренние структуры.

Не стоит в `Awake` зависеть от других объектов: они могут быть ещё не готовы.

```csharp
private Rigidbody _rigidbody;

private void Awake()
{
    _rigidbody = GetComponent<Rigidbody>();
}
```

## OnEnable

`OnEnable` вызывается каждый раз, когда компонент или GameObject включается.
После `Awake` — первый раз, затем — при повторном включении.

Что делать в `OnEnable`:

- подписываться на события;
- включать подписки на ввод;
- запускать корутины, которые должны работать только при активном объекте.

```csharp
private void OnEnable()
{
    GameEvents.PlayerDied += OnPlayerDied;
}

private void OnDisable()
{
    GameEvents.PlayerDied -= OnPlayerDied;
}
```

Пара `OnEnable` / `OnDisable` важна: если подписаться, но не отписаться, можно
получить вызов на уничтоженном объекте.

## Start

`Start` вызывается один раз перед первым `Update`, но только если компонент
включён. В `Start` уже можно обращаться к другим объектам сцены.

```csharp
private void Start()
{
    _target = GameObject.FindWithTag("Player").transform;
}
```

`Start` удобен для зависимостей: когда все `Awake` уже прошли, ссылки на другие
компоненты обычно готовы.

## Awake или Start

| Задача | Метод |
|---|---|
| Кэшировать свой `Rigidbody` | `Awake` |
| Подписаться на событие | `OnEnable` |
| Найти объект по тегу | `Start` |
| Инициализировать UI после загрузки сцены | `Start` |
| Отписаться от события | `OnDisable` |

## Частые ошибки

- **Ищут другой объект в `Awake`.** Он может быть ещё не инициализирован.
- **Подписываются в `Start`, а отписываются в `OnDisable`.** Если объект
  выключили до `Start`, подписки не было, а отписка есть.
- **Запускают бесконечную корутину в `Awake`.** Лучше в `OnEnable` или `Start`.
- **Думают, что `Start` вызывается каждый кадр.** Это `Update`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вызывается раньше?",
  "options": [
    {
      "text": "`Awake`",
      "correct": true,
      "explanation": "`Awake` идёт до `OnEnable` и `Start`."
    },
    {
      "text": "`Start`",
      "correct": false,
      "explanation": "`Start` вызывается после `Awake` и `OnEnable`."
    },
    {
      "text": "`Update`",
      "correct": false,
      "explanation": "`Update` начинается после `Start`."
    }
  ],
  "explanation": "Порядок: `Awake` → `OnEnable` → `Start` → `Update`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что логично делать в `OnEnable`?",
  "options": [
    {
      "text": "Подписываться на события",
      "correct": true
    },
    {
      "text": "Включать подписки на ввод",
      "correct": true
    },
    {
      "text": "Отписываться в парном `OnDisable`",
      "correct": true
    },
    {
      "text": "Искать объект по тегу, который ещё не создан",
      "correct": false,
      "explanation": "Для зависимостей лучше `Start`."
    }
  ],
  "explanation": "`OnEnable` и `OnDisable` — парные методы для подписок и ресурсов."
}
```

## Куда дальше

- [Update, FixedUpdate, LateUpdate](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/update-fixedupdate-lateupdate.md)
- [Первый скрипт](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/pervyy-skript.md)
- [Практика: жизненный цикл](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/praktika-zhiznennyy-cikl.md)
