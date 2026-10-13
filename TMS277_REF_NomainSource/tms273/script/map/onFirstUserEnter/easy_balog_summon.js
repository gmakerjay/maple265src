// Created by MetaMS
// ID:[105100400]
// MapName:巴洛古的墳墓

let event = stage.getEvent("boss_balrog_easy");
if (event != null && event.getVariable("boss") == null) {
        event.setVariable("boss", false);
        let spirit = map.makeMob(8830010);
        spirit.setInvincible(true);
        map.spawnMob(spirit, 400, 258);
        event.setVariable("Balog", spirit);
        event.startTimer("Release", 3 * 60 * 1000);
        let mobIds = [8830007, 8830013, 8830009];
        for (let i = 0; i < mobIds.length; i++) {
                let mobId = mobIds[i];
                let mob = map.makeMob(mobId);
                mob.setSpiritEntityId(spirit.getEntityId());
                if (mobId == 8830013) {
                        mob.setRemoveAfter(new Date().getTime() + 3 * 60 * 1000);
                }
                map.spawnMob(mob, 400, 258);
        }
}