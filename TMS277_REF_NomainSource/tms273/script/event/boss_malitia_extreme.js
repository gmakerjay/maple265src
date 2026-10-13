// Created by MetaMS
// ID:[875033004]
// MapName:紅月暗影籠罩的入口
// Quest:

let EXIT_MAP = 875033004;

let PHASE_1_DIR = 875031000;
let PHASE_1_A = 875031100;
let PHASE_1_B = 875031200;
let PHASE_2_DIR = 875031300;
let PHASE_2 = 875031400;
let PHASE_2_DIR2 = 875031500;
let PHASE_3_DIR = 875031600;
let PHASE_3 = 875031700;
let PHASE_4 = 875031800;

let REVIVE_COUNT = 5;

let party;
let members;
let endTime;
let practiceMode;

let LOG_BOSS = -1;
let clear = false;

function init(attachment) {
        event.initMap(PHASE_1_DIR, PHASE_1_A, PHASE_1_B, PHASE_2_DIR, PHASE_2, PHASE_2_DIR2, PHASE_3_DIR, PHASE_3, PHASE_4);
        [party, practiceMode] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();

        event.getMap(PHASE_1_A).setOverrideFirstEnter("malitia_extreme_1phase_A");
        event.getMap(PHASE_1_B).setOverrideFirstEnter("malitia_extreme_1phase_B");
        event.getMap(PHASE_2).setOverrideFirstEnter("malitia_extreme_2phase");
        event.getMap(PHASE_3).setOverrideFirstEnter("malitia_extreme_3phase");
        event.getMap(PHASE_4).setOverrideFirstEnter("malitia_extreme_reward");

        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                if (!practiceMode) {
                        //members[i].setEnterBoss(LOG_BOSS);
                        event.registerUser(members[i].getCharacterId());
                }
                members[i].setEvent(event);
                members[i].changeMap(PHASE_1_DIR, 0);
                members[i].setReviveCount(REVIVE_COUNT);
        }
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 9602526://9602523
                        event.getMap(PHASE_1_A).killAllMob();
                        event.getMap(PHASE_1_A).endEvent();
                        event.getMap(PHASE_1_B).endEvent();
                        event.startTimer("To_2Phase", 3000);
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                        break;
                case 9602528:
                        event.startTimer("To_2Phase_2", 5000);
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                        break;
                case 9602532:
                        event.startTimer("To_3Phase", 5000);
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                        break;
                case 9602533:
                        event.startTimer("To_4Phase", 5000);
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                case 9602535:
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                        break;
        }
}

function removePlayer(playerId, changeMap) {
        for (let i = 0; i < members.length; i++) {
                if (members[i].getCharacterId() == playerId) {
                        //dissociate event before changing map so playerChangedMap is
                        //not called and this method is not called again by the player
                        members[i].setEvent(null);
                        if (changeMap) {
                                members[i].changeMap(EXIT_MAP, 0);
                        }
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
                case PHASE_1_A:
                case PHASE_1_B:
                case PHASE_2_DIR:
                case PHASE_2:
                case PHASE_2_DIR2:
                case PHASE_3_DIR:
                case PHASE_3:
                case PHASE_4:
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
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
                //dissociate event before changing map so playerChangedMap is not
                //called and this method is not called again by the player
                members[i].setEvent(null);
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "1Phase_Boss_Next":
                        event.setVariable("P1_Next", "1");
                        break;
                case "To_2Phase":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_2_DIR, 0);
                        }
                        break;
                case "To_2Phase_2":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_2_DIR2, 0);
                        }
                        event.startTimer("2Phase_Reset", 500);
                        break;
                case "2Phase_Reset":
                        event.getMap(PHASE_2).reset();
                        event.getMap(PHASE_2).startEvent();
                        break;
                case "To_3Phase":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_3_DIR, 0);
                        }
                        event.getMap(PHASE_2).endEvent();
                        break;
                case "To_4Phase":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_4, 0);
                        }
                        event.getMap(PHASE_3).endEvent();
                        break;
                case "kick":
                        kick();
                        break;
        }
}

function deinit() {
        event.getMap(PHASE_1_A).endEvent();
        event.getMap(PHASE_1_B).endEvent();
        event.getMap(PHASE_2).endEvent();
        event.getMap(PHASE_3).endEvent();
        event.getMap(PHASE_4).endEvent();

        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
        if (!practiceMode) {
                event.updateAllUserBossClear(LOG_BOSS, clear);
        }
}