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

/ global player /

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
let sss = "\r\n"
    //+ " #k#k#e點券:#r#e" + stage.getCashShopCurrency(2) + "#k#k\t#n#k#e抵用卷#n：#r#e" + stage.getCashShopCurrency(2) + "#k#k\t#n#k#e在線#n：#r#e" + stage.getCashShopCurrency(2) + "#k#n\r\n"、
    + "" + "                    #e#r暖暖中心#d#n                 " + "\r\n\r\n"
    // + `#L0#${a21}無屬隨機#l\t`
    + `#L2#${a21}無屬自選#l\t`
    + `#L1#${a21}屬性隨機#l\t`
    + `#L4#${a21}屬性轉移#l\t\r\n\r\n`
    // + `#L3#${a21}回收抵用#l\t`
    + `#L5#${a21}美容美髮#l\t`
    + `#L6#${a21}普通神器#l\t`
    + `#L7#${a21}#r高級神器#k#l\t\r\n\r\n`
    + `#L8#${a21}#r神器回收#k#l\t`
    + `#L9#${a21}#r時裝鐵砧#k#l\t`
    // + `#L10#${a21}#r神器BUFF#k#l\t`;

if (stage.isGm()) {
    sss += `\r\n\r\n#L998#${a21}#r暖暖審批#k#l`;
}

let selection = npc.askMenu(sss
);

//+ "#L6#"+a5+"#b新手中心#k#l#L11#"+a5+"#r提升攻擊#k#n#l#L42#"+a5+"#r裝備製作#k#n#l#L8#"+a5+"物品刪除#l\r\n"
//+ "#L38#"+a6+"#b充值獎勵#l#k#L34#"+a6+"#b中介中心#l#L36#"+a6+"理財辦理#l#L43#"+a6+"武器破攻#l\r\n"
//+ "#L4#"+a7+"#r【組隊任務】#l#L12#"+a7+"【副本中心】#l#L9#"+a7+"【每日任務】#l\r\n"
//+ " "+a2+""+a3+""+a2+"\r\n"

switch (selection) {
    case 0:
        stage.runScript("expand/menu/時裝中心/時裝抽獎_無屬性");
        break;
    case 1:
        stage.runScript("expand/menu/時裝中心/時裝抽獎_有屬性");
        break;
    case 2:
        // if (stage.isGm()) {
        stage.runScript("expand/menu/時裝中心/時裝自選");
        // } else {
        //     npc.say("修復中");
        // }
        break;
    case 3:
        // stage.runScript("時裝中心/時裝回收");
        break;
    case 4:
        stage.runScript("expand/menu/時裝中心/時裝鐵砧");
        break;
    case 5:
        stage.runScript("expand/menu/時裝中心/造型中心");
        break;
    case 6:
        stage.runScript("expand/menu/時裝中心/神器抽獎_低級");
        break;
    case 7:
        stage.runScript("expand/menu/時裝中心/神器抽獎_高級");
        break;
    case 8:
        stage.runScript("expand/menu/時裝中心/神器回收");
        break;
    case 9:
        stage.runScript("expand/menu/時裝中心/時裝真鐵砧");
        break;
    case 10:
        stage.runScript("expand/menu/時裝中心/神器之力");
        break;
    case 998:
        stage.runScript("expand/menu/時裝中心/暖暖白名單審核");
        break;
}