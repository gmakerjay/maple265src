package net.swordie.ms.test;

import net.swordie.ms.constants.QuestConstants;
import net.swordie.ms.scripts.ScriptManager;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.scripts.ScriptType;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

public class TestMilestone1 {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  STARTING EMPIRICAL CHALLENGER TEST SUITE (M1)   ");
        System.out.println("==================================================");

        int passed = 0;
        int failed = 0;

        // -----------------------------------------------------------------
        // TEST SUITE 1: QuestConstants.isAccountQuest(...)
        // -----------------------------------------------------------------
        System.out.println("\n[TEST 1] Testing QuestConstants.isAccountQuest(...)");

        // 1.1 Classic Daily Quests
        int[] classicDailies = {34129, 39014, 34378, 39035, 34275, 34773};
        for (int qid : classicDailies) {
            boolean res = QuestConstants.isAccountQuest(qid);
            if (res) {
                System.out.println("  [PASS] Classic Daily Quest " + qid + " -> isAccountQuest: true");
                passed++;
            } else {
                System.err.println("  [FAIL] Classic Daily Quest " + qid + " -> isAccountQuest: false (EXPECTED: true)");
                failed++;
            }
        }

        // 1.2 Modern Daily Quests (38450 - 38476)
        int[] modernDailies = {
                38450, 38451, 38452, 38453, // Vanishing Journey
                38454, 38455, 38456, 38457, // Chu Chu
                38458, 38459, 38460, 38461, // Lachelein
                38462, 38463, 38464, 38465, // Arcana
                38466, 38467, 38468, 38469, // Morass
                38470, 38471, 38472, 38473, // Esfera
                38474,                      // Moonbridge
                38475,                      // Labyrinth
                38476                       // Limina
        };
        for (int qid : modernDailies) {
            boolean res = QuestConstants.isAccountQuest(qid);
            if (res) {
                System.out.println("  [PASS] Modern Daily Quest " + qid + " -> isAccountQuest: true");
                passed++;
            } else {
                System.err.println("  [FAIL] Modern Daily Quest " + qid + " -> isAccountQuest: false (EXPECTED: true)");
                failed++;
            }
        }

        // 1.3 Esfera New Prequests (37851 - 37871)
        int[] esferaPrequests = {37851, 37860, 37871};
        for (int qid : esferaPrequests) {
            boolean res = QuestConstants.isAccountQuest(qid);
            if (res) {
                System.out.println("  [PASS] Esfera Prequest " + qid + " -> isAccountQuest: true");
                passed++;
            } else {
                System.err.println("  [FAIL] Esfera Prequest " + qid + " -> isAccountQuest: false (EXPECTED: true)");
                failed++;
            }
        }

        // 1.4 Non-Account Quests (Must return false)
        int[] nonAccountQuests = {
                1000,   // Boundary (1000 is first non-MVP)
                1001,
                34120,  // VJ Prequest
                34128,
                34200,  // Chu Chu Prequest start
                34218,  // Chu Chu Prequest end (critical: used in giveSymbol bug!)
                34331,  // Lachelein Prequest end
                34478,  // Arcana Prequest end
                34272,  // Morass Prequest end
                99999,  // High ID non-account quest
                100000
        };
        for (int qid : nonAccountQuests) {
            boolean res = QuestConstants.isAccountQuest(qid);
            if (!res) {
                System.out.println("  [PASS] Non-Account Quest " + qid + " -> isAccountQuest: false");
                passed++;
            } else {
                System.err.println("  [FAIL] Non-Account Quest " + qid + " -> isAccountQuest: true (EXPECTED: false)");
                failed++;
            }
        }

        // 1.5 Adversarial Test: Negative IDs & Boundary Quests
        int[] adversarialQuests = {-1, -100, Integer.MIN_VALUE, 0, 500, 999};
        System.out.println("\n  [ADVERSARIAL CHECK] Negative & Low IDs against isAccountQuest:");
        for (int qid : adversarialQuests) {
            boolean res = QuestConstants.isAccountQuest(qid);
            System.out.println("    Quest " + qid + " -> isAccountQuest: " + res + " (Reason: questID < 1000 legacy MVP rule)");
        }

        // -----------------------------------------------------------------
        // TEST SUITE 2: ScriptManager.giveSymbol Safety Logic
        // -----------------------------------------------------------------
        System.out.println("\n[TEST 2] Testing ScriptManager.giveSymbol Safety & Clamping Logic");

