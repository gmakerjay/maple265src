// Created by MetaMS
// ID:[410007260]
// MapName:殘酷的冬天
// 殘酷的冬天

let event = stage.getEvent("boss_karing_normal");
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        map.spawnMob(8880837, 1026, 106);
        map.spawnMob(8880838, 0, 106);
        map.startEvent();
}