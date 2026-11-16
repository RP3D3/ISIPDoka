---
title: Pull request
description: Как предложить изменения, написать понятное описание и пройти review.
keywords: pull request, PR, merge request, review, GitHub, GitLab

---

# Pull request

Pull request (PR) — предложение влить изменения из одной ветки в другую.
В GitLab он называется merge request.

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/git-i-komandnaya-razrabotka/_assets/udalyonnaya-rabota-i-code-review/pr-flow.svg"
    alt="Путь pull request от ветки до merge"
    width="900"
  >
  <figcaption>
    PR — это обсуждение изменений, а не просто кнопка merge.
  </figcaption>
</figure>

## Как создать

1. Создайте ветку под задачу.
2. Сделайте коммиты.
3. Отправьте ветку в remote.
4. Откройте PR в нужную базовую ветку.
5. Заполните описание.
6. Дождитесь review и зелёного CI.

```bash
git switch -c feature/login
git push -u origin feature/login
```

## Что должно быть в описании

- что изменено;
- зачем;
- как проверить;
- связанные задачи;
- скриншоты или логи, если нужно.

## Размер PR

Маленький PR легче review. Если изменений много, разбейте на несколько
логических PR.

## Частые ошибки

- **PR без описания.** Reviewer не понимает цель.
- **Огромный PR на 50 файлов.**
- **Merge без review и CI.**
- **Не та базовая ветка.**
- **Смешивание нескольких задач.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что такое pull request?",
  "options": [
    {
      "text": "Предложение влить изменения из одной ветки в другую",
      "correct": true,
      "explanation": "Он проходит review и проверки."
    },
    {
      "text": "Команда удаления ветки",
      "correct": false,
      "explanation": "Это branch -d."
    },
    {
      "text": "Тип коммита",
      "correct": false,
      "explanation": "Коммит — единица истории."
    }
  ],
  "explanation": "PR — это процесс обсуждения и слияния."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что делает PR лучше?",
  "options": [
    {
      "text": "Понятное описание",
      "correct": true
    },
    {
      "text": "Небольшой размер",
      "correct": true
    },
    {
      "text": "Связь с задачей",
      "correct": true
    },
    {
      "text": "Отсутствие тестов и проверок",
      "correct": false,
      "explanation": "CI и тесты помогают review."
    }
  ],
  "explanation": "Хороший PR уважает время reviewer."
}
```

## Куда дальше

- [Code review](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/code-review.md)
- [Защита веток](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/zashchita-vetok.md)
- [Практика: PR в команде](theme.html?path=content/git-i-komandnaya-razrabotka/udalyonnaya-rabota-i-code-review/praktika-pr-v-komande.md)
