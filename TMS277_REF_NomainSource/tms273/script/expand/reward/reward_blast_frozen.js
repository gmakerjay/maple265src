
let { get賽季標號 } = require('constant/賽季信息')

function start () {
    let 賽季 = get賽季標號(); 
    if (getEventValue('復古炎魔祭壇-' + 賽季, true) == 0) {
        setEventValue('復古炎魔祭壇-' + 賽季, 1);
        stage.gainItem(5060048, 20); 
        util.broadcastChatMsg(6, `復古小副本 : 恭喜玩家 ${stage.getCharacterName()} 完成本周復古炎魔祭壇副本的挑戰！`);
    }
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
 

start();