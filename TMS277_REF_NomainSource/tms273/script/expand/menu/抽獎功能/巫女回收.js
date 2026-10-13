/*
 * 装备回收脚本（优化版）
 * 功能：支持一键回收前64格装备和单独回收（自动识别装备位置，无需固定第一格）
 */

// 可回收装备列表：[装备ID, 兑换数量]
var list = [
    [1182158, 4000],
    [1122296, 250],
    [1113211, 2000],
    [1113055, 150],
    [1672077, 100],
    [1672027, 100],
    [1672073, 100],
    [1672069, 1000],
    [1202161, 150],
    [1202162, 150],
    [1202163, 150],
    [1202164, 150],
    [1202089, 150],
    [1202090, 150],
    [1202288, 150],
    [1113316, 150],
    [1012757, 150],
    [1032330, 150],
    [1122443, 150],
    [1342090, 900],
    [1302021, 15],
    [1032216, 10],
    [1113070, 10],
    [1152155, 10],
];

// 装备ID与兑换数量的映射表，用于快速查询
var list2 = {
    1182158: 4000,
    1122296: 250,
    1113211: 2000,
    1113055: 150,
    1672077: 100,
    1672027: 100,
    1672073: 100,
    1672069: 1000,
    1202161: 150,
    1202162: 150,
    1202163: 150,
    1202164: 150,
    1202089: 150,
    1202090: 150,
    1202288: 150,
    1113316: 150,
    1012757: 150,
    1032330: 150,
    1122443: 150,
    1342090: 900,
    1302021: 15,
    1032216: 10,
    1113070: 10,
    1152155: 10,
};

// 奖励物品ID
const REWARD_ITEM_ID = 4033159;
// 装备栏类型
const EQUIP_SLOT_TYPE = 1;
// 扫描范围（前64格）
const SCAN_RANGE = 128;

// 脚本入口
start();

function start() {
    // 构建菜单字符串
    let menuStr = '稀有裝備回收\r\n';
    menuStr += `回收後無法恢復，請謹慎操作\r\n`;
    menuStr += `次數每周五20:00刷新\r\n`;
    menuStr += `#L999##r#e一鍵回收前64格#k#n#l\r\n\r\n`;
    
    // 添加各个装备的回收选项
    for (let i in list) {
        let item = list[i];
        menuStr += `#L${i}##v${item[0]}##z${item[0]}# -> #v${REWARD_ITEM_ID}:i# x ${item[1]} #k#l\r\n`;
    }

    // 显示菜单并获取玩家选择
    let selection = npc.askMenu(menuStr);

    // 处理一键回收
    if (selection == 999) {
        handleBulkRecycling();
    } 
    // 处理单独回收（自动识别位置）
    else {
        handleSingleRecycling(selection);
    }
}

/**
 * 处理一键回收前64格装备
 */
function handleBulkRecycling() {
    // 询问玩家是否确认回收
    let confirmMsg = "#r回收裝備欄前64格所有可回收裝備，回收后無法恢復\r\n是否確認回收？\r\n";
    let confirm = npc.askYesNo(confirmMsg);
    
    if (confirm == 1) { // 玩家确认回收
        let totalReward = 0;
        let recycleList = [];
        
        // 扫描前64格装备
        for (let i = 1; i <= SCAN_RANGE; i++) {
            let item = stage.getItemBySlot(EQUIP_SLOT_TYPE, i);
            if (item == null) {
                continue;
            }
            // 检查是否为可回收装备
            if (list2[item.getItemId()]) {
                recycleList.push([i, item.getItemId(), list2[item.getItemId()]]);
                totalReward += list2[item.getItemId()];
            }
        }
        
        // 没有可回收的装备
        if (recycleList.length == 0) {
            npc.say("未檢測到可回收物品");
            return;
        }
        
        // 再次确认回收
        let confirmDetail = `是否確認回收以下裝備，可獲得#v${REWARD_ITEM_ID}# x #r${totalReward}#k\r\n`;
        for (let i in recycleList) {
            confirmDetail += `#v${recycleList[i][1]}#`;
        }
        
        if (npc.askYesNo(confirmDetail) == 1) {
            // 检查背包是否能容纳奖励
            if (stage.canHold(REWARD_ITEM_ID, totalReward)) {
                // 执行回收并发放奖励
                for (let j in recycleList) {
                    let item = recycleList[j];
                    stage.removeItemBySlot(EQUIP_SLOT_TYPE, item[0]);
                    stage.gainItem(REWARD_ITEM_ID, item[2]);
                }
                npc.say(`回收成功!\r\n獲得#v${REWARD_ITEM_ID}# x ${totalReward}`);
            } else {
                npc.say(`背包空間不足，請清理背包後再試！`);
            }
        }
    }
}

/**
 * 处理单独回收（自动识别装备位置）
 * @param {number} selection - 玩家选择的装备索引
 */
function handleSingleRecycling(selection) {
    // 获取目标装备信息
    let targetItemInfo = list[selection];
    let targetItemId = targetItemInfo[0];
    let rewardAmount = targetItemInfo[1];
    
    // 扫描前64格寻找目标装备
    let targetSlot = -1;
    for (let i = 1; i <= SCAN_RANGE; i++) {
        let item = stage.getItemBySlot(EQUIP_SLOT_TYPE, i);
        if (item && item.getItemId() === targetItemId) {
            targetSlot = i;
            break; // 找到第一个匹配的装备就停止扫描
        }
    }
    
    // 未找到目标装备
    if (targetSlot === -1) {
        npc.say(`未找到#v${targetItemId}#，請確保裝備在裝備欄前64格中！`);
        return;
    }
    
    // 确认回收
    if (npc.askYesNo(`是否確認回收裝備欄第${targetSlot}格的:\r\n#v${targetItemId}##z${targetItemId}# -> #v${REWARD_ITEM_ID}:i# x ${rewardAmount}`) == 1) {
        // 再次检查装备是否还在原位（防止中途移动）
        let currentItem = stage.getItemBySlot(EQUIP_SLOT_TYPE, targetSlot);
        if (!currentItem || currentItem.getItemId() !== targetItemId) {
            npc.say("裝備已移動或被移除，請重新操作！");
            return;
        }
        
        // 检查背包空间
        if (stage.canHold(REWARD_ITEM_ID, rewardAmount)) {
            // 执行回收并发放奖励
            stage.removeItemBySlot(EQUIP_SLOT_TYPE, targetSlot);
            stage.gainItem(REWARD_ITEM_ID, rewardAmount);
            npc.say("回收成功");
        } else {
            npc.say("背包空間不足！");
        }
    }
}
    