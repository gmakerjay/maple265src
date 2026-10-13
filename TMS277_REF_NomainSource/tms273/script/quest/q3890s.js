/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

player = require("check_log");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let marin = {
    1: [
        [2434229, 30],
        [2433972, 10],
        [2439139, 100]
    ],
    6: [
        [2434229, 15],
        [2433972, 5],
        [2439139, 50]
    ],
    10: [
        [2434229, 10],
        [2433972, 3],
        [2439139, 30]
    ]
}
start();

function start() {
    let txt = "#d\t\t\t\t道館 #r" + currentMonth + " 月#d 獎品\r\n\r\n";
    txt += "#b#L0#查詢獎品#l\t#L1#查上月排名#l\t#L2#領上月獎品#l\r\n";
    let sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            txt = "\r\n";
            txt += "#d第 #r1#d 名獎品下列所示\r\n\r\n";
            let storehouse = marin[1];
            for (let i in storehouse) {
                txt += "#i" + storehouse[i][0] + "# x " + storehouse[i][1]
            }
            txt += "\r\n";
            txt += "#d第 #r2 - 3#d 名獎品下列所示\r\n\r\n";
            storehouse = marin[3];
            for (let i in storehouse) {
                txt += "#i" + storehouse[i][0] + "# x " + storehouse[i][1]
            }
            txt += "\r\n";
            txt += "#d第 #r4 - 10#d 名獎品下列所示\r\n\r\n";
            storehouse = marin[10];
            for (let i in storehouse) {
                txt += "#i" + storehouse[i][0] + "# x " + storehouse[i][1]
            }
            txt += "\r\n";
            npc.meFlip().say(txt);
            start();
            break;

        case 1:
            let ret = db.select("SELECT `aid`, `cid`, `cname`, `layer`, `second` FROM `marin_dojang_rank` WHERE MONTH(`date`) = MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AND YEAR(`date`) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) ORDER BY `layer` DESC, `second` ASC;");
            txt = "\r\n";
            if (ret.length <= 0) {
                npc.meFlip().say("抱歉..目前沒有上個月的日誌");
                return;
            }
            for (let i in ret) {
                txt += "#d第 #r" + marinString(" ", 3, String((parseInt(i) + 1)).toString()) + " 名 #b" + marinString(" ", 12, String(ret[i].get("cname")).toString()) + " #d最高層 #r" + marinString(" ", 3, String(ret[i].get("layer")).toString()) + " #b" + convertSecondsToMinutesAndSeconds(ret[i].get("second")) + "\r\n";
            }
            npc.meFlip().say(txt);
            start();
            break;

        case 2:
            ret = db.select("SELECT `aid`, `cid`, `cname`, `layer`, `second` FROM `marin_dojang_rank` WHERE MONTH(`date`) = MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AND YEAR(`date`) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) ORDER BY `layer` DESC, `second` ASC;");
            if (ret.length <= 0) {
                npc.meFlip().say("抱歉..目前沒有上個月的日誌");
                return;
            }
            let ranking = null;
            for (let i in ret) {
                if (ret[i].get('cid') == stage.getCharacterId()) {
                    ranking = parseInt(i) + 1;
                    break;
                }
            }
            if (ranking == null) {
                npc.meFlip().say("抱歉..你沒有達到領獎的標準!");
                return;
            }
            if (player.getEventValue(stage, db, "道館_" + currentMonth + "_效驗") > 0) {
                npc.meFlip().say("抱歉..當月領過了");
                return;
            }
            let rank_war = share(ranking);
            txt = "\r\n";
            for (let i in rank_war) {
                stage.gainItem(rank_war[i][0], rank_war[i][1]);
                txt += "#i" + rank_war[i][0] + "# x " + rank_war[i][1] + " ";
            }
            player.addEventValue(stage, db, "道館_" + currentMonth + "_效驗", 1, -1);
            npc.meFlip().say(txt + "\r\n\r\n領取成功!");
            break;
    }
}

function share(ranking) {
    switch (ranking) {
        case 1:
            return marin[1];
        case 2:
        case 3:
            return marin[6];
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            return marin[10];
        default:
            return null;
    }
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}

function convertSecondsToMinutesAndSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return marinString(" ", 2, minutes.toString()) + "分 " + marinString(" ", 2, remainingSeconds.toString()) + "秒";
}