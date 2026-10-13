// Created by MetaMS
// ID:[450004250]
// MapName:惡夢時間塔


let eventName;
switch (map.getId()) {
        case 450003960:
                eventName = "boss_lucid_easy";
                break;
        case 450004300:
                eventName = "boss_lucid_normal";
                break;
        case 450004600:
                eventName = "boss_lucid_hard";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        switch (map.getId()) {
                case 450003960:
                        map.spawnMob(8880156, 93, 36);
                        break;
                case 450004300:
                        map.spawnMob(8880167, 93, 36);
                        break;
                case 450004600:
                        map.spawnMob(8880177, 93, 36);
                        break;
        }
}