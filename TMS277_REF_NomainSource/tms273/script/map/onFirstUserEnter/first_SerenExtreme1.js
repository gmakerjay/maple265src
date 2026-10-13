// Created by MetaMS
// ID:[410002220]
// MapName:王宮大廳

let event = stage.getEvent("boss_seren_extreme");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8880650, 0, 275);
        map.spawnMob(8880651, 0, 275);
        map.startEvent();
}