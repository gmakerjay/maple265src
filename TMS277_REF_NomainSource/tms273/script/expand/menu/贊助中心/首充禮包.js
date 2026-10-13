/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 首充獎勵
 **/
let log = require('check_log');
let cat1 = "#fItem/Pet/5000000.img/alert/0#";
let cat2 = "#fItem/Pet/5000000.img/fly/0#";
let cat3 = "#fItem/Pet/5000000.img/cry/0#";
let tu1 = "#fItem/Cash/0501.img/05010045/effect/stand1/1#"
let tu2 = "#fItem/Cash/0501.img/05010002/effect/default/7#"
let tu3 = "#fUI/NameTag/medal/758/w#"
let tu4 = "#fEffect/SetEff.img/245/effect/28#"
let tu5 = "#fUI/NameTag/medal/758/e#"
let tu6 = "#fUI/NameTag/medal/758/c#"
let fy = "#fUI/RunnerGame.img/RunnerGameUI/UI/Point/1#";
let fy1 = "#fUI/RunnerGame.img/RunnerGameUI/UI/Point/2#";
let dz = "#fUI/GuildMark/Mark/Etc/00009020/1#";
let dz1 = "#fEffect/CharacterEff/1003393/1/0#";
let star = "#fEffect/CharacterEff/1051294/1/1#"
let eff2 = "#fEffect/CharacterEff/1112925/0/0#";
var eff1 = "#fEffect/CharacterEff/1112924/0/0#";
var tt = "#fEffect/CharacterEff/1082565/0/0#"; //餅乾兔子
// 首充所需金額
var condition = 99;
// 禮包內容
var reward = [
    Array(1122150, 1, "17星SS統治者吊墜"),
    Array(1012478, 1, "17星SS凝聚之力結晶石"),
    Array(1022232, 1, "17星SS布萊克繽瞳印"),
    Array(2439305, 9999, "神秘徽章"),
    Array(2439379, 1, "17星魯塔防具(神秘武器)"),
    Array(2439305, 9999, "神秘徽章"),
    Array(2435902, 1888, "核心寶石"),
    Array(2633336, 1888, "原初徽章"),
	Array(2632793, 50, "260級萬聯秘藥"),
    Array(5002438, 1, "5代P寵"),
    Array(5002439, 1, "5代P寵"),
    Array(5002440, 1, "5代P寵"),
    Array(1802653, 3, "寵物裝備"),
	


    // 	[5002400, 5002401, 5002402],
    // 	[1802771, 1802771, 1802772]

];


let sel = "\r\n\r\n#fs16##e";
sel += "#g本服贊助比例：#r1元=1楓之幣   \r\n";
sel += "#g管理員不會私聊你,切勿貪便宜上當受騙！\r\n";
sel += "#b當累充額度達到188，即可領取首沖禮包，自選神秘武器一件！\r\n";
sel += "  #r注意：禮包只能領取一次(每個賬號)\r\n";


// sel += "\r\n#L10087##d" + format("剩餘餘額  #r" + getHyPay(1) + "#d 點") + "#l#d#L10088#" + format("累充贊助  #r" + getHyPay(3) + " #d元") + "#l";
// sel += "\r\n\r\n#d   本服贊助比例：#r1元 = 1餘額\r\n#n#d   如需贊助,#L1##r#e點此前往充值入口#l  #d\r\n#n   管理員不會私聊你贊助，請勿貪小便宜受騙，認準管理員！\r\n";
// sel += "   #b充值后可使用" + condition + "楓之幣領取首充禮包，\r\n   包，贊助勳章，以及領取每日贊助福利 破攻 - 金幣 ！\r\n#r   注意：禮包只能領取一次(賬號限制)!#n\r\n";
const payUtils = require('constant/payUtils');
if (payUtils.getPay(3, db, stage) >= 188) {
    sel += "#g#L" + 0 + "#" + tt + " #g[已完成]首充禮包 #l\r\n";
} else {
    sel += "#g#L" + 0 + "#" + tt + " #r[未完成]查看首充禮包 #l\r\n";
}
let selected = npc.askMenu(sel);
// let selected = npc.askMenu(sel, 9900000);
if (selected == 1) {
    player.runScript("expand/menu/贊助系統")
} else {
    sel = "是否領取禮包？\r\n魯塔箱中的均為17星X卷潛能12/9/9\r\n"
    for (var i = 0; i < reward.length; i++) {
        sel += "#r#i" + reward[i][0] + "# #z" + reward[i][0] + "#[#r" + reward[i][1] + "個]#b " + reward[i][2] + " \r\n#k";
    }

    let YN = npc.askYesNo(sel);
    if (YN == 1) {

        //判斷是否已經領取
        if (log.getEventValue(stage, db, "新首充禮包") > 0) {
            npc.say("您的賬號已經領取過該禮包，無法再次領取");
        } else if (payUtils.getPay(3, db, stage) < condition) {
            npc.say("金額未達標，無法領取");
        } else {
            var rewardlist = reward;
            if (stage.getFreeSlot(1) < rewardlist.length || stage.getFreeSlot(2) < rewardlist.length || stage.getFreeSlot(3) < rewardlist.length || stage.getFreeSlot(4) < rewardlist.length || stage.getFreeSlot(5) < rewardlist.length) {
                npc.say("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
            } else {
                log.addEventValue(stage, db, "新首充禮包", 1, -1);
                for (var i = 3; i < rewardlist.length; i++) {
                    stage.gainItem(rewardlist[i][0], rewardlist[i][1]);
                }
                for (var i = 0; i < 3; i++) {
                    let newItem = util.makeItem(rewardlist[i][0], 1);
                    newItem.setGrade(4);
                    newItem.setOption1(40053)
                    newItem.setOption2(40053)
                    newItem.setOption3(40053)
                    newItem.setChuc(17);//星之力
                    stage.gainItem(newItem);
                }


               // util.broadcastChatMsg(15, "【首沖禮包】 : 感謝玩家 " + stage.getCharacterName() + " 的贊助,特此為你奉上 首充大禮包！ ");
                // npc.broadcastPlayerNotice(15, "【贊助中心】 : 感謝玩家 " + stage.getCharacterName() + " 的贊助,特此為你奉上 首充大禮包！ ");
                util.broadcastWeatherEffectNotice("≡≡≡ 首沖禮包 ≡≡≡ 	        感謝玩家" + stage.getCharacterName() + "為本服做出了贊助貢獻,這是給你送上的首沖福利禮包", 161, 10000, true);
                npc.say("領取成功");
            }
        }
    }
}