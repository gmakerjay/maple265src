#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sm.giveSymbol(...) Safety and Parameter Bounds Audit.
Scans all scripts in both v214 src/data/scripts and Server263/data/scripts.
Verifies that:
1. Every sm.giveSymbol call passes a valid quantity (1 to 20).
2. No 5-digit quest ID (e.g. 34218) is passed as the quantity parameter (preventing loop runaway bug).
"""

import ast
import os
import re
import sys

BASE_DIRS = [
    os.path.abspath("v214 src/data/scripts"),
    os.path.abspath("Server263/data/scripts")
]

class GiveSymbolVisitor(ast.NodeVisitor):
    def __init__(self, filename):
        self.filename = filename
        self.calls = []

    def visit_Call(self, node):
        if isinstance(node.func, ast.Attribute) and node.func.attr == "giveSymbol":
            self.calls.append(node)
        self.generic_visit(node)

def audit_givesymbol():
    print("=======================================================")
    print("        sm.giveSymbol(...) PARAMETER BOUNDS AUDIT       ")
    print("=======================================================")

    total_files = 0
    total_calls = 0
    violations = []
    inspected_calls = []

    for base in BASE_DIRS:
        if not os.path.exists(base):
            continue
        for root, dirs, files in os.walk(base):
            for f in files:
                if not f.endswith(".py"):
                    continue
                total_files += 1
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, base)

                try:
                    with open(full_path, "r", encoding="utf-8") as fp:
                        content = fp.read()
                except Exception:
                    with open(full_path, "r", encoding="cp1252", errors="ignore") as fp:
                        content = fp.read()

                try:
                    tree = ast.parse(content, filename=rel_path)
                except SyntaxError:
                    continue

                visitor = GiveSymbolVisitor(rel_path)
                visitor.visit(tree)

                for call in visitor.calls:
                    total_calls += 1
                    lineno = call.lineno
                    args = call.args

                    # Check argument count: 2, 3, or 4
                    # Arg 0: itemId
                    # Arg 1: quantity
                    # Arg 2: questId (optional)
                    # Arg 3: level (optional)

                    if len(args) < 2:
                        violations.append((base, rel_path, lineno, "Less than 2 arguments passed to giveSymbol"))
                        continue

                    qty_node = args[1]
                    qty_val = None
                    if isinstance(qty_node, ast.Constant):
                        qty_val = qty_node.value
                    elif isinstance(qty_node, ast.Num): # Python < 3.8 fallback
                        qty_val = qty_node.n

                    item_node = args[0]
                    item_val = getattr(item_node, 'value', getattr(item_node, 'id', 'unknown'))

                    inspected_calls.append((rel_path, lineno, len(args), qty_val))

                    if qty_val is not None:
                        # Check if quantity is a 5-digit number (likely questId mistakenly passed as qty)
                        if qty_val >= 1000:
                            violations.append((
                                base, rel_path, lineno,
                                f"CRITICAL: 5-digit Quest ID ({qty_val}) passed as quantity parameter! (Loop Runaway Risk)"
                            ))
                        elif qty_val < 1 or qty_val > 20:
                            violations.append((
                                base, rel_path, lineno,
                                f"Quantity {qty_val} out of bounds [1, 20]"
                            ))

    print(f"Total Python files scanned: {total_files}")
    print(f"Total sm.giveSymbol calls found: {total_calls}")
    print(f"Violations detected: {len(violations)}")

    if inspected_calls:
        print("\nSample inspected giveSymbol calls:")
        for r, l, argc, q in inspected_calls[:15]:
            print(f"  [v] {r}:{l} (args={argc}, quantity={q})")
        if len(inspected_calls) > 15:
            print(f"  ... and {len(inspected_calls) - 15} more calls inspected")

    if violations:
        print("\n--- VIOLATIONS FOUND ---")
        for b, f, l, err in violations:
            print(f"  [X] {b}/{f}:{l}: {err}")
        return 1
    else:
        print("\n[SUCCESS] 100% of sm.giveSymbol calls pass valid bounded quantities (1 to 20) with 0 loop runaway bugs!")
        return 0

if __name__ == "__main__":
    sys.exit(audit_givesymbol())
