---
title: Пост-обработка
description: Пост-обработка в URP через Volume: Bloom, Vignette, Color Adjustments и настройки камеры.
keywords: Unity пост-обработка, URP Volume, Bloom, Vignette, Color Adjustments, Volume Profile, post-processing

---

# Пост-обработка

Пост-обработка — эффекты, которые накладываются на уже готовое изображение.
Они не меняют геометрию и материалы, а работают с кадром целиком: добавляют
свечение ярким участкам, затемняют края, правят контраст и цвет.

## Как устроен Volume

В URP пост-обработка настраивается через компонент `Volume`. На объекте
`Volume` лежит ссылка на `Volume Profile` — ассет со списком эффектов. Каждый
эффект можно включить, настроить и переопределить.

Чтобы эффекты заработали, нужны три вещи:

1. В сцене есть объект с компонентом `Volume`.
2. У него назначен `Volume Profile` с нужными эффектами.
3. У камеры включена галочка `Post Processing`.

Галочка находится в компоненте `Camera` в разделе рендеринга. Если её нет,
Volume может быть настроен идеально, но картинка не изменится.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/kamera-svet-materialy/post-processing-scene.png"
    alt="Сцена после пост-обработки: яркое небо, насыщенные цвета и мягкое свечение"
    width="700"
  >
  <figcaption>
    Пост-обработка меняет итоговый кадр: цвет, контраст и свечение ярких
    участков.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@14.0/manual/integration-with-post-processing.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Post-processing in URP
    </a>
  </figcaption>
</figure>

## Глобальный и локальный Volume

У `Volume` есть режим `Mode`:

- `Global` — действует на всю сцену;
- `Local` — действует внутри коллайдера; форму выбирают — `Box` или `Sphere`.

Локальный Volume удобен для пещеры, подводной зоны или комнаты с другим
настроением. Когда камера входит в коллайдер, эффекты плавно включаются.

Если несколько Volume перекрываются, учитываются `Priority` и `Weight`.
Volume с большим приоритетом переопределяет эффекты с меньшим. `Weight`
задаёт силу влияния от `0` до `1`.

## Bloom и Vignette

**Bloom** добавляет свечение вокруг ярких участков. Основные параметры:

- `Threshold` — с какой яркости начинается свечение;
- `Intensity` — сила эффекта;
- `Scatter` — насколько широко расходится свет;
- `Tint` — оттенок свечения.

Bloom хорошо работает вместе с emission-материалами. Если порог слишком
низкий, свечение появится даже на обычном белом небе и картинка станет
«мыльной».

**Vignette** затемняет края кадра. Параметры `Intensity`, `Smoothness`,
`Color` и `Center` позволяют сделать мягкое затемнение или почти чёрную
рамку. Умеренная виньетка помогает собрать внимание в центре, сильная —
выглядит как дефект.

## Color Adjustments

`Color Adjustments` — базовый инструмент цветокоррекции:

| Параметр | Что делает |
|---|---|
| `Post Exposure` | общая яркость в EV |
| `Contrast` | разница между светлым и тёмным |
| `Color Filter` | оттенок поверх всего кадра |
| `Hue Shift` | сдвиг всех цветов |
| `Saturation` | насыщенность |

Начинайте с малых значений. Пост-обработка должна поддерживать сцену, а не
спасать плохой свет. Если материалы выглядят серыми, сначала проверьте
освещение и `Base Map`, а уже потом крутите `Saturation`.

## Управление из кода

Профиль можно менять в рантайме. Например, усилить Bloom при переходе в
другую зону:

```csharp
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

public class BloomController : MonoBehaviour
{
    [SerializeField] private Volume volume;

    public void SetBloom(float intensity)
    {
        if (volume.profile.TryGet(out Bloom bloom))
        {
            bloom.intensity.Override(intensity);
        }
    }
}
```

`TryGet` возвращает `true`, если эффект есть в профиле. Метод `Override`
включает параметр и задаёт значение. Если эффекта в профиле нет, добавьте
его через **Add Override → Post-processing → Bloom**.

Свойство `volume.profile` может создать экземпляр профиля. Если несколько
объектов должны использовать один общий профиль, применяйте
`volume.sharedProfile` и меняйте ассет осознанно.

## Частые ошибки

- **Забыли включить `Post Processing` у камеры.** Volume есть, эффекта нет.
- **Не назначили `Volume Profile`.** Компонент пуст, настраивать нечего.
- **Поставили низкий `Threshold` у Bloom.** Светится всё подряд.
- **Перекрыли Volume без приоритетов.** Непонятно, какой профиль победил.
- **Ждут одинакового результата в Built-in и URP.** В Built-in другая
  реализация пост-обработки.
- **Крутят пост-обработку вместо света.** Насыщенность не заменяет
  правильные источники и материалы.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где в URP включается пост-обработка для конкретной камеры?",
  "options": [
    {
      "text": "Галочкой `Post Processing` в компоненте Camera",
      "correct": true,
      "explanation": "Без этой галочки Volume не влияет на кадр."
    },
    {
      "text": "В компоненте Light",
      "correct": false,
      "explanation": "Свет не управляет пост-обработкой."
    },
    {
      "text": "В настройках материала",
      "correct": false,
      "explanation": "Материал влияет на поверхность, а не на кадр целиком."
    }
  ],
  "explanation": "Пост-обработка в URP включается на камере и настраивается через Volume."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Volume в URP?",
  "options": [
    {
      "text": "Global Volume действует на всю сцену",
      "correct": true
    },
    {
      "text": "Box Volume требует коллайдер",
      "correct": true
    },
    {
      "text": "При конфликте учитывается Priority",
      "correct": true
    },
    {
      "text": "Пост-обработка не зависит от настроек камеры",
      "correct": false,
      "explanation": "Галочка Post Processing у камеры обязательна."
    }
  ],
  "explanation": "Volume бывает глобальным и локальным, а приоритет решает конфликты между профилями."
}
```

## Куда дальше

- [Свет и тени](theme.html?path=content/unity/kamera-svet-materialy/svet-i-teni.md)
- [Материалы и URP](theme.html?path=content/unity/kamera-svet-materialy/materialy-i-urp.md)
- [Камера, свет и материалы (итог)](theme.html?path=content/unity/kamera-svet-materialy/itog-kamera-svet-materialy.md)
- [Практика: камера и свет](theme.html?path=content/unity/kamera-svet-materialy/praktika-kamera-i-svet.md)
