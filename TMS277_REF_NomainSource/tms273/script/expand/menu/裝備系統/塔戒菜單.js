var kk55 = "#fEtc/pachinko/controller/base/2#";
var status = -1;
var a1 = "#fItem/Cash/0501.img/05010101/effect/ladder/9#";//蘑菇
var a2 = "#fItem/Cash/0501.img/05010056/effect/walk1/5#";//"+z+"//草
var a3 = "#fItem/Cash/0501.img/05010056/effect/walk1/6#";//草
var a4 = "#fItem/Cash/0501.img/05010056/effect/walk1/7#";//"草"
var a5 = "#fMap/MapHelper.img/weather/knitsWithWarmWinter/9#";
var a6 = "#fMap/MapHelper.img/weather/balloon/1#";//"+z+"//美化
var a7 = "#fUI/CashShop/CSBeauty/hairColor/Disable/3#";//粉色蝴蝶
var b0 = "#fEffect/CharacterEff/1051366/2/0#";//粉色蝴蝶
var a8 = "#fItem/Pet/5000221.img/sleep/5#";//"+z+"
var a9 = "#fItem/Pet/5000221.img/jump/0#";
var a10 = "#fItem/Pet/5000221.img/cry/0#";//"+z+"//美化
var kk94 = "#fEffect/CharacterEff/1051366/1/0#";
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
var a0 = "#fMap/MapHelper.img/weather/snowbear/5#";//"+z+"
var a77 = "#fEffect/SetEff.img/245/effect/28#";
var a78 = "#fEffect/SetEff.img/245/effect/14#";
var b2 = "#fItem/Cash/0501.img/05010010/effect/default/0#";//雙人相框
var b3 = "#fUI/CashShop/CSEffect/lunaCrystal/0#"; //音符1
var b4 = "#fEffect/CharacterEff/1112949/3/0#"; //音符2
var b5 = "#fEffect/CharacterEff/1022223/6/0#"
var b6 = "#fEffect/CharacterEff/1022223/7/0#"
var b7 = "#fEffect/CharacterEff/1022223/8/0#"
var b8 = "#fEffect/CharacterEff/1022223/9/0#"
var b9 = "#fItem/Cash/0501.img/05010056/effect/walk1/6#"; //小草
var b10 = "#fItem/Cash/0501.img/05010056/effect/walk1/4#"; //紅色小草
var a20 = "#fEffect/CharacterEff/1050334/1/0#"
var a11 = "#fUI/CashShop/CSBeauty/hairColor/Disable/3#";//粉色蝴蝶
var c11 = "#fEffect/CharacterEff/1082565/4/0#";//粉色兔子
var c12 = "#fUI/Basic/CheckBox1/1#";//粉色兔子8
var kk95 = "#fEffect/CharacterEff/1022223/3/0#";
var s1 = "#fUI/CashShop/CSBeauty/hairColor/Disable/0#"
var s1 = "#fUI/CashShop/CSBeauty/hairColor/Disable/1#"
var s2 = "#fUI/CashShop/CSBeauty/hairColor/Disable/2#"
var s3 = "#fUI/CashShop/CSBeauty/hairColor/Disable/3#"
var s4 = "#fUI/CashShop/CSBeauty/hairColor/Disable/4#"
var s5 = "#fUI/CashShop/CSBeauty/hairColor/Disable/5#"
var s6 = "#fUI/CashShop/CSBeauty/hairColor/Disable/6#"
var s7 = "#fUI/CashShop/CSBeauty/hairColor/Disable/7#"
var kk97 = "#fEffect/CharacterEff/1112960/3/0#";
var f1 = "#fUI/CashShop/CSBeauty/hairColor/Enable/0#"
var f1 = "#fUI/CashShop/CSBeauty/hairColor/Enable/1#"
var f2 = "#fUI/CashShop/CSBeauty/hairColor/Enable/2#"
var f3 = "#fUI/CashShop/CSBeauty/hairColor/Enable/3#"
var f4 = "#fUI/CashShop/CSBeauty/hairColor/Enable/4#"
var f5 = "#fUI/CashShop/CSBeauty/hairColor/Enable/5#"
var f6 = "#fUI/CashShop/CSBeauty/hairColor/Enable/6#"
var f7 = "#fUI/CashShop/CSBeauty/hairColor/Enable/7#"

var qq1 = "#fUI/EventShop/adventureShop/GradeBuyer/0#"
var qq2 = "#fUI/EventShop/adventureShop/GradeBuyer/1#"
var qq3 = "#fUI/EventShop/adventureShop/GradeBuyer/2#"
var qq4 = "#fUI/EventShop/adventureShop/GradeBuyer/3#"
var qq5 = "#fUI/EventShop/adventureShop/GradeBuyer/4#"
var qq6 = "#fEffect/CharacterEff/1051294/1/0#"

var selection = npc.askMenu("\t\t\t#e#r    頑皮島 · 塔戒菜單\r\n\r\n#d"
    + "#L1#" + kk55 + "塔戒分解#l  "
    + "#L2#" + kk55 + "一級箱子#l  "
    + "#L3#" + kk55 + "四級箱子#l  \r\n"
    + "#L4#" + kk55 + "塔戒合成#l  \r\n"
);


switch (selection) {
    case 1:
        stage.runScript("expand/menu/塔戒專區/塔戒分解");
        break;
    case 2:
        stage.runScript("expand/menu/塔戒專區/一級箱子");
        break;
    case 3:
        stage.runScript("expand/menu/塔戒專區/四級箱子");
        break;
    case 4:
        stage.runScript("expand/menu/塔戒專區/戒指合成");
        break;
}

