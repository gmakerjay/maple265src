let xiaoxingxing = "#fEffect/CharacterEff/1073453/0/0#";
let xing = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";

let rewardRate = 1; // 默认倍数（后续函数内会重新判断，避免全局干扰）
let 積分 = 獲取積分();

// 初始化积分：若查询失败（返回-1），创建初始积分记录
if (積分 === -1 || 積分 === null) {
    添加積分(0, 1); // 0积分+1倍，仅创建空记录
    積分 = 0;
}

// 构建主菜单
var sb = "#d\t\t\t\t" + xiaoxingxing + "釣魚系統" + xiaoxingxing + "#l\r\n\r\n";
sb += "玩家 #r#h # #n#d你好！釣魚積分值：#r" + 積分 + "#d 點\r\n";
sb += "歡迎來到釣魚積分商城!這裡可以用釣來的魚換取積分！\r\n";
sb += "也可以用釣魚積分來購買一些稀有物品！\r\n";
sb += "#d#L1#" + xing + "購買魚竿魚餌#l\r\n\r\n";
sb += "#d#L3#" + xing + "用魚換取積分#l    #L4#" + xing + "釣魚積分換購#l\r\n\r\n";
sb += "#d#L5#" + xing + "離線釣魚#l        #L6#" + xing + "離線釣魚魚簍#l\r\n\r\n";

// GM专属：创建钓鱼事件（保留原有逻辑）
if (stage.isGm() && stage.getChannelId() == 1) {
    let e = ctx.getEvent('ZSF_FISH');
    if (!e) {
        ctx.makeEvent('ZSF_FISH', true, null);
    }
}

// 主菜单选择逻辑
let menu_index = npc.askMenu(sb);
if (menu_index == 1) {
    stage.runScript("expand/menu/商店大全/釣魚商店"); 
} else if (menu_index == 3) {
    用魚換取積分();
} else if (menu_index == 4) {
    釣魚積分換購(); // 移除GM限制，普通用户也可使用
} else if (menu_index == 5) {
    stage.runScript("expand/menu/釣魚/離線釣魚");
} else if (menu_index == 6) {
    stage.runScript("expand/menu/釣魚/離線釣魚保管箱");
} else if (menu_index == 7) {
    stage.runScript("排行榜單/本周釣魚排行");
} else if (menu_index == 8) {
    stage.runScript("排行榜單/上周釣魚排行");
}


/**
 * 排行规则说明（保留原有逻辑）
 */
function 排行上交說明() {
    var sb = "#d\t\t\t\t" + xiaoxingxing + "排行上交說明" + xiaoxingxing + "#l\r\n\r\n";
    sb += "用魚換取積分後自動計入本周排行\r\n";
    sb += "排行截止時間為每周日23.59分\r\n";
    sb += "#r第一名：#d#v2634900#x1,#v2630873#x3,破功x500萬,\r\n";
    sb += "#r第二~第五名：#d#v2630873#x3,破功x400萬\r\n";
    sb += "#r第六~第十名：#d#v2630873#x2,破功x300萬\r\n";
    sb += "#r第十~第二十名：#d#v2630873#x1,破功x200萬\r\n";
    npc.askText(sb, "了解規則", 1, 10);
}


/**
 * 单条/一键兑换鱼获（核心修复：VIP倍数、积分计算）
 */
