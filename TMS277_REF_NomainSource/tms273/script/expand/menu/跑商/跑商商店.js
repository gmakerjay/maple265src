/**
 * 貿易商店刷新
 **/
//npc.say("沙漠貿易處於測試中，暫時不能兌換獎勵！可以先跑商積攢貨幣")

let log = require('check_log');

var itemRanList = Array(
    //注意 每種物品只能有一個。
    //Array(道具ID, 貨幣最少,貨幣最多.帳號限購數量(限購數量為-1則表示不限購	),每份多少個物品,物品名,是否單次限購 1是 0不是)
    //Array(2435552, 700,1100, 10, 1,"可交易的涅槃火焰",1), //
    Array(4001715, 8888, 18888, 3, 1, "1E金幣", 0),
    Array(5062005, 8888, 18888, 5, 1, "驚奇", 0),
    Array(5062013, 8888, 18888, 5, 1, "太陽", 0),
    Array(4009548, 2000, 10000, 25, 1, "小核心", 0),
    Array(4310249, 18888, 38888, 2, 1, "亞拉", 0),
    Array(2430376, 100000, 200000, 2, 1, "黑卷", 0),
    // Array(2430453, 100000, 200000, 1, 1, "S級寶石自選", 0),
    // Array(2644011, 400000, 700000, 1, 1, "星之力1星追加強化券", 0),
    // Array(2049389, 300000, 500000, 1, 1, "星之力20星強化券", 0),

    // Array(2435552, 1500, 22000, 3, 1, "10000點券兌換卷", 0),
    // Array(2436110, 1000, 16000, 3, 1, "10000抵用兌換卷", 0),
    // Array(4021029, 1200, 1700, 50, 1, "靈魂的精髓", 0),
    // Array(2614067, 6000, 10000, 20, 1, "1000萬極限突破石100%", 0),
    // Array(2614005, 600, 1000, 120, 1, "突破百萬之石", 0),
    // Array(4000928, 1000, 1600, 50, 1, "三葉幸運草", 0),
    Array(2637491, 50000, 50000, 5, 1, "起源1級箱子", 0),
    // Array(2049386, 3500, 80000, 3, 1, "星之力17星強化券", 0),
    // Array(4032655, 2000, 3000, 5, 1, "方塊7:傷害皮膚抽獎券", 0),
    // Array(2439305, 350, 850, 100, 1, "神秘徽章自選", 0),
    // Array(5062503, 800, 1300, 999, 1, "附加潛能記憶魔方", 0),
    // Array(2630846, 1200, 1800, 999, 1, "永遠的涅槃火焰交換券", 0)
);

var flushNum = 200;//刷新需要多少貨幣
var hour = 1;//多少小時可以刷新
var isHour = true;//是否每次更新限購 false不 true是

