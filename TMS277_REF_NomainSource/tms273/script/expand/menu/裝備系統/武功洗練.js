var {getPay} = require('vipCommon.js');

let list = [
    [20041, "力量", "6%"],
    [20042, "敏捷", "6%"],
    [20043, "智力", "6%"],
    [20044, "運氣", "6%"],
    [20051, "攻擊力", "7%"],
    [20052, "魔力", "7%"],
    [30041, "力量", "10%"],
    [30042, "敏捷", "10%"],
    [30043, "智力", "10%"],
    [30044, "運氣", "10%"],
    [30045, "最大血量", "10%"],
    [30051, "攻擊力", "10%"],
    [30052, "魔力", "10%"],
    [32601, "攻擊首領怪時的傷害", "12%"],
    [20041, "力量", "6%"],
    [20042, "敏捷", "6%"],
    [20043, "智力", "6%"],
    [20044, "運氣", "6%"],
    [20051, "攻擊力", "7%"],
    [20052, "魔力", "7%"],
    [30041, "力量", "10%"],
    [30042, "敏捷", "10%"],
    [30043, "智力", "10%"],
    [30044, "運氣", "10%"],
    [30045, "最大血量", "10%"],
    [30052, "魔力", "10%"],
    [20044, "運氣", "6%"],
    [20051, "攻擊力", "7%"],
    [20052, "魔力", "7%"],
    [30041, "力量", "10%"],
    [30042, "敏捷", "10%"],
    [30043, "智力", "10%"],
    [30044, "運氣", "10%"],
    [30045, "最大血量", "10%"],
    [32601, "攻擊首領怪時的傷害", "12%"],
    [32601, "攻擊首領怪時的傷害", "12%"],
    [30601, "攻擊首領怪時的傷害", "20%"],
    [30602, "攻擊首領怪時的傷害", "30%"]
];


