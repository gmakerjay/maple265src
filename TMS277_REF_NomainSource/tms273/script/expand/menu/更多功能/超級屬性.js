/*
 * 超級屬性升級腳本（最終修復版）
 * 改用 changeSkillLevel 方法，兼容遊戲API
 */
var price = 50000000; 
var maxLevel = 15;

// 超級屬性類型列表（ID, 最大等級, 名稱）
var typeList = [
    [80000400, 15, "力量"],
    [80000401, 15, "敏捷"],
    [80000402, 15, "智力"],
    [80000403, 15, "運氣"],
    [80000404, 15, "血量"],
    [80000405, 15, "魔量"],
    [80000406, 10, "特數量"],
    [80000409, 15, "暴擊率"],
    [80000410, 15, "暴擊傷害"],
    [80000412, 15, "無視防禦"],
    [80000413, 15, "傷害"],
    [80000414, 15, "首領怪傷害"],
    [80000422, 15, "普通傷害"],
    [80000416, 15, "狀態異常抗性"],
    [80000419, 15, "攻擊力/魔力"], 
    [80000420, 15, "獲得經驗值"], 
    [80000421, 15, "神秘力量"]
];

// 構建選單文字
var text = "請選擇你要升級的#r[超級屬性]#k：(請勿使用面板上重置功能)\r\n";
text += "每升一級需要楓幣 #r[" + (price / 10000) + "]#k萬  最高" + maxLevel + "級\r\n";

var level = 0;
var flag = false;

// 遍歷屬性列表，添加可選選單
for (var i = 0; i < typeList.length; i++) {
    // 獲取當前等級（強制轉為數字）
    level = parseInt(stage.getSkillLevel(typeList[i][0]), 10);
    if (isNaN(level)) {
        level = 0;
    }
    
    // 顯示狀態（可提升/已滿級）
    var desc = (level < typeList[i][1]) ? "可提升" : "已滿級";
    text += "#L" + i + "#" + typeList[i][2] + "  等級：#r[" + level + "]#k " + desc + " #l\r\n";
    flag = true;
}

// 如果有可升級的屬性
if (flag) {
    // 顯示選單並獲取選擇（強制轉為整數）
    var sel = parseInt(npc.askMenu(text), 10);
    if (isNaN(sel) || sel < 0 || sel >= typeList.length) {
        npc.say("無效的選擇，請重新嘗試。");
    } else {
        // 1. 獲取選中屬性的當前等級（強制轉整）
        var selLevel = parseInt(stage.getSkillLevel(typeList[sel][0]), 10);
        selLevel = isNaN(selLevel) ? 0 : selLevel;
        
        // 2. 獲取該屬性的最大等級（從列表中讀取）
        var attrMaxLevel = parseInt(typeList[sel][1], 10);
        attrMaxLevel = isNaN(attrMaxLevel) ? maxLevel : attrMaxLevel;
        
        // 3. 檢查是否已滿級
        if (selLevel >= attrMaxLevel) {
            npc.say("該屬性已達最高等級。");
			stage.runScript("expand/menu/更多功能/超級屬性")
        } else {
            // 4. 計算可提升的最大等級（強制整數，確保≥1）
            var maxUpgrade = attrMaxLevel - selLevel;
            maxUpgrade = parseInt(maxUpgrade, 10);
            maxUpgrade = (maxUpgrade < 1) ? 1 : maxUpgrade;
            
            // 5. 用 askMenu 讓玩家選擇升級級數
            var levelMenu = "請選擇要提升的級數（每級花費" + (price / 10000) + "萬楓幣）：\r\n";
            var hasManualOption = false;
            for (var j = 1; j <= maxUpgrade; j++) {
                levelMenu += "#L" + j + "#提升 " + j + " 級（花費 " + (j * price / 10000) + " 萬）#l\r\n";
                if (j >= 10) {
                    hasManualOption = true;
                    break;
                }
            }
            if (hasManualOption || maxUpgrade > 10) {
                levelMenu += "#L99#手動輸入級數（1 - " + maxUpgrade + "）#l\r\n";
            }
            
            // 6. 獲取玩家選擇的級數
            var levelSel = parseInt(npc.askMenu(levelMenu), 10);
            var num;
            if (levelSel === 99) {
                var inputText = "請輸入要提升的級數（1 - " + maxUpgrade + "）：";
                num = parseInt(npc.askText(inputText), 10);
                num = isNaN(num) ? 1 : num;
            } else {
                num = levelSel;
            }
            
            // 7. 限制級數範圍
            num = Math.max(1, Math.min(num, maxUpgrade));
            
            // 8. 計算總費用并執行升級
            var fee = num * price;
            var yes = npc.askYesNo(
                "是否確定升級" + typeList[sel][2] + "？\r\n" +
                "提升#b[" + num + "]#k級，總花費：#r[" + (fee / 10000) + "]#k萬楓幣"
            );
            
            if (yes === 1) {
                var currentMesos = parseInt(stage.getMesos(), 10);
                if (isNaN(currentMesos) || currentMesos < fee) {
                    npc.say("楓幣不足！需要" + (fee / 10000) + "萬，當前餘額不足。");
                } else {
                    // 核心修復：使用正確的方法名和參數格式
                    var newLevel = selLevel + num;
                    if (typeof stage.changeSkillLevel === 'function') {
                        // 調用遊戲支持的方法：changeSkillLevel(skillId, level)
                        stage.changeSkillLevel(typeList[sel][0], newLevel);
                        stage.loseMesos(fee);
                        npc.say(
                            typeList[sel][2] + "升級成功！\r\n" +
                            "當前等級：#r[" + newLevel + "]#k\r\n" +
                            "消耗楓幣：" + (fee / 10000) + "萬"
                        );
						stage.runScript("expand/menu/更多功能/超級屬性")
                    } else {
                        npc.say("系統錯誤：升級方法不存在，請聯繫管理員。");
                    }
                }
            } else {
                npc.say("已取消升級操作。");
				
            }
        }
    }
} else {
    npc.say("所有超級屬性都已達最高等級！");
	
}