/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

icon = require('alice_icon');
const payUtils = require('constant/PayUtils.js');
option = require("option_tabulation");
let attribute_table = {
    //"id": [false, "唯一ID"],
    "title": [true, "頭銜"],
    "ruc": [true, "可提升"],
    "cuc": [true, "已提升"],
    "baseStr": [true, "力量"],
    "baseDex": [true, "敏捷"],
    "baseInt": [true, "智力"],
    "baseLuk": [true, "運氣"],
    "maxHp": [true, "血量"],
    "maxMp": [true, "藍量"],
    "pad": [true, "物攻"],
    "mad": [true, "魔攻"],
    "pdd": [false, "防禦"],
    "craft": [false, "手技"],
    "speed": [true, "移速"],
    "jump": [true, "跳躍"],
    "attribute": [false, "屬性"],
    "levelUpType": [false, "類型"],
    "incSkill": [false, "技能"],
    "level": [false, "等級"],
    "exp": [false, "經驗"],
    "durability": [false, "耐久"],
    "iuc": [true, "黃金錘"],
    "puc": [true, "白金錘"],
    "pvpDamage": [false, "大亂鬥"],
    "reduceReq": [false, "降低等級"],
    "specialAttribute": [false, "特殊屬性"],
    "durabilityMax": [false, "最大耐久"],
    "incReq": [false, "提升使用等級"],
    "growthEnchant": [false, "特殊技能"],
    "enchant": [false, "附魔屬性"],
    "bossDamageR": [true, "首領傷害"],
    "ignorePdr": [true, "無視防御"],
    "damageR": [true, "傷害提升"],
    "statRate": [true, "所有屬性"],
    "cuttable": [false, "是否分解"],
    "exGradeOption": [true, "星火屬性"],
    "itemState": [false, "狀態"],
    "euc": [true, "卓越_可提升"],
    "reuc": [true, "卓越_已提升"],
    "excelStr": [true, "卓越_力量"],
    "excelDex": [true, "卓越_敏捷"],
    "excelInt": [true, "卓越_智力"],
    "excelLuk": [true, "卓越_幸運"],
    "excelMaxHp": [true, "卓越_血量"],
    "excelMaxMp": [true, "卓越_模量"],
    "excelPad": [true, "卓越_物攻"],
    "excelMad": [true, "卓越_魔攻"],
    "excelPdd": [true, "卓越_防禦"],
    "excelCraft": [true, "卓越_手技"],
    "excelSpeed": [true, "卓越_移速"],
    "excelJump": [true, "卓越_跳躍"],
    "grade": [true, "潛能屬性"],
    "chuc": [true, "星之力"],
    "option1": [false, "潛能一"],
    "option1Lv": [false, "Lv潛能一"],
    "option2": [false, "潛能二"],
    "option2Lv": [false, "Lv潛能二"],
    "option3": [false, "潛能三"],
    "option3Lv": [false, "Lv潛能三"],
    "option4": [false, "附加一"],
    "option4Lv": [false, "Lv附加一"],
    "option5": [false, "附加二"],
    "option5Lv": [false, "Lv附加二"],
    "option6": [false, "附加三"],
    "option6Lv": [false, "Lv附加三"],
    "skin": [false, "鐵砧"],
    "socketGrade": [false, "插槽"],
    "socket1": [false, "寶石插槽_1"],
    "socket2": [false, "寶石插槽_2"],
    "socket3": [false, "寶石插槽_3"],
    "color": [false, "顏色"],
    "soulOptionId": [true, "靈魂序列"],
    "soulSocket": [true, "靈魂插槽"],
    "soulOption": [true, "靈魂能力"],
    "arc": [false, "秘法力量"],
    "arcExp": [false, "秘法經驗"],
    "arcLevel": [false, "秘法等級"],
    "aut": [false, "真實力量"],
    "autExp": [false, "真實經驗"],
    "autLevel": [false, "真實等級"]
}
let genre = [
    ["裝備", true, 1, null],
    ["消耗", true, 2, null],
    ["其他", false, 4, null],
    ["裝飾", false, 3, null],
    ["特殊", false, 5, [5743003, 5062020, 5062021, 5062026, 5062009, 5062500,]],
    ["時裝", true, 6, null]
]
let purse = [
    ["星語幣", true],
    ["樂豆", true],
    ["楓點", true],
    ["楓幣", true]
]
let commission = 10;
execute();

