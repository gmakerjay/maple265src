@echo off
setlocal EnableDelayedExpansion
title MapleStory v265 Account Registration & Manager
color 0B

cd /d "%~dp0"

:menu
cls
echo ================================================================
echo           MapleStory v265 Account Registration Tool
echo                  (100%% Portable / Zero-Install)
echo ================================================================
echo.

:: 1. Check if Portable MariaDB is running
set "MYSQL_EXE=%~dp0mariadb\bin\mysql.exe"
if not exist "!MYSQL_EXE!" (
    color 0C
    echo [ERROR] Portable MariaDB not found at mariadb\bin\mysql.exe!
    pause
    exit /b 1
)

:: Test database connection on port 33066
"!MYSQL_EXE!" -u root -proot -P 33066 -h 127.0.0.1 -e "SELECT 1;" >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [INFO] MariaDB is not running. Starting Portable MariaDB...
    start "Portable MariaDB [33066]" /min /D "%~dp0mariadb" "%~dp0mariadb\bin\mysqld.exe" --defaults-file="%~dp0mariadb\my.ini" --basedir="%~dp0mariadb" --datadir="%~dp0mariadb\data" --console
    timeout /t 3 /nobreak >nul
    "!MYSQL_EXE!" -u root -proot -P 33066 -h 127.0.0.1 -e "SELECT 1;" >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        color 0C
        echo [ERROR] Could not connect to MariaDB on port 33066!
        echo Please run 1_Start_Server.bat or Start_Database.bat first.
        pause
        exit /b 1
    )
    echo [OK] Portable MariaDB started successfully.
    echo.
)

echo [1] Create New Account (สมัครไอดีใหม่)
echo [2] List Existing Accounts (ดูรายชื่อไอดีทั้งหมดในเซิร์ฟเวอร์)
echo [3] Promote Account to Admin / GM (ตั้งค่าสิทธิ์แอดมิน / เสกของ)
echo [4] Reset Account Password (เปลี่ยนรหัสผ่านไอดี)
echo [0] Exit
echo.
echo ================================================================
set /p "OPT=Choose an option (0-4): "

if "!OPT!"=="1" goto :create_account
if "!OPT!"=="2" goto :list_accounts
if "!OPT!"=="3" goto :promote_account
if "!OPT!"=="4" goto :reset_password
if "!OPT!"=="0" exit /b 0
goto :menu

:list_accounts
cls
echo ================================================================
echo                   Registered Accounts List
echo ================================================================
echo.
"!MYSQL_EXE!" -u root -proot -P 33066 -h 127.0.0.1 vietmaple -e "SELECT id AS 'ID', name AS 'Username', CASE accounttype WHEN 4 THEN 'Admin (แอดมิน)' WHEN 3 THEN 'GameMaster (GM)' WHEN 2 THEN 'Intern' WHEN 1 THEN 'Tester' ELSE 'Player (ผู้เล่น)' END AS 'Role', creationdate AS 'Created At' FROM users ORDER BY id ASC;"
echo.
pause
goto :menu

:create_account
cls
echo ================================================================
echo                     Create New Account
echo ================================================================
echo.
set "ACC_USER="
set "ACC_PASS="
set "ACC_ROLE=0"

set /p "ACC_USER=Enter Username (ชื่อไอดี): "
if "!ACC_USER!"=="" (
    echo [!] Username cannot be empty!
    pause
    goto :create_account
)

set /p "ACC_PASS=Enter Password (รหัสผ่าน): "
if "!ACC_PASS!"=="" (
    echo [!] Password cannot be empty!
    pause
    goto :create_account
)

echo.
echo Select Account Role:
echo   [1] Normal Player (ผู้เล่นทั่วไป)
echo   [2] GameMaster (GM - ใช้คำสั่ง ! ได้บางส่วน)
echo   [3] Admin (ผู้ดูแลสูงสุด - เสกไอเทม !item, ปรับเลเวล !level, !job ได้ทุกอย่าง)
echo.
set /p "ROLE_CHOICE=Select Role (1-3, Default=1): "
if "!ROLE_CHOICE!"=="2" set "ACC_ROLE=3"
if "!ROLE_CHOICE!"=="3" set "ACC_ROLE=4"

