// Created by MetaMS


let event = stage.getEvent("epic_dungeon_story");
if (event != null && event.getVariable("boss") == null) {
        event.setVariable("boss", true);
        map.spawnMob(9834426, 0, 350);
}