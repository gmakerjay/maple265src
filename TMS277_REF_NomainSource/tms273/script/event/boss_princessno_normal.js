// Created by MetaMS
// Boss:Arayrum

let EXIT_MAP = 811000999;
let FIELD_1 = 811000100;
let FIELD_2 = 811000200;
let FIELD_3 = 811000300;
let FIELD_4 = 811000400;
let FIELD_5 = 811000500;
let REVIVE_COUNT = 5;

let party;
let members;
let endTime;
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
        event.initMap(FIELD_1, FIELD_2, FIELD_3, FIELD_4, FIELD_5);
        [party, practiceMode, BOSS_LOG] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();
        event.getMap(FIELD_1).reset();
        event.getMap(FIELD_2).reset();
        event.getMap(FIELD_3).reset();
        event.getMap(FIELD_4).reset();
        event.getMap(FIELD_5).reset();
        event.getMap(FIELD_5).spawnNpc(9130110, 533, -467, 1);
        event.getMap(FIELD_5).spawnNpc(9130113, -544, -486, 1);
        event.getMap(FIELD_5).spawnNpc(9130111, -453, -681, 1);
        event.getMap(FIELD_5).spawnNpc(9130114, 446, -688, 1);
        event.getMap(FIELD_5).spawnNpc(9130112, -2, -801, 1);

        event.getMap(FIELD_5).spawnMob(9450022, -8, -205);

        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].changeMap(FIELD_1, 0);
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

