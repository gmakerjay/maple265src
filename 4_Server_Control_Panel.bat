@echo off
setlocal enabledelayedexpansion
title MapleStory Server Control Panel (SERVERGAMEOFFLINE-FACEBOOK PAGE)
color 0B
cd /d "%~dp0"

:menu
cls
echo ==============================================================================
echo                    SERVERGAMEOFFLINE-FACEBOOK PAGE                           
echo                   MapleStory Server Control Panel (Server263)                 
echo ==============================================================================
echo.
echo   [1] Start Server (Launch MariaDB + MapleStory Server)
echo   [2] Restart Server (Clean Restart All Services)
echo   [3] Stop Server (Safe Shutdown and Flush Database)
echo   [4] Edit Server Rates & Settings (Adjust DropRate, ExpRate in notepad)
echo   [5] Port Diagnostic & Change Port (Check and Auto-Fallback)
echo   [6] Reset / Re-import Database (vietmaple from backup.sql)
echo   [7] Open Client Patch Files Folder (Launcher and Localhost)
echo   [0] Exit
echo.
echo ==============================================================================
set /p "CHOICE=Select an option (0-7): "

if "!CHOICE!"=="1" goto :action_start
if "!CHOICE!"=="2" goto :action_restart
if "!CHOICE!"=="3" goto :action_stop
if "!CHOICE!"=="4" goto :action_config
if "!CHOICE!"=="5" goto :action_port
if "!CHOICE!"=="6" goto :action_import
if "!CHOICE!"=="7" goto :action_client
if "!CHOICE!"=="0" exit /b 0

goto :menu

:action_start
cls
start "MapleStory Server [SERVERGAMEOFFLINE]" cmd /k ""%~dp01_Start_Server.bat""
echo [OK] Server launched in a new window.
ping 127.0.0.1 -n 3 >nul
goto :menu

:action_restart
cls
echo Stopping previous server...
call "%~dp03_Stop_Server.bat"
ping 127.0.0.1 -n 3 >nul
start "MapleStory Server [SERVERGAMEOFFLINE]" cmd /k ""%~dp01_Start_Server.bat""
echo [OK] Server restarted in a new window.
ping 127.0.0.1 -n 3 >nul
goto :menu

:action_stop
cls
call "%~dp03_Stop_Server.bat"
goto :menu

:action_config
if exist "%~dp0server.properties" (
    notepad.exe "%~dp0server.properties"
) else (
    echo [!] server.properties not found!
    pause
)
goto :menu

:action_port
cls
echo ==============================================================================
echo                    SERVERGAMEOFFLINE-FACEBOOK PAGE                           
echo                    Port Collision Diagnostic & Setup                          
echo ==============================================================================
echo.

set "CURR_DB_PORT=33066"
set "CURR_BACKUP_PORT=33076"
set "CURR_LOGIN_PORT=8484"
set "CURR_API_PORT=8483"

if exist "%~dp0server.properties" (
    for /f "tokens=1,2 delims==" %%A in ('type "%~dp0server.properties" ^| findstr /R "^db\.port="') do (
        set "V=%%B"
        set "V=!V: =!"
        if not "!V!"=="" set "CURR_DB_PORT=!V!"
    )
    for /f "tokens=1,2 delims==" %%A in ('type "%~dp0server.properties" ^| findstr /R "^db\.backupPort="') do (
        set "V=%%B"
        set "V=!V: =!"
        if not "!V!"=="" set "CURR_BACKUP_PORT=!V!"
    )
    for /f "tokens=1,2 delims==" %%A in ('type "%~dp0server.properties" ^| findstr /R "^server\.loginPort="') do (
        set "V=%%B"
        set "V=!V: =!"
        if not "!V!"=="" set "CURR_LOGIN_PORT=!V!"
    )
    for /f "tokens=1,2 delims==" %%A in ('type "%~dp0server.properties" ^| findstr /R "^server\.apiPort="') do (
        set "V=%%B"
        set "V=!V: =!"
        if not "!V!"=="" set "CURR_API_PORT=!V!"
    )
)

echo Current Settings:
echo   - Database Port       : !CURR_DB_PORT! (Backup: !CURR_BACKUP_PORT!)
echo   - Login Port          : !CURR_LOGIN_PORT!
echo   - API Port            : !CURR_API_PORT!
echo   - Channel Ports       : 8585 - 8594
echo.
echo [*] Testing ports for conflicts...
echo.

