import os
import sys
import zipfile
import shutil
from datetime import datetime

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SERVER263_DIR = os.path.join(ROOT_DIR, "Server263")
OUTPUT_DIR = os.path.join(ROOT_DIR, "Patches")

if not os.path.exists(SERVER263_DIR):
    print(f"[X] Error: Server263 folder not found at {SERVER263_DIR}")
    sys.exit(1)

os.makedirs(OUTPUT_DIR, exist_ok=True)
timestamp = datetime.now().strftime("%Y%m%d_%H%M")
patch_name = f"Server263_Patch_{timestamp}"
patch_folder = os.path.join(OUTPUT_DIR, patch_name)
os.makedirs(patch_folder, exist_ok=True)

print(f"==============================================================================")
print(f"              MapleStory Server263 Incremental Patch Creator                  ")
print(f"==============================================================================")
print(f"[*] Packaging patch files into: {patch_folder}")

# 1. Root patch files
files_to_copy = [
    "maplestory.jar",
    "server.properties",
    "1_Start_Server.bat",
    "3_Stop_Server.bat",
    "4_Server_Control_Panel.bat",
    "Import_Database.bat",
    "HOW_TO_USE.txt",
    "backup.sql"
]

for f in files_to_copy:
    src = os.path.join(SERVER263_DIR, f)
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(patch_folder, f))
        print(f" [v] Added file: {f}")

# 2. Copy scripts folder (Python NPC scripts, quest scripts)
scripts_src = os.path.join(SERVER263_DIR, "data", "scripts")
scripts_dst = os.path.join(patch_folder, "data", "scripts")
if os.path.exists(scripts_src):
    shutil.copytree(scripts_src, scripts_dst, dirs_exist_ok=True)
    print(f" [v] Added folder: data/scripts/ (NPCs, quests, custom commands)")

# 3. Copy Client_Patch_Files
client_src = os.path.join(SERVER263_DIR, "Client_Patch_Files")
client_dst = os.path.join(patch_folder, "Client_Patch_Files")
if os.path.exists(client_src):
    shutil.copytree(client_src, client_dst, dirs_exist_ok=True)
    print(f" [v] Added folder: Client_Patch_Files/ (Launcher, Localhost.dll, config)")

# 4. Generate 1-Click Apply_Patch.bat
apply_bat_path = os.path.join(patch_folder, "Apply_Patch.bat")
apply_bat_content = r"""@echo off
setlocal enabledelayedexpansion
title Apply MapleStory Server263 Patch
color 0A
cd /d "%~dp0"

echo ==============================================================================
echo            MapleStory Server263 Incremental Patch Installer
echo ==============================================================================
echo.

set "TARGET_DIR=%~dp0.."
if exist "%~dp0..\Server263\1_Start_Server.bat" set "TARGET_DIR=%~dp0..\Server263"
if exist "%~dp0Server263\1_Start_Server.bat" set "TARGET_DIR=%~dp0Server263"

if not exist "!TARGET_DIR!\data" (
    echo [!] Enter path to your Server263 folder (or press Enter to install to current parent folder):
    set /p "USER_INPUT=Path: "
    if not "!USER_INPUT!"=="" set "TARGET_DIR=!USER_INPUT!"
)

echo [*] Target Directory: !TARGET_DIR!
echo.

if not exist "!TARGET_DIR!\data" (
    echo [X] Could not find Server263 at: !TARGET_DIR!
    pause
    exit /b 1
)

echo [*] Copying updated files...
if exist "maplestory.jar" copy /y "maplestory.jar" "!TARGET_DIR!\maplestory.jar" >nul
if exist "1_Start_Server.bat" copy /y "1_Start_Server.bat" "!TARGET_DIR!\1_Start_Server.bat" >nul
if exist "3_Stop_Server.bat" copy /y "3_Stop_Server.bat" "!TARGET_DIR!\3_Stop_Server.bat" >nul
if exist "4_Server_Control_Panel.bat" copy /y "4_Server_Control_Panel.bat" "!TARGET_DIR!\4_Server_Control_Panel.bat" >nul
if exist "Import_Database.bat" copy /y "Import_Database.bat" "!TARGET_DIR!\Import_Database.bat" >nul
if exist "HOW_TO_USE.txt" copy /y "HOW_TO_USE.txt" "!TARGET_DIR!\HOW_TO_USE.txt" >nul

if exist "data\scripts" (
    echo [*] Updating NPC & Quest scripts...
    xcopy "data\scripts" "!TARGET_DIR!\data\scripts\" /E /Y /I /Q >nul
)

if exist "Client_Patch_Files" (
    echo [*] Updating Client Patch Files...
    xcopy "Client_Patch_Files" "!TARGET_DIR!\Client_Patch_Files\" /E /Y /I /Q >nul
)

echo.
echo ==============================================================================
echo   [v] Patch applied successfully! (WZ and player database preserved)
echo ==============================================================================
echo.
pause
"""

with open(apply_bat_path, "w", encoding="utf-8") as f:
    f.write(apply_bat_content)
print(f" [v] Generated: Apply_Patch.bat")

# 5. Zip into patch archive
zip_path = os.path.join(OUTPUT_DIR, f"{patch_name}.zip")
print(f"[*] Compressing patch archive: {zip_path}...")
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(patch_folder):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, patch_folder)
            zipf.write(full_path, rel_path)

zip_size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"==============================================================================")
print(f"[v] Patch Created Successfully!")
print(f"    - Output Folder : {patch_folder}")
print(f"    - ZIP Package   : {zip_path} ({zip_size_mb:.2f} MB)")
print(f"    - Status        : 100% Ready (Zero WZ files needed, installs in 2 seconds!)")
print(f"==============================================================================")
