// Created by MetaMS
// ID:[450010500]
// MapName:慾望祭壇

let eventName;
switch (map.getId()) {
        case 450010930:
                eventName = "boss_jinhillah_normal";
                break;
        case 450010500:
                eventName = "boss_jinhillah_hard";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        switch (map.getId()) {
                case 450010930: {//normal
                        map.spawnMob(8880450, 0, 266);//main dummy boss

                        map.spawnMob(8880451, 0, 266);//dummy
                        map.spawnMob(8880452, 0, 266);//dummy

                        map.startEvent();
                        break;
                }
                case 450010500: {//hard
                        map.spawnMob(8880410, 0, 266);//main dummy boss

                        map.spawnMob(8880411, 0, 266);//dummy
                        map.spawnMob(8880412, 0, 266);//dummy

                        map.startEvent();
                        break;
                }
        }
}