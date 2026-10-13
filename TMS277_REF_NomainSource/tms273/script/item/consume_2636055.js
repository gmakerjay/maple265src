/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


var ss = "#fUI/UIWindowPL.img/WaterSmash/ScoreBoard/cygGauge#";//藍色短條 157*11 //紫色色漸變線318*6
var ok = "#fUI/UIWindow4.img/cabinet/Take/normal/0#";
var Prize = [
    [2631973, 1]
]
let log = require('check_log');
CStart();

function CStart() {
    txt = "#r#e星語谷 炫彩寶典滿級大禮包：#k\r\n\r\n#n";
    txt += "\t#i5002732# #b#z5002732##k "
    txt += "\t#i5002733# #b#z5002733##k "
    txt += "\t#i5002734# #b#z5002734##k\r\n\r\n"
    for (var i in Prize) {
        txt += "\t#i" + Prize[i][0] + "# #r#z" + Prize[i][0] + "# × #b" + Prize[i][1] + " #k\r\n";
    }
    yeno = npc.askYesNo(txt);
    if (yeno != 1) return;
    stage.loseItem(ctx.getDataId(), 1);
    if (log.getEventValue(stage, db, "鬼滅寵物") > 2) {
        stage.dropAlertNotice("領過了");
        return;
    }
    for (var i in Prize) {
        stage.gainItem(Prize[i][0], Prize[i][1]);
    }
    for (let i = 5002732; i <= 5002734; i++) {
        let e = util.makeItem(i, 1)
        e.setExpireDate(-1)
        stage.gainItem(e)
    }
    // stage.gainItem(5002732, 1, 9999);
    // stage.gainItem(5002733, 1, 9999);
    // stage.gainItem(5002734, 1, 9999);
    log.addEventValue(stage, db, "鬼滅寵物", 1, 365);
    stage.dropAlertNotice("恭喜，領取成功！");
}