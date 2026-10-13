/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const boss = require('constant/party_boss');
const {getBossEventDay, getBossEventWeek} = require("constant/event");
const log = require('check_log');


const BOSS_LIST2 = [
    // [0, 'Balrog', '蝙 蝠 怪', 'BOSS入口/新手BOSS/', 8830010, 105100100],
    [1, 'Zakum', '扎    昆', 'scriptxxxxxxxxxxxx', 9062133, 211042400, 'Zakum'],
    [2, 'Hontale', '暗黑龍王', 'scriptxxxxxxxxxxxx', 8830010, 240050400, 'Hontale'],
    // [3, 'Hillah', '希    拉', 'scriptxxxxxxxxxxxx', 8830010, 262030000, 'Hilla'],
    [4, 'Pierre', '皮 埃 爾', 'scriptxxxxxxxxxxxx', 8830010, 105200000, 'Piere'],
    [5, 'Banban', '半    半', 'scriptxxxxxxxxxxxx', 8830010, 105200000, 'BanBan'],
    [6, 'Bloody', '血腥女王', 'scriptxxxxxxxxxxxx', 8830010, 105200000, 'BloodyQueen'],
    [7, 'Bellum', '貝    倫', 'scriptxxxxxxxxxxxx', 8830010, 105200000, 'Bellum'],
    [8, 'Vanleon', '班 雷 昂', 'scriptxxxxxxxxxxxx', 8830010, 211070000, 'VanLeon'],
    [9, 'Akayrum', '阿卡伊勒', 'scriptxxxxxxxxxxxx', 8830010, 272020110, 'Akairum'],
    [10, 'Magnus', '麥格納斯', 'scriptxxxxxxxxxxxx', 8830010, 401060000, 'Magnus'],
    [11, 'Pinkbeen', '品 克 繽', 'scriptxxxxxxxxxxxx', 8830010, 270050000, 'PinkBean'],
    [12, 'Shinas', '希 納 斯', 'scriptxxxxxxxxxxxx', 8830010, 271040000, 'Signus'],
    // [13, 'Swoo', '斯烏', 'scriptxxxxxxxxxxxx', 8830010, 100000000],
    // [14, 'Ursus', '烏勒斯', 'scriptxxxxxxxxxxxx', 8830010, 100000000],
    // [15, 'Demian', '戴米安', 'scriptxxxxxxxxxxxx', 8830010, 100000000],
    [17, 'Ranmaru', '森 蘭 丸', 'scriptxxxxxxxxxxxx', 8830010, 807300200, 'Ranmaru'],
    [18, 'PrincessNo', '濃    姬', 'scriptxxxxxxxxxxxx', 8830010, 811000999, 'JP_Nohime'],
    [22, 'Papulatus', '鬧    鍾', 'scriptxxxxxxxxxxxx', 8830010, 220080000, 'Papulatus'],
    [16, 'Beidler', '貝 勒 德', 'scriptxxxxxxxxxxxx', 8830010, 863010000, 'GiantVellud'],
    // [19, 'PrincessNo', '路西德', 'scriptxxxxxxxxxxxx', 8830010, 100000000],
    // [20, 'Lucid', 'UNK', 'scriptxxxxxxxxxxxx', 8830010, 100000000],
    // [21, 'Caoong', '卡    雄', 'scriptxxxxxxxxxxxx', 8830010, 100000000, 'Caoong'],
];

var 普通任務1 = "#fUI/UIRoguelikeWz2/achievement/$btNormal/pressed#"; //挑戰任務圖標
var 普通任務2 = "#fUI/UIRoguelikeWz2/achievement/$btNormal/normal#"; //挑戰任務圖標
var 挑戰任務1 = "#fUI/UIRoguelikeWz2/achievement/$btChallenge/pressed#"; //挑戰任務圖標
var 挑戰任務2 = "#fUI/UIRoguelikeWz2/achievement/$btChallenge/normal#"; //挑戰任務圖標
var 測試 = "#fEffect/Direction30.img/odium/effect#"

var selected;
var selected2;

