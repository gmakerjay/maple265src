/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 猜拳連勝禮包
 **/
let log = require('check_log');
let star = "#fEffect/CharacterEff/1051294/1/1#"
let eff2 = "#fEffect/CharacterEff/1112925/0/0#";
var eff1 = "#fEffect/CharacterEff/1112924/0/0#";
var tt = "#fEffect/CharacterEff/1082565/0/0#"; //餅乾兔子
var condition = [4, 6, 8, 12];
var reward = [Array(1, 5062009, 5, ""),//附加記憶魔方%
    Array(1, 5062500, 88, ""),//附加記憶魔方%
    Array(1, 5062020, 88, ""),//附加記憶魔方%
    Array(1, 5062026, 88, " "),

// 4

    Array(2, 5062010, 288, ""),//附加記憶魔方%
    Array(2, 5062031, 288, ""),//附加記憶魔方%
    Array(2, 5062020, 288, ""),//附加記憶魔方%
    Array(2, 5062026, 288, " "),

// 6

    Array(3, 1132246, 1, ""),//附加記憶魔方%

// 8

    Array(4, 1122267, 1, ""),//附加記憶魔方%
    // Array(4, 4032656, 1, "中椅子抽獎"),//附加記憶魔方%
    // Array(4, 5062020, 2, "小椅子抽獎"),//附加記憶魔方%
    // Array(4, 4032655, 2, "傷害皮膚抽獎")
];

var tjnumber = log.getEventValue(stage, db, "猜拳連勝");
var sel = "猜拳連勝\r\n";
sel = "您當前的猜拳連勝為:" + tjnumber + " 次\r\n"
for (var i = 0; i < condition.length; i++) {
    if (log.getEventValue(stage, db, "猜拳連勝" + i) > 0) {
        sel += "#d#L" + (i) + "#" + tt + " [#r已完成#d]猜拳連勝大禮包 #r\t\t\t" + condition[i] + "#l\r\n";
    } else {
        sel += "#d#L" + (i) + "#" + tt + " [未完成]猜拳連勝大禮包 #r\t\t\t" + condition[i] + "#l\r\n";
    }
}
let selected = npc.askMenu(sel);

sel = "是否領取 #r" + condition[selected] + " #k連勝禮包？\r\n"
for (var i = 0; i < reward.length; i++) {
    if (reward[i][0] == (selected + 1)) {
        sel += "\t#i" + reward[i][1] + "# #z" + reward[i][1] + "##r[" + reward[i][2] + "個]#b " + reward[i][3] + "\r\n#k";
    }
}
let YN = npc.askYesNo(sel)
if (YN == 1) {

    //判斷是否已經領取
    if (log.getEventValue(stage, db, "猜拳連勝" + selected) > 0) {
        npc.say("您的賬號已經領取過該禮包，無法再次領取");
    } else if (tjnumber < condition[selected]) {
        npc.say("未達標，無法領取");
    } else {
        var rewardlist = [];
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == (selected + 1)) {
                if (reward[i][3] == null)
                    reward[i][3] = -1;
                rewardlist.push([reward[i][1], reward[i][2], reward[i][3]]);
            }
        }
        if (stage.getFreeSlot(1) < rewardlist.length || stage.getFreeSlot(2) < rewardlist.length || stage.getFreeSlot(3) < rewardlist.length || stage.getFreeSlot(4) < rewardlist.length || stage.getFreeSlot(5) < rewardlist.length) {
            npc.say("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
        } else {
            for (var i = 0; i < rewardlist.length; i++) {
                stage.gainItem(rewardlist[i][0], rewardlist[i][1]);
            }
            log.addEventValue(stage, db, "猜拳連勝" + selected, 1, -1); 
            npc.say("領取成功");
        }
    }
}


function format(val, lenA) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match("/[^\x00-\xff]/ig") != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    if (17 - len > 0) {
        for (var j = 17 - len; j > 0; j--) {
            val += " ";
        }
    }
    return val;
}


function gethypayxs(type) {
    var sql = "select * from hypayxs where accname = '" + getAccountName() + "'";
    var push = db.select(sql);
    if (push.length > 0) {
        var result = push.get(0);
        if (type == 1) {
            var pay = result.get("pay");
        } else if (type == 2) {
            var pay = result.get("payUsed");
        } else if (type == 3) {
            var pay = result.get("payReward");
        }
    } else {
        d.insert("INSERT INTO `hypayxs` (`accname`, `name`) VALUES ('" + getAccountName() + "', '" + stage.getCharacterName() + "')");
        return gethypayxs(1);
    }
    return pay;
}

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}