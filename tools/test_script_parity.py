#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script Parity Verification Tool.
Compares v214 src/data/scripts and Server263/data/scripts to verify 100% parity.
Excludes __pycache__, .pyc, and temporary files.
"""

import filecmp
import hashlib
import os
import sys

DIR_V214 = os.path.abspath("v214 src/data/scripts")
DIR_SERVER263 = os.path.abspath("Server263/data/scripts")

EXCLUDE_DIRS = {"__pycache__"}
EXCLUDE_EXTS = {".pyc", ".class"}

def get_file_list(base_dir):
    file_map = {}
    for root, dirs, files in os.walk(base_dir):
        # Exclude directories in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            if any(f.endswith(ext) for ext in EXCLUDE_EXTS):
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, base_dir)
            file_map[rel_path.replace("\\", "/")] = full_path
    return file_map

def sha256(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def check_parity():
    print("=======================================================")
    print("         SCRIPT DIRECTORY PARITY AUDIT                 ")
    print("=======================================================")
    print(f"Dir 1 (Source):       {DIR_V214}")
    print(f"Dir 2 (Distribution): {DIR_SERVER263}")
    print("=======================================================\n")

    files_v214 = get_file_list(DIR_V214)
    files_server263 = get_file_list(DIR_SERVER263)

    set_v214 = set(files_v214.keys())
    set_server263 = set(files_server263.keys())

    only_in_v214 = sorted(list(set_v214 - set_server263))
    only_in_server263 = sorted(list(set_server263 - set_v214))
    common_files = sorted(list(set_v214 & set_server263))

    content_mismatches = []
    for rel_path in common_files:
        p1 = files_v214[rel_path]
        p2 = files_server263[rel_path]
        if not filecmp.cmp(p1, p2, shallow=False):
            h1 = sha256(p1)
            h2 = sha256(p2)
            content_mismatches.append((rel_path, h1, h2))

    print(f"Total files in v214 src/data/scripts/:     {len(files_v214)}")
    print(f"Total files in Server263/data/scripts/:    {len(files_server263)}")
    print(f"Common files compared:                     {len(common_files)}")
    print(f"Files only in v214 src:                    {len(only_in_v214)}")
    print(f"Files only in Server263:                   {len(only_in_server263)}")
    print(f"Content byte discrepancies:                {len(content_mismatches)}")

    if only_in_v214:
        print("\n[!] Files present in v214 src but missing in Server263:")
        for f in only_in_v214[:20]:
            print(f"  + {f}")
        if len(only_in_v214) > 20:
            print(f"  ... and {len(only_in_v214) - 20} more")

    if only_in_server263:
        print("\n[!] Files present in Server263 but missing in v214 src:")
        for f in only_in_server263[:20]:
            print(f"  + {f}")
        if len(only_in_server263) > 20:
            print(f"  ... and {len(only_in_server263) - 20} more")

    if content_mismatches:
        print("\n[!] Content discrepancies between common files:")
        for f, h1, h2 in content_mismatches[:20]:
            print(f"  * {f} (v214: {h1[:8]}.. vs Server263: {h2[:8]}..)")
        if len(content_mismatches) > 20:
            print(f"  ... and {len(content_mismatches) - 20} more")

    if not only_in_v214 and not only_in_server263 and not content_mismatches:
        print("\n[SUCCESS] 100% PARITY CONFIRMED! All script files are identical across both directories!")
        return 0
    else:
        print("\n[FAILURE] Discrepancies detected between source and distribution scripts!")
        return 1

if __name__ == "__main__":
    sys.exit(check_parity())
