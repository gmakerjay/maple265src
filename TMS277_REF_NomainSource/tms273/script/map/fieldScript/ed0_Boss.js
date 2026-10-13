// Created by MetaMS


let event = stage.getEvent("epic_dungeon_story");
if (event != null && event.getVariable("boss") == null) {
        if (map.getId() == 993241200) {
                event.setVariable("boss", true);
                map.spawnMob(9834411, 460, 515);
        } else if (map.getId() == 993241400) {
                event.setVariable("boss", true);
                map.spawnMob(9834416, 0, 8);
        } else if (map.getId() == 993241600) {
                event.setVariable("boss", true);
                map.spawnMob(9834421, 0, 8);
        }
}