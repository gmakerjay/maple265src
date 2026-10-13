const type = ctx.getDataId(); // 道具ID或貨幣類型
const needNum = 1;
const title = "怪物公園";
const laba = 10000;

const items = [
   [1182016, 1000, 1], [1182156, 1000, 1], [1182155, 1000, 1], [1182019, 1000, 1],
   [1182006, 1000, 1], [1182011, 1000, 1], [1182263, 1000, 1], [1182192, 1000, 1],
   [1182182, 1000, 1], [1182154, 1000, 1], [1182069, 1000, 1], [1182067, 1000, 1],
   [5062024, 3000, 5], [5062009, 4000, 5], [5062010, 4000, 5], [5062500, 4000, 5],
[5743003, 4000, 5], [5062031, 4000, 5], [5062026, 4000, 5]
];

const showItems1 =  [1182000, 1182017, 1182016, 1182156, 1182155, 1182019, 1182006, 1182011, 1182263, 1182192, 1182182, 1182154, 1182069, 1182067, 1182153, 1182143, 2022530, 2432474, 5062024, 5062009, 5062010, 5062500, 5743003, 5062031, 5062026, 5570000];

function start() { 
    let haveMoney = getBalance(type);

    while (true) {
        let msg = `\t\t\t#fs16##r#e${title}#fs12##n\r\n`;
        msg += `\r\n#d可隨機獲得以下#r物品#b中的任意1個:\r\n`;
        msg += showItems1.map(id => `#v${id}#`).join(" ") + "\r\n\r\n #b#n是否現在直接開啟？\r\n";

        if (npc.askYesNo(msg) !== 1) break;

        if (!hasEnough(type, needNum)) {
            npc.say(`您的 ${title} 不足，無法抽取`);
            break;
        }

        const selected = roll(items);
        if (!selected || !stage.canHold(selected[0], selected[2])) {
            npc.say("無法抽取物品，請清理背包空間");
            break;
        }

        consume(type, needNum);
        if (selected[2] <= laba) {
            stage.gainItem(selected[0], selected[2]);
        } else {
            stage.gainItem(selected[0], selected[2]);
        }

        npc.say(`抽取成功！獲得 #v${selected[0]}##r#z${selected[0]}# x ${selected[2]}`);
    }
}

function getBalance(type) {
    switch (type) {
        case 1:
        case 2:
            return stage.getCurrency(2);
        case 3:
            return stage.getMesos();
        case 4:
            return getHyPay(1);
        default:
            return stage.getItemQuantity(type);
    }
}

function hasEnough(type, amount) {
    switch (type) {
        case 1:
        case 2:
            return stage.getCurrency(2) >= amount;
        case 3:
            return stage.hasMesos(amount);
        case 4:
            return getHyPay(1) >= amount;
        default:
            return stage.hasItem(type, amount);
    }
}

function consume(type, amount) {
    switch (type) {
        case 1:
        case 2:
            stage.modifyCurrency(2, -amount);
            break;
        case 3:
            stage.loseMesos(amount);
            break;
        case 4:
            updateHyPay(-amount);
            break;
        default:
            stage.loseItem(type, amount);
            break;
    }
}

function getHyPay(mode) {
    const acc = getAccountName();
    const result = db.select(`SELECT *
                              FROM hypay
                              WHERE accname = '${acc}'`);
    if (result.length === 0) {
        db.insert(`INSERT INTO hypay (accname, name)
                   VALUES ('${acc}', '${stage.getCharacterName()}')`);
        return 0;
    }
    return parseInt(result[0].get(mode === 1 ? "pay" : mode === 2 ? "payUsed" : "payReward"));
}

function updateHyPay(change) {
    db.update(`UPDATE hypay
               SET pay = pay + ${change}
               WHERE accname = '${getAccountName()}'`);
}

function getAccountName() {
    const result = db.select(`SELECT name
                              FROM accounts
                              WHERE id = ${stage.getAccountId()}
                              LIMIT 1`);
    return result.length > 0 ? result[0].get("name") : "";
}

function roll(pool) {
    const total = pool.reduce((acc, item) => acc + item[1], 0);
    let rand = Math.random() * total;
    for (var item of pool) {
        rand -= item[1];
        if (rand < 0) return item;
    }
    return null;
}

start();