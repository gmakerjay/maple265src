// Created by MetaMS
// ID:[410007300]
// MapName:環繞死亡的四季
// 環繞死亡的四季

let event = stage.getEvent("boss_karing_normal");
if (event != null && event.getVariable("boss5") == null) {
        event.setVariable("boss5", false);
        let boss = map.makeMob(8880842);
        boss.setMinHpLimitR(75);
        map.spawnMob(boss, -312, 398);
        map.spawnMob(8880843, 0, 398);

        map.spawnMob(8880839, -1581, 362);
        map.spawnMob(8880841, -598, 362);
        map.spawnMob(8880840, 401, 362);

        map.startEvent();
}