// Created by MetaMS
// ID:[410008460]
// MapName:殘酷的冬天
// 殘酷的冬天

let event = stage.getEvent("boss_karing_hard");
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        map.spawnMob(8880937, 1026, 106);
        map.spawnMob(8880938, 0, 106);
        map.startEvent();
}