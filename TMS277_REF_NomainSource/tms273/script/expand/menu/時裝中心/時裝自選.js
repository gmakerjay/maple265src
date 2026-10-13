/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let xiaoxingxing = "#fEffect/CharacterEff/1073453/0/0#";
let xing = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";

var filter = [1802653,
    1003843, 1012626, 1032234, 1022286, 1703119, 1703004, 1702925, 1082553, 1103113, 1102604, 1051547, 1050480,
    1102963, 1113220, 1112941, 3700341, 3700342, 3700343, 3700344, 3700345, 3700346, 3700347, 1115012, 1115013,
    1115014, 1115100, 1115101, 1115102, 1102142, 1102872, 1102873, 1102982, 1115140, 1115153, 1112734, 1103041,
    1103141, 1102511, 1102723, 1102724, 1114400, 1033000, 1114402, 1032261, 1113220, 1114401, 1122334,
    1114400,
    1114300,
    1122296,
    1113298,
    1114317,
    1113299,
    1112918,
    1114000, 1003843, 1082553, 1073773, 1102604, 1114403, 1703407,
    1053704,
    1103113,
    1005782,
    1005365,
    1003889,
    1005300,
    1005299,
    1005298,
    1005297,
    1001124,
    1000101,
    1703219,
    1703119,
    1703004,
    1103462,
    1103361,
    1103257,
    1006015,
    1005840,
    1005541,
    1114000, 1112918, 1113299, 1114317, 1703397
]


const whiteList = [1103189];

var menus = [
    [170, '武器', "抵用券"],
    [100, '帽子', "抵用券"],
    [110, '披風', "抵用券"],
    [105, '套服', "抵用券"],
    [104, '上衣', "抵用券"],
    [106, '褲裙', "抵用券"],
    [107, '鞋子', "抵用券"],
    [108, '手套', "抵用券"],
    [101, '前額', "抵用券"],
    [102, '眼飾', "抵用券"],
    [103, '耳飾', "抵用券"],
    [109, '副手', "抵用券"],
    [111, '戒指', "抵用券"],
    [180, '寵裝', "抵用券"],
    [502, '飛鏢', "抵用券"],
    [580, '變身', "抵用券"]
    // [501,'特效',"點券"]

]
let log = require('check_log');
var sb = "#d\t\t\t\t" + xiaoxingxing + "時裝自選" + xiaoxingxing + "#l\r\n";
// sb += "當前抵用券: #r" + player.getEventValue("時裝積分") + "#k\r\n";
sb += "當前抵用券: #r" + stage.getCurrency(2) + "#k\r\n";

for (var i = 0; i < menus.length; i++) {
    if (undefined != menus[i][3] && menus[i][3] != "") {
        sb += "#r" + menus[i][3] + "#d\r\n"
    }
    sb += "#L" + i + "##d" + xing + menus[i][1] + "#l#k#n   "
    if ((i + 1) % 4 == 0) {
        sb += "\r\n\r\n"
    }
}
sb += "#r#L999#" + xing + "時裝名字,或者代碼id自選#l"
let menu_index = npc.askMenu(sb);

let 擁有資產 = 0;
// let 使用單位 = menu_index==999?"點券":menus[menu_index][2];
let 使用單位 = menu_index == 999 ? "點券" : menus[menu_index][2];
let 每頁多少條 = 100;
let 總業數 = 1;
let 當前頁數 = 1;
let itemlist;

if (menu_index == 999) {
    自選時裝()
} else {
    if (使用單位 == "點券") {
        擁有資產 = stage.getCurrency(2);
    } else if (使用單位 == "抵用券") {
        擁有資產 = stage.getCurrency(2);
    } else if (使用單位 == "金幣") {
        擁有資產 = stage.getMesos();
    } else if (使用單位 == "時裝積分") {
        擁有資產 = log.getEventValue(stage, db, "時裝積分");
        util.log(擁有資產);
    }
    let demo = require("constant/遊戲商店/時裝商店/" + menus[menu_index][1]);
    itemlist = demo.itemlistall;

    總業數 = Math.ceil((itemlist.length / 每頁多少條));
    當前頁數 = 1;
    分頁(當前頁數)
}

