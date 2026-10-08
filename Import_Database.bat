@echo off
setlocal enabledelayedexpansion
title Import Database - MapleStory VN (vietmaple)
color 0E
cd /d "%~dp0"

echo.
echo ==============================================================================
echo                 Import Database Tool (MapleStory VN)                          
echo ==============================================================================
echo.

REM 1. Detect mysql.exe
set "MYSQL_CMD="

REM Check Portable MariaDB first
if exist "%~dp0mariadb\bin\mysql.exe" (
    set "MYSQL_CMD=%~dp0mariadb\bin\mysql.exe"
)

REM Check PATH
if not defined MYSQL_CMD (
    where mysql.exe >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        set "MYSQL_CMD=mysql"
    )
)

REM Check Standard MySQL Server (8.0, 8.4, 5.7, etc.)
if not defined MYSQL_CMD (
    for /d %%D in ("C:\Program Files\MySQL\MySQL Server*") do (
        if exist "%%D\bin\mysql.exe" set "MYSQL_CMD=%%D\bin\mysql.exe"
    )
)
if not defined MYSQL_CMD (
    for /d %%D in ("C:\Program Files (x86)\MySQL\MySQL Server*") do (
        if exist "%%D\bin\mysql.exe" set "MYSQL_CMD=%%D\bin\mysql.exe"
    )
)

REM Check MariaDB
if not defined MYSQL_CMD (
    for /d %%D in ("C:\Program Files\MariaDB*") do (
        if exist "%%D\bin\mysql.exe" set "MYSQL_CMD=%%D\bin\mysql.exe"
    )
)
if not defined MYSQL_CMD (
    for /d %%D in ("C:\Program Files (x86)\MariaDB*") do (
        if exist "%%D\bin\mysql.exe" set "MYSQL_CMD=%%D\bin\mysql.exe"
    )
)

REM Check XAMPP, Laragon, WAMP
if not defined MYSQL_CMD (
    if exist "C:\xampp\mysql\bin\mysql.exe" set "MYSQL_CMD=C:\xampp\mysql\bin\mysql.exe"
    if exist "D:\xampp\mysql\bin\mysql.exe" set "MYSQL_CMD=D:\xampp\mysql\bin\mysql.exe"
)
if not defined MYSQL_CMD (
    for /d %%D in ("C:\laragon\bin\mysql\*") do (
        if exist "%%D\bin\mysql.exe" set "MYSQL_CMD=%%D\bin\mysql.exe"
    )
)
if not defined MYSQL_CMD (
    for /d %%D in ("C:\wamp64\bin\mysql\*") do (
        if exist "%%D\bin\mysql.exe" set "MYSQL_CMD=%%D\bin\mysql.exe"
    )
)

if not defined MYSQL_CMD goto PromptMySQL
goto MySQLFound

:PromptMySQL
echo [X] mysql.exe was not automatically detected.
echo Please enter full path to mysql.exe:
set /p "MYSQL_CMD=Path: "
if "!MYSQL_CMD!"=="" (
    echo [X] mysql.exe is required!
    pause
    exit /b 1
)

:MySQLFound
echo [v] MySQL Client: "%MYSQL_CMD%"
echo.

REM 2. Check SQL file
set "SQL_FILE=%~dp0backup.sql"
if not exist "!SQL_FILE!" (
    if exist "%~dp0v214 src\backup.sql" set "SQL_FILE=%~dp0v214 src\backup.sql"
)
if not exist "!SQL_FILE!" (
    if exist "%~dp0..\backup.sql" set "SQL_FILE=%~dp0..\backup.sql"
)

if not exist "!SQL_FILE!" (
    echo [X] backup.sql not found in directory!
    pause
    exit /b 1
)

echo [v] Database dump found: !SQL_FILE!
echo.

REM 3. Defaults
set "DB_HOST=127.0.0.1"
set "DB_PORT=3306"
set "DB_USER=root"
set "DB_PASS=root"

REM Check auto mode
if "%1"=="-y" goto StartImport
if "%1"=="--auto" goto StartImport

echo Press Enter to keep default values in [brackets]:
echo.
set /p "INPUT_HOST=Host [%DB_HOST%]: "
if not "!INPUT_HOST!"=="" set "DB_HOST=!INPUT_HOST!"

set /p "INPUT_PORT=Port [%DB_PORT%]: "
if not "!INPUT_PORT!"=="" set "DB_PORT=!INPUT_PORT!"