function start() {
    let toDrop = stage.getItemBySlot(-1, -11);
    if (toDrop == null) {
        npc.say("請將要洗鍊的武器穿戴");
    } else if (toDrop.getSoulOptionId() != 9) {
        npc.say("只可洗鍊裝載了武功寶珠的武器");
    } else {
        let str = ``;
        let currentId = toDrop.getSoulOption();
        str += `當前武功潛能: #r ${getDetail(currentId)}#k\r\n`;
        let results = db.select(`select *
                                 from zsf_武功洗鍊存檔
                                 where id = ${toDrop.getId()}
                                   and type = '存檔'
                                 order by time desc`);
        let result;
        if (results.length > 0) {
            result = results[0];
            str += `保存武功潛能: #r ${getDetail(result.get("option"))}#k\r\n`;
        } else {
            str += `保存武功潛能: #r 無#k\r\n`;
        }
        str += `\r\n#b#L0#消耗 150E金幣#l\r\n`;
        str += `#L1#消耗 9000樂豆#l\r\n`;
        str += `#L2#消耗 30000抵用券#l\r\n\r\n`;
        str += `#L4#保存當前潛能(無消耗)#l\r\n`;
        str += `#L5#還原保存的潛能(1E)#l\r\n`;
        let sel = npc.askMenu(str);

        switch (sel) {
            case 0:
                str = `當前武功潛能: #r ${getDetail(currentId)}#k\r\n`;
                str += `是否消耗150E進行洗鍊`;
                if (npc.askYesNo(str) == 1) {
                    if (stage.hasMesos(15000000000)) {
                        let newOption = list[randomNumber = Math.floor(Math.random() * list.length)]
                        db.insert(`insert into zsf_武功洗鍊存檔 (id, option, newOption, type)
                                   values (${toDrop.getId()}, ${currentId}, ${newOption[0]}, '洗鍊')`);
                        stage.loseMesos(15000000000);
                        toDrop.setSoulOption(newOption[0]);
                        stage.updateItemBySlot(-1, -11);
                        let ss = "【武功洗鍊】: 恭喜!玩家 <" + stage.getCharacterName() + ">洗鍊了武功屬性獲得 [" + newOption[1] + " " + newOption[2] + "]";
                        util.broadcastChatMsg(6, ss);
                        npc.say("洗鍊成功！新屬性為\r\n" + "#r" + getDetail(newOption[0]));
                    } else {
                        npc.say("金幣不足，需要150E金幣。");
                    }
                }
                break;
            case 1:
                str = `當前武功潛能: #r ${getDetail(currentId)}#k\r\n`;
                str += `是否消耗9000樂豆進行洗鍊`;
                if (npc.askYesNo(str) == 1) {
                    if (getPay(db, stage, 2) >= 9000) {
                        let newOption = list[randomNumber = Math.floor(Math.random() * list.length)]
                        db.insert(`insert into zsf_武功洗鍊存檔 (id, option, newOption, type)
                                   values (${toDrop.getId()}, ${currentId}, ${newOption[0]}, '洗鍊')`);
                        db.update(`update hypay
                                   set pay =pay + ${-9000}
                                   where accname = '${getAccountName()}';`);
                        toDrop.setSoulOption(newOption[0]);
                        stage.updateItemBySlot(-1, -11);
                        let ss = "【武功洗鍊】: 恭喜!玩家 <" + stage.getCharacterName() + ">洗鍊了武功屬性獲得 [" + newOption[1] + " " + newOption[2] + "]";
                        util.broadcastChatMsg(6, ss);
                        npc.say("洗鍊成功！新屬性為\r\n" + "#r" + getDetail(newOption[0]));
                    } else {
                        npc.say("金幣不足，需要9000樂豆。");
                    }
                }
                break;
            case 2:
                str = `當前武功潛能: #r ${getDetail(currentId)}#k\r\n`;
                str += `是否消耗30000抵用券進行洗鍊`;
                if (npc.askYesNo(str) == 1) {
                    if (stage.getCurrency(2) >= 30000) {
                        let newOption = list[randomNumber = Math.floor(Math.random() * list.length)]
                        db.insert(`insert into zsf_武功洗鍊存檔 (id, option, newOption, type)
                                   values (${toDrop.getId()}, ${currentId}, ${newOption[0]}, '洗鍊')`);
                        stage.modifyCurrency(2, -30000)
                        toDrop.setSoulOption(newOption[0]);
                        stage.updateItemBySlot(-1, -11);
                        let ss = "【武功洗鍊】: 恭喜!玩家 <" + stage.getCharacterName() + ">洗鍊了武功屬性獲得 [" + newOption[1] + " " + newOption[2] + "]";
                        util.broadcastChatMsg(6, ss);
                        npc.say("洗鍊成功！新屬性為\r\n" + "#r" + getDetail(newOption[0]));
                    } else {
                        npc.say("金幣不足，需要30000抵用券。");
                    }
                }
                break;
            case 4:
                str = ``;
                let YN;
                if (results.length > 0) {
                    str = `是否確認保存\r\n`;
                    str += `上次保存的屬性: #r${getDetail(resultget("option"))}#k\r\n`;
                    str += `準備保存的屬性: #r${getDetail(currentId)}#k\r\n`;
                    YN = npc.askYesNo(str);
                } else {
                    str = `是否確認保存\r\n`;
                    str += `上次保存的屬性: #r無#k\r\n`;
                    str += `準備保存的屬性: #r${getDetail(currentId)}#k\r\n`;
                    YN = npc.askYesNo(str);
                }
                if (YN == 1) {
                    // if (player.hasMesos(100000000)) {
                    db.insert(`insert into zsf_武功洗鍊存檔 (id, option, type)
                               values (${toDrop.getId()}, ${currentId}, '存檔')`);
                    stage.loseMesos(100000000);
                    npc.say("保存成功");
                    // } else {
                    //     npc.say("金幣不足，需要100000000金幣。");
                    // }
                }
                break;
            case 5:
                str = ``;
                if (results.length > 0) {
                    str = `是否確認還原\r\n`;
                    str += `保存的屬性: #r${getDetail(resultget("option"))}#k\r\n`;
                    YN = npc.askYesNo(str);
                    if (YN == 1) {
                        if (stage.hasMesos(100000000)) {
                            db.insert(`insert into zsf_武功洗鍊存檔 (id, option, newOption, type)
                                       values (${toDrop.getId()}, ${currentId}, ${resultget("option")},
                                               '還原')`);
                            stage.loseMesos(100000000);
                            toDrop.setSoulOption(resultget("option"));
                            stage.updateItemBySlot(-1, -11);
                            npc.say("還原成功");
                        } else {
                            npc.say("金幣不足，需要100000000金幣。");
                        }
                    }
                } else {
                    npc.say("沒有讀取到保存信息");
                }

                break;
        }


    }
}

start();

function getDetail(option) {
    for (let i in list) {
        if (list[i][0] == option) {
            return `${list[i][1]} ${list[i][2]}`;
        }
    }
    return null;
}

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}