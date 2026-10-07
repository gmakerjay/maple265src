package net.swordie.ms.constants;

import net.swordie.ms.enums.BossPartyType;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Rect;

import java.util.Arrays;
import java.util.List;

public class BossConstants {

    public static boolean isBossSet(int itemID) {
        switch (itemID) {
            case 99999999: // Todo thêm tất cả Item ID của Boss Set vào
                return true;
        }
        return false;
    }

    public static int getBossFightingTime(BossPartyType boss) {
        return switch (boss) {
            case BALROG -> BALROG_TIME;
            case ZAKUM_EASY -> EASY_ZAKUM_TIME;
            case ZAKUM_NORMAL -> CHAOS_ZAKUM_TIME;
            case ZAKUM_CHAOS -> CHAOS_ZAKUM_TIME;
            default -> 0;
        };
    }

    public static int getBossFightingFieldId(BossPartyType boss) {
        return switch (boss) {
            case BALROG -> BALROG_EASY_BATTLE_MAP;
            case ZAKUM_EASY -> ZAKUM_EASY_ALTAR;
            case ZAKUM_NORMAL -> ZAKUM_NORMAL_ALTAR;
            case ZAKUM_CHAOS -> ZAKUM_CHAOS_ALTAR;
            case AKECHI_MITSUHIDE -> AKECHI_BATTLE_MAP;
            default -> 0;
        };
    }

    public static int getBossWaitingFieldId(BossPartyType boss) {
        return switch (boss) {
            case BALROG -> BALROG_ENTRY_MAP;
            case ZAKUM_EASY -> ZAKUM_EASY_ENTRANCE;
            case ZAKUM_NORMAL -> ZAKUM_NORMAL_ENTRANCE;
            case ZAKUM_CHAOS -> ZAKUM_CHAOS_ENTRANCE;
            case MAGNUS_EASY -> MAGNUS_EASY_ENTRANCE_MAP;
            case MAGNUS_NORMAL -> MAGNUS_NORMAL_ENTRANCE_MAP;
            case MAGNUS_HARD -> MAGNUS_HARD_ENTRANCE_MAP;
            case HILLA_NORMAL, HILLA_HARD -> HILLA_ENTRANCE_MAP;
            case OMNI_CLN_NORMAL -> OMNI_CLN_ENTRANCE_MAP;
            case PAPULATUS_EASY, PAPULATUS_NORMAL, PAPULATUS_CHAOS -> PAPULATUS_ENTRANCE_MAP;
            case PIERRE_NORMAL, PIERRE_CHAOS, VON_BON_NORMAL, VON_BON_CHAOS, QUEEN_NORMAL, QUEEN_CHAOS, VELLUM_NORMAL, VELLUM_CHAOS ->
                    ROOT_ABYSS_ENTRACE_MAP;
            case VON_LEON_EASY, VON_LEON_NORMAL, VON_LEON_HARD -> VON_LEON_ENTRACE_MAP;
            case HORNTAIL_EASY, HORNTAIL_NORMAL, HORNTAIL_CHAOS -> HORNTAIL_ENTRANCE_MAP;
            case ARKARIUM_EASY, ARKARIUM_NORMAL -> ARKARIUM_ENTRACE_MAP;
            case PINK_BEAN_NORMAL, PINK_BEAN_CHAOS -> PINK_BEAN_ENTRACE_MAP;
            case CYGNUS_EASY, CYGNUS_NORMAL -> CYGNUS_ENTRACE_MAP;
            case LOTUS_NORMAL, LOTUS_HARD -> LOTUS_ENTRANCE_MAP;
            case DAMIEN_NORMAL, DAMIEN_HARD -> DEMIAN_ENTRACE_MAP;
            case LUCID_NORMAL, LUCID_HARD -> LUCID_ENTRACE_MAP;
            case GOLLUX -> GOLLUX_ENTRACE_MAP;
            case GLOOM_NORMAL, GLOOM_CHAOS -> GLOOM_ENTRACE_MAP;
            case VERUS_HILLA_NORMAL, VERUS_HILLA_HARD -> VERUS_HILLA_ENTRANCE_MAP;
            case DARKNELL_NORMAL, DARKNELL_HARD -> DARKNELL_ENTRANCE_MAP;
            case BLACK_MAGE_HARD -> BLACK_MAGE_ENTRANCE_MAP;
            case RANMARU_NORMAL, RANMARU_HARD -> RANMARU_ENTRACE_MAP;
            case PRINCESS_NO -> PRINCESS_NO_ENTRACE_MAP;
            case WILL_NORMAL, WILL_HARD -> WILL_ENTRACE_MAP;
            case AKECHI_MITSUHIDE -> AKECHI_ENTRANCE_MAP;
            default -> 0;
        };
    }

