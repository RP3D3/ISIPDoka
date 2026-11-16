---
title: AudioSource
description: Компонент AudioSource, AudioClip, PlayOneShot, 2D/3D-звук и настройка громкости.
keywords: Unity AudioSource, AudioClip, AudioListener, PlayOneShot, spatialBlend, 3D звук, volume, pitch

---

# AudioSource

`AudioSource` проигрывает звук. Ему нужен `AudioClip` — аудиофайл в проекте.
Чтобы игрок что-то услышал, на сцене должен быть `AudioListener` (обычно на
камере).

## Базовое использование

1. Выберите объект.
2. **Add Component → Audio Source**.
3. Перетащите `AudioClip` в поле **AudioClip**.
4. Включите **Play On Awake**, если звук должен играть сразу.
5. Нажмите **Play**.

```csharp
using UnityEngine;

public class SoundExample : MonoBehaviour
{
    [SerializeField] private AudioSource _source;
    [SerializeField] private AudioClip _shot;

    public void PlayShot()
    {
        _source.PlayOneShot(_shot);
    }
}
```

`PlayOneShot` не прерывает текущий звук и удобен для выстрелов, шагов и
коротких эффектов.

## Основные свойства

| Свойство | Что делает |
|---|---|
| `clip` | аудиофайл |
| `volume` | громкость |
| `pitch` | высота тона |
| `loop` | повторять |
| `playOnAwake` | играть при старте |
| `spatialBlend` | 0 — 2D, 1 — 3D |
| `minDistance` | начало затухания 3D-звука |
| `maxDistance` | конец слышимости |

## 2D и 3D звук

- **2D** (`spatialBlend = 0`) — одинаково слышен везде: музыка, UI, голос
  рассказчика.
- **3D** (`spatialBlend = 1`) — затухает с расстоянием: выстрелы, шаги, машины.

Для 3D-звука важен `AudioListener` на камере и позиция источника.

## Музыка и циклы

```csharp
[SerializeField] private AudioSource _music;

private void Start()
{
    _music.loop = true;
    _music.Play();
}
```

Для фоновой музыки обычно делают отдельный `AudioSource` с `loop = true` и
громкостью ниже эффектов.

## Частые ошибки

- **Нет `AudioListener`.** Звука не слышно.
- **`PlayOneShot` на клипе, который уже играет.** Это нормально, но звуки
  накладываются.
- **3D-звук не слышен.** Проверьте `spatialBlend`, `minDistance` и позицию
  камеры.
- **Слишком много AudioSource.** Для частых выстрелов лучше пул или
  `PlayOneShot`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что нужно, чтобы услышать звук в сцене?",
  "options": [
    {
      "text": "`AudioSource` с клипом и `AudioListener`",
      "correct": true,
      "explanation": "Источник играет, слушатель принимает звук."
    },
    {
      "text": "Только `Rigidbody`",
      "correct": false,
      "explanation": "Rigidbody не отвечает за звук."
    },
    {
      "text": "Только `Canvas`",
      "correct": false,
      "explanation": "Canvas — для UI."
    }
  ],
  "explanation": "Нужны источник звука и слушатель."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про AudioSource?",
  "options": [
    {
      "text": "`PlayOneShot` играет короткий звук поверх других",
      "correct": true
    },
    {
      "text": "`spatialBlend = 1` делает звук 3D",
      "correct": true
    },
    {
      "text": "`loop` повторяет клип",
      "correct": true
    },
    {
      "text": "`AudioListener` должен быть на каждом объекте",
      "correct": false,
      "explanation": "Обычно достаточно одного слушателя на камере."
    }
  ],
  "explanation": "AudioSource управляет клипом, громкостью, циклом и 3D-затуханием."
}
```

## Куда дальше

- [AudioMixer](theme.html?path=content/unity/animaciya-zvuk-effekty/audiomixer.md)
- [Particle System](theme.html?path=content/unity/animaciya-zvuk-effekty/particle-system.md)
- [Практика: оживить](theme.html?path=content/unity/animaciya-zvuk-effekty/praktika-ozhivit.md)
