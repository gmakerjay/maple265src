// 管理員測試腳本
execute();

function execute() {
    let txt = "#e#b[管理員測試菜單]#r#k#l\r\n\r\n";
    txt += "#d[野外BOSS]#k\r\n";
    txt += "#L0#開啟野外BOSS事件#l\r\n";
    txt += "#L1#關閉野外BOSS事件#l\r\n";
    txt += "#L2#查看野外BOSS事件狀態#l\r\n";
    txt += "#L3#結算上周野外BOSS排行#l\r\n";
    txt += "\r\n#d[世界BOSS]#k\r\n";
    txt += "#L4#開啟世界BOSS事件#l\r\n";
    txt += "#L5#立即開始世界BOSS活動#l\r\n";
    txt += "#L6#查看世界BOSS狀態#l\r\n";
    txt += "#L7#重置世界BOSS活動#l\r\n";
    txt += "#L8#進入世界BOSS等待地圖#l\r\n";
    txt += "#L9#進入世界BOSS戰鬥地圖#l\r\n";
    txt += "\r\n#L10#返回#l";
    
    let sel = npc.askMenu(txt);
    
    switch (sel) {
        case 0:
            開啟野外BOSS事件();
            break;
        case 1:
            關閉野外BOSS事件();
            break;
        case 2:
            查看野外BOSS事件狀態();
            break;
        case 3:
            結算上周野外BOSS排行();
            break;
        case 4:
            開啟世界BOSS事件();
            break;
        case 5:
            立即開始世界BOSS活動();
            break;
        case 6:
            查看世界BOSS狀態();
            break;
        case 7:
            重置世界BOSS活動();
            break;
        case 8:
            進入世界BOSS等待地圖();
            break;
        case 9:
            進入世界BOSS戰鬥地圖();
            break;
        case 10:
            // 返回
            break;
    }
}

/**
 * 開啟野外BOSS事件
 */
function 開啟野外BOSS事件() {
    let event = ctx.getEvent('alice_server_monster');
    if (event != null) {
        npc.say("野外BOSS事件已經處於開啟狀態！");
        util.log("[管理員測試] 嘗試開啟野外BOSS事件，但事件已存在");
        return;
    }
    
    try {
        // 啟動野外BOSS服務器事件，attachment為空對象
        ctx.makeEvent('alice_server_monster', true, {});
        npc.say("野外BOSS事件開啟成功！\r\n所有野外BOSS已初始化，玩家可以開始挑戰了！");
        util.broadcastNotice("野外BOSS系統已開啟，歡迎前往挑戰！");
        util.log("[管理員測試] 野外BOSS事件開啟成功");
    } catch (e) {
        npc.say("野外BOSS事件開啟失敗！\r\n錯誤信息：" + e);
        util.log("[管理員測試] 野外BOSS事件開啟失敗：" + e);
    }
}

/**
 * 關閉野外BOSS事件
 */
function 關閉野外BOSS事件() {
    let event = ctx.getEvent('alice_server_monster');
    if (event == null) {
        npc.say("野外BOSS事件已經處於關閉狀態！");
        util.log("[管理員測試] 嘗試關閉野外BOSS事件，但事件不存在");
        return;
    }
    
    try {
        event.destroyEvent();
        npc.say("野外BOSS事件關閉成功！");
        util.broadcastNotice("野外BOSS系統已關閉！");
        util.log("[管理員測試] 野外BOSS事件關閉成功");
    } catch (e) {
        npc.say("野外BOSS事件關閉失敗！\r\n錯誤信息：" + e);
        util.log("[管理員測試] 野外BOSS事件關閉失敗：" + e);
    }
}

/**
 * 查看野外BOSS事件狀態
 */
