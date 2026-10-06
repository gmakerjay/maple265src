package net.swordie.ms.constants;

import net.swordie.ms.client.daily.DailyGiftItemInfo;

import java.util.ArrayList;
import java.util.List;

import static net.swordie.ms.constants.ItemConstants.*;

public class DailyGiftConstants {

    public static List<DailyGiftItemInfo> items;

    public static final int MONSTER_COUNT_QR = 501385;

    public static final int REQ_MONSTER = 300;

    public static final int REQ_LEVEL = 33;

    private static void initItems() {
        items = new ArrayList<>();
        items.add(new DailyGiftItemInfo(1, HYPER_TELEPORT_ROCK, 1, 0)); // Hyper Teleport Rock
        items.add(new DailyGiftItemInfo(2, 2450064, 2, 0)); // 2x EXP Coupon (30 min) x2
        items.add(new DailyGiftItemInfo(3, 1122017, 1, 0)); // Pendant of the Spirit
        items.add(new DailyGiftItemInfo(4, MYSTICAL_CUBE, 10, 0)); // Mystical Cube x 10
        items.add(new DailyGiftItemInfo(5, SPELL_TRACE_ID, 500, 0)); // Spell Trace x 500
        items.add(new DailyGiftItemInfo(6, 2432970, 1, 0)); // Special Medal of Honor
        items.add(new DailyGiftItemInfo(7, 5680410, 1, 0)); // 5000 Maple Points
        items.add(new DailyGiftItemInfo(8, MYSTICAL_CUBE, 50, 0)); // Mystical Cube x 50
        items.add(new DailyGiftItemInfo(9, 2450064, 2, 0)); // 2x EXP Coupon (30 min) x2
        items.add(new DailyGiftItemInfo(10, HARD_CUBE, 20, 0)); // Hard Cube x 20
        items.add(new DailyGiftItemInfo(11, 2048716, 1, 0)); // Powerful Rebirth Flame
        items.add(new DailyGiftItemInfo(12, 2000005, 100, 0)); // Power Elixir x 100
        items.add(new DailyGiftItemInfo(13, 2350000, 1, 0)); // Character Slot Expansion Coupon
        items.add(new DailyGiftItemInfo(14, MYSTICAL_CUBE, 50, 0)); // Mystical Cube x 50
        items.add(new DailyGiftItemInfo(15, HYPER_TELEPORT_ROCK, 1, 0)); // Hyper Teleport Rock
        items.add(new DailyGiftItemInfo(16, 2450064, 2, 0)); // 2x EXP Coupon (30 min) x2
        items.add(new DailyGiftItemInfo(17, 5205007, 1, 0)); // 20K Maple Point Coupon
        items.add(new DailyGiftItemInfo(18, 5062800, 1, 0)); // Miracle Circulator
        items.add(new DailyGiftItemInfo(19, SPELL_TRACE_ID, 500, 0)); // Spell Trace x 500
        items.add(new DailyGiftItemInfo(20, 2430909, 1, 0)); // Trait Boost Potion
        items.add(new DailyGiftItemInfo(21, 5205011, 1, 0)); // 50K Maple Point Coupon
        items.add(new DailyGiftItemInfo(22, 2023072, 1, 0)); // 2x Drop Coupon
        items.add(new DailyGiftItemInfo(23, 1113227, 1, 0)); // Reboot Ring
        items.add(new DailyGiftItemInfo(24, 2028333, 5, 0)); // Mysterious Meso Pouch x 5
        items.add(new DailyGiftItemInfo(25, MYSTICAL_CUBE, 50, 0)); // Mystical Cube x 50
        items.add(new DailyGiftItemInfo(26, 2049705, 1, 0)); // Epic Potential Scroll 50%
        items.add(new DailyGiftItemInfo(27, 2028333, 20, 0)); // Mysterious Meso Pouch x 20
        items.add(new DailyGiftItemInfo(28, BONUS_MYSTICAL_CUBE, 30, 0)); // Bonus Mystical Cube x 30
    }

    static {
        initItems();
    }
}
