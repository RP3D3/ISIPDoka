---
title: Кнопки и события
description: Компонент Button, событие onClick, UnityEvent, подписка из Inspector и из кода, отписка и состояния кнопки.
keywords: Unity Button, onClick, UnityEvent, AddListener, RemoveListener, Interactable, UI события, кнопка Unity

---

# Кнопки и события

**Button** — основной интерактивный элемент UI. У неё есть визуальные состояния,
переходы и событие `onClick`, которое вызывается после нажатия. Через кнопки
запускают игру, открывают меню, покупают улучшения и ставят паузу.

Важно понимать: кнопка не «знает» ваш игровой код. Она лишь сообщает, что
произошёл клик, а подписанный метод решает, что делать дальше.

## Компонент Button

Button наследуется от `Selectable` и обычно стоит на объекте с `Image`.
Основные поля в Inspector:

- **Interactable** — можно ли нажимать кнопку;
- **Transition** — как меняется вид: `Color Tint`, `Sprite Swap`, `Animation`;
- **Target Graphic** — какой графический элемент подсвечивать;
- **Navigation** — как переключаться клавиатурой и геймпадом;
- **On Click ()** — список методов, которые вызовутся при клике.

У кнопки должен быть графический элемент с включённым `Raycast Target`, иначе
клик не найдёт цель. Текст внутри кнопки обычно делают дочерним
`TextMeshProUGUI`.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/ui-i-interfeys/button.png"
    alt="Компонент Button в Inspector: Interactable, Transition и список On Click"
    width="292"
  >
  <figcaption>
    Button в Inspector: Interactable, Transition, Target Graphic и список
    обработчиков On Click.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/script-Button.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Button
    </a>
  </figcaption>
</figure>

## Подписка в Inspector

Самый быстрый способ — добавить обработчик прямо в сцене или префабе:

1. Выберите кнопку.
2. В компоненте `Button` найдите **On Click ()**.
3. Нажмите **+**.
4. Перетащите объект со скриптом в поле объекта.
5. Выберите метод в выпадающем списке.

В списке появляются публичные методы, которые возвращают `void` и принимают
ноль или один аргумент поддерживаемого типа. Если метода нет, проверьте
`public`, сигнатуру и то, что скрипт скомпилировался.

Такие обработчики сохраняются вместе со сценой или префабом. Их удобно
использовать для простых действий: «Открыть меню», «Перезапустить»,
«Продолжить».

## Подписка в коде

Если кнопка создаётся из кода или логика должна быть динамической, подписку
делают через `AddListener`. Снимать обработчик нужно в `OnDisable` или
`OnDestroy`, иначе после повторного включения объекта он добавится ещё раз.

```csharp
using UnityEngine;
using UnityEngine.UI;

public class StartButton : MonoBehaviour
{
    [SerializeField] private Button _startButton;

    private void OnEnable()
    {
        _startButton.onClick.AddListener(OnStartClicked);
    }

    private void OnDisable()
    {
        _startButton.onClick.RemoveListener(OnStartClicked);
    }

    private void OnStartClicked()
    {
        Debug.Log("Игра начинается");
    }
}
```

`Button.onClick` — это `UnityEvent`, а не обычное C#-событие. У него есть
`AddListener`, `RemoveListener` и `Invoke`.

## Лямбды и параметры

Лямбда удобна, когда нужно передать дополнительное значение. Но удалить
анонимную лямбду нельзя: при каждом создании это новый делегат. Сохраните
ссылку на `UnityAction`.

```csharp
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class LambdaButton : MonoBehaviour
{
    [SerializeField] private Button _button;
    [SerializeField] private int _scoreToAdd = 10;

    private UnityAction _handler;

    private void OnEnable()
    {
        _handler = () => AddScore(_scoreToAdd);
        _button.onClick.AddListener(_handler);
    }

    private void OnDisable()
    {
        _button.onClick.RemoveListener(_handler);
    }

    private void AddScore(int amount)
    {
        Debug.Log($"Добавлено очков: {amount}");
    }
}
```

Если параметр известен заранее, проще назначить метод в Inspector и указать
аргумент в поле рядом с методом. Для динамических данных используйте
замыкание, но не забывайте про отписку.

## Состояния и навигация

Кнопку можно выключить без изменения её внешнего вида:

```csharp
_startButton.interactable = false;
```

В этом состоянии клики не вызывают `onClick`, а `Transition` показывает
`Disabled Color` или другой спрайт.

`Navigation` отвечает за переход фокуса клавиатурой и геймпадом. В режиме
`Automatic` Unity сама ищет соседние элементы, в `Explicit` вы задаёте их
вручную. Для меню, управляемого геймпадом, обычно назначают первую кнопку
через `EventSystem`.

## Частые ошибки

- **`AddListener` в `OnEnable` без `RemoveListener`.** После нескольких
  включений один клик вызывает метод несколько раз.
- **Кнопка на выключенном объекте.** Пока GameObject неактивен, кликов не
  будет.
- **Метод не виден в On Click.** Он не публичный, возвращает не `void` или
  имеет неподходящую сигнатуру.
- **Забыта ссылка на Button.** В рантайме получаете
  `NullReferenceException`.
- **Поверх кнопки лежит прозрачная картинка с `Raycast Target`.** Клик
  перехватывает она, а не кнопка.
- **Логика кнопки продублирована в `Update`.** Для нажатий достаточно
  `onClick`, опрос ввода каждый кадр не нужен.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как подписаться на клик кнопки из кода?",
  "options": [
    {
      "text": "`_button.onClick.AddListener(OnClick);`",
      "correct": true,
      "explanation": "AddListener добавляет обработчик в UnityEvent."
    },
    {
      "text": "`_button.onClick = OnClick;`",
      "correct": false,
      "explanation": "Так нельзя присвоить метод: onClick — это UnityEvent."
    },
    {
      "text": "`_button.Click();`",
      "correct": false,
      "explanation": "У Button нет метода Click для имитации нажатия."
    }
  ],
  "explanation": "Для Button используют onClick.AddListener и парный RemoveListener."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Button и UnityEvent?",
  "options": [
    {
      "text": "On Click можно настроить в Inspector",
      "correct": true
    },
    {
      "text": "Обработчик, добавленный в OnEnable, стоит снимать в OnDisable",
      "correct": true
    },
    {
      "text": "Button.onClick передаёт произвольное число аргументов",
      "correct": false,
      "explanation": "У onClick нет аргументов; дополнительные значения передают через замыкание."
    },
    {
      "text": "interactable = false делает кнопку недоступной для нажатия",
      "correct": true
    }
  ],
  "explanation": "UnityEvent хранит список обработчиков; подписки нужно парно снимать."
}
```

## Куда дальше

- [Canvas](theme.html?path=content/unity/ui-i-interfeys/canvas.md)
- [EventSystem и Input Module](theme.html?path=content/unity/ui-i-interfeys/eventsystem-i-input-module.md)
- [Меню и пауза](theme.html?path=content/unity/ui-i-interfeys/menyu-i-pauza.md)
