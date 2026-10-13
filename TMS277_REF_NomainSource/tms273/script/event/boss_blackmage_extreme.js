// Created by MetaMS
// ID:[450012500]
// MapName:巨人的心臟
// 巨人的心臟

let EXIT_MAP = 450012500;

let PHASE_1_DIR = 450013900;
let PHASE_1 = 450013910;

let PHASE_2_DIR = 450013920;
let PHASE_2 = 450013930;

let PHASE_3_DIR = 450013940;
let PHASE_3 = 450013950;

let PHASE_4_DIR = 450013960;
let PHASE_4 = 450013970;

let PHASE_Final = 450013980;

let REVIVE_COUNT = 12;

let party;
let members;
let endTime;
let practiceMode;

let LOG_BOSS = 8880549;
let clear = false;

var BOSS_LOG;
let damageAccu={}
let damageAll = 0;
function init(attachment) {
        event.initMap(PHASE_1_DIR, PHASE_1, PHASE_2_DIR, PHASE_2, PHASE_3_DIR, PHASE_3, PHASE_4_DIR, PHASE_4, PHASE_Final);
        [party, practiceMode, BOSS_LOG] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();
        event.getMap(PHASE_1).reset();
        event.getMap(PHASE_2).reset();
        event.getMap(PHASE_3).reset();
        event.getMap(PHASE_4).reset();
        event.getMap(PHASE_Final).reset();
        event.startTimer("kick", 60 * 60 * 1000);
        endTime = new Date().getTime() + 60 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                if (!practiceMode) {
                        members[i].loseItem(4001895, 1);
                        members[i].setEnterBoss(LOG_BOSS);
                        event.registerUser(members[i].getCharacterId());
                }
                members[i].changeMap(PHASE_1_DIR, 0);
                members[i].setReviveCount(REVIVE_COUNT);
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
                case 8880535:
                        event.getMap(PHASE_1).endEvent();
                        event.getMap(PHASE_1).killMob(8880530);
                        event.getMap(PHASE_1).killMob(8880531);
                        event.startTimer("Phase1_End", 4 * 1000);
                        break;
                case 8880532:
                        event.getMap(PHASE_2).endEvent();
                        event.getMap(PHASE_2).killMob(8880546);
                        event.startTimer("Phase2_End", 4 * 1000);
                        break;
                case 8880533:
                        event.getMap(PHASE_3).endEvent();
                        event.startTimer("Phase3_End", 4 * 1000);
                        break;
                case 8880549:
                        clear = true;
                        event.getMap(PHASE_4).endEvent();
                        event.getMap(PHASE_4).killMob(8880534);
                        event.startTimer("Phase4_End", 4 * 1000);
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
                case 8880548:
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
                case PHASE_1:
                case PHASE_2_DIR:
                case PHASE_2:
                case PHASE_3_DIR:
                case PHASE_3:
                case PHASE_4_DIR:
                case PHASE_4:
                case PHASE_Final:
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        stage.showReviveCount();
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
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "Phase1_End":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_2_DIR, 0);
                        }
                        break;
                case "Phase2_End":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_3_DIR, 0);
                        }
                        break;
                case "Phase3_End":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_4_DIR, 0);
                        }
                        break;
                case "Phase4_End":
                        event.startTimer("kick", 5 * 60 * 1000);
                        endTime = new Date().getTime() + 5 * 60 * 1000;
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_Final, 0);
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
        event.getMap(PHASE_1).endEvent();
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