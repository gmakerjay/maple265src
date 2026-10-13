@echo off
setlocal enabledelayedexpansion
title MapleStory v265 Client Patch 1-Click Installer
color 0A
cd /d "%~dp0"

echo ==============================================================================
echo           MapleStory v265 Localhost Client Patch 1-Click Installer            
echo ==============================================================================
echo.

REM 1. Check if running inside MapleStory game directory directly
set "TARGET_DIR="
if exist "%~dp0MapleStory.exe" (
    set "TARGET_DIR=%~dp0"
    goto :install_now
)

REM 2. Auto-detect common game client installation paths
echo [*] Auto-detecting MapleStory v265 installation folder...

set "P1=C:\Program Files (x86)\Steam\steamapps\content\app_216150\depot_216151"
set "P2=C:\Program Files (x86)\Steam\steamapps\common\MapleStory"
set "P3=C:\Nexon\MapleStory"
set "P4=D:\MapleStory"
set "P5=E:\MapleStory"

if exist "!P1!\MapleStory.exe" (
    set "TARGET_DIR=!P1!"
    echo [v] Found MapleStory in Steam Depot: !TARGET_DIR!
    goto :confirm_install
)

if exist "!P2!\MapleStory.exe" (
    set "TARGET_DIR=!P2!"
    echo [v] Found MapleStory in Steam Common: !TARGET_DIR!
    goto :confirm_install
)

if exist "!P3!\MapleStory.exe" (
    set "TARGET_DIR=!P3!"
    echo [v] Found MapleStory in Nexon Folder: !TARGET_DIR!
    goto :confirm_install
)

if exist "!P4!\MapleStory.exe" (
    set "TARGET_DIR=!P4!"
    echo [v] Found MapleStory on Drive D: !TARGET_DIR!
    goto :confirm_install
)

if exist "!P5!\MapleStory.exe" (
    set "TARGET_DIR=!P5!"
    echo [v] Found MapleStory on Drive E: !TARGET_DIR!
    goto :confirm_install
)

:manual_input
echo [!] Could not auto-detect MapleStory game folder.
echo [*] Please enter or drag-and-drop the path to your MapleStory game folder:
echo     (The folder containing MapleStory.exe)
echo.
set /p "TARGET_DIR=Game Folder Path: "
set "TARGET_DIR=!TARGET_DIR:"=!"

if not exist "!TARGET_DIR!\MapleStory.exe" (
    color 0C
    echo.
    echo [X] Error: Could not find MapleStory.exe in "!TARGET_DIR!"
    echo Please check the path and try again.
    echo.
    pause
    color 0A
    goto :manual_input
)

:confirm_install
echo.
echo ==============================================================================
echo Target Game Folder: !TARGET_DIR!
echo ==============================================================================
echo.
echo Files to be installed/updated:
echo   - Localhost.dll           (Updated Hook Engine: memory fix & IP redirect)
echo   - Launcher.exe            (x64 Loader with Detours injection)
echo   - launcher.ini            (Server & Auto-Login configuration)
echo   - Run_Game.bat            (1-Click Game Launcher)
echo   - Change_IP_or_Account.bat (Tool to change IP and User/Password)
echo.

:install_now
echo [*] Installing client patch...

if exist "!TARGET_DIR!\Localhost.dll" (
    copy /y "!TARGET_DIR!\Localhost.dll" "!TARGET_DIR!\Localhost_backup.dll" >nul 2>&1
    echo [v] Backed up old Localhost.dll to Localhost_backup.dll
)

copy /y "%~dp0Localhost.dll" "!TARGET_DIR!\Localhost.dll" >nul
copy /y "%~dp0Launcher.exe" "!TARGET_DIR!\Launcher.exe" >nul
if exist "%~dp0gms265 Launcher.exe" copy /y "%~dp0gms265 Launcher.exe" "!TARGET_DIR!\gms265 Launcher.exe" >nul
if exist "%~dp0WpfAnimatedGif.dll" copy /y "%~dp0WpfAnimatedGif.dll" "!TARGET_DIR!\WpfAnimatedGif.dll" >nul
if not exist "!TARGET_DIR!\launcher.ini" (
    copy /y "%~dp0launcher.ini" "!TARGET_DIR!\launcher.ini" >nul
) else (
    echo [i] launcher.ini already exists in game folder (preserved current settings).
)
copy /y "%~dp0Run_Game.bat" "!TARGET_DIR!\Run_Game.bat" >nul
copy /y "%~dp0Change_IP_or_Account.bat" "!TARGET_DIR!\Change_IP_or_Account.bat" >nul

echo.
echo ==============================================================================
echo           [v] Client Patch Installed Successfully!                            
echo ==============================================================================
echo.
echo You can now launch the game using:
echo   1. "!TARGET_DIR!\Run_Game.bat" (Recommended)
echo   2. "!TARGET_DIR!\Launcher.exe"
echo.
set /p "RUN_NOW=Do you want to launch MapleStory now? (Y/N): "
if /i "!RUN_NOW!"=="Y" (
    cd /d "!TARGET_DIR!"
    start "" "!TARGET_DIR!\Run_Game.bat"
)

exit /b 0
