---
title: Версии и миграция
description: Итог справочника: физика, поиск объектов, ввод, пакеты и сборка при переходе на Unity 6.
keywords: Unity миграция итог, 2022.3, Unity 6, linearVelocity, FindFirstObjectByType, Build Profiles

---

# Версии и миграция

Этот справочник собирает главные отличия Unity 2022.3 LTS и Unity 6. Его можно
использовать как чек-лист при обновлении проекта.

## Что теперь должно быть понятно

- `Rigidbody.velocity` → `linearVelocity`.
- `drag` → `linearDamping`, `angularDrag` → `angularDamping`.
- То же для `Rigidbody2D`.
- `FindObjectOfType` → `FindFirstObjectByType`.
- `FindObjectsOfType` → `FindObjectsByType`.
- Project-wide Actions стабильны в Unity 6.
- URP 14 → 17, TMP входит в uGUI 2.x.
- Cinemachine 3.x поддерживает обе версии.
- `Build Settings` → `Build Profiles`.

## Мини-таблица

| Вопрос | 2022.3 | Unity 6 |
|---|---|---|
| Скорость Rigidbody | `velocity` | `linearVelocity` |
| Линейное сопротивление | `drag` | `linearDamping` |
| Угловое сопротивление | `angularDrag` | `angularDamping` |
| Поиск одного объекта | `FindObjectOfType` | `FindFirstObjectByType` |
| Поиск всех | `FindObjectsOfType` | `FindObjectsByType` |
| Project-wide Actions | предварительные | стабильные |
| URP | 14.x | 17.x |
| TMP | отдельный пакет | uGUI 2.x |
| Сборка | Build Settings | Build Profiles |

## Чек-лист миграции

- [ ] Сделал backup или коммит в Git.
- [ ] Проверил все `velocity`, `drag`, `angularDrag`.
- [ ] Проверил `Rigidbody2D`.
- [ ] Заменил `FindObjectOfType`.
- [ ] Проверил Input System и EventSystem.
- [ ] Обновил URP, TMP, Cinemachine.
- [ ] Проверил сцены в Build Profiles.
- [ ] Собрал билд и прошёл игру.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что сделать перед обновлением проекта?",
  "options": [
    {
      "text": "Сделать backup или коммит в Git",
      "correct": true,
      "explanation": "Это позволит откатиться."
    },
    {
      "text": "Удалить `Library` и `ProjectSettings`",
      "correct": false,
      "explanation": "`ProjectSettings` удалять нельзя."
    },
    {
      "text": "Сразу собрать релиз",
      "correct": false,
      "explanation": "Сначала проверка."
    }
  ],
  "explanation": "Backup — первый шаг миграции."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про миграцию?",
  "options": [
    {
      "text": "`linearVelocity` заменяет `velocity`",
      "correct": true
    },
    {
      "text": "`FindFirstObjectByType` заменяет `FindObjectOfType`",
      "correct": true
    },
    {
      "text": "Build Profiles заменяют Build Settings",
      "correct": true
    },
    {
      "text": "Cinemachine 3.x не работает в 2022.3",
      "correct": false,
      "explanation": "Cinemachine 3.x поддерживает и 2022.3, и Unity 6."
    }
  ],
  "explanation": "Миграция — это API, ввод, пакеты и сборка."
}
```

## Куда дальше

- [Матрица API 2022.3 и Unity 6](theme.html?path=content/unity/versii-i-migraciya/matrica-api.md)
- [Rigidbody и Rigidbody2D](theme.html?path=content/unity/versii-i-migraciya/rigidbody-migraciya.md)
- [Input System и project-wide actions](theme.html?path=content/unity/versii-i-migraciya/input-migraciya.md)
