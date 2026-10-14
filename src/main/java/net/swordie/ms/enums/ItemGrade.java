package net.swordie.ms.enums;

import java.util.Arrays;

public enum ItemGrade {
    LegendaryBonusHidden(-12),
    UniqueBonusHidden(-13),
    EpicBonusHidden(-14),
    RareBonusHidden(-15),

    HiddenLegendary(4),
    HiddenUnique(3),
    HiddenEpic(2),
    HiddenRare(1),

    None(0),

    RareSecondary(16), //we need this defined for the lowest tier to exist
    Rare(17),
    Epic(18),
    Unique(19),
    Legendary(20),
    ;

    private final int val;

    ItemGrade(int val) {
        this.val = val;
    }

    public static ItemGrade getHiddenBonusGradeByBaseGrade(ItemGrade gradeByVal) {
        switch (gradeByVal) {
            case HiddenRare:
            case Rare:
                return RareBonusHidden;
            case HiddenEpic:
            case Epic:
                return EpicBonusHidden;
            case HiddenUnique:
            case Unique:
                return UniqueBonusHidden;
            case HiddenLegendary:
            case Legendary:
                return LegendaryBonusHidden;
            default:
                return None;
        }
    }

    public static ItemGrade getGradeByVal(int grade) {
        return switch (grade) {
            case -12 -> LegendaryBonusHidden;
            case -13 -> UniqueBonusHidden;
            case -14 -> EpicBonusHidden;
            case -15 -> RareBonusHidden;
            case 4 -> HiddenLegendary;
            case 3 -> HiddenUnique;
            case 2 -> HiddenEpic;
            case 1 -> HiddenRare;
            case 0 -> None;
            case 16 -> RareSecondary;
            case 17 -> Rare;
            case 18 -> Epic;
            case 19 -> Unique;
            case 20 -> Legendary;
            default -> null;
        };
    }

    public static ItemGrade getGradeByOption(int option) {
        if (option < 0) {
            ItemGrade ig = getGradeByVal(Math.abs(option));
            return ig != null ? ig : None;
        }
        if (option > 0 && option < 10000) {
            return RareSecondary;
        }
        if (option > 10000 && option < 20000) {
            return Rare;
        }
        if (option > 20000 && option < 30000) {
            return Epic;
        }
        if (option > 30000 && option < 40000) {
            return Unique;
        }
        if (option > 40000 && option < 50000) {
            return Legendary;
        }
        return None;
    }

    public static boolean isMatching(short first, short second) {
        ItemGrade firstGrade = getGradeByVal(first);
        ItemGrade other = getGradeByVal(second);
        switch (firstGrade) {
            case None:
                return other == None;
            case RareSecondary:
                return other == RareSecondary;
            case HiddenRare:
            case Rare:
                return other == HiddenRare || other == Rare;
            case HiddenEpic:
            case Epic:
                return other == HiddenEpic || other == Epic;
            case HiddenUnique:
            case Unique:
                return other == HiddenUnique || other == Unique;
            case HiddenLegendary:
            case Legendary:
                return other == HiddenLegendary || other == Legendary;
            default:
                return false;
        }
    }

    public static ItemGrade getHiddenGradeByVal(short val) {
        ItemGrade ig = None;
        ItemGrade arg = getGradeByVal(val);
        switch (arg) {
            case Rare:
            case HiddenRare:
                ig = HiddenRare;
                break;
            case Epic:
            case HiddenEpic:
                ig = HiddenEpic;
                break;
            case Unique:
            case HiddenUnique:
                ig = HiddenUnique;
                break;
            case Legendary:
            case HiddenLegendary:
                ig = HiddenLegendary;
                break;
        }
        return ig;
    }

    public static ItemGrade getOneTierLower(short val) {
        ItemGrade ig = None;
        ItemGrade arg = getGradeByVal(val);
        switch (arg) {
            case Rare:
                ig = RareSecondary;
                break;
            case Epic:
                ig = Rare;
                break;
            case HiddenRare:
            case HiddenEpic:
                ig = HiddenRare;
                break;
            case Unique:
                ig = Epic;
                break;
            case HiddenUnique:
                ig = HiddenEpic;
                break;
            case Legendary:
                ig = Unique;
                break;
            case HiddenLegendary:
                ig = HiddenUnique;
                break;
        }
        return ig;
    }

    public short getVal() {
        return (short) val;
    }

    public boolean isHidden() {
        switch (this) {
            case HiddenRare:
            case HiddenEpic:
            case HiddenUnique:
            case HiddenLegendary:
            case RareBonusHidden:
            case EpicBonusHidden:
            case UniqueBonusHidden:
            case LegendaryBonusHidden:
                return true;
        }
        return false;
    }
}