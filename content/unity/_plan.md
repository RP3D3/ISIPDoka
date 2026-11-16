# Unity: план курса и совместимость Unity 2022.3 / Unity 6

Черновик структуры области **Unity** для Дока ИСИП. Файл начинается с `_`, поэтому
синхронизация структуры его не видит: это план, а не тема.

## 1. Цель курса

Провести человека от нуля до небольшой, но законченной 3D-игры на C#:

- понять редактор Unity и модель «сцена → GameObject → компонент»;
- научиться писать игровые скрипты на C#, а не только консольные программы;
- освоить ввод, физику, камеру, UI, звук и сборку проекта;
- отдельно разобраться, чем Unity 2022.3 LTS отличается от Unity 6 и как писать
  код, который работает в обеих версиях.

Курс не про моделирование, риггинг и сложный геймдизайн. Для примеров используем
примитивы Unity (Cube, Sphere, Capsule), бесплатные материалы и простые скрипты.
3D — основной трек, 2D — отдельный опциональный модуль.

## 2. Аудитория и предварительные требования

Основная аудитория — те, кто прошёл C# до классов и объектов. Желательно, но не
обязательно, чтобы были пройдены:

- наследование и полиморфизм;
- делегаты, лямбды и события;
- коллекции `List<T>` и `Dictionary<TKey, TValue>`;
- исключения и отладка.

Если этих тем нет, в курсе есть группа **«C#-мост для Unity»**: она объясняет
только те вещи из C#, без которых не читается код Unity. Её можно пропустить,
если соответствующие темы C# уже пройдены.

## 3. Версионная политика

| Решение | Правило |
|---|---|
| Основная версия | Unity 6 LTS, линейка `6000.0.x` |
| Поддерживаемая версия | Unity 2022.3 LTS |
| Главный принцип | Совместимость зависит не только от редактора, но и от версии пакета |
| Код примеров | Сначала API, доступное в обеих версиях; если API изменился — один compat-слой или блок с `#if` |
| Версионные вставки | В каждой затронутой теме — блок «Версии Unity» с двумя вариантами |
| Input | Только новый Input System; старый `Input.*` — только в заметке «как читать старые туториалы» |
| Rigidbody | В Unity 6 не используем `velocity`, `drag`, `angularDrag`; в 2022.3 — используем, но прячем за compat-слоем |
| Поиск объектов | В новых темах не используем `FindObjectOfType`; по возможности — ссылки через Inspector |
| Cinemachine | Стандарт — Cinemachine 3.x: он поддерживает и 2022.3, и Unity 6 |
| UI | TextMeshPro; legacy `UnityEngine.UI.Text` не используем |
| Рендер | URP, стандартный Lit и Volume; кастомные render passes — вне курса |
| Скриншоты | Официальные из документации Unity с ссылкой на источник под каждым; свои — если нужна конкретная версия или аннотация |
| Проверка | Каждый пример кода проверяется в 2022.3 и 6000.0; расхождения фиксируются в матрице |

### Почему не «просто Unity 6»

Unity 2022.3 LTS всё ещё используется в учебных и рабочих проектах. Если писать
курс только под Unity 6, половина аудитории не сможет повторить примеры. Если
писать только под 2022.3, курс будет учить устаревшим API. Поэтому:

- **основной текст** — Unity 6;
- **вторая вкладка/блок** — 2022.3;
- **общая часть** — compat-класс, который прячет различия в одном месте.

## 4. Матрица совместимости

