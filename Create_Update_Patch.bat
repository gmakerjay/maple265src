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

python "%~dp0..\tools\create_patch.py"
if %ERRORLEVEL% NEQ 0 (
    python "%~dp0tools\create_patch.py"
)

echo.
pause
