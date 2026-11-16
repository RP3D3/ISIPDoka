---
title: C#-мост для Unity
description: Итог перехода от C# к Unity: MonoBehaviour, поля, события, коллекции, корутины и безопасные ссылки.
keywords: Unity C# итог, MonoBehaviour, SerializeField, события, коллекции, корутины, TryGetComponent

---

# C#-мост для Unity

Эта группа связывает обычный C# с Unity. Мы разобрали, как класс становится
компонентом, как настраивать поля, связывать код событиями и не ловить
`NullReferenceException`.

## Что теперь должно быть понятно

- Класс-компонент наследуется от `MonoBehaviour`.
- `gameObject` и `transform` доступны внутри компонента.
- `[SerializeField]` открывает приватное поле в Inspector.
- Свойства управляют доступом, но не сериализуются автоматически.
- `Action` и `event` уменьшают связанность.
- `UnityEvent` настраивается в Inspector.
- `List<T>` — динамический список, `Dictionary` — ключ-значение, `Queue` — FIFO.
- Корутина — не поток, а пауза в основном потоке.
- `TryGetComponent` безопаснее `GetComponent` + проверка.
- `[RequireComponent]` гарантирует наличие зависимости.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Как сделать компонент? | Наследовать `MonoBehaviour` |
| Как показать приватное поле? | `[SerializeField]` |
| Как задать границы ползунка? | `[Range]` |
| Как подписаться на событие? | `+=` |
| Как отписаться? | `-=` |
| Где динамический список? | `List<T>` |
| Где поиск по ключу? | `Dictionary<TKey, TValue>` |
| Как сделать паузу? | `yield return new WaitForSeconds` |
| Как безопасно получить компонент? | `TryGetComponent` |

## Чек-лист

- [ ] Я понимаю, чем класс отличается от компонента.
- [ ] Я использую `[SerializeField] private`, а не всё public.
- [ ] Я подписываюсь и отписываюсь от событий.
- [ ] Я выбираю коллекцию под задачу.
- [ ] Я не создаю `List` в `Update` без необходимости.
- [ ] Я умею запускать и останавливать корутины.
- [ ] Я проверяю ссылки и использую `TryGetComponent`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `[SerializeField]`?",
  "options": [
    {
      "text": "Показывает приватное поле в Inspector",
      "correct": true,
      "explanation": "Поле остаётся приватным для кода."
    },
    {
      "text": "Делает поле глобальным",
      "correct": false,
      "explanation": "Это не глобальная переменная."
    },
    {
      "text": "Запускает корутину",
      "correct": false,
      "explanation": "Корутина запускается через `StartCoroutine`."
    }
  ],
  "explanation": "`SerializeField` связывает приватное поле с Inspector."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про C# в Unity?",
  "options": [
    {
      "text": "`MonoBehaviour` даёт жизненный цикл",
      "correct": true
    },
    {
      "text": "Корутины выполняются в основном потоке",
      "correct": true
    },
    {
      "text": "`TryGetComponent` безопасно проверяет компонент",
      "correct": true
    },
    {
      "text": "`Dictionary` всегда виден в Inspector",
      "correct": false,
      "explanation": "По умолчанию Dictionary не сериализуется."
    }
  ],
  "explanation": "C# в Unity — это компоненты, события, коллекции и безопасные ссылки."
}
```

## Куда дальше

- [Классы и MonoBehaviour](theme.html?path=content/unity/csharp-most-dlya-unity/klassy-i-monobehaviour.md)
- [Поля, свойства и SerializeField](theme.html?path=content/unity/csharp-most-dlya-unity/polya-svoystva-serializefield.md)
- [Первый скрипт](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/pervyy-skript.md)
