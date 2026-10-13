/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 150 等級箱子
 */
let log = require('check_log');
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
    1252015,
    1403016,
    1292016,
    1213016,
    1404032,
    1214032,
    1592035,
    1262052,
    1212130,
    1272041,
    1282041,
    1222123,
    1232123,
    1242142,
    1242143,
    1302356,
    1312214,
    1322265,
    1332290,
    1362150,
    1372238,
    1382275,
    1402269,
    1412190,
    1422198,
    1432228,
    1442286,
    1452267,
    1462253,
    1472276,
    1482233,
    1492246,
    1522153,
    1532158,
    1252107,
    1542129,
    1552131,
    1582045
];

const jsonD = {
    1252015: [17212,],
    1403016: [17512,],
    1292016: [16412,],
    1213016: [15112,],
    1404032: [15412,],
    1214032: [6312,],
    1592035: [332,],
    1262052: [14212,],
    1212130: [2712,],
    1272041: [6412,],
    1282041: [15212,],
    1222123: [6512,],
    1232123: [3122,],
    1242142: [3612,],
    1242143: [3612,],
    1302356: [5112,],
    1312214: [3112,],
    1322265: [3112,],
    1332290: [434, 422,],
    1362150: [2412,],
    1372238: [2217, 16212],
    1382275: [222, 212, 232, 1212, 3212,],
    1402269: [112, 1112, 122, 6112,],
    1412190: [2112,],
    1422198: [112, 122,],
    1432228: [132,],
    1442286: [2112,],
    1452267: [312, 1312,],
    1462253: [322, 3312,],
    1472276: [412, 1412,],
    1482233: [512, 2512, 15512, 1512,],
    1492246: [522, 3512,],
    1522153: [2312,],
    1532158: [532,],
    1252107: [11212,],
    1542129: [4112,],
    1552131: [4212,],
    1582045: [3712,],
};

/**
 * 150等武器自選
 **/


// let boxId = 2431901;//箱子ID

function start() {
    // if (!stage.isGm()) {
    //     return;
    // }
    if (log.getPQLog(stage, db, "150等級獎勵") > 0 && !stage.isGm()) {
        npc.say("已經領過");
        return;
    } else if (stage.getLevel() < 150) {
        npc.say("等級不足");
        return;
    }
    let jobId = stage.getJob();
    let jobC = stage.getJobCategory();
    let str = "恭喜您達到150級，獎勵包含\r\n15星SS魯塔自選4件套\r\n全套RED卷軸\r\n是否領取";
    if (npc.askYesNo(str) == 1) {
        let strA = "";
        let strD = "請選擇您要的武器\r\n";
        for (let i = 0; i < listD.length; i++) {
            if (jsonD[listD[i]].includes(jobId)) {
                strD += "#L" + i + "##v" + listD[i] + ":i##z" + listD[i] + ":i##l\r\n";
            }
        }
        let selectedD = npc.askMenu(strD);
        if (log.getPQLog(stage, db, "150等級獎勵") == 0 || stage.isGm()) {
            let strResult = "您選擇的物品為\r\n#v" + listA[jobC - 1] + ":i# #v" + listB[jobC - 1] + ":i# #v" + listC[jobC - 1] + ":i# #v" + listD[selectedD] + ":i#\r\n是否確定選擇";
            if (npc.askYesNo(strResult) == 1) {
                if (stage.getFreeSlot(1) < 12) {
                    npc.say("清理揹包");
                    return;
                }
                let toDropA = util.makeItem(listA[jobC - 1], 1);
                toDropA.setChuc(17);
                toDropA.setGrade(20);
                toDropA.setOption1(60067);
                toDropA.setOption2(60067);
                toDropA.setOption3(60067);
                toDropA.setCuc(7);
                toDropA.setRuc(0);
                toDropA.setPad(toDropA.getPad() + 35);
                toDropA.setMad(toDropA.getMad() + 35);
                stage.gainItem(toDropA);
                let toDropB = util.makeItem(listB[jobC - 1], 1);
                toDropB.setChuc(17);
                toDropB.setGrade(20);
                toDropB.setOption1(60067);
                toDropB.setOption2(60067);
                toDropB.setOption3(60067);
                toDropB.setCuc(7);
                toDropB.setRuc(0);
                toDropB.setPad(toDropB.getPad() + 35);
                toDropB.setMad(toDropB.getMad() + 35);
                stage.gainItem(toDropB);
                let toDropC = util.makeItem(listC[jobC - 1], 1);
                toDropC.setChuc(17);
                toDropC.setGrade(20);
                toDropC.setOption1(60067);
                toDropC.setOption2(60067);
                toDropC.setOption3(60067);
                toDropC.setCuc(11);
                toDropC.setRuc(0);
                toDropC.setPad(toDropC.getPad() + 55);
                toDropC.setMad(toDropC.getMad() + 55);
                stage.gainItem(toDropC);
                let toDropD = util.makeItem(listD[selectedD], 1);
                toDropD.setChuc(17);
                toDropD.setGrade(20);
                toDropD.setOption1(60067);
                toDropD.setOption2(60067);
                toDropD.setOption3(60067);
                toDropD.setCuc(8);
                toDropD.setRuc(0);
                toDropD.setBaseStr(toDropD.getBaseStr() + 64);
                toDropD.setBaseDex(toDropD.getBaseDex() + 64);
                toDropD.setBaseInt(toDropD.getBaseInt() + 64);
                toDropD.setBaseLuk(toDropD.getBaseLuk() + 64);
                toDropD.setPad(toDropD.getPad() + 80);
                toDropD.setMad(toDropD.getMad() + 80);
                stage.gainItem(toDropD);
                log.addPQLog(stage, db, "150等級獎勵", 1, -1);
                npc.say("領取成功");
            }


        } else {
            npc.say("級別不夠哦");
        }
    }
}

start();

