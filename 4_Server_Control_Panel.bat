@echo off
setlocal enabledelayedexpansion
title MapleStory VN Server Control Panel
color 0B
cd /d "%~dp0"

:menu
cls
echo ==============================================================================
echo                 MapleStory Server Control Panel (v265 / v214)                 
echo ==============================================================================
echo.
echo   [1] Start Server
echo   [2] Restart Server
echo   [3] Stop Server
echo   [4] Build Server (Maven + JDK 21)
echo   [5] Import Database (vietmaple from backup.sql)
echo   [6] Edit Configuration (server.properties)
echo   [7] Exit
echo.
echo ==============================================================================
set /p "CHOICE=Select an option (1-7): "

if "!CHOICE!"=="1" goto :action_start
if "!CHOICE!"=="2" goto :action_restart
if "!CHOICE!"=="3" goto :action_stop
if "!CHOICE!"=="4" goto :action_build
if "!CHOICE!"=="5" goto :action_import
if "!CHOICE!"=="6" goto :action_config
if "!CHOICE!"=="7" exit /b 0

goto :menu

:action_start
cls
start "MapleStory VN Server" cmd /k ""%~dp01_Start_Server.bat""
echo [OK] Server launched in a new window.
timeout /t 2 >nul
goto :menu

:action_restart
cls
echo Stopping previous server...
call "%~dp03_Stop_Server.bat"
timeout /t 2 >nul
start "MapleStory VN Server" cmd /k ""%~dp01_Start_Server.bat""
echo [OK] Server restarted in a new window.
timeout /t 2 >nul
goto :menu

:action_stop
cls
call "%~dp03_Stop_Server.bat"
goto :menu

:action_build
cls
call "%~dp02_Build_Server.bat"
goto :menu

:action_import
cls
call "%~dp0Import_Database.bat"
goto :menu

:action_config
if exist "%~dp0server.properties" (
    notepad.exe "%~dp0server.properties"
) else (
    echo [!] server.properties not found!
    pause
)
goto :menu
