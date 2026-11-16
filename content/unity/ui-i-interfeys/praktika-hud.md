---
title: Практика: HUD
description: Пошаговая сборка HUD с полосой здоровья, счётом, таймером, кнопками урона и паузой.
keywords: Unity практика HUD, health bar, Image Filled, TextMeshPro, Canvas Scaler, anchors, пауза, кнопки

---

# Практика: HUD

Соберём небольшой HUD: полоса здоровья, счёт, таймер, кнопки изменения
здоровья и очков, а также панель паузы. Упражнение связывает Canvas,
TextMeshPro, Button, anchors и `Time.timeScale`.

## Что нужно сделать

1. Создать Canvas в режиме `Screen Space - Overlay`.
2. Настроить Canvas Scaler под `1920 × 1080`.
3. Собрать полосу здоровья в левом верхнем углу.
4. Вывести счёт справа и таймер по центру.
5. Написать `HudController`.
6. Добавить кнопки урона, очков и паузы.
7. Проверить HUD на разных пропорциях экрана.

## Canvas и корень HUD

Создайте Canvas:

1. **GameObject → UI → Canvas**.
2. В компоненте `Canvas` выберите **Render Mode = Screen Space - Overlay**.
3. На объекте `Canvas` настройте `Canvas Scaler`:
   - **UI Scale Mode = Scale With Screen Size**;
   - **Reference Resolution = 1920 × 1080**;
   - **Screen Match Mode = Match Width Or Height**;
   - **Match = 0.5**.

Теперь создайте дочерний объект `HUD`. Удобно взять **UI → Panel** и удалить
`Image`, если фон не нужен. Растяните его на весь экран:

- `Anchor Min = (0, 0)`;
- `Anchor Max = (1, 1)`;
- `Left = 0`, `Right = 0`, `Top = 0`, `Bottom = 0`.

Все элементы HUD складывайте внутрь `HUD`, чтобы их можно было скрыть одной
командой `SetActive`.

## Полоса здоровья, счёт и таймер

**Полоса здоровья**:

1. Внутри `HUD` создайте `UI → Image` и назовите `HealthBar`.
2. Поставьте Anchor Preset **top-left**, `Pivot = (0, 1)`,
   `Anchored Position = (24, -24)`, размер `300 × 28`.
3. Задайте тёмный цвет фона.
4. Внутри создайте ещё один `Image` с именем `Fill`.
5. Растяните `Fill` по родителю и задайте:
   - **Image Type = Filled**;
   - **Fill Method = Horizontal**;
   - **Fill Origin = Left**;
   - **Fill Amount = 1**;
   - зелёный цвет.

**Счёт**: создайте `UI → Text - TextMeshPro`, назовите `ScoreText`.
Поставьте Anchor Preset **top-right**, `Pivot = (1, 1)`,
`Anchored Position = (-24, -24)`, выравнивание по правому краю. Начальный
текст: `Счёт: 0`.

**Таймер**: создайте ещё один TMP-текст `TimerText`. Anchor Preset
**top-center**, `Pivot = (0.5, 1)`, `Anchored Position = (0, -24)`. Начальное
значение: `60`.

Если TMP-текст выглядит розовым или не имеет шрифта, импортируйте
**TMP Essential Resources**.

## Скрипт HUD

Создайте `Assets/Scripts/HudController.cs`:

```csharp
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class HudController : MonoBehaviour
{
    [SerializeField] private Image _healthFill;
    [SerializeField] private TMP_Text _scoreText;
    [SerializeField] private TMP_Text _timerText;
    [SerializeField] private float _maxHealth = 100f;
    [SerializeField] private float _roundSeconds = 60f;

    private float _health;
    private float _timeLeft;
    private int _score;
    private int _lastShownSecond = -1;

    private void Start()
    {
        _health = _maxHealth;
        _timeLeft = _roundSeconds;
        UpdateHealth();
        UpdateScore();
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

    public void TakeDamage(float amount)
    {
        _health = Mathf.Clamp(_health - amount, 0f, _maxHealth);
        UpdateHealth();
    }

    public void Heal(float amount)
    {
        _health = Mathf.Clamp(_health + amount, 0f, _maxHealth);
        UpdateHealth();
    }

    public void AddScore(int amount)
    {
        _score += amount;
        UpdateScore();
    }

    private void UpdateHealth()
    {
        _healthFill.fillAmount = _maxHealth > 0f
            ? _health / _maxHealth
            : 0f;
    }

    private void UpdateScore()
    {
        _scoreText.text = $"Счёт: {_score}";
    }
}
```