REM Test DB Port
netstat -ano | findstr ":!CURR_DB_PORT! " | findstr "LISTENING" >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo   [!] DB Port !CURR_DB_PORT!       : [IN USE / ACTIVE]
) else (
    echo   [v] DB Port !CURR_DB_PORT!       : [AVAILABLE / FREE]
)

REM Test Backup DB Port
netstat -ano | findstr ":!CURR_BACKUP_PORT! " | findstr "LISTENING" >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo   [!] Backup Port !CURR_BACKUP_PORT!   : [IN USE / OCCUPIED]
) else (
    echo   [v] Backup Port !CURR_BACKUP_PORT!   : [AVAILABLE / FREE]
)

REM Test Standard MySQL 3306
netstat -ano | findstr ":3306 " | findstr "LISTENING" >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo   [i] Standard Port 3306   : [OCCUPIED by System MySQL/MariaDB - Safely bypassed!]
) else (
    echo   [v] Standard Port 3306   : [FREE]
)

REM Test Login Port
netstat -ano | findstr ":!CURR_LOGIN_PORT! " | findstr "LISTENING" >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo   [!] Login Port !CURR_LOGIN_PORT!    : [IN USE / ACTIVE]
) else (
    echo   [v] Login Port !CURR_LOGIN_PORT!    : [AVAILABLE / FREE]
)

REM Test API Port
netstat -ano | findstr ":!CURR_API_PORT! " | findstr "LISTENING" >nul 2>&1
if !ERRORLEVEL! EQU 0 (
    echo   [!] API Port !CURR_API_PORT!      : [IN USE / ACTIVE]
) else (
    echo   [v] API Port !CURR_API_PORT!      : [AVAILABLE / FREE]
)

echo.
echo ==============================================================================
echo   Options:
echo     [1] Switch Database Port to Backup Port (!CURR_BACKUP_PORT!)
echo     [2] Custom Enter New Database Port
echo     [3] Reset Database Port to Default (33066)
echo     [0] Back to Main Menu
echo ==============================================================================
set /p "POPT=Select option (0-3): "

if "!POPT!"=="1" (
    set "NEW_PORT=!CURR_BACKUP_PORT!"
    goto :apply_port
)
if "!POPT!"=="2" (
    echo.
    set /p "NEW_PORT=Enter custom DB Port (e.g. 33066, 33076, 33166, 33306): "
    if "!NEW_PORT!"=="" goto :action_port
    goto :apply_port
)
if "!POPT!"=="3" (
    set "NEW_PORT=33066"
    goto :apply_port
)
if "!POPT!"=="0" goto :menu

goto :action_port

:apply_port
echo.
echo [*] Applying new Database Port: !NEW_PORT!...
powershell -NoProfile -Command "$f = '%~dp0server.properties'; if (Test-Path $f) { $c = Get-Content $f -Raw; $c = $c -replace '(?m)^db\.port=.*', 'db.port=!NEW_PORT!'; $c = $c -replace '(?m)^db\.url=.*', 'db.url=jdbc:mariadb://127.0.0.1:!NEW_PORT!/vietmaple?allowMultiQueries=true&useSSL=false&serverTimezone=Asia/Bangkok'; [IO.File]::WriteAllText($f, $c) }"

if exist "%~dp0mariadb\data\my.ini" del /f /q "%~dp0mariadb\data\my.ini" >nul 2>&1
set "SAFE_MARIADB=%~dp0mariadb"
set "SAFE_MARIADB=!SAFE_MARIADB:\=/!"
set "SAFE_DATA=%~dp0mariadb/data"
set "SAFE_DATA=!SAFE_DATA:\=/!"
(
    echo [client]
    echo port=!NEW_PORT!
    echo socket=mysql.sock
    echo default-character-set=utf8mb4
    echo.
    echo [mysqld]
    echo port=!NEW_PORT!
    echo bind-address=127.0.0.1
    echo basedir="!SAFE_MARIADB!"
    echo datadir="!SAFE_DATA!"
    echo character-set-server=utf8mb4
    echo collation-server=utf8mb4_unicode_ci
    echo default-storage-engine=InnoDB
    echo max_allowed_packet=1024M
    echo innodb_buffer_pool_size=256M
    echo innodb_log_file_size=64M
    echo sql_mode=NO_ENGINE_SUBSTITUTION
) > "%~dp0mariadb\my.ini"

echo [v] Successfully updated server.properties and mariadb\my.ini to port !NEW_PORT!!
echo.
pause
goto :action_port

:action_import
cls
call "%~dp0Import_Database.bat"
goto :menu

:action_client
explorer.exe "%~dp0Client_Patch_Files"
goto :menu
