// Created by MetaMS
// ID:[450009480]
// MapName:虛空之眼

let event = stage.getEvent("boss_dusk_normal");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        map.spawnMob(8950116, -2673, -488);
}