---
title: Canvas
description: Canvas и его режимы рендера, Canvas Scaler и базовые настройки UI в Unity 6 и Unity 2022.3 LTS.
keywords: Unity Canvas, Canvas Scaler, Screen Space Overlay, Screen Space Camera, World Space, Render Mode, Graphic Raycaster, UI

---

# Canvas

**Canvas** — корневой объект интерфейса. Все элементы UI — `Image`,
`TextMeshProUGUI`, `Button`, `Slider` — должны быть его потомками. Canvas задаёт
систему координат, режим отрисовки и масштаб, по которому Unity раскладывает
интерфейс на экране.

Без Canvas компоненты UI просто некуда рисовать: они не попадут в итоговое
изображение.

## Зачем нужен Canvas

Canvas выполняет несколько задач:

- собирает графические элементы UI в общий список отрисовки;
- определяет, как интерфейс соотносится с экраном и камерой;
- задаёт опорное разрешение через `Canvas Scaler`;
- через `Graphic Raycaster` участвует в обработке кликов.

Сам Canvas — это GameObject с компонентом `Canvas` и `RectTransform`. Дочерние
элементы тоже используют `RectTransform`, а не обычный `Transform`.

## Режимы рендера

У Canvas есть свойство **Render Mode**. От него зависит, где и как рисуется
интерфейс.

| Режим | Как работает | Когда использовать |
|---|---|---|
| `Screen Space - Overlay` | UI рисуется поверх сцены и растягивается по экрану | HUD, меню, большинство игр |
| `Screen Space - Camera` | UI рисует указанная камера на заданном расстоянии | если UI должен взаимодействовать с 3D-сценой |
| `World Space` | Canvas — обычный объект сцены | таблички, экраны в мире, интерфейс на стене |

**Screen Space - Overlay** не требует камеры: интерфейс всегда поверх всего.
Это самый простой и самый частый вариант для HUD и меню.

**Screen Space - Camera** привязывает Canvas к камере. Появляется параметр
`Plane Distance` — расстояние от камеры до плоскости UI. Настройки камеры
(например, поле зрения) начинают влиять на интерфейс, а 3D-объекты могут
оказаться перед ним или за ним.

**World Space** превращает Canvas в объект в мире. Его можно двигать,
поворачивать и масштабировать. Так делают экраны терминалов, надписи над
персонажами и интерактивные панели в 3D-сцене.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/ui-i-interfeys/canvas.png"
    alt="Canvas в режиме Screen Space — Overlay: меню поверх сцены и настройки Canvas в Inspector"
    width="843"
  >
  <figcaption>
    Screen Space — Overlay: Canvas растянут по экрану, а интерфейс рисуется
    поверх сцены. В Inspector видны Render Mode, Pixel Perfect и Order in Layer.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/UICanvas.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Canvas
    </a>
  </figcaption>
</figure>

## Canvas Scaler

`Canvas Scaler` управляет масштабом UI под разрешение экрана. У него три
режима **UI Scale Mode**.

| Режим | Что делает | Когда подходит |
|---|---|---|
| `Constant Pixel Size` | размеры UI остаются в пикселях | фиксированное разрешение, пиксельная графика |
| `Scale With Screen Size` | масштабирует UI относительно reference resolution | игры под разные экраны и пропорции |
| `Constant Physical Size` | считает размеры в физических единицах | если важен физический размер интерфейса |

Для обычной игры чаще всего берут **Scale With Screen Size**:

- **Reference Resolution** — разрешение, под которое нарисован макет,
  например `1920 × 1080`;
- **Screen Match Mode** — как учитывать ширину и высоту;
- **Match** — баланс между шириной и высотой при режиме
  `Match Width Or Height`.

Режим `Expand` не обрезает интерфейс, `Shrink` старается вписать его целиком,
а `Match Width Or Height` позволяет плавно выбрать приоритет. Значение `0.5`
обычно даёт компромисс для ландшафтных игр.

Настроить Scaler можно и из кода:

```csharp
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(CanvasScaler))]
public class UiScaleSetup : MonoBehaviour
{
    private void Awake()
    {
        var scaler = GetComponent<CanvasScaler>();

        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1920f, 1080f);
        scaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
        scaler.matchWidthOrHeight = 0.5f;
    }
}
```

