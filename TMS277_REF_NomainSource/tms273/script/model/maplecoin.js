/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let player = require("check_log");

let maps = [
    450001113,
    450014300,
    450002010,
    450015290,
    450003440,
    450003350,
    450005241,
    450005242,
    450005430,
    450006430,
    450007110,
    450007120,
    450007130,
    450007140,
    450007150,
    450007160,
    450016110,
    450016120,
    450016130,
    450016140,
    450016150,
    450016160,
    450016210,
    450009360,
    450011640,
    450012310,
    450012320,
    450012330,
    450012340,
    450012350,
    450012400,
    450012410,
    450012420,
    450012430,
    450012440,
    410000520,
    410000530,
    410000540,
    410000550,
    410000590,
    410000600,
    410000610,
    410000640,
    410000650,
    410000660,
    410000700,
    410000710,
    410000720,
    410000730,
    410000740,
    410000750,
    410000920,
    410000930,
    410000940,
    410000950,
    410000980,
    410000990,
    410001000,
    410001010,
    410001020,
    410001030,
    410000840,
    410000850,
    410000860,
    410000870,
    410000880,
    410000890,
    410003040,
    410003050,
    410003060,
    410003070,
    410003090,
    410003100,
    410003110,
    410003120,
    410003130,
    410003140,
    410003150,
    410003160,
    410003170,
    410003180,
    410003190,
    410003200,
    410007002,
    410007003,
    410007004,
    410007005,
    410007006,
    410007007,
    410007008,
    410007009,
    410007012,
    410007013,
    410007014,
    410007015,
    410007016,
    410007017,
    410007026,
    410007027,
    410007038,
    410007039,
    410007028,
    410007029,
    410007030,
    410007040,
    410007041,
    410007031,
    410007032,
    410007033,
    410007042,
    410007043,
    410007034,
    410007035,
    410007036,
    410007044,
    410007045,
    410007037,
    410007522,
    410007523,
    410007524,
    410007525,
    410007546,
    410007547,
    410007527,
    410007528,
    410007529,
    410007548,
    410007549,
    410007530,
    410007537,
    410007538,
    410007539,
    410007550,
    410007551,
    410007552,
    410007553,
    410007540,
    410007620,
    410007621,
    410007622,
    410007623,
    410007624,
    410007625,
    410007640,
    410007641,
    410007642,
    410007643,
    410007644,
    410007645,
    410007660,
    410007661,
    410007662,
    410007663,
    410007664,
    410007665,
    410007666,
    410007667
]
let marin = {
    3700661: 999,
    3700662: 50,
    3700663: 30
}