| Что | Unity 2022.3 LTS | Unity 6 | Решение в курсе |
|---|---|---|---|
| `Rigidbody` скорость | `velocity` | `linearVelocity` | compat-метод `GetVelocity/SetVelocity` |
| `Rigidbody` сопротивление | `drag`, `angularDrag` | `linearDamping`, `angularDamping` | compat-метод `SetDamping` |
| `Rigidbody2D` скорость | `velocity` | `linearVelocity` | тот же подход для 2D |
| `Rigidbody2D` сопротивление | `drag`, `angularDrag` | `linearDamping`, `angularDamping` | тот же подход для 2D |
| Поиск объектов | `FindObjectOfType`, `FindObjectsOfType` | `FindFirstObjectByType`, `FindAnyObjectByType`, `FindObjectsByType` | не ищем в уроках; если нужно — compat-метод |
| Input System | пакет 1.7+; project-wide actions в 1.7 были предварительными | пакет 1.11+; project-wide actions стабильны | основной путь — `.inputactions` asset; project-wide — отдельная тема |
| Старый `Input.*` | работает при Active Input Handling = Old/Both | работает только при Old/Both; при New бросает исключение | в новых примерах не используем |
| `EventSystem` | часто `StandaloneInputModule` | при включённом Input System создаётся `InputSystemUIInputModule` | в 2022.3 меняем модуль вручную |
| Cinemachine | 2.x — старая ветка; 3.x поддерживает 2022.3+ | 3.x | ставим Cinemachine 3.x в обе версии |
| TextMeshPro | отдельный пакет `com.unity.textmeshpro` 3.x | входит в `com.unity.ugui` 2.x | используем `TMPro`, импортируем Essentials |
| URP | URP 14.x | URP 17.x | стандартный Lit/Volume, без кастомных проходов |
| Сборка | `File → Build Settings` | `File → Build Profiles` | показываем оба пути |
| Физика, крутящий момент | старое поведение | изменилось для `AddForceAtPosition`/`AddExplosionForce` с `VelocityChange`/`Acceleration` | в базовых примерах `Force`/`Impulse`, отдельная заметка |

### Важное про физику Unity 6

В Unity 6 изменился расчёт крутящего момента у `Rigidbody.AddForceAtPosition` и
`Rigidbody.AddExplosionForce` при `ForceMode.VelocityChange` и
`ForceMode.Acceleration`. Это не ошибка компиляции, а другое поведение. В курсе:

- базовые примеры используют `ForceMode.Force` и `ForceMode.Impulse`;
- в теме про силы есть предупреждение и способ воспроизвести старое поведение;
- это не ломает учебные сцены, но важно для тех, кто переносит проект с 2022.3.

## 5. Структура курса

| Order | Группа | Тем | Практика | Приоритет |
|---:|---|---:|---|---|
| 10 | Старт и версии | 7 | да | MVP |
| 20 | Сцены и объекты | 7 | да | MVP |
| — | C#-мост для Unity | 6 | нет | опционально |
| 40 | Скрипты и жизненный цикл | 8 | да | MVP |
| 50 | Ввод: Input System | 9 | да | MVP |
| 60 | Физика 3D | 9 | да | MVP |
| 70 | Камера, свет и материалы | 6 | да | MVP (базово) |
| 80 | UI и интерфейс | 6 | да | MVP |
| 90 | Анимация, звук и эффекты | 6 | да | v2 |
| 100 | Игровая логика и архитектура | 7 | да | MVP |
| 110 | Сборка, отладка и оптимизация | 6 | да | MVP |
| 120 | Капстон: 3D-игра | 6 | да | MVP |
| 130 | 2D-трек | 6 | да | опционально |
| 140 | Версии и миграция | 6 | нет | справочник |

Всего около **107 тем**, включая практикумы. Если делать MVP, можно сначала
взять группы 10, 20, 40, 50, 60, 80, 100, 110 и 120, а из группы 70 — базовые
темы про камеру и свет. Это примерно **78 тем**, и уже играбельный проект.
Cinemachine, пост-обработку, анимацию и 2D можно добавить позже.

C#-мост — опциональная группа: её можно вставить позже, если ученику нужен
отдельный переход от C# к Unity. Для MVP она не обязательна.

В каждой группе последние две темы:

1. **Итог** — заголовок совпадает с названием группы, чтобы на странице области
   появился бейдж «Итог».
2. **Практика: ...** — 3–5 заданий в редакторе и мини-тест.

## 6. Группы и темы

### 10. Старт и версии

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Что такое Unity | Движок, редактор, сцена, GameObject, компонент; чем Unity отличается от консольного C# | — |
| 2 | Unity 2022 LTS и Unity 6 | LTS, номера версий, `6000.x`, что меняется, какой редактор выбрать; политика курса | 2022.3 / 6000.0 |
| 3 | Установка и первый проект | Unity Hub, модули, шаблон 3D (URP) / Universal 3D, создание проекта, версия редактора | шаблоны отличаются |
| 4 | Окна редактора | Hierarchy, Scene, Game, Inspector, Project, Console; сохранение layout | — |
| 5 | Сцена, GameObject, компонент | Иерархия, Transform, компоненты, Play Mode, что сохраняется | — |
| 6 | Папка Assets и метаданные | `Assets`, `.meta`, `Library`, `ProjectSettings`, `Packages`; что коммитить | — |
| 7 | Старт и версии | Повторение: Unity, версии, окна, GameObject, Assets, `.meta` | — |
| 8 | Практика: первый проект | Создать проект, сцену, куб, материал, запустить | — |

