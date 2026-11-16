---
title: Практика: жизненный цикл
description: Пишем скрипт, который логирует этапы жизненного цикла, двигает объект и запускает корутину.
keywords: Unity практика, жизненный цикл, MonoBehaviour, Awake, Start, Update, корутина, Debug.Log

---

# Практика: жизненный цикл

Соберём один скрипт, который показывает весь жизненный цикл в Console и делает
простую анимацию движения. Это упражнение на `Awake`, `Start`, `Update`,
`OnDisable`, `OnDestroy` и корутины.

## Что нужно сделать

1. Создать скрипт `LifecycleLogger` и повесить его на куб.
2. Логировать `Awake`, `OnEnable`, `Start`, `Update`, `OnDisable`, `OnDestroy`.
3. Добавить `[SerializeField]` скорость и двигать куб в `Update`.
4. Запустить корутину, которая раз в секунду пишет сообщение.
5. Нарисовать луч через `Debug.DrawRay`.

## Решение 1. Скрипт

Создайте `Assets/Scripts/LifecycleLogger.cs`:

```csharp
using System.Collections;
using UnityEngine;

public class LifecycleLogger : MonoBehaviour
{
    [SerializeField] private float _speed = 1f;
    [SerializeField] private float _logInterval = 1f;

    private void Awake()
    {
        Debug.Log("Awake", this);
    }

    private void OnEnable()
    {
        Debug.Log("OnEnable", this);
        StartCoroutine(LogLoop());
    }

    private void Start()
    {
        Debug.Log("Start", this);
    }

    private void Update()
    {
        transform.Translate(Vector3.forward * _speed * Time.deltaTime);
        Debug.DrawRay(transform.position, transform.forward * 2f, Color.green);
    }

    private void OnDisable()
    {
        Debug.Log("OnDisable", this);
        StopAllCoroutines();
    }

    private void OnDestroy()
    {
        Debug.Log("OnDestroy", this);
    }

    private IEnumerator LogLoop()
    {
        while (true)
        {
            yield return new WaitForSeconds(_logInterval);
            Debug.Log($"Прошло {Time.time:F1} секунд", this);
        }
    }
}
```

## Решение 2. Подключение

1. Сохраните скрипт.
2. Перетащите `LifecycleLogger.cs` на куб.
3. В Inspector выставьте `Speed = 1` и `Log Interval = 1`.
4. Нажмите **Play**.
5. Смотрите Console: сообщения идут по порядку.

## Решение 3. Проверка жизненного цикла

Попробуйте:

1. Выключить компонент галочкой в Inspector — появится `OnDisable`.
2. Включить обратно — снова `OnEnable` и `Start` не повторится.
3. Остановить Play — появится `OnDisable` и `OnDestroy`.

`Start` вызывается только один раз за жизнь компонента. `OnEnable` — каждый раз
при включении.

## Решение 4. Корутина

Корутина `LogLoop` запускается в `OnEnable` и останавливается в `OnDisable`.
Так она не продолжит работать на выключенном объекте.

Если поставить `Time.timeScale = 0f`, `WaitForSeconds` перестанет идти. Для
паузы меню используйте `WaitForSecondsRealtime`.

## Что должно получиться

- в Console есть `Awake`, `OnEnable`, `Start`;
- куб двигается вперёд;
- раз в секунду появляется сообщение с временем;
- при выключении компонента появляется `OnDisable`;
- при остановке Play появляется `OnDestroy`;
- в Scene виден зелёный луч.

## Частые ошибки

- **`Start` не вызывается.** Компонент выключен или скрипт не на объекте.
- **Корутина не работает.** `StartCoroutine` вызван на выключенном объекте.
- **Куб летит слишком быстро.** Проверьте `Speed` и `Time.deltaTime`.
- **Console забит логами.** Уберите `Debug.Log` из `Update` после проверки.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Сколько раз вызывается `Start` у одного компонента?",
  "options": [
    {
      "text": "Один раз за время жизни компонента",
      "correct": true,
      "explanation": "`Start` вызывается перед первым `Update`, если компонент включён."
    },
    {
      "text": "Каждый кадр",
      "correct": false,
      "explanation": "Каждый кадр вызывается `Update`."
    },
    {
      "text": "Каждый раз при включении",
      "correct": false,
      "explanation": "При включении вызывается `OnEnable`."
    }
  ],
  "explanation": "`Start` — однократная инициализация."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что произойдёт при выключении компонента?",
  "options": [
    {
      "text": "Вызовется `OnDisable`",
      "correct": true
    },
    {
      "text": "`Update` перестанет вызываться",
      "correct": true
    },
    {
      "text": "Корутины, запущенные на компоненте, стоит остановить",
      "correct": true
    },
    {
      "text": "Объект удалится со сцены",
      "correct": false,
      "explanation": "Выключение компонента не удаляет GameObject."
    }
  ],
  "explanation": "Выключение компонента останавливает его обновления и вызывает `OnDisable`."
}
```

## Куда дальше

- [Скрипты и жизненный цикл: итог](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/itog-skripty-i-zhiznennyy-cikl.md)
- [Первый скрипт](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/pervyy-skript.md)
- [Time и корутины](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/time-i-korutiny.md)
