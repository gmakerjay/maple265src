/**
* VIP
**/

let eLog = require("extend_log");
const log = require('check_log');
var z = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var xx = "#fEffect/CharacterEff/1082565/4/0#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系

var dayItems = Array(//每日福利送的物品
    Array(4310014, 1),//雪花幣
    Array(4000313, 2),//黃金楓葉
    Array(4001006, 800),//火焰羽毛
    Array(4034999, 66),//黑色羽毛
    Array(2048749, 6),//火花
    Array(2614064, 1)//500萬

);
var dayDQ = 15000;//每日點券
var dayDY = 15000;//每日抵用
var dayYE = 30;//每日餘額
var dayJB = 0;//每日金幣
var dayPG = 0;//每日破功
var ROLLItems = Array(4000000, 10);//roll鑰匙 ID 數量



const bossList = [
    ['史烏[normal]', 2, 4, 8881103],
    ['戴米安[normal]', 2, 4, 8950111],
    ['露希妲[normal]', 2, 4, 8880167],
    ['威爾[normal]', 2, 4, 8950114],
    ['威爾[hard]', 2, 4, 8950115],
    ['真‧希拉[normal]', 2, 4, 8950120],
    ['戴斯克[normal]', 2, 4, 8950116],
    ['頓凱爾[normal]', 2, 4, 8950118],
];
const bossList0 = {

    '巴洛古[easy]': { "type": 2, "times": 4 },
    '凡雷恩[easy]': { "type": 2, "times": 4 },
    '凡雷恩[normal]': { "type": 2, "times": 4 },
    '凡雷恩[hard]': { "type": 2, "times": 4 },
    '梅格耐斯[easy]': { "type": 2, "times": 4 },
    '梅格耐斯[normal]': { "type": 2, "times": 4 },
    '梅格耐斯[hard]': { "type": 2, "times": 4 },
    '希拉[normal]': { "type": 2, "times": 4 },
    '希拉[hard]': { "type": 2, "times": 4 },
    '森蘭丸[normal]': { "type": 2, "times": 4 },
    '森蘭丸[hard]': { "type": 2, "times": 4 },
    '卡翁[normal]': { "type": 2, "times": 4 },
    '炎魔[easy]': { "type": 2, "times": 4 },
    '炎魔[normal]': { "type": 2, "times": 4 },
    '炎魔[chaos]': { "type": 2, "times": 4 },
    '拉圖斯[easy]': { "type": 2, "times": 4 },
    '拉圖斯[normal]': { "type": 2, "times": 4 },
    '拉圖斯[chaos]': { "type": 2, "times": 4 },
    '守護天使綠水靈[normal]': { "type": 2, "times": 4 },
    '西格諾斯[easy]': { "type": 2, "times": 4 },
    '西格諾斯[normal]': { "type": 2, "times": 4 },
    '皮卡啾[normal]': { "type": 2, "times": 4 },
    '皮卡啾[chaos]': { "type": 2, "times": 4 },
    '濃姬[normal]': { "type": 2, "times": 4 },
    '比艾樂[normal]': { "type": 2, "times": 4 },
    '比艾樂[chaos]': { "type": 2, "times": 4 },
    '斑斑[normal]': { "type": 2, "times": 4 },
    '斑斑[chaos]': { "type": 2, "times": 4 },
    '血腥皇后[normal]': { "type": 2, "times": 4 },
    '血腥皇后[chaos]': { "type": 2, "times": 4 },
    '貝倫[normal]': { "type": 2, "times": 4 },
    '貝倫[chaos]': { "type": 2, "times": 4 },
    '闇黑龍王[easy]': { "type": 2, "times": 4 },
    '闇黑龍王[normal]': { "type": 2, "times": 4 },
    '闇黑龍王[chaos]': { "type": 2, "times": 4 },
    '阿卡伊農[easy]': { "type": 2, "times": 4 },
    '阿卡伊農[normal]': { "type": 2, "times": 4 }
};

function splitNameAndDifficulty(str) {
    // 匹配 "名称[难度]" 格式
    const match = str.match(/^(.*)\[(.*)\]$/);
    if (match) {
        return [match[1], match[2]]; // [名称, 难度]
    }
    return [str, '']; // 如果没有匹配到方括号，返回原字符串和空难度
}

const partyList = [
    ['廢棄', 'party1', '廢棄組隊', [[4001785, 2], [4310224, 2]], [[250, 0.2], [260, 0.1], [270, 0.05], [280, 0.03], [290, 0.01]]],
    ['玩具', '通關玩具組隊', '玩具組隊', [[4001785, 2], [4310224, 2]], [[250, 0.2], [260, 0.1], [270, 0.05], [280, 0.03], [290, 0.01]]],
    ['逃脫', 'prison_break', '逃脫組隊', [], [[290, 0.2]]],
    ['御龍魔', 'dragon_rider', '御龍魔組隊', [], [[290, 0.2]]],
];

function 掃蕩道場() {
    let results = db.select(`select * from zsf_dojang_best where c_id = ${stage.getCharacterId()} and month = ${util.getStringDate('YYYYMM')}`)

    let str = `掃蕩按照本月記錄掃蕩,建議第一周同步記錄到最佳紀錄\r\n`;

    let ss = stage.getQuestRecordEx(100464, "Floor");
    let fTime = stage.getQuestRecordEx(100464, "Time");
    if (ss == '' && fTime == '' && results.length == 0) {
        npc.say('本月無通關記錄的情況,請先手動挑戰道場儲存本月最佳紀錄')
        return;
    }

    str += `本周記錄: `
    if (ss != '' && fTime != '') {
        str += `${ss}層 ${fTime}秒`
    } else {
        str += `無`
    }
    str += `\r\n`
    str += `本月記錄: `

    if (results.length > 0) {
        let oFloor = Number(results[0].get('dFloor'));
        let dTime = Number(results[0].get('dTime'));

        if ((ss != '' && fTime != '') && ((ss < oFloor) || (ss == oFloor && fTime < dTime))) {
            db.update(`update zsf_dojang_best set dFloor = ${ss}, dTime = ${fTime} where id = ${results[0].get(id)}`);
        }
        ss = oFloor;
        fTime = dTime
    } else {
        db.insert(`insert into  zsf_dojang_best(dFloor, dTime, month, c_id) values(${ss}, ${fTime}, ${util.getStringDate('YYYYMM')}, ${stage.getCharacterId()})`);
    }
    str += `${ss}層 ${fTime}秒`
    str += `\r\n#b#L0#掃蕩道場(排名記錄將於本日晚23:50更新)#l`
    if (npc.askMenu(str) == 0) {
        doDojang(ss, fTime)
    }
}

