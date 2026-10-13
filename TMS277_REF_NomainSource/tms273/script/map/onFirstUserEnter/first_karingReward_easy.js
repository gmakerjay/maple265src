// Created by MetaMS
// ID:[410008220]
// MapName:找回光芒的四季
// 找回光芒的四季

let event = stage.getEvent("boss_karing_easy");
if (event != null && event.getVariable("reward") == null) {
        event.setVariable("reward", true);
        map.spawnMob(8880915, 486, 105);
}