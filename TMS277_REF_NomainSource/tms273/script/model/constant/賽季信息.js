function get賽季標號() {
    const year = new Date().getFullYear();
    return year + "" + getCurrentWeek();
}

function get賽季月標號() {
    const year = new Date().getFullYear();
    return year + "" + getCurrentMonth();
}

function 設置賽季經驗(db, stage, describe, point) {
    const sql = `INSERT INTO zz_pass(characters_id, \`describe\`, point, season)
                 VALUES ('${stage.getCharacterId()}', '${describe}', '${point}', '${get賽季標號()}')`;
    db.insert(sql);
}

function 設置賽季經驗月(db, stage, describe, point) {
    const sql = `INSERT INTO zz_pass_month(characters_id, \`describe\`, point, season)
                 VALUES ('${stage.getCharacterId()}', '${describe}', '${point}', '${get賽季月標號()}')`;
    db.insert(sql);
}

function getCurrentWeek() {
    const currentDate = new Date();
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const dayOfYear = Math.ceil((currentDate - firstDayOfYear) / 86400000);
    const result = Math.ceil((dayOfYear + firstDayOfYear.getDay() + 1) / 7);
    return result;
}

function getCurrentMonth() {
    const currentDate = new Date();
    return currentDate.getMonth() + 1; // getMonth() 返回值为0到11，因此+1可以得到正确的月份
}

module.exports = {設置賽季經驗, 設置賽季經驗月, get賽季標號, get賽季月標號};
