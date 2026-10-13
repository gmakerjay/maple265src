/*
 * GM專屬：一鍵修改所有已穿戴原初之力為11級滿屬性
 * 使用前：請先將原初之力穿戴到-9欄位的-1700~-1706槽位，再運行腳本
 */

// 原初之力配置（槽位+名稱+對應itemId，匹配原腳本）
var autConfig = [
    { slot: -1700, itemId: 1713000, name: "原初之力0型" },
    { slot: -1701, itemId: 1713001, name: "原初之力1型" },
    { slot: -1702, itemId: 1713002, name: "原初之力2型" },
    { slot: -1703, itemId: 1713003, name: "原初之力3型" },
    { slot: -1704, itemId: 1713004, name: "原初之力4型" },
    { slot: -1705, itemId: 1713005, name: "原初之力5型" },
    { slot: -1706, itemId: 0,       name: "原初之力6型" } // 備用槽位，itemId可自行補充
];

// 11級滿屬性配置（匹配原升級邏輯：每級+10aut，+200四維）
var customAutAttr = {
    autLevel: 11,    // 目標等級（滿級）
    aut: 100,        // aut值（10級×10=100，11級滿）
    autExp: 0,       // 經驗歸零
    baseStr: 2000,   // 力量（10級×200=2000，可改9999拉滿）
    baseDex: 2000,   // 敏捷
    baseInt: 2000,   // 智力
    baseLuk: 2000    // 幸運
};

function execute() {
    // 1. 僅GM可執行驗證
    if (!stage.isGm()) {
        npc.meFlip().say("僅管理員可執行此操作！");
        return;
    }

    // 2. 操作確認
    if (!npc.meFlip().askYesNo("即將一鍵修改所有已穿戴原初之力為11級滿屬性：\n- 等級：11級（滿級）\n- aut值：100\n- 四維屬性：各+2000\n\n請確保所有原初之力已穿戴到-9欄位的-1700~-1706槽位，是否繼續？")) {
        npc.meFlip().say("已取消操作！");
        return;
    }

    // 3. 循環修改所有原初之力槽位
    var successList = []; // 成功修改列表
    var failList = [];    // 未穿戴列表

    for (var i = 0; i < autConfig.length; i++) {
        var cfg = autConfig[i];
        // 獲取-9欄位下的對應槽位裝備（匹配原腳本的stage.getItemBySlot(-9, i)）
        var equip = stage.getItemBySlot(-9, cfg.slot);

        // 槽位無穿戴裝備 → 記錄失敗
        if (equip == null) {
            failList.push(cfg.name + "（槽位：" + cfg.slot + "）");
            continue;
        }

        // ========== 核心：強制修改11級滿屬性 ==========
        equip['autLevel'] = customAutAttr.autLevel; // 設為11級滿級
        equip['aut'] = customAutAttr.aut;           // 設為滿級aut值
        equip['autExp'] = customAutAttr.autExp;     // 經驗歸零
        
        // 四維屬性強制賦值（原邏輯是每級+200，11級合計+2000）
        equip['baseStr'] = customAutAttr.baseStr;
        equip['baseDex'] = customAutAttr.baseDex;
        equip['baseInt'] = customAutAttr.baseInt;
        equip['baseLuk'] = customAutAttr.baseLuk;

        // ========== 多重保存保障（確保屬性生效） ==========
        try { stage.setItemBySlot(-9, cfg.slot, equip); } catch (e) {} // 覆蓋槽位（兼容私服）
        stage.updateItemBySlot(-9, cfg.slot);                         // 刷新槽位（原腳本同款調用）
        try { equip.save(); } catch (e) {}                             // 強制保存裝備
        try { stage.syncEquip(); } catch (e) {}                         // 同步裝備數據

        // 記錄成功
        successList.push(cfg.name + "（槽位：" + cfg.slot + "，裝備ID：" + equip['itemId'] + "）");
    }

    // 4. 匯總修改結果
    var resultTxt = "\t\t\t原初之力一鍵修改完成！\n\n";
    if (successList.length > 0) {
        resultTxt += "#b✅ 成功修改的原初之力：#r\n" + successList.join("\n") + "\n\n";
    }
    if (failList.length > 0) {
        resultTxt += "#b❌ 未檢測到穿戴的槽位（跳過）：#r\n" + failList.join("\n") + "\n\n";
    }
    resultTxt += "#d📌 最終屬性配置：#b\nautLevel=11（滿級），aut=100，四維各=2000";

    npc.meFlip().say(resultTxt);
}

// 執行一鍵修改
execute();

// 兼容原腳本的字符串填充函數（避免報錯）
function marinstring(charToFill, totalLength, originalString) {
    var lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    var length = originalString.length + lengthOfDoubleByteChars;
    var charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}