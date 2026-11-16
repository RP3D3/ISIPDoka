---
title: Первый скрипт
description: Создаём первый MonoBehaviour, разбираем имя файла, Start, Update и подключение скрипта к GameObject.
keywords: Unity первый скрипт, MonoBehaviour, Start, Update, Assets/Scripts, имя класса, C# в Unity

---

# Первый скрипт

Скрипт в Unity — это обычный класс C#, который наследуется от `MonoBehaviour`.
Unity сама создаёт экземпляр компонента и вызывает его методы в нужные моменты.

## Создание скрипта

1. В Project откройте папку `Assets`.
2. Создайте папку `Scripts`, если её ещё нет.
3. Правой кнопкой → **Create → C# Script**.
4. Назовите файл `HelloUnity`.
5. Откройте файл в Visual Studio или Rider.

Имя файла должно совпадать с именем класса. `HelloUnity.cs` → `public class
HelloUnity`.

## Первый код

```csharp
using UnityEngine;

public class HelloUnity : MonoBehaviour
{
    private void Start()
    {
        Debug.Log("Привет, Unity!");
    }

    private void Update()
    {
        // Выполняется каждый кадр
    }
}
```

- `using UnityEngine;` подключает классы Unity.
- `MonoBehaviour` — базовый класс для компонентов.
- `Start` вызывается один раз перед первым `Update`.
- `Update` вызывается каждый кадр.

## Как подключить скрипт

1. Сохраните файл и вернитесь в Unity.
2. Дождитесь компиляции: в правом нижнем углу не должно быть ошибок.
3. Перетащите `HelloUnity.cs` на GameObject в Hierarchy.
4. Или выберите GameObject → **Add Component** → `Hello Unity`.
5. Нажмите **Play** и откройте Console.

В Console появится сообщение `Привет, Unity!`.

## Где лежат скрипты

Скрипты — обычные ассеты в `Assets`. Папка `Assets/Scripts` не обязательна, но
удобна. Внутри можно делать подпапки: `Player`, `Enemies`, `UI`.

Не кладите скрипты в `Library` или `Packages`: `Library` — кэш, а `Packages` —
для пакетов.

## Частые ошибки

- **Имя файла не совпадает с классом.** Unity не сможет связать компонент.
- **Класс не наследуется от `MonoBehaviour`.** Такой класс нельзя повесить на
  GameObject.
- **Скрипт не на объекте.** Код есть, но не выполняется.
- **Ошибка компиляции.** В Console красное сообщение; сначала исправьте его.
- **Пробел в имени файла.** Лучше использовать `PlayerMovement`, а не
  `Player Movement`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "От какого класса наследуется скрипт-компонент Unity?",
  "options": [
    {
      "text": "`MonoBehaviour`",
      "correct": true,
      "explanation": "Именно `MonoBehaviour` позволяет быть компонентом."
    },
    {
      "text": "`GameObject`",
      "correct": false,
      "explanation": "`GameObject` — класс объекта, а не базовый класс скрипта."
    },
    {
      "text": "`Transform`",
      "correct": false,
      "explanation": "`Transform` — компонент, а не базовый класс."
    }
  ],
  "explanation": "Скрипты-компоненты наследуются от `MonoBehaviour`."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про первый скрипт?",
  "options": [
    {
      "text": "Имя файла должно совпадать с именем класса",
      "correct": true
    },
    {
      "text": "`Start` вызывается один раз перед первым `Update`",
      "correct": true
    },
    {
      "text": "`Update` вызывается каждый кадр",
      "correct": true
    },
    {
      "text": "Скрипт работает, даже если его не добавили на GameObject",
      "correct": false,
      "explanation": "Компонент должен быть на объекте."
    }
  ],
  "explanation": "Скрипт становится компонентом и начинает работать на GameObject."
}
```

## Куда дальше

- [Awake, OnEnable, Start](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/awake-onenable-start.md)
- [Update, FixedUpdate, LateUpdate](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/update-fixedupdate-lateupdate.md)
- [Поля в Inspector](theme.html?path=content/unity/skripty-i-zhiznennyy-cikl/polya-v-inspector.md)
