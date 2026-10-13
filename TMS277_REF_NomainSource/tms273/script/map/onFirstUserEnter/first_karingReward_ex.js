// Created by MetaMS
// ID:[410008820]
// MapName:找回光芒的四季
// 找回光芒的四季

let event = stage.getEvent("boss_karing_extreme");
if (event != null && event.getVariable("reward") == null) {
        event.setVariable("reward", true);
        map.spawnMob(8880975, 486, 105);
}