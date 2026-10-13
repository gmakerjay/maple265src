/**
 * 150 等級箱子
 */

const listA = [
    1073030,
    1073032,
    1073033,
    1073034,
    1073035
];

const listB = [
    1082636,
    1082637,
    1082638,
    1082639,
    1082640
];

const listC = [
    1102775,
    1102794,
    1102795,
    1102796,
    1102797
];

const listD = [
    1152174,
    1152176,
    1152177,
    1152178,
    1152179
];
/**
 * 8500聯盟埃蘇套裝
 **/

const optionListA = [
    ['力量', 40041, 30041, 30041],
    ['敏捷', 40042, 30042, 30042],
    ['智力', 40043, 30043, 30043],
    ['運氣', 40044, 30044, 30044],
];


/**
 * 150等武器自選
 **/


let boxId = ctx.getDataId();//箱子ID
const pqLog = "8000聯盟埃蘇套裝";
let log = require('check_log');

function start() {
    // if (!player.isGm()) {
    //     return;
    // }
    if (log.getEventValue(stage, db, pqLog) > 0 && !stage.isGm()) {
        npc.say("已經領過");
        return;
    } else if (stage.getLevel() < 160) {
        npc.say("等級不足");
        return;
    } else if (stage.getMapleUnionInfo()[1] < 8000) {
        npc.say("該禮包為8500聯盟禮包");
        return;
    }

    let str = "獎勵包含\r\n17星SS埃蘇萊布斯自選4件套\r\n全套X捲軸\r\n是否領取";
    if (npc.askYesNo(str) == 1) {

        let strOptionA = '';
        strOptionA += `請先選擇防具屬性體系\r\n`;
        for (let i in optionListA) {
            strOptionA += `#L${i}# ${optionListA[i][0]} #l\r\n`;
        }
        let optionA = npc.askMenu(strOptionA);
        optionA = optionListA[optionA];

        let strA = "請選擇您要的鞋子\r\n";
        for (let i = 0; i < listA.length; i++) {
            strA += "#L" + i + "##v" + listA[i] + ":i##z" + listA[i] + ":i##l\r\n";
        }
        let selectedA = npc.askMenu(strA);
        let strB = "請選擇您要的手套\r\n";
        for (let i = 0; i < listB.length; i++) {
            strB += "#L" + i + "##v" + listB[i] + ":i##z" + listB[i] + ":i##l\r\n";
        }
        let selectedB = npc.askMenu(strB);
        let strC = "請選擇您要的披風\r\n";
        for (let i = 0; i < listC.length; i++) {
            strC += "#L" + i + "##v" + listC[i] + ":i##z" + listC[i] + ":i##l\r\n";
        }
        let selectedC = npc.askMenu(strC);
        let strD = "請選擇您要的護肩\r\n";
        for (let i = 0; i < listD.length; i++) {
            strD += "#L" + i + "##v" + listD[i] + ":i##z" + listD[i] + ":i##l\r\n";
        }
        let selectedD = npc.askMenu(strD);

        if ((log.getEventValue(stage, db, pqLog) == 0 && stage.hasItem(boxId, 1)) || stage.isGm()) {
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
                    setAttr(toDropC, 0, 0, 0, 0, 49, 0);
                } else {
                    setAttr(toDropC, 0, 0, 0, 0, 0, 49);
                }
                let toDropD = util.makeItem(listD[selectedD], 1);
                toDropD.setChuc(17);
                toDropD.setGrade(20);
                toDropD.setOption1(optionA[1]);
                toDropD.setOption2(optionA[2]);
                toDropD.setOption3(optionA[3]);
                toDropD.setCuc(1);
                toDropD.setRuc(0);
                if (optionA[0] != "智力") {
                    setAttr(toDropD, 0, 0, 0, 0, 7, 0);
                } else {
                    setAttr(toDropD, 0, 0, 0, 0, 0, 7);
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

start();

