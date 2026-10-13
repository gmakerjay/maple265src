// Created by MetaMS
// ID:[410002280]
// MapName:王宮大廳

let event = stage.getEvent("boss_seren_extreme");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        let tBoss = map.makeMob(8880664);
        map.spawnMob(tBoss, 0, 257);
}