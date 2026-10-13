// Created by MetaMS
// Boss:Beidler

let EXIT_MAP = 863000100;
let FIELD_1 = 863010100;
let FIELD_2 = 863010500;
let FIELD_3 = 863010420;
let FIELD_4 = 863010410;
let FIELD_5 = 863010400;
let FIELD_6 = 863010320;
let FIELD_7 = 863010310;
let FIELD_8 = 863010300;
let FIELD_9 = 863010230;

let FIELD_10 = 863010220;
let FIELD_11 = 863010210;
let FIELD_12 = 863010200;

let FIELD_LARM = 863010430;
let FIELD_RARM = 863010330;
let FIELD_HIP = 863010240;
let FIELD_HEAD = 863010600;
let BONUS_MAP = 863010700;

let DIR_MAP1 = 863000900;
let DIR_MAP2 = 863000910;
let DIR_CLEAR = 863000920

let REVIVE_COUNT = 5;

let party;
let members;
let endTime;
let limitEnd;
let practiceMode;

let n = util.getScriptPath();
let ns = n.split('/')
ns = ns[ns.length - 1]
ns = ns.split('.'); 
let scriptName = ns[0]
let damageAccu={};
let damageAll = 0;
let BOSS_LOG;
function init(attachment) {
        event.initMap(FIELD_1, FIELD_2, FIELD_3, FIELD_4, FIELD_5, FIELD_6,
                FIELD_7, FIELD_8, FIELD_9, FIELD_10, FIELD_11, FIELD_12,
                FIELD_LARM, FIELD_RARM, FIELD_HIP, FIELD_HEAD, BONUS_MAP,
                DIR_MAP1, DIR_MAP2, DIR_CLEAR);
        [party, practiceMode, BOSS_LOG] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();
        event.getMap(FIELD_1).reset();
        event.getMap(FIELD_2).reset();
        event.getMap(FIELD_3).reset();
        event.getMap(FIELD_4).reset();
        event.getMap(FIELD_5).reset();
        event.getMap(FIELD_6).reset();
        event.getMap(FIELD_7).reset();
        event.getMap(FIELD_8).reset();
        event.getMap(FIELD_9).reset();
        event.getMap(FIELD_10).reset();
        event.getMap(FIELD_11).reset();
        event.getMap(FIELD_12).reset();
        event.getMap(BONUS_MAP).reset();

        let map_LRam = event.getMap(FIELD_LARM);
        map_LRam.reset();
        map_LRam.spawnMob(9390611, 85, 68);
        event.setVariable("LArm_Clear", "0");

        let map_RRam = event.getMap(FIELD_RARM);
        map_RRam.reset();
        map_RRam.spawnMob(9390610, 5, 68);
        event.setVariable("RArm_Clear", "0");

        let map_Hip = event.getMap(FIELD_HIP);
        map_Hip.reset();
        map_Hip.spawnMob(9390612, -4, 87);
        event.setVariable("Hip_Clear", "0");

        let map_Head = event.getMap(FIELD_HEAD);
        map_Head.reset();
        let head = map_Head.makeMob(9390600);
        event.setVariable("Head_Boss", head);
        map_Head.spawnMob(head, 0, 61);
        event.setVariable("Head_Enter", "0");
        checkBossCore();

        limitEnd = 0;
        event.startTimer("kick", 30 * 60 * 1000);
        event.startTimer("First_Set", 40 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("members", members);
        let mapInfo = {};
        event.setVariable("GiantBossMap", mapInfo);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].startQuest(17536, util.getStringDate("yy/MM/dd"));//Quest Name:Unknown
                members[i].startQuest(17537, "0");//Quest Name:Unknown
                /* Update Quest RecordEx | Id:17523 | Name: [培羅德]墮落的培羅德的身體上發生龜裂 | Data: "direction=2" */
                members[i].updateQuestRecordEx(17523, "direction", "2");
                if (!practiceMode) {
                        members[i].loseItem(4033981, 1);
                }
                members[i].changeMap(DIR_MAP1, 0);
                members[i].setReviveCount(REVIVE_COUNT);
                damageAccu[members[i].getCharacterId()] = 1;
                damageAll += 1;
        }
        event.setVariable('scriptName', scriptName);
        event.setVariable('bossName', BOSS_LOG);
        event.setVariable("consuming", Date.now());
        event.setVariable("single", members.length == 1);
        event.startTimer('show', 1);
}
function mobHit(player, mob, damage) { 
        damageAccu[player.getCharacterId()] += damage;
        damageAll += damage; 
}

function checkBossCore() {
        if ("0".equals(event.getVariable("Head_Enter"))) {
                let head = event.getVariable("Head_Boss");
                let core = 3;
                if ("1".equals(event.getVariable("LArm_Clear"))) {
                        core--;
                }
                if ("1".equals(event.getVariable("RArm_Clear"))) {
                        core--;
                }
                if ("1".equals(event.getVariable("Hip_Clear"))) {
                        core--;
                }
                event.setVariable("Core", core);
                head.setForcedMobStat(170 + core * 10);
                switch (core) {
                        case 0:
                                head.setPMdr(10);
                                head.changeHp(50000000);
                                break;
                        case 1:
                                head.setPMdr(15);
                                head.changeHp(3000000000);
                                break;
                        case 2:
                                head.setPMdr(150);
                                head.changeHp(75000000000);
                                break;
                        case 3:
                                head.setPMdr(250);
                                head.changeHp(350000000000);
                                break;
                }
        }
}

