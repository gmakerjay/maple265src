// Created by MetaMS
// ID:[410002160]
// MapName:世界的邊境

let event = stage.getEvent("boss_seren_normal");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        let tBoss = map.makeMob(8880632);
        map.spawnMob(tBoss, 0, 305);
        let boss = map.makeMob(8880637);
        boss.setSpiritEntityId(tBoss.getEntityId());
        map.spawnMob(boss, 0, 305);

        map.spawnMob(8880638, 0, 305);
        map.startEvent();
}