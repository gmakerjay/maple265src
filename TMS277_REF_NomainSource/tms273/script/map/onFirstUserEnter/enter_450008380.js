// Created by MetaMS
// ID:[450008380]
// MapName:破碎之光


let eventName;
switch (map.getId()) {
        case 450008080:
                eventName = "boss_will_easy";
                break;
        case 450008980:
                eventName = "boss_will_normal";
                break;
        case 450008380:
                eventName = "boss_will_hard";
                break;
}
let event = stage.getEvent();
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        switch (map.getId()) {
                case 450008080:
                        map.spawnMob(8950113, -4, 248);
                        break;
                case 450008980:
                        map.spawnMob(8950114, -4, 248);
                        break;
                case 450008380:
                        map.spawnMob(8950115, -4, 248);
                        break;
        }
}