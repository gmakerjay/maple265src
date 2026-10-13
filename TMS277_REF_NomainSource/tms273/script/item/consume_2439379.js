/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 首沖FFN 趙師傅
 */
const payUtils = require('constant/payUtils');
const optionListA = [
    ['力量', 40041, 30041, 30041],
    ['敏捷', 40042, 30042, 30042],
    ['智力', 40043, 30043, 30043],
    ['運氣', 40044, 30044, 30044],
];
const optionListB = [
    ['攻擊', 40051, 30051, 30051],
    ['魔力', 40052, 30052, 30052],
];

const listA = [
    1042392,//鷹眼戰士盔甲
    1042393,//鷹眼丹維奇長袍
    1042394,//鷹眼遊俠斗篷
    1042395,//鷹眼刺客襯衣
    1042396,//鷹眼流浪者外衣
];

const listB = [
    1062258,//魔術師戰士短褲
    1062259,//魔術師丹維奇短褲
    1062260,//魔術師遊俠短褲
    1062261,//魔術師刺客短褲
    1062262,//魔術師流浪者短褲
];

const listC = [
    1005302,//戰士頭
    1005303,//法師頭
    1005304,//遊俠頭
    1005305,//射手頭
    1005306,//海盜頭
];

const listD = [
    1292018,
    1213018,
    1404018,
    1214018,
    1592020,
    1212120,
    1222113,
    1232113,
    1242121,
    1242122,
    1252098,
    1262039,
    1302343,
    1312203,
    1322255,
    1332279,
    1342104,
    1362140,
    1372228,
    1382265,
    1402259,
    1412181,
    1422189,
    1432218,
    1442274,
    1452257,
    1462243,
    1472265,
    1482221,
    1492235,
    1522143,
    1532150,
    1542117,
    1552119,
    1582023,
    1272017,
    1282017,
];

/**
 * 150等武器自選
 **/


const boxId = ctx.getDataId();//箱子ID
const pqLog = "新首沖禮包";
let log = require('check_log');

