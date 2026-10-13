// Created by MetaMS
// Event: Annual Shooting

let EXIT_MAP = 867168000;

let FIELD = 867168300

let actStage;
let endTime;
let count;


function init(attachment) {
        actStage = attachment;
        count = 0;
        event.initMap(FIELD);
        event.getMap(FIELD).reset();
        event.startTimer("kick", 2 * 60 * 1000);
        event.startTimer("Start", 3500);
        actStage.setEvent(event);
        actStage.changeMap(FIELD, 0);
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 9602085:
                case 9602086:
                case 9602087:
                case 9602088:
                        let kill = actStage.getIntQuestRecordEx(504629, "kill") + 1;
                        /* Update Quest RecordEx | Id:504629 | Name: Unknown | Data: "date=241113;enter=1;R=1;clear=0;kill=15" */
                        actStage.updateQuestRecordEx(504629, "kill", kill);
                        break;
        }
}

function removePlayer(playerId, changeMap) {
        actStage.setEvent(null);
        if (changeMap) {
                actStage.changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function playerDisconnected(stage) {
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case FIELD:
                        break;
                default:
                        removePlayer(stage.getCharacterId(), false);
                        break;
        }
}

function kick() {
        actStage.setEvent(null);
        actStage.changeMap(EXIT_MAP, 0);
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "kick":
                        kick();
                        break;
                case "Start":
                        event.getMap(FIELD).startEvent();
                        event.startTimer("CheckAction", 3 * 1000);
                        break;
                case "MobTimeOut":
                        count++;
                        event.getMap(FIELD).killAllMob();
                        if (count < 10) {
                                event.startTimer("CheckAction", 1000);
                        } else {
                                event.stopTimer("kick");
                                event.startTimer("end", 1000);
                                event.startTimer("kick", 5000);
                        }
                        break;
                case "CheckAction":
                        spawnMob();
                        event.getMap(FIELD).checkAction();
                        event.startTimer("MobTimeOut", 4 * 1000);
                        break;
                case "end":
                        event.getMap(FIELD).endEvent();
                        actStage.updateQuestRecordEx(504629, "R", "1");
                        actStage.updateQuestRecordEx(504629, "clear", "1");
                        actStage.updateQuestRecordEx(504629, "enter", "0");
                        break;
        }
}

function spawnMob() {
        let pos = [
                [-314, -333], [-170, -319], [-110, -319], [120, -319], [215, -325],
                [292, -325], [-95, -226], [29, -214], [133, -234], [-279, -146],
                [-200, -146], [-97, -156], [100, -153], [183, -153], [310, -153]
        ];


        let field = event.getMap(FIELD);
        let max = 15;
        let rng = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < rng; i++) {
                let randomIndex = Math.floor(Math.random() * pos.length);
                let randomPos = pos[randomIndex];
                pos.splice(randomIndex, 1);
                let tt = Math.floor(Math.random() * 4);
                let mobRng = 9602085 + tt;
                let mob = field.makeMob(mobRng);
                mob.setAppearType(-20022 - tt);
                field.spawnMob(mob, randomPos[0], randomPos[1]);
        }
        let rCount = max - rng;
        for (let i = 0; i < rCount; i++) {
                let randomIndex = Math.floor(Math.random() * pos.length);
                let randomPos = pos[randomIndex];
                pos.splice(randomIndex, 1);
                let tt = Math.floor(Math.random() * 4);
                let mobRng = 9602079 + tt;
                let mob = field.makeMob(mobRng);
                mob.setAppearType(-20016 - tt);
                field.spawnMob(mob, randomPos[0], randomPos[1]);
        }
}

function deinit() {
        actStage.setEvent(null);
}