marin = exports;
/* 354466922 脚本订制 技術顧問 */

marin.get = function (stage, db) {
    var ret = db.select("SELECT `money` FROM `account` WHERE `id` = '" + stage.getAccountId() + "' LIMIT 1;");
    return parseInt(ret[0].get('money'));
}
marin.add = function (stage, db, count) {
    return db.update("UPDATE `account` SET `money` = money+" + count + " WHERE `id` = " + stage.getAccountId() + ";");
}
marin.sum = function (stage, db) {
    var ret = db.select("SELECT `sunmoney` FROM `account` WHERE `id` = '" + stage.getAccountId() + "' LIMIT 1;");
    return parseInt(ret[0].get('sunmoney'));
}