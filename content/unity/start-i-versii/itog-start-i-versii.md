---
title: Старт и версии
description: Короткий итог первой группы: Unity, версии, редактор, GameObject и структура проекта.
keywords: Unity итог, старт Unity, версии Unity, окна редактора, GameObject, компонент, Assets

---

# Старт и версии

Мы прошли первый круг: разобрались, что такое Unity, чем отличаются версии,
как создать проект и из чего состоит сцена. Теперь у нас есть карта, по которой
можно двигаться дальше.

## Что теперь должно быть понятно

- **Unity** — это движок и редактор. Логика пишется на C#.
- **Сцена** — контейнер для объектов одного уровня или экрана.
- **GameObject** — объект на сцене, а **компонент** — его часть.
- **`Transform`** есть у каждого GameObject.
- **Inspector** — панель свойств выбранного объекта.
- **`Assets`** — рабочая папка проекта, а `Library` — служебный кэш.
- **`.meta`** хранит `guid` и настройки импорта; его нельзя удалять вручную.
- **Unity 6** — основная версия курса, **Unity 2022.3 LTS** — поддерживаемая.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Где объекты сцены? | Hierarchy |
| Где свойства выбранного объекта? | Inspector |
| Где файлы проекта? | Project |
| Где логи и ошибки? | Console |
| Что обязательно у GameObject? | `Transform` |
| Что коммитить в Git? | `Assets`, `ProjectSettings`, `Packages` |
| Что не коммитить? | `Library`, `Temp`, `Logs`, `obj` |

## Версии в одном взгляде

| Unity 2022.3 LTS | Unity 6 |
|---|---|
| `Rigidbody.velocity` | `Rigidbody.linearVelocity` |
| `Rigidbody.drag` | `Rigidbody.linearDamping` |
| `Rigidbody.angularDrag` | `Rigidbody.angularDamping` |
| `Build Settings` | `Build Profiles` |
| `FindObjectOfType` | `FindFirstObjectByType` |
| Input System 1.7+ | Input System 1.11+ |

Подробно каждое отличие разберём в соответствующих группах, а полная матрица
будет в справочнике «Версии и миграция».

## Чек-лист

- [ ] Я понимаю, чем GameObject отличается от компонента.
- [ ] Я могу создать проект и сохранить сцену.
- [ ] Я знаю, где находятся Hierarchy, Scene, Game, Inspector, Project и Console.
- [ ] Я понимаю, зачем нужны `.meta`-файлы.
- [ ] Я знаю, что `Library` не коммитят.
- [ ] Я помню, что Unity 6 и 2022.3 отличаются API.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что из перечисленного является компонентом, а не GameObject?",
  "options": [
    {
      "text": "`Rigidbody`",
      "correct": true,
      "explanation": "Rigidbody добавляют на GameObject как компонент."
    },
    {
      "text": "`Main Camera`",
      "correct": false,
      "explanation": "Это GameObject на сцене."
    },
    {
      "text": "`Player`",
      "correct": false,
      "explanation": "Это имя GameObject, а не компонент."
    }
  ],
  "explanation": "Компоненты добавляют объекту поведение; GameObject — контейнер."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про версии Unity?",
  "options": [
    {
      "text": "`6000.0.x` — это Unity 6 LTS",
      "correct": true
    },
    {
      "text": "`2022.3.x` — это Unity 2022 LTS",
      "correct": true
    },
    {
      "text": "В Unity 6 используют `Rigidbody.velocity`",
      "correct": false,
      "explanation": "В Unity 6 используют `linearVelocity`."
    },
    {
      "text": "В Unity 6 окно сборки называется Build Profiles",
      "correct": true
    }
  ],
  "explanation": "Unity 6 — это 6000.0.x; старые имена физики и Build Settings там заменены."
}
```

## Куда дальше

- [Практика: первый проект](theme.html?path=content/unity/start-i-versii/praktika-start.md)
- [Что такое Unity](theme.html?path=content/unity/start-i-versii/chto-takoe-unity.md)
- [Unity 2022 LTS и Unity 6](theme.html?path=content/unity/start-i-versii/unity-2022-i-unity-6.md)
