---
title: Unsafe-код, указатели и P/Invoke
keywords: unsafe код C#, указатели в C#, оператор fixed, pinning памяти, P/Invoke, LibraryImport, NativeMemory, неуправляемая память .NET
---

# Unsafe-код, указатели и P/Invoke: работа с нативной памятью

Как напрямую обращаться к адресам памяти через указатели, закреплять объекты в куче от перемещения сборщиком мусора и вызывать функции нативных библиотек C/C++ из C#?

В обычном коде среда CLR контролирует границы массивов и автоматически управляет памятью, не позволяя обращаться к физическим адресам. Блок `unsafe` (требующий флага `<AllowUnsafeBlocks>true</AllowUnsafeBlocks>` в `.csproj`) снимает эти ограничения и открывает доступ к **указателям** (`int*`, `byte*`, `void*`) для неуправляемых типов (*unmanaged*). Поскольку сборщик мусора при сжатии кучи способен перемещать объекты в памяти, для получения указателя на массив или строку используют оператор `fixed`, временно закрепляющий объект по одному адресу. Для вызова функций из нативных библиотек C/C++ (`.dll`, `.so`, `.dylib`) служит механизм **P/Invoke** (*Platform Invoke*), современным стандартом которого стал атрибут `[LibraryImport]`.

## Основные инструменты unsafe-кода и P/Invoke

| Инструмент / конструкция | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **`unsafe { ... }`** | `unsafe void Process(int* ptr)` | Разрешает объявление и разыменование указателей в блоке, методе, структуре или классе |
| **Указатели (`*`, `&`, `->`)** | `int* p = &x; *p = 42; pt->X = 10;` | Взятие адреса (`&`), чтение/запись по адресу (`*`) и доступ к полям структуры по указателю (`->`) |
| **`fixed (...)`** | `fixed (byte* p = managedArray) { ... }` | Закрепляет (*pinning*) объект управляемой кучи, запрещая GC перемещать его во время работы с указателем |
| **`NativeMemory.Alloc / Free`** | `void* mem = NativeMemory.Alloc(1024);` | Выделяет и освобождает неуправляемую память в нативной куче ОС вне контроля GC (.NET 6+) |
| **`[LibraryImport]`** *(NET 7+)* | `[LibraryImport("lib")] static partial int Fn();` | Современный P/Invoke: генерирует переходники маршалинга на этапе компиляции (замена `[DllImport]`) |

## Пример кода

```csharp
using System;
using System.Runtime.InteropServices;

partial class Program
{
    static unsafe void Main()
    {
        // 1. Указатель на переменную в стеке (& — взятие адреса, * — разыменование)
        int counter = 10;
        int* counterPtr = &counter;
        *counterPtr += 25;

        Console.WriteLine($"Значение counter после записи по адресу 0x{(nint)counterPtr:X}: {counter}");

        // 2. Оператор fixed: закрепляем массив в управляемой куче, чтобы GC не сдвинул его во время работы
        int[] managedNumbers = { 10, 20, 30, 40 };
        fixed (int* basePtr = managedNumbers)
        {
            for (int i = 0; i < managedNumbers.Length; i++)
            {
                // Арифметика указателей: (basePtr + i) сдвигает адрес на i * sizeof(int) байт
                *(basePtr + i) *= 2;
            }
        }
        Console.WriteLine($"Массив после арифметики указателей: {string.Join(", ", managedNumbers)}");

        // 3. Выделение неуправляемой памяти напрямую через NativeMemory (.NET 6+) вне контроля GC
        const nuint elementCount = 4;
        int* nativeBuffer = (int*)NativeMemory.Alloc(elementCount, (nuint)sizeof(int));
        try
        {
            for (int i = 0; i < (int)elementCount; i++)
            {
                nativeBuffer[i] = (i + 1) * 100;
            }
            Console.WriteLine($"Данные из нативной памяти: {nativeBuffer[0]}, {nativeBuffer[3]}");
        }
        finally
        {
            // Неуправляемую память сборщик мусора не чистит — освобождаем строго вручную в finally!
            NativeMemory.Free(nativeBuffer);
        }

        // ❌ Ошибка 1: сохранение указателя из блока fixed после выхода из него
        // После закрытия скобки fixed GC может переместить массив, и указатель станет «висячим» (Dangling Pointer)

        // ❌ Ошибка 2: попытка взять указатель на ссылочный тип (например, string* или List<int>*) —
        // указатели разрешены только для неуправляемых типов (unmanaged: примитивы, enum, struct без ссылок)
    }
}

// 4. Современный P/Invoke (.NET 7+): [LibraryImport] использует Source Generator вместо медленного рантайм-маршалинга
internal static partial class NativeCryptoLibrary
{
    [LibraryImport("crypto_engine", EntryPoint = "compute_checksum", StringMarshalling = StringMarshalling.Utf8)]
    internal static partial uint ComputeChecksum(string payload, int flags);
}

```

## Важные нюансы

* **Какие типы допускают указатели (`unmanaged`):** создать указатель можно только на неуправляемый тип (*unmanaged type*) — примитивы (`int`, `double`, `bool`, `char`), перечисления (`enum`) и структуры (`struct`), в которых нет ни одного ссылочного поля (`string`, `object`, массивы или классы). Чтобы проект скомпилировался, в файл `.csproj` нужно добавить `<AllowUnsafeBlocks>true</AllowUnsafeBlocks>`.
* **Зачем нужен `fixed` и чем опасен долгий pinning:** во время сборки мусора GC уплотняет кучу (*compaction*), сдвигая живые объекты к её началу, поэтому адрес любого объекта в куче может измениться. Оператор `fixed` временно запрещает перемещение объекта. Держите блоки `fixed` максимально короткими, иначе закреплённые «островки» мешают сборщику мусора сжимать память; если буфер должен жить долго и передаваться в нативный код, создавайте его сразу в закреплённой куче через `GC.AllocateArray<byte>(size, pinned: true)`.
* **Современный `[LibraryImport]` против классического `[DllImport]`:** начиная с .NET 7 атрибут `[LibraryImport]` в паре с `partial`-методами заменяет устаревший `[DllImport]`. Вместо генерации переходников маршалинга во время выполнения программы компилятор заранее создаёт чистый C#-код с помощью *Source Generator*, поддерживает явную кодировку строк (`StringMarshalling.Utf8`), исключает лишние аллокации при вызове функций C/C++ и полностью совместим с Native AOT.
* **Безопасная альтернатива и связь со следующей темой:** в 99% задач современного C# ручная работа с указателями не нужна — безопасные структуры `Span<T>`, `Memory<T>` и класс `MemoryMarshal` дают ту же скорость с контролем границ и без риска повредить память программы (см. карточку *`Memory<T>`, `ArrayPool` и `stackalloc`*). В следующей заключительной карточке мы подведём итог всей хардкорной группы и соберём финальную карту языка C# (*Рантайм, память и метапрограммирование*).

