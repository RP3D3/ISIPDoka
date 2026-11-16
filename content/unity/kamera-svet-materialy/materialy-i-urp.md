---
title: Материалы и URP
description: Материалы в Universal Render Pipeline: URP Lit, Base Map, Metallic, Smoothness, Emission и типичные ошибки.
keywords: Unity URP, материал, URP Lit, Base Map, albedo, Metallic, Smoothness, Emission, шейдер, URP 17

---

# Материалы и URP

Материал описывает, как поверхность выглядит и реагирует на свет. В Unity
материал — это отдельный ассет, который ссылается на шейдер и хранит его
параметры: текстуры, цвет, металличность, гладкость и свечение.

## Материал и шейдер

Шейдер — программа, которая считает цвет пикселя. Материал — набор значений
для этой программы. Один шейдер могут использовать сотни материалов, но у
каждого будут свои текстуры и параметры.

В URP для обычных поверхностей используют шейдер
`Universal Render Pipeline/Lit`. Если назначить материал со шейдером
`Standard` из Built-in Render Pipeline, в URP он станет розовым: шейдер не
поддерживается пайплайном.

<figure class="md-figure md-figure--center md-figure--medium">
  <img
    src="content/unity/_assets/kamera-svet-materialy/urp-lit-material.png"
    alt="Инспектор материала с шейдером Universal Render Pipeline/Lit: Base Map, Metallic, Smoothness и Emission"
    width="560"
  >
  <figcaption>
    URP Lit: Base Map, Metallic, Smoothness, Normal Map и Emission в одном
    материале.
    <a
      class="md-figure-source"
      href="https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@14.0/manual/lit-shader.html"
      target="_blank"
      rel="noopener"
    >
      Источник: Unity Documentation — URP Lit shader
    </a>
  </figcaption>
</figure>

## URP Lit: основные свойства

| Свойство | Что задаёт |
|---|---|
| `Base Map` | цвет и основная текстура (albedo) |
| `Metallic` | насколько поверхность металлическая |
| `Smoothness` | размер и яркость бликов |
| `Normal Map` | мелкие неровности без геометрии |
| `Emission` | собственное свечение материала |
| `Surface Type` | непрозрачный или прозрачный материал |

`Base Map` — основной цвет поверхности (albedo). Отражения зависят от
`Metallic` и `Smoothness`, а не от самой текстуры. Для дерева, ткани и
камня металличность обычно около `0`, а гладкость — `0.2–0.5`. Для металла
`Metallic` приближают к `1`, а `Smoothness` подбирают по полировке.

Не делайте все поверхности металлическими: металл без правильного окружения
выглядит тёмным. Начните с неметаллических материалов и добавьте металл
точечно.

## Создание и назначение

Материал создают через **Assets → Create → Material** или правой кнопкой в
окне Project. Затем его перетаскивают на `Mesh Renderer` объекта или в поле
`Materials` компонента `Renderer`.

```csharp
using UnityEngine;

public class MaterialTint : MonoBehaviour
{
    [SerializeField] private Color tint = Color.red;

    private void Start()
    {
        Renderer targetRenderer = GetComponent<Renderer>();
        Material material = targetRenderer.material;
        material.SetColor("_BaseColor", tint);
    }
}
```

Свойство `renderer.material` создаёт **копию** материала для этого объекта.
Это удобно, если нужно покрасить один экземпляр, но каждая копия — отдельный
материал. Если цвет должен быть общим для всех объектов, используйте
`sharedMaterial` и меняйте ассет осознанно.

В URP основной цвет материала называется `_BaseColor`, а текстура —
`_BaseMap`. В Built-in Standard те же роли выполняют `_Color` и `_MainTex`.

## Emission

Emission — собственное свечение. Оно не освещает соседние объекты само по
себе, но материал становится ярче и может попасть в Bloom.

Включите галочку `Emission` в материале и задайте цвет. Из кода это делают
так:

```csharp
private void EnableEmission(Renderer targetRenderer)
{
    Material material = targetRenderer.material;
    material.EnableKeyword("_EMISSION");
    material.SetColor("_EmissionColor", new Color(0.2f, 0.8f, 1f) * 2f);
}
```

Если свечение должно влиять на запечённое освещение, дополнительно настройте
`globalIlluminationFlags`. Для большинства учебных сцен достаточно обычного
emission и Bloom.

## URP 14 и URP 17

В Unity 2022.3 LTS используется URP 14.x, в Unity 6 — URP 17.x. Набор
свойств URP Lit близок, но интерфейс и некоторые возможности отличаются.
Если урок говорит «в URP 17 появилось...», проверьте, что у вас именно та
версия пакета.

Посмотреть версию можно в **Package Manager → Universal RP**. Версия пакета
не то же самое, что версия Unity.

## Частые ошибки

- **Оставили шейдер `Standard` в URP.** Материал становится розовым.
- **Меняют `_Color` вместо `_BaseColor`.** В URP свойство называется иначе.
- **Бесконечно вызывают `renderer.material`.** Первое обращение создаёт копию;
  кешируйте ссылку, если меняете материал часто.
- **Ставят `Metallic = 1` всему.** Без отражений металл выглядит чёрным.
- **Включают Emission только цветом.** Нужно ещё включить ключевое слово
  `_EMISSION`.
- **Импортируют normal map как обычную текстуру.** В настройках импорта
  выберите `Normal map`.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой шейдер выбрать для обычного объекта в URP?",
  "options": [
    {
      "text": "`Universal Render Pipeline/Lit`",
      "correct": true,
      "explanation": "Это основной PBR-шейдер URP для непрозрачных поверхностей."
    },
    {
      "text": "`Standard`",
      "correct": false,
      "explanation": "`Standard` относится к Built-in Render Pipeline и в URP станет розовым."
    },
    {
      "text": "`Universal Render Pipeline/Unlit`",
      "correct": false,
      "explanation": "Unlit не реагирует на свет; для обычной поверхности он не подходит."
    }
  ],
  "explanation": "В URP базовый материал — URP Lit; он поддерживает Base Map, Metallic, Smoothness и Emission."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про материал URP Lit?",
  "options": [
    {
      "text": "`Base Map` задаёт основной цвет и текстуру",
      "correct": true
    },
    {
      "text": "`Metallic` и `Smoothness` управляют отражениями",
      "correct": true
    },
    {
      "text": "Для Emission нужно включить соответствующее свойство",
      "correct": true
    },
    {
      "text": "Основной цвет в URP задаётся свойством `_Color`",
      "correct": false,
      "explanation": "В URP используется `_BaseColor`, а `_Color` — свойство Built-in Standard."
    }
  ],
  "explanation": "URP Lit хранит albedo в Base Map и `_BaseColor`, а отражения — в Metallic и Smoothness."
}
```

## Куда дальше

- [Свет и тени](theme.html?path=content/unity/kamera-svet-materialy/svet-i-teni.md)
- [Пост-обработка](theme.html?path=content/unity/kamera-svet-materialy/post-obrabotka.md)
- [Камера, свет и материалы (итог)](theme.html?path=content/unity/kamera-svet-materialy/itog-kamera-svet-materialy.md)
- [Практика: камера и свет](theme.html?path=content/unity/kamera-svet-materialy/praktika-kamera-i-svet.md)
