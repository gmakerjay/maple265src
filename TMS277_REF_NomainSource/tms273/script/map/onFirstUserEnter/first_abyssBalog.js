// Created by MetaMS
// Event: abyssBalog

let event = stage.getEvent("event_blast_dungeon");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(9834152, 184, 250);//main boss
}