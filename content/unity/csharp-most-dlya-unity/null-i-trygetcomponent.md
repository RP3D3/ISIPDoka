---
title: Null и TryGetComponent
description: Как проверять ссылки, не ловить NullReferenceException и безопасно получать компоненты.
keywords: Unity C#, null, TryGetComponent, GetComponent, NullReferenceException, проверка ссылок

---

# Null и TryGetComponent

`NullReferenceException` — самая частая ошибка новичка. Обычно она означает, что
ссылка не назначена или компонент не найден.

## Null

```csharp
private Rigidbody _body;

private void Update()
{
    _body.AddForce(Vector3.up);
}
```

Если `_body` не назначен, будет `NullReferenceException`. Сначала проверьте
ссылку:

```csharp
if (_body == null)
{
    return;
}
```

## Unity и «фальшивый» null

Уничтоженный объект Unity может выглядеть как `null`, но это особый случай.
Проверка `if (obj == null)` работает с Unity-объектами корректно. Не сравнивайте
их через `ReferenceEquals` без понимания последствий.

## GetComponent

```csharp
Rigidbody body = GetComponent<Rigidbody>();
if (body != null)
{
    body.AddForce(Vector3.up);
}
```

`GetComponent` возвращает `null`, если компонента нет. Если компонент
обязателен, используйте `[RequireComponent]`:

```csharp
[RequireComponent(typeof(Rigidbody))]
public class Jumper : MonoBehaviour
{
}
```

Тогда Unity сама добавит нужный компонент.

## TryGetComponent

```csharp
if (TryGetComponent(out AudioSource source))
{
    source.Play();
}
```

`TryGetComponent` сразу возвращает `bool` и выдаёт компонент через `out`. Это
удобнее и безопаснее, чем `GetComponent` + проверка.

## Операторы `?.` и `??`

```csharp
_health?.TakeDamage(10);

string name = _playerName ?? "Игрок";
```

- `?.` вызывает метод, только если ссылка не `null`;
- `??` подставляет значение, если слева `null`.

Не злоупотребляйте `?.` там, где отсутствие ссылки — ошибка: лучше явно
проверить и залогировать.

## Ссылки из Inspector

```csharp
[SerializeField] private Transform _target;

private void Start()
{
    if (_target == null)
    {
        Debug.LogError("Target не назначен", this);
        enabled = false;
    }
}
```

`Debug.LogError` с контекстом подсветит объект в Hierarchy.

## Частые ошибки

- **Не проверили ссылку из Inspector.** Забыли назначить.
- **`GetComponent` каждый кадр.** Кэшируйте результат.
- **Ищут компонент на другом объекте.** `GetComponent` ищет только на своём.
- **Используют `Find` вместо ссылки.** Медленно и скрывает зависимости.
- **Считают, что `TryGetComponent` создаёт компонент.** Он только ищет.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем удобен `TryGetComponent`?",
  "options": [
    {
      "text": "Возвращает `bool` и сразу выдаёт компонент",
      "correct": true,
      "explanation": "Не нужно отдельно сравнивать с null."
    },
    {
      "text": "Создаёт компонент, если его нет",
      "correct": false,
      "explanation": "Он только ищет существующий компонент."
    },
    {
      "text": "Ищет по всей сцене",
      "correct": false,
      "explanation": "Он ищет на текущем объекте."
    }
  ],
  "explanation": "`TryGetComponent` безопасно проверяет наличие компонента."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает избежать `NullReferenceException`?",
  "options": [
    {
      "text": "Проверка ссылки перед использованием",
      "correct": true
    },
    {
      "text": "`TryGetComponent`",
      "correct": true
    },
    {
      "text": "`[RequireComponent]`",
      "correct": true
    },
    {
      "text": "Вызов метода без проверки",
      "correct": false,
      "explanation": "Именно так и появляется исключение."
    }
  ],
  "explanation": "Проверки, TryGetComponent и RequireComponent снижают риск ошибок."
}
```

## Куда дальше

- [C#-мост для Unity: итог](theme.html?path=content/unity/csharp-most-dlya-unity/itog-csharp-most.md)
- [Классы и MonoBehaviour](theme.html?path=content/unity/csharp-most-dlya-unity/klassy-i-monobehaviour.md)
- [Ссылки на компоненты](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/ssylki-na-komponenty.md)
