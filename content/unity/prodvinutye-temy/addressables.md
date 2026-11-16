---
title: Addressables
description: Адреса ассетов, группы, асинхронная загрузка и Release в Unity Addressables.
keywords: Unity Addressables, Addressable Assets, группы, адреса, метки, LoadAssetAsync, InstantiateAsync, Release

---

# Addressables

Addressables позволяют ссылаться на ассет по **адресу**, а не по прямой ссылке.
Способ доставки — локальный бандл, удалённый сервер, сцена — выбирается при
сборке.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/prodvinutye-temy/addressables.svg"
    alt="Схема Addressables: Assets, Group, Catalog, Runtime"
    width="900"
  >
  <figcaption>
    Ассеты группируются, собираются в каталог и загружаются по адресу.
  </figcaption>
</figure>

## Установка

1. **Window → Package Manager**.
2. Добавьте `com.unity.addressables`.
3. Откройте **Window → Asset Management → Addressables → Groups**.

В Unity 6 используется Addressables 2.x; в 2022.3 — 1.x или 2.x в зависимости от
версии пакета. API загрузки похож, но интерфейс групп может отличаться.

## Адрес и метка

- **Address** — строка, по которой загружается ассет, например `Enemy`.
- **Label** — метка для загрузки группы, например `enemies`.

Адрес не обязан совпадать с именем файла. Можно сделать `enemy_basic` для
префаба `Enemy_01`.

## Загрузка

```csharp
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

public class AddressableSpawner : MonoBehaviour
{
    [SerializeField] private AssetReferenceGameObject _enemyReference;

    private GameObject _instance;

    public async void Spawn()
    {
        AsyncOperationHandle<GameObject> handle =
            _enemyReference.InstantiateAsync();

        _instance = await handle.Task;
    }

    public void Despawn()
    {
        if (_instance != null)
        {
            Addressables.ReleaseInstance(_instance);
            _instance = null;
        }
    }
}
```

`InstantiateAsync` загружает и создаёт объект. `ReleaseInstance` освобождает
экземпляр.

## Загрузка ассета

```csharp
AsyncOperationHandle<GameObject> handle =
    Addressables.LoadAssetAsync<GameObject>("Enemy");

GameObject prefab = await handle.Task;
Instantiate(prefab);

Addressables.Release(handle);
```

`Release` обязателен. Если загружать без освобождения, память будет расти.

## Группы

Типичные группы:

- `Local` — входит в билд;
- `Remote` — скачивается с сервера;
- `Scenes` — сцены;
- `UI` — интерфейс.

Для каждой группы настраиваются сжатие, способ сборки и профиль загрузки.

## Что выбрать

| Ситуация | Инструмент |
|---|---|
| Маленький проект | прямые ссылки |
| Много ассетов | Addressables |
| Загрузка с сервера | Remote Group |
| Большие сцены | Addressable Scenes |
| Частая подгрузка | Addressables + пул |

## Частые ошибки

- **Не вызывают `Release`.** Утечка памяти.
- **Загружают один адрес много раз.** Используйте один handle.
- **Забыли собрать Addressables.** В билде нет каталога.
- **Remote без сервера.** Загрузка падает.
- **Ссылки на ассеты в обход Addressables.** Смешиваются две системы.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое Address в Addressables?",
  "options": [
    {
      "text": "Строка, по которой загружается ассет",
      "correct": true,
      "explanation": "Адрес не обязан совпадать с именем файла."
    },
    {
      "text": "Номер сцены",
      "correct": false,
      "explanation": "Сцена может быть ассетом, но Address — это строка."
    },
    {
      "text": "Тип коллайдера",
      "correct": false,
      "explanation": "Коллайдеры не связаны с Addressables."
    }
  ],
  "explanation": "Address — ключ для загрузки ассета."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Addressables?",
  "options": [
    {
      "text": "Загрузка обычно асинхронная",
      "correct": true
    },
    {
      "text": "Загруженное нужно освобождать",
      "correct": true
    },
    {
      "text": "Группы могут быть локальными и удалёнными",
      "correct": true
    },
    {
      "text": "`Release` не нужен",
      "correct": false,
      "explanation": "Без Release растёт потребление памяти."
    }
  ],
  "explanation": "Addressables — это адреса, группы, async и освобождение ресурсов."
}
```

## Куда дальше

- [UI Toolkit](theme.html?path=content/unity/prodvinutye-temy/ui-toolkit.md)
- [Продвинутые темы: итог](theme.html?path=content/unity/prodvinutye-temy/itog-prodvinutye-temy.md)
- [Пулинг и спавн](theme.html?path=content/unity/igrovaya-logika-arhitektura/puling-i-spavn.md)
