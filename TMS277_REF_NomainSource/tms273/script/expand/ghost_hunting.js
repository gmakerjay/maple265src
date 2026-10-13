const { getMapCfgs } = require('constant/randomMapCommon.js');
const { BossType } = require('constant/GhostHuntingCommon.js');

const payUtils = require('constant/PayUtils.js');
let eLog = require("extend_log");
const maxDaily = 20
const maxDaily2 = 1

const questId = 18831; //小鬼獎勵
const questId2 = 18832; //鬼王獎勵

const showRewards = [1713002, 1713001, 1713000, 2614079, 2431400]

let accountLog = [
    [], []
];
let selfIndex = -1;
if (!party) {
    npc.createParty();
}
let members = party.getLocalMembers();
for (let i in members) {
    let mem = members[i];
    if (mem.getCharacterId() == stage.getCharacterId()) {
        selfIndex = i;
    }
    accountLog[0].push(eLog.getEventLog(mem, util, questId, 1));
    accountLog[1].push(eLog.getEventLog(mem, util, questId2, 1));
}

// let accountLog = eLog.getEventLog(stage, util, questId, 1);
// let accountLog2 = eLog.getEventLog(stage, util, questId2, 1);
// 

// stage.fullHexaCore()
let e = stage.getEvent();
// if (e) {
//     // stage.getEvent().destroyEvent();
//     stage.showSystemMessage(e.getVariable("abc"))
//     if (npc.askYesNo('是否强制關閉')) {
//         e.destroyEvent();
//     } else {
//         entry()
//     }
// } else {
//     entry();
// }

function entry() {
    var str = "        #r#fs21##e    捉鬼活動#n#k\r\n"
    str += "#fs12#       普通捉鬼20次後可挑戰鬼王獲得大量突破"
    // str += "#fs12#獎勵預覽:\r\n"
    // for (var i = 0; i < showRewards.length; i++) {
    //     str += "#v" + showRewards[i] + "# "
    // }
    str += "\r\n#L1#我要抓鬼！！！#b(剩餘" + Math.max(0, (maxDaily - accountLog[0][selfIndex])) + "次)#k#l\r\n"
    str += "#L2#受死吧鬼王！！#b(剩餘" + Math.max(0, (maxDaily2 - accountLog[1][selfIndex]), 0) + "次)#k#l\r\n"
    str += "#L3#帶領團隊空降捉鬼 (#r隊長扣除30抵用券#k)#l\r\n"
    str += "#L0##r[必看]規則說明#l\r\n"

    var select = npc.askMenu(str)

    switch (select) {
        case 0:
            str = "領取任務後，將隨機在世界範圍內生成一個首領怪，帶隊成功擊殺，即可交付任務，領取獎勵。\r\n"
            str += "但：你召喚的首領怪同樣可以被其他玩家擊殺，若你召喚的首領#r被其他玩家#k擊殺，視為獵殺失敗，你將#r損失一次次數且無法獲得獎勵#k\r\n"
            str += "每日可領取#r" + maxDaily + "#k次任務，每日#r0點#k重置\r\n"
            str += "#r#e當首領怪被擊殺時，若隊友不在地圖則無獎勵，請一定要等隊友到齊再打。\r\n"
            str += "#r#e當首領怪被擊殺時，若隊友不在地圖則無獎勵，請一定要等隊友到齊再打。\r\n"
            str += "#r#e當首領怪被擊殺時，若隊友不在地圖則無獎勵，請一定要等隊友到齊再打。\r\n"
            str += "#r#e當首領怪被擊殺時，若隊友不在地圖則無獎勵，請一定要等隊友到齊再打。\r\n"
            str += "#r#e當首領怪被擊殺時，若隊友不在地圖則無獎勵，請一定要等隊友到齊再打。\r\n"
            str += "#L0#我明白了！開始吧！#l\r\n"
            if (npc.askMenu(str) == 0) {
                entry()
            }
            break
        case 1:
            startQuest(false)
            break;
        case 2:
            startQuest(true)
            break;
        case 3:
            if (party == null) {
                npc.say("捉鬼是組隊活動哦");
                return;
            }
            let members = party.getLocalMembers();
 
            let qiongbi = [];
            for (let i in members) {

                // if (getPay(members[i].getAccountId(), 2) < 1) {
                //     qiongbi.push(members[i].getName());
                // } 
                let cumtomEvent = members[i].getEvent();
                if (cumtomEvent == null || cumtomEvent.getVariable("EventName") != "ghost_hunting") {
                    npc.say("隊伍里有陌生人或沒領取捉鬼任務，不能起飛");
                    return;
                }
            }

            if (payUtils.getPay(4, db, stage) < 30) {
                // let str1 = "對不起，隊伍中有人買不起飛機票\r\n";
                // qiongbi.forEach(q => {
                //     str1 += q + "   "
                // });
                npc.say("抵用券不足30。");
            } else {
                let event = stage.getEvent();
                // stage.addPQLog("捉鬼機票", 1, 365);
                // gainHyPay(stage, -5)
                payUtils.gainPay(4, -30, stage, db, "抓鬼機票", "抓鬼機票");
                // for (let i in members) {
                //     members[i].addPQLog("捉鬼機票", 1, 365);
                // gainHyPay(members[i], -1)
                // }
                for (let i in members) {
                    members[i].changeMap(event.getVariable("mapId"), 0);
                } 

            }
            break;
    }
}

