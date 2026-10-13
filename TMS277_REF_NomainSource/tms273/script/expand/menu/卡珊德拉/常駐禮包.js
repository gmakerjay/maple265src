/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var status = 0;

const {getPay, losePay} = require('vipCommon.js');
const log = require('check_log');
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

function loseRMB(rmb, memo) {
    var myAccountName = getAccountName();
    var sql = `insert into zz_rmb(account, rmb, paytime, remark)
               values ('${myAccountName}', ${rmb}, now(), '${memo}')`;
    db.insert(sql);
}

var giftContent = Array( //後面寫禮包內容道具的時候Array的前面都有逗號  一定要找規律  逗號不能少不能多 兄弟
    Array("[新人禮包]",
        88, Array(
            Array(5062026, 51, ""),
            Array(5062020, 51, ""),
            Array(5062021, 51, ""),
            Array(5062010, 51, ""),
            Array(5062500, 51, ""),
            Array(5062031, 51, ""),
        ),
        51000
    ),
    Array("[春節輪迴套餐]",
        388,
        Array(
            Array(1202193, 1, ""),
            Array(2048761, 20, ""), //紅
            Array(5062009, 200, ""), //紅
            Array(5062010, 200, ""), //黑
            Array(5062026, 50, ""), //唯一
            Array(5062020, 80, ""), //六角
            Array(5062021, 80, ""), //平等
            Array(5062500, 100, ""), //綠
            Array(5062031, 50, ""), //白
        ),
        8888
    ),
    Array("[鬼滅之刃禮包]",
        2000,
        Array(
            Array(2632833, 1, ""),
            Array(2636055, 1, ""),
            Array(2048761, 20, ""), //紅
            Array(5062009, 200, ""), //紅
            Array(5062010, 200, ""), //黑
            Array(5062026, 50, ""), //唯一
            Array(5062020, 80, ""), //六角
            Array(5062021, 80, ""), //平等
            Array(5062500, 100, ""), //綠
            Array(5062031, 50, ""), //白
        ),
        8888
    ),
	Array("[六轉核心禮包]",
        150,
        Array(
            Array(2636884, 10, ""),
            Array(4009548, 250, ""),
        ),
        1000
    ),
    // Array("[初級大禮包-御劍騎士版]",
    // 	199,
    // 	Array(
    // 		Array(1213016, 1, ""),
    // 		Array(2028175, 15, ""),
    // 		Array(2048708, 5, ""),
    // 		Array(4001832, 2000, "")
    // 	),
    // 	200000
    // ),
    // Array("[中級大禮包]",
    // 	499,
    // 	Array(
    // 		Array(2432341, 3, ""),
    // 		Array(2432069, 1, ""),
    // 		Array(2433028, 1, ""),
    // 		Array(2049600, 5, ""),
    // 		Array(2048708, 5, ""),
    // 		Array(2049323, 200, ""),
    // 		Array(2340000, 100, ""),
    // 		Array(2049004, 100, "")
    // 	),
    // 	400000
    // ),
    // Array("[中級大禮包-御劍騎士版]",
    // 	499,
    // 	Array(
    // 		Array(2432341, 3, ""),
    // 		Array(2432069, 1, ""),
    // 		Array(1354007, 1, ""),
    // 		Array(2049600, 5, ""),
    // 		Array(2048708, 5, ""),
    // 		Array(2049323, 200, ""),
    // 		Array(2340000, 100, ""),
    // 		Array(2049004, 100, "")
    // 	),
    // 	400000
    // ),
    // Array("[高級大禮包]",
    // 	999,
    // 	Array(
    // 		Array(2432341, 3, ""),
    // 		Array(2433028, 1, ""),
    // 		Array(2432069, 4, ""),
    // 		Array(2049116, 50, ""),
    // 		Array(2049600, 10, ""),
    // 		Array(2049384, 1, ""),
    // 		Array(2049323, 600, ""),
    // 		Array(2048708, 20, "")
    // 	),
    // 	10000000
    // ),
    // Array("[高級大禮包-御劍騎士版]",
    // 	999,
    // 	Array(
    // 		Array(2432341, 3, ""),
    // 		Array(1354007, 1, ""),
    // 		Array(2432069, 4, ""),
    // 		Array(2049116, 50, ""),
    // 		Array(2049600, 10, ""),
    // 		Array(2049384, 1, ""),
    // 		Array(2049323, 600, ""),
    // 		Array(2048708, 20, "")
    // 	),
    // 	10000000
    // ),
    // Array("[心動大禮包]",
    // 	2999,
    // 	Array(
    // 		Array(2432341, 3, ""),
    // 		Array(2431938, 1, ""),
    // 		Array(2433028, 1, ""),
    // 		Array(2432069, 4, ""),
    // 		Array(2431295, 50, ""),
    // 		Array(2049384, 4, ""),
    // 		Array(2049323, 800, ""),
    // 		Array(2614074, 2, ""),
    // 		Array(4001716, 2, ""),
    // 		Array(2436386, 1, ""),
    // 		Array(1202262, 1, ""),
    // 		Array(1202261, 1, ""),
    // 		Array(1202260, 1, "")
    // 	),
    // 	3000000
    // ),
    // Array("[心動大禮包-御劍騎士版]",
    // 	2999,
    // 	Array(
    // 		Array(2432341, 3, ""),
    // 		Array(1213016, 1, ""),
    // 		Array(1354007, 1, ""),
    // 		Array(2432069, 4, ""),
    // 		Array(2431295, 50, ""),
    // 		Array(2049384, 4, ""),
    // 		Array(2049323, 800, ""),
    // 		Array(2614074, 2, ""),
    // 		Array(4001716, 2, ""),
    // 		Array(2436386, 1, ""),
    // 		Array(1202262, 1, ""),
    // 		Array(1202261, 1, ""),
    // 		Array(1202260, 1, "")
    // 	),
    // 	3000000
    // )

    /*
    Array("[充值贊助禮包5]",
        6000,
        Array(
            Array(4001332, 3, "/大蜡筆"),
            Array(1202261, 1, "/畢業圖騰三件套"),
            Array(1202262, 1, "/畢業圖騰三件套"),
            Array(2630627, 2, "/神秘之影防具自選箱"),
            Array(1202260, 1, "/畢業圖騰三件套"),
            Array(2432069, 5, "/暴君自選箱"),
            Array(1122267, 1, ""),
            Array(1122267, 1, ""),
            Array(2049604, 80, ""),
            Array(2430683, 20, "/X卷抽取箱"),
            Array(2049116, 150, ""),
            Array(2049323, 80, ""),
            Array(2049137, 150, "注意配合防暴捲軸"),
            Array(5062024, 100, ""),
            Array(2048749, 60, ""),
            Array(3992025, 10, "/20星以上強化所需道具"),
            Array(3700461, 1, "")
        ),
        9000000
    ),
    Array("[充值贊助禮包6]",
        10000,
        Array(
            Array(2431142, 3, "/蠟筆隨機箱"),
            Array(4001332, 6, "/大蜡筆"),
            Array(2630627, 5, "/神秘之影防具自選箱"),
            Array(2430675, 10, "/究極捲軸"),
            Array(2430683, 35, "/X卷抽取箱"),
            Array(2049116, 200, ""),
            Array(2049323, 120, ""),
            Array(2049137, 200, "注意配合防暴捲軸"),
            Array(2049604, 120, ""),
            Array(5062024, 200, ""),
            Array(2048749, 130, ""),
            Array(3700506, 1, ""),
            Array(1672069, 1, ""),
            Array(3992025, 35, "/20星以上強化所需道具")
        ),
        15000000
    ),*/
    /*Array("[快樂源泉]",
        150,
        Array(
            Array(2436298, 1, "快樂源泉"),
            Array(2614064, 1, "500W突破")

        ),
        225000
    )*/
);
var giftId = -1;
var gifts = null;
var price = 999;
var 送抵用;
var column = new Array("裝備", "消耗", "設置", "其他", "商城");
var needItem = 4033248;
var text = "歡迎來到頑皮島限定禮包商店,點擊可以查看禮包內容哦!\r\n";
text += "" + icon2 + "您當前剩餘星語幣為：#r" + getPay(db, stage, 1) + "#k\r\n" + "#k";
// text+="#L999##b充值鏈接#k#l\r\n\r\n";
for (var key in giftContent) {
    text += "#b#n#L" + key + "##r#e" + giftContent[key][0] + "#n#b #d消耗" + giftContent[key][1] + "#n#b#l#k\r\n";
}
let selection = npc.askMenu(text);
if (selection == 999) {
    stage.runScript("expand/menu/充值鏈接");
} else {
    giftId = parseInt(selection);
    price = giftContent[giftId][1];
    gifts = giftContent[giftId][2];
    送抵用 = giftContent[giftId][3];
    var text = "#r#e" + giftContent[giftId][0] + "#n#b\r\n#e#r格外附贈抵用:[" + 送抵用 + "]\r\n";
    for (var key in gifts) {
        var itemId = gifts[key][0];
        var itemQuantity = gifts[key][1];
        text += "#i" + itemId + ":##b" + (itemId == -1 ? "贈送抵用" : "#z" + itemId + "#") + "#k #rx " + itemQuantity + " " + gifts[key][2] + "#k\r\n";
    }
    text += "\r\n#d是否花費#e#r" + price + "#n#d購買該禮包？#k";
    let sel = npc.askYesNo(text);

    if (sel == 1) {

        if (getPay(db, stage, 1) < price) {
            npc.say("您的餘額不足，請先充值后再購買。");
        } else if (stage.getFreeSlot(2) < 8 || stage.getFreeSlot(3) < 8 || stage.getFreeSlot(4) < 8 || stage.getFreeSlot(5) < 8 || stage.getFreeSlot(1) < 8) {
            npc.say("每一個格子都要保證有8個空間以上哦");
        } else if (log.getEventValue(stage, db, giftContent[giftId][0]) > 0) {
            npc.say("購買次數不足");
        } else {
            // player.loseItem(needItem,price);
            loseRMB(-giftContent[giftId][1], giftContent[giftId][0]);
            stage.modifyCurrency(2, 送抵用);
            // npc.broadcastNoticeWithoutPrefix("【禮包中心】 玩家  "+player.getName()+" 購買了"+giftContent[giftId][0]+"的禮包，獲得了一系列珍貴的道具！");
            for (var key in gifts) {
                var itemId = gifts[key][0];
                var itemQuantity = gifts[key][1];
                if (itemId == 1202193) {
                    let toDrop = util.makeItem(itemId, 1);
                    toDrop.setChuc(1);
                    toDrop.setCuttable(0);
                    stage.gainItem(toDrop);
                    // player.addEventValue("賬號限購起源箱", number, 1)
                } else {
                    stage.gainItem(itemId, itemQuantity);
                }
            }
            log.addEventValue(stage, db, giftContent[giftId][0], 1, -1)
            npc.say("恭喜您，購買成功！");
        }

    }
}

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}