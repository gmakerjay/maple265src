// Created by MetaMS
// ID:[450010500]
// MapName:慾望祭壇

let partyBoss = require("party_boss");

let BOSS_TYPE = partyBoss.JinHillah;
let SEL_IDX = 0;

let EXIT_MAP = 450011990;

let PHASE_1_DIR = 450010900;
let PHASE_1 = 450010930;
let PHASE_2 = 450010950;

let REVIVE_COUNT = 5;

let party;
let members;
let endTime;
let game = {
    starttime: Date.now(),
    combination: [],
    injury: 0
}

function init(attachment) {
    event.initMap(PHASE_1_DIR, PHASE_1, PHASE_2);
    party = attachment;
    members = party.getLocalMembers();
    event.getMap(PHASE_1).reset();
    event.getMap(PHASE_2).reset();
    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    event.setVariable("members", members);
    event.startTimer("signal", 5 * 1000);
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(event);
        //members[i].addBossEnterLog(BOSS_TYPE, SEL_IDX);
        members[i].changeMap(PHASE_1_DIR, 0);
        members[i].setReviveCount(REVIVE_COUNT);
        game.combination[members[i]['characterId']] = 0;
    }
}

function mobDied(mob) {
    switch (mob.getDataId()) {
        case 8880405:
            event.getMap(PHASE_1).killAllMob();
            event.getMap(PHASE_1).endEvent();
            event.startTimer("Phase1_End", 5 * 1000);
            event.setVariable("game_date", game.starttime);
            var games = [];
            for (player of members) {
                games.push([player['characterId'], player['characterName'], game.combination[player['characterId']]]);
            }
            event.setVariable("games", games);
            event.setVariable("injury", game.injury);
            break;
        case 8950120:
            for (let i = 0; i < members.length; i++) {
                members[i].runScript("expand/allegation");
            }
            break;
    }
}

function mobHit(stage, mob, damage) {
    var mobs = [8880405];
    if (mobs.indexOf(mob.getDataId()) > -1) {
        game.injury += damage;
        game.combination[stage['characterId']] += damage;
    }
}

function removePlayer(playerId, changeMap) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].getCharacterId() == playerId) {
            //dissociate event before changing map so playerChangedMap is
            //not called and this method is not called again by the player
            members[i].setEvent(null);
            members[i].cancelBuffStat(80002404);
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
    switch (destination.getId()) {
        case PHASE_1_DIR:
        case PHASE_1:
        case PHASE_2:
            //player.startQuest(7004, 0, "21/10/19");//Quest Name:Unknown
            //stage.startQuest(7004, 0, "1");//Quest Name:Unknown
            stage.showTimer((endTime - new Date().getTime()) / 1000);
            break;
        default:
            //player died and respawned or clicked Nella to leave PQ
            //changeMap is false so player doesn't get re-warped to exit map
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
        //dissociate event before changing map so playerChangedMap is not
        //called and this method is not called again by the player
        members[i].setEvent(null);
        members[i].cancelBuffStat(80002404);
        members[i].changeMap(EXIT_MAP, 0);
    }
    event.destroyEvent();
}

function timerExpired(key) {
    switch (key) {
        case "Phase1_End":
            for (let i = 0; i < members.length; i++) {
                members[i].changeMap(PHASE_2, 0);
            }
            break;
        case "kick":
            kick();
            break;
        case "signal":
            signal();
            break;
    }
}

function signal() {
    let maps = [PHASE_1, PHASE_2];
    let txt = "";
    for (let i in members) {
        let damage_pro = (game.combination[members[i]['characterId']] / game.injury * 100).toFixed(2);
        txt += members[i].getCharacterName() + " " + (damage_pro == "NaN" ? 0 : damage_pro) + " % ";
    }
    for (let i in maps) {
        let signalnaps = event.getMap(maps[i]);
        signalnaps.showSystemMessage(txt);
    }
    event.startTimer("signal", 5 * 1000);
}

function deinit() {
    event.getMap(PHASE_1).endEvent();
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(null);
    }
}