---
title: Cinemachine 3
description: Cinemachine 3.x в Unity 2022.3 и Unity 6: CinemachineCamera, CinemachineBrain, CinemachineFollow и CinemachineOrbitalFollow.
keywords: Unity Cinemachine 3, CinemachineCamera, CinemachineBrain, CinemachineFollow, CinemachineOrbitalFollow, камера, Unity 6

---

# Cinemachine 3

Cinemachine — официальный пакет Unity для камер. Он берёт на себя плавное
следование, орбитальное вращение, переключение между ракурсами и смешивание
кадров. В третьей версии переименовали компоненты, поэтому старые уроки по
Cinemachine 2.x могут не собираться.

## Что нового в Cinemachine 3

Главные отличия третьей версии:

- `CinemachineVirtualCamera` переименована в `CinemachineCamera`;
- `CinemachineTransposer` заменён на `CinemachineFollow`;
- `CinemachineOrbitalTransposer` заменён на `CinemachineOrbitalFollow`;
- компоненты позиционирования и вращения стали отдельными и явно
  добавляются к `CinemachineCamera`;
- пространство имён — `Unity.Cinemachine`.

Cinemachine 3.x поддерживает и Unity 2022.3 LTS, и Unity 6. Версия пакета
выбирается в Package Manager; для Unity 6 обычно доступна более новая 3.x.

## Установка и первые объекты

1. Откройте **Window → Package Manager**.
2. Нажмите **+ → Add package by name**.
3. Введите `com.unity.cinemachine` и установите версию 3.x.
4. На Main Camera добавьте компонент `CinemachineBrain`.
5. Создайте объект с компонентом `CinemachineCamera`.

`CinemachineBrain` — «мозг» на камере. Он выбирает активную
`CinemachineCamera` и смешивает кадры при переключении. Без него
`CinemachineCamera` останется просто объектом с настройками и ни на что не
влияет.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/unity/_assets/kamera-svet-materialy/cinemachine.svg"
    alt="Схема Cinemachine 3: две CinemachineCamera с приоритетами 10 и 20, CinemachineBrain на Main Camera"
    width="900"
  >
  <figcaption>
    Brain на камере выбирает активную CinemachineCamera по приоритету и
    смешивает переходы. Авторская схема.
  </figcaption>
</figure>

## Follow и Orbital Follow

У `CinemachineCamera` есть поля `Follow` и `Look At`. В `Follow` кладут
Transform персонажа, в `Look At` — точку, на которую нужно смотреть.

Дальше настройки поведения задаются компонентами на том же объекте:

| Компонент | Что делает |
|---|---|
| `CinemachineFollow` | держит заданный `Follow Offset` за целью |
| `CinemachineOrbitalFollow` | вращает камеру вокруг цели по орбите |
| `CinemachineRotationComposer` | плавно наводит камеру на `Look At` |

`CinemachineFollow` удобен для камеры от третьего лица с фиксированным
смещением. `CinemachineOrbitalFollow` даёт орбитальное вращение вокруг персонажа:
обычно его ставят на отдельную камеру и включают при прицеливании или
осмотре. Сам компонент не читает мышь — ввод подают через
`CinemachineInputAxisController` или свой скрипт.

Не путайте `Follow Offset` с мировым смещением: это локальное смещение
относительно ориентации цели.

## Приоритеты и переключение

У каждой `CinemachineCamera` есть `Priority`. Brain выбирает камеру с
наибольшим приоритетом. Если приоритеты равны, выбор может быть
непредсказуемым.

Стандартный приём: у игровой камеры приоритет `10`, у камеры прицела — `20`.
При включении прицела вторая камера становится активной, а Brain плавно
смешивает кадры. Когда прицел выключается, приоритет возвращается к `10`.

```csharp
using Unity.Cinemachine;
using UnityEngine;

public class CameraPrioritySwitch : MonoBehaviour
{
    [SerializeField] private CinemachineCamera gameplayCamera;
    [SerializeField] private CinemachineCamera aimCamera;

    public void EnableAimCamera()
    {
        gameplayCamera.Priority = 0;
        aimCamera.Priority = 20;
    }

    public void EnableGameplayCamera()
    {
        aimCamera.Priority = 0;
        gameplayCamera.Priority = 10;
    }
}
```

Приоритет — это `int`. Менять его можно в любой момент; Brain сам заметит
изменение и начнёт переход.

## Камера и Rigidbody

Если цель — объект с `Rigidbody`, включите у него `Interpolate`. Cinemachine
читает Transform в кадре, и без интерполяции движение может выглядеть рваным.

Для физических игр также проверьте, что камера не двигает цель через
`Transform`, а только читает её позицию. Cinemachine не заменяет контроллер
движения.

## Частые ошибки

- **Смешивают Cinemachine 2.x и 3.x.** В старых уроках другие имена
  компонентов и пространства имён.
- **Забывают добавить `CinemachineBrain`.** Без Brain камеры не переключаются.
- **Ставят одинаковый приоритет.** Активная камера выбирается нестабильно.
- **Настраивают `CinemachineCamera` как обычную `Camera`.** Это разные
  компоненты: `CinemachineCamera` задаёт поведение, а кадр выводит настоящая
  `Camera` с `CinemachineBrain`.
- **Меняют `Follow Offset` в мировых координатах.** Смещение локальное.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Какой компонент ставится на Main Camera, чтобы Cinemachine управляла кадром?",
  "options": [
    {
      "text": "`CinemachineBrain`",
      "correct": true,
      "explanation": "Brain выбирает активную CinemachineCamera и смешивает кадры."
    },
    {
      "text": "`CinemachineCamera`",
      "correct": false,
      "explanation": "Это отдельный объект с настройками поведения, а не компонент на Main Camera."
    },
    {
      "text": "`CinemachineFollow`",
      "correct": false,
      "explanation": "Это компонент позиционирования на CinemachineCamera."
    }
  ],
  "explanation": "На настоящей камере живёт Brain, а CinemachineCamera задают ракурсы и поведение."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про Cinemachine 3?",
  "options": [
    {
      "text": "`CinemachineCamera` заменяет `CinemachineVirtualCamera` из 2.x",
      "correct": true
    },
    {
      "text": "`CinemachineBrain` ставится на камеру",
      "correct": true
    },
    {
      "text": "`CinemachineFollow` и `CinemachineOrbitalFollow` — компоненты позиционирования",
      "correct": true
    },
    {
      "text": "API Cinemachine 2.x и 3.x можно свободно смешивать",
      "correct": false,
      "explanation": "Имена компонентов и пространства имён изменились."
    }
  ],
  "explanation": "Cinemachine 3 переименовал ключевые компоненты; старые уроки нужно адаптировать."
}
```

## Куда дальше

- [Камера](theme.html?path=content/unity/kamera-svet-materialy/kamera.md)
- [Простая камера следования](theme.html?path=content/unity/kamera-svet-materialy/prostaya-kamera-sledovaniya.md)
- [Свет и тени](theme.html?path=content/unity/kamera-svet-materialy/svet-i-teni.md)
- [Практика: камера и свет](theme.html?path=content/unity/kamera-svet-materialy/praktika-kamera-i-svet.md)
