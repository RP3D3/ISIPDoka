---
title: Reflection метаданные
keywords: рефлексия C#, System.Reflection, метаданные типов, Type и Activator, PropertyInfo и MethodInfo, BindingFlags, CreateDelegate, Native AOT
---

# Рефлексия (Reflection) и метаданные: Type и Activator

Как во время работы программы узнать состав неизвестного заранее класса, создать его экземпляр по имени, прочитать свойства и вызвать метод без жёсткой привязки на этапе компиляции?

Каждая сборка .NET (`.dll` или `.exe`) помимо скомпилированного кода хранит подробные **метаданные** обо всех своих типах, методах, полях и параметрах. Пространство имён `System.Reflection` позволяет считывать эти метаданные в рантайме через объект `Type`: динамически создавать экземпляры классов (`Activator.CreateInstance`), читать и изменять значения свойств (`PropertyInfo`) и вызывать методы (`MethodInfo`). На этом механизме построены DI-контейнеры, сериализаторы, ORM и системы плагинов, однако за гибкость приходится платить снижением скорости, упаковкой значимых типов (*boxing*) и сложностями при обрезке кода (*trimming* / Native AOT).

## Основные инструменты рефлексии

| Инструмент / метод | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **`typeof(T)` / `obj.GetType()`** | `Type t = typeof(ExportPlugin);` | Получает дескриптор метаданных типа на этапе компиляции (`typeof`) или по живому экземпляру (`GetType()`) |
| **`Activator.CreateInstance`** | `object? inst = Activator.CreateInstance(type);` | Создаёт экземпляр типа в рантайме, вызывая подходящий конструктор (включая `nonPublic: true`) |
| **`GetProperties()` / `PropertyInfo`** | `prop.GetValue(obj)` / `prop.SetValue(obj, val)` | Читает список свойств типа и позволяет получать или записывать их значения у конкретного объекта |
| **`GetMethod()` / `MethodInfo`** | `method.Invoke(obj, new object[] { "A", 2 })` | Находит метод (в том числе закрытый через `BindingFlags`) и вызывает его с передачей аргументов |
| **`Assembly.GetExecutingAssembly()`** | `assembly.GetTypes()` | Сканирует текущую или загруженную `.dll`-сборку для поиска всех классов, реализующих нужный контракт |

## Пример кода

```csharp
using System;
using System.Reflection;

class Program
{
    static void Main()
    {
        // 1. Получаем объект Type без прямой ссылки на конструктор (например, по имени типа из конфига)
        Type pluginType = typeof(ExportPlugin);
        Console.WriteLine($"Тип: {pluginType.FullName} | Сборка: {pluginType.Assembly.GetName().Name}");

        // 2. Динамически создаём экземпляр класса в рантайме через Activator
        object instance = Activator.CreateInstance(pluginType)!;

        // 3. Читаем и изменяем свойство через PropertyInfo
        PropertyInfo? formatProp = pluginType.GetProperty(nameof(ExportPlugin.Format));
        formatProp?.SetValue(instance, "Parquet");
        Console.WriteLine($"Установлен формат экспорта: {formatProp?.GetValue(instance)}");

        // 4. Читаем закрытое (private) поле через комбинацию BindingFlags
        FieldInfo? tokenField = pluginType.GetField(
            "_internalToken",
            BindingFlags.Instance | BindingFlags.NonPublic);
        Console.WriteLine($"Закрытый токен плагина: {tokenField?.GetValue(instance)}");

        // 5. Вызов метода через MethodInfo.Invoke и быстрый кэшированный делегат CreateDelegate
        MethodInfo executeMethod = pluginType.GetMethod(nameof(ExportPlugin.Execute))!;

        // Обычный вызов через Invoke (медленно: упаковывает аргументы в object[] и проверяет доступ)
        object? result1 = executeMethod.Invoke(instance, new object[] { "orders_2026", 3 });
        Console.WriteLine($"Результат Invoke:   {result1}");

        // Превращаем MethodInfo в открытый делегат один раз — дальнейшие вызовы работают почти на нативной скорости
        var fastExecute = executeMethod.CreateDelegate<Func<ExportPlugin, string, int, string>>();
        string result2 = fastExecute((ExportPlugin)instance, "users_2026", 5);
        Console.WriteLine($"Результат Delegate: {result2}");

        // ❌ Ошибка 1: передача только BindingFlags.NonPublic без Instance или Static всегда вернёт null!
        // var broken = pluginType.GetField("_internalToken", BindingFlags.NonPublic);

        // ❌ Антипаттерн 2: вызов GetMethod(...) и Invoke(...) внутри горячего цикла на миллионы итераций
        // Вместо этого кэшируйте MethodInfo или оборачивайте его в CreateDelegate<T>() один раз при старте
    }
}

public class ExportPlugin
{
    private readonly string _internalToken = "SEC-9941";

    public string Format { get; set; } = "JSON";

    public string Execute(string tableName, int batchSize)
    {
        return $"Экспорт [{tableName}] в {Format} (пакетами по {batchSize})";
    }
}

```

## Важные нюансы

* **`typeof(T)` против `obj.GetType()`:** оператор `typeof(T)` разрешается компилятором, не требует создания объекта и умеет работать с открытыми обобщениями (например, `typeof(Dictionary<,>)`). Метод `obj.GetType()` вызывается у конкретного экземпляра и возвращает его фактический тип в рантайме — даже если переменная объявлена как базовый класс или интерфейс `object`.
* **Ловушка `BindingFlags` при поиске закрытых членов:** вызов `GetMethod("Name")` без флагов ищет члены с набором `BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static`. Как только вы передаёте свой аргумент (например, только `BindingFlags.NonPublic`), стандартный набор полностью сбрасывается и поиск возвращает `null` — всегда явно указывайте как модификатор доступа (`Public` / `NonPublic`), так и принадлежность (`Instance` / `Static`).
* **Накладные расходы `Invoke`, упаковка (*boxing*) и `TargetInvocationException`:** при каждом вызове `MethodInfo.Invoke` среда выполнения проверяет права доступа, упаковывает значимые типы (`int`, `bool`, `struct`) в массив `object[]` и оборачивает любое исключение, возникшее внутри целевого метода, в `TargetInvocationException` (настоящую ошибку нужно доставать из `ex.InnerException`). Для многократных вызовов преобразуйте `MethodInfo` в строго типизированный делегат через `CreateDelegate<T>()`.
* **Совместимость с Native AOT и связь со следующей темой:** динамический поиск типов по строковым именам мешает компоновщику (*IL Linker*) понять, какие классы реально используются в программе, из-за чего при сборке в Native AOT они могут быть удалены (для защиты таких типов применяют атрибут `[DynamicallyAccessedMembers]`). В следующей карточке мы разберём, как размечать классы собственными метаданными, обращаться к приватным полям без рефлексии через `[UnsafeAccessor]` и переносить генерацию кода на этап компиляции (*Атрибуты и Source Generators*).