function start() {
    // if (!player.isGm()) {
    //     return;
    // }
    if (log.getEventValue(stage, db, pqLog) > 0 && !stage.isGm()) {
        npc.say("已經領過");
        return;
    } else if (stage.getLevel() < 150) {
        npc.say("需要150級可開啟");
        return;
    } else if (getRMB() < 188) {
        npc.say("您的累計贊助不足188無法開啟");
        return;
    }

    let str = "獎勵包含\r\n17星SS魯塔(神秘武器)自選4件套\r\n全套X捲軸\r\n是否領取";
    if (npc.askYesNo(str) == 1) {

        let strOptionA = '';
        strOptionA += `請先選擇防具屬性體系\r\n`;
        for (let i in optionListA) {
            strOptionA += `#L${i}# ${optionListA[i][0]} #l\r\n`;
        }
        let optionA = npc.askMenu(strOptionA);
        optionA = optionListA[optionA];
        let strOptionB = '';
        strOptionB += `請先選擇武器屬性體系\r\n`;
        for (let i in optionListB) {
            strOptionB += `#L${i}# ${optionListB[i][0]} #l\r\n`;
        }
        let optionB = npc.askMenu(strOptionB);
        optionB = optionListB[optionB];

        let strA = "請選擇您要的上衣\r\n";
        for (let i = 0; i < listA.length; i++) {
            strA += "#L" + i + "##v" + listA[i] + ":i##z" + listA[i] + ":i##l\r\n";
        }
        let selectedA = npc.askMenu(strA);
        let strB = "請選擇您要的褲子\r\n";
        for (let i = 0; i < listB.length; i++) {
            strB += "#L" + i + "##v" + listB[i] + ":i##z" + listB[i] + ":i##l\r\n";
        }
        let selectedB = npc.askMenu(strB);
        let strC = "請選擇您要的帽子\r\n";
        for (let i = 0; i < listC.length; i++) {
            strC += "#L" + i + "##v" + listC[i] + ":i##z" + listC[i] + ":i##l\r\n";
        }
        let selectedC = npc.askMenu(strC);
        let strD = "請選擇您要的武器\r\n";
        for (let i = 0; i < listD.length; i++) {
            strD += "#L" + i + "##v" + listD[i] + ":i##z" + listD[i] + ":i##l\r\n";
        }
        let selectedD = npc.askMenu(strD);

        if (log.getEventValue(stage, db, pqLog) == 0 || stage.isGm()) {
            let strResult = "您選擇的物品為\r\n#v" + listA[selectedA] + ":i# #v" + listB[selectedB] + ":i# #v" + listC[selectedC] + ":i# #v" + listD[selectedD] + ":i#\r\n是否確定選擇";
            if (npc.askYesNo(strResult) == 1) {
                if (stage.getFreeSlot(1) < 12) {
                    npc.say("清理背包");
                    return;
                }
                let toDropA = util.makeItem(listA[selectedA], 1);
                toDropA.setChuc(17);
                toDropA.setGrade(20);
                toDropA.setOption1(optionA[1]);
                toDropA.setOption2(optionA[2]);
                toDropA.setOption3(optionA[3]);
                toDropA.setCuc(7);
                toDropA.setRuc(0);
                if (optionA[0] != "智力") {
                    setAttr(toDropA, 0, 0, 0, 0, 49, 0);
                } else {
                    setAttr(toDropA, 0, 0, 0, 0, 0, 49);
                }

                let toDropB = util.makeItem(listB[selectedB], 1);
                toDropB.setChuc(17);
                toDropB.setGrade(20);
                toDropB.setOption1(optionA[1]);
                toDropB.setOption2(optionA[2]);
                toDropB.setOption3(optionA[3]);
                toDropB.setCuc(7);
                toDropB.setRuc(0);
                if (optionA[0] != "智力") {
                    setAttr(toDropB, 0, 0, 0, 0, 49, 0);
                } else {
                    setAttr(toDropB, 0, 0, 0, 0, 0, 49);
                }
                let toDropC = util.makeItem(listC[selectedC], 1);
                toDropC.setChuc(17);
                toDropC.setGrade(20);
                toDropC.setOption1(optionA[1]);
                toDropC.setOption2(optionA[2]);
                toDropC.setOption3(optionA[3]);
                toDropC.setCuc(7);
                toDropC.setRuc(0);
                if (optionA[0] != "智力") {
                    setAttr(toDropC, 0, 0, 0, 0, 77, 0);
                } else {
                    setAttr(toDropC, 0, 0, 0, 0, 0, 77);
                }
                let toDropD = util.makeItem(listD[selectedD], 1);
                toDropD.setChuc(17);
                toDropD.setGrade(20);
                toDropD.setOption1(optionA[1]);
                toDropD.setOption2(optionA[2]);
                toDropD.setOption3(optionA[3]);
                toDropD.setCuc(7);
                toDropD.setRuc(0);
                // toDropD.setStr(toDropD.getStr() + 80);
                // toDropD.setDex(toDropD.getDex() + 80);
                // toDropD.setInt(toDropD.getInt() + 80);
                // toDropD.setLuk(toDropD.getLuk() + 80);
                // toDropD.setPad(toDropD.getPad() + 96);
                // toDropD.setMad(toDropD.getMad() + 96);
                if (optionB[0] != "魔力") {
                    setAttr(toDropD, 80, 80, 80, 80, 96, 0);
                } else {
                    setAttr(toDropD, 80, 80, 80, 80, 0, 96);
                }


                if (stage.hasItem(boxId, 1)) {
                    log.addEventValue(stage, db, pqLog, 1, -1);
                    stage.loseItem(boxId, 1);
                    stage.gainItem(toDropA);
                    stage.gainItem(toDropB);
                    stage.gainItem(toDropC);
                    stage.gainItem(toDropD);
                    npc.say("領取成功");
                } else {
                    npc.say("請聯繫GM");
                }
            }


        } else {
            npc.say("請聯繫GM2");
        }
    }
}

function setAttr(t, str, dex, int, luk, pad, mad) {
    t.setBaseStr(t.getBaseStr() + str);
    t.setBaseDex(t.getBaseDex() + dex);
    t.setBaseInt(t.getBaseInt() + int);
    t.setBaseLuk(t.getBaseLuk() + luk);
    t.setPad(t.getPad() + pad);
    t.setMad(t.getMad() + mad);
    t.setAttribute(8);
    t.setCuttable(0);
}

// 五月起累充
function getRMB() {
    return payUtils.getPay(3, db, stage);
}

start();

