// Created by MetaMS
// ID:[450008250]
// MapName:深層鏡面

let eventName;
switch (map.getId()) {
        case 450007950:
                eventName = "boss_will_easy";
                break;
        case 450008850:
                eventName = "boss_will_normal";
                break;
        case 450008250:
                eventName = "boss_will_hard";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        switch (map.getId()) {
                case 450007950: {//easy
                        let boss = map.makeMob(8880361);
                        boss.setMinHpLimitR(50.0);
                        map.spawnMob(boss, 0, 215);//main dummy boss

                        map.spawnMob(8880374, 352, 215);//dummy
                        map.spawnMob(8880378, 252, 215);//dummy

                        map.startEvent();
                        break;
                }
                case 450008850: {//normal
                        let boss = map.makeMob(8880341);
                        boss.setMinHpLimitR(50.0);
                        map.spawnMob(boss, 0, 215);//main dummy boss

                        map.spawnMob(8880353, 352, 215);//dummy
                        map.spawnMob(8880357, 252, 215);//dummy

                        map.startEvent();
                        break;
                }
                case 450008250: {//hard
                        let boss = map.makeMob(8880301);
                        boss.setMinHpLimitR(50.0);
                        map.spawnMob(boss, 0, 215);//main dummy boss

                        map.spawnMob(8880323, 352, 215);//dummy
                        map.spawnMob(8880327, 252, 215);//dummy

                        map.startEvent();
                        break;
                }
        }
}