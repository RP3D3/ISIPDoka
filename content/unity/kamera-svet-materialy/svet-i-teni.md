---
title: Свет и тени
description: Типы источников света в Unity, интенсивность, тени и запекание: Directional, Point, Spot, lightmapping.
keywords: Unity свет, Directional Light, Point Light, Spot Light, intensity, shadows, lightmapping, baked, mixed, URP

---

# Свет и тени

Свет делает сцену объёмной. Без него даже хорошие модели выглядят плоскими
пятнами. В Unity источники света — это обычные компоненты `Light`, которые
можно добавлять, двигать и включать из кода.

## Типы источников

| Тип | Как светит | Где используют |
|---|---|---|
| `Directional` | параллельные лучи, как солнце | основной свет на улице |
| `Point` | во все стороны из одной точки | лампы, костры, фонарики |
| `Spot` | конусом в заданном направлении | прожекторы, фары, акценты |

У `Directional` важна только ротация: положение не влияет на направление
лучей. У `Point` и `Spot` есть `Range` — расстояние, на котором свет ещё
заметен. У `Spot` дополнительно настраивают `Spot Angle` — ширину конуса.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/kamera-svet-materialy/light-spot.jpg"
    alt="Прожектор Spot Light освещает помещение; видны конус света и гизмо источника"
    width="511"
  >
  <figcaption>
    Spot Light светит конусом: направление и угол задают форму пятна на
    поверхности.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/Lighting.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Lighting
    </a>
  </figcaption>
</figure>

## Интенсивность и цвет

`Intensity` задаёт яркость, `Color` — оттенок. Для тёплого комнатного света
берут слегка жёлтый цвет, для уличного — холодный. Небольшие различия в цвете
ключевого и заполняющего света уже дают глубину.

В URP подписи и единицы интенсивности могут отличаться от Built-in: например,
для направленного света может использоваться люкс. Ориентируйтесь на превью в
Scene и на итоговую картинку в Game, а не только на число.

```csharp
using UnityEngine;

public class LightFlicker : MonoBehaviour
{
    [SerializeField] private Light targetLight;
    [SerializeField] private float minIntensity = 0.5f;
    [SerializeField] private float maxIntensity = 2f;
    [SerializeField] private float speed = 3f;

    private void Update()
    {
        if (targetLight == null)
        {
            return;
        }

        float wave = (Mathf.Sin(Time.time * speed) + 1f) * 0.5f;
        targetLight.intensity = Mathf.Lerp(minIntensity, maxIntensity, wave);
    }
}
```

Такой скрипт вешают на объект со светом и перетаскивают сам `Light` в поле
`Target Light`. Для мерцания костра добавьте ещё небольшую случайность.

## Тени

Тени включаются в компоненте `Light`:

- `Shadow Type` — `None`, `Hard` или `Soft`;
- `Strength` — насколько тёмной будет тень;
- `Bias` — смещение, которое убирает полосы на поверхности;
- `Normal Bias` — помогает против артефактов на скруглённых моделях.

Мягкие тени дороже жёстких. Если теней много, начните с `Hard` и включайте
`Soft` только там, где это важно.

В URP общие параметры теней — дистанция, каскады и количество теней —
находятся в настройках URP Asset. Если тени пропали, проверьте не только
источник света, но и эти настройки.

## Запекание света

Статический свет можно запечь в текстуры — lightmaps. Тогда в рантайме он
почти не стоит производительности. Порядок обычно такой:

1. Отметьте неподвижную геометрию как `Static`.
2. Откройте **Window → Rendering → Lighting**.
3. Включите `Baked Global Illumination` в Lighting Settings.
4. Источникам света задайте `Mode = Baked` или `Mixed`.
5. Нажмите **Generate Lighting**.

`Baked` полностью запекается и не влияет на движущиеся объекты. `Mixed`
совмещает запечённый свет с тенями от динамических объектов. Динамические
объекты освещают light probes — заранее расставленные точки с запечённым
светом.

В URP основной практический путь — запечённые lightmaps и light probes.
Конкретные режимы GI зависят от версии пакета, поэтому проверяйте их в
документации своей версии.

## Свет в URP

В URP есть направленный свет и дополнительные источники. Количество
дополнительных источников, которые влияют на объект одновременно, ограничено
настройками URP Asset. Поэтому десяток точечных ламп в комнате может дать не
тот результат, который вы ждёте.

Для производительности:

- используйте запечённый свет для статики;
- не ставьте реальные тени всем источникам;
- уменьшайте `Range` у точечных ламп;
- проверяйте `Per Object Limit` в настройках дополнительных источников URP Asset.

## Частые ошибки

- **Двигают `Directional Light` и ждут изменения направления.** Нужно вращать
  объект, а не перемещать.
- **Ставят много реальных источников с тенями.** Это дорого; часть света
  лучше запечь.
- **Забывают отметить объекты `Static`.** Запечённый свет не попадёт на них.
- **Не проверяют `Bias`.** На поверхностях появляются полосы или «акне» теней.
- **Ждут, что запечённый свет осветит движущегося персонажа.** Для этого нужны
  light probes или смешанный режим.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Почему положение Directional Light не влияет на направление света?",
  "options": [
    {
      "text": "Он светит параллельными лучами, важна только ротация",
      "correct": true,
      "explanation": "Направленный свет моделирует солнце: все лучи параллельны."
    },
    {
      "text": "Он всегда светит строго вниз",
      "correct": false,
      "explanation": "Направление задаётся поворотом объекта."
    },
    {
      "text": "Положение влияет, но только в URP",
      "correct": false,
      "explanation": "Для Directional Light положение не важно ни в Built-in, ни в URP."
    }
  ],
  "explanation": "У направленного света нет точки испускания, поэтому двигать его бессмысленно — поворачивайте."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что нужно для запечённого света?",
  "options": [
    {
      "text": "Отметить неподвижную геометрию как `Static`",
      "correct": true
    },
    {
      "text": "Сгенерировать освещение в окне Lighting",
      "correct": true
    },
    {
      "text": "Иметь UV-развёртку для lightmap",
      "correct": true
    },
    {
      "text": "Поставить каждому движущемуся объекту реальный источник света",
      "correct": false,
      "explanation": "Для динамических объектов обычно используют light probes."
    }
  ],
  "explanation": "Запекание требует статической геометрии, корректной UV-развёртки и генерации lighting data."
}
```

## Куда дальше

- [Камера](theme.html?path=content/unity/kamera-svet-materialy/kamera.md)
- [Материалы и URP](theme.html?path=content/unity/kamera-svet-materialy/materialy-i-urp.md)
- [Пост-обработка](theme.html?path=content/unity/kamera-svet-materialy/post-obrabotka.md)
- [Практика: камера и свет](theme.html?path=content/unity/kamera-svet-materialy/praktika-kamera-i-svet.md)
