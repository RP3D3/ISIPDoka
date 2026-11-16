---
title: Игровая логика и архитектура
description: Итог группы: GameManager, здоровье и счёт, события, ScriptableObject, пул, сохранение и загрузка сцен.
keywords: Unity итог, GameManager, здоровье, счёт, события, ScriptableObject, пул, сохранение, SceneManager

---

# Игровая логика и архитектура

Мы собрали основу игры: состояние, данные, события, конфиги, пул объектов,
сохранение и переходы между сценами. Теперь проект не держится на одном
огромном скрипте.

## Что теперь должно быть понятно

- **GameManager** хранит состояние игры и общие правила.
- **Здоровье и счёт** лучше обновлять через события, а не поиск UI.
- **Делегаты и события** уменьшают связанность.
- **ScriptableObject** хранит конфиги и общие данные.
- **Пул объектов** переиспользует экземпляры вместо `Instantiate/Destroy`.
- **PlayerPrefs** — для настроек, **JSON** — для прогресса.
- **SceneManager** загружает сцены, асинхронная загрузка показывает прогресс.
- Сцена должна быть в Build Settings / Build Profiles.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Где состояние игры? | GameManager |
| Как обновить UI здоровья? | Событие `HealthChanged` |
| Как развязать код и UI? | `event` / `UnityEvent` |
| Где хранить конфиг врага? | ScriptableObject |
| Как переиспользовать пули? | Пул объектов |
| Где хранить настройки? | PlayerPrefs |
| Где хранить прогресс? | JSON в `persistentDataPath` |
| Как загрузить сцену? | `SceneManager.LoadScene` |
| Как показать прогресс? | `LoadSceneAsync` |

## Чек-лист

- [ ] Я могу описать состояния игры.
- [ ] Я использую события для обновления UI.
- [ ] Я умею создавать ScriptableObject-конфиг.
- [ ] Я понимаю, зачем нужен пул объектов.
- [ ] Я сохраняю прогресс в JSON.
- [ ] Я загружаю сцены через SceneManager.
- [ ] Я не забываю добавлять сцены в сборку.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где лучше хранить настройки громкости?",
  "options": [
    {
      "text": "В `PlayerPrefs`",
      "correct": true,
      "explanation": "Это простые настройки, для них PlayerPrefs удобен."
    },
    {
      "text": "В имени сцены",
      "correct": false,
      "explanation": "Имя сцены не хранит настройки."
    },
    {
      "text": "В `Library`",
      "correct": false,
      "explanation": "`Library` — кэш."
    }
  ],
  "explanation": "PlayerPrefs подходит для небольших настроек."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про архитектуру игры?",
  "options": [
    {
      "text": "События уменьшают связанность",
      "correct": true
    },
    {
      "text": "ScriptableObject удобен для конфигов",
      "correct": true
    },
    {
      "text": "Пул снижает количество `Instantiate/Destroy`",
      "correct": true
    },
    {
      "text": "GameManager должен содержать весь код игры",
      "correct": false,
      "explanation": "Это превращает его в свалку."
    }
  ],
  "explanation": "Архитектура — это разделение ответственности, а не один большой класс."
}
```

## Куда дальше

- [Практика: игровой цикл](theme.html?path=content/unity/igrovaya-logika-arhitektura/praktika-igrovoy-cikl.md)
- [GameManager](theme.html?path=content/unity/igrovaya-logika-arhitektura/gamemanager.md)
- [ScriptableObject](theme.html?path=content/unity/igrovaya-logika-arhitektura/scriptableobject.md)
