// Created by MetaMS
// ID:[410006060]
// MapName:激戰的摩天塔

let event = stage.getEvent("boss_kalos_chaos");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);

        let sprintMob = map.makeMob(8881032);
        sprintMob.setMinHpLimitR(75);
        map.spawnMob(sprintMob, 0, 399);

        let mob = map.makeMob(8881033);
        mob.setSpiritEntityId(sprintMob.getEntityId())
        map.spawnMob(mob, 0, 399);

        map.spawnMob(8881037, 0, 399);
        map.startEvent();
}