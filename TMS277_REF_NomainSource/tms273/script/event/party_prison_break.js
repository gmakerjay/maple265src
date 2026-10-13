/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

let EXIT_MAP = 100030301;

let STAGE_1 = 921160100;
let STAGE_2 = 921160200;
let STAGE_3 = 921160300;
let STAGE_3_1 = 921160310;
let STAGE_3_2 = 921160320;
let STAGE_3_3 = 921160330;
let STAGE_3_4 = 921160340;
let STAGE_3_5 = 921160350;
let STAGE_4 = 921160400;
let STAGE_5 = 921160500;
let STAGE_6 = 921160600;
let STAGE_7 = 921160700;
let party;
let members;
let endTime;
let PQLog = "prison_break";

function init(attachment) {
    party = attachment;
    members = party.getLocalMembers();
    event.getMap(STAGE_1).reset();
    event.getMap(STAGE_2).reset();
    event.getMap(STAGE_3).reset();
    event.getMap(STAGE_4).reset();
    event.getMap(STAGE_5).reset();
    event.getMap(STAGE_6).reset();
    event.getMap(STAGE_7).reset();
    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    event.setVariable("members", members);
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
    let stage = parseInt((maps.getId() - 240080000) / 100);
    switch (mob.getDataId()) {
        case 9300454:
            for (let i in members) {
                members[i].runScript("expand/menu/組隊副本獎勵/逃脫");
            }
            break;
        case 9300453: case 9300452:
            maps.dropItems(mob.getPosX(), mob.getPosY(),
                [
                    4001528, 999999]
            );
            break;

        case 8300006:
        case 8300007:
        default:
            let monster_count = maps.getActiveMobCount();
            let clear = event.getVariable("stage_" + stage + "_clear");
            if (monster_count <= 0 && (clear == null || !clear)) {
                event.setVariable("stage_" + stage + "_clear", true);
                maps.showScreenAutoLetterBox("quest/party/clear");
                maps.playSoundEffect("Party1/Clear");
            }
            break;
    }
}

function playerDisconnected(stage) {
    removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
    //TODO: is it true that even when a non-leader clicks Nella, the entire
    //party is booted? and that GMS forces party out when only two members
    //remain alive and online?
    switch (destination.getId()) {
        case STAGE_1:
        case STAGE_2:
        case STAGE_3:
        case STAGE_3_1:
        case STAGE_3_2:
        case STAGE_3_3:
        case STAGE_3_4:
        case STAGE_3_5:
        case STAGE_4:
        case STAGE_5:
        case STAGE_6:
        case STAGE_7:
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