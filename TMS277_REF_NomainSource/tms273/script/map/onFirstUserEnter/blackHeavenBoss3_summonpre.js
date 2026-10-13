// Created by MetaMS
// ID:[350060600]
// MapName:核心
// 核心

let event = stage.getEvent("boss_swoo_hard");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.spawnMob(8950002, 515, -16);
        map.startEvent();
}