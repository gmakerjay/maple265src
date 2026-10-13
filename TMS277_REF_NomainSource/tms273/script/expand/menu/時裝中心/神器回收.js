/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


var {getPay} = require('vipCommon.js');

let log = require('check_log');

const list = [
    [1003843, 1003843, 8888, 18888],
    [1082553, 1082553, 8888, 18888],
    [1073773, 1073773, 8888, 18888],
    [1102604, 1102604, 8888, 18888],
    [1114403, 1114403, 8888, 18888],
    [1114404, 1114404, 1000, 1000],
    [1114405, 1114405, 1000, 1000],
    [1114406, 1114406, 1000, 1000],
    [1114407, 1114407, 1000, 1000],
	
];


let str = ``;
const price = 8888;

function start() {

    let str = '神器回收\r\n';
    str += `請將要分解的裝備放在裝備欄第一格\r\n`;
    for (let i in list) {
        let item = list[i];
        str += `#L${i}##v${item[1]}##z${item[1]}# -> 樂豆 x ${item[2]}~${item[3]} #k#l\r\n`;
    }

    let sel = npc.askMenu(str);
    if (stage.getItemQuantity(list[sel][1]) > 1) {
        let toDrop = stage.getItemBySlot(6, 1);
        if (toDrop == null) {
            npc.say("請將您需要分解的裝備放到第一格！");
            return;
        } else if (toDrop.getItemId() != list[sel][0]) {
            npc.say("請將您需要分解的裝備放到第一格！");
            return;
        }
        if (npc.askYesNo(`是否確認分解:\r\n#v${list[sel][0]}##z${list[sel][0]}# -> 樂豆 x ${list[sel][2]}~${list[sel][3]}`) == 1) {
            if (stage.canHold(list[sel][1], 1)) {
                var randomNum = Math.floor(Math.random() * (list[sel][3] - list[sel][2] + 1)) + list[sel][2];
                util.broadcastChatMsg(1, `<${stage.getCharacterName()}> 在暖暖中心分解了 <${util.getItemName(toDrop.getItemId())}> 獲得樂豆 <${randomNum}>`);
                util.broadcastChatMsg(2, `<${stage.getCharacterName()}> 在暖暖中心分解了 <${util.getItemName(toDrop.getItemId())}> 獲得樂豆 <${randomNum}>`);
                util.broadcastChatMsg(3, `<${stage.getCharacterName()}> 在暖暖中心分解了 <${util.getItemName(toDrop.getItemId())}> 獲得樂豆 <${randomNum}>`);
                util.broadcastChatMsg(4, `<${stage.getCharacterName()}> 在暖暖中心分解了 <${util.getItemName(toDrop.getItemId())}> 獲得樂豆 <${randomNum}>`);
                util.broadcastChatMsg(5, `<${stage.getCharacterName()}> 在暖暖中心分解了 <${util.getItemName(toDrop.getItemId())}> 獲得樂豆 <${randomNum}>`);
                util.broadcastChatMsg(6, `<${stage.getCharacterName()}> 在暖暖中心分解了 <${util.getItemName(toDrop.getItemId())}> 獲得樂豆 <${randomNum}>`);
                util.broadcastWeatherEffectNotice(`<${stage.getCharacterName()}> 在暖暖中心分解了 <${util.getItemName(toDrop.getItemId())}>  獲得樂豆 <${randomNum}>`, 224, 100000, true);
                util.log(`大佬 <${stage.getCharacterName()}> 在火花回收中心分解了 <${util.getItemName(toDrop.getItemId())}> 大佬強無敵`);


                stage.removeItemBySlot(6, 1);
                // player.gainItem(list[sel][1], list[sel][2]);
               /* db.update(`update hypay
                           set pay =pay + ${randomNum)}
                           where accname = '${getAccountName()}';`);*/
						   stage.modifyCurrency(1,randomNum)
                log.addEventValue(stage, db, "回收" + util.getItemName(list[sel][0]));
                // player.customSqlUpdate(`update zsf_huishou set saled = saled + 1 where id = ${list[sel][0]}`);

                npc.say("分解成功,獲得樂豆: #r#e" + randomNum + "#k");

            } else {
                npc.say("背包空間不足！");
            }

        }
    } else {
        npc.say("擁有一個以上才可以分解該物品...");
    }
}

start();

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}