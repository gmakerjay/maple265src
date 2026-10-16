---
description: Clean directory structure, docs folder organization, and zero-scratch policy.
---

# Clean Directory & Zero-Scratch Policy

1. **Root Directory Cleanliness**:
   - The root directory must contain only official smart launcher batch files (`*.bat`), `AGENTS.md`, `README.md`, `PROGRESS.md`, `backup.sql`, and `maplestory.jar`.
   - Never leave loose documents, temporary scripts, or one-off tests in root or `v214 src/`.

2. **All Guides in `docs/`**:
   - All manuals, command lists, and player guides must reside in `docs/`:
     - `docs/MapleStory_Commands_Guide.md`
     - `docs/HOW_TO_USE.txt`
     - `docs/HOW_TO_PLAY_LAN.txt`

3. **Zero-Scratch & No Obsolete Handoffs**:
   - Do NOT create `scratch/` folders or leave temporary scripts (`test.py`, `check_*.py`, etc.) behind. Always clean up temporary files before completing the task.
   - Do NOT create separate `HANDOFF.md` or obsolete note files. All progress and state must be recorded in `PROGRESS.md` and `AGENTS.md`.