### C#-мост для Unity (опционально)

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Классы и MonoBehaviour | Наследование от `MonoBehaviour`, компонент, `gameObject`, `transform` | — |
| 2 | Поля, свойства и SerializeField | `[SerializeField]`, private/public, Inspector, `[Range]`, `[Header]` | — |
| 3 | Делегаты, события и лямбды | `Action`, `event`, `UnityEvent`, подписка и отписка | — |
| 4 | Коллекции в игре | `List<T>`, `Dictionary<TKey, TValue>`, массивы; что выбрать | — |
| 5 | Корутины и IEnumerator | `StartCoroutine`, `yield return`, `WaitForSeconds`, отличие от `Update` | — |
| 6 | Null и TryGetComponent | `null`, `TryGetComponent`, `GetComponent`, защита от `NullReferenceException` | — |

### Сцены и объекты

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | GameObjects и компоненты | Композиция, `AddComponent`, `GetComponent`, активность объекта | — |
| 2 | Transform | `position`, `rotation`, `localPosition`, `localScale`; `Translate`, `Rotate` | — |
| 3 | Локальные и мировые координаты | `TransformPoint`, `InverseTransformPoint`, оси, `Vector3` | — |
| 4 | Иерархия и родители | `SetParent`, `parent`, `root`, преобразования координат | — |
| 5 | Префабы | Создание, варианты, overrides, вложенные префабы | — |
| 6 | Теги, слои и порядок | Tags, Layers, culling mask, порядок отрисовки | — |
| 7 | Сцены и объекты | Повторение: GameObject, Transform, иерархия, префабы, теги, слои | — |
| 8 | Практика: сцена | Собрать комнату из примитивов, сделать префаб, выстроить иерархию | — |

### 40. Скрипты и жизненный цикл

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Первый скрипт | Создание, имя файла = имя класса, `MonoBehaviour`, запуск | — |
| 2 | Awake, OnEnable, Start | Порядок вызовов, инициализация, подписки | — |
| 3 | Update, FixedUpdate, LateUpdate | Кадры и физика, `Time.deltaTime`, камера | — |
| 4 | Поля в Inspector | `[SerializeField]`, `public`, `[HideInInspector]`, `[Range]` | — |
| 5 | Ссылки на компоненты | `GetComponent`, `TryGetComponent`, ссылки через Inspector | — |
| 6 | Debug и Console | `Debug.Log`, `LogWarning`, `LogError`, `DrawLine`, точки останова | — |
| 7 | Time и корутины | `timeScale`, `WaitForSeconds`, `WaitForFixedUpdate`, пауза | — |
| 8 | Скрипты и жизненный цикл | Повторение: MonoBehaviour, порядок вызовов, поля, Debug, корутины | — |
| 9 | Практика: жизненный цикл | Скрипт, который логирует этапы и двигает объект | — |

### 50. Ввод: Input System

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Старый и новый Input | Input Manager vs Input System; `Input.GetAxis`; Active Input Handling | 2022 / 6 |
| 2 | Установка и настройка | Package Manager, Input System 1.7+ / 1.11, перезапуск, настройка | 2022.3: 1.7+; 6: 1.11 |
| 3 | Actions, Action Maps, Bindings | Смысл действия vs устройство; карты Player/UI; bindings; composites | — |
| 4 | Control Schemes | Keyboard&Mouse, Gamepad, Touch; переключение | — |
| 5 | ReadValue и Callbacks | `ReadValue<T>`, `started/performed/canceled`, `CallbackContext` | — |
| 6 | PlayerInput и события | `PlayerInput`, Unity Events, C# Events, multiplayer | — |
| 7 | Generated C# class и Asset | Generate C# Class, `InputActionAsset`, `FindAction`, `Enable/Disable` | — |
| 8 | Project-wide Actions | `InputSystem.actions`, Project Settings; 2022.3 preliminary, Unity 6 stable | 2022.3: 1.7+; 6: stable |
| 9 | UI Input и touch | `InputSystemUIInputModule`, `OnScreenStick`, touch | 6: по умолчанию; 2022: вручную |
| 10 | Практика: управление | Движение персонажа, прыжок, камера, gamepad | — |

