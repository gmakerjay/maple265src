// Created by MetaMS
// ID:[410002020]
// MapName:王宮大廳

let event = stage.getEvent("boss_seren_hard");
if (event != null && event.getVariable("boss1") == null) {
    event.setVariable("boss1", false);
    let mob = map.makeMob(8880600);
    mob.setForcedMobStat(265);
    map.spawnMob(mob, 0, 275);

    mob = map.makeMob(8880601);
    mob.setForcedMobStat(265);
    map.spawnMob(mob, 0, 275);
    map.startEvent();
}