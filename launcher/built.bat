@echo off
setlocal enabledelayedexpansion
title Launcher Build

rem ─────────────────────────────────────────────────────────────
rem  built.bat - build the launcher with the values from server_info.txt
rem
rem  Edit server_info.txt (IP / Launcher name / Slogan), run this
rem  file and press 1. Nothing else needs to be changed.
rem ─────────────────────────────────────────────────────────────

set "ROOT=%~dp0"
set "SLN=%ROOT%gms265.Launcher.sln"
set "INFO=%ROOT%server_info.txt"
set "OUT=%ROOT%bin\Release\gms265 Launcher.exe"
set "DEPOT=G:\gms265\client\game\depot_216151"

if not exist "%SLN%" (
    echo [ERROR] Solution not found: %SLN%
    goto :fail
)

rem ── Locate MSBuild ───────────────────────────────────────────
set "MSBUILD="
for %%P in (
    "C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Current\Bin\amd64\MSBuild.exe"
    "C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\amd64\MSBuild.exe"
    "C:\Program Files\Microsoft Visual Studio\2022\Professional\MSBuild\Current\Bin\amd64\MSBuild.exe"
    "C:\Program Files\Microsoft Visual Studio\2022\Enterprise\MSBuild\Current\Bin\amd64\MSBuild.exe"
    "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\MSBuild\Current\Bin\amd64\MSBuild.exe"
) do (
    if not defined MSBUILD if exist %%P set "MSBUILD=%%~P"
)

if not defined MSBUILD (
    for /f "usebackq delims=" %%M in (`where msbuild 2^>nul`) do (
        if not defined MSBUILD set "MSBUILD=%%M"
    )
)

rem ── Read the launcher name so nothing is hardcoded here either ──
set "LNAME="
if exist "%INFO%" (
    for /f "usebackq tokens=1,* delims=:" %%A in (`findstr /i /b /c:"Launcher name" "%INFO%"`) do (
        for /f "tokens=* delims= " %%V in ("%%B") do set "LNAME=%%V"
    )
)
if not defined LNAME set "LNAME=Launcher"

rem ── Show what is being compiled in ───────────────────────────
echo.
echo  ============================================================
echo   %LNAME% Launcher - build
echo  ============================================================
if exist "%INFO%" (
    echo   server_info.txt:
    findstr /r /v "^#" "%INFO%" | findstr /r /c:"[A-Za-z]"
) else (
    echo   [WARN] server_info.txt not found, built-in defaults will be used.
)
echo.
echo   MSBuild : %MSBUILD%
echo   Output  : %OUT%
echo.

if not defined MSBUILD (
    echo  [ERROR] MSBuild was not found. Install Visual Studio or the Build Tools.
    goto :fail
)

set /p "CHOICE=  Press 1 to build, 0 to exit: "
if "%CHOICE%"=="1" goto :build
if "%CHOICE%"=="0" goto :exit
echo  Invalid choice.
goto :fail

rem ── Build ───────────────────────────────────────────────────
:build
echo.
echo  Building...
echo.
"%MSBUILD%" "%SLN%" /t:Rebuild /p:Configuration=Release /verbosity:minimal /nologo
if errorlevel 1 (
    echo.
    echo  [FAILED] Build returned errors.
    goto :fail
)

if not exist "%OUT%" (
    echo  [FAILED] Output not found: %OUT%
    goto :fail
)

for %%F in ("%OUT%") do set "SIZE=%%~zF"
for %%F in ("%OUT%") do set "STAMP=%%~tF"

echo.
echo  [OK] Build finished.
echo       File   : %OUT%
echo       Size   : %SIZE% bytes
echo       Built  : %STAMP%
echo.

rem ── Deploy to the client folder when it exists ──────────────
if exist "%DEPOT%" (
    echo  Client folder found: %DEPOT%
    set /p "DEPLOY=  Press 1 to copy it there, 0 to skip: "
    if "!DEPLOY!"=="1" (
        copy /Y "%OUT%" "%DEPOT%\gms265 Launcher.exe" >nul
        if exist "%ROOT%bin\Release\WpfAnimatedGif.dll" copy /Y "%ROOT%bin\Release\WpfAnimatedGif.dll" "%DEPOT%\" >nul
        if exist "%DEPOT%\gms265 Launcher.exe" (
            echo  [OK] Copied to %DEPOT%
            echo.
            echo  Make sure the launcher is closed, otherwise the copy fails.
        ) else (
            echo  [WARN] Copy failed - close the running launcher and build again.
        )
    )
) else (
    echo  Client folder %DEPOT% not found, skipping copy.
)
echo.
goto :exit

:fail
echo.
pause
exit /b 1

:exit
endlocal
exit /b 0
