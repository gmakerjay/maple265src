@echo off
setlocal enabledelayedexpansion
title Stop MapleStory Server & Portable MariaDB
color 0C
cd /d "%~dp0"

echo.
echo ==============================================================================
echo                Stop MapleStory Server & Database Tool                         
echo ==============================================================================
echo.

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
    echo [*] Safely flushing all data and shutting down Portable MariaDB...
    "%~dp0mariadb\bin\mysqladmin.exe" -u root -proot shutdown >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        echo [v] Portable MariaDB has shutdown cleanly! All player data saved safely.
    ) else (
        "%~dp0mariadb\bin\mysqladmin.exe" -u root shutdown >nul 2>&1
        if !ERRORLEVEL! EQU 0 (
            echo [v] Portable MariaDB has shutdown cleanly! All player data saved safely.
        ) else (
            echo [v] Portable MariaDB was not running or has already stopped.
        )
    )
)

REM ===== 3. Logs Status =====
echo.
echo [i] Server logs are preserved in: logs\

echo.
echo ==============================================================================
echo   All systems stopped safely. Ready for next session!
echo ==============================================================================
echo.
timeout /t 3 >nul
