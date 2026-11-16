---
title: Корутины и IEnumerator
description: StartCoroutine, yield return, WaitForSeconds и отличие корутин от Update и потоков.
keywords: Unity C#, корутины, IEnumerator, StartCoroutine, yield return, WaitForSeconds, WaitForSecondsRealtime

---

# Корутины и IEnumerator

Корутина — это метод, который может приостановиться и продолжиться позже. Она
удобна для задержек, последовательностей и постепенных действий.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/csharp-most-dlya-unity/coroutine.svg"
    alt="Схема корутины: запуск, yield return, продолжение и конец"
    width="900"
  >
  <figcaption>
    Корутина не блокирует кадр: она возвращает управление и продолжается позже.
  </figcaption>
</figure>

## IEnumerator

```csharp
using System.Collections;
using UnityEngine;

public class Spawner : MonoBehaviour
{
    private IEnumerator SpawnWave()
    {
        Debug.Log("Волна началась");
        yield return new WaitForSeconds(1f);
        Debug.Log("Волна закончилась");
    }

    private void Start()
    {
        StartCoroutine(SpawnWave());
    }
}
```

`IEnumerator` — не отдельный поток. Код выполняется в основном потоке Unity,
просто частями.

## yield return

```csharp
yield return null;                         // следующий кадр
yield return new WaitForSeconds(0.5f);     // игровое время
yield return new WaitForSecondsRealtime(1f); // реальное время
yield return new WaitForFixedUpdate();     // следующий FixedUpdate
yield return new WaitUntil(() => _ready);  // ждать условие
```

`WaitForSeconds` учитывает `Time.timeScale`. Если игра на паузе, такая корутина
не продолжится. `WaitForSecondsRealtime` работает и при `timeScale = 0`.

## Остановка

```csharp
private Coroutine _routine;

private void Start()
{
    _routine = StartCoroutine(SpawnWave());
}

private void Stop()
{
    if (_routine != null)
    {
        StopCoroutine(_routine);
    }
}
```

`StopAllCoroutines()` останавливает все корутины на этом MonoBehaviour. При
выключении компонента или объекта корутины тоже останавливаются.

## Последовательность

```csharp
private IEnumerator Countdown()
{
    for (int i = 3; i > 0; i--)
    {
        Debug.Log(i);
        yield return new WaitForSeconds(1f);
    }

    Debug.Log("Старт!");
}
```

Корутины хорошо подходят для таймеров, диалогов, спавна волн и простых
анимаций.

## Частые ошибки

- **Думают, что корутина — поток.** Это не так.
- **`WaitForSeconds` при паузе.** Используйте `WaitForSecondsRealtime`.
- **Не останавливают корутину.** После перезапуска сцены возможны дубликаты.
- **Запускают корутину на выключенном объекте.** Unity выдаст ошибку.
- **Тяжёлая работа в корутине.** Она всё равно выполняется в основном потоке.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `yield return new WaitForSeconds(1f)`?",
  "options": [
    {
      "text": "Приостанавливает корутину на секунду игрового времени",
      "correct": true,
      "explanation": "Она продолжится через секунду, если timeScale не равен 0."
    },
    {
      "text": "Создаёт новый поток",
      "correct": false,
      "explanation": "Корутина не создаёт поток."
    },
    {
      "text": "Останавливает игру",
      "correct": false,
      "explanation": "Игра продолжает работать."
    }
  ],
  "explanation": "`WaitForSeconds` ждёт игровое время."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про корутины?",
  "options": [
    {
      "text": "Запускаются через `StartCoroutine`",
      "correct": true
    },
    {
      "text": "Могут ждать `WaitForSecondsRealtime`",
      "correct": true
    },
    {
      "text": "Останавливаются при выключении объекта",
      "correct": true
    },
    {
      "text": "Это отдельный поток ОС",
      "correct": false,
      "explanation": "Корутины выполняются в основном потоке Unity."
    }
  ],
  "explanation": "Корутины — удобная пауза, а не многопоточность."
}
```

## Куда дальше

- [Null и TryGetComponent](theme.html?path=content/unity/csharp-most-dlya-unity/null-i-trygetcomponent.md)
- [C#-мост для Unity: итог](theme.html?path=content/unity/csharp-most-dlya-unity/itog-csharp-most.md)
- [Time и корутины](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/time-i-korutiny.md)
