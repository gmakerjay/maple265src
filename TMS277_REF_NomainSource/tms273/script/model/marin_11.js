/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
player = require("check_log");
let marin = {
    0: {
        quest: [
            [450001012, 8641001, 101098],
            [450001112, 8641005, 101099],
            [450002015, 8642011, 101036],
            [450002016, 8642012, 101037],
            [450002001, 8642000, 101032],
            [450002009, 8642005, 101103],
            [450015090, 8642051, 101104],
            [450003410, 8643009, 101041],
            [450003200, 8643001, 101039],
            [450015110, 8642052, 101038]
        ],
        reward: [2023125, 2023126, 2023127, 2023128]
    },

    1: {
        quest: [
            [450005130, 8644002, 101043],
            [450005220, 8644004, 101044],
            [450005430, 8644007, 101045],
            [450005432, 8644009, 101172],
            [450006140, 8644403, 101046],
            [450006210, 8644405, 101047],
            [450006300, 8644407, 101105],
            [450007050, 8644502, 101048],
            [450007110, 8644504, 101049],
            [450007230, 8644509, 101107],
            [450016010, 8642100, 101050],
            [450016040, 8642101, 101051],
            [450016110, 8642103, 101052],
            [450016210, 8642105, 101053],
            [450019120, 8644615, 101054],
            [450019220, 8644617, 101055],
            [450019310, 8644618, 101056],
            [450011420, 8644700, 101109],
            [450011560, 8644707, 101057],
            [450011610, 8644709, 101058],
            [450012020, 8645010, 101059],
            [450012120, 8645011, 101060],
            [450012370, 8645023, 101110],
            [450012440, 8645022, 101061]
        ],
        reward: [2023544, 2023670, 2022870]
    },
    2: {
        quest: [
            [410007014, 8645297, 101288],
            [410007007, 8645294, 101287],
            [410007004, 8645291, 101286],
            [410003120, 8645203, 101070],
            [410003150, 8645204, 101071],
            [410003040, 8645200, 101069],
            [410000840, 8645129, 101067],
            [410000990, 8645133, 101066],
            [410000920, 8645131, 101065],
            [410000700, 8645127, 101064],
            [410000640, 8645126, 101063],
            [410000590, 8645125, 101111],
            [410000520, 8645124, 101062]
        ],
        reward: [2023355, 2023819, 2022179, 2023632]
    }
}
let currentDate = new Date();
let day = currentDate.getDate();
let bute = [];
let double = 1;

start();

