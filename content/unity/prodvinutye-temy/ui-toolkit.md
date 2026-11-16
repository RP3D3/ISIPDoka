---
title: UI Toolkit
description: UXML, USS, UIDocument и VisualElement: интерфейс, который описывается структурой и стилями.
keywords: Unity UI Toolkit, UXML, USS, UIDocument, VisualElement, UI Builder, runtime UI

---

# UI Toolkit

UI Toolkit — альтернатива uGUI. Интерфейс описывается в **UXML** (структура) и
**USS** (стили), а код работает с `VisualElement`.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/prodvinutye-temy/ui-toolkit.svg"
    alt="Схема UI Toolkit: UXML, USS, UIDocument и VisualElement tree"
    width="900"
  >
  <figcaption>
    UXML и USS описывают интерфейс, UIDocument связывает его со сценой.
  </figcaption>
</figure>

## Установка

UI Toolkit входит в Unity. Для удобной работы откройте **Window → UI Toolkit →
UI Builder**. В Unity 6 runtime UI Toolkit — основной современный путь; в
2022.3 он тоже работает, но часть возможностей отличается.

## UXML

```xml
<ui:UXML xmlns:ui="UnityEngine.UIElements">
  <ui:VisualElement class="menu">
    <ui:Label text="Главное меню" class="title" />
    <ui:Button name="start-button" text="Играть" />
    <ui:Button name="quit-button" text="Выход" />
  </ui:VisualElement>
</ui:UXML>
```

`name` нужен, чтобы найти элемент из кода. `class` связывает элемент с USS.

## USS

```css
.menu {
    padding: 24px;
    background-color: rgba(0, 0, 0, 0.7);
}

.title {
    font-size: 28px;
    color: white;
}

Button {
    margin: 6px;
    padding: 8px 16px;
}
```

USS похож на CSS, но это не CSS: поддерживаются не все свойства.

## UIDocument

1. Создайте GameObject.
2. Добавьте `UIDocument`.
3. Назначьте `Panel Settings`.
4. Назначьте UXML asset.
5. Добавьте USS в UXML или в `UIDocument`.

`Panel Settings` задаёт масштаб и способ отрисовки.

## Код

```csharp
using UnityEngine;
using UnityEngine.UIElements;

[RequireComponent(typeof(UIDocument))]
public class MainMenu : MonoBehaviour
{
    private void OnEnable()
    {
        var root = GetComponent<UIDocument>().rootVisualElement;

        var start = root.Q<Button>("start-button");
        var quit = root.Q<Button>("quit-button");

        start.clicked += OnStart;
        quit.clicked += OnQuit;
    }

    private void OnDisable()
    {
        var root = GetComponent<UIDocument>().rootVisualElement;

        root.Q<Button>("start-button").clicked -= OnStart;
        root.Q<Button>("quit-button").clicked -= OnQuit;
    }

    private void OnStart()
    {
        Debug.Log("Старт");
    }

    private void OnQuit()
    {
        Application.Quit();
    }
}
```

`Q<T>("name")` ищет элемент по имени. Подписка и отписка — как у обычных
событий.

## UI Toolkit или uGUI

| Ситуация | Что выбрать |
|---|---|
| Быстрый HUD в сцене | uGUI |
| Сложные меню и редакторы | UI Toolkit |
| Много стилей и переиспользование | UI Toolkit |
| 3D-интерфейс в мире | uGUI или World Space |
| Совместимость со старыми туториалами | uGUI |

## Частые ошибки

- **Забыли `Panel Settings`.** UI не отображается.
- **Ищут элемент до загрузки UXML.** `rootVisualElement` пуст.
- **Не отписываются от `clicked`.** После перезагрузки возможны дубликаты.
- **Путают USS и CSS.** Не все свойства поддерживаются.
- **Смешивают uGUI и UI Toolkit без плана.** Два разных подхода к UI.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что описывает UXML?",
  "options": [
    {
      "text": "Структуру интерфейса",
      "correct": true,
      "explanation": "UXML — разметка элементов."
    },
    {
      "text": "Стили интерфейса",
      "correct": false,
      "explanation": "Стили описывает USS."
    },
    {
      "text": "Физику",
      "correct": false,
      "explanation": "Физика не связана с UI Toolkit."
    }
  ],
  "explanation": "UXML — структура, USS — стили."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про UI Toolkit?",
  "options": [
    {
      "text": "Использует `VisualElement`",
      "correct": true
    },
    {
      "text": "Может работать в runtime",
      "correct": true
    },
    {
      "text": "Стили описываются в USS",
      "correct": true
    },
    {
      "text": "Заменяет физику",
      "correct": false,
      "explanation": "UI Toolkit — только интерфейс."
    }
  ],
  "explanation": "UI Toolkit — это UXML, USS, UIDocument и VisualElement."
}
```

## Куда дальше

- [Продвинутые темы: итог](theme.html?path=content/unity/prodvinutye-temy/itog-prodvinutye-temy.md)
- [NavMesh и навигация](theme.html?path=content/unity/prodvinutye-temy/navmesh-i-navigaciya.md)
- [UI и интерфейс](theme.html?path=content/unity/ui-i-interfeys/canvas.md)
