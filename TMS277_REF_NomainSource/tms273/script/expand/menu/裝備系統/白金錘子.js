/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 白金錘子
 **/

白金錘子功能();

function 白金錘子功能() {
    var Icon = [
        ["方框", "#fUI/UIWindow.img/Item/New/inventory/0#"],
        ["錘子", "#fUI/Basic.img/Cursor/32/0#"],
        ["數值", "#fUI/Basic.img/LevelNo/0#"],
        ["數值", "#fUI/Basic.img/LevelNo/1#"],
        ["數值", "#fUI/Basic.img/LevelNo/2#"],
        ["數值", "#fUI/Basic.img/LevelNo/3#"],
        ["數值", "#fUI/Basic.img/LevelNo/4#"],
        ["數值", "#fUI/Basic.img/LevelNo/5#"],
        ["數值", "#fUI/Basic.img/LevelNo/6#"],
        ["數值", "#fUI/Basic.img/LevelNo/7#"],
        ["數值", "#fUI/Basic.img/LevelNo/8#"],
        ["數值", "#fUI/Basic.img/LevelNo/9#"],
        ["箭頭", "#fUI/Basic.img/icon/arrow#"]
    ];

    var 消耗品道具 = 2472000; // 白金錘子ID
    
    // 顯示界面
    var sb = "";
    sb += "#e#b裝備白金錘子系統#k#n\r\n\r\n";
    sb += "#fUI/GuildMark/Mark/Etc/00009023/10# 簡化版 #fUI/GuildMark/Mark/Etc/00009023/10#\r\n\r\n";
    sb += Icon[2][1] + " #b可直接對任何裝備使用白金錘子\r\n";
    sb += Icon[3][1] + " #b無需金錘子前置條件\r\n";
    sb += Icon[4][1] + " #b每件裝備最多可使用#r5次#b白金錘子#k\r\n\r\n";
    sb += "#r請將裝備放在裝備欄第一格：" + Icon[0][1] + "\r\n\r\n";
    sb += "#L1#" + Icon[1][1] + " 開始使用白金錘子#l\r\n";
    sb += "#L2#" + Icon[12][1] + " 查看說明#l\r\n";
    sb += "#L99#" + Icon[0][1] + " 離開#l";

    try {
        var 選擇 = npc.askMenu(sb);
        
        switch (parseInt(選擇)) {
            case 1:
                檢查裝備並進行錘子();
                break;
            case 2:
                顯示說明();
                break;
            case 99:
                npc.say("感謝使用白金錘子系統！");
                break;
            default:
                白金錘子功能();
                break;
        }
    } catch (e) {
        npc.say("系統錯誤：" + e);
    }
}

function 檢查裝備並進行錘子() {
    // 檢查裝備欄第一格的裝備
    var item = stage.getItemBySlot(1, 1);
    
    if (item == null) {
        npc.say("裝備欄第一格是空的！\r\n請將需要白金錘子的裝備放在裝備欄第一格。");
        白金錘子功能();
        return;
    }
    
    // 檢查是否已經達到最大次數
    if (item.getPuc() >= 5) {
        npc.say("這件裝備已經使用過 #r5次#k 白金錘子，無法再使用！");
        白金錘子功能();
        return;
    }
    
    // 檢查是否有白金錘子
    if (!stage.hasItem(2472000, 1) && !stage.hasItem(2472001, 1)) {
        npc.say("您沒有白金錘子！\r\n需要物品：#v2472000:# #t2472000:#");
        白金錘子功能();
        return;
    }
    
    // 進行白金錘子
    進行白金錘子操作(1);
}

