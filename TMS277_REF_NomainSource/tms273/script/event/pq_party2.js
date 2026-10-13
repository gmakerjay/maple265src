// Created by MetaMS
// PQ:party2

let eLog = require("extend_log");

let EXIT_MAP = 100030301;

let STAGE_1 = 922010100;
let STAGE_2 = 922010400;
let STAGE_2_1 = 922010401;
let STAGE_2_2 = 922010402;
let STAGE_2_3 = 922010403;
let STAGE_2_4 = 922010404;
let STAGE_2_5 = 922010405;

let STAGE_3 = 922010600;
let STAGE_4 = 922010700;

let STAGE_5 = 922010800;
let STAGE_FINAL = 922010900;
let STAGE_BONUS = 922011000;

let party;
let members;
let endTime;
let STAGE_3_COMBO = Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");

function init(attachment) {
        party = attachment;
        event.initMap(STAGE_1, STAGE_2, STAGE_2_1, STAGE_2_2, STAGE_2_3, STAGE_2_4, STAGE_2_5, STAGE_3, STAGE_4, STAGE_5, STAGE_FINAL, STAGE_BONUS);

        members = party.getLocalMembers();

        //reset maps
        event.getMap(STAGE_1).reset();
        event.getMap(STAGE_2).reset();
        event.getMap(STAGE_2_1).reset();
        event.getMap(STAGE_2_2).reset();
        event.getMap(STAGE_2_3).reset();
        event.getMap(STAGE_2_4).reset();
        event.getMap(STAGE_2_5).reset();
        event.getMap(STAGE_3).reset();
        event.getMap(STAGE_4).reset();
        event.getMap(STAGE_4).overridePortal("next00", "ludi_s4Clear");
        event.getMap(STAGE_5).reset();
        event.getMap(STAGE_5).overridePortal("next00", "ludi_s5Clear");
        let finalMap = event.getMap(STAGE_FINAL);
        finalMap.reset();
        finalMap.spawnMob(9300012, 1081, 184);

        event.getMap(STAGE_BONUS).reset();

        for (let b = 0; b < STAGE_3_COMBO.length; b++) { //pt001
                for (var y = 0; y < 3; y++) { //stage number
                        event.setVariable("pt" + STAGE_3_COMBO[b] + "" + y + "", "0");
                }
        }
        for (let b = 0; b < STAGE_3_COMBO.length; b++) { //pt001
                let found = false;
                while (!found) {
                        for (let x = 0; x < 3; x++) {
                                if (!found) {
                                        let founded = false;
                                        for (let z = 0; z < 3; z++) { //check if any other stages have this value set already.
                                                if (event.getVariable("pt" + STAGE_3_COMBO[b] + "" + (z) + "") == null) {
                                                        event.setVariable("pt" + STAGE_3_COMBO[b] + "" + (z) + "", "0");
                                                } else if (event.getVariable("pt" + STAGE_3_COMBO[b] + "" + (z) + "").equals("1")) {
                                                        founded = true;
                                                        break;
                                                }
                                        }
                                        if (!founded && Math.random() < 0.33) {
                                                event.setVariable("pt" + STAGE_3_COMBO[b] + "" + (x) + "", "1");
                                                found = true;
                                                break;
                                        }
                                }
                        }
                }
        }

        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("achieverate", 0);
        event.setVariable("members", members);
        event.setAchieveRate(0);
        for (let i = 0; i < members.length; i++) {
                eLog.addPQLog(members[i], util, 7914, 1);
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
        switch (mob.getDataId()) {
                case 9300012:
                        event.setVariable("bossclear", true);
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
                case STAGE_2_1:
                case STAGE_2_2:
                case STAGE_2_3:
                case STAGE_2_4:
                case STAGE_2_5:
                case STAGE_3:
                case STAGE_4:
                case STAGE_5:
                case STAGE_FINAL:
                        stage.showAchieveRate(event.getAchieveRate());
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        break;
                case STAGE_BONUS:
                        stage.showAchieveRate(100);
                        stage.showTimer(60);
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
                case "clear":
                        for (let i = 0; i < members.length; i++) {
                                members[i].setEvent(null);
                                members[i].changeMap(922011100, 0);
                        }
                        event.destroyEvent();
                        break;
        }
}

function deinit() {
        for (let i = 0; i < members.length; i++)
                members[i].setEvent(null);

}