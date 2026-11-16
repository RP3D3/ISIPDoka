---
title: Продвинутые темы
description: Итог опционального блока: NavMesh, Addressables и UI Toolkit.
keywords: Unity продвинутые темы, NavMesh, Addressables, UI Toolkit, итог

---

# Продвинутые темы

Этот блок — необязательное расширение курса. Он показывает три системы, которые
пригодятся в больших проектах: навигацию, доставку ассетов и современный UI.

## Что теперь должно быть понятно

- **NavMesh** описывает проходимые зоны, а `NavMeshAgent` строит путь.
- `NavMeshSurface` запекает навигацию, `NavMeshObstacle` вырезает препятствия.
- **Addressables** загружают ассеты по адресу, а не по прямой ссылке.
- Загруженные Addressables нужно освобождать через `Release`.
- **UI Toolkit** использует UXML, USS, `UIDocument` и `VisualElement`.
- `Q<T>("name")` ищет элемент, `clicked` подписывается на нажатие.
- uGUI и UI Toolkit решают похожие задачи, но по-разному.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Где проходимая зона? | NavMesh |
| Кто ходит по NavMesh? | `NavMeshAgent` |
| Как задать цель? | `SetDestination` |
| Как загрузить ассет по адресу? | `Addressables.LoadAssetAsync` |
| Как освободить? | `Addressables.Release` |
| Что описывает структуру UI? | UXML |
| Что описывает стили? | USS |
| Как найти элемент? | `Q<T>("name")` |

## Чек-лист

- [ ] Я могу запечь NavMesh и отправить агента к цели.
- [ ] Я понимаю, зачем нужны `NavMeshObstacle` и `OffMeshLink`.
- [ ] Я могу создать Addressables-группу и загрузить ассет.
- [ ] Я не забываю `Release`.
- [ ] Я могу собрать простое меню на UI Toolkit.
- [ ] Я понимаю разницу между uGUI и UI Toolkit.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает `NavMeshAgent.SetDestination`?",
  "options": [
    {
      "text": "Строит путь к точке и запускает движение",
      "correct": true,
      "explanation": "Агент идёт к цели по NavMesh."
    },
    {
      "text": "Запекает NavMesh",
      "correct": false,
      "explanation": "Запекание делает NavMeshSurface."
    },
    {
      "text": "Загружает Addressables",
      "correct": false,
      "explanation": "Это разные системы."
    }
  ],
  "explanation": "SetDestination задаёт цель для агента."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про продвинутые темы?",
  "options": [
    {
      "text": "Addressables нужно освобождать",
      "correct": true
    },
    {
      "text": "UI Toolkit использует UXML и USS",
      "correct": true
    },
    {
      "text": "NavMeshAgent ходит по NavMesh",
      "correct": true
    },
    {
      "text": "UI Toolkit заменяет физику",
      "correct": false,
      "explanation": "UI Toolkit — только интерфейс."
    }
  ],
  "explanation": "NavMesh, Addressables и UI Toolkit — три независимые системы."
}
```

## Куда дальше

- [NavMesh и навигация](theme.html?path=content/unity/prodvinutye-temy/navmesh-i-navigaciya.md)
- [Addressables](theme.html?path=content/unity/prodvinutye-temy/addressables.md)
- [UI Toolkit](theme.html?path=content/unity/prodvinutye-temy/ui-toolkit.md)