function randomMap() {
    var mapCfgs = getMapCfgs()
    var mapCfg = mapCfgs[Math.floor(Math.random() * mapCfgs.length)]
    var mapStruct = mapCfg.maps[Math.floor(Math.random() * mapCfg.maps.length)]
    var mapLabel = mapCfg.label
    var mapId = mapStruct.id
    var mapPoint = mapStruct.point[Math.floor(Math.random() * mapStruct.point.length)]
    return [mapId, mapLabel, mapPoint]
}

function randomBoss(flg) {
    if (flg) {
        let bossList = [8644011];
        let bossId = bossList[Math.floor(Math.random() * bossList.length)]
        return [bossId, 1000_0000_0000];
    } else {
        let bossList = [9303130, 9303131, 9303132, 9303133, 9303134]
        let bossId = bossList[Math.floor(Math.random() * bossList.length)]
        return [bossId, 10_0000_0000];
    }
}

function startQuest(flg) {
    if (party == null) {
        npc.say("一個人的力量有限，請尋找志同道合的隊友一起來吧！")
        return
    }
    members = party.getLocalMembers();
    for (var i in members) {
        let customEvent = members[i].getEvent()
        if (customEvent != null) {
            if (customEvent.getVariable("EventName") != "ghost_hunting") {
                npc.say("當前隊伍中有玩家正在進行別的活動，無法開始！")
                return

            } else if (customEvent.getVariable("MapLabel") != null) {
                npc.say("有正在進行的獵殺任務，請前往#r" + customEvent.getVariable("MapLabel") + "#k尋找目標！")
                return
            } else {
                npc.say("狀態異常，請聯繫管理員，error code: 1")
                return
            }
        }


        const tempMin = (tempList) => {
            let minIndex = 0;
            for (let i in tempList) {
                if (tempList[i] < tempList[minIndex]) {
                    minIndex = i;
                }
            }
            return minIndex;
        }
        const tempMax = (tempList) => {
            let maxIndex = 0;
            for (let i in tempList) {
                if (tempList[i] > tempList[maxIndex]) {
                    maxIndex = i;
                }
            }
            return maxIndex;
        }
        let cMin = tempMin(accountLog[0])
        let cMax = tempMax(accountLog[1])
        stage.showSystemMessage(JSON.stringify(accountLog))
        stage.showSystemMessage(JSON.stringify(cMin))
        //次數檢查
        // if (!flg && accountLog >= maxDaily) {
        //     npc.say("組隊內有玩家次數已經達到上限了！")
        //     return
        // } else  
        if (flg && accountLog[1][cMax] >= maxDaily2) {
            npc.say("組隊內有玩家鬼王次數已經達到上限了！")
            return
        } else if (flg && accountLog[0][cMin] < 20) {
            npc.say("挑戰鬼王需要普通抓鬼滿20次！")
            return
        }
    }

    var maxTry = 10
    var mapId, mapLabel, mapPoint
    var canContinue = false
    for (var i = 0; i < maxTry; i++) {
        [mapId, mapLabel, mapPoint] = randomMap()
        if (!isMapUsing(mapId)) {
            canContinue = true
            break
        }
    }

    if (!canContinue) {
        npc.say("當前活動火爆！請稍等片刻或換線嘗試！")
        return
    }

    setMapUsing(mapId)
    var bossInfo = randomBoss(flg)
    var str = "你已成功領取獵殺任務！\r\n"
    str += "請前往 #r" + mapLabel + "#k 尋找並獵殺目標：#r#o" + bossInfo[0] + "##k\r\n"

    var boss_config_example = {
        PQLog: "ghost_hunting",
        timeLimit: 30 * 60,
        reviveCount: 10,
        needEntryAnima: false,
        autoEntry: false,
        addPQLogWhenEntry: true,
        rewardScript: "expand/ghost_hunting_reward",
        isAutoTransfer: true,
        isStrictMap: false,
        isMakeMapModel: false,
        isMustInMap: true,
        //階段列表
        stages: [
            {
                label: "棄用了，可以不管",
                //階段過場動畫的地圖ID
                mapDirId: null,
                //階段實際的戰鬥地圖ID
                mapId: mapId,
                hurtFunction: function (event, stage) {
                    if (event.getVariable("BossFirstHurt") != true) {
                        event.setVariable("BossFirstHurt", true);
                        // event.getMap(mapId).showTextEffect("#fnNanum Gothic ExtraBold##fs40#居然被你們找到了！可惡，我藏得還不夠好嗎！", 50, 1000, 4, 0, -200, 1, 4, 0, 0, 0, "", 0, false);
                    }
                    if (event.getVariable("playerAttacking_" + stage.getCharacterId()) == null) {
                        event.setVariable("playerAttacking_" + stage.getCharacterId(), true)
                    }
                },
                //玩家切換地圖時的回調
                playerChangeMapFunction: function (event) {
                    var maps = event.getVariable("maps");
                    var map_temp = maps[0]
                    if (map_temp.getMobCount(bossInfo[0]) == 0) {
                        var party = event.getVariable("PARTY")
                        var members = party.getLocalMembers();
                        for (var i in members) {
                            members[i].dropMessage(0x12, "你們的獵殺目標被其他不知名玩家截胡了！任務失敗！五秒後將返回初始地圖。")
                        }
                        event.stopTimer("kick");
                        event.startTimer("kick", 5000);
                    }
                },
                afterFunction: function (event) {
                    // event.getMap(mapId).showTextEffect("#fnNanum Gothic ExtraBold##fs40##r怨魂不會就此輕易散去#k", 50, 1000, 4, 0, -200, 1, 4, 0, 0, 0, "", 0, false);
                    var party = event.getVariable("PARTY")
                    stage = party.getLocalMembers()[0];
                    stage.dropMessage(0x12, mapId)
                    // releaseMapUsing(mapId)
                },
                //這是階段中的怪物列表
                mobs: [
                    {
                        mobId: bossInfo[0],
                        // mobId: 8644011,
                        maxHp: bossInfo[1],
                        reduceDamageR: 0,
                        spawnPoint: mapPoint,
                        type: BossType.Normal
                    }
                ],
                //是否需要開啟地圖機制
                isStartFieldEvent: false,
            }
        ],
    }

    var e = ctx.makeEvent("zsf_event_ghostHunting", false, [party, boss_config_example, flg])
    if (e != null) {
        e.setVariable("EventName", "ghost_hunting")
        e.setVariable("MapLabel", mapLabel)
        e.setVariable("mapId", mapId)
        npc.say(str)
    }
}

function setMapUsing(mapId) {

    if (db.select(`select * from ghost_hunting_map where map_id = ${mapId} and channel_id = ${stage.getChannelId()}`).length > 0) {

        stage.dropMessage(25, "撞車了！請截圖這個報錯聯繫管理員！");
        return
    }
    db.insert(`insert into ghost_hunting_map(map_id, channel_id) values(${mapId}, ${stage.getChannelId()})`);

}

function releaseMapUsing(mapId) {

    db.delete(`delete from ghost_hunting_map where  map_id = ${mapId} and channel_id = ${stage.getChannelId()}`)
}

function isMapUsing(mapId) {
    if (db.select(`select * from ghost_hunting_map where map_id = ${mapId} and channel_id = ${stage.getChannelId()}`).length == 0) {

        return false;
    }

    return true
}

entry()
