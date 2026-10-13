var log = require('check_log');

// 可能出現的物品id
var itemIdList = [
    4036036,4031627,4031633,4031634,4031630,4031628,
    4031635,4031641,4031637,4031642,4031636,4031638,
    4031631,4031643,4031645,4031646,4031639,4031647,
    4031644,4031640,4031648,2434974
];

var loopFlg = true;

// 完全移除setTimeout，改用引擎兼容的同步循环控制
function start() {
    // 循环控制标记，每次执行后重置
    var shouldContinue = false;
    
    var hasFish = false;
    var totalCount = 0;
    var str = "請選擇要取出的魚: \r\n";
    str += "#L" + itemIdList.length + "##r【一鍵領取所有魚貨】#d\r\n\r\n";
    
    for (var i = 0; i < itemIdList.length; i++) {
        var iId = itemIdList[i].toString();
        var amount = log.getEventValue(stage, db, "離線釣魚_" + iId);
        
        if (amount > 0) {
            str += "#L" + i + "##v" + iId + ":i##z" + iId + ":i# x " + amount + "\r\n";
            hasFish = true;
            totalCount += amount;
        }
    }

    if (hasFish) {
        var sel = npc.askMenu(str);
        
        if (sel === itemIdList.length) {
            var freeSlot = stage.getFreeSlot(1) + stage.getFreeSlot(2) + 
                           stage.getFreeSlot(3) + stage.getFreeSlot(4) + stage.getFreeSlot(5);
            
            if (freeSlot >= 1) {
                var successCount = 0;
                var failItems = [];
                
                for (var j = 0; j < itemIdList.length; j++) {
                    var itemId = itemIdList[j];
                    var amount = log.getEventValue(stage, db, "離線釣魚_" + itemId);
                    
                    if (amount > 0) {
                        if (stage.gainItem(itemId, amount)) {
                            log.resetEventValue(stage, db, "離線釣魚_" + itemId);
                            successCount++;
                        } else {
                            failItems.push("#v" + itemId + ":i#");
                        }
                    }
                }
                
                var resultStr = "一键取出完成！\r\n成功取出 " + successCount + " 种鱼获";
                if (failItems.length > 0) {
                    resultStr += "\r\n部分物品发放失败（背包可能已满）：\r\n" + failItems.join("、");
                }
                npc.say(resultStr);
                // 全部取出后不再继续
                shouldContinue = false;
            } else {
                npc.say("背包空间不足，无法一键取出所有鱼获");
                // 允许继续操作
                shouldContinue = true;
            }
        
        } else {
            var targetItemId = itemIdList[sel];
            var targetAmount = log.getEventValue(stage, db, "離線釣魚_" + targetItemId);
            
            if (targetAmount <= 0) {
                npc.say("该鱼获已被取出");
                shouldContinue = true;
            } else {
                var freeSlot = stage.getFreeSlot(1) + stage.getFreeSlot(2) + 
                               stage.getFreeSlot(3) + stage.getFreeSlot(4) + stage.getFreeSlot(5);
                
                if (freeSlot >= 1) {
                    log.resetEventValue(stage, db, "離線釣魚_" + targetItemId);
                    stage.gainItem(targetItemId, targetAmount);
                    npc.say("獲取! #v" + targetItemId + ":i# x " + targetAmount);
                    
                    // 检查是否还有剩余鱼获
                    var remainingFish = false;
                    for (var k = 0; k < itemIdList.length; k++) {
                        if (log.getEventValue(stage, db, "離線釣魚_" + itemIdList[k]) > 0) {
                            remainingFish = true;
                            break;
                        }
                    }
                    shouldContinue = remainingFish;
                } else {
                    npc.say("背包空间不足");
                    shouldContinue = true;
                }
            }
        }
    } else {
        npc.say("離線釣魚保管箱空了");
        shouldContinue = false;
    }

    // 直接递归调用（不使用任何延迟函数）
    if (shouldContinue) {
        start();
    }
}

start();