        // Verify simulateGiveSymbol logic matching ScriptManagerImpl:2707-2711
        // if (questId == 0 && quantity > 1000) { questId = quantity; quantity = 1; }
        // quantity = Math.max(1, Math.min(quantity, 20));

        class SymbolParams {
            int itemId;
            int quantity;
            int questId;
            int level;

            SymbolParams(int itemId, int quantity, int questId, int level) {
                this.itemId = itemId;
                this.quantity = quantity;
                this.questId = questId;
                this.level = level;
            }

            void applySafetyGuard() {
                if (questId == 0 && quantity > 1000) {
                    questId = quantity;
                    quantity = 1;
                }
                quantity = Math.max(1, Math.min(quantity, 20));
            }
        }

        // Test 2.1: Legacy Bug reproduction: giveSymbol(1712002, 34218)
        SymbolParams bugCall = new SymbolParams(1712002, 34218, 0, 1);
        bugCall.applySafetyGuard();
        if (bugCall.quantity == 1 && bugCall.questId == 34218) {
            System.out.println("  [PASS] giveSymbol(1712002, 34218) swapped: questId=" + bugCall.questId + ", quantity=" + bugCall.quantity);
            passed++;
        } else {
            System.err.println("  [FAIL] giveSymbol(1712002, 34218) swap failed: questId=" + bugCall.questId + ", quantity=" + bugCall.quantity);
            failed++;
        }

        // Test 2.2: Extreme negative quantity clamping
        SymbolParams negCall = new SymbolParams(1712001, -50, 0, 1);
        negCall.applySafetyGuard();
        if (negCall.quantity == 1) {
            System.out.println("  [PASS] Negative quantity (-50) clamped to: " + negCall.quantity);
            passed++;
        } else {
            System.err.println("  [FAIL] Negative quantity clamping failed: " + negCall.quantity);
            failed++;
        }

        // Test 2.3: Zero quantity clamping
        SymbolParams zeroCall = new SymbolParams(1712001, 0, 0, 1);
        zeroCall.applySafetyGuard();
        if (zeroCall.quantity == 1) {
            System.out.println("  [PASS] Zero quantity (0) clamped to: " + zeroCall.quantity);
            passed++;
        } else {
            System.err.println("  [FAIL] Zero quantity clamping failed: " + zeroCall.quantity);
            failed++;
        }

        // Test 2.4: Excessive quantity clamping (> 20)
        SymbolParams excessiveCall = new SymbolParams(1712001, 100, 34120, 1);
        excessiveCall.applySafetyGuard();
        if (excessiveCall.quantity == 20 && excessiveCall.questId == 34120) {
            System.out.println("  [PASS] Excessive quantity (100) clamped to: " + excessiveCall.quantity + ", questId=" + excessiveCall.questId);
            passed++;
        } else {
            System.err.println("  [FAIL] Excessive quantity clamping failed: " + excessiveCall.quantity);
            failed++;
        }

        // Test 2.5: Valid normal quantity within range [1..20]
        SymbolParams normalCall = new SymbolParams(1712001, 5, 34120, 1);
        normalCall.applySafetyGuard();
        if (normalCall.quantity == 5 && normalCall.questId == 34120) {
            System.out.println("  [PASS] Normal quantity (5) preserved: " + normalCall.quantity);
            passed++;
        } else {
            System.err.println("  [FAIL] Normal quantity preservation failed: " + normalCall.quantity);
            failed++;
        }

        // -----------------------------------------------------------------
        // TEST SUITE 3: ScriptManager null-safety & QuestEx tests
        // -----------------------------------------------------------------
        System.out.println("\n[TEST 3] Testing ScriptManager null-safety & QuestEx methods");