function execute() {
    let txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
    txt += " " + series(1) + "#d 玩家可在此自由寄售#b 裝備 時裝 消耗材料等..#d\r\n";
    txt += " " + series(2) + "#d 不可寄售#b 封印 時限#d 等物品\r\n";
    txt += " " + series(3) + "#d 賣家寄售物品時會進行#r 管理員審核 審核通過才會公示\r\n";
    txt += "　#L0##fc0xFFCD8162#" + icon.entry[2][1] + " 寄售中心 " + icon.entry[2][1] + "#l\t\t#L1##fc0xFFFF6347#" + icon.entry[2][1] + " 個人管理 " + icon.entry[2][1] + "#l\r\n\r\n";
    if (stage.isGm()) {
        txt += "\t\t\t #L999##fc0xFFFF0000#" + icon.entry[2][1] + " 管理員審核 " + icon.entry[2][1] + "#l\r\n";
    }
    txt += " ";
    let sel = npc.meFlip().askMenu(txt);

    txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
    txt += " " + icon.entry[3][1] + "#d 星語幣 : #b" + formatCurrency(parseInt(payUtils.getPay(1, db, stage))) + "\r\n";
    txt += " " + icon.entry[3][1] + "#d 樂　豆 : #b" + formatCurrency(parseInt(payUtils.getPay(2, db, stage))) + "\r\n";
    txt += " " + icon.entry[3][1] + "#d 楓　點 : #b" + formatCurrency(stage.getCurrency(2)) + "\r\n";
    txt += " " + icon.entry[3][1] + "#d 楓　幣 : #b" + formatCurrency(stage.getMesos()) + "\r\n\r\n";
    switch (sel) {
        case 0:
            txt += "#fc0xFF698B22##L0#閱覽寄售信息#l　#L1#快速定位編碼#l　#L2#我的周期記錄#l\r\n";
            txt += " ";
            let sel_0 = npc.meFlip().askMenu(txt);
            txt = "請選擇你想查詢寄售的類型\r\n\r\n";
            for (let i in genre) {
                if (genre[i][1]) {
                    txt += "#fc0xFF00688B##L" + i + "#" + genre[i][0] + "#l ";
                }
            }
            let sel_0_0 = npc.meFlip().askMenu(txt);
            while (true) {
                txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
                ret = db.select("SELECT * FROM `alice_action` WHERE `stat` = '0' AND `equip` = '" + genre[sel_0_0][2] + "' AND `startdate` >= DATE_SUB(NOW(), INTERVAL 48 HOUR) LIMIT 0, 1000;");
                if (ret.length <= 0) {
                    npc.meFlip().say("當前類型沒有任何寄售的物品");
                    return;
                }
                for (let i in ret) {
                    txt += "#L" + i + "##d[ #r" + marinString(" ", 4, String(ret[i].get("id")).toString()) + "#d ] #b" + marinString(" ", 12, String(ret[i].get("cname")).toString()) + "#d #z" + ret[i].get("itemid") + "##l\r\n";
                }
                let sel_0_1 = npc.meFlip().askMenu(txt);

                txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
                txt += "\t#L0#購買物品#l\t #i" + ret[sel_0_1].get("itemid") + "#\t#L1#返回查詢#l #L2#留言#l\r\n\r\n";
                txt += "#d寄售玩家 : #r" + ret[sel_0_1].get("cname") + "\r\n";
                txt += "#d寄售時間 : #r" + Entering(ret[sel_0_1].get("startdate")) + "\r\n";
                txt += "#d寄售信息 : #z" + ret[sel_0_1].get("itemid") + "#\r\n";
                txt += "#d寄售金額 : #r" + ret[sel_0_1].get("money") + " #d<#b " + (ret[sel_0_1].get("type") == 0 ? "星語幣" : ret[sel_0_1].get("type") == 1 ? "樂豆" : ret[sel_0_1].get("type") == 2 ? "楓點" : "楓幣") + " #d>\r\n";
                switch (parseInt(ret[sel_0_1].get('equip'))) {
                    case 1:
                    case 6:
                        txt += "\t\t\t\t#r屬性如下列所示\r\n";
                        if (ret[sel_0_1].get('chuc') > 0) {
                            txt += " #fc0xFFFFD700#";
                            for (let i = 1; i <= ret[sel_0_1].get('chuc'); i++) {
                                txt += "★";
                            }
                        }
                        txt += "\r\n";
                        for (let i in attribute_table) {
                            if (attribute_table[i][0]) {
                                txt += "#fc0xFF00CD66#" + marinString(" ", 11, attribute_table[i][1].toString()) + " : #fc0xFFEEB422#" + marinString(" ", 15, String(ret[sel_0_1].get(i)).toString());
                            }
                        }
                        txt += "\r\n\t\t\t\t\t#fc0xFF00CD66#潛能詳情\r\n\r\n";
                        if (ret[sel_0_1].get("option1") > 0) {
                            txt += "#r潛能 [ 1 ] :#b" + option.tabulation[ret[sel_0_1].get("option1")][parseInt(util.getItemReqLevel(ret[sel_0_1].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_0_1].get("option2") > 0) {
                            txt += "#r潛能 [ 2 ] :#b" + option.tabulation[ret[sel_0_1].get("option2")][parseInt(util.getItemReqLevel(ret[sel_0_1].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_0_1].get("option3") > 0) {
                            txt += "#r潛能 [ 3 ] :#b" + option.tabulation[ret[sel_0_1].get("option3")][parseInt(util.getItemReqLevel(ret[sel_0_1].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_0_1].get("option4") > 0) {
                            txt += "#r附加 [ 1 ] :#b" + option.tabulation[ret[sel_0_1].get("option4")][parseInt(util.getItemReqLevel(ret[sel_0_1].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_0_1].get("option5") > 0) {
                            txt += "#r附加 [ 2 ] :#b" + option.tabulation[ret[sel_0_1].get("option5")][parseInt(util.getItemReqLevel(ret[sel_0_1].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_0_1].get("option6") > 0) {
                            txt += "#r附加 [ 3 ] :#b" + option.tabulation[ret[sel_0_1].get("option6")][parseInt(util.getItemReqLevel(ret[sel_0_1].get("itemid")) / 10)] + "\r\n";
                        }
                        break;
                    default:
                        txt += "#d寄售數量 : #r" + ret[sel_0_1].get("num") + "\r\n\r\n";
                        txt += "\t\t#b購買時請注意背包有多餘的空位\r\n";
                        break;
                }
                let sel_0_2 = npc.meFlip().askMenu(txt);

                switch (sel_0_2) {
                    case 0:
                        if (npc.meFlip().askYesNo("\r\n\r\n\t#r確認購買當前物品嗎?")) {
                            let ret_2 = db.select("SELECT * FROM `alice_action` WHERE `id` = '" + ret[sel_0_1].get('id') + "' AND `stat` = '0' LIMIT 0,1;");
                            if (ret_2.length <= 0) {
                                npc.meFlip().say("真可惜..被人搶先一步購買了!");
                                return;
                            }
                            if (parseInt(ret_2[0].get("aid")) == stage.getAccountId()) {
                                npc.meFlip().say("抱歉..不允許購買自己寄售的物品");
                                return;
                            }
                            let fostsolt = [1, 2, 3, 4, 5, 6];
                            for (let i in fostsolt) {
                                if (stage.getFreeSlot(fostsolt[i]) < 1) {
                                    npc.meFlip().say("請給背包內所有空間空出 1 個位置");
                                    return;
                                }
                            }
                            switch (parseInt(ret_2[0].get("type"))) {
                                case 0:
                                    if (payUtils.getPay(1, db, stage) < parseInt(ret_2[0].get("money"))) {
                                        npc.meFlip().say("真可惜..你沒有 " + parseInt(ret_2[0].get("money")) + " 星語幣!");
                                        return;
                                    }
                                    payUtils.gainPay(1, -ret_2[0].get("money"), stage, db, "寄售", "扣除");
                                    break;
                                case 1:
                                    if (payUtils.getPay(2, db, stage) < parseInt(ret_2[0].get("money"))) {
                                        npc.meFlip().say("真可惜..你沒有 " + parseInt(ret_2[0].get("money")) + " 樂豆!");
                                        return;
                                    }
                                    payUtils.gainPay(2, -ret_2[0].get("money"), stage, db, "寄售", "扣除");
                                    break;
                                case 2:
                                    if (stage.getCurrency(2) < parseInt(ret_2[0].get("money"))) {
                                        npc.meFlip().say("真可惜..你沒有 " + parseInt(ret_2[0].get("money")) + " 楓點!");
                                        return;
                                    }
                                    stage.modifyCurrency(2, -ret_2[0].get("money"));
                                    break;
                                case 3:
                                    if (stage.getMesos() < parseInt(ret_2[0].get("money"))) {
                                        npc.meFlip().say("真可惜..你沒有 " + parseInt(ret_2[0].get("money")) + " 楓幣!");
                                        return;
                                    }
                                    stage.loseMesos(-ret_2[0].get("money"));
                                    break;
                            }
                            switch (parseInt(ret_2[0].get('equip'))) {
                                case 1:
                                case 6:
                                    if (db.insert("INSERT INTO `auction_info` (`account_id`, `seller_id`, `seller`, `buyer_id`, `buyer` , `type`, `state`, `expire_date`, `start_date`, `deal_date` , `item_id`, `item_type`, `item_entity_id`) VALUES (" + ret_2[0].get('aid') + ", " + ret_2[0].get('cid') + ", '" + ret_2[0].get('cname') + "', " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "' , 1, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP() , " + ret_2[0].get('itemid') + ", " + ret_2[0].get('num') + ", " + ret_2[0].get('onlyid') + ");") == 1) {
                                        query = db.select("SELECT `id` FROM `auction_info` WHERE `item_entity_id` = '" + ret_2[0].get('onlyid') + "' ORDER BY `id` DESC LIMIT 1;");
                                        db.insert("INSERT INTO `auction_log` (`world_id`, `account_id`, `character_id`, `auction_id`, `item_id`, `state`, `price`, `date`, `deposit`, `quantity`, `type`) VALUES (0, " + stage.getAccountId() + ", " + stage.getCharacterId() + ", " + query[0].get('id') + ", " + ret_2[0].get('itemid') + ", 2, 0, CURRENT_TIMESTAMP(), 0, " + ret_2[0].get('num') + ", 1)");
                                        db.insert("INSERT INTO `item_slot` (`id`, `owner_id`, `world_id`, `own_type`, `item_type`, `slot`) VALUES (" + ret_2[0].get("onlyid") + ", " + ret_2[0].get("cid") + ", 0, 3, 1, 0)");
                                        db.update("UPDATE `alice_action` SET `stat` = 1 WHERE `id` = " + ret_2[0].get("id") + ";");
                                        //db.insert("INSERT INTO `alice_action_log` (`state`, `aid`, `cid`, `cname`, `buyer_id`, `buyer_name`, `onlyid`, `itemid`, `itemname`, `num`) VALUES (-2, " + ret_2[0].get('aid') + ", " + ret_2[0].get('cid') + ", '" + ret_2[0].get('cname') + "', " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + ret_2[0].get('id') + ", " + ret_2[0].get('itemid') + ", '" + util.getItemName(ret_2[0].get('itemid')) + "', " + ret_2[0].get('num') + ");");
                                    }
                                    npc.meFlip().say("購買成功!前往 拍賣行 --> 完成 --> 領取");
                                    break;
                                default:
                                    stage.gainItem(ret_2[0].get('itemid'), ret_2[0].get('num'));
                                    db.update("UPDATE `alice_action` SET `stat` = 1 WHERE `id` = " + ret_2[0].get("id") + ";");
                                    //db.insert("INSERT INTO `alice_action_log` (`state`, `aid`, `cid`, `cname`, `buyer_id`, `buyer_name`, `onlyid`, `itemid`, `itemname`, `num`) VALUES (-2, " + ret_2[0].get('aid') + ", " + ret_2[0].get('cid') + ", '" + ret_2[0].get('cname') + "', " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + ret_2[0].get('id') + ", " + ret_2[0].get('itemid') + ", '" + util.getItemName(ret_2[0].get('itemid')) + "', " + ret_2[0].get('num') + ");");
                                    npc.meFlip().say("購買成功!請到背包內查看!");
                                    break;
                            }
                            return;
                        }
                        break;
                    case 2:
                        txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
                        txt += "請輸入你想給賣家留言的信息 ( #b所有人可見#k ) 需審核\r\n\r\n"
                        let notice = npc.meFlip().minLen(2).maxLen(100).defText("").askText(txt);
                        break;
                }
            }
            break;

        case 1:
            txt += "#fc0xFF698B22##L0#寄售物品#l　#L1#我的倉庫#l　#L2#寄售日誌#l #L3#寄售結算#l\r\n";
            txt += " ";
            let sel_1 = npc.meFlip().askMenu(txt);

            txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
            switch (sel_1) {
                case 0:
                    txt += "#d請選擇你想寄售的類型 ( #r期限 封印 等系列不能寄售#d )\r\n";
                    for (let i in genre) {
                        if (genre[i][1]) {
                            txt += "#fc0xFF00688B##L" + i + "#" + genre[i][0] + "#l ";
                        }
                    }
                    txt += "\r\n ";
                    let sel_1_0 = npc.meFlip().askMenu(txt);

                    consign(sel_1_0);
                    break;

                case 1:
                    txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
                    txt += "#fc0xFF698B22##L0#審核未通過#l　#L1#超時寄售#l\r\n";
                    let sel_1_1 = npc.meFlip().askMenu(txt);
                    while (true) {
                        txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
                        switch (sel_1_1) {
                            case 0:
                                query = db.select("SELECT * FROM `alice_action` WHERE `aid` = '" + stage.getAccountId() + "' AND `stat` = '-2' LIMIT 0,1000;");
                                break;

                            case 1:
                                query = db.select("SELECT * FROM `alice_action` WHERE (`stat` = '-1' OR `stat` = '0') AND `aid` = " + stage.getAccountId() + " AND `startdate` < DATE_SUB(NOW(), INTERVAL 48 HOUR) LIMIT 0, 1000;");
                                break;
                        }
                        if (query.length <= 0) {
                            npc.meFlip().say("抱歉..你目前沒有審核未通過的寄售信息");
                            return;
                        }
                        for (let i in query) {
                            let type = query[i].get("equip");
                            txt += "#L" + i + "##d[ #r" + (type == 1 ? "裝備" : type == 2 ? "消耗" : type == 3 ? "裝飾" : type == 4 ? "其他" : type == 5 ? "特殊" : "時裝") + "#d ] #d[ #b" + marinString(" ", 5, String(query[i].get("num")).toString()) + "#d ] #r#z" + query[i].get("itemid") + "##l\r\n";
                        }
                        let sel_1_1_0 = npc.meFlip().askMenu(txt);

                        if (npc.meFlip().askYesNo("是否領回當前寄售物品?\r\n\r\n請給背包提前空出位置 \r\n\r\n( #r單機 是 默認接受無責背包空間問題自行承擔#k )") == 1) {
                            ret = db.select("SELECT * FROM `alice_action` WHERE `id` = '" + query[sel_1_1_0].get('id') + "' ORDER BY `stat` LIMIT 0,1;");

                            db.update("UPDATE `alice_action` SET `stat` = -3 WHERE `id` = " + ret[0].get('id') + ";");
                            //db.insert("INSERT INTO `alice_action_log` (`state`, `aid`, `cid`, `cname`, `buyer_id`, `buyer_name`, `onlyid`, `itemid`, `itemname`, `num`) VALUES (-3, " + ret[0].get('aid') + ", " + ret[0].get('cid') + ", '" + ret[0].get('cname') + "', " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + ret[0].get('id') + ", " + ret[0].get('itemid') + ", '" + util.getItemName(ret[0].get('itemid')) + "', " + ret[0].get('num') + ");");

                            switch (parseInt(ret[0].get("equip"))) {
                                case 1:
                                case 6:
                                    if (db.insert("INSERT INTO `auction_info` (`account_id`, `seller_id`, `seller`, `buyer_id`, `buyer` , `type`, `state`, `expire_date`, `start_date`, `deal_date` , `item_id`, `item_type`, `item_entity_id`) VALUES (1, 2, '管理員', " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "' , 1, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP() , " + ret[0].get('itemid') + ", " + ret[0].get('num') + ", " + ret[0].get('onlyid') + ");") == 1) {
                                        query = db.select("SELECT `id` FROM `auction_info` WHERE `item_entity_id` = '" + ret[0].get('onlyid') + "' ORDER BY `id` DESC LIMIT 1;");
                                        db.insert("INSERT INTO `auction_log` (`world_id`, `account_id`, `character_id`, `auction_id`, `item_id`, `state`, `price`, `date`, `deposit`, `quantity`, `type`) VALUES (0, " + stage.getAccountId() + ", " + stage.getCharacterId() + ", " + query[0].get('id') + ", " + ret[0].get('itemid') + ", 2, 0, CURRENT_TIMESTAMP(), 0, " + ret[0].get('num') + ", 1)");
                                        db.insert("INSERT INTO `item_slot` (`id`, `owner_id`, `world_id`, `own_type`, `item_type`, `slot`) VALUES (" + ret[0].get("onlyid") + ", " + stage.getCharacterId() + ", 0, 3, 1, 0)");
                                    }
                                    break;
                                default:
                                    stage.gainItem(ret[0].get('itemid'), ret[0].get('num'));
                                    break;
                            }
                            npc.meFlip().say("領回成功\r\n\r\n裝備 or 時裝 前往拍賣行 --> 完成 -->領取");
                        }
                    }
                    break;

                case 3:
                    txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
                    ret = db.select("SELECT type, SUM(money) AS total_money FROM `alice_action` WHERE `aid` = '" + stage.getAccountId() + "' AND `stat` = '1' GROUP BY type;");
                    if (ret.length <= 0) {
                        npc.meFlip().say("抱歉..當前沒有任何信息");
                        return;
                    }
                    let pro = {
                        2434789: 7,
                        2434788: 3
                    }
                    let commissionPercentage = 10;
                    for (let i in pro) {
                        if (stage.hasItem(i, 1)) {
                            commissionPercentage -= pro[i];
                        }
                    }
                    txt += "\t\t#r是否領取下列收益 ( #b默認扣除 " + commissionPercentage + " % 佣金#r )\r\n\r\n";
                    commissionPercentage = commissionPercentage / 100
                    for (let i in ret) {
                        let originalAmount = ret[i].get('total_money');
                        let commissionAmount = originalAmount * commissionPercentage;
                        let finalAmount = Math.floor(originalAmount - commissionAmount);
                        switch (parseInt(ret[i].get('type'))) {
                            case 0:
                                txt += "\t#d星語幣 : #r" + finalAmount + "\r\n";
                                break;
                            case 1:
                                txt += "\t#d樂　豆 : #r" + finalAmount + "\r\n";
                                break;
                            case 2:
                                txt += "\t#d楓　點 : #r" + finalAmount + "\r\n";
                                break;
                            case 3:
                                txt += "\t#d楓　幣 : #r" + finalAmount + "\r\n";
                                break;
                        }
                    }
                    if (npc.meFlip().askYesNo(txt) == 1) {
                        if (stage.getFreeSlot(4) < 3) {
                            npc.meFlip().say("其他欄目請空出至少 3 個空間!");
                            return;
                        }
                        for (let i in ret) {
                            let originalAmount = ret[i].get('total_money');
                            let commissionAmount = originalAmount * commissionPercentage;
                            let finalAmount = Math.floor(originalAmount - commissionAmount);
                            switch (parseInt(ret[i].get('type'))) {
                                case 0:
                                    payUtils.gainPay(1, finalAmount, stage, db, "寄售", "增加");
                                    break;
                                case 1:
                                    payUtils.gainPay(2, finalAmount, stage, db, "寄售", "增加");
                                    break;
                                case 2:
                                    stage.modifyCurrency(2, finalAmount)
                                    break;
                                case 3:
                                    count = calculate(finalAmount);
                                    for (let item in count) {
                                        if (count[item] > 0) {
                                            let itemId = item === 'A' ? 4001716 : item === 'B' ? 4001715 : 4001714;
                                            stage.gainItem(itemId, count[item]);
                                        }
                                    }
                                    break;
                            }
                        }
                        db.update("UPDATE `alice_action` SET `stat` = 2 WHERE `aid` =" + stage.getAccountId() + " AND `stat` = 1;");
                        npc.meFlip().say("領取成功");
                    }
                    break;
            }
            break;

        case 999:
            while (true) {
                txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
                txt += "\t\t\t\t#b請選擇審核的信息\r\n";
                ret = db.select("SELECT * FROM `alice_action` WHERE `stat` = '-1' LIMIT 0,1000;");
                if (ret.length <= 0) {
                    npc.meFlip().say("目前沒有需審核的物品");
                    return;
                }
                for (let i in ret) {
                    txt += "#L" + i + "##d[ #r" + marinString(" ", 4, String(ret[i].get("id")).toString()) + "#d ] #b" + marinString(" ", 12, String(ret[i].get("cname")).toString()) + "#d #z" + ret[i].get("itemid") + "##l\r\n";
                }
                let sel_999 = npc.meFlip().askMenu(txt);

                txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
                txt += "\t　#L0#通過審核#l\t #i" + ret[sel_999].get("itemid") + "#\t#L1#拒絕寄售#l\r\n\r\n";
                txt += "#d寄售玩家 : #r" + ret[sel_999].get("cname") + "\r\n";
                txt += "#d寄售時間 : #r" + Entering(ret[sel_999].get("startdate")) + "\r\n";
                txt += "#d寄售信息 : #z" + ret[sel_999].get("itemid") + "#\r\n";
                txt += "#d寄售金額 : #r" + ret[sel_999].get("money") + " #d<#b " + (ret[sel_999].get("type") == 0 ? "星語幣" : ret[sel_999].get("type") == 1 ? "樂豆" : ret[sel_999].get("type") == 2 ? "楓點" : "楓幣") + " #d>\r\n";
                switch (parseInt(ret[sel_999].get('equip'))) {
                    case 1:
                    case 6:
                        txt += "\t\t\t\t#r屬性如下列所示\r\n";
                        if (ret[sel_999].get('chuc') > 0) {
                            txt += " #fc0xFFFFD700#";
                            for (let i = 1; i <= ret[sel_999].get('chuc'); i++) {
                                txt += "★";
                            }
                        }
                        txt += "\r\n";
                        for (let i in attribute_table) {
                            if (attribute_table[i][0]) {
                                txt += "#fc0xFF00CD66#" + marinString(" ", 11, attribute_table[i][1].toString()) + " : #fc0xFFEEB422#" + marinString(" ", 15, String(ret[sel_999].get(i)).toString());
                            }
                        }
                        txt += "\r\n\t\t\t\t\t#fc0xFF00CD66#潛能詳情\r\n\r\n";
                        if (ret[sel_999].get("option1") > 0) {
                            txt += "#r潛能 [ 1 ] :#b" + option.tabulation[ret[sel_999].get("option1")][parseInt(util.getItemReqLevel(ret[sel_999].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_999].get("option2") > 0) {
                            txt += "#r潛能 [ 2 ] :#b" + option.tabulation[ret[sel_999].get("option2")][parseInt(util.getItemReqLevel(ret[sel_999].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_999].get("option3") > 0) {
                            txt += "#r潛能 [ 3 ] :#b" + option.tabulation[ret[sel_999].get("option3")][parseInt(util.getItemReqLevel(ret[sel_999].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_999].get("option4") > 0) {
                            txt += "#r附加 [ 1 ] :#b" + option.tabulation[ret[sel_999].get("option4")][parseInt(util.getItemReqLevel(ret[sel_999].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_999].get("option5") > 0) {
                            txt += "#r附加 [ 2 ] :#b" + option.tabulation[ret[sel_999].get("option5")][parseInt(util.getItemReqLevel(ret[sel_999].get("itemid")) / 10)] + "\r\n";
                        }
                        if (ret[sel_999].get("option6") > 0) {
                            txt += "#r附加 [ 3 ] :#b" + option.tabulation[ret[sel_999].get("option6")][parseInt(util.getItemReqLevel(ret[sel_999].get("itemid")) / 10)] + "\r\n";
                        }
                        break;
                    default:
                        txt += "#d寄售數量 : #r" + ret[sel_999].get("num") + "\r\n\r\n";
                        break;
                }
                let sel_999_enter = npc.meFlip().askMenu(txt);

                switch (sel_999_enter) {
                    case 0:
                        if (npc.meFlip().askYesNo("\r\n\r\n\t\t\t#r確認通過當前玩家的寄售審核嗎?") == 1) {
                            db.update("UPDATE `alice_action` SET `stat` = 0 WHERE `id` = " + ret[sel_999].get('id') + ";");
                        }
                        break;

                    case 1:
                        if (npc.meFlip().askYesNo("\r\n\r\n\t\t\t#r確認拒絕當前玩家的寄售審核嗎?") == 1) {
                            db.update("UPDATE `alice_action` SET `stat` = -2 WHERE `id` = " + ret[sel_999].get('id') + ";");
                        }
                        break;
                }
                npc.meFlip().say("執行成功");
            }
            break;
    }
}

function consign(type) {
    let txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
    for (let i = 1; i <= 128; i++) {
        let equip = stage.getItemBySlot(genre[type][2], i);
        if (equip == null) continue;
        //if (equip['attribute'] != 0) continue;
        if (equip['expireDate'] !== 3439728000000) continue;
        if (genre[type][2] !== 1 && genre[type][2] !== 2 && genre[type][2] !== 6) {
            if (genre[type][3] != null) {
                if (genre[type][3].indexOf(equip['itemId']) <= -1) continue;
            }
        }
        txt += "#L" + i + "##d寄售位置 [ #r" + marinString(" ", 3, i.toString()) + "#d ] #b#z" + equip['itemId'] + "##l\r\n";
    }
    txt += " ";
    let url = npc.meFlip().askMenu(txt);
    equip = stage.getItemBySlot(genre[type][2], url);
    txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
    for (let i in purse) {
        if (purse[i][1]) {
            txt += "#fc0xFFCD2626##L" + i + "#" + purse[i][0] + "#l\t";
        }
    }
    txt += "\r\n\r\n\r\n";
    txt += "\t\t\t#r預寄售物品個人信息如下列所示\r\n\r\n";
    txt += "\t\t\t\t\t\t#i" + equip['itemId'] + "#\r\n";
    switch (genre[type][2]) {
        case 1:
        case 6:
            if (equip['chuc'] > 0) {
                txt += " #fc0xFFFFD700#";
                for (let i = 1; i <= equip['chuc']; i++) {
                    txt += "★";
                }
            }
            txt += "\r\n\r\n";
            let nature = getnature(genre[type][2], url);
            txt += nature + "\r\n";
            break;
        default:
            txt += "#d擁有數量 : #b" + stage.getItemQuantity(equip['itemId']) + "\r\n";
            break;
    }
    let url_1 = npc.meFlip().askMenu(txt);

    txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
    txt += "#b寄售信息 : #r#i" + equip['itemId'] + "#\r\n";
    txt += "#b寄售類型 : #r" + purse[url_1][0] + "\r\n\r\n";
    txt += "\t\t#r請輸入你想寄售的金額 ( #d默認抽佣 #r" + commission + " %#d )\r\n ";
    let money_num = npc.meFlip().minLen(2).maxLen(12).defText((url_1 == 3 ? 1000000 : 10)).askText(txt);
    if (!isNumeric(money_num)) {
        npc.meFlip().say("抱歉..金額只能純數字!");
        return;
    }
    if (Number(money_num) > 4999 * 1E8) {
        npc.meFlip().say("抱歉..最大金額只能 4999 億");
        return;
    }
    if (url_1 == 3) {
        if (!checkMultipleOfMillion(Number(money_num))) {
            npc.meFlip().say("抱歉..\r\n\r\n楓幣類型最低設價不可低於 100萬 楓幣 最高不能超過 4999億");
            return;
        }
    }
    txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
    txt += "#b寄售信息 : #r#i" + equip['itemId'] + "#\r\n";
    txt += "#b寄售類型 : #r" + purse[url_1][0] + "\r\n";
    txt += "#b寄售金額 : #r" + money_num + "\r\n\r\n";
    txt += "\t\t#r請輸入你想寄售的數量\r\n ";
    let maxnum = npc.meFlip().minNum(1).maxNum((genre[type][2] == 1 ? 1 : genre[type][2] == 6 ? 1 : stage.getItemQuantity(equip['itemId']))).defNum(1).askNumber(txt);

    txt = "\t\t\t" + icon.entry[1][1] + " #fc0xFFCD9B1D##e寄售中心 #n" + icon.entry[1][1] + "\r\n\r\n";
    txt += "#b寄售信息 : #r#i" + equip['itemId'] + "#\r\n";
    txt += "#b寄售類型 : #r" + purse[url_1][0] + "\r\n";
    txt += "#b寄售金額 : #r" + money_num + "\r\n";
    txt += "#b寄售數量 : #r" + maxnum + "\r\n\r\n";
    txt += "\t\t#d默認公示 #r48h#d ( #b管理員審核後公示#d )\r\n\r\n";
    txt += "\t\t\t\t#L999#" + icon.entry[4][1] + "#l\r\n ";
    if (!stage.hasMesos(1E7)) {
        npc.meFlip().say("抱歉..你沒有 1000萬 楓幣不允許上架");
        return;
    }
    let confirm = npc.meFlip().askMenu(txt);
    switch (genre[type][2]) {
        case 1:
        case 6:
            equip['attribute'] = 8;
            stage.updateItemBySlot(genre[type][2], url);

            equip = stage.getItemBySlot(genre[type][2], url);
            let some = "";
            let startAppending = false;
            for (let i in attribute_table) {
                if (i === 'ruc') {
                    startAppending = true;
                }
                if (startAppending) {
                    some += "," + equip[i];
                }
            }
            //db.insert("INSERT INTO `alice_action` (`aid`, `cid`, `cname`, `stat`, `equip`, `money`, `type`, `itemid`, `num`, `onlyid`, `title`) VALUES (" + stage.getAccountId() + ", " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', -1, " + genre[type][2] + ", " + money_num + ", " + url_1 + ", " + equip['itemId'] + ", " + maxnum + ", " + equip['id'] + ", '" + equip['title'] + "');");
            db.insert("INSERT INTO `alice_action` (`aid`, `cid`, `cname`, `stat`, `equip`, `money`, `type`, `itemid`, `num`, `onlyid`, `title`, `ruc`, `cuc`, `baseStr`, `baseDex`, `baseInt`, `baseLuk`, `maxHp`, `maxMp`, `pad`, `mad`, `pdd`, `craft`, `speed`, `jump`, `attribute`, `levelUpType`, `incSkill`, `level`, `exp`, `durability`, `iuc`, `puc`, `pvpDamage`, `reduceReq`, `specialAttribute`, `durabilityMax`, `incReq`, `growthEnchant`, `enchant`, `bossDamageR`, `ignorePdr`, `damageR`, `statRate`, `cuttable`, `exGradeOption`, `itemState`, `euc`, `reuc`, `excelStr`, `excelDex`, `excelInt`, `excelLuk`, `excelMaxHp`, `excelMaxMp`, `excelPad`, `excelMad`, `excelPdd`, `excelCraft`, `excelSpeed`, `excelJump`, `grade`, `chuc`, `option1`, `option1Lv`, `option2`, `option2Lv`, `option3`, `option3Lv`, `option4`, `option4Lv`, `option5`, `option5Lv`, `option6`, `option6Lv`, `skin`, `socketGrade`, `socket1`, `socket2`, `socket3`, `color`, `soulOptionId`, `soulSocket`, `soulOption`, `arc`, `arcExp`, `arcLevel`, `aut`, `autExp`, `autLevel`) VALUES (" + stage.getAccountId() + ", " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', -1, " + genre[type][2] + ", " + money_num + ", " + url_1 + ", " + equip['itemId'] + ", " + maxnum + ", " + equip['id'] + ", '" + equip['title'] + "'" + some + ");");
            query = db.select("SELECT LAST_INSERT_ID() as oyid;");
            //db.insert("INSERT INTO `alice_action_log` (`aid`, `cid`, `cname`, `onlyid`, `itemid`, `itemname`, `num`) VALUES (" + stage.getAccountId() + ", " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + query[0].get('oyid') + ", " + equip['itemId'] + ", '" + util.getItemName(equip['itemId']) + "', " + maxnum + ");");
            stage.removeItemBySlot(genre[type][2], url)
            break;
        default:
            db.insert("INSERT INTO `alice_action` (`aid`, `cid`, `cname`, `stat`, `equip`, `money`, `type`, `itemid`, `num`, `onlyid`) VALUES (" + stage.getAccountId() + ", " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', -1, " + genre[type][2] + ", " + money_num + ", " + url_1 + ", " + equip['itemId'] + ", " + maxnum + ", " + equip['id'] + ");");
            query = db.select("SELECT LAST_INSERT_ID() as oyid;");
            //db.insert("INSERT INTO `alice_action_log` (`aid`, `cid`, `cname`, `onlyid`, `itemid`, `itemname`, `num`) VALUES (" + stage.getAccountId() + ", " + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + query[0].get('oyid') + ", " + equip['itemId'] + ", '" + util.getItemName(equip['itemId']) + "', " + maxnum + ");");
            stage.loseItem(equip['itemId'], maxnum);
            break;
    }
    stage.loseMesos(1E7);
    npc.meFlip().say("上架成功 等待管理員審核 ! ( #r或主動通知管理員#k )");
}

function Entering() {
    const query = `SELECT create_date
                   FROM account
                   WHERE id = '${stage.getAccountId()}' LIMIT 1;`;
    const result = db.select(query);
    const timestamp = result[0].get("create_date");
    const date = new Date(parseInt(timestamp));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getnature(type, site) {
    let txt = "";
    let equip = stage.getItemBySlot(type, site);
    for (let i in attribute_table) {
        if (attribute_table[i][0]) {
            txt += "#fc0xFF00CD66#" + marinString(" ", 11, attribute_table[i][1].toString()) + " : #fc0xFFEEB422#" + marinString(" ", 15, String(equip[i]).toString());
            //stage.dropMessage(0x16, marinString(" ", 15, attribute_table[i][1].toString()) + " : " + equip[i]);
        } else {
            //stage.dropMessage(0x16, marinString(" ", 15, attribute_table[i][1].toString()) + " : " + equip[i]);
        }
    }
    txt += "\r\n\t\t\t\t\t#fc0xFF00CD66#潛能詳情\r\n\r\n";
    if (equip['option1'] > 0) {
        txt += "#r潛能 [ 1 ] :#b" + option.tabulation[equip['option1']][parseInt(util.getItemReqLevel(equip['itemId']) / 10)] + "\r\n";
    }
    if (equip['option2'] > 0) {
        txt += "#r潛能 [ 2 ] :#b" + option.tabulation[equip['option2']][parseInt(util.getItemReqLevel(equip['itemId']) / 10)] + "\r\n";
    }
    if (equip['option3'] > 0) {
        txt += "#r潛能 [ 3 ] :#b" + option.tabulation[equip['option3']][parseInt(util.getItemReqLevel(equip['itemId']) / 10)] + "\r\n";
    }
    if (equip['option4'] > 0) {
        txt += "#r附加 [ 1 ] :#b" + option.tabulation[equip['option4']][parseInt(util.getItemReqLevel(equip['itemId']) / 10)] + "\r\n";
    }
    if (equip['option5'] > 0) {
        txt += "#r附加 [ 2 ] :#b" + option.tabulation[equip['option5']][parseInt(util.getItemReqLevel(equip['itemId']) / 10)] + "\r\n";
    }
    if (equip['option6'] > 0) {
        txt += "#r附加 [ 3 ] :#b" + option.tabulation[equip['option6']][parseInt(util.getItemReqLevel(equip['itemId']) / 10)] + "\r\n";
    }
    return txt;
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function series(int) {
    return "#fUI/Basic/LevelNo/" + int + "#";
}

function checkMultipleOfMillion(count) {
    if (count % 1000000 === 0 && Number.isInteger(count)) {
        return true;
    } else {
        return false;
    }
}

function calculate(count) {
    let A = 1000000000; // 一个代表10亿游戏币
    let B = 100000000; // 一个代表1亿游戏币
    let C = 1000000; // 一个代表100万游戏币

    let numA = Math.floor(count / A);
    let remainingCount = count - numA * A;

    let numB = Math.floor(remainingCount / B);
    remainingCount -= numB * B;

    let numC = Math.floor(remainingCount / C);

    return {
        A: numA,
        B: numB,
        C: numC
    };
}

function loseRMB(rmb, memo) {
    var myAccountName = getAccountName();
    var sql = `insert into zz_rmb(account, rmb, paytime, remark)
               values ('${myAccountName}', ${rmb}, now(), '${memo}')`;
    db.insert(sql);
}