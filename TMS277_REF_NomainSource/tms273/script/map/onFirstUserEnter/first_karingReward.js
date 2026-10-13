// Created by MetaMS
// ID:[410007320]
// MapName:找回光芒的四季
// 找回光芒的四季

let event = stage.getEvent("boss_karing_normal");
if (event != null && event.getVariable("reward") == null) {
        event.setVariable("reward", true);
        map.spawnMob(8880845, 486, 105);
}