function calcP2BossCore(head) {
        let core = parseInt(event.getVariable("Core"));
        head.setForcedMobStat(180 + core * 10);
        switch (core) {
                case 0:
                        head.setPMdr(10);
                        head.changeHp(50000000);
                        break;
                case 1:
                        head.setPMdr(15);
                        head.changeHp(3000000000);
                        break;
                case 2:
                        head.setPMdr(150);
                        head.changeHp(75000000000);
                        break;
                case 3:
                        head.setPMdr(250);
                        head.changeHp(350000000000);
                        break;
        }
}

function calcP3BossCore(head) {
        let core = parseInt(event.getVariable("Core"));
        head.setForcedMobStat(180 + core * 10);
        switch (core) {
                case 0:
                        head.setPMdr(10);
                        head.changeHp(10000000);
                        break;
                case 1:
                        head.setPMdr(15);
                        head.changeHp(600000000);
                        break;
                case 2:
                        head.setPMdr(150);
                        head.changeHp(15000000000);
                        break;
                case 3:
                        head.setPMdr(250);
                        head.changeHp(70000000000);
                        break;
        }
}

function mobDied(mob) {
        let mapInfo = event.getVariable("GiantBossMap");
        let map = event.getMap(mob.getMapId());
        switch (mob.getDataId()) {
                case 9390600:
                        event.setVariable("Head_1", "1");
                        let headPhase2 = map.makeMob(9390601);
                        calcP2BossCore(headPhase2);
                        map.spawnMob(headPhase2, 0, 61);
                        break;
                case 9390601:
                        event.setVariable("Head_2", "1");
                        let headPhase3 = map.makeMob(9390602);
                        calcP3BossCore(headPhase3);
                        map.spawnMob(headPhase3, 0, 61);
                        for (let i = 0; i < members.length; i++) {
                                members[i].showGiantBossCountDown(100000, 100000);
                        }
                        limitEnd = new Date().getTime() + 100 * 1000;
                        event.startTimer("limit_end", 100 * 1000);
                        break;
                case 9390602:
                        event.setVariable("Head_3", "1");
                        mapInfo[mob.getMapId()] = "2";
                        event.stopTimer("limit_end");
                        event.stopTimer("kick");
                        event.startTimer("clear", 3 * 1000);
                        let core = parseInt(event.getVariable("Core"));
                        switch (core) {
                                case 0:
                                        event.getMap(BONUS_MAP).setReactorState("rank1", 1, 0);
                                        break;
                                case 1:
                                        event.getMap(BONUS_MAP).setReactorState("rank2", 1, 0);
                                        break;
                                case 2:
                                        event.getMap(BONUS_MAP).setReactorState("rank3", 1, 0);
                                        break;
                                case 3:
                                        event.getMap(BONUS_MAP).setReactorState("rank4", 1, 0);
                                        break;
                        }
                        event.startTimer("clear", 3 * 1000);
                        break;
                case 9390610:
                        map.killAllMob();
                        event.setVariable("RArm_Clear", "1");
                        mapInfo[mob.getMapId()] = "2";
                        checkBossCore();
                        break;
                case 9390611:
                        map.killAllMob();
                        event.setVariable("LArm_Clear", "1");
                        mapInfo[mob.getMapId()] = "2";
                        checkBossCore();
                        break;
                case 9390612:
                        map.killAllMob();
                        event.setVariable("Hip_Clear", "1");
                        mapInfo[mob.getMapId()] = "2";
                        checkBossCore();
                        break;
                default:
                        break;
        }
        for (let i = 0; !practiceMode && i < members.length; i++) {
                members[i].addBossClearLog(mob.getDataId());
        }
        if (map.getActiveMobCount() <= 0) {
                mapInfo[mob.getMapId()] = "2";
                event.updateGiantBossMap();
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
                case FIELD_2:
                case FIELD_3:
                case FIELD_4:
                case FIELD_5:
                case FIELD_6:
                case FIELD_7:
                case FIELD_8:
                case FIELD_9:
                case FIELD_10:
                case FIELD_11:
                case FIELD_12:
                case FIELD_LARM:
                case FIELD_RARM:
                case FIELD_HIP:
                case FIELD_HEAD:
                case BONUS_MAP:
                case DIR_MAP1:
                case DIR_MAP2:
                case DIR_CLEAR:
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        stage.showReviveCount();
                        if (limitEnd > 0) {
                                stage.showGiantBossCountDown(100000, endTime - new Date().getTime());
                        }
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
                case "First_Set":
                        for (let i = 0; i < members.length; i++) {
                                if (members[i].getMapId() == FIELD_1) {
                                        members[i].showPortalEffect("open", 1);
                                }
                        }
                        event.setVariable("First", "1");
                        break;
                case "clear":
                        event.startTimer("kick", 5 * 63 * 1000);
                        endTime = new Date().getTime() + 5 * 63 * 1000;
                        limitEnd = 0;
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(DIR_CLEAR, 0);
                        }
                        break;
                case "limit_end":
                        kick();
                        break;
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