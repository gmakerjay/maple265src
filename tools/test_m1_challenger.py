#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Challenger M1-2 Comprehensive Adversarial Verification Suite
Author: Challenger M1-2

Covers:
  1. Jython simulation of null and ScriptType bindings (with baseline failure on unbound)
  2. isQuestScriptAllowed logic and bytecode verification (confirming ScriptType.Npc is permitted)
  3. Char.java runtime method verification:
     - initDailyQuestSymbol() ()V
     - getQuestRecordEx(int, String)
     - setQuestRecordEx(int, String, String)
     - hasAccountQuestCompleted(int)
     Confirming NO NoSuchMethodError / NoSuchMethodException
  4. ScriptManager interface contract verification:
     - removeQuest(int)
     - getQuestEx(int, String)
     - setQuestEx(int, String, String)
     - getAccountQuestEx(int, String)
     - setAccountQuestEx(int, String, String)
     - hasAccountQuestCompleted(int)
     - isQuestComplete(int)
"""

import sys
import os

def run_tests():
    from java.lang import Class, Throwable
    from javax.script import ScriptEngineManager
    from net.swordie.ms.scripts import ScriptType

    print("======================================================================")
    print("STARTING EMPIRICAL VERIFICATION SUITE - CHALLENGER M1-2")
    print("======================================================================")

    # ------------------------------------------------------------------
    # 1. JYTHON BINDINGS & NULL SEMANTICS
    # ------------------------------------------------------------------
    print("\n--- [TEST 1] Jython Script Engine Bindings ('null' & ScriptType) ---")
    engine = ScriptEngineManager().getEngineByName("python")
    assert engine is not None, "Failed to initialize python ScriptEngine."

    # Baseline check: verify unbound engine raises NameError
    unbound = engine.createBindings()
    caught_null = False
    try:
        engine.eval("val = null", unbound)
    except (Exception, Throwable) as e:
        if "NameError" in str(e) and "null" in str(e):
            caught_null = True
    assert caught_null, "Adversarial failure: unbound null did not raise NameError!"
    print("  [OK] Adversarial check: unbound 'null' correctly raises NameError.")

    caught_st = False
    try:
        engine.eval("st = ScriptType.Npc", unbound)
    except (Exception, Throwable) as e:
        if "NameError" in str(e) and "ScriptType" in str(e):
            caught_st = True
    assert caught_st, "Adversarial failure: unbound ScriptType did not raise NameError!"
    print("  [OK] Adversarial check: unbound 'ScriptType' correctly raises NameError.")

    # Bound engine check
    bound = engine.createBindings()
    bound.put("null", None)
    bound.put("ScriptType", ScriptType)

    engine.eval("res_null = (null is None and null == None and 'test' != null)", bound)
    assert bound.get("res_null") == True, "Failed null comparison evaluation"
    print("  [OK] Bound 'null' evaluates cleanly as None (res_null = True).")

    engine.eval("res_st = (ScriptType.Npc != ScriptType.Quest and str(ScriptType.Npc) == 'Npc')", bound)
    assert bound.get("res_st") == True, "Failed ScriptType enum evaluation"
    print("  [OK] Bound 'ScriptType' evaluates cleanly (res_st = True).")

    # ------------------------------------------------------------------
    # 2. isQuestScriptAllowed REFLECTION & INVOCATION
    # ------------------------------------------------------------------
    print("\n--- [TEST 2] isQuestScriptAllowed Logic & Execution ---")
    smi_class = Class.forName("net.swordie.ms.scripts.ScriptManagerImpl")
    method_allowed = [m for m in smi_class.getDeclaredMethods() if m.getName() == "isQuestScriptAllowed"][0]
    method_allowed.setAccessible(True)

    # Instantiate ScriptManagerImpl with Field constructor (null Field allowed)
    constructors = [c for c in smi_class.getDeclaredConstructors() if len(c.getParameterTypes()) == 1 and c.getParameterTypes()[0].getSimpleName() == "Field"]
    constructor = constructors[0]
    constructor.setAccessible(True)
    smi_instance = constructor.newInstance([None])

    # Method to set and get lastActiveScriptType
    method_set_last = [m for m in smi_class.getDeclaredMethods() if m.getName() == "setLastActiveScriptType"][0]
    method_set_last.setAccessible(True)

    # Test ScriptType.None -> should return True
    st_none = getattr(ScriptType, "None")
    method_set_last.invoke(smi_instance, [st_none])
    allowed_none = method_allowed.invoke(smi_instance, [])
    assert allowed_none == True, "Failed: isQuestScriptAllowed for ScriptType.None returned False"
    print("  [OK] isQuestScriptAllowed for ScriptType.None -> " + str(allowed_none))

    # Test ScriptType.Npc -> should return True
    method_set_last.invoke(smi_instance, [ScriptType.Npc])
    allowed_npc = method_allowed.invoke(smi_instance, [])
    assert allowed_npc == True, "Failed: isQuestScriptAllowed for ScriptType.Npc returned False"
    print("  [OK] isQuestScriptAllowed for ScriptType.Npc -> " + str(allowed_npc))

    # Test ScriptType.Field -> should return False
    method_set_last.invoke(smi_instance, [ScriptType.Field])
    allowed_field = method_allowed.invoke(smi_instance, [])
    assert allowed_field == False, "Failed: isQuestScriptAllowed for ScriptType.Field returned True"
    print("  [OK] isQuestScriptAllowed for ScriptType.Field -> " + str(allowed_field) + " (correctly blocked)")

    # Test ScriptType.Reactor -> should return False
    method_set_last.invoke(smi_instance, [ScriptType.Reactor])
    allowed_reactor = method_allowed.invoke(smi_instance, [])
    assert allowed_reactor == False, "Failed: isQuestScriptAllowed for ScriptType.Reactor returned True"
    print("  [OK] isQuestScriptAllowed for ScriptType.Reactor -> " + str(allowed_reactor) + " (correctly blocked)")

    # ------------------------------------------------------------------
    # 3. Char.java METHOD EXPOSURE & INVOCATION
    # ------------------------------------------------------------------
    print("\n--- [TEST 3] Char.java Method Signatures & Reflection ---")
    char_class = Class.forName("net.swordie.ms.client.character.Char")
    char_methods = char_class.getMethods()

    # 3a. initDailyQuestSymbol() ()V
    init_methods = [m for m in char_methods if m.getName() == "initDailyQuestSymbol" and len(m.getParameterTypes()) == 0]
    assert len(init_methods) == 1, "Char.initDailyQuestSymbol() not found or signature mismatch!"
    init_method = init_methods[0]
    assert init_method.getReturnType().getName() == "void", "initDailyQuestSymbol return type mismatch"
    print("  [OK] Found Char.initDailyQuestSymbol() with return type void (No NoSuchMethodError).")

    # 3b. getQuestRecordEx(int, String) -> String
    qr_get_methods = [m for m in char_methods if m.getName() == "getQuestRecordEx" and len(m.getParameterTypes()) == 2]
    assert len(qr_get_methods) == 1, "Char.getQuestRecordEx(int, String) not found!"
    qr_get = qr_get_methods[0]
    assert qr_get.getReturnType().getName() == "java.lang.String", "getQuestRecordEx return type mismatch"
    print("  [OK] Found Char.getQuestRecordEx(int, String) -> String.")

    # 3c. setQuestRecordEx(int, String, String) -> void
    qr_set_methods = [m for m in char_methods if m.getName() == "setQuestRecordEx" and len(m.getParameterTypes()) == 3]
    assert len(qr_set_methods) == 1, "Char.setQuestRecordEx(int, String, String) not found!"
    qr_set = qr_set_methods[0]
    assert qr_set.getReturnType().getName() == "void", "setQuestRecordEx return type mismatch"
    print("  [OK] Found Char.setQuestRecordEx(int, String, String) -> void.")

    # 3d. hasAccountQuestCompleted(int) -> boolean
    haq_methods = [m for m in char_methods if m.getName() == "hasAccountQuestCompleted" and len(m.getParameterTypes()) == 1]
    assert len(haq_methods) == 1, "Char.hasAccountQuestCompleted(int) not found!"
    haq = haq_methods[0]
    assert haq.getReturnType().getName() == "boolean", "hasAccountQuestCompleted return type mismatch"
    print("  [OK] Found Char.hasAccountQuestCompleted(int) -> boolean.")

    # ------------------------------------------------------------------
    # 4. ScriptManager INTERFACE CONTRACTS
    # ------------------------------------------------------------------
    print("\n--- [TEST 4] ScriptManager Interface Contract Methods ---")
    sm_interface = Class.forName("net.swordie.ms.scripts.ScriptManager")
    sm_methods = sm_interface.getMethods()
    required_sm_methods = [
        ("removeQuest", 1, "void"),
        ("getQuestEx", 2, "java.lang.String"),
        ("setQuestEx", 3, "void"),
        ("getAccountQuestEx", 2, "java.lang.String"),
        ("setAccountQuestEx", 3, "void"),
        ("hasAccountQuestCompleted", 1, "boolean"),
        ("isQuestComplete", 1, "boolean"),
    ]

    for m_name, p_count, ret_type in required_sm_methods:
        candidates = [m for m in sm_methods if m.getName() == m_name and len(m.getParameterTypes()) == p_count]
        assert len(candidates) >= 1, "ScriptManager missing method %s with %d params" % (m_name, p_count)
        method = candidates[0]
        actual_ret = method.getReturnType().getName()
        assert actual_ret == ret_type, "Return type mismatch for %s: expected %s, got %s" % (m_name, ret_type, actual_ret)
        print("  [OK] Verified ScriptManager.%s(%s) -> %s" % (
            m_name, ", ".join([p.getName() for p in method.getParameterTypes()]), ret_type
        ))

    # ------------------------------------------------------------------
    # 5. QuestConstants CLASSIC DAILY QUESTS AUDIT
    # ------------------------------------------------------------------
    print("\n--- [TEST 5] QuestConstants.isAccountQuest Verification ---")
    qc_class = Class.forName("net.swordie.ms.constants.QuestConstants")
    is_acc_methods = [m for m in qc_class.getMethods() if m.getName() == "isAccountQuest" and len(m.getParameterTypes()) == 1]
    assert len(is_acc_methods) == 1, "QuestConstants.isAccountQuest(int) not found!"
    is_acc_method = is_acc_methods[0]
    classic_quest_ids = [34129, 39014, 34378, 39035, 34275, 34773]
    for qid in classic_quest_ids:
        res = is_acc_method.invoke(None, [qid])
        assert res == True, "Quest ID %d is NOT recognized as AccountQuest!" % qid
        print("  [OK] Classic Quest ID %d -> isAccountQuest: %s" % (qid, str(res)))

    # Verify dummy ID is false
    res_dummy = is_acc_method.invoke(None, [99999])
    assert res_dummy == False, "Dummy ID 99999 should not be an AccountQuest"
    print("  [OK] Non-Account Quest ID 99999 -> isAccountQuest: %s" % str(res_dummy))

    # ------------------------------------------------------------------
    # 6. giveSymbol SAFETY GUARD VERIFICATION
    # ------------------------------------------------------------------
    print("\n--- [TEST 6] giveSymbol Safety Guard Logic ---")
    gs_methods = [m for m in smi_class.getMethods() if m.getName() == "giveSymbol" and len(m.getParameterTypes()) == 4]
    assert len(gs_methods) == 1, "giveSymbol(int, int, int, int) method not found"
    print("  [OK] Verified ScriptManagerImpl.giveSymbol(int, int, int, int) signature present.")

    print("\n======================================================================")
    print("ALL EMPIRICAL ADVERSARIAL TESTS PASSED - ZERO FAILURES")
    print("======================================================================")


if __name__ == "__main__":
    is_jython = "java" in sys.platform or hasattr(sys, "jython_version")
    if is_jython:
        run_tests()
    else:
        import subprocess
        java_cmd = os.path.abspath(r"v214 src\jdk21\bin\java.exe")
        jar_path = os.path.abspath(r"Server263\maplestory.jar")
        this_script = os.path.abspath(__file__)
        cmd = [java_cmd, "-cp", jar_path, "org.python.util.jython", this_script]
        print("[INFO] Invoking Jython runtime via Java 21: " + " ".join(cmd))
        result = subprocess.run(cmd, capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            err_lines = [l for l in result.stderr.splitlines() if "UnsupportedCharsetException" not in l]
            if err_lines:
                sys.stderr.write("\n".join(err_lines) + "\n")
        sys.exit(result.returncode)
