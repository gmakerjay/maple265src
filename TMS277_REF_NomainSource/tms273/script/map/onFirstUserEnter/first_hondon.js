// Created by MetaMS
// ID:[410007220]
// MapName:失去色彩的秋天
// 失去色彩的秋天

let event = stage.getEvent("boss_karing_normal");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.spawnMob(8880832, 535, 106);
        map.spawnMob(8880835, 0, 106);
        map.startEvent();
}