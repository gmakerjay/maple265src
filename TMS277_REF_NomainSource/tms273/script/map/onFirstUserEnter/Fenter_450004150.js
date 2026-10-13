// Created by MetaMS
// ID:[450004450]
// MapName:夢幻森林

let eventName;
switch (map.getId()) {
        case 450003840:
                eventName = "boss_lucid_easy";
                break;
        case 450004150:
                eventName = "boss_lucid_normal";
                break;
        case 450004450:
                eventName = "boss_lucid_hard";
                break;
        case 450004750://Dir
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        switch (map.getId()) {
                case 450003840://easy
                        map.spawnMob(8880142, 1000, 43);
                        map.spawnMob(8880158, 1000, 43);
                        map.spawnMob(8880165, 900, 43);
                        map.spawnMob(8880168, 900, 43);
                        map.spawnMob(8880169, 900, 43);
                        map.startEvent();
                        break;
                case 450004150://normal
                        map.spawnMob(8880140, 1000, 43);
                        map.spawnMob(8880166, 1000, 43);
                        map.spawnMob(8880165, 900, 43);
                        map.spawnMob(8880168, 900, 43);
                        map.spawnMob(8880169, 900, 43);
                        map.startEvent();
                        break;
                case 450004450://hard
                        map.spawnMob(8880141, 1000, 43);
                        map.spawnMob(8880166, 1000, 43);
                        map.spawnMob(8880165, 700, 43);
                        map.spawnMob(8880168, 700, 43);
                        map.spawnMob(8880169, 700, 43);
                        map.startEvent();
                        break;
        }
}