### 60. Физика 3D

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Rigidbody и Collider | Компоненты, mass, `isKinematic`, коллайдеры, physics material | — |
| 2 | Масса, гравитация, damping | `useGravity`, `linearDamping`, `angularDamping`, `constraints` | 2022: `drag`/`angularDrag`; 6: `linearDamping`/`angularDamping` |
| 3 | AddForce и ForceMode | `Force`, `Impulse`, `VelocityChange`, `Acceleration`; `FixedUpdate` | 6: изменился torque |
| 4 | linearVelocity | `linearVelocity`, прыжок, ограничение, `maxLinearVelocity` | 2022: `velocity`; 6: `linearVelocity` |
| 5 | Столкновения | `OnCollisionEnter/Stay/Exit`, `Collision`, relativeVelocity | — |
| 6 | Триггеры | `OnTriggerEnter/Stay/Exit`, `isTrigger`, слои | — |
| 7 | Слои, маски, Raycast | `LayerMask`, `Physics.Raycast`, `RaycastHit`, `QueryTriggerInteraction` | — |
| 8 | Кинематик и интерполяция | `isKinematic`, `MovePosition`, `MoveRotation`, `interpolation` | — |
| 9 | Версии физики | Сводка: velocity/drag → linearVelocity/linearDamping; torque; 2D | 2022.3 vs 6 |
| 10 | Практика: физический уровень | Платформа, мяч, триггер, прыжок | — |

### 70. Камера, свет и материалы

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Камера | Projection, FOV, clipping, background, culling mask | — |
| 2 | Простая камера следования | `LateUpdate`, `LookAt`, `Vector3.Lerp`, offset | — |
| 3 | Cinemachine 3 | `CinemachineCamera`, `CinemachineFollow`, `CinemachineOrbitalFollow`, `CinemachineBrain` | 3.x поддерживает 2022.3+; не смешивать с 2.x |
| 4 | Свет и тени | Directional/Point/Spot, intensity, shadows, lightmapping | — |
| 5 | Материалы и URP | URP Lit, albedo, metallic, smoothness, emission | URP 14 / 17 |
| 6 | Пост-обработка | URP Volume, Bloom, Vignette, Color Adjustments | опционально; зависит от URP |
| 7 | Практика: камера и свет | Собрать сцену с камерой и освещением | — |

### 80. UI и интерфейс

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Canvas | Screen Space Overlay/Camera, World Space, Canvas Scaler | — |
| 2 | TextMeshPro | TMP-компоненты, шрифты, TMP Essentials | 2022: отдельный пакет; 6: uGUI 2.x |
| 3 | Кнопки и события | Button, Slider, Image, `onClick`, `UnityEvent` | — |
| 4 | HUD | Health bar, score, timer, anchors | — |
| 5 | Меню и пауза | Panels, `Time.timeScale`, переходы между сценами | — |
| 6 | EventSystem и Input Module | `InputSystemUIInputModule`, `StandaloneInputModule` | 6: по умолчанию; 2022: вручную |
| 7 | Практика: HUD | Собрать HUD и меню паузы | — |

### 90. Анимация, звук и эффекты

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Animator | Animator Controller, states, parameters, transitions | — |
| 2 | Animation Clips | Запись клипов, loop, speed, root motion | — |
| 3 | Animation Events | Вызов методов по таймингу | — |
| 4 | AudioSource | 2D/3D-звук, spatialBlend, pitch, volume | — |
| 5 | AudioMixer | Группы, snapshots, громкость | — |
| 6 | Particle System | Emission, shape, lifetime, collision; визуальный отклик | — |
| 7 | Практика: оживить | Анимация, звук, эффект | — |

### 100. Игровая логика и архитектура

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | GameManager | Состояния игры, singleton vs ссылка через Inspector | — |
| 2 | Счёт и здоровье | События, обновление UI, damage/heal | — |
| 3 | Делегаты и события | `Action`, `event`, `UnityEvent`, отписка | — |
| 4 | ScriptableObject | Конфиги, предметы, данные врагов, `CreateAssetMenu` | — |
| 5 | Пулинг и спавн | `Instantiate`/`Destroy` vs пул, spawn points | — |
| 6 | Сохранение | PlayerPrefs, JSON, `Application.persistentDataPath` | — |
| 7 | Загрузка сцен | `SceneManager.LoadScene`, async, loading screen | — |
| 8 | Практика: игровой цикл | Счёт, здоровье, победа/поражение | — |

