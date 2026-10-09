@echo off
setlocal enabledelayedexpansion
title MapleStory v265 Portable Server (SERVERGAMEOFFLINE-FACEBOOK PAGE)
color 0B
cd /d "%~dp0"

echo.
echo ==============================================================================
echo                    SERVERGAMEOFFLINE-FACEBOOK PAGE                           
echo             MapleStory v265 / v214 Full Portable Server Runner                
echo              (Zero-Install MariaDB Engine + Portable JDK 21)                  
echo ==============================================================================
echo.

REM ===== 0. Read Configured Database Port =====
set "DB_PORT=33066"
set "DB_BACKUP_PORT=33076"

if exist "%~dp0server.properties" (
    for /f "tokens=1,2 delims==" %%A in ('type "%~dp0server.properties" ^| findstr /R "^db\.port="') do (
        set "VAL=%%B"
        set "VAL=!VAL: =!"
        if not "!VAL!"=="" set "DB_PORT=!VAL!"
    )
    for /f "tokens=1,2 delims==" %%A in ('type "%~dp0server.properties" ^| findstr /R "^db\.backupPort="') do (
        set "VAL=%%B"
        set "VAL=!VAL: =!"
        if not "!VAL!"=="" set "DB_BACKUP_PORT=!VAL!"
    )
)

echo [*] Database target port: %DB_PORT% (Far port to prevent collision with system MySQL 3306)

REM ===== 0.1 Check & Port Collision Diagnostic =====
set "PORT_CONFLICT=0"
netstat -ano | findstr ":%DB_PORT%" | findstr "LISTENING" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    if exist "%~dp0mariadb\bin\mysqladmin.exe" (
        "%~dp0mariadb\bin\mysqladmin.exe" -u root -proot -P %DB_PORT% ping >nul 2>&1
        if !ERRORLEVEL! EQU 0 (
            echo [v] Portable MariaDB is already active and responsive on port %DB_PORT%.
            goto :db_ready_skip_start
        ) else (
            set "PORT_CONFLICT=1"
        )
    ) else (
        set "PORT_CONFLICT=1"
    )
)

if "!PORT_CONFLICT!"=="1" (
    echo [!] WARNING: Port %DB_PORT% is occupied by an external application or process!
    echo [*] Checking backup port %DB_BACKUP_PORT%...
    netstat -ano | findstr ":%DB_BACKUP_PORT%" | findstr "LISTENING" >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        echo [!] Backup port %DB_BACKUP_PORT% is also occupied.
        echo [*] Auto-scanning for an available high-range port...
        set "FOUND_FREE=0"
        for /L %%P in (33080,1,33099) do (
            if "!FOUND_FREE!"=="0" (
                netstat -ano | findstr ":%%P" | findstr "LISTENING" >nul 2>&1
                if !ERRORLEVEL! NEQ 0 (
                    set "DB_PORT=%%P"
                    set "FOUND_FREE=1"
                    echo [v] Found free alternative port: !DB_PORT!
                )
            )
        )
    ) else (
        set "DB_PORT=%DB_BACKUP_PORT%"
        echo [v] Automatically switched to backup port: %DB_PORT%
    )
    
    REM Auto-sync updated port into server.properties
    if exist "%~dp0server.properties" (
        powershell -NoProfile -Command "$f = '%~dp0server.properties'; if (Test-Path $f) { $c = Get-Content $f -Raw; $c = $c -replace '(?m)^db\.port=.*', 'db.port=!DB_PORT!'; $c = $c -replace '(?m)^db\.url=.*', 'db.url=jdbc:mariadb://127.0.0.1:!DB_PORT!/vietmaple?allowMultiQueries=true&useSSL=false&serverTimezone=Asia/Bangkok'; [IO.File]::WriteAllText($f, $c) }"
        echo [v] Synchronized fallback port into server.properties: %DB_PORT%
    )
)

if not exist "%~dp0mariadb\bin\mysqld.exe" (
    echo [!] Portable MariaDB not found at %~dp0mariadb\bin\mysqld.exe
    echo [*] Checking external MySQL or MariaDB on port %DB_PORT%...
    goto :db_check_done
)

