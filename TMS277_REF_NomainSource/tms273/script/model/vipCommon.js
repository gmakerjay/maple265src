function getRMB(db, stage) {
    const accountName = getAccountName(db, stage);
    const sql = "SELECT COALESCE(SUM(rmb), 0) AS rmb FROM zz_rmb WHERE account = '" + accountName + "';";
    const resultList = db.select(sql);
    if (resultList.length > 0) {
        return parseInt(resultList[0].get("rmb"));
    } else {
        return 0;
    }
}

function loseRMB(db, stage, rmb, coin) {
    const myAccountName = getAccountName(db, stage);
    const safeAccount = "'" + myAccountName.replace(/'/g, "''") + "'";
    const remark = `'兌換${rmb}現金為${coin}餘額'`;
    const sql = `INSERT INTO zz_rmb(account, rmb, paytime, remark) VALUES (${safeAccount}, ${rmb}, NOW(), ${remark})`;
    db.insert(sql);
}


function getPay(db, stage, type) {
    const accountName = getAccountName(db, stage);
    const sql = "SELECT * FROM hypay WHERE accname = '" + accountName + "';";
    let push = db.select(sql); // 参数化查询

    if (push.length <= 0) {
        db.insert("INSERT INTO hypay (accname, name) VALUES ('" + accountName + "', '" + stage.getCharacterName() + "')"); // 参数化查询
        push = db.select(sql);
    }
    let pay = 0;
    switch (type) {
        case 1:
            pay = getRMB(db, stage);
            break;
        case 2:
            pay = stage.getCurrency(1);
            break;
        case 3:
            pay = push[0].get("payReward");
            break;
        default:
            break;
    }
    return pay;
}

function getAccountName(db, stage) {
    const ret = db.select("SELECT * FROM account WHERE id = " + stage.getAccountId() + " LIMIT 0, 1"); // 参数化查询
    return ret.length > 0 ? ret[0].get("name") : null; // 确保返回值存在
}


function losePay(db, stage, amount) {
    db.update("UPDATE hypay SET pay = pay - " + amount + " WHERE accname = '" + getAccountName(db, stage) + "'"); // 参数化查询
}

module.exports = { getPay, loseRMB, losePay };