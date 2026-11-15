---
title: Memory<T>, ArrayPool и stackalloc
keywords: Memory и Span, ArrayPool, stackalloc, zero-allocation, аренда буферов, CollectionsMarshal, управление памятью C#, оптимизация GC
---

# Memory, ArrayPool и stackalloc: буферы без аллокаций

Как работать с временными массивами и срезами в асинхронных методах, выделять память прямо на стеке без участия сборщика мусора и брать готовые буферы в аренду?

В высоконагруженном коде постоянное создание временных массивов (`new byte[4096]`) быстро забивает нулевое поколение кучи и заставляет сборщик мусора чаще приостанавливать работу программы. Чтобы обойти лишние выделения памяти (*zero-allocation*), в .NET используют три дополняющих друг друга механизма: оператор `stackalloc` выделяет крошечные буферы мгновенно на стеке потока, пул `ArrayPool<T>.Shared` выдаёт в аренду многоразовые массивы из кучи, а структура `Memory<T>` (в отличие от стекового `Span<T>`) позволяет безопасно хранить срез буфера в полях классов и передавать его через границы `await` в `async`-методах.

## Инструменты работы с памятью и буферами

| Инструмент / метод | Синтаксис / пример | Назначение и особенности |
| --- | --- | --- |
| **`stackalloc` + `Span<T>**` | `Span<byte> buf = stackalloc byte[256];` | Выделяет память на стеке без `unsafe` и участия GC; освобождается автоматически при выходе из метода |
| **`ArrayPool<T>.Shared`** | `byte[] buf = ArrayPool<byte>.Shared.Rent(4096);` | Берёт готовый массив из общего пула; требует обязательного возврата через `Return(buf)` в `finally` |
| **`Memory<T>` / `ReadOnlyMemory<T>**` | `async Task ReadAsync(Memory<byte> buffer)` | Обычная структура (`struct`): может жить в куче и пересекать `await`, открывая доступ к `.Span` |
| **`CollectionsMarshal.AsSpan`** | `Span<int> span = CollectionsMarshal.AsSpan(list);` | Возвращает прямое «окно» во внутренний массив `List<T>` без копирования для сверхбыстрого обхода |

## Пример кода

```csharp
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        // 1. stackalloc: выделяем небольшой буфер (до 1 КБ) прямо на стеке без нагрузки на GC
        Span<int> stackBuffer = stackalloc int[4];
        for (int i = 0; i < stackBuffer.Length; i++)
        {
            stackBuffer[i] = (i + 1) * 10;
        }
        Console.WriteLine($"Сумма элементов на стеке: {SumSpan(stackBuffer)}");

        // 2. ArrayPool<T> + Memory<T>: арендуем буфер из пула и передаём его в async-метод через await
        const int neededSize = 1000;
        byte[] rentedArray = ArrayPool<byte>.Shared.Rent(minimumLength: neededSize);

        try
        {
            // Rent может вернуть массив больше запрошенного (например, 1024 байта), поэтому сразу ограничиваем срез!
            Memory<byte> slice = rentedArray.AsMemory(0, neededSize);
            int bytesWritten = await FillBufferAsync(slice);

            Console.WriteLine($"Арендовано в пуле: {rentedArray.Length} байт | Использовано: {bytesWritten} байт");
            Console.WriteLine($"Первый и последний байты: {slice.Span[0]} и {slice.Span[bytesWritten - 1]}");
        }
        finally
        {
            // Обязательно возвращаем массив в пул (clearArray: true затирает данные, если там были секреты)
            ArrayPool<byte>.Shared.Return(rentedArray, clearArray: false);
        }

        // 3. CollectionsMarshal.AsSpan: прямой доступ к внутреннему массиву List<T> без копирования
        List<int> scores = new() { 10, 20, 30, 40 };
        Span<int> listSpan = CollectionsMarshal.AsSpan(scores);
        for (int i = 0; i < listSpan.Length; i++)
        {
            listSpan[i] += 5; // Меняем элементы списка напрямую по ссылкам в памяти
        }
        Console.WriteLine($"Обновлённый List<T>: {string.Join(", ", scores)}");

        // ❌ Ошибка 1: использование stackalloc внутри цикла переполнит стек (StackOverflowException),
        // так как память на стеке освобождается только при выходе из всего метода, а не из блока for!
        // for (int i = 0; i < 10_000; i++) { Span<byte> leak = stackalloc byte[512]; }

        // ❌ Ошибка 2: обращение к rentedArray после вызова ArrayPool.Return (гонка данных с другими потоками)
    }

    static int SumSpan(ReadOnlySpan<int> numbers)
    {
        int sum = 0;
        foreach (int n in numbers) sum += n;
        return sum;
    }

    // Memory<byte> свободно проходит через await, в отличие от Span<byte> (который запрещён в async-методах)
    static async Task<int> FillBufferAsync(Memory<byte> target)
    {
        await Task.Delay(50);

        // Свойство .Span вызываем локально в синхронном участке кода после await
        Span<byte> span = target.Span;
        span.Fill(42);
        span[^1] = 99;
        return span.Length;
    }
}

```

## Важные нюансы

* **Гибридный паттерн (`stackalloc` для малых буферов, `ArrayPool` для больших):** выделение на стеке работает мгновенно, но размер стека потока ограничен (~1 МБ в Windows и ~8 МБ в Linux), поэтому через `stackalloc` безопасно брать не более 512–1024 байт и никогда не вызывать его внутри циклов. На практике используют ветвление: `Span<byte> buf = size <= 512 ? stackalloc byte[size] : (rented = ArrayPool<byte>.Shared.Rent(size)).AsSpan(0, size);` с возвратом `rented` в `finally`.
* **Две главные ловушки `ArrayPool<T>.Shared`:** во-первых, метод `Rent(1000)` возвращает массив размером *не меньше* запрошенного (обычно кратный степени двойки — например, 1024 элемента), причём в хвосте массива могут оставаться старые данные от предыдущего владельца — всегда ограничивайте рабочий диапазон через `.AsSpan(0, 1000)`. Во-вторых, никогда не читайте и не меняйте массив после `Return`, иначе перезапишете данные другого потока, который уже арендовал этот же буфер.
* **Зачем нужен `Memory<T>`, если уже есть `Span<T>`:** `Span<T>` является `ref struct` и привязан к стеку, поэтому его нельзя сохранить в поле класса или передать в `async`-метод до `await`. `Memory<T>` — обычная структура без ограничений `ref struct`: она хранит ссылку на массив (или `IMemoryOwner<T>`) и смещение, а при необходимости поработать с данными вы в любой момент получаете `memory.Span`.
* **Осторожность при работе с `CollectionsMarshal.AsSpan` и связь со следующей темой:** срез `CollectionsMarshal.AsSpan(list)` даёт прямой указатель на внутренний массив `List<T>`, но если во время работы со срезом вызвать `list.Add(...)`, список может перевыделить память под новый массив, и старый `Span<T>` станет указывать на устаревшие данные. В следующей карточке мы перейдём от низкоуровневой работы с памятью к исследованию типов во время выполнения программы (*Рефлексия `Reflection` и метаданные*).

