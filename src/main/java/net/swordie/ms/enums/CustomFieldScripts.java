package net.swordie.ms.enums;

import net.swordie.ms.world.event.RussianRouletteEvent;

import java.util.Arrays;

/**
 * Created on 1-12-2018.
 *
 * @author Asura
 */
public enum CustomFieldScripts { // Custom Field Scripts
    russianRoulette_enter(RussianRouletteEvent.EVENT_MAP),
    vonbonInsideMob(105200520),
    ;
    private final int id;

    CustomFieldScripts(int val) {
        this.id = val;
    }

    public static CustomFieldScripts getByVal(int id) {
        return Arrays.stream(values()).filter(cfs -> cfs.getVal() == id).findAny().orElse(null);
    }

    public int getVal() {
        return id;
    }
}
