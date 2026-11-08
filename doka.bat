@echo off
chcp 65001 >nul
setlocal EnableExtensions
cd /d "%~dp0"
set "PROJECT_DIR=%CD%"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [Ошибка] Node.js не найден в PATH.
  echo Установите Node.js и запустите консоль снова.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo.
  echo [Ошибка] npm не найден в PATH.
  echo.
  pause
  exit /b 1
)

if not "%~1"=="" goto dispatch

:menu
cls
echo ============================================================
echo   Дока ИСИП - консоль управления
echo ============================================================
echo.
node scripts\status.js
call :server_status
echo.
echo ------------------------------------------------------------
echo   1. Запустить dev-сервер (без обновлений)
echo   2. Запустить с обновлением структуры (sync + dev)
echo   3. Запустить с обновлением и векторизацией (sync + build + dev)
echo   4. Синхронизировать структуру (sync)
echo   5. Пересобрать эмбеддинги (build:embeddings)
echo   6. Синхронизировать + пересобрать эмбеддинги
echo   7. Проверить семантический поиск (test:semantic)
echo   8. Открыть сайт в браузере (запустит сервер при необходимости)
echo   9. Остановить dev-сервер
echo  10. Установить/обновить зависимости (npm install)
echo  11. Дополнительно (dry-run, reset, apply-html-order, JS check)
echo   0. Выход
echo ------------------------------------------------------------
set "choice="
set /p "choice=Выберите пункт: "
if not defined choice goto end
if "%choice%"=="1" goto menu_run
if "%choice%"=="2" goto menu_run_sync
if "%choice%"=="3" goto menu_run_update
if "%choice%"=="4" goto menu_sync
if "%choice%"=="5" goto menu_build
if "%choice%"=="6" goto menu_sync_build
if "%choice%"=="7" goto menu_test
if "%choice%"=="8" goto menu_open
if "%choice%"=="9" goto menu_stop
if "%choice%"=="10" goto menu_install
if "%choice%"=="11" goto extra_menu
if "%choice%"=="0" goto end
echo.
echo Неизвестный пункт: %choice%
pause
goto menu

:menu_run
call :ensure_server
if not errorlevel 1 start "" "http://127.0.0.1:5173/"
pause
goto menu

:menu_run_sync
call :sync
if errorlevel 1 (
  pause
  goto menu
)
call :ensure_server
if not errorlevel 1 start "" "http://127.0.0.1:5173/"
pause
goto menu

:menu_run_update
call :sync
if errorlevel 1 (
  pause
  goto menu
)
call :build
if errorlevel 1 (
  pause
  goto menu
)
call :ensure_server
if not errorlevel 1 start "" "http://127.0.0.1:5173/"
pause
goto menu

:menu_sync
call :sync
pause
goto menu

:menu_build
call :build
pause
goto menu

:menu_sync_build
call :sync
if errorlevel 1 (
  pause
  goto menu
)
call :build
pause
goto menu

:menu_test
echo.
echo === Семантический тест ===
call npm run test:semantic
pause
goto menu

:menu_open
call :open_site
pause
goto menu

:menu_stop
call :stop_server
pause
goto menu

:menu_install
echo.
echo === Установка зависимостей ===
call npm install
if errorlevel 1 echo [Ошибка] npm install завершился с ошибкой.
pause
goto menu

REM ------------------------------------------------------------------
REM Служебные подпрограммы
REM ------------------------------------------------------------------

:sync
echo.
echo === Синхронизация structure.json ===
call npm run sync
if errorlevel 1 (
  echo.
  echo [Ошибка] Синхронизация завершилась с ошибкой.
  exit /b 1
)
echo.
echo Готово.
exit /b 0

:build
echo.
echo === Пересборка embeddings.json ===
call npm run build:embeddings
if errorlevel 1 (
  echo.
  echo [Ошибка] Пересборка эмбеддингов завершилась с ошибкой.
  exit /b 1
)
echo.
echo Готово.
exit /b 0

