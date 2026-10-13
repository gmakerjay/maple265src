// Created by MetaMS
// ID:[221030910]
// MapName:通風口 D-77

let event = stage.getEvent("boss_caoong_normal");
if (event != null && event.getVariable("boss") == null) {
        event.setVariable("boss", false);
        map.spawnMob(8880200, 615, 298);
        map.spawnMob(8880202, 615, 298);
}