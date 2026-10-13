/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var text = "#b您擁有星語幣：#r" + getHyPay(1) + "#b \r\n\r\n";
text += "#b請輸入您想要兌換的數量\r\n\r\n";

var scale = 50;
var scalex = 100;

text += "1 星語幣兌換 " + scale + "樂豆  " + scalex + "抵用券:\r\n\r\n";
let number = npc.defNum(1).minNum(1).maxNum(getHyPay(1)).askNumber(text);
var yes = npc.askYesNo("#e#b是否要將" + number + "兌換 #r" + number * scale + " 樂豆 " + number * scalex + " 抵用券? ");
if (yes == 1) {
    if (number <= getHyPay(1)) {
        gainHyPay(-number, number * scale);//扣除星語幣
		gainHyPayx(number, number * scale);//增加纍計
        stage.modifyCurrency(1,number * scale);
        stage.modifyCurrency(2, number * scalex);
        stage.showSystemMessage("獲得" + number * scalex + "抵用券");
		stage.showSystemMessage("獲得" + number * scale + "樂豆");
        npc.say("#b兌換成功, 您擁有\r\n星語幣：#r" + getHyPay(1) + " #b\r\n樂豆：#r" + stage.getCurrency(1) + " #b\r\n抵用券#r：" + stage.getCurrency(2) + "\r\n");
    }
}





function gainHyPay(number) {
    var sql = "select * from hypay where accname = '" + getAccountName() + "'";
    var push = db.select(sql);
    if (push.length > 0) {
        var sql = "update hypay set pay =pay+" + number + " where accname = '" + getAccountName() + "';";
        db.update(sql);
    } else {
        db.insert("INSERT INTO `hypay` (`accname`, `name`,`pay`) VALUES ('" + getAccountName() + "', '" + stage.getCharacterName() + "'," + number + ")");
    }
}
function gainHyPayx(number) {
    var sql = "select * from hypay where accname = '" + getAccountName() + "'";
    var push = db.select(sql);
    if (push.length > 0) {
        var sql = "update hypay set payReward =payReward+" + number + " where accname = '" + getAccountName() + "';";
        db.update(sql);
    } else {
        db.insert("INSERT INTO `hypay` (`accname`, `name`,`payReward`) VALUES ('" + getAccountName() + "', '" + stage.getCharacterName() + "'," + number + ")");
    }
}

function getHyPay(type) {
    var sql = "SELECT * FROM hypay WHERE accname = '" + getAccountName() + "'";
    var push = db.select(sql);
    // 用 push.length 判断数组是否有元素
    if (push.length > 0) {
        var result = push[0];
        if (type == 1) {
            var pay = result.get("pay");
        } else if (type == 2) {
            var pay = result.get("payUsed");
        } else if (type == 3) {
            var pay = result.get("payReward");
        }
    } else {
        db.insert("INSERT INTO `hypay` (`accname`, `name`) VALUES ('" + getAccountName() + "', '" + stage.getCharacterName() + "')");
        return getHyPay(1);
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