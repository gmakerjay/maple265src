// Created by MetaMS
// ID:[350160140]
// MapName:世界樹頂端
// 世界樹頂端

let event = stage.getEvent("boss_demian_hard");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.spawnMob(8950112, 895, 15);
}