function 查看野外BOSS事件狀態() {
    let event = ctx.getEvent('alice_server_monster');
    let monster = require('constant/model_monster');
    
    if (event == null) {
        npc.say("野外BOSS事件狀態：\r\n#r關閉#k\r\n\r\n請先開啟事件才能查看BOSS狀態。");
        return;
    }
    
    let txt = "#e#b[野外BOSS事件狀態]#r#k#l\r\n\r\n";
    txt += "事件狀態：#g開啟#k\r\n\r\n";
    txt += "#dBOSS狀態列表：#k\r\n";
    
    let availableCount = 0;
    let unavailableCount = 0;
    
    for (let i in monster) {
        let isAvailable = event.getVariable('monster_' + i);
        let bossName = monster[i].name;
        
        if (isAvailable == "true") {
            txt += "#g■#k " + bossName + " - #g可挑戰#k\r\n";
            availableCount++;
        } else {
            let killName = event.getVariable('name_' + i) || "未知";
            let refreshDate = event.getVariable('date_' + i) || "0";
            let refreshTime = parseInt(refreshDate);
            let now = new Date().getTime();
            
            if (refreshTime > now) {
                let diff = refreshTime - now;
                let minutes = Math.floor(diff / 60000);
                let seconds = Math.floor((diff % 60000) / 1000);
                txt += "#r■#k " + bossName + " - #r已擊殺#k (擊殺者：" + killName + "，刷新倒計時：" + minutes + "分" + seconds + "秒)\r\n";
            } else {
                txt += "#r■#k " + bossName + " - #r已擊殺#k (擊殺者：" + killName + "，等待刷新)\r\n";
            }
            unavailableCount++;
        }
    }
    
    txt += "\r\n#d統計：#k\r\n";
    txt += "可挑戰BOSS：" + availableCount + " 個\r\n";
    txt += "已擊殺BOSS：" + unavailableCount + " 個";
    
    npc.say(txt);
}

/**
 * 獲取上周的周一和周日日期
 */
function getLastWeekMondayAndSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // 今天是本周的第几天，周日作为一周的第七天处理
    const diffMonday = today.getDate() - dayOfWeek - 6; // 上周周一的日期
    const lastMonday = new Date(today.setDate(diffMonday));
    const lastSunday = new Date(today.setDate(lastMonday.getDate() + 7)); // 上周周日的日期
    return {
        lastMonday: lastMonday.getFullYear() + '-' + (lastMonday.getMonth() + 1).toString().padStart(2, '0') + '-' + lastMonday.getDate().toString().padStart(2, '0'),
        lastSunday: lastSunday.getFullYear() + '-' + (lastSunday.getMonth() + 1).toString().padStart(2, '0') + '-' + lastSunday.getDate().toString().padStart(2, '0')
    };
}

/**
 * 結算上周野外BOSS排行
 */
function 結算上周野外BOSS排行() {
    if (!npc.askYesNo("確定要結算上周的野外BOSS排行榜嗎？\r\n這將會從擊殺記錄中統計上周的積分並生成排行榜數據。")) {
        return;
    }
    
    try {
        // 獲取上周的周一和周日
        let weekInfo = getLastWeekMondayAndSunday();
        let weekStart = weekInfo.lastMonday;
        let weekEnd = weekInfo.lastSunday;
        
        npc.say("正在結算上周排行榜...\r\n時間範圍：" + weekStart + " 至 " + weekEnd);
        util.log(`[野外BOSS排行] 開始結算上周排行榜，時間範圍：${weekStart} 至 ${weekEnd}`);
        
        // 查詢上周擊殺記錄，按總積分排序
        let rankList = db.select(`SELECT character_id, character_name, SUM(score) AS total_score 
                                  FROM zzmj_yewaiboss 
                                  WHERE kill_time >= '${weekStart} 00:00:00' 
                                    AND kill_time < '${weekEnd} 23:59:59' 
                                  GROUP BY character_id, character_name 
                                  ORDER BY total_score DESC 
                                  LIMIT 0, 1000;`);
        
        if (rankList == null || rankList.length == 0) {
            npc.say("上周沒有擊殺記錄，無法生成排行榜。\r\n時間範圍：" + weekStart + " 至 " + weekEnd);
            util.log(`[野外BOSS排行] 上周沒有擊殺記錄`);
            return;
        }
        
        // 插入排行榜記錄到新表
        let successCount = 0;
        for (let i in rankList) {
            let rankInfo = rankList[i];
            let characterId = rankInfo.get('character_id');
            let characterName = rankInfo.get('character_name');
            let totalScore = rankInfo.get('total_score');
            let rank = parseInt(i) + 1;
            
            // 插入排行榜記錄，reward_status = 1 表示可領取
            db.insert(`INSERT INTO zzmj_yewaiboss_rank(character_id, character_name, rank, total_score, week_start_date, week_end_date, reward_status) 
                       VALUES (${characterId}, '${characterName}', ${rank}, ${totalScore}, '${weekStart}', '${weekEnd}', 1)`);
            
            util.log(`[野外BOSS排行] 玩家 ${characterName} (ID: ${characterId}) 排名第${rank}，總積分: ${totalScore}`);
            successCount++;
        }
        
        npc.say("上周排行榜結算完成！\r\n\r\n" +
                "時間範圍：" + weekStart + " 至 " + weekEnd + "\r\n" +
                "共統計 " + successCount + " 名玩家\r\n" +
                "排行榜數據已寫入數據庫，玩家可以前往領取獎勵了！");
        util.log(`[野外BOSS排行] 上周排行榜結算完成，共 ${successCount} 名玩家`);
    } catch (e) {
        npc.say("結算失敗！\r\n錯誤信息：" + e);
        util.log(`[野外BOSS排行] 結算失敗：${e}`);
    }
}

