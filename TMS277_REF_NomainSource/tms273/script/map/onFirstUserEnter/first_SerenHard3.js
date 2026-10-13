// Created by MetaMS
// ID:[410002080]
// MapName:王宮大廳

let event = stage.getEvent("boss_seren_hard");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.spawnMob(8880614, 0, 257);
        map.startEvent();
}