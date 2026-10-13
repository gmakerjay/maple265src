// Created by MetaMS
// Event: blast frozen Zakum

let event = stage.getEvent("event_blast_frozen");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(9834209, -10, -251);
        map.spawnMob(9834210, -10, -251);
        map.spawnMob(9834211, -10, -251);
        map.spawnMob(9834212, -10, -251);

        map.spawnMob(9834213, -10, -251);
        map.spawnMob(9834214, -10, -251);
        map.spawnMob(9834215, -10, -251);
        map.spawnMob(9834216, -10, -251);

        map.spawnMob(9834217, -10, -251);//main boss
}