### 110. Сборка, отладка и оптимизация

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Build Profiles / Build Settings | `File → Build Profiles` в Unity 6, `Build Settings` в 2022.3; список сцен | 2022 / 6 |
| 2 | Player Settings | Company/product, resolution, splash, scripting backend | — |
| 3 | Profiler | CPU/GPU/memory, deep profile, frame debugger | — |
| 4 | Частые ошибки | Missing references, не та сцена, input handling, пакеты | — |
| 5 | Оптимизация | Batching, текстуры, звук, количество объектов, пулинг | — |
| 6 | Публикация | Build, zip, itch.io/GitHub, чек-лист | — |
| 7 | Практика: собрать игру | Собрать и запустить билд | — |

### 120. Капстон: 3D-игра

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Дизайн и сценарий | Core loop, рамки проекта, ассеты, этапы | — |
| 2 | Игрок и управление | Движение, прыжок, камера, Input System | — |
| 3 | Предметы и счёт | Collectibles, триггеры, UI, звук | — |
| 4 | Враги и опасности | Простой AI, урон, respawn | — |
| 5 | UI, звук, меню | HUD, пауза, победа/поражение | — |
| 6 | Сборка и защита | Билд, README, демонстрация | — |
| 7 | Практика: самостоятельная работа | Чек-лист и задания на расширение | — |

### 130. 2D-трек (опционально)

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | 2D-проект и Sprite | 2D-шаблон, Sprite Renderer, sorting layers | — |
| 2 | Rigidbody2D и Collider2D | `linearVelocity`, `linearDamping`, `gravityScale` | 2022: `velocity`/`drag`; 6: `linearVelocity`/`linearDamping` |
| 3 | 2D-движение и прыжок | Ground check, raycast, coyote time | — |
| 4 | 2D-анимация | Sprite animation, Animator | — |
| 5 | 2D-камера и паралакс | Orthographic camera, follow, parallax | — |
| 6 | 2D-UI и цикл | Счёт, здоровье, победа/поражение | — |
| 7 | Практика: 2D-платформер | Мини-проект | — |

### 140. Версии и миграция (справочник)

| № | Тема | Содержание | Версии |
|---:|---|---|---|
| 1 | Матрица API | Таблица 2022.3 vs Unity 6 по ключевым API | — |
| 2 | Препроцессор и compat | `#if UNITY_6000_0_OR_NEWER`, `UNITY_2022_3_OR_NEWER`, helper-класс | — |
| 3 | Миграция 2022 → 6 | API Updater, обновление пакетов, reimport, проверка | — |
| 4 | Пакеты и версии | Input System, Cinemachine, URP, TMP, lock-файл | — |
| 5 | Частые ошибки после апгрейда | Compile errors, missing references, input, physics | — |
| 6 | Чек-лист совместимости | Что проверить до и после перехода | — |

## 7. Практика и проекты

Практикум в Unity — это не 10 коротких задач, как в C#, а **3–5 шагов
в редакторе** с проверяемым результатом. Один шаг может занимать несколько
минут: создать сцену, добавить компонент, написать скрипт, проверить.

Формат практикума:

1. цель;
2. пошаговая инструкция;
3. ожидаемый результат;
4. чек-лист;
5. 2–3 частые ошибки;
6. мини-тест в конце.

### Шаблон обычной темы

1. `#` — название темы.
2. Короткое введение: зачем это нужно в игре.
3. «Что получится» — один абзац или скриншот результата.
4. Пошаговые действия в редакторе.
5. Код с комментариями только по делу.
6. Блок «Версии Unity», если API отличается.
7. «Частые ошибки» — 2–4 пункта.
8. «Проверь себя» — 2 вопроса в `quiz`-блоках.
9. «Куда дальше» — 2–3 ссылки на следующие темы.

Пример версионного блока:

```markdown
> [!NOTE] Версии Unity
> **Unity 2022.3:** `rb.velocity = new Vector3(...)`.
> **Unity 6:** `rb.linearVelocity = new Vector3(...)`.
> В курсе оба варианта спрятаны в `RigidbodyCompat`.
```

