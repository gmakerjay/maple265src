// Created by MetaMS
// ID:[410008080]
// MapName:失去光明的夏天
// 失去光明的夏天

let event = stage.getEvent("boss_karing_easy");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        map.spawnMob(8880901, 0, 405);
        map.spawnMob(8880904, 0, 405);
        map.startEvent();
}