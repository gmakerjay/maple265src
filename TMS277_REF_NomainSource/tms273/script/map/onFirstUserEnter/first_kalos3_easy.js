// Created by MetaMS
// ID:[410006060]
// MapName:激戰的摩天塔

let event = stage.getEvent("boss_kalos_easy");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);

        map.spawnMob(8881018, 0, 399);
        map.startEvent();
}