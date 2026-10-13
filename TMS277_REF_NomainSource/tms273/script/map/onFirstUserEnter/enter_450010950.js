// Created by MetaMS
// ID:[450010950]
// MapName:慾望祭壇


let event = stage.getEvent("boss_jinhillah_normal");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        map.spawnMob(8950120, 823, 206);
}