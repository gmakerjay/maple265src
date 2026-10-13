/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const boss = require('constant/party_boss');
let log = require('check_log');
let {getBossEventDay, getBossEventMonth, getBossEventWeek} = require("constant/event");

const BOSS_LIST2 = [
    [13, 'Siwu', '斯    烏', '[黑暗天堂] - 斯烏     ', 8830010, 350060300],
    [15, 'Demian', '戴 米 安', '[世界樹頂] - 戴米安   ', 8830010, 105300303],
    [19, 'Lucid', '路 西 德', '[夢幻都市] - 路西德   ', 8830010, 450004000],
    [23, 'Will', '威    爾', '[光明神殿] - 威爾     ', 8830010, 450007240],
    [26, 'Dusk', '至暗魔晶', '[虛空之眼] - 至暗魔晶 ', 8830010, 450009301],
    [27, 'Dunkel', '敦 凱 爾', '[臨盡之地] - 敦凱爾   ', 8830010, 450012200],
    [24, 'JinHillah', '覺醒希拉', '[痛苦迷宮] - 覺醒希拉   ', 8830010, 450011990],
    [25, 'BlackMage', '黑魔法師', '[巨人心臟] - 黑魔法師 ', 8830010, 450012500],
    [28, 'Seren', '塞    倫', '[王宮主廳] - 塞倫 ', 8830010, 410000670],
    [30, 'Kalos', '卡爾洛斯', '[摩 天 樓] - 卡爾洛斯 ', 8830010, 410005005],
    [31, 'Karing', '卡    琳', '[四 季 閣] - 卡琳 ', 8830010, 410007025],
];

const BOSS_LIST = [
    ["[黑暗天堂] - 斯烏     ", "BOSS入口/斯烏", "8950002", 350060300,],
    ["[世界樹頂] - 戴米安   ", "BOSS入口/戴米安", "8880100", [1012632]],
    ["[夢幻都市] - 路西德   ", "BOSS入口/路西德", "8880140", [1012632]],
    ["[光明神殿] - 威爾     ", "BOSS入口/威爾", "8880300", [1012632]],
    ["[虛空之眼] - 至暗魔晶 ", "BOSS入口/至暗魔晶", "8644611", [1012632]],
    ["[臨盡之地] - 敦凱爾   ", "BOSS入口/敦凱爾", "8645009", [1012632]],
    ["[痛苦迷宮] - 真希拉   ", "BOSS入口/覺醒希拉", "8880400", [1012632]],
    ["[巨人心臟] - 黑魔法師 ", "BOSS入口/黑魔法師", "8880532", [1012632]],
    ["[王宮主廳] - 塞倫 ", "BOSS入口/塞倫", "8880650", [1012632]],
    ["[摩 天 樓] - 卡爾洛斯 ", "BOSS入口/卡爾洛斯", "8880800", [1012632]],
    ["[四 季 閣] - 卡琳 ", "BOSS入口/卡琳", "8880837", [1012632]],
];
var 普通任務1 = "#fUI/UIRoguelikeWz2/achievement/$btNormal/pressed#"; //挑戰任務圖標
var 普通任務2 = "#fUI/UIRoguelikeWz2/achievement/$btNormal/normal#"; //挑戰任務圖標
var 挑戰任務1 = "#fUI/UIRoguelikeWz2/achievement/$btChallenge/pressed#"; //挑戰任務圖標
var 挑戰任務2 = "#fUI/UIRoguelikeWz2/achievement/$btChallenge/normal#"; //挑戰任務圖標
var 測試 = "#fEffect/Direction30.img/odium/effect#"

var selected;
var selected2;

function start() {
    var selStr = 挑戰任務2 + '\r\n';

    for (var i = 0; i < BOSS_LIST2.length; i++) {
        selStr += "#d#L" + i + "##fUI/UIBoss.img/BossList/" + BOSS_LIST2[i][0] + "/Icon/normal/0##d" + BOSS_LIST2[i][2] + "#k#b#l#k ";
        if (((parseInt(i) + 1) % 3) == 0) {
            selStr += "\r\n";
        }
    }

    selStr += "\r\n#L999#返回上層#l#k\r\n";


    selected = npc.askMenu(selStr); //
    if (selected < 100) {
        if (map.getId() == BOSS_LIST2[selected][5]) {
            stage.runScript(`expand/menu/BOSS入口/${boss.Name[BOSS_LIST2[selected][0]]}`);
        } else {
            selStr = `#fUI/UIBoss.img/BossList/${BOSS_LIST2[selected][0]}/0#`;
            selStr += `#fc0xFFFFFFFF##e#fs18#BOSS<${boss.Name[BOSS_LIST2[selected][0]]}>#fs14##b#n\r\n`
            for (let i in boss.DifficultyJson[BOSS_LIST2[selected][1]]) {
                let bossLog = boss.difficultyName[boss.DifficultyJson[BOSS_LIST2[selected][1]][i]];
                let bossName = `${boss.Name[BOSS_LIST2[selected][0]]}[${bossLog}]`;
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
                            if (toWeek > 0) {
                                selStr += `#r${bossName}  ${timeJson['times'] - toWeek} / ${timeJson['times']}  每周#k\r\n`;
                            } else {
                                selStr += `#b${bossName}  ${timeJson['times'] - toWeek} / ${timeJson['times']}  每周#k\r\n`;
                            }
                            break;
                        case 3:
                            let toMonth = getBossEventMonth(bossName, db, stage);
                            if (toMonth > 0) {
                                selStr += `#r${bossName}  ${timeJson['times'] - toMonth} / ${timeJson['times']}  每月#k\r\n`;
                            } else {
                                selStr += `#b${bossName}  ${timeJson['times'] - toMonth} / ${timeJson['times']}  每月#k\r\n`;
                            }
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
                stage.changeMap(BOSS_LIST2[selected][5], 0);
            }
        }
    } else if (selected == 999) {
        stage.runScript("npc/3006457");
    }
}

function start2() {
    let selStr = ``;
    if (selected == 0) {
        selStr += `#fUI/UIBoss.img/BossList/0/Icon/normal/0#`;
    } else {
        selStr += `#fUI/UIBoss.img/BossList/${BOSS_LIST2[selected][0]}/0#`;
    }
    selStr += boss.Name[BOSS_LIST2[selected][0]]

    for (let i = 1; i <= 3; i++) {
        let sel = (selected * 3) + i;

        let currentTimes = 0;


    }
    selStr += "\r\n#L999#返回上層#l#k\r\n";
    selected2 = npc.askMenu(selStr);

    if (selected2 == 999) {
        start();
    } else if (selected2 == 99) {
        stage.runScript(BOSS_LIST[selected][1]);
    }
}


start();