REM Возвращает PID слушающего сервера в SERVER_PID (пусто, если сервера нет).
REM Важно: учитываем только состояние LISTENING на локальном адресе 127.0.0.1:5173.
REM Строки TIME_WAIT и клиентские соединения браузера к этому порту сервером
REM не считаются — из-за них раньше статус врал «запущен», а остановка не работала.
:server_pid
set "SERVER_PID="
for /f "tokens=2,4,5" %%a in ('netstat -ano -p tcp ^| findstr /C:":5173"') do (
  if /I "%%a"=="127.0.0.1:5173" if /I "%%b"=="LISTENING" set "SERVER_PID=%%c"
)
exit /b 0

:ensure_server
call :server_pid
if defined SERVER_PID goto ensure_server_running
echo Запускаю dev-сервер в отдельном окне "Doka ISIP dev"...
REM Запускаем node напрямую, а не через npm: npm перезаписывает заголовок
REM окна на "npm run dev", и потом его не найти ни в панели задач, ни для taskkill.
start "Doka ISIP dev" /D "%PROJECT_DIR%" cmd /k "title Doka ISIP dev & node scripts\dev-server.js"
set /a "SERVER_TRIES=0"
:ensure_server_wait
ping -n 2 127.0.0.1 >nul
call :server_pid
if defined SERVER_PID goto ensure_server_started
set /a "SERVER_TRIES+=1"
if %SERVER_TRIES% lss 20 goto ensure_server_wait
echo [Ошибка] Dev-сервер не поднялся за 20 секунд.
echo Откройте окно "Doka ISIP dev" — в нём будет текст ошибки.
exit /b 1

:ensure_server_started
echo Dev-сервер запущен ^(PID %SERVER_PID%^): http://127.0.0.1:5173/
exit /b 0

:ensure_server_running
echo Dev-сервер уже запущен ^(PID %SERVER_PID%^): http://127.0.0.1:5173/
exit /b 0

:open_site
call :ensure_server
if errorlevel 1 exit /b 1
start "" "http://127.0.0.1:5173/"
exit /b 0

:stop_server
call :server_pid
if not defined SERVER_PID goto stop_server_off

echo Останавливаю dev-сервер ^(PID %SERVER_PID%^)...
taskkill /PID %SERVER_PID% /T /F >nul 2>&1
if errorlevel 1 (
  echo [Ошибка] Не удалось остановить процесс PID %SERVER_PID%.
  echo Возможно, он запущен от имени другого пользователя или администратора.
  echo Закройте его вручную в Диспетчере задач.
  exit /b 1
)

REM Закрываем и окно консоли, если оно осталось после остановки node
taskkill /FI "WINDOWTITLE eq Doka ISIP dev*" /T /F >nul 2>&1

set /a "STOP_TRIES=0"
:stop_server_wait
ping -n 2 127.0.0.1 >nul
call :server_pid
if not defined SERVER_PID goto stop_server_done
set /a "STOP_TRIES+=1"
if %STOP_TRIES% lss 10 goto stop_server_wait
echo [Внимание] Порт 5173 всё ещё занят процессом PID %SERVER_PID%.
exit /b 1

:stop_server_done
echo Dev-сервер остановлен.
exit /b 0

:stop_server_off
REM Сервера нет, но могло остаться окно консоли от прошлого запуска
taskkill /FI "WINDOWTITLE eq Doka ISIP dev*" /T /F >nul 2>&1
echo Dev-сервер не запущен.
exit /b 0

:server_status
call :server_pid
if not defined SERVER_PID goto server_status_off
echo   Dev-сервер               : запущен - http://127.0.0.1:5173/ ^(PID %SERVER_PID%^)
exit /b 0
:server_status_off
echo   Dev-сервер               : не запущен
exit /b 0

REM ------------------------------------------------------------------
REM Дополнительное меню
REM ------------------------------------------------------------------

