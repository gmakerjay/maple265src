#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Empirical Verification Script for Milestone 1 - Jython Bindings Simulation
Author: Challenger M1-2
Tests:
  1. Vanilla Python/Jython without bindings raises NameError for 'null' and 'ScriptType'.
  2. ScriptEngine with ScriptManagerImpl bindings (bindings.put("null", null) and bindings.put("ScriptType", ScriptType.class))
     evaluates 'null' and references 'ScriptType' without NameError.
  3. Validates null semantics: (null is None) is True, (null == None) is True, (null != "something") is True.
  4. Validates ScriptType semantics: ScriptType.Npc, ScriptType.Quest, ScriptType.None, comparisons and string representations.
"""

import sys

def run_jython_verification():
    from javax.script import ScriptEngineManager, SimpleBindings
    from net.swordie.ms.scripts import ScriptType

    engine = ScriptEngineManager().getEngineByName("python")
    if engine is None:
        raise RuntimeError("Failed to obtain 'python' ScriptEngine via JSR-223.")

    print("[INFO] Acquired JSR-223 Jython ScriptEngine successfully.")

    from java.lang import Throwable
    # -------------------------------------------------------------
    # Test 1: Adversarial Baseline - Without Bindings (Expect NameError)
    # -------------------------------------------------------------
    unbound = engine.createBindings()
    
    # 1a. Test 'null' without binding
    null_name_error_caught = False
    try:
        engine.eval("test_val = null", unbound)
    except (Exception, Throwable) as e:
        err_msg = str(e)
        if "NameError" in err_msg and "null" in err_msg:
            null_name_error_caught = True
            print("[PASS] Baseline test 1a: 'null' without binding raises NameError as expected: " + err_msg.strip().split("\n")[-1])
        else:
            print("[WARN] Baseline test 1a: Unexpected exception: " + err_msg)
    
    if not null_name_error_caught:
        raise AssertionError("Adversarial failure: unbound 'null' did not raise NameError!")

    # 1b. Test 'ScriptType' without binding
    scripttype_name_error_caught = False
    try:
        engine.eval("test_st = ScriptType.Npc", unbound)
    except (Exception, Throwable) as e:
        err_msg = str(e)
        if "NameError" in err_msg and "ScriptType" in err_msg:
            scripttype_name_error_caught = True
            print("[PASS] Baseline test 1b: 'ScriptType' without binding raises NameError as expected: " + err_msg.strip().split("\n")[-1])
        else:
            print("[WARN] Baseline test 1b: Unexpected exception: " + err_msg)
    
    if not scripttype_name_error_caught:
        raise AssertionError("Adversarial failure: unbound 'ScriptType' did not raise NameError!")

    # -------------------------------------------------------------
    # Test 2: ScriptManagerImpl Simulated Bindings (Worker M1 Fix)
    # -------------------------------------------------------------
    bindings = engine.createBindings()
    # Mirroring ScriptManagerImpl.java lines 269-270:
    # bindings.put("null", null);
    # bindings.put("ScriptType", ScriptType.class);
    bindings.put("null", None)  # In Java, passing null sets key "null" -> null
    bindings.put("ScriptType", ScriptType)

    # 2a: Evaluate 'null' expressions commonly found in quest / NPC scripts
    test_scripts_null = [
        "res_1 = (null is None)",
        "res_2 = (null == None)",
        "res_3 = (None == null)",
        "res_4 = ('hello' != null)",
        "res_5 = (null != 'hello')",
        "var_a = null\nres_6 = (var_a is None)",
        "if null:\n    res_7 = False\nelse:\n    res_7 = True",
        "qr_record = None\nres_8 = (qr_record != null)",  # False, but executes without NameError
    ]

    for snippet in test_scripts_null:
        engine.eval(snippet, bindings)

    assert bindings.get("res_1") == True, "Failed: null is None"
    assert bindings.get("res_2") == True, "Failed: null == None"
    assert bindings.get("res_3") == True, "Failed: None == null"
    assert bindings.get("res_4") == True, "Failed: 'hello' != null"
    assert bindings.get("res_5") == True, "Failed: null != 'hello'"
    assert bindings.get("res_6") == True, "Failed: var_a = null; var_a is None"
    assert bindings.get("res_7") == True, "Failed: if null condition check"
    assert bindings.get("res_8") == False, "Failed: qr_record != null"
    print("[PASS] Test 2a: All 8 'null' expressions evaluated cleanly with ZERO NameError.")

    # 2b: Evaluate 'ScriptType' enum references commonly found in NPC turn-in scripts
    test_scripts_scripttype = [
        "st_none = ScriptType.None",
        "st_npc = ScriptType.Npc",
        "st_quest = ScriptType.Quest",
        "st_field = ScriptType.Field",
        "res_st1 = (st_npc != st_quest)",
        "res_st2 = (st_npc == ScriptType.Npc)",
        "res_st3 = (str(st_quest) == 'Quest')",
        "res_st4 = (st_npc.getDir() == 'npc')",
        "res_st5 = (st_quest.getDir() == 'quest')",
    ]

    for snippet in test_scripts_scripttype:
        engine.eval(snippet, bindings)

    assert bindings.get("res_st1") == True, "Failed: st_npc != st_quest"
    assert bindings.get("res_st2") == True, "Failed: st_npc == ScriptType.Npc"
    assert bindings.get("res_st3") == True, "Failed: str(st_quest) == 'Quest'"
    assert bindings.get("res_st4") == True, "Failed: st_npc.getDir() == 'npc'"
    assert bindings.get("res_st5") == True, "Failed: st_quest.getDir() == 'quest'"
    print("[PASS] Test 2b: All 9 'ScriptType' references evaluated cleanly with ZERO NameError.")

    # -------------------------------------------------------------
    # Test 3: Realistic NPC daily quest turn-in snippet
    # -------------------------------------------------------------
    realistic_snippet = """
