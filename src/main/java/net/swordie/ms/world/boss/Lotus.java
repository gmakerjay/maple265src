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

    public static void spawn(Char chr, LotusPhase phase, LotusMode mode) {
        if (BossHelper.checkInstance(chr)) {
            return;
        }

        ScriptManagerImpl sm = chr.getScriptManager();
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        int lotusId = BossConstants.LOTUS_CORE + phase.getVal() + mode.getVal() * 100; // phases start from 0 to 2
        long hp = BossConstants.LOTUS_HP_PHASE_DIFFICULTY[phase.getVal()][mode.getVal()];
        if (!field.isBossSpawned()) {
            field.setBossSpawned(true);

            ScheduledFuture<?> sf = field.getTimer().addFixedRateEvent(() -> {
                field.broadcast(FieldPacket.clearObtacle());
                init(chr);
            }, 1000, mode.getVal() == 1 ? 10000 : 20000, false);
            GlobalTimerManager.addFieldTimer(field.getSN(), sf);

            field.getTimer().addEvent(() -> {
                Mob mob = field.spawnMob(lotusId, 0, -16, false, hp);
                if (phase.getVal() == 0) {
                    MobSkillInfo msi = SkillData.getMobSkillInfoByIdAndLevel(MobSkillID.LaserAttack.getVal(), 1);
                    MobSkill mobSkill = new MobSkill();
                    mobSkill.setLevel(5); //at this level there are 4 lasers and 100% damr
                    mobSkill.setSkillID(MobSkillID.LaserAttack.getVal());
                    mobSkill.setFixDamR(msi.getSkillStatIntValue(fixDamR));
                    mobSkill.applyEffect(mob);
                }
            }, 2000);
            if (field.getId() == 350060700) {
                ScheduledFuture<?> sf2 = field.getTimer().addFixedRateEvent(() -> {
                    if (!field.getChars().isEmpty()) {
                        if (!field.hasMobById(BossConstants.LOTUS_SUMMON_RED)) {
                            field.spawnMob(BossConstants.LOTUS_SUMMON_RED, 525, -300, false);
                        }
                        if (!field.hasMobById(BossConstants.LOTUS_SUMMON_BLUE)) {
                            field.spawnMob(BossConstants.LOTUS_SUMMON_BLUE, -360, -450, false);
                        }
                        if (!field.hasMobById(BossConstants.LOTUS_SUMMON_YELLOW)) {
                            field.spawnMob(BossConstants.LOTUS_SUMMON_YELLOW, -525, -300, false);
                        }
                        if (!field.hasMobById(BossConstants.LOTUS_SUMMON_CHAOS)) {
                            field.spawnMob(BossConstants.LOTUS_SUMMON_CHAOS, 360, -450, false);
                        }
                    }
                }, 2000, 10000L, false);
                GlobalTimerManager.addFieldTimer(field.getSN(), sf2);
            } else if (field.getId() == 350060400) {
                ScheduledFuture<?> sf3 = field.getTimer().addFixedRateEvent(() -> {
                    if (!field.getChars().isEmpty()) {
                        if (!field.hasMobById(BossConstants.LOTUS_SUMMON_RED_HARD)) {
                            field.spawnMob(BossConstants.LOTUS_SUMMON_RED_HARD, 525, -300, false);
                        }
                        if (!field.hasMobById(BossConstants.LOTUS_SUMMON_BLUE_HARD)) {
                            field.spawnMob(BossConstants.LOTUS_SUMMON_BLUE_HARD, -360, -450, false);
                        }
                        if (!field.hasMobById(BossConstants.LOTUS_SUMMON_YELLOW_HARD)) {
                            field.spawnMob(BossConstants.LOTUS_SUMMON_YELLOW_HARD, -525, -300, false);
                        }
                        if (!field.hasMobById(BossConstants.LOTUS_SUMMON_CHAOS_HARD)) {
                            field.spawnMob(BossConstants.LOTUS_SUMMON_CHAOS_HARD, 360, -450, false);
                        }
                    }
                }, 2000, 5000L, false);
                GlobalTimerManager.addFieldTimer(field.getSN(), sf3);
            }
        }
    }

    private static void init(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        switch (field.getId()) {
            case 350060700 -> {
                if (field.hasMobById(8950000)) {
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_BLUE_ATOM_DAMAGE, 15, 0, BossConstants.LOTUS_BLUE_ATOM_AMOUNT, BossConstants.LOTUS_BLUE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusYellowDebris, 1, BossConstants.LOTUS_YELLOW_ATOM_DAMAGE, 20, 0,  BossConstants.LOTUS_YELLOW_ATOM_AMOUNT, BossConstants.LOTUS_YELLOW_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_PURPLE_ATOM_DAMAGE, 25, 0,  BossConstants.LOTUS_PURPLE_ATOM_AMOUNT, BossConstants.LOTUS_PURPLE_ATOM_PROP);
                }
            }
            case 350060800 -> {
                if (field.hasMobById(8950001)) {
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_BLUE_ATOM_DAMAGE, 15, 0,  BossConstants.LOTUS_BLUE_ATOM_AMOUNT, BossConstants.LOTUS_BLUE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusYellowDebris, 1, BossConstants.LOTUS_YELLOW_ATOM_DAMAGE, 20, 0,  BossConstants.LOTUS_YELLOW_ATOM_AMOUNT, BossConstants.LOTUS_YELLOW_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_PURPLE_ATOM_DAMAGE, 25, 0,  BossConstants.LOTUS_PURPLE_ATOM_AMOUNT, BossConstants.LOTUS_PURPLE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusRobotDebris, 1, BossConstants.LOTUS_ROBOT_ATOM_DAMAGE, 10, 0,  BossConstants.LOTUS_ROBOT_ATOM_AMOUNT, BossConstants.LOTUS_ROBOT_ATOM_PROP);
                }
            }
            case 350060900 -> {
                if (field.hasMobById(8950002)) {
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_BLUE_ATOM_DAMAGE, 15, 0,  BossConstants.LOTUS_BLUE_ATOM_AMOUNT, BossConstants.LOTUS_BLUE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusYellowDebris, 1, BossConstants.LOTUS_YELLOW_ATOM_DAMAGE, 20, 0,  BossConstants.LOTUS_YELLOW_ATOM_AMOUNT, BossConstants.LOTUS_YELLOW_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_PURPLE_ATOM_DAMAGE, 25, 0,  BossConstants.LOTUS_PURPLE_ATOM_AMOUNT, BossConstants.LOTUS_PURPLE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusRobotDebris, 1, BossConstants.LOTUS_ROBOT_ATOM_DAMAGE, 10, 0,  BossConstants.LOTUS_ROBOT_ATOM_AMOUNT, BossConstants.LOTUS_ROBOT_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusCrusherDebris, 1, BossConstants.LOTUS_CRUSHER_ATOM_DAMAGE, 5, 0,  BossConstants.LOTUS_CRUSHER_ATOM_AMOUNT, BossConstants.LOTUS_CRUSHER_ATOM_PROP);
                }
            }
            case 350060400 -> {
                if (field.hasMobById(8950100)) {
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_BLUE_ATOM_DAMAGE, 15, 0,  BossConstants.LOTUS_BLUE_ATOM_AMOUNT, BossConstants.LOTUS_BLUE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusYellowDebris, 1, BossConstants.LOTUS_YELLOW_ATOM_DAMAGE, 20, 0,  BossConstants.LOTUS_YELLOW_ATOM_AMOUNT, BossConstants.LOTUS_YELLOW_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_PURPLE_ATOM_DAMAGE, 25, 0,  BossConstants.LOTUS_PURPLE_ATOM_AMOUNT, BossConstants.LOTUS_PURPLE_ATOM_PROP);

                }
            }
            case 350060500 -> {
                if (field.hasMobById(8950101)) {
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_BLUE_ATOM_DAMAGE, 15, 0,  BossConstants.LOTUS_BLUE_ATOM_AMOUNT, BossConstants.LOTUS_BLUE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusYellowDebris, 1, BossConstants.LOTUS_YELLOW_ATOM_DAMAGE, 20, 0,  BossConstants.LOTUS_YELLOW_ATOM_AMOUNT, BossConstants.LOTUS_YELLOW_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_PURPLE_ATOM_DAMAGE, 25, 0,  BossConstants.LOTUS_PURPLE_ATOM_AMOUNT, BossConstants.LOTUS_PURPLE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusRobotDebris, 1, BossConstants.LOTUS_ROBOT_ATOM_DAMAGE, 10, 0,  BossConstants.LOTUS_ROBOT_ATOM_AMOUNT, BossConstants.LOTUS_ROBOT_ATOM_PROP);
                }
            }
            case 350060600 -> {
                if (field.hasMobById(8950102)) {
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_BLUE_ATOM_DAMAGE, 15, 0,  BossConstants.LOTUS_BLUE_ATOM_AMOUNT, BossConstants.LOTUS_BLUE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusYellowDebris, 1, BossConstants.LOTUS_YELLOW_ATOM_DAMAGE, 20, 0,  BossConstants.LOTUS_YELLOW_ATOM_AMOUNT, BossConstants.LOTUS_YELLOW_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusBlueDebris, 1, BossConstants.LOTUS_PURPLE_ATOM_DAMAGE, 25, 0,  BossConstants.LOTUS_PURPLE_ATOM_AMOUNT, BossConstants.LOTUS_PURPLE_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusRobotDebris, 1, BossConstants.LOTUS_ROBOT_ATOM_DAMAGE, 10, 0,  BossConstants.LOTUS_ROBOT_ATOM_AMOUNT, BossConstants.LOTUS_ROBOT_ATOM_PROP);
                    sm.createObstacleAtom(ObtacleAtomEnum.LotusCrusherDebris, 1, BossConstants.LOTUS_CRUSHER_ATOM_DAMAGE, 5, 0,  BossConstants.LOTUS_CRUSHER_ATOM_AMOUNT, BossConstants.LOTUS_CRUSHER_ATOM_PROP);
                }
            }
        }
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
