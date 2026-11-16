---
title: Сохранение
description: PlayerPrefs, JSON и Application.persistentDataPath для настроек и прогресса.
keywords: Unity сохранение, PlayerPrefs, JsonUtility, persistentDataPath, JSON, save load, прогресс

---

# Сохранение

Данные можно хранить в `PlayerPrefs` или в файле. `PlayerPrefs` хорош для
настроек, JSON — для прогресса и сложных структур.

## PlayerPrefs

```csharp
PlayerPrefs.SetInt("BestScore", 120);
PlayerPrefs.SetFloat("MusicVolume", 0.7f);
PlayerPrefs.SetString("PlayerName", "Roman");
PlayerPrefs.Save();
```

Чтение:

```csharp
int best = PlayerPrefs.GetInt("BestScore", 0);
float volume = PlayerPrefs.GetFloat("MusicVolume", 1f);
string name = PlayerPrefs.GetString("PlayerName", "Player");
```

Плюсы: просто, кроссплатформенно.
Минусы: не для больших данных, легко подделать, нет структуры.

## JSON

Для прогресса удобно описать класс:

```csharp
using System;
using System.IO;
using UnityEngine;

[Serializable]
public class SaveData
{
    public int level;
    public int score;
    public float health;
    public string playerName;
}

public static class SaveSystem
{
    private static string Path =>
        System.IO.Path.Combine(Application.persistentDataPath, "save.json");

    public static void Save(SaveData data)
    {
        string json = JsonUtility.ToJson(data, true);
        File.WriteAllText(Path, json);
    }

    public static SaveData Load()
    {
        if (!File.Exists(Path))
        {
            return new SaveData();
        }

        string json = File.ReadAllText(Path);
        return JsonUtility.FromJson<SaveData>(json) ?? new SaveData();
    }
}
```

`Application.persistentDataPath` — папка, которую Unity считает постоянной для
приложения. На Windows это обычно `%userprofile%\AppData\LocalLow\<company>\<product>`.

## Что сохранять

- номер уровня;
- счёт;
- здоровье;
- открытые предметы;
- настройки звука и графики;
- выбранный язык.

Не сохраняйте ссылки на GameObject, компоненты и сцены. Сохраняйте простые
данные: числа, строки, массивы.

## Версии сохранений

Если структура данных меняется, добавьте поле версии:

```csharp
[Serializable]
public class SaveData
{
    public int version = 1;
    public int level;
}
```

При загрузке проверяйте версию и мигрируйте данные. Иначе старые сохранения
могут сломать игру.

## Частые ошибки

- **`PlayerPrefs` для больших данных.** Это не база данных.
- **Сохранение ссылок на объекты.** JSON их не восстановит.
- **Нет обработки отсутствующего файла.** Игра падает на первом запуске.
- **Нет версии формата.** Обновление игры ломает сохранения.
- **Считают JSON защищённым.** Его можно прочитать и изменить.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что лучше для сложного прогресса?",
  "options": [
    {
      "text": "JSON-файл в `Application.persistentDataPath`",
      "correct": true,
      "explanation": "Он хранит структуру и удобен для версионирования."
    },
    {
      "text": "Одна строка в `PlayerPrefs`",
      "correct": false,
      "explanation": "`PlayerPrefs` плохо подходит для больших структур."
    },
    {
      "text": "Имя GameObject",
      "correct": false,
      "explanation": "Имя не является хранилищем данных."
    }
  ],
  "explanation": "JSON лучше для структурированного прогресса."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про сохранение?",
  "options": [
    {
      "text": "`PlayerPrefs` подходит для настроек",
      "correct": true
    },
    {
      "text": "`JsonUtility` умеет сериализовать `[Serializable]` классы",
      "correct": true
    },
    {
      "text": "`persistentDataPath` — постоянная папка приложения",
      "correct": true
    },
    {
      "text": "В JSON можно сохранить ссылку на GameObject",
      "correct": false,
      "explanation": "Ссылки на объекты сцены не сериализуются."
    }
  ],
  "explanation": "Настройки — PlayerPrefs, прогресс — JSON, ссылки не сохраняем."
}
```

## Куда дальше

- [Загрузка сцен](theme.html?path=content/unity/igrovaya-logika-arhitektura/zagruzka-scen.md)
- [Пулинг и спавн](theme.html?path=content/unity/igrovaya-logika-arhitektura/puling-i-spavn.md)
- [Практика: игровой цикл](theme.html?path=content/unity/igrovaya-logika-arhitektura/praktika-igrovoy-cikl.md)
