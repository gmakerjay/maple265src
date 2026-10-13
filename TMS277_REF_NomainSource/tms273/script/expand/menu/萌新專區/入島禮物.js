/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
var icon = require('constant/icon');
var color = require('constant/Color'); 
var payUtils = require('constant/PayUtils.js');
var REWARD_LIST = [ 
    [[5062500, 30], [5062010, 100],  [2432206, 5], [4001715, 1], [2023380, 10],],// 1
    [[5062500, 30], [5062010, 100],  [2432206, 5], [4001715, 1], [2023380, 10],],// 2
    [[5062500, 30], [5062010, 100],  [2432206, 5], [4001715, 1], [2023380, 10],],// 3
    [[5062500, 30], [5062010, 100],  [2432206, 5], [4001715, 1], [2023380, 10],],// 4
    [[5062500, 30], [5062010, 100],  [2432206, 10], [4001715, 1], [2023380, 10],],// 5
    [[5062500, 30], [5062026, 10],  [5062020, 10], [2432206, 10], [4001715, 1], [2023380, 10],],// 6
    [[5062500, 30], [5062026, 10],  [5062020, 10], [2432206, 10], [4001715, 1], [2023380, 10],],// 7
    [[5062500, 30], [5062026, 10],  [5062020, 10], [2432206, 10], [4001715, 1], [2023380, 10],],// 8
    [[5062500, 30], [5062026, 10],  [5062020, 10], [2432206, 10], [4001715, 1], [2023380, 10],],// 9
    [[5062500, 30], [5062026, 10],  [5062020, 10], [2432206, 10], [2435824, 5], [4001715, 1], [2023380, 10],],// 10
    [[5062500, 30], [5062026, 10],  [2435824, 5], [4001715, 2], [2023380, 10],],// 11
    [[5062500, 30], [5062026, 10],  [2435824, 5], [4001715, 2], [2023380, 10],],// 12
    [[5062500, 30], [5062026, 10],  [2435824, 5], [4001715, 2], [2023380, 10],],// 13
    [[5062500, 30], [5062026, 10],  [2435824, 5], [4001715, 2], [2023380, 10],],// 14
    [[2432206, 5], [4001715, 5], [2023380, 20],],// 15
];
var log = require('check_log');

function start() {
    try {
        /**
         * 玩家簽到玩法
         **/
        // 獲取玩家註冊日期
        var accountResult = db.select("select * from account where id = " + stage.getAccountId());
        if (!accountResult || accountResult.length === 0) {
            npc.say("獲取帳號資訊失敗，請稍後重試！");
            return;
        }
        
        // 關鍵修復：兼容多種日期格式（時間戳、標準字串等）
        var bornDate = parseBornDate(accountResult[0].get("create_date"));
        
        var now = new Date();
        // 格式化當前日期（ES5相容，手動補0）
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString();
        month = month.length === 1 ? "0" + month : month;
        var day = now.getDate().toString();
        day = day.length === 1 ? "0" + day : day;
        var toDay = year + "-" + month + "-" + day;

        var dateList = getNext15Days(bornDate);

        var str = icon.任務相關.任務簡介 + "\r\n" + "#r#fn微軟雅黑##fs14##e#b[萌新的簽到支援]#r#k#fs14##l\r\n";
        str += "親愛的 " + stage.getCharacterName() + "，您的註冊日期為 [" + color.淡桃紅 + dateList[0] + "#k]\r\n";
        str += "註冊起" + color.淡桃紅 + "15" + "#k天內每天達成條件可以在此領取禮物\r\n";
        str += "";

        // 僅保留在線30分鐘條件
        var can1 = stage.getOnlineTime() >= 30;
        str += "條件：在線30分鐘 " + (can1 ? '#b已達成#k' : '#r未達成#k') + "\r\n";
        str += "\r\n";
        str += "#L0#我要簽到#l\r\n";
        str += "#L1#查看獎勵#l\r\n";

        var sel1 = npc.askMenu(str);
        if (sel1 == 1) {
            var strReward = "#r#fn微軟雅黑##fs14##e#b[萌新的簽到支援獎勵展示]#r#k#fs13##l\r\n";
            for (var i = 1; i <= 15; i++) {
                strReward += "第" + i + "天：\r\n";
                for (var j in REWARD_LIST[i]) {
                    strReward += "[#v" + REWARD_LIST[i][j][0] + ":i#x" + REWARD_LIST[i][j][1] + "]";
                    if ((Number(j) + 1) % 3 == 0) {
                        strReward += "\r\n";
                    }
                }
                strReward += "\r\n";
                strReward += "樂豆：1500\r\n";
                strReward += "抵用：5000\r\n";
            }
            npc.say(strReward);
            start();

        } else if (sel1 == 0) {
            var signStr = "#r#fn微軟雅黑##fs14##e#b[萌新的簽到支援]#r#k#fs14##l\r\n";
            var can = false;
            for (var i = 0; i < 15; i++) {
                signStr += "#L" + i + "#" + dateList[i] + " ";
                if (log.getEventValue(stage, db, '註冊15天獎勵' + i) > 0) {
                    if (dateList[i] == toDay) {
                        signStr += icon.checkBox[1]['可選選中'];
                        can = true;
                    } else if (dateList[i] < toDay) {
                        signStr += icon.checkBox[1]['不可選選中'];
                    }
                } else {
                    if (dateList[i] == toDay) {
                        signStr += icon.checkBox[1]['可選未選中'];
                        can = true;
                    } else if (dateList[i] < toDay) {
                        signStr += icon.checkBox[1]['不可選未選中'];
                    }
                }
                signStr += "#l\r\n";
            }
            if (can) {
                var sel = npc.askMenu(signStr);
                var rewardStr = "";
                for (var i in REWARD_LIST[sel]) {
                    rewardStr += "#v" + REWARD_LIST[sel][i][0] + ":i##z" + REWARD_LIST[sel][i][0] + ":i# x " + REWARD_LIST[sel][i][1] + "\r\n";
                }
                rewardStr += "樂豆：1500\r\n";
                rewardStr += "抵用：5000\r\n";
                if (dateList[sel] == toDay) {
                    if (log.getEventValue(stage, db, '註冊15天獎勵' + sel) > 0) {
                        npc.say("您已經領取過這一天的獎勵了#r(" + dateList[sel] + ")#k\r\n" + rewardStr);
                        start();
                    } else {
                        // 僅判斷在線30分鐘條件
                        if (can1) {
                            if (npc.askYesNo("是否領取當日獎勵#r(" + dateList[sel] + ")#k\r\n" + rewardStr) == 1) {
                                log.addEventValue(stage, db, "註冊15天獎勵" + sel, 1, -1);
                                for (var i in REWARD_LIST[sel]) {
                                    stage.gainItem(REWARD_LIST[sel][i][0], REWARD_LIST[sel][i][1]);
                                }

                                payUtils.gainPay(2, 1500, stage, db, "新人福利", "新人福利");
                                payUtils.gainPay(4, 5000, stage, db, "新人福利", "新人福利");
                                util.broadcastChatMsg(7, "萌新中心：恭喜玩家 " + stage.getCharacterName() + " 領取了註冊起15日內新人禮物");
                                npc.say("領取成功 " + dateList[sel] + "\r\n" + rewardStr);
                                start();
                            }
                        } else {
                            npc.say('在線時間未達30分鐘，無法領取獎勵');
                        }
                    }
                } else {
                    npc.say("第" + sel + "天 (" + dateList[sel] + ") 的獎勵為\r\n" + rewardStr);
                    start();
                }
            } else {
                npc.say("您註冊已超過15天，註冊日期為 " + dateList[0]);
            }
        }
    } catch (e) {
        // 全域異常捕獲（避免指令碼崩潰）
        npc.say("簽到功能異常：" + e.message + "\n請聯絡管理員或稍後重試");
        console.error("簽到異常：", e);
    }
}

