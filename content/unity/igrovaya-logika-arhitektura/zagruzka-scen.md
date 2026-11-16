---
title: Загрузка сцен
description: SceneManager.LoadScene, асинхронная загрузка, экран загрузки и типичные ошибки.
keywords: Unity SceneManager, LoadScene, LoadSceneAsync, загрузка сцены, loading screen, Build Settings, Build Profiles

---

# Загрузка сцен

Сцены переключаются через `SceneManager`. Важно, чтобы сцена была добавлена в
список сборки, иначе Unity её не найдёт.

## Простая загрузка

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public void LoadGame()
    {
        SceneManager.LoadScene("Game");
    }

    public void LoadMenu()
    {
        SceneManager.LoadScene("Menu");
    }
}
```

Имя должно совпадать с именем сцены в Build Settings / Build Profiles. Можно
использовать индекс, но имя надёжнее.

## Build Settings / Build Profiles

- **Unity 2022.3** — **File → Build Settings**, список **Scenes In Build**.
- **Unity 6** — **File → Build Profiles**, список сцен в профиле сборки.

Если сцены нет в списке, `LoadScene` выдаст ошибку.

## Асинхронная загрузка

Большая сцена грузится долго. Асинхронная загрузка позволяет показать прогресс:

```csharp
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class AsyncLoader : MonoBehaviour
{
    [SerializeField] private Slider _progress;

    public void Load(string sceneName)
    {
        StartCoroutine(LoadRoutine(sceneName));
    }

    private IEnumerator LoadRoutine(string sceneName)
    {
        AsyncOperation operation = SceneManager.LoadSceneAsync(sceneName);

        while (!operation.isDone)
        {
            float progress = Mathf.Clamp01(operation.progress / 0.9f);
            _progress.value = progress;
            yield return null;
        }
    }
}
```

`operation.progress` доходит до `0.9`, пока сцена не активирована. Поэтому
делим на `0.9`, чтобы ползунок дошёл до 1.

## Экран загрузки

Обычно делают отдельную сцену `Loading`:

1. Загружают `Loading`.
2. В ней запускают `LoadSceneAsync` целевой сцены.
3. Показывают прогресс.
4. Когда готово, активируют сцену.

Если нужно задержать активацию:

```csharp
operation.allowSceneActivation = false;
// ...
operation.allowSceneActivation = true;
```

## Сохранение объектов

Если объект должен пережить смену сцены:

```csharp
DontDestroyOnLoad(gameObject);
```

Но не злоупотребляйте: дубликаты и утечки легко получить.

## Частые ошибки

- **Сцены нет в Build Settings.** `LoadScene` не работает.
- **Опечатка в имени.** Имена чувствительны к регистру.
- **Загружают сцену в `Update`.** Каждый кадр запускается новая загрузка.
- **Не сбрасывают `timeScale`.** После паузы новая сцена стартует
  замороженной.
- **Тяжёлая синхронная загрузка.** Используйте `LoadSceneAsync`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что нужно, чтобы `LoadScene` нашёл сцену?",
  "options": [
    {
      "text": "Добавить сцену в список сборки",
      "correct": true,
      "explanation": "Unity загружает только сцены из Build Settings/Profiles."
    },
    {
      "text": "Переименовать сцену в `Library`",
      "correct": false,
      "explanation": "`Library` — кэш."
    },
    {
      "text": "Добавить сцену в `Assets/_assets`",
      "correct": false,
      "explanation": "Это не влияет на сборку."
    }
  ],
  "explanation": "Сцена должна быть в списке сцен сборки."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про загрузку сцен?",
  "options": [
    {
      "text": "`LoadSceneAsync` не блокирует кадр",
      "correct": true
    },
    {
      "text": "`AsyncOperation.progress` можно показывать в UI",
      "correct": true
    },
    {
      "text": "`DontDestroyOnLoad` сохраняет объект между сценами",
      "correct": true
    },
    {
      "text": "Сцену можно загрузить без добавления в сборку",
      "correct": false,
      "explanation": "В собранной игре сцена должна быть в списке."
    }
  ],
  "explanation": "Асинхронная загрузка и список сцен — основа переходов."
}
```

## Куда дальше

- [Игровая логика и архитектура: итог](theme.html?path=content/unity/igrovaya-logika-arhitektura/itog-igrovaya-logika-arhitektura.md)
- [Практика: игровой цикл](theme.html?path=content/unity/igrovaya-logika-arhitektura/praktika-igrovoy-cikl.md)
- [GameManager](theme.html?path=content/unity/igrovaya-logika-arhitektura/gamemanager.md)
