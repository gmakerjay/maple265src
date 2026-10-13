/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/*
*
*
* 功能：商城NPC
*
*
*/

/ global stage /

var {getPay} = require('vipCommon.js');
var status = -1;
var a1 = "#fItem/Cash/0501.img/05010150/effect/default/3#";//蘑菇
var a2 = "#fEffect/CharacterEff/1082565/0/0#";//"+z+"//草
var a3 = "#fMap/MapHelper.img/weather/birthday/5#";//草
var a4 = "#fItem/Cash/0501.img/05010056/effect/walk1/5#";//"草"
var a5 = "#fItem/Cash/0501.img/05010002/effect/default/7#";
var a6 = "#fMap/MapHelper.img/weather/starPlanet/4#";//"+z+"//美化
var a7 = "#fMap/MapHelper.img/weather/2011Haloween/2#";
var a8 = "#fItem/Pet/5000221.img/sleep/5#";//"+z+"
var a9 = "#fItem/Pet/5000221.img/jump/0#";
var a10 = "#fItem/Pet/5000221.img/cry/0#";//"+z+"//美化
var a11 = "#fEffect/CharacterEff/1082565/0/0#";
var a12 = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"
var a13 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var a14 = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var a15 = "#fEffect/CharacterEff/1051296/1/0#";
var a16 = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"
var a17 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var a18 = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var a19 = "#fEffect/CharacterEff/1051296/1/0#";
var a20 = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"
var a21 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var a22 = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var a23 = "#fEffect/CharacterEff/1051296/1/0#";
var a0 = "#fUI/UIWindow2/FadeForEvent/icon1#";//"+z+"
var a24 = "#fUI/UIWindowPL.img/HiddenTales/title#";//
var a27 = "#fItem/Pet/5000415.img/stand0/0#";//
var a28 = "#fItem/Pet/5000952.img/stand0/0#";//
var a29 = "#fItem/Pet/5000674.img/stand0/0#";//
var a30 = "#fItem/Pet/5000491.img/stand0/0#";//
var a31 = "#fItem/Pet/5000416.img/stand0/0#";//
var a32 = "#fItem/Pet/5000416.img/stand0/0#";//
var a33 = "#fItem/Cash/0501.img/05010128/effect/default/0#";//
var c1 = "#fEffect/ItemEff/1004738/effect/default/7#";
var c2 = "#fEffect/ItemEff/1004738/effect/ladder/2#";
var c3 = "#fEffect/ItemEff/1004738/effect/walk1/0#";
const USER_INFO = [];

function start() {

    let selection = npc.askMenu("\r\n"
        + "" + a5 + "" + a5 + "" + a5 + "\n\r\n"
        + `#L101#${a2}#r#e樂豆滅龍#l\t`
        + `#L102#${a2}#r#e樂豆創奧#l\t`
        + `#L103#${a2}#r#e樂豆輪迴#l\t\r\n`
        + `#L105#${a2}#r#e樂豆石板#l\t`
        + `#L104#${a2}#r#e樂豆超越#l\t`
        + `#L106#${a2}#r#e樂豆心臟#l\t\r\n`
        + `#L1#${a2}#r#e樂豆卷軸#l\t`
        + `#L2#${a2}#r#e點券卷軸#l\t`
        + `#L6#${a2}#r#e卷軸合成#l\t\r\n`
        + `#L21#${a2}#r#e金幣字體#l\t`
        + `#L22#${a2}#r#e樂豆字體#l\t`
        + `#L9#${a2}#b#e積分兌換#l\t\r\n`
        + `#L10#${a2}#b#e火花回收#l\t`
        + `#L11#${a2}#b#e巫女回收#l\t`
    );

    switch (selection) {
        case 1:
            stage.runScript(`expand/menu/抽獎功能/${getLotteryLevel()}/樂豆卷軸`);
            break;
        case 2:
            stage.runScript("expand/menu/抽獎功能/點券卷軸");
            break;
        case 6:
            stage.runScript("expand/menu/卷軸兌換");
            break;
        case 9:
            stage.runScript("expand/menu/抽獎功能/積分兌換");
            break;
        case 10:
            stage.runScript("expand/menu/抽獎功能/火花回收");
            break;
        case 11:
            stage.runScript("expand/menu/抽獎功能/巫女回收");
            break;
        case 21:
            stage.runScript("expand/menu/抽獎功能/傷害皮膚_金幣");
            break;
        case 22:
            stage.runScript("expand/menu/抽獎功能/傷害皮膚_樂豆");
            break;
        case 101:
            stage.runScript(`expand/menu/抽獎功能/${getLotteryLevel()}/樂豆裝備_滅龍`);
            break;
        case 102:
            stage.runScript(`expand/menu/抽獎功能/${getLotteryLevel()}/樂豆裝備_創奧`);
            break;
        case 103:
            stage.runScript(`expand/menu/抽獎功能/${getLotteryLevel()}/樂豆圖騰_輪迴`);
            break;
        case 104:
            stage.runScript(`expand/menu/抽獎功能/${getLotteryLevel()}/樂豆圖騰_超越`);
            break;
        case 105:
            stage.runScript(`expand/menu/抽獎功能/${getLotteryLevel()}/樂豆圖騰_石板`);
            break;
        case 106:
            stage.runScript(`expand/menu/抽獎功能/${getLotteryLevel()}/樂豆心臟`);
            break;
    }

}

start();

function getLotteryLevel() {
    return 0;
    let level = -1;
    let username = getAccountName();
    for (let i in USER_INFO) {
        if (username == USER_INFO[i][0]) {
            level = USER_INFO[i][1];
            break;
        }
    }
    if (level == -1) {
        let payReward = getPay(db, stage, stage.getAccountId(), 3);
        if (payReward >= 5000) {
            level = 2;
        } else if (payReward >= 500) {
            level = 1;
        } else {
            level = 0;
        }
    }
    return level;

}

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}