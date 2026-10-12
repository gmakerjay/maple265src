@echo off
title Create Server263 Incremental Patch Package
color 0E
cd /d "%~dp0"

echo ==============================================================================
echo                 Create MapleStory Incremental Patch Tool                      
echo ==============================================================================
echo.

set "PYTHON_EXE=python"
where python.exe >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [X] Python is required to pack the patch zip file.
    pause
    exit /b 1
)

if exist "%~dp0..\tools\create_patch.py" (
    python "%~dp0..\tools\create_patch.py"
) else if exist "%~dp0tools\create_patch.py" (
    python "%~dp0tools\create_patch.py"
) else (
    echo [X] create_patch.py not found!
)

echo.
pause