:: Check if user already exists
for /f "usebackq" %%i in (`"!MYSQL_EXE!" -u root -proot -P 33066 -h 127.0.0.1 -N -s vietmaple -e "SELECT COUNT(*) FROM users WHERE name='!ACC_USER!';"`) do (
    set "EXISTS=%%i"
)

if "!EXISTS!" geq "1" (
    color 0C
    echo.
    echo [ERROR] Username '!ACC_USER!' already exists! Please choose another name.
    color 0B
    pause
    goto :menu
)

:: Insert new user
"!MYSQL_EXE!" -u root -proot -P 33066 -h 127.0.0.1 vietmaple -e "INSERT INTO users (name, password, pic, email, age, accounttype, clientstate, creationdate) VALUES ('!ACC_USER!', '!ACC_PASS!', '111111', '!ACC_USER!@maplestory.local', 20, !ACC_ROLE!, 0, NOW());"

if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERROR] Failed to insert account into database!
    color 0B
    pause
    goto :menu
)

color 0A
echo.
echo ================================================================
echo   [SUCCESS] Account '!ACC_USER!' created successfully!
if "!ACC_ROLE!"=="4" (
    echo   [ROLE] Administrator (สามารถเสกของด้วยคำสั่ง !item ในเกมได้)
) else (
    echo   [ROLE] Normal Player
)
echo ================================================================
color 0B
echo.
echo Would you like to update launcher.ini with this account now?
set /p "SYNC_INI=Update launcher.ini? (Y/N, Default=Y): "
if /i not "!SYNC_INI!"=="N" (
    call :update_ini "!ACC_USER!" "!ACC_PASS!"
)

pause
goto :menu

:promote_account
cls
echo ================================================================
echo                 Promote Account to Admin / GM
echo ================================================================
echo.
set /p "PROMOTE_USER=Enter Username to promote: "
if "!PROMOTE_USER!"=="" goto :menu

echo.
echo Select New Role:
echo   [1] Normal Player (accounttype=0)
echo   [2] GameMaster (accounttype=3)
echo   [3] Administrator (accounttype=4 - Full GM commands)
echo.
set /p "P_ROLE=Choose (1-3): "
set "NEW_ROLE=0"
if "!P_ROLE!"=="2" set "NEW_ROLE=3"
if "!P_ROLE!"=="3" set "NEW_ROLE=4"

"!MYSQL_EXE!" -u root -proot -P 33066 -h 127.0.0.1 vietmaple -e "UPDATE users SET accounttype=!NEW_ROLE! WHERE name='!PROMOTE_USER!';"
echo.
echo [OK] Account '!PROMOTE_USER!' updated to role !NEW_ROLE!.
pause
goto :menu

:reset_password
cls
echo ================================================================
echo                     Reset Account Password
echo ================================================================
echo.
set /p "RESET_USER=Enter Username: "
if "!RESET_USER!"=="" goto :menu

set /p "RESET_PASS=Enter New Password: "
if "!RESET_PASS!"=="" goto :menu

"!MYSQL_EXE!" -u root -proot -P 33066 -h 127.0.0.1 vietmaple -e "UPDATE users SET password='!RESET_PASS!' WHERE name='!RESET_USER!';"
echo.
echo [OK] Password for '!RESET_USER!' updated successfully.
pause
goto :menu

:update_ini
set "TARGET_USER=%~1"
set "TARGET_PASS=%~2"
set "INI_FILE=%~dp0Client_Patch_Files\launcher.ini"

if exist "!INI_FILE!" (
    powershell -NoProfile -Command "
        $path = '!INI_FILE!'
        $lines = Get-Content $path
        $lines = $lines | ForEach-Object {
            if ($_ -match '^\s*Username\s*=') { 'Username=!TARGET_USER!' }
            elseif ($_ -match '^\s*Password\s*=') { 'Password=!TARGET_PASS!' }
            else { $_ }
        }
        [System.IO.File]::WriteAllLines($path, $lines)
    "
    echo [OK] Updated !INI_FILE! with Username=!TARGET_USER!.
)
exit /b 0
