---
title: HUD
description: Сборка HUD: anchors и RectTransform, полоса здоровья, счёт, таймер, Layout Group и адаптация под разные экраны.
keywords: Unity HUD, health bar, anchors, RectTransform, Canvas Scaler, Layout Group, Image Filled, таймер, счёт

---

# HUD

**HUD** (heads-up display) — слой интерфейса поверх игры: здоровье, счёт,
таймер, патроны, мини-карта. HUD не должен мешать управлению и не должен
разъезжаться при смене разрешения.

Обычно HUD делают на отдельном Canvas в режиме **Screen Space - Overlay**.
Меню и подсказки можно вынести на другой Canvas с более высоким Order in Layer.

## Состав HUD

Типичный HUD состоит из нескольких групп:

- **полоса здоровья** — `Image` с заливкой или `Slider`;
- **счёт и таймер** — `TextMeshProUGUI`;
- **патроны и ресурсы** — текст и иконки;
- **мини-карта** — `RawImage` или отдельная камера;
- **подсказки** — короткий текст, который появляется на время.

Чем меньше элементов обновляется каждый кадр, тем лучше. Полоса здоровья и
счёт меняются по событию, а таймер — раз в секунду, а не каждый кадр.

## Anchors и RectTransform

Положение UI-элемента задаёт `RectTransform`. Ключевые свойства:

- **Anchor Min** и **Anchor Max** — точка привязки в долях родителя от `0` до
  `1`;
- **Pivot** — точка отсчёта самого элемента;
- **Anchored Position** — смещение относительно якоря;
- **Size Delta** — размер относительно расстояния между якорями.

Если `Anchor Min` и `Anchor Max` совпадают, элемент держится за одну точку.
Если различаются — элемент растягивается между ними.

Для углов экрана удобны готовые **Anchor Presets** в Inspector. Например,
для левого верхнего угла:

- `Anchor Min = (0, 1)`, `Anchor Max = (0, 1)`;
- `Pivot = (0, 1)`;
- `Anchored Position = (24, -24)`.

Для растягивания на весь экран:

- `Anchor Min = (0, 0)`, `Anchor Max = (1, 1)`;
- `Left`, `Right`, `Top`, `Bottom` равны `0`.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/ui-i-interfeys/hud-layout.svg"
    alt="Схема HUD: здоровье слева сверху, таймер по центру, счёт справа, патроны и мини-карта снизу"
    width="900"
  >
  <figcaption>
    Типовая раскладка HUD: угловые элементы держатся за свои якоря, а таймер —
    за верхний центр.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/UIBasicLayout.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Basic Layout (схема автора)
    </a>
  </figcaption>
</figure>

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/ui-i-interfeys/hud-anchors.png"
    alt="Один и тот же UI на разных пропорциях экрана: кнопки прижаты к углам"
    width="1240"
  >
  <figcaption>
    Один и тот же набор элементов на разных пропорциях экрана. Благодаря
    якорям кнопки остаются у углов, а не уезжают вместе с центром.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/HOWTO-UIMultiResolution.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Designing UI for Multiple Resolutions
    </a>
  </figcaption>
</figure>

## Полоса здоровья

Самый простой вариант — два `Image`:

1. фон с тёмным цветом;
2. дочерний `Fill` с цветом здоровья.

У `Fill` установите:

- **Image Type** — `Filled`;
- **Fill Method** — `Horizontal`;
- **Fill Origin** — `Left`;
- **Fill Amount** — от `0` до `1`.

Если оставить **Image Type = Simple**, свойство `fillAmount` ни на что не
повлияет — это частая причина «полоса не меняется».

```csharp
using UnityEngine;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    [SerializeField] private Image _fill;
    [SerializeField] private float _maxHealth = 100f;

    public void SetHealth(float current)
    {
        var normalized = _maxHealth > 0f
            ? Mathf.Clamp01(current / _maxHealth)
            : 0f;

        _fill.fillAmount = normalized;
    }
}
```

Вместо `Image` можно взять `Slider`: `Min Value = 0`, `Max Value = 1`,
`Interactable = false`, а значение менять через `value`. Для радиального
кулдауна у `Image` выбирают `Fill Method = Radial 360`.

## Счёт и таймер

Счёт меняется по событию: игрок собрал монету, победил врага, выполнил задание.
Не нужно пересчитывать строку каждый кадр.

