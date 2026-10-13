// Created by MetaMS
// ID:[875030800]
// MapName:月色朦朧處

let event = stage.getEvent("boss_malitia_normal");
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        map.spawnMob(9602474, 12, -9);
}