// Created by MetaMS
// ID:[450012600]
// MapName:盡頭近處

let eventName;
switch (map.getId()) {
        case 450012210:
                eventName = "boss_dunkel_normal";
                break;
        case 450012600:
                eventName = "boss_dunkel_hard";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        switch (map.getId()) {
                case 450012210: {//normal
                        map.spawnMob(8645009, 0, 29);//main boss
                        map.spawnMob(8645067, 0, 29);//dummy
                        map.startEvent();
                        break;
                }
                case 450012600: {//hard
                        map.spawnMob(8645066, 0, 29);//main boss
                        map.spawnMob(8645068, 0, 29);//dummy
                        map.startEvent();
                        break;
                }
        }
}