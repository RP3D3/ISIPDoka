---
title: Поля, свойства и SerializeField
description: Как открывать поля в Inspector, не ломая инкапсуляцию, и зачем нужны свойства и атрибуты.
keywords: Unity C#, SerializeField, поля, свойства, Inspector, Range, Header, Tooltip, HideInInspector

---

# Поля, свойства и SerializeField

В Unity поля класса можно показать в Inspector. Это удобно для настройки, но
важно не делать все поля публичными без необходимости.

## Приватное поле в Inspector

```csharp
using UnityEngine;

public class PlayerSettings : MonoBehaviour
{
    [SerializeField] private float _speed = 5f;
    [SerializeField] private int _maxHealth = 100;
}
```

`[SerializeField]` говорит Unity сериализовать приватное поле и показать его в
Inspector. Код снаружи по-прежнему не может менять поле напрямую.

## Публичное поле

```csharp
public float speed = 5f;
```

Работает, но открывает поле всем. Для учебных примеров допустимо, для проекта
лучше `[SerializeField] private`.

## Свойства

Свойство — это контролируемый доступ к значению:

```csharp
public class Health : MonoBehaviour
{
    [SerializeField] private int _maxHealth = 100;
    [SerializeField] private int _currentHealth = 100;

    public int Current => _currentHealth;
    public int Max => _maxHealth;
    public bool IsDead => _currentHealth <= 0;
}
```

Снаружи можно читать `Current`, но нельзя случайно записать любое значение.
Свойства не показываются в Inspector автоматически.

## Атрибуты Inspector

```csharp
[Header("Движение")]
[SerializeField, Range(0f, 20f)] private float _speed = 5f;

[Tooltip("Сколько здоровья у игрока")]
[SerializeField, Min(1)] private int _maxHealth = 100;

[HideInInspector] public bool initialized;
```

- `[Header]` — заголовок группы;
- `[Range]` — ползунок с границами;
- `[Tooltip]` — подсказка;
- `[Min]` — минимальное значение;
- `[HideInInspector]` — скрыть поле.

## Сериализация

Unity сохраняет сериализуемые поля в сцене и префабе. Не все типы
сериализуются:

- числа, строки, bool;
- `Vector3`, `Color`, `AnimationCurve`;
- ссылки на компоненты и GameObject;
- `[Serializable]` классы и структуры;
- массивы и `List<T>`.

Словари `Dictionary` по умолчанию не сериализуются.

## Частые ошибки

- **Все поля `public`.** Ломается инкапсуляция.
- **Свойство вместо поля в Inspector.** Свойства не сериализуются.
- **`Dictionary` в Inspector.** Нужна обёртка или отдельный список.
- **Меняют `[SerializeField]` поле из другого класса.** Оно приватное.
- **Забыли `[Serializable]` у класса.** Вложенный объект не появится.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `[SerializeField]`?",
  "options": [
    {
      "text": "Показывает приватное поле в Inspector и сериализует его",
      "correct": true,
      "explanation": "Поле остаётся приватным для кода, но доступным редактору."
    },
    {
      "text": "Делает поле публичным",
      "correct": false,
      "explanation": "Доступ из кода не меняется."
    },
    {
      "text": "Удаляет поле при сборке",
      "correct": false,
      "explanation": "Поле наоборот сохраняется."
    }
  ],
  "explanation": "`SerializeField` открывает поле только для сериализации и Inspector."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про поля и свойства?",
  "options": [
    {
      "text": "`[Range]` задаёт границы ползунка",
      "correct": true
    },
    {
      "text": "`[Header]` группирует поля",
      "correct": true
    },
    {
      "text": "Свойства не сериализуются автоматически",
      "correct": true
    },
    {
      "text": "`Dictionary` всегда виден в Inspector",
      "correct": false,
      "explanation": "По умолчанию Dictionary не сериализуется."
    }
  ],
  "explanation": "Атрибуты помогают редактору, а свойства — коду."
}
```

## Куда дальше

- [Делегаты, события и лямбды](theme.html?path=content/unity/csharp-most-dlya-unity/delegaty-sobytiya-lyambdy.md)
- [Коллекции в игре](theme.html?path=content/unity/csharp-most-dlya-unity/kollekcii-v-igre.md)
- [Поля в Inspector](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/polya-v-inspector.md)