`CanvasScaler` находится в пространстве имён `UnityEngine.UI`.

## Переключение режима из кода

Режим Canvas можно менять в рантайме. Например, для отладки или для перехода
от меню к интерфейсу в мире.

```csharp
using UnityEngine;

[RequireComponent(typeof(Canvas))]
public class CanvasRenderModeExample : MonoBehaviour
{
    [SerializeField] private Camera _uiCamera;

    private Canvas _canvas;

    private void Awake()
    {
        _canvas = GetComponent<Canvas>();
    }

    public void UseOverlay()
    {
        _canvas.renderMode = RenderMode.ScreenSpaceOverlay;
    }

    public void UseCamera()
    {
        _canvas.renderMode = RenderMode.ScreenSpaceCamera;
        _canvas.worldCamera = _uiCamera;
        _canvas.planeDistance = 10f;
    }

    public void UseWorldSpace()
    {
        _canvas.renderMode = RenderMode.WorldSpace;
    }
}
```

Для `Screen Space - Camera` обязательно назначьте `worldCamera`, иначе UI может
не отрисоваться. Для `World Space` не забудьте задать размер и масштаб
`RectTransform` — по умолчанию Canvas в мире может оказаться огромным или
крошечным.

## Клики и порядок отрисовки

Чтобы кнопки на Canvas получали клики, нужны три вещи:

1. на сцене есть `EventSystem`;
2. на Canvas есть `Graphic Raycaster`;
3. у графического элемента включён `Raycast Target`.

Порядок элементов внутри одного Canvas определяется порядком в Hierarchy:
элемент ниже рисуется поверх верхнего. Если Canvas несколько, используйте
`Sorting Layer` и `Order in Layer`.

Иногда интерфейс делят на несколько Canvas. Например, отдельный Canvas для
редко меняющегося фона и отдельный для часто обновляемого HUD. Так изменение
одного элемента не заставляет перестраивать весь интерфейс.

## Частые ошибки

- **UI-элемент создан вне Canvas.** Проверьте, что он вложен в Canvas или его
  потомка.
- **Выбран `Screen Space - Camera`, но камера не назначена.** UI не виден.
- **Canvas в `World Space` без настройки масштаба.** Интерфейс выглядит
  гигантским или исчезающе маленьким.
- **Нет `Graphic Raycaster` или `EventSystem`.** Кнопки выглядят нормально, но
  не нажимаются.
- **Reference Resolution не совпадает с макетом.** UI «плывёт» на других
  пропорциях экрана.
- **Несколько Canvas с одинаковым Order in Layer.** Порядок становится
  непредсказуемым.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой режим Canvas рисует UI поверх сцены без участия камеры?",
  "options": [
    {
      "text": "Screen Space - Overlay",
      "correct": true,
      "explanation": "В этом режиме интерфейс всегда поверх сцены и растянут по экрану."
    },
    {
      "text": "Screen Space - Camera",
      "correct": false,
      "explanation": "Здесь UI рисует указанная камера на заданном расстоянии."
    },
    {
      "text": "World Space",
      "correct": false,
      "explanation": "В World Space Canvas — обычный объект сцены."
    }
  ],
  "explanation": "Для HUD и меню чаще всего используют Screen Space - Overlay."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Canvas и Canvas Scaler?",
  "options": [
    {
      "text": "Screen Space - Overlay не требует камеры для отрисовки UI",
      "correct": true
    },
    {
      "text": "Scale With Screen Size использует reference resolution",
      "correct": true
    },
    {
      "text": "Canvas в World Space нельзя поворачивать",
      "correct": false,
      "explanation": "World Space Canvas — обычный объект, его можно двигать и поворачивать."
    },
    {
      "text": "Graphic Raycaster нужен, чтобы кнопки получали клики",
      "correct": true
    }
  ],
  "explanation": "Canvas задаёт режим отрисовки и масштаб, а Raycaster участвует в обработке кликов."
}
```

## Куда дальше

- [TextMeshPro](theme.html?path=content/unity/ui-i-interfeys/textmeshpro.md)
- [Кнопки и события](theme.html?path=content/unity/ui-i-interfeys/knopki-i-sobytiya.md)
- [HUD](theme.html?path=content/unity/ui-i-interfeys/hud.md)