function mobDied(mob) {
        let map = event.getMap(mob.getMapId());
        switch (mob.getMapId()) {
                case FIELD_1:
                        if (map.getActiveMobCount() <= 0) {
                                if (!"done".equals(event.getVariable("stage1_mob"))) {
                                        event.setVariable("stage1_mob", "done");
                                        map.showScriptProgressMsg("出現濃姬的召喚獸.");
                                        map.spawnMob(9450004, 354, -562);
                                }
                        }
                        if (mob.getDataId() == 9450004) {
                                map.showScreenAutoLetterBox("monsterPark/clear");
                                map.showObjectEffect("Pt01gate");
                        }
                        break;
                case FIELD_2:
                        if (map.getActiveMobCount() <= 0) {
                                if (!"done".equals(event.getVariable("stage2_mob1"))) {
                                        event.setVariable("stage2_mob1", "done");
                                        map.showScriptProgressMsg("召喚了被魔法師的氣息弱化的織田軍的劍兵。");
                                        for (let i = 0; i < 8; i++) {
                                                map.spawnMob(9450006, -348, -4);
                                        }
                                } else if (!"done".equals(event.getVariable("stage2_mob2"))) {
                                        event.setVariable("stage2_mob2", "done");
                                        map.showScriptProgressMsg("召喚了被弓手的氣息弱化的織田軍的劍兵。");
                                        for (let i = 0; i < 8; i++) {
                                                map.spawnMob(9450007, 393, -147);
                                        }
                                } else if (!"done".equals(event.getVariable("stage2_mob3"))) {
                                        event.setVariable("stage2_mob3", "done");
                                        map.showScriptProgressMsg("召喚了被盜賊的氣息弱化的織田軍的劍兵。");
                                        for (let i = 0; i < 8; i++) {
                                                map.spawnMob(9450008, -298, -298);
                                        }
                                } else if (!"done".equals(event.getVariable("stage2_mob4"))) {
                                        event.setVariable("stage2_mob4", "done");
                                        map.showScriptProgressMsg("召喚了被海賊的氣息弱化的織田軍的劍兵。");
                                        for (let i = 0; i < 8; i++) {
                                                map.spawnMob(9450009, 367, -497);
                                        }
                                } else if (!"done".equals(event.getVariable("stage2_mob5"))) {
                                        event.setVariable("stage2_mob5", "done");
                                        map.showScriptProgressMsg("為了要到上一層，需要擊敗蓮華!");
                                        map.spawnMob(9450010, 354, -562);
                                }
                        }
                        if (mob.getDataId() == 9450010) {
                                map.showScreenAutoLetterBox("monsterPark/clear");
                                map.showObjectEffect("Pt01gate");
                        }
                        break;
                case FIELD_3:
                        if (map.getActiveMobCount() <= 0) {
                                if (!"done".equals(event.getVariable("stage3_mob"))) {
                                        event.setVariable("stage3_mob", "done");
                                        map.showScriptProgressMsg("在1分間，請守住不要讓翁拉將軍的召喚獸破壞封印具。每破壞一個封印具，翁拉將軍會變強壯。");
                                        map.spawnMob(9450013, 45, -262);
                                        map.spawnMob(9450012, -430, -262);
                                        for (let i = 0; i < 5; i++) {
                                                map.spawnMob(9450011, -430, -262);
                                        }
                                        map.spawnMob(9450012, 490, -262);
                                        for (let i = 0; i < 5; i++) {
                                                map.spawnMob(9450011, 490, -262);
                                        }
                                        map.spawnMob(9450012, -430, -27);
                                        for (let i = 0; i < 5; i++) {
                                                map.spawnMob(9450011, -430, -27);
                                        }
                                        map.spawnMob(9450012, 45, -27);
                                        for (let i = 0; i < 5; i++) {
                                                map.spawnMob(9450011, 45, -27);
                                        }
                                        map.spawnMob(9450012, 490, -27);
                                        for (let i = 0; i < 5; i++) {
                                                map.spawnMob(9450011, 490, -27);
                                        }
                                        event.startTimer("Acton_Stage3", 60 * 1000);
                                }
                        }
                        if (mob.getDataId() == 9450014) {
                                map.showScreenAutoLetterBox("monsterPark/clear");
                                map.showObjectEffect("Pt01gate");
                        }
                        break;
                case FIELD_4:
                        if (map.getActiveMobCount() <= 0) {
                                if (!"done".equals(event.getVariable("stage4_mob"))) {
                                        event.setVariable("stage4_mob", "done");
                                        map.showScriptProgressMsg("彌弄矩出現了，請小心。");
                                        map.spawnMob(9450020, 380, -134);
                                }
                        }
                        if (mob.getDataId() == 9450020) {
                                map.showScreenAutoLetterBox("monsterPark/clear");
                                map.showObjectEffect("Pt01gate");
                        }
                        break;
                case FIELD_5:
                        if (mob.getDataId() == 9450022) {
                                map.removeNpc(9130110);
                                map.removeNpc(9130113);
                                map.removeNpc(9130111);
                                map.removeNpc(9130114);
                                map.removeNpc(9130112);
                                event.setVariable("boss", "1");
                                map.showScreenAutoLetterBox("monsterPark/clear");
                                map.showObjectEffect("Pt01gate");
                                for (let i = 0; !practiceMode && i < members.length; i++) {
                                        members[i].addBossClearLog(mob.getDataId());
                                }
                                if (practiceMode) {
                                        return;
                                }
                                let showStr = [`[副本信息]: ${BOSS_LOG} 被成功攻略 ${practiceMode ? "練習模式" : ""}`]; 
                                let finalTime = parseInt((Date.now() - event.getVariable('consuming')) / 1000);
                                event.setVariable('finalTime', finalTime)
                                for (let i in damageAccu) {
                                        let m = members.find(m => m.getCharacterId() == i);
                                        let per = (100 * (damageAccu[i] / damageAll)).toFixed(2);
                                        showStr.push(`[傷害資訊]: ${m.getCharacterName()} 傷害占比 ${per}%`);
                                        event.setVariable(`${m.getCharacterId()}-per`, per);
                                        if (!practiceMode && m) {
                                                m.addBossClearLog(mob.getDataId());
                                                m.runScript('boss/BOSS_REWARD_APPLY')
                                        }
                                }
                                let T_A = Math.floor(finalTime / (60)); // 分
                                let T_B = Math.floor(finalTime % (60)); // 秒
                                showStr.push(`[通關時間]: ${T_A}:${T_B.toString().padStart(2, '0')}`)
                                for (let i in showStr) { 
                                        util.broadcastWorldChatMsg(4, showStr[i]);
                                } 
                                event.stopTimer('show');
                        }
                        break;
                default:

                        break;
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
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        stage.showReviveCount();
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
                case "Acton_Stage3":
                        event.getMap(FIELD_3).killAllMob();
                        event.getMap(FIELD_3).blowWeather(5120134, "竟然可以把我弱化到此地步. ..我所見到的傢伙們, 你們算是水準以上呢.", 10);
                        event.getMap(FIELD_3).spawnMob(9450014, 41, 146);
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