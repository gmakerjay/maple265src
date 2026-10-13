/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let {日期查詢周} = require('constant/date');
let icon = require('icon');
let 賽季 = require('constant/賽季信息');
let log = require('check_log');
let 賽季等級 = 獲取戰令令牌();
let 購買高級版 = 是否購買高級版();
let reward = [
    [100,
        [[5062009, 30], [5062010, 30], [5062500, 30], [2431305, 15]],
        [[5062031, 20], [5062010, 90], [5062500, 90], [2432206, 15]]
    ],
    [200,
        [[5062009, 30], [5062010, 30], [5062500, 30], [2431305, 15]],
        [[5062031, 20], [5062010, 90], [5062500, 90], [2432206, 15]]
    ],
    [300,
        [[5062009, 30], [5062010, 30], [5062500, 30], [2431305, 15]],
        [[5062031, 20], [5062010, 90], [5062500, 90], [2432206, 15]]
    ],
    [400,
        [[5062009, 30], [5062010, 30], [5062500, 30], [2431305, 15]],
        [[5062031, 20], [5062010, 90], [5062021, 60], [2432206, 15]]
    ],
    [500,
        [[5062009, 30], [5062010, 30], [5062500, 30], [2431305, 15]],
        [[5062031, 20], [5062010, 90], [5062024, 90], [2432206, 15]]
    ],
    [600,
        [[5062009, 30], [5062010, 30], [5062500, 30], [2431305, 15]],
        [[5062031, 20], [5062010, 90], [5062026, 90], [2630026, 20]]
    ],
    [700,
        [[4009548, 30]],
        [[5062031, 20], [2636884, 10]]
    ],
    [800,
        [[4009548, 40]],
        [[5062031, 20], [2636884, 15]]
    ],
    [900,
        [[4009548, 50]],
        [[5062031, 20], [2636884, 20]]
    ]
];
let 周信息 = 日期查詢周();
var 領取獎勵圖標 = "#fUI/UIWindowCT/premiumTimeGift_CT/Daily/button:RewardD1/mouseOver/0#";
var 已領取獎勵圖標 = "#fUI/UIWindowCT/premiumTimeGift_CT/Daily/button:RewardD1/disabled/0#";
var 不可領取 = "#fUI/UIWindowCT/premiumTimeGift_CT/Daily/button:RewardD1/notAvailable/0#";
execute();

function execute() {
    let txt = "#d\t\t\t\t" + icon.entry[5][1] + " 戰令令牌 " + icon.entry[5][1] + "\r\n";
    txt += "#d#L99997#戰令令牌：#r" + 賽季等級 + "#l\t\t";
    if (購買高級版) {
        txt += "#L99999#您已解鎖高級令牌#l";
    } else {
        txt += "#L99999##r68元解鎖高級#l#d";
    }
    txt += "\r\n\r\n";
    txt += "  持續時間:#r" + 周信息.本週第一天 + "#d  ~ #r" + 周信息.本週最後一天 + "#d\r\n\r\n";

    for (let i = 0; i < reward.length; i++) {
        txt += "    ------- 令牌: #r" + marinstring(" ", 5, reward[i][0].toString()) + " #d-------\r\n"
        for (let k = 0; k < reward[i][1].length; k++) {
            txt += "#v" + reward[i][1][k][0] + "##t" + reward[i][1][k][0] + ":i#x#r" + reward[i][1][k][1] + "#d\r\n";
        }
        txt += `\r\n`;
        if (判斷是否領取過獎勵(reward[i][0]) > 0) {
            txt += "   " + 已領取獎勵圖標
        } else {
            if (賽季等級 >= reward[i][0]) {
                txt += "#L" + i + "#普通戰令 " + 領取獎勵圖標 + "#l\r\n"
            } else {
                txt += "   " + 不可領取
            }
        }

        txt += "\r\n"
        // txt += "    高級:"
        for (var k = 0; k < reward[i][2].length; k++) {
            txt += "#v" + reward[i][2][k][0] + "##t" + reward[i][2][k][0] + ":i#x#r" + reward[i][2][k][1] + "#d\r\n";
        }
        // txt+=領取獎勵圖標
        txt += `\r\n`;
        if (!購買高級版) {
            txt += "   " + 不可領取
        } else if (判斷是否領取過獎勵(100000 + reward[i][0]) > 0) {
            txt += "   " + 已領取獎勵圖標
        } else {
            if (賽季等級 >= reward[i][0]) {
                txt += "#L" + (i + 100000) + "#高級戰令 " + 領取獎勵圖標 + "#l"
            } else {
                txt += "   " + 不可領取
            }
        }
        txt += "\r\n\r\n";

    }
    let sel = npc.askMenu(txt);

    switch (sel) {
        case 99997:
            stage.runScript('expand/menu/戰令令牌/戰令任務');
            break;
        case 99999:
            stage.runScript('expand/menu/戰令令牌/購買高級版');
            break;
        default:
            領取獎勵(sel);
            break;
    }
}


