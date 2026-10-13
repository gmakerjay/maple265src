var log = require('check_log');
var results;

var list = [
    [1, 60, 2300000],  // 1小时 = 60分钟，对应60个鱼饵
    [1, 60, 2300003]
];

// 可能出現的物品id
var itemIdList = [
    4036036,4031627,4031633,4031634,4031630,4031628,
    4031635,4031641,4031637,4031642,4031636,4031638,
    4031631,4031643,4031645,4031646,4031639,4031647,
    4031644,4031640,4031648,2434974
];

// 概率
var items = {
    "2300000": [
        [4036036, 999999, 1],[4031627, 999999, 1],[4031633, 999999, 1],[4031634, 999999, 1],
        [4031630, 999999, 1],[4031628, 999999, 1],[4031635, 999999, 1],[4031641, 999999, 1],
        [4031637, 999999, 1],[4031642, 999999, 1],[4031636, 999999, 1],[4031638, 499999, 1],
        [4031631, 499999, 1],[4031643, 499999, 1],[4031645, 200000, 1],[4031646, 200000, 1],
        [4031639, 200000, 1],[4031647, 200000, 1],[4031644, 200000, 1],[4031640, 100000, 1],
        [4031648, 50000, 1],[2434974, 2100, 1]
    ],
    "2300003": [
        [4031630, 999999, 1],[4031630, 999999, 1],[4031634, 999999, 1],[4031634, 999999, 1],
        [4031630, 999999, 1],[4031628, 999999, 1],[4031635, 999999, 1],[4031641, 999999, 1],
        [4031637, 999999, 1],[4031642, 999999, 1],[4031636, 999999, 1],[4031638, 499999, 1],
        [4031631, 499999, 1],[4031643, 499999, 1],[4031645, 200000, 1],[4031646, 200000, 1],
        [4031639, 200000, 1],[4031647, 200000, 1],[4031644, 200000, 1],[4031640, 100000, 1],
        [4031648, 50000, 1],[2434974, 23000, 1]
    ]
};

// 时间格式化函数（确保兼容性）
function formatDateTime(timestamp, format) {
    format = format || 'MM/dd HH:mm:ss';
    var date = new Date(timestamp);
    if (isNaN(date.getTime())) return '无效时间';
    
    var map = {
        'M+': date.getMonth() + 1, 'd+': date.getDate(),
        'H+': date.getHours(), 'm+': date.getMinutes(), 's+': date.getSeconds()
    };
    function padZero(num) { return num < 10 ? '0' + num : num; }
    
    for (var k in map) {
        if (map.hasOwnProperty(k)) {
            var regex = new RegExp('(' + k + ')');
            if (regex.test(format)) {
                format = format.replace(regex, regex.exec(format)[1].length === 2 ? padZero(map[k]) : map[k]);
            }
        }
    }
    return format;
}

