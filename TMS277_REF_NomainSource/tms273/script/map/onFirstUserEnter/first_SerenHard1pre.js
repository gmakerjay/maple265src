// Created by MetaMS
// ID:[410002020]
// MapName:王宮大廳

let event = stage.getEvent("boss_seren_hard");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8880600, 0, 275);
        map.spawnMob(8880601, 0, 275);
        map.startEvent();
}