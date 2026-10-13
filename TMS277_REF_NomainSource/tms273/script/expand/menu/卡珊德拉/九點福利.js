/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var pp = "#fUI/UIWindowPL.img/PieceReward_Clover/Tab/line#";//  超細黃白分割 4
var qie = "#fMap/MapHelper.img/weather/5000days/3#"
var xueren = "#fMap/MapHelper.img/weather/5000days/0#";
var xueren1 = "#fMap/MapHelper.img/weather/5000days/1#";
var xueren2 = "#fMap/MapHelper.img/weather/5000days/2#";
var xueren3 = "#fMap/MapHelper.img/weather/snowbear/5#";
var 小雞1 = "#fEffect/SetEff.img/138/effect/4#";
var 小雞 = "#fEffect/CharacterEff.img/1022223/3/0#";
var 彩光3 = "#fMap/MapHelper.img/weather/popcornTime/0#"; //彩光1
var yunyun = "#fEffect/ItemEff/1070069/effect/walk1/6#"
var icon1 = "#fMap/MapHelper.img/weather/2011Haloween/4#";
var icon2 = "#fMap/MapHelper.img/weather/2011Haloween/6#";
var icon3 = "#fMap/MapHelper.img/weather/2011Haloween/7#";
var icon4 = "#fMap/MapHelper.img/weather/2011Haloween/7#";
var icon5 = "#fMap/MapHelper.img/weather/CN_GMskill/5#";
var ttt1 = "#fUI/ChatEmoticon.img/1003/10030003/effect/0#";//"+ttt+"//美化1
var ttt2 = "#fUI/ChatEmoticon.img/1003/10030001/effect/0#";//"+ttt+"//美化1
var date = new Date();
var hour = date.getHours();//小時
var minute = date.getMinutes();//分鐘
// let zzlog = require('eventlog_zzxrevent');
const log = require('check_log');
// zzlog.init(player, player);
var Icon = Array(
    Array("星星", "#fEtc/ChatEmoticon/expression/1/0#"),
    Array("兔子", "#fEffect/CharacterEff/1112960/0/1#"),
    Array("星空", "#fUI/GuildMark/BackGround/00001013/16#"),
    Array("骷髏", "#fUI/GuildMark/Mark/Etc/00009000/15#"),
    Array("紅心", "#fUI/GuildMark/Mark/Etc/00009001/1#"),
    Array("白臉", "#fUI/GuildMark/Mark/Etc/00009002/4#"),
    Array("皇冠", "#fUI/GuildMark/Mark/Etc/00009004/3#"),
    Array("紅燈", "#fUI/GuildMark/Mark/Etc/00009020/1#"),
    Array("王冠", "#fUI/GuildMark/Mark/Etc/00009023/11#"),
    Array("水滴", "#fEffect/BasicEff/MainNotice/Gamsper/Notify/4#"),
    Array("紅旗", "#fEffect/BasicEff/MainNotice/BlockBuster/Default/3#"),
    Array("紅心", "#fEffect/CharacterEff/1112905/0/0#"),
    Array("雲朵", "#fEffect/ItemEff/1102877/effect/default/1#"),
    Array("翅膀", "#fEffect/ItemEff/1102874/effect/ladder/0#"),
    Array("箭矢", "#fEffect/ItemEff/1112003/0/2#"),
    Array("黃鴨", "#fEffect/ItemEff/1004122/effect/default/8#")
);
// 獎勵
const list = [
    [2450184, 5],//黑色方塊
    [5062020, 30],//珍貴附加方塊
    [5062021, 30],//閃炫方塊
    [5062500, 30],//結合方塊
    [2431739, 1],//結合方塊
];


RuinStart();


function RuinStart() {
    txt = "#e#d\t\t" + icon5 + " 星語谷整點福利 " + icon5 + "\r\n\r\n#n";
    txt += "\t#e#g當前服務器時間：#b" + hour + "點" + minute.toString().padStart(2, '0') + "分 #n#k\r\n";
    txt += "#b#e領取獎勵要求：\r\n\r\n#n";
    txt += "#d" + xueren3 + " (周五/六/日)21點~22點整之間（可領取）\r\n\t#d當日在線時長達到120分鐘玩家（可領取）\r\n\t注意#r背包的空格。\r\n\r\n";

    txt += "#d" + xueren3 + " #r21點~22點期間#d未領取的玩家就無法獲得哦 。\r\n\r\n";
    txt += "" + xueren3 + "#e#b整點獎勵展示：\r\n\r\n#n";
    for (let i in list) {
        txt += `#v${list[i][0]}:i##z${list[i][0]}:i# x ${list[i][1]}\r\n`;
    }
    txt += `周五周六周日可以領取本福利`;
    // npc.say(txt);
    // return;
    if (![5, 6, 0].includes(new Date().getDay())) {
        npc.say(txt);
        return;
    }
    txt += "#b#L1##b點擊下一步領取每日福利獎勵#l  \r\n\r\n";

    let sel = npc.askMenu(txt);
    switch (sel) {
        case 1:
            if ((hour == 21 && log.getEventValue(stage, db, "9點獎勵") == 0 && (stage.getOnlineTime() > 120 || log.getEventValue(stage, db, '在線禮包2') > 0))) {
                for (let i in list) {
                    stage.gainItem(list[i][0], list[i][1]);
                }
                log.addEventValue(stage, db, "9點獎勵");
                util.broadcastNotice("[周末整點禮物]: " + stage.getCharacterName() + " 成功領取了周末整點禮物！");

                util.broadcastWeatherEffectNotice("『整點獎勵』" + " : " + "玩家 " + stage.getCharacterName() + " 領取了21：00 -22：00在線獎勵", 206, 10000, true);
                npc.say("領取成功 ！");
                break;
            } else {
                npc.say("領取失敗！\r\n\r\n以下條件不滿足\r\n\r\n條件一：現在不是福利時間，時間為21：00-22：00之間\r\n\r\n條件二：在線時間不足120分鐘\r\n\r\n條件三：你已經領取過！！");
            }
    }
}
