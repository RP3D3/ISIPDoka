---
title: Coyote time и jump buffer
description: Два простых приёма, которые делают управление в платформере отзывчивым и прощающим.
keywords: coyote time, jump buffer, платформер, jump, game feel, управление, input buffering

---

# Coyote time и jump buffer

В платформерах игрок часто «промахивается» не потому, что плохо играет, а потому
что ввод и физика не совпали на несколько кадров. Coyote time и jump buffer
убирают часть такой несправедливости.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/igrostroenie/_assets/igrovye-patterny-i-algoritmy/coyote-time.svg"
    alt="Схема coyote time и jump buffer"
    width="900"
  >
  <figcaption>
    Coyote time прощает поздний прыжок, jump buffer — ранний.
  </figcaption>
</figure>

## Coyote time

Coyote time — короткое окно после схода с платформы, когда прыжок всё ещё
разрешён.

Без него:

- игрок нажал прыжок на кадр позже;
- персонаж уже не на земле;
- прыжок не сработал;
- игрок чувствует, что игра «не услышала».

С ним:

```text
if not grounded:
    coyoteTimer -= dt
else:
    coyoteTimer = coyoteDuration

if jumpPressed and coyoteTimer > 0:
    jump()
    coyoteTimer = 0
```

Типичное окно — 0.08–0.15 секунды. Слишком большое окно выглядит как прыжок в
воздухе.

## Jump buffer

Jump buffer — короткое окно **до** приземления, когда нажатие прыжка
запоминается.

```text
if jumpPressed:
    jumpBufferTimer = bufferDuration

if grounded and jumpBufferTimer > 0:
    jump()
    jumpBufferTimer = 0
```

Это помогает, когда игрок нажимает прыжок чуть раньше касания земли. Без буфера
нажатие теряется.

## Почему это важно

Оба приёма не меняют правила игры, но меняют **ощущение**:

- управление становится отзывчивее;
- игрок реже винит игру;
- сложность остаётся, но становится честнее;
- платформинг ощущается приятнее.

## Настройка

- Coyote time: 0.08–0.15 с.
- Jump buffer: 0.08–0.15 с.
- Значения зависят от темпа игры.
- Проверяйте на разных частотах кадров.
- Не делайте окна бесконечными.

## Связанные приёмы

- **Variable jump height** — высота зависит от длительности удержания.
- **Input buffering** — запоминание атаки или рывка.
- **Corner correction** — мягкое подталкивание при задевании угла.
- **Landing forgiveness** — прощение позднего приземления.

## Ошибки

- **Coyote time больше, чем нужно.** Персонаж прыгает «из воздуха».
- **Буфер без ограничения.** Прыжок срабатывает неожиданно позже.
- **Окна не тестировали.** На разных мониторах ощущение разное.
- **Путают с физикой.** Это не замена нормальному коллайдеру.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что делает coyote time?",
  "options": [
    {
      "text": "Разрешает прыжок чуть позже схода с платформы",
      "correct": true,
      "explanation": "Это прощает позднее нажатие."
    },
    {
      "text": "Запоминает прыжок до приземления",
      "correct": false,
      "explanation": "Это jump buffer."
    },
    {
      "text": "Увеличивает скорость бега",
      "correct": false,
      "explanation": "Это не связано с прыжком."
    }
  ],
  "explanation": "Coyote time — окно после схода с земли."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про jump buffer?",
  "options": [
    {
      "text": "Запоминает нажатие прыжка на короткое время",
      "correct": true
    },
    {
      "text": "Помогает при раннем нажатии",
      "correct": true
    },
    {
      "text": "Делает управление отзывчивее",
      "correct": true
    },
    {
      "text": "Позволяет прыгать бесконечно",
      "correct": false,
      "explanation": "Окно короткое и не даёт бесконечных прыжков."
    }
  ],
  "explanation": "Jump buffer прощает ранний ввод."
}
```

## Куда дальше

- [Game feel](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/game-feel.md)
- [Управление и камера](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/upravlenie-i-kamera.md)
- [Состояния и конечные автоматы](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/sostoyaniya-i-konechnye-avtomaty.md)
