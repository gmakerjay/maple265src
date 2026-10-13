/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
const log = require('check_log');
const t1 = "#fUI/UIWindowPL.img/HiddenTales/title#";
const eff1 = "#fEffect/CharacterEff/1112924/0/0#";
const eff2 = "#fEffect/CharacterEff/1112925/0/0#";
const chance = 20; // 額外抽到東西的機率

const prizeList = [
    [5062010, 10],
    [5062507, 10],
    [5743003, 10],
    [5062020, 5],
    [5062026, 3],
    [4310132, 1000],
];

const bossList = [
    "dragon_rider",
    "通關玩具組隊",
    "party1",
    "prison_break",
	"pirate",
];

const questList = ['q2', 'q3', 'q4', 'w3', 'w4'];

const bossListNum = [1, 1, 1, 1, 1];
const bossListName = [
    "御龍魔組隊",
    "玩具塔組隊",
    "廢棄組隊",
    "逃脫組隊",
	"海盜船組隊",
];

function start() {
    let openList = {
        q1: 0,
        q2: 1,
        q3: 1,
        q4: 1,
        w1: 0,
        w2: 0,
        w3: 1,
		w4: 1,
    };

    let str = "#b完成以下副本,即可領取以下獎勵(賬號每天一次):\r\n#r" + "獎勵抵用券 3000，樂豆 500 隊長1000 #v2637494# X1個\r\n\r\n" +
        "                #r#e達成需要次數：#n\r\n";

    let passType = 0;

    for (let i = 0; i < bossList.length; i++) {
        if (openList[questList[i]] === 0) {
            continue;
        }
        let count = (log.getEventValue(stage, db, bossList[i]));
        str += `\r\n#b${bossListName[i]} 目前通關 #r${count} #b次 需要通關 #r${bossListNum[i]} #b次 #g(${count < bossListNum[i] ? "未達成" : "已達成"})`;
        if (count < bossListNum[i]) {
            passType++;
        }
    }

    if (passType > 0 ) {
        npc.say(str + "\r\n#r#e您不滿足領取條件");
    } else {
        const YN = npc.askYesNo(str);
        if (YN === 1) {
            if (log.getEventValue(stage, db, "新一條龍組隊") > 0) {
                npc.say("今日此賬號已領取過獎勵");
            } else {
                const needSlot = 1;

                if (stage.getFreeSlot(1) < needSlot || stage.getFreeSlot(2) < needSlot ||
                    stage.getFreeSlot(3) < needSlot || stage.getFreeSlot(4) < needSlot ||
                    stage.getFreeSlot(5) < needSlot) {
                    npc.say("請清理揹包");
                } else {
                    let passCount = 0;

                    if (passCount > 0 && !stage.isGm()) {
                        npc.say("過夜了");
                    } else {
                        log.addEventValue(stage, db, "新一條龍組隊", 1, 1);
                        const date = new Date();
                        const month = date.getMonth() + 1;
                        log.addEventValue(stage, db, `章-${month}-exp`, 10, -1);
                        stage.gainItem(2637494, 1); // 活動幣
                        stage.modifyCurrency(2, 3000);
                        
                        if (log.getEventValue(stage, db, "組隊隊長值") >= 3) {
                            ld = 1000;
                        }
                        stage.modifyCurrency(1, ld);
                        util.broadcastChatMsg(6, `組隊全勤獎 : ${stage.getCharacterName()} 完成今日的全部組隊任務！`);
                        if (ld === 1000) {
                            util.broadcastChatMsg(6, `勤勞隊長獎 : ${stage.getCharacterName()} 今日勤勞帶隊，額外獲得1000樂豆！`);
                        }
                        npc.say("恭喜您組隊全勤獎！");
                    }
                }
            }
        }
    }
}

start();

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}