function start() {
    var selStr = 普通任務2 + '\r\n';

    for (var i = 0; i < BOSS_LIST2.length; i++) {

        // npc.say('#fMap/MapHelper/mark/Hilla#');
        selStr += "#d#L" + i + `##fMap/MapHelper/mark/${BOSS_LIST2[i][6]}##d` + BOSS_LIST2[i][2] + "#k#b#l#k";
        // selStr += "#d#L" + i + "##fUI/UIBoss.img/BossList/" + BOSS_LIST2[i][0] + "/Icon/normal/0##d" + BOSS_LIST2[i][2] + "#k#b#l#k ";
        if (((parseInt(i) + 1) % 3) == 0) {
            selStr += "\r\n";
        }
    }

    selStr += "\r\n#L999#返回上層#l#k\r\n";


    selected = npc.askMenu(selStr); //
    if (selected < 100) {
        if (map.getId() == BOSS_LIST2[selected][5]) {
            // npc.say('你已經在這個地圖啦');
            stage.runScript(`expand/menu/BOSS入口/新手BOSS/${boss.Name[BOSS_LIST2[selected][0]]}`);
        } else {
            //  start2(selected);
            selStr = `#fUI/UIBoss.img/BossList/${BOSS_LIST2[selected][0]}/0#`;
            selStr += `#fc0xFFFFFFFF##e#fs18#BOSS<${boss.Name[BOSS_LIST2[selected][0]]}>#fs14##b#n\r\n`
            // selStr += `#k本日剩餘次數:\r\n`;
            // player.showSystemMessage(boss.DifficultyJson[BOSS_LIST2[selected][1]]);
            // player.showSystemMessage(BOSS_LIST2[selected][1]);
            for (let i in boss.DifficultyJson[BOSS_LIST2[selected][1]]) {
                let bossLog = boss.difficultyName[boss.DifficultyJson[BOSS_LIST2[selected][1]][i]];
                let bossName = `${boss.Name[BOSS_LIST2[selected][0]]}[${bossLog}]`;
                // selStr += bossName;
                let timeJson = boss.TimesJson[bossName]
                if (timeJson) {
                    switch (timeJson.type) {
                        case 1:
                            let today = getBossEventDay(bossName, db, stage);
                            // selStr += `日: ${1 - today} / `;
                            if (today > 0) {
                                selStr += `#r${bossName}  ${1 - today} / 1  每日#k\r\n`;
                            } else {
                                selStr += `#b${bossName}  ${1 - today} / 1  每日#k\r\n`;
                            }
                            break;
                        case 2:
                            let toWeek = getBossEventWeek(bossName, db, stage);
                            // selStr += `日: ${1 - today} / `;
                            if (today > 0) {
                                selStr += `#r${bossName}  ${timeJson['times'] - toWeek} / ${timeJson['times']}  每周#k\r\n`;
                            } else {
                                selStr += `#b${bossName}  ${timeJson['times'] - toWeek} / ${timeJson['times']}  每周#k\r\n`;
                            }
                            break;
                        case 3:
                            break;
                        case 4:
                            let belder = log.getPQLog(stage, db, 'boss_giant');
                            // selStr += `日: ${1 - today} / `;
                            if (3 - belder > 0) {
                                selStr += `#b${bossName}  ${timeJson['times'] - belder} / ${timeJson['times']}  每日#k\r\n`;
                            } else {
                                selStr += `#r${bossName}  ${timeJson['times'] - belder} / ${timeJson['times']}  每日#k\r\n`;
                            }
                            break;
                    }
                } else {
                    selStr += `显示錯誤\r\n`;
                    selStr += `${bossName}`;
                }
            }
            selStr += `\r\n是否前往挑戰`;
            if (npc.askYesNo(selStr) == 1) {
                // if (npc.askYesNoN(selStr, BOSS_LIST2[selected][4], 128) == 1) {
                stage.changeMap(BOSS_LIST2[selected][5], 0);
            }
        }
    } else if (selected == 999) {
        stage.runScript("npc/3006457");
    }
}

start();