start();

// 關鍵函數：解析多種格式的註冊日期（兼容時間戳、標準字串）
function parseBornDate(rawDate) {
    var bornDate;
    
    // 格式1：時間戳（數字或字串形式的數字）
    if (!isNaN(rawDate)) {
        bornDate = new Date(Number(rawDate));
        if (!isNaN(bornDate.getTime())) {
            stage.showSystemMessage("註冊日期（時間戳解析）: " + bornDate);
            return bornDate;
        }
    }
    
    // 格式2：標準日期字串（含空格，如"2025-09-25 12:31:56"）
    if (typeof rawDate === "string") {
        // 替換空格為T，兼容ISO格式
        var isoStr = rawDate.replace(" ", "T");
        bornDate = new Date(isoStr);
        if (!isNaN(bornDate.getTime())) {
            stage.showSystemMessage("註冊日期（ISO字串解析）: " + bornDate);
            return bornDate;
        }
        
        // 格式3：手動分割字串（如"2025-09-25 12:31:56"）
        var parts = rawDate.split(" ");
        if (parts.length === 2) {
            var dateParts = parts[0].split("-");
            var timeParts = parts[1].split(":");
            if (dateParts.length === 3 && timeParts.length >= 2) {
                bornDate = new Date(
                    Number(dateParts[0]),
                    Number(dateParts[1]) - 1, // 月份從0開始
                    Number(dateParts[2]),
                    Number(timeParts[0]) || 0,
                    Number(timeParts[1]) || 0,
                    Number(timeParts[2]) || 0
                );
                if (!isNaN(bornDate.getTime())) {
                    stage.showSystemMessage("註冊日期（手動分割解析）: " + bornDate);
                    return bornDate;
                }
            }
        }
    }
    
    // 所有格式解析失敗，使用當前日期
    bornDate = new Date();
    stage.showSystemMessage("註冊日期解析失敗，使用當前日期");
    return bornDate;
}

// 日期生成函數（基於註冊日期）
function getNext15Days(startDate) {
    var dateArray = [];
    var oneDayMs = 24 * 60 * 60 * 1000;
    function formatDate(date) {
        var y = date.getFullYear();
        var m = (date.getMonth() + 1).toString();
        m = m.length === 1 ? "0" + m : m;
        var d = date.getDate().toString();
        d = d.length === 1 ? "0" + d : d;
        return y + "-" + m + "-" + d;
    }
    dateArray.push(formatDate(startDate));
    for (var i = 1; i <= 15; i++) {
        var nextDate = new Date(startDate.getTime() + i * oneDayMs);
        dateArray.push(formatDate(nextDate));
    }
    return dateArray;
}