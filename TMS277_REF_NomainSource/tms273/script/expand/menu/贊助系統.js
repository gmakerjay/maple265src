/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

//const {getHyPay} = require('vipCommon.js');

var eff = "#fEffect/CharacterEff/1082565/2/0#";
var vvv = "#fUI/Basic/BtHide3/mouseOver/0#";
var vvv4 = "#fUI/UIWindow4/PQRank/rank/gold#";//小皇冠
var z1 = "#fEffect/ItemEff/1112811/0/0#";//黃金音符
var eff4 = "#fEffect/CharacterEff/1112925/0/0#";//小紅心
var z5 = "#fEffect/CharacterEff/1112904/2/1#";//五角花
var eff1 = "#fEffect/CharacterEff/1112924/0/0#"
var eff2 = "#fEffect/CharacterEff/1112925/0/0#";
var eff3 = "#fEffect/CharacterEff/1114000/1/0#"
var ttt2 = " #fItem/Cash/0501.img/05010002/effect/default/7#"
var ttt = "#fUI/UIWindow2.img/ValuePack/title/0#";//
var a1 = "#fUI/UIWindow2.img/ValuePack/title/0#";//贊助u
var a3 = "#fUI/CashShop/CSDiscount/bonus#"
var a4 = "#fUI/UIWindowBT/WorldMap/NoticeIcon/4#"
var a5 = "#fUI/UIWindow2/FadeForEvent/icon1#"
var a6 = "#fUI/CashShop/CSEffect/event/0#"
var a7 = "#fUI/UISpinOff/spinOff1/new#"
var kk42 = "#fMap/MapHelper/weather/5000days/5#";
var kk43 = "#fMap/MapHelper/weather/popcornTime/0#";

let npcModel = 9900000;
let whileStage = true;
let accountId = stage.getAccountId();
while (whileStage) {
    var selStr = "#fs14##fn宋體#\r\n";
    let label1 = "#L1#" + eff4 + "[我要贊助]#l"; // 充值入口
    let label4 = "#L4#" + eff4 + "[累充福利]#l"; // 現金兌換
    let label7 = "#L7#" + eff4 + "[月卡贊助]#l"; // 累充禮包

    let label2 = "#L2#" + eff4 + "[幣種轉換]#l"; // 會員辦理
    let label5 = "#L5#" + eff4 + "[購買等級]#l"; // 會員介紹
    let label8 = "#L8#" + eff4 + "[戰令系統]#l"; // 會員中心

    let label3 = "#L3#" + eff4 + "[累充勳章]#l"; // 月卡辦理
    let label6 = "#L6#" + eff4 + "[首充禮包]#l"; // 月卡介紹
    let label9 = "#L9#" + eff4 + "[累計禮包]#l"; // 累充禮包
    let label10 = "#L10#" + eff4 + "[VIP 系統]#l"; // 累充禮包
    
    selStr += "#fs12#" + vvv + "#d 楓之幣 #r" + getHyPay(1);
    selStr += "     " + vvv + "#d 累  充 #r" + getHyPay(3) + "\r\n"
	selStr += "" + vvv + "#d 抵用券 #r" + stage.getCurrency(2);
    selStr +="   " +vvv   + "#d 樂  豆 #r" + stage.getCurrency(1);
   
    selStr += "\r\n\r\n#d";
    selStr += label1 + " " + label2 + " " + label3 + "\r\n\r\n";
    selStr += label4 + " " + label7 + " " + label6 + "\r\n\r\n";
    selStr += label8 + " " + label9 + " " + label10 + "\r\n\r\n";
    // selStr += label8 + " " + label9 + "\r\n\r\n";
    selStr += "\r\n#d#fs11#- 　　     　1楓之幣 = 50樂豆 + 100抵用券  　    -\r\n";
    selStr += "#fs11#- 贊助均用來維持遊戲運營，公益無盈利，請理性消費 -\r\n";
    let selected = npc.askMenu(selStr);
    switch (selected) {
        case 1:
            stage.runScript("expand/menu/贊助中心/充值入口")
            whileStage = false;
            break;
        case 2:
            stage.runScript("expand/menu/贊助中心/兌換樂豆點券");
            whileStage = false;
            break;
        case 3:
            stage.runScript("expand/menu/贊助中心/新累充勳章");
            whileStage = false;
            break;
        case 4:
            npc.say("累充額度每增加#r 500 #k,每日在線獲得的#b 點券 #k增加#r 1%#k\r\n您當前的在線獎勵加成為: #r#e" + parseInt(getHyPay(3) / 500) + "%");
            whileStage = false;
            break;
        case 5:
            // TODO 需要重寫
            whileStage = false;
            break;
        case 6:
            whileStage = false;
            stage.runScript("expand/menu/贊助中心/首充禮包");
            break;
        case 7:
            stage.runScript("expand/menu/贊助中心/月卡辦理");
            whileStage = false;
            break;
        case 8:
            let sql = "select * from zsf_vip where account_id = '" + stage.getAccountId() + "';";
            let resVip = db.select(sql);
            if (resVip.length == 0) {
                npc.say("敬請期待");
            } else {
                stage.runScript("expand/menu/贊助中心/zsf會員中心");
            }
            whileStage = false;
            break;
        case 9:
            stage.runScript("expand/menu/贊助中心/累充禮包");
            whileStage = false;
            break;
        case 10:
            stage.runScript("expand/menu/開通VIP")
            whileStage = false;
            break;
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
    var i = -1;
    var sql = "SELECT name,id FROM account WHERE id=" + stage.getAccountId() + " order by name limit 1;";
    var push = db.select(sql);
    if (push.length > 0) {
        var result = push[0];
        var name = result.get("name");
    }

    return name;
}

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}