### Картинки и источники

- Папка группы: `content/unity/_assets/<group-id>/`.
- Скриншоты: официальные изображения Unity Documentation, под каждым — ссылка
  на страницу-источник.
- Схемы: SVG, авторские, без внешнего источника.
- Вставка: `<figure class="md-figure md-figure--center md-figure--medium">`
  с `<figcaption>` и `<a class="md-figure-source">`.
- Для каждой группы — `SOURCES.md` со списком файлов и ссылок.
- Не используем `../` в пути картинки: путь считается от корня сайта,
  например `content/unity/_assets/start-i-versii/unity-hub.png`.

Капстон — отдельная игра «Собери кристаллы»:

- игрок на плоскости с прыжком и камерой;
- собираемые предметы, счёт и таймер;
- простые враги или опасные зоны;
- HUD, пауза, победа/поражение;
- звук и простые эффекты;
- сборка билда и README.

2D-трек — опциональный мини-платформер. Он не дублирует 3D-физику, а показывает
те же идеи на `Rigidbody2D` и `Collider2D`.

## 8. Совместимость в коде

### 8.1. Rigidbody 3D

```csharp
using UnityEngine;

public static class RigidbodyCompat
{
    public static Vector3 GetVelocity(this Rigidbody rb)
    {
#if UNITY_6000_0_OR_NEWER
        return rb.linearVelocity;
#else
        return rb.velocity;
#endif
    }

    public static void SetVelocity(this Rigidbody rb, Vector3 value)
    {
#if UNITY_6000_0_OR_NEWER
        rb.linearVelocity = value;
#else
        rb.velocity = value;
#endif
    }

    public static void SetDamping(this Rigidbody rb, float linear, float angular)
    {
#if UNITY_6000_0_OR_NEWER
        rb.linearDamping = linear;
        rb.angularDamping = angular;
#else
        rb.drag = linear;
        rb.angularDrag = angular;
#endif
    }
}
```

В уроках основной код может выглядеть так:

```csharp
_rb.SetVelocity(new Vector3(move.x * _speed, _rb.GetVelocity().y, move.z * _speed));
```

Так пример работает в обеих версиях, а различия видны в одном файле.

### 8.2. Rigidbody2D

```csharp
using UnityEngine;

public static class Rigidbody2DCompat
{
    public static Vector2 GetVelocity(this Rigidbody2D rb)
    {
#if UNITY_6000_0_OR_NEWER
        return rb.linearVelocity;
#else
        return rb.velocity;
#endif
    }

    public static void SetVelocity(this Rigidbody2D rb, Vector2 value)
    {
#if UNITY_6000_0_OR_NEWER
        rb.linearVelocity = value;
#else
        rb.velocity = value;
#endif
    }

    public static void SetDamping(this Rigidbody2D rb, float linear, float angular)
    {
#if UNITY_6000_0_OR_NEWER
        rb.linearDamping = linear;
        rb.angularDamping = angular;
#else
        rb.drag = linear;
        rb.angularDrag = angular;
#endif
    }
}
```

### 8.3. Поиск объектов

В новых темах лучше вообще не искать объекты через `Find*`, а передавать ссылки
через Inspector. Если поиск действительно нужен:

```csharp
using UnityEngine;

public static class ObjectCompat
{
    public static T FindFirst<T>() where T : Object
    {
#if UNITY_2023_1_OR_NEWER
        return Object.FindFirstObjectByType<T>();
#else
        return Object.FindObjectOfType<T>();
#endif
    }
}
```

`FindFirstObjectByType` появился в Unity 2023.1, поэтому условие именно
`UNITY_2023_1_OR_NEWER`, а не только `UNITY_6000_0_OR_NEWER`.

### 8.4. Input System

