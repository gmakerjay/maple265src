let aInfo = exports;
aInfo.showInfo = function (npc, stage, db) {
    txt = "以下是您的賬戶信息:\r\n\r\n";
    txt += "#d當前在線時間:#b" + stage.getOnlineTime() + " #d分\r\n\r\n";
    //txt += "#d剩餘台　幣: #b" + getTWB() + "\r\n";
    txt += "#d剩餘樂豆點: #b" + stage.getCurrency(1) + " #d點\r\n";
    txt += "#d剩餘楓　點: #b" + stage.getCurrency(2) + " #d點\r\n";
    txt += "#e#d你是入谷的第 #r" + stage.getAccountId() + " #d位入坑的玩家\r\n";
    txt += "當前角色創建排名第 #r" + stage.getCharacterId() + " #d位\r\n";
    txt += "#d入坑時間 :#b" + Entering(db, stage.getAccountId()) + "#d\r\n";
    txt += "#d讓管理處理問題的時候請出示這些排名截圖\r\n";
    npc.meFlip().say(txt);
}

function getTWB(db, accountId) {
    const query = `SELECT twb
                       FROM accounts
                       WHERE id = '${accountId}' LIMIT 1;`;
    const result = db.select(query);
    return result.get(0).get('twb');
}


function Entering(db, accountId) {
    const query = `SELECT create_date
                       FROM account
                       WHERE id = '${accountId}' LIMIT 1;`;
    const result = db.select(query);
    return result[0].get('create_date');
}