function 購買戰令令牌() {
    var arr = Array(
        Array(4310148, 40),
        Array(4002003, 40)
    )
    var sb = "請選擇您要使用哪種道具進行購買戰令令牌\r\n";
    for (var i = 0; i < arr.length; i++) {
        sb += "#L" + i + "##v" + arr[i][0] + "##t" + arr[i][0] + "# = " + arr[i][1] + "經驗#l\r\n";
    }
    var res = npc.askMenu(sb);
    var itemid = arr[res][0];
    var exp = arr[res][1];
    var number = npc.defNum(1).minNum(1).maxNum(stage.getItemQuantity(itemid)).askNumber("請輸入您要消耗多少個#v" + itemid + "##t" + itemid + "#\r\n每個可以獲得戰令令牌：" + exp + "點\r\n您身上含有#v" + itemid + "#" + stage.getItemQuantity(itemid) + "個")
    var yes = npc.askYesNo("您確定要消耗#v" + itemid + "##t" + itemid + "# x " + number + "?\r\n您可以獲得戰令令牌：" + exp * number + "點 (400戰令令牌為1級)");
    if (yes == 1) {
        if (stage.hasItem(itemid, number)) {
            stage.loseItem(itemid, number);
            設置戰令令牌(itemid + "x" + number + "購買戰令令牌：" + exp * number, exp * number);
            npc.say("您獲得" + exp * number + "戰令令牌！");
        }
    }
}


function 設置戰令令牌(describe, point) {
    var sql_c = "INSERT INTO zz_pass(characters_id,`describe`,point,season ) VALUES (" + stage.getCharacterId() + "," + describe + "," + point + "," + 賽季.get賽季標號() + ")";
    db.insert(sql_c);
}