function 分頁(當前頁數) {
    var sb = "#d\t\t\t\t" + xiaoxingxing + menus[menu_index][1] + "時裝商店" + xiaoxingxing + "#l\r\n";
    sb += "  " + 使用單位 + ":#r" + 擁有資產 + "#d\r\n"
    sb += "  當前第:" + 當前頁數 + "頁,總共：" + 總業數 + "頁,每頁显示:" + 每頁多少條 + "條\r\n"
    if (當前頁數 != 總業數) {
        sb += "  #L99999#下一頁#l ";
    }
    if (當前頁數 != 1 && 當前頁數 > 1) {
        sb += "  #L99998#上一頁#l ";
    }
    sb += "\r\n"
    let 显示數量 = itemlist.length < 當前頁數 * 每頁多少條 ? itemlist.length : 當前頁數 * 每頁多少條;
    for (var i = (當前頁數 - 1) * 每頁多少條; i < 显示數量; i++) {
        //#k"+nbsp(sh.getItemName(itemlist[i][0]),23) +"
        // let item = sh.makeItemWithId(itemlist[i]);
        // if (item.getPad() < 10) {
        //     continue;
        // }
        sb += "#L" + i + "##v" + itemlist[i] + ":i##r ";
        if ((i + 1) % 5 == 0) {
            sb += "\r\n"
        }
    }
    let index = npc.askMenu(sb);
    if (index == 99999) {
        分頁(當前頁數 + 1)
    } else if (index == 99998) {
        分頁(當前頁數 - 1)
    } else {
        let itemid = itemlist[index];
        let priceA = 1500;
        let priceB = 100;

        let toDrop = util.makeItem(itemid, 1);


        let noCheck = [502, 580, 166].includes(Math.floor(itemid / 10000)); 
        // if (util.isCashItem(toDrop.getItemId()) && whiteList.indexOf(toDrop.getItemId()) == -1) {
        //     npc.say("該時裝為套裝時裝,目前無法購買.如想購買可發送ID給群主,驗證強度合理后可買");
        //     return;
        // } else 
        
        if (filter.indexOf(toDrop.getItemId()) != -1) {
            npc.say("該時裝在禁止售賣列表中.");
            return;
        } else if (!noCheck &&(Math.floor(toDrop.getItemId() / 10000) != 180 && (toDrop.getBaseStr() > 0 || toDrop.getMad() > 0 || toDrop.getBaseDex() > 0 || toDrop.getBaseInt() > 0 || toDrop.getBaseLuk() > 0 || toDrop.getPad() > 0))) {
            npc.say("該時裝為套裝時裝,目前無法購買.如想購買可發送ID給群主,驗證強度合理后可買");
            return;
        }

        var sb = "#d\t\t\t\t" + xiaoxingxing + menus[menu_index][1] + "時裝商店" + xiaoxingxing + "#l\r\n";
        sb += "  " + 使用單位 + ":#r" + 擁有資產 + "#d\r\n"
        sb += "  您確定要兌換#v" + itemid + ":i##t" + itemid + ":i# ?"
        if (menus[menu_index][1] == "寵裝") {
            sb += "\r\n #L0# 免費來一個#l"
        } else if (menus[menu_index][1] == "寵裝") {
            sb += "\r\n #L0# 免費來一個#l"
            priceA = 1500;
        } else {
            sb += "\r\n #L0# 免費來一個 (無屬性)#l"
            // sb += "\r\n #L1# 100積分(6維10)#l"
        }
        let sel = npc.askMenu(sb)

        if (!stage.canHold(itemid, 1)) {
            npc.say("您的背包空間不足,無法裝下#v" + itemid + ":i##t" + itemid + ":i#");
            return;
        }
        switch (sel) {
            case 0:
                // if (擁有資產 < priceA) {
                //     npc.say("抵用券不足。");
                // } else {
                //     // player.addEventValue("時裝積分", -priceA, -1);
                //     player.modifyCashShopCurrency(2, -priceA);
                stage.gainItem(itemid, 1);
                npc.say("恭喜您獲得時裝:#v" + itemid + ":i##t" + itemid + ":i#快去試試效果吧！");
                // }
                break;
            // case 1:
            //     if (擁有資產 < priceB) {
            //         npc.say("積分不足，時裝積分可通過分解時裝獲得。");
            //     } else {
            //         player.addEventValue("時裝積分", -priceB, -1);
            //         let newItem = player.makeItemWithId(itemid);
            //         newItem.setDex(Math.floor(Math.random() * 21) + 10);
            //         newItem.setStr(Math.floor(Math.random() * 21) + 10);
            //         newItem.setInt(Math.floor(Math.random() * 21) + 10);
            //         newItem.setLuk(Math.floor(Math.random() * 21) + 10);
            //         newItem.setMad(Math.floor(Math.random() * 21) + 10);
            //         newItem.setPad(Math.floor(Math.random() * 21) + 10);
            //         player.gainItem(newItem);
            //         npc.say("恭喜您獲得時裝:#v"+itemid+":i##t"+itemid+":i#快去試試效果吧！");
            //     }
            //     break;
        }
    }
}

