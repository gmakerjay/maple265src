// Created by MetaMS
// PQ:prison break

let eLog = require("extend_log");

let EXIT_MAP = 921160000;

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

function init(attachment) {
        party = attachment;
        event.initMap(STAGE_1, STAGE_2, STAGE_3, STAGE_3_1, STAGE_3_2, STAGE_3_3, STAGE_3_4, STAGE_3_5, STAGE_4, STAGE_5, STAGE_6);

        members = party.getLocalMembers();

        //reset maps
        event.getMap(STAGE_1).reset();
        event.getMap(STAGE_2).reset();
        event.getMap(STAGE_3).reset();
        event.getMap(STAGE_3_1).reset();
        event.getMap(STAGE_3_2).reset();
        event.getMap(STAGE_3_3).reset();
        event.getMap(STAGE_3_4).reset();
        event.getMap(STAGE_3_5).reset();
        event.getMap(STAGE_4).reset();
        event.getMap(STAGE_5).reset();
        event.getMap(STAGE_6).reset();
        event.getMap(STAGE_7).reset();

        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                eLog.addPQLog(members[i], util, 7928, 1);
                members[i].setEvent(event);
                members[i].removeItemAll(4001528);
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
        let nMap = event.getMap(mob.getMapId());
        let stage = parseInt(nMap.getId() / 100 % 10);
        switch (mob.getDataId()) {
                case 8300006:
                case 8300007:
                default:
                        let mobsize = nMap.getActiveMobCount();
                        let clear = event.getVariable(stage + "stageclear");
                        if (mobsize <= 0 && (clear == null || !clear)) {
                                event.setVariable(stage + "stageclear", true);
                                nMap.showScreenAutoLetterBox("quest/party/clear");
                                nMap.playSoundEffect("Party1/Clear");
                        }
                        break;
        }
}

function reactorClick(map, reactorName) {
        switch (reactorName) {
                case "key1":
                case "key2":
                case "key3":
                case "key4":
                        let key1 = map.getReactorState("key1");
                        let key2 = map.getReactorState("key2");
                        let key3 = map.getReactorState("key3");
                        let key4 = map.getReactorState("key4");
                        if (key1 == 1 && key2 == 1 && key3 == 1 && key4 == 1) {
                                map.showScreenAutoLetterBox("quest/party/clear");
                                map.playSoundEffect("Party1/Clear");
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
                case STAGE_3_1:
                case STAGE_3_2:
                case STAGE_3_3:
                case STAGE_3_4:
                case STAGE_3_5:
                case STAGE_4:
                case STAGE_5:
                case STAGE_6:
                case STAGE_7:
                        let phase = parseInt(destination.getId() / 100 % 10) - 1;
                        let aRate = phase * 100 / 7;
                        stage.showAchieveRate(aRate);
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
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}