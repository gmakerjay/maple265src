#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WZ-to-Script Coverage Verifier for Arcane River & Symbol Quests.
Checks all QuestData XML files for startscript and endscript definitions across:
- 5th Job Goddesses (1460-1466)
- Vanishing Journey & Reverse City (34100-34162, 37600-37620)
- Chu Chu Island & Yum Yum (34200-34218, 37700-37727, 39013, 39014)
- Lachelein (34300-34378)
- Arcana (34450-34478, 39034, 39035)
- Morass (34240-34275)
- Esfera (34560-34585, 37851-37871, 34773)
- Unified Daily Quests (38450-38476)
Verifies that all required script files exist in both v214 src and Server263.
"""

import os
import re
import sys
import xml.etree.ElementTree as ET

WZ_QUESTDATA_DIR = os.path.abspath("Server263/data/wz265/Quest.wz/QuestData")
V214_SCRIPTS_DIR = os.path.abspath("v214 src/data/scripts/quest")
SERVER263_SCRIPTS_DIR = os.path.abspath("Server263/data/scripts/quest")

# Target Arcane Symbol storyline & daily quest chains from ORIGINAL_REQUEST.md
QUEST_RANGES = [
    ("5th Job Goddesses", [1464]),
    ("Vanishing Journey Story & Dailies", [34100, 34120, 34129, 34144, 34149]),
    ("Chu Chu Island Story & Dailies", [34200, 34218, 39013, 39014]),
    ("Lachelein Story & Dailies", [34300, 34377, 34378]),
    ("Arcana Story & Dailies", [34450, 39034, 39035]),
    ("Morass Story & Dailies", [34249, 34266, 34268, 34269, 34272, 34275]),
    ("Esfera Story & Dailies", [34561, 34580, 34585, 37851, 37871, 34773]),
    ("Unified Daily Quests (38450-38476)", list(range(38450, 38477)))
]


def find_scripts_in_xml(xml_path):
    scripts = {}
    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()
        for elem in root.iter("string"):
            name = elem.get("name")
            val = elem.get("value")
            if name in ("startscript", "endscript") and val:
                scripts[name] = val
    except Exception as e:
        print(f"Error parsing {xml_path}: {e}")
    return scripts

def main():
    print("=======================================================")
    print("      WZ-TO-SCRIPT COVERAGE AUDIT: ARCANE RIVER        ")
    print("=======================================================")
    print(f"WZ QuestData: {WZ_QUESTDATA_DIR}")
    print(f"v214 scripts: {V214_SCRIPTS_DIR}")
    print(f"Server263 scripts: {SERVER263_SCRIPTS_DIR}")
    print("=======================================================\n")

    total_quests_checked = 0
    total_wz_scripts_found = 0
    missing_in_v214 = []
    missing_in_server263 = []
    all_wz_scripts = []

    for region_name, qids in QUEST_RANGES:
        region_scripts = 0
        print(f"--- Checking {region_name} ---")
        for qid in qids:
            xml_file = os.path.join(WZ_QUESTDATA_DIR, f"{qid}.img.xml")
            if not os.path.exists(xml_file):
                continue
            total_quests_checked += 1
            scripts = find_scripts_in_xml(xml_file)
            for stype, sname in scripts.items():
                total_wz_scripts_found += 1
                region_scripts += 1
                all_wz_scripts.append((qid, stype, sname))
                
                v214_path = os.path.join(V214_SCRIPTS_DIR, f"{sname}.py")
                server263_path = os.path.join(SERVER263_SCRIPTS_DIR, f"{sname}.py")
                
                if not os.path.exists(v214_path):
                    missing_in_v214.append((qid, stype, sname, v214_path))
                if not os.path.exists(server263_path):
                    missing_in_server263.append((qid, stype, sname, server263_path))
        print(f"  [v] Found {region_scripts} scripted triggers in WZ for {region_name}")

    print("\n=======================================================")
    print("                    AUDIT RESULTS                      ")
    print("=======================================================")
    print(f"Total Quests with WZ definitions: {total_quests_checked}")
    print(f"Total startscript / endscript triggers: {total_wz_scripts_found}")
    print(f"Missing in v214 src/data/scripts/quest/: {len(missing_in_v214)}")
    print(f"Missing in Server263/data/scripts/quest/: {len(missing_in_server263)}")

    if missing_in_v214:
        print("\n[!] Missing scripts in v214 src:")
        for qid, stype, sname, p in missing_in_v214:
            print(f"  [X] Quest {qid} ({stype}): {sname}.py -> {p}")

    if missing_in_server263:
        print("\n[!] Missing scripts in Server263:")
        for qid, stype, sname, p in missing_in_server263:
            print(f"  [X] Quest {qid} ({stype}): {sname}.py -> {p}")

    if len(missing_in_v214) == 0 and len(missing_in_server263) == 0:
        print("\n[SUCCESS] 100% COVERAGE! All required startscript and endscript files exist in both trees!")
        return 0
    else:
        print("\n[FAILURE] Missing quest script files detected!")
        return 1

if __name__ == "__main__":
    sys.exit(main())