/**
 * 開啟世界BOSS事件
 */
function 開啟世界BOSS事件() {
    let event = ctx.getEvent('server_monster');
    if (event != null) {
        npc.say("世界BOSS事件已經處於開啟狀態！");
        util.log("[管理員測試] 嘗試開啟世界BOSS事件，但事件已存在");
        return;
    }
    
    try {
        // 啟動世界BOSS服務器事件
        ctx.makeEvent('server_monster', true, {});
        npc.say("世界BOSS事件開啟成功！\r\n事件已初始化，將在每天20:00自動開啟。\r\n\r\n可以使用「立即開始世界BOSS活動」來立即測試。");
        util.broadcastNotice("世界BOSS系統已開啟！");
        util.log("[管理員測試] 世界BOSS事件開啟成功");
    } catch (e) {
        npc.say("世界BOSS事件開啟失敗！\r\n錯誤信息：" + e);
        util.log("[管理員測試] 世界BOSS事件開啟失敗：" + e);
    }
}

/**
 * 立即開始世界BOSS活動（跳過等待時間）
 */
function 立即開始世界BOSS活動() {
    let event = ctx.getEvent('server_monster');
    if (event == null) {
        npc.say("世界BOSS事件未開啟！\r\n請先使用「開啟世界BOSS事件」功能。");
        return;
    }
    
    let stat = parseInt(event.getVariable('stat')) || 0;
    
    if (stat == 1) {
        npc.say("世界BOSS活動已經在報名階段！\r\n玩家可以通過NPC進入等待地圖。");
        return;
    }
    
    if (stat == 2) {
        npc.say("世界BOSS活動已經在戰鬥階段！\r\nBOSS已經生成，玩家正在戰鬥中。");
        return;
    }
    
    try {
        // 直接進入報名階段（stat = 1）
        event.setVariable('stat', "1");
        event.setVariable('start_date', String(new Date().getTime() + 2 * 60 * 1000));
        
        // 設置2分鐘後進入戰鬥階段
        event.startTimer("game", 2 * 60 * 1000);
        
        // 發送全服通知
        util.broadcastWeatherEffectNotice("【世界烈焰狼】世界烈焰狼，快去擊敗他！！！", 371, 6000, true);
        
        npc.say("世界BOSS活動已立即開始！\r\n\r\n" +
                "當前階段：報名階段（stat=1）\r\n" +
                "報名時間：2分鐘\r\n" +
                "2分鐘後將自動進入戰鬥階段。\r\n\r\n" +
                "玩家可以通過NPC進入等待地圖參與活動。");
        util.log("[管理員測試] 世界BOSS活動已立即開始，進入報名階段");
    } catch (e) {
        npc.say("立即開始世界BOSS活動失敗！\r\n錯誤信息：" + e);
        util.log("[管理員測試] 立即開始世界BOSS活動失敗：" + e);
    }
}

/**
 * 查看世界BOSS狀態
 */