:extra_menu
cls
echo ============================================================
echo   Дополнительно
echo ============================================================
echo.
echo   1. Dry-run синхронизации (ничего не пишет)
echo   2. Синхронизация с --apply-html-order
echo   3. Синхронизация с --reset (пересобрать порядок)
echo   4. Проверить синтаксис JS
echo   5. Открыть папку content
echo   6. Показать статус ещё раз
echo   0. Назад
echo.
set "extra="
set /p "extra=Выберите пункт: "
if not defined extra goto menu
if "%extra%"=="1" goto extra_dry
if "%extra%"=="2" goto extra_apply
if "%extra%"=="3" goto extra_reset
if "%extra%"=="4" goto extra_check
if "%extra%"=="5" goto extra_content
if "%extra%"=="6" goto extra_status
if "%extra%"=="0" goto menu
echo.
echo Неизвестный пункт: %extra%
pause
goto extra_menu

:extra_dry
echo.
node scripts\sync-structure.js --dry-run --verbose
pause
goto extra_menu

:extra_apply
echo.
echo ВНИМАНИЕ: порядок существующих тем будет взят из HTML, если там есть seed.
set "confirm="
set /p "confirm=Продолжить? (y/N): "
if /I not "%confirm%"=="y" goto extra_menu
node scripts\sync-structure.js --apply-html-order
pause
goto extra_menu

:extra_reset
echo.
echo ВНИМАНИЕ: порядок будет пересобран с нуля (--reset).
set "confirm="
set /p "confirm=Продолжить? (y/N): "
if /I not "%confirm%"=="y" goto extra_menu
node scripts\sync-structure.js --reset
pause
goto extra_menu

:extra_check
echo.
node --check js\page.js
if errorlevel 1 echo [Ошибка] js\page.js
node --check js\search.js
if errorlevel 1 echo [Ошибка] js\search.js
node --check scripts\sync-structure.js
if errorlevel 1 echo [Ошибка] scripts\sync-structure.js
node --check scripts\build-embeddings.js
if errorlevel 1 echo [Ошибка] scripts\build-embeddings.js
node --check scripts\status.js
if errorlevel 1 echo [Ошибка] scripts\status.js
echo.
echo Проверка завершена.
pause
goto extra_menu

:extra_content
start "" explorer "%PROJECT_DIR%\content"
goto extra_menu

:extra_status
cls
node scripts\status.js
call :server_status
echo.
pause
goto extra_menu

REM ------------------------------------------------------------------
REM Быстрые команды: doka.bat run / sync / build / update / ...
REM ------------------------------------------------------------------

:dispatch
if /I "%~1"=="run" goto cmd_run
if /I "%~1"=="sync" goto cmd_sync
if /I "%~1"=="build" goto cmd_build
if /I "%~1"=="update" goto cmd_update
if /I "%~1"=="update-run" goto cmd_update_run
if /I "%~1"=="status" goto cmd_status
if /I "%~1"=="stop" goto cmd_stop
if /I "%~1"=="extra" goto extra_menu
echo.
echo Неизвестная команда: %~1
echo Доступно: run, sync, build, update, update-run, status, stop, extra
exit /b 1

:cmd_run
call :ensure_server
if not errorlevel 1 start "" "http://127.0.0.1:5173/"
exit /b 0

:cmd_sync
call :sync
exit /b %errorlevel%

:cmd_build
call :build
exit /b %errorlevel%

:cmd_update
call :sync
if errorlevel 1 exit /b 1
call :build
exit /b %errorlevel%

:cmd_update_run
call :sync
if errorlevel 1 exit /b 1
call :build
if errorlevel 1 exit /b 1
call :ensure_server
if not errorlevel 1 start "" "http://127.0.0.1:5173/"
exit /b 0

:cmd_status
cls
node scripts\status.js
call :server_status
echo.
pause
exit /b 0

:cmd_stop
call :stop_server
exit /b 0

:end
echo.
echo Выход.
endlocal
exit /b 0
