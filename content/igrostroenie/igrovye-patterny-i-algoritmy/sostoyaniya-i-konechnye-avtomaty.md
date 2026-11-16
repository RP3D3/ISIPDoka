---
title: Состояния и конечные автоматы
description: Почему булевы флаги быстро превращаются в хаос и как заменить их явными состояниями и переходами.
keywords: конечный автомат, FSM, состояние, переход, enum, игровая логика, guard, Enter, Exit

---

# Состояния и конечные автоматы

Почти любое поведение в игре можно описать фразой «сейчас персонаж делает X».
Пока X один, хватает флажка. Когда X становится пять, флажки начинают
противоречить друг другу: герой одновременно бежит, атакует и находится в
стане. **Конечный автомат** (finite state machine, FSM) убирает эту
неоднозначность: в каждый момент активно ровно одно состояние, а смена
происходит только по явному переходу.

## Проблема флагов

Наивная модель хранит независимые признаки:

```csharp
bool isIdle;
bool isRunning;
bool isJumping;
bool isAttacking;
bool isStunned;
```

Дальше появляются вопросы, на которые нет ответа в самой структуре данных:

- можно ли атаковать в прыжке;
- что важнее — стан или атака;
- кто сбрасывает `isJumping`, если персонаж умер;
- почему после отмены атаки остался `isRunning`, хотя скорость уже нулевая.

Каждый новый флаг удваивает число комбинаций, а проверки расползаются по
десяткам `if`. Ошибка проявляется не там, где возникла, а через несколько
кадров в другом месте.

## Состояние, событие и переход

В FSM есть три сущности:

| Сущность | Смысл | Пример |
|---|---|---|
| Состояние | Что происходит сейчас | `Chase`, `Attack`, `Stunned` |
| Событие | Что изменилось снаружи | «увидел игрока», «кончился таймер» |
| Переход | Правило смены состояния | `Chase → Attack`, если дистанция < 2 |

У перехода бывает **условие** (guard) и **действие**. Условие отвечает на вопрос
«можно ли», действие — «что сделать при смене». Полезно разделять вход в
состояние, обновление и выход:

- `Enter` — включить анимацию, обнулить таймер, взять цель;
- `Tick` — логика, пока состояние активно;
- `Exit` — остановить эффект, вернуть управление, снять подписки.

Без парного `Exit` типичная ошибка — «залипший» эффект: щит выключили, а
модификатор урона остался.

## Таблица переходов

Самый дешёвый способ навести порядок — выписать правила текстом или таблицей
до кода. Тогда видно недостижимые состояния и переходы, которые никто не
закрывает.

| Из | Событие | В | Действие |
|---|---|---|---|
| `Idle` | увидел игрока | `Chase` | взять цель |
| `Patrol` | увидел игрока | `Chase` | взять цель |
| `Chase` | дистанция < 2 | `Attack` | запустить замах |
| `Attack` | цель ушла | `Chase` | отменить замах |
| `Chase` | получил стан | `Stunned` | прервать движение |
| `Stunned` | таймер истёк | `Patrol` | вернуться к маршруту |
| `Stunned` | HP = 0 | `Dead` | отключить коллайдер |

<figure class="md-figure md-figure--center md-figure--wide">
  <img
    src="content/igrostroenie/_assets/igrovye-patterny-i-algoritmy/fsm.svg"
    alt="Схема конечного автомата врага с состояниями Idle, Patrol, Chase, Attack, Stunned и Dead"
    width="900"
  >
  <figcaption>
    Переходы читаются как «из состояния A в B по условию».
    Авторская схема для Дока ИСИП.
  </figcaption>
</figure>

## Реализация

Для небольшого автомата достаточно `enum` и `switch`. Важно, чтобы смена
состояния шла через один метод: тогда легко логировать переходы и не забывать
про `Exit`.

