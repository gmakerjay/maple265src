/*
 * Boss: Kalos
 */
var { getMapsByStages, getDirMapsByStages, getTrueMobId, makeMobsByConfig, getVaildHP, totalDamage } = require('constant/GhostHuntingCommon.js');
const { BossType, calculateBossDamageByPlayer, getDamage, getDamageR, getTotalHP } = require('constant/GhostHuntingCommon.js');
let eLog = require("extend_log");
let questId;

const questId1 = 18831; //小鬼獎勵
const questId2 = 18832; //鬼王獎勵
const EXIT_MAP = 100000000;

var party;
var PQLog;
var limitSecond;
var reviveCount;
var needEntryAnima;
var autoEntry;
var stages;

let members;
let endTime;
let mapIds;
let mapDirIds;
let maps;
let rewardScript;
let isAutoTransfer;
let isStrictMap;
let isMakeMapModel;
let isMysteriousMerchant;//本場是否隨機到了神秘商人
let isHPStatistics;//是否統計血量
let timerFunction;//自定義定時器
let debugPlayer;
let isMustInMap;
let currentStage = 0;
 
    function init(attachment) {
        /**
         * @type {ScriptParty}
         */
        let [par, config, flg] = attachment;
        questId = flg ? questId2 : questId1;
        //初始化隊伍
        party = par;
        members = party.getLocalMembers();
        debugPlayer = members[0];

        event.setVariable("members", members)
        event.setVariable("flag", flg)
        event.setVariable("abc", flg)
        //解析副本配置
        PQLog = config.PQLog += flg ? "_king" : "";
        limitSecond = config.timeLimit;
        reviveCount = config.reviveCount;
        needEntryAnima = config.needEntryAnima;
        autoEntry = config.autoEntry;
        isMysteriousMerchant = config.isMysteriousMerchant;
        if (isMysteriousMerchant == false) {
            isMysteriousMerchant = false;
        }

        isHPStatistics = config.isHPStatistics == null ? false : config.isHPStatistics;
        if (autoEntry == null) {
            autoEntry = true;
        }
        isStrictMap = config.isStrictMap;
        if (isStrictMap == null) {
            isStrictMap = true;
        }
        isMakeMapModel = config.isMakeMapModel;
        if (isMakeMapModel == null) {
            isMakeMapModel = true;
        }
        addPQLogWhenEntry = config.addPQLogWhenEntry;
        stages = config.stages;
        rewardScript = config.rewardScript;
        isAutoTransfer = config.isAutoTransfer;
        if (isAutoTransfer == null) {
            isAutoTransfer = true
        }
        isMustInMap = config.isMustInMap;

        timerFunction = config.timerFunction;

        //初始化總傷害
        if (isHPStatistics) {
            var bossTotalHp = getTotalHP(stages)
            //保存總血量
            event.setVariable("BOSS_TOTAL_HP", bossTotalHp);
            //初始化每名玩家的傷害
            for (let i = 0; i < members.length; i++) {
                calculateBossDamageByPlayer(event, members[i], 0);
            }
        }


        //變量初始化
        maps = []
        mapDirIds = []
        mapIds = []
        //設置副本屬性
        event.setVariable("EVENT_NAME", PQLog);
        event.setVariable("PARTY", party);
        if (needEntryAnima) {
            mapDirIds = getDirMapsByStages(stages, false);
        }
        mapIds = getMapsByStages(stages)
        //創建map實體
        for (var i = 0; i < mapIds.length; i++) {
            //任意一個配置的地圖id為空，則直接踢出隊伍，結束掉事件
            if (!mapIds[i]) {
                debugPlayer.dropMessage(0x12, "所配置的地圖ID不存在，請聯繫管理員修復！");
                kick()
                return
            }
            var tempMap
            if (isMakeMapModel) {
                tempMap = event.makeMap(mapIds[i]);
            } else {
                tempMap = event.getMap(mapIds[i]);
            }
            //地圖重置
            tempMap.reset()
            maps.push(tempMap);
        }

        event.setVariable("maps", maps);
        //玩家添加到事件內，設置復活次數
        for (let i = 0; i < members.length; i++) {
            members[i].setEvent(event);
            members[i].setReviveCount(reviveCount);
            event.setVariable("died_count_" + members[i].getCharacterId(), reviveCount);
            if (addPQLogWhenEntry) {
                
                eLog.addEventLog(members[i], util, questId, 1);   
            }
        }
        let time = limitSecond * 1000;
        //設置踢出時間
        event.startTimer("kick", time);
        //計算副本結束的時間戳，用於顯示剩餘時間
        endTime = new Date().getTime() + time;
        for (let i = 0; i < members.length; i++) {
            members[i].showTimer((endTime - new Date().getTime()) / 1000);
        }

        //先自動觸發第一階段
        currentStage = 0;
        startStageCurrent()
    }

    function  mobDied(mob) {
        if (getTrueMobId(stages[currentStage]).indexOf(mob.getDataId()) != -1) {
            event.setVariable("boss" + currentStage, "Clear");
            endStageCurrent()
            if (currentStage < stages.length - 1) {
                event.startTimer("to_next_stage", 4000);
            } else {
                //最終階段
                if (isHPStatistics) {
                    //計算傷害占比
                    var str = "傷害統計結果：\r\n"
                    for (var i in members) {
                        var range = getDamageR(event, members[i]);
                        str += members[i].getName() + "的傷害占比：" + Math.floor(range * 100) + "%\r\n"
                    }
                    for (var i in members) {
                        members[i].dropMessage(0x17, str)
                    }
                }
                event.setVariable("allClear", true);
                for (var i = 0; i < members.length; i++) {
                    if (!addPQLogWhenEntry) {
                            eLog.addEventLog(members[i], util, questId, 1);   
                    }
                    let canReward = true;
                    if (isMustInMap) {
                        canReward = members[i].getMapId() == maps[currentStage].getId();
                    }
                    if (canReward && rewardScript != null) {
                        members[i].runScript(rewardScript)
                    }
                }
                if (isAutoTransfer) {
                    //神秘商人出現時，不自動傳送出圖
                    if (isMysteriousMerchant) {
                        //創建神秘商人npc
                        var { createTempNpc } = require('configs/mysteriousMerchantCommon.js');
                        var npcMap = maps[currentStage]
                        var npc = createTempNpc(npcMap, mob.getPosition().getX(), mob.getPosition().getY())
                        event.setVariable("npc", npc);
                        event.setVariable("npcMap", npcMap);
                    } else {
                        event.startTimer("kick", 4000);
                    }
                } else {
                    for (let i = 0; i < members.length; i++) {
                        members[i].setEvent(null);
                    }
                    event.destroyEvent();
                }
            }
        }
    }

    function  mobHit(player, mob, damage) {
        if (getTrueMobId(stages[currentStage]).indexOf(mob.getDataId()) != -1) {
            if (isHPStatistics) {
                //統計傷害
                calculateBossDamageByPlayer(event, player, damage)
            }
            doHurtIfNeed(player, damage, mob)
        }
        doHurtOtherIfNeed(player, damage, mob)
    }

    function playerDisconnected(player) {
        removePlayer(player.getCharacterId(), false);
    }

    function playerChangedMap(player, destination) {
        var transportMapId = destination.getId();
        doPlayerChangeMapFunction()
        if (isStrictMap) {
            if (mapDirIds.indexOf(transportMapId) != -1 || mapIds.indexOf(transportMapId) != -1) {
                player.showTimer((endTime - new Date().getTime()) / 1000);
                player.showReviveCount();
            } else {
                removePlayer(player.getCharacterId(), false);
            }
        } else {
            var needUI = true
            if (event.getVariable("playerAttacking_" + player.getCharacterId()) && mapIds.indexOf(transportMapId) != -1) {
                if (reduceDeathCount(player)) {
                    needUI = false
                }
            }
            if (needUI) {
                player.showTimer((endTime - new Date().getTime()) / 1000);
                player.showReviveCount();
            }
        }
    }

    function partyMemberDischarged(party, player) {
        if (party.getLeader() == player.getCharacterId()) {
            kick();
        } else {
            removePlayer(player.getCharacterId(), true);
        }
    }

    function timerExpired(key) {
        //執行自定義的定時器
        doTimerFunctionIfNeed(key)

        switch (key) {
            case "kick":
                kick();
                break;
            case "to_next_stage":
                currentStage++;
                startStageCurrent()
                break;
            case "To_Stage_Final":
                break;
        }
    }
    function  deinit() {
        //如果需要的話清理掉npc
        if (event.getVariable("npc") != null) {
            let entId = event.getVariable("npc");
            let tMap = event.getVariable("npcMap");
            tMap.destroyTempNpc(entId);
        }

        for (var i = 0; i < maps.length; i++) {
            maps[i].killAllMob()
            maps[i].endEvent()
        }
        for (let i = 0; i < members.length; i++) {
            members[i].setEvent(null);
            members[i].setReviveCount(-1);
        }
    }

