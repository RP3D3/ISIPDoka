---
title: Сборка, отладка и оптимизация
description: Итог группы: Build Profiles, Player Settings, логи, Profiler и оптимизация.
keywords: Unity итог, сборка, Build Profiles, Player Settings, отладка, Profiler, оптимизация

---

# Сборка, отладка и оптимизация

Мы прошли путь от кнопки Build до профилирования и уменьшения размера билда.
Теперь проект можно не только запустить в редакторе, но и собрать.

## Что теперь должно быть понятно

- В Unity 2022.3 сборка — **Build Settings**, в Unity 6 — **Build Profiles**.
- Сцены должны быть в списке сборки.
- **Player Settings** задают имя, иконку, разрешение и Scripting Backend.
- **Development Build** включает логи и отладку.
- **Profiler** показывает CPU, GPU, память и другие системы.
- **Frame Debugger** помогает смотреть вызовы отрисовки.
- Оптимизация начинается с измерений, а не с догадок.
- Размер билда уменьшают текстуры, сжатие, stripping и IL2CPP.

## Мини-таблица

| Вопрос | Ответ |
|---|---|
| Где собрать игру в Unity 6? | File → Build Profiles |
| Где собрать в 2022.3? | File → Build Settings |
| Где имя продукта? | Player Settings |
| Как включить логи в билде? | Development Build |
| Где искать Player.log? | `%userprofile%\AppData\LocalLow\...` |
| Чем измерять FPS? | Profiler |
| Где смотреть draw calls? | Profiler / Frame Debugger |
| Как уменьшить размер? | Сжатие, stripping, IL2CPP |

## Чек-лист

- [ ] Я могу собрать Windows-билд.
- [ ] Я добавляю сцены в список сборки.
- [ ] Я настроил Product Name и иконку.
- [ ] Я знаю, где искать Player.log.
- [ ] Я умею открывать Profiler и находить пики.
- [ ] Я понимаю, что такое draw call и GC.
- [ ] Я не оптимизирую без измерений.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где в Unity 6 собирать игру?",
  "options": [
    {
      "text": "File → Build Profiles",
      "correct": true,
      "explanation": "В Unity 6 Build Settings заменили на Build Profiles."
    },
    {
      "text": "Window → Console",
      "correct": false,
      "explanation": "Console — для логов."
    },
    {
      "text": "Edit → Project Settings → Tags",
      "correct": false,
      "explanation": "Теги не связаны со сборкой."
    }
  ],
  "explanation": "Unity 6 использует Build Profiles."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что верно про отладку и оптимизацию?",
  "options": [
    {
      "text": "Development Build включает логи",
      "correct": true
    },
    {
      "text": "Profiler показывает нагрузку систем",
      "correct": true
    },
    {
      "text": "GC-пики могут вызывать фризы",
      "correct": true
    },
    {
      "text": "Оптимизировать нужно без измерений",
      "correct": false,
      "explanation": "Сначала Profiler, потом изменения."
    }
  ],
  "explanation": "Сборка, логи и Profiler — база релиза."
}
```

## Куда дальше

- [Практика: собрать билд](theme.html?path=content/unity/sborka-otladka-optimizaciya/praktika-sobrat-bild.md)
- [Build Settings и Build Profiles](theme.html?path=content/unity/sborka-otladka-optimizaciya/build-settings-i-profiles.md)
- [Профилирование](theme.html?path=content/unity/sborka-otladka-optimizaciya/profilirovanie.md)
