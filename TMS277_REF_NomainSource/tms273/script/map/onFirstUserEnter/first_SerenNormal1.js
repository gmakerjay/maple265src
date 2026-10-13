// Created by MetaMS
// ID:[410002120]
// MapName:王宮大廳

let event = stage.getEvent("boss_seren_normal");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8880630, 0, 275);
        map.spawnMob(8880631, 0, 275);
        map.startEvent();
}