Повесьте скрипт на объект `HUD` и назначьте ссылки:

- `Health Fill` → дочерний `Fill`;
- `Score Text` → `ScoreText`;
- `Timer Text` → `TimerText`.

## Кнопки и пауза

Добавьте две кнопки внизу экрана:

- `DamageButton` с текстом `−10 HP`;
- `ScoreButton` с текстом `+100`.

В `On Click ()` кнопки урона выберите `HudController.TakeDamage` и укажите
аргумент `10`. Для кнопки очков выберите `AddScore` и укажите `100`.

Теперь пауза. Создайте `PausePanel` — `UI → Panel`, растянутый на весь экран,
с тёмным полупрозрачным фоном и кнопкой `Continue`. Панель должна быть
**выключена** в начале игры. Кнопку `Pause` разместите вне панели, чтобы она
оставалась доступной.

Скрипт `PauseToggle.cs`:

```csharp
using UnityEngine;

public class PauseToggle : MonoBehaviour
{
    [SerializeField] private GameObject _pausePanel;

    private bool _isPaused;

    public void Toggle()
    {
        _isPaused = !_isPaused;
        _pausePanel.SetActive(_isPaused);
        Time.timeScale = _isPaused ? 0f : 1f;
    }
}
```

Повесьте скрипт на активный объект, например на `HUD`. Назначьте
`Pause Panel` и добавьте вызов `PauseToggle.Toggle` в `On Click` кнопок
`Pause` и `Continue`.

## Проверка и частые ошибки

Проверьте HUD в Game view на разных пропорциях: `16:9`, `4:3` и `21:9`.
Полоса здоровья должна оставаться в левом верхнем углу, счёт — в правом
верхнем, таймер — по центру. Затем проверьте крайние значения: здоровье не
уходит ниже `0` и выше `100`, таймер останавливается на `0`, пауза
останавливает игровое время, а кнопка `Continue` возвращает
`Time.timeScale = 1f`.

Частые ошибки:

- **У `Fill` стоит `Image Type = Simple`.** `fillAmount` не работает, нужен
  `Filled`.
- **Якоря выставлены, а pivot или позиция — нет.** Элемент смещён не туда.
- **HUD растянут вместе с экраном целиком.** Для угловых элементов нужны
  якоря в углах, а не stretch на весь экран.
- **Кнопки не нажимаются.** Проверьте EventSystem, Input Module и
  `Graphic Raycaster`.
- **Панель паузы выключает скрипт паузы.** Держите `PauseToggle` на активном
  объекте.
- **После паузы время осталось нулевым.** Всегда возвращайте `timeScale = 1f`.
- **Текст обновляется каждый кадр.** Для таймера достаточно обновления раз в
  секунду.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему fillAmount не меняет полосу здоровья?",
  "options": [
    {
      "text": "У Image стоит Type = Simple, а нужен Filled",
      "correct": true,
      "explanation": "fillAmount работает только у Image с типом Filled."
    },
    {
      "text": "Canvas Scaler стоит в Scale With Screen Size",
      "correct": false,
      "explanation": "Этот режим не мешает заливке."
    },
    {
      "text": "В проекте не назначен AudioListener",
      "correct": false,
      "explanation": "AudioListener не связан с изображением полосы."
    }
  ],
  "explanation": "Для полосы здоровья нужен Image Type = Filled и правильный Fill Method."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить перед сдачей HUD?",
  "options": [
    {
      "text": "Полоса здоровья меняется и остаётся в диапазоне 0..1",
      "correct": true
    },
    {
      "text": "Элементы прижаты к углам на разных пропорциях экрана",
      "correct": true
    },
    {
      "text": "Кнопки работают даже без EventSystem",
      "correct": false,
      "explanation": "Без EventSystem клики до кнопок не доходят."
    },
    {
      "text": "После паузы Time.timeScale возвращается в 1",
      "correct": true
    }
  ],
  "explanation": "Проверяйте адаптивность, крайние значения и возврат времени после паузы."
}
```

## Куда дальше

- [HUD](theme.html?path=content/unity/ui-i-interfeys/hud.md)
- [Кнопки и события](theme.html?path=content/unity/ui-i-interfeys/knopki-i-sobytiya.md)
- [Меню и пауза](theme.html?path=content/unity/ui-i-interfeys/menyu-i-pauza.md)
- [Canvas](theme.html?path=content/unity/ui-i-interfeys/canvas.md)
