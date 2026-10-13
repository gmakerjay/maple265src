/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let monster = require('constant/model_monster');
let acStage, maps, date;
let mobs = [];

function init(attachment) {
    [acStage, maps, mobs] = attachment;
    let map = event.getMap(maps);
    map.reset();
    event.startTimer("kick", 5 * 60 * 1000);
    acStage.showTimer(5 * 60);
    date = new Date().getTime() + 5 * 60 * 1000;
    let remonster = map.makeMob(mobs[0]);
    remonster.changeHp(mobs[1]);
    map.spawnMob(remonster, mobs[2][0], mobs[2][1]);
    acStage.setEvent(event);
    acStage.changeMap(maps, 0);
}

function mobDied(mob) {
    switch (mob.getDataId()) {
        case mobs[0]:
            let rweard = mobs[3];
            let casule = [];
            for (let i in rweard) {
                casule.push(util.makeDrop(rweard[i][0], 1, 1, rweard[i][1] * 1000, false));
            }
            acStage.dropMessage(0x16, mobs[4]);
            casule.push(util.makeDrop(mobs[4], 1, 1, 999999, true));
            event.getMap(mob.getMapId()).dropIndieItemsEx(0, mob.getPosX(), mob.getPosY(), 0, 0, 0, casule);
            event.setVariable('kill_monster', mob.getDataId());
            acStage.runScript("expand/menu/野圖頭目");
            break;
    }
}

function playerDisconnected(stage) {
    stage.setEvent(null);
    stage.changeMap(100000000, 0);
    event.destroyEvent();
}

function kick() {
    acStage.setEvent(null);
    acStage.changeMap(100000000, 0);
    event.destroyEvent();
}

function playerChangedMap(stage, destination) {
    if (stage.getMapId() !== maps) {
        event.stopTimers();
        stage.setEvent(null);
        event.destroyEvent();
    } else {
        event.getMap(stage.getMapId()).blowWeather(5120146, "你擁有 5 分鐘時間擊殺野外頭目！", 5);
        stage.showTimer((date - new Date().getTime()) / 1000);
    }
}