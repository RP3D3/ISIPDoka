---
title: Камера
description: Компонент Camera в Unity: перспективная и ортографическая проекция, Field of View, near и far clipping, фон и culling mask.
keywords: Unity Camera, камера, perspective, orthographic, Field of View, near clipping, far clipping, culling mask, Clear Flags, Background

---

# Камера

`Camera` — компонент, который превращает сцену в изображение. Всё, что игрок
видит в окне Game, смотрит через камеру. У новой сцены уже есть `Main Camera`,
но её почти всегда настраивают под конкретную игру.

## Что делает Camera

Камера задаёт точку зрения и способ проецирования трёхмерной сцены на плоский
экран. От её настроек зависит не только ракурс, но и то, какие объекты попадут
в кадр и что будет нарисовано на пустом месте.

Основные свойства компонента:

| Свойство | Зачем нужно |
|---|---|
| `Projection` | перспективная или ортографическая проекция |
| `Field of View` | угол обзора перспективной камеры |
| `Clipping Planes` | ближняя и дальняя плоскости отсечения |
| `Background` | что рисовать за объектами |
| `Culling Mask` | какие слои видит камера |
| `Depth` / `Priority` | порядок отрисовки нескольких камер |

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/kamera-svet-materialy/camera-inspector.png"
    alt="Инспектор компонента Camera в Unity: Clear Flags, Background, Culling Mask, Projection, Field of View и Clipping Planes"
    width="649"
  >
  <figcaption>
    Компонент Camera: проекция, угол обзора, плоскости отсечения и маска слоёв.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/6000.0/Documentation/Manual/class-Camera.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — Camera
    </a>
  </figcaption>
</figure>

## Perspective и orthographic

`Projection` определяет, как камера строит изображение.

**Perspective** — привычная проекция с перспективой: дальние объекты меньше
ближних. Угол обзора задаёт `Field of View`. Такую камеру используют в играх от
первого и третьего лица.

**Orthographic** — проекция без перспективы: объекты не уменьшаются с
расстоянием. Размер видимой области задаёт `Orthographic Size` — половина
высоты кадра в мировых единицах. Это стандарт для 2D и изометрических игр.

```csharp
using UnityEngine;

public class CameraSetup : MonoBehaviour
{
    [SerializeField] private Camera sceneCamera;

    private void Start()
    {
        sceneCamera.orthographic = false;
        sceneCamera.fieldOfView = 60f;
        sceneCamera.nearClipPlane = 0.3f;
        sceneCamera.farClipPlane = 1000f;
    }
}
```

Свойство `orthographic` включает и выключает ортографический режим. Для
ортографической камеры вместо `fieldOfView` настраивают `orthographicSize`.

## Плоскости отсечения

`Near` и `Far` — расстояния от камеры, между которыми объекты видны. Всё ближе
`Near` и дальше `Far` не рисуется.

- Слишком маленький `Near` ухудшает точность буфера глубины и может дать
  мерцание поверхностей.
- Слишком большой `Far` ухудшает точность глубины: далёкие объекты начинают
  «спорить» за пиксели.
- Для небольшой сцены часто хватает `Near = 0.1–0.3` и `Far = 100–500`.

Не стоит ставить `Far = 100000` «на всякий случай». Лучше подобрать дальность
под размер уровня и использовать туман или подгрузку объектов.

## Фон и culling mask

`Background` задаёт цвет или скайбокс за объектами. В Built-in Render Pipeline
рядом есть `Clear Flags`: можно оставить скайбокс, залить экран цветом или не
очищать предыдущий кадр. В URP на этом месте находится `Background Type` с
вариантами вроде Skybox и Solid Color.

`Culling Mask` — список слоёв, которые видит камера. Если объект находится на
слое, которого нет в маске, камера его не нарисует, даже если он стоит прямо
перед ней.

```csharp
// Показать камере только слой Ignore Raycast (индекс 2)
sceneCamera.cullingMask = 1 << 2;

// Вернуть все слои
sceneCamera.cullingMask = ~0;
```

Маску удобно менять через `LayerMask` в Inspector, а в коде — через битовые
операции. Частая ошибка — назначить объекту новый слой и забыть добавить его в
маску камеры.

## Несколько камер

В сцене может быть несколько камер. В Built-in порядок задаёт `Depth`, в URP —
`Priority`: камера с большим значением рисуется позже. Так делают интерфейс,
мини-карту или вид из прицела.

Если несколько камер рисуют одно и то же, включите у верхней `Clear Flags =
Depth only` (или соответствующий режим в URP), чтобы она не затирала фон.

## Частые ошибки

- **Ищут `Camera.main` в каждом кадре.** Свойство ищет камеру по тегу
  `MainCamera`; результат лучше закешировать в `Awake` или `Start`.
- **Путают `fieldOfView` и `orthographicSize`.** Это разные параметры для
  разных проекций.
- **Ставят огромный `Far` без необходимости.** Страдает точность глубины.
- **Забывают про `Culling Mask`.** Объект есть в сцене, но камера его не видит.
- **Меняют `Depth` или `Priority`, не понимая порядок.** Две камеры с
  одинаковым значением могут давать непредсказуемый результат.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что задаёт Field of View у перспективной камеры?",
  "options": [
    {
      "text": "Угол обзора камеры",
      "correct": true,
      "explanation": "Чем больше угол, тем шире видимая область и сильнее перспективные искажения."
    },
    {
      "text": "Дальность прорисовки объектов",
      "correct": false,
      "explanation": "За дальность отвечает Far Clipping Plane."
    },
    {
      "text": "Разрешение итогового изображения",
      "correct": false,
      "explanation": "Разрешение задаётся в настройках Game view или Render Texture."
    }
  ],
  "explanation": "Field of View — угол обзора перспективной камеры; для ортографической вместо него используют Orthographic Size."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про компонент Camera?",
  "options": [
    {
      "text": "`Camera.main` ищет камеру с тегом MainCamera",
      "correct": true
    },
    {
      "text": "`Culling Mask` исключает слои из отрисовки",
      "correct": true
    },
    {
      "text": "`Far Clipping Plane` задаёт угол обзора",
      "correct": false,
      "explanation": "Угол обзора задаёт Field of View."
    },
    {
      "text": "Ортографическая камера использует `Orthographic Size`",
      "correct": true
    }
  ],
  "explanation": "Camera управляет проекцией, видимыми слоями и плоскостями отсечения; параметры FOV и Orthographic Size относятся к разным проекциям."
}
```

## Куда дальше

- [Простая камера следования](theme.html?path=content/unity/kamera-svet-materialy/prostaya-kamera-sledovaniya.md)
- [Cinemachine 3](theme.html?path=content/unity/kamera-svet-materialy/cinemachine-3.md)
- [Свет и тени](theme.html?path=content/unity/kamera-svet-materialy/svet-i-teni.md)
- [Камера, свет и материалы (итог)](theme.html?path=content/unity/kamera-svet-materialy/itog-kamera-svet-materialy.md)