while (true) {
    var itemList = Array();
    var questid = 153241;
    var timestamp = (new Date()).getTime()
    var lastTime = parseFloat(stage.getQuestRecordEx(questid, "flushtime"));
    if (isNaN(lastTime)) {
        //為空的話需要刷新
        flushShops();
    } else {
        //時間到了需要刷新
        var second = parseInt(((new Date()).getTime() - lastTime) / 1000);
        if ((second / 60 / 60) >= hour) {
            flushShops();
        }
    }
    //測試代碼 一定刷新
    //flushShops();

    lastTime = parseFloat(stage.getQuestRecordEx(questid, "flushtime"));
    var nextTime = lastTime + 1000 * 60 * 60 * hour;

    for (var i = 0; i < itemRanList.length; i++) {
        var itemL = [];
        itemL[0] = itemRanList[i][0];
        itemL[1] = parseInt(stage.getQuestRecordEx(questid, itemRanList[i][0]));
        itemL[2] = itemRanList[i][3];
        itemL[3] = itemRanList[i][4];
        itemL[4] = itemRanList[i][5];
        itemL[5] = itemRanList[i][6];
        itemList.push(itemL);
    }


    let text = "在我這裡你可以用貨幣來兌換許多東西！\r\n";
    text += "上次刷新時間：" + getTime(lastTime) + " \r\n刷新間隔:" + hour + "小時\r\n"
    text += "下次刷新時間：" + getTime(nextTime) + " \r\n"
    text += "#e#r持有貨幣：" + getCoin();
    text += "\r\n存儲的貨幣：";
    text += getSaveCoin();
    text += " #n\r\n";
    text += "#L1999#花費 " + flushNum + "貨幣 刷新價格#l\r\n"
    for (var i = 0; i < itemList.length; i++) {
        let itemId = itemList[i][0];
        if (itemList[i][5] == 0) {
            text += "#b#L" + i + "##v" + itemId + "##b 需 " + itemList[i][1] + "個#v4034849#(" + itemRanList[i][1] + "~" + itemRanList[i][2] + ")#r(每日" + getEventValue("貿易限購" + itemList[i][0] + "-" + itemList[i][3], false) + "/" + itemList[i][2] + ")#b#l\r\n";
        } else {
            text += "#b#L" + i + "##v" + itemId + "##b 需 " + itemList[i][1] + "個#v4034849#(" + itemRanList[i][1] + "~" + itemRanList[i][2] + ")#r(次限" + getEventValue("貿易" + lastTime + itemList[i][0] + "-" + itemList[i][3], false) + "/" + itemList[i][2] + ")#b#l\r\n";
        }

    }
    let sel = npc.askMenu(text);
    if (sel == 1999) {
        if (1 == npc.askYesNo("確認花費" + flushNum + "刷新價格？")) {
            if (getSaveCoin() >= flushNum) {
                flushShops();
                modifyCoin(flushNum);
                npc.say("刷新成功！")
            } else {
                npc.say("儲存的貨幣不夠啊")
            }
        }
    } else {

        let item = itemList[sel];
        let itemId = item[0];

        var number = npc.minNum(1).maxNum(getSaveCoin() / itemList[sel][1]).defNum(1).askNumber("請輸入購買的份數.每份：#r" + itemList[sel][1] + "#k個#z4034849#貨幣。每份物品#r" + item[3] + "個#r#v" + itemList[sel][0] + "##z" + itemList[sel][0] + "#" + "#k!" );

        let ret = npc.askYesNo("是否使用#r" + (number * itemList[sel][1]) + "#k個#z4034849#貨幣兌換" + (item[3] * number) + "個#r#v" + itemList[sel][0] + "##z" + itemList[sel][0] + "#" + "#k!");
        if (ret === 1) {

            //判斷限購
            if (item[5] == 0 && item[2] != -1 && (getEventValue("貿易限購" + item[0] + "-" + item[3], false) + number > item[2])) {
                npc.say("該物品今日不可再次購買啦！")
            } else if (item[5] == 1 && item[2] != -1 && (getEventValue("貿易" + lastTime + item[0] + "-" + item[3], false) + number > item[2])) {
                npc.say("該物品本次不可再次購買啦！")
            } else {
                if (getSaveCoin() >= (itemList[sel][1] * number)) {
                    if (stage.gainItem(itemId, item[3] * number)) {
                        if (item[2] != -1) {
                            if (item[5] == 1) {
                                setEventValue("貿易" + lastTime + item[0] + "-" + item[3], number);
                            } else {
                                setEventValue("貿易限購" + item[0] + "-" + item[3], number);
                            }
                        }
                        modifyCoin(item[1] * number);
                        util.broadcastWorldChatMsg(13, "===沙漠跑商商店=== :玩家 " + stage.getCharacterName() + " 購買了" + item[4] + " x " + (item[3] * number) + "！");
                        npc.say("兌換了" + (item[3] * number) + "個#v" + item[0] + "##z" + item[0] + "#!");
                    } else {
                        npc.say("背包空間不足，請清理後重試!");
                    }

                } else {
                    npc.say("你好像沒有足夠的貨幣呀！兌換" + (itemId == 0 ? "#v4033570##e10000000金幣#n" : "一個#r#v" + itemList[sel][0] + "##z" + itemList[sel][0] + "#") + "#k!需要#r" + itemList[sel][1] + "#n個#z4034849##k貨幣！");
                }
            }
        }
    }
}


function flushShops() {
    var timestamp = (new Date()).getTime()
    stage.updateQuestRecordEx(questid, "flushtime", timestamp);

    //刷新物品
    for (var i = 0; i < itemRanList.length; i++) {
        stage.updateQuestRecordEx(questid, itemRanList[i][0], Math.floor(Math.random() * (itemRanList[i][2] - itemRanList[i][1]) + itemRanList[i][1]));
    }

}


function modifyCoin(number) {
    var rCount = number;
    if (getCoin() + getSaveCoin() >= number) {
        if (getSaveCoin() >= number) {
            rCount -= number;
            stage.updateQuestRecordEx(15324, "scount", String(Math.max(0, getSaveCoin() - number)));
        } else if (number > getSaveCoin()) {
            rCount -= getSaveCoin();
            stage.updateQuestRecordEx(15324, "scount", "0");
        }
        if (rCount > 0) {
            stage.updateQuestRecordEx(15324, "count", String(Math.max(0, getCoin() - rCount)));
        }
        return true;
    }
    return false;
}

function getCoin() {
    var ret = 0;
    var data = stage.getQuestRecordEx(15324, "count");
    if (data != null) {
        ret = Number(data);
    }
    return ret;
}

function getSaveCoin() {
    var ret = 0;
    var data = stage.getQuestRecordEx(15324, "scount");
    if (data != null) {
        ret = Number(data);
    }
    return ret;
}


//flag = true 查總的不重置
//flag = false 查當天的
function getEventValue(event1, flag) { 
    if (flag) {
        var sql = "select sum(value) as numbe from zz_xr_event where accounts_id = " + stage.getAccountId() + " and event = '" + event1 + "' and world =" + 0 + " ";
    } else {
        var sql = "select sum(value) as numbe from zz_xr_event where accounts_id = " + stage.getAccountId() + " and event = '" + event1 + "' and world =" + 0 + " AND DATE_FORMAT(time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') ";
    }
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("numbe");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

function setEventValue(event1, value1) { 
    var sql = "insert into zz_xr_event(accounts_id, world, `event`,`value`,time) values(" + stage.getAccountId() + "," + 0 + ",'" + event1 + "'," + value1 + ",now())";
    db.insert(sql);
}
 

function getTime(timestamp) {
    var date = new Date(timestamp);//時間戳為10位需*1000，時間戳為13位的話不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}