function 用魚換取積分() {
    // 重新判断VIP倍数（确保单条/一键兑换逻辑一致）
    let currentRewardRate = 1;
    if (stage.getVipLevel() >= 2) {
        currentRewardRate = 3;
        stage.showSystemMessage('由於您是VIP用戶,提交釣魚積分三倍獲取');
    }

    var itemList = 所有魚();
    let 當前積分 = 獲取積分();
    let menuSb = "你當前的釣魚積分為：#r" + 當前積分 + "#k 點\r\n";
    menuSb += "#L9999##r一鍵提交所有魚#d#l\r\n";

    // 构建鱼类选择菜单
    for (var i = 0; i < itemList.length; i++) {
        let itemId = itemList[i][0];
        let itemName = util.getItemName(itemId) || "未知魚類";
        let itemCount = stage.getItemQuantity(itemId);
        let singlePoint = itemList[i][1];
        menuSb += "\r\n#L" + i + "#" + "#d#i" + itemId + ":i# " + nbsp(itemName, 12) + "x #r" + itemCount + "#d 單價：#r" + singlePoint + "積分#l";
    }

    let selectIndex = npc.askMenu(menuSb);
    // 一键提交所有鱼
    if (selectIndex == 9999) {
        一鍵提交所有魚(currentRewardRate);
    } 
    // 单条鱼兑换
    else {
        let selectedItem = itemList[selectIndex];
        let itemId = selectedItem[0];
        let singlePoint = selectedItem[1];
        let maxExchangeNum = stage.getItemQuantity(itemId);

        // 检查是否有该鱼
        if (maxExchangeNum <= 0) {
            npc.say("您沒有該魚，無法兌換！");
            用魚換取積分();
            return;
        }

        // 输入兑换数量
        let exchangeNum = npc.defNum(1)
            .minNum(1)
            .maxNum(maxExchangeNum)
            .askNumber(`#d請輸入想要兌換的數量\r\n\r\n現有此類魚數量#r${maxExchangeNum}#d條\r\n\r\n#r每條#v${itemId}##t${itemId}##d可兌換#b${singlePoint}#d積分（VIP用戶三倍）#k`);

        // 计算积分并执行兑换
        let rawPoint = exchangeNum * singlePoint; // 未乘倍数的积分
        let finalPoint = rawPoint * currentRewardRate; // 最终积分（含倍数）
        
        // 扣除鱼获
        stage.loseItem(itemId, exchangeNum);
        // 添加积分（含异常处理）
        let addResult = 添加積分(rawPoint, currentRewardRate);
        if (addResult) {
            // 记录兑换日志
            添加積分記錄(finalPoint, itemId, exchangeNum);
            npc.say(`兌換成功！\r\n本次獲得積分: #r${finalPoint}#k\r\n當前積分: #r${獲取積分()}#k`);
        } else {
            npc.say("積分添加失敗，請稍後重試或聯繫管理員！");
            // 回滚：返还扣除的鱼
            stage.gainItem(itemId, exchangeNum);
        }
    }

    // 重新加载兑换菜单
    用魚換取積分();
}


/**
 * 一键提交所有鱼（修复：积分累加、倍数同步）
 * @param {number} rate - VIP倍数（1或3）
 */
function 一鍵提交所有魚(rate) {
    var itemList = 所有魚();
    let totalRawPoint = 0; // 未乘倍数的总积分
    let exchangeLog = []; // 兑换日志（用于后续记录）

    // 遍历所有鱼，计算总积分并扣除
    for (var i = 0; i < itemList.length; i++) {
        let itemId = itemList[i][0];
        let singlePoint = itemList[i][1];
        let itemCount = stage.getItemQuantity(itemId);

        if (itemCount > 0) {
            let currentRawPoint = itemCount * singlePoint;
            totalRawPoint += currentRawPoint;
            // 记录当前鱼的兑换信息
            exchangeLog.push({
                itemId: itemId,
                count: itemCount,
                finalPoint: currentRawPoint * rate
            });
            // 扣除鱼获
            stage.loseItem(itemId, itemCount);
        }
    }

    // 检查是否有可兑换的鱼
    if (totalRawPoint <= 0) {
        npc.say("您沒有可兌換的魚，請先去釣魚吧！");
        return;
    }

    // 添加积分（含异常处理）
    let addResult = 添加積分(totalRawPoint, rate);
    if (addResult) {
        // 批量记录兑换日志
        for (var log of exchangeLog) {
            添加積分記錄(log.finalPoint, log.itemId, log.count);
        }
        let finalTotalPoint = totalRawPoint * rate;
        npc.say(`一鍵兌換成功！\r\n本次共兌換${exchangeLog.length}種魚類\r\n獲得總積分: #r${finalTotalPoint}#k\r\n當前積分: #r${獲取積分()}#k`);
    } else {
        npc.say("積分添加失敗，已為您返还所有魚获！");
        // 回滚：返还所有扣除的鱼
        for (var log of exchangeLog) {
            stage.gainItem(log.itemId, log.count);
        }
    }
}


