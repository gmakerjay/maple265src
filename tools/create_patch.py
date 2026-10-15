import os
import sys
import zipfile
import shutil
from datetime import datetime

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SERVER263_DIR = os.path.join(ROOT_DIR, "Server263")
if not os.path.exists(SERVER263_DIR):
    alt_dir = os.path.abspath(os.path.join(ROOT_DIR, "..", "Server263"))
    if os.path.exists(alt_dir):
        SERVER263_DIR = alt_dir

OUTPUT_DIR = os.path.join(ROOT_DIR, "Patches")
if not os.path.exists(OUTPUT_DIR):
    alt_output = os.path.abspath(os.path.join(ROOT_DIR, "..", "Patches"))
    if os.path.exists(os.path.dirname(alt_output)):
        OUTPUT_DIR = alt_output

if not os.path.exists(SERVER263_DIR):
    print(f"[X] Error: Server263 folder not found at {SERVER263_DIR}")
    sys.exit(1)

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Clean up older patches to ensure strictly ONLY ONE patch file remains
for item in os.listdir(OUTPUT_DIR):
    item_path = os.path.join(OUTPUT_DIR, item)
    if item != ".gitkeep":
        if os.path.isdir(item_path):
            shutil.rmtree(item_path, ignore_errors=True)
        elif os.path.isfile(item_path):
            try:
                os.remove(item_path)
            except Exception:
                pass

patch_folder = os.path.join(OUTPUT_DIR, "_temp_patch_build")
if os.path.exists(patch_folder):
    shutil.rmtree(patch_folder, ignore_errors=True)
os.makedirs(patch_folder, exist_ok=True)

print(f"==============================================================================")
print(f"       MapleStory Server263 All-in-One Incremental Patch Creator              ")
print(f"==============================================================================")
print(f"[*] Packaging all patch files into single release archive...")

# 1. Root patch files
files_to_copy = [
    "maplestory.jar",
    "server.properties",
    "1_Start_Server.bat",
    "3_Stop_Server.bat",
    "4_Server_Control_Panel.bat",
    "Import_Database.bat",
    "Create_Account.bat",
    "Create_Update_Patch.bat",
    "HOW_TO_USE.txt",
    "HOW_TO_PLAY_LAN.txt",
    "backup.sql"
]

for f in files_to_copy:
    src = os.path.join(SERVER263_DIR, f)
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(patch_folder, f))
        print(f" [v] Added file: {f}")

# 2. Copy scripts folder (excluding compiled class/cache files)
scripts_src = os.path.join(SERVER263_DIR, "data", "scripts")
scripts_dst = os.path.join(patch_folder, "data", "scripts")
if os.path.exists(scripts_src):
    shutil.copytree(
        scripts_src, 
        scripts_dst, 
        ignore=shutil.ignore_patterns("*.class", "__pycache__", "*.pyc"),
        dirs_exist_ok=True
    )
    print(f" [v] Added folder: data/scripts/ (Clean NPC & Quest scripts)")

# 2.1 Copy resources folder (mob_drops.json, etc.)
res_src = os.path.join(SERVER263_DIR, "data", "resources")
res_dst = os.path.join(patch_folder, "data", "resources")
if os.path.exists(res_src):
    shutil.copytree(res_src, res_dst, dirs_exist_ok=True)
    print(f" [v] Added folder: data/resources/ (mob_drops.json, events)")

# 2.2 Copy sql folder
sql_src = os.path.join(SERVER263_DIR, "sql")
sql_dst = os.path.join(patch_folder, "sql")
if os.path.exists(sql_src):
    shutil.copytree(sql_src, sql_dst, dirs_exist_ok=True)
    print(f" [v] Added folder: sql/ (SQL schemas and definitions)")

