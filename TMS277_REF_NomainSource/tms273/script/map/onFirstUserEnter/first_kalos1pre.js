// Created by MetaMS
// ID:[410006020]
// MapName:激戰的摩天塔

let event = stage.getEvent("boss_kalos_normal");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8880800, 0, 398);
        map.spawnMob(8880801, 0, 398);
        map.startEvent();
}