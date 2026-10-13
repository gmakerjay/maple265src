// Created by MetaMS
// ID:[410008520]
// MapName:找回光芒的四季
// 找回光芒的四季

let event = stage.getEvent("boss_karing_hard");
if (event != null && event.getVariable("reward") == null) {
        event.setVariable("reward", true);
        map.spawnMob(8880945, 486, 105);
}