    public static int getBossPartyBuffSkill(BossPartyType bossPartyType) {
        return switch (bossPartyType) {
            case BALROG -> 80001535;
            case ZAKUM_EASY, ZAKUM_NORMAL, ZAKUM_CHAOS -> 80001536;
            case HORNTAIL_EASY, HORNTAIL_NORMAL, HORNTAIL_CHAOS -> 80001537;
            case HILLA_NORMAL, HILLA_HARD -> 80001538;
            case VON_LEON_EASY, VON_LEON_NORMAL, VON_LEON_HARD -> 80001539;
            case ARKARIUM_EASY, ARKARIUM_NORMAL -> 80001540;
            case MAGNUS_EASY, MAGNUS_NORMAL, MAGNUS_HARD -> 80001541;
            case PINK_BEAN_NORMAL, PINK_BEAN_CHAOS -> 80001542;
            case CYGNUS_EASY, CYGNUS_NORMAL -> 80001543;
            case PIERRE_NORMAL, PIERRE_CHAOS -> 80001544;
            case VON_BON_NORMAL, VON_BON_CHAOS -> 80001545;
            case QUEEN_NORMAL, QUEEN_CHAOS -> 80001546;
            case VELLUM_NORMAL, VELLUM_CHAOS -> 80001547;
            case LOTUS_NORMAL, LOTUS_HARD -> 80001634;
            case DAMIEN_NORMAL, DAMIEN_HARD -> 80001979;
            case LUCID_EASY, LUCID_NORMAL, LUCID_HARD -> 80002232;
            case OMNI_CLN_NORMAL -> 80002264;
            case PAPULATUS_EASY, PAPULATUS_NORMAL, PAPULATUS_CHAOS -> 80002337;
            case WILL_EASY, WILL_NORMAL, WILL_HARD -> 80002419;
            case VERUS_HILLA_NORMAL, VERUS_HILLA_HARD -> 80002642;
            case BLACK_MAGE_HARD, BLACK_MAGE_EXTREME -> 80002643;
            case GLOOM_NORMAL, GLOOM_CHAOS -> 80002645;
            case DARKNELL_NORMAL, DARKNELL_HARD -> 80002646;
            case GOLLUX -> 80011124;
            case RANMARU_NORMAL, RANMARU_HARD -> 80011125;
            case PRINCESS_NO -> 80011126;
            case AKECHI_MITSUHIDE -> 80012058;
            default -> 0;
        };
    }

