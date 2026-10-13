/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

execute();

function execute() {
    let coordinate = [-5000, -5001, -5002];
    let judge = false;
    for (let i in coordinate) {
        let Equip = stage.getItemBySlot(-5, coordinate[i]);
        if (Equip == null) continue;
        if (Equip['itemId'] == 1202193) judge = true;
        break;
    }
    if (stage.hasItem(1202193, 1)) judge = true;
    let date = stage.getQuestRecordExShare(200000, "samsara");
    let numericDate = Number(date);
    if (isNaN(numericDate)) {
        stage.updateQuestRecordExShare(200000, "samsara", String(0));
    }
    let onedate = calculateTimeDifference(parseInt(new Date().getTime() / 1000), numericDate);
    if (onedate.milliseconds <= 0) {
        let txt = "使用該物品可以給賬號下其他角色授權 72 小時輪迴石碑\r\n";
        txt += "自身必須擁有#r輪迴石碑#k這個物品 !#i1202193#\r\n";
        txt += "請問現在要使用嗎？\r\n";
        if (npc.meFlip().askYesNo(txt) != 1) return;
        if (!judge) {
            txt = "看起來你好像沒有輪迴石碑 #i1202193#\r\n";
            let samsara_count = stage.getIntQuestRecordEx(200000, "samsara_count");
            let samsara_money = 250 + 250 * samsara_count;
            txt += "是否消耗 " + (samsara_money > 1000 ? 1000 : samsara_money) + " 樂豆購買 3 天使用權!\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;
            if (stage.getCurrency(1) < (samsara_money > 1000 ? 1000 : samsara_money)) {
                npc.meFlip().say("真可惜..你沒有 " + (samsara_money > 1000 ? 1000 : samsara_money) + " 樂豆!");
                return;
            }
            stage.modifyCurrency(1, -(samsara_money > 1000 ? 1000 : samsara_money));
            if (samsara_count < 11) {
                samsara_count += 1;
                stage.updateQuestRecordEx(200000, "samsara_count", String(samsara_count));
            }
            date = parseInt((new Date().getTime() / 1000) + 3 * 24 * 60 * 60);
            stage.updateQuestRecordExShare(200000, "samsara", String(date));
            Equip = util.makeItem(1202193, 1);
            Equip['expireDate'] = date * 1000;
            Equip['attribute'] = 8;
            stage.gainItem(Equip);
            npc.meFlip().say("恭喜！續約成功!!");
        } else {
            date = parseInt((new Date().getTime() / 1000) + 3 * 24 * 60 * 60);
            stage.updateQuestRecordExShare(200000, "samsara", String(date));
            npc.meFlip().say("恭喜！共享成功!!");
        }
    } else {
        if (judge) {
            npc.meFlip().say("抱歉..你的背包存在 #i1202193# !");
            return;
        }
        Equip = util.makeItem(1202193, 1);
        Equip['expireDate'] = date * 1000;
        Equip['attribute'] = 8;
        stage.gainItem(Equip);
        npc.meFlip().say("期限石碑已發送至背包!");
    }
}

function calculateTimeDifference(timestamp1, timestamp2) {
    var date1 = new Date(timestamp1 * 1000);
    var date2 = new Date(timestamp2 * 1000);
    if (date1 > date2) {
        return {
            days: 0,
            milliseconds: 0
        };
    }
    var diff = Math.abs(date2 - date1);
    var daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
    var millisecondsDiff = diff;
    return {
        days: daysDiff,
        milliseconds: millisecondsDiff
    };
}