function start() {
    bute[0] = stage.getLevel();
    let txt = "每日任務進行中....\r\n";
    txt += "玩家每日可進行參與 #r5 #k次\r\n";
    txt += "擁有下列物品將按照物品對應的次數進行\r\n\r\n";
    txt += "　#i3700663#\t\t\t#i3700662#\t\t\t#i3700661#\r\n";
    txt += "　[ #r6次#k ]\t\t\t[ #r8次#k ]\t\t\t[ #r10次#k ]\r\n\r\n";
    if (bute[0] >= 260) {
        txt += "#r#L2#每日高級任務#l　";
    }
    if (bute[0] >= 230) {
        txt += "#b#L1#每日中級任務#l　";
    }
    if (bute[0] >= 210) {
        txt += "#d#L0#每日初級任務#l\r\n";
    }
    txt += " ";
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
        case 1:
        case 2:
            bute[1] = (sel + 80000);
            bute[2] = marin[sel].quest;
            bute[3] = player.getEventValue(stage, db, "每日效驗_" + bute[1]);
            let count = 5;
            if (stage.hasItem(3700663, 1)) {
                count = 6;
            }
            if (stage.hasItem(3700662, 1)) {
                count = 8;
            }
            if (stage.hasItem(3700661, 1)) {
                count = 10;
            }
            if (bute[3] >= count) {
                npc.meFlip().say("當前模式今日已達到上限");
                return;
            }
            bute[4] = stage.getQuestRecordEx(bute[1], 'day');
            if (bute[4] != day) {
                let questIds = [80000, 80001, 80002];
                for (let questId of questIds) {
                    stage.updateQuestRecordEx(questId, 'day', day);
                    stage.updateQuestRecordEx(questId, 'map', null);
                    stage.updateQuestRecordEx(questId, 'mobs', null);
                    stage.updateQuestRecordEx(questId, 'quest', null);
                    stage.updateQuestRecordEx(questId, 'reward', null);
                    stage.updateQuestRecordEx(questId, 'start', "false");
                }
            }
            if (stage.getQuestRecordEx(bute[1], "start") == "false") {
                let group = [];
                while (group.length < 10) {
                    let randomIndex = Math.floor(Math.random() * bute[2].length);
                    if (group.indexOf(randomIndex) === -1) {
                        group.push(randomIndex);
                    }
                }
                if (!isquest(db, bute[1])) {
                    db.insert("INSERT INTO `marin_quest` (`quest`, `key`) VALUES (" + bute[1] + ", '" + group + "');");
                }
                group = Gquest(db, bute[1]);
                group = group.split(',');
                bute[4] = group[bute[3]];
                bute[5] = bute[2][bute[4]];
                /* 代碼區 */
                txt = "#b每日任務進行中...< #r" + (sel === 0 ? "初級任務" : sel === 1 ? "中級任務" : "高級任務") + "#b >\r\n\r\n";
                txt += "#d任務地圖：#r#m" + bute[5][0] + "#\r\n";
                txt += "#d擊殺目標：#r#o" + bute[5][1] + "#\r\n";
                txt += "#d任務獎勵：#r";
                bute[6] = marin[sel].reward;
                for (let i in bute[6]) {
                    txt += "#i" + bute[6][i] + "# ";
                }
                txt += "\r\n";
                txt += "#r< #b1次#r ~ #b5次#r 隨機一種 #b6次#r ~ #b10次#r 隨機兩種 >\r\n";
                if (sel === 2) {
                    txt += "額外獎勵如下列所示:\r\n#i2636479#x10 #i2636420#*1( 1-10次固定 )\r\n";
                    txt += "#i2439139##i2636421# ( 6-10固定 )\r\n"
                    //txt += "#d額外獎勵 #i1713003# x 10< #b6次 #r~ #b10次 #i2439139# #rx 1 #d>\r\n";
                }
                txt += "\r\n";
                txt += "#d任務狀態：#b未接取任務\r\n";
                txt += "\r\n";
                txt += "#b#L0#接受任務並傳送目標地圖#l\t\t#r#L1#返回主頁#l\r\n";
            } else {
                /* 接受任務狀態 */
                txt = "#b每日任務進行中...< #r" + (sel === 0 ? "初級任務" : sel === 1 ? "中級任務" : "高級任務") + "#b > #d第 #r" + (bute[3] + 1) + "#d 次\r\n\r\n";
                bute[4] = stage.getQuestRecordEx(bute[1], 'day');
                bute[5] = stage.getQuestRecordEx(bute[1], 'map');
                bute[6] = stage.getQuestRecordEx(bute[1], 'mobs');
                bute[7] = stage.getQuestRecordEx(bute[1], 'quest');
                bute[8] = stage.getQuestRecordEx(bute[1], 'reward');
                bute[9] = stage.isQuestCompleted(bute[7]);
                txt += "#d任務地圖：#r#m" + bute[5] + "#\r\n";
                txt += "#d擊殺目標：#r#o" + bute[6] + "#\t" + (bute[9] ? "#g#e已完成#k#n" : "#b< #a" + String(bute[7]) + 1 + "# >") + "\r\n";
                txt += "#d任務獎勵：#r";
                let data = bute[8].split(",");
                for (let i in data) {
                    txt += "#i" + data[i] + "# #z" + data[i] + "# x 1\r\n";
                }
                if (sel === 2) {
                    txt += "額外獎勵如下列所示:\r\n#i2636479#x10 #i2636420#*1( 1-10次固定 )\r\n";
                    txt += "#i2439139##i2636421# ( 6-10固定 )\r\n"
                }
                txt += "\r\n";
                txt += "#b#L2#提交任務#l\t\t#r#L1#返回主頁#l\r\n";
                txt += " ";
            }
            let url = npc.meFlip().askMenu(txt);

            switch (url) {
                case 0:
                    bute[3] = player.getEventValue(stage, db, "每日效驗_" + bute[1]);
                    count = 5;
                    if (stage.hasItem(3700663, 1)) {
                        count = 6;
                    }
                    if (stage.hasItem(3700662, 1)) {
                        count = 8;
                    }
                    if (stage.hasItem(3700661, 1)) {
                        count = 10;
                    }
                    stage.removeQuest(bute[5][2]);
                    stage.startQuest(bute[5][2], 0);
                    bute[7] = getRandomElements(bute[6], (bute[3] > 5 ? 2 : 1));
                    stage.updateQuestRecordEx(bute[1], 'day', day);
                    stage.updateQuestRecordEx(bute[1], 'map', bute[5][0]);
                    stage.updateQuestRecordEx(bute[1], 'mobs', bute[5][1]);
                    stage.updateQuestRecordEx(bute[1], 'quest', bute[5][2]);
                    stage.updateQuestRecordEx(bute[1], 'reward', bute[7]);
                    stage.updateQuestRecordEx(bute[1], 'start', "true");
                    stage.changeMap(bute[5][0], 0);
                    npc.meFlip().say("任務接受成功...請組隊或單人盡快完成挑戰");
                    break;
                case 1:

                    break;

                case 2:
                    bute[3] = player.getEventValue(stage, db, "每日效驗_" + bute[1]);
                    bute[4] = stage.getQuestRecordEx(bute[1], 'day');
                    bute[5] = stage.getQuestRecordEx(bute[1], 'map');
                    bute[6] = stage.getQuestRecordEx(bute[1], 'mobs');
                    bute[7] = stage.getQuestRecordEx(bute[1], 'quest');
                    bute[8] = stage.getQuestRecordEx(bute[1], 'reward');

                    if (!stage.isQuestCompleted(bute[7])) {
                        npc.meFlip().say("抱歉..當前任務還沒有完成");
                        return;
                    } else {
                        let data = bute[8].split(",");
                        for (let i in data) {
                            stage.gainItem(data[i], 1);
                        }
                        if (bute[1] === 80002 && (bute[3] + 1) > 5) {
                            stage.gainItem(2439139, double);
                            stage.gainItem(2636421, double);
                        }
                        if (bute[1] === 80002) {
                            stage.gainItem(2636479, 10 * double);
                            stage.gainItem(2636420, 1 * double);
                        }

                        stage.updateQuestRecordEx(bute[1], 'map', null);
                        stage.updateQuestRecordEx(bute[1], 'mobs', null);
                        stage.updateQuestRecordEx(bute[1], 'quest', null);
                        stage.updateQuestRecordEx(bute[1], 'reward', null);
                        stage.updateQuestRecordEx(bute[1], 'start', "false");
                        player.addEventValue(stage, db, "每日效驗_" + bute[1]);
                        bute[3] = player.getEventValue(stage, db, "每日效驗_" + bute[1]);
                        if (bute[3] > 5) {
                            util.broadcastWorldChatMsg(0x18, " < 每日任務 > 恭喜玩家 " + stage['characterName'] + " 第 " + (bute[3]) + " 次完成了每日任務!獲得了大量獎勵!!");
                        }
                    }
                    break;
            }
            break;
    }
}

function isquest(db, questID) {
    var query = "SELECT COUNT(*) AS count FROM `marin_quest` WHERE `quest` = " + questID + " LIMIT 1;";
    var ret = db.select(query);
    var count = ret[0].get("count");
    return count > 0;
}

function Gquest(db, questID) {
    var query = "SELECT * FROM `marin_quest` WHERE `quest` = '" + questID + "' LIMIT 0,1;";
    var ret = db.select(query);
    return ret[0].get("key");
}

function getRandomElements(arr, x) {
    var randomElements = [];
    for (let i = 0; i < x; i++) {
        var randomIndex = Math.floor(Math.random() * arr.length);
        var randomElement = arr[randomIndex];
        randomElements.push(randomElement);
    }

    return randomElements;
}

module.exports = {
    execute: execute
};