function startStageCurrent() {
    //清理原先地圖的怪物
    if (maps[currentStage] != null) {
        maps[currentStage].killAllMob()
    }
    //傳送玩家到當前階段
    var toMap = needEntryAnima ? mapDirIds[currentStage] : mapIds[currentStage]
    if (!toMap) {
        toMap = mapIds[currentStage]
    }
    //是否自動傳送到第一階段
    if (currentStage != 0 || autoEntry) {
        party.changeMap(toMap, 0);
    }
    //觸發神秘商店提示
    if (isMysteriousMerchant) {
        maps[currentStage].broadcastEventNotice("由於守護寶藏的狂熱，怪物們激發出了更強大的實力。擊敗強化後的首領，查看最終階段的神秘寶箱吧。");
        maps[currentStage].showTextEffect("#fnNanum Gothic ExtraBold##fs26#隱約能看到首領懷中抱著一個#fs32##r散發著神秘力量#k#fs26#的箱子！！", 100, 5000, 4, 0, -280, 1, 4, 0, 0, 0, "", 0, false);

        //此模式下血量額外翻倍
        for (var x in stages[currentStage].mobs) {
            stages[currentStage].mobs[x].maxHp = getVaildHP(stages[currentStage].mobs[x].maxHp * 2)
        }
    }
    //觸發自定義回調
    doBeforeStageIfNeed()
    //創建當前階段的怪物
    makeMobsByConfig(debugPlayer, stages[currentStage].mobs, maps[currentStage])
    //開啟地圖機制
    startFieldEventIfNeed()
}