# 3. Copy Client_Patch_Files (Launcher, Localhost.dll, launcher.ini, etc.)
client_src = os.path.join(SERVER263_DIR, "Client_Patch_Files")
client_dst = os.path.join(patch_folder, "Client_Patch_Files")
if os.path.exists(client_src):
    shutil.copytree(client_src, client_dst, dirs_exist_ok=True)
    print(f" [v] Added folder: Client_Patch_Files/ (Launcher, Localhost.dll, 1-Click Installer)")

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
if exist "%~dp01_Start_Server.bat" set "TARGET_DIR=%~dp0"

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
if exist "Create_Account.bat" copy /y "Create_Account.bat" "!TARGET_DIR!\Create_Account.bat" >nul
if exist "Create_Update_Patch.bat" copy /y "Create_Update_Patch.bat" "!TARGET_DIR!\Create_Update_Patch.bat" >nul
if exist "HOW_TO_USE.txt" copy /y "HOW_TO_USE.txt" "!TARGET_DIR!\HOW_TO_USE.txt" >nul
if exist "HOW_TO_PLAY_LAN.txt" copy /y "HOW_TO_PLAY_LAN.txt" "!TARGET_DIR!\HOW_TO_PLAY_LAN.txt" >nul
if exist "backup.sql" copy /y "backup.sql" "!TARGET_DIR!\backup.sql" >nul
if not exist "!TARGET_DIR!\server.properties" (
    if exist "server.properties" copy /y "server.properties" "!TARGET_DIR!\server.properties" >nul
)

if exist "sql" (
    echo [*] Updating SQL schema files...
    xcopy "sql" "!TARGET_DIR!\sql\" /E /Y /I /Q >nul
)

if exist "data\scripts" (
    echo [*] Updating NPC & Quest scripts...
    xcopy "data\scripts" "!TARGET_DIR!\data\scripts\" /E /Y /I /Q >nul
)

if exist "data\resources" (
    echo [*] Updating Drop tables and resources...
    xcopy "data\resources" "!TARGET_DIR!\data\resources\" /E /Y /I /Q >nul
)

if exist "Client_Patch_Files" (
    echo [*] Updating Client Patch Files...
    xcopy "Client_Patch_Files" "!TARGET_DIR!\Client_Patch_Files\" /E /Y /I /Q >nul
)

echo.
echo ==============================================================================
echo   [v] Server Patch applied successfully! (WZ and player database preserved)
echo ==============================================================================
echo.

if exist "!TARGET_DIR!\Client_Patch_Files\Install_Client_Patch.bat" (
    echo [*] Would you also like to update the Localhost Client Patch into your MapleStory game folder?
    set /p "INSTALL_CLIENT=Install client patch now? (Y/N): "
    if /i "!INSTALL_CLIENT!"=="Y" (
        call "!TARGET_DIR!\Client_Patch_Files\Install_Client_Patch.bat"
    )
)

echo.
pause
"""

with open(apply_bat_path, "w", encoding="utf-8") as f:
    f.write(apply_bat_content)
print(f" [v] Generated: Apply_Patch.bat")

# 5. Zip into single patch archive
single_zip_path = os.path.join(OUTPUT_DIR, "Server263_Patch_Latest.zip")
print(f"[*] Compressing All-in-One patch archive: {single_zip_path}...")
with zipfile.ZipFile(single_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(patch_folder):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, patch_folder)
            zipf.write(full_path, rel_path)

zip_size_mb = os.path.getsize(single_zip_path) / (1024 * 1024)
shutil.rmtree(patch_folder, ignore_errors=True)

print(f"==============================================================================")
print(f"[v] All-in-One Patch Created Successfully!")
print(f"    - Patch Package : {single_zip_path} ({zip_size_mb:.2f} MB)")
print(f"    - Total Files   : 1 single file in '{OUTPUT_DIR}'")
print(f"    - Included      : Server Runner Core + Scripts + Resources + Client Patch Files")
print(f"    - Status        : 100% Ready for Distribution & Instant 1-Click Update")
print(f"==============================================================================")
