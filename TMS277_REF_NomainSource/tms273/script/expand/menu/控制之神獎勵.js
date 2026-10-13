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
var c11 = "#fMap/MapHelper.img/weather/9thLight/0#"; //
var c12 = "#fMap/MapHelper.img/weather/9thLight/1#"; //
var c13 = "#fMap/MapHelper.img/weather/9thLight/2#"; //
var c14 = "#fMap/MapHelper.img/weather/9thLight/3#"; //
var c15 = "#fMap/MapHelper.img/weather/9thLight/4#"; //
var c16 = "#fMap/MapHelper.img/weather/9thLight/5#"; //
var c17 = "#fEffect/ItemEff/1102874/effect/ladder/0#"
let selection = npc.askMenu("\r\n"
    //+ " #k#k#e點券:#r#e" + player.getCashShopCurrency(2) + "#k#k\t#n#k#e抵用卷#n：#r#e" + player.getCashShopCurrency(2) + "#k#k\t#n#k#e在線#n：#r#e" + player.getCashShopCurrency(2) + "#k#n\r\n"、
    //+ ""+c13+""+c11+""+c12+""+c13+""+c14+""+c15+""+c16+"\n\r\n"


    + "#fs15##e#b歡迎來到控制之神，鍛煉心智手速的小遊戲#fs12#\n\r\n\r\n#l"

    + "   " + c17 + "" + c17 + "" + c17 + "\n\r\n#l"

    + (map.getId() != 993001000 ? "             #L0#" + a6 + "#r前往挑戰 " + a6 + "#l#l\r\n\r\n" : "")
    + "            #L1#" + a6 + "#b通關星級獎勵 " + a6 + "#l#l\r\n"
    // + "            #L2#"+a6+"#b累計星星獎勵 "+a6+"#l\r\n"
//+ " "+a4+" "+a4+" "+a4+"\r\n"
//+ "#L21##n"+a6+"#k每日手冊記錄"+a6+"#l#n"
//+ "           #L12##n"+a3+"#k返回每日專區"+a3+"#l#n\r\n"
);
//+ "#L6#"+a5+"#b新手中心#k#l#L11#"+a5+"#r提升攻擊#k#n#l#L42#"+a5+"#r裝備製作#k#n#l#L8#"+a5+"物品刪除#l\r\n"
//+ "#L38#"+a6+"#b充值獎勵#l#k#L34#"+a6+"#b中介中心#l#L36#"+a6+"理財辦理#l#L43#"+a6+"武器破攻#l\r\n"
//+ "#L4#"+a7+"#r【組隊任務】#l#L12#"+a7+"【副本中心】#l#L9#"+a7+"【每日任務】#l\r\n"
//+ " "+a2+""+a3+""+a2+"\r\n"

switch (selection) {
    case 0:
        stage.changeMap(993001000, 0);
        break;
    case 1:
        stage.runScript("expand/menu/控制之神星級獎勵");
        break;
}