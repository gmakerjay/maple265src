// Created by MetaMS
// ID:[410002260]
// MapName:世界的邊境

let event = stage.getEvent("boss_seren_extreme");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        let tBoss = map.makeMob(8880652);
        map.spawnMob(tBoss, 0, 305);
        let boss = map.makeMob(8880657);
        boss.setSpiritEntityId(tBoss.getEntityId());
        map.spawnMob(boss, 0, 305);

        map.spawnMob(8880658, 0, 305);
        map.startEvent();
}