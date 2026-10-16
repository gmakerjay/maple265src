package net.swordie.ms;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.world.boss.BossHelper;
import net.swordie.ms.world.boss.VonLeon;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.Instance;

import net.swordie.ms.handlers.Timer;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

/**
 * Empirical Verification Harness for Boss Lifecycle Cleanup & Boss Death Logic.
 * Tested by Challenger 2.
 */
public class BossLifecycleVerificationTest {

    public static void main(String[] args) {
        int passed = 0;
        int failed = 0;

        // Initialize Server timer threads for testing environment
        Server.get().fieldTimer = new Timer("TestFieldTimer");
        Server.get().eventTimer = new Timer("TestEventTimer");

        System.out.println("===================================================================");
        System.out.println("  STARTING EMPIRICAL VERIFICATION HARNESS (CHALLENGER 2)           ");
        System.out.println("===================================================================");

        // Test 1: Field.java isCleared and clearFieldTimersAndSchedules
        try {
            System.out.print("[TEST 1] Field.clearFieldTimersAndSchedules() lifecycle contract... ");
            Field field = new Field(100000000);
            if (field.isCleared()) {
                throw new AssertionError("New field must not be cleared initially");
            }
            field.clearFieldTimersAndSchedules();
            if (!field.isCleared()) {
                throw new AssertionError("Field.isCleared() must be true after clearFieldTimersAndSchedules()");
            }
            System.out.println("PASSED");
            passed++;
        } catch (Throwable t) {
            System.out.println("FAILED: " + t.getMessage());
            t.printStackTrace(System.out);
            failed++;
        }

        // Test 2: Field.spawnMobRespawnable recursion guard when cleared
        try {
            System.out.print("[TEST 2] Field.spawnMobRespawnable() recursion prevention when cleared... ");
            Field field = new Field(100000000);
            field.clearFieldTimersAndSchedules();
            var mob = field.spawnMobRespawnable(9390622, 0, 0, true, 100, 20);
            if (mob != null) {
                throw new AssertionError("spawnMobRespawnable on cleared field must return null");
            }
            System.out.println("PASSED");
            passed++;
        } catch (Throwable t) {
            System.out.println("FAILED: " + t.getMessage());
            t.printStackTrace(System.out);
            failed++;
        }

        // Test 3: Instance.clear() Will gauge timer cleanup and field teardown
        try {
            System.out.print("[TEST 3] Instance.clear() Will gauge cleanup and field teardown... ");
            Instance instance = new Instance((Char) null);
            Field f1 = new Field(863010600);
            Field f2 = new Field(863010700);
            instance.getFields().put(863010600, f1);
            instance.getFields().put(863010700, f2);

            Char mockChar = new Char();
            mockChar.setId(99901);
            mockChar.setName("TestChr");

            // Attach a dummy ScheduledFuture to simulate Will gauge timer
            ScheduledFuture<?> dummyTimer = new ScheduledFuture<Void>() {
                private boolean cancelled = false;
                @Override public long getDelay(java.util.concurrent.TimeUnit unit) { return 0; }
                @Override public int compareTo(java.util.concurrent.Delayed o) { return 0; }
                @Override public boolean cancel(boolean mayInterruptIfRunning) { cancelled = true; return true; }
                @Override public boolean isCancelled() { return cancelled; }
                @Override public boolean isDone() { return cancelled; }
                @Override public Void get() { return null; }
                @Override public Void get(long timeout, java.util.concurrent.TimeUnit unit) { return null; }
            };
            mockChar.setWillGaugeTimer(dummyTimer);
            instance.getChars().put(mockChar.getId(), mockChar);

            // Execute clear()
            instance.clear();

            if (!dummyTimer.isCancelled()) {
                throw new AssertionError("Will gauge timer must be cancelled by instance.clear()");
            }
            if (mockChar.getWillGaugeTimer() != null) {
                throw new AssertionError("chr.getWillGaugeTimer() must be null after instance.clear()");
            }
            if (!f1.isCleared() || !f2.isCleared()) {
                throw new AssertionError("All fields in instance must have clearFieldTimersAndSchedules() called");
            }
            if (!instance.getFields().isEmpty() || !instance.getChars().isEmpty()) {
                throw new AssertionError("Instance fields and chars collections must be cleared");
            }
            System.out.println("PASSED");
            passed++;
        } catch (Throwable t) {
            System.out.println("FAILED: " + t.getMessage());
            t.printStackTrace(System.out);
            failed++;
        }

        // Test 4: GameConstants crystal mapping for all 12 bosses
        try {
            System.out.print("[TEST 4] GameConstants.getBossRewardID deterministic crystal mappings... ");
            GameConstants.initCrystals();

            int[][] bossTemplateExpectations = {
                // Zakum (Easy: 9210000, Normal: 9210001, Chaos: 9210002)
                {8800022, 9210000}, {8800002, 9210001}, {8800102, 9210002},
                // Arkarium (Easy: 9210023, Normal: 9210024)
                {8860005, 9210023}, {8860000, 9210024},
                // Pink Bean (Normal: 9210025, Chaos P1/P2: 9210026)
                {8820001, 9210025}, {8820101, 9210026}, {8820212, 9210026},
                // Von Leon (Easy: 9210017, Normal: 9210018, Hard: 9210019)
                {8840007, 9210017}, {8840000, 9210018}, {8840014, 9210019},
                // Cygnus (Easy: 9210027, Normal: 9210028)
                {8850111, 9210027}, {8850011, 9210028},
                // Hilla (Normal: 9210006, Hard: 9210007)
                {8870000, 9210006}, {8870100, 9210007},
                // Magnus (Easy: 9210003, Normal: 9210004, Hard: 9210005)
                {8880010, 9210003}, {8880002, 9210004}, {8880000, 9210005},
                // Mori Ranmaru (Normal: 9601188, Hard: 9601189)
                {9421581, 9601188}, {9421589, 9601189},
                // Papulatus P2 (Easy: 9210035, Normal: 9210036, Chaos: 9210037)
                {8500002, 9210035}, {8500012, 9210036}, {8500022, 9210037},
                // Root Abyss
                {8910100, 9210011}, {8910000, 9210012},
                {8930100, 9210015}, {8930000, 9210016},
                {8900103, 9210009}, {8900003, 9210010},
                {8920106, 9210013}, {8920006, 9210014},
                // OMNI-CLN (Normal: 9210008)
                {8880200, 9210008},
                // Princess No (Normal: 9601190)
                {9450022, 9601190}
            };

            for (int[] pair : bossTemplateExpectations) {
                int mobId = pair[0];
                int expectedCrystal = pair[1];
                int actualCrystal = GameConstants.getBossRewardID(mobId);
                if (actualCrystal != expectedCrystal) {
                    throw new AssertionError("Mismatch for mob " + mobId + ": expected crystal " + expectedCrystal + " but got " + actualCrystal);
                }
                long price = GameConstants.getBossRewardPrice(expectedCrystal);
                if (price <= 1) {
                    throw new AssertionError("Non-positive price for crystal " + expectedCrystal + " from mob " + mobId + ": " + price);
                }
            }
            System.out.println("PASSED");
            passed++;
        } catch (Throwable t) {
            System.out.println("FAILED: " + t.getMessage());
            t.printStackTrace(System.out);
            failed++;
        }

        // Test 5: Von Leon map constants vs mob templates
        try {
            System.out.print("[TEST 5] Von Leon template IDs and difficulty alignment... ");
            // Verify that the constants exist in BossHelper and GameConstants
            int easyMob = 8840007;
            int normMob = 8840000;
            int hardMob = 8840014;

            int easyCrystal = GameConstants.getBossRewardID(easyMob);
            int normCrystal = GameConstants.getBossRewardID(normMob);
            int hardCrystal = GameConstants.getBossRewardID(hardMob);

            long easyPrice = GameConstants.getBossRewardPrice(easyCrystal);
            long normPrice = GameConstants.getBossRewardPrice(normCrystal);
            long hardPrice = GameConstants.getBossRewardPrice(hardCrystal);

            if (!(easyPrice < normPrice && normPrice < hardPrice)) {
                throw new AssertionError(String.format("Crystal price progression invalid: Easy=%d, Norm=%d, Hard=%d", easyPrice, normPrice, hardPrice));
            }
            System.out.println("PASSED (Easy: " + easyPrice + " mesos, Normal: " + normPrice + " mesos, Hard: " + hardPrice + " mesos)");
            passed++;
        } catch (Throwable t) {
            System.out.println("FAILED: " + t.getMessage());
            t.printStackTrace(System.out);
            failed++;
        }

        // Test 6: Gollux Constants and reward map
        try {
            System.out.print("[TEST 6] Gollux Phase 3 reward map integrity... ");
            if (BossConstants.GOLLUX_REWARD_MAP != 863010700) {
                throw new AssertionError("GOLLUX_REWARD_MAP must be 863010700, but is " + BossConstants.GOLLUX_REWARD_MAP);
            }
            if (BossConstants.GOLLUX_FIRST_MAP != 863010100) {
                throw new AssertionError("GOLLUX_FIRST_MAP must be 863010100, but is " + BossConstants.GOLLUX_FIRST_MAP);
            }
            System.out.println("PASSED");
            passed++;
        } catch (Throwable t) {
            System.out.println("FAILED: " + t.getMessage());
            t.printStackTrace(System.out);
            failed++;
        }

        // Test 7: Adversarial Null Safety in Instance.clear()
        try {
            System.out.print("[TEST 7] Instance.clear() null safety under sparse/corrupted collections... ");
            Instance sparseInstance = new Instance((Char) null);
            sparseInstance.getFields().put(999999999, null); // null field in HashMap
            Char sparseChar = new Char();
            sparseChar.setId(999999);
            sparseInstance.getChars().put(999999, sparseChar); // Char with null client/field/scriptManager
            sparseInstance.clear(); // Should not throw NullPointerException
            System.out.println("PASSED (survived null field and uninitialized char without NPE)");
            passed++;
        } catch (Throwable t) {
            System.out.println("FAILED: " + t.getMessage());
            t.printStackTrace(System.out);
            failed++;
        }

        // Test 8: Adversarial Multithreaded Race between spawnMobRespawnable and clearFieldTimersAndSchedules
        try {
            System.out.print("[TEST 8] Concurrent race condition stress test on Field.isCleared... ");
            for (int round = 0; round < 50; round++) {
                final Field raceField = new Field(200000000 + round);
                Thread t1 = new Thread(() -> {
                    for (int i = 0; i < 20; i++) {
                        raceField.spawnMobRespawnable(9390622, i, 0, true, 100, 1);
                    }
                });
                Thread t2 = new Thread(() -> {
                    try { Thread.sleep(2); } catch (InterruptedException ignored) {}
                    raceField.clearFieldTimersAndSchedules();
                });
                t1.start();
                t2.start();
                t1.join();
                t2.join();
                if (!raceField.isCleared()) {
                    throw new AssertionError("Race condition left field uncleared at round " + round);
                }
            }
            System.out.println("PASSED (50 concurrent race rounds survived)");
            passed++;
        } catch (Throwable t) {
            System.out.println("FAILED: " + t.getMessage());
            t.printStackTrace(System.out);
            failed++;
        }

        System.out.println("===================================================================");
        System.out.println("  SUMMARY: " + passed + " PASSED, " + failed + " FAILED            ");
        System.out.println("===================================================================");

        if (failed > 0) {
            System.exit(1);
        } else {
            System.exit(0);
        }
    }
}
