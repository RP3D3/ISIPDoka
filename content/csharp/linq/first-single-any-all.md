---
title: First, Single, Any, All
keywords: LINQ, поиск элементов, FirstOrDefault, SingleOrDefault, квантификаторы Any и All, короткое замыкание, InvalidOperationException, проверка коллекций
---

# Поиск и проверки: First, Single, Any и All

Как безопасно извлечь один элемент из коллекции без риска падения программы и быстро проверить, выполняются ли условия для элементов последовательности?

Операторы поиска элементов и квантификаторы в LINQ относятся к методам **немедленного выполнения** (*immediate execution*) и используют механизм **короткого замыкания** (*short-circuiting*) — они останавливают перебор, как только результат становится очевиден. Семейство методов `First`, `Single` и `Last` позволяет получить конкретный элемент или значение по умолчанию (`...OrDefault`), а квантификаторы `Any`, `All` и `Contains` возвращают `bool`, отвечая на вопросы о наличии данных или соблюдении правил во всей коллекции.

## Основные операторы поиска и логических проверок

| Оператор | Если элемент не найден | Если найдено несколько | Когда применять |
| --- | --- | --- | --- |
| `First()` / `First(pred)` | Выбрасывает `InvalidOperationException` | Возвращает **первый** подходящий | Когда элемент гарантированно должен быть (иначе это баг) |
| `FirstOrDefault()` | Возвращает `default` (`null` / `0`) или заданный fallback | Возвращает **первый** подходящий | Стандартный безопасный поиск первого совпадения |
| `Single()` / `Single(pred)` | Выбрасывает `InvalidOperationException` | Выбрасывает `InvalidOperationException` | Поиск строго уникальной записи (например, по `Id`) |
| `SingleOrDefault()` | Возвращает `default` или заданный fallback | Выбрасывает `InvalidOperationException` | Запись может отсутствовать, но дубликаты недопустимы |
| `LastOrDefault()` / `ElementAtOrDefault(i)` | Возвращает `default` | Возвращает последний / по индексу | Получение хвоста последовательности или элемента по позиции |
| `Any()` / `Any(pred)` | Возвращает `false` | Возвращает `true` (на первом же совпадении) | Проверка, не пуста ли коллекция или есть ли хоть один элемент |
| `All(pred)` | Возвращает `true` *(пустая истина)* | Проверяет **все** элементы до первого `false` | Валидация того, что каждый элемент соответствует правилу |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<User> users = new List<User>
        {
            new User(1, "Роман", "Admin", IsActive: true),
            new User(2, "Анна", "Editor", IsActive: true),
            new User(3, "Максим", "Editor", IsActive: false)
        };

        // 1. FirstOrDefault: вернёт первого подходящего редактора (Анну) или null, если таких нет
        User? firstEditor = users.FirstOrDefault(u => u.Role == "Editor");
        Console.WriteLine($"Первый редактор: {firstEditor?.Name ?? "не найден"}");

        // 2. SingleOrDefault: поиск уникального пользователя по Id (если их окажется 2 — упадёт с исключением)
        User? admin = users.SingleOrDefault(u => u.Id == 1);
        Console.WriteLine($"Пользователь #1: {admin?.Name}");

        // 3. FirstOrDefault со своим значением по умолчанию (.NET 6+): удобно для чисел и структур
        int[] ratings = { 4, 5, 3 };
        int highRating = ratings.FirstOrDefault(r => r == 10, defaultValue: -1);
        Console.WriteLine($"Оценка 10 (или -1 если нет): {highRating}");

        // 4. Квантификаторы Any и All: быстрые логические проверки с коротким замыканием
        bool hasInactive = users.Any(u => !u.IsActive);
        bool allHaveNames = users.All(u => !string.IsNullOrWhiteSpace(u.Name));
        Console.WriteLine($"Есть неактивные: {hasInactive} | У всех заполнено имя: {allHaveNames}");

        // 5. Особенность All на пустой коллекции: всегда возвращает true (пустая истина)
        bool emptyCheck = new List<User>().All(u => u.IsActive);
        Console.WriteLine($"All на пустом списке: {emptyCheck}"); // True

        // ❌ Опасность 1: First() выбросит InvalidOperationException, если коллекция пуста или нет совпадений
        // User missing = users.First(u => u.Role == "Guest");

        // ❌ Опасность 2: SingleOrDefault() выбросит InvalidOperationException, так как редакторов двое
        // User? ambiguous = users.SingleOrDefault(u => u.Role == "Editor");
    }
}

record User(int Id, string Name, string Role, bool IsActive);

```

## Важные нюансы

* **Разница между `FirstOrDefault` и `SingleOrDefault` (логика и скорость):** `FirstOrDefault` останавливается сразу, как только находит первый подходящий элемент. `SingleOrDefault` обязан продолжить перебор дальше (до конца коллекции в памяти или до второго совпадения), чтобы убедиться в отсутствии дубликатов — используйте его только там, где наличие двух одинаковых записей является нарушением целостности данных.
* **Своё значение по умолчанию в .NET 6+ и ловушка `default` для структур:** начиная с .NET 6, в `FirstOrDefault`, `SingleOrDefault` и `LastOrDefault` можно передать запасное значение прямо параметром (`ratings.FirstOrDefault(r => r == 10, -1)`). Это решает классическую проблему значимых типов, где стандартный `default(int)` равен `0` и не позволяет отличить найденный ноль от отсутствия элемента.
* **Почему `Any()` быстрее `Count() > 0` и ловушка пустой коллекции в `All()`:** для проверки наличия элементов всегда пишите `items.Any()`, а не `items.Count() > 0` — `Any()` остановится на первом же элементе, тогда как `Count()` на обычном `IEnumerable<T>` пройдёт всю коллекцию до конца. Также помните про математическую «пустую истину»: вызов `All(...)` на пустой коллекции всегда возвращает `true`, потому что в ней нет ни одного элемента, нарушающего условие.
* **Связь с теорией и следующей темой:** немедленный запуск перебора в `First` и `Any` противоположен ленивым методам из карточки *Основы LINQ и отложенное выполнение*, а в следующей карточке мы разберём, как объединять элементы в группы по ключу и связывать две коллекции между собой (*Группировка и соединение: `GroupBy` и `Join*`).

