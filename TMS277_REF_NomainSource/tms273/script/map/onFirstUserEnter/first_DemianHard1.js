// Created by MetaMS
// ID:[350160100]
// MapName:世界樹頂端
// 世界樹頂端

let event = stage.getEvent("boss_demian_hard");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        let boss = map.makeMob(8880100);
        boss.setMinHpLimitR(27.7);
        map.spawnMob(boss, 828, 15);
        map.startEvent();
}