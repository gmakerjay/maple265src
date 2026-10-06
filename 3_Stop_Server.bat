@echo off
setlocal enabledelayedexpansion
title Stop MapleStory Server
color 0C

echo.
echo ==============================================================================
echo                      Stop MapleStory Server Tool                              
echo ==============================================================================
echo.

set "PORTS=8484 8483 8585 8586 8587 8588 8589 8590 8591 8592 8593 8594"
set "KILLED_ANY=0"

echo [*] Searching for processes listening on server ports...
for %%P in (%PORTS%) do (
    for /f "tokens=5" %%A in ('netstat -ano ^| findstr ":%%P" ^| findstr "LISTENING"') do (
        echo [!] Found PID: %%A on port %%P - Stopping...
        taskkill /F /PID %%A >nul 2>&1
        set "KILLED_ANY=1"
    )
)

taskkill /F /FI "WINDOWTITLE eq MapleStory VN Server*" /T >nul 2>&1

if "!KILLED_ANY!"=="1" (
    echo.
    echo [v] All server processes have been stopped!
) else (
    echo.
    echo [v] No running server processes found.
)

echo.
echo [*] Cleaning temporary logs...
if exist "%~dp0logs" (
    del /q /f "%~dp0logs\*.*" >nul 2>&1
    echo [v] Temporary logs cleared.
)

echo.
pause
