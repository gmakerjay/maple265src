/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 */

var players = exports;

// 工具类：日期处理（仅记录当前时间，不增加天数）
var DateUtil = {
    // 获取当前时间戳（用于时间判断）
    getCurrentTimestamp: function() {
        return new Date().getTime();
    },
    
    // 日期字符串转时间戳
    toTimestamp: function(dateStr) {
        if (!dateStr) return 0;
        var str = String(dateStr);
        str = str.replace(/[\/]/g, '-');
        var isoStr = str.indexOf('-') > -1 ? str : str.slice(0,4) + "-" + str.slice(4,6) + "-" + str.slice(6);
        return Date.parse(isoStr + "T00:00:00") || 0;
    },
    
    // 格式化当前时间（精确到秒，用于记录）
    formatCurrent: function() {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1);
        var day = (now.getDate() < 10 ? '0' : '') + now.getDate();
        var hours = (now.getHours() < 10 ? '0' : '') + now.getHours();
        var minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        var seconds = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
};

// 1. 账号级事件记录（仅用当前时间）
players.getEventValue = function(stage, db, event, measure) {
    var combination = [0, null];
    var accountId = stage.getAccountId();
    var ret = db.select("SELECT * FROM `account_event` WHERE `account_id` = '" + accountId + "' AND `key` = '" + event + "' LIMIT 1;");
    
    if (ret.length > 0) {
        combination[0] = ret[0].get('value');
        combination[1] = ret[0].get('reset_time');
        // 用当前时间判断是否过期
        var recordTime = new Date(combination[1]).getTime();
        if (recordTime < DateUtil.getCurrentTimestamp()) {
            db.update("DELETE FROM `account_event` WHERE `account_id` = '" + accountId + "' AND `key` = '" + event + "';");
            combination = [0, null];
        }
    }
    return measure ? combination : combination[0];
};

players.addEventValue = function(stage, db, event, value, resetDays) {
    // 默认为0天，不增加天数
    value = (typeof value !== 'undefined') ? value : 1;
    resetDays = (typeof resetDays !== 'undefined') ? resetDays : 0;
    
    var condate = players.getEventValue(stage, db, event, true);
    var accountId = stage.getAccountId();
    var recordTime = new Date(condate[1]).getTime();
    
    // 直接使用当前时间作为记录时间，不增加天数
    if (recordTime < DateUtil.getCurrentTimestamp()) {
        db.update("DELETE FROM `account_event` WHERE `account_id` = '" + accountId + "' AND `key` = '" + event + "';");
        // 特殊标记-1保持永久有效，其他情况都用当前时间
        var resetTime = (resetDays === -1) ? "2035-01-01 00:00:00" : DateUtil.formatCurrent();
        db.insert("INSERT INTO `account_event` (`account_id`, `key`, `value`, `reset_time`) VALUES ('" + accountId + "', '" + event + "', " + value + ", '" + resetTime + "');");
        return;
    }
    
    db.update("UPDATE `account_event` SET `value` = `value` + " + value + " WHERE `account_id` = '" + accountId + "' AND `key` = '" + event + "';");
};

players.resetEventValue = function(stage, db, event) {
    db.update("DELETE FROM `account_event` WHERE `account_id` = '" + stage.getAccountId() + "' AND `key` = '" + event + "';");
};

// 2. 角色级副本记录（仅用当前时间）
players.getPQLog = function(stage, db, event, measure) {
    var combination = [0, null];
    var charId = stage.getCharacterId();
    var ret = db.select("SELECT `value`, `reset_time` FROM `character_pqlog` WHERE `characters_id` = '" + charId + "' AND `key` = '" + event + "' LIMIT 1;");
    
    if (ret.length > 0) {
        var value = ret[0].get("value");
        var resetTime = ret[0].get("reset_time");
        var recordTime = new Date(resetTime).getTime();
        
        // 用当前时间判断是否过期
        if (recordTime < DateUtil.getCurrentTimestamp()) {
            db.update("DELETE FROM `character_pqlog` WHERE `characters_id` = '" + charId + "' AND `key` = '" + event + "';");
            combination = [0, null];
        } else {
            combination = [value, resetTime];
        }
    }
    
    return measure ? combination : combination[0];
};

players.addPQLog = function(stage, db, event, value, resetDays) {
    // 默认为0天，不增加天数
    value = (typeof value !== 'undefined') ? value : 1;
    resetDays = (typeof resetDays !== 'undefined') ? resetDays : 0;
    
    var pqLogResult = players.getPQLog(stage, db, event, true);
    var valueInDb = pqLogResult[0];
    var resetTime = pqLogResult[1];
    var charId = stage.getCharacterId();
    var recordTime = new Date(resetTime).getTime();
    
    // 直接使用当前时间作为记录时间
    if (recordTime < DateUtil.getCurrentTimestamp()) {
        db.update("DELETE FROM `character_pqlog` WHERE `characters_id` = '" + charId + "' AND `key` = '" + event + "';");
        var newResetTime = (resetDays === -1) ? "2035-01-01 00:00:00" : DateUtil.formatCurrent();
        db.insert("INSERT INTO `character_pqlog` (`characters_id`, `key`, `value`, `reset_time`) VALUES ('" + charId + "', '" + event + "', " + value + ", '" + newResetTime + "');");
    } else {
        db.update("UPDATE `character_pqlog` SET `value` = `value` + " + value + " WHERE `characters_id` = '" + charId + "' AND `key` = '" + event + "';");
    }
};

players.resetPQLog = function(stage, db, event) {
    db.update("DELETE FROM `character_pqlog` WHERE `characters_id` = '" + stage.getCharacterId() + "' AND `key` = '" + event + "';");
};

// 3. 任务记录（仅用当前时间）
players.getQuestLog = function(stage, questId, resetDay) {
    var count = stage.getIntQuestRecordExShare(questId, "count") || 0;
    var date = stage.getIntQuestRecordExShare(questId, "date") || DateUtil.formatCurrent().replace(/\s.*/, '');
    var logTime = DateUtil.toTimestamp(date);
    
    // 重置天数为0，不增加时间（仅用当前时间判断）
    var resetTime = logTime + resetDay * 0;
    if (DateUtil.getCurrentTimestamp() >= resetTime) {
        count = 0;
        stage.updateQuestRecordExShare(questId, "count", count);
        stage.updateQuestRecordExShare(questId, "date", DateUtil.formatCurrent().replace(/\s.*/, ''));
    }
    return count;
};

players.addQuestLog = function(stage, questId, value) {
    var currentCount = stage.getIntQuestRecordExShare(questId, "count") || 0;
    var newCount = currentCount + value;
    if (!stage.getIntQuestRecordExShare(questId, "date")) {
        stage.updateQuestRecordExShare(questId, "date", DateUtil.formatCurrent().replace(/\s.*/, ''));
    }
    stage.updateQuestRecordExShare(questId, "count", newCount);
};

players.resetQuestLog = function(stage, questId) {
    stage.updateQuestRecordExShare(questId, "count", 0);
    stage.updateQuestRecordExShare(questId, "date", DateUtil.formatCurrent().replace(/\s.*/, ''));
};
