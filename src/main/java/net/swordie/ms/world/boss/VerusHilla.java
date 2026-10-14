package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.packet.VerusHillaPacket;
import net.swordie.ms.world.field.Field;

public class VerusHilla {

    public static final int VERUS_HILLA_NORMAL = 8880405;
    public static final int VERUS_HILLA_HARD = 8880410;
    public static final int EVIL_HAND_NORMAL = 8880406;
    public static final int EVIL_HAND_HARD = 8880411;

    public static void spawn(Field field, Char chr, boolean isHard) {
        if (field == null || field.isBossSpawned()) {
            return;
        }
        field.setBossSpawned(true);
        for (Char p : field.getChars()) {
            p.setVHDeathCount(new boolean[]{true, true, true, true, true});
            if (p.getDeathCount() <= 0 || p.getDeathCount() > 5) {
                p.setDeathCount(5);
            }
            p.write(VerusHillaPacket.encode(3, p, field));
            field.broadcast(VerusHillaPacket.encode(10, p, field));
        }
        int bossId = isHard ? VERUS_HILLA_HARD : VERUS_HILLA_NORMAL;
        int handId = isHard ? EVIL_HAND_HARD : EVIL_HAND_NORMAL;
        int y = BossEntry.snapToFootholdY(field, 0, 266);
        field.spawnMob(bossId, 0, y, false);
        field.spawnMob(handId, 2, 29, false);
    }
}
