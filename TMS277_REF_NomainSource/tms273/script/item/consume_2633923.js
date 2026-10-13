let type = ctx.getDataId();
let needNum = 1;
let title = "神兵降世";
let haveMoney = 0;
let laba = 100;
let items = Array(
    Array(1214018, 1, 100),
    Array(4310217, 1, 100),
    Array(1592020, 1, 100),
    Array(1212120, 1, 100),
    Array(1222113, 1, 100),
    Array(1232113, 1, 100),
    Array(1242121, 1, 100),
    Array(1242122, 1, 100),
    Array(1252098, 1, 100),
    Array(1262039, 1, 100),
    Array(1302343, 1, 100),
    Array(1312203, 1, 100),
    Array(1322255, 1, 100),
    Array(1332279, 1, 100),
    Array(1342104, 1, 100),
    Array(1362140, 1, 100),
    Array(1372228, 1, 100),
    Array(1382265, 1, 100),
    Array(1402259, 1, 100),
    Array(1412181, 1, 100),
    Array(1422189, 1, 100),
    Array(1432218, 1, 100),
    Array(1442274, 1, 100),
    Array(1214018, 1, 100),
    Array(1452257, 1, 100),
    Array(1462243, 1, 100),
    Array(1472265, 1, 100),
    Array(1482221, 1, 100),
    Array(1492235, 1, 100),
    Array(1522143, 1, 100),
    Array(1532150, 1, 100),
    Array(1542117, 1, 100),
    Array(1552119, 1, 100),
    Array(1582023, 1, 100),
    Array(1272017, 1, 100),
    Array(1282017, 1, 100)
);

let showItems1 = Array(
    1212120, 1222113, 1232113, 1242121, 1242122, 1252098,
    1262039, 1302343, 1312203, 1322255, 1332279, 1342104,
    1362140, 1372228, 1382265, 1402259, 1412181, 1422189,
    1432218, 1442274, 1214018, 1452257, 1462243, 1472265,
    1482221, 1492235, 1522143, 1532150, 1542117, 1552119,
    1582023, 1272017, 1282017
);

while (true) {
    switch (type) {
        default:
            title = "神秘之影|武器隨機禮盒";
            haveMoney = parseInt(stage.getItemQuantity(type));
            break;
    }
    let str = "\t\t\t#fs16##r#e" + title + "#fs12##n\r\n";
    str += "\r\n#d開啟后隨機獲得以下#r全部裝備#b中的任意1個:\r\n#r【神秘】武器:\r\n";
    for (let i = 0; i < showItems1.length; i++) {
        str += "#r#v" + showItems1[i] + "##z " + showItems1[i] + "#\r\n";
    }
    str += "				#b#n是否現在直接開啟？\r\n";
    let YN = npc.askYesNo(str);
    if (YN == 1) {
        let canGet = false;
        if (type != 3 && haveMoney >= needNum) {
            canGet = true;
        } else if (type == 3 && stage.hasMesos(needNum)) {
            canGet = true;
        }
        if (canGet) {
            let random = Math.floor(Math.random() * 100);
            let finalItems = Array();
            for (let i = 0; i < items.length; i++) {
                if (random < items[i][2]) finalItems.push(items[i]);
            }
            let random1 = Math.floor(Math.random() * finalItems.length);
            let rewardId = finalItems[random1][0];
            let rewardQty = finalItems[random1][1];
            if (stage.canHold(rewardId, rewardQty)) {
                switch (type) {
                    case 1:
                        stage.modifyCurrency(1, -needNum);
                        break;
                    case 2:
                        stage.modifyCurrency(2, -needNum);
                        break;
                    case 3:
                        stage.loseMesos(needNum);
                        break;
                    case 4:
                        gainHyPay(-needNum);
                        break;
                    default:
                        stage.loseItem(type, needNum);
                        break;
                }
                let toDrop = util.makeItem(rewardId, rewardQty);
                toDrop.setAttribute(8);
                stage.gainItem(toDrop);
                util.broadcastWeatherEffectNotice("≡" + title + "≡  恭喜 " + stage.getCharacterName() + " 從中獲得【" + util.getItemName(rewardId) + "】!", 184, 10000, true);
                npc.say("抽取成功！獲得#v" + rewardId + "##r#z" + rewardId + "# x " + rewardQty);
            } else {
                npc.say("無法抽取物品，請清理背包");
            }
        } else {
            npc.say("您的" + title + "不足！無法抽取");
            break;
        }
    } else {
        break;
    }
}

function getAccountName() {
    let sql = "select name from accounts where id = " + stage.getAccountId() + " limit 1";
    let result = db.select(sql);
    if (result.length > 0) {
        return result[0].get('name');
    }
    return null;
}

function getHyPay(type) {
    let acc = getAccountName();
    let sql = "select * from hypay where accname = '" + acc + "'";
    let result = db.select(sql);
    if (result.length > 0) {
        if (type == 1) return parseInt(result[0].get("pay"));
        if (type == 2) return parseInt(result[0].get("payUsed"));
        if (type == 3) return parseInt(result[0].get("payReward"));
    } else {
        db.insert("insert into hypay (accname, name) values ('" + acc + "', '" + stage.getCharacterName() + "')");
        return getHyPay(type);
    }
    return 0;
}

function gainHyPay(count) {
    let acc = getAccountName();
    db.update("update hypay set pay = pay + " + count + " where accname = '" + acc + "'");
}