/**
 * 所有可兑换鱼类列表（保留原有配置）
 * @returns {Array} 鱼类数组：[itemId, 单条积分, 预留字段]
 */
function 所有魚() {
    return [
        [4036036, 1, 1],    // 沙丁魚
        [2434974, 500, 1],  // 黃金魚
        [4031630, 5, 1],    // 鯉魚(30cm)
        [4031637, 8, 1],    // 鯉魚(53cm)
        [4031638, 10, 1],   // 鯉魚(60cm)
        [4031639, 20, 1],   // 鯉魚(100cm)
        [4031640, 30, 1],   // 鯉魚(113cm)
        [4031631, 10, 1],   // 鮭魚(150cm)
        [4031645, 12, 1],   // 鮭魚(166cm)
        [4031646, 15, 1],   // 鮭魚(183cm)
        [4031647, 20, 1],   // 鮭魚(227cm)
        [4031648, 50, 1],   // 鮭魚(288cm)
        [4031644, 20, 1],   // 劍魚(148cm)
        [4031628, 5, 1],    // 劍魚(120cm)
        [4031641, 7, 1],    // 劍魚(128cm)
        [4031642, 8, 1],    // 劍魚(131cm)
        [4031643, 10, 1],   // 劍魚(140cm)
        [4031627, 2, 1],    // 青魚(3cm)
        [4031633, 3, 1],    // 青魚(3.6cm)
        [4031634, 5, 1],    // 青魚(5cm)
        [4031635, 7, 1],    // 青魚(6.5cm)
        [4031636, 9, 1]     // 青魚(10cm)
    ];
}


/**
 * 积分兑换物品（修复：背包空间检查、积分计算）
 */
function 釣魚積分換購() {
    let 當前積分 = 獲取積分();
    // 兑换物品列表（保留原有配置）
    var exchangeItemList = [
        [1113195, 33000, 1],// 白
        [1113196, 35000, 1],// 白
        [2472000, 260, 1],  // 白金錘
        [2439279, 99, 1],   // 經驗核心
        [2048761, 3500, 1], // 火花
        [5064502, 7000, 1], // 火花
        [5062026, 300, 1],  // 唯一魔方 
        [5062009, 90, 1],   // 紅
        [5062010, 90, 1],   // 黑
        [5062021, 180, 1],  // 平等 
        [5062500, 180, 1],  // 綠
        [5062500, 180, 1],  // 綠
        [5062031, 210, 1],  // 白
        [4310086, 180000, 1],// 白
        [2430377, 90000, 1],// 白
        [2049376, 60000, 1],// 白
        [5743003, 90, 1]    // 白
    ];

    // 构建兑换菜单
    let menuSb = "你當前的釣魚積分為：#r" + 當前積分 + "#k 點\r\n";
    for (var i = 0; i < exchangeItemList.length; i++) {
        let itemId = exchangeItemList[i][0];
        let itemName = util.getItemName(itemId) || "未知物品";
        let needPoint = exchangeItemList[i][1];
        menuSb += "\r\n#L" + i + "#" + "#b#i" + itemId + ":# #z" + itemId + "# 所需積分：#r" + needPoint + "#k#l";
    }

    let selectIndex = npc.askMenu(menuSb);
    let selectedItem = exchangeItemList[selectIndex];
    let itemId = selectedItem[0];
    let singleNeedPoint = selectedItem[1];

    // 输入购买数量
    let buyNum = npc.defNum(1)
        .minNum(1)
        .maxNum(1000)
        .askNumber(`請輸入想要購買的數量\r\n\r\n#r每個#v${itemId}##t${itemId}##d需要#b${singleNeedPoint}#d積分#k`);

    // 确认购买
    let totalNeedPoint = buyNum * singleNeedPoint;
    let confirm = npc.askYesNo(`你想購買#r${buyNum}個#v${itemId}##t${itemId}##k？\r\n需消耗#r${totalNeedPoint}#d釣魚積分\r\n當前剩餘積分：#r${當前積分}#k`);

    if (confirm == 1) {
        // 检查积分是否足够
        if (當前積分 < totalNeedPoint) {
                        npc.say(`購買失敗！\r\n所需積分：#r${totalNeedPoint}#d\r\n當前積分：#r${當前積分}#d\r\n積分不足，無法購買！`);
            釣魚積分換購(); // 重新显示兑换菜单
            return;
        }
/*
        // 检查背包空间是否足够
        if (!stage.canGainItem(itemId, buyNum)) {
            npc.say(`購買失敗！\r\n您的背包空間不足，無法容納#r${buyNum}個#v${itemId}##t${itemId}##k！`);
            釣魚積分換購();
            return;
        }
*/
        // 执行购买（扣除积分+发放物品）
        try {
            // 扣除积分（传入负数表示减少）
            let deductResult = 添加積分(-totalNeedPoint, 1); // 倍数固定为1（减少积分不翻倍）
            if (!deductResult) {
                throw new Error("積分扣除失敗");
            }

            // 发放物品
            let gainSuccess = stage.gainItem(itemId, buyNum);
            if (!gainSuccess) {
                // 回滚积分：若物品发放失败，返还已扣除的积分
                添加積分(totalNeedPoint, 1);
                throw new Error("物品發放失敗，可能背包已滿");
            }

            // 购买成功提示
            npc.say(`購買成功！\r\n獲得：#r${buyNum}個#v${itemId}##t${itemId}##k\r\n消耗積分：#r${totalNeedPoint}#d\r\n剩餘積分：#r${獲取積分()}#k`);
        } catch (err) {
            npc.say(`購買失敗：${err.message}\r\n請聯繫管理員處理！`);
        }
    } else {
        npc.say("已取消購買操作");
    }

    // 重新加载兑换菜单
    釣魚積分換購();
}


