const eLog = require("extend_log");
const player = require("check_log");
const count = 99;

start();

function start() {
    let text = "";
    if (stage.isGm()) {
        text += `${stage.getIntQuestRecordEx(17209, "Time")} : ${stage.getIntQuestRecordEx(17209, "Count")} : ${stage.getIntQuestRecordEx(17209, "Score")}\r\n`;
    }
    text += "你想要參加哪個小遊戲？\r\n" +
        "#L1# #b#e進入歡樂蹺蹺板#l#n#k\r\n" +
        "#L2# #b#e進入極限炬燃搭高高#l#n#k\r\n" +
        "#L3# #b#e進入極限炬燃激流勇進#l#n#k\r\n" +
        "#L4# #b#e進入五彩繽紛炬燃邀請函#l#n#k\r\n" +
        "#L100#我現在不參加。#l";
    let sel = npc.askMenu(text);


    let gameName, event, questId;

    if (sel == 1) {
        gameName = "歡樂蹺蹺板";
        event = "mg_seesaw";
        questId = 101311;
    } else if (sel == 2) {
        gameName = "極限炬燃搭高高";
        event = "mg_wagultower";
        questId = 100247;
    } else if (sel == 3) {
        gameName = "極限炬燃激流勇進";
        event = "mg_rainbow_rush";
        questId = 17210;
    } else if (sel == 4) {
        gameName = "五彩繽紛炬燃邀請函";
        event = "mg_colorful_mail";
        questId = 16185;
    }

    if (sel != 100) {
        let ret = npc.askYesNo("參加#b#e" + gameName + "#n#k，將\r\n" +
            "#fs16##r#e取消所有在應用的增益效果#n#k#fs12#，\r\n" +
            "\r\n" +
            "確定要參加嗎？");
        if (ret == 1) {
            if (stage.getEvent() != null) {
                npc.me().say("已在事件副本中。");
            } else if (eLog.getPQLog(stage, util, questId, 1) >= count) {
                npc.say("已達到今日最大挑戰上限！");
            } else {
                if (ctx.makeEvent(event, false, stage) == null) {
                    stage.dropAlertNotice("發生未知錯誤，請聯繫管理員。");
                }
            }
        }
    }
}

function checkResetDate() {
    let currentDate = new Date();
    currentDate.setHours(23, 59, 59, 0);
    let timestamp = parseInt(currentDate.getTime() / 1000);
    return timestamp;
}

function isInputNaN(value) {
    return isNaN(value);
}