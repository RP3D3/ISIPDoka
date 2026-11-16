---
title: Ссылки на компоненты
description: GetComponent, TryGetComponent, ссылки через Inspector и RequireComponent — как не искать компоненты каждый кадр.
keywords: Unity GetComponent, TryGetComponent, RequireComponent, GetComponentInChildren, ссылки на компоненты, кэширование

---

# Ссылки на компоненты

Скрипту почти всегда нужны другие компоненты: `Rigidbody`, `Animator`,
`Collider`, `AudioSource` или чужой скрипт. Есть два основных способа получить
ссылку: найти её в коде или передать через Inspector.

## Ссылка через Inspector

Самый предсказуемый способ:

```csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private Rigidbody _rigidbody;
    [SerializeField] private Transform _cameraTarget;

    private void FixedUpdate()
    {
        _rigidbody.MovePosition(_rigidbody.position + Vector3.forward * 2f * Time.fixedDeltaTime);
    }
}
```

В Inspector перетащите компонент `Rigidbody` в поле. Если ссылка не назначена,
будет `null`, и код упадёт с `NullReferenceException`.

## GetComponent

Если компонент находится на том же GameObject:

```csharp
private Rigidbody _rigidbody;

private void Awake()
{
    _rigidbody = GetComponent<Rigidbody>();
}
```

`GetComponent` возвращает компонент или `null`, если его нет.

## TryGetComponent

Безопасный вариант:

```csharp
private void Awake()
{
    if (!TryGetComponent(out Rigidbody rigidbody))
    {
        Debug.LogError("Нужен Rigidbody");
        enabled = false;
        return;
    }

    _rigidbody = rigidbody;
}
```

`TryGetComponent` не выбрасывает исключение и сразу сообщает, есть ли компонент.

## Поиск у детей и родителей

```csharp
Animator animator = GetComponentInChildren<Animator>();
Collider parentCollider = GetComponentInParent<Collider>();
```

- `GetComponentInChildren` ищет на объекте и его детях.
- `GetComponentInParent` ищет на объекте и его родителях.
- `GetComponents` возвращает массив всех компонентов типа.

Эти методы дороже, чем `GetComponent`, поэтому не вызывайте их в `Update` без
необходимости.

## RequireComponent

Атрибут гарантирует, что при добавлении скрипта на объект появится нужный
компонент:

```csharp
[RequireComponent(typeof(Rigidbody))]
public class PlayerMovement : MonoBehaviour
{
    private Rigidbody _rigidbody;

    private void Awake()
    {
        _rigidbody = GetComponent<Rigidbody>();
    }
}
```

Если попытаться удалить `Rigidbody`, Unity не даст это сделать.

## Что выбрать

| Ситуация | Способ |
|---|---|
| Компонент на том же объекте | `TryGetComponent` или `[SerializeField]` |
| Компонент на ребёнке | `GetComponentInChildren` или ссылка |
| Компонент на родителе | `GetComponentInParent` или ссылка |
| Нужен другой объект сцены | ссылка через Inspector |
| Компонент обязателен | `[RequireComponent]` |

## Частые ошибки

- **Ищут компонент в `Update`.** Кэшируйте в `Awake` или `Start`.
- **Не проверяют `null`.** Ссылка из Inspector может быть пустой.
- **Ищут по имени.** Имена меняются; ссылки и теги надёжнее.
- **Забывают про `RequireComponent`.** Скрипт падает, если нужного компонента
  нет.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем `TryGetComponent` лучше `GetComponent` при необязательном компоненте?",
  "options": [
    {
      "text": "Он возвращает `false`, если компонента нет",
      "correct": true,
      "explanation": "`TryGetComponent` безопасно проверяет наличие."
    },
    {
      "text": "Он ищет компонент по имени",
      "correct": false,
      "explanation": "Он ищет по типу."
    },
    {
      "text": "Он работает только в `Update`",
      "correct": false,
      "explanation": "Его можно вызывать в любом методе."
    }
  ],
  "explanation": "`TryGetComponent` не выбрасывает исключение и возвращает результат проверки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про ссылки на компоненты?",
  "options": [
    {
      "text": "Ссылку можно передать через `[SerializeField]`",
      "correct": true
    },
    {
      "text": "`GetComponentInChildren` ищет на детях",
      "correct": true
    },
    {
      "text": "`[RequireComponent]` добавляет нужный компонент автоматически",
      "correct": true
    },
    {
      "text": "`GetComponent` в `Update` — хорошая практика",
      "correct": false,
      "explanation": "Лучше кэшировать ссылку в `Awake` или `Start`."
    }
  ],
  "explanation": "Ссылки кэшируют, передают через Inspector или требуют через атрибут."
}
```

## Куда дальше

- [Debug и Console](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/debug-i-console.md)
- [Поля в Inspector](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/polya-v-inspector.md)
- [Практика: жизненный цикл](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/praktika-zhiznennyy-cikl.md)
