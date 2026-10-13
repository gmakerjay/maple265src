// Created by MetaMS
// ID:[450012250]
// MapName:盡頭近處

let event = stage.getEvent("boss_dunkel_normal");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        map.spawnMob(8950118, 0, 29);
}