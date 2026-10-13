function getBossEvent(event1, db, stage) {
    // var sql = `select sum(1) as sum from zz_boss_event where accounts_id = ${player.getAccountId()} and bossName = '${event1}'`;
    var sql = `select sum(1) as sum
               from zz_boss_event
               where accounts_id = ${stage.getAccountId()}
                 and bossName = '${event1}'`;
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("sum");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

function getBossEventReal(event1, db, stage) {
    // var sql = `select sum(1) as sum from zz_boss_event where accounts_id = ${player.getAccountId()} and bossName = '${event1}'`;
    var sql = `select sum(1) as sum
               from zz_boss_event
               where accounts_id = ${stage.getAccountId()}
                 and bossName = '${event1}'
                 and status = 1`;
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("sum");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

function getBossEventRealByPlayerId(event1, db, stage) {
    // var sql = `select sum(1) as sum from zz_boss_event where accounts_id = ${player.getAccountId()} and bossName = '${event1}'`;
    var sql = `select sum(1) as sum
               from zz_boss_event
               where player_id = ${stage.getCharacterId()}
                 and bossName = '${event1}'
                 and status in (1, 6)`;
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("sum");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

function getBossEventDay(event1, db, stage) {
    // var sql = `select sum(1) as sum from zz_boss_event where accounts_id = ${player.getAccountId()} and bossName = '${event1}'`;
    var sql = `select sum(1) as sum
               from zz_boss_event
               where player_id = ${stage.getCharacterId()}
                 and bossName = '${event1}'
                 AND DATE_FORMAT(time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
                 and status not in (2, 6)`;
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("sum");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

//獲取本週記錄
function getBossEventWeek(event1, db, stage) {

    var sql = `SELECT SUM(1) AS sum
               FROM zz_boss_event
               WHERE player_id = ${stage.getCharacterId()}
                 AND bossName = '${event1}'
                 AND DATE(time) BETWEEN DATE(NOW() - INTERVAL WEEKDAY(NOW()) DAY) AND DATE(NOW() + INTERVAL (7 - WEEKDAY(NOW())) DAY)
                 and status not in (2, 6)`;
    // var sql = `select sum(1) as sum from zz_boss_event where accounts_id = ${player.getAccountId()} and bossName = '${event1}' `;
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("sum");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

//獲取本週記錄
function getBossEventWeekAcc(event1, db, stage) {

    var sql = `SELECT SUM(1) AS sum
               FROM zz_boss_event
               WHERE accounts_id = ${player.getAccountId()}
                 AND bossName like '%${event1}%'
                 AND DATE(time) BETWEEN DATE(NOW() - INTERVAL WEEKDAY(NOW()) DAY) AND DATE(NOW() + INTERVAL (7 - WEEKDAY(NOW())) DAY)
                 and status <> 2`;
    // var sql = `select sum(1) as sum from zz_boss_event where accounts_id = ${player.getAccountId()} and bossName = '${event1}' `;
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("sum");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

//獲取本週記錄
function getBossEventMonth(event1, db, stage) {

    var sql = `SELECT SUM(1) AS sum
               FROM zz_boss_event
               WHERE player_id = ${stage.getCharacterId()}
                 AND bossName = '${event1}'
                 AND DATE(time) BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND LAST_DAY(NOW())
                 AND status not in (2, 6);
    `;
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("sum");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}


function setlogday(event1, value1, db, stage) {
    var sql = "insert into zz_event_day(accountid, world, `event`,`value`,time) values(" + stage.getAccountId() + ",0," + event1 + "," + value1 + ",now())";
    player.customSqlInsert(sql);
}

function getlogday(event1, db, stage) {
    var sql = "select sum(value) as numbe from zz_event_day where accountid = " + stage.getAccountId() + " and event = '" + event1 + "'  and world =0 AND DATE_FORMAT(time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d') ";
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("numbe");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

function getlog(event1, db, stage) {
    var sql = "select sum(value) as numbe from zz_event_not_reset where accountid = " + stage.getAccountId() + " and event = '" + event1 + "' and world =0 ";
    var resultList = db.select(sql);
    var count = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        count = result.get("numbe");
        if (count == null) {
            count = 0;
        }
    }
    return parseInt(count);
}

function resetlog(event1, db) {
    var sql = " delete from zz_event_not_reset where event = '" + event1 + "';";
    db.select(sql);
}


function setlog(event1, value1, db, stage) {
    var sql = "insert into zz_event_not_reset(accountid, world, `event`,`value`,time) values(" + stage.getAccountId() + ",0,'" + event1 + "','" + value1 + "',now())";
    db.insert(sql);
}


function 新增累計充值記錄(num, db, stage) {
    var sql = "insert into `累計充值領取記錄`(account,totalmoney,memorys) values('" + getAccountName(db, stage) + "'," + num + ",1)";
    db.insert(sql);
}

function getAccountName(db, stage) {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}

function 查詢累計充值獎勵領取狀態(sel, db, stage) {
    var sql = "select account from `累計充值領取記錄` a where a.account='" + getAccountName(db, stage) + "' and totalmoney =" + sel + " ";
    var resultList = db.select(sql);
    var account = "";
    if (null != resultList) {
        for (var i = 0; i < resultList.length; i++) {
            var result = resultList[i];
            if (result == null) {
                break;
            }
            account += result.get("account");
        }
    }
    if (account != null && account != "") {
        return true;
    } else {
        return false;
    }
}

function checkBossIn(bossName, members, db) {
    let iList = [];
    const ids = members.map(member => member.getId()).join(', ');
    let results = db.select(`SELECT *
                             FROM zz_boss_in
                             WHERE in_time > NOW() - INTERVAL 30 MINUTE
                               and player_id in (${ids})
                               and boss_name = '${bossName}'`);
    if (results.length > 0) {
        const currentTime = new Date(); // 獲取當前時間

        for (let i in results) {
            // iList.push(`#r#e${results[i]['player_name']} 無法入場#b${bossName}#n#k 還需要 `);
            const inTime = new Date(results[i]['in_time']);
            const endTime = new Date(inTime.getTime() + 30 * 60000); // in_time的30分鐘後
            const diff = endTime - currentTime; // 計算差異
            const minutesLeft = Math.max(Math.floor(diff / 60000), 0); // 將差異轉換為分鐘數，並確保至少為0

            if (minutesLeft > 0) {
                iList.push(`#r#e${results[i]['player_name']} #k下次入場 #b${bossName}#n#k 還需要 ${minutesLeft} 分鐘`);
            }
        }
    }
    return iList;
}

module.exports = {
    checkBossIn,
    getBossEventRealByPlayerId,
    getBossEventReal,
    getlogday,
    setlog,
    getlog,
    setlogday,
    getBossEventDay,
    resetlog,
    getBossEventWeek,
    新增累計充值記錄,
    查詢累計充值獎勵領取狀態,
    getBossEvent,
    getBossEventWeekAcc,
    getBossEventMonth
}