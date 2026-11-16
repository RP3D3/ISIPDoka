---
title: Time и корутины
description: Time.timeScale, deltaTime, WaitForSeconds и корутины для пауз, задержек и последовательностей действий.
keywords: Unity Time, timeScale, deltaTime, корутины, Coroutine, WaitForSeconds, StartCoroutine, пауза

---

# Time и корутины

Время в Unity — не просто `DateTime.Now`. Игра может быть на паузе, физика идёт
своим шагом, а анимации могут использовать реальное время. Для задержек и
последовательностей есть корутины.

## Основные свойства Time

| Свойство | Что означает |
|---|---|
| `Time.time` | время с начала игры |
| `Time.deltaTime` | время с прошлого кадра |
| `Time.unscaledDeltaTime` | то же, но без учёта `timeScale` |
| `Time.fixedDeltaTime` | шаг физики |
| `Time.timeScale` | множитель времени; `0` — пауза |

```csharp
private void Update()
{
    transform.Rotate(0f, 90f * Time.deltaTime, 0f);
}
```

Если поставить `Time.timeScale = 0f`, объекты, использующие `deltaTime`,
остановятся. UI и анимации на `unscaledDeltaTime` продолжат работать.

## Корутины

Корутина — метод, который может приостанавливаться и продолжаться через
несколько кадров.

```csharp
using System.Collections;
using UnityEngine;

public class SpawnExample : MonoBehaviour
{
    [SerializeField] private GameObject _enemyPrefab;

    private void Start()
    {
        StartCoroutine(SpawnLoop());
    }

    private IEnumerator SpawnLoop()
    {
        while (true)
        {
            Instantiate(_enemyPrefab, transform.position, Quaternion.identity);
            yield return new WaitForSeconds(1.5f);
        }
    }
}
```

- Метод возвращает `IEnumerator`.
- Внутри используется `yield return`.
- Запуск — через `StartCoroutine`.
- Остановка — `StopCoroutine` или `StopAllCoroutines`.

## Ожидания

```csharp
yield return null;                         // следующий кадр
yield return new WaitForSeconds(2f);       // 2 секунды игрового времени
yield return new WaitForSecondsRealtime(2f); // 2 секунды реального времени
yield return new WaitForFixedUpdate();     // следующий шаг физики
yield return new WaitForEndOfFrame();      // конец кадра
```

`WaitForSeconds` зависит от `timeScale`. На паузе такая корутина не продолжится.
`WaitForSecondsRealtime` работает даже при `timeScale = 0`.

## Пауза

```csharp
public void Pause()
{
    Time.timeScale = 0f;
}

public void Resume()
{
    Time.timeScale = 1f;
}
```

Если на паузе нужно анимировать меню, используйте `unscaledDeltaTime` или
`WaitForSecondsRealtime`.

## Частые ошибки

- **Запускают корутину на выключенном объекте.** Она не стартует.
- **Останавливают корутину по имени метода.** Лучше хранить ссылку на
  `Coroutine`.
- **Используют `WaitForSeconds` для паузы.** На `timeScale = 0` она не
  сработает.
- **Делают бесконечный цикл без `yield`.** Игра зависнет.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `Time.timeScale = 0f`?",
  "options": [
    {
      "text": "Ставит игру на паузу для систем, зависящих от времени",
      "correct": true,
      "explanation": "`deltaTime` становится нулевым, `WaitForSeconds` не идёт."
    },
    {
      "text": "Останавливает редактор Unity",
      "correct": false,
      "explanation": "Редактор продолжает работать."
    },
    {
      "text": "Удаляет все корутины",
      "correct": false,
      "explanation": "Корутины остаются, но время для них замирает."
    }
  ],
  "explanation": "`timeScale` управляет игровым временем, а не редактором."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про корутины?",
  "options": [
    {
      "text": "Корутина возвращает `IEnumerator`",
      "correct": true
    },
    {
      "text": "`yield return null` ждёт следующий кадр",
      "correct": true
    },
    {
      "text": "`WaitForSecondsRealtime` работает при `timeScale = 0`",
      "correct": true
    },
    {
      "text": "Корутина выполняется в отдельном потоке",
      "correct": false,
      "explanation": "Корутины выполняются в главном потоке Unity."
    }
  ],
  "explanation": "Корутины — удобные паузы в главном потоке, а не многопоточность."
}
```

## Куда дальше

- [Скрипты и жизненный цикл: итог](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/itog-skripty-i-zhiznennyy-cikl.md)
- [Практика: жизненный цикл](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/praktika-zhiznennyy-cikl.md)
- [Update, FixedUpdate, LateUpdate](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/update-fixedupdate-lateupdate.md)
