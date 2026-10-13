/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 月卡每日
 **/
var log = require('check_log');
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var z5 = "#fEffect/CharacterEff/1112904/2/1#"; //五角花
var tz = "#fEffect/CharacterEff/1082565/2/0#"; //兔子藍
var eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //小紅心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#"; //黃星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#"; //藍星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#"; //紅星
var kk60 = "#fMap/MapHelper/weather/guildBless/7#";
var a1 = "#fUI/CashShop/CSMVPPopup/main/gradeIcon/7#";
//會員盒子

var 覺醒的輪迴星火 = 2048761;
var 恢復附加方塊 = 5062031;
var 新對等方塊 = 5062021;
var 閃耀鏡射方塊 = 5062026;
var 楓點500 = 5680865;
var 太陽方塊 = 5062013;
var 絕對附加方塊 = 5062512;
var 驚奇方塊 = 5062005;
var 畫框 = 5060086;
var 錦囊 = 5060087;
var 蘋果 = 5060048;
var 豎琴 = 5060025;

var vipBox = [
    //盒子ID 天數 所需餘額 詞條 詳細介紹
    [3700664, 30, 98,  "[白銀月卡]", " #r98#k楓之幣 #r30#k天 #v3700664:i# "],
    [3700662, 30, 198, "[黃金月卡]", " #r198#k楓之幣 #r30#k天 #v3700662:i# "],
    [3700661, 30, 368, "[鑽石月卡]", " #r368#k楓之幣 #r30#k天 #v3700661:i# "]
];

var payTimes = ["", "", ""];

// 一次性獎勵
var listA = [
    [// 白銀月卡
        [覺醒的輪迴星火, 5], // 覺醒火焰
		[錦囊, 10],
        [楓點500, 20], // 點券
	
    ],
    [// 黃金月卡
        [覺醒的輪迴星火, 10], // 覺醒火焰
		[錦囊, 20],
        [楓點500, 40], // 點券
		
    ],
    [// 鑽石月卡
        [覺醒的輪迴星火, 20], // 覺醒火焰
		[錦囊, 30],
        [楓點500, 80], // 點券
    ],
];
// 每日物品獎勵
var listB = [
    [// 小月卡
        [恢復附加方塊, 10],
        [新對等方塊, 10],
        [閃耀鏡射方塊, 10],
		[太陽方塊, 2],
		[驚奇方塊, 2],
		[畫框, 5],
		[錦囊, 5],
		[蘋果, 5],
		[豎琴, 5],
		[絕對附加方塊, 2],
    ],
    [// 中月卡
        [恢復附加方塊, 20],
        [新對等方塊, 20],
        [閃耀鏡射方塊, 20],
		[太陽方塊, 3],
		[驚奇方塊, 3],
		[畫框, 10],
		[錦囊, 10],
		[蘋果, 10],
		[豎琴, 10],
		[絕對附加方塊, 3],
    ],
    [// 大月卡
        [恢復附加方塊, 40],
        [新對等方塊, 40],
        [閃耀鏡射方塊, 40],
		[太陽方塊, 5],
		[驚奇方塊, 5],
		[畫框, 15],
		[錦囊, 15],
		[蘋果, 15],
		[豎琴, 15],
		[絕對附加方塊, 5],
    ],
];
// 每日點券獎勵
var listC = [
    588,
    988,
    1588
];


start();

function start() {
    var str = "             " + eff1 + "#b#e楓之谷月卡每日福利中心" + eff1 + "#k\r\n";
    var myLevel = log.getEventValue(stage, db, '月卡'); 
    
    // 白銀月卡
    if (log.getEventValue(stage, db, "領取每日" + vipBox[0][3]) > 0) {
        str += "#r#L1#" + tz + "#r" + vipBox[0][3] + "每日福利#k#r[已領取]#k 剩餘<" + log.getEventValue(stage, db, vipBox[0][3] + "每日福利") + ">#l\r\n";
    } else {
        str += "#b#L4#" + tz + "#r" + vipBox[0][3] + "每日福利#k#b[可領取]#k 剩餘<" + log.getEventValue(stage, db, vipBox[0][3] + "每日福利") + ">#l\r\n";
    }
    str += "\r\n";
    
    // 黃金月卡
    if (log.getEventValue(stage, db, "領取每日" + vipBox[1][3]) > 0) {
        str += "#r#L2#" + tz + "#r" + vipBox[1][3] + "每日福利#k#r[已領取]#k 剩餘<" + log.getEventValue(stage, db, vipBox[1][3] + "每日福利") + ">#l\r\n";
    } else {
        str += "#b#L5#" + tz + "#r" + vipBox[1][3] + "每日福利#k#b[可領取]#k 剩餘<" + log.getEventValue(stage, db, vipBox[1][3] + "每日福利") + ">#l\r\n";
    }
    str += "\r\n";
    
    // 鑽石月卡
    if (log.getEventValue(stage, db, "領取每日" + vipBox[2][3]) > 0) {
        str += "#r#L3#" + tz + "#r" + vipBox[2][3] + "每日福利#k#r[已領取]#k 剩餘<" + log.getEventValue(stage, db, vipBox[2][3] + "每日福利") + ">#l\r\n";
    } else {
        str += "#b#L6#" + tz + "#r" + vipBox[2][3] + "每日福利#k#b[可領取]#k 剩餘<" + log.getEventValue(stage, db, vipBox[2][3] + "每日福利") + ">#l\r\n";
    }
    
    // 月卡辦理
    str += "\r\n\r\n#b#L0#[月卡辦理]#l\r\n";

    var selected = npc.askMenu(str);
    switch (selected) {
        case 0:
            stage.runScript("expand/menu/贊助中心/月卡辦理");
            break;
        case 1:
        case 2:
        case 3:
            npc.say("您已領過本日" + vipBox[selected - 1][3] + " 每日福利！");
            break;
        case 4:
        case 5:
        case 6:
            var index = selected - 4;
            if (log.getEventValue(stage, db, "領取每日" + vipBox[index][3]) == 0) {
                if (log.getEventValue(stage, db, vipBox[index][3] + "每日福利") < 1) {
                    npc.say("沒次數啊");
                    return;
                }
                
                // 設置領取標記
                log.addEventValue(stage, db, "領取每日" + vipBox[index][3], 1, 1);
                log.addEventValue(stage, db, vipBox[index][3] + "每日福利", -1, -1);

                // 發放點券
                stage.modifyCurrency(2, listC[index]);
                
                var rewardStr = "#b#e恭喜您領取了" + vipBox[index][3] + " 每日福利！#k\r\n";
                rewardStr += "#b#e獲得了以下獎勵：#k\r\n";
                
                // 發放每日獎勵（使用ES5的for循環）
                for (var i = 0; i < listB[index].length; i++) {
                    var item = listB[index][i];
                    stage.gainItem(item[0], item[1]);
                    rewardStr += "#v" + item[0] + "# #b#t" + item[0] + "# #rx " + item[1] + "#k\r\n";
                }
                
                rewardStr += "#b#e獲得了#r" + listC[index] + "#b點券#k\r\n";
                stage.showSystemMessage("獲得" + listC[index] + "點券");
                npc.say(rewardStr);
            } else {
                npc.say("您已領過本日" + vipBox[selected - 4][3] + " 每日福利！");
            }
            break;
    }
}