REM 0.2 Sync my.ini dynamically to current path & port
if exist "%~dp0mariadb\data\my.ini" del /f /q "%~dp0mariadb\data\my.ini" >nul 2>&1
set "SAFE_MARIADB=%~dp0mariadb"
set "SAFE_MARIADB=!SAFE_MARIADB:\=/!"
set "SAFE_DATA=%~dp0mariadb/data"
set "SAFE_DATA=!SAFE_DATA:\=/!"
(
    echo [client]
    echo port=%DB_PORT%
    echo socket=mysql.sock
    echo default-character-set=utf8mb4
    echo.
    echo [mysqld]
    echo port=%DB_PORT%
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

REM 0.3 Auto-initialize system tables if not found
if not exist "%~dp0mariadb\data\mysql" (
    echo [*] Initializing Portable MariaDB system data...
    if exist "%~dp0mariadb\bin\mariadb-install-db.exe" (
        "%~dp0mariadb\bin\mariadb-install-db.exe" "--datadir=%~dp0mariadb\data" "--password=root" >nul 2>&1
    ) else if exist "%~dp0mariadb\bin\mysql_install_db.exe" (
        "%~dp0mariadb\bin\mysql_install_db.exe" "--datadir=%~dp0mariadb\data" "--password=root" >nul 2>&1
    )
)

echo [*] Starting Portable MariaDB Engine on port %DB_PORT% (Auto-Save to mariadb\data\)...
start "Portable MariaDB [SERVERGAMEOFFLINE]" /min /D "%~dp0mariadb" "%~dp0mariadb\bin\mysqld.exe" --defaults-file="%~dp0mariadb\my.ini" --basedir="%~dp0mariadb" --datadir="%~dp0mariadb\data" --console
echo [*] Waiting for MariaDB to initialize on port %DB_PORT%...
set "DB_READY=0"
for /L %%i in (1,1,30) do (
    if "!DB_READY!"=="0" (
        ping 127.0.0.1 -n 2 >nul
        if exist "%~dp0mariadb\bin\mysqladmin.exe" (
            "%~dp0mariadb\bin\mysqladmin.exe" -u root -proot -P %DB_PORT% ping >nul 2>&1
            if !ERRORLEVEL! EQU 0 (
                set "DB_READY=1"
                echo [v] Portable MariaDB is ready and responsive on port %DB_PORT%!
            )
        ) else (
            netstat -ano | findstr ":%DB_PORT%" | findstr "LISTENING" >nul 2>&1
            if !ERRORLEVEL! EQU 0 (
                set "DB_READY=1"
                echo [v] Portable MariaDB is ready and listening on port %DB_PORT%!
            )
        )
    )
)
if "!DB_READY!"=="0" (
    echo [X] ERROR: Could not start Portable MariaDB on port %DB_PORT%!
    echo Please check mariadb\data\ for error details.
    pause
    exit /b 1
)

:db_ready_skip_start
:db_check_done

REM Auto-import database on first launch if vietmaple data does not exist
if not exist "%~dp0mariadb\data\vietmaple" (
    echo.
    echo [!] First-time launch detected: Initializing and importing database...
    call "%~dp0Import_Database.bat" -y
)

REM ===== 1. Auto-detect JDK 21 =====
echo.
echo [*] Checking Java Development Kit (JDK 21)...
set "JAVA_EXE="

if exist "%~dp0jdk21\bin\java.exe" (
    set "JAVA_EXE=%~dp0jdk21\bin\java.exe"
    echo [v] Portable JDK 21 detected: %~dp0jdk21\
    goto :check_java_ver
)

if defined JAVA_HOME (
    if exist "%JAVA_HOME%\bin\java.exe" (
        set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
        echo [v] JAVA_HOME detected: %JAVA_HOME%
        goto :check_java_ver
    )
)

for /d %%J in ("C:\Program Files\Java\jdk-21*" "C:\Program Files\Eclipse Adoptium\jdk-21*" "C:\Program Files\Microsoft\jdk-21*") do (
    if exist "%%J\bin\java.exe" (
        set "JAVA_EXE=%%J\bin\java.exe"
        echo [v] System JDK 21 detected: %%J
        goto :check_java_ver
    )
)

where java.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "JAVA_EXE=java"
    echo [v] java detected in System PATH
    goto :check_java_ver
)

echo.
echo [X] ERROR: JDK 21 not found!
echo Please extract JDK 21 into: %~dp0jdk21\
echo.
pause
exit /b 1

:check_java_ver
"%JAVA_EXE%" -version 2>&1 | findstr /C:"21" >nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] WARNING: Java found might not be JDK 21.
)

REM ===== 2. Check Server JAR =====
echo.
echo [*] Checking maplestory.jar...
set "SERVER_JAR=%~dp0maplestory.jar"

if not exist "%SERVER_JAR%" (
    if exist "%~dp0bin\maplestory-219.5-jar-with-dependencies.jar" (
        echo [*] Copying server jar from bin folder...
        copy /y "%~dp0bin\maplestory-219.5-jar-with-dependencies.jar" "%SERVER_JAR%" >nul
    ) else (
        echo [X] Server jar not found!
        echo Please run 2_Build_Server.bat first.
        pause
        exit /b 1
    )
)
echo [v] Server JAR ready: %SERVER_JAR%

REM ===== 3. Check Server Ports =====
echo.
echo [*] Checking server ports (8484, 8483, 8585)...
netstat -ano | findstr ":8484 :8483 :8585" | findstr "LISTENING" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [!] Previous server instance detected on ports. Auto-clearing old processes...
    for %%P in (8484 8483 8585 8586 8587 8588 8589 8590 8591 8592 8593 8594) do (
        for /f "tokens=5" %%A in ('netstat -ano ^| findstr ":%%P" ^| findstr "LISTENING"') do (
            taskkill /F /PID %%A >nul 2>&1
        )
    )
    ping 127.0.0.1 -n 2 >nul
    echo [v] Old server processes cleared.
)

REM ===== 4. Launch MapleStory Server =====
echo.
echo ==============================================================================
echo                    SERVERGAMEOFFLINE-FACEBOOK PAGE                           
echo   Starting MapleStory Server...
echo   JVM Options: --enable-preview -server -Xms1G -Xmx4G
echo ==============================================================================
echo.

cd /d "%~dp0"
"%JAVA_EXE%" -Duser.language=en -Duser.country=US --enable-preview -server -Xms1G -Xmx4G -jar "%SERVER_JAR%"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [X] Server stopped with exit code: %ERRORLEVEL%
)

echo.
pause
