// Created by MetaMS
// ID:[410007025]
// MapName:四季停駐的樓閣

let EXIT_MAP = 410007025;

let SEL_FIELD = 410008600;
let GOONGI_FIELD_DIR = 410008620;
let GOONGI_FIELD = 410008640

let DOOL_FIELD_DIR = 410008660;
let DOOL_FIELD = 410008680;

let HONDON_FIELD_DIR = 410008700;
let HONDON_FIELD = 410008720;

let KARING_FIELD_DIR = 410008740;
let KARING_FIELD = 410008760;

let KARING2_FIELD_DIR = 410008780;
let KARING2_FIELD = 410008800;

let CLEAR_FIELD = 410008820;

let party;
let members;
let endTime;
let practiceMode;

let LOG_BOSS = 8880972;
let clear = false;
var BOSS_LOG;
let damageAccu={}
let damageAll = 0;
function init(attachment) {
        event.initMap(SEL_FIELD, GOONGI_FIELD_DIR, GOONGI_FIELD, DOOL_FIELD_DIR, DOOL_FIELD, HONDON_FIELD_DIR, HONDON_FIELD, KARING_FIELD_DIR, KARING_FIELD, KARING2_FIELD_DIR, KARING2_FIELD, CLEAR_FIELD);
        event.initKaringEvent();
        [party, practiceMode, BOSS_LOG] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();
        event.getMap(GOONGI_FIELD).reset();
        event.getMap(DOOL_FIELD).reset();
        event.getMap(HONDON_FIELD).reset();
        event.getMap(KARING_FIELD).reset();
        event.getMap(KARING2_FIELD).reset();
        event.getMap(CLEAR_FIELD).reset();

        event.setVariable("Clear_B1", "0");
        event.setVariable("Clear_B2", "0");
        event.setVariable("Clear_B3", "0");
        event.setVariable("Fail", "0");

        event.startTimer("select", 5 * 60 * 1000);
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                if (!practiceMode) {
                        members[i].setEnterBoss(LOG_BOSS);
                        event.registerUser(members[i].getCharacterId());
                }
                members[i].setEvent(event);
                members[i].changeMap(SEL_FIELD, 0);
                damageAccu[members[i].getCharacterId()] = 1;
                damageAll += 1; 
        }
        event.startTimer("show", 1 * 1000);
}
function mobHit(player, mob, damage) {
    for (let i = 0; i < damageAccu.length; i++) {
            if (damageAccu[i][0] === player.getCharacterId()) {
                    damageAccu[i][1] += damage;
                    damageAll += damage;
                    break;
            }
    }
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 8880960:
                        event.setVariable("Clear_B1", "1");
                        event.stopTimer("CheckStage");
                        event.startTimer("CheckStage", 3 * 1000);
                        event.getMap(GOONGI_FIELD).killAllMob();
                        event.getMap(GOONGI_FIELD).setReactorState("doolPt", 1, 0);
                        event.getMap(GOONGI_FIELD).setReactorState("hondonPt", 1, 0);
                        break;
                case 8880961:
                        event.setVariable("Clear_B2", "1");
                        event.stopTimer("CheckStage");
                        event.startTimer("CheckStage", 3 * 1000);
                        event.getMap(DOOL_FIELD).killAllMob();
                        event.getMap(DOOL_FIELD).setReactorState("goongiPt", 1, 0);
                        event.getMap(DOOL_FIELD).setReactorState("hondonPt", 1, 0);
                        break;
                case 8880962:
                        event.setVariable("Clear_B3", "1");
                        event.stopTimer("CheckStage");
                        event.startTimer("CheckStage", 3 * 1000);
                        event.getMap(HONDON_FIELD).killAllMob();
                        event.getMap(HONDON_FIELD).setReactorState("goongiPt", 1, 0);
                        event.getMap(HONDON_FIELD).setReactorState("doolPt", 1, 0);
                        break;
                case 8880967:
                        event.getMap(KARING_FIELD).killAllMob();
                        event.getMap(KARING_FIELD).endEvent();
                        event.startTimer("Phase2_End", 5 * 1000);
                        break;
                case 8880972:
                        clear = true;
                        event.getMap(KARING2_FIELD).killAllMob();
                        event.stopTimer("kick");
                        event.startTimer("kick", 5 * 60 * 1000);
                        endTime = new Date().getTime() + 5 * 60 * 1000;
                        event.startTimer("Phase3_End", 12 * 1000);
                        event.setVariable('bossName', BOSS_LOG);
                         
                        let sortList = [];
                        event.setVariable('single', members.length == 1)

                        for (let i = 0; i < members.length; i++) {
                                let p_id = members[i].getCharacterId();
                                let per = (damageAccu[p_id] / damageAll).toFixed(4);
                                let info = [members[i].getCharacterId(), members[i].getCharacterName(), per];
                                event.setVariable(`info-${p_id}`, info)
                                sortList.push([members[i].getCharacterId(), members[i].getCharacterName(), per])
                        }
                        sortList.sort((a, b) => b[2] - a[2]);



                        util.broadcastWorldChatMsg(1, BOSS_LOG + `${practiceMode ? '[練習模式]' : ''} 傷害排行：`);
                        for (let i in sortList) {
                                util.broadcastWorldChatMsg(1, `第${Number(i) + 1}名: ${sortList[i][1]} ${sortList[i][2] * 100} %`);
                        }
 


                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId()); 
                                if (!practiceMode) {
                                        members[i].runScript('boss/clear');
                                }
                        }
                        break;
                case 8880975:
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                        break;
        }
}

