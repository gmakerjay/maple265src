const TYPE_NAMES = [
  '', '星語幣', '樂豆', '累充', '抵用券', '金幣', '儲備金'
];
const BIND_TYPE = 6;

function getAccountName(db, stage) {
  const rows = db.select(
    "SELECT name FROM account WHERE id = " + stage.getAccountId() + " LIMIT 1"
  );
  return rows.length > 0 ? rows[0].get("name") : '';
}

function formatNumberToMoney(n) {
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n).toString();
  return sign + abs.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getPay(type, db, stage) {
  let results = 0;
  let coin = 0;
  const account = getAccountName(db, stage);

  if (type === 1 || type === 3) {
    // 星語幣 / 累充
    const col = type === 1 ? 'pay' : 'payReward';
    results = db.select(
      "SELECT " + col + " AS val FROM hypay WHERE accname='" + account + "'"
    );
  } else if (type === 2) {
    return stage.getCurrency(1);
  } else if (type === 4) {
    return stage.getCurrency(2);
  } else if (type === 5) {
    return stage.getMesos();
  } else if (type === BIND_TYPE) {
    // 儲備金（綁定金幣）
    results = db.select(
      "SELECT COALESCE(SUM(amount),0) AS val FROM zz_bind_mesos WHERE player_id='" + stage.getCharacterId() + "'"
    );
  }

  if (results && results.length > 0) {
    coin = results[0].get('val') || 0;
  }
  return coin;
}

function gainPay(type, amount, stage, db, reason, detail) {
  const account = getAccountName(db, stage);
  let sql;

   if (type === 1 || type === 3) {
    // 星語幣 / 累充
    const col = type === 1 ? 'pay' : 'payReward';
    sql = "UPDATE hypay SET " + col + "=" + col + "+" + amount
        + " WHERE accname='" + account + "'";
    db.update(sql);

  } else if (type === 2) {
    stage.modifyCurrency(1, amount);
  } else if (type === 4) {
    stage.modifyCurrency(2, amount);
  } else if (type === 5) {
    stage.gainMesos(amount);
  } else if (type === BIND_TYPE) {
    // 儲備金（綁定金幣）
    sql = "INSERT INTO zz_bind_mesos(player_id, amount, remark) VALUES("
        + "'" + stage.getCharacterId() + "',"
        + amount + ","
        + "'" + reason + "-" + detail + "')";
    db.insert(sql);
  }

  // 記錄明細
  sql = "INSERT INTO zsf_pay_detail("
      + "player_name, player_id, account_id, pay_type, amount, reason, reason_detail"
      + ") VALUES ("
      +    "'" + stage.getCharacterName() + "',"
      +    stage.getCharacterId() + ","
      +    stage.getAccountId() + ","
      +    type + ","
      +    amount + ","
      +    "'" + (reason || '') + "',"
      +    "'" + (detail || '') + "'"
      + ")";
  db.insert(sql);

  // 顯示系統訊息
  if (amount !== 0) {
    const action = amount > 0 ? '獲得' : '消耗';
    stage.showSystemMessage(
      action
      + TYPE_NAMES[type]
      + ': '
      + formatNumberToMoney(Math.abs(amount))
    );
  }
}

function getPayShow(type, db, stage) {
  return formatNumberToMoney(getPay(type, db, stage));
}

function getBindMesos(db, stage) {
  return getPay(BIND_TYPE, db, stage);
}

function getBindMesosShow(db, stage) {
  return getPayShow(BIND_TYPE, db, stage);
}

function gainBindMesos(db, stage, amount, reason) {
  gainPay(BIND_TYPE, amount, stage, db, reason, reason);
}

module.exports = {
  getMesosShow: stage => formatNumberToMoney(stage.getMesos()),
  getBindMesos,
  getBindMesosShow,
  gainBindMesos,
  getPay,
  gainPay,
  getPayShow,
  formatNumberToMoney,
  getAccountName
};
