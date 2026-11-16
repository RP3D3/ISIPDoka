---
title: UI и интерфейс
description: Итог группы: Canvas, Canvas Scaler, TextMeshPro, Button, HUD, EventSystem, меню и пауза.
keywords: Unity UI итог, Canvas, Canvas Scaler, TextMeshPro, Button, HUD, EventSystem, пауза, SceneManager

---

# UI и интерфейс

Мы прошли путь от Canvas до практического HUD. Теперь важно собрать всё в
одну картину: из каких компонентов состоит интерфейс, что отвечает за клики и
как меню переживает паузу.

## Карта темы

| Вопрос | Инструмент |
|---|---|
| Где рисуется интерфейс? | `Canvas` и его Render Mode |
| Как UI подстраивается под экран? | `Canvas Scaler`, anchors, Layout Group |
| Чем выводить текст? | `TextMeshProUGUI` и `TMP_FontAsset` |
| Как обработать нажатие? | `Button.onClick`, `UnityEvent` |
| Как показать здоровье и счёт? | HUD: `Image`, `TMP_Text`, `Slider` |
| Кто доставляет клики? | `EventSystem`, Input Module, `Graphic Raycaster` |
| Как поставить игру на паузу? | `Time.timeScale`, `SetActive` |
| Как загрузить уровень? | `SceneManager.LoadScene` |

## Как устроен UI

Любой интерфейс в Unity — это обычные GameObject и компоненты:

- **Canvas** задаёт область и режим отрисовки;
- **RectTransform** хранит якоря, pivot и размеры;
- **Graphic** (`Image`, `TextMeshProUGUI`) рисует содержимое;
- **Selectable** (`Button`, `Slider`, `Toggle`) обрабатывает ввод;
- **EventSystem** связывает ввод с элементами UI.

Полезно держать логику интерфейса в одном скрипте-фасаде, а не размазывать
обновление текста и панелей по десятку компонентов.

```csharp
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class GameUI : MonoBehaviour
{
    [SerializeField] private TMP_Text _scoreText;
    [SerializeField] private Image _healthFill;
    [SerializeField] private GameObject _pausePanel;

    private int _score;

    public void AddScore(int amount)
    {
        _score += amount;
        _scoreText.text = $"Счёт: {_score}";
    }

    public void SetHealth(float normalized)
    {
        _healthFill.fillAmount = Mathf.Clamp01(normalized);
    }

    public void SetPaused(bool paused)
    {
        _pausePanel.SetActive(paused);
        Time.timeScale = paused ? 0f : 1f;
    }
}
```

Такой скрипт ничего не знает о том, откуда пришло событие. Кнопка, игровая
логика или триггер могут вызвать его методы.

## Мини-чек-лист

- [ ] На сцене есть Canvas с нужным Render Mode.
- [ ] Canvas Scaler настроен под целевые разрешения.
- [ ] Элементы HUD привязаны к углам через anchors.
- [ ] TMP Essential Resources импортированы.
- [ ] У кнопок назначены обработчики `onClick`.
- [ ] Подписки в коде снимаются в `OnDisable`.
- [ ] На сцене один EventSystem и подходящий Input Module.
- [ ] На Canvas есть Graphic Raycaster.
- [ ] Пауза возвращает `Time.timeScale = 1f`.
- [ ] Сцены добавлены в список сцен сборки.

## Типичные ошибки

- **Смешивают старый и новый Input System.** Модуль ввода должен
  соответствовать `Active Input Handling`.
- **Делают UI через мировые координаты.** Для UI нужен `RectTransform` и
  якоря.
- **Забывают про TMP Essentials.** Текст может остаться без материала.
- **Не снимают обработчики кнопок.** Один клик начинает вызывать метод
  несколько раз.
- **Оставляют `timeScale = 0` после паузы.** Новая сцена выглядит зависшей.
- **Проверяют только одно разрешение Game view.** HUD может разъехаться на
  другом соотношении сторон.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что произойдёт, если на сцене нет EventSystem?",
  "options": [
    {
      "text": "Кнопки не будут получать клики",
      "correct": true,
      "explanation": "EventSystem доставляет события ввода элементам UI."
    },
    {
      "text": "Canvas перестанет рисоваться",
      "correct": false,
      "explanation": "Отрисовка Canvas не зависит от EventSystem."
    },
    {
      "text": "TextMeshPro не загрузит шрифт",
      "correct": false,
      "explanation": "Шрифты TMP не связаны с EventSystem."
    }
  ],
  "explanation": "Без EventSystem UI остаётся видимым, но не интерактивным."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в типичный UI-стек Unity?",
  "options": [
    {
      "text": "Canvas и Canvas Scaler",
      "correct": true
    },
    {
      "text": "EventSystem и Input Module",
      "correct": true
    },
    {
      "text": "TextMeshPro для текста",
      "correct": true
    },
    {
      "text": "Rigidbody для кликов по кнопкам",
      "correct": false,
      "explanation": "Rigidbody относится к физике, а не к UI-событиям."
    }
  ],
  "explanation": "UI-стек — это Canvas, масштабирование, текст, элементы управления и EventSystem."
}
```

## Куда дальше

- [Canvas](theme.html?path=content/unity/ui-i-interfeys/canvas.md)
- [HUD](theme.html?path=content/unity/ui-i-interfeys/hud.md)
- [EventSystem и Input Module](theme.html?path=content/unity/ui-i-interfeys/eventsystem-i-input-module.md)
- [Практика: HUD](theme.html?path=content/unity/ui-i-interfeys/praktika-hud.md)