function 進行白金錘子操作(裝備位置) {
    var 成功概率顯示 = [50, 25, 10, 5, 2];
    var 成功概率實際 = [499, 249, 89, 45, 15]; // 實際概率/1000
    
    var item = stage.getItemBySlot(1, 裝備位置);
    
    if (item == null) {
        npc.say("裝備不存在！");
        白金錘子功能();
        return;
    }
    
    var 當前次數 = item.getPuc();
    var 顯示概率 = 成功概率顯示[當前次數];
    var 實際概率 = 成功概率實際[當前次數];
    
    var sb = "#e#b白金錘子確認#k#n\r\n\r\n";
    sb += "裝備信息：\r\n";
    sb += "#v" + item.getItemId() + ":# #t" + item.getItemId() + ":#\r\n";
    sb += "當前白金錘子次數：#r" + 當前次數 + "次#k\r\n";
    sb += "即將提升至：#r" + (當前次數 + 1) + "次#k\r\n";
    sb += "顯示成功率：#r" + 顯示概率 + "%#k\r\n";
    sb += "實際成功率：#r" + (實際概率/10) + "%#k\r\n\r\n";
    sb += "需要消耗：#v2472000:# #t2472000:# x1\r\n\r\n";
    sb += "#L1#確定使用白金錘子#l\r\n";
    sb += "#L2#取消#l";
    
    var 選擇 = npc.askMenu(sb);
    
    if (選擇 == 1) {
        // 再次檢查裝備是否被移動
        var itemCheck = stage.getItemBySlot(1, 裝備位置);
        if (itemCheck == null || itemCheck.getItemId() != item.getItemId()) {
            npc.say("裝備已被移動，請重新操作！");
            白金錘子功能();
            return;
        }
        
        // 檢查白金錘子
        var 消耗成功 = false;
        var 使用的錘子ID = 0;
        
        // 先嘗試使用高級白金錘子 (2472001)
        if (stage.hasItem(2472001, 1)) {
            消耗成功 = stage.loseItem(2472001, 1);
            使用的錘子ID = 2472001;
        } 
        // 再嘗試使用普通白金錘子 (2472000)
        else if (stage.hasItem(2472000, 1)) {
            消耗成功 = stage.loseItem(2472000, 1);
            使用的錘子ID = 2472000;
        }
        
        if (!消耗成功) {
            npc.say("白金錘子消耗失敗！");
            白金錘子功能();
            return;
        }
        
        // 進行概率判斷
        var 隨機數 = 取隨機數(1000);
        
        if (隨機數 <= 實際概率) {
            // 成功
            item.setPuc(當前次數 + 1);
            item.setRuc(item.getRuc() + 1);
            stage.updateItemBySlot(1, 裝備位置);
            
            // 顯示成功信息
            var 成功信息 = "#e#b錘鍊成功！#k#n\r\n\r\n";
            成功信息 += "#v" + 使用的錘子ID + ":# #t" + 使用的錘子ID + ":# 使用成功！\r\n";
            成功信息 += "裝備白金錘子次數：#r" + (當前次數 + 1) + "次#k\r\n\r\n";
            成功信息 += "#g恭喜您錘鍊成功！#k";
            
            npc.say(成功信息);
            stage.showSystemMessage("白金錘子錘鍊成功！");
        } else {
            // 失敗
            var 失敗信息 = "#e#b錘鍊失敗！#k#n\r\n\r\n";
            失敗信息 += "#v" + 使用的錘子ID + ":# #t" + 使用的錘子ID + ":# 使用失敗！\r\n";
            失敗信息 += "裝備白金錘子次數保持：#r" + 當前次數 + "次#k\r\n\r\n";
            失敗信息 += "#r請不要灰心，下次再接再厲！#k";
            
            npc.say(失敗信息);
            stage.showSystemMessage("白金錘子錘鍊失敗！");
        }
        
        // 詢問是否繼續
        var 繼續選擇 = npc.askYesNo("是否要繼續使用白金錘子？");
        if (繼續選擇 == 1) {
            白金錘子功能();
        } else {
            npc.say("感謝使用白金錘子系統！");
        }
        
    } else {
        白金錘子功能();
    }
}

function 顯示說明() {
    var sb = "#e#b白金錘子說明#k#n\r\n\r\n";
    sb += "#fUI/GuildMark/Mark/Etc/00009023/10# 使用規則 #fUI/GuildMark/Mark/Etc/00009023/10#\r\n\r\n";
    sb += "1. 裝備無需金錘子前置，可直接使用\r\n";
    sb += "2. 每件裝備最多可使用 #r5次#k 白金錘子\r\n";
    sb += "3. 使用成功率隨次數增加而降低\r\n";
    sb += "4. 失敗不會降低當前次數\r\n\r\n";
    
    sb += "#fUI/GuildMark/Mark/Etc/00009023/10# 成功率表 #fUI/GuildMark/Mark/Etc/00009023/10#\r\n\r\n";
    sb += "第1次：50% (實際49.9%)\r\n";
    sb += "第2次：25% (實際24.9%)\r\n";
    sb += "第3次：10% (實際8.9%)\r\n";
    sb += "第4次：5% (實際4.5%)\r\n";
    sb += "第5次：2% (實際1.5%)\r\n\r\n";
    
    sb += "#v2472000:# #t2472000:# - 普通白金錘子\r\n";
    sb += "#v2472001:# #t2472001:# - 高級白金錘子\r\n\r\n";
    
    sb += "#L1#返回主菜單#l";
    
    var 選擇 = npc.askMenu(sb);
    if (選擇 == 1) {
        白金錘子功能();
    }
}

function 取隨機數(最大值) {
    // 更好的隨機數生成
    var 時間戳 = new Date().getTime();
    var 隨機種子 = (時間戳 * 9301 + 49297) % 233280;
    var 隨機小數 = 隨機種子 / 233280.0;
    return Math.floor(隨機小數 * 最大值) + 1;
}

// 備用隨機函數
function 生成隨機數(最小值, 最大值) {
    return Math.floor(Math.random() * (最大值 - 最小值 + 1)) + 最小值;
}