function 領取獎勵(sel) {
    var json = 獲取賽季綁定情況();
    var 確認 = false;
    if (json.characters_id == undefined) {
        var 輸入 = npc.defText("").minLen(1).maxLen(20).askText("#d一個賬號僅一個角色能夠領取獎勵\r\n\r\n您確定要用這個角色領取獎勵嗎？\r\n\r\n請輸入'確定領取'")
        if (輸入 == "確定領取") {
            進行綁定賽季();
            確認 = true;
        } else {
            npc.say("請認真閱讀!!!!");
            execute();
        }
    } else if (json.characters_id != stage.getCharacterId()) {
        npc.say("您賬號綁定的角色不是當前角色,一個賬號只能一個角色能夠領取獎勵.您綁定角色為：" + json.name);
    } else {
        確認 = true;
    }
    if (確認) {
        if (sel >= 100000) {
            //說明要領取高級
            var index = sel - 100000;
            if (!判斷是否領取過獎勵(reward[index][0] + 100000) && 購買高級版) {
                var text = "恭喜您領取高級：" + reward[index][0] + "戰令獎勵：\r\n"
                for (var k = 0; k < reward[index][2].length; k++) {
                    var itemid = reward[index][2][k][0];
                    var number = reward[index][2][k][1];
                    text += "#v" + itemid + "##t" + itemid + "# x " + number + "\r\n";
                    stage.gainItem(itemid, number);
                    util.broadcastGachaponMsg("戰令令牌 玩家[" + stage.getCharacterName() + "]領取高級:" + reward[index][0] + "戰令級別,獲得x" + reward[index][2][k][1] + "!", util.makeItem(itemid, 1));

                }
                領獎記錄(reward[index][0] + 100000);
                npc.say(text)
                execute();
            } else {
                npc.say("您領取過獎勵!");
            }
        } else {
            var index = sel;
            if (!判斷是否領取過獎勵(reward[index][0])) {
                var text = "恭喜您領取普通：" + reward[index][0] + "戰令獎勵：\r\n"
                for (var k = 0; k < reward[index][1].length; k++) {
                    var itemid = reward[index][1][k][0];
                    var number = reward[index][1][k][1];
                    text += "#v" + itemid + "##t" + itemid + "# x " + number + "\r\n";
                    stage.gainItem(itemid, number);
                    util.broadcastGachaponMsg("戰令令牌 玩家[" + stage.getCharacterName() + "]領取普通:" + reward[index][0] + "戰令級別,獲得x" + reward[index][2][k][1] + "!", util.makeItem(itemid, 1));

                }
                領獎記錄(reward[index][0]);
                npc.say(text)
                execute();
            } else {
                npc.say("您領取過獎勵!");
            }

        }
    }
}


function 領獎記錄(level) {
    log.addPQLog(stage, db, "通行證賽季_" + 賽季.get賽季標號() + level, 1, 365);
    var sql = "insert into zz_pass_reward(characters_id,season,`level`,`value`)value(" + stage.getCharacterId() + ",'" + 賽季.get賽季標號() + "','" + level + "','" + 1 + "')";
    db.insert(sql);
}

function 進行綁定賽季() {
    var sql = "insert into zz_pass_lock(characters_id,season,`account_id`)value(" + stage.getCharacterId() + "," + 賽季.get賽季標號() + "," + stage.getAccountId() + ")";
    db.insert(sql);
}

function 獲取賽季綁定情況() {
    var sql = "SELECT a.characters_id,(SELECT name FROM character_stat b where a.characters_id = b.id) name  from zz_pass_lock a  where  account_id = " + stage.getAccountId() + "  and season = " + 賽季.get賽季標號() + "; ";
    var resultList = db.select(sql);
    var json = {};
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        json.name = result.get("name");
        json.characters_id = result.get("characters_id");
    }
    return json;
}


function 獲取戰令令牌() {
    const characterName = stage.getCharacterId();
    const season = 賽季.get賽季標號();
    const sql = `SELECT SUM(point) AS exp
                 FROM zz_pass a
                 WHERE a.characters_id = '${characterName}'
                   AND season = '${season}'`;
    const resultList = db.select(sql);
    let exp = 0;
    for (let i = 0; i < resultList.length; i++) {
        const result = resultList[i];
        if (result === null) {
            break;
        }
        exp = result.get("exp"); // 注意：如果exp可能為null，再次檢查
    }
    return exp !== null ? exp : 0; // 當exp為null時返回0
}

function 是否購買高級版() {
    const sql = "SELECT COUNT(1) AS number FROM zz_pass_vip a WHERE a.characters_id = '" + stage.getCharacterId() + "' AND season = '" + 賽季.get賽季標號() + "'";
    const resultList = db.select(sql);
    return !!(resultList && resultList[0].get('number') > 0);
}

function 判斷是否領取過獎勵(level) {
    var sql = "select count(1) number from zz_pass_reward a where a.characters_id = '" + stage.getCharacterId() + "' and season = " + 賽季.get賽季標號() + " and level = " + level;
    var resultList = db.select(sql);
    var number = 0;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        number = result.get("number");
    }
    if (number == 0) {
        return false;
    } else {
        return true;
    }
}

function marinstring(charToFill, totalLength, originalString) {
    const lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    const length = originalString.length + lengthOfDoubleByteChars;
    const charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}
