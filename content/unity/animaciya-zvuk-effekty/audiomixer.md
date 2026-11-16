---
title: AudioMixer
description: Группы громкости, snapshots и управление звуком через AudioMixer.
keywords: Unity AudioMixer, группы, snapshots, exposed parameters, SetFloat, dB, громкость

---

# AudioMixer

`AudioMixer` управляет группами звука: музыка, эффекты, голоса, мастер. Вместо
того чтобы менять громкость каждого `AudioSource`, вы сводите звук в микшере.

## Группы

Типичная структура:

```text
Master
├── Music
├── SFX
└── Voice
```

Каждый `AudioSource` направляется в группу через **Output**. Ползунок группы
меняет громкость всех источников сразу.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/animaciya-zvuk-effekty/audio-mixer.png"
    alt="Окно Audio Mixer с группами и ползунками громкости"
    width="600"
  >
  <figcaption>
    AudioMixer: группы, громкость и snapshots.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/AudioMixer.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Audio Mixer
    </a>
  </figcaption>
</figure>

## Snapshots

**Snapshot** — сохранённое состояние микшера. Например:

- `Default` — обычная игра;
- `Pause` — музыка тише, эффекты приглушены;
- `Underwater` — низкие частоты, приглушённые высокие.

Переключение snapshot можно делать вручную или из кода.

## Exposed Parameters

Чтобы менять громкость из кода:

1. Откройте группу в AudioMixer.
2. Правой кнопкой по ползунку Volume → **Expose Volume**.
3. Переименуйте параметр, например `MusicVolume`.
4. В коде используйте `SetFloat`.

```csharp
using UnityEngine;
using UnityEngine.Audio;

public class AudioSettings : MonoBehaviour
{
    [SerializeField] private AudioMixer _mixer;

    public void SetMusicVolume(float value)
    {
        float db = Mathf.Log10(Mathf.Max(value, 0.0001f)) * 20f;
        _mixer.SetFloat("MusicVolume", db);
    }
}
```

Громкость в микшере измеряется в децибелах. Линейный ползунок 0–1 нужно
переводить в dB.

## Переходы

`AudioMixerSnapshot.TransitionTo` плавно переключает snapshot:

```csharp
[SerializeField] private AudioMixerSnapshot _pauseSnapshot;

public void Pause()
{
    _pauseSnapshot.TransitionTo(0.3f);
}
```

## Частые ошибки

- **Источник не направлен в группу.** Ползунок группы не влияет на звук.
- **Меняют Volume напрямую в линейных единицах.** В микшере dB.
- **Забыли Expose параметр.** `SetFloat` не найдёт его.
- **Слишком много групп.** Начните с Master, Music, SFX.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Зачем нужен AudioMixer?",
  "options": [
    {
      "text": "Управлять группами звука и громкостью",
      "correct": true,
      "explanation": "Микшер сводит музыку, эффекты и голоса."
    },
    {
      "text": "Рисовать частицы",
      "correct": false,
      "explanation": "Частицы — Particle System."
    },
    {
      "text": "Анимировать персонажа",
      "correct": false,
      "explanation": "Анимация — Animator."
    }
  ],
  "explanation": "AudioMixer управляет группами и snapshots."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про AudioMixer?",
  "options": [
    {
      "text": "Группы объединяют несколько AudioSource",
      "correct": true
    },
    {
      "text": "Snapshot хранит состояние микшера",
      "correct": true
    },
    {
      "text": "Exposed parameter можно менять через `SetFloat`",
      "correct": true
    },
    {
      "text": "Громкость в микшере задаётся в пикселях",
      "correct": false,
      "explanation": "Громкость измеряется в децибелах."
    }
  ],
  "explanation": "Микшер работает с группами, snapshots и dB."
}
```

## Куда дальше

- [Particle System](theme.html?path=content/unity/animaciya-zvuk-effekty/particle-system.md)
- [AudioSource](theme.html?path=content/unity/animaciya-zvuk-effekty/audiosource.md)
- [Практика: оживить](theme.html?path=content/unity/animaciya-zvuk-effekty/praktika-ozhivit.md)
