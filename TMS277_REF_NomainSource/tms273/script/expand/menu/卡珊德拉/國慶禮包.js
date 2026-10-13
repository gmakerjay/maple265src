/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var status = 0;
const log = require('check_log');
const {getPay, losePay} = require('vipCommon.js');
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
    Array("[火花禮包(小)]",
        188, Array(
            Array(2048761, 18, ""),
        ),
        8888
    ),
    Array("[火花禮包(大)]",
        388,
        Array(
            Array(2048761, 88, ""), //紅
        ),
        28888
    ),
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

        if (getPay(stage.getAccountId(), 1) < price) {
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