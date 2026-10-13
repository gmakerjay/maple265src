@echo off
@title Add Hosts
setlocal

fltmc >nul 2>nul
if errorlevel 1 (
    echo This script must be run as Administrator because it edits:
    echo   %SystemRoot%\System32\drivers\etc\hosts
    echo.
    echo Right-click PowerShell or Command Prompt, choose "Run as administrator",
    echo then run:
    echo   %~f0
    echo.
    pause
    exit /b 1
)

set "HOSTS_FILE=%SystemRoot%\System32\drivers\etc\hosts"

if not exist "%HOSTS_FILE%" (
    echo hosts file not found:
    echo   %HOSTS_FILE%
    pause
    exit /b 1
)

attrib -R "%HOSTS_FILE%" >nul 2>nul

findstr /L /I /C:"# TMS launcher loginconfig hosts" "%HOSTS_FILE%" >nul 2>nul
if errorlevel 1 (
    >> "%HOSTS_FILE%" echo.
    >> "%HOSTS_FILE%" echo # TMS launcher loginconfig hosts
)

call :EnsureHost "mxdtms.oss-cn-hongkong.aliyuncs.com"
call :EnsureHost "mxdtms.oss-cn-hongkong.aliyuncs.com."
call :EnsureHost "www.mxdtms.top"
call :EnsureHost "www.mxdtms.top."

ipconfig /flushdns >nul

echo.
echo Done.
pause
exit /b 0

:EnsureHost
findstr /L /I /C:"127.0.0.1 %~1" "%HOSTS_FILE%" >nul 2>nul
if errorlevel 1 (
    >> "%HOSTS_FILE%" echo 127.0.0.1 %~1
    echo Added:   127.0.0.1 %~1
) else (
    echo Present: 127.0.0.1 %~1
)
exit /b 0
