// Created by MetaMS
// ID:[105100401]
// MapName:巴洛古消失的地點

let event = stage.getEvent("boss_balrog_easy");
if (event != null && event.getVariable("bonus") == null) {
        event.setVariable("bonus", true);
        map.spawnMob(8830014, 400, 258);
}