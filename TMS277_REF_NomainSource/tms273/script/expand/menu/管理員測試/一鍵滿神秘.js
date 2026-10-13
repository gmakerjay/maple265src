/*
 * GM專屬：一鍵修改所有已穿戴秘法符文為20級arc300（無需發放/選擇）
 * 使用前：請先將所有秘法符文穿戴到對應槽位（-1600到-1605），再運行腳本
 */

// 所有秘法符文對應配置（槽位+名稱，itemId僅備註）
var runeConfig = [
    { slot: -1600, itemId: 1712001, name: "秘法符文1型" },
    { slot: -1601, itemId: 1712002, name: "秘法符文2型" },
    { slot: -1602, itemId: 1712003, name: "秘法符文3型" },
    { slot: -1603, itemId: 1712004, name: "秘法符文4型" },
    { slot: -1604, itemId: 1712005, name: "秘法符文5型" },
    { slot: -1605, itemId: 1712006, name: "秘法符文6型" }
];

// 自定義屬性配置（可按需修改）
var customAttr = {
    arcLevel: 20,    // 目標等級
    arc: 300,        // 目標arc值
    arcExp: 0,       // 經驗歸零
    baseStr: 2000,   // 力量（直接設置，可改9999拉滿）
    baseDex: 2000,   // 敏捷
    baseInt: 2000,   // 智力
    baseLuk: 2000    // 幸運
};

function execute() {
    // 1. 僅GM可執行
    if (!stage.isGm()) {
        npc.meFlip().say("僅管理員可執行！");
        return;
    }

    // 2. 提示確認
    if (!npc.meFlip().askYesNo("即將一鍵修改所有已穿戴秘法符文屬性：\n- 等級：20級（滿級）\n- arc值：300\n- 四維屬性：各2000\n\n請確保所有符文已穿戴到對應槽位，是否繼續？")) {
        npc.meFlip().say("已取消操作！");
        return;
    }

    // 3. 循環修改所有符文槽位
    var successList = []; // 成功修改列表
    var failList = [];    // 失敗列表（未穿戴）

    for (var i = 0; i < runeConfig.length; i++) {
        var cfg = runeConfig[i];
        var equip = stage.getItemBySlot(-6, cfg.slot);

        // 槽位無穿戴符文 → 記錄失敗
        if (equip == null) {
            failList.push(cfg.name + "（槽位：" + cfg.slot + "）");
            continue;
        }

        // ========== 強制修改屬性（核心） ==========
        equip['arcLevel'] = customAttr.arcLevel;
        equip['arc'] = customAttr.arc;
        equip['arcExp'] = customAttr.arcExp;
        equip['baseStr'] = customAttr.baseStr;
        equip['baseDex'] = customAttr.baseDex;
        equip['baseInt'] = customAttr.baseInt;
        equip['baseLuk'] = customAttr.baseLuk;

        // ========== 多重保存保障（確保生效） ==========
        try { stage.setItemBySlot(-6, cfg.slot, equip); } catch (e) {} // 覆蓋槽位
        stage.updateItemBySlot(-6, cfg.slot);                         // 刷新槽位
        try { equip.save(); } catch (e) {}                             // 強制保存裝備
        try { stage.syncEquip(); } catch (e) {}                         // 同步裝備數據

        // 記錄成功
        successList.push(cfg.name + "（槽位：" + cfg.slot + "）");
    }

    // 4. 匯總修改結果
    var resultTxt = "\t\t\t修改完成！\n\n";
    if (successList.length > 0) {
        resultTxt += "#b成功修改的符文：#r\n" + successList.join("\n") + "\n\n";
    }
    if (failList.length > 0) {
        resultTxt += "#b未檢測到穿戴的符文（跳過）：#r\n" + failList.join("\n") + "\n\n";
    }
    resultTxt += "#d屬性配置：#b\narcLevel=" + customAttr.arcLevel + "，arc=" + customAttr.arc + "，四維各=" + customAttr.baseStr;

    npc.meFlip().say(resultTxt);
}

// 一鍵執行
execute();

// 兼容函數（避免報錯）
function marinstring(charToFill, totalLength, originalString) {
    var lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    var length = originalString.length + lengthOfDoubleByteChars;
    var charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}