@echo off
setlocal enabledelayedexpansion
title Build MapleStory Server (Portable Maven and JDK 21)
color 0A

echo.
echo ==============================================================================
echo                 SwordieMS / MapleStory Server Build Tool                      
echo                     (Portable JDK 21 and Apache Maven)                         
echo ==============================================================================
echo.

REM ===== 1. Auto-detect JDK 21 =====
echo [*] Checking JDK 21...
set "JAVA_HOME="

if exist "%~dp0jdk21\bin\java.exe" (
    set "JAVA_HOME=%~dp0jdk21"
    goto :found_java
)

if defined JAVA_HOME (
    if exist "%JAVA_HOME%\bin\java.exe" (
        goto :found_java
    )
)

where java.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    for /f "delims=" %%i in ('where java.exe') do (
        set "JAVA_BIN=%%i"
        for %%A in ("!JAVA_BIN!\..\..") do set "JAVA_HOME=%%~fA"
        goto :found_java
    )
)

echo [X] ERROR: JDK 21 not found!
echo Please extract JDK 21 into: %~dp0jdk21\
pause
exit /b 1

:found_java
set "PATH=%JAVA_HOME%\bin;%PATH%"
echo [v] JDK Home: %JAVA_HOME%

REM ===== 2. Auto-detect Maven =====
echo.
echo [*] Checking Apache Maven...
set "MVN_CMD="

if exist "%~dp0apache-maven-3.9.15\bin\mvn.cmd" (
    set "MVN_CMD=%~dp0apache-maven-3.9.15\bin\mvn.cmd"
    goto :found_maven
)

where mvn.cmd >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "MVN_CMD=mvn"
    goto :found_maven
)

echo [X] ERROR: Maven not found!
echo Please extract Maven into: %~dp0apache-maven-3.9.15\
pause
exit /b 1

:found_maven
echo [v] Maven Command: %MVN_CMD%
echo.

REM ===== 3. Start Build Process =====
echo ==============================================================================
echo   Building Project with Maven (mvn clean package -DskipTests)...
echo ==============================================================================
echo.

cd /d "%~dp0"
call "%MVN_CMD%" clean package -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ==============================================================================
    echo   [X] BUILD FAILED! Check error output above.
    echo ==============================================================================
    echo.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [*] Copying server jar to root: maplestory.jar ...
if exist "%~dp0bin\maplestory-219.5-jar-with-dependencies.jar" (
    copy /y "%~dp0bin\maplestory-219.5-jar-with-dependencies.jar" "%~dp0maplestory.jar" >nul
    echo [v] Success: maplestory.jar is ready to launch!
)

echo.
echo ==============================================================================
echo   [v] BUILD SUCCESSFUL!
echo ==============================================================================
echo You can now start the server with: 1_Start_Server.bat
echo.
pause