Общий для обеих версий путь — `.inputactions` asset и ссылка на него:

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerInputReader : MonoBehaviour
{
    [SerializeField] private InputActionAsset _actions;
    private InputAction _move;

    private void Awake()
    {
        _move = _actions.FindAction("Player/Move");
    }

    private void OnEnable() => _move.Enable();
    private void OnDisable() => _move.Disable();

    private void Update()
    {
        Vector2 value = _move.ReadValue<Vector2>();
        // ...
    }
}
```

Project-wide actions — отдельная тема:

```csharp
var move = InputSystem.actions.FindAction("Player/Move");
```

В 2022.3 это работает с Input System 1.7+ и считается предварительным API;
в Unity 6 — стабильный рекомендуемый путь. Поэтому основной пример — asset,
а project-wide actions показываем как современный вариант для Unity 6.

### 8.5. Cinemachine

Cinemachine 3.x поддерживает Unity 2022.3 LTS и Unity 6, поэтому в курсе
используем именно 3.x:

```csharp
using Unity.Cinemachine;
```

В 2.x namespace был `Cinemachine`, а камера называлась
`CinemachineVirtualCamera`. Эти имена в курсе не используем, кроме отдельной
таблицы миграции.

### 8.6. TextMeshPro

```csharp
using TMPro;

[SerializeField] private TMP_Text _scoreText;
```

В 2022.3 TMP — отдельный пакет, нужно импортировать TMP Essentials. В Unity 6
TMP входит в `com.unity.ugui` 2.x. API `TMPro` общий.

## 9. Приоритеты внедрения

### Этап 1 — MVP

- «Старт и версии»;
- «Сцены и объекты»;
- «Скрипты и жизненный цикл»;
- «Ввод: Input System»;
- «Физика 3D»;
- «Камера, свет и материалы» — базовые темы про камеру и свет;
- «UI и интерфейс»;
- «Игровая логика и архитектура»;
- «Сборка, отладка и оптимизация» — хотя бы базово;
- «Капстон: 3D-игра».

Этого достаточно, чтобы собрать играбельный прототип и проверить методику.
Если C#-мост нужен, он идёт перед MVP: без делегатов и коллекций часть кода
Input System и игровой логики будет непонятна.

### Этап 2 — расширение

- «C#-мост для Unity»;
- Cinemachine 3 и пост-обработка;
- «Анимация, звук и эффекты»;
- углубление UI и оптимизации.

### Этап 3 — опции

- «2D-трек»;
- полный справочник «Версии и миграция»;
- дополнительные темы по NavMesh, Addressables, UI Toolkit, если появится запрос.

## 10. Риски и как их снимать

| Риск | Решение |
|---|---|
| API разъезжается между 2022.3 и 6 | compat-слой, `#if`, матрица API, проверка примеров в двух версиях |
| Разные версии пакетов | фиксируем версии в `manifest.json`, пишем их в начале курса |
| Скриншоты устаревают | минимум скриншотов, ссылка на источник, SVG для схем |
| Cinemachine 2.x у ученика | курс использует 3.x; отдельная инструкция «если у вас 2.x» |
| Input System 1.6 в старом проекте | требуем 1.7+; иначе asset-based путь и без project-wide actions |
| URP-версии | только стандартный Lit и Volume, без кастомных render passes |
| Слишком большой курс | MVP из 10 групп, остальное — этапы 2–3 |
| Проект тяжело проверять автоматически | небольшой тестовый проект, ручной чек-лист, компиляция примеров |
| Ассеты и лицензии | примитивы Unity и бесплатные ассеты с указанием лицензии |

## 11. Следующие шаги

1. Согласовать список групп и приоритет MVP.
2. Создать `meta.json` групп с seed-порядком и первые темы.
3. Сделать учебный Unity-проект с compat-слоем и двумя ветками/профилями.
4. Написать первую группу «Старт и версии» и проверить её в 2022.3 и Unity 6.
5. Прогнать `npm run sync`, проверить структуру и поиск.
6. После первой группы — решить, идти по MVP или сразу расширять.

## 12. Что проверить перед стартом

- [ ] Unity 6 LTS и Unity 2022.3 LTS установлены.
- [ ] Input System 1.7+ (2022.3) и 1.11+ (Unity 6) доступны.
- [ ] Cinemachine 3.x ставится в обе версии.
- [ ] TextMeshPro Essentials импортируется.
- [ ] Выбран шаблон: 3D (URP) / Universal 3D как основной, Built-in как запасной.
- [ ] Есть тестовый проект с `RigidbodyCompat` и `Rigidbody2DCompat`.
- [ ] Для каждой группы есть `content/unity/_assets/<group-id>/` и `SOURCES.md`.
- [ ] Скриншоты вставлены через `figure` с подписью и ссылкой на источник.
- [ ] Схемы сделаны в SVG и не требуют внешней ссылки.
