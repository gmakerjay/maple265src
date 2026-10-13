// Created by MetaMS
// ID:[450012650]
// MapName:盡頭近處

let event = stage.getEvent("boss_dunkel_hard");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        map.spawnMob(8950119, 0, 29);
}