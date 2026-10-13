/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
player = require("check_log");
money = require("marin_7");
let marin = [
    ["超能月卡", 298, [
        [5062802, 28],
        [2702007, 28],
        [5743003, 18],
        [5062026, 18],
        [5062507, 18],
        [5062031, 18],
        [5062512, 18],
        [2636688, 3],
        [4009548, 90],
        [2048761, 1],
        [2433972, 3]
    ]]
]

execute();

function execute() {
    let txt = "月卡中心\r\n\r\n";
    for (let i in marin) {
        txt += "#L" + i + "#" + marin[i][0] + "#l　";
    }
    txt += "\r\n ";
    let sel = npc.meFlip().askMenu(txt);

    txt = '#b' + marin[sel][0] + " #r" + marin[sel][1] + " #b星語幣 " + (player.getEventValue(stage, db, "超能月卡_" + sel) > 0 ? "( #r已購買#b )" : "") + "\r\n";
    txt += "#d當前已領 #r" + player.getEventValue(stage, db, "超能月卡_" + sel + "_day") + " #d( #b30次 每日限領1次#d )\r\n";
    txt += "#d現在購買立即給下列物品\r\n";
    for (let i in marin[sel][2]) {
        txt += "#i" + marin[sel][2][i][0] + "# x " + marin[sel][2][i][1] + " ";
    }
    txt += "\r\n ";
    if (player.getEventValue(stage, db, "超能月卡_" + sel) > 0) {
        txt += "#L1#領取每日獎勵#l\r\n";
    } else {
        txt += "#L0#立即購買月卡#l\r\n";
    }
    let url = npc.meFlip().askMenu(txt);

    switch (url) {
        case 0:
            if (money.get(stage, db) < marin[sel][1]) {
                npc.meFlip().say("抱歉..你沒有 " + marin[sel][1] + " 星語幣");
                return;
            }
            if (npc.meFlip().askYesNo("確認立即購買當前月卡禮包嗎?") == 1) {
                money.add(stage, db, -marin[sel][1]);
                player.addEventValue(stage, db, "超能月卡_" + sel, 1, 30);
                npc.meFlip().say("恭喜~購買成功~");
                execute();
            }
            break;

        case 1:
            if (player.getEventValue(stage, db, "超能月卡_" + sel) > 0) {
                if (player.getEventValue(stage, db, "超能月卡_" + sel + "_day") >= 30) {
                    npc.meFlip().say("抱歉..今日領取已達上限");
                    return;
                }
                if (player.getEventValue(stage, db, "超能月卡_日效驗_" + sel) > 0) {
                    npc.meFlip().say("抱歉..今日領過了");
                    return;
                }
                for (let i in marin[sel][2]) {
                    stage.gainItem(marin[sel][2][i][0], marin[sel][2][i][1]);
                }
                player.addEventValue(stage, db, "超能月卡_" + sel + "_day", 1, 30);
                player.addEventValue(stage, db, "超能月卡_日效驗_" + sel);
                npc.meFlip().say("恭喜~領取成功~!");
                execute();
            }
            break;
    }
}