function doDojang(ss, logTime) {
    if (log.getEventValue(stage, db, '掃蕩道場') == 0) {
        log.addEventValue(stage, db, '掃蕩道場')
        util.broadcastChatMsg(6, `[VIP] : ${stage.getCharacterName()} 通過VIP功能掃蕩了<道場>！`);
    }
    // enter
    stage.startQuest(3846, util.getStringDate("yy/MM/dd"));
    stage.startQuest(7279, "0");




    // event init
    stage.updateQuestRecordEx(3847, "Nenter", util.getStringDate("yy/MM/dd/HH/mm"));
    stage.updateQuestRecordEx(3847, "NFloor", "0");
    stage.updateQuestRecordEx(3847, "NResult", "start");
    stage.startQuest(7279, "1");//Quest Name:Unknown
    /* Update Quest RecordEx | Id:65197 | Name: Unknown | Data: "" */
    stage.updateQuestRecordEx(65197, "");





    //Update log
    let logFloor = stage.getIntQuestRecordEx(100464, "Floor");
    let oldTime = stage.getIntQuestRecordEx(100464, "Time");
    stage.showSystemMessage(`前記錄: ${logFloor}-${oldTime}`)
    if (ss > logFloor) {
        stage.updateQuestRecordEx(100464, "Floor", ss);
        stage.updateQuestRecordEx(100464, "Time", logTime);
        stage.showSystemMessage("已達成本週最高紀錄。");
    }
    if (ss == logFloor && oldTime < logTime) {
        stage.updateQuestRecordEx(100464, "Time", logTime);
    }
    stage.updateDoJangLog(ss, logTime);

    stage.updateQuestRecordEx(3847, "NFloor", ss);
    stage.updateQuestRecordEx(3847, "NTime", logTime);




    // out check
    // Created by MetaMS
    // ID:[925020002]
    // MapName:武陵道場出口


    stage.updateQuestRecordEx(3847, "NResult", "complete");
    let NFloor = stage.getIntQuestRecordEx(3847, "NFloor");
    let NTime = stage.getIntQuestRecordEx(3847, "NTime");

    oldFloor = stage.getIntQuestRecordEx(100466, "Floor");
    oldTime = stage.getIntQuestRecordEx(100466, "Time");
    stage.showSystemMessage(`100466old ${oldFloor}-${oldTime}`)

    let update = false;
    if (NFloor > oldFloor) {
        update = true;
        stage.updateQuestRecordEx(100466, "Floor", NFloor);
        stage.updateQuestRecordEx(100466, "Time", NTime);
    }
    if (NFloor == oldFloor && NTime < oldTime) {
        update = true;
        stage.updateQuestRecordEx(100466, "Time", NTime);
    }
    stage.updateQuestRecordEx(100466, "rDay", util.getStringDate("yy/MM/dd"));
    if (update) {
        stage.updateQuestRecordEx(100466, "Scr", "1");//check best
        stage.showProgressMessageFont("- 達成最高紀錄 -", 3, 25, 4, 0);//unk:[byte]0
    }
    stage.updateQuestRecordEx(100466, "Scr", "0");//check best

    npc.id(2091011).noEsc().say("辛苦了。 試著繼續挑戰吧。\r\n(目前的時間 :" + util.getStringDate("yy/MM/dd, HH點 mm分") + ")\r\n\r\n<最近紀錄資訊>\r\n#b  - 排行區間 : 精通\r\n  - 完成樓層 : " + NFloor + " 層\r\n  - 花費的時間 : " + NTime + " 秒#k\r\n\r\n若是達成比之前更好的紀錄，就會自動登錄在#r武陵排行榜#k。\r\n登錄時需要一點時間，千萬別忘記。");



}

function 跑商掃蕩() {
    if (log.getEventValue(stage, db, '跑商掃蕩') > 0) {
        npc.say('本日已掃蕩過跑商')
        return;
    }
    log.addEventValue(stage, db, '跑商掃蕩')
    let ret = 0;
    let data = stage.getQuestRecordEx(15324, "scount");
    if (data != null) {
        ret = Number(data);
    }

    stage.updateQuestRecordEx(15324, "scount", String(data + 50000));

    util.broadcastChatMsg(6, `[VIP] : ${stage.getCharacterName()} 通過VIP功能掃蕩了<沙漠跑商>！`);
    npc.say('跑商掃蕩成功,增加存儲貨幣50000')
}

function 掃蕩組隊() {
    if (log.getEventValue(stage, db, '掃蕩組隊') == 0) {
        log.addEventValue(stage, db, '掃蕩組隊')
        util.broadcastChatMsg(6, `[VIP] : ${stage.getCharacterName()} 通過VIP功能掃蕩了<組隊任務>！`);
    }
    let hasReward = false;
    let str = `成功掃蕩組隊任務:\r\n`;
    let rewardInfo = {};
    let expRewardRate = 0;
    for (let i in partyList) {
        if (1 > log.getEventValue(stage, db, partyList[i][1])) {

            log.addEventValue(stage, db, partyList[i][1]);
            str += partyList[i][0] + ' '
            for (let j in partyList[i][3]) {
                if (!rewardInfo[partyList[i][3][j][0]]) {
                    rewardInfo[partyList[i][3][j][0]] = 0;
                }
                rewardInfo[partyList[i][3][j][0]] += partyList[i][3][j][1]
            }
            let expRate = 0;
            for (let j in partyList[i][4]) {
                if (stage.getLevel() >= partyList[i][4][j][0]) {
                    expRate = partyList[i][4][j][1];
                }
            }
            if (expRate > 0) {
                expRewardRate += expRate;
            }
        }
    }
    if (rewardInfo.length > 0 || expRewardRate > 0) {
        str += `\r\n獎勵如下:\r\n`
        for (let i in rewardInfo) {
            str += `#v${i}:i##z${i}:i# x ${rewardInfo[i]}\r\n`
            stage.gainItem(i, rewardInfo[i]);
        }
        if (expRewardRate > 0) {
            stage.gainExp(ctx.getExpForLevelUp() * expRewardRate);
        }

        npc.say(str)
    } else {
        npc.say('沒有可完成的組隊掃蕩')
    }
    start();


}

// },
// "boss_zakum_easy": {
//     "name": "炎魔[簡單]",
//     "listA": [
//         [10000, 1, 3, 魔方_紅], 
//         [10000, 1, 3, 魔方_黑], 
//         [10000, 10, 13, 首領怪幣],  
//         [5000, 1, 1, 火花160],  
//     ],
//     "listB": [
//         [1000, 1, 1, 1022231],//水中信紙眼飾
//         [1000, 1, 1, 1012478],//凝聚力量的結晶石
//     ]
// },
function 掃蕩新手BOSS(finishInfo) {
    if (log.getEventValue(stage, db, '掃蕩新手BOSS') == 0) {
        log.addEventValue(stage, db, '掃蕩新手BOSS')
        util.broadcastChatMsg(6, `[VIP] : ${stage.getCharacterName()} 通過VIP功能掃蕩了<新手BOSS>！`);
    }

    let rewardInfo = {};
    let rewardDetailInfo = {};
    let hasReward = false;
    for (let i in dropInfo0) {

        let can = true;
        if (!finishInfo[dropInfo0[i]['name']]) {
            finishInfo[dropInfo0[i]['name']] = {};
        }
        if (4 - ((finishInfo[dropInfo0[i]['name']]['week'] ? finishInfo[dropInfo0[i]['name']]['week'] : 0)) < 1) {
            can = false;
        } else if ((1 - (finishInfo[dropInfo0[i]['name']]['day'] ? finishInfo[dropInfo0[i]['name']]['day'] : 0)) < 1) {
            can = false;
        }
        let bossName = splitNameAndDifficulty(dropInfo0[i]['name'])
        if (!rewardInfo[bossName[0]]) {
            rewardInfo[bossName[0]] = { 'type': [bossName[1]], 'reward': {} };
        }
        if (can) {
            hasReward = true;
            if (!rewardInfo[bossName[0]]['type'].includes(bossName[1])) {
                rewardInfo[bossName[0]]['type'].push(bossName[1])
            }
            //         // 完成log
            db.insert(`INSERT INTO zz_boss_event (player_name, accounts_id, player_id, finalTime, bossName, time, mode, memo, percent, status) VALUES ('${stage.getCharacterName()}', '${stage.getAccountId()}', '${stage.getCharacterId()}', ${9999}, '${bossName[0]}[${bossName[1]}]', now(), ${1}, 'VIP', ${100}, '1');`);

            let listA = dropInfo0[i]['listA']
            let listB = dropInfo0[i]['listB']
            if (listA) {
                for (let j in listA) {
                    if ((Math.random() * 10000) < listA[j][0]) {
                        if (!rewardDetailInfo[listA[j][3]]) {
                            rewardDetailInfo[listA[j][3]] = 0;
                        }
                        rewardDetailInfo[listA[j][3]] += marinRandom(listA[j][1], listA[j][2])
                    }
                }
            }
            if (listB) {
                for (let j in listB) {
                    if ((Math.random() * 10000) < listB[j][0]) {
                        if (!rewardDetailInfo[listB[j][3]]) {
                            rewardDetailInfo[listB[j][3]] = 0;
                        }
                        rewardDetailInfo[listB[j][3]] += marinRandom(listB[j][1], listB[j][2])
                    }
                }
            }
        }
    }

    if (hasReward) {
        let str = `成功掃蕩下列BOSS:\r\n`;
        for (let i in rewardInfo) {
            str += `${i}: ${rewardInfo[i]['type'].join(',')}\r\n`
        }
        for (let i in rewardDetailInfo) {
            str += `#v${i}:i##z${i}:i# ${rewardDetailInfo[i]}\r\n`
            stage.gainItem(i, rewardDetailInfo[i])
        }

        npc.say(str)
    } else {
        npc.say('沒有可掃蕩的首領')
    }
    掃蕩BOSS();
    // npc.say(JSON.stringify(rewardInfo))
    // npc.say(splitNameAndDifficulty('巴洛古[簡單]')[0])
}


