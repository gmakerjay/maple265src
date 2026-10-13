// Created by MetaMS
// ID:[350060700]
// MapName:核心
// 核心

let event = stage.getEvent("boss_swoo_normal");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8950100, 0, -16);
        map.startEvent();
}