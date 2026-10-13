// Created by MetaMS
// ID:[410008720]
// MapName:失去色彩的秋天
// 失去色彩的秋天

let event = stage.getEvent("boss_karing_extreme");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.spawnMob(8880962, 535, 106);
        map.spawnMob(8880965, 0, 106);
        map.startEvent();
}