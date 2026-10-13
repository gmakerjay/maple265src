// Created by MetaMS
// ID:[410008500]
// MapName:環繞死亡的四季
// 環繞死亡的四季

let event = stage.getEvent("boss_karing_hard");
if (event != null && event.getVariable("boss5") == null) {
        event.setVariable("boss5", false);
        let boss = map.makeMob(8880942);
        boss.setMinHpLimitR(75);
        map.spawnMob(boss, -312, 398);
        map.spawnMob(8880943, 0, 398);

        map.spawnMob(8880939, -1581, 362);
        map.spawnMob(8880941, -598, 362);
        map.spawnMob(8880940, 401, 362);

        map.startEvent();
}