/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */
let event = ctx.getEvent("party_prison_break");
if (event != null) {
    let mapId = map.getId();
    let members = event.getVariable("members");
    switch (mapId) {
        case 921160100:
            for (let i in members) {
                members[i].changeMap(921160200, 0);
            }
            break;
        case 921160200:
            if (map.getActiveMobCount() < 1) {
                for (let i in members) {
                    members[i].changeMap(921160300, 0);
                }
            } else {
                stage.showBalloonMsg("請擊敗所有怪物", 250, 5);
            }
            break;
        case 921160400:
            if (map.getActiveMobCount() < 1) {
                for (let i in members) {
                    members[i].changeMap(921160600, 0);
                }
            } else {
                stage.showBalloonMsg("請擊敗所有怪物", 250, 5);
            }
            break;
        case 921160500:
            for (let i in members) {
                members[i].changeMap(921160600, 0);
            }
            break;
        case 921160600:
            if (stage.hasItem(4001528, 20)) {
                for (let i in members) {
                    members[i].removeItemAll(4001528);
                    members[i].changeMap(921160700, 0);
                    members[i].showBalloonMsg("終于逃出來了", 250, 5);
                }
            } else {
                stage.showBalloonMsg("請擊殺怪物獲取20把監獄鑰匙", 250, 5);
            }
            break;
    }
}