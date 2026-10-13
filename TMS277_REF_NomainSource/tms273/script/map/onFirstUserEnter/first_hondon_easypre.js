// Created by MetaMS
// ID:[410008120]
// MapName:失去色彩的秋天
// 失去色彩的秋天

let event = stage.getEvent("boss_karing_easy");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.spawnMob(8880902, 535, 106);
        map.spawnMob(8880905, 0, 106);
        map.startEvent();
}