@echo off
setlocal enabledelayedexpansion
title MapleStory v265 Portable Server (Zero-Install Runner)
color 0B
cd /d "%~dp0"

echo.
echo ==============================================================================
echo             MapleStory v265 / v214 Full Portable Server Runner                
echo              (Zero-Install MariaDB Engine + Portable JDK 21)                  
echo ==============================================================================
echo.

REM ===== 0. Check & Start Portable MariaDB Engine =====
echo [*] Checking Database Engine (MariaDB / MySQL)...
set "DB_PORT=3306"
netstat -ano | findstr ":%DB_PORT%" | findstr "LISTENING" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [v] Database is already active on port %DB_PORT%.
    goto :db_check_done
)

if not exist "%~dp0mariadb\bin\mysqld.exe" (
    echo [!] Portable MariaDB not found at %~dp0mariadb\bin\mysqld.exe
    echo [*] Checking external MySQL or MariaDB on port %DB_PORT%...
    goto :db_check_done
)

echo [*] Starting Portable MariaDB Engine (Auto-Save to mariadb\data\)...
start "Portable MariaDB" /min /D "%~dp0mariadb" "%~dp0mariadb\bin\mysqld.exe" --defaults-file="%~dp0mariadb\my.ini" --basedir="%~dp0mariadb" --datadir="%~dp0mariadb\data" --console
echo [*] Waiting for MariaDB to initialize on port %DB_PORT%...
set "DB_READY=0"
for /L %%i in (1,1,30) do (
    if "!DB_READY!"=="0" (
        timeout /t 1 /nobreak >nul
        if exist "%~dp0mariadb\bin\mysqladmin.exe" (
            "%~dp0mariadb\bin\mysqladmin.exe" -u root -proot ping >nul 2>&1
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
    timeout /t 1 /nobreak >nul
    echo [v] Old server processes cleared.
)

REM ===== 4. Launch MapleStory Server =====
echo.
echo ==============================================================================
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
