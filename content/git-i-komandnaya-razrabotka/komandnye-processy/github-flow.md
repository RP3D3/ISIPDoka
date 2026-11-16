---
title: GitHub Flow
description: Простая модель: main всегда готова, задача живёт в короткой ветке и попадает через PR.
keywords: GitHub Flow, workflow, feature branch, pull request, main, CI

---

# GitHub Flow

GitHub Flow — простая модель для команд, которые часто выпускают
изменения. В `main` всегда рабочее состояние, а задачи делаются в
коротких ветках.

## Цикл

1. Создать ветку от `main`.
2. Сделать коммиты.
3. Открыть PR.
4. Пройти review и CI.
5. Слить в `main`.
6. Задеплоить.

```bash
git switch -c feature/login
git push -u origin feature/login
```

## Правила

- `main` защищена;
- ветка живёт недолго;
- PR небольшой;
- CI обязателен;
- после merge можно выпускать.

## Когда подходит

- веб-приложения;
- SaaS;
- небольшие команды;
- частые релизы.

## Частые ошибки

- **Долгоживущие ветки.** Они постоянно конфликтуют.
- **Прямой push в main.** Обходит review.
- **PR без CI.** Ошибки попадают в основную ветку.
- **Смешивание задач в одной ветке.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что является основной веткой в GitHub Flow?",
  "options": [
    {
      "text": "`main`",
      "correct": true,
      "explanation": "Она всегда должна быть рабочей."
    },
    {
      "text": "`develop`",
      "correct": false,
      "explanation": "Это Git Flow."
    },
    {
      "text": "`release`",
      "correct": false,
      "explanation": "Это ветка релиза."
    }
  ],
  "explanation": "GitHub Flow строится вокруг main."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что характерно для GitHub Flow?",
  "options": [
    {
      "text": "Короткие feature-ветки",
      "correct": true
    },
    {
      "text": "Обязательный PR",
      "correct": true
    },
    {
      "text": "CI перед merge",
      "correct": true
    },
    {
      "text": "Долгоживущая ветка develop",
      "correct": false,
      "explanation": "Это признак Git Flow."
    }
  ],
  "explanation": "GitHub Flow — простой и частый цикл."
}
```

## Куда дальше

- [Trunk-based development](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/trunk-based.md)
- [Git Flow](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/git-flow.md)
- [Feature branches](theme.html?path=content/git-i-komandnaya-razrabotka/komandnye-processy/feature-branches.md)
