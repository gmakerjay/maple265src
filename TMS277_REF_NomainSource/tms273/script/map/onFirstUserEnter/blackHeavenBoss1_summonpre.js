// Created by MetaMS
// ID:[350060400]
// MapName:核心
// 核心

let event = stage.getEvent("boss_swoo_hard");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8950000, 0, -16);
        map.startEvent();
}