function playerDied(stage, map) {
        event.updateKaringEvent();
}

function playerHurt(stage, damage) {
        event.updateKaringEvent();
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
                case SEL_FIELD:
                        stage.showTimer(true, 1800, 305);
                        break;
                case GOONGI_FIELD_DIR:
                case GOONGI_FIELD:
                case DOOL_FIELD_DIR:
                case DOOL_FIELD:
                case HONDON_FIELD_DIR:
                case HONDON_FIELD:
                case KARING_FIELD_DIR:
                case KARING_FIELD:
                case KARING2_FIELD_DIR:
                case KARING2_FIELD:
                case CLEAR_FIELD:
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
                members[i].revival(100);
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "end_select":
                        event.startTimer("kick", 30 * 60 * 1000);
                        endTime = new Date().getTime() + 30 * 60 * 1000;
                        event.stopTimer("select");
                        break;
                case "select":
                        event.startTimer("kick", 30 * 60 * 1000);
                        endTime = new Date().getTime() + 30 * 60 * 1000;
                        for (let i = 0; i < members.length; i++) {
                                let stage = members[i];
                                if (i % 3 == 2) {
                                        stage.changeMap(GOONGI_FIELD_DIR, 0);
                                } else if (i % 3 == 1) {
                                        stage.changeMap(DOOL_FIELD_DIR, 0);
                                } else {
                                        stage.changeMap(HONDON_FIELD_DIR, 0);
                                }
                        }
                        break;
                case "CheckStage":
                        let clearB1 = "1".equals(event.getVariable("Clear_B1"));
                        let clearB2 = "1".equals(event.getVariable("Clear_B2"));
                        let clearB3 = "1".equals(event.getVariable("Clear_B3"));
                        let toChangeMap = 0;
                        if (!clearB3) {
                                toChangeMap = HONDON_FIELD
                        }
                        if (!clearB2) {
                                toChangeMap = DOOL_FIELD
                        }
                        if (!clearB1) {
                                toChangeMap = GOONGI_FIELD
                        }
                        if (clearB3 && clearB2 && clearB1) {
                                for (let i = 0; i < members.length; i++) {
                                        let stage = members[i];
                                        stage.changeMap(KARING_FIELD_DIR, 0);
                                }
                        }
                        break;
                case "Phase2_End":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(KARING2_FIELD_DIR, 0);
                        }
                        break;
                case "Phase3_End":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(CLEAR_FIELD, 0);
                        }
                        break;
                case "Event_Fail":
                        if ("0".equals(event.getVariable("Fail"))) {
                                event.getMap(GOONGI_FIELD).endEvent();
                                event.getMap(DOOL_FIELD).endEvent();
                                event.getMap(HONDON_FIELD).endEvent();
                                event.getMap(KARING_FIELD).endEvent();
                                event.getMap(KARING2_FIELD).endEvent();
                                event.setVariable("Fail", "1");
                                event.stopTimer("kick");
                                event.startTimer("kick", 5 * 1000);
                                endTime = new Date().getTime() + 5 * 1000;
                                for (let i = 0; i < members.length; i++) {
                                        members[i].showTimer(5);
                                }
                        }
                        break;
                case "kick":
                        kick();
                        break;
                case "show":
                        for (let i in damageAccu) {
                                let m = members.find(m => m.getCharacterId() == i);
                                if (m) { 
                                        m.showSystemMessage(`傷害比例: ${(100 * (damageAccu[i] / damageAll)).toFixed(1)} %`)
                                }
                        }
                        event.startTimer('show', 5 * 1000);
                        break;
        }
}

function deinit() {
        event.getMap(GOONGI_FIELD).endEvent();
        event.getMap(DOOL_FIELD).endEvent();
        event.getMap(HONDON_FIELD).endEvent();
        event.getMap(KARING_FIELD).endEvent();
        event.getMap(KARING2_FIELD).endEvent();
        event.getMap(CLEAR_FIELD).endEvent();

        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
        if (!practiceMode) {
                event.updateAllUserBossClear(LOG_BOSS, clear);
        }
}