```csharp
public enum EnemyState
{
    Idle,
    Patrol,
    Chase,
    Attack,
    Stunned,
    Dead
}

public sealed class EnemyBrain
{
    private EnemyState _state = EnemyState.Idle;
    private float _stateTime;

    public void Tick(float dt, bool seesPlayer, float distance, bool stunned, int hp)
    {
        _stateTime += dt;

        if (hp <= 0 && _state != EnemyState.Dead)
        {
            Change(EnemyState.Dead);
            return;
        }

        switch (_state)
        {
            case EnemyState.Idle:
                if (seesPlayer) Change(EnemyState.Chase);
                else if (_stateTime > 2f) Change(EnemyState.Patrol);
                break;

            case EnemyState.Patrol:
                if (seesPlayer) Change(EnemyState.Chase);
                break;

            case EnemyState.Chase:
                if (stunned) Change(EnemyState.Stunned);
                else if (distance < 2f) Change(EnemyState.Attack);
                break;

            case EnemyState.Attack:
                if (stunned) Change(EnemyState.Stunned);
                else if (distance > 3f) Change(EnemyState.Chase);
                break;

            case EnemyState.Stunned:
                if (_stateTime > 1.5f) Change(EnemyState.Patrol);
                break;
        }
    }

    private void Change(EnemyState next)
    {
        OnExit(_state);
        _state = next;
        _stateTime = 0f;
        OnEnter(next);
    }

    private void OnEnter(EnemyState state) { /* включить поведение */ }
    private void OnExit(EnemyState state) { /* выключить поведение */ }
}
```

Порядок проверок внутри `switch` — это приоритет правил. Если стан должен
прерывать атаку, проверяйте его раньше условия дистанции.

## Иерархия и данные

Когда состояний становится больше десяти, плоский список начинает путаться.
Тогда вводят **иерархические автоматы**: верхний уровень отвечает за крупный
режим (`Alive`, `Dead`, `Cutscene`), вложенный — за движение (`Idle`, `Run`,
`Jump`) или бой (`Aim`, `Attack`, `Reload`).

Полезные приёмы:

- хранить имя состояния в `enum`, а не в строке — компилятор поймает опечатку;
- вынести параметры (скорость, длительность стана) в данные, а не в код;
- добавить отладочный вывод `A → B` при каждом переходе;
- предусмотреть «аварийный» переход в `Dead` из любого состояния.

Для сложного поведения с десятками условий FSM уступает behavior tree или
utility AI: там переходы не прописывают попарно. Но для врага, двери, лифта и
экрана меню конечного автомата почти всегда достаточно.

## Частые ошибки

- **Два состояния одновременно.** Причина — флаги вместо одного активного
  состояния.
- **Нет `Exit`.** Эффекты и подписки остаются включёнными после смены режима.
- **Переход внутри `Tick` без `return`.** После смены состояния код продолжает
  выполняться по старой ветке.
- **Условия перехода разбросаны по классу.** Через месяц никто не помнит, кто
  включает `Attack`.
- **Нет терминального состояния.** Персонаж с нулевым здоровьем продолжает
  патрулировать.
- **Слишком мелкие состояния.** `TurningLeft` и `TurningRight` лучше оставить
  параметрами движения, а не отдельными режимами.

## Проверь себя

```quiz
{
  "type": "radio",
  "question": "Что описывает переход в конечном автомате?",
  "options": [
    {
      "text": "Условие и состояние, в которое нужно перейти",
      "correct": true,
      "explanation": "Переход срабатывает по guard-условию и меняет активное состояние."
    },
    {
      "text": "Только текущее состояние",
      "correct": false,
      "explanation": "Текущее состояние — это узел, а не правило перехода."
    },
    {
      "text": "Номер кадра анимации",
      "correct": false,
      "explanation": "Анимация может зависеть от состояния, но не заменяет его."
    }
  ],
  "explanation": "Переход — это правило «из A в B при условии C»."
}
```

```quiz
{
  "type": "checkbox",
  "question": "Что помогает поддерживать конечный автомат в порядке?",
  "options": [
    {
      "text": "Отдельные методы входа и выхода",
      "correct": true
    },
    {
      "text": "Хранение активного состояния в `enum` или отдельном классе",
      "correct": true
    },
    {
      "text": "Проверка всех флагов в каждом кадре",
      "correct": false,
      "explanation": "Именно от этого FSM и избавляет: активное состояние одно."
    },
    {
      "text": "Логирование каждого перехода",
      "correct": true
    }
  ],
  "explanation": "Явные состояния, парные Enter/Exit и логи делают поведение предсказуемым."
}
```

## Куда дальше

- [AI: патруль и поведение](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/ai-patrul-i-povedenie.md)
- [Game feel](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/game-feel.md)
- [Управление и камера](theme.html?path=content/igrostroenie/igrovye-patterny-i-algoritmy/upravlenie-i-kamera.md)
- [Core loop](theme.html?path=content/igrostroenie/principy-geymdizayna/core-loop.md)
