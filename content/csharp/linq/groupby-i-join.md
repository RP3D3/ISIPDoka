---
title: GroupBy и Join
keywords: LINQ, группировка GroupBy, соединение Join, GroupJoin, слияние Zip, IGrouping, ToLookup, составной ключ
---

# Группировка и соединение: GroupBy, Join и Zip

Как разбить плоский список на категории по общему признаку, связать две разные коллекции по ключу и попарно объединить две последовательности в одну?

Оператор `GroupBy` распределяет элементы последовательности по корзинам с общим ключом, возвращая набор групп `IGrouping<TKey, TElement>`, каждая из которых хранит свойство `Key` и сама является коллекцией элементов. Когда данные разделены между двумя разными источниками (например, списком отделов и списком сотрудников), используют операторы соединения: `Join` выполняет внутреннее соединение («один к одному»), `GroupJoin` формирует иерархическую связь («один ко многим»), а `Zip` склеивает две или три коллекции попарно по порядковым индексам.

## Основные операторы группировки и соединения

| Оператор | Сигнатура / параметры | Назначение и структура результата |
| --- | --- | --- |
| `GroupBy(keySelector)` | `Func<TSource, TKey>` *(и опционально `IEqualityComparer<TKey>`)* | Группирует элементы по ключу в последовательность `IGrouping<TKey, TElement>` |
| `Join(...)` | `inner`, `outerKeySelector`, `innerKeySelector`, `resultSelector` | Внутреннее соединение (*Inner Join*): оставляет только пары с совпавшими ключами |
| `GroupJoin(...)` | `inner`, `outerKeySelector`, `innerKeySelector`, `resultSelector` | Иерархическое соединение («один ко многим»): к каждому внешнему элементу прикрепляет коллекцию совпавших |
| `Zip(second)` | `IEnumerable<TSecond>` *(в .NET 6+ также 3-я коллекция)* | Попарно объединяет элементы по их позиции (`(a1, b1), (a2, b2)...`) до конца более короткой последовательности |

## Пример кода

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<Department> departments = new List<Department>
        {
            new Department(1, "Разработка"),
            new Department(2, "Дизайн"),
            new Department(3, "Маркетинг") // В этом отделе пока нет сотрудников
        };

        List<Employee> employees = new List<Employee>
        {
            new Employee("Роман", DeptId: 1, Salary: 180000m),
            new Employee("Анна", DeptId: 1, Salary: 210000m),
            new Employee("Елена", DeptId: 2, Salary: 150000m),
            new Employee("Игорь", DeptId: 99, Salary: 120000m) // Несуществующий DeptId
        };

        // 1. GroupBy: разбиваем сотрудников по ID отдела (каждая группа — IGrouping<int, Employee>)
        Console.WriteLine("Группировка сотрудников по DeptId:");
        foreach (IGrouping<int, Employee> group in employees.GroupBy(e => e.DeptId))
        {
            string names = string.Join(", ", group.Select(e => e.Name));
            Console.WriteLine($"  Отдел #{group.Key}: {names} (всего: {group.Count()})");
        }

        // 2. Join (Inner Join): связываем сотрудника с названием отдела (Игорь с DeptId=99 и пустой Маркетинг отсеются)
        var employeeCards = employees.Join(
            inner: departments,
            outerKeySelector: emp => emp.DeptId,
            innerKeySelector: dept => dept.Id,
            resultSelector: (emp, dept) => $"{emp.Name} — отдел «{dept.Title}» ({emp.Salary} руб.)");

        Console.WriteLine("\nВнутреннее соединение (Join):");
        foreach (string card in employeeCards)
        {
            Console.WriteLine($"  {card}");
        }

        // 3. GroupJoin: к каждому отделу прикрепляем список его сотрудников (Маркетинг сохранится с пустым списком)
        var deptStructure = departments.GroupJoin(
            inner: employees,
            outerKeySelector: dept => dept.Id,
            innerKeySelector: emp => emp.DeptId,
            resultSelector: (dept, deptEmployees) => new
            {
                dept.Title,
                StaffCount = deptEmployees.Count()
            });

        Console.WriteLine("\nИерархическое соединение (GroupJoin):");
        foreach (var item in deptStructure)
        {
            Console.WriteLine($"  {item.Title}: {item.StaffCount} чел.");
        }

        // 4. Zip: попарно склеиваем две коллекции по индексам в кортежи (остановится на длине более короткой)
        string[] sprints = { "Спринт 1", "Спринт 2", "Спринт 3" };
        int[] completedTasks = { 14, 19 };

        Console.WriteLine("\nПопарное слияние (Zip):");
        foreach ((string sprint, int tasks) in sprints.Zip(completedTasks))
        {
            Console.WriteLine($"  {sprint}: закрыто задач — {tasks}");
        }

        // ❌ Антипаттерн (поиск O(N * M)): не делайте вложенный FirstOrDefault внутри Select вместо Join
        // var slow = employees.Select(e => departments.FirstOrDefault(d => d.Id == e.DeptId)?.Title);
    }
}

record Department(int Id, string Title);
record Employee(string Name, int DeptId, decimal Salary);

```

## Важные нюансы

* **Устройство `IGrouping<TKey, TElement>` и отличие `GroupBy` от `ToLookup`:** результат `GroupBy` представляет собой коллекцию объектов `IGrouping<TKey, TElement>`, где каждый элемент одновременно содержит ключ `group.Key` и реализует `IEnumerable<TElement>` для перебора элементов внутри группы. При этом `GroupBy` выполняется лениво (*deferred*), а метод `ToLookup` группирует данные немедленно в хэш-таблицу, позволяя мгновенно обращаться к любой группе по ключу (`lookup[1]`) без исключений при отсутствии ключа.
* **Производительность `Join` и разница с `GroupJoin` (Left Join):** под капотом `Join` строит внутреннюю хэш-таблицу по ключам второй коллекции, поэтому работает за линейное время $O(N + M)$ вместо медленного вложенного перебора $O(N \times M)$. Обычный `Join` работает как SQL `INNER JOIN` (отбрасывает элементы без пары), а чтобы получить аналог `LEFT OUTER JOIN` (сохранить все элементы левой коллекции даже без совпадений), используют `GroupJoin` в связке с `.SelectMany(..., (outer, inner) => ...)` и `.DefaultIfEmpty()`.
* **Составные ключи и сравнение строк (`IEqualityComparer<TKey>`):** чтобы сгруппировать или соединить данные сразу по двум полям, передайте в качестве ключа анонимный тип или кортеж — например, `GroupBy(e => (e.DeptId, e.Salary > 150000m))`, так как они автоматически сравниваются по значениям всех полей. Для строковых ключей, где не важен регистр букв, передавайте последним аргументом компаратор `StringComparer.OrdinalIgnoreCase`.
* **Особенности `Zip` и связь со следующей темой:** оператор `Zip` объединяет элементы строго по их порядковым номерам и молча прекращает работу, как только заканчивается самая короткая из переданных последовательностей (начиная с .NET 6 `Zip` поддерживает слияние сразу трёх коллекций). В следующей карточке мы разберём работу с уникальными элементами, операции над множествами и вычисление итоговых показателей (*Множества и агрегация: `Distinct`, `MinBy`, `MaxBy` и `Aggregate`*).

