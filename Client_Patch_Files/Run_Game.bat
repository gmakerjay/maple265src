@echo off
setlocal EnableDelayedExpansion
title MapleStory v265.3 Client Launcher
color 0A

echo ================================================================
echo           MapleStory v265.3 Client Launcher
echo ================================================================
echo.

cd /d "%~dp0"

if not exist "MapleStory.exe" (
    color 0C
    echo [ERROR] MapleStory.exe not found!
    echo Please place these files inside your MapleStory v265 game folder.
    echo.
    pause
    exit /b 1
)

if not exist "Localhost.dll" (
    color 0C
    echo [ERROR] Localhost.dll not found in this folder!
    pause
    exit /b 1
)

if not exist "Launcher.exe" (
    color 0C
    echo [ERROR] Launcher.exe not found in this folder!
    pause
    exit /b 1
)

echo [START] Launching MapleStory with Localhost Hook...
echo.
start "" "%~dp0Launcher.exe"

exit /b 0
