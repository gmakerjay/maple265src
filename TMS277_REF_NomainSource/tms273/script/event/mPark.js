/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
let EXIT_MAP = 951000000;
let party, startMapId, members, endTime, level;

function init(attachment) {
    [party, startMapId, level] = attachment;
    for (let i = 0; i < 6; i++) {
        let field = event.initMap(startMapId + (i * 100));
        let maps = event.getMap(startMapId + (i * 100));
        maps.reset();
        maps.setSpawnStop(false);
        event.setVariable("map" + i, startMapId + (i * 100));
    }
    members = party.getLocalMembers();
    event.setVariable("BASE_EXP", 550);
    event.setVariable("BASE_LEVEL", level);
    event.setVariable("TOTAL_EXP", 0);

    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    event.setVariable("members", members);
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(event);
        members[i].changeMap(startMapId, 0);
    }
}

function mobDied(mob) {
    let baseLevel = parseFloat(event.getVariable("BASE_LEVEL"));
    let totalEXP = parseFloat(event.getVariable("TOTAL_EXP"));
    let baseEXP = parseFloat(event.getVariable("BASE_EXP"));
    totalEXP = baseEXP * baseLevel * members.length + totalEXP;
    event.setVariable("TOTAL_EXP", totalEXP);
    let idx = parseInt(mob.getMapId() % 1000 / 100);
    let nMap = event.getMap(event.getVariable("map" + idx));
    if (nMap != null) {
        for (let i in members) {
            members[i].showWeatherEffectNotice("當前累計獲得" + totalEXP + "經驗!", 0xD1, 2000, true);
        }
        switch (mob.getDataId()) {
            default:
                let mobsize = nMap.getActiveMobCount();
                if (mobsize <= 0) {
                    event.setVariable("Kill" + idx, true);
                    nMap.showScreenAutoLetterBox("monsterPark/clear");
                }
                break;
        }
    }
}

function removePlayer(playerId, changeMap) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].getCharacterId() == playerId) {
            //dissociate event before changing map so playerChangedMap is
            //not called and this method is not called again by the player
            members[i].setEvent(null);
            if (changeMap)
                members[i].changeMap(EXIT_MAP, 0);
            //collapse the members array so we don't accidentally warp
            //this member again if the leader leaves later.
            members.splice(i, 1);
            break;
        }
    }
    if (members.length <= 0) {
        event.destroyEvent();
    }
}

function playerDisconnected(stage) {
    //changeMap is false since all PQ maps force return the player to the exit
    //map on his next login anyway, and we don't want to deal with sending
    //change map packets to a disconnected client
    removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
    if (parseInt(destination.getId() / 10000) != parseInt(startMapId / 10000))
        removePlayer(stage.getCharacterId(), false);
    else
        stage.showTimer((endTime - new Date().getTime()) / 1000);
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
        case "kick":
            kick();
            break;
    }
}

function deinit() {
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(null);
    }
}