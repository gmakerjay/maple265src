// Created by MetaMS
// ID:[350060900]
// MapName:核心
// 核心

let event = stage.getEvent("boss_swoo_normal");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.spawnMob(8950102, 515, -16);
        map.startEvent();
}