function execute(npc, stage, db, ctx, map) {
    let daysUntilNextMonthFirstDay = getCurrentYearMonth();
    let count = 15;
    for (let i in marin) {
        if (stage.hasItem(i, 1)) {
            count = marin[i];
            break;
        }
    }
    if (stage.getEvent() == null) {
        if (maps.indexOf(map.getId()) > -1 && stage.getLevel() >= 200) {
            if (map.getPlayerCount() > 1) {
                npc.meFlip().say("抱歉..當前楓幣地圖存在其他玩家!");
                return;
            }

            if (parseInt(stage.getIntQuestRecordExShare(100000, String(daysUntilNextMonthFirstDay))) >= count) {
                npc.meFlip().say("抱歉..當月解輪已達到上限!!本月不能進入楓幣副本了!");
                return;
            }
            if (ctx.makeEvent("marin_game", false, [stage, map.getId()]) == null) {
                stage.dropAlertNotice("发生未知错误，请联系管理员。");
            }
            return;
        }
    } else {
        if (npc.meFlip().askYesNo("是否立即離開當前地圖？") !== 1) return;
        stage.changeMap(100000000, 0);
    }
    let totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
    if (isInputNaN(totalmoney)) {
        stage.updateQuestRecordExShare(100000, "totalmoney", "0");
    }
    let txt = "賬戶當前綁定楓幣為：#b" + (totalmoney / 1E8).toFixed(2) + "#k 億\r\n";
    txt += "這裡是楓幣副本,開放前你需看一下說明\r\n";
    txt += "首先,如果地圖上出現符文,要去解開,否則無法正常獲得楓幣與經驗值.\r\n";
    txt += "#e#r在楓幣副本內可獲得三倍經驗的免費buff#k\r\n";
    txt += "#n需玩家等級達到 #r200#k 以上才開啟\r\n";
    txt += "入坑小於 " + calculateDaysSinceRegistration(stage, db) + "/30 天,可以獲得一半綁定一半不綁定收益,且倍率提升30%\r\n";
    txt += "為了您身心健康,楓幣副本每日最多獲得 #r" + (player.getQuestLog(stage, 100001, 1) / 1E8).toFixed(2) + " / 20 #k億楓幣\r\n";
    txt += "\r\n";
    txt += "#L0#進入副本 (#b未解符文 #r" + stage.getIntQuestRecordExShare(100000, String(daysUntilNextMonthFirstDay)) + "/" + count + "#k)#l\r\n";
    txt += "#L1##b楓幣副本介紹#l\r\n";
    txt += "#L2##b楓幣副本倍率#l\r\n";
    sel = npc.meFlip().askMenu(txt);
    switch (sel) {
        case 0:
            txt = "\r\n";
            if (maps.indexOf(map.getId()) <= -1) {
                txt += "抱歉..當前地圖不支持開啟楓幣副本\r\n";
                txt += "#b僅下列地圖支持#r\r\n\r\n";
            }
            for (let i in maps) {
                txt += "#L" + i + "##m" + maps[i] + "##l\r\n";
            }
            let url = npc.meFlip().askMenu(txt);

            if (maps[url] !== map.getId()) {
                stage.changeMap(maps[url], 0);
                return;
            }
            if (stage.getLevel() < 200) {
                npc.meFlip().say("抱歉。。。你的等级没有达到 200 级")
            }
            if (parseInt(stage.getIntQuestRecordEx(100000, String(daysUntilNextMonthFirstDay))) >= count) {
                npc.meFlip().say("抱歉..當月解輪已達到上限!!本月不能進入楓幣副本了!");
                return;
            }

            if (map.getPlayerCount() > 1) {
                npc.meFlip().say("抱歉..當前楓幣地圖已存在玩家");
                return;
            }

            if (ctx.makeEvent("marin_game", false, [stage, map.getId(), calculateDaysSinceRegistration(stage, db)]) == null) {
                stage.dropAlertNotice("发生未知错误，请联系管理员。");
            }
            break;

        case 1:
            txt = "1.#d楓幣副本內出現符文后在#r 5 #d分鐘內沒有解除符文，會被記錄一次，每個月擁有#r 15 #d次機會，機會用完了當前賬號所有角色無法再進入楓幣副本，購買女神可以增加機會次數。\r\n";
            txt += "\r\n\r\n";
            txt += "2.#d在楓幣副本 - 賽爾尼溫、飯店阿爾克斯、奧迪溫區域內，武器和防具 #r6 #d件套是 #r161 #d級以下裝備時，每件裝備分別會減少 #r10%/5% #d的楓幣收益，總共最多減少#r 40%。\r\n";
            txt += "\r\n\r\n";
            txt += "擁有：#k\r\n";
            txt += "#i" + 3700663 + "##i" + 3700662 + "##i" + 3700661 + "#時，楓幣獲得會有額外加成#r10%/15%/20%。\r\n\r\n";
            npc.meFlip().say(txt);
            break;
        case 2:
            txt = "周一至周五：奧數之河1600% ，格蘭蒂斯200%\r\n";
            txt += "\r\n\r\n";
            txt += "周六、周日：奧數之河2400% ，格蘭蒂斯300%\r\n";
            txt += "\r\n\r\n";
            txt += "新人玩家注注冊30日內：\r\n";
            txt += "周一至周五：奧數之河1800% ，格蘭蒂斯220%\r\n\r\n";
            npc.meFlip().say(txt);
            break;
    }
}

function getCurrentYearMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yearMonth = `${year}${month}`;
    return yearMonth;
}

function calculateDaysSinceRegistration(stage, db) {
    let ret = db.select("SELECT `create_date` FROM `account` WHERE `id` = '" + stage.getAccountId() + "' LIMIT 0,1;");
    const registrationDateStr = String(ret[0].get("create_date"));
    const registrationDate = new Date(parseInt(registrationDateStr));
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - registrationDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}


function convertToStandardDateFormat(dateStr) {
    // 移除末尾的 ".0"
    dateStr = dateStr.replace(".0", "");
    // 将空格替换为 "T"
    dateStr = dateStr.replace(" ", "T");
    return dateStr;
}

module.exports = {
    execute: execute
};

function isInputNaN(value) {
    return isNaN(value);
}
