// Created by MetaMS
// ID:[350060950]
// MapName:核心
// 核心

let event = stage.getEvent("boss_swoo_normal");
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        map.spawnMob(8950109, 50, 15);
}