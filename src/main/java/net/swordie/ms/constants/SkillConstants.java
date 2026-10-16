package net.swordie.ms.constants;

import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.client.jobs.Zero;
import net.swordie.ms.client.jobs.adventurer.*;
import net.swordie.ms.client.jobs.adventurer.archer.Archer;
import net.swordie.ms.client.jobs.adventurer.archer.BowMaster;
import net.swordie.ms.client.jobs.adventurer.archer.Marksman;
import net.swordie.ms.client.jobs.adventurer.archer.Pathfinder;
import net.swordie.ms.client.jobs.adventurer.magician.Bishop;
import net.swordie.ms.client.jobs.adventurer.magician.FirePoison;
import net.swordie.ms.client.jobs.adventurer.magician.IceLightning;
import net.swordie.ms.client.jobs.adventurer.pirate.Buccaneer;
import net.swordie.ms.client.jobs.adventurer.pirate.Cannoneer;
import net.swordie.ms.client.jobs.adventurer.pirate.Corsair;
import net.swordie.ms.client.jobs.adventurer.thief.DualBlade;
import net.swordie.ms.client.jobs.adventurer.thief.NightLord;
import net.swordie.ms.client.jobs.adventurer.thief.Shadower;
import net.swordie.ms.client.jobs.adventurer.warrior.DarkKnight;
import net.swordie.ms.client.jobs.adventurer.warrior.Hero;
import net.swordie.ms.client.jobs.adventurer.warrior.Paladin;
import net.swordie.ms.client.jobs.adventurer.warrior.Warrior;
import net.swordie.ms.client.jobs.anima.HoYoung;
import net.swordie.ms.client.jobs.anima.Lara;
import net.swordie.ms.client.jobs.anima.Ren;
import net.swordie.ms.client.jobs.Jianghu.Lynn;
import net.swordie.ms.client.jobs.shine.SiaAstelle;
import net.swordie.ms.client.jobs.cygnus.*;
import net.swordie.ms.client.jobs.flora.Adele;
import net.swordie.ms.client.jobs.flora.Ark;
import net.swordie.ms.client.jobs.flora.Illium;
import net.swordie.ms.client.jobs.legend.*;
import net.swordie.ms.client.jobs.nova.AngelicBuster;
import net.swordie.ms.client.jobs.nova.Cadena;
import net.swordie.ms.client.jobs.nova.Kain;
import net.swordie.ms.client.jobs.nova.Kaiser;
import net.swordie.ms.client.jobs.resistance.*;
import net.swordie.ms.client.jobs.resistance.demon.Demon;
import net.swordie.ms.client.jobs.resistance.demon.DemonAvenger;
import net.swordie.ms.client.jobs.resistance.demon.DemonSlayer;
import net.swordie.ms.client.jobs.sengoku.Hayato;
import net.swordie.ms.enums.BeastTamerBeasts;
import net.swordie.ms.loaders.SkillData;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static net.swordie.ms.client.jobs.sengoku.Kanna.*;

public class SkillConstants {

    public static final int[] passiveDebuffs = {
            33110014, // Jaguar Link
            80002635, // Black Mage's Binding
            80002636, // Black Mage's Binding
            80002637, // Black Mage's Binding
            80002905, // Black Mage's Binding
            80003019, // null
            80003020, // null
            80003021, // null
            80003033, // null
            80003267, // null
            80003268, // null
            80003503, // null
            80003787, // Explorer's Pack
            80003788, // Advanced Explorer's Pack
            80003789, // Veteran Explorer's Pack
            80003790, // Grave Robber's Backpack
            80003791, // Grave Robber's Bulging Backpack
            80003792, // Whispering Tome
            80003793, // Tome of the High Sybarite
            80003794, // Gladiator's Amulet
            80003795, // Battle-Hammered Gladiator's Amulet
            80003796, // Aidan's Medallion
            80003797, // Azmothian Crystal
            80003798, // Azmothian Blood Crystal
            80003799, // Coliseum Booster
            80003800, // Red Coliseum Booster
            80003801, // Magatia's Support
            80003802, // Magatia's Support
            80003803, // Magatia's Support
            80003804, // Magatia's Support
            80003807, // Chasm Withering
            80003819, // Champion Insignia: All Stats
            80003820, // Champion Insignia: Attack Power & Magic ATT
            80003821, // Champion Insignia: Boss Damage
            80003822, // Champion Insignia: Critical Damage
            80003823, // Champion Insignia: Ignore Defense
            80003841, // null
            80003870, // Limit-breaking Vow
            80003871, // Limit-breaking Vow
            80003872, // Limit-breaking Spirit
            80003876, // Supreme Aura
            80003909, // Power of the Adversary
            80003937, // Black Mage's Binding
    };

    public static final int[] STACK_SKILLS = {
            -7, -6, -5, -4, -3, -2, -1,
            Hayato.RISING_SLASH_BATTOUJUTSU,
            Hero.HEXA_BEAM_BLADE,
            Cannoneer.BARREL_ROULETTE, Cannoneer.HEXA_ROLLING_RAINBOW,
            Aran.COMBO_ABILITY,
            27111009, // Equilibrium Liberation
            Xenon.SUPPLY_SURPLUS,
            31240014, // Maximal Exceed
            Kain.POSSESSION,
            64141000, // HEXA Chain Arts: Thrash
            Kinesis.MENTAL_OVERDRIVE,
            Adele.AETHER_WEAVING,
            Illium.CRYSTAL_BATTERY,
            Lara.MOUNTAIN_SEEDS, Lara.DRAGON_VEIN_TRACES, Lara.UNCONSTRAINED_DRAGON_VEIN,
            HoYoung.MASTER_ELIXIR,
            182001001, // Stellar I - Antares
            Job.WEAPON_AURA,
            DemonAvenger.DEMONIC_FRENZY, DemonAvenger.REVENANT, 500061054, // HEXA Revenant
            BlazeWizard.INFERNO_SPHERE,
            WindArcher.HOWLING_GALE,
            WildHunter.PRIMAL_GRENADE,
            BowMaster.SILHOUETTE_MIRAGE,
            400031070, // Primal Grenade: Spark
            Xenon.CORE_OVERLOAD_BUFF
    };

    public static final short PASSIVE_HYPER_MIN_LEVEL = 140;
    public static final List<Short> ACTIVE_HYPER_LEVELS = Arrays.asList((short) 150, (short) 170, (short) 200);

    public static final short LINK_SKILL_1_LEVEL = 70;
    public static final short LINK_SKILL_2_LEVEL = 120;
    public static final short LINK_SKILL_3_LEVEL = 210;

    public static final byte PASSIVE_HYPER_JOB_LEVEL = 6;
    public static final byte ACTIVE_HYPER_JOB_LEVEL = 7;

    public static final int MAKING_SKILL_EXPERT_LEVEL = 10;
    public static final int MAKING_SKILL_MASTER_LEVEL = 11;
    public static final int MAKING_SKILL_MEISTER_LEVEL = 12;

    public static final int MINING_SKILL = 92010000;
    public static final int HERBALISM_SKILL = 92000000;

    public static final int CARDINAL_TORRENT_COOLDOWN = Pathfinder.CARDINAL_TORRENT + 200;

    // Active buff Soul Skill
    public static final int A_QUEENLY_FRAGRANCE = 80001280;
    public static final int HAPPY_NEW_WEEK = 80001948;
    // Summon Soul Skill
    public static final int EMPRESS_OFF_LAMES = 80001266;
    public static final int CUTE_OVERLOAD = 80001269;
    public static final int EMPRESS_OF_FURY = 80001270;
    public static final int HILLA_FURY = 80001322;
    public static final int HILLA_THUNDER = 80001323;
    public static final int WRATH_OF_MAGNUS = 80001341;
    public static final int MURGOTH_STRANGE_COMPANY = 80001395;
    public static final int MURGOTH_SUSPICIOUS_COMPANY = 80001396;
    public static final int BLACK_KNIGHT = 80001493;
    public static final int PITCH_BLACK_KNIGHT = 80001494;
    public static final int MAD_MAGE = 80001495;
    public static final int COMPLETELY_MAD_MAGE = 80001496;
    public static final int RAMPANT_CYBORG = 80001497;
    public static final int FULLY_RAMPANT_CYBORG = 80001498;
    public static final int VICIOUS_HUNTER = 80001499;
    public static final int UTTERLY_VICIOUS_HUNTER = 80001500;
    public static final int BAD_BRAWLER = 80001501;
    public static final int REAL_BAD_BRAWLER = 80001502;
    public static final int CHICKEN_RISING = 80001685;
    public static final int LONG_LIVE_THE_QUEEN = 80001690;
    public static final int LONG_LIVE_THE_QUEEN_1 = 80001691;
    public static final int LONG_LIVE_THE_QUEEN_2 = 80001692;
    public static final int LONG_LIVE_THE_QUEEN_3 = 80001693;
    public static final int JR_VELLUM = 80001695;
    public static final int LOTUS_STRIKE = 80001696;
    public static final int LOTUS_ENRAGED = 80001697;
    public static final int ROCK_AND_ROLL_BABY = 80001804;
    public static final int MORE_THAN_A_CUTIE = 80001806;
    public static final int MIGHTY_ROAR = 80001807;
    public static final int FEROCIOUS_ROAR = 80001808;

    public static boolean isOriginSkill(int skillID) {
        int sub = skillID % 100000;
        if (sub >= 41500 && sub <= 41599) {
            return true;
        }
        // Dual Blade Origin (4361500, 4361504)
        if (skillID >= 4361500 && skillID <= 4361599) {
            return true;
        }
        // Evan Origin (22201500, 22201502)
        if (skillID >= 22201500 && skillID <= 22201599) {
            return true;
        }
        return false;
    }

    // used for char specific Xenon pod cooldown.
    public static final int XENON_POD_FOR_COOLDOWN = 899999999;

    public static boolean findProcessType(int skillID, int type) {
        SkillInfo skill = SkillData.getSkillInfoById(skillID);
        return skill != null && skill.findProcessType(type);
    }

