// Created by MetaMS
// ID:[350060500]
// MapName:核心
// 核心

let event = stage.getEvent("boss_swoo_hard");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        map.spawnMob(8950001, 515, -16);
        map.startEvent();
}