    public static final int BOSS_WAITING_TIME = 5 * 60; // 5 minutes
    // INFERNO WOLF ----------------------------------------------------------------------------------------------------
    public static final int INFERNO_WOLF = 9101078;
    // BALROG ----------------------------------------------------------------------------------------------------------
    public static final int BALROG_ENTRY_MAP = 105100100; // lobby map
    public static final short BALROG_TIME = 20 * 60; // 20 min
    public static final short BALROG_SPAWN_X = 412;
    public static final short BALROG_SPAWN_Y = 258;
    public static final int BALROG_EASY_DMGSINK = 8830010; // has the hp bar, dmg gets splashed to this from all the below mobs
    public static final int BALROG_EASY_BODY = 8830007;
    public static final int BALROG_EASY_LARM = 8830008;
    public static final int BALROG_EASY_RARM = 8830009;
    public static final int BALROG_EASY_BATTLE_MAP = 105100400;
    public static final int BALROG_EASY_WIN_MAP = 105100401;
    public static final int BALROG_HARD_DMGSINK = 8830003;
    public static final int BALROG_HARD_BODY = 8830000;
    public static final int BALROG_HARD_LARM = 8830001;
    public static final int BALROG_HARD_RARM = 8830002;
    public static final int BALROG_HARD_BATTLE_MAP = 105100300;
    public static final int BALROG_HARD_WIN_MAP = 105100301;
    // ZAKUM -----------------------------------------------------------------------------------------------------------
    public static final int ZAKUM_JQ_MAP_1 = 280020000;
    public static final int ZAKUM_JQ_MAP_2 = 280020001;
    public static final int EASY_ZAKUM_TIME = 30 * 60; // 20 min timer
    public static final int CHAOS_ZAKUM_TIME = 30 * 60; // 30 min timer
    public static final int ZAKUM_TIME_BASE = 15 * 60; // 15 min * difficulty (15 easy, 30 normal, 45 chaos)
    public static final int ZAKUM_SPAWN_X = -14;
    public static final int ZAKUM_SPAWN_Y = 86;
    public static final int ZAKUM_EASY_SPAWN_ITEM = 4001796; // Eye of fire chunk
    public static final int ZAKUM_EASY_ENTRANCE = 211042402;
    public static final int ZAKUM_EASY_ALTAR = 280030200;
    public static final int ZAKUM_EASY_BODY = 8800020;
    public static final int ZAKUM_EASY_ARM = 8800023;
    public static final int ZAKUM_NORMAL_ENTRANCE = 211042400;
    public static final int ZAKUM_NORMAL_ALTAR = 280030100;
    public static final int ZAKUM_NORMAL_BODY = 8800000;
    public static final int ZAKUM_NORMAL_ARM = 8800003;
    public static final int ZAKUM_CHAOS_SPAWN_ITEM = 4001017; // Eye of fire
    public static final int ZAKUM_CHAOS_ENTRANCE = 211042500;
    public static final int ZAKUM_CHAOS_ALTAR = 280030000;
    public static final int ZAKUM_CHAOS_BODY = 8800100;
    public static final int ZAKUM_CHAOS_ARM = 8800103;
    // HORNTAIL --------------------------------------------------------------------------------------------------------
    public static final int HORNTAIL_ENTRANCE_MAP = 240050400;
    public static final int EASY_HORNTAIL_TIME = 75 * 60; // 1 hr, 15 min timer
    public static final int CHAOS_HORNTAIL_TIME = 150 * 60; // 2 hrs, 30 min timer
    // URSUS --------------------------------------------------------------------------------------------------------
    public static final int URSUS_ENTRANCE_MAP = 970072200;
    public static final int URSUS_TIME = 30 * 60; // 30 min
    public static final int URSUS_FIGHT_MAP = 970072000;
    // LOTUS -----------------------------------------------------------------------------------------------------------
    public static final int LOTUS_ENTRANCE_MAP = 350060300;
    public static final int LOTUS_TIME = 30 * 60; // 30 min timer
    public final static int LOTUS_CORE = 8950000;
    public static final long[][] LOTUS_HP_PHASE_DIFFICULTY = {
            {400000000000L, 1700000000000L},
            {400000000000L, 7000000000000L},
            {710000000000L, 24000000000000L}
    };
    public static final int LOTUS_SUMMON_RED = 8950103;
    public static final int LOTUS_SUMMON_BLUE = 8950104;
    public static final int LOTUS_SUMMON_YELLOW = 8950105;
    public static final int LOTUS_SUMMON_CHAOS = 8950107;
    public static final int LOTUS_SUMMON_RED_HARD = 8950003;
    public static final int LOTUS_SUMMON_BLUE_HARD = 8950004;
    public static final int LOTUS_SUMMON_YELLOW_HARD = 8950005;
    public static final int LOTUS_SUMMON_CHAOS_HARD = 8950007;
    public static final int LOTUS_BOUNCING_BALL_DURATION = 20000;
    public static final int LOTUS_BLUE_ATOM_AMOUNT = 3; // max amount of Atoms spawning attempts in 1 call
    public static final int LOTUS_BLUE_ATOM_PROP = 30; // % chance of actually spawning in
    public static final int LOTUS_BLUE_ATOM_DAMAGE = 25; // % of Max HP
    public static final int LOTUS_YELLOW_ATOM_AMOUNT = 3; // max amount of Atoms spawning attempts in 1 call
    public static final int LOTUS_YELLOW_ATOM_PROP = 25; // % chance of actually spawning in
    public static final int LOTUS_YELLOW_ATOM_DAMAGE = 50; // % of Max HP
    public static final int LOTUS_PURPLE_ATOM_AMOUNT = 3; // max amount of Atoms spawning attempts in 1 call
    public static final int LOTUS_PURPLE_ATOM_PROP = 20; // % chance of actually spawning in
    public static final int LOTUS_PURPLE_ATOM_DAMAGE = 100; // % of Max HP
    public static final int LOTUS_ROBOT_ATOM_AMOUNT = 2; // max amount of Atoms spawning attempts in 1 call
    public static final int LOTUS_ROBOT_ATOM_PROP = 15; // % chance of actually spawning in
    public static final int LOTUS_ROBOT_ATOM_DAMAGE = 100; // % of Max HP
    public static final int LOTUS_CRUSHER_ATOM_AMOUNT = 1; // max amount of Atoms spawning attempts in 1 call
    public static final int LOTUS_CRUSHER_ATOM_PROP = 5; // % chance of actually spawning in
    public static final int LOTUS_CRUSHER_ATOM_DAMAGE = 100; // % of Max HP
    // MAGNUS ----------------------------------------------------------------------------------------------------------
    public static final int MAGNUS_EASY_ENTRANCE_MAP = 401060400;
    public static final int MAGNUS_NORMAL_ENTRANCE_MAP = 401060400;
    public static final int MAGNUS_HARD_ENTRANCE_MAP = 401060400;
    public static final int MAGNUS_TIME = 20 * 60; // 20 minutes
    public static final int MAGNUS_DEATHCOUNT = 20; // 20 death count
    public static final int MAGNUS_OBSTACLE_ATOM_VELOCITY = 5; // Velocity at which the Obstacle Atoms fall down.
    public static final int MAGNUS_GREEN_ATOM_EXECUTION_DELAY = 1000; // in ms. Delay between method executions
    public static final int MAGNUS_GREEN_ATOM_AMOUNT = 4; // max amount of Atoms spawning attempts in 1 call
    public static final int MAGNUS_GREEN_ATOM_PROP = 35; // % chance of actually spawning in
    public static final int MAGNUS_GREEN_ATOM_DAMAGE = 25; // % of Max HP
    public static final int MAGNUS_BLUE_ATOM_EXECUTION_DELAY = 750; // in ms. Delay between method executions
    public static final int MAGNUS_BLUE_ATOM_AMOUNT = 4; // max amount of Atoms spawning attempts in 1 call
    public static final int MAGNUS_BLUE_ATOM_PROP = 30; // % chance of actually spawning in
    public static final int MAGNUS_BLUE_ATOM_DAMAGE = 50; // % of Max HP
    public static final int MAGNUS_PURPLE_ATOM_EXECUTION_DELAY = 2000; // in ms. Delay between method executions
    public static final int MAGNUS_PURPLE_ATOM_AMOUNT = 3; // max amount of Atoms spawning attempts in 1 call
    public static final int MAGNUS_PURPLE_ATOM_PROP = 25; // % chance of actually spawning in
    public static final int MAGNUS_PURPLE_ATOM_DAMAGE = 100; // % of Max HP
    // ROOT ABYSS ------------------------------------------------------------------------------------------------------
    public static final int ROOT_ABYSS_ENTRACE_MAP = 105200000;
    public static final int ROOT_ABYSS_TIME = 30 * 60; // 30 min timer
    // OMNI-CLN --------------------------------------------------------------------------------------------------------
    public static final int OMNI_CLN_ENTRANCE_MAP = 221030900;
    // PAPULATUS -------------------------------------------------------------------------------------------------------
    public static final int PAPULATUS_ENTRANCE_MAP = 220080000;
    // HILLA -----------------------------------------------------------------------------------------------------------
    public static final int HILLA_ENTRANCE_MAP = 262030000;
    public static final int EASY_HILLA_TIME = 30 * 60; // 1 hr, 15 min timer
    public static final int NORMAL_HILLA_TIME = 150 * 60; // 2 hrs, 30 min timer
    // VERUS HILLA -----------------------------------------------------------------------------------------------------
    public static final int VERUS_HILLA_ENTRANCE_MAP = 940500100;
    public static final int VERUS_HILLA_TIME = 30 * 60;
    // VON LEON --------------------------------------------------------------------------------------------------------
    public static final int VON_LEON_ENTRACE_MAP = 211070000;
    public static final int VON_LEON_TIME = 30 * 60; // 30 min timer
    // CYGNUS ----------------------------------------------------------------------------------------------------------
    public static final int CYGNUS_ENTRACE_MAP = 271030600;
    public static final int CYGNUS_TIME = 30 * 60; // 30 min timer
    // ARKARIUM --------------------------------------------------------------------------------------------------------
    public static final int ARKARIUM_ENTRACE_MAP = 272020110;
    public static final int ARKARIUM_TIME = 30 * 60; // 30 min timer
    // PINK BEAN -------------------------------------------------------------------------------------------------------
    public static final int PINK_BEAN_ENTRACE_MAP = 270050000;
    public static final int PINK_BEAN_TIME = 30 * 60; // 30 min timer
    // DEMIAN ----------------------------------------------------------------------------------------------------------
    public static final int BRAND_OF_SACRIFICE = 80001974; // Skill ID
    public static final long DEMIAN_NORMAL_PHASE_1_HP = 840000000000L;
    public static final long DEMIAN_HARD_PHASE_1_HP = 25200000000000L;
    public static final long DEMIAN_NORMAL_PHASE_2_HP = 360000000000L;
    public static final long DEMIAN_HARD_PHASE_2_HP = 10800000000000L;
    public static final int DEMIAN_NORMAL_PHASE_1_TEMPLATE_ID = 8880110;
    public static final int DEMIAN_NORMAL_PHASE_2_TEMPLATE_ID = 8880111;
    public static final int DEMIAN_HARD_PHASE_1_TEMPLATE_ID = 8880100;
    public static final int DEMIAN_HARD_PHASE_2_TEMPLATE_ID = 8880101;
    // DEMIAN - Sword --------------------------------------------------------------------------------------------------
    public static final int DEMIAN_ENTRACE_MAP = 105300303;
    public static final int DEMIAN_SWORD_VELOCITY = 30; // default velocity
    public static final int DEMIAN_SWORD_TARGETING_VELOCITY = 60; // default velocity when targeting
    public static final int DEMIAN_MAX_STIGMA = 7; // max stigma
    public static final int DEMIAN_MAX_CORRUPTION = 7; // max corruption
    public static final int DEMIAN_PASSIVE_STIGMA_TIME = 30 * 1000; // Every 30 seconds, users are hit with +1 stigma
    public static final int DEMIAN_STIGMA_INCINERATE_OBJECT_RESPAWN_TIME = 20 * 1000; // Stigma Pillar spawns every 20seconds
    public static final int DEMIAN_STIGMA_INCINERATE_OBJECT_DURATION_TIME = 10 * 1000; // Stigma Pillar lasts 10 seconds
    public static final int DEMIAN_TIME = 30 * 60; // 30 min timer
    // GOLLUX ----------------------------------------------------------------------------------------------------------
    public static final int GOLLUX_ENTRACE_MAP = 863010000;
    public static final int GOLLUX_TIME = 30 * 60; // 30 min timer
    public static final int[][] GOLLUX_HP_MULTIPLIERS = {{1, 60, 300, 500}, {1, 10, 150, 3000}, {1, 10, 300, 6000}};
    public static final int GOLLUX_FIRST_MAP = 863010100;
    public static final int GOLLUX_RIGHT_SHOULDER = 863010330;
    public static final int GOLLUX_LEFT_SHOULDER = 863010430;
    public static final int GOLLUX_ABDOMEN = 863010240;
    public static final int[] GOLLUX_RIGHT_HAND_SKILLS = new int[]{3, 5, 6, 8, 10};
    public static final int[] GOLLUX_LEFT_HAND_SKILLS = new int[]{2, 4, 7, 9, 11};
    public static final int GOLLUX_BREATH_ATTACK = 1;
    public static final int GOLLUX_DROP_STONE_CHANCE = 25;
    public static final int GOLLUX_REWARD_MAP = 863010700;
    // GlOOM -----------------------------------------------------------------------------------------------------------
    public static final int GLOOM_ENTRACE_MAP = 450009301;
    // VON BON ---------------------------------------------------------------------------------------------------------
    public static final String[] VON_BON_PORTAL_NAMES =
            {"Pt01", "Pt02", "Pt04gate", "Pt05gate", "Pt06gate",
                    "Pt08gate", "Pt09gate", "Pt03gate", "Pt07gate"};
    // VELLUM ----------------------------------------------------------------------------------------------------------
    public static final int VELLUM_ATOM_EXECUTION_DELAY = 3000; // in ms. Delay between method executions
    // RANMARU ---------------------------------------------------------------------------------------------------------
    public static final int RANMARU_ENTRACE_MAP = 211041700;
    public static final int RANMARU_TIME = 30 * 60;
    // PRINCESS NO -----------------------------------------------------------------------------------------------------
    public static final int PRINCESS_NO_ENTRACE_MAP = 811000008;
    // LUCID -----------------------------------------------------------------------------------------------------------
    public static final int LUCID_ENTRACE_MAP = 450004000;
    public static final int LUCID_TIME = 30 * 60;
    public static final List<String> STAINED_GLASS = Arrays.asList("Bblue1", "Bblue2", "Bblue3", "Bred1", "Bred2",
            "Bred3", "Mred2", "Mred3", "Myellow1", "Myellow2", "Myellow3");
    // WILL ------------------------------------------------------------------------------------------------------------
    public static final int WILL_ENTRACE_MAP = 450007240;
    public static final int WILL_TIME = 30 * 60; // 20 minutes
    // JULIETA ---------------------------------------------------------------------------------------------------------
    public static final int JULIETA_ENTRACE_MAP = 867236000;
    // DARKNELL ---------------------------------------------------------------------------------------------------------
    public static final int DARKNELL_ENTRANCE_MAP = 450012200;
    // BLACK MAGE ------------------------------------------------------------------------------------------------------
    public static final int BLACK_MAGE_ENTRANCE_MAP = 450012500;
    // AKECHI MITSUHIDE ------------------------------------------------------------------------------------------------
    public static final int AKECHI_ENTRANCE_MAP = 874000100;
    public static final int AKECHI_BATTLE_MAP = 874004000;
    public static final int AKECHI_TIME = 30 * 60;

