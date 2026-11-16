---
title: Камера, свет и материалы
description: Итог группы: как камера, свет, материалы и пост-обработка складываются в итоговую картинку.
keywords: Unity камера, свет, материалы, URP, пост-обработка, итог, чек-лист сцены

---

# Камера, свет и материалы

Камера, свет, материалы и пост-обработка — четыре слоя одной картинки. Если
один из них настроен неверно, остальные не спасут результат. Этот итог
собирает тему в короткий чек-лист.

## Четыре слоя картинки

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/kamera-svet-materialy/pipeline.svg"
    alt="Схема пути кадра: камера, свет, материал и Volume с пост-обработкой"
    width="900"
  >
  <figcaption>
    Камера выбирает ракурс, свет формирует объём, материал описывает
    поверхность, Volume добавляет финальные эффекты. Авторская схема.
  </figcaption>
</figure>

Порядок работы обычно такой:

1. Поставить камеру и выбрать ракурс.
2. Настроить ключевой и заполняющий свет.
3. Назначить материалы и проверить, что они из URP.
4. Добавить лёгкую пост-обработку и сравнить результат.

Не начинайте с Bloom. Сначала добейтесь нормальной экспозиции и читаемых
материалов, иначе эффекты только подчеркнут ошибки.

## Что на что влияет

| Слой | Основные настройки | Типичный симптом ошибки |
|---|---|---|
| Камера | `Projection`, `FOV`, `Clipping Planes` | не тот ракурс, обрезанная геометрия |
| Свет | тип, `Intensity`, тени, lightmaps | плоская сцена или чёрные провалы |
| Материал | `Base Map`, `Metallic`, `Smoothness` | розовая поверхность, «пластик» |
| Volume | `Bloom`, `Vignette`, `Color Adjustments` | «мыльная» картинка или пересвет |

Если объект розовый — проблема в шейдере. Если сцена серая — скорее всего,
свет. Если всё блестит — проверьте `Metallic` и `Smoothness`. Если картинка
мутная — уменьшите Bloom и проверьте разрешение.

## Чек-лист сцены

- Камера смотрит туда, куда нужно, и не режет ближнюю геометрию.
- `Far Clipping Plane` разумный, а не миллион.
- В сцене есть основной направленный свет.
- Тени включены только там, где они нужны.
- Статические объекты отмечены `Static` и запечены.
- Материалы используют `Universal Render Pipeline/Lit`.
- У камеры включена галочка `Post Processing`.
- Volume имеет профиль и понятный приоритет.

## Мини-скрипт проверки

Такой скрипт полезен на учебной сцене: он выводит в Console основные
параметры и помогает заметить пустые ссылки.

```csharp
using UnityEngine;
using UnityEngine.Rendering;

public class SceneSummary : MonoBehaviour
{
    [SerializeField] private Camera sceneCamera;
    [SerializeField] private Light keyLight;
    [SerializeField] private Volume postVolume;

    private void Start()
    {
        Debug.Log($"Camera: {sceneCamera.name}, FOV {sceneCamera.fieldOfView}");

        if (keyLight != null)
        {
            Debug.Log($"Key light: {keyLight.type}, intensity {keyLight.intensity}");
        }

        string volumeState = postVolume != null
            ? postVolume.weight.ToString("0.00")
            : "нет";

        Debug.Log($"Post volume: {volumeState}");
    }
}
```

Это диагностика, а не замена настройке. Скрипт не должен менять сцену в
`Start`, иначе вы потеряете контроль над тем, что происходит.

## Частые ошибки

- **Настраивать пост-обработку раньше света.** Эффекты не исправят плохую
  экспозицию.
- **Использовать материалы Built-in в URP.** Розовый цвет — первый признак.
- **Забывать про `Static` и lightmaps.** Сцена выглядит плоской при хорошем
  свете.
- **Ставить камеру слишком близко к стене.** `Near Clipping Plane` начинает
  резать геометрию.
- **Копировать настройки из HDRP-уроков.** В URP другой набор эффектов и
  параметров.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что проверить первым, если материалы в сцене стали розовыми?",
  "options": [
    {
      "text": "Шейдер материала: он должен поддерживаться URP",
      "correct": true,
      "explanation": "Розовый цвет — стандартный признак несовместимого шейдера."
    },
    {
      "text": "Интенсивность Bloom",
      "correct": false,
      "explanation": "Bloom не делает материалы розовыми."
    },
    {
      "text": "Far Clipping Plane камеры",
      "correct": false,
      "explanation": "Дальность камеры влияет на видимость объектов, а не на цвет шейдера."
    }
  ],
  "explanation": "В URP используйте URP Lit или другой совместимый шейдер; Standard из Built-in не подойдёт."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что входит в базовую настройку картинки?",
  "options": [
    {
      "text": "Ракурс и параметры камеры",
      "correct": true
    },
    {
      "text": "Типы и интенсивность источников света",
      "correct": true
    },
    {
      "text": "Материалы с подходящим шейдером",
      "correct": true
    },
    {
      "text": "Только пост-обработка",
      "correct": false,
      "explanation": "Пост-обработка — финальный слой, она не заменяет камеру, свет и материалы."
    }
  ],
  "explanation": "Картинка складывается из камеры, света, материалов и только потом из пост-обработки."
}
```

## Куда дальше

- [Камера](theme.html?path=content/unity/kamera-svet-materialy/kamera.md)
- [Свет и тени](theme.html?path=content/unity/kamera-svet-materialy/svet-i-teni.md)
- [Материалы и URP](theme.html?path=content/unity/kamera-svet-materialy/materialy-i-urp.md)
- [Пост-обработка](theme.html?path=content/unity/kamera-svet-materialy/post-obrabotka.md)
- [Практика: камера и свет](theme.html?path=content/unity/kamera-svet-materialy/praktika-kamera-i-svet.md)
