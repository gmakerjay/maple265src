// Created by MetaMS
// ID:[450008350]
// MapName:破碎之光

let eventName;
switch (map.getId()) {
        case 450008050:
                eventName = "boss_will_easy";
                break;
        case 450008950:
                eventName = "boss_will_normal";
                break;
        case 450008350:
                eventName = "boss_will_hard";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        switch (map.getId()) {
                case 450008050: {//easy
                        map.spawnMob(8880362, -2, 281);//main dummy boss

                        map.spawnMob(8880375, 352, 281);//dummy
                        map.spawnMob(8880379, 252, 281);//dummy

                        map.startEvent();
                        break;
                }
                case 450008950: {//normal
                        map.spawnMob(8880342, -2, 281);//main dummy boss

                        map.spawnMob(8880354, 352, 281);//dummy
                        map.spawnMob(8880358, 252, 281);//dummy

                        map.startEvent();
                        break;
                }
                case 450008350: {//hard
                        map.spawnMob(8880302, -2, 281);//main dummy boss

                        map.spawnMob(8880324, 352, 281);//dummy
                        map.spawnMob(8880328, 252, 281);//dummy

                        map.startEvent();
                        break;
                }
        }
}