// 核心：修复任务时间计算（确保1小时=3600000毫秒）
function start() {
    var accountId = stage.getAccountId();
    // 1. 查询未结束任务（加startTime，用于计算剩余时间）
    results = db.select('select *, UNIX_TIMESTAMP(startTime)*1000 as startMs, UNIX_TIMESTAMP(endTime)*1000 as endMs from zsf_fish_offline where accountId = ' + accountId + ' and readEndTime IS null');
    
    if (results.length == 0) {
        // 无任务：创建1小时任务
        var str = '請選擇僱傭的釣魚助手(雙倍需要加倍):\r\n';
        for (var i = 0; i < list.length; i++) {
            str += '#L' + i + '#' + list[i][1] + ' x #v' + list[i][2] + ':i#     ' + list[i][0] + '小時\r\n';
        }
        var sel = npc.askMenu(str);
        var item = list[sel][2];
        var amount = list[sel][1];
        var hours = list[sel][0]; // 固定为1小时
        
        // 快速特权逻辑（10倍鱼饵，仍1小时）
        if (stage.hasItem(5340001, 1)) {
            var dStr = '檢測到快速釣魚特權，請選擇方案：\r\n';
            dStr += '#L0#' + (amount * 10) + ' x #v' + item + ':i#     ' + hours + '小時（10倍魚餌）\r\n';
            dStr += '#L1#' + amount + ' x #v' + item + ':i#     ' + hours + '小時（常規）\r\n';
            if (npc.askMenu(dStr) == 0) amount = amount * 10;
        }
        
        // 确认创建任务
        str = '是否確定開啟【' + hours + '小時】離線釣魚？\r\n';
        str += '消耗：' + amount + ' x #v' + item + ':i#\r\n';
        if (npc.askYesNo(str) != 1) {
            npc.say('已取消任務');
            return;
        }
        
        // 前置校验
        if (!stage.hasItem(5340001, 1) && !stage.hasItem(5340000, 1)) {
            npc.say('魚竿呢。');
            return;
        }
        if (stage.getItemQuantity(item) < amount) {
            npc.say('魚餌不足，需要' + amount + '個');
            return;
        }
        
        // 关键修复：数据库存储【当前时间+1小时】的结束时间（用DATE_ADD确保格式正确）
        stage.loseItem(item, amount);
        db.insert(
            'insert into zsf_fish_offline(accountId, startTime, endTime, eFish, hours, itemId) ' +
            'values(' + accountId + ', NOW(), DATE_ADD(NOW(), INTERVAL ' + hours + ' HOUR), ' + amount + ', ' + hours + ', ' + item + ')'
        );
        npc.say('開啟【' + hours + '小時】離線釣魚成功！\r\n請1小時後再來收網');
        
    } else if (results.length > 1) {
        npc.say('檢測到多個未結束任務，請聯繫管理員');
        
    } else {
        // 有任务：计算剩余时间（用数据库返回的毫秒级时间，避免格式错误）
        var task = results[0];
        var now = new Date().getTime(); // 当前时间（毫秒）
        var startMs = Number(task.get('startMs')); // 任务开始时间（毫秒）
        var endMs = Number(task.get('endMs')); // 任务结束时间（毫秒，数据库存储的1小时后）
        var hours = Number(task.get('hours')); // 固定1小时
        var eFish = Number(task.get('eFish'));
        var itemId = Number(task.get('itemId'));
        var taskId = Number(task.get('id'));
        
        // 双重校验：如果数据库时间异常，强制重置为“开始时间+1小时”
        if (isNaN(endMs) || endMs < startMs) {
            endMs = startMs + (hours * 3600000); // 1小时=3600000毫秒
            // 同步更新数据库，避免后续异常
            db.update('update zsf_fish_offline set endTime = FROM_UNIXTIME(' + (endMs/1000) + ') where id = ' + taskId);
        }
        
        // 计算剩余时间（分钟）
        var remainMs = endMs - now;
        var remainMin = Math.max(0, Math.ceil(remainMs / 60000)); // 最小0分钟
        
        // 显示任务状态（确保1小时时长正确）
        var str = '當前釣魚任務狀態：\r\n';
        str += '開始時間：' + formatDateTime(startMs) + '\r\n';
        str += '結束時間：' + formatDateTime(endMs) + '\r\n';
        str += '剩餘時間：' + remainMin + ' 分鐘\r\n';
        str += '預計總魚獲：' + eFish + ' 條\r\n';
        
        // 1. 任务未结束（剩余时间>0）：只能提前收网
        if (remainMin > 0) {
            // 计算已捕捞数量（按已消耗时间比例）
            var usedMs = now - startMs;
            var usedRatio = usedMs / (hours * 3600000); // 已用时间/总时间（1小时）
            var caughtFish = Math.floor(usedRatio * eFish); // 已捕数量（取整）
            var returnBait = Math.floor((eFish - caughtFish) * 0.9); // 返还90%未用鱼饵
            
            str += '已捕撈：' + caughtFish + ' 條\r\n';
            str += '提前收網可返還魚餌：' + returnBait + ' 個\r\n';
            str += '是否確認提前收網？';
            
            if (npc.askYesNo(str) == 1) {
                // 执行提前收网
                db.update('update zsf_fish_offline set readEndTime = NOW(), rFish = ' + caughtFish + ' where id = ' + taskId);
                stage.gainItem(itemId, returnBait);
                catchFish(itemId + "", caughtFish);
                npc.say('提前收網成功！已返還' + returnBait + '個魚餌');
            } else {
                npc.say('已放棄提前收網，任務繼續');
            }
        
        // 2. 任务已结束（剩余时间=0）：正常收网
        } else {
            str += '任務已結束，是否領取魚獲？';
            if (npc.askYesNo(str) == 1) {
                db.update('update zsf_fish_offline set readEndTime = NOW(), rFish = ' + eFish + ' where id = ' + taskId);
                catchFish(itemId + "", eFish);
                npc.say('成功領取全部魚獲！');
            }
        }
    }
}

// 发放渔获（原有逻辑不变）
function catchFish(itemId, amount) {
    var fishConfig = items[itemId];
    if (!fishConfig) {
        npc.say('魚餌配置異常，無法發放魚獲');
        return;
    }
    var lastList = {};
    for (var z = 0; z < amount; z++) {
        var finalId = gainFishID(fishConfig);
        lastList[finalId] = lastList[finalId] ? lastList[finalId] + 1 : 1;
    }
    
    var str = '恭喜您本次收穫如下：\r\n';
    for (var i = 0; i < itemIdList.length; i++) {
        var iId = itemIdList[i].toString();
        if (lastList[iId]) {
            str += '#v' + iId + ':i# x ' + lastList[iId] + '\r\n';
            log.addEventValue(stage, db, "離線釣魚_" + iId, lastList[iId], -1);
        }
    }
    npc.say(str);
}

// 随机获取鱼ID（原有逻辑不变）
function gainFishID(fishs) {
    var chance = Math.floor(Math.random() * 999999);
    var finalitem = [];
    for (var i = 0; i < fishs.length; i++) {
        if (fishs[i][1] >= chance) finalitem.push(fishs[i]);
    }
    var finalIdx = Math.floor(Math.random() * finalitem.length);
    return finalitem[finalIdx][0];
}

start();