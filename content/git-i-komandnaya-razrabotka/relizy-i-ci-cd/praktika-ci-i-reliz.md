---
title: Практика: CI и релиз
description: Настройте простой CI, создайте тег и опишите релиз.
keywords: практика CI, релиз, GitHub Actions, тег, SemVer, changelog

---

# Практика: CI и релиз

Сделайте минимальный pipeline и выпустите учебный релиз.

## 1. Workflow

Создайте `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Run tests here"
```

## 2. Проверка

Сделайте PR и убедитесь, что workflow запустился.

## 3. Версия

Выберите версию по SemVer, например `1.0.0`.

## 4. Changelog

Добавьте раздел:

```markdown
## [1.0.0] - 2026-11-16

### Added
- Первый учебный релиз.
```

## 5. Тег

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

## 6. Проверка

- [ ] CI запускается на PR.
- [ ] Тег указывает на нужный коммит.
- [ ] Changelog обновлён.
- [ ] В secrets нет лишних прав.
- [ ] Есть план отката.

## Частые ошибки

- **Тег на старом коммите.**
- **Забыть push тега.**
- **Секреты в YAML.**
- **Нет описания релиза.**

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Как отправить тег в remote?",
  "options": [
    {
      "text": "`git push origin v1.0.0`",
      "correct": true,
      "explanation": "Тег нужно пушить отдельно."
    },
    {
      "text": "`git commit`",
      "correct": false,
      "explanation": "Коммит не отправляет тег."
    },
    {
      "text": "`git clean`",
      "correct": false,
      "explanation": "Он удаляет файлы."
    }
  ],
  "explanation": "Теги отправляются явно."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что проверить перед релизом?",
  "options": [
    {
      "text": "CI зелёный",
      "correct": true
    },
    {
      "text": "Версия и тег",
      "correct": true
    },
    {
      "text": "Changelog",
      "correct": true
    },
    {
      "text": "Что секреты попали в лог",
      "correct": false,
      "explanation": "Это нужно исключить."
    }
  ],
  "explanation": "Релиз требует проверки и описания."
}
```

## Куда дальше

- [Релизы и CI/CD](theme.html?path=content/git-i-komandnaya-razrabotka/relizy-i-ci-cd/relizy-i-ci-cd.md)
- [Расследование и восстановление](theme.html?path=content/git-i-komandnaya-razrabotka/rassledovanie-i-vosstanovlenie/reflog.md)
- [Частые ошибки и их решения](theme.html?path=content/git-i-komandnaya-razrabotka/chastye-oshibki-i-ih-resheniya/push-rejected.md)
