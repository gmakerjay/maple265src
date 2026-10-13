// Created by MetaMS
// ID:[450009450]
// MapName:虛空之眼

let eventName;
switch (map.getId()) {
        case 450009400:
                eventName = "boss_dusk_normal";
                break;
        case 450009450:
                eventName = "boss_dusk_chaos";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        switch (map.getId()) {
                case 450009400: {//normal
                        let boss = map.makeMob(8644650);
                        map.spawnMob(boss, -45, -157);//main boss
                        boss.changeZoneType(1);
                        map.spawnMob(8644658, -80, -157);//dummy
                        map.startEvent();
                        break;
                }
                case 450009450: {//hard
                        let boss = map.makeMob(8644655);
                        map.spawnMob(boss, -45, -157);//main boss
                        boss.changeZoneType(1);
                        map.spawnMob(8644659, -80, -157);//dummy
                        map.startEvent();
                        break;
                }
        }
}