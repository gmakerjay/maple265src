/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
 /*
let log = require('check_log');
execute();

function execute() {
    switch (ctx.getDataId()) {
        case 9901500:
            var bossName = "高中高";
            var eventKey = "膜拜大佬";
            var weapon = stage.getItemBySlot(-1, -11);
            var todayKey = `WORLDSHARE.${eventKey}.${stage.getAccountId()}`;
            var 已膜拜 = log.getEventValue(stage, db, "膜拜大佬") > 0;

            var text = "#r#e#fUI/piggyBarMinigame/crunch/6##b星語谷養老院#k的榮譽#fUI/piggyBarMinigame/crunch/8#\r\n";
            text += "#fUI/NameTag/157/w##fUI/NameTag/157/c##fUI/NameTag/157/e#\r\n";
            text += "#r膜拜大佬可以在(0~2000)間隨機獲得楓點！\r\n";
            text += "#b不良人家族：老有所養，樂有所依\r\n";
            text += "#b他的口號是：打不過就充錢~\r\n";
            text += `#b大佬本月被膜拜次數：${formatNumberToMoney(getBossFaithCount(bossName))}\r\n`;
            text += `#b大佬的累計楓點貢獻：${formatNumberToMoney(getBossTotalFaith(bossName))}\r\n`;
            text += `#b我本月累計楓點獲取：${formatNumberToMoney(getPlayerFaith(bossName))}\r\n`;
            text += "#L1##fUI/Basic/CheckBox1/1##r膜拜大佬#l\r\n";
            var sel = npc.askMenu(text);
            if (sel === 1) {
                if (已膜拜) {
                    npc.say("今天已經膜拜過一名大佬了，每天只能膜拜一次。");
                    return;
                }

                if (!weapon) {
                    npc.say("請將武器拿在手上（裝備欄最上面）再試！");
                    return;
                }
                var qt = rand(0, 2000);
                stage.modifyCurrency(2, qt);
                stage.showSystemMessage("獲得" + qt + "抵用券");
                log.addEventValue(stage, db, "膜拜大佬");
                db.insert(`insert into zsf_膜拜大佬突破(lb, player_id, boss_name)
                           values (${qt}, ${stage.getCharacterId()}, '${bossName}')`);
                var msg = `膜拜 ${bossName} 大佬，獲得了楓點：${qt} 點`;
                util.broadcastWorldChatMsg(0x1, "榮譽殿堂: 玩家 " + stage.getCharacterName() + " " + msg);
                npc.say("#b完成膜拜大佬！#k\r\n獲得楓點：" + qt);
            }
            break;
    }
}


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBossTotalFaith(name) {
    var rows = db.select(`SELECT COALESCE(SUM(lb), 0) AS total
                          FROM zsf_膜拜大佬突破
                          WHERE boss_name = '${name}'
                            AND MONTH(time) = MONTH(CURRENT_DATE())
                            AND YEAR(time) = YEAR(CURRENT_DATE())`);
    return rows.length > 0 ? parseInt(rows[0].get("total")) : 0;
}

function getBossFaithCount(name) {
    var rows = db.select(`SELECT COUNT(*) AS cnt
                          FROM zsf_膜拜大佬突破
                          WHERE boss_name = '${name}'
                            AND MONTH(time) = MONTH(CURRENT_DATE())
                            AND YEAR(time) = YEAR(CURRENT_DATE())`);
    return rows.length > 0 ? parseInt(rows[0].get("cnt")) : 0;
}

function getPlayerFaith(name) {
    var rows = db.select(`SELECT COALESCE(SUM(lb), 0) AS total
                          FROM zsf_膜拜大佬突破
                          WHERE boss_name = '${name}'
                            AND player_id = ${stage.getCharacterId()}
                            AND MONTH(time) = MONTH(CURRENT_DATE())
                            AND YEAR(time) = YEAR(CURRENT_DATE())`);
    return rows.length > 0 ? parseInt(rows[0].get("total")) : 0;
}


function formatNumberToMoney(n) {
    var isNegative = n < 0;
    var str = Math.abs(n).toString();
    var result = '';
    var counter = 0;

    for (var i = str.length - 1; i >= 0; i--) {
        counter++;
        result = str[i] + result;
        if (counter % 3 === 0 && i !== 0) {
            result = ',' + result;
        }
    }

    return isNegative ? '-' + result : result;
}
*/

stage.applySkillBuff(4001003,1)