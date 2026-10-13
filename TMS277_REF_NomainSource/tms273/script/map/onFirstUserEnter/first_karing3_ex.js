// Created by MetaMS
// ID:[410008800]
// MapName:環繞死亡的四季
// 環繞死亡的四季

let event = stage.getEvent("boss_karing_extreme");
if (event != null && event.getVariable("boss5") == null) {
        event.setVariable("boss5", false);
        let boss = map.makeMob(8880972);
        boss.setMinHpLimitR(75);
        map.spawnMob(boss, -312, 398);
        map.spawnMob(8880973, 0, 398);

        map.spawnMob(8880969, -1581, 362);
        map.spawnMob(8880971, -598, 362);
        map.spawnMob(8880970, 401, 362);

        map.startEvent();
}