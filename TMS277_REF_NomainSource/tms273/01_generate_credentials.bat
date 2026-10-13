@echo off
@title Generate Credentials Console
setlocal

for /f "usebackq delims=" %%a in (`wsl.exe wslpath -u "%~dp0."`) do @set "WSL_ROOT=%%a"
if not defined WSL_ROOT (
  echo Failed to convert repo path to WSL.
  pause
  exit /b 1
)

wsl.exe bash "%WSL_ROOT%/runtime/scripts/generate_credentials.sh"
set "RC=%ERRORLEVEL%"
pause
exit /b %RC%
