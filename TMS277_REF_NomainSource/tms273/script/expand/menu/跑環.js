/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let log = require('check_log');
//noinspection SpellCheckingInspection
let game = {
    maxlevel: 201,
    questid: 11087,
    maxenter: 25,
    maxreset: 5,
    extranum: 5
}
let reward = [
    [2439305, 20],
    [2633336, 12]
]
let quest = [
    [4000019, 150, 50000, 100000, "聽說大蘑菇有率蝸牛出沒，請收集150個#v4000019#交給我，我會給你不錯的獎勵哦！"],
    [4000007, 150, 101030000, 2230100, "聽說巨大的樹有火獨眼獸出沒，請收集150個#v4000007#交給我，我會給你不錯的獎勵哦！"],
    [4000013, 150, 101030100, 3230100, "聽說綠色樹枝有風獨眼獸出沒，請收集150個#v4000013#交給我，我會給你不錯的獎勵哦！"],
    [4000023, 150, 101030200, 4230100, "聽說北部森林有冰獨眼獸出沒，請收集150個#v4000023#交給我，我會給你不錯的獎勵哦！"],
    [4000621, 150, 101030300, 2230113, "聽說幼苗森林有黑獨眼獸出沒，請收集150個#v4000621#交給我，我會給你不錯的獎勵哦！"],
]
execute();

function execute() {
    let judge_date = stage.getIntQuestRecordEx(game.questid, 'date');
    if (judge_date != getNowFormatDate()) { 
        stage.updateQuestRecordEx(game.questid, 'date=' + getNowFormatDate() + ";count=0;rcount=0;start=1;quest=0");
    }
    let count = stage.getIntQuestRecordEx(game.questid, 'count');
    let start = stage.getIntQuestRecordEx(game.questid, 'start');
    let index = stage.getIntQuestRecordEx(game.questid, 'quest');
    let reset = stage.getIntQuestRecordEx(game.questid, 'rcount');
    let reward_index = stage.getLevel() < 250 ? reward[0] : reward[1];
    let txt;
    switch (start) {
        case 1:
            txt = "\t\t\t#e日常任務 - 每日任務" + game.maxenter + "環#n\r\n\r\n";
            txt += "您今日可完成次數：#r" + (game.maxenter - count) + "#k 次\r\n";
            txt += "角色獎勵次數：#r" + log.getPQLog(stage, db, "跑環_校驗") + "/" + game.maxenter + "#k 次\r\n";
            txt += "獎勵：#b每輪#r" + reward_index[1] + "#bx#v" + reward_index[0] + "#\r\n";
            txt += "\r\n多輪福利：每完成【 #r" + game.extranum + "#b 】次,將獲得雙倍獎勵";
            txt += "\r\n滿輪福利：每天完成25次任務後將額外獲得5次獎勵！"
            txt += "\r\n#r#n                                          是否接任務？"
            if (npc.meFlip().askYesNo(txt)) {
                if (log.getPQLog(stage, db, "跑環_校驗") >= game.maxenter) {
                    npc.meFlip().say("今日無法繼續做任務了！");
                    return;
                }
                if (stage.getLevel() < game.maxlevel) {
                    npc.meFlip().say("需要 " + game.maxlevel + " 才能做任務哦！");
                    return;
                }
                let random = Math.floor(Math.random() * quest.length);
                stage.updateQuestRecordEx(game.questid, "quest", String(random));
                stage.updateQuestRecordEx(game.questid, "start", String(2));
                execute();
            }
            break;
        case 2:
            txt = "#e>>> 正在進行第#b " + (count + 1) + " #k環任務：#n\r\n";
            txt += "描述：" + quest[index][4] + "\r\n";
            txt += "#e目標：#n收集 #r#z" + quest[index][0] + "# " + quest[index][1] + "#k 個。\r\n";
            txt += "#e進度：#n#b目前擁有 #i" + quest[index][0] + "# #r" + stage.getItemQuantity(quest[index][0]) + "#b 個\r\n";
            txt += "#b#L2#1.傳送到目標地圖#l     #L0#2.重置任務 可重置次數：#r" + (game.maxreset - reset) + " 次#l\r\n\r\n#L1##b3.完成任務 可完成次數：#r" + (game.maxenter - count) + " 次#l\r\n\r\n"
            let sel_2 = npc.meFlip().askMenu(txt);

            switch (sel_2) {
                case 0:
                    if (reset < game.maxreset) {
                        stage.updateQuestRecordEx(game.questid, "rcount", String(reset + 1));
                        stage.updateQuestRecordEx(game.questid, "start", String(1));
                    } else {
                        npc.meFlip().say("今日無法再重置任務了！");
                    }
                    execute();
                    break;
                case 1:
                    if (!stage.hasItem(quest[index][0], quest[index][1])) {
                        npc.meFlip().say("抱歉..材料不足！");
                        return;
                    }
                    if (!stage.canHold(reward_index[0], reward_index[1])) {
                        npc.meFlip().say("背包空間不足！");
                        return;
                    }
                    stage.loseItem(quest[index][0], quest[index][1]);
                    stage.gainItem(reward_index[0], reward_index[1]);
                    log.addPQLog(stage, db, "跑環_校驗");
                    stage.updateQuestRecordEx(game.questid, 'count', String(count + 1));
                    stage.updateQuestRecordEx(game.questid, "start", String(1));
                    util.broadcastChatMsg(1,"【跑環】：恭喜玩家 " + stage.getCharacterName() + " 完成了 第 < " + count + " > 輪跑環任務");
                    npc.meFlip().say("恭喜任務完成，獲得了豐厚獎勵！");
                    execute();
                    break;
                case 2:
                    stage.changeMap(quest[index][2], 0);
                    break;
            }
            break;
    }
}

function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    } 
    return year + seperator1 + month + seperator1 + strDate;
}