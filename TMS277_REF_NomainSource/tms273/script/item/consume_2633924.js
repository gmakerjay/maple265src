let type = ctx.getDataId();
let needNum = 1;
let title = "神兵降世";
let haveMoney = 0;
let laba = 100;

let items = Array(
    Array(1004812, 1, 100), Array(1004811, 1, 100), Array(1004810, 1, 100),
    Array(1004809, 1, 100), Array(1004808, 1, 100), Array(1053067, 1, 100),
    Array(1053066, 1, 100), Array(1053065, 1, 100), Array(1053064, 1, 100),
    Array(1053063, 1, 100), Array(1152200, 1, 40), Array(1152199, 1, 40),
    Array(1152198, 1, 40), Array(1152197, 1, 40), Array(1152196, 1, 40),
    Array(1082699, 1, 100), Array(1082698, 1, 100), Array(1082697, 1, 100),
    Array(1082696, 1, 100), Array(1082695, 1, 100), Array(1102944, 1, 100),
    Array(1102943, 1, 100), Array(1102942, 1, 100), Array(1102941, 1, 100),
    Array(1102940, 1, 100), Array(1073162, 1, 100), Array(1073161, 1, 100),
    Array(1073160, 1, 100), Array(1073159, 1, 100), Array(1073158, 1, 100)
);

let showItems1 = Array(
    1004812, 1004811, 1004810, 1004809, 1004808, 1053067, 1053066,
    1053065, 1053064, 1053063, 1152200, 1152199, 1152198, 1152197,
    1152196, 1082699, 1082698, 1082697, 1082696, 1082695, 1102944,
    1102943, 1102942, 1102941, 1102940, 1073162, 1073161, 1073160,
    1073159, 1073158
);

while (true) {
    switch (type) {
        default:
            title = "神秘之影|防具隨機禮盒";
            haveMoney = parseInt(stage.getItemQuantity(type));
            break;
    }

    let str = "\t\t\t#fs16##r#e" + title + "#fs12##n\r\n";
    str += "\r\n#d開啟后隨機獲得以下#r全部裝備#b中的任意1個:\r\n#r【神秘】防具:\r\n";
    for (let i = 0; i < showItems1.length; i++) {
        str += "#r#v" + showItems1[i] + "##z " + showItems1[i] + "#\r\n";
    }
    str += "\t\t\t#b#n是否現在直接開啟？\r\n";
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
                util.broadcastWeatherEffectNotice(
                    "≡" + title + "≡  恭喜 " + stage.getCharacterName() + " 從中獲得【" + util.getItemName(rewardId) + "】!",
                    184, 10000, true
                );
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
    let sql = "select name from accounts where id=" + stage.getAccountId() + " limit 1;";
    let push = db.select(sql);
    if (push.length > 0) {
        return push[0].get("name");
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
        db.insert("INSERT INTO hypay (accname, name) VALUES ('" + acc + "', '" + stage.getCharacterName() + "')");
        return getHyPay(type);
    }
    return 0;
}

function gainHyPay(count) {
    let acc = getAccountName();
    db.update("update hypay set pay = pay + " + count + " where accname = '" + acc + "'");
}