    public static Rect getMobSkillRect(Mob mob, int skillLevel) {
        Rect rect = new Rect();
        boolean isZakumVerticalArmSkill = isZakumArm(mob.getTemplateId()) && (skillLevel == 25 || skillLevel == 26 || skillLevel == 33 || skillLevel == 34 || skillLevel == 35 || skillLevel == 36);
        boolean isZakumHorizontalArmSkill = isZakumArm(mob.getTemplateId()) && skillLevel == 27;
        switch (mob.getTemplateId()) {
            case 8800023: //Easy Zakum Arm 1
            case 8800003: //Normal Zakum Arm 1
            case 8800103: //Chaos Zakum Arm 1
            {
                if (isZakumVerticalArmSkill) {
                    rect = new Rect(-160, 50, -30, 86);
                } else if (isZakumHorizontalArmSkill) {
                    rect = new Rect(-514, -234, -260, -198);
                }
                break;
            }
            case 8800024: //Easy Zakum Arm 2
            case 8800004: //Normal Zakum Arm 2
            case 8800104: //Chaos Zakum Arm 2
            {
                if (isZakumVerticalArmSkill) {
                    rect = new Rect(-290, 50, -160, 86);
                } else if (isZakumHorizontalArmSkill) {
                    rect = new Rect(-549, -149, -312, -113);
                }
                break;
            }
            case 8800025: //Easy Zakum Arm 3
            case 8800005: //Normal Zakum Arm 3
            case 8800105: //Chaos Zakum Arm 3
            {
                if (isZakumVerticalArmSkill) {
                    rect = new Rect(-420, 50, -290, 86);
                } else if (isZakumHorizontalArmSkill) {
                    rect = new Rect(-549, -55, -308, -19);
                }
                break;
            }

            case 8800026: //Easy Zakum Arm 4
            case 8800006: //Normal Zakum Arm 4
            case 8800106: //Chaos Zakum Arm 4
            {
                if (isZakumVerticalArmSkill) {
                    rect = new Rect(-550, 50, -420, 86);
                }
                break;
            }
            case 8800027: //Easy Zakum Arm 5
            case 8800007: //Normal Zakum Arm 5
            case 8800107: //Chaos Zakum Arm 5
            {
                if (isZakumVerticalArmSkill) {
                    rect = new Rect(-10, 50, 90, 86);
                } else if (isZakumHorizontalArmSkill) {
                    rect = new Rect(300, -237, 554, -201);
                }
                break;
            }
            case 8800028: //Easy Zakum Arm 6
            case 8800008: //Normal Zakum Arm 6
            case 8800108: //Chaos Zakum Arm 6
            {
                if (isZakumVerticalArmSkill) {
                    rect = new Rect(125, 50, 255, 86);
                } else if (isZakumHorizontalArmSkill) {
                    rect = new Rect(334, -149, 589, -113);
                }
                break;
            }
            case 8800029: //Easy Zakum Arm 7
            case 8800009: //Normal Zakum Arm 7
            case 8800109: //Chaos Zakum Arm 7
            {
                if (isZakumVerticalArmSkill) {
                    rect = new Rect(260, 50, 390, 86);
                } else if (isZakumHorizontalArmSkill) {
                    rect = new Rect(313, -55, 567, -19);
                }
                break;
            }
            case 8800030: //Easy Zakum Arm 8
            case 8800010: //Normal Zakum Arm 8
            case 8800110: //Chaos Zakum Arm 8
            {
                if (isZakumVerticalArmSkill) {
                    rect = new Rect(395, 50, 525, 86);
                }
                break;
            }
            default:
                rect = new Rect(0, 0, 0, 0);
                break;
        }
        return rect;
    }

