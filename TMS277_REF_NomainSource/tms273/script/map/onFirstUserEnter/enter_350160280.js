// Created by MetaMS
// ID:[350160240]
// MapName:世界樹頂端
// 世界樹頂端

let event = stage.getEvent("boss_demian_normal");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.spawnMob(8950111, 895, 15);
}