set /p "INPUT_USER=User [%DB_USER%]: "
if not "!INPUT_USER!"=="" set "DB_USER=!INPUT_USER!"

set /p "INPUT_PASS=Password [%DB_PASS% / type none for blank]: "
if not "!INPUT_PASS!"=="" set "DB_PASS=!INPUT_PASS!"

:StartImport
set "PASS_ARG="
if not "!DB_PASS!"=="" (
    if /i not "!DB_PASS!"=="none" (
        set "PASS_ARG=-p!DB_PASS!"
    )
)

REM Ensure Portable MariaDB is running if connecting to localhost
if "!DB_HOST!"=="127.0.0.1" (
    powershell -NoProfile -Command "$client = New-Object System.Net.Sockets.TcpClient; try { $client.Connect('127.0.0.1', [int]'!DB_PORT!'); $client.Close(); exit 0 } catch { exit 1 }" >nul 2>&1
    if !ERRORLEVEL! NEQ 0 (
        if exist "%~dp0mariadb\bin\mysqld.exe" (
            echo [*] Starting Portable MariaDB Engine on port !DB_PORT!...
            start "MariaDB Portable" /min /D "%~dp0mariadb" "%~dp0mariadb\bin\mysqld.exe" --defaults-file="%~dp0mariadb\my.ini" --basedir="%~dp0mariadb" --datadir="%~dp0mariadb\data" --console
            powershell -NoProfile -Command "$port=[int]'!DB_PORT!'; for ($i=0; $i -lt 30; $i++) { try { $c=New-Object System.Net.Sockets.TcpClient; $c.Connect('127.0.0.1', $port); $c.Close(); exit 0 } catch { Start-Sleep -Milliseconds 500 } }; exit 1"
        )
    )
)

echo.
echo [*] Testing connection and creating database 'vietmaple' if absent...
"%MYSQL_CMD%" -h !DB_HOST! -P !DB_PORT! -u !DB_USER! !PASS_ARG! -e "CREATE DATABASE IF NOT EXISTS vietmaple DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" >nul 2>&1

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [X] Connection failed! Please check your host, user, password, or port.
    if not "%1"=="-y" if not "%1"=="--auto" pause
    exit /b 1
)

echo [v] Connected! Importing backup.sql into database 'vietmaple', please wait...
"%MYSQL_CMD%" -h !DB_HOST! -P !DB_PORT! -u !DB_USER! !PASS_ARG! --default-character-set=utf8mb4 --max_allowed_packet=1024M vietmaple < "!SQL_FILE!"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [X] Error occurred during database import!
    if not "%1"=="-y" if not "%1"=="--auto" pause
    exit /b 1
)

echo.
echo ==============================================================================
echo   [v] Database 'vietmaple' imported successfully!
echo ==============================================================================
echo.
"%MYSQL_CMD%" -h !DB_HOST! -P !DB_PORT! -u !DB_USER! !PASS_ARG! -e "SELECT COUNT(*) AS total_tables FROM information_schema.tables WHERE table_schema='vietmaple';"

REM 4. Auto-update server.properties
set "PROP_FILE=%~dp0server.properties"
if not exist "!PROP_FILE!" (
    if exist "%~dp0v214 src\server.properties" set "PROP_FILE=%~dp0v214 src\server.properties"
)
if not exist "!PROP_FILE!" goto DoneSync

set "ACTUAL_PASS=!DB_PASS!"
if /i "!ACTUAL_PASS!"=="none" set "ACTUAL_PASS="
powershell -NoProfile -Command "$f = '!PROP_FILE!'; if (Test-Path $f) { $c = Get-Content $f -Raw; $c = $c -replace '(?m)^db\.url=.*', 'db.url=jdbc:mariadb://!DB_HOST!:!DB_PORT!/vietmaple?allowMultiQueries=true&useSSL=false&serverTimezone=Asia/Bangkok'; $c = $c -replace '(?m)^db\.username=.*', 'db.username=!DB_USER!'; $c = $c -replace '(?m)^db\.password=.*', 'db.password=!ACTUAL_PASS!'; [IO.File]::WriteAllText($f, $c) }"
echo [v] Synchronized database settings into server.properties automatically!

:DoneSync
echo.
echo [v] Ready to launch server! (1_Start_Server.bat)
echo.
if not "%1"=="-y" if not "%1"=="--auto" pause