    public static boolean isSkillNeedMasterLevel(int skillID) {
        int skillRoot = getSkillRootFromSkill(skillID);
        if (skillRoot == 0 || JobConstants.isBeginnerJob((short) skillRoot) || skillRoot == 16002) {
            return false;
        }

        boolean v2;

        // ----- IDA top if/else that only sets v2 or returns 0 -----
        if (skillID > 5321006) {
            if (skillID > 51120000) {
                if (skillID > 152121006) {
                    if (skillID == 152121010 || skillID == 152140016) return false;
                    v2 = (skillID == 152141013);
                } else {
                    if (skillID == 152121006) return false;

                    int v6 = skillID - 80001913;
                    if (v6 == 0) return false;          // 80001913

                    int v7 = v6 - 72118090;
                    if (v7 == 0) return false;          // 152120003

                    int v8 = v7 - 9;
                    if (v8 == 0) return false;          // 152120012

                    v2 = (v8 == 1);                     // 152120013
                }
            } else {
                if (skillID == 51120000
                        || skillID == 23121008
                        || skillID == 21120011
                        || skillID == 21121008
                        || skillID == 22171069
                        || skillID == 23120013
                        || skillID == 23121011
                        || skillID == 33120010) {
                    return false;
                }
                v2 = (skillID == 35120014);
            }
        } else {
            if (skillID == 5321006) return false;

            if (skillID > 4340012) {
                if (skillID > 5221022) {
                    if (skillID == 5221029 || skillID == 5320007) return false;
                    v2 = (skillID == 5321004);
                } else {
                    if (skillID == 5221022) return false;

                    int v3 = skillID - 5120011;
                    if (v3 == 0) return false;          // 5120011

                    int v4 = v3 - 1;
                    if (v4 == 0) return false;          // 5120012

                    int v5 = v4 - 100000;
                    if (v5 == 0) return false;          // 5220012

                    v2 = (v5 == 2);                     // 5220014
                }
            } else {
                if (skillID == 4340012
                        || skillID == 2321010
                        || skillID == 1120012
                        || skillID == 1320011
                        || skillID == 2121009
                        || skillID == 2221009
                        || skillID == 3210015
                        || skillID == 4110012
                        || skillID == 4210012) {
                    return false;
                }
                v2 = (skillID == 4340010);
            }
        }

        // ----- IDA gate block -----
        if (!v2 && (Integer.toUnsignedLong(skillID - 92000000) >= 1_000_000L
                || skillID != 10000 * (skillID / 10000))) {
            int v9 = 10000 * (skillID / 10000);

            if ((Integer.toUnsignedLong(v9 - 92000000) >= 1_000_000L
                    || v9 != 10000 * (v9 / 10000))
                    && !isCommonSkill(skillID)
                    && !isSpecialSkillMasteryCheck(skillID)
                    && !isFieldAttackObjSkill(skillID)) {

                int v11 = getSkillRootFromSkill(skillID);

                if (skillID != 42120024 && Integer.toUnsignedLong(v11 - 11200) >= 0x64 && v11 != 11000) {
                    int v12 = getJobGroupFromSkillRoot(v11);

                    if (!isIgnoredSkillRoot(v11)) {
                        boolean v13;

                        if (skillID > 101100101) {
                            if (skillID > 101110203) {
                                int v16 = skillID - 101120104;
                                if (v16 == 0) return true;      // 101120104
                                v13 = (v16 == 100);             // 101120204
                            } else {
                                if (skillID == 101110203) return true;
                                int v14 = skillID - 101100201;
                                if (v14 == 0) return true;      // 101100201
                                int v15 = v14 - 9901;
                                if (v15 == 0) return true;      // 101110102
                                v13 = (v15 == 98);              // 101110200
                            }
                        } else {
                            if (skillID == 101100101
                                    || skillID == 4331002
                                    || skillID == 4311003
                                    || skillID == 4321006
                                    || skillID == 4330009
                                    || skillID == 4340007
                                    || skillID == 4341004) {
                                return true;
                            }
                            v13 = (skillID == 101000101);
                        }

                        if (v13 || (v12 == 4 && v11 != 10000 && Integer.toUnsignedLong(v11 - 10100) >= 100L)) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    private static boolean isSkillRootWhitelisted(int nJobID) {
        switch (nJobID) {
            case 40000:
            case 40001:
            case 40002:
            case 40003:
            case 40004:
            case 40005:
                return true;
            default:
                return false;
        }
    }

    private static boolean isSpecialRoot(int nJobID) {
        int v2;
        int v3;
        boolean v4;
        boolean v5;
        int v6;
        int v7;
        int v8;

        if (nJobID <= 6003) {
            if (nJobID == 6003) {
                return true;
            }
            if (nJobID <= 3002) {
                if (nJobID == 3002) {
                    return true;
                }
                if (nJobID > 2004) {
                    if (nJobID == 2005) {
                        return true;
                    }
                    v4 = (nJobID == 3001);
                } else {
                    if (nJobID == 2004) {
                        return true;
                    }
                    v2 = nJobID - 2001;
                    if (v2 == 0) {
                        return true;
                    }
                    v3 = v2 - 1;
                    if (v3 == 0) {
                        return true;
                    }
                    v4 = (v3 == 1);
                }
                return v4
                        || (!isSkillRootWhitelisted(nJobID)
                        && (nJobID == 1000 * (nJobID / 1000)
                        || Integer.toUnsignedLong(nJobID - 800000) < 0x64L
                        || nJobID == 8001
                        || Integer.toUnsignedLong(nJobID - 800100) < 0x64L));
            }

            if (nJobID > 6000) {
                v8 = nJobID - 6001;
                if (v8 == 0) {
                    return true;
                }
                v4 = (v8 == 1);
                return v4
                        || (!isSkillRootWhitelisted(nJobID)
                        && (nJobID == 1000 * (nJobID / 1000)
                        || Integer.toUnsignedLong(nJobID - 800000) < 0x64L
                        || nJobID == 8001
                        || Integer.toUnsignedLong(nJobID - 800100) < 0x64L));
            }

            if (nJobID == 6000) {
                return true;
            }
            v6 = nJobID - 4001;
            v5 = (v6 == 0);
            if (v5) {
                return true;
            }
            v7 = v6 - 1;
            if (v7 == 0) {
                return true;
            }
            v4 = (v7 == 998);
            return v4
                    || (!isSkillRootWhitelisted(nJobID)
                    && (nJobID == 1000 * (nJobID / 1000)
                    || Integer.toUnsignedLong(nJobID - 800000) < 0x64L
                    || nJobID == 8001
                    || Integer.toUnsignedLong(nJobID - 800100) < 0x64L));
        }

        if (nJobID > 15001) {
            if (nJobID > 17000) {
                if (nJobID == 17001) {
                    return true;
                }
                v4 = (nJobID == 18000);
                return v4
                        || (!isSkillRootWhitelisted(nJobID)
                        && (nJobID == 1000 * (nJobID / 1000)
                        || Integer.toUnsignedLong(nJobID - 800000) < 0x64L
                        || nJobID == 8001
                        || Integer.toUnsignedLong(nJobID - 800100) < 0x64L));
            }
            if (nJobID == 17000) {
                return true;
            }
            v6 = nJobID - 15002;
            v5 = (v6 == 0);
            if (v5) {
                return true;
            }
            v7 = v6 - 1;
            if (v7 == 0) {
                return true;
            }
            v4 = (v7 == 998 || v7 == 999 || nJobID == 16002);
            return v4
                    || (!isSkillRootWhitelisted(nJobID)
                    && (nJobID == 1000 * (nJobID / 1000)
                    || Integer.toUnsignedLong(nJobID - 800000) < 0x64L
                    || nJobID == 8001
                    || Integer.toUnsignedLong(nJobID - 800100) < 0x64L));
        }

        if ((nJobID - 15000) <= 1
                || (nJobID - 13000) <= 1
                || nJobID == 8001
                || nJobID == 12005) {
            return true;
        }

        v4 = (nJobID == 14000);
        return v4
                || (!isSkillRootWhitelisted(nJobID)
                && (nJobID == 1000 * (nJobID / 1000)
                || Integer.toUnsignedLong(nJobID - 800000) < 0x64L
                || nJobID == 8001
                || Integer.toUnsignedLong(nJobID - 800100) < 0x64L));
    }

    public static boolean isSpecialSkillMasteryCheck(int nSkillID) {
        int v1 = nSkillID / 10000;
        if (v1 == 8000 || v1 == 8001) {
            v1 = nSkillID / 100;
        }

        switch (v1) {
            case 40000:
            case 40001:
            case 40002:
            case 40003:
            case 40004:
            case 40005:
                return false;
            default:
                // if ( v1 - 9200 < 0x64 )  // unsigned
                if (Integer.toUnsignedLong(v1 - 9200) < 0x64L) {
                    return isSpecialRoot(v1);
                }

                switch (v1) {
                    case 50000:
                    case 50001:
                    case 50002:
                    case 50003:
                    case 50004:
                    case 50005:
                    case 50006:
                    case 50007:
                    case 50008:
                        return false;
                    default: {
                        int v2 = v1 - 2;
                        if (v1 == 436 || v1 == 2220) {
                            return false;
                        }
                        if (isSpecialRoot(v2)
                                || v2 == 100 * (v2 / 100)
                                || v1 == 503
                                || v1 == 3103
                                || v1 == 303
                                || v1 == 510) {
                            return isSpecialRoot(v1);
                        }

                        int v6;
                        if (v2 / 100 == 22 || v1 == 2003) {
                            switch (v1) {
                                case 2202:
                                case 2212:
                                    v6 = 1;
                                    break;
                                case 2213:
                                case 2214:
                                case 2215:
                                    v6 = 2;
                                    break;
                                case 2216:
                                case 2217:
                                case 2218:
                                    v6 = 3;
                                    break;
                                case 2219:
                                    v6 = 4;
                                    break;
                                default:
                                    v6 = 0;
                                    break;
                            }
                        } else {
                            int v3 = v2 / 10;
                            int v4 = v2 % 10;
                            int v5 = v4 / 2;
                            if (v3 != 43) {
                                v5 = v4;
                            }
                            v6 = v5 + 2;
                            if (v5 > 2) {
                                return isSpecialRoot(v1);
                            }
                        }

                        if (v6 != 4) {
                            return isSpecialRoot(v1);
                        }
                        return false;
                    }
                }
        }
    }

    public static boolean isIgnoredSkillRoot(int skillRoot) {
        switch (skillRoot) {
            case 40000:
            case 40001:
            case 40002:
            case 40003:
            case 40004:
            case 40005:
                return true;
            default:
                // if ( (a1 - 9200) >= 0x64 )  // unsigned
                if (Integer.toUnsignedLong(skillRoot - 9200) >= 0x64L) {
                    switch (skillRoot) {
                        case 50000:
                        case 50001:
                        case 50002:
                        case 50003:
                        case 50004:
                        case 50005:
                        case 50006:
                        case 50007:
                        case 50008:
                            return true;
                        default:
                            if (skillRoot == 436 || skillRoot == 2220 || getJobGroupFromSkillRoot(skillRoot - 2) == 4) {
                                return true;
                            }
                            break;
                    }
                }
                return false;
        }
    }

    public static int getJobGroupFromSkillRoot(int skillRoot) {
        int v2;
        int v3;
        boolean v4;
        boolean v5;
        int v6;
        int v7;
        int v8;
        int v9;
        int v10;
        int v11;
        int v12;
        int result;

        if (skillRoot > 6003) {
            if (skillRoot <= 15001) {
                if ((skillRoot - 15000) > 1
                        && (skillRoot - 13000) > 1
                        && skillRoot != 8001
                        && skillRoot != 12005) {
                    v4 = (skillRoot == 14000);
                    if (v4) {
                        return 1;
                    }
                } else {
                    return 1;
                }
            } else {
                if (skillRoot > 17000) {
                    if (skillRoot != 17001) {
                        v4 = (skillRoot == 18000);
                        if (v4) {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                } else {
                    if (skillRoot == 17000) {
                        return 1;
                    }
                    v6 = skillRoot - 15002;
                    v5 = (v6 == 0);
                    if (!v5) {
                        v7 = v6 - 1;
                        if (v7 != 0) {
                            v4 = (v7 == 998 || v7 == 999 || skillRoot == 16002);
                            if (v4) {
                                return 1;
                            }
                        } else {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                }
            }
        } else {
            if (skillRoot == 6003) {
                return 1;
            }
            if (skillRoot > 3002) {
                if (skillRoot > 6000) {
                    v8 = skillRoot - 6001;
                    if (v8 != 0) {
                        v4 = (v8 == 1);
                        if (v4) {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                } else {
                    if (skillRoot == 6000) {
                        return 1;
                    }
                    v6 = skillRoot - 4001;
                    v5 = (v6 == 0);
                    if (!v5) {
                        v7 = v6 - 1;
                        if (v7 != 0) {
                            v4 = (v7 == 998);
                            if (v4) {
                                return 1;
                            }
                        } else {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                }
            } else {
                if (skillRoot == 3002) {
                    return 1;
                }
                if (skillRoot > 2004) {
                    if (skillRoot != 2005) {
                        v4 = (skillRoot == 3001);
                        if (v4) {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                } else {
                    if (skillRoot == 2004) {
                        return 1;
                    }
                    v2 = skillRoot - 2001;
                    if (v2 == 0) {
                        return 1;
                    }
                    v3 = v2 - 1;
                    if (v3 == 0) {
                        return 1;
                    }
                    v4 = (v3 == 1);
                    if (v4) {
                        return 1;
                    }
                }
            }
        }

        // tail sau LABEL_31
        switch (skillRoot) {
            case 40000:
            case 40001:
            case 40002:
            case 40003:
            case 40004:
            case 40005:
                break;
            default:
                if (skillRoot == 1000 * (skillRoot / 1000)
                        || Integer.toUnsignedLong(skillRoot - 800000) < 0x64L
                        || skillRoot == 8001
                        || Integer.toUnsignedLong(skillRoot - 800100) < 0x64L) {
                    return 1;
                }
                break;
        }

        if (skillRoot == 100 * (skillRoot / 100)
                || skillRoot == 501
                || skillRoot == 3101
                || skillRoot == 301
                || skillRoot == 508) {
            return 1;
        }

        if (skillRoot / 100 == 22 || skillRoot == 2001) {
            switch (skillRoot) {
                case 2200:
                case 2210:
                    result = 1;
                    break;
                case 2211:
                case 2212:
                case 2213:
                    result = 2;
                    break;
                case 2214:
                case 2215:
                case 2216:
                    result = 3;
                    break;
                case 2217:
                case 2218:
                    result = 4;
                    break;
                default:
                    result = 0;
                    break;
            }
        } else {
            v9 = skillRoot / 10;
            v10 = skillRoot % 10;
            v11 = v10 / 2;
            if (v9 != 43) {
                v11 = v10;
            }
            v12 = 0;
            if (v11 <= 2) {
                return v11 + 2;
            }
            return v12;
        }

        return result;
    }

    private static int tail(int a1) {
        switch (a1) {
            case 40000: case 40001: case 40002: case 40003: case 40004: case 40005:
                break;
            default:
                if (a1 % 1000 == 0 || (a1 - 800000) < 0x64 || a1 == 8001 || (a1 - 800100) < 0x64)
                    return 1;
                break;
        }

        if (a1 % 100 == 0 || a1 == 501 || a1 == 3101 || a1 == 301 || a1 == 508)
            return 1;

        if (a1 / 100 == 22 || a1 == 2001) {
            switch (a1) {
                case 2200:
                case 2210: return 1;
                case 2211:
                case 2212:
                case 2213: return 2;
                case 2214:
                case 2215:
                case 2216: return 3;
                case 2217:
                case 2218: return 4;
                default: return 0;
            }
        }

        int v13 = a1 / 10;
        int v14 = a1 % 10;
        int v15 = (v13 == 43) ? (v14 / 2) : v14;
        return v15 <= 2 ? v15 + 2 : 0;
    }

    public static int getSkillRootFromSkill(int skillId) {
        int root = skillId / 10000;
        if (root == 8000 || root == 8001) {
            root = skillId / 100;
        }
        return root;
    }

    public static boolean isFieldAttackObjSkill(int skillId) {
        if (skillId < 1) {
            return false;
        }
        int v1 = skillId / 10000;
        if (v1 == 8000 || v1 == 8001) {
            v1 = skillId / 100;
        }
        return v1 == 9500;
    }

    private static boolean isNoviceSkill(int skillId) {
        int prefix = skillId / 10000;
        if (skillId / 10000 == 8000) {
            prefix = skillId / 100;
        }
        return JobConstants.isBeginnerJob((short) prefix);
    }

    private static boolean isCommonSkill(int nSkillID) {
        int v1 = nSkillID / 10000;
        if (v1 == 8000 || v1 == 8001) {
            v1 = nSkillID / 100;
        }
        // (v1 - 800000) <= 0x63: unsigned
        return Integer.toUnsignedLong(v1 - 800000) <= 0x63L
                || Integer.toUnsignedLong(v1 - 800100) <= 0x63L;
    }

    public static boolean isMakingSkill(int recipeId) {
        return recipeId >= 92_000_000 && recipeId < 93_000_000 && recipeId % 10000 == 0;
    }

    public static boolean isUnionSkill(int skillId) {
        return skillId / 10000 == 7100;
    }

    public static boolean isIgnoreMasterLevel(int skillId) {
        switch (skillId) {
            case 1120012:
            case 1320011:
            case 2121009:
            case 2221009:
            case 2321010:
            case 3210015:
            case 4110012:
            case 4210012:
            case 4340010:
            case 4340012:
            case 5120011:
            case 5120012:
            case 5220012:
            case 5220014:
            case 5320007:
            case 5321004:
            case 5321006:
            case 21120011:
            case 21120014:
            case 21120020:
            case 21120021:
            case 22171069:
            case 23120012:
            case 23120013:
            case 23121008:
            case 23121011:
            case 33120010:
            case 35120014:
            case 42120024:
            case 80001913:
            case 152120003:
            case 152120012:
            case 152120013:
            case 152121006:
            case 152121010:
                return true;
            default:
                return false;
        }
    }

    public static boolean isKeyDownSkill(int skillId) {
        return switch (skillId) {
            case 2221011,
                 2221052,
                 2241005,
                 3101008,
                 3111013,
                 3121020,
                 3141000,
                 3141001,
                 3141004,
                 3201012,
                 4341002,
                 5081002,
                 5081010,
                 5700010,
                 5721001,
                 5721061,
                 13121001,
                 13141000,
                 14111006,
                 14121004,
                 20041226,
                 21121029,
                 21141004,
                 22171083,
                 23121000,
                 23141000,
                 24121000,
                 24121005,
                 24141000,
                 24141001,
                 25121030,
                 27101202,
                 27111100,
                 30021238,
                 31001000,
                 31101000,
                 31111005,
                 31211001,
                 33121009,
                 33121114,
                 33121214,
                 33141000,
                 33141001,
                 33141002,
                 35101002,
                 35110017,
                 35141003,
                 36101001,
                 36121000,
                 36141014,
                 37121052,
                 42121000,
                 42121100,
                 42141004,
                 60011216,
                 64001000,
                 64001007,
                 64001008,
                 64121002,
                 80001389,
                 80001390,
                 80001391,
                 80001392,
                 80001587,
                 80001629,
                 80001836,
                 80001887,
                 80002458,
                 80002685,
                 80002780,
                 80002785,
                 80003075,
                 80003076,
                 80003077,
                 80003087,
                 80003302,
                 80003370,
                 80003616,
                 80003668,
                 80003669,
                 80003689,
                 80011051,
                 80011362,
                 80011366,
                 80011371,
                 80011381,
                 80011382,
                 80011387,
                 80012134,
                 80012142,
                 80012143,
                 95001001,
                 101110101,
                 101110102,
                 101141015,
                 112001008,
                 112110003,
                 112111016,
                 131001004,
                 131001008,
                 131001020,
                 131001021,
                 142111010,
                 400011028,
                 400011072,
                 400011091,
                 400021061,
                 400031046,
                 400041006,
                 400041009,
                 400051024,
                 5221004,
                 5241000,
                 5241001,
                 Ren.DANCING_ANNIHILATION -> true;
            default -> findProcessType(skillId, 11);
        };
    }

    public static boolean isEvanForceSkill(int skillId) {
        switch (skillId) {
            case 22140022:
            case 22111011:
            case 22111012:
            case 22110022:
            case 22110023:
            case 22111017:
            case 80001894:
            case 22171062:
            case 22171063:
            case 22141011:
            case 22141012:
            case 400021046:
            case 400020046: // Wyrmking's Breath
            case 400020051: // Ludicrous Speed
            case 400021012:
            case 400021013:
            case 400021014:
            case 400021015:
            // Evan 6th Job (HEXA)
            case 22201002: // HEXA Thunder Circle
            case 22201003: // HEXA Dragon Flash
            case 22201004: // HEXA Thunder Flash
            case 22201005: // HEXA Wind Flash
            case 22201006: // HEXA Earth Circle
            case 22201007: // HEXA Dragon Dive
            case 22200008: // HEXA Earth Dive
            case 22200009: // HEXA Thunder Dive
            case 22201008: // HEXA Earth Dive (alt)
            case 22201009: // HEXA Thunder Dive (alt)
            case 22201010: // HEXA Wind Circle
            case 22201011: // HEXA Dragon Breath
            case 22200012: // HEXA Earth Breath
            case 22200013: // HEXA Earth Breath
            case 22200014: // HEXA Wind Breath
            case 22201012: // HEXA Earth Breath (alt)
            case 22201013: // HEXA Earth Breath (alt)
            case 22201014: // HEXA Wind Breath (alt)
            case 500061041: // HEXA Elemental Barrage
            case 500061042:
            case 500061043:
            case 500061044:
            case 500061045:
                return true;
        }
        return false;
    }

    public static boolean isSuperNovaSkill(int skillID) {
        return skillID == Shadower.SHADOW_VEIL || skillID == Shadower.HEXA_SHADOW_VEIL
                || skillID == AngelicBuster.SUPREME_SUPERNOVA || skillID == 65141005;
    }

    public static boolean isRushBombSkill(int skillID) {
        return switch (skillID) {
            case 11101029,
                 12121001,
                 12141007,
                 14101028,
                 15101028,
                 15141009,
                 22140015,
                 22140024,
                 2221012,
                 2241002,
                 5301001,

                 22200009,
                 11221001,
                 20041186,
                 22140000,
                 22140003,

                 42141008,
                 42141010,
                 61111100,
                 61111113,
                 61111218,

                 61141015,
                 61141016,
                 61141017,
                 64101002,
                 64141032,
                 80002247,
                 80002300,

                 80011380,
                 80011386,
                 80011999,
                 101120200,
                 101120203,

                 101120205,
                 101141007,
                 101141010,
                 400001018,
                 400021131,
                 400031003,

                 400031004,
                 400031036,
                 400031067,
                 400031068 -> true;

            default -> false;
        };
    }

    public static boolean isZeroSkill(int skillID) {
        int prefix = skillID / 10000;
        if (prefix == 8000) {
            prefix = skillID / 100;
        }
        return prefix == 10000 || prefix == 10100 || prefix == 10110 || prefix == 10111 || prefix == 10112 || prefix == 10114;
    }

    public static boolean isUsercloneSummonedAbleSkill(int skillID) {
        return switch (skillID) {
            // 111 / 141 (Night Walker)
            case 11111130,
                 11111230,
                 14001020,
                 14101020,
                 14101021,
                 14101028,
                 14101029,
                 14111020,
                 14111021,
                 14120045,
                 14121001,
                 14121002,
                 14141000,
                 14141001,
                 14141002,
                 14141003,

                 // 231 (Mercedes)
                 23100004,
                 23101000,
                 23101001,
                 23101007,
                 23110006,
                 23111000,
                 23111001,
                 23111002,
                 23111003,
                 23120013,
                 23121000,
                 23121002,
                 23121003,
                 23121011,
                 23121052,
                 23141000,
                 23141003,
                 23141004,
                 23141005,
                 23141006,
                 23141007,
                 23141008,
                 23141009,
                 23141010,
                 23141011,
                 23141012,

                 // 1010xxxx / 1011xxxx (Kinesis/ETC block)
                 101000100,
                 101000101,
                 101000200,
                 101000201,
                 101001100,
                 101001200,
                 101100100,
                 101100101,
                 101100200,
                 101100201,
                 101101100,
                 101101200,
                 101110101,
                 101110102,
                 101110104,
                 101110200,
                 101110202,
                 101110203,
                 101111100,
                 101111200,
                 101120100,
                 101120102,
                 101120104,
                 101120200,
                 101120201,
                 101120202,
                 101120204,
                 101121100,
                 101121200,
                 101141000,

                 // 10114100x / 1011410xx
                 101141001,
                 101141003,
                 101141006,
                 101141007,
                 101141008,
                 101141009,
                 101141014,
                 101141015,
                 101141016,
                 101141017,
                 101141019,
                 101141021,
                 101141022,
                 101141023,
                 101141024,
                 101141026,
                 101141027,
                 101141029,
                 101141030,
                 101141031,

                 // 131001xxx
                 131001000,
                 131001001,
                 131001002,
                 131001003,
                 131001004,
                 131001005,
                 131001008,
                 131001010,
                 131001011,
                 131001012,
                 131001013,
                 131001101,
                 131001102,
                 131001103,
                 131001104,
                 131001108,
                 131001113,
                 131001201,
                 131001202,
                 131001203,
                 131001208,
                 131001213,
                 131001313,

                 // 131002010 + derived
                 131002010,
                 400031024,
                 400041059,
                 400041060 -> true;

            default -> false;
        };
    }

    public static boolean isNoconsumeUsebulletMeleeAttack(int skillID) {
        return skillID == 14121052 || skillID == 14121003 || skillID == 14000028 || skillID == 14000029;
    }

    public static boolean isScreenCenterAttackSkill(int skillID) {
        return skillID == 15141007
                || skillID == 13121052
                || skillID == 13141005
                || skillID == 14121052
                || skillID == 14141018
                || skillID == 15121052
                || skillID == 80001431
                || skillID == 80003084
                || skillID == 100001283
                || skillID == 101141033;
    }

    public static int getSkillIdByAtomSkillId(int skillID) {
        switch (skillID) {
            case AngelicBuster.SOUL_SEEKER_ATOM:
                return AngelicBuster.SOUL_SEEKER;
            case Shadower.MESO_EXPLOSION_ATOM:
                return Shadower.MESO_EXPLOSION;
            case 4241008:
            case 4241009:
                return 4241006; // HEXA Meso Explosion
            case 4220021:
                return 4221018; // Shadow Twist / Mark
            case 4241504:
                return 4241503; // Covetous Darkness
            case NightLord.ASSASSINS_MARK_ATOM:
                return NightLord.ASSASSINS_MARK;
            case NightLord.NIGHTLORD_MARK_ATOM:
                return NightLord.NIGHT_LORD_MARK;
            case 4141003:
            case 4141004:
                return 4141002; // HEXA Assassin's Mark
            case 4141006:
                return 4141005; // HEXA Showdown Challenge
            case 3140006:
            case 3140007:
            case 3140008:
                return 3141005; // HEXA Quiver Cartridge
            case 3341003:
                return 3341002; // HEXA Bountiful Burst
            case 3341005:
                return 3341004; // HEXA Cardinal Deluge
            case 3341012:
                return 3341010; // HEXA Ancient Astra (Deluge Atom)
            case 3341502:
                return 3341500; // Forsaken Relic
            case Shade.FOX_SPIRITS_ATOM:
                return Shade.FOX_SPIRITS_INIT;
            case Shade.FOX_SPIRITS_ATOM_2:
                return Shade.FIRE_FOX_SPIRIT_MASTERY;
            case DemonAvenger.NETHER_SHIELD_ATOM:
                return DemonAvenger.NETHER_SHIELD;
            case 31241001: // HEXA Nether Shield Atom
                return 31241000; // HEXA Nether Shield
            case Phantom.ACE_IN_THE_HOLE_ATOM:
                return Phantom.ACE_IN_THE_HOLE;
            default:
                return skillID;
        }
    }

    public static boolean isRandomAttackSkill(int skillID) {
        return skillID == 80011561 || skillID == 80002463 || skillID == 80001762 || skillID == 80002212;
    }

    public static boolean isWingedJavelinOrAbyssalCast(int skillID) {
        switch (skillID) {
            case 152141004:
            case 152141005:
            case 152141006:
            case 152110004:
            case 152120016:
            case 155121003:
            case 155141018:
                return true;
            default:
                return false;
        }
    }

    public static boolean sub_14105BF20(int skillID) {
        switch (skillID) {
            case 101141018:
            case 101141020:
            case 152141001:
            case 152141002:
            case 152141005:
            case 152141006:
            case 162101011:
            case 162111005:
            case 162121010:
            case 162121019:
            case 162141009:
            case 162141019:
            case 162141020:
            case 400021122:
            case 11121018:
            case 2121052:
            case 2141010:
            case 2141011:
            case 2341005:
            case 3341002:
            case 3341005:
            case 11141004:
            case 25121131:
            case 31241001:
            case 61141006:
            case 61141007:
                return true;
            default:
                return false;
        }
    }

    public static boolean isWingedJavelin(int skillID) {
        return isWingedJavelinOrAbyssalCast(skillID) && sub_14105BF20(skillID) && skillID == 152141006;
    }

    public static boolean isAranFallingStopSkill(int skillID) {
        switch (skillID) {
            case 21110028:
            case 21120025:
            case 21110026:
            case 21001010:
            case 21000006:
            case 21000007:
            case 21110022:
            case 21110023:
            case 80001925:
            case 80001926:
            case 80001927:
            case 80001936:
            case 80001937:
            case 80001938:
                return true;
            default:
                return false;
        }
    }

    public static boolean isFlipAffectedAreaSkill(int id) {
        if (isSomeAreaAffectSkill(id)) return true;
        switch (id) {
            case 152141015:
            case 400001017:
            case 400021039:
            case 400041041:
            case 152121041:
            case 4121015:
            case 4221006:
            case 131001107:
            case 131001207:
            case 135001012:
                return true;
            default:
                return false;
        }
    }

    public static boolean isSomeAreaAffectSkill(int id) {
        switch (id) {
            case 35121052:
            case 33111013:
            case 33121012:
            case 33121016:
            case 33141023:
            case 33141024:
            case 35141004:
            case 35141005:
            case 400020046:
            case 400020051:
                return true;
            default:
                return false;
        }
    }

    public static boolean isShootSkillNotConsumingBullets(int skillID) {
        int job = skillID / 10000;
        if (skillID / 10000 == 8000) {
            job = skillID / 100;
        }
        switch (skillID) {
            case 80001279:
            case 80001914:
            case 80001915:
            case 80001880:
            case 80001629:
            case 33121052:
            case 33101002:
            case 14101006:
            case 13101020:
            case 1078:
                return true;
            default:
                return getDummyBulletItemIDForJob(job, 0, 0) > 0
                        || isShootSkillNotUsingShootingWeapon(skillID, false)
                        || isFieldAttackObjSkill(skillID);

        }
    }

    private static boolean isShootSkillNotUsingShootingWeapon(int skillID, boolean bySteal) {
        if (bySteal || (skillID >= 80001848 && skillID <= 80001850)) {
            return true;
        }
        switch (skillID) {
            case 80001863:
            case 80001880:
            case 80001914:
            case 80001915:
            case 80001939:
            case 101110204:
            case 101110201:
            case 101000202:
            case 101100202:
            case 80001858:
            case 80001629:
            case 80001829:
            case 80001838:
            case 80001856:
            case 80001587:
            case 80001418:
            case 80001387:
            case 61111215:
            case 80001279:
            case 61001101:
            case 51121008:
            case 51111007:
            case 51001004:
            case 36111010:
            case 36101009:
            case 31111005:
            case 31111006: // ? was 26803624, guessing it's just a +1
            case 31101000:
            case 22110024:
            case 22110014:
            case 21120006:
            case 21100007:
            case 21110027:
            case 21001009:
            case 21000004:
            case 5121013:
            case 1078:
            case 1079:
                return true;
            default:
                return false;

        }
    }

    private static int getDummyBulletItemIDForJob(int job, int subJob, int skillID) {
        if (job / 100 == 35)
            return 2333000;
        if (job / 10 == 53 || job == 501 || (job / 1000) == 0 && subJob == 2)
            return 2333001;
        if (JobConstants.isMercedes((short) job))
            return 2061010;
        if (JobConstants.isAngelicBuster((short) job))
            return 2333001;
        // TODO:
//        if ( !JobConstants.isPhantom((short) job)
//                || !is_useable_stealedskill(skillID)
//                || (result = get_vari_dummy_bullet_by_cane(skillID), result <= 0) )
//        {
//            result = 0;
//        }
        return 0;
    }


    public static boolean isKeydownSkillRectMoveXY(int skillID) {
        return skillID == 112111016;
    }

    public static boolean isShadowAssault(int skillID) {
        return (skillID >= 400041002 && skillID <= 400041005) ||
                (skillID >= 4241006 && skillID <= 4241010) ||
                skillID == 500061025 ||
                skillID == 500061026;
    }

    public static boolean isOctoPunch(int skillID) {
        return skillID == 5121007 || skillID == 5141000 ||  skillID == 5141002;
    }

    public static boolean isRenSpiritStrike(int skillID) {
        return skillID == 161101004 || skillID == 161111004 || skillID == 161121002 || skillID == 161141001;
    }

    public static boolean isSomeAA(int skillID) {
        switch (skillID) {
            case 3301004:
            case 3311011:
            case 3311013:
            case 3321005:
            case 3321039:
            case 64111012:  // Summon Decoy Bomb
            case 400020009: // Psychic Tornado
            case 400020010: // Psychic Tornado
            case 400020011: // Psychic Tornado
            case 400021029: // Poison Nova
            case 400021053: // Ultimate - Mind Over Matter
            case 400031035:
                return true;
        }
        return false;
    }

    public static boolean isThrowableAttackSkill(int skillID) {
        return skillID == 182101003 ||

                skillID == 400021080 ||

                skillID == 400021011 ||
                skillID == 400011004 ||
                skillID == 400021004 ||
                skillID == 400021009 ||
                skillID == 400021010 ||
                skillID == 400021028 ||
                skillID == 400021047 ||
                skillID == 400021048 ||
                skillID == 400021078 ||

                skillID == 400041034 ||
                skillID == 400031048 ||
                skillID == 400041017 ||
                skillID == 400041018 ||
                skillID == 400041020 ||

                skillID == 400051003 ||
                skillID == 400051008 ||
                skillID == 400051016 ||

                skillID == 152001002 ||
                skillID == 80003574 ||
                skillID == 80003583 ||
                skillID == 80012123 ||
                skillID == 112111004 ||

                skillID == 152120003 ||
                skillID == 152121004 ||
                skillID == 152141014 ||

                skillID == 80002834 ||
                skillID == 5211020 ||
                skillID == 1321025 ||
                skillID == 1341009 ||
                skillID == 2341000 ||
                skillID == 4101013 ||
                skillID == 5241013 ||
                skillID == 12120023 ||
                skillID == 80002691 ||
                skillID == 80002832 ||

                findProcessType(skillID, 4);
    }

    public static boolean sub_144DB7E40(int skillID) {
        return skillID == 80003582 ||

                skillID == 1101014 ||
                skillID == 80003086 ||
                skillID == 80003360 ||
                skillID == 80003386 ||
                skillID == 80003572 ||

                skillID == 80003773 ||
                skillID == 155101104 ||
                skillID == 155101204 ||
                skillID == 172101001;
    }

    public static boolean isJetPack(int skillID) {
        return skillID == 135001007 ||
                skillID == 135001010 ||
                skillID == 135003007;
    }

    public static boolean isZeroAlphaSkill(int skillID) {
        return isZeroSkill(skillID) && skillID % 1000 / 100 == 2;
    }

    public static boolean isZeroBetaSkill(int skillID) {
        return isZeroSkill(skillID) && skillID % 1000 / 100 == 1;
    }

    public static boolean isLarknessDarkSkill(int skillID) {
        switch (skillID) {
            case 27001201:
            case 27101202:
            case 27111202:
            case 27120211:
            case 27121201:
            case 27121202:
            case 27121114: // Twilight Nova (Dark)
            case 27121214: // Twilight Nova (Dark)
            case 27141004: // HEXA_APOCALYPSE
            case 27140002: // HEXA_ENDLESS_DARKNESS (passive)
            case 27141003: // HEXA_ENDLESS_DARKNESS (active/attack)
            case 27141008: // HEXA_TWILIGHT_NOVA (Dark)
            case 80001892:
                return true;
        }
        return false;
    }

    public static boolean isLarknessLightSkill(int skillID) {
        switch (skillID) {
            case 20041226:
            case 27001100:
            case 27101100:
            case 27101101:
            case 27111100:
            case 27111101:
            case 27121100:
            case 27121113: // Twilight Nova (Light)
            case 27141001: // HEXA_REFLECTION
            case 27140005: // HEXA_ETERNAL_LIGHT (passive)
            case 27141006: // HEXA_ETERNAL_LIGHT (active/attack)
            case 27141007: // HEXA_TWILIGHT_NOVA (Light)
            case 80001891:
                return true;
        }
        return false;
    }

    public static int getAdvancedCountHyperSkill(int skillId) {
        if ( skillId == 4121013 || skillId == 4141000 )
            return 4120051;
        if ( skillId == 5321012 )
            return 5320051;
        return 0;
    }

    public static int getAdvancedAttackCountHyperSkill(int skillId) {
        switch (skillId) {
            case 15141004: return 15120048;
            case 15141006: return 15120045;

            case 21101004:
            case 21111032:
            case 21111033:
            case 21121016:
            case 21121017:
            case 21121022:
            case 21141000:
            case 21141001:
            case 21141002: return 21120066;

            case 22140023: return 22170086;

            case 25121005:
            case 25141000: return 25120148;

            case 31121001:
            case 31141000:
            case 31141001: return 31120050;

            case 35121016:
            case 35141001: return 35120051;

            case 37110001:
            case 37111000:
            case 37121000:
            case 37141009:
            case 37141010:
            case 37141011: return 37120045;

            case 41121001:
            case 41141004: return 41120044;
            case 41121002:
            case 41141007: return 41120050;
            case 41121018:
            case 41121021: return 41120048;

            case 42121000:
            case 42141004: return 42120043;

            case 51121008: return 51120048;
            case 51121009:
            case 51121017:
            case 51141000:
            case 51141001: return 51120058;

            case 61121100:
            case 61121201:
            case 61141000:
            case 61141001: return 61120045;

            case 65121101:
            case 65141000: return 65120051;

            case 112000003: return 112120044;
            case 112101009: return 112120048;
            case 112111004: return 112120050;
            case 112120000:
            case 112120001:
            case 112120002:
            case 112120003: return 112120053;

            case 142110011:
            case 142140007: return 142120041;

            case 152001001:
            case 152110004:
            case 152120001:
            case 152141000:
            case 152141002:
            case 152141004:
            case 152141005: return 152120032;

            case 152121004:
            case 152141014: return 152120035;

            case 152121005:
            case 152121006:
            case 152141012:
            case 152141013: return 152120038;

            case 154001000:
            case 154101000:
            case 154101001:
            case 154101002:
            case 154111002:
            case 154121000:
            case 154141001:
            case 154141002: return 154120039;

            case 172001000:
            case 172101000:
            case 172111000:
            case 172121000:
            case 172141000: return 172120033;

            case 172111007:
            case 172141002: return 172120038;

            case 182001000:
            case 182101000:
            case 182111000:
            case 182111010:
            case 182121014:
            case 182121015:
            case 182141000: return 182120032;

            case 400010070: return 21120066;

            case 400011079:
            case 400011080:
            case 400011081:
            case 400011082: return 61120045;

            case 400041087:
            case 400041088: return 154120039;

            case 400051043: return 25120148;

            case 15141003: return 15120048;

            case 4331011: return 4340045;

            case 3141000:
            case 3141001: return 3120051;
            case 3141002:
            case 3141003: return 3120048;

            case 1241007:
            case 1221011:
            case 1241010: return 1220050;

            case 1221009:
            case 1241000: return 1220048;

            case 1120017:
            case 1121008:
            case 1141000:
            case 1141001: return 1120051;

            case 1211018:
            case 1221021:
            case 1241003: return 1220058;

            case 2121006:
            case 2141000:
            case 2141001:
            case 2141002: return 2120048;

            case 2221006:
            case 2241000:
            case 2241001: return 2220048;

            case 3121015: return 3120048;
            case 3121020: return 3120051;

            case 3201011:
            case 3211017:
            case 3221019:
            case 3221023:
            case 3221024:
            case 3221027: return 3220048;

            case 3221007:
            case 3241000:
            case 3241001:
            case 3241002:
            case 3241003:
            case 3241004: return 3220051;

            case 3241005:
            case 3241006:
            case 3241007:
            case 3241008:
            case 3241009:
            case 3241010:
            case 3241011: return 3220048;

            case 4141001: return 4120051;
            case 4221017:
            case 4241011: return 4220048;

            case 5321000: return 5320048;
            case 5141003: return 5120048;
            case 5121016: return 5120051;
            case 5141000:
            case 5141002:
            case 5121007: return 5120048;
            case 4341009:
            case 4361000: return 4340048;
            case 5141015: return 5120051;
            case 5221016:
            case 5241005:
            case 5241006: return 5220047;
            case 5320011:
            case 5321004:
            case 5340010:
            case 5341009: return 5320043;
            case 5341000: return 5320051;
            case 5341001: return 5320048;

            case 5721061: return 5720045;
            case 5721064: return 5720048;

            case 12000026:
            case 12100028:
            case 12110028:
            case 12110030:
            case 12120010:
            case 12120020:
            case 12120017:
            case 12120019:
            case 12121057:
            case 12121059:
            case 12141000:
            case 12141001:
            case 12141002:
            case 12141003:
            case 12141004:
            case 12141005:
            case 12141012:
            case 12141014: return 12120045;

            case 12120011:
            case 12121025:
            case 12141008:
            case 12141009: return 12120046;

            case 13121016:
            case 13141004: return 13120048;

            case 14121002: return 14120045;

            case 15111022:
            case 15120003: return 15120045;
            case 15121002: return 15120048;

            default:
                if (isCadenaArts(skillId)) {
                    return 154120039;
                }
                return isDelugeSkill(skillId)
                    || isBurstBuffSkill(skillId)
                    || isBurstAttackingSkill(skillId)
                    || isTorrentSkill(skillId)
                    || isBurstSkill(skillId) ? 3320030 : 0;
        }
    }

    public static boolean isKinesisPsychicLockSkill(int skillId) {
        switch (skillId) {
            case 142100010:
            case 142110003:
            case 142110015:
            case 142111002:
            case 142120000:
            case 142120001:
            case 142120002:
            case 142120014:
            case 142140001:
            case 142140002:
            case 142140003:
                return true;
            default:
                return false;
        }
    }

    public static int getActualSkillIDfromSkillID(int skillID) {
        switch (skillID) {
            case 101120206: //Zero - Severe Storm Break (Tile)
                return 101120204; //Zero - Adv Storm Break

            case 4221016: //Shadower - Assassinate 2
                return 4221014; //Shadower - Assassinate 1

            case 41121020: //Hayato - Tornado Blade-Battoujutsu Link
                return 41121017; //Tornado Blade

            case 41121021: //Hayato - Sudden Strike-Battoujutsu Link
                return 41121018; //Sudden Strike

            case 5121017: //Bucc - Double Blast
                return 5121016; //Bucc - Buccaneer Blast

            case 5101014: //Bucc - Energy Vortex
                return 5101012; //Bucc - Tornado Uppercut

            case 5121020: //Bucc - Octopunch (Max Charge)
                return 5121007; //Bucc - Octopunch

            case 5111013: //Bucc - Hedgehog Buster
                return 5111002; //Bucc - Energy Burst

            case 5111015: //Bucc - Static Thumper
                return 5111012; //Bucc - Static Thumper

            case 31011004: //DA - Exceed Double Slash 2
            case 31011005: //DA - Exceed Double Slash 3
            case 31011006: //DA - Exceed Double Slash 4
            case 31011007: //DA - Exceed Double Slash Purple
                return 31011000; //DA - Exceed Double Slash 1

            case 31201007: //DA - Exceed Demon Strike 2
            case 31201008: //DA - Exceed Demon Strike 3
            case 31201009: //DA - Exceed Demon Strike 4
            case 31201010: //DA - Exceed Demon Strike Purple
                return 31201000; //DA - Exceed Demon Strike 1

            case 31211007: //DA - Exceed Lunar Slash 2
            case 31211008: //DA - Exceed Lunar Slash 3
            case 31211009: //DA - Exceed Lunar Slash 4
            case 31211010: //DA - Exceed Lunar Slash Purple
                return 31211000; //DA - Exceed Lunar Slash 1

            case 31221009: //DA - Exceed Execution 2
            case 31221010: //DA - Exceed Execution 3
            case 31221011: //DA - Exceed Execution 4
            case 31221012: //DA - Exceed Execution Purple
                return 31221000; //DA - Exceed Execution 1

            case 31241003: //DA - HEXA Exceed Execution 2
            case 31241004: //DA - HEXA Exceed Execution 3
            case 31241005: //DA - HEXA Exceed Execution 4
            case 31241006: //DA - HEXA Exceed Execution Purple
                return 31241002; //DA - HEXA Exceed Execution 1

            case 31241008: //DA - HEXA Exceed Lunar Slash 2
            case 31241009: //DA - HEXA Exceed Lunar Slash 3
            case 31241010: //DA - HEXA Exceed Lunar Slash 4
            case 31241011: //DA - HEXA Exceed Lunar Slash Purple
                return 31241007; //DA - HEXA Exceed Lunar Slash 1

            case 31211002: //DA - Shield Charge (Spikes)
                return 31211011; //DA - Shield Charge (Rush)

            case 61001004: //Kaiser - Dragon Slash 2nd Hit
            case 61001005: //Kaiser - Dragon Slash 3rd Hit
            case 61110212: //Kaiser - Dragon Slash 1st Enhanced
            case 61120219: //Kaiser - Dragon Slash (Final Form)
                return 61001000; //Kaiser - Dragon Slash 1

            case 61001006: //Kaiser - Vertical Grapple
            case 61001207: //Kaiser - Vertical Grapple FF
                return 61001002; //Kaiser - Vertical Grapple

            case 61110211: //Kaiser - Tempest Blades (3) FF
                return 61101002; //Kaiser - Tempest Blades (3)

            case 61111215: //Kaiser - Flame Surge (Final Form)
                return 61001101; //Kaiser - Flame Surge

            case 61111216: //Kaiser - Impact Wave (Final Form)
                return 61101100; //Kaiser - Impact Wave

            case 61111217: //Kaiser - Piercing Blaze (Final Form)
                return 61101101; //Kaiser - Piercing Blaze

            case 61111111: //Kaiser - Wing Beat (Final Form)
            case 61111113: //Kaiser - Wing Beat Hit
            case 61111218: //Kaiser - Wing Beat FF Sub
                return 61111100; //Kaiser - Wing Beat

            case 61111219: //Kaiser - Pressure Chain (Final Form)
                return 61111101; //Kaiser - Pressure Chain

            case 61111220: //Kaiser - Stone Dragon (Final Form)
                return 61111002; //Kaiser - Stone Dragon

            case 61121201: //Kaiser - Gigas Wave (Final Form)
                return 61121100; //Kaiser - Gigas Wave

            case 61120018: //Kaiser - Inferno Breath Tile
            case 61121222: //Kaiser - Inferno Breath (Final Form)
                return 61121105; //Kaiser - Inferno Breath

            case 61121026: //Kaiser - Dragon Barrage Sub
            case 61121203: //Kaiser - Dragon Barrage (Final Form)
                return 61121102; //Kaiser - Dragon Barrage

            case 61121124: //Kaiser - Blade Burst Explosion
            case 61121221: //Kaiser - Blade Burst (Final Form)
            case 61121225: //Kaiser - Blade Burst Explosion (Final Form)
                return 61121104; //Kaiser - Blade Burst

            case 61121217: //Kaiser - Advanced Tempest Blades (5) FF
                return 61120007; //Kaiser - Advanced Tempest Blades (5)

            case 61121220: //Kaiser - Prominence (Final Form)
                return 61121015; //Kaiser - Prominence

            // Kaiser 6th Job HEXA Mappings
            case 61141001: // HEXA Gigas Wave (Final Form)
                return 61141000; // HEXA Gigas Wave

            case 61141003: // HEXA Blade Burst Explosion
            case 61141004: // HEXA Blade Burst (Final Form)
            case 61141005: // HEXA Blade Burst Explosion (Final Form)
                return 61141002; // HEXA Blade Burst

            case 61141007: // HEXA Tempest Blades (Final Form)
            case 61141008: // HEXA Tempest Blades Dragon Blow
                return 61141006; // HEXA Tempest Blades

            case 61141010: // HEXA Inferno Breath (Final Form)
            case 61141011: // HEXA Enhanced Inferno Breath
            case 61141012: // HEXA Enhanced Inferno Breath (Final Form)
                return 61141009; // HEXA Inferno Breath

            case 61141014: // HEXA Stone Dragon (Final Form)
                return 61141013; // HEXA Stone Dragon

            case 61141016: // HEXA Wing Beat (Final Form)
            case 61141017: // HEXA Wing Beat Hit
                return 61141015; // HEXA Wing Beat

            case 61141501: // Nova Triumphant Finisher
                return 61141500; // Nova Triumphant

            // Kaiser 5th Job V-Matrix Mappings
            case 400011013: // Nova Guardians 2
            case 400011014: // Nova Guardians 3
                return 400011012; // Nova Guardians

            case 400011059: // Bladefall FF
            case 400011060: // Bladefall Tile
            case 400011061: // Bladefall Tile FF
                return 400011058; // Bladefall

            case 400011080: // Draco Surge FF
            case 400011081: // Draco Surge ShootObj
            case 400011082: // Draco Surge ShootObj FF
                return 400011079; // Draco Surge

            case 400011119: // Dragon Blaze Fire Energy
            case 400011120: // Dragon Blaze Fire Orb
            case 400011130: // Dragon Blaze Fire Energy Explosion
                return 400011118; // Dragon Blaze

            // Hayato Sanrenzan Combo & HEXA / Origin Mappings
            case 41001004:
            case 41001005:
            case 41001007:
            case 41001008:
            case 41001009: // Sanrenzan Blade Flash
                return 41001000; // Sanrenzan 1st Job

            case 41001014: // Rising Slash Link
                return 41001002; // Rising Slash

            case 41001015: // Surging Blade Link
                return 41001013; // Surging Blade

            case 41101008:
            case 41101009:
            case 41101011: // Jin Blade Flash
                return 41101000; // Jin Sanrenzan 2nd Job

            case 41101014: // Falcon Dive Link
                return 41101012; // Falcon Dive

            case 41101015: // Shouryuusen Link
                return 41101013; // Shouryuusen

            case 41111011:
            case 41111012:
            case 41111014: // Fuu Blade Flash
                return 41111000; // Fuu Sanrenzan 3rd Job

            case 41111017: // Sweeping Sword Link
                return 41111001; // Sweeping Sword

            case 41111018: // Whirlwind Cut Link
                return 41111015; // Whirlwind Cut

            case 41121011:
            case 41121012:
            case 41121016: // Rai Blade Flash
                return 41121000; // Rai Sanrenzan 4th Job

            case 41141001: // HEXA Rai Sanrenzan 2nd Hit
            case 41141002: // HEXA Rai Sanrenzan 3rd Hit
            case 41141003: // HEXA Rai Blade Flash
                return 41141000; // HEXA Rai Sanrenzan

            case 41141501: // Jin Quick Draw Sub 1
            case 41141502: // Jin Quick Draw Sub 2
            case 41141503: // Jin Quick Draw Sub 3
            case 41141504: // Jin Quick Draw Sub 4
                return 41141500; // Jin Quick Draw Origin

            case 41141008: // HEXA Hitokiri Strike (Angle)
                return 41141007; // HEXA Hitokiri Strike

            // Kanna Shikigami Haunting Combo & HEXA / Origin Mappings
            case 42001005: // Shikigami Haunting 2nd Hit
            case 42001006: // Shikigami Haunting 3rd Hit
                return 42001000; // Shikigami Haunting 1st Job

            case 42101101: // Shikigami Haunting 2 - 2nd Hit
            case 42101102: // Shikigami Haunting 2 - 3rd Hit
                return 42101100; // Shikigami Haunting 2nd Job

            case 42111111: // Shikigami Haunting 3 - 2nd Hit
            case 42111112: // Shikigami Haunting 3 - 3rd Hit
                return 42111110; // Shikigami Haunting 3rd Job

            case 42120027: // Shikigami Haunting 4 - 2nd Hit
            case 42120028: // Shikigami Haunting 4 - 3rd Hit
                return 42120026; // Shikigami Haunting 4th Job

            case 42141001: // HEXA Shikigami Haunting 2nd Hit
            case 42141002: // HEXA Shikigami Haunting 3rd Hit
            case 42141003: // HEXA Shikigami Haunting Slow
                return 42141000; // HEXA Shikigami Haunting

            case 42141501: // Hakumenkonmou Juubi Sub 1
            case 42141502: // Hakumenkonmou Juubi Sub 2
                return 42141500; // Hakumenkonmou Juubi Origin

            case 42111101: // Tengu Strike Left
            case 42111102: // Tengu Strike Right
                return 42111100; // Tengu Strike

            case 42141013: // HEXA Tengu Strike Left
            case 42141014: // HEXA Tengu Strike Right
                return 42141012; // HEXA Tengu Strike

            case 42121105: // Shikigami Doppelganger Activated
                return 42121104; // Shikigami Doppelganger

            case 42141006: // HEXA Shikigami Doppelganger Activated
                return 42141005; // HEXA Shikigami Doppelganger

            case 42141010: // HEXA Nine-Tailed Fury Passive
                return 42141009; // HEXA Nine-Tailed Fury

            case 42121101: // Orochi Unbound Hit
                return 42121100; // Orochi Unbound

            case 400021115: // Great Oni Lord's Legion Sub
                return 400021114; // Great Oni Lord's Legion

            case 14101021: // NW - Triple Throw Finisher
                return 14101020; // NW - Triple Throw
            case 14101029: // NW - Shadow Spark Explosion
                return 14101028; // NW - Shadow Spark

            case 14111021: // NW - Quad Star Finisher
                return 14111020; // NW - Quad Star

            case 14121002: // NW - Quintuple Star Finisher
                return 14121001; // NW - Quintuple Star

            // 6th Job HEXA Quintuple Star
            case 14141001: // NW - HEXA Quintuple Star Finisher
            case 14141002: // NW - HEXA Quintuple Star Sub
            case 14141003: // NW - HEXA Quintuple Star Giant
                return 14141000; // NW - HEXA Quintuple Star

            // Shadow Bats Atoms / Sub-skills
            case 14000028: // Shadow Bat Atom
            case 14000029: // Shadow Bat From Mob Atom
                return 14001027; // Shadow Bat
            case 14110034: // Shadow Bat II Atom
            case 14110035: // Shadow Bat II From Mob Atom
            case 14111036: // Shadow Bat Extra Attack
                return 14001027; // Shadow Bat
            case 14120018: // Ravenous Bat Atom
            case 14120020: // Ravenous Bat From Mob Atom
                return 14121016; // Ravenous Bat
            case 14141006: // HEXA Shadow Bat Atom
            case 14141007: // HEXA Shadow Bat From Mob Atom
            case 14141009: // HEXA Shadow Bat Atom II
            case 14141010: // HEXA Shadow Bat From Mob Atom II
            case 14141011: // HEXA Shadow Bat Area Attack
                return 14141004; // HEXA Shadow Bat
            case 14141014: // HEXA Ravenous Bat Atom
            case 14141016: // HEXA Ravenous Bat From Mob Atom
                return 14141012; // HEXA Ravenous Bat

            // 5th Job V-Matrix Skills
            case 400040008: // Shadow Spear AA Small
            case 400041019: // Shadow Spear AA Large
                return 400041008; // Shadow Spear
            case 400041060: // Rapid Throw Finisher
                return 400041059; // Rapid Throw

            // 6th Job Origin Skill
            case 14141501: // Silence Sub Attack
                return 14141500; // Silence
            case 14141504: // Stygian Command Sub Attack
                return 14141503; // Stygian Command

            // Dark Omen (When Shadow Bat is Active)
            case 14121012: // NW - Dark Omen (Shadow Bat Active)
                return 14121003; // NW - Dark Omen
            case 14141020: // NW - HEXA Dark Omen (Shadow Bat Active)
                return 14141017; // NW - HEXA Dark Omen

            // Explorer Thief V-Matrix 5th Job & Origin Mappings
            // Night Lord
            case 400041016: // Spread Throw Sub 1
            case 400041017: // Spread Throw Sub 2
            case 400041018: // Spread Throw Sub 3
                return 400041001; // Spread Throw
            case 400041062: // Throw Blasting Attack
                return 400041061; // Throw Blasting
            case 4141501:   // Life and Death Attack
            case 4141502:   // Life and Death Finisher
                return 4141500;   // Life and Death

            // Shadower
            case 400041003: // Shadow Assault 2
            case 400041004: // Shadow Assault 3
            case 400041005: // Shadow Assault 4
                return 400041002; // Shadow Assault
            case 400041026: // Trickblade 1
            case 400041027: // Trickblade 2
                return 400041025; // Trickblade
            case 400041070: // Slash Shadow Formation 1
            case 400041071: // Slash Shadow Formation 2
            case 400041072: // Slash Shadow Formation 3
            case 400041073: // Slash Shadow Formation 4
                return 400041069; // Slash Shadow Formation
            case 4241501:   // Halve Slice Finisher
            case 4241502:   // Halve Slice After
                return 4241500;   // Halve Slice

            // Dual Blade
            case 400041043: // Blade Tornado Shoot Object
                return 400041042; // Blade Tornado
            case 400041076: // Haunted Edge Asura
            case 400041077: // Haunted Edge Asura Wind
            case 400041078: // Haunted Edge Yaksa
                return 400041075; // Haunted Edge
            case 4361501:   // Karma Blade Buff Attack
            case 4361502:   // Karma Blade Extra
            case 4361503:   // Karma Blade After Attack
                return 4361500;   // Karma Blade

            case Mercedes.STAGGERING_STRIKES:
                return Mercedes.STUNNING_STRIKES;

            case 23141001: // HEXA Ishtar's Ring Extra
                return 23141000; // HEXA Ishtar's Ring
            case 23141501: // Unfading Glory Sub 1
            case 23141502: // Unfading Glory Finisher
            case 23141503: // Unfading Glory Extra
                return 23141500; // Unfading Glory Origin
            case 400031008: // Spirit of Elluel 1
            case 400031009: // Spirit of Elluel 2
                return 400031007; // Spirit of Elluel
            case 400031045: // Royal Knights SA
                return 400031044; // Royal Knights

            case Aran.SMASH_WAVE_COMBO:
                return Aran.SMASH_WAVE;

            case Aran.FINAL_BLOW_COMBO:
            case Aran.FINAL_BLOW_SMASH_SWING_COMBO:
                return Aran.FINAL_BLOW;

            case 21121016: // Aran Beyond Blade 2
            case 21121017: // Aran Beyond Blade 3
                return 21120022; // Aran Beyond Blade 1

            case 21141001: // HEXA Beyond Blade 2
            case 21141002: // HEXA Beyond Blade 3
                return 21141000; // HEXA Beyond Blade

            case 21141501: // Adrenaline Surge Sub 1
            case 21141502: // Adrenaline Surge Finisher
            case 21141503: // Adrenaline Surge Extra
                return 21141500; // Adrenaline Surge Origin

            case 400010071: // Fenrir Crash Adrenaline
                return 400010070; // Fenrir Crash

            case 400011020: // Maha's Fury Attack
                return 400011016; // Maha's Fury Buff

            case 400010030: // Maha's Carnage Combo
                return 400011031; // Maha's Carnage

            case 400011122: // Blizzard Tempest Dire Wolf Attack
            case 400011123: // Blizzard Tempest Mob
                return 400011121; // Blizzard Tempest

            // Phantom V-Matrix & Origin Sub-Skills
            case 400041010: // Luck of the Draw Atom
            case 400041011:
            case 400041012:
            case 400041013:
            case 400041014:
            case 400041015:
                return 400041009; // Luck of the Draw
            case 400041023: // Ace in the Hole Atom
            case 400041024: // Ace in the Hole Finisher
                return 400041022; // Ace in the Hole
            case 400041045: // Phantom's Mark 2
            case 400041046: // Phantom's Mark 3
                return 400041040; // Phantom's Mark
            case 24141002: // HEXA Mille Aiguilles Fortune
                return 24141001; // HEXA Mille Aiguilles
            case 24141501: // Defying Fate Buff
            case 24141502: // Defying Fate Attack
                return 24141500; // Defying Fate Origin

            // Luminous 4th Job, 5th Job & 6th Job Sub-Skills
            case 27121114: // Twilight Nova (Dark)
            case 27121115: // Twilight Nova (Equilibrium)
                return 27121113; // Twilight Nova (Light / Root)
            case 27141008: // HEXA Twilight Nova (Dark)
            case 27141009: // HEXA Twilight Nova (Equilibrium)
                return 27141007; // HEXA Twilight Nova (Light / Root)
            case 27141501: // Harmonic Paradox Finisher
                return 27141500; // Harmonic Paradox Origin
            case 27141502: // Lustrous Orb (2nd 6th Job Ascent)
            case 27141503: // Lustrous Orb Sub-Attack
                return 27141502; // Lustrous Orb
            case 27141003: // HEXA Endless Darkness Attack
                return 27140002; // HEXA Endless Darkness
            case 27141006: // HEXA Eternal Light Attack
                return 27140005; // HEXA Eternal Light
            case 400021106: // Liberation Orb Imbalance ForceAtom
            case 400021107: // Liberation Orb Light Zone
            case 400021108: // Liberation Orb Dark Bullet
            case 400021109: // Liberation Orb Imbalance Attack
            case 400021110: // Liberation Orb Balance Attack
                return 400021105; // Liberation Orb

            // Khali 1st-4th Job, 5th Job & 6th Job Sub-Skills
            case 154001002:
                return 154001001; // Void Rush
            case 154101002:
                return 154101001; // Hex: Chakram Sweep
            case 154111003:
                return 154111002; // Hex: Chakram Split
            case 154110000:
                return 154110001; // Summon Chakri
            case 154120004:
                return 154120003; // Resonate
            case 154121007:
            case 154121008:
            case 154121010:
            case 154121011:
                return 154121003; // Hex: Chakram Fury
            case 154121012:
            case 154121013:
            case 154121014:
            case 154121015:
                return 154121009; // Death Blossom
            case 154141002:
                return 154141001; // HEXA Arts: Crescentum
            case 154141004:
            case 154141005:
            case 154141006:
                return 154141003; // HEXA Hex: Chakram Split
            case 154141008:
                return 154141007; // HEXA Hex: Chakram Sweep
            case 154141013:
            case 154141014:
            case 154141015:
            case 154141016:
                return 154141012; // HEXA Death Blossom
            case 154141501:
            case 154141502:
            case 154141503:
                return 154141500; // Hex: Sandstorm
            case 154141504:
            case 154141505:
                return 154141504; // Wake the Void (2nd 6th Job Ascent)
            case 400041083:
                return 400041082; // Hex: Pandemonium
            case 400041085:
            case 400041086:
                return 400041084; // Void Burst
            case 400041088:
                return 400041087; // Arts: Astra
            case 400041090:
                return 400041089; // Resonate: Ultimatum

            // Sia Astelle 6th Job Sub-Skills
            case 182141002:
                return 182141001; // HEXA Shine
            case 182141501:
                return 182141500; // Celestial Design

            // Shade 6th Job & V-Matrix Sub-Skills
            case 25141501: // Advent of the Fox God Sub 1
            case 25141502: // Advent of the Fox God Sub 2
                return 25141500; // Advent of the Fox God Origin
            case 25141000: // HEXA Spirit Claw
                return 25121005; // Spirit Claw
            case 400051023: // Spiritgate Atom
            case 400051028: // Spiritgate Summons 1
            case 400051029: // Spiritgate Summons 2
                return 400051022; // Spiritgate

            case AngelicBuster.SOUL_SEEKER_ATOM:
                return AngelicBuster.SOUL_SEEKER;

            case 65101006: //AB - Lovely Sting Explosion
                return AngelicBuster.LOVELY_STING;

            case 65121007:
            case 65121008:
                return AngelicBuster.TRINITY;

            // Angelic Buster 6th Job HEXA Mappings
            case 65141003: // HEXA Soul Seeker Atom
                return 65141001; // HEXA Soul Seeker
            case 65141004: // HEXA Soul Seeker Expert Atom
                return 65141002; // HEXA Soul Seeker Expert
            case 65140007: // Encore Ribbon
                return 65141006; // HEXA Celestial Roar
            case 65141501: // Grand Finale Cheer
            case 65141502: // Grand Finale Attack
            case 65141503: // Grand Finale Hit
                return 65141500; // Grand Finale
            case 65141505: // Surprise Encore Attack
                return 65141504; // Surprise Encore

            // Angelic Buster 5th Job V-Matrix Mappings
            case 400051027: // Super Star Spotlight 2
                return 400051018; // Super Star Spotlight
            case 400051047: // Mighty Mascot Breath
            case 400051048: // Mighty Mascot Attack
                return 400051046; // Mighty Mascot

            case Blaster.REVOLVING_CANNON_2:
            case Blaster.REVOLVING_CANNON_3:
                return Blaster.REVOLVING_CANNON;

            // Buccaneer 1st-4th & 6th Job Sub-Skills
            case Buccaneer.SEA_SERPENT_BURST:
            case 5100018:
                return Buccaneer.SEA_SERPENT; // 5101017
            case Buccaneer.GREATER_SEA_SERPENT_I_BURST:
                return 5110016;
            case 5110018:
                return Buccaneer.SERPENT_SCALE; // 5111017
            case Buccaneer.GREATER_SEA_SERPENT_II_BURST:
            case 5120029:
            case Buccaneer.SEA_SERPENT_RAGE:
            case 5120024:
                return Buccaneer.GREATER_SEA_SERPENT_II; // 5120022
            case 5121027:
                return 5120026;
            case 5120021:
                return 5121013; // Nautilus Strike FA
            case Buccaneer.HEXA_SEA_SERPENT_RAGE:
            case Buccaneer.HEXA_SEA_SERPENT_BURST:
                return Buccaneer.HEXA_SEA_SERPENT;

            // MoXuan (1st - 4th Job)
            case 175001002: // Xuanshan Strike [Tian] Action
                return 175000001;
            case 175101001: // Xuanshan Strike [Di] Action
                return 175100000;
            case 175111003: // Divine Art: Swirling Tide 2
                return 175111002;
            case 175111011: // Secret Art: Qi Projection Atom
                return 175111004;
            case 175121001: // Xuanshan Cross [Tian] Action 1
            case 175121006: // Xuanshan Cross [Tian] Action 2
                return 175120017;
            case 175121002: // Xuanshan Cross [Di] Action 1
            case 175121007: // Xuanshan Cross [Di] Action 2
                return 175120018;
            case 175121004: // Divine Art: Howling Storm Action
                return 175121003;

            // MoXuan HEXA (6th Job)
            case 175141001:
            case 175141002:
            case 175141008:
                return 175141000;
            case 175141004:
            case 175141005:
            case 175141009:
                return 175141003;
            case 175141007:
                return 175141006;
            case 175141013:
                return 175141012;
            case 175141017:
            case 175141018:
                return 175141016;
            case 175141501:
            case 175141502:
                return 175141500;
            // Hero Sub-Skills & 2nd 6th Job Ascent
            case 1120017:
                return 1121008; // Raging Blow Enrage
            case 1121055:
                return 1121054; // Cry Valhalla Attack
            case 1141001:
                return 1141000; // HEXA Raging Blow Enrage
            case 1141004:
                return 1141003; // HEXA Rending Edge
            case 1140010:
                return 1140005; // HEXA Rending Edge Passive
            case 1141007:
                return 1141006; // HEXA Cry Valhalla Attack
            case 1141502:
                return 1141502; // Ultrasonic Slash (Ascent Root)
            case 400011002:
                return 400011001; // Burning Soul Blade Stationary
            case 400011074:
            case 400011075:
            case 400011076:
            case 400011156:
                return 400011073; // Instinctual Combo Waves
            case 400011125:
            case 400011126:
            case 400011143:
                return 400011124; // Sword Illusion Subs
            // Paladin Sub-Skills & 2nd 6th Job Ascent
            case 1221020:
                return 1221019; // Heaven's Hammer Tile
            case 1221023:
                return 1220022; // Divine Judgment Attack
            case 1241002:
                return 1240001; // HEXA Divine Judgment Attack
            case 1241006:
                return 1241005; // HEXA Divine Mark Explosion
            case 1241010:
                return 1241007; // HEXA Heaven's Hammer Tile
            case 1241504:
            case 1241505:
                return 1241504; // Dominus Oblivion (Ascent Root)
            case 400011053:
                return 400011052; // Hammers of the Righteous Active
            case 400011132:
                return 400011131; // Mighty Mjolnir Explosion
            // Dark Knight Sub-Skills & 2nd 6th Job Ascent
            case 1321024:
            case 1321025:
            case 1321026:
                return 1320011; // Revenge of the Evil Eye
            case 1341002:
                return 1341001; // HEXA Dark Impale Sub
            case 1341005:
            case 1341006:
                return 1340004; // HEXA Revenge of the Evil Eye
            case 1341009:
                return 1341008; // HEXA Nightshade Explosion Sub
            case 1341502:
            case 1341503:
                return 1341502; // Dark Halidom (Ascent Root)
            case 400011069:
                return 400011068; // Radiant Evil Sub
            case 400011085:
                return 400011047; // Spear of Darkness Atom
            // Fire/Poison Sub-Skills & 2nd 6th Job Ascent
            case 2100010:
                return 2101010; // Ignite Tile
            case 2111014:
                return 2111013; // Teleport Mastery: Poison Mist
            case 2120013:
                return 2121007; // Meteor Shower FA
            case 2141001:
            case 2141002:
                return 2141000; // HEXA Flame Sweep Extra
            case 2141004:
                return 2141003; // HEXA Flame Haze Mist
            case 2140008:
                return 2141007; // HEXA Meteor Shower FA
            case 2141011:
            case 2141016:
                return 2141010; // HEXA Mist Eruption Subs
            case 2140013:
                return 2141012; // HEXA Ignite Tile
            case 2141015:
                return 2141014; // HEXA Ifrit Aura
            case 2141504:
            case 2141505:
                return 2141504; // Immortal Flame (Ascent Root)
            case 400021029:
                return 400021028; // Poison Nova Explosion
            case 400021102:
            case 400021103:
                return 400021101; // Poison Chain Subs
            // Ice/Lightning Sub-Skills & 2nd 6th Job Ascent
            case 2211015:
                return 2211011; // Glacial Wall Tile
            case 2220014:
                return 2221007; // Blizzard FA
            case 2221055:
            case 2221056:
                return 2221054; // Ice Aura Subs
            case 2241001:
            case 2240006:
                return 2241000; // HEXA Chain Lightning Tile & Cryo Shock
            case 2241004:
                return 2241003; // HEXA Blizzard FA
            case 2241008:
                return 2241007; // HEXA Thunder Sphere Stay
            case 2241010:
                return 2241005; // HEXA Lightning Orb 2
            case 2241505:
            case 2241506:
                return 2241505; // Parabolic Bolt (Ascent Root)
            case 400020002:
                return 400021002; // Ice Age Tile
            case 400021031:
            case 400021040:
                return 400021030; // Bolt Barrage Tiles
            case 400021112:
                return 400021094; // Jupiter Thunder Shock
            // Bishop Sub-Skills & 2nd 6th Job Ascent
            case 2301010:
                return 2301002; // Heal Debuff
            case 2311014:
                return 2311011; // Fountain of Vengeance
            case 2311015:
            case 2311017:
                return 2311001; // Dispel
            case 2321016:
                return 2321015; // Divine Protection
            case 2341001:
                return 2341000; // HEXA Angel Ray Bonus
            case 2341003:
                return 2341002; // HEXA Big Bang Extra
            case 2341005:
                return 2341004; // HEXA Triumph Feather Atom
            case 2341008:
                return 2341007; // HEXA Angelic Wrath Summon
            case 2341010:
                return 2341009; // HEXA Genesis FA
            case 2341012:
                return 2341011; // HEXA Heaven's Door Sub
            case 2341507:
            case 2341508:
                return 2341507; // Commandment of Heaven (Ascent Root)
            case 400021033:
            case 400021052:
                return 400021032; // Angel of Balance Subs
            case 400021077:
                return 400021070; // Peacemaker Explosion
            // Bowmaster 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 3141001:
                return 3141000; // HEXA Hurricane Sub
            case 3141003:
                return 3141002; // HEXA Arrow Stream Sub
            case 3140006:
            case 3140007:
            case 3140008:
                return 3141005; // HEXA Quiver Cartridge Atoms
            case 3140010:
            case 3140011:
                return 3141009; // Extra Quiver Cartridge Subs
            case 3141014:
                return 3141013; // HEXA Speed Mirage Sub
            case 3141503:
            case 3141504:
                return 3141503; // Flashpoint (Ascent Root)
            // Marksman 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 3241001:
            case 3241002:
            case 3241003:
            case 3241004:
                return 3241000; // HEXA Snipe Sub
            case 3241006:
            case 3241007:
            case 3241008:
            case 3241009:
            case 3241010:
            case 3241011:
                return 3241005; // HEXA Piercing Arrow Sub
            case 3241502:
            case 3241503:
                return 3241502; // Fatal Trigger (Ascent Root)
            // Pathfinder 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 3341001:
                return 3341000; // HEXA Cardinal Burst Attack
            case 3341003:
                return 3341002; // HEXA Bountiful Burst Sub
            case 3341007:
                return 3341006; // HEXA Glyph of Impalement Sub
            case 3341009:
                return 3341008; // HEXA Cardinal Torrent Sub
            case 3341011:
            case 3341012:
            case 3341013:
            case 3341014:
            case 3341015:
                return 3341010; // HEXA Ancient Astra Subs
            case 3341017:
            case 3341018:
            case 3341019:
            case 3341020:
            case 3341021:
            case 3341022:
            case 3341023:
                return 3341016; // HEXA Combo Assault Subs
            case 3341505:
                return 3341505; // Piercing Relic (Ascent Root)
            // Night Lord 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 4141001:
                return 4141000; // HEXA Enhanced Quad Star
            case 4141003:
            case 4141004:
                return 4141002; // HEXA Assassin's Mark Subs
            case 4141006:
                return 4141005; // HEXA Showdown Atom
            case 4141010:
            case 4141013:
                return 4141009; // HEXA Death Star Rampant / Annihilate
            case 4140012:
                return 4140011; // Darkness Shuriken Sub
            case 4141503:
            case 4141504:
                return 4141503; // Deep Strike (Ascent Root)
            // Shadower 5th & 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 4241001:
            case 4241002:
            case 4241003:
            case 4241004:
            case 4241005:
                return 4241000; // HEXA Cruel Stab / Assassinate / Pulverize (Core 20000010)
            case 4241007:
            case 4241008:
            case 4241009:
            case 4241010:
                return 4241006; // HEXA Meso Explosion Subs
            case 4240014:
                return 4241013; // HEXA Shadow Veil Attack
            case 4240017:
            case 4241018:
            case 4241019:
                return 4240016; // Covert Edge Subs
            case 4241503:
            case 4241504:
            case 4241505:
            case 4241506:
                return 4241503; // Covetous Darkness (Ascent Root)
            case 500061025:
            case 500061026:
            case 500061027:
            case 500061028:
                return 400041002; // HEXA Shadow Assault -> Shadow Assault
            // Dual Blade 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 400040006:
                return 400041006; // Blade Storm Keydown Loop -> Blade Storm
            case 4361004:
                return 4361003; // Fury Jet -> HEXA Blade Fury
            case 4361504:
            case 4361505:
            case 4361506:
                return 4361504; // Yama's Decree (Ascent Root)
            // Buccaneer 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 5141001:
            case 5141002:
            case 5141003:
                return 5141000; // HEXA Octopunch & Super Octopunch
            case 5140010:
                return 5141009; // HEXA Nautilus Strike Final Attack -> HEXA Nautilus Strike
            case 5141012:
            case 5141013:
            case 5141014:
                return 5141011; // HEXA Serpent Scale Subs
            case 5141501:
            case 5141502:
            case 5141503:
            case 5141504:
            case 5141505:
            case 5141506:
                return 5141500; // Unleash Neptunus Origin & Neptunus Enrage Waves
            case 5141507:
            case 5141508:
                return 5141507; // Haymaker (Ascent Root)
            // Corsair 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 5201017:
                return 5201012; // Scurvy Summons Atom -> Scurvy Summons
            case 5211019:
            case 5211020:
            case 5211021:
                return 5210015; // All Aboard Subs -> All Aboard
            case 5241001:
                return 5241000; // HEXA Rapid Fire Shootout Mode
            case 5241003:
            case 5241004:
                return 5241002; // HEXA Broadside Summon & Bomb
            case 5241006:
                return 5241005; // Condemnation -> HEXA Brain Scrambler
            case 5241008:
                return 5241007; // HEXA Eight-Legs Easton Sub
            case 5241011:
            case 5241012:
            case 5241013:
            case 5241014:
                return 5241010; // HEXA Scurvy Summons Subs
            case 5241016:
                return 5241015; // HEXA Siege Bomber Sub -> HEXA Siege Bomber
            case 5241501:
            case 5241502:
                return 5241500; // The Dreadnought Origin Subs
            case 5241503:
            case 5241504:
                return 5241503; // Quickdraw Dreadnought (Ascent Root)
            // Cannoneer 6th Job Sub-Skills & 2nd 6th Job Ascent
            case 5320011:
                return 5321004; // Monkey Militia Twin -> Monkey Militia
            case 5341003:
            case 5341004:
                return 5341002; // HEXA Monkey Mortar Attacks -> HEXA Monkey Mortar
            case 5341007:
            case 5341008:
                return 5341014; // HEXA Rolling Rainbow Summons -> HEXA Rolling Rainbow
            case 5340010:
            case 5340011:
                return 5341009; // HEXA Monkey Militia Twin & Splitter -> HEXA Monkey Militia
            case 5341013:
                return 5341012; // HEXA Monkey Fury Attack -> HEXA Monkey Fury
            case 5341501:
                return 5341500; // Super Cannon Explosion Sub -> Super Cannon Explosion Origin
            case 5341502:
            case 5341503:
                return 5341502; // Barrel of Monkeys (Ascent Root)
            case 500061029:
            case 500061030:
            case 500061031:
            case 500061032:
                return 400051074; // HEXA Poolmaker -> Poolmaker
            // Evan Dragon sub-skills to root skills
            case 22110022: // Dragon Flash (Mir Action)
            case 22110023: // Dragon Flash (Mir Action)
                return 22111012; // Dragon Flash
            case 22110024: // Wind Flash (Mir Action)
                return 22110014; // Wind Flash
            case 22140022: // Dragon Dive (Mir Action)
                return 22141012; // Dragon Dive
            // Evan 6th Job HEXA Sub-Skills
            case 22201001: // HEXA Mana Burst Sub
                return 22201000;
            case 22200004: // HEXA Thunder Flash
            case 22200005: // HEXA Wind Flash
            case 22201004: // HEXA Thunder Flash (alt)
            case 22201005: // HEXA Wind Flash (alt)
                return 22201003; // HEXA Dragon Flash
            case 22200008: // HEXA Earth Dive
            case 22200009: // HEXA Thunder Dive
            case 22201008: // HEXA Earth Dive (alt)
            case 22201009: // HEXA Thunder Dive (alt)
                return 22201007; // HEXA Dragon Dive
            case 22200012: // HEXA Earth Breath
            case 22200013: // HEXA Earth Breath
            case 22200014: // HEXA Wind Breath
            case 22201012: // HEXA Earth Breath (alt)
            case 22201013: // HEXA Earth Breath (alt)
            case 22201014: // HEXA Wind Breath (alt)
                return 22201011; // HEXA Dragon Breath
            case 22201501: // Zodiac Burst Attack
                return 22201500; // Zodiac Burst
            case 22201502: // United Horizons (Root Skill)
                return 22201502;
            case 22201503: // United Horizons Resonance Attack
                return 22201502; // United Horizons
            case 400020046: // Wyrmking's Breath
            case 400020051: // Ludicrous Speed
                return 400021046; // Dragon Slam
            case 400021013:
            case 400021014:
            case 400021015:
                return 400021012; // Elemental Barrage
            case 500061042:
            case 500061043:
            case 500061044:
            case 500061045:
                return 500061041; // HEXA Elemental Barrage
            // Illium Sub-Skills & 6th Job Mappings
            case 152001006:
                return 152001002; // Radiant Orb II -> Radiant Orb
            case 152101006:
                return 152101003; // Glory Wings: Mortal Wingbeat
            case 152110004:
            case 152120016:
            case 152120017:
                return 152110002; // Glory Wings: Javelin
            case 152120001:
            case 152120002:
            case 152120003:
                return 152001001; // Radiant Javelin II -> Radiant Javelin
            case 152141001:
            case 152141002:
                return 152141000; // HEXA Radiant Javelin
            case 152141004:
            case 152141005:
            case 152141006:
                return 152141003; // HEXA Glory Wings: Javelin
            case 152141011:
                return 152141010; // HEXA Machina
            case 152141013:
                return 152141012; // HEXA Crystal Skill: Deus
            case 152141501:
            case 152141502:
            case 152141503:
            case 152141504:
            case 152141505:
            case 152141506:
                return 152141500; // Mytocrystal Expanse
            case 152141508:
            case 152141509:
                return 152141508; // Excidium (2nd 6th Job Ascent)
            // Kain Sub-Skills & 6th Job Mappings
            case 63001001:
            case 63001100:
                return 63001000; // Strike Arrow
            case 63001003:
            case 63001005:
                return 63001002; // Shadow Swift
            case 63001009:
                return 63001006; // Grappling Wire
            case 63101003:
            case 63100100:
            case 63101100:
                return 63100002; // Strike Arrow II
            case 63100104:
            case 63101104:
                return 63101004; // Scattering Shot
            case 63101006:
                return 63101005; // Dragon Fang
            case 63111002:
                return 63110001; // Strike Arrow III
            case 63111012:
            case 63111013:
                return 63110011; // Death's Blessing
            case 63111004:
            case 63111005:
            case 63110103:
            case 63111103:
            case 63111104:
            case 63111105:
            case 63111106:
                return 63111003; // Shaft Break
            case 63111010:
                return 63111009; // Remain Incense
            case 63120102:
            case 63121102:
            case 63121103:
                return 63121002; // Falling Dust
            case 63121005:
                return 63121004; // Chain Sickle
            case 63121007:
                return 63121006; // Poison Needle
            case 63121041:
            case 63120140:
            case 63121140:
            case 63121141:
                return 63121040; // Sneak Attack / Unseen Sniper
            case 63140100:
            case 63141100:
            case 63141101:
                return 63141000; // HEXA Falling Dust
            case 63141005:
            case 63141006:
                return 63141004; // HEXA Poison Needle
            case 63141008:
            case 63140107:
            case 63141107:
                return 63141007; // HEXA Strike Arrow
            case 63140109:
            case 63141109:
                return 63141009; // HEXA Scattering Shot
            case 63141012:
                return 63141011; // HEXA Chain Sickle
            case 63141014:
                return 63141013; // HEXA Dragon Fang
            case 63141016:
            case 63141017:
                return 63141015; // HEXA Death's Blessing
            case 63141019:
            case 63141020:
            case 63140118:
            case 63141118:
            case 63141119:
            case 63141120:
            case 63141121:
                return 63141018; // HEXA Shaft Break
            case 63141023:
                return 63141022; // HEXA Lasting Grudge
            case 63141027:
            case 63140126:
            case 63141126:
            case 63141127:
                return 63141026; // HEXA Unseen Sniper
            case 63141501:
            case 63141502:
            case 63141503:
            case 63141504:
            case 63141505:
                return 63141500; // Total Annihilation
            case 63141506:
            case 63141507:
            case 63141508:
                return 63141506; // Churning Malice (2nd 6th Job Ascent)
            // Cadena Sub-Skills & 5th/6th Job Mappings
            case 64001006:
                return 64001001; // Chain Arts: Pursuit
            case 64001007:
            case 64001008:
            case 64001009:
            case 64001010:
            case 64001011:
            case 64001012:
                return 64001000; // Chain Arts: Thrash
            case 64001013:
                return 64001002; // Summon Scimitar
            case 64001014:
                return 64001003; // Shadowstep
            case 64101008:
                return 64101002; // Summon Claw
            case 64101009:
                return 64100004; // Muscle Memory I
            case 64111012:
                return 64111004; // Summon Brick
            case 64111013:
                return 64110005; // Muscle Memory II
            case 64121011:
            case 64121016:
                return 64121003; // Summon Spiked Bat
            case 64120010:
                return 64121002; // Chain Arts: Tough Hustle
            case 64121012:
            case 64121013:
            case 64121014:
            case 64121015:
            case 64121017:
            case 64121018:
            case 64121019:
                return 64121001; // Chain Arts: Beatdown
            case 64121020:
            case 64121025:
            case 64121026:
                return 64120006; // Muscle Memory III
            case 64121022:
            case 64121023:
            case 64121024:
                return 64121021; // Chain Arts: Thrash II
            case 64121055:
                return 64121053; // Veteran Shadowdealer
            case 400041033:
            case 400041034:
                return 400041035; // Chain Arts: Void Strike
            case 400041075:
                return 400041074; // Muscle Memory Finale
            case 64141001:
            case 64141002:
            case 64141003:
                return 64141000; // HEXA Chain Arts: Thrash
            case 64141005:
            case 64141006:
            case 64141007:
                return 64141004; // HEXA Muscle Memory
            case 64141009:
            case 64141010:
                return 64141008; // HEXA Summon Spiked Bat
            case 64141012:
                return 64141011; // HEXA Veteran Shadowdealer
            case 64141014:
            case 64141015:
            case 64141016:
            case 64141017:
            case 64141018:
            case 64141019:
            case 64141020:
                return 64141013; // HEXA Chain Arts: Beatdown
            case 64141024:
            case 64141025:
            case 64141026:
                return 64141023; // HEXA Summon Brick
            case 64141029:
                return 64141028; // HEXA Summon Decoy Bomb
            case 64141031:
                return 64141030; // HEXA Summon Scimitar
            case 64141033:
                return 64141032; // HEXA Summon Shuriken
            case 64141501:
            case 64141502:
                return 64141500; // Chain Arts: Grand Arsenal
            case 64141504:
                return 64141503; // Brutal Rampage
            // Resistance 6th Job & Ascent Mappings
            case 37141002:
            case 37141003:
            case 37141004:
            case 37141005:
            case 37141006:
            case 37141007:
                return 37141000; // Blaster HEXA Bunker Buster Explosion -> HEXA Magnum Punch
            case 37141010:
                return 37141009; // Blaster HEXA Hammer Smash
            case 37141013:
            case 37141014:
                return 37141012; // Blaster HEXA Revolving Cannon
            case 37141502:
            case 37141503:
                return 37141502; // Blaster 2nd 6th Job Ascent
            case 32141003:
                return 32141002; // Battle Mage HEXA Sweeping Staff
            case 32141006:
            case 32141007:
                return 32141005; // Battle Mage HEXA Dark Shock
            case 32141009:
            case 32141010:
                return 32141008; // Battle Mage HEXA Dark Genesis
            case 32141502:
            case 32141503:
                return 32141502; // Battle Mage 2nd 6th Job Ascent
            case 33141001:
            case 33141002:
            case 33141003:
            case 33141004:
            case 33141005:
                return 33141000; // Wild Hunter HEXA Wild Arrow Blast
            case 33141007:
                return 33141006; // Wild Hunter HEXA Swipe
            case 33141009:
                return 33141008; // Wild Hunter HEXA Dash 'n Slash
            case 33141011:
                return 33141010; // Wild Hunter HEXA Sonic Roar
            case 33141013:
                return 33141012; // Wild Hunter HEXA Jaguar Rampage
            case 33141504:
            case 33141505:
                return 33141504; // Wild Hunter 2nd 6th Job Ascent
            case 35141001:
            case 35141002:
                return 35141000; // Mechanic HEXA AP Salvo Plus
            case 35141005:
            case 35141010:
                return 35141004; // Mechanic HEXA Distortion Bomb
            case 35141504:
                return 35141504; // Mechanic 2nd 6th Job Ascent
            case 36141001:
            case 36141002:
            case 36141003:
                return 36141000; // Xenon HEXA Mecha Purge
            case 36141008:
                return 36141007; // Xenon HEXA Beam Dance
            case 36141010:
            case 36141011:
                return 36141009; // Xenon HEXA Pinpoint Salvo
            case 36141015:
                return 36141014; // Xenon HEXA Aegis System
            case 36141504:
            case 36141505:
            case 36141506:
                return 36141504; // Xenon 2nd 6th Job Ascent
            case 31001006:
            case 31001007:
            case 31001008:
                return 31000004; // Demon Slayer Demon Lash
            case 31121057:
            case 31121058:
            case 31121059:
            case 31121060:
                return 31120057; // Demon Slayer Enhanced Demon Lash
            case 31141001:
                return 31141000; // Demon Slayer HEXA Demon Impact
            case 31141002:
                return 31141002; // Demon Slayer HEXA Demon Impact: Demon Chain
            case 31141004:
            case 31141005:
            case 31141006:
            case 31141007:
                return 31141003; // Demon Slayer HEXA Demon Lash
            case 31141011:
                return 31141010; // Demon Slayer HEXA Infernal Concussion
            case 31141015:
                return 31141014; // Demon Slayer HEXA Cerberus Chomp
            case 31141504:
            case 31141505:
            case 31141506:
                return 31141504; // Demon Slayer Amethystine Incursion (2nd 6th Job Ascent)
            case 31241503:
            case 31241504:
            case 31241505:
                return 31241503; // Demon Avenger 2nd 6th Job Ascent
            // Anima - Ren (16100-16114) Sub-Skills & 5th/6th Job Mappings
            case 161001002:
                return 161001001; // Serene Breeze
            case 161101009:
            case 161101002:
                return 161101001; // First Plum Blossom Sword: Petal Flash
            case 161101004:
                return 161100003; // Imugi Spirit Sword: Spirit Strike
            case 161111002:
                return 161110001; // Second Plum Blossom Sword: Raining Blossoms
            case 161111004:
                return 161110003; // Imugi Spirit Sword: Spirit Strike II
            case 161111008:
            case 161111011:
                return 161110007; // Final Imugi Spirit Sword: Burrowing Earth
            case 161121014:
                return 161121005; // Third Plum Blossom Sword: Riotous Heart / Hearts United
            case 161121008:
                return 161121007; // Fourth Plum Blossom Sword: Unbowed Blade
            case 161121002:
                return 161120001; // Imugi Spirit Sword: Spirit Strike III
            case 161121004:
                return 161120003; // Final Imugi Spirit Sword: Ravenous Spirit
            case 161121044:
                return 161121043; // Final Imugi Spirit Sword: Years Uncounted
            case 161141006:
                return 161140005; // HEXA Wish Unending
            case 161141011:
                return 161141002; // HEXA Final Imugi Spirit Sword: Burrowing Earth
            case 161141012:
                return 161141004; // HEXA Final Imugi Spirit Sword: Years Uncounted
            case 161141008:
                return 161140007; // HEXA Second Plum Blossom Sword: Raining Blossoms
            case 161141013:
                return 161141009; // HEXA Third Plum Blossom Sword: Riotous Heart / Hearts United
            case 161141501:
                return 161141500; // Rising Azure Dragon: Divided Heavens (Origin 1)
            case 161141502:
            case 161141503:
            case 161141504:
            case 161141505:
                return 161141506; // Rising Azure Dragon: Heartbound Verse (Origin 2 / Ascent)
            case 400011148:
            case 400011149:
                return 400011147; // Thousand Blossom Flurry
            case 400011151:
            case 400011152:
                return 400011150; // Soul Immeasurable
            case 400011154:
            case 400011155:
                return 400011157; // Final Imugi Spirit Sword: Blade of the Unbound Heart
            default:
                // Universal 6th Job Origin Sub-Skill Redirection (xxx41501-xxx41599 -> xxx41500)
                int subOrigin = skillID % 100000;
                if ((subOrigin > 41500 && subOrigin <= 41599)
                        || (skillID > 4361500 && skillID <= 4361599) // Dual Blade Origin Sub
                        || (skillID > 22201500 && skillID <= 22201599)) { // Evan Origin Sub
                    int baseSkill = (skillID / 100) * 100;
                    if (SkillData.getSkillInfoById(baseSkill) != null) {
                        return baseSkill;
                    }
                }
                return skillID;
        }
    }

    public static int getKaiserGaugeIncrementBySkill(int skillID) {
        switch (skillID) {
            case Kaiser.DRAGON_SLASH_1:
            case Kaiser.DRAGON_SLASH_1_FINAL_FORM:
            case Kaiser.WING_BEAT_FINAL_FORM:
                return 1;
            case Kaiser.FLAME_SURGE:
            case Kaiser.FLAME_SURGE_FINAL_FORM:
            case Kaiser.WING_BEAT:
            case Kaiser.HEXA_WING_BEAT:
            case Kaiser.HEXA_WING_BEAT_FINAL_FORM:
                return 2;
            case Kaiser.DRAGON_SLASH_2:
                return 3;
            case Kaiser.DRAGON_SLASH_3:
                return 4;
            case Kaiser.IMPACT_WAVE:
            case Kaiser.PIERCING_BLAZE:
                return 5;
            case Kaiser.DRAGON_BARRAGE:
            case Kaiser.BLADE_BURST:
            case Kaiser.HEXA_BLADE_BURST:
            case Kaiser.HEXA_BLADE_BURST_FINAL_FORM:
            case Kaiser.HEXA_BLADE_BURST_EXPLOSION:
            case Kaiser.HEXA_BLADE_BURST_EXPLOSION_FINAL_FORM:
                return 6;
            case Kaiser.PRESSURE_CHAIN:
            case Kaiser.GIGA_WAVE:
            case Kaiser.HEXA_GIGA_WAVE:
            case Kaiser.HEXA_GIGA_WAVE_FINAL_FORM:
            case Kaiser.DRACO_SURGE_ATTACK:
            case Kaiser.DRACO_SURGE_ATTACK_FF:
                return 8;
            case Kaiser.BLADEFALL_ATTACK:
            case Kaiser.BLADEFALL_ATTACK_FF:
                return 10;
            case Kaiser.INFERNO_BREATH:
            case Kaiser.HEXA_INFERNO_BREATH:
            case Kaiser.HEXA_INFERNO_BREATH_FINAL_FORM:
            case Kaiser.HEXA_ENHANCED_INFERNO_BREATH:
            case Kaiser.HEXA_ENHANCED_INFERNO_BREATH_FINAL_FORM:
                return 14;
            case Kaiser.TEMPEST_BLADES_FIVE:
            case Kaiser.TEMPEST_BLADES_THREE:
            case Kaiser.HEXA_TEMPEST_BLADES:
            case Kaiser.HEXA_TEMPEST_BLADES_FINAL_FORM:
                return 15;
            case Kaiser.NOVA_TRIUMPHANT:
            case Kaiser.NOVA_TRIUMPHANT_FINISHER:
            case Kaiser.PYROCLASTIC_INSTINCT:
                return 20;
            default:
                return 0;
        }
    }

    public static boolean isEvanFusionSkill(int skillID) {
        switch (skillID) {
            case 22110014:
            case 22110024: // Wind Flash (Mir Action)
            case 22110025:
            case 22140014:
            case 22140015:
            case 22140024:
            case 22140023:
            case 22170065:
            case 22170066:
            case 22170067:
            case 22170094:
            // Evan 5th Job V-Matrix Fusion Skills
            case 400021012: // Elemental Barrage
            case 400021013:
            case 400021014:
            case 400021015:
            case 500061041: // HEXA Elemental Barrage
            case 500061042:
            case 500061043:
            case 500061044:
            case 500061045:
            case 400020046: // Wyrmking's Breath
            case 400020051: // Ludicrous Speed
            // Evan 6th Job (HEXA) Fusion Skills
            case 22200004: // HEXA Thunder Flash
            case 22200005: // HEXA Wind Flash
            case 22201004: // HEXA Thunder Flash (alt)
            case 22201005: // HEXA Wind Flash (alt)
            case 22200008: // HEXA Earth Dive
            case 22200009: // HEXA Thunder Dive
            case 22201008: // HEXA Earth Dive (alt)
            case 22201009: // HEXA Thunder Dive (alt)
            case 22200012: // HEXA Earth Breath
            case 22200013: // HEXA Earth Breath
            case 22200014: // HEXA Wind Breath
            case 22201012: // HEXA Earth Breath (alt)
            case 22201013: // HEXA Earth Breath (alt)
            case 22201014: // HEXA Wind Breath (alt)
                return true;
            default:
                return false;
        }
    }

    public static boolean isStealableSkill(int skillID) {
        // TODO
        return false;
    }

    public static int getStealSkillManagerTabFromSkill(int skillID) {
        int smJobID;

        //Hyper Skills
        if (skillID % 100 == 54) {
            return 5;
        }
        switch (skillID / 10000) {

            // 1st Job Tab
            case 100:
            case 200:
            case 300:
            case 400:
            case 430:
            case 500:
            case 501:
                return 1;

            // 2nd Job Tab
            case 110:
            case 120:
            case 130:

            case 210:
            case 220:
            case 230:


            case 310:
            case 320:

            case 410:
            case 420:
            case 431:
            case 432:

            case 510:
            case 520:
            case 530:
                return 2;

            // 3rd Job Tab
            case 111:
            case 121:
            case 131:

            case 211:
            case 221:
            case 231:

            case 311:
            case 321:

            case 411:
            case 421:
            case 433:

            case 511:
            case 521:
            case 531:
                return 3;

            // 4th job Tab
            case 112:
            case 122:
            case 132:

            case 212:
            case 222:
            case 232:

            case 312:
            case 322:

            case 412:
            case 422:
            case 434:

            case 512:
            case 522:
            case 532:
                return 4;
        }
        return -1;
    }

    public static int getMaxPosBysmJobID(int smJobID) {
        int maxPos = 0;
        switch (smJobID) {
            case 1:
            case 2:
                maxPos = 3;
                break;
            case 3:
                maxPos = 2;
                break;
            case 4:
            case 5:
                maxPos = 1;
                break;
        }
        return maxPos;
    }

    public static int getStartPosBysmJobID(int smJobID) {
        int startPos = 0;
        switch (smJobID) {
            case 1:
                startPos = 0;
                break;
            case 2:
                startPos = 4;
                break;
            case 3:
                startPos = 8;
                break;
            case 4:
                startPos = 11;
                break;
            case 5:
                startPos = 13;
                break;
        }
        return startPos;
    }

    public static int getImpecSkillIDBysmJobID(int smJobID) {
        int impecSkillID = 0;
        switch (smJobID) {
            case 1:
                impecSkillID = 24001001;
                break;
            case 2:
                impecSkillID = 24101001;
                break;
            case 3:
                impecSkillID = 24111001;
                break;
            case 4:
                impecSkillID = 24121001;
                break;
            case 5:
                impecSkillID = 24121054;
                break;
        }
        return impecSkillID;
    }

    public static int getSMJobIdByImpecSkillId(int impecSkillId) {
        switch (impecSkillId) {
            case 24001001:  // 1st Job
                return 1;
            case 24101001:  // 2nd Job
                return 2;
            case 24111001:  // 3rd job
                return 3;
            case 24121001:  // 4th Job
                return 4;
            case 24121054:  // Hyper Skill
                return 5;
        }
        return -1;
    }

    public static int getLinkSkillByJob(short job) {
        if (JobConstants.isMercedes(job)) { // Elven Blessing
            return 80001040;
        } else if (JobConstants.isDemonSlayer(job)) { // Fury Unleashed
            return 80000001;
        } else if (JobConstants.isDemonAvenger(job)) { // Wild Rage
            return 80000050;
        } else if (JobConstants.isJett(job)) { // Core Aura
            return 80001151;
        } else if (JobConstants.isPhantom(job)) { // Phantom Instinct
            return 80000002;
        } else if (JobConstants.isMihile(job)) { // Knight's Watch
            return 80001140;
        } else if (JobConstants.isLuminous(job)) { // Light Wash
            return 80000005;
        } else if (JobConstants.isAngelicBuster(job)) { // Terms and Conditions
            return 80001155;
        } else if (JobConstants.isHayato(job)) { // Keen Edge
            return 80000003;
        } else if (JobConstants.isKanna(job)) { // Elementalism
            return 80000004;
        } else if (JobConstants.isKaiser(job)) { // Iron Will
            return 80000006;
        } else if (JobConstants.isXenon(job)) { // Hybrid Logic
            return 80000047;
        } else if (JobConstants.isShade(job)) { // Close Call
            return 80000169;
        } else if (JobConstants.isAran(job)) { // Combo Kill Blessing
            return 80000370;
        } else if (JobConstants.isEvan(job)) { // Rune Persistence
            return 80000369;
        } else if (JobConstants.isKinesis(job)) { // Judgment
            return 80000188;
        } else if (JobConstants.isZero(job)) { // Rhinne's Blessing
            return 80000110;
        } else if (JobConstants.isAdele(job)) { // Noble Fire
            return 80002857;
        } else if (JobConstants.isHoYoung(job)) { // Bravado
            return 80000609;
        } else if (JobConstants.isIllium(job)) { // Tide of Battle
            return 80000268;
        } else if (JobConstants.isArk(job)) { // Solus
            return 80000514;
        } else if (JobConstants.isCadena(job)) { // Unfair Advantage
            return 80000261;
        } else if (JobConstants.isDawnWarrior(job)) { // Cygnus Blessing (Warrior)
            return 80000066;
        } else if (JobConstants.isBlazeWizard(job)) { // Cygnus Blessing (Magician)
            return 80000067;
        } else if (JobConstants.isWindArcher(job)) { // Cygnus Blessing (Bowman)
            return 80000068;
        } else if (JobConstants.isNightWalker(job)) { // Cygnus Blessing (Thief)
            return 80000069;
        } else if (JobConstants.isThunderBreaker(job)) { // Cygnus Blessing (Pirate)
            return 80000070;
        } else if (JobConstants.isBattleMage(job)) { // Spirit of Freedom (Magician)
            return 80000333;
        } else if (JobConstants.isWildHunter(job)) { // Spirit of Freedom (Bowman)
            return 80000334;
        } else if (JobConstants.isMechanic(job)) { // Spirit of Freedom (Pirate)
            return 80000335;
        } else if (JobConstants.isBlaster(job)) { // Spirit of Freedom (Warrior)
            return 80000378;
        } else if (JobConstants.isBuccaneer(job)) { // Pirate Blessing
            return 80002775;
        } else if (JobConstants.isCorsair(job)) { // Pirate Blessing
            return 80002776;
        } else if (JobConstants.isCannoneer(job)) { // Pirate Blessing
            return 80000000;
        } else if (JobConstants.isNightLord(job)) { // Thief's Cunning
            return 80002771;
        } else if (JobConstants.isShadower(job)) { // Thief's Cunning
            return 80002772;
        } else if (JobConstants.isDualBlade(job)) { // Thief's Cunning
            return 80002773;
        } else if (JobConstants.isFirePoison(job)) { // Empirical Knowledge
            return 80002763;
        } else if (JobConstants.isIceLightning(job)) { // Empirical Knowledge
            return 80002764;
        } else if (JobConstants.isBishop(job)) { // Empirical Knowledge
            return 80002765;
        } else if (JobConstants.isHero(job)) { // Invincible Belief
            return 80002759;
        } else if (JobConstants.isPaladin(job)) { // Invincible Belief
            return 80002760;
        } else if (JobConstants.isDarkKnight(job)) { // Invincible Belief
            return 80002761;
        } else if (JobConstants.isBowMaster(job)) { // Adventurer's Curiosity
            return 80002767;
        } else if (JobConstants.isMarksman(job)) { // Adventurer's Curiosity
            return 80002768;
        } else if (JobConstants.isPathFinder(job)) { // Adventurer's Curiosity
            return 80002769;
        } else if (JobConstants.isKain(job)) { // Time to Prepare
            return 80003018;
        } else if (JobConstants.isLara(job)) { // Nature's Friend
            return 80003070;
        } else if (JobConstants.isKhali(job)) { // Innate Gift
            return 80003224;
        } else if (JobConstants.isMoXuan(job)) { // Qi Cultivation
            return 80011964;
        } else if (JobConstants.isLynn(job)) { // Focus Spirit
            return 80010006;
        } else if (JobConstants.isSiaAstelle(job)) { // Tree of Stars
            return 80010343;
        } else if (JobConstants.isRen(job)) { // Grounded Body
            return 80003877;
        }
        return 0;
    }

    public static int getOriginalOfLinkedSkill(int skillID) {
        int result = 0;
        switch (skillID) {
            case 80003877:
                result = 160020001; // Grounded Body
                break;
            case 80003018:
                result = 60030241; // Time to Prepare
                break;
            case 80003070:
                result = 160010001; // Nature's Friend
                break;
            case 80003224:
                result = 150030241; // Innate Gift
                break;
            case 80011964:
                result = 170000241; // Qi Cultivation
                break;
            case 80010006:
                result = 170010241; // Focus Spirit
                break;
            case 80010343:
                result = 180000001; // Tree of Stars
                break;
            case 80001040:
                result = 20021110; // Elven Blessing
                break;
            case 80001140:
                result = 50001214; // Knight's Watch
                break;
            case 80001155:
                result = 60011219; // Terms and Conditions
                break;
            case 80000369:
                result = 20010294; // Rune Persistence
                break;
            case 80000370:
                result = 20000297; // Combo Kill Blessing
                break;
            case 80000001:
                result = 30010112; // Fury Unleashed
                break;
            case 80000002:
                result = 20030204; // Phantom Instinct
                break;
            case 80000003:
                result = 40010001; // Keen Edge
                break;
            case 80000005:
                result = 20040218; // Light Wash
                break;
            case 80000006:
                result = 60000222; // Iron Will
                break;
            case 80000047:
                result = 30020233; // Hybrid Logic
                break;
            case 80000050:
                result = 30010241; // Wild Rage
                break;
            case 80000333:
                result = 30000074; // Spirit of Freedom (Magician)
                break;
            case 80000334:
                result = 30000075; // Spirit of Freedom (Bowman)
                break;
            case 80000335:
                result = 30000076; // Spirit of Freedom (Pirate)
                break;
            case 80000378:
                result = 30000077; // Spirit of Freedom (Warrior)
                break;
            case 80000066:
                result = 10000255; // Cygnus Blessing (Warrior)
                break;
            case 80000067:
                result = 10000256; // Cygnus Blessing (Magician)
                break;
            case 80000068:
                result = 10000257; // Cygnus Blessing (Bowman)
                break;
            case 80000069:
                result = 10000258; // Cygnus Blessing (Thief)
                break;
            case 80000070:
                result = 10000259; // Cygnus Blessing (Pirate)
                break;
            case 80000110:
                result = 100000271; // Rhinne's Blessing
                break;
            case 80000169:
                result = 20050286; // Close Call
                break;
            case 80000188:
                result = 140000292; // Judgment
                break;
            case 80000004:
                result = 40020002; // Elementalism (Link Skill)
                break;
            case 80001151:
                result = 1214; // Core Aura
                break;
            case 80002857:
                result = 150020241; // Noble Fire
                break;
            case 80000609:
                result = 160000001; // Bravado
                break;
            case 80000268:
                result = 150000017; // Tide of Battle
                break;
            case 80000514:
                result = 150010241; // Solus
                break;
            case 80000261:
                result = 60020218; // Unfair Advantage
                break;
            case 80002775:
                result = 264; // Pirate Blessing (Buccaneer)
                break;
            case 80002776:
                result = 265; // Pirate Blessing (Corsair)
                break;
            case 80000000:
                result = 110; // Pirate Blessing (Cannoneer)
                break;
            case 80002759:
                result = 252; // Invincible Belief (Hero)
                break;
            case 80002760:
                result = 253; // Invincible Belief (Paladin)
                break;
            case 80002761:
                result = 254; // Invincible Belief (Dark Knight)
                break;
            case 80002763:
                result = 255; // Empirical Knowledge (Arch Mage - Fire/Poison)
                break;
            case 80002764:
                result = 256; // Empirical Knowledge (Arch Mage - Ice/Lightning)
                break;
            case 80002765:
                result = 257; // Empirical Knowledge (Bishop)
                break;
            case 80002767:
                result = 258; // Adventurer's Curiosity (Bow Master)
                break;
            case 80002768:
                result = 259; // Adventurer's Curiosity (Marksman)
                break;
            case 80002769:
                result = 260; // Adventurer's Curiosity (Pathfinder)
                break;
            case 80002771:
                result = 261; // Thief's Cunning (Night Lord)
                break;
            case 80002772:
                result = 262; // Thief's Cunning (Shadower)
                break;
            case 80002773:
                result = 263; // Thief's Cunning (Dual Blade)
                break;
            default:
                //System.out.println("Unknown corresponding link skill for link skill id " + skillID);
        }
        return result;
    }

    public static int getStackingLinkSkill(int skillID) {
        int ordinarySkill = 0;
        if (skillID >= 80000066 && skillID <= 80000070) {
            ordinarySkill = 80000055;
        } else if ((skillID >= 80000333 && skillID <= 80000335) || skillID == 80000378) {
            ordinarySkill = 80000329;
        } else if (skillID >= 80002759 && skillID <= 80002761) {
            ordinarySkill = 80002758;
        } else if (skillID >= 80002763 && skillID <= 80002765) {
            ordinarySkill = 80002762;
        } else if (skillID >= 80002767 && skillID <= 80002769) {
            ordinarySkill = 80002766;
        } else if (skillID >= 80002771 && skillID <= 80002773) {
            ordinarySkill = 80002770;
        } else if ((skillID >= 80002775 && skillID <= 80002776) || skillID == 80000000) {
            ordinarySkill = 80002774;
        } else {
            ordinarySkill = skillID;
        }
        return ordinarySkill;
    }

    public static int getLinkSkillLevelByCharLevel(short level, short job) {
        int res = 0;
        if (level >= LINK_SKILL_3_LEVEL) {
            res = 3;
        } else if (level >= LINK_SKILL_2_LEVEL) {
            res = 2;
        } else if (level >= LINK_SKILL_1_LEVEL) {
            res = 1;
        }
        return res;
    }

    public static boolean isSpecialLinkSkill(int skillID) {
        switch (skillID) {
            case 80000066:
            case 80000067:
            case 80000068:
            case 80000069:
            case 80000070:
            case 80000333:
            case 80000334:
            case 80000335:
            case 80000378:
                return true;
        }
        return false;
    }

    public static int getLinkedSkill(int skillID) {
        switch (skillID) {
            case Zero.STORM_BREAK_INIT:
                return Zero.STORM_BREAK;
            case Zero.ADV_STORM_BREAK_SHOCK_INIT:
                return Zero.ADV_STORM_BREAK;
        }
        return skillID;
    }

    public static boolean isPassiveSkill_NoPsdSkillsCheck(int skillId) {
        SkillInfo si = SkillData.getSkillInfoById(skillId);
        return si != null && si.isPsd();
    }

    private static boolean isPsd(int skillId) {
        // for (mostly old) skills that aren't specified as passives in wz
        return skillId == 3000001 || skillId == 31200006 || skillId == BeastTamer.GROWTH_SPURT || skillId == BeastTamer.BEAST_SCEPTER_MASTERY;
    }

    public static boolean isPassiveSkill(int skillId) {
        SkillInfo si = SkillData.getSkillInfoById(skillId);
        return SkillConstants.isPsd(skillId) || (si != null && si.isPsd() && si.getPsdSkills().size() == 0);
    }

    public static boolean isHyperStat(int skillID) {
        return skillID >= 80000400 && skillID <= 80000422
                && skillID != 80000407 && skillID != 80000408
                && skillID != 80000411 && skillID != 80000415
                && skillID != 80000417 && skillID != 80000418;
    }

    public static boolean isHyperSkill(int jobId, int skill) {
        for (int i : getHyperSkill(jobId)) {
            if (i == skill) {
                return true;
            }
        }
        return false;
    }

    public static List<Integer> getHyperSkill(int jobId) {
        List<Integer> skillsID = new ArrayList<>();
        if (jobId == 122) {
            for (int skillId = 1220043; skillId <= 1220051; skillId++) {
                skillsID.add(skillId);
            }
            skillsID.add(1220056);
            skillsID.add(1220057);
            skillsID.add(1220058);
            skillsID.add(1221052);
            skillsID.add(1221053);
            skillsID.add(1221054);
            skillsID.add(1221055);
        } else if (jobId == 2112) {
            skillsID.add(21121053);
            skillsID.add(21121057);
            skillsID.add(21121058);
            for (int skillId = 21120059; skillId <= 21120067; skillId++) {
                skillsID.add(skillId);
            }
        } else if (jobId == 2512) {
            skillsID.add(25121030);
            skillsID.add(25121131);
            skillsID.add(25121132);
            for (int skillId = 25120146; skillId <= 25120154; skillId++) {
                skillsID.add(skillId);
            }
        } else if (jobId == 3212) {
            skillsID.add(32121052);
            skillsID.add(32121053);
            skillsID.add(32121056);
            for (int skillId = 32120057; skillId <= 32120065; skillId++) {
                skillsID.add(skillId);
            }
        } else if (jobId == 3312) {
            skillsID.add(33121053);
            skillsID.add(33121054);
            skillsID.add(33121155);
            for (int skillId = 33120043; skillId <= 33120051; skillId++) {
                skillsID.add(skillId);
            }
        } else if (jobId == 3512) {
            skillsID.add(35121052);
            skillsID.add(35121055);
            skillsID.add(35121053);
            for (int skillId = 35120044; skillId <= 35120051; skillId++) {
                skillsID.add(skillId);
            }
        } else {
            int min, max, specialMin;
            boolean special = false;
            if (jobId == 14212) {
                min = 30;
                max = 41;
                specialMin = 33;
                special = true;
            } else if (jobId == 2217) {
                min = 80;
                max = 92;
                specialMin = 83;
                special = true;
            } else if (jobId == 11212) {
                min = 43;
                max = 56;
                specialMin = 54;
            } else {
                min = 43;
                max = 54;
                specialMin = 51;
            }
            for (int i = min; i <= max; i++) {
                int skillId = (special ? i < specialMin : i > specialMin)
                        ? (jobId * 10000 + 1000 + i) : (jobId * 10000 + i);
                skillsID.add(skillId);
            }
        }
        return skillsID;
    }

    public static int getTotalHyperStatSpByLevel(short currentlevel) {
        int sp = 0;
        for (short level = 140; level <= currentlevel; level++) {
            sp += getHyperStatSpByLv(level);
        }
        return sp;
    }

    public static int getHyperStatSpByLv(short level) {
        return 3 + ((level - 140) / 10);
    }

    public static int getNeededSpForHyperStatSkill(int lv) {
        switch (lv) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 4;
            case 4:
                return 8;
            case 5:
                return 10;
            case 6:
                return 15;
            case 7:
                return 20;
            case 8:
                return 25;
            case 9:
                return 30;
            case 10:
                return 35;
            default:
                return 0;
        }
    }

    public static int getTotalNeededSpForHyperStatSkill(int lv) {
        switch (lv) {
            case 1:
                return 1;
            case 2:
                return 3;
            case 3:
                return 7;
            case 4:
                return 15;
            case 5:
                return 25;
            case 6:
                return 40;
            case 7:
                return 60;
            case 8:
                return 85;
            case 9:
                return 115;
            case 10:
                return 150;
            default:
                return 0;
        }
    }

    public static boolean isUnregisteredSkill(int skillID) {
        int prefix = skillID / 10000;
        if (prefix == 8000) {
            prefix = skillID / 100;
        }
        return prefix != 9500 && skillID / 10000000 == 9;
    }

    public static boolean isHomeTeleportSkill(int skillId) {
        switch (skillId) {
            case Warrior.MAPLE_RETURN: // All Adventurers
            case Kinesis.RETURN_KINESIS:
            case Noblesse.IMPERIAL_RECALL: // All KoC
            case Aran.RETURN_TO_RIEN:
            case Evan.BACK_TO_NATURE:
                // Mercedes
                // Luminous
            case Phantom.TO_THE_SKIES:
                // Shade
            case AngelicBuster.DAY_DREAMER:
                // Kaiser
            case Demon.SECRET_ASSEMBLY: // All Resistance
            case 40011227: // Hayato - Return of the Five Planets
            case 40021227: // Kanna - Return of the Five Planets
            case Zero.TEMPLE_RECALL:

                return true;
            default:
                return false;
        }
    }

    public static boolean isArmorPiercingSkill(int skillId) {
        switch (skillId) {
            case 3120017:
            case 95001000:
            case 3120008:
            case 3100001:
            case 3100010:
                return false;

            default:
                return true;
        }
    }

    public static int getBaseSpByLevel(short level) {
        return level > 140 ? 0
                : level > 130 ? 6
                : level > 120 ? 5
                : level > 110 ? 4
                : 3;
    }

    public static int getTotalPassiveHyperSpByLevel(short level) {
        return level < 140 ? 0 : (level - 130) / 10;
    }

    public static int getTotalActiveHyperSpByLevel(short level) {
        return level < 140 ? 0 : level < 170 ? 1 : level < 200 ? 2 : 3;
    }

    public static boolean isMatching(int rootId, int job) {
        if (rootId == 2200) {
            return JobConstants.isEvan((short) job);
        }
        if (JobConstants.isBeastTamer((short) job)) {
            return true;
        }
        boolean matchingStart = job / 100 == rootId / 100;
        boolean matching = matchingStart;
        if (matchingStart && rootId % 100 != 0) {
            // job path must match
            if (rootId == 301) {
                matching = JobConstants.isPathFinder((short) job);
            } else {
                if (rootId == 508 && job >= 570 && job <= 572) {
                    rootId = rootId + (job - 508);
                } else if (rootId == 501 && job >= 530 && job <= 532) {
                    rootId = rootId + (job - 501);
                } else if (rootId == 3101 && job >= 3120 && job <= 3122) {
                    rootId = rootId + (job - 3101);
                }
                matching = (rootId % 100) / 10 == (job % 100) / 10;
            }
        }
        return matching;
    }

    // is_skill_from_item(signed int nSkillID)
    public static boolean isSkillFromItem(int skillID) {
        switch (skillID) {
            case 80011123: // New Destiny
            case 80011247: // Dawn Shield
            case 80011248: // Dawn Shield
            case 80011249: // Divine Guardian
            case 80011250: // Divine Shield
            case 80011251: // Divine Brilliance
            case 80011261: // Monolith
            case 80011295: // Scouter
            case 80011346: // Ribbit Ring
            case 80011347: // Krrr Ring
            case 80011348: // Rawr Ring
            case 80011349: // Pew Pew Ring
            case 80011475: // Elunarium Power (ATT & M. ATT)
            case 80011476: // Elunarium Power (Skill EXP)
            case 80011477: // Elunarium Power (Boss Damage)
            case 80011478: // Elunarium Power (Ignore Enemy DEF)
            case 80011479: // Elunarium Power (Crit Rate)
            case 80011480: // Elunarium Power (Crit Damage)
            case 80011481: // Elunarium Power (Status Resistance)
            case 80011482: // Elunarium Power (All Stats)
            case 80011492: // Firestarter Ring
            case 80001768: // Rope Lift
            case 80001705: // Rope Lift
            case 80001941: // Scouter
            case 80010040: // Altered Fate
                return true;
        }
        // Tower of Oz skill rings
        return (skillID >= 80001455 && skillID <= 80001479);
    }

    public static int getHyperPassiveSkillSpByLv(int level) {
        // 1 sp per 10 levels, starting at 140, ending at 220
        return level >= 140 && level <= 220 && level % 10 == 0 ? 1 : 0;
    }

    public static int getHyperActiveSkillSpByLv(int level) {
        return level == 150 || level == 170 || level == 200 ? 1 : 0;
    }

    public static int getNoviceSkillRoot(short job) {
        if (job / 100 == 22 || job == 2001) {
            return JobConstants.JobEnum.EVAN_NOOB.getJobId();
        }
        if (job / 100 == 23 || job == 2002) {
            return JobConstants.JobEnum.MERCEDES.getJobId();
        }
        if (job / 100 == 24 || job == 2003) {
            return JobConstants.JobEnum.PHANTOM.getJobId();
        }
        if (JobConstants.isDemon(job)) {
            return JobConstants.JobEnum.DEMON.getJobId();
        }
        if (JobConstants.isMihile(job)) {
            return JobConstants.JobEnum.NAMELESS_WARDEN.getJobId();
        }
        if (JobConstants.isLuminous(job)) {
            return JobConstants.JobEnum.LUMINOUS.getJobId();
        }
        if (JobConstants.isAngelicBuster(job)) {
            return JobConstants.JobEnum.ANGELIC_BUSTER.getJobId();
        }
        if (JobConstants.isXenon(job)) {
            return JobConstants.JobEnum.XENON.getJobId();
        }
        if (JobConstants.isShade(job)) {
            return JobConstants.JobEnum.SHADE.getJobId();
        }
        if (JobConstants.isKinesis(job)) {
            return JobConstants.JobEnum.KINESIS_0.getJobId();
        }
        if (JobConstants.isBlaster(job)) {
            return JobConstants.JobEnum.CITIZEN.getJobId();
        }
        if (JobConstants.isHayato(job)) {
            return JobConstants.JobEnum.HAYATO.getJobId();
        }
        if (JobConstants.isKanna(job)) {
            return JobConstants.JobEnum.KANNA.getJobId();
        }
        return 1000 * (job / 1000);
    }

    public static int getNoviceSkillFromRace(int skillID) {
        if (skillID == 50001215 || skillID == 10001215) {
            return 1005;
        }
        if (isCommonSkill(skillID) || (skillID >= 110001500 && skillID <= 110001504)) {
            return skillID;
        }
        if (isNoviceSkill(skillID)) {
            return skillID % 10000;
        }
        return 0;
    }

    public static int getBuffSkillItem(int buffSkillID) {
        int novice = getNoviceSkillFromRace(buffSkillID);
        switch (novice) {
            // Angelic Blessing
            case 86:
                return 2022746;
            // Dark Angelic Blessing
            case 88:
                return 2022747;
            // Angelic Blessing
            case 91:
                return 2022764;
            // White Angelic Blessing
            case 180:
                return 2022823;
            // Lightning God's Blessing
            case 80000086:
                return 2023189;
            // White Angelic Blessing
            case 80000155:
                return 2022823;
            // Lightning God's Blessing
            case 80010065:
                return 2023189;
            // Goddess' Guard
            case 80011150:
                return 1112932;
        }
        return 0;
    }

    public static String getMakingSkillName(int skillID) {
        switch (skillID) {
            case 92000000:
                return "Herbalism";
            case 92010000:
                return "Mining";
            case 92020000:
                return "Smithing";
            case 92030000:
                return "Accessory Crafting";
            case 92040000:
                return "Alchemy";
        }
        return null;
    }

    public static int recipeCodeToMakingSkillCode(int skillID) {
        return 10000 * (skillID / 10000);
    }

    public static int getNeededProficiency(int level) {
        if (level <= 0 || level >= MAKING_SKILL_EXPERT_LEVEL) {
            return 0;
        }
        return ((100 * level * level) + (level * 400)) / 2;
    }

    public static boolean isSynthesizeRecipe(int recipeID) {
        return isMakingSkill(recipeID) && recipeID % 10000 == 9001;
    }

    public static boolean isDecompositionRecipeScroll(int recipeID) {
        return isMakingSkill(recipeID)
                && recipeCodeToMakingSkillCode(recipeID) == 92040000
                && recipeID - 92040000 >= 9003
                && recipeID - 92040000 <= 9006;
    }

    public static boolean isDecompositionRecipeCube(int recipeID) {
        return isMakingSkill(recipeID) && recipeCodeToMakingSkillCode(recipeID) == 92040000 && recipeID == 92049002;
    }

    public static boolean isDecompositionRecipe(int recipeID) {
        return isMakingSkill(recipeID) && recipeCodeToMakingSkillCode(recipeID) == 92040000 && recipeID == 92049000
                || isDecompositionRecipeScroll(recipeID)
                || isDecompositionRecipeCube(recipeID);
    }

    public static int getCallOfCygnusByJob(int job) {
        switch (job) {
            case 1112:
                return 11121000;
            case 1212:
                return 12121000;
            case 1312:
                return 13121000;
            case 1412:
                return 14121000;
            case 1512:
                return 15121000;
        }
        return 0;
    }

    public static int getFairyBlessingByJob(short job) {
        short beginJob = JobConstants.JobEnum.getJobById(job).getBeginnerJobId();
        // xxxx0012, where xxxx is the "0th" job
        return beginJob * 10000 + 12;
    }

    public static int getEmpressBlessingByJob(short job) {
        short beginJob = JobConstants.JobEnum.getJobById(job).getBeginnerJobId();
        // xxxx0073, where xxxx is the "0th" job
        return beginJob * 10000 + 73;
    }

    public static int getSoaringByJob(short job) {
        short beginJob = JobConstants.JobEnum.getJobById(job).getBeginnerJobId();
        // xxxx1026, where xxxx is the "0th" job
        return beginJob * 10000 + 1026;
    }

    public static boolean isBeginnerSpAddableSkill(int skillID) {
        return skillID == 1000 || skillID == 1001 || skillID == 1002 || skillID == 140000291 || skillID == 30001000
                || skillID == 30001001 || skillID == 30001002;
    }

    public static boolean isKinesisPsychicAreaSkill(int skillId) {
        switch (skillId) {
            case Kinesis.ULTIMATE_METAL_PRESS:
            case Kinesis.MIND_QUAKE:
            case Kinesis.PSYCHIC_DRAIN:
            case Kinesis.MIND_TREMOR:
            case Kinesis.ULTIMATE_TRAINWRECK:
            case Kinesis.ULTIMATE_BPM_ATTACK:
            case Kinesis.MENTAL_TEMPEST:
            case Kinesis.PSYCHIC_TORNADO:
            case Kinesis.PSYCHIC_TORNADO_1:
            case Kinesis.PSYCHIC_TORNADO_2:
                return true;
        }
        return false;
    }

    public static boolean isNoConsumeBullet(int skillID) {
        switch (skillID) {
            case NightWalker.SHADOW_SPARK:
            case 14111022: // NightWalker.SHADOW_SPARK
            case NightWalker.DOMINION:
            case NightWalker.SHADOW_STITCH:
                return true;
        }
        return (skillID >= 80001455 && skillID <= 80001479); // Tower of Oz skill rings
    }

    public static BeastTamerBeasts getBeastFromSkill(int skillId) {
        switch (skillId / 10000) {
            case 11200:
                return BeastTamerBeasts.Bear;
            case 11210:
                return BeastTamerBeasts.Leopard;
            case 11211:
                return BeastTamerBeasts.Bird;
            case 11212:
                return BeastTamerBeasts.Cat;
            default:
                return BeastTamerBeasts.None;
        }
    }

    public static boolean isKeydownCDSkill(int skillId) {
        return skillId == Shade.SPIRIT_INCARNATION ||
                skillId == Shade.SPIRIT_FRENZY ||
                skillId == PinkBean.LETS_ROLL ||
                skillId == DemonAvenger.VITALITY_VEIL ||
                skillId == AngelicBuster.SOUL_RESONANCE ||
                skillId == BlazeWizard.PHOENIX_DRIVE ||
                skillId == Phantom.TEMPEST ||
                skillId == Phantom.HEXA_TEMPEST ||
                skillId == IceLightning.LIGHTNING_ORB ||
                skillId == IceLightning.HEXA_LIGHTNING_ORB ||
                skillId == IceLightning.HEXA_LIGHTNING_ORB_2 ||
                skillId == Blaster.BALLISTIC_HURRICANE ||
                skillId == Ren.DANCING_ANNIHILATION;
    }

    public static boolean isSoulSummonSkill(int skillID) {
        switch (skillID) {
            case 80001266:
            case 80001269:
            case 80001270:
            case 80001322:
            case 80001323:
            case 80001341:
            case 80001395:
            case 80001396:
            case 80001493:
            case 80001494:
            case 80001495:
            case 80001496:
            case 80001497:
            case 80001498:
            case 80001499:
            case 80001500:
            case 80001501:
            case 80001502:
            case 80001685:
            case 80001690:
            case 80001691:
            case 80001692:
            case 80001693:
            case 80001695:
            case 80001696:
            case 80001697:
            case 80001804:
            case 80001806:
            case 80001807:
            case 80001808:
            case 80001984:
            case 80001985:
            case 80002230:
            case 80002231:
                return true;
            default:
                return false;
        }
    }

    public static int getJettLinkSkillInc(int level) {
        if (level < 70) {
            return 0;
        }
        if (level >= 70) {
            if (level < 140) {
                return Math.min(Math.round((level - 70) / 5) + 1, 35);
            } else {
                return Math.min(Math.round((level - 70) / 5) + 5, 35);
            }
        }
        return 0;
    }

    public static int getFallingTime(int skillid) {
        switch (skillid) {
            case 21120025:
                return 300;
            case 21110026:
                return 360;
            case 21110028:
                return 648;
        }
        return -1;
    }

    public static boolean isReviveSkill(int skillID) {
        return switch (skillID) {
            case Shade.CLOSE_CALLS, Shade.CLOSE_CALLS_LINK, DarkKnight.FINAL_PACT_INFO,
                 NightWalker.DARKNESS_ASCENDING, BlazeWizard.PHOENIX_RUN, Shade.SUMMON_OTHER_SPIRIT,
                 Zero.REWIND, Phantom.FINAL_FEINT -> true;
            default -> false;
        };
    }

    public static boolean isVSkill(int skillID) {
        SkillInfo skillInfo = SkillData.getSkillInfoById(skillID);
        if (skillInfo == null) {
            return false;
        }
        return skillInfo.getVSkill() != 0;
    }

    public static boolean isAppliedSkipCooldown(int jobID, int skillID) {
        return !isHyperSkill(jobID, skillID) && !isVSkill(skillID) && !isReviveSkill(skillID);
    }

    public static boolean isCygnusBlessing(int skillID) {
        return skillID >= 80000066 && skillID <= 80000070;
    }

    public static boolean isSpiritOfFreedom(int skillID) {
        return (skillID >= 80000333 && skillID <= 80000335) || skillID == 80000378;
    }

    public static boolean isEncode4Reason(int rOption) {
        // NewFlying + NotDamaged are normally ints, but are encoded as ints in this skill
        return rOption == Evan.DRAGON_MASTER;
    }

    public static boolean isSpecialEffectSkill(int skillID) {
        return isExplosionSkill(skillID) || skillID == BattleMage.DARK_SHOCK || skillID == 80002206 ||
                skillID == 80000257 || skillID == 80000260 || skillID == 80002599;
    }

    public static boolean isExplosionSkill(int skillID) {
        return skillID == Xenon.TRIANGULATION
                || skillID == Xenon.HEXA_TRIANGULATION_ATT
                || skillID == AngelicBuster.LOVELY_STING_EXPLOSION
                || skillID == WindArcher.SPIRALING_VORTEX_EXPLOSION
                || skillID == DawnWarrior.IMPALING_RAYS_EXPLOSION;
    }

    public static boolean isDivineEchoMimicSkills(int skillId) {
        switch (skillId) {
            case Paladin.DIVINE_CHARGE:
            case 1221021: // Divine Charge IV
            case Paladin.BLAST:
            case Paladin.HEAVENS_HAMMER:
            case 1221019: // Heaven's Hammer 2
            case 1221020: // Heaven's Hammer Tile
            case Paladin.SMITE_SHIELD:
            case 1241000: // HEXA Blast
            case 1241003: // HEXA Divine Charge
            case 1241004: // HEXA Divine Charge 2
            case 1241007: // HEXA Heaven's Hammer
            case 1241010: // HEXA Heaven's Hammer Tile

            case Paladin.NOBLE_DEMAND:
            case Paladin.MAGIC_CRASH:

            case Paladin.WEAPON_BOOSTER:
            case Paladin.DIVINE_BLESSING:
            case Paladin.SACROSANCTITY:
            case Paladin.HP_RECOVERY:
                return true;

            default:
                return false;
        }
    }

    public static boolean isStateUsingSummon(int skillId) {
        switch (skillId) {
            case Illium.DEPLOY_CRYSTAL: // 152101000
            case NightWalker.GREATER_DARK_SERVANT:
            case NightWalker.HEXA_GREATER_DARK_SERVANT:
            case AngelicBuster.MIGHTY_MASCOT:
            case 164121008: // Scroll: Star Vortex
            case 164141059: // HEXA Scroll: Star Vortex
                return true;
            default:
                return false;
        }
    }

    public static boolean isCardinalForceSkill(int skillID) {
        return isDelugeSkill(skillID) || isBurstBuffSkill(skillID) || isBurstAttackingSkill(skillID) || isTorrentSkill(skillID);
    }

    public static boolean isAncientForceSkill(int skillID) {
        switch (skillID) {
            case Pathfinder.SWARM_SHOT:
            case Pathfinder.TRIPLE_IMPACT:
            case Pathfinder.GLYPH_OF_IMPALEMENT:
            case Pathfinder.HEXA_GLYPH_OF_IMPALEMENT:
            case 3341007:
            case Pathfinder.NOVA_BLAST:
            case Pathfinder.RAVEN_TEMPEST:
                return true;
            default:
                return false;
        }
    }

    public static boolean isEnchantForceSkill(int skillID) {
        switch (skillID) {
            case Pathfinder.COMBO_ASSAULT_NONE:
            case Pathfinder.COMBO_ASSAULT_DELUGE:
            case Pathfinder.COMBO_ASSAULT_BURST:
            case Pathfinder.COMBO_ASSAULT_TORRENT:
            case Pathfinder.HEXA_COMBO_ASSAULT:
            case 3341018:
            case 3341020:
            case 3341022:

            case Pathfinder.ANCIENT_ASTRA_NONE:
            case Pathfinder.ANCIENT_ASTRA_DELUGE:
            case Pathfinder.ANCIENT_ASTRA_BURST_HOLD:
            case Pathfinder.ANCIENT_ASTRA_BURST:
            case Pathfinder.ANCIENT_ASTRA_TORRENT:
            case Pathfinder.HEXA_ANCIENT_ASTRA:
            case 3341011:
            case 3341013:
            case 3341014:
            case 3341015:

            case Pathfinder.OBSIDIAN_BARRIER_NONE:
            case Pathfinder.OBSIDIAN_BARRIER_TORRENT:
            case Pathfinder.OBSIDIAN_BARRIER_BURST:
            case Pathfinder.OBSIDIAN_BARRIER_DELUGE:
                return true;
            default:
                return false;
        }
    }

    public static boolean isCadenaArts(int skillID) {
        switch (skillID) {
            case 154121000:
            case 154001000:
            case 154101000:
            case 154101001:
            case 154101002:
            case 154111002:
                return true;
            case 154141000:
            case 154141001:
            case 154141002:
            case 400041087:
            case 400041088:
                return true;
            default:
                return false;
        }
    }

    public static boolean isDelugeSkill(int skillID) {
        return skillID == 3011004 || skillID == 3300002 || skillID == 3321003 || skillID == 3341004;
    }

    public static boolean isBurstBuffSkill(int skillID) {
        return skillID == 3301003 || skillID == 3310001 || skillID == 3321004 || skillID == 3341000;
    }

    public static boolean isBurstAttackingSkill(int skillID) {
        return skillID == 3301004 || skillID == 3311013 || skillID == 3321005 || skillID == 3341001;
    }

    public static boolean isTorrentSkill(int skillID) {
        return skillID == 3311002 || skillID == 3311003 || skillID == 3321006 || skillID == 3321007 || skillID == 3341008 || skillID == 3341009;
    }

    public static boolean isBurstSkill(int skillID) {
        return skillID == 3301004 || skillID == 3311013 || skillID == 3321005 || skillID == 3341001;
    }

    public static boolean isShootObjectSkill(int skillID) {
        return skillID == 5241014 ||
                skillID == 3321005 ||
                skillID == 3321039 ||
                skillID == 3341001 ||
                skillID == 3341014 ||
                skillID == 4101014 ||
                skillID == 5211021 ||

                skillID == 3301004 ||
                skillID == 3221024 ||
                skillID == 3241008 ||
                skillID == 3241009 ||

                skillID == 3311011 ||
                skillID == 3311013 ||

                skillID == 400020009 ||
                skillID == 400020010 ||
                skillID == 400020011 ||
                skillID == 400021029 ||
                skillID == 400021053 ||

                skillID == 400031035 ||

                skillID == 33141005 ||
                skillID == 64111012 ||
                skillID == 64141029 ||
                skillID == 80003387 ||

                skillID == 112111018 ||

                findProcessType(skillID, 39);
    }

    public static boolean isSomePathfinderSkill(int skillID) {
        return skillID == 3341014 ||
                skillID == 3321039 ||
                skillID == 3341001 ||
                skillID == 3321005 ||
                skillID == 3301004 ||
                skillID == 3311011 ||
                skillID == 3311013 ||
                skillID == 112111018 ||
                skillID == 4101014 ||
                skillID == 5211021 ||
                skillID == 5241014 ||
                skillID == 400031035 ||
                skillID == 400031050;
    }

    public static int getCorrectCooltimeSkillID(int skillID) {
        switch (skillID) {
            case 33121214:
                return 33121114;
            case Pathfinder.ANCIENT_ASTRA_DELUGE:
            case Pathfinder.ANCIENT_ASTRA_BURST_HOLD:
            case Pathfinder.ANCIENT_ASTRA_BURST:
            case Pathfinder.ANCIENT_ASTRA_TORRENT:
            case Pathfinder.HEXA_ANCIENT_ASTRA:
            case 3341011:
            case 3341013:
            case 3341014:
            case 3341015:
                return Pathfinder.ANCIENT_ASTRA_NONE;
            case Luminous.AETHER_CONDUIT_EQ:
            case Luminous.AETHER_CONDUIT_D:
                return Luminous.AETHER_CONDUIT_L;
            default:
                return skillID;
        }
    }

    public static boolean isNoMPConsumeSkill(int skillId) {
        SkillInfo si = SkillData.getSkillInfoById(skillId);
        if (si == null) {
            return false;
        }
        return isNoCoolDownAttack(skillId) ||
                isForceAtomSkill(skillId) ||
                isKeyDownSkill(skillId) ||
                isKeydownSkillRectMoveXY(skillId);
    }

    public static boolean isNoCoolDownAttack(int skillID) {
        switch (skillID) {
            case DarkKnight.GUNGNIR_DESCENT:
            case DarkKnight.HEXA_GUNGNIR_DESCENT:
            case Bishop.HEAL:
            case Bishop.TRIUMPH_FEATHER_ATOM:
            case Bishop.HEXA_TRIUMPH_FEATHER_ATOM:
            case IceLightning.FROZEN_ORB:
            case IceLightning.HEXA_FROZEN_ORB:
            case IceLightning.THUNDER_SPHERE:
            case IceLightning.JUPITER_THUNDER:
            case Noblesse.PHALANX_CHARGE:
            case DualBlade.CHAINS_OF_HELL:
            case DualBlade.ASURAS_ANGER:
            case DualBlade.HEXA_ASURAS_ANGER:
            case DualBlade.BLADES_OF_DESTINY:
                //case BlazeWizard.CATACLYSM:
            case ThunderBreaker.GALE:
            case ThunderBreaker.TYPHOON:
            case DemonSlayer.DEMON_CRY:
            case Mechanic.DISTORTION_BOMB:
            case Kinesis.ULTIMATE_BPM_ATTACK:
            case Blaster.BALLISTIC_HURRICANE:
            case Blaster.BALLISTIC_HURRICANE_1:
            case AngelicBuster.SUPREME_SUPERNOVA:
            case AngelicBuster.HEXA_SUPREME_SUPERNOVA:
            case Phantom.CARTE_ROSE_FINALE:
            case Phantom.HEXA_ROSE_CARTE_FINALE:
            case DawnWarrior.EQUINOX_SLASH:
            case Luminous.MORNING_STAR:
            case WildHunter.HUNTING_ASSISTANT_UNIT:
            case WildHunter.DRILL_SALVO:
            case Kaiser.DRAGON_BLAZE:
            case Shade.SPIRIT_TRAP:
            case Shade.SPIRIT_BOND_MAX_2:
            case Aran.MAHAS_DOMAIN_SKILL_USE:
            case Kaiser.WING_BEAT:
            case Kaiser.WING_BEAT_FINAL_FORM:
            case Kaiser.HEXA_WING_BEAT:
            case Kaiser.HEXA_WING_BEAT_FINAL_FORM:
            case 61141017: // HEXA Wing Beat Hit
            case Mechanic.ADV_HOMING_BEACON:
            case DemonSlayer.CHAOS_LOCK:
            case DarkKnight.RADIANT_EVIL:
            case Cannoneer.BIG_HUGE_GIGANTIC_ROCKET:
            case ThunderBreaker.LIGHTNING_CASCADE:
            case Xenon.OMEGA_BLASTER:
            case Xenon.PINPOINT_SALVO:
            case AngelicBuster.SPARKLE_BURST:
            case Kinesis.PSYCHIC_TORNADO:
            case Kinesis.PSYCHIC_TORNADO_1:
            case Kinesis.PSYCHIC_TORNADO_2:
            case Corsair.BULLET_BARRAGE:
            case Job.GUIDED_ARROW:
            case FirePoison.DOT_PUNISHER:
            case Aran.MAHAS_FURY_ATTACK:
            case Aran.MAHAS_CARNAGE:
            case DemonAvenger.DEMONIC_FRENZY_AA:
            case BattleMage.ALTAR_OF_ANNIHILATION:
            case WindArcher.HOWLING_GALE:
            case WindArcher.HOWLING_GALE_BIG:
            case Shadower.SHADOW_VEIL:
            case Shadower.HEXA_SHADOW_VEIL:
            case 5311010:   // Monkey Fury
            case DarkKnight.SPEAR_OF_DARKNESS:
            case BlazeWizard.ORBITAL_INFERNO:
            case BlazeWizard.SALAMANDER_MISCHIEF:
            case Hero.BURNING_SOUL_BLADE:
            case Paladin.HAMMERS_OF_THE_RIGHTEOUS:
            case Paladin.HAMMERS_OF_THE_RIGHTEOUS_2:
            case FirePoison.POISON_NOVA:
            case BowMaster.QUIVER_BARRAGE_ATOM:
            case BowMaster.INHUMAN_SPEED:
            case DualBlade.BLADE_TEMPEST:
            case NightLord.DARK_LORDS_OMEN:
            case Buccaneer.LORD_OF_THE_DEEP:
            case WindArcher.MERCILESS_WINDS:
            case ThunderBreaker.SHARK_TORPEDO:
            case DemonSlayer.SPIRIT_OF_RAGE:
            case Mechanic.FULL_METAL_BARRAGE:
            case Kaiser.BLADEFALL_ATTACK:
            case Kaiser.TEMPEST_BLADES_FIVE:
            case Kaiser.TEMPEST_BLADES_FIVE_FF:
            case Kaiser.TEMPEST_BLADES_THREE:
            case Kaiser.TEMPEST_BLADES_THREE_FF:
            case Kaiser.HEXA_TEMPEST_BLADES:
            case Kaiser.HEXA_TEMPEST_BLADES_FF:
            case Kaiser.HEXA_TEMPEST_BLADES_ATOM:
            case AngelicBuster.SOUL_RESONANCE:
            case Ark.VENGEFUL_HATE:
            case Ark.BLISSFUL_RESTRAINT_ATTACK:
            case Illium.LONGINUS_SPEAR:
            case Illium.REACTION_DESTRUCTION_II:
            case Kinesis.MIND_OVER_MATTER:
            case LIBERATED_SPIRIT_CIRCLE_SMALL:
            case LIBERATED_SPIRIT_CIRCLE_BIG:
            case LIBERATED_SPIRIT_CIRCLE_SUMMON:
            case LIBERATED_SPIRIT_CIRCLE_SUMMON_2:
            case Pathfinder.SWARM_SHOT:
            case Pathfinder.SWARM_SHOT_ATOM:
            case Pathfinder.ANCIENT_ASTRA_DELUGE_ATOM:
            case Pathfinder.ANCIENT_ASTRA_DELUGE:
            case Pathfinder.RAVEN_TEMPEST:
            case Pathfinder.CARDINAL_BURST_ADVANCED:
            case Adele.MAGIC_DISPATCH:
            case Adele.HUNTING_DECREE:
            case Adele.HEXA_HUNTING_DECREE:
            case Adele.AETHER_FORGE_1:
            case Adele.HEXA_AETHER_FORGE_1:
            case Adele.AETHER_FORGE_2:
            case Adele.HEXA_AETHER_FORGE_2:
            case Adele.AETHER_FORGE_3:
            case Adele.HEXA_AETHER_FORGE_3:
            case Adele.INFINITY_BLADE:
            case Adele.IMPALE:
            case Adele.HEXA_IMPALE:
            case Adele.AETHER_BLOOM:
            case Adele.HEXA_AETHER_BLOOM:
            case NightLord.SHURRIKANE:
            case Shadower.SONIC_BLOW:
            case 155101104: // Unstoppable Impulse
            case DarkKnight.CALAMITOUS_CYCLONE:
            // Khali 5th Job
            case 400041082:
            case 400041083:
            case 400041084:
            case 400041087:
            case 400041089:
            // Lara 5th Job & Multi-hit
            case 400021122:
            case 400021123:
            case 400021129:
            case 400021130:
            case 400021131:
            case Lara.ERUPTION_HEAVING_RIVER_ACTIVE_2:
            case Lara.ERUPTION_WHIRLWIND_ACTIVE_2:
            case Lara.ERUPTION_SUNRISE_WELL_ACTIVE_1:
            case Lara.ERUPTION_SUNRISE_WELL_ACTIVE_3:
            case Lara.ERUPTION_HEAVING_RIVER_UPGRADE_4_ACTIVE_2:
            case Lara.ERUPTION_HEAVING_RIVER_UPGRADE_4_ACTIVE_3:
            case Lara.ERUPTION_WHIRLWIND_UPGRADE_4_ACTIVE_2:
            case Lara.ERUPTION_SUNRISE_WELL_UPGRADE_4_ACTIVE_1:
            case Lara.ERUPTION_SUNRISE_WELL_UPGRADE_4_ACTIVE_3:
            case Lara.ABSORPTION_RIVER_PUDDLE_DOUSE_ACTIVE_2:
            case Lara.ABSORPTION_FIERCE_WIND_ACTIVE_2:
            case Lara.ABSORPTION_SUNLIT_GRAIN_ACTIVE_2:
            case Lara.MANIFESTATION_WHERE_THE_RIVER_COURSES_ACTIVE_1:
            case 400021029: // Poison Nova
            case 95001000:  // Arrow Blaster
            case 42120003:
            case SHIKIGAMI_HAUNTING_4_1:
            case SHIKIGAMI_HAUNTING_4_2:
            case SHIKIGAMI_HAUNTING_4_3:
            case Mihile.SWORD_OF_LIGHT_1:
            case Job.SOL_JANUS_DUSK:
            case Xenon.HEXA_TRIANGULATION_ATT:
            case Xenon.HEXA_BEAM_DANCE_EXTRA:
            case Ren.RIOTOUS_HEART:
            case Ren.HEXA_RIOTOUS_HEART:
            case Ren.HEARTS_UNITED:
            case Ren.HEXA_HEARTS_UNITED:
            // Kain 5th & 6th Multi-hit
            case Kain.DRAGON_BURST:
            case Kain.THANATOS_DESCENT:
            case Kain.THANATOS_DESCENT_2:
            case Kain.THANATOS_DESCENT_3:
            case Kain.FATAL_BLITZ:
            case Kain.GRIP_OF_AGONY:
            case Kain.CHURNING_MALICE:
            case Kain.CHURNING_MALICE_ATTACK_1:
            case Kain.CHURNING_MALICE_ATTACK_2:
            case Kain.TOTAL_ANNIHILATION:
            case Kain.TOTAL_ANNIHILATION_ATTACK_1:
            case Kain.TOTAL_ANNIHILATION_ATTACK_2:
            case Kain.TOTAL_ANNIHILATION_ATTACK_3:
            case Kain.TOTAL_ANNIHILATION_ATTACK_4:
            case Kain.TOTAL_ANNIHILATION_ATTACK_5:
            case Kain.HEXA_POISON_NEEDLE_1:
            case Kain.HEXA_POISON_NEEDLE_2:
            case Kain.CHAIN_SICKLE_2:
            case Kain.HEXA_CHAIN_SICKLE_1:
            // Ren 5th & 6th Job / Multi-hit
            case Ren.PLUM_BLOSSOM_SWORD_STORM:
            case 161141000: // HEXA Plum Blossom Sword: Storm
            case Ren.SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM:
            case Ren.HEXA_SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM:
            case Ren.THOUSAND_BLOSSOM_FLURRY:
            case Ren.THOUSAND_BLOSSOM_FLURRY_EX:
            case Ren.THOUSAND_BLOSSOM_FLURRY_ATOM:
            case Ren.SOUL_IMMEASURABLE:
            case Ren.SOUL_IMMEASURABLE_ATT:
            case Ren.SOUL_IMMEASURABLE_SPE:
            case Ren.FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART:
            case 400011155: // Final Imugi Spirit Sword: Blade of the Unbound Heart 2
            case Ren.FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_ATT:
            // Lynn 5th Job
            case Lynn.BEAST_RAGE:
            case Lynn.BEAK_STRIKE:
            case Lynn.FOCUS_AWAKEN:
            case Lynn.NATURE_GRACE:
            // MoXuan 5th Job
            case 400051084:
            case 400051086:
            case 400051087:
            case 400051088:
            case 400051089:
            // Sia Astelle 5th Job
            case SiaAstelle.SHINE:
            case SiaAstelle.STELLAR_XI_SIRIUS:
            case SiaAstelle.STELLAR_XII_SADALSUUD:
            case SiaAstelle.SAVIOR_CIRCLE:
            case SiaAstelle.TIME_BLINDER:
            // Adele 5th Job
            case Adele.RUIN:
            case Adele.STORM:
            // 6th Job HEXA No-Cooldown / Multi-Hit Skills
            case 35141003: // Mechanic HEXA Homing Beacon
            case 35141004: // Mechanic HEXA Distortion Bomb
            case 35141005: // Mechanic HEXA Distortion Bomb Sub
            case 35141010: // Mechanic HEXA Distortion Bomb Sub 2
            case 33141023: // Wild Hunter HEXA Hunting Assistant Unit
            case 33141024: // Wild Hunter HEXA Drill Salvo
            case 37141015: // Blaster HEXA Ballistic Hurricane
            case 152141007: // Illium HEXA Reaction: Destruction
            case 152141008: // Illium HEXA Reaction: Domination
            case 152141009: // Illium HEXA Longinus Spear
            case 31141012: // Demon Slayer HEXA Demon Cry
                return true;
            default:
                return SkillConstants.isZeroAttackSkill(skillID) || SkillConstants.isKeyDownSkill(skillID);
        }
    }

    public static boolean isZeroAttackSkill(int skillID) {
        switch (skillID) {
            case 100001266:
            case 100001283:
                //Alpha skills
            case 101001200: //Moon Strike
            case 101000200: //Piercing Thrust
            case 101000201: //Shadow Strike
            case 101000202: //Shadow Strike

            case 101101200: //Flash Assault
            case 101100200: //Spin Cutter
            case 101100201: //Adv Spin Cutter
            case 101100202: //Adv Blade Ring

            case 101110200: //Grand Rolling Cross
            case 101110201: //Grand Rolling Cross
            case 101111200: //Rolling Cross
            case 101110202: //Rolling Assault
            case 101110203: //Advanced Rolling Assault
            case 101110204: //Advanced Rolling Assault

            case 101120200: //Wind Cutter
            case 101120201: //Wind Striker
            case 101120202: //Storm Break
            case 101120203: //Storm Break
            case 101120204: //Advanced Storm Break
            case 101120205: //Severe Storm Break (Tile)
            case 101120206: //Severe Storm Break
            case 101121101: //Hurricane Wind
            case 101121200: //Wind Cutter:

                //Beta skills
            case 101001100: //Rising Slash
            case 101000100: //Air Raid
            case 101000101: //Air Riot
            case 101000102: //Air Riot

            case 101101100: //Flash Cut
            case 101100100: //Throwing Weapon
            case 101100101: //Adv. Throwing Weapon

            case 101111100: //Spin Driver
            case 101110101: //Wheel Wind
            case 101110102: //Adv Wheel Wind
            case 101110104: //Adv Blade Tempest

            case 101121100: //Giga Crash
            case 101120100: //Falling Star
            case 101120101: //Falling Star
            case 101120102: //Earth Break
            case 101120103: //Groundbreaker
            case 101120104: //Adv Earth Break
            case 101120105: //Mega Groundbreaker (Tile)
                return true;
        }
        return false;
    }


    public static boolean isForceAtomSkill(int skillID) {
        switch (skillID) {
                // Fire Poison
            case FirePoison.DOT_PUNISHER:
                // Archer
            case Archer.GUIDED_ARROW:
                // BowMaster
            case BowMaster.QUIVER_CARTRIDGE_ATOM:
            case 3140006:
            case 3140007:
            case 3140008:
            case BowMaster.QUIVER_BARRAGE_ATOM:
            case BowMaster.INHUMAN_SPEED:
                // Pathfinder
            case Pathfinder.CARDINAL_DELUGE:
            case Pathfinder.CARDINAL_DELUGE_AMPLIFICATION:
            case Pathfinder.CARDINAL_DELUGE_ADVANCED:
            case Pathfinder.BOUNTIFUL_DELUGE:
            case Pathfinder.SWARM_SHOT_ATOM:
            case Pathfinder.BOUNTIFUL_BURST:
            case Pathfinder.ANCIENT_ASTRA_DELUGE_ATOM:
            case 3341002:
            case 3341003:
            case 3341004:
            case 3341005:
            case 3341012:
            case 3341502:
                // Night Lord
            case NightLord.ASSASSINS_MARK_ATOM:
            case NightLord.NIGHTLORD_MARK_ATOM:
            case NightLord.HEXA_ASSASSINS_MARK_ATOM:
            case 4141003:
            case 4141006:
            case NightLord.DARK_LORDS_OMEN:
                // Shadower
            case Shadower.MESO_EXPLOSION_ATOM:
            case 4220021:
            case 4241008:
            case 4241009:
            case 4241504:
                // Blaze Wizard
            case BlazeWizard.ORBITAL_FLAME_ATOM:
            case BlazeWizard.GREATER_ORBITAL_FLAME_ATOM:
            case BlazeWizard.GRAND_ORBITAL_FLAME_ATOM:
            case BlazeWizard.FINAL_ORBITAL_FLAME_ATOM:
            case BlazeWizard.SAVAGE_FLAME_FOX_ATOM:
                // Wind Archer
            case WindArcher.TRIFLING_WIND_I:
            case WindArcher.TRIFLING_WIND_II:
            case WindArcher.TRIFLING_WIND_III:
            case WindArcher.TRIFLING_WIND_ATOM_ENHANCED:
            case WindArcher.TRIFLING_WIND_II_ATOM:
            case WindArcher.TRIFLING_WIND_III_ENHANCED:
            case WindArcher.STORM_BRINGER:
            case WindArcher.GALE_BARRIER_ATOM:
            case WindArcher.HEXA_GALE_BARRIER_ATOM:
            case WindArcher.MERCILESS_WINDS:
                // Night Walker
            case NightWalker.SHADOW_BAT_ATOM:
            case NightWalker.SHADOW_BAT_FROM_MOB_ATOM:
            case NightWalker.SHADOW_BITE:
            case NightWalker.HEXA_SHADOW_BITE:
                // Evan
            case Evan.MAGIC_DEBRIS:
            case Evan.ENHANCED_MAGIC_DEBRIS:
            case Evan.HEXA_MAGIC_DEBRIS:
                // Phantom
            case Phantom.CARTE_NOIR:
            case Phantom.CARTE_BLANCHE:
            case Phantom.LUCK_OF_THE_DRAW_ATOM:
            case Phantom.ACE_IN_THE_HOLE_ATOM:
                // Shade
            case Shade.FOX_SPIRITS_ATOM:
            case Shade.FOX_SPIRITS_ATOM_2:
                // Resistance
                // Demon Avenger
            case DemonAvenger.NETHER_SHIELD_ATOM:
            case 31241001: // HEXA Nether Shield Atom
                // Battle Mage
            case BattleMage.GRIM_HARVEST:
                // Mechanic
            case Mechanic.MOBILE_MISSILE_BATTERY:
            case Mechanic.HOMING_BEACON:
            case Mechanic.ADV_HOMING_BEACON:
            case 35141003: // HEXA Homing Beacon
                // Kaiser
            case Kaiser.BLADEFALL_ATTACK:
            case Kaiser.BLADEFALL_ATTACK_FF:
            case Kaiser.TEMPEST_BLADES_THREE:
            case Kaiser.TEMPEST_BLADES_THREE_FF:
            case Kaiser.TEMPEST_BLADES_FIVE:
            case Kaiser.TEMPEST_BLADES_FIVE_FF:
            case Kaiser.HEXA_TEMPEST_BLADES:
            case Kaiser.HEXA_TEMPEST_BLADES_FF:
            case Kaiser.HEXA_TEMPEST_BLADES_ATOM:
                // Angelic Buster
            case AngelicBuster.SOUL_SEEKER_ATOM:
            case AngelicBuster.HEXA_SOUL_SEEKER_ATOM:
            case AngelicBuster.HEXA_SOUL_SEEKER_EXPERT_ATOM:
            case AngelicBuster.SPARKLE_BURST:
                // Illium
            case Illium.RADIANT_JAVELIN:
            case Illium.RADIANT_JAVELIN_II:
            case Illium.RADIANT_JAVELIN_ENHANCED:
            case 152001011: // Radiant Javelin Fragment
            case 152120002: // Radiant Javelin II Enhanced
            case 152120003: // Radiant Javelin II Fragment
            case 152120016: // Glory Wings: Javelin II
            case 152120017: // Glory Wings: Javelin II Fragment
            case 400021062: // Reaction: Spectrum
            case 152141000: // HEXA Radiant Javelin
            case 152141001: // HEXA Radiant Javelin Enhanced
            case 152141002: // HEXA Radiant Javelin Fragment
            case 152141003: // HEXA Glory Wings: Javelin
            case 152141004: // HEXA Glory Wings: Javelin Fragment
            case 152141005: // HEXA Glory Wings: Javelin Extra
            case 152141006: // HEXA Glory Wings: Javelin Extra 2
                // Ark
            case Ark.IMPENDING_DEATH_ATOM:
            case Ark.VENGEFUL_HATE:
            case Ark.BASIC_CHARGE_DRIVE_ATOM:
            case Ark.SCARLET_CHARGE_DRIVE_ATOM:
            case Ark.GUST_CHARGE_DRIVE_ATOM:
            case Ark.ABYSSAL_CHARGE_DRIVE_ATOM:
                // Kinesis
            case Kinesis.KINETIC_COMBO:
                return true;
            default:
                return false;
        }
    }

    public static boolean isSpiritWalkerSkill(int skillID) {
        switch (skillID) {
            case SHIKIGAMI_HAUNTING_1_3:
            case SHIKIGAMI_HAUNTING_2_3:
            case SHIKIGAMI_HAUNTING_3_3:
            case SHIKIGAMI_HAUNTING_4_3:
            case SHIKIGAMI_CHARM:
            case EXORCIST_CHARM:
            case FALLING_SAKURA:
            case 42141002: // HEXA Shikigami Haunting 3rd Hit
            case 42141004: // HEXA Vanquisher's Charm
                return true;

            default:
                return false;
        }
    }

    public static boolean isSpecialInvisibleSkill(int skillID) {
        return skillID == FRENZIED_STRENGTH_I
                || skillID == FRENZIED_STRENGTH_II
                || skillID == FRENZIED_STRENGTH_III
                || skillID == KEEN_ATTACk_I
                || skillID == KEEN_STRIKE_I
                || skillID == DEFENSE_SMASH_I
                || skillID == RUNE_BLESSED
                || skillID == RUNE_EXP
                || skillID == BOSS_SLAYER
                || skillID == FRENZIED_STRENGTH_V
                || skillID == FATAL_STRIKE_I
                || skillID == CHARACTER_BUILDING
                || skillID == Ark.SPECTER_STATE
                || skillID == 500071000;
    }

    public static boolean notSureRemoteAttackSkill(int skillID) {
        if (skillID == 400031010 || skillID == 400031006) { // Marksman Perfect Shot
            return true;
        }
        if (skillID == 400021017) { // Kanna Yuki-Musume Shoukan
            return true;
        }
        if (skillID == Hayato.HITOKIRI_HUNDRED_STRIKE) {
            return true;
        }
        if (skillID == 400051054 || skillID == 400051055) {
            return true;
        }
        if (skillID == 400021038) { // Beast Tamer Champ Charge 5th job skill
            return true;
        }
        if (skillID == Adele.IMPALE || skillID == Adele.HEXA_IMPALE || skillID == Adele.RESONANCE_RUSH) {
            return true;
        }
        if (skillID == Mercedes.UNICORN_SPIKE || skillID == Mercedes.SPIKES_ROYALE || skillID == Mercedes.LIGHTNING_EDGE || skillID == Mercedes.ROLLING_MOONSAULT) {
            return true;
        }
        if (skillID == 400021077) { // Bishop Peacemaker Explosion
            return true;
        }
        if (skillID == 400041043) { // Shadower Blade Tornado
            return true;
        }
        if (skillID == 37120059 || skillID == 37121052 || skillID == 37000007 || skillID == 37120055 || skillID == 37120056 || skillID == 37120057 || skillID == 37120058) { // Blaster Hyper Magnum Punch related skills
            return true;
        }
        if (skillID == 400041018 || skillID == 400041017 || skillID == 400041016) { // Nightlord Throwing Star Barrage related skills
            return true;
        }
        // Hoyoung Hyper Sage: Tai Yu Clone
        return skillID == 164121044;
    }

    public static boolean isLunaSkill(int skillId) {
        return skillId == 11001126
                || skillId == 11100128
                || skillId == 11110128
                || skillId == 11111130
                || skillId == 11120117
                || skillId == 11121157
                || skillId == 11141100;
    }

    public static boolean isSolarSkill(int skillId) {
        return skillId == 11001226
                || skillId == 11100228
                || skillId == 11110228
                || skillId == 11111230
                || skillId == 11120217
                || skillId == 11121257
                || skillId == 11141200;
    }

    public static boolean isShootObj(SkillInfo si) {
        switch (si.getSkillId()) {
            case Bishop.PEACEMAKER_EXPLOSION:
            case HoYoung.MASTER_CLONE_TRANSFORMATION_MOB_DEBUFF:
                return true;
        }
        return si.isShootObject();
    }

    public static boolean isShootObjectSummon(int skillID) {
        return skillID == BattleMage.ALTAR_OF_ANNIHILATION ||  // Altar of Annihilation
                skillID == Cadena.APOCALYPSE_CANNON_SUMMON || // Apocalypse Cannon
                skillID == Illium.TEMPLAR_KNIGHT ||  // Templar Knight
                skillID == 400031047 || // Relic Unbound (Deluge)
                skillID == 400031049 || // Relic Unbound (Burst)
                skillID == 5211019 || // All Aboard
                skillID == 1321025; // Evil Eye Shock III
    }

    public static boolean isCooltimeOnStartSkill(int skillID) {
        return skillID == Hero.SWORD_ILLUSION || skillID == DemonSlayer.DEMON_BANE
                || skillID == Illium.CRYSTAL_IGNITION || skillID == Paladin.GRAND_GUARDIAN
                || skillID == Adele.AETHER_GUARD || skillID == Marksman.SURGE_BOLT
                || skillID == Shadower.SONIC_BLOW || skillID == DarkKnight.CALAMITOUS_CYCLONE
                || skillID == Lara.MOUNTAIN_EMBRACE;
    }

    public static boolean isOrbitalFlameOrPhoenixDrive(int skillID) {
        return skillID == 12000026 // Orbital Flame
                || skillID == 12100028 // Greater Orbital Flame
                || skillID == 12110028 // Grand Orbital Flame
                || skillID == 12110030 // Grand Orbital Flame
                || skillID == 12120010 // Final Orbital Flame
                || skillID == 12120017 // Final Orbital Flame
                || skillID == 12120019 // Final Orbital Flame
                || skillID == 12120020 // Final Orbital Flame
                || skillID == 12121057 // Phoenix Drive
                || skillID == 12121059 // Phoenix Drive
                || skillID == 12141001 // HEXA Orbital Flame
                || skillID == 12141002 // HEXA Orbital Flame
                || skillID == 12141004 // HEXA Orbital Flame
                || skillID == 12141005 // HEXA Orbital Flame
                || skillID == 12141012 // HEXA Phoenix Drive
                || skillID == 12141014; // HEXA Phoenix Drive
    }

    public static boolean isHexaOrbitalFlame(int skillID) {
        return skillID == 12141001 // HEXA Orbital Flame
                || skillID == 12141002 // HEXA Orbital Flame
                || skillID == 12141003 // HEXA Orbital Flame
                || skillID == 12141004 // HEXA Orbital Flame
                || skillID == 12141005; // HEXA Orbital Flame
    }
}
 