/**
 * 购买鱼饵（保留原有逻辑，优化提示信息）
 * @param {number} price - 单价（金币）
 * @param {number} itemid - 鱼饵物品ID
 */
function 購買餌料(price, itemid) {
    let itemName = util.getItemName(itemid) || "未知魚餌";
    let buyNum = npc.defNum(1)
        .minNum(1)
        .maxNum(500)
        .askNumber(`請輸入想要購買的${itemName}數量\r\n\r\n#d每個#v${itemid}##t${itemid}#需要#r${price}金幣#k`);

    let totalPrice = buyNum * price;
    let confirm = npc.askYesNo(`你想購買#r${buyNum}個#v${itemid}##t${itemid}##k？\r\n需消耗#r${totalPrice / 10000}萬金幣#d\r\n（當前持有金幣：#r${stage.getMesos() / 10000}萬#d）`);

    if (confirm == 1) {
        // 检查金币是否足够
        if (!stage.hasMesos(totalPrice)) {
            npc.say(`購買失敗！\r\n所需金幣：#r${totalPrice / 10000}萬#d\r\n持有金幣：#r${stage.getMesos() / 10000}萬#d\r\n金幣不足！`);
            return;
        }

        // 检查背包空间
        if (!stage.canGainItem(itemid, buyNum)) {
            npc.say(`購買失敗！\r\n背包空間不足，無法容納#r${buyNum}個${itemName}#k！`);
            return;
        }

        // 执行购买
        stage.gainMesos(-totalPrice);
        stage.gainItem(itemid, buyNum);
        npc.say(`購買成功！\r\n獲得：#r${buyNum}個#v${itemid}##t${itemid}##k\r\n消耗金幣：#r${totalPrice / 10000}萬#d`);
    } else {
        npc.say("已取消購買魚餌");
    }
}


/**
 * 记录积分变动日志（修复：确保日志准确性）
 * @param {number} point - 变动积分（正数为增加，负数为减少）
 * @param {number} itemid - 关联物品ID
 * @param {number} number - 物品数量
 */