function endStageCurrent() {
    //結束地圖機制
    finishFieldEventIfNeed()
    //觸發自定義回調
    doAfterStageIfNeed()
}

function startFieldEventIfNeed() {
    //開啟當前階段的地圖機制
    if (stages[currentStage].isStartFieldEvent) {
        maps[currentStage].startFieldEvent()
    }
}

function finishFieldEventIfNeed() {
    //結束當前階段的地圖機制
    if (stages[currentStage].isStartFieldEvent) {
        maps[currentStage].endFieldEvent()
    }
}

function doBeforeStageIfNeed() {
    //如果設置了當前階段傳送前的回調，則執行回調
    var func = stages[currentStage].beforeFunction
    if (func && typeof func === 'function') {
        func(event);
    }
}

function doHurtIfNeed(player, damage, mob) {
    //如果設置了當前階段的傷害回調，則執行回調
    var func = stages[currentStage].hurtFunction
    if (func && typeof func === 'function') {
        func(event, player, damage, mob);
    }
}

function doHurtOtherIfNeed(player, damage, mob) {
    //如果設置了當前階段的傷害回調，則執行回調
    var func = stages[currentStage].hurtOtherFunction
    if (func && typeof func === 'function') {
        func(event, player, damage, mob);
    }
}

function doPlayerChangeMapFunction() {
    //如果設置了當前階段傳送後的回調，則執行回調
    var func = stages[currentStage].playerChangeMapFunction
    if (func && typeof func === 'function') {
        func(event);
    }
}

function doAfterStageIfNeed() {
    //如果設置了當前階段傳送後的回調，則執行回調
    var func = stages[currentStage].afterFunction
    if (func && typeof func === 'function') {
        func(event);
    }
}

function doTimerFunctionIfNeed(key) {
    //如果設置了自定義定時器，則執行
    if (timerFunction && typeof timerFunction === 'function') {
        timerFunction(event, key);
    }
}

function removePlayer(playerId, changeMap) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].getCharacterId() == playerId) {
            members[i].setEvent(null);
            if (changeMap)
                members[i].changeMap(EXIT_MAP, "st00");
            members.splice(i, 1);
            break;
        }
    }
    if (members.length <= 0) {
        event.destroyEvent();
    }
}

function kick() {
    for (let i = 0; i < members.length; i++) {
        if (members[i] != null) {
            members[i].setEvent(null);
            members[i].changeMap(EXIT_MAP, 0);
        }
    }
    event.destroyEvent();
}

function warpToMap(map, portal) {
    for (let i = 0; i < members.length; i++) {
        members[i].changeMap(map, portal);
    }
}

function reduceDeathCount(target_player) {
    var deadCount = event.getVariable("died_count_" + target_player.getCharacterId());
    deadCount--
    event.setVariable("died_count_" + target_player.getCharacterId(), deadCount);
    target_player.setReviveCount(deadCount)
    if (deadCount <= 0) {
        removePlayer(target_player.getCharacterId(), true);
        return true;
    }
    return false;
}