    public static boolean isZakumArm(int mobID) {
        //Easy Zakum Arm
        if (mobID >= 8800023 && mobID <= 8800030) {
            return true;
        }
        //Normal Zakum Arm
        if (mobID >= 8800003 && mobID <= 8800010) {
            return true;
        }
        //Chaos Zakum Arm
        else return mobID >= 8800103 && mobID <= 8800110;
    }

    public static boolean isZakumMob(int mobID) {
        switch (mobID) {
            //Easy
            case 8800020:
            case 8800021:
            case 8800022:

            case 8800023:
            case 8800024:
            case 8800025:
            case 8800026:

            case 8800027:
            case 8800028:
            case 8800029:
            case 8800030:
                //Normal
            case 8800000:
            case 8800001:
            case 8800002:

            case 8800003:
            case 8800004:
            case 8800005:
            case 8800006:
            case 8800007:
            case 8800008:
            case 8800009:
            case 8800010:
                //Chaos
            case 8800100:
            case 8800101:
            case 8800102:

            case 8800103:
            case 8800104:
            case 8800105:
            case 8800106:
            case 8800107:
            case 8800108:
            case 8800109:
            case 8800110:
                return true;
            default:
                return false;
        }
    }

    public static boolean isVellum(int mobID) {
        return mobID == 8930100 || mobID == 8930000;
    }

    public static List<Position> vellumStonePositionList = List.of(
            new Position(810, 443),
            new Position(-2190, 443),
            new Position(-1690, 443),
            new Position(560, 443),
            new Position(-190, 443),
            new Position(-690, 443),
            new Position(-1940, 443),
            new Position(1310, 443),
            new Position(-1190, 443),
            new Position(1060, 443),
            new Position(-940, 443),
            new Position(-1440, 443),
            new Position(1560, 443),
            new Position(-440, 443)
    );
}
