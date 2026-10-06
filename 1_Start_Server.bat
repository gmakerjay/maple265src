@echo off
setlocal enabledelayedexpansion
title MapleStory VN Server (Portable Runner)
color 0B

echo.
echo ==============================================================================
echo                   MapleStory v265 / v214 Portable Server                      
echo ==============================================================================
echo.

REM ===== 1. Auto-detect JDK 21 =====
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

REM ===== 3. Port check =====
echo.
echo [*] Checking server ports (8484, 8483, 8585)...
netstat -ano | findstr ":8484 :8483 :8585" | findstr "LISTENING" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [!] Server ports are already in use!
    echo Please run 3_Stop_Server.bat to stop existing processes.
    echo.
    set /p "FORCE_KILL=Force stop existing server processes now? (Y/N): "
    if /i "!FORCE_KILL!"=="Y" (
        call "%~dp03_Stop_Server.bat"
    ) else (
        echo Cancelled server launch.
        pause
        exit /b 1
    )
)

REM ===== 4. Launch Server =====
echo.
echo ==============================================================================
echo   Starting MapleStory Server...
echo   JVM Options: --enable-preview -server -Xms2G -Xmx4G
echo ==============================================================================
echo.

cd /d "%~dp0"
"%JAVA_EXE%" --enable-preview -server -Xms2G -Xmx4G -jar "%SERVER_JAR%"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [X] Server stopped with exit code: %ERRORLEVEL%
)

echo.
pause
