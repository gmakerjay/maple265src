/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
const payUtils = require('constant/payUtils');
let log = require('check_log');
let icon = require('icon');
let casual = {
     60: [
        [2, 500],
    ],
    120: [
        [2, 500]
    ],
    180: [
        [2, 500]
    ],
	240: [
        [2, 500]
    ],
	300: [
        [2, 1000]
    ],
	360: [
        [2, 1000]
    ],
	480: [
        [1, 400],
		[0, 1],
		[3, 2636884,4],
		[3, 4009547,30],
		[3, 5060048,2]
    ]
}

execute();

function execute() {
    let txt = "您今天在時長為：#r" + stage.getOnlineTime() + `#k 分鐘 ${stage.getVipLevel() >= 2 ? '#r您擁有VIP,可直接領取#k' : ''}\r\n`;
    txt += "提示：#r23:50 #k至#r 00:10#k 時無法領取在線獎勵。\r\n";
    txt += "請在 #r23:50#k 分前領取當天獎勵，以免造成損失~\r\n\r\n";
    for (let i in casual) {
        if (log.getEventValue(stage, db, "在線禮包_" + i) > 0) {
            txt += "#L" + i + "##e#d領取在線#r" + i + "分鐘#d獎勵(已領取)#l\r\n";
        } else {
            txt += "#L" + i + "##e#d領取在線#r" + i + "分鐘#d獎勵#l\r\n";
        }
    }
    let sel = npc.meFlip().askMenu(txt);

    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if ((hour == 23 && (minute >= 50 && minute <= 59)) || (hour == 0 && (minute >= 0 && minute <= 10))) {
        npc.say("#d服務器當前時間： #r" + hour + " 時 " + minute + " 分 #k\r\n\r\n#d提示#n#k：#r23 ： 50 #b至#r 00 ： 10 #b時無法領取在線獎勵。#k");
        return;
    }
    if (log.getEventValue(stage, db, "在線禮包_" + sel) > 0) {
        npc.meFlip().say("這個禮包已經領取過了");
        return;
    }
    txt = "";
    txt += icon.entry[2][1] + "\r\n";
    txt += "#k在線#r[" + sel + "]#k分鐘\r\n\r\n";
    txt += icon.entry[4][1] + "\r\n";
    let bute = casual[sel];
    for (let i in bute) {
        switch (bute[i][0]) {
            case 0:
                txt += "#k楓幣：#r" + bute[i][1] + " 億\r\n";
                break;
            case 1:
                txt += "#k樂豆：#r" + bute[i][1] + "\r\n";
                break;
            case 2:
                txt += "#k楓點：#r" + bute[i][1] + "\r\n";
                break;
            case 3:
                txt += "#i" + bute[i][1] + "# #z" + bute[i][1] + "# [" + bute[i][2] + "個]\r\n";
                break;
        }
    }
    if (npc.meFlip().askYesNo(txt)) {
        if (stage.getOnlineTime() < sel && stage.getVipLevel() < 2) {
            npc.meFlip().say("你的遊戲時間沒有達到 " + sel);
            return;
        }
        log.addEventValue(stage, db, "在線禮包_" + sel);
        for (let i in bute) {
            switch (bute[i][0]) {
                case 0:
                    stage.gainMesos(bute[i][1] * 1E8);
                    break;
                case 1:
                            payUtils.gainPay(2, bute[i][1], stage, db, "在綫獎勵", "在綫獎勵");
                    break;
                case 2:
                    stage.modifyCurrency(2, bute[i][1]);
                    break;
                case 3:
                    stage.gainItem(bute[i][1], bute[i][2]);
                    break;
            }
        }
        npc.meFlip().say("領取成功");
        execute();
    }
}
