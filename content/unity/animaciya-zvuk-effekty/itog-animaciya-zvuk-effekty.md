---
title: Анимация, звук и эффекты
description: Итог группы: Animator, клипы, события, AudioSource, AudioMixer и Particle System.
keywords: Unity итог, Animator, Animation Clip, Animation Event, AudioSource, AudioMixer, Particle System

---

# Анимация, звук и эффекты

Мы добавили в сцену движение, звук и визуальные эффекты. Теперь объект может
реагировать на события не только кодом, но и анимацией, аудио и частицами.

## Что теперь должно быть понятно

- **Animator** проигрывает **Animator Controller**.
- Controller состоит из состояний, переходов и параметров.
- **Animation Clip** хранит ключевые кадры и кривые.
- **Animation Event** вызывает метод в нужный момент клипа.
- **AudioSource** играет клип, **AudioListener** слушает.
- **AudioMixer** управляет группами и snapshots.
- **Particle System** состоит из модулей emission, shape, lifetime, color и
  renderer.
- Розовые частицы обычно означают неподходящий материал под рендер-пайплайн.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Где состояния и переходы? | Animator Controller |
| Как задать скорость в коде? | `Animator.SetFloat` |
| Как запустить одноразовый переход? | `SetTrigger` |
| Где loop клипа? | Inspector Animation Clip |
| Как вызвать метод из клипа? | Animation Event |
| Как проиграть короткий звук? | `AudioSource.PlayOneShot` |
| Где группы звука? | AudioMixer |
| Как задать количество частиц? | Emission |
| Где форма источника частиц? | Shape |

## Чек-лист

- [ ] Я могу создать Animator Controller и состояния.
- [ ] Я умею менять параметры Animator из кода.
- [ ] Я понимаю loop и root motion.
- [ ] Я могу добавить Animation Event.
- [ ] Я настроил AudioSource и AudioListener.
- [ ] Я умею менять громкость через AudioMixer.
- [ ] Я могу создать простой Particle System.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что вызывает Animation Event?",
  "options": [
    {
      "text": "Метод на объекте с Animator",
      "correct": true,
      "explanation": "Событие вызывает функцию в нужный момент клипа."
    },
    {
      "text": "Только `Update`",
      "correct": false,
      "explanation": "Событие привязано к таймлайну клипа."
    },
    {
      "text": "Только `Rigidbody`",
      "correct": false,
      "explanation": "Физика не вызывает события анимации."
    }
  ],
  "explanation": "Animation Event синхронизирует код с анимацией."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про звук и эффекты?",
  "options": [
    {
      "text": "`AudioSource` играет клип",
      "correct": true
    },
    {
      "text": "`AudioMixer` управляет группами",
      "correct": true
    },
    {
      "text": "Particle System состоит из модулей",
      "correct": true
    },
    {
      "text": "`AudioListener` нужен на каждом AudioSource",
      "correct": false,
      "explanation": "Обычно достаточно одного слушателя на камере."
    }
  ],
  "explanation": "Звук и эффекты настраиваются отдельными системами."
}
```

## Куда дальше

- [Практика: оживить](theme.html?path=content/unity/animaciya-zvuk-effekty/praktika-ozhivit.md)
- [Animator](theme.html?path=content/unity/animaciya-zvuk-effekty/animator.md)
- [AudioSource](theme.html?path=content/unity/animaciya-zvuk-effekty/audiosource.md)