function 掃蕩BOSS() {
    if (log.getEventValue(stage, db, '掃蕩高級BOSS') == 0) {
        log.addEventValue(stage, db, '掃蕩高級BOSS')
        util.broadcastChatMsg(6, `[VIP] : ${stage.getCharacterName()} 通過VIP功能掃蕩了<高級BOSS>！`);
    }
    let finishInfo = {};
    let weekResults = getBossEventWeekAll();
    let dayResults = getBossEventDayAll();
    for (let i in weekResults) {
        finishInfo[weekResults[i].get('bossName')] = { 'week': weekResults[i].get('sum') };
    }
    for (let i in dayResults) {
        finishInfo[dayResults[i].get('bossName')]['day'] = dayResults[i].get('sum');
    }
    let str = `首領掃蕩列表:\r\n`;
    for (let i in bossList) {
        if (!finishInfo[bossList[i][0]]) {
            finishInfo[bossList[i][0]] = {};
        }
        let can = true;
        if ((bossList[i][2] - (finishInfo[bossList[i][0]]['week'] ? finishInfo[bossList[i][0]]['week'] : 0)) < 1) {
            can = false;
        } else if ((1 - (finishInfo[bossList[i][0]]['day'] ? finishInfo[bossList[i][0]]['day'] : 0)) < 1) {
            can = false;
        }

        str += `#L${can ? i : (Number(i) + 100)}#${can ? '#k' : '#r'}${RuinString(' ', 16, bossList[i][0])}`;

        str += ` 本周: (${bossList[i][2] - (finishInfo[bossList[i][0]]['week'] ? finishInfo[bossList[i][0]]['week'] : 0)}/${bossList[i][2]})`;
        str += ` 本日: (${1 - (finishInfo[bossList[i][0]]['day'] ? finishInfo[bossList[i][0]]['day'] : 0)}/${1})#l\r\n`;
    }

    str += `#k#L999#新手BOSS#l`;


    let sel = npc.askMenu(str)
    if (sel == 999) {
        掃蕩新手BOSS(finishInfo)
    } else if (sel >= 100) {
        npc.say(bossList[Number(sel) - 100][0] + ' 次數不足')
        掃蕩BOSS();
    } else {
        let bName = bossList[sel][0];
        db.insert(`INSERT INTO zz_boss_event (player_name, accounts_id, player_id, finalTime, bossName, time, mode, memo, percent, status) VALUES ('${stage.getCharacterName()}', ${stage.getAccountId()}, ${stage.getCharacterId()}, 9999, '${bName}', now(), 1, 'VIP', 100, 1);`)
        stage.addBossClearLog(bossList[sel][3]);
        let bDrop = dropInfo[bossList[sel][3]];
        let rewardInfo = {};
        for (let i in bDrop) {
            // "itemId":1102797,"name":"航海師海盜斗篷","minNum":1,"maxNum":1,"chance":2000,
            if ((Math.random() * 1000000) < Number(bDrop[i]['chance'])) {
                let quantity = marinRandom(Number(bDrop[i]['minNum']), Number(bDrop[i]['maxNum']));
                if (rewardInfo[bDrop[i]['itemId']]) {
                    rewardInfo[bDrop[i]['itemId']] += quantity;
                } else {
                    rewardInfo[bDrop[i]['itemId']] = quantity;
                }
            }
        }
        let rewardStr = `掃蕩成功(${bossList[sel][0]}), 獎勵如下\r\n`;
        for (let i in rewardInfo) {
            rewardStr += `#v${i}:i##z${i}:i# x ${rewardInfo[i]}\r\n`;
            stage.gainItem(i, rewardInfo[i]);
        }

        npc.say(rewardStr)
        掃蕩BOSS();
    }
}

function start() { 


    let YN;
    var selStr = "" + epp + "" + epp + "" + epp + "" + epp + "\r\n";
    selStr += "#e#r         " + xx + xx + xx + " VIP百寶箱 " + xx + xx + xx + "\r\n";

    selStr += "#b#L0#" + z + " 首領掃蕩#l  #L1#" + z + " 掃蕩組隊#l  #L2#" + z + " 道場掃蕩#l\r\n";
    selStr += "#b#L3#" + z + " 跑商掃蕩#l  #L4#" + z + " 捉鬼掃蕩#l  #L7#" + z + " 三倍魚分#l\r\n";
    selStr += "#b#L8#" + z + " 在線獎勵#l  #L6#" + z + " 功能介紹#l\r\n"; 
    // selStr += "#b#L8#" + z + " 每日捲軸#l  #L9#" + z + " 每日魔方#l  #L1#" + z + " 洗血洗藍#l\r\n";
    // selStr += "#b#L11#" + z + " 每日金幣#l  #L12#" + z + " 每日金豬#l  #L2#" + z + " 副本重置#l \r\n";

    selStr += "\r\n" + epp + "" + epp + "" + epp + "" + epp + ""
    var selected = npc.askMenu(selStr);
    if (stage.getVipLevel() < 2) {
        // if (stage.isGm()) {
        //     stage.showSystemMessage('VIP:' + stage.getVipLevel());
        // } 
        npc.say('你沒有VIP權限')
        return;
    }
    switch (selected) {
        case 0:
            掃蕩BOSS();
            break;
        case 1:
            掃蕩組隊();
            break;
        case 2:
            掃蕩道場();
            break;
        case 3:
            跑商掃蕩();
            break;
        case 4:
            捉鬼掃蕩();
            break;
        case 6:
            let str = `VIP其他功能:\r\n`;
            str += `1. 可以進入VIP頻道,VIP頻道的經驗(40)倍,金幣(2)倍\r\n`
            str += `2. 星之力強化(金幣)折扣\r\n`
            str += `3. 兌換釣魚產物為積分時,3倍獲取\r\n`
            str += `4. 每日的在線獎勵可直接完成\r\n`
            npc.say(str)
            start();
            break;
        case 7:
            stage.runScript('expand/menu/更多功能/釣魚功能_提交魚');
            break;
        case 8:
            stage.runScript('expand/menu/在線獎勵');
            break;
        default:
            npc.say("該功能開發中");
            break;
    }


}


function 捉鬼掃蕩() {

    let questId = 18831; //小鬼獎勵
    let questId2 = 18832; //鬼王獎勵
    let accountLog = [
    ];
    let mem = stage
    accountLog.push(eLog.getEventLog(mem, util, questId, 1));
    accountLog.push(eLog.getEventLog(mem, util, questId2, 1));
    if (accountLog[0] > 0 || accountLog[1] > 0) {
        npc.say('今日已手動挑戰過捉鬼無法掃蕩')
        return;
    }

    if (log.getEventValue(stage, db, '捉鬼掃蕩') > 0) {
        npc.say('本日已掃蕩過捉鬼')
        return;
    }
    log.addEventValue(stage, db, '捉鬼掃蕩')
    eLog.addEventLog(mem, util, questId, 20);
    eLog.addEventLog(mem, util, questId2, 1);
    let rewardInfo = {};
    if (Math.random() < 0.1) {
        let cnt = parseInt(parseInt(Math.random() * 100)) + 1;
        // let cnt = parseInt(Math.random() * 80) + 1; 
        stage.gainItem(4001714, cnt);
    } else {
        let cnt = (parseInt(Math.random()) * 10) + 1;
        const list = [5062500, 2048761, 5062503, 5062020, 5062010];
        const randomElement = list[Math.floor(Math.random() * list.length)];
        stage.gainItem(randomElement, cnt);
    }

    stage.gainItem(4001714, parseInt(5 * 20));

    util.broadcastChatMsg(6, `[VIP] : ${stage.getCharacterName()} 通過VIP功能掃蕩了<捉鬼>！`);
    npc.say('捉鬼掃蕩成功')

}

