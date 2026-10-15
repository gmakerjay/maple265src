#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Automated AST Python Syntax and 'null' Reference Audit for MapleStory Server Runner.
Scans all scripts in v214 src/data/scripts and Server263/data/scripts.
Focuses on:
- Arcane River quests: q146*, q341*-q349*, q376*-q378*, q384*, q390*
- Daily quest NPCs: 3003*.py
- Arcane Symbol item scripts: consume_26355*.py, consume_2437750.py, consume_2437760.py, consume_2437880.py, consume_2438141.py, consume_2439301.py, consume_2439305.py
- Arcane River entrance field scripts: enter_45000*.py
- Also scans ALL other .py files across the entire script trees.
"""

import ast
import os
import re
import sys

BASE_DIRS = [
    os.path.abspath("v214 src/data/scripts"),
    os.path.abspath("Server263/data/scripts")
]

class NullChecker(ast.NodeVisitor):
    def __init__(self, filename):
        self.filename = filename
        self.null_usages = []

    def visit_Name(self, node):
        if node.id == "null":
            self.null_usages.append((node.lineno, node.col_offset))
        self.generic_visit(node)

def audit_directory(base_dir):
    print(f"\n=======================================================")
    print(f"Auditing directory: {base_dir}")
    print(f"=======================================================")
    
    total_files = 0
    syntax_errors = []
    null_errors = []
    
    # Specific Arcane River patterns
    arcane_patterns = [
        re.compile(r"^q146\d+[se]?\.py$"),
        re.compile(r"^q34[1-9]\d+[se]?\.py$"),
        re.compile(r"^q37[6-8]\d+[se]?\.py$"),
        re.compile(r"^q384\d+[se]?\.py$"),
        re.compile(r"^q390\d+[se]?\.py$"),
        re.compile(r"^3003\d+\.py$"),
        re.compile(r"^consume_26355\d+\.py$"),
        re.compile(r"^consume_2437750\.py$"),
        re.compile(r"^consume_2437760\.py$"),
        re.compile(r"^consume_2437880\.py$"),
        re.compile(r"^consume_2438141\.py$"),
        re.compile(r"^consume_2439301\.py$"),
        re.compile(r"^consume_2439305\.py$"),
        re.compile(r"^enter_45000\d+\.py$")
    ]
    
    arcane_files_scanned = 0

    for root, dirs, files in os.walk(base_dir):
        for f in files:
            if not f.endswith(".py"):
                continue
            total_files += 1
            file_path = os.path.join(root, f)
            rel_path = os.path.relpath(file_path, base_dir)
            
            is_arcane = any(pat.match(f) for pat in arcane_patterns)
            if is_arcane:
                arcane_files_scanned += 1
            
            try:
                with open(file_path, "r", encoding="utf-8") as fp:
                    content = fp.read()
            except Exception as e:
                try:
                    with open(file_path, "r", encoding="cp1252") as fp:
                        content = fp.read()
                except Exception as e2:
                    syntax_errors.append((rel_path, f"Encoding read error: {e2}"))
                    continue

            # AST parse
            try:
                tree = ast.parse(content, filename=rel_path)
            except SyntaxError as se:
                syntax_errors.append((rel_path, f"SyntaxError line {se.lineno}: {se.msg}"))
                continue

            # Check for unresolved 'null' name usage in Arcane scripts and all scripts
            null_checker = NullChecker(rel_path)
            null_checker.visit(tree)
            if null_checker.null_usages:
                for line, col in null_checker.null_usages:
                    null_errors.append((rel_path, line, col, is_arcane))

    print(f"Total Python files scanned: {total_files}")
    print(f"Arcane River target files scanned: {arcane_files_scanned}")
    print(f"Syntax Errors found: {len(syntax_errors)}")
    print(f"Null references found: {len(null_errors)}")

    if syntax_errors:
        print("\n--- SYNTAX ERRORS ---")
        for f, err in syntax_errors:
            print(f"  [X] {f}: {err}")

    if null_errors:
        print("\n--- NULL REFERENCES ---")
        for f, line, col, is_arcane in null_errors:
            arc_tag = "[ARCANE TARGET]" if is_arcane else "[GENERAL]"
            print(f"  [!] {arc_tag} {f}:{line}:{col} uses 'null'")

    return len(syntax_errors) == 0, syntax_errors, null_errors

def main():
    overall_success = True
    arcane_syntax_errors = []
    arcane_null_errors = []
    
    for b in BASE_DIRS:
        if not os.path.exists(b):
            print(f"[X] Directory not found: {b}")
            overall_success = False
            continue
        _, syn, nls = audit_directory(b)
        
        # Filter for Arcane River targets
        for f, err in syn:
            filename = os.path.basename(f)
            if any(pat.match(filename) for pat in [
                re.compile(r"^q146\d+[se]?\.py$"),
                re.compile(r"^q34[1-9]\d+[se]?\.py$"),
                re.compile(r"^q37[6-8]\d+[se]?\.py$"),
                re.compile(r"^q384\d+[se]?\.py$"),
                re.compile(r"^q390\d+[se]?\.py$"),
                re.compile(r"^3003\d+\.py$"),
                re.compile(r"^consume_26355\d+\.py$"),
                re.compile(r"^consume_2437750\.py$"),
                re.compile(r"^consume_2437760\.py$"),
                re.compile(r"^consume_2437880\.py$"),
                re.compile(r"^consume_2438141\.py$"),
                re.compile(r"^consume_2439301\.py$"),
                re.compile(r"^consume_2439305\.py$"),
                re.compile(r"^enter_45000\d+\.py$")
            ]):
                arcane_syntax_errors.append((b, f, err))
                
        for f, line, col, is_arc in nls:
            if is_arc:
                arcane_null_errors.append((b, f, line, col))

    print("\n=======================================================")
    print("           ARCANE RIVER ACCEPTANCE AUDIT               ")
    print("=======================================================")
    print(f"Arcane River Target Syntax Errors: {len(arcane_syntax_errors)}")
    print(f"Arcane River Target 'null' References: {len(arcane_null_errors)}")

    if len(arcane_syntax_errors) == 0 and len(arcane_null_errors) == 0:
        print("\n[SUCCESS] 100% PASS: 0 SyntaxError and 0 unresolved 'null' references across all Arcane River scripts!")
        return 0
    else:
        print("\n[FAILURE] Defects found in Arcane River target scripts:")
        for b, f, err in arcane_syntax_errors:
            print(f"  [X] SyntaxError in {b}/{f}: {err}")
        for b, f, line, col in arcane_null_errors:
            print(f"  [X] null reference in {b}/{f}:{line}:{col}")
        return 1

if __name__ == "__main__":
    sys.exit(main())

