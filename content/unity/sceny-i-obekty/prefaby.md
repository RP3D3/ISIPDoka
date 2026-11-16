---
title: Префабы
description: Шаблоны GameObject, варианты префабов, вложенные префабы и создание объектов через Instantiate.
keywords: Unity префаб, Prefab, Instantiate, Prefab Variant, вложенные префабы, Apply, Revert

---

# Префабы

**Префаб** — это сохранённый шаблон GameObject. Один раз настроили врага,
пулю или кнопку UI — и создаёте сколько угодно копий с одинаковыми компонентами
и настройками.

## Зачем нужен префаб

Без префаба вы копируете объект на сцене и правите каждую копию вручную. С
префабом изменения применяются ко всем экземплярам:

- поправили коллайдер у префаба — обновились все копии;
- добавили компонент — он появился у всех;
- изменили материал — цвет поменялся везде.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/sceny-i-obekty/prefab-workflow.png"
    alt="Схема работы с префабами в Unity"
    width="900"
  >
  <figcaption>
    Префаб хранится в Project, а на сцене находятся его экземпляры.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/CreatingPrefabs.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Creating prefabs
    </a>
  </figcaption>
</figure>

## Как создать префаб

1. Настройте GameObject на сцене.
2. Перетащите его из Hierarchy в папку `Assets/Prefabs`.
3. Имя файла станет именем префаба.
4. Исходный объект на сцене станет экземпляром префаба.

Если перетащить объект обратно на сцену, получится ещё один экземпляр.

## Редактирование

У экземпляра префаба в Inspector есть кнопки:

- **Open** — открыть префаб в отдельном режиме;
- **Select** — выделить ассет в Project;
- **Overrides** — посмотреть, чем экземпляр отличается от префаба;
- **Apply All** — применить изменения к префабу;
- **Revert All** — отменить изменения экземпляра.

Изменения экземпляра не попадают в префаб автоматически. Это защищает другие
копии от случайных правок.

## Варианты префабов

**Prefab Variant** — префаб, который наследует другой префаб, но добавляет свои
отличия. Например, базовый враг и его красный «элитный» вариант.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/sceny-i-obekty/prefab-variant-family.png"
    alt="Семейство вариантов префабов в Unity"
    width="500"
  >
  <figcaption>
    Варианты префабов наследуют базовый префаб и хранят только отличия.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/PrefabVariants.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Prefab Variants
    </a>
  </figcaption>
</figure>

## Вложенные префабы

Префаб может содержать другие префабы. Например, префаб машины состоит из
префаба кузова и префаба колеса.

<figure class="md-figure md-figure--center md-figure--small">
  <img
    src="content/unity/_assets/sceny-i-obekty/nested-prefabs.png"
    alt="Вложенные префабы в Hierarchy Unity"
    width="317"
  >
  <figcaption>
    Вложенные префабы позволяют собирать сложные объекты из простых.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/NestedPrefabs.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Nested prefabs
    </a>
  </figcaption>
</figure>

## Создание в коде

```csharp
using UnityEngine;

public class Spawner : MonoBehaviour
{
    [SerializeField] private GameObject _enemyPrefab;
    [SerializeField] private Transform _spawnPoint;

    public void Spawn()
    {
        Instantiate(_enemyPrefab, _spawnPoint.position, Quaternion.identity);
    }
}
```

`Instantiate` создаёт копию префаба на сцене. Ссылку на префаб удобно передавать
через Inspector, а не искать по имени.

## Частые ошибки

- **Правят экземпляр и ждут, что изменится префаб.** Нужно нажать **Apply**.
- **Удаляют префаб из Project.** Все экземпляры на сценах потеряют связь.
- **Делают слишком большой префаб.** Чем меньше ответственность, тем проще
  переиспользовать.
- **Забывают про `Instantiate` и создают объекты вручную.** Для спавна нужен
  код или фабрика.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое префаб Unity?",
  "options": [
    {
      "text": "Сохранённый шаблон GameObject",
      "correct": true,
      "explanation": "Префаб хранит объект и его компоненты как ассет."
    },
    {
      "text": "Файл сцены",
      "correct": false,
      "explanation": "Сцена — отдельный ассет `.unity`."
    },
    {
      "text": "Скрипт для создания объектов",
      "correct": false,
      "explanation": "Скрипт может создавать объекты, но префаб — это шаблон."
    }
  ],
  "explanation": "Префаб — переиспользуемый шаблон GameObject."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про префабы?",
  "options": [
    {
      "text": "Изменения экземпляра можно применить к префабу кнопкой Apply",
      "correct": true
    },
    {
      "text": "Prefab Variant наследует другой префаб",
      "correct": true
    },
    {
      "text": "`Instantiate` создаёт экземпляр префаба",
      "correct": true
    },
    {
      "text": "Изменения экземпляра автоматически меняют все копии",
      "correct": false,
      "explanation": "Нужно применить изменения к префабу."
    }
  ],
  "explanation": "Префабы — шаблоны; экземпляры могут отличаться, пока изменения не применены."
}
```

## Куда дальше

- [Теги, слои и порядок](theme.html?path=content/unity/sceny-i-obekty/tegi-sloi.md)
- [Иерархия и родители](theme.html?path=content/unity/sceny-i-obekty/ierarhiya-i-roditeli.md)
- [Практика: сцена](theme.html?path=content/unity/sceny-i-obekty/praktika-scena.md)
