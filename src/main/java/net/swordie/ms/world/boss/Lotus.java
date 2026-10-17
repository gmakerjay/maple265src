package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.packet.FieldPacket;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.enums.ObtacleAtomEnum;
import net.swordie.ms.handlers.GlobalTimerManager;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.skill.MobSkill;
import net.swordie.ms.life.mob.skill.MobSkillID;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.loaders.containerclasses.MobSkillInfo;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;

import java.util.concurrent.ScheduledFuture;

import static net.swordie.ms.life.mob.skill.MobSkillStat.fixDamR;

public class Lotus {

    // Easy mode: first_Suu
    // MapID: 350066100 mobs: 8881100 (0, -16) - 2100000000L
    // MapID: 350066100 mobs: 8881111 (0, -16) - 2100000000L
    // MapID: 350066100 mobs: 8881104 (0, -16) - 2100000000L
    // MapID: 350066100 mobs: 8881110 (0, -16) - 2100000000L

    public static void spawn(Field field, Char chr, LotusPhase phase, LotusMode mode) {
        if (field == null) {
            if (chr == null) {
                return;
            }
            field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        }
        int lotusId = BossConstants.LOTUS_CORE + phase.getVal() + (mode == LotusMode.NORMAL ? 100 : 0); // Normal: 8950100..8950102, Hard: 8950000..8950002
        long hp = BossConstants.LOTUS_HP_PHASE_DIFFICULTY[phase.getVal()][mode.getVal()];
        if (!field.isBossSpawned()) {
            field.setBossSpawned(true);

            // In v265, legacy v214 CLEAR_OBSTACLE / CREATE_OBSTACLE / MOB_LASER_CONTROL packets
            // cause client crash on entry. Mob spawn with native stats and attacks is used instead.
            final Field f = field;
            f.getTimer().addEvent(() -> {
                Mob mob = f.spawnMob(lotusId, 0, -16, false, hp);
            }, 1000);
            if (field.getId() == 350060700) {
                ScheduledFuture<?> sf2 = f.getTimer().addFixedRateEvent(() -> {
                    if (!f.getChars().isEmpty()) {
                        if (!f.hasMobById(BossConstants.LOTUS_SUMMON_RED)) {
                            f.spawnMob(BossConstants.LOTUS_SUMMON_RED, 525, -300, false);
                        }
                        if (!f.hasMobById(BossConstants.LOTUS_SUMMON_BLUE)) {
                            f.spawnMob(BossConstants.LOTUS_SUMMON_BLUE, -360, -450, false);
                        }
                        if (!f.hasMobById(BossConstants.LOTUS_SUMMON_YELLOW)) {
                            f.spawnMob(BossConstants.LOTUS_SUMMON_YELLOW, -525, -300, false);
                        }
                        if (!f.hasMobById(BossConstants.LOTUS_SUMMON_CHAOS)) {
                            f.spawnMob(BossConstants.LOTUS_SUMMON_CHAOS, 360, -450, false);
                        }
                    }
                }, 2000, 10000L, false);
                GlobalTimerManager.addFieldTimer(f.getSN(), sf2);
            } else if (field.getId() == 350060400) {
                ScheduledFuture<?> sf3 = f.getTimer().addFixedRateEvent(() -> {
                    if (!f.getChars().isEmpty()) {
                        if (!f.hasMobById(BossConstants.LOTUS_SUMMON_RED_HARD)) {
                            f.spawnMob(BossConstants.LOTUS_SUMMON_RED_HARD, 525, -300, false);
                        }
                        if (!f.hasMobById(BossConstants.LOTUS_SUMMON_BLUE_HARD)) {
                            f.spawnMob(BossConstants.LOTUS_SUMMON_BLUE_HARD, -360, -450, false);
                        }
                        if (!f.hasMobById(BossConstants.LOTUS_SUMMON_YELLOW_HARD)) {
                            f.spawnMob(BossConstants.LOTUS_SUMMON_YELLOW_HARD, -525, -300, false);
                        }
                        if (!f.hasMobById(BossConstants.LOTUS_SUMMON_CHAOS_HARD)) {
                            f.spawnMob(BossConstants.LOTUS_SUMMON_CHAOS_HARD, 360, -450, false);
                        }
                    }
                }, 2000, 5000L, false);
                GlobalTimerManager.addFieldTimer(f.getSN(), sf3);
            }
        }
    }

    public static void spawn(Char chr, LotusPhase phase, LotusMode mode) {
        if (BossHelper.checkInstance(chr)) {
            return;
        }
        spawn(null, chr, phase, mode);
    }

    private static void init(Char chr) {
        // Obsolete v214 createObstacleAtom broadcasts cause v265 client crash.
        // Handled cleanly via native mob skills and boss mechanics.
    }

    public enum LotusMode {
        NORMAL(0),
        HARD(1),
        ;

        private final int val;

        LotusMode(int val) {
            this.val = val;
        }

        public int getVal() {
            return val;
        }
    }

    public enum LotusPhase {
        FIRST(0),
        SECOND(1),
        LAST(2),
        ;

        private final int val;

        LotusPhase(int val) {
            this.val = val;
        }

        public int getVal() {
            return val;
        }
    }
}
