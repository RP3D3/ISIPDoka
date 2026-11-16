---
title: Trunk-based development
description: Частые маленькие слияния в основную ветку, короткие ветки и feature flags.
keywords: trunk-based development, trunk, feature flags, короткие ветки, CI

---

# Trunk-based development

Trunk-based development — подход, при котором разработчики часто
сливают изменения в основную ветку (`trunk`/`main`). Ветки живут часы
или дни, а не недели.

## Принципы

- маленькие изменения;
- частый merge в main;
- короткие ветки;
- автоматические тесты;
- feature flags для незаконченных функций.

## Пример

```bash
git switch -c feature/small-fix
git commit -m "Fix validation"
git push -u origin feature/small-fix
```

После review и CI ветка сразу сливается.

## Feature flags

Если функция ещё не готова, её можно скрыть за флагом и сливать код
чаще. Это уменьшает конфликты.

## Когда подходит

- зрелая команда;
- хороший CI;
- быстрые релизы;
- готовность к частым мелким PR.

## Частые ошибки

- **Длинные ветки.** Они превращаются в мини-проекты.
- **Нет тестов.** Частые merge без проверок опасны.
- **Флаги забывают удалять.** Код обрастает мёртвыми ветками.
- **Сливать сломанное в main.** CI должен быть обязательным.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое trunk в trunk-based development?",
  "options": [
    {
      "text": "Основная ветка, куда часто сливаются изменения",
      "correct": true,
      "explanation": "Обычно это main."
    },
    {
      "text": "Ветка релиза",
      "correct": false,
      "explanation": "Релизы могут быть отдельно."
    },
    {
      "text": "Локальная ветка разработчика",
      "correct": false,
      "explanation": "Это feature-ветка."
    }
  ],
  "explanation": "Trunk — общая основная линия."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает trunk-based development?",
  "options": [
    {
      "text": "Короткие ветки",
      "correct": true
    },
    {
      "text": "Обязательный CI",
      "correct": true
    },
    {
      "text": "Feature flags",
      "correct": true
    },
    {
      "text": "Ветки на несколько месяцев",
      "correct": false,
      "explanation": "Это противоречит подходу."
    }
  ],
  "explanation": "Частые маленькие изменения требуют автоматизации."
}
```

## Куда дальше

- [Git Flow](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/git-flow.md)
- [Feature branches](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/feature-branches.md)
- [Commit messages](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/commit-messages.md)
