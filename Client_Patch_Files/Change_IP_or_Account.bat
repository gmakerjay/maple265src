@echo off
setlocal EnableDelayedExpansion
title MapleStory v265 Client Configuration & Quick Launcher
color 0B

cd /d "%~dp0"

:menu
cls
echo ================================================================
echo           MapleStory v265 Client Configuration Tool
echo ================================================================
echo.

set "INI_FILE=%~dp0launcher.ini"
if not exist "!INI_FILE!" (
    color 0C
    echo [ERROR] launcher.ini not found in this folder!
    pause
    exit /b 1
)

:: Read current IP, Username from launcher.ini
for /f "tokens=1,* delims==" %%a in ('findstr /i "^IP=" "!INI_FILE!" 2^>nul') do set "CURR_IP=%%b"
for /f "tokens=1,* delims==" %%a in ('findstr /i "^Username=" "!INI_FILE!" 2^>nul') do set "CURR_USER=%%b"

echo Current Configuration:
echo   - Server IP   : !CURR_IP!
echo   - Username    : !CURR_USER!
echo.
echo ================================================================
echo   [1] Change Server IP (เปลี่ยนไอพี เช่น Radmin VPN / LAN / 127.0.0.1)
echo   [2] Change Account (เปลี่ยนชื่อไอดีและรหัสผ่านเข้าเกม)
echo   [3] Launch Game (เริ่มเล่นเกม)
echo   [0] Exit
echo ================================================================
echo.
set /p "OPT=Choose an option (0-3): "

if "!OPT!"=="1" goto :change_ip
if "!OPT!"=="2" goto :change_account
if "!OPT!"=="3" goto :launch_game
if "!OPT!"=="0" exit /b 0
goto :menu

:change_ip
cls
echo ================================================================
echo                     Change Server IP
echo ================================================================
echo.
echo Current IP: !CURR_IP!
echo.
echo Examples:
echo   - Localhost (เล่นคนเดียวในเครื่อง): 127.0.0.1
echo   - Radmin VPN (เล่นกับเพื่อนผ่าน Radmin): 26.x.x.x
echo   - LAN (เครื่องในบ้านเดียวกัน): 192.168.1.x
echo.
set /p "NEW_IP=Enter New Server IP: "
if "!NEW_IP!"=="" goto :menu

powershell -NoProfile -Command "
    $path = '!INI_FILE!'
    $lines = Get-Content $path
    $lines = $lines | ForEach-Object {
        if ($_ -match '^\s*IP\s*=') { 'IP=!NEW_IP!' }
        else { $_ }
    }
    [System.IO.File]::WriteAllLines($path, $lines)
"
echo.
echo [OK] Server IP updated to: !NEW_IP!
pause
goto :menu

:change_account
cls
echo ================================================================
echo                     Change Account Info
echo ================================================================
echo.
echo Current Username: !CURR_USER!
echo.
echo Note: If the server has Auto-Register enabled, entering a new
echo username and password will automatically register your new account!
echo.
set /p "NEW_USER=Enter New Username: "
if "!NEW_USER!"=="" goto :menu

set /p "NEW_PASS=Enter New Password: "
if "!NEW_PASS!"=="" goto :menu

powershell -NoProfile -Command "
    $path = '!INI_FILE!'
    $lines = Get-Content $path
    $lines = $lines | ForEach-Object {
        if ($_ -match '^\s*Username\s*=') { 'Username=!NEW_USER!' }
        elseif ($_ -match '^\s*Password\s*=') { 'Password=!NEW_PASS!' }
        else { $_ }
    }
    [System.IO.File]::WriteAllLines($path, $lines)
"
echo.
echo [OK] Account credentials updated to: !NEW_USER!
pause
goto :menu

:launch_game
cls
echo [START] Launching MapleStory...
if exist "%~dp0Run_Game.bat" (
    call "%~dp0Run_Game.bat"
) else if exist "%~dp0Launcher.exe" (
    start "" "%~dp0Launcher.exe"
)
exit /b 0
