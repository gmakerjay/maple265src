/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let EXIT_MAP = 100030301;

let STAGE_1 = 240080100;
let STAGE_2 = 240080200;
let STAGE_3 = 240080300;
let STAGE_4 = 240080400;
let STAGE_5 = 240080500;

let party;
let members;
let endTime;

function init(attachment) {
    party = attachment;
    event.initMap(STAGE_1, STAGE_2, STAGE_3, STAGE_4, STAGE_5);
    members = party.getLocalMembers();
    /* reset maps */
    event.getMap(STAGE_1).reset();
    event.getMap(STAGE_2).reset();
    event.getMap(STAGE_3).reset();
    event.getMap(STAGE_4).reset();
    event.getMap(STAGE_5).reset();
    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    event.setAchieveRate(0);
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(event);
        members[i].removeItemAll(4001022);
        members[i].removeItemAll(4001023);
        members[i].changeMap(STAGE_1, 0);
    }
}

function removePlayer(playerId, changeMap) {
    if (party.getLeaderId() == playerId) {
        for (let i = 0; i < members.length; i++) {
            members[i].setEvent(null);
            if (changeMap || members[i].getCharacterId() != playerId)
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
    } else {
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
    }
}

function mobDied(mob) {
    let maps = event.getMap(mob.getMapId());
    let stage_map = parseInt((maps.getId() - 240080000) / 100);
    switch (mob.getDataId()) {
        case 8300006:
            break;
        case 8300007:
            event.setAchieveRate(100);
            maps.playSoundEffect("quest/party/clear");
            maps.playSoundEffect("Party1/Clear");
            
            for (let i in members) {
                members[i].runScript("expand/menu/組隊副本獎勵/御龍魔")
            }
            break;
        default:
            let mobsize = maps.getActiveMobCount();
            let clear = event.getVariable(stage_map + "stageclear");
            if (mobsize <= 0 && (clear == null || !clear)) {
                event.setVariable(stage_map + "stageclear", true);
                maps.playSoundEffect("quest/party/clear");
                maps.playSoundEffect("Party1/Clear");
            }
            break;
    }
}

function playerDisconnected(stage) {
    removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
    switch (destination.getId()) {
        case STAGE_1:
        case STAGE_2:
        case STAGE_3:
        case STAGE_4:
        case STAGE_5:
            let stage_map = parseInt((destination.getId() - 240080000) / 100) - 1;
            let aRate = parseInt((stage_map / 5) * 100);
            event.setAchieveRate(aRate);
            stage.showAchieveRate(event.getAchieveRate());
            stage.showTimer((endTime - new Date().getTime()) / 1000);
            break;
        default:
            removePlayer(stage.getCharacterId(), false);
            break;
    }
}

function partyMemberDischarged(party, stage) {
    removePlayer(stage.getCharacterId(), true);
}

function timerExpired(key) {
    switch (key) {
        case "kick":
            removePlayer(party.getLeaderId(), true);
            break;
    }
}

function deinit() {
    for (let i = 0; i < members.length; i++)
        members[i].setEvent(null);
}