```csharp
using TMPro;
using UnityEngine;

public class ScoreHud : MonoBehaviour
{
    [SerializeField] private TMP_Text _scoreText;

    private int _score;

    public void AddScore(int amount)
    {
        _score += amount;
        _scoreText.text = $"Счёт: {_score}";
    }
}
```

Таймер зависит от времени, но текст достаточно обновлять при смене целой
секунды.

```csharp
using TMPro;
using UnityEngine;

public class TimerHud : MonoBehaviour
{
    [SerializeField] private TMP_Text _timerText;
    [SerializeField] private float _duration = 60f;

    private float _timeLeft;
    private int _lastShownSecond = -1;

    private void Start()
    {
        _timeLeft = _duration;
    }

    private void Update()
    {
        _timeLeft = Mathf.Max(0f, _timeLeft - Time.deltaTime);
        var seconds = Mathf.CeilToInt(_timeLeft);

        if (seconds == _lastShownSecond)
        {
            return;
        }

        _lastShownSecond = seconds;
        _timerText.text = seconds.ToString();
    }
}
```

Если таймер должен идти и на паузе, используйте `Time.unscaledDeltaTime`. Но
чаще на паузе он как раз должен остановиться.

## Layout Group

Для рядов и сеток элементов удобны компоненты автоматической раскладки:

- `HorizontalLayoutGroup` — элементы в строку;
- `VerticalLayoutGroup` — в столбец;
- `GridLayoutGroup` — сетка;
- `ContentSizeFitter` — подгоняет размер контейнера под содержимое;
- `LayoutElement` — задаёт минимальные и предпочтительные размеры.

Layout Group управляет позициями детей. Не задавайте этим детям `Anchored
Position` вручную: группа будет перезаписывать значения. Для отступов
используйте `Padding` и `Spacing`.

## Частые ошибки

- **UI двигают через `transform.position`.** Для UI нужен `RectTransform` и
  `anchoredPosition`.
- **Подгоняют интерфейс через `localScale`.** На разных разрешениях это даёт
  размытие и непредсказуемые отступы. Используйте Canvas Scaler и якоря.
- **У `Image` стоит `Simple`, а ждут работу `fillAmount`.** Нужен тип `Filled`.
- **Здоровье не ограничивают.** Значение уходит ниже нуля или выше максимума.
- **Текст обновляют каждой строкой каждый кадр.** Это создаёт лишний мусор для
  GC. Обновляйте по событию или при смене значения.
- **Layout Group и ручные якоря конфликтуют.** Выберите один способ раскладки.
- **HUD перекрывает меню.** Проверьте Order in Layer и порядок Canvas в
  Hierarchy.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Чем задать положение элемента HUD относительно угла экрана?",
  "options": [
    {
      "text": "Anchor Presets и Anchored Position",
      "correct": true,
      "explanation": "Якоря задают точку привязки, а Anchored Position — смещение от неё."
    },
    {
      "text": "Мировыми координатами через transform.position",
      "correct": false,
      "explanation": "Для UI используют RectTransform, а не мировые координаты."
    },
    {
      "text": "Позицией основной камеры",
      "correct": false,
      "explanation": "Камера не задаёт положение элементов внутри Canvas."
    }
  ],
  "explanation": "Углы экрана задаются якорями, а отступ — Anchored Position."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает HUD подстраиваться под разные разрешения?",
  "options": [
    {
      "text": "Canvas Scaler в режиме Scale With Screen Size",
      "correct": true
    },
    {
      "text": "Anchors у элементов HUD",
      "correct": true
    },
    {
      "text": "Фиксированный localScale, рассчитанный под 1920 × 1080",
      "correct": false,
      "explanation": "На другом разрешении такой HUD поедет или станет размытым."
    },
    {
      "text": "Layout Group для рядов элементов",
      "correct": true
    }
  ],
  "explanation": "Масштаб, якоря и автоматическая раскладка вместе дают адаптивный HUD."
}
```

## Куда дальше

- [Canvas](theme.html?path=content/unity/ui-i-interfeys/canvas.md)
- [TextMeshPro](theme.html?path=content/unity/ui-i-interfeys/textmeshpro.md)
- [Практика: HUD](theme.html?path=content/unity/ui-i-interfeys/praktika-hud.md)
