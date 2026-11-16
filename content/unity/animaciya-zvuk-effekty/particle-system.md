---
title: Particle System
description: Модули Particle System, emission, shape, lifetime, цвет, размер и управление эффектом из кода.
keywords: Unity Particle System, emission, shape, lifetime, color over lifetime, size over lifetime, эффекты

---

# Particle System

`Particle System` создаёт эффекты: искры, дым, дождь, взрывы, следы. Он состоит
из модулей, каждый отвечает за свою часть поведения частиц.

## Основные модули

| Модуль | За что отвечает |
|---|---|
| Main | длительность, loop, start lifetime, start speed |
| Emission | сколько частиц рождается |
| Shape | форма источника: cone, sphere, box |
| Color over Lifetime | цвет на протяжении жизни |
| Size over Lifetime | размер на протяжении жизни |
| Renderer | материал и способ отрисовки |

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/animaciya-zvuk-effekty/particle-system.svg"
    alt="Схема модулей Particle System в Unity"
    width="900"
  >
  <figcaption>
    Particle System собирается из модулей: emission, shape, lifetime, color и
    renderer.
  </figcaption>
</figure>

## Создание эффекта

1. **GameObject → Effects → Particle System**.
2. Настройте **Main → Start Lifetime** и **Start Speed**.
3. В **Emission** задайте **Rate over Time**.
4. В **Shape** выберите форму.
5. В **Color over Lifetime** сделайте градиент.
6. В **Renderer** назначьте материал.

Для взрыва ставят `Emission → Burst`, а `Loop` выключают.

## Управление из кода

```csharp
using UnityEngine;

public class EffectPlayer : MonoBehaviour
{
    [SerializeField] private ParticleSystem _effect;

    public void Play()
    {
        _effect.Play();
    }

    public void Stop()
    {
        _effect.Stop();
    }

    public void PlayAt(Vector3 position)
    {
        _effect.transform.position = position;
        _effect.Play();
    }
}
```

Если эффект должен исчезнуть после проигрывания, уничтожайте объект по событию
или через таймер.

## Материал

Частицы рисуются материалом. В URP обычно используют шейдер **Universal Render
Pipeline/Particles/Unlit** или **Lit**. Если частицы розовые, материал не
совместим с текущим рендер-пайплайном.

## Частые ошибки

- **Эффект не виден.** Проверьте `Play On Awake`, `Loop`, материал и камеру.
- **Частицы розовые.** Неподходящий шейдер материала.
- **Слишком много частиц.** Снизьте rate, lifetime или используйте pooling.
- **Эффект не останавливается.** `Stop` останавливает рождение, но живые
  частицы доживают свой lifetime.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой модуль задаёт количество частиц?",
  "options": [
    {
      "text": "Emission",
      "correct": true,
      "explanation": "Emission управляет рождением частиц."
    },
    {
      "text": "Renderer",
      "correct": false,
      "explanation": "Renderer отвечает за отрисовку."
    },
    {
      "text": "Shape",
      "correct": false,
      "explanation": "Shape задаёт форму источника."
    }
  ],
  "explanation": "Emission задаёт rate и bursts."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Particle System?",
  "options": [
    {
      "text": "Emission задаёт рождение частиц",
      "correct": true
    },
    {
      "text": "Shape задаёт форму источника",
      "correct": true
    },
    {
      "text": "Color over Lifetime меняет цвет",
      "correct": true
    },
    {
      "text": "Particle System заменяет Animator",
      "correct": false,
      "explanation": "Это разные системы: эффекты и анимация."
    }
  ],
  "explanation": "Particle System — набор модулей для визуальных эффектов."
}
```

## Куда дальше

- [Анимация, звук и эффекты: итог](theme.html?path=content/unity/animaciya-zvuk-effekty/itog-animaciya-zvuk-effekty.md)
- [Практика: оживить](theme.html?path=content/unity/animaciya-zvuk-effekty/praktika-ozhivit.md)
- [Animator](theme.html?path=content/unity/animaciya-zvuk-effekty/animator.md)
