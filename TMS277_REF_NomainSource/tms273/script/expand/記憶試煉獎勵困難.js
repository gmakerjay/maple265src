/**
 *
 **/

let now = getEventValue("記憶試煉", false);
let max = 1;//最大領獎次數
if (max > now) {
    // stage.gainItem(4310296, 10);//活動必


    // stage.gainItem(2614079, 2);//千萬突破石
    // stage.gainItem(4002001, 10);//藍蝸牛郵票
    // stage.gainItem(4002003, 10);//綠水靈郵票
    // stage.gainItem(4033999, 2);//頑皮島封印石
    // stage.gainItem(4009398, 5);//四葉草
    // stage.gainItem(4310306, 3000);//島主核心
    // stage.gainItem(4310324, 5000);//炫彩羽毛
    // stage.gainItem(2435798, 1);//爆肝箱子3級 
    // stage.gainItem(2432206,2);//一千萬定居幣
 

    stage.gainItem(4001551,15);//一千萬定居幣
    // stage.gainItem(2636965,2);//一千萬定居幣
    stage.gainItem(4009547,500);//一千萬定居幣
    stage.gainItem(2431739,1);//一千萬定居幣
 
    util.broadcastWorldChatMsg(5, "【記憶試煉-困難】:玩家 " + stage.getCharacterName() + " 今日已成功通關記憶試煉頂級試煉" + (now + 1) + "次,獲得大量獎勵！");

 
    setEventValue("記憶試煉", 1);
} else {
    stage.showSystemMessage("今日已經領取了" + max + "次獎勵,無法再次領取");
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
 