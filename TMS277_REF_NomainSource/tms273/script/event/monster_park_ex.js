// Created by MetaMS
// Event: Monster park

let EXIT_MAP = 951000400;

let FIELD_1 = 951000300;

let members;
let endTime;
let mobList = [9801500, 9801501, 9801502, 9801503, 9801504, 9801505, 9801506, 9801507];
let posList = [
    [[-1434, -3029], [-611, -3029], [-1530, -2622], [-259, -2622]],
    [[-1223, -2144], [-339, -2144], [-1560, -1653], [-453, -1653]],
    [[-1211, -1183], [-1516, -806], [-346, -806], [-976, -501]],
    [[944, -535], [1630, -535], [2140, -1228], [1485, -919]],
    [[1309, -2393], [2267, -2393], [2584, -2838], [993, -2842]],
    [[4229, -511], [4464, -810], [3702, -1097], [4826, -1097]],
    [[3629, -1673], [4438, -1673], [3369, -2102], [4583, -2102]],
    [[3584, -2576], [4692, -2576], [4923, -3058], [4051, -3058]]
];

function init(attachment) {
    event.initMap(FIELD_1);
    party = attachment;
    members = party.getLocalMembers();
    event.getMap(FIELD_1).reset();
    event.getMap(FIELD_1).startEvent();
    for (let i = mobList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mobList[i], mobList[j]] = [mobList[j], mobList[i]];
    }
    event.startTimer("SpawnMob", 5 * 1000);
    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    let nowDate = util.getStringDate("yy/MM/dd");
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(event);
        members[i].updateQuestRecordExShare(502345, "date", nowDate);
        members[i].updateQuestRecordExShare(502345, "clear", "0");
        members[i].changeMap(FIELD_1, 0);
    }
}

function mobDied(mob) {
    switch (mob.getDataId()) {
        case 9801509://Clear
            for (let i = 0; i < members.length; i++) {
                let count = members[i].getIntQuestRecordEx(502345, "count") + 1;
                members[i].updateQuestRecordExShare(502345, "count", count);
                members[i].updateQuestRecordExShare(502345, "clear", "1");
                members[i].runScript("expand/menu/ex_獎勵");
            }
            let map = event.getMap(FIELD_1);
            map.blowWeather(5120162, "你打倒王了！我馬上送你到出口！", 10);
            event.stopTimer("kick");
            event.startTimer("kick", 3 * 1000);
            break;
    }
}

function removePlayer(playerId, changeMap) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].getCharacterId() == playerId) {
            members[i].setEvent(null);
            if (changeMap) {
                members[i].changeMap(EXIT_MAP, 0);
            }
            members.splice(i, 1);
            break;
        }
    }
    if (members.length <= 0) {
        event.destroyEvent();
    }
}

function playerDisconnected(stage) {
    removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
    switch (destination.getId()) {
        case FIELD_1:
            break;
        default:
            removePlayer(stage.getCharacterId(), false);
            break;
    }
}

function partyMemberDischarged(party, stage) {
    if (party.getLeaderId() == stage.getCharacterId()) {
        kick();
    } else {
        removePlayer(stage.getCharacterId(), true);
    }
}

function kick() {
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(null);
        members[i].changeMap(EXIT_MAP, 0);
    }
    event.destroyEvent();
}

function timerExpired(key) {
    switch (key) {
        case "SpawnMob":
            spawnMob();
            event.startTimer("SpawnMob", 3 * 1000);
            break;
        case "kick":
            kick();
            break;
    }
}

function spawnMob() {
    let map = event.getMap(FIELD_1);
    let idx = 0;
    for (let mobId of mobList) {
        let tPosList = posList[idx];
        let mSize = map.getMobCount(mobId);
        if (mSize < 15) {
            let toSpawn = 15 - mSize;
            for (let i = 0; i < toSpawn; i++) {
                let tgPos = tPosList[parseInt(Math.random() * 4)];
                map.spawnMob(mobId, tgPos[0], tgPos[1]);
            }
        }
        idx++;
    }
}

function deinit() {
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(null);
    }
}