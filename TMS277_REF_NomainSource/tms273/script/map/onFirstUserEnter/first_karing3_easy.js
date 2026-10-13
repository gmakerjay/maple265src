// Created by MetaMS
// ID:[410008200]
// MapName:環繞死亡的四季
// 環繞死亡的四季

let event = stage.getEvent("boss_karing_easy");
if (event != null && event.getVariable("boss5") == null) {
        event.setVariable("boss5", false);
        let boss = map.makeMob(8880912);
        boss.setMinHpLimitR(75);
        map.spawnMob(boss, -312, 398);
        map.spawnMob(8880913, 0, 398);

        map.spawnMob(8880909, -1581, 362);
        map.spawnMob(8880911, -598, 362);
        map.spawnMob(8880910, 401, 362);

        map.startEvent();
}