function 自選時裝() {
    let list0 = [];
    let list1 = [];
    let list2 = [];
    let rs = db.select(`select *
                        from zsf_暖暖申請表`);
    if (rs.length > 0) {
        for (let i in rs) { 
            switch (parseInt(rs[i].get("status"))) {
                case 0:
                    list0.push(parseInt(rs[i].get("item_id")));
                    break;
                case 1:
                     
                    list1.push(parseInt(rs[i].get("item_id")));
                    break;
                case 2:
                    list2.push(parseInt(rs[i].get("item_id")));
                    break;
            }
        }

    } 
    var name = npc.defText("").minLen(1).maxLen(20).askText("請輸入您想要的道具名稱或者代碼id(剔除所有函屬性時裝)")
    var selection = npc.askMenu(searchItem(name))
    var toDrop = util.makeItem(selection, 1); 
    if (whiteList.indexOf(toDrop.getItemId()) == -1 && !list1.includes(toDrop.getItemId())) {
        if (list2.includes(toDrop.getItemId())) {
            npc.say("該時裝為套裝時裝,目前無法購買.如想購買可發送ID給群主,驗證強度合理后可買\r\n(經審核該裝備不可自選)");
        } else if (list0.includes(toDrop.getItemId())) {
            npc.say("該時裝為套裝時裝,目前無法購買.如想購買可發送ID給群主,驗證強度合理后可買\r\n(該裝備正在申請中)");
        } else {
            if (npc.askYesNo(`該時裝為套裝時裝,目前無法購買.如想購買可發送ID給群主,驗證強度合理后可買\r\n是否提交屬性點裝購買申請\r\n請勿惡意提交`) == 1) {
                db.insert(`insert into zsf_暖暖申請表(item_id, status, item_name, player_id, player_name)
                           values (${toDrop.getItemId()}, 0, '${util.getItemName(toDrop.getItemId())}',
                                   ${stage.getCharacterId()},
                                   '${stage.getCharacterName()}')`);
                npc.say("申請成功");
            }
        }
        return;
    } else if (filter.indexOf(toDrop.getItemId()) != -1 && !list1.includes(toDrop.getItemId())) {

        let s1 = `該時裝在禁止售賣列表中.`;
        if (list2.includes(toDrop.getItemId())) {
            npc.say(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n(經審核該裝備不可自選)`);
        } else if (list0.includes(toDrop.getItemId())) {
            npc.say(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n(該裝備正在申請中)`);
        } else {
            if (npc.askYesNo(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n是否提交屬性點裝購買申請\r\n請勿惡意提交`) == 1) {
                db.insert(`insert into zsf_暖暖申請表(item_id, status, item_name, player_id, player_name)
                           values (${toDrop.getItemId()}, 0, '${util.getItemName(toDrop.getItemId())}',
                                   ${stage.getCharacterId()},
                                   '${stage.getCharacterName()}')`);
                npc.say("申請成功");
            }
        }
        return;
    } else if (!list1.includes(toDrop.getItemId()) && Math.floor(toDrop.getItemId() / 10000) != 180 && (toDrop.getStr() > 0 || toDrop.getMad() > 0 || toDrop.getDex() > 0 || toDrop.getInt() > 0 || toDrop.getLuk() > 0 || toDrop.getPad() > 0)) {

        let s1 = `屬性時裝不出售!`;
        if (list2.includes(toDrop.getItemId())) {
            npc.say(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n(經審核該裝備不可自選)`);
        } else if (list0.includes(toDrop.getItemId())) {
            npc.say(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n(該裝備正在申請中)`);
        } else {
            if (npc.askYesNo(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n是否提交屬性點裝購買申請\r\n請勿惡意提交`) == 1) {
                db.insert(`insert into zsf_暖暖申請表(item_id, status, item_name, player_id, player_name)
                           values (${toDrop.getItemId()}, 0, '${util.getItemName(toDrop.getCharacterId())}',
                                   ${stage.getId()},
                                   '${stage.getCharacterName()}')`);
                npc.say("申請成功");
            }
        }
        return;
    } else if (!list1.includes(toDrop.getItemId()) && whiteList.indexOf(toDrop.getItemId()) == -1) {
        let s1 = `該時裝為套裝時裝,目前無法購買.!`;
        if (list2.includes(toDrop.getItemId())) {
            npc.say(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n(經審核該裝備不可自選)`);
        } else if (list0.includes(toDrop.getItemId())) {
            npc.say(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n(該裝備正在申請中)`);
        } else {
            if (npc.askYesNo(`${s1}.如想購買可發送ID給群主,驗證強度合理后可買\r\n是否提交屬性點裝購買申請\r\n請勿惡意提交`) == 1) {
                db.insert(`insert into zsf_暖暖申請表(item_id, status, item_name, player_id, player_name)
                           values (${toDrop.getItemId()}, 0, '${util.getItemName(toDrop.getItemId())}',
                                   ${stage.getCharacterId()},
                                   '${stage.getCharacterName()}')`);
                npc.say("申請成功");
            }
        }
        return;
    } else if (!stage.canHold(selection, 1)) {
        npc.say("背包空間不足");
        return;
    } else {
        var modeSel = 1;
        if (modeSel == 1) {
            let price = 1;
            var sb = "#d\t\t\t\t" + xiaoxingxing + "時裝商店" + xiaoxingxing + "#l\r\n";
            sb += "  點券:#r" + stage.getCurrency(2) + "#d\r\n"
            sb += "  您確定要花費抵用券:" + price + ",購買#v" + selection + ":i##t" + selection + ":i# ?"
            var yes = npc.askYesNo(sb)
            if (yes == 1) {
                // if (stage.getCurrency(2) >= price) {
                // player.modifyCashShopCurrency(2, -price);
                stage.gainItem(selection, 1);

                npc.say("恭喜您獲得時裝:#v" + selection + ":i##t" + selection + ":i#快去試試效果吧！");
                // npc.say("兌換成功了！");
                // } else {
                //     npc.say("對不起，你沒有足夠的抵用券。");
                // }
            }
        } else {
            //試穿
            // var timeStamp = java.lang.System.currentTimeMillis();
            // var toDrop = player.makeItemWithId(selection);
            // toDrop.setExpiration(timeStamp+60*1000*5);
            // player.gainItem(toDrop);
            // npc.say("好啦,您擁有5分鐘的試穿時間。");
        }

    }

}


//獲取商店列表
function searchItem(item) {
    item = item.replace(/.*([';]+|(--)+).*/, "").replace(/([%'_\\])/g, "\\$1");
    let sql = isNaN(item)
        ? `SELECT itemid, typed
           FROM \`zz_時裝清洗表\`
           WHERE itemname LIKE '%${item}%'
           LIMIT 50`
        : `SELECT itemid, typed
           FROM \`zz_時裝清洗表\`
           WHERE itemid LIKE '%${item}%'
           LIMIT 50`;

    let resultList = db.select(sql);
    let sb = `您搜索[#r${item}#k]的結果如下:\r\n`;
    for (let rs of resultList) {
        sb += `#d#L${rs.get("itemid")}##v${rs.get("itemid")}:i##t${rs.get("itemid")} ##r[${rs.get("typed")}]\r\n`;
    }
    return sb;
}