function 查看世界BOSS狀態() {
    let event = ctx.getEvent('server_monster');
    
    if (event == null) {
        npc.say("世界BOSS事件狀態：\r\n#r關閉#k\r\n\r\n請先開啟事件才能查看狀態。");
        return;
    }
    
    let stat = parseInt(event.getVariable('stat')) || 0;
    let members = event.getVariable('members') || [];
    let game = event.getVariable('game') || {combination: {}, injury: 0};
    let startDate = event.getVariable('start_date');
    
    let txt = "#e#b[世界BOSS事件狀態]#r#k#l\r\n\r\n";
    txt += "事件狀態：#g開啟#k\r\n\r\n";
    
    // 狀態說明
    let statText = "";
    switch (stat) {
        case 0:
            statText = "#r未開始#k（等待20:00自動開啟）";
            break;
        case 1:
            statText = "#g報名階段#k（玩家可以進入等待地圖）";
            if (startDate) {
                let startTime = parseInt(startDate);
                let now = new Date().getTime();
                if (startTime > now) {
                    let diff = Math.floor((startTime - now) / 1000);
                    let minutes = Math.floor(diff / 60);
                    let seconds = diff % 60;
                    txt += "報名倒計時：" + minutes + "分" + seconds + "秒\r\n";
                }
            }
            break;
        case 2:
            statText = "#b戰鬥階段#k（BOSS已生成，玩家正在戰鬥）";
            break;
        default:
            statText = "#r未知狀態#k（stat=" + stat + "）";
            break;
    }
    
    txt += "當前階段：" + statText + "\r\n";
    txt += "參與人數：" + (members.length || 0) + " 人\r\n";
    
    if (stat == 2) {
        txt += "\r\n#d傷害統計：#k\r\n";
        txt += "總傷害：" + formatNumber(game.injury || 0) + "\r\n";
        txt += "參與玩家數：" + Object.keys(game.combination || {}).length + " 人\r\n";
        
        // 顯示前5名傷害
        let ranking = [];
        for (let cid in game.combination) {
            if (game.combination.hasOwnProperty(cid)) {
                ranking.push({
                    cid: cid,
                    name: game.combination[cid].name,
                    damage: game.combination[cid].damage
                });
            }
        }
        ranking.sort(function(a, b) {
            return b.damage - a.damage;
        });
        
        if (ranking.length > 0) {
            txt += "\r\n#d前5名傷害：#k\r\n";
            for (let i = 0; i < Math.min(5, ranking.length); i++) {
                let player = ranking[i];
                txt += (i + 1) + ". " + player.name + " - " + formatNumber(player.damage) + "\r\n";
            }
        }
    }
    
    npc.say(txt);
}

/**
 * 重置世界BOSS活動
 */
function 重置世界BOSS活動() {
    let event = ctx.getEvent('server_monster');
    if (event == null) {
        npc.say("世界BOSS事件未開啟！");
        return;
    }
    
    if (!npc.askYesNo("確定要重置世界BOSS活動嗎？\r\n這將會：\r\n1. 停止所有計時器\r\n2. 清除所有參與者\r\n3. 重置狀態為未開始\r\n4. 踢出所有地圖中的玩家")) {
        return;
    }
    
    try {
        // 停止所有計時器
        event.stopTimers();
        
        // 清除參與者並踢出地圖
        let members = event.getVariable('members') || [];
        let FIELD_1 = 993141000;
        let FIELD_2 = 993000520;
        
        // 踢出等待地圖的玩家
        try {
            let map1 = event.getMap(FIELD_1);
            if (map1 != null) {
                let players1 = map1.getAllStage();
                if (players1 != null) {
                    for (let i = 0; i < players1.length; i++) {
                        if (players1[i] != null) {
                            players1[i].setEvent(null);
                            players1[i].changeMap(100000000, 0);
                        }
                    }
                }
            }
        } catch (e) {
            util.log("[管理員測試] 踢出等待地圖玩家時出錯：" + e);
        }
        
        // 踢出戰鬥地圖的玩家
        try {
            let map2 = event.getMap(FIELD_2);
            if (map2 != null) {
                let players2 = map2.getAllStage();
                if (players2 != null) {
                    for (let i = 0; i < players2.length; i++) {
                        if (players2[i] != null) {
                            players2[i].setEvent(null);
                            players2[i].changeMap(100000000, 0);
                        }
                    }
                }
            }
        } catch (e) {
            util.log("[管理員測試] 踢出戰鬥地圖玩家時出錯：" + e);
        }
        
        // 重置狀態
        event.setVariable('members', []);
        event.setVariable('stat', "0");
        event.setVariable('game', {combination: {}, injury: 0});
        
        npc.say("世界BOSS活動已重置！\r\n\r\n" +
                "所有計時器已停止\r\n" +
                "所有參與者已清除\r\n" +
                "狀態已重置為未開始\r\n" +
                "所有地圖中的玩家已踢出");
        util.log("[管理員測試] 世界BOSS活動已重置");
    } catch (e) {
        npc.say("重置世界BOSS活動失敗！\r\n錯誤信息：" + e);
        util.log("[管理員測試] 重置世界BOSS活動失敗：" + e);
    }
}

