
var z = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var xx = "#fEffect/CharacterEff/1082565/4/0#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var eff = "#fEffect/CharacterEff/1082565/2/0#";
var vvv = "#fUI/Basic/BtHide3/mouseOver/0#";
var vvv4 = "#fUI/UIWindow4/PQRank/rank/gold#";//小皇冠
var z1 = "#fEffect/ItemEff/1112811/0/0#";//黃金音符
var eff4 = "#fEffect/CharacterEff/1112925/0/0#";//小紅心
function start() {
    let myVipCoin = getRMBVIP();
    let str = ``;
    str += "#fs12#" + vvv + "#d 星語VIP幣 #r" + myVipCoin + "\r\n"


    str += "#b#L0#" + z + ` ${stage.getVipLevel() >= 2 ? '領取寶箱' : (myVipCoin >= 3688 ? '開通VIP ' : '我要贊助')}#l  #L1#` + z + " 功能介紹#l\r\n"
    // str += "#b#L3#" + z + " 跑商掃蕩#l  #L4#" + z + " 捉鬼掃蕩#l  #L6#" + z + " 其他功能#l\r\n";
    // var selStr = "#fs14##fn宋體#\r\n";
    // let label1 = "#L1#" + eff4 + "[我要贊助]#l"; // 充值入口
    // let label4 = "#L4#" + eff4 + "[累充福利]#l"; // 現金兌換
    // let label7 = "#L7#" + eff4 + "[月卡贊助]#l"; // 累充禮包

    // let label2 = "#L2#" + eff4 + "[幣種轉換]#l"; // 會員辦理
    // let label5 = "#L5#" + eff4 + "[購買等級]#l"; // 會員介紹
    // let label8 = "#L8#" + eff4 + "[戰令系統]#l"; // 會員中心

    // let label3 = "#L3#" + eff4 + "[累充勳章]#l"; // 月卡辦理
    // let label6 = "#L6#" + eff4 + "[首充禮包]#l"; // 月卡介紹
    // let label9 = "#L9#" + eff4 + "[累計禮包]#l"; // 累充禮包

    str += "\r\n\r\n#k#fs11#- 激活VIP需要3688星語VIP幣,需要單獨贊助,無法用其他資源兌換 -\r\n";
    let sel = npc.askMenu(str)
    switch (sel) {
        case 0:
            if (stage.getVipLevel() >= 2) {
                if (stage.getItemQuantity(2639189) > 0) {
                    npc.say(`您當前擁有#v${2639189}:i##z${2639189}:i# x 1\r\n不需要重新領取`)
                } else {
                    stage.gainItem(2639189, 1)
                    npc.say('領取成功')
                }
            } else {
                if (myVipCoin >= 3688) {
                    if (npc.askYesNo('是否確認激活永久VIP') == 1) {
                        db.insert(`INSERT INTO zz_rmb_vip (account, rmb, paytime, remark) VALUES ('${getAccountName()}', -3688, now(), 'VIP');`);
                        db.update(`update cash_vip set level = 2, start_date = now() where account_id = ${stage.getAccountId()} `)
                        stage.gainItem(2639189, 1);
                        stage.gainItem(5060007, 10)
                        npc.say('恭喜您開通永久VIP,請切換任意頻道一次,VIP將會生效')
                    }
                } else {
                    stage.openURL("http://app.sxzbd.com/pay/tfqg")
                    let test = npc.defText("http://app.sxzbd.com/pay/tfqg").minLen(0).maxLen(100).askText("\r\n如果沒自動彈出充值網站,請手動複製鏈接\r\n掃碼贊助後自動到賬\r\n#r請注意,購買VIP的贊助鏈接商品為星語VIP, 價格為3688");
                }
            }
            break;
        case 1:
            str = `親愛的冒險家,金牌VIP的功能如下:\r\n`;
            str += `1.可掃蕩200級以内的BOSS\r\n`
            str += `2.可掃蕩[史烏][頓凱爾]普通難度,以及[威爾]困難\r\n`
            str += `3.可掃蕩組隊任務\r\n`
            str += `4.可掃蕩捉鬼任務\r\n`
            str += `5.可掃蕩沙漠跑商任務(每日一次,獲取50000沙漠貨幣)\r\n`
            str += `6.可掃蕩捉鬼任務\r\n`
            str += `7.可掃蕩道場(每個月需要有一周手動挑戰,保存這個月的最佳紀錄,這個月内可以直接掃蕩按照保存的記錄直接完成道場)\r\n`
            str += `8.開通VIP時還會獲取系統支援的 #v${5060007}:i# x 10\r\n`
            str += `9.每日的在線獎勵可直接完成\r\n`
            npc.say(str)
            break;
    }
}






function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}

function getRMBVIP() {
    var sql = " select sum(rmb) rmb from zz_rmb_vip where    account =  '" + getAccountName() + "' ";
    var resultList = db.select(sql);
    var coin = 0;
    if (null != resultList) {
        for (var i = 0; i < resultList.length; i++) {
            var result = resultList[i];
            if (result == null) {
                break;
            }
            coin = result.get("rmb");
            break;
        }
    }
    if (coin == null) {
        coin = 0;
    }
    return coin;
}

start();