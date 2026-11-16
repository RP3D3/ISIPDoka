---
title: Сцены и объекты
description: Итог группы: GameObject, Transform, локальные координаты, иерархия, префабы, теги и слои.
keywords: Unity итог, GameObject, Transform, иерархия, префабы, теги, слои, сцена

---

# Сцены и объекты

Мы разобрали, как устроена сцена и как объекты взаимодействуют друг с другом.
Теперь у нас есть база для скриптов, физики и камеры.

## Что теперь должно быть понятно

- **GameObject** — контейнер, **компонент** — его часть.
- **`Transform`** хранит позицию, поворот и масштаб.
- **`position`** — мировые координаты, **`localPosition`** — относительно
  родителя.
- **Hierarchy** — дерево родителей и детей.
- **Префаб** — шаблон GameObject, который переиспользуют на сценах.
- **Тег** — метка объекта, **слой** — категория для физики и отрисовки.
- **`CompareTag`** лучше, чем сравнение строк через `==`.
- **`LayerMask`** помогает ограничить raycast и столкновения.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Что обязательно у GameObject? | `Transform` |
| Где локальные координаты? | `localPosition`, `localRotation`, `localScale` |
| Как сделать объект дочерним? | Перетащить в Hierarchy или `SetParent` |
| Как создать копию префаба? | `Instantiate` |
| Как проверить тег? | `CompareTag("Player")` |
| Как искать только по слою? | `LayerMask` |
| Где менять порядок 2D-спрайтов? | `Sorting Layer` и `Order in Layer` |

## Чек-лист

- [ ] Я понимаю разницу между GameObject и компонентом.
- [ ] Я могу объяснить, что такое `localPosition`.
- [ ] Я умею делать дочерние объекты и понимаю наследование Transform.
- [ ] Я знаю, как создать префаб и применить изменения.
- [ ] Я не путаю теги и слои.
- [ ] Я могу ограничить raycast через `LayerMask`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что произойдёт с ребёнком при повороте родителя?",
  "options": [
    {
      "text": "Ребёнок повернётся вместе с родителем",
      "correct": true,
      "explanation": "Дочерний Transform наследует поворот родителя."
    },
    {
      "text": "Ребёнок останется в мировом повороте",
      "correct": false,
      "explanation": "Это возможно только без родительской связи."
    },
    {
      "text": "Ребёнок удалится",
      "correct": false,
      "explanation": "Поворот не удаляет объекты."
    }
  ],
  "explanation": "Иерархия наследует позицию, поворот и масштаб."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про префабы и слои?",
  "options": [
    {
      "text": "Префаб — шаблон GameObject",
      "correct": true
    },
    {
      "text": "`Instantiate` создаёт экземпляр префаба",
      "correct": true
    },
    {
      "text": "Слой можно использовать в `LayerMask`",
      "correct": true
    },
    {
      "text": "Тег и слой — это одно и то же",
      "correct": false,
      "explanation": "Это разные поля с разным назначением."
    }
  ],
  "explanation": "Префабы переиспользуют объекты, а слои ограничивают физику и отрисовку."
}
```

## Куда дальше

- [Практика: сцена](theme.html?path=content/unity/sceny-i-obekty/praktika-scena.md)
- [GameObjects и компоненты](theme.html?path=content/unity/sceny-i-obekty/gameobject-i-component.md)
- [Transform](theme.html?path=content/unity/sceny-i-obekty/transform.md)
