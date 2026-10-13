// Created by MetaMS
// ID:[450008150]
// MapName:回折的迴廊

let eventName;
switch (map.getId()) {
        case 450007850:
                eventName = "boss_will_easy";
                break;
        case 450008750:
                eventName = "boss_will_normal";
                break;
        case 450008150:
                eventName = "boss_will_hard";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        switch (map.getId()) {
                case 450007850: {//easy
                        let boss = map.makeMob(8880360);
                        boss.setMinHpLimitR(66.6);
                        map.spawnMob(boss, 352, -2020);//main dummy boss

                        let bossBottom = map.makeMob(8880363);
                        bossBottom.setMinHpLimitR(66.6);
                        map.spawnMob(bossBottom, 352, 159);//Bottom boss

                        let bossTop = map.makeMob(8880364);
                        bossTop.setMinHpLimitR(66.6);
                        map.spawnMob(bossTop, 352, -2020);//Top boss

                        map.spawnMob(8880373, 352, 159);//dummy
                        map.spawnMob(8880374, 352, -2020);//dummy
                        map.spawnMob(8880377, 252, 159);//dummy
                        map.spawnMob(8880378, 252, -2020);//dummy
                        map.startEvent();
                        break;
                }
                case 450008750: {//normal
                        let boss = map.makeMob(8880340);
                        boss.setMinHpLimitR(66.6);
                        map.spawnMob(boss, 352, -2020);//main dummy boss

                        let bossBottom = map.makeMob(8880343);
                        bossBottom.setMinHpLimitR(66.6);
                        map.spawnMob(bossBottom, 352, 159);//Bottom boss

                        let bossTop = map.makeMob(8880344);
                        bossTop.setMinHpLimitR(66.6);
                        map.spawnMob(bossTop, 352, -2020);//Top boss

                        map.spawnMob(8880351, 352, 159);//dummy
                        map.spawnMob(8880352, 352, -2020);//dummy
                        map.spawnMob(8880355, 252, 159);//dummy
                        map.spawnMob(8880356, 252, -2020);//dummy
                        map.startEvent();
                        break;
                }
                case 450008150: {//hard
                        let boss = map.makeMob(8880300);
                        boss.setMinHpLimitR(66.6);
                        map.spawnMob(boss, 352, -2020);//main dummy boss

                        let bossBottom = map.makeMob(8880303);
                        bossBottom.setMinHpLimitR(66.6);
                        map.spawnMob(bossBottom, 352, 159);//Bottom boss

                        let bossTop = map.makeMob(8880304);
                        bossTop.setMinHpLimitR(66.6);
                        map.spawnMob(bossTop, 352, -2020);//Top boss

                        map.spawnMob(8880321, 352, 159);//dummy
                        map.spawnMob(8880322, 352, -2020);//dummy
                        map.spawnMob(8880325, 252, 159);//dummy
                        map.spawnMob(8880326, 252, -2020);//dummy
                        map.startEvent();
                        break;
                }
        }
}