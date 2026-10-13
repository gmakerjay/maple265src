/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var status = -1;
var a1 = "#fUI/piggyBarMinigame/crunch/6#"
var a2 = "#fUI/piggyBarMinigame/crunch/8#"
var a3 = "#fUI/EventShop/adventureShop/GradeBuyer/3#"
var r1 = "#fUI/CashShop/CSMagical/Label/3#"
var r2 = "#fUI/CashShop/CSEffect/event/0#"
var a16 = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"
var a17 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var b7 = "#fUI/CashShop/CSEffect/number/7#"
var c1 = "#fUI/NameTag/13/w#"
var c2 = "#fUI/NameTag/13/c#"
var c3 = "#fUI/NameTag/13/e#"
var d4 = "#fUI/NameTag/13/w#"
var d5 = "#fUI/NameTag/13/c#"
var d6 = "#fUI/NameTag/13/e#"
var q1 = "#fUI/UIWindow8/mazeMiniMap/0/withParty/0#"
var r3 = "#fUI/CashShop/CSEffect/time/0#"
var jifen = "#fUI/CashShop/CSEffect/mileage/0#"
let icon = require('constant/icon');


let selection = npc.askMenu("				     #d#e" + a1 + "福利中心" + a2 + "\r\n    " + c1 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c2 + "" + c3 + "\r\n"
    + "#L0##d" + "" + a3 + "師徒羊羊大作戰#l\r\n"
    + "#L1##d" + "" + a3 + "吹氣球#l\r\n"
    + "#L99##d" + "" + a3 + "世界BOSS#l\r\n"
    + "#L2##d" + "" + a3 + "群活躍獎勵#l\r\n"
    + "#L12##d" + "" + a3 + "群道具領取#l\r\n"
    + "#L3##d" + "" + a3 + "小遊戲中心#l\r\n"
    + "#L4##d" + "" + a3 + "戰令系統#l\r\n"
 //   + "#L6##r" + "" + a3 + "仙橙領地#l\r\n"
 //   + "#L7##r" + "" + a3 + "主線任務獎勵介紹#l\r\n"
    + "#L8#" + "" + a3 + "Bingo#l\r\n"
    + "#L81#" + "" + a3 + "猜拳大賽#l\r\n"
    // + "#L9##r" + "" + a3 + "雪原跑旗#l\r\n"
    // + "#L10##r" + "" + a3 + "XO大賽#l\r\n"
);


//"#L102#"+eff3+"

switch (selection) {
    case 0:
        stage.runScript("expand/menu/福利中心/師徒羊羊大作戰");
        break;
    case 12:
        stage.runScript("expand/menu/更多功能/Q群商店");
        break;
    case 1:
        stage.runScript("expand/menu/福利中心/每日氣球")
        break;
    case 2:
        stage.runScript("expand/menu/福利中心/每日群簽到排行");
        break;
    case 3:
        stage.runScript("expand/menu/福利中心/小遊戲中心");
        break;
    case 4:
        let results = db.select(`select *
                                 from zsf_robot_bind
                                 where account_id = ${stage.getAccountId()}`);
        if (results != null && results.length > 0) {
            stage.runScript("expand/menu/福利中心/戰令令牌");
        } else {
            npc.say("請先綁定遊戲賬號有QQ關係。");
            stage.runScript("expand/menu/更多功能/綁定QQ");
        }
        break;
    case 5:
        stage.runScript("expand/menu/福利中心/強化機");
        break;
 //   case 6:
     //   stage.runScript("expand/menu/福利中心/仙橙領地");
    //    break;
 //   case 7:
  //      stage.runScript("expand/menu/福利中心/主線任務介紹");
  //      break;
    case 8:
        stage.runScript("expand/bingo_enter");
        break;
    case 81:
        stage.runScript("expand/hrps_enter");
        break;
    case 9:
        stage.runScript("expand/menu/福利中心/每週活動/跑旗入口");
        break;
    case 10:
        stage.runScript("npc/npc_9062824");
        break;
    case 99:
        stage.runScript('expand/menu/boss/世界BOSS')
        break;
}