# Simulated NPC daily quest turn-in logic from 3003104.py
qid = 34129
parentID = 3003104
target_script = "q" + str(qid) + "e"
target_type = ScriptType.Quest

# Check if script type can be passed as argument
def dummy_start_script(chr_obj, q, script_name, s_type):
    return (q == 34129 and script_name == "q34129e" and s_type == ScriptType.Quest)

turnin_success = dummy_start_script(None, qid, target_script, target_type)

# Check null guard logic
quest_ex = null
has_quest = False
if quest_ex != null:
    has_quest = True
else:
    has_quest = False
"""
    engine.eval(realistic_snippet, bindings)
    assert bindings.get("turnin_success") == True, "Realistic turn-in script failed"
    assert bindings.get("has_quest") == False, "Realistic null check failed"
    print("[PASS] Test 3: Realistic NPC turn-in script simulation passed 100%.")

    print("\n=======================================================")
    print("ALL JYTHON SIMULATION TESTS PASSED (ZERO ERRORS)")
    print("=======================================================")


if __name__ == "__main__":
    is_jython = "java" in sys.platform or hasattr(sys, "jython_version")
    if is_jython:
        run_jython_verification()
    else:
        import subprocess
        import os
        java_cmd = os.path.abspath(r"v214 src\jdk21\bin\java.exe")
        jar_path = os.path.abspath(r"Server263\maplestory.jar")
        this_script = os.path.abspath(__file__)
        cmd = [java_cmd, "-cp", jar_path, "org.python.util.jython", this_script]
        print("[INFO] Invoking Jython runtime via Java 21: " + " ".join(cmd))
        result = subprocess.run(cmd, capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            # Filter charset warning
            err_lines = [l for l in result.stderr.splitlines() if "UnsupportedCharsetException" not in l]
            if err_lines:
                sys.stderr.write("\n".join(err_lines) + "\n")
        sys.exit(result.returncode)
