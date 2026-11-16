---
title: Поля в Inspector
description: Как показать поля скрипта в Inspector через SerializeField, Range, Header и Tooltip.
keywords: Unity Inspector, SerializeField, Range, Header, Tooltip, HideInInspector, поля скрипта

---

# Поля в Inspector

Одна из сильных сторон Unity — настройка значений прямо в редакторе. Чтобы поле
появилось в Inspector, его нужно правильно объявить.

## Public и private

По умолчанию `public`-поля видны в Inspector, а `private` — нет.

```csharp
public class PlayerSettings : MonoBehaviour
{
    public float speed = 5f;       // видно в Inspector
    private float _health = 100f;  // не видно
}
```

Но делать всё `public` опасно: любой другой скрипт может изменить значение. Для
настройки из редактора лучше private-поле с `[SerializeField]`.

## SerializeField

```csharp
using UnityEngine;

public class PlayerSettings : MonoBehaviour
{
    [SerializeField] private float _speed = 5f;
    [SerializeField] private int _health = 100;
    [SerializeField] private Transform _spawnPoint;
}
```

`[SerializeField]` говорит Unity: «сохрани это поле и покажи его в Inspector», но
оставляет его private для C#-кода.

## Атрибуты для удобства

```csharp
using UnityEngine;

public class WeaponSettings : MonoBehaviour
{
    [Header("Основное")]
    [SerializeField] private string _name = "Blaster";
    [SerializeField] private int _damage = 10;

    [Header("Движение")]
    [Range(0f, 20f)]
    [SerializeField] private float _speed = 8f;

    [Tooltip("Время между выстрелами в секундах")]
    [SerializeField] private float _fireRate = 0.25f;

    [HideInInspector]
    [SerializeField] private int _debugCounter;
}
```

- `[Header]` — заголовок группы полей.
- `[Range]` — ползунок с ограничением.
- `[Tooltip]` — подсказка при наведении.
- `[HideInInspector]` — поле сериализуется, но не показывается.

## Ссылки на объекты

Поля могут хранить ссылки на компоненты и ассеты:

```csharp
[SerializeField] private Rigidbody _rigidbody;
[SerializeField] private GameObject _bulletPrefab;
[SerializeField] private AudioClip _shotSound;
```

В Inspector такие поля выглядят как слоты, куда перетаскивают объекты из
Hierarchy или Project. Это удобнее, чем искать объекты по имени в коде.

## Не всё нужно сериализовать

Не стоит показывать в Inspector:

- временные счётчики;
- кэш компонентов;
- внутренние состояния;
- поля, которые должны быть только для чтения.

Для кэша используйте private-поле без `[SerializeField]` и заполняйте его в
`Awake`.

## Частые ошибки

- **Делают все поля `public`.** Это ломает инкапсуляцию.
- **Меняют значение в Play и ждут, что оно сохранится.** Изменения в Play
  откатываются после остановки.
- **Ставят `[SerializeField]` на свойство.** Атрибут работает с полями, а не со
  свойствами.
- **Забывают сохранить сцену.** Значения полей хранятся в сцене или префабе.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как показать private-поле в Inspector?",
  "options": [
    {
      "text": "Добавить `[SerializeField]`",
      "correct": true,
      "explanation": "Атрибут сериализует private-поле и показывает его в Inspector."
    },
    {
      "text": "Сделать его `static`",
      "correct": false,
      "explanation": "`static` не связано с Inspector."
    },
    {
      "text": "Добавить `[HideInInspector]`",
      "correct": false,
      "explanation": "Этот атрибут наоборот скрывает поле."
    }
  ],
  "explanation": "`[SerializeField]` — стандартный способ показать private-поле."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делают атрибуты полей?",
  "options": [
    {
      "text": "`[Header]` добавляет заголовок группы",
      "correct": true
    },
    {
      "text": "`[Range]` ограничивает значение ползунком",
      "correct": true
    },
    {
      "text": "`[Tooltip]` показывает подсказку",
      "correct": true
    },
    {
      "text": "`[SerializeField]` делает поле public",
      "correct": false,
      "explanation": "Поле остаётся private для C#-кода."
    }
  ],
  "explanation": "Атрибуты управляют отображением и сериализацией полей."
}
```

## Куда дальше

- [Ссылки на компоненты](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/ssylki-na-komponenty.md)
- [Debug и Console](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/debug-i-console.md)
- [Практика: жизненный цикл](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/praktika-zhiznennyy-cikl.md)
