@echo off
setlocal enabledelayedexpansion
title Stop MapleStory Server and Portable MariaDB (SERVERGAMEOFFLINE-FACEBOOK PAGE)
color 0C
cd /d "%~dp0"

echo.
echo ==============================================================================
echo                    SERVERGAMEOFFLINE-FACEBOOK PAGE                           
echo                Stop MapleStory Server and Database Tool                         
echo ==============================================================================
echo.

REM ===== 0. Read Configured Database Port =====
set "DB_PORT=33066"
if exist "%~dp0server.properties" (
    for /f "tokens=1,2 delims==" %%A in ('type "%~dp0server.properties" ^| findstr /R "^db\.port="') do (
        set "VAL=%%B"
        set "VAL=!VAL: =!"
        if not "!VAL!"=="" set "DB_PORT=!VAL!"
    )
)

REM ===== 1. Stop Game Server Channels & Ports =====
set "PORTS=8484 8483 8585 8586 8587 8588 8589 8590 8591 8592 8593 8594"
set "KILLED_ANY=0"

echo [*] Searching for processes listening on game server ports...
for %%P in (%PORTS%) do (
    for /f "tokens=5" %%A in ('netstat -ano ^| findstr ":%%P" ^| findstr "LISTENING"') do (
        echo [!] Found PID: %%A on port %%P - Stopping...
        taskkill /F /PID %%A >nul 2>&1
        set "KILLED_ANY=1"
    )
)

taskkill /F /FI "WINDOWTITLE eq MapleStory v265 Portable Server*" /T >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq MapleStory VN Server*" /T >nul 2>&1

if "!KILLED_ANY!"=="1" (
    echo [v] Game server processes have been stopped!
) else (
    echo [v] No running game server processes found.
)

REM ===== 2. Safely Shutdown Portable MariaDB Engine =====
if exist "%~dp0mariadb\bin\mysqladmin.exe" (
    echo.
    echo [*] Safely flushing all data and shutting down Portable MariaDB on port %DB_PORT%...
    "%~dp0mariadb\bin\mysqladmin.exe" -u root -proot -P %DB_PORT% shutdown >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        echo [v] Portable MariaDB has shutdown cleanly! All player data saved safely.
    ) else (
        "%~dp0mariadb\bin\mysqladmin.exe" -u root -P %DB_PORT% shutdown >nul 2>&1
        if !ERRORLEVEL! EQU 0 (
            echo [v] Portable MariaDB has shutdown cleanly! All player data saved safely.
        ) else (
            REM Also try legacy port 3306 if still active
            "%~dp0mariadb\bin\mysqladmin.exe" -u root -proot -P 3306 shutdown >nul 2>&1
            echo [v] Portable MariaDB was not running or has already stopped.
        )
    )
)

REM Ensure no lingering mysqld process remains
for /f "tokens=2" %%a in ('tasklist /FI "IMAGENAME eq mysqld.exe" /NH 2^>nul ^| findstr /I "mysqld"') do (
    taskkill /F /PID %%a >nul 2>&1
)

REM ===== 3. Logs Status =====
echo.
echo [i] Server logs are preserved in: logs\

echo.
echo ==============================================================================
echo                    SERVERGAMEOFFLINE-FACEBOOK PAGE                           
echo   All systems stopped safely. Ready for next session!
echo ==============================================================================
echo.
ping 127.0.0.1 -n 3 >nul
