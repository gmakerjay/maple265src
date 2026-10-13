const labelSuffix = "#fnNanum Gothic ExtraBold#"

let log = require('check_log');

stage.loseItem(2636953, 1);
if (log.getPQLog(stage, db, "1489") < 400) {
    log.addPQLog(stage, db, "1489")
    let level = stage.getIntQuestRecordEx(1489, "0");
    let exp = stage.getIntQuestRecordEx(1489, "0exp");
    exp += 5;
    while (level < 20 && exp >= 1000) {
        level += 1;
        exp -= 1000;
    }
    stage.updateQuestRecordEx(1489, "0exp", exp);
    stage.updateQuestRecordEx(1489, "0", level);
    // stage.scriptProgressMessage(labelSuffix + `#fs26#本日野外獲取索爾艾爾達氣息 #fs36##g${parseInt(stage.getPQLog("1489")) * 5}/2000#k#fs26#！！`);
    stage.showProgressMessageFont(`本日野外獲取索爾艾爾達氣息 ${parseInt(log.getPQLog(stage, db, "1489")) * 5}/2000。`, 5, 26, 4, 0);
} else {
    stage.showProgressMessageFont(`本日野外獲取索爾艾爾達氣息以達到上限。`, 5, 26, 4, 0);
}