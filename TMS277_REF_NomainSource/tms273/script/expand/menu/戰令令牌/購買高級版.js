/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const {日期查詢周} = require("constant/date");

const {getPay, loseRMB, losePay} = require('vipCommon.js');

var 賽季 = require('constant/賽季信息');
var 周信息 = 日期查詢周();
var 餘額 = 68;
// load("tools/common");
// load("tools/vip");
var getCoin0 = getPay(db, stage, 1);
var sb = "#d一個賬號下只能開通一個高級戰令！\r\n\r\n";
sb += "戰令批號:#r" + 賽季.get賽季標號() + "\r\n\r\n";
sb += "#d持續時間:#r" + 周信息.本週第一天 + "  ~ " + 周信息.本週最後一天 + "\r\n\r\n";
sb += "#d星語幣:#r" + getCoin0 + "  \r\n\r\n";
sb += "#L1#" + 餘額 + "星語幣辦理高級戰令#l\r\n\r\n";
var res = npc.askMenu(sb);
if (res == 1) {
    var yes = npc.askYesNo("您是否花費" + 餘額 + "星語幣購買高級戰令！");
    if (yes != 1) {
    } else if (是否購買高級版()) {
        npc.say("您已經尊貴的高級無需再次開啟!")
    } else if (getCoin0 >= 餘額) {
        loseRMB(db, stage, -餘額, "");
        賦予高級vip();
        var notice = "【高級特權】 恭喜  " + stage.getCharacterName() + "購買第" + 賽季.get賽季標號() + "戰令特權。\r\n";
        util.broadcastChatMsg(0x15, notice);
        util.broadcastWeatherEffectNotice(notice, 278, 15000, true)
        npc.say("恭喜您獲得高級特權!")
    } else {
        npc.say("請準備" + 餘額 + "星語幣再來找我!")
    }
}


function 賦予高級vip() {
    var sql = "insert into zz_pass_vip(characters_id, season) values(" + stage.getCharacterId() + ",'" + 賽季.get賽季標號() + "')";
    db.insert(sql);
}

function 是否購買高級版() {
    var sql = "select count(1) number from zz_pass_vip a where a.characters_id = " + stage.getCharacterId() + " and season = " + 賽季.get賽季標號() + ";";
    var resultList = db.select(sql);
    var number = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        number = parseInt(result.get("number"));
    }
    if (number > 0) {
        return true;
    } else {
        return false;
    }
}


