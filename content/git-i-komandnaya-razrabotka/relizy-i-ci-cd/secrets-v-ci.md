---
title: Secrets в CI
description: Как хранить токены для pipeline и не выводить их в логи.
keywords: secrets, CI, GitHub Actions secrets, environment secrets, OIDC, безопасность

---

# Secrets в CI

Pipeline часто нужен доступ к registry, серверу или API. Эти данные
хранятся в secrets, а не в YAML.

## Где хранить

- repository secrets;
- environment secrets;
- organization secrets;
- внешний secret manager.

## Использование

В GitHub Actions секрет подставляется через контекст:

```yaml
env:
  API_TOKEN: ${{ secrets.API_TOKEN }}
```

Но не выводите его в лог.

## Права

Давайте токену минимальные права. Для деплоя в облако лучше OIDC, чем
долгоживущий ключ.

## Fork PR

Секреты обычно не доступны PR из форков. Это защита от кражи. Если
нужны проверки с секретами, используйте отдельный безопасный workflow.

## Частые ошибки

- **`echo $TOKEN` в логах.**
- **Секрет в YAML.**
- **Полные права токена.**
- **Долгоживущие ключи без ротации.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Где хранить токен для CI?",
  "options": [
    {
      "text": "В secrets CI",
      "correct": true,
      "explanation": "Он не должен быть в YAML."
    },
    {
      "text": "В README",
      "correct": false,
      "explanation": "Это публичная утечка."
    },
    {
      "text": "В commit message",
      "correct": false,
      "explanation": "История сохранит секрет."
    }
  ],
  "explanation": "Secrets CI скрывают значения от кода."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает защитить секреты в CI?",
  "options": [
    {
      "text": "Минимальные права токена",
      "correct": true
    },
    {
      "text": "Не выводить секреты в логи",
      "correct": true
    },
    {
      "text": "Ротация ключей",
      "correct": true
    },
    {
      "text": "Хранить токен в YAML",
      "correct": false,
      "explanation": "YAML попадает в репозиторий."
    }
  ],
  "explanation": "Секреты должны быть скрытыми и ограниченными."
}
```

## Куда дальше

- [Релизы и CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/relizy-i-ci-cd.md)
- [Практика: CI и релиз](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/praktika-ci-i-reliz.md)
- [Pipeline](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/pipeline.md)
