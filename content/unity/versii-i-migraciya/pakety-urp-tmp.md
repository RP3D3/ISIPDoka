---
title: Пакеты, URP и TMP
description: Миграция пакетов: URP 14→17, TextMeshPro, Cinemachine 3 и manifest.json.
keywords: Unity миграция пакетов, URP 14, URP 17, TextMeshPro, uGUI 2, Cinemachine 3, manifest.json

---

# Пакеты, URP и TMP

При переходе на Unity 6 обновляются не только API, но и пакеты. Важно не
смешивать версии и проверять совместимость.

## Package Manager

Пакеты проекта перечислены в `Packages/manifest.json`. Не редактируйте его
вручную без необходимости: используйте **Package Manager**.

Проверьте:

- `com.unity.inputsystem`;
- `com.unity.render-pipelines.universal`;
- `com.unity.ugui`;
- `com.unity.textmeshpro` (в 2022.3);
- `com.unity.cinemachine`.

## URP

| Unity 2022.3 | Unity 6 |
|---|---|
| URP 14.x | URP 17.x |
| URP Asset | URP Asset |
| Volume | Volume |

При обновлении:

1. Обновите пакет URP.
2. Проверьте URP Asset.
3. Проверьте материалы: Lit/Unlit.
4. Проверьте Volume и пост-обработку.
5. Пересоздайте материалы, если шейдер несовместим.

Если материалы стали розовыми, значит шейдер не поддерживается текущим
рендер-пайплайном.

## TextMeshPro

- **Unity 2022.3** — TMP отдельный пакет `com.unity.textmeshpro`.
- **Unity 6** — TMP входит в `com.unity.ugui` 2.x.

При миграции:

1. Проверьте TMP Essentials.
2. Проверьте шрифты и атласы.
3. Пересоздайте TMP Asset, если он повреждён.
4. Проверьте ссылки на TMP-компоненты.

## Cinemachine

Cinemachine 3.x поддерживает и Unity 2022.3, и Unity 6. Не смешивайте
Cinemachine 2.x и 3.x в одном проекте: компоненты и namespace отличаются.

## Проверка рендер-пайплайна

```csharp
using UnityEngine;
using UnityEngine.Rendering;

public class PipelineInfo : MonoBehaviour
{
    private void Start()
    {
        Debug.Log(GraphicsSettings.currentRenderPipeline);
    }
}
```

Если вернулся `null`, используется Built-in. Если URP Asset — URP.

## Частые ошибки

- **Обновили Unity, но не пакеты.** Материалы и TMP могут сломаться.
- **Смешали URP и Built-in материалы.** Розовые объекты.
- **Забыли TMP Essentials.** Текст не отображается.
- **Cinemachine 2.x на Unity 6.** Лучше перейти на 3.x.
- **Правят `manifest.json` вручную.** Легко сломать зависимости.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какая версия URP в Unity 6?",
  "options": [
    {
      "text": "17.x",
      "correct": true,
      "explanation": "URP 17 соответствует Unity 6."
    },
    {
      "text": "14.x",
      "correct": false,
      "explanation": "Это URP для 2022.3."
    },
    {
      "text": "2.x",
      "correct": false,
      "explanation": "Это не URP."
    }
  ],
  "explanation": "В Unity 6 используется URP 17.x."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить при миграции пакетов?",
  "options": [
    {
      "text": "URP Asset и материалы",
      "correct": true
    },
    {
      "text": "TMP Essentials и шрифты",
      "correct": true
    },
    {
      "text": "Cinemachine 3.x",
      "correct": true
    },
    {
      "text": "Удалить `Packages/manifest.json`",
      "correct": false,
      "explanation": "Это список пакетов проекта."
    }
  ],
  "explanation": "Пакеты, URP, TMP и Cinemachine проверяют отдельно."
}
```

## Куда дальше

- [Сборка и Build Profiles](theme.html?path=content/unity/versii-i-migraciya/build-migraciya.md)
- [Версии и миграция: итог](theme.html?path=content/unity/versii-i-migraciya/itog-versii-i-migraciya.md)
- [Матрица API 2022.3 и Unity 6](theme.html?path=content/unity/versii-i-migraciya/matrica-api.md)
