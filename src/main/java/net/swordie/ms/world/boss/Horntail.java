package net.swordie.ms.world.boss;

import net.swordie.ms.connection.packet.FieldPacket;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.fieldeffect.FieldEffect;

public class Horntail {

    public static final int EASY_HORNTAIL_CONTROLLER = 8810214;
    public static final int NORMAL_HORNTAIL_CONTROLLER = 8810018;
    public static final int CHAOS_HORNTAIL_CONTROLLER = 8810122;

    public static final int[] EASY_PARTS = {
            8810202, 8810203, 8810204, 8810205, 8810206, 8810207, 8810208, 8810209
    };

    public static final int[] NORMAL_PARTS = {
            8810002, 8810003, 8810004, 8810005, 8810006, 8810007, 8810008, 8810009
    };

    public static final int[] CHAOS_PARTS = {
            8810102, 8810103, 8810104, 8810105, 8810106, 8810107, 8810108, 8810109
    };

    public static void spawn(int mode, Field field) {
        int controllerId;
        int[] parts;
        switch (mode) {
            case 0 -> {
                controllerId = EASY_HORNTAIL_CONTROLLER;
                parts = EASY_PARTS;
            }
            case 1 -> {
                controllerId = NORMAL_HORNTAIL_CONTROLLER;
                parts = NORMAL_PARTS;
            }
            default -> {
                controllerId = CHAOS_HORNTAIL_CONTROLLER;
                parts = CHAOS_PARTS;
            }
        }

        field.removeMobs();
        short x = 868;
        short y = 230;

        // Spawn controller mob
        Mob controller = field.spawnMob(controllerId, x, y, false);
        // Spawn all 8 parts of the dragon
        for (int partId : parts) {
            field.spawnMob(partId, x, y, false);
        }

        if (controller != null) {
            field.broadcast(FieldPacket.fieldEffect(FieldEffect.mobHPTagFieldEffect(controller)));
        }
    }
}
