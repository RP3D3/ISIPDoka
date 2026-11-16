---
title: TextMeshPro
description: Компоненты TextMeshPro и TextMeshProUGUI, TMP Essentials, шрифтовые ассеты, авторазмер и rich text.
keywords: Unity TextMeshPro, TMP, TextMeshProUGUI, TMP Essentials, Font Asset, авторазмер, rich text, UI текст

---

# TextMeshPro

**TextMeshPro (TMP)** — современный компонент текста в Unity. Он пришёл на
смену старому `Text` из uGUI и даёт более чёткий текст, богатое форматирование
и удобную работу со шрифтами.

В интерфейсе используется компонент `TextMeshProUGUI`, в трёхмерной сцене —
`TextMeshPro`. Оба наследуются от `TMP_Text`, поэтому в коде часто достаточно
хранить ссылку именно на `TMP_Text`.

## Два компонента

| Компонент | Где используется | Как создать |
|---|---|---|
| `TextMeshProUGUI` | UI на Canvas | **GameObject → UI → Text - TextMeshPro** |
| `TextMeshPro` | текст в 3D-сцене | **GameObject → 3D Object → Text - TextMeshPro** |

У UI-версии есть `RectTransform`, она подчиняется Canvas и Canvas Scaler. У
3D-версии обычный `Transform` и `MeshRenderer`: такой текст живёт в мире, его
можно двигать и вращать, а материал настраивается отдельно.

В Inspector UI-компонент может называться **TextMeshPro - Text (UI)** — это всё
тот же `TextMeshProUGUI`.

## TMP Essentials и шрифты

При первом добавлении TMP-объекта Unity предлагает импортировать **TMP
Essential Resources**. Это базовые материалы, шейдеры и шрифтовой ассет по
умолчанию. Если пропустить импорт, текст может выглядеть розовым, не иметь
материала или выдавать ошибки в Console.

Импортировать ресурсы можно вручную:

1. Откройте **Window → TextMeshPro → Import TMP Essential Resources**.
2. Дождитесь импорта папки `TextMesh Pro` в `Assets`.
3. Создайте TMP-объект заново, если старый остался без материала.

Про версии:

- в **Unity 2022.3 LTS** TextMeshPro поставляется отдельным пакетом
  `com.unity.textmeshpro`;
- в **Unity 6** TMP входит в состав пакета `com.unity.ugui` версии 2.x.

Точные номера версий зависят от установленного редактора, поэтому проверяйте
их в **Package Manager**, а не по памяти.

Шрифт в TMP — это не просто TTF-файл, а **Font Asset** (`TMP_FontAsset`).
Он хранит атлас глифов и настройки материала. Новый ассет создают через
**Window → TextMeshPro → Font Asset Creator** или через контекстное меню
шрифта. Если в шрифте нет нужных символов, добавьте их в атлас или настройте
цепочку fallback-шрифтов.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/ui-i-interfeys/tmp-text.png"
    alt="Компонент TextMeshProUGUI в Inspector: текст, шрифт, размер, выравнивание и перенос"
    width="435"
  >
  <figcaption>
    TextMeshProUGUI в Inspector: текст, Font Asset, размер, авторазмер,
    выравнивание и перенос строк.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/TextMeshPro/TMPObjectUIText.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — UI Text GameObjects
    </a>
  </figcaption>
</figure>

## Основные настройки

В Inspector у TMP-текста есть несколько групп:

- **Text Input** — сам текст;
- **Font Asset** — шрифтовой ассет;
- **Font Size** — размер;
- **Auto Size** — автоматический подбор размера;
- **Vertex Color** — цвет текста;
- **Alignment** — выравнивание по горизонтали и вертикали;
- **Wrapping** — перенос строк;
- **Overflow** — что делать, если текст не помещается.

**Auto Size** полезен для заголовков и кнопок с неизвестной длиной текста.
Включайте `enableAutoSizing` и задавайте границы `fontSizeMin` и
`fontSizeMax`, иначе текст может стать нечитаемо мелким.