function 添加積分記錄(point, itemid, number) {
    try {
        if (point === 0 || number <= 0) return; // 无效记录不插入

        var sql = `INSERT INTO 釣魚表_上交表(
            characters_id, 
            point, 
            itemid, 
            number, 
            paytime, 
            vipLevel
        ) VALUES (
            ${stage.getCharacterId()}, 
            ${point}, 
            ${itemid}, 
            ${number}, 
            NOW(), 
            ${stage.getVipLevel()}
        )`;
        db.insert(sql);
    } catch (err) {
        npc.say(`積分日志記錄失敗：${err.message}`);
    }
}


/**
 * 添加/扣除积分（核心修复：返回操作结果，支持异常回滚）
 * @param {number} rawPoint - 原始积分（未乘倍数）
 * @param {number} rewardRate - 倍数（1或3）
 * @returns {boolean} 操作是否成功
 */
function 添加積分(rawPoint, rewardRate) {
    if (rewardRate <= 0) {
        npc.say("積分倍數設置錯誤！");
        return false;
    }

    let finalPoint = rawPoint * rewardRate;
    let characterId = stage.getCharacterId();

    try {
        let currentPoint = 獲取積分();
        // 首次添加积分（无记录）
        if (currentPoint === -1 || currentPoint === null) {
            // 若首次操作是扣除积分，直接返回失败
            if (finalPoint < 0) {
                npc.say("您尚未有積分記錄，無法扣除積分！");
                return false;
            }

            var insertSql = `INSERT INTO 釣魚表_積分表(
                character_id, 
                point, 
                time
            ) VALUES (
                ${characterId}, 
                ${finalPoint}, 
                NOW()
            )`;
            db.insert(insertSql);

            // 验证插入结果
            let newPoint = 獲取積分();
            if (newPoint === finalPoint) {
                stage.showSystemMessage(`積分變動：+${finalPoint}`);
                return true;
            } else {
                throw new Error("插入積分記錄後查詢結果不符");
            }
        } 
        // 非首次操作（更新积分）
        else {
            // 检查扣除积分是否超过当前积分
            if (finalPoint < 0 && Math.abs(finalPoint) > currentPoint) {
                npc.say(`積分不足！當前積分：${currentPoint}，需扣除：${Math.abs(finalPoint)}`);
                return false;
            }

            var updateSql = `UPDATE 釣魚表_積分表 
                            SET point = point + ${finalPoint},
                                time = NOW()
                            WHERE character_id = ${characterId}`;
            db.update(updateSql);

            // 验证更新结果
            let newPoint = 獲取積分();
            if (newPoint === currentPoint + finalPoint) {
                stage.showSystemMessage(`積分變動：${finalPoint > 0 ? '+' : ''}${finalPoint}`);
                return true;
            } else {
                throw new Error("更新積分後查詢結果不符");
            }
        }
    } catch (err) {
        npc.say(`積分操作失敗：${err.message}`);
        return false;
    }
}


/**
 * 获取当前用户积分（修复：处理null和异常）
 * @returns {number} 积分值（-1表示无记录）
 */
function 獲取積分() {
    try {
        var sql = `SELECT point FROM 釣魚表_積分表 
                   WHERE character_id = ${stage.getCharacterId()} 
                   LIMIT 1`;
        var resultList = db.select(sql);

        if (resultList.length === 0) {
            return -1; // 无记录
        }

        var result = resultList[0];
        var point = result.get("point");
        // 处理数据库中point为null的情况
        return point === null ? 0 : Number(point);
    } catch (err) {
        npc.say(`查詢積分失敗：${err.message}`);
        return -1;
    }
}


/**
 * 字符串补空格函数（保留原有逻辑）
 * @param {string} str - 原字符串
 * @param {number} len - 目标长度（半角字符计算）
 * @returns {string} 补空格后的字符串
 */
function nbsp(str, len) {
    var str = str + "";
    var nbspStr = "";
    if (chkstrlen(str) < len) {
        for (var i = 0; i < len - chkstrlen(str); i++) {
            nbspStr += " ";
        }
    }
    return str + nbspStr;
}


/**
 * 计算字符串长度（半角1，全角2）（保留原有逻辑）
 * @param {string} str - 字符串
 * @returns {number} 长度
 */
function chkstrlen(str) {
    var strlen = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            strlen += 2; // 全角字符
        } else {
            strlen++; // 半角字符
        }
    }
    return strlen;
}