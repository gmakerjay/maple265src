@echo off
setlocal
cd /d "%~dp0"
set "JAVA_HOME=%~dp0jdk21"
set "PATH=%JAVA_HOME%\bin;%PATH%"
echo [*] JAVA_HOME: %JAVA_HOME%
echo [*] Compiling with Maven...
call "%~dp0apache-maven-3.9.15\bin\mvn.cmd" clean package -DskipTests
set "BUILD_RESULT=%ERRORLEVEL%"
if %BUILD_RESULT% EQU 0 (
    echo [v] BUILD SUCCESSFUL! Deploying JAR...
    if exist "%~dp0bin\maplestory-219.5-jar-with-dependencies.jar" (
        copy /y "%~dp0bin\maplestory-219.5-jar-with-dependencies.jar" "%~dp0maplestory.jar" >nul
        copy /y "%~dp0bin\maplestory-219.5-jar-with-dependencies.jar" "%~dp0..\Server263\maplestory.jar" >nul
        copy /y "%~dp0bin\maplestory-219.5-jar-with-dependencies.jar" "%~dp0..\maplestory.jar" >nul
        echo [v] Successfully deployed maplestory.jar to Server263 and root!
    )
) else (
    echo [X] BUILD FAILED with exit code %BUILD_RESULT%
)
exit /b %BUILD_RESULT%
