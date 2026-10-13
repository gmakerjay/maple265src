// Created by MetaMS
// ID:[410007180]
// MapName:失去光明的夏天
// 失去光明的夏天

let event = stage.getEvent("boss_karing_normal");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        map.spawnMob(8880831, 0, 405);
        map.spawnMob(8880834, 0, 405);
        map.startEvent();
}