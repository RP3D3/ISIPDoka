---
title: Меню и пауза
description: Панели меню, SetActive, пауза через Time.timeScale, возврат в игру и загрузка сцены через SceneManager.
keywords: Unity меню, пауза, Time.timeScale, SetActive, SceneManager.LoadScene, Pause Menu, Canvas Group, загрузка сцены

---

# Меню и пауза

Меню — это те же UI-элементы, что и HUD, но обычно они перекрывают весь экран
и управляют состоянием игры. Пауза останавливает игровое время, а загрузка
сцены переключает уровни.

Главное правило: **меню должно оставаться управляемым**, даже когда игра
остановлена. Поэтому пауза не выключает UI и не блокирует EventSystem.

## Панели и SetActive

Экран меню удобно собирать из `Panel` и дочерних кнопок. Панель — это
`Image` с `RectTransform`, часто растянутый на весь экран.

Простой вариант — включать и выключать панель через `SetActive`:

```csharp
using UnityEngine;

public class MenuPanel : MonoBehaviour
{
    [SerializeField] private GameObject _panel;

    public void Open()
    {
        _panel.SetActive(true);
    }

    public void Close()
    {
        _panel.SetActive(false);
    }
}
```

`SetActive(false)` выключает объект целиком: его скрипты перестают получать
`Update`, а дочерние элементы исчезают и перестают принимать клики. Это
удобно, но у метода должна быть точка возврата — например, скрипт на активном
родителе или отдельная кнопка вне скрываемой панели.

Если нужен плавный fade, используют `CanvasGroup`:

- `alpha` меняется от `0` до `1`;
- `interactable = false` отключает кнопки;
- `blocksRaycasts = false` пропускает клики сквозь панель.

При этом объект остаётся активным, и корутина анимации продолжает работать.

## Пауза через Time.timeScale

Самый распространённый способ паузы — `Time.timeScale = 0f`.

```csharp
using UnityEngine;

public class PauseMenu : MonoBehaviour
{
    [SerializeField] private GameObject _panel;

    private bool _isPaused;

    public void TogglePause()
    {
        SetPaused(!_isPaused);
    }

    public void SetPaused(bool paused)
    {
        _isPaused = paused;
        _panel.SetActive(paused);
        Time.timeScale = paused ? 0f : 1f;
    }
}
```

Что происходит при `timeScale = 0`:

- `Time.deltaTime` становится нулевым;
- движение и физика, зависящие от времени, останавливаются;
- `WaitForSeconds` не продолжает отсчёт;
- `Update` у активных скриптов всё равно вызывается;
- UI продолжает работать, если не зависит от `deltaTime`.

Для анимации самого меню на паузе используйте `Time.unscaledDeltaTime` или
`WaitForSecondsRealtime`.

Если в игре есть замедление времени, не жёстко возвращайте `1f`, а сохраняйте
предыдущее значение `timeScale` перед паузой.

## Клавиша паузы

Кнопку паузы проще всего повесить на UI. Если нужна клавиша `Escape`, не
смешивайте два API:

- в проекте с новым **Input System** используйте `InputAction` или
  `Keyboard.current.escapeKey.wasPressedThisFrame`;
- в проекте со старым **Input Manager** — `Input.GetKeyDown(KeyCode.Escape)`.

При настройке `Active Input Handling = Input System Package (New)` старый
класс `Input` может выбрасывать исключение. Проверьте настройку в
**Project Settings → Player → Other Settings**.

## Загрузка сцены

Для переключения сцен нужен `SceneManager` из пространства имён
`UnityEngine.SceneManagement`.

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public void Restart()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }

    public void LoadByName(string sceneName)
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(sceneName);
    }
}
```

Перед загрузкой обязательно верните `Time.timeScale = 1f`. Иначе новая сцена
стартует уже на паузе, и это выглядит как зависание.

Сцена должна быть добавлена в список сцен сборки: в Unity 6 это
**Build Profiles**, в Unity 2022.3 — **Build Settings**. Если сцены нет в
списке, загрузка по имени завершится ошибкой.

Для больших уровней используют `LoadSceneAsync` и экран загрузки. Для
небольших игр достаточно синхронного `LoadScene`.

## Порядок и фокус

- Меню паузы должно быть поверх HUD: отдельный Canvas с большим
  `Order in Layer` или последний элемент в Hierarchy.
- Для геймпада назначьте первую кнопку через
  `EventSystem.current.SetSelectedGameObject(...)`.
- Если панель паузы выключена, кнопка «Продолжить» на ней не работает.
  Держите скрипт паузы на активном объекте.
- После возврата в игру верните фокус на игровой UI или снимите его.

## Частые ошибки

- **Забыли вернуть `Time.timeScale = 1f`.** Новая сцена или выход из паузы
  выглядят как зависание.
- **Скрипт паузы лежит на панели, которую сам выключает.** После выключения
  он не может включить панель обратно.
- **Ждут `WaitForSeconds` в меню паузы.** На `timeScale = 0` ожидание не
  завершится.
- **Анимируют меню через `deltaTime`.** На паузе анимация замирает.
- **Загружают сцену по имени, которой нет в списке сборки.** Получают ошибку
  в Console.
- **Кнопки паузы не нажимаются.** Проверьте EventSystem, Graphic Raycaster и
  `interactable`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает Time.timeScale = 0f?",
  "options": [
    {
      "text": "Останавливает игровое время, но UI и активные скрипты продолжают работать",
      "correct": true,
      "explanation": "Update вызывается, но deltaTime равен нулю."
    },
    {
      "text": "Выключает все скрипты на сцене",
      "correct": false,
      "explanation": "Скрипты продолжают вызываться, просто время для них стоит."
    },
    {
      "text": "Перезагружает текущую сцену",
      "correct": false,
      "explanation": "Для перезагрузки нужен SceneManager.LoadScene."
    }
  ],
  "explanation": "timeScale управляет игровым временем, а не жизнью скриптов."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно сделать при выходе из паузы и перезапуске сцены?",
  "options": [
    {
      "text": "Вернуть Time.timeScale = 1f",
      "correct": true
    },
    {
      "text": "Убедиться, что сцена добавлена в список сцен сборки",
      "correct": true
    },
    {
      "text": "Оставить панель паузы активной",
      "correct": false,
      "explanation": "Панель паузы обычно скрывают перед возвратом в игру."
    },
    {
      "text": "Использовать SceneManager.LoadScene для перезапуска",
      "correct": true
    }
  ],
  "explanation": "Перед загрузкой сцены сбрасывают timeScale и проверяют список сцен сборки."
}
```

## Куда дальше

- [Кнопки и события](theme.html?path=content/unity/ui-i-interfeys/knopki-i-sobytiya.md)
- [EventSystem и Input Module](theme.html?path=content/unity/ui-i-interfeys/eventsystem-i-input-module.md)
- [Практика: HUD](theme.html?path=content/unity/ui-i-interfeys/praktika-hud.md)
