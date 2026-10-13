// Created by MetaMS
// ID:[350160240]
// MapName:世界樹頂端
// 世界樹頂端

let event = stage.getEvent("boss_demian_normal");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        let hp = event.getVariable("RemainingHp");
        let boss = map.makeMob(8880111);
        boss.setHp(hp);
        map.spawnMob(boss, 828, 15);

        let shadowZone = map.makeMob(8880102);
        map.spawnMob(shadowZone, 828, 15);
        boss.registerMobZone(5, shadowZone.getEntityId());

        map.startEvent();
}