/**
 * 進入世界BOSS等待地圖
 */
function 進入世界BOSS等待地圖() {
    let event = ctx.getEvent('server_monster');
    if (event == null) {
        npc.say("世界BOSS事件未開啟！\r\n請先使用「開啟世界BOSS事件」功能。");
        return;
    }
    
    let stat = parseInt(event.getVariable('stat')) || 0;
    
    if (stat == 0) {
        npc.say("世界BOSS活動尚未開始！\r\n請先使用「立即開始世界BOSS活動」功能。");
        return;
    }
    
    if (stat != 1) {
        npc.say("當前不在報名階段！\r\n等待地圖只在報名階段（stat=1）可以進入。\r\n當前狀態：stat=" + stat);
        return;
    }
    
    try {
        let members = event.getVariable('members') || [];
        let FIELD_1 = 993141000;
        
        // 檢查是否已經在列表中
        let alreadyIn = false;
        for (let i in members) {
            if (members[i].getCharacterId() === stage.getCharacterId()) {
                alreadyIn = true;
                break;
            }
        }
        
        if (!alreadyIn) {
            // 添加到成員列表
            members.push(stage);
            event.setVariable('members', members);
        }
        
        // 設置事件關聯
        stage.setEvent(event);
        stage.setReviveCount(5);
        
        // 傳送到等待地圖
        stage.changeMap(FIELD_1, 0);
        
        util.log("[管理員測試] 玩家 " + stage.getCharacterName() + " 進入世界BOSS等待地圖");
    } catch (e) {
        npc.say("進入等待地圖失敗！\r\n錯誤信息：" + e);
        util.log("[管理員測試] 進入等待地圖失敗：" + e);
    }
}

/**
 * 進入世界BOSS戰鬥地圖
 */
function 進入世界BOSS戰鬥地圖() {
    let event = ctx.getEvent('server_monster');
    if (event == null) {
        npc.say("世界BOSS事件未開啟！\r\n請先使用「開啟世界BOSS事件」功能。");
        return;
    }
    
    let stat = parseInt(event.getVariable('stat')) || 0;
    
    if (stat != 2) {
        npc.say("當前不在戰鬥階段！\r\n戰鬥地圖只在戰鬥階段（stat=2）可以進入。\r\n當前狀態：stat=" + stat + "\r\n\r\n請先使用「立即開始世界BOSS活動」功能，等待2分鐘後進入戰鬥階段。");
        return;
    }
    
    try {
        let members = event.getVariable('members') || [];
        let FIELD_2 = 993000520;
        let game = event.getVariable('game') || {combination: {}, injury: 0};
        
        // 檢查是否已經在列表中
        let alreadyIn = false;
        for (let i in members) {
            if (members[i].getCharacterId() === stage.getCharacterId()) {
                alreadyIn = true;
                break;
            }
        }
        
        if (!alreadyIn) {
            // 添加到成員列表
            members.push(stage);
            event.setVariable('members', members);
            
            // 初始化傷害記錄
            game.combination[stage.getCharacterId()] = {
                name: stage.getCharacterName(),
                damage: 0
            };
            event.setVariable('game', game);
        }
        
        // 設置事件關聯
        stage.setEvent(event);
        stage.setReviveCount(5);
        
        // 傳送到戰鬥地圖
        stage.changeMap(FIELD_2, 0);
        
        // 顯示30分鐘倒計時
        let startDate = event.getVariable('start_date');
        if (startDate) {
            let startTime = parseInt(startDate);
            let endTime = startTime + 30 * 60 * 1000;
            let now = new Date().getTime();
            let remaining = Math.floor((endTime - now) / 1000);
            if (remaining > 0) {
                stage.showTimer(remaining);
            }
        } else {
            stage.showTimer(30 * 60);
        }
        
        util.log("[管理員測試] 玩家 " + stage.getCharacterName() + " 進入世界BOSS戰鬥地圖");
    } catch (e) {
        npc.say("進入戰鬥地圖失敗！\r\n錯誤信息：" + e);
        util.log("[管理員測試] 進入戰鬥地圖失敗：" + e);
    }
}

/**
 * 格式化數字（用於顯示傷害）
 */
function formatNumber(num) {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(2) + "億";
    } else if (num >= 10000) {
        return (num / 10000).toFixed(2) + "萬";
    } else {
        return num.toString();
    }
}

