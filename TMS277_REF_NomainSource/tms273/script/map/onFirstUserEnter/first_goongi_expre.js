// Created by MetaMS
// ID:[410008640]
// MapName:失去生氣的春天
// 失去生氣的春天

let event = stage.getEvent("boss_karing_extreme");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8880960, 515, 106);
        map.spawnMob(8880963, 167, 106);
        map.startEvent();
}