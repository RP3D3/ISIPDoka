---
title: Практика: камера и свет
description: Пошаговая практика: собрать сцену с камерой следования, светом, URP-материалом и лёгкой пост-обработкой.
keywords: Unity практика, камера следования, свет, URP материал, Volume, Bloom, сцена

---

# Практика: камера и свет

Соберём небольшую сцену: персонаж или куб, камера следования, направленный
свет, материал URP и лёгкая пост-обработка. Цель — не идеальная картинка, а
понятная цепочка «камера → свет → материал → Volume».

## Шаг 1. Сцена и камера

1. Создайте новую 3D-сцену.
2. Добавьте на сцену куб или простую модель персонажа.
3. Поставьте камеру так, чтобы объект был виден.
4. Проверьте `Projection = Perspective` и `Field of View = 60`.
5. Установите `Near = 0.1`, `Far = 200`.

Не оставляйте `Far` огромным. Для учебной сцены двухсот единиц более чем
достаточно.

## Шаг 2. Камера следования

Создайте скрипт `FollowCamera.cs` и повесьте его на камеру. В поле `Target`
перетащите объект персонажа.

```csharp
using UnityEngine;

public class FollowCamera : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private Vector3 offset = new Vector3(0f, 4f, -6f);
    [SerializeField] private float followSpeed = 8f;
    [SerializeField] private float lookHeight = 1.5f;

    private void LateUpdate()
    {
        if (target == null)
        {
            return;
        }

        Vector3 desiredPosition = target.position + offset;
        float t = 1f - Mathf.Exp(-followSpeed * Time.deltaTime);
        transform.position = Vector3.Lerp(transform.position, desiredPosition, t);
        transform.LookAt(target.position + Vector3.up * lookHeight);
    }
}
```

Запустите Play и подвигайте персонажа. Камера должна догонять его плавно, без
телепортаций. Если объект дёргается, проверьте, не двигаете ли вы
`Rigidbody` через `transform.position`.

## Шаг 3. Свет и тени

1. Оставьте `Directional Light` как основной источник.
2. Поверните его примерно на `(45, -30, 0)`, чтобы тени читались.
3. Поставьте `Shadow Type = Soft`, если сцена небольшая.
4. Добавьте `Point Light` в тёмный угол и уменьшите `Range`.
5. Для статических объектов включите `Static` и запеките свет.

Не включайте тени всем источникам сразу. Начните с направленного света, затем
добавьте один акцент.

## Шаг 4. Материал и Volume

Создайте материал с шейдером `Universal Render Pipeline/Lit`. Назначьте его
полу или кубу. Настройте `Base Map`, `Metallic` и `Smoothness`:

- дерево или камень: `Metallic = 0`, `Smoothness = 0.3`;
- металл: `Metallic = 0.9`, `Smoothness = 0.7`;
- светящийся акцент: включите `Emission` и задайте цвет.

Затем добавьте на сцену `Volume`:

1. **GameObject → Volume → Global Volume**.
2. Нажмите **New** рядом с `Profile`.
3. Добавьте `Bloom` и `Vignette`.
4. У камеры включите `Post Processing`.
5. Уменьшите `Bloom → Threshold`, пока не начнут светиться только яркие
   участки.

Для свечения материала из кода:

```csharp
using UnityEngine;

public class EmissionSetup : MonoBehaviour
{
    [SerializeField] private Renderer targetRenderer;
    [SerializeField] private Color emissionColor = Color.cyan;

    private void Start()
    {
        Material material = targetRenderer.material;
        material.EnableKeyword("_EMISSION");
        material.SetColor("_EmissionColor", emissionColor * 2f);
    }
}
```

## Проверка результата

Пройдите по чек-листу:

- камера плавно следует за объектом;
- персонаж не выпадает из кадра при движении;
- свет даёт читаемые тени, а не чёрные провалы;
- материалы не розовые и не выглядят одинаково;
- Bloom светится только на ярких участках;
- Vignette не мешает читать сцену;
- в Console нет ошибок и предупреждений.

Сравните кадр с пост-обработкой и без неё. Если разница слишком сильная,
уменьшите `Weight` у Volume или интенсивность эффектов.

## Частые ошибки

- **Камера в `Update`.** Используйте `LateUpdate`.
- **Постоянный `t` в `Lerp`.** Скорость начнёт зависеть от FPS.
- **Материал `Standard` в URP.** Объект станет розовым.
- **Bloom на всей сцене.** Низкий `Threshold` делает картинку мутной.
- **Забыли `Post Processing` у камеры.** Volume не работает.
- **Слишком много реальных теней.** Сцена теряет производительность.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что сделать перед настройкой Bloom?",
  "options": [
    {
      "text": "Настроить свет и материалы",
      "correct": true,
      "explanation": "Bloom подчёркивает яркие участки; сначала нужно получить нормальную экспозицию."
    },
    {
      "text": "Увеличить Far Clipping Plane до максимума",
      "correct": false,
      "explanation": "Это ухудшит точность глубины и не поможет пост-обработке."
    },
    {
      "text": "Отключить камеру",
      "correct": false,
      "explanation": "Без камеры не будет кадра."
    }
  ],
  "explanation": "Пост-обработка — финальный слой; она не заменяет свет и материалы."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить в готовой сцене?",
  "options": [
    {
      "text": "У камеры включена галочка `Post Processing`",
      "correct": true
    },
    {
      "text": "Материалы используют шейдер URP",
      "correct": true
    },
    {
      "text": "Статические объекты отмечены `Static` для запекания",
      "correct": true
    },
    {
      "text": "У всех объектов `Metallic = 1`",
      "correct": false,
      "explanation": "Металлическими должны быть только металлические поверхности."
    }
  ],
  "explanation": "Проверяйте камеру, материалы и запекание; металличность задаётся по смыслу поверхности."
}
```

## Куда дальше

- [Камера](theme.html?path=content/unity/kamera-svet-materialy/kamera.md)
- [Простая камера следования](theme.html?path=content/unity/kamera-svet-materialy/prostaya-kamera-sledovaniya.md)
- [Свет и тени](theme.html?path=content/unity/kamera-svet-materialy/svet-i-teni.md)
- [Материалы и URP](theme.html?path=content/unity/kamera-svet-materialy/materialy-i-urp.md)
- [Пост-обработка](theme.html?path=content/unity/kamera-svet-materialy/post-obrabotka.md)
- [Камера, свет и материалы (итог)](theme.html?path=content/unity/kamera-svet-materialy/itog-kamera-svet-materialy.md)
