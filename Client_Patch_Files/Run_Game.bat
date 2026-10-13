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

set "LAUNCHER_BIN="
if exist "%~dp0gms265 Launcher.exe" set "LAUNCHER_BIN=%~dp0gms265 Launcher.exe"
if not defined LAUNCHER_BIN if exist "%~dp0Launcher.exe" set "LAUNCHER_BIN=%~dp0Launcher.exe"

if not defined LAUNCHER_BIN (
    color 0C
    echo [ERROR] Launcher executable not found in this folder!
    pause
    exit /b 1
)

echo [START] Launching MapleStory Launcher...
echo.
start "" "!LAUNCHER_BIN!"

exit /b 0
