---
title: DateTime, DateTimeOffset и DateOnly
keywords: дата и время C#, DateTime, DateTimeOffset, DateOnly и TimeOnly, TimeSpan, часовые пояса UTC, TimeProvider, парсинг дат
---

# Дата и время: DateTime, DateTimeOffset, DateOnly и TimeSpan

Как фиксировать моменты времени без путаницы с часовыми поясами, не терять день рождения при конвертации в UTC и рассчитывать длительность интервалов без ошибок региональных настроек?

В стандартной библиотеке .NET работа со временем разделена между специализированными структурами значений (`struct`). Для фиксации точного момента на мировой шкале времени (логи, события, заказы в API) используют `DateTimeOffset`, который хранит время вместе со смещением относительно UTC, тогда как классический `DateTime` не содержит сведений о часовом поясе и легко приводит к ошибкам при переносе сервера в другой регион. Для календарных дат без времени и расписаний без даты предназначены `DateOnly` и `TimeOnly`, а для измерения длительности и разницы между двумя отметками — структура `TimeSpan`.

## Основные типы для работы с датой и временем

| Тип / инструмент | Что хранит | Когда применять |
| --- | --- | --- |
| **`DateTimeOffset`** | Дата, время и смещение от UTC (например, `+03:00`) | Основной стандарт для событий, транзакций, логов и обмена данными в распределённых системах |
| **`DateTime`** | Дата и время + флаг `Kind` (`Utc`, `Local`, `Unspecified`) | Взаимодействие со старыми API или внутренние вычисления строго в `DateTime.UtcNow` |
| **`DateOnly`** *(NET 6+)* | Только календарную дату (год, месяц, день) | Дни рождения, сроки договоров, праздники и отчёты за день, не зависящие от часового пояса |
| **`TimeOnly`** *(NET 6+)* | Только время суток (`00:00:00` – `23:59:59.9999999`) | Часы работы магазинов, ежедневные будильники и расписание занятий |
| **`TimeSpan`** | Интервал времени (длительность в тиках, секундах, днях) | Таймауты, расчёт разницы между датами (`end - start`) и прибавление времени |
| **`TimeProvider`** *(NET 8+)* | Абстракция источника системного времени (`TimeProvider.System`) | Получение текущего времени в бизнес-логике с возможностью подмены времени в тестах |

## Пример кода

```csharp
using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        // 1. DateTimeOffset: точный момент времени с часовым поясом (стандарт для событий, логов и API)
        DateTimeOffset createdAt = TimeProvider.System.GetUtcNow();
        TimeZoneInfo moscowZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Moscow");
        DateTimeOffset moscowTime = TimeZoneInfo.ConvertTime(createdAt, moscowZone);

        Console.WriteLine($"UTC (ISO 8601):   {createdAt:O}");
        Console.WriteLine($"Время в Москве:   {moscowTime:dd.MM.yyyy HH:mm zzz}");

        // 2. DateOnly и TimeOnly (.NET 6+): дата без времени и время без даты
        DateOnly deadline = new DateOnly(2026, 12, 15);
        DateOnly today = DateOnly.FromDateTime(moscowTime.DateTime);
        int daysLeft = deadline.DayNumber - today.DayNumber;

        TimeOnly shopOpens = new TimeOnly(9, 0);
        TimeOnly shopCloses = new TimeOnly(21, 0);
        TimeOnly currentClock = TimeOnly.FromDateTime(moscowTime.DateTime);
        bool isOpen = currentClock.IsBetween(shopOpens, shopCloses);

        Console.WriteLine($"\nДо дедлайна ({deadline:dd.MM.yyyy}): {daysLeft} дн. | Магазин сейчас открыт: {isOpen}");

        // 3. TimeSpan: длительность и арифметика интервалов
        TimeSpan deliverySla = TimeSpan.FromHours(2) + TimeSpan.FromMinutes(30);
        DateTimeOffset estimatedArrival = createdAt + deliverySla;
        Console.WriteLine($"Ожидаемая доставка (UTC): {estimatedArrival:HH:mm} (через {deliverySla.TotalMinutes} мин.)");

        // 4. Безопасный парсинг дат с явным форматом и InvariantCulture
        string rawHeaderDate = "2026-11-14T18:30:00+03:00";
        if (DateTimeOffset.TryParseExact(
            rawHeaderDate,
            "yyyy-MM-dd'T'HH:mm:sszzz",
            CultureInfo.InvariantCulture,
            DateTimeStyles.None,
            out DateTimeOffset parsed))
        {
            Console.WriteLine($"Распознано время в UTC: {parsed.UtcDateTime:yyyy-MM-dd HH:mm}Z");
        }

        // ❌ Опасность 1: DateTime.Now привязан к часовому поясу сервера и ломается при переводе часов
        // DateTime badTimestamp = DateTime.Now;

        // ❌ Опасность 2: DateTime.Parse без CultureInfo перепутает день и месяц на сервере с локалью en-US ("04/05/2026")
        // DateTime ambiguousDate = DateTime.Parse("04/05/2026");
    }
}

```

## Важные нюансы

* **Почему `DateTimeOffset` надёжнее `DateTime`:** у структуры `DateTime` свойство `Kind` принимает одно из трёх значений (`Utc`, `Local` или `Unspecified`), но при сравнении `dt1 == dt2` среда .NET сверяет только внутреннее число тактов без учёта часового пояса — в результате один и тот же момент в `Local` и `Utc` окажется «неравным». `DateTimeOffset` всегда однозначно привязан к UTC и хранит точное смещение, поэтому корректно сравнивается и сериализуется в стандартном формате ISO 8601 (`"O"`).
* **`DateOnly` и `TimeOnly` избавляют от сдвига на соседний день:** раньше для хранения даты рождения использовали `DateTime` с нулевым временем (`2005-08-10 00:00:00`), но при передаче по сети и конвертации из `+03:00` в UTC полночь превращалась в `2005-08-09 21:00:00`, сдвигая дату на день назад. Типы `DateOnly` и `TimeOnly` полностью лишены часовых поясов, умеют считать разницу дней через свойство `DayNumber` и проверять попадание в расписание методом `IsBetween`.
* **Кроссплатформенный `TimeZoneInfo` и тестируемость через `TimeProvider`:** начиная с .NET 6 метод `TimeZoneInfo.FindSystemTimeZoneById` автоматически понимает как идентификаторы IANA (`"Europe/Moscow"`), так и имена Windows (`"Russian Standard Time"`) на любой операционной системе. А использование `TimeProvider.System.GetUtcNow()` (.NET 8+) вместо жёстко зашитого `DateTimeOffset.UtcNow` позволяет в модульных тестах подставить `FakeTimeProvider` и мгновенно «перематывать» время вперёд для проверки истечения сроков.
* **Форматирование, парсинг и связь со следующей темой:** при разборе дат из файлов и сетевых протоколов всегда передавайте `CultureInfo.InvariantCulture` и точный шаблон в `TryParseExact`, иначе строка `"04/05/2026"` на одном компьютере прочтётся как 4 мая, а на другом — как 5 апреля. В следующей карточке мы перейдём к сохранению данных на диск и разберём работу с файловой системой (*Файловая система: `Path`, `File` и `Directory*`).