```csharp
using TMPro;
using UnityEngine;

public class AutoSizeLabel : MonoBehaviour
{
    [SerializeField] private TMP_Text _label;

    private void Awake()
    {
        _label.enableAutoSizing = true;
        _label.fontSizeMin = 18f;
        _label.fontSizeMax = 48f;
    }
}
```

Не стоит включать авторазмер одновременно с `ContentSizeFitter` на том же
объекте без необходимости: размеры начинают зависеть друг от друга, и макет
может «дрожать».

## Текст из кода

Для обновления текста достаточно свойства `text`. Ссылку на компонент лучше
передавать через Inspector.

```csharp
using TMPro;
using UnityEngine;

public class ScoreView : MonoBehaviour
{
    [SerializeField] private TMP_Text _scoreText;

    public void ShowScore(int score)
    {
        _scoreText.text = $"Счёт: {score}";
    }

    public void ShowWarning(string message)
    {
        _scoreText.text = $"<color=#FF5555>{message}</color>";
    }
}
```

Если текст меняется каждый кадр, подумайте о том, чтобы обновлять его реже.
Создание новой строки через интерполяцию каждый кадр даёт мусор для сборщика
мусора и может вызывать подтормаживания.

## Rich text

TMP понимает теги прямо в строке:

```csharp
_scoreText.text = "<b>Босс</b>: <color=#FFCC00>1000 HP</color>";
```

Популярные теги:

- `<b>`, `<i>`, `<u>` — жирный, курсив, подчёркивание;
- `<color=#RRGGBB>` — цвет;
- `<size=120%>` — размер относительно базового;
- `<sprite name="...">` — спрайт из атласа.

Теги не должны пересекаться неправильно. Если тег написан с ошибкой, TMP
покажет его как обычный текст.

## Частые ошибки

- **Не импортированы TMP Essentials.** Текст розовый, без материала или с
  ошибками в Console.
- **В шрифтовом ассете нет нужных символов.** Вместо букв появляются квадраты.
  Проверьте атлас и fallback-шрифты.
- **Смешаны `Text` и `TextMeshPro` без причины.** В проекте появляются два
  разных набора стилей и компонентов.
- **Авторазмер конфликтует с Layout Group.** Текст и контейнер бесконечно
  подстраиваются друг под друга.
- **Опечатка в rich text теге.** Тег отображается как часть строки.
- **Ссылка на `TMP_Text` не назначена.** В рантайме получаете
  `NullReferenceException`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что нужно сделать при первом использовании TextMeshPro в проекте?",
  "options": [
    {
      "text": "Импортировать TMP Essential Resources",
      "correct": true,
      "explanation": "Без базовых ресурсов у TMP-объектов может не быть шрифта и материала."
    },
    {
      "text": "Удалить все компоненты Text",
      "correct": false,
      "explanation": "Старый Text можно оставить, если он где-то используется."
    },
    {
      "text": "Отключить Canvas Scaler",
      "correct": false,
      "explanation": "Canvas Scaler не связан с импортом ресурсов TMP."
    }
  ],
  "explanation": "TMP Essentials — базовые шрифты, материалы и шейдеры для работы TextMeshPro."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про TextMeshPro?",
  "options": [
    {
      "text": "TextMeshProUGUI используется для текста на Canvas",
      "correct": true
    },
    {
      "text": "TMP поддерживает rich text теги",
      "correct": true
    },
    {
      "text": "В Unity 2022.3 TMP всегда входит в com.unity.ugui",
      "correct": false,
      "explanation": "В Unity 2022.3 это отдельный пакет com.unity.textmeshpro."
    },
    {
      "text": "Auto Size ограничивается значениями fontSizeMin и fontSizeMax",
      "correct": true
    }
  ],
  "explanation": "TMP-текст бывает UI и 3D, поддерживает форматирование и настраиваемый авторазмер."
}
```

## Куда дальше

- [Canvas](theme.html?path=content/unity/ui-i-interfeys/canvas.md)
- [Кнопки и события](theme.html?path=content/unity/ui-i-interfeys/knopki-i-sobytiya.md)
- [HUD](theme.html?path=content/unity/ui-i-interfeys/hud.md)
