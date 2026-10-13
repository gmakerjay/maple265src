var a1 = "#fUI/UIWindowString/Scenario/quest_info/scene/summary_icon/summary#"
let now = new Date();
let currentMonth = now.getMonth() + 1;
let log = require('check_log');
var str = "			滿星輪迴體驗中心\r\n\r\n"
// var str = "" + a1 + "\r\n"
// str += "\r\n[#r防禦#v2436245#][#r段數#v2436248#]\r\n[#r傷害#v2436246#][#r職業專屬#v2430011#]\r\n"
str += "#b1、體驗權益有效時常：#r48小時#k\r\n"
str += "#b2、每個賬號註冊時可領取體驗權益 #r2次#k\r\n";
str += "#b3、每個賬號每個月可額外領取體驗權益 #r1次#k\r\n";
str += `當前狀態: `;
let current = 當前狀態();
let canGet = true;
if (current == null || current == '') {
    str += `尚未領取體驗權益\r\n`;
} else {
    current = current.toString().split('.')[0];
    str += `有效期 ${current}\r\n`;
    canGet = false;
}
let times_account = log.getEventValue(stage, db, "萌新輪迴");
let times_monthly = log.getEventValue(stage, db, `萌新輪迴月次數-${currentMonth}`);
// #b3、通過#r[全部商店-BUFF商店]#b使用#v4000000##v4000016#可以兌換購買\r\n"
str += `#k#L0#領取(賬號次數)  #r${2 - times_account} / 2#k#l\r\n`
str += `#k#L1#領取(每月次數)  #r${1 - times_monthly} / 1#k#l\r\n`


function start() {
    let sel = npc.askMenu(str)
    let maxCount = 0;
    let pqLog = '';
    switch (sel) {
        case 0:
            maxCount = 2;
            pqLog = `萌新輪迴`;
            break;
        case 1:
            maxCount = 1;
            pqLog = `萌新輪迴月次數-${currentMonth}`;
            break;
    }

    if (maxCount - log.getEventValue(stage, db, pqLog) < 1) {
        npc.say("次數不足");
        return;
    } else if (!canGet) {
        npc.say(`當前正在輪迴體驗有效時間內，請勿重複領取\r\n，截止時間為 #r${current}`);
        return;
    } else if (npc.askYesNo("是否開始體驗1X輪迴，有效期為48小時") == 1) {
        log.addEventValue(stage, db, pqLog, 1, -1);
        db.insert(`INSERT INTO zsf_輪迴體驗卡 (account_id, create_time, end_time)
                   VALUES (${stage.getAccountId()}, NOW(), DATE_ADD(NOW(), INTERVAL 48 HOUR));`);
        npc.say("領取成功，直接使用輪迴共享卡即可。");
    }

}

function 當前狀態() {
    let results = db.select(`select *
                             from zsf_輪迴體驗卡
                             where account_id = ${stage.getAccountId()}
                               and now() <= end_time`);
    if (results.length > 0) {
        return results[0]['end_time'];
    }
    return null;
}

start();