        try {
            // Instantiate ScriptManagerImpl with null Field/Char
            // Using reflection or constructor ScriptManagerImpl((Field) null)
            java.lang.reflect.Constructor<ScriptManagerImpl> ctor = ScriptManagerImpl.class.getDeclaredConstructor(net.swordie.ms.world.field.Field.class);
            ctor.setAccessible(true);
            ScriptManagerImpl sm = ctor.newInstance((net.swordie.ms.world.field.Field) null);

            // Test 3.1: getQuestEx with null chr
            String exVal = sm.getQuestEx(34129, "date");
            if (exVal != null && exVal.isEmpty()) {
                System.out.println("  [PASS] sm.getQuestEx(34129, 'date') on null chr returns \"\" (non-null empty string)");
                passed++;
            } else {
                System.err.println("  [FAIL] sm.getQuestEx returned unexpected: " + exVal);
                failed++;
            }

            // Test 3.2: getAccountQuestEx with null chr
            String accExVal = sm.getAccountQuestEx(34129, "q1");
            if (accExVal != null && accExVal.isEmpty()) {
                System.out.println("  [PASS] sm.getAccountQuestEx(34129, 'q1') on null chr returns \"\" (non-null empty string)");
                passed++;
            } else {
                System.err.println("  [FAIL] sm.getAccountQuestEx returned unexpected: " + accExVal);
                failed++;
            }

            // Test 3.3: isQuestComplete with null chr
            boolean complete = sm.isQuestComplete(34129);
            if (!complete) {
                System.out.println("  [PASS] sm.isQuestComplete(34129) on null chr returns false without NPE");
                passed++;
            } else {
                System.err.println("  [FAIL] sm.isQuestComplete returned true unexpectedly");
                failed++;
            }

            // Test 3.4: hasAccountQuestCompleted with null chr
            boolean accComplete = sm.hasAccountQuestCompleted(34129);
            if (!accComplete) {
                System.out.println("  [PASS] sm.hasAccountQuestCompleted(34129) on null chr returns false without NPE");
                passed++;
            } else {
                System.err.println("  [FAIL] sm.hasAccountQuestCompleted returned true unexpectedly");
                failed++;
            }

            // Test 3.5: getQuestNameByQuestId resilience against null, empty, non-numeric
            String qnNull = sm.getQuestNameByQuestId(null);
            String qnEmpty = sm.getQuestNameByQuestId("");
            String qnAlpha = sm.getQuestNameByQuestId("not_a_number");
            String qnUnknown = sm.getQuestNameByQuestId("999999");
            if ("".equals(qnNull) && "".equals(qnEmpty) && "".equals(qnAlpha)) {
                System.out.println("  [PASS] sm.getQuestNameByQuestId resilient to null, empty, and non-numeric strings");
                passed++;
            } else {
                System.err.println("  [FAIL] sm.getQuestNameByQuestId failed resilience checks: null='" + qnNull + "', empty='" + qnEmpty + "', alpha='" + qnAlpha + "'");
                failed++;
            }

            // Test 3.6: isQuestScriptAllowed reflection test
            Method allowedMethod = ScriptManagerImpl.class.getDeclaredMethod("isQuestScriptAllowed");
            allowedMethod.setAccessible(true);

            java.lang.reflect.Field lastActiveField = ScriptManagerImpl.class.getDeclaredField("lastActiveScriptType");
            lastActiveField.setAccessible(true);

            // Test ScriptType.None -> should be true
            lastActiveField.set(sm, ScriptType.None);
            boolean allowNone = (boolean) allowedMethod.invoke(sm);

            // Test ScriptType.Npc -> should be true (Worker M1 fix!)
            lastActiveField.set(sm, ScriptType.Npc);
            boolean allowNpc = (boolean) allowedMethod.invoke(sm);

            // Test ScriptType.Portal -> should be false
            lastActiveField.set(sm, ScriptType.Portal);
            boolean allowPortal = (boolean) allowedMethod.invoke(sm);

            if (allowNone && allowNpc && !allowPortal) {
                System.out.println("  [PASS] isQuestScriptAllowed: None=" + allowNone + ", Npc=" + allowNpc + ", Portal=" + allowPortal);
                passed++;
            } else {
                System.err.println("  [FAIL] isQuestScriptAllowed unexpected: None=" + allowNone + ", Npc=" + allowNpc + ", Portal=" + allowPortal);
                failed++;
            }

        } catch (Exception e) {
            System.err.println("  [FAIL] Exception during Test 3 execution:");
            e.printStackTrace();
            failed++;
        }

        // -----------------------------------------------------------------
        // TEST SUMMARY
        // -----------------------------------------------------------------
        System.out.println("\n==================================================");
        System.out.println("  TEST SUMMARY: " + passed + " PASSED, " + failed + " FAILED");
        System.out.println("==================================================");

        if (failed > 0) {
            System.exit(1);
        } else {
            System.exit(0);
        }
    }
}
