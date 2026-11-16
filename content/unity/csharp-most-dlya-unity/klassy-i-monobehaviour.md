---
title: Классы и MonoBehaviour
description: Как C#-класс становится компонентом Unity, что такое gameObject и transform и зачем наследовать MonoBehaviour.
keywords: Unity C#, MonoBehaviour, класс, компонент, gameObject, transform, GetComponent, наследование

---

# Классы и MonoBehaviour

В обычном C# класс — это описание объекта. В Unity класс, унаследованный от
`MonoBehaviour`, становится **компонентом**, который можно повесить на
GameObject.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/csharp-most-dlya-unity/monobehaviour.svg"
    alt="Схема: класс PlayerController наследует MonoBehaviour и становится компонентом GameObject"
    width="900"
  >
  <figcaption>
    Класс описывает поведение, компонент связывает его с объектом сцены.
  </figcaption>
</figure>

## Класс, объект и компонент

```csharp
public class PlayerController : MonoBehaviour
{
    private void Update()
    {
        transform.Translate(Vector3.forward * Time.deltaTime);
    }
}
```

- `PlayerController` — класс;
- экземпляр класса на GameObject — компонент;
- GameObject — объект сцены, у которого есть Transform и другие компоненты.

Нельзя сделать `new PlayerController()` и ожидать, что он появится на сцене.
Компоненты создаёт Unity, когда вы добавляете их в Inspector или через
`AddComponent`.

## Что даёт MonoBehaviour

Внутри компонента доступны:

| Свойство | Что это |
|---|---|
| `gameObject` | объект, на котором висит компонент |
| `transform` | Transform этого объекта |
| `enabled` | включён ли компонент |
| `name` | имя GameObject |
| `tag` | тег объекта |

```csharp
private void Start()
{
    Debug.Log($"Я на объекте {gameObject.name}");
    Debug.Log($"Позиция: {transform.position}");
    enabled = false;
}
```

Если выключить `enabled`, компонент перестаёт получать `Update`, но объект
остаётся на сцене.

## Ссылки на другие компоненты

```csharp
private Rigidbody _body;

private void Awake()
{
    _body = GetComponent<Rigidbody>();
}
```

`GetComponent<T>()` ищет компонент на **этом** объекте. Если его нет, вернётся
`null`.

```csharp
if (TryGetComponent(out AudioSource source))
{
    source.Play();
}
```

`TryGetComponent` безопаснее: не бросает исключение и сразу говорит, есть ли
компонент.

## Имя файла

Для MonoBehaviour имя файла должно совпадать с именем класса:

```text
PlayerController.cs → public class PlayerController : MonoBehaviour
```

Иначе Unity не сможет привязать скрипт к компоненту.

## Частые ошибки

- **`new MonoBehaviour()`.** Компонент создаётся через `AddComponent` или
  Inspector.
- **Имя файла не совпадает с классом.** Скрипт не добавляется.
- **`GetComponent` в `Update`.** Лучше кэшировать в `Awake`.
- **Путают `transform` и `Transform`.** `transform` — свойство, `Transform` —
  тип.
- **Считают, что класс и компонент — одно и то же.** Класс — код, компонент —
  экземпляр на объекте.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает класс компонентом Unity?",
  "options": [
    {
      "text": "Наследование от `MonoBehaviour`",
      "correct": true,
      "explanation": "Именно MonoBehaviour даёт жизненный цикл и доступ к GameObject."
    },
    {
      "text": "Ключевое слово `static`",
      "correct": false,
      "explanation": "Статический класс не становится компонентом."
    },
    {
      "text": "Любое имя файла",
      "correct": false,
      "explanation": "Имя файла важно, но не делает класс компонентом."
    }
  ],
  "explanation": "Компонентом становится класс, унаследованный от MonoBehaviour."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что доступно внутри MonoBehaviour?",
  "options": [
    {
      "text": "`gameObject`",
      "correct": true
    },
    {
      "text": "`transform`",
      "correct": true
    },
    {
      "text": "`enabled`",
      "correct": true
    },
    {
      "text": "`console.log`",
      "correct": false,
      "explanation": "Это JavaScript, а не C#."
    }
  ],
  "explanation": "MonoBehaviour даёт доступ к объекту, Transform и состоянию компонента."
}
```

## Куда дальше

- [Поля, свойства и SerializeField](theme.html?path=content/unity/csharp-most-dlya-unity/polya-svoystva-serializefield.md)
- [Null и TryGetComponent](theme.html?path=content/unity/csharp-most-dlya-unity/null-i-trygetcomponent.md)
- [Первый скрипт](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/pervyy-skript.md)
