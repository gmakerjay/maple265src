let npcUtil = require("util_npc");
let qIdUtil = require("util_quest");
let extendLog = require("extend_log");
let npcmsg = npcUtil.getNpc();
let selectionLog = [];
let itemList = [
    [5062030, 200, 0],  //恢复方块
    [5062020, 100, 0],  //閃炫方塊
    [5062019, 100, 0],  //閃耀鏡射方塊
    [2630437, 500, 0],  //選擇秘法符文交換券
    [2635748, 200, 0],  //真實符文選擇卷
    [2450163, 100, 0],  //經驗值3倍券(30分鐘)
    [2644102, 3, 0],  //傳說潛在能力卷軸100%	
    [2534006, 5, 0],  //极限斗燃加速器
    [2634774, 3, 0],  //250级斗燃
    [2435719, 300, 0],  //核心寶石
    [1202193, 1, 7]  //輪回碑石(7日)
]

if (extendLog.getEventLog(stage, util, qIdUtil.getZDYQuestId(2), 9999) == 0) {
    text = "\t歡迎來到新楓之谷,小熊為大家準備了豐厚的新手禮包,每個賬號只能領取一次哦,請輸入我們的口號吧!(星語!)";
    selectionLog[0] = npc.askText(text);

    let res = "星語!";
    if (res.equals(selectionLog[0]) && extendLog.getEventLog(stage, util, qIdUtil.getZDYQuestId(2), 9999) == 0) {
        extendLog.addEventLog(stage, util, qIdUtil.getZDYQuestId(2), 1);
        for (key in itemList) {
            if (itemList[key][2] > 0) {
                gainTradeBlock(itemList[key][0], itemList[key][2])
            } else {
                stage.gainItem(itemList[key][0], itemList[key][1]);
            }
        }
        stage.addPopupSay(npcmsg[0], 5000, "賬號新手禮包領取成功！", "", false);
    } else {
        npc.say("口號輸入錯誤~");
    }
} else {
    npc.say("你已經領取過禮包啦，每個賬號只能領取一次~");
}

/**
 * 给予不可交易道具（限装备）
 * @param {*} itemid  道具ID
 * @param {*} period 过期天数
 */
function gainTradeBlock(itemid, period) {
    let item = util.makeItem(itemid, 1);
    item.setAttribute(40);
    if (period > 0) {
        item.setExpireDate(util.calcExpireDay(period));
    }
    stage.gainItem(item);
}