function getBossEventWeekAll() {
    var sql = `select COALESCE(SUM(1), 0) AS sum, player_name as p_name, accounts_id as a_id, bossName from zz_boss_event where accounts_id = ${stage.getAccountId()}  AND DATE(time) BETWEEN DATE(NOW() - INTERVAL WEEKDAY(NOW()) DAY) AND DATE(NOW() + INTERVAL (7 - WEEKDAY(NOW())) DAY)  and status not in (2, 6)  group by bossName`;
    var resultList = db.select(sql);
    return resultList;
}
function getBossEventDayAll() {
    var sql = `
    SELECT COALESCE(SUM(1), 0) AS sum,
           player_name AS p_name,
           accounts_id AS a_id,
           bossName
    FROM zz_boss_event
    WHERE accounts_id = ${stage.getAccountId()}
      AND DATE(time) = CURDATE()
      AND status NOT IN (2, 6)
    GROUP BY bossName
`;

    var resultList = db.select(sql);
    return resultList;
}


function RuinString(A, B, C) {
    T = "";
    F = "";
    if (C.length > B) {
        T = C;
    } else {
        for (let i = 0; i < B - String(C).replace(/[\u0391-\uFFE5]/g, "aa").length; i++) {
            F = F + A;
        }
    }
    T = C + F;
    return T;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 从0到i的随机索引
        [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换元素
    }
    return arr;
}




function marinRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let dropInfo = {
    8881103: [{ "idx": 0, "itemId": 1102797, "name": "航海師海盜斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 1, "itemId": 1082640, "name": "航海師海盜手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 2, "itemId": 1073035, "name": "航海師海盜鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 3, "itemId": 1052890, "name": "航海師海盜套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 4, "itemId": 1004426, "name": "航海師海盜帽", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 5, "itemId": 1102796, "name": "航海師盜賊斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 6, "itemId": 1102795, "name": "航海師弓箭手斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 7, "itemId": 1004423, "name": "航海師法師帽", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 8, "itemId": 1152174, "name": "航海師劍士護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 9, "itemId": 1102775, "name": "航海師劍士斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 10, "itemId": 1082636, "name": "航海師劍士手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 11, "itemId": 1073030, "name": "航海師劍士鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 12, "itemId": 1052882, "name": "航海師劍士套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 13, "itemId": 1242116, "name": "航海師能量劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 14, "itemId": 1592019, "name": "航海師古代之弓", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 15, "itemId": 1412177, "name": "航海師戰斧", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 16, "itemId": 1402251, "name": "航海師重劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 17, "itemId": 1322250, "name": "航海師十字錘", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 18, "itemId": 1312199, "name": "航海師雙刃斧", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 19, "itemId": 1213017, "name": "航海師調節器", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 20, "itemId": 4310156, "name": "航海師硬幣", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": true }, { "idx": 21, "itemId": 1152179, "name": "航海師海盜護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 22, "itemId": 2630568, "name": "航海師武器變換箱", "minNum": 1, "maxNum": 1, "chance": 150000, "questId": 0, "indie": false, "shiny": false }, { "idx": 23, "itemId": 2630569, "name": "航海師防具變換箱", "minNum": 1, "maxNum": 1, "chance": 150000, "questId": 0, "indie": false, "shiny": false }, { "idx": 24, "itemId": 1082639, "name": "航海師盜賊手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 25, "itemId": 1152178, "name": "航海師盜賊護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 26, "itemId": 1004425, "name": "航海師盜賊帽", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 27, "itemId": 1073034, "name": "航海師盜賊鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 28, "itemId": 1052889, "name": "航海師盜賊套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 29, "itemId": 1152176, "name": "航海師法師護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 30, "itemId": 1102794, "name": "航海師法師斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 31, "itemId": 1082638, "name": "航海師弓箭手手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 32, "itemId": 1082637, "name": "航海師法師手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 33, "itemId": 1073032, "name": "航海師法師鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 34, "itemId": 1004424, "name": "航海師弓箭手帽", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 35, "itemId": 1052887, "name": "航海師法師套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 36, "itemId": 1152177, "name": "航海師弓箭手護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 37, "itemId": 1073033, "name": "航海師弓箭手鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 38, "itemId": 1052888, "name": "航海師弓箭手套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 39, "itemId": 1004422, "name": "航海師劍士頭盔", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 40, "itemId": 1403017, "name": "航海師武拳", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 41, "itemId": 1492231, "name": "航海師手槍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 42, "itemId": 1532144, "name": "航海師加農火砲", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 43, "itemId": 1482216, "name": "航海師指虎", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 44, "itemId": 1242116, "name": "航海師能量劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 45, "itemId": 1342101, "name": "航海師雙刀", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 46, "itemId": 1272016, "name": "航海師鎖鏈", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 47, "itemId": 1472261, "name": "航海師復仇拳套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 48, "itemId": 1242120, "name": "航海師能量劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 49, "itemId": 1332274, "name": "航海師短刀", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 50, "itemId": 1222109, "name": "航海師靈魂射手", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 51, "itemId": 1242120, "name": "航海師能量劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 52, "itemId": 1292017, "name": "航海師仙扇", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 53, "itemId": 1362135, "name": "航海師手杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 54, "itemId": 1232109, "name": "航海師死亡魔劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 55, "itemId": 1302333, "name": "航海師軍刀", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 56, "itemId": 2431305, "name": "金光四射閃亮武器箱", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": false, "shiny": false }, { "idx": 57, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": true }, { "idx": 58, "itemId": 5062009, "name": "紅色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": true }, { "idx": 59, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": true }, { "idx": 60, "itemId": 4310156, "name": "航海師硬幣", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": true }, { "idx": 61, "itemId": 5062010, "name": "黑色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": true }, { "idx": 62, "itemId": 2431305, "name": "金光四射閃亮武器箱", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": false, "shiny": false }, { "idx": 63, "itemId": 4310156, "name": "航海師硬幣", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": true }, { "idx": 64, "itemId": 1452252, "name": "航海師混合弓", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 65, "itemId": 1462239, "name": "航海師強弩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 66, "itemId": 1214017, "name": "航海師龍息射手", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 67, "itemId": 1522138, "name": "航海師雙弩槍 ", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 68, "itemId": 1552110, "name": "航海師扇子", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 69, "itemId": 1252093, "name": "航海師記憶長杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 70, "itemId": 1582017, "name": "航海師重拳槍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 71, "itemId": 1372222, "name": "航海師文字短杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 72, "itemId": 1432214, "name": "航海師穿刺槍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 73, "itemId": 1212115, "name": "航海師閃耀之杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 74, "itemId": 1442268, "name": "航海師戰戟", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 75, "itemId": 1382259, "name": "航海師文字長杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 76, "itemId": 1422184, "name": "航海師戰錘", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 77, "itemId": 1282016, "name": "航海師魔法護腕", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 78, "itemId": 1262017, "name": "航海師ESP限制器", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 79, "itemId": 1542108, "name": "航海師太刀", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 80, "itemId": 1012632, "name": "口紅控制器標誌", "minNum": 1, "maxNum": 1, "chance": 1000, "questId": 0, "indie": false, "shiny": false }, { "idx": 81, "itemId": 5062020, "name": "閃炫方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 82, "itemId": 4001872, "name": "定居金5000萬楓幣", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": false, "shiny": true }],
    8950111: [{ "idx": 0, "itemId": 4310156, "name": "航海師硬幣", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 1, "itemId": 5062010, "name": "黑色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 2, "itemId": 4310156, "name": "航海師硬幣", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 3, "itemId": 2431305, "name": "金光四射閃亮武器箱", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 4, "itemId": 4310156, "name": "航海師硬幣", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 5, "itemId": 5062009, "name": "紅色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 6, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 7, "itemId": 2431305, "name": "金光四射閃亮武器箱", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 8, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 9, "itemId": 1213017, "name": "航海師調節器", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 10, "itemId": 1232109, "name": "航海師死亡魔劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 11, "itemId": 1302333, "name": "航海師軍刀", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 12, "itemId": 1312199, "name": "航海師雙刃斧", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 13, "itemId": 1322250, "name": "航海師十字錘", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 14, "itemId": 1402251, "name": "航海師重劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 15, "itemId": 1412177, "name": "航海師戰斧", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 16, "itemId": 1422184, "name": "航海師戰錘", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 17, "itemId": 1432214, "name": "航海師穿刺槍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 18, "itemId": 1442268, "name": "航海師戰戟", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 19, "itemId": 1542108, "name": "航海師太刀", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 20, "itemId": 1582017, "name": "航海師重拳槍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 21, "itemId": 1212115, "name": "航海師閃耀之杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 22, "itemId": 1252093, "name": "航海師記憶長杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 23, "itemId": 1262017, "name": "航海師ESP限制器", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 24, "itemId": 1282016, "name": "航海師魔法護腕", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 25, "itemId": 1372222, "name": "航海師文字短杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 26, "itemId": 1382259, "name": "航海師文字長杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 27, "itemId": 1552110, "name": "航海師扇子", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 28, "itemId": 1214017, "name": "航海師龍息射手", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 29, "itemId": 1452252, "name": "航海師混合弓", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 30, "itemId": 1462239, "name": "航海師強弩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 31, "itemId": 1522138, "name": "航海師雙弩槍 ", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 32, "itemId": 1592019, "name": "航海師古代之弓", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 33, "itemId": 1242116, "name": "航海師能量劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 34, "itemId": 1242120, "name": "航海師能量劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 35, "itemId": 1272016, "name": "航海師鎖鏈", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 36, "itemId": 1292017, "name": "航海師仙扇", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 37, "itemId": 1332274, "name": "航海師短刀", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 38, "itemId": 1342101, "name": "航海師雙刀", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 39, "itemId": 1362135, "name": "航海師手杖", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 40, "itemId": 1472261, "name": "航海師復仇拳套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 41, "itemId": 1222109, "name": "航海師靈魂射手", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 42, "itemId": 1242116, "name": "航海師能量劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 43, "itemId": 1242120, "name": "航海師能量劍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 44, "itemId": 1403017, "name": "航海師武拳", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 45, "itemId": 1482216, "name": "航海師指虎", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 46, "itemId": 1492231, "name": "航海師手槍", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 47, "itemId": 1532144, "name": "航海師加農火砲", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 48, "itemId": 1004422, "name": "航海師劍士頭盔", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 49, "itemId": 1052882, "name": "航海師劍士套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 50, "itemId": 1073030, "name": "航海師劍士鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 51, "itemId": 1082636, "name": "航海師劍士手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 52, "itemId": 1102775, "name": "航海師劍士斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 53, "itemId": 1152174, "name": "航海師劍士護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 54, "itemId": 1004423, "name": "航海師法師帽", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 55, "itemId": 1052887, "name": "航海師法師套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 56, "itemId": 1073032, "name": "航海師法師鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 57, "itemId": 1082637, "name": "航海師法師手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 58, "itemId": 1102794, "name": "航海師法師斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 59, "itemId": 1152176, "name": "航海師法師護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 60, "itemId": 1004424, "name": "航海師弓箭手帽", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 61, "itemId": 1052888, "name": "航海師弓箭手套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 62, "itemId": 1073033, "name": "航海師弓箭手鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 63, "itemId": 1082638, "name": "航海師弓箭手手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 64, "itemId": 1102795, "name": "航海師弓箭手斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 65, "itemId": 1152177, "name": "航海師弓箭手護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 66, "itemId": 1004425, "name": "航海師盜賊帽", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 67, "itemId": 1052889, "name": "航海師盜賊套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 68, "itemId": 1073034, "name": "航海師盜賊鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 69, "itemId": 1082639, "name": "航海師盜賊手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 70, "itemId": 1102796, "name": "航海師盜賊斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 71, "itemId": 1152178, "name": "航海師盜賊護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 72, "itemId": 1004426, "name": "航海師海盜帽", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 73, "itemId": 1052890, "name": "航海師海盜套裝", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 74, "itemId": 1073035, "name": "航海師海盜鞋", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 75, "itemId": 1082640, "name": "航海師海盜手套", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 76, "itemId": 1102797, "name": "航海師海盜斗篷", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 77, "itemId": 1152179, "name": "航海師海盜護肩", "minNum": 1, "maxNum": 1, "chance": 2000, "questId": 0, "indie": false, "shiny": false }, { "idx": 78, "itemId": 2630569, "name": "航海師防具變換箱", "minNum": 1, "maxNum": 1, "chance": 150000, "questId": 0, "indie": false, "shiny": false }, { "idx": 79, "itemId": 2630568, "name": "航海師武器變換箱", "minNum": 1, "maxNum": 1, "chance": 150000, "questId": 0, "indie": false, "shiny": false }, { "idx": 80, "itemId": 1022278, "name": "附有魔力的眼罩", "minNum": 1, "maxNum": 1, "chance": 500, "questId": 0, "indie": false, "shiny": true }, { "idx": 81, "itemId": 2637491, "name": "黑色接力箱子", "minNum": 1, "maxNum": 1, "chance": 160000, "questId": 0, "indie": true, "shiny": true }, { "idx": 82, "itemId": 4001872, "name": "定居金5000萬楓幣", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": false, "shiny": false }],
    8880167: [{ "idx": 0, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 1, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 2, "itemId": 5062010, "name": "黑色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 3, "itemId": 5062009, "name": "紅色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 4, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 5, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 6, "itemId": 4001879, "name": "蝴蝶翅膀水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 7, "itemId": 4001879, "name": "蝴蝶翅膀水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 8, "itemId": 4001879, "name": "蝴蝶翅膀水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 9, "itemId": 4001886, "name": "強烈的力量結晶", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": false, "shiny": false }, { "idx": 10, "itemId": 1132308, "name": "夢幻的腰帶", "minNum": 1, "maxNum": 1, "chance": 100, "questId": 0, "indie": false, "shiny": true }, { "idx": 11, "itemId": 2637491, "name": "黑色接力箱子", "minNum": 1, "maxNum": 1, "chance": 160000, "questId": 0, "indie": true, "shiny": true }],
    8950114: [{ "idx": 0, "itemId": 4001886, "name": "強烈的力量結晶", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": false, "shiny": false }, { "idx": 1, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 2, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 3, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 4, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 5, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 6, "itemId": 5062009, "name": "紅色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 7, "itemId": 5062010, "name": "黑色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 8, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 9, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 10, "itemId": 2633926, "name": "受詛咒的魔導書選擇箱", "minNum": 1, "maxNum": 1, "chance": 1500, "questId": 0, "indie": false, "shiny": true }, { "idx": 11, "itemId": 2637491, "name": "黑色接力箱子", "minNum": 1, "maxNum": 1, "chance": 160000, "questId": 0, "indie": true, "shiny": true }],
    8950115: [{ "idx": 0, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 1, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 2, "itemId": 5062500, "name": "附加方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 3, "itemId": 5062010, "name": "黑色方塊", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 4, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 10, "maxNum": 15, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 5, "itemId": 4001886, "name": "強烈的力量結晶", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 6, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 7, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 8, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 9, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 10, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 11, "itemId": 4001890, "name": "克伯威水滴石", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 12, "itemId": 1592020, "name": "神秘冥界幽靈古代之弓", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 13, "itemId": 1302343, "name": "神秘冥界幽靈長劍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 14, "itemId": 1292018, "name": "神秘冥界幽靈仙扇", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 15, "itemId": 1213018, "name": "神秘冥界幽靈調節器", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 16, "itemId": 1522143, "name": "神秘冥界幽靈雙弩槍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 17, "itemId": 1402259, "name": "神秘冥界幽靈雙手劍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 18, "itemId": 1312203, "name": "神秘冥界幽靈之斧", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 19, "itemId": 1412181, "name": "神秘冥界幽靈雙手斧", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 20, "itemId": 1322255, "name": "神秘冥界幽靈之錘", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 21, "itemId": 1422189, "name": "神秘冥界幽靈雙手錘", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 22, "itemId": 1432218, "name": "神秘冥界幽靈之槍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 23, "itemId": 1442274, "name": "神秘冥界幽靈之矛", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 24, "itemId": 1232113, "name": "神秘冥界幽靈魔劍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 25, "itemId": 1382265, "name": "神秘冥界幽靈長杖", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 26, "itemId": 1452257, "name": "神秘冥界幽靈之弓", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 27, "itemId": 1462243, "name": "神秘冥界幽靈十字弓", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 28, "itemId": 1372228, "name": "神秘冥界幽靈短杖", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 29, "itemId": 1403018, "name": "神秘冥界幽靈武拳", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 30, "itemId": 1214018, "name": "神秘冥界幽靈龍息射手", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 31, "itemId": 1332279, "name": "神秘冥界幽靈短刀", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 32, "itemId": 1472265, "name": "神秘冥界幽靈鬥拳", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 33, "itemId": 1492235, "name": "神秘冥界幽靈火槍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 34, "itemId": 1482221, "name": "神秘冥界幽靈之爪", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 35, "itemId": 1532150, "name": "神秘冥界幽靈加農砲", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 36, "itemId": 1362140, "name": "神秘冥界幽靈手杖", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 37, "itemId": 1272017, "name": "神秘冥界幽靈鎖鏈", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 38, "itemId": 1552119, "name": "神秘冥界幽靈扇子", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 39, "itemId": 1542117, "name": "神秘冥界幽靈刀", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 40, "itemId": 1252098, "name": "神秘冥界幽靈記憶長杖", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 41, "itemId": 1212120, "name": "神秘冥界幽靈閃耀之杖", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 42, "itemId": 1522143, "name": "神秘冥界幽靈雙弩槍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 43, "itemId": 1242122, "name": "神秘冥界幽靈能量劍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 44, "itemId": 1242121, "name": "神秘冥界幽靈能量劍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 45, "itemId": 1262039, "name": "神秘冥界幽靈ESP限制器", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 46, "itemId": 1282017, "name": "神秘冥界幽靈魔法護腕", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 47, "itemId": 1222113, "name": "神秘冥界幽靈靈魂射手", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 48, "itemId": 1582023, "name": "神秘冥界幽靈重拳槍", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 49, "itemId": 1403030, "name": "神秘冥界幽靈武拳", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 50, "itemId": 1004808, "name": "神秘冥界幽靈騎士帽", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 51, "itemId": 1004809, "name": "神秘冥界幽靈魔法帽", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 52, "itemId": 1004810, "name": "神秘冥界幽靈弓手帽", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 53, "itemId": 1004811, "name": "神秘冥界幽靈小偷帽", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 54, "itemId": 1004812, "name": "神秘冥界幽靈海盜帽", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 55, "itemId": 1053063, "name": "神秘冥界幽靈騎士套裝", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 56, "itemId": 1053064, "name": "神秘冥界幽靈魔導士套裝", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 57, "itemId": 1053065, "name": "神秘冥界幽靈弓手套裝", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 58, "itemId": 1053066, "name": "神秘冥界幽靈小偷套裝", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 59, "itemId": 1053067, "name": "神秘冥界幽靈海盜套裝", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 60, "itemId": 1102940, "name": "神秘冥界幽靈騎士斗篷", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 61, "itemId": 1102941, "name": "神秘冥界幽靈法師斗篷", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 62, "itemId": 1102942, "name": "神秘冥界幽靈弓手斗篷", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 63, "itemId": 1102943, "name": "神秘冥界幽靈小偷斗篷", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 64, "itemId": 1102944, "name": "神秘冥界幽靈海盜斗篷", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 65, "itemId": 1152196, "name": "神秘冥界幽靈騎士護肩", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 66, "itemId": 1152197, "name": "神秘冥界幽靈魔法護肩", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 67, "itemId": 1152198, "name": "神秘冥界幽靈弓手護肩", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 68, "itemId": 1152199, "name": "神秘冥界幽靈小偷護肩", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 69, "itemId": 1152200, "name": "神秘冥界幽靈海盜護肩", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 70, "itemId": 1082695, "name": "神秘冥界幽靈騎士手套", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 71, "itemId": 1082696, "name": "神秘冥界幽靈魔導士手套", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 72, "itemId": 1082697, "name": "神秘冥界幽靈弓手手套", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 73, "itemId": 1082698, "name": "神秘冥界幽靈小偷手套", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 74, "itemId": 1082699, "name": "神秘冥界幽靈海盜手套", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 75, "itemId": 1073158, "name": "神秘冥界幽靈騎士鞋子", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 76, "itemId": 1073159, "name": "神秘冥界幽靈魔導士鞋子", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 77, "itemId": 1073160, "name": "神秘冥界幽靈弓手鞋子", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 78, "itemId": 1073161, "name": "神秘冥界幽靈小偷鞋子", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 79, "itemId": 1073162, "name": "神秘冥界幽靈海盜鞋子", "minNum": 1, "maxNum": 1, "chance": 450, "questId": 0, "indie": false, "shiny": false }, { "idx": 80, "itemId": 2633926, "name": "受詛咒的魔導書選擇箱", "minNum": 1, "maxNum": 1, "chance": 3000, "questId": 0, "indie": false, "shiny": true }, { "idx": 81, "itemId": 5062500, "name": "附加方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 82, "itemId": 5062500, "name": "附加方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 83, "itemId": 5062500, "name": "附加方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 84, "itemId": 5062009, "name": "紅色方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 85, "itemId": 5062009, "name": "紅色方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 86, "itemId": 5062009, "name": "紅色方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 87, "itemId": 5062009, "name": "紅色方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 88, "itemId": 5062009, "name": "紅色方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 89, "itemId": 5062009, "name": "紅色方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 90, "itemId": 2437750, "name": "選擇祕法符文", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 91, "itemId": 2437750, "name": "選擇祕法符文", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 92, "itemId": 2437750, "name": "選擇祕法符文", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 93, "itemId": 2437750, "name": "選擇祕法符文", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 94, "itemId": 4009548, "name": "靈魂艾爾達碎片", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 95, "itemId": 4009548, "name": "靈魂艾爾達碎片", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 96, "itemId": 4009548, "name": "靈魂艾爾達碎片", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 97, "itemId": 4009548, "name": "靈魂艾爾達碎片", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 98, "itemId": 4009548, "name": "靈魂艾爾達碎片", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 99, "itemId": 4009548, "name": "靈魂艾爾達碎片", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 100, "itemId": 4001872, "name": "定居金5000萬楓幣", "minNum": 2, "maxNum": 3, "chance": 1000000, "questId": 0, "indie": true, "shiny": true }],
    8950120: [{ "idx": 0, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 1, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 2, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 3, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 4, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 5, "itemId": 5062500, "name": "附加方塊", "minNum": 5, "maxNum": 10, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 6, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 7, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 8, "itemId": 4001886, "name": "強烈的力量結晶", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": false, "shiny": false }, { "idx": 9, "itemId": 4001894, "name": "黑暗力量的氣息", "minNum": 5, "maxNum": 12, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 10, "itemId": 1122430, "name": "苦痛的根源", "minNum": 1, "maxNum": 1, "chance": 500, "questId": 0, "indie": false, "shiny": true }, { "idx": 11, "itemId": 4001714, "name": "定居金100萬楓幣", "minNum": 1, "maxNum": 3, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 12, "itemId": 5062020, "name": "閃炫方塊", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 13, "itemId": 2637491, "name": "黑色接力箱子", "minNum": 1, "maxNum": 1, "chance": 160000, "questId": 0, "indie": true, "shiny": true }],
    8950116: [{ "idx": 0, "itemId": 4001893, "name": "心願的火焰", "minNum": 10, "maxNum": 25, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 1, "itemId": 4001886, "name": "強烈的力量結晶", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": false, "shiny": false }, { "idx": 2, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 3, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 4, "itemId": 5062500, "name": "附加方塊", "minNum": 5, "maxNum": 10, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 5, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 6, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 7, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 8, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 9, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 10, "itemId": 1113306, "name": "巨大的恐怖", "minNum": 1, "maxNum": 1, "chance": 500, "questId": 0, "indie": false, "shiny": true }, { "idx": 11, "itemId": 2637491, "name": "黑色接力箱子", "minNum": 1, "maxNum": 1, "chance": 160000, "questId": 0, "indie": true, "shiny": true }, { "idx": 12, "itemId": 5062020, "name": "閃炫方塊", "minNum": 5, "maxNum": 5, "chance": 460000, "questId": 0, "indie": true, "shiny": false }],
    8950118: [{ "idx": 0, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 1, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 2, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 3, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 4, "itemId": 2636883, "name": "靈魂艾爾達的氣息", "minNum": 1, "maxNum": 1, "chance": 600000, "questId": 0, "indie": true, "shiny": false }, { "idx": 5, "itemId": 5062500, "name": "附加方塊", "minNum": 5, "maxNum": 10, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 6, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 7, "itemId": 2432206, "name": "玫瑰庭園箱子", "minNum": 1, "maxNum": 1, "chance": 500000, "questId": 0, "indie": true, "shiny": false }, { "idx": 8, "itemId": 4001886, "name": "強烈的力量結晶", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": false, "shiny": false }, { "idx": 9, "itemId": 4001893, "name": "心願的火焰", "minNum": 10, "maxNum": 25, "chance": 1000000, "questId": 0, "indie": true, "shiny": false }, { "idx": 10, "itemId": 1032316, "name": "指揮官力量耳環", "minNum": 1, "maxNum": 1, "chance": 500, "questId": 0, "indie": false, "shiny": true }, { "idx": 11, "itemId": 2637491, "name": "黑色接力箱子", "minNum": 1, "maxNum": 1, "chance": 160000, "questId": 0, "indie": true, "shiny": true }, { "idx": 12, "itemId": 5062020, "name": "閃炫方塊", "minNum": 5, "maxNum": 5, "chance": 160000, "questId": 0, "indie": true, "shiny": false }],
    8880771: [{ "idx": 0, "itemId": 4001886, "name": "強烈的力量結晶", "minNum": 1, "maxNum": 1, "chance": 1000000, "questId": 0, "indie": false, "shiny": false }]
};

const 魔方_紅 = 5062009;
const 魔方_黑 = 5062010;
const 魔方_綠 = 5062500;
const 魔方_白 = 5062031;
const 魔方_平等 = 5062021;
const 魔方_唯一 = 5062026;
const 魔方_鏡像 = 5062010;
const 魔方_六角 = 5062020;
const 首領怪幣 = 4009495;
const 火花160 = 2048796;
let dropInfo0 = {
    "boss_balrog_easy": {
        "name": "巴洛古[easy]",
        "listA": [
            [10000, 1, 3, 魔方_紅],
            [10000, 1, 3, 魔方_黑],
            [10000, 10, 13, 首領怪幣],
            // [10000, 2, 5, 2634937],//特殊名譽勳章
            // [10000, 10, 20, 4001832],//咒文的痕跡
            // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_zakum_easy": {
        "name": "炎魔[easy]",
        "listA": [
            [10000, 1, 3, 魔方_紅],
            [10000, 1, 3, 魔方_黑],
            [10000, 10, 13, 首領怪幣],
            [5000, 1, 1, 火花160],
        ],
        "listB": [
            [1000, 1, 1, 1022231],//水中信紙眼飾
            [1000, 1, 1, 1012478],//凝聚力量的結晶石
        ]
    },
    "boss_zakum_normal": {
        "name": "炎魔[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [1000, 1, 1, 1022231],//水中信紙眼飾
            [1000, 1, 1, 1012478],//凝聚力量的結晶石
        ]
    },
    "boss_zakum_chaos": {
        "name": "炎魔[chaos]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [1000, 1, 1, 1022231],//水中信紙眼飾
            [1000, 1, 1, 1012478],//凝聚力量的結晶石
        ]
    },
    "boss_hontale_easy": {
        "name": "闇黑龍王[easy]",
        "listA": [
            [10000, 1, 3, 魔方_紅],
            [10000, 1, 3, 魔方_黑],
            [10000, 10, 13, 首領怪幣],
            [5000, 1, 1, 火花160],
        ],
        "listB": [
            // [100, 1, 1, 1032241],//戴雅希杜斯耳環
            // [100, 1, 1, 1113149],//銀花戒指
        ]
    },
    "boss_hontale_normal": {
        "name": "闇黑龍王[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            // [300, 1, 1, 1032241],//戴雅希杜斯耳環
            // [300, 1, 1, 1113149],//銀花戒指
        ]
    },
    "boss_hontale_chaos": {
        "name": "闇黑龍王[chaos]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            // [1000, 1, 1, 1032241],//戴雅希杜斯耳環
            // [1000, 1, 1, 1113149],//銀花戒指
            // [1000, 1, 1, 1122076],//chaos闇黑龍王的項鍊
            // [1000, 1, 1, 2435711],//R卷自選
            // [1500, 1, 1, 2048716],//強力輪迴星火
            // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_caoong_normal": {
        "name": "闇黑龍王[chaos]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            // [1000, 1, 1, 1032241],//戴雅希杜斯耳環
            // [1000, 1, 1, 1113149],//銀花戒指
            // [1000, 1, 1, 1122076],//chaos闇黑龍王的項鍊
            // [1000, 1, 1, 2435711],//R卷自選
            // [1500, 1, 1, 2048716],//強力輪迴星火
            // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_hillah_normal": {
        "name": "希拉[normal]",
        "listA": [
            [10000, 2, 3, 4001713],//定居金10萬楓幣
            // [10000, 3, 6, 2711000],//可疑的方塊
            // [10000, 3, 6, 2634937],//特殊名譽勳章
            // [10000, 20, 30, 4001832],//咒文的痕跡
        ],
        "listB": [
            [300, 1, 1, 1032136],//地獄火耳環
            [300, 1, 1, 1162009],//永生之石
        ]
    },
    "boss_hillah_hard": {
        "name": "希拉[hard]",
        "listA": [
            [10000, 3, 5, 4001713],//定居金10萬楓幣
            // [10000, 5, 10, 2711000],//可疑的方塊
            // [10000, 5, 10, 2634937],//特殊名譽勳章
            // [10000, 30, 50, 4001832],//咒文的痕跡
        ],
        "listB": [
            [1000, 1, 1, 1032136],//地獄火耳環
            // [1000, 1, 1, 1162009],//永生之石
            // [300, 1, 1, 1142826],//希拉的摯友 
            // [1000, 1, 1, 2435711],//R卷自選
            // [1500, 1, 1, 2048716],//強力輪迴星火
            // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_pierre_normal": {
        "name": "比艾樂[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [500, 1, 1, 1003719],//精靈頭
        ]
    },
    "boss_pierre_chaos": {
        "name": "比艾樂[chaos]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [3000, 1, 1, 1003719],//精靈頭
        ]
    },
    "boss_banban_normal": {
        "name": "斑斑[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [500, 1, 1, 1003720],//精靈頭
        ]
    },
    "boss_banban_chaos": {
        "name": "斑斑[chaos]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [3000, 1, 1, 1003720],//精靈頭
        ]
    },
    "boss_bloody_normal": {
        "name": "血腥皇后[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [500, 1, 1, 1003721],//精靈頭
        ]
    },
    "boss_bloody_chaos": {
        "name": "血腥皇后[chaos]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [3000, 1, 1, 1003721],//精靈頭
        ]
    },
    "boss_bellum_normal": {
        "name": "貝倫[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [500, 1, 1, 1003722],//精靈頭
        ]
    },
    "boss_bellum_chaos": {
        "name": "貝倫[chaos]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [3000, 1, 1, 1003722],//精靈頭
        ]
    },
    "boss_vanleon_easy": {
        "name": "凡雷恩[easy]",
        "listA": [
            [10000, 1, 3, 魔方_紅],
            [10000, 1, 3, 魔方_黑],
            [10000, 10, 13, 首領怪幣],
            [5000, 1, 1, 火花160],
        ],
        "listB": [
        ]
    },
    "boss_vanleon_normal": {
        "name": "凡雷恩[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
        ]
    },
    "boss_vanleon_hard": {
        "name": "凡雷恩[hard]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
        ]
    },
    "boss_akayrum_easy": {
        "name": "阿卡伊農[easy]",
        "listA": [
            [10000, 1, 3, 魔方_紅],
            [10000, 1, 3, 魔方_黑],
            [10000, 10, 13, 首領怪幣],
            [5000, 1, 1, 火花160],
        ],
        "listB": [
            [300, 1, 1, 1122150],//支配者墜飾 
        ]
    },
    "boss_akayrum_normal": {
        "name": "阿卡伊農[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [1000, 1, 1, 1122150],//支配者墜飾 
            // [300, 1, 1, 1142501],//神秘阿卡伊農的噩夢
            // [1000, 1, 1, 2435711],//R卷自選
            // [1500, 1, 1, 2048716],//強力輪迴星火
            // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_magnus_easy": {
        "name": "梅格耐斯[easy]",
        "listA": [
            [10000, 1, 3, 魔方_紅],
            [10000, 1, 3, 魔方_黑],
            [10000, 10, 13, 首領怪幣],
            [5000, 1, 1, 火花160],
        ],
        "listB": [
        ]
    },
    "boss_magnus_normal": {
        "name": "梅格耐斯[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
        ]
    },
    "boss_magnus_hard": {
        "name": "梅格耐斯[hard]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
        ]
    },
    "boss_pinkbeen_normal": {
        "name": "皮卡啾[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [300, 1, 1, 1022232],//黑豆標記
            [1000, 1, 1, 1022182],//黑豆標記 1022182
            [300, 1, 1, 1162025],//粉紅聖杯 
        ]
    },
    "boss_pinkbeen_chaos": {
        "name": "皮卡啾[chaos]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [2000, 1, 1, 1022182],//黑豆標記
            // [1000, 1, 1, 1162025],//粉紅聖杯 
            // [300, 1, 1, 1142840],//我的朋友皮卡啾！
            // [1000, 1, 1, 2435711],//R卷自選
            // [1500, 1, 1, 2048716],//強力輪迴星火
            // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_shinas_easy": {
        "name": "西格諾斯[easy]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
        ]
    },
    "boss_shinas_normal": {
        "name": "西格諾斯[normal]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            // [10000, 2, 3, 4001713],//定居金10萬楓幣
            // [500, 1, 1, 1113070],//紫翼戒指  
            // [500, 1, 1, 1032216],//紫翼耳環 
            // [500, 1, 1, 1152155],//紫翼護肩 
            // [500, 1, 1, 1202119],//異界的西格諾斯圖騰
            // [300, 1, 1, 3010071],//迷你神獸椅 
            // [1000, 1, 1, 2435711],//R卷自選
            // [1500, 1, 1, 2048716],//強力輪迴星火
            // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_ranmaru_normal": {
        "name": "森蘭丸[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            // [300, 1, 1, 1012478],//凝聚力量的結晶石  
            // [300, 1, 1, 1022231],//水中信紙眼飾 
        ]
    },
    "boss_ranmaru_hard": {
        "name": "森蘭丸[hard]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            // [10000, 3, 5, 4001713],//定居金10萬楓幣
            // // [1000, 1, 1, 1022231],//水中信紙眼飾 
            // // [1000, 1, 1, 2435711],//R卷自選
            // // [1500, 1, 1, 2048716],//強力輪迴星火
            // // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_princessno_normal": {
        "name": "濃姬[normal]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            // [10000, 1, 5, 4001715],//定居金10萬楓幣
            // [10000, 1, 2,2630594],//魅惑的碎片 
        ]
    },
    "boss_papulatus_easy": {
        "name": "拉圖斯[easy]",
        "listA": [
            [10000, 1, 3, 魔方_紅],
            [10000, 1, 3, 魔方_黑],
            [10000, 10, 13, 首領怪幣],
            [5000, 1, 1, 火花160],
        ],
        "listB": [
            [1000, 1, 1, 1022277],//拉圖斯標誌 
            // [300, 1, 1, 1022232],//黑豆標記
            // [300, 1, 1, 1022231],//水中信紙眼飾
        ]
    },
    "boss_papulatus_normal": {
        "name": "拉圖斯[normal]",
        "listA": [
            [3500, 1, 1, 魔方_綠],
            [3500, 1, 1, 魔方_平等],
            [4000, 1, 1, 魔方_六角],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [1000, 1, 1, 1022277],//拉圖斯標誌 
            // [600, 1, 1, 1022232],//黑豆標記
            // [600, 1, 1, 1022231],//水中信紙眼飾
        ]
    },
    "boss_papulatus_chaos": {
        "name": "拉圖斯[chaos]",
        "listA": [
            [10000, 3, 5, 魔方_白],
            [10000, 1, 5, 魔方_唯一],
            [10000, 1, 3, 火花160],
            [10000, 10, 13, 首領怪幣],
        ],
        "listB": [
            [2000, 1, 1, 1022277],//拉圖斯標誌 
            // [1000, 1, 1, 1022232],//黑豆標記
            // [1000, 1, 1, 1022231],//水中信紙眼飾
            // [1000, 1, 1, 2435711],//R卷自選
            // [1500, 1, 1, 2048716],//強力輪迴星火
            // [10000, 1, 1, 4033441],//黑色 下級魔晶石
        ]
    },
    "boss_slime_normal": {
        "name": "守護天使綠水靈[normal]",
        "listA": [
            [10000, 5, 15, 4001713],//定居金10萬楓幣
            [10000, 1, 3, 5062507],//珍貴附加方塊
            [10000, 5, 10, 2634937],//特殊名譽勳章
            [10000, 30, 50, 4001832],//咒文的痕跡
        ],
        "listB": [
            [1000, 1, 1, 1113313],//守護者天使戒指 
            [50, 1, 1, 1113316],//黎明守護者天使戒指 
            [50, 1, 1, 1032330],//星耀耳環 
            [50, 1, 1, 1122443],//破曉墜飾 
            [50, 1, 1, 1012757],//暮光印記
            [1000, 1, 1, 2435712],//X卷自選 
            [1000, 1, 1, 2048769],//永遠的輪迴星火  
            //   [1000, 1, 1,2028407],//綠玉的BOSS戒指箱子(下級) 
            [10000, 1, 1, 4033441],//黑色 下級魔晶石
            [10000, 5, 8, 4009547],//靈魂艾爾達碎片
        ]
    }
}

start();


