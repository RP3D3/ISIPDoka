---
title: Скрипты и жизненный цикл
description: Итог группы: MonoBehaviour, порядок Awake/Start/Update, поля Inspector, ссылки, Debug, Time и корутины.
keywords: Unity итог, MonoBehaviour, жизненный цикл, Awake, Start, Update, FixedUpdate, корутины, Debug

---

# Скрипты и жизненный цикл

Мы прошли путь от первого скрипта до корутин. Теперь важно собрать всё в одну
картину: когда вызываются методы, где хранить настройки и как отлаживать код.

## Что теперь должно быть понятно

- Скрипт-компонент наследуется от `MonoBehaviour`.
- Имя файла совпадает с именем класса.
- Порядок: `Awake` → `OnEnable` → `Start` → `Update`.
- `Update` — кадры, `FixedUpdate` — физика, `LateUpdate` — после кадра.
- `[SerializeField]` показывает private-поле в Inspector.
- Ссылки на компоненты кэшируют в `Awake` или передают через Inspector.
- `Debug.Log` и Console — первые инструменты отладки.
- `Time.timeScale` управляет игровым временем.
- Корутины выполняются в главном потоке и умеют ждать.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Где инициализировать свои поля? | `Awake` |
| Где подписываться на события? | `OnEnable` |
| Где искать другие объекты? | `Start` |
| Где двигать `Rigidbody`? | `FixedUpdate` |
| Где двигать камеру? | `LateUpdate` |
| Как показать private-поле? | `[SerializeField]` |
| Как безопасно получить компонент? | `TryGetComponent` |
| Как сделать паузу? | `Time.timeScale = 0f` |
| Как подождать 2 секунды? | `yield return new WaitForSeconds(2f)` |

## Чек-лист

- [ ] Я могу создать скрипт и повесить его на объект.
- [ ] Я понимаю порядок `Awake`, `OnEnable`, `Start`.
- [ ] Я не пишу физику в `Update`.
- [ ] Я использую `[SerializeField]` вместо public-полей.
- [ ] Я кэширую ссылки на компоненты.
- [ ] Я умею читать Console и ставить breakpoint.
- [ ] Я понимаю, как работают корутины и `timeScale`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где лучше двигать объект с `Rigidbody`?",
  "options": [
    {
      "text": "В `FixedUpdate`",
      "correct": true,
      "explanation": "Физика идёт с фиксированным шагом."
    },
    {
      "text": "В `LateUpdate`",
      "correct": false,
      "explanation": "`LateUpdate` — для камеры и пост-обработки."
    },
    {
      "text": "В `OnEnable`",
      "correct": false,
      "explanation": "`OnEnable` — для подписок, а не для постоянного движения."
    }
  ],
  "explanation": "`Rigidbody` двигают в `FixedUpdate`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про жизненный цикл?",
  "options": [
    {
      "text": "`Awake` вызывается раньше `Start`",
      "correct": true
    },
    {
      "text": "`OnEnable` может вызываться несколько раз",
      "correct": true
    },
    {
      "text": "`LateUpdate` идёт после `Update`",
      "correct": true
    },
    {
      "text": "`Start` вызывается каждый кадр",
      "correct": false,
      "explanation": "Каждый кадр вызывается `Update`."
    }
  ],
  "explanation": "Порядок и повторяемость методов важно учитывать при инициализации."
}
```

## Куда дальше

- [Практика: жизненный цикл](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/praktika-zhiznennyy-cikl.md)
- [Первый скрипт](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/pervyy-skript.md)
- [Time и корутины](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/time-i-korutiny.md)
