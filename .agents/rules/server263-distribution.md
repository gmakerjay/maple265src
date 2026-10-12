---
description: Rules and memory that Server263 is the packed distribution source and must work on every machine and every drive
---

# Server263 Distribution Package & Portability Rules

1. **Official Distribution Target**:
   - `Server263` (`c:\Users\admin\Documents\MapleStory_Server_Runner\Server263`) is the official, pre-packed, zero-install, ready-to-distribute package for this project.
   - Any ready-to-use distribution must be maintained and verified inside `Server263`.

2. **100% Cross-Drive and Cross-Machine Portability**:
   - The package must run out of the box when copied or unzipped to ANY drive (`C:`, `D:`, `E:`, USB, external SSD) and ANY Windows machine without installing Java or MySQL/MariaDB.
   - NO hardcoded absolute paths (`C:\...`, `Users\admin`, etc.) inside any `.ini`, `.properties`, or `.bat` files.
   - All batch scripts use `%~dp0` to resolve paths relative to their own location.
   - MariaDB is run on port `33066` to avoid conflicts with system MySQL `3306`.
   - Before launching MariaDB, stale `mariadb\data\my.ini` is deleted so MariaDB never attempts to resolve an old machine/drive path.
   - Dynamic path variables for MariaDB (`basedir`, `datadir`) are quoted to support paths containing spaces.

3. **Incremental Patch Policy**:
   - The user only compresses the heavy WZ data (`data/wz265/` ~5 GB) once for the initial base package.
   - For all future updates, fixes, and modifications, ALWAYS deliver changes as an **Incremental Patch** (containing only updated files like `maplestory.jar`, changed scripts, configs, or batch files).
   - The user or recipients will simply extract/overwrite the patch files into `Server263/` in seconds without touching the WZ files.
