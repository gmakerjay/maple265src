

// const list = [
//     // 輝耀上下
//     [1042433, 1052723, 17, 14],
//     [1042434, 1052723, 17, 14],
//     [1042435, 1052723, 17, 14],
//     [1042436, 1052723, 17, 14],
//     [1042437, 1052723, 17, 14],
//     [1062285, 1052723, 17, 14],
//     [1062286, 1052723, 17, 14],
//     [1062287, 1052723, 17, 14],
//     [1062288, 1052723, 17, 14],
//     [1062289, 1052723, 17, 14],
//     // 輝耀帽子
//     [1005980, 1004808, 18, 18],
//     [1005981, 1004809, 18, 18],
//     [1005982, 1004810, 18, 18],
//     [1005983, 1004811, 18, 18],
//     [1005984, 1004812, 18, 18],
//     // // 輝耀護肩
//     // [1152212, 1152196, 8, 8],
//     // [1152213, 1152197, 8, 8],
//     // [1152214, 1152198, 8, 8],
//     // [1152215, 1152199, 8, 8],
//     // [1152216, 1152200, 8, 8],
// ];
var list = [
    Array(1213022, 1213018, 14, 14),
    Array(1292022, 1292018, 14, 14),
    Array(1592022, 1592020, 14, 14),
    Array(1282040, 1282017, 14, 14),
    Array(1272040, 1272017, 14, 14),
    Array(1582044, 1582023, 14, 14),
    Array(1552130, 1552119, 14, 14),
    Array(1542128, 1542117, 14, 14),
    Array(1252106, 1252098, 14, 14),
    Array(1532157, 1532150, 14, 14),
    Array(1522152, 1522143, 14, 14),
    Array(1492245, 1492235, 14, 14),
    Array(1482232, 1482221, 14, 14),
    Array(1472275, 1472265, 14, 14),
    Array(1462252, 1462243, 14, 14),
    Array(1442285, 1442274, 14, 14),
    Array(1432227, 1432218, 14, 14),
    Array(1452266, 1452257, 14, 14),
	Array(1214022, 1214018, 14, 14),
    Array(1422197, 1422189, 14, 14),
    Array(1412189, 1412181, 14, 14),
    Array(1402268, 1402259, 14, 14),
    Array(1382274, 1382265, 14, 14),
    Array(1372237, 1372228, 14, 14),
    Array(1362149, 1362140, 14, 14),
    Array(1332289, 1332279, 14, 14),
    Array(1322264, 1322255, 14, 14),
    Array(1312213, 1312203, 14, 14),
    Array(1302355, 1302343, 14, 14),
    Array(1262051, 1262039, 14, 14),
    Array(1242141, 1242122, 14, 14),
    Array(1232122, 1232113, 14, 14),
    Array(1222122, 1222113, 14, 14),
    Array(1212129, 1212120, 14, 14),
];

const exList = [
    [0, "力量"],
    [1, "敏捷"],
    [2, "智力"],
    [3, "運氣"],
    [4, "力敏"],
    [5, "力智"],
    [6, "力運"],
    [7, "敏智"],
    [8, "敏運"],
    [9, "智運"],
    [10, "最大血"],
    [11, "最大魔"],
    [12, "等級減少"],
    [13, "防禦"],
    [14, "？"],
    [15, "？"],
    [16, "？"],
    [17, "攻"],
    [18, "魔"],
    [19, "移動速度"],
    [20, "跳躍"],
    [21, "BOSS"],
    [22, ""],
    [23, "傷害"],
    [24, "全屬"]
];


function start() {
    let index = -1;

    let toDropNew = stage.getItemBySlot(1, 1);
    let toDropOld = stage.getItemBySlot(1, 2);
    let exceptOld = 0;

    let str = "【創世繼承】\r\n";
    str += `請將需要被提取屬性的#b神秘武器#k放在#r物品欄第二格子#k\r\n`;
    str += `請將需要被覆蓋屬性的#b創世武器#k放在#r物品欄第一格子#k\r\n`;
    str += "-創世繼承神秘的潛能、火花、捲軸、星力以及寶珠\r\n";
    // str += "-剪刀次數重置\r\n";
    str += `-#r屬性數值自適應輝耀裝備等級#k\r\n`;
    str += `-#r繼承後，被提取屬性裝備會消失#k\r\n`;
    let str2 = "";
    let sel = 0;
    for (let i in list) {
        let item1 = list[i][0];
        let item2 = list[i][1];
        if (toDropNew != null && item1 == toDropNew.getItemId()) {
            exceptOld = item2;
            sel = i;
        }
        str2 += `#v${item1}:i##z${item1}:i# <<<< #v${item2}:i##z${item2} \r\n\r\n`;
    }

    if (toDropNew != null && toDropOld != null && toDropOld.getItemId() == exceptOld) {

        let oldChuc = toDropOld.getChuc();
        let YN = npc.askYesNo(str + "是否確認繼承");
        if (YN == 1) {
            if (toDropOld.getCuc() < list[sel][2]) {
                npc.say("被提取道具捲軸未滿(包含白金/金錘)，無法繼承");
                return;
            }
            // 星之力
            let chucNum = toDropOld.getChuc();
            // toDropOld.setChuc(0);
            // 力量,智力,敏捷,運氣
            let toDropOldData = util.makeItem(toDropOld.getItemId(), 1);;
            let strNum = Math.floor((toDropOld.getBaseStr() - toDropOldData.getBaseStr()) / list[sel][2] * list[sel][3]);
            let dexNum = Math.floor((toDropOld.getBaseDex() - toDropOldData.getBaseDex()) / list[sel][2] * list[sel][3]);
            let intNum = Math.floor((toDropOld.getBaseInt() - toDropOldData.getBaseInt()) / list[sel][2] * list[sel][3]);
            let lukNum = Math.floor((toDropOld.getBaseLuk() - toDropOldData.getBaseLuk()) / list[sel][2] * list[sel][3]);
            //  攻，魔
            let padNum = Math.floor((toDropOld.getPad() - toDropOldData.getPad()) / list[sel][2] * list[sel][3]);
            let madNum = Math.floor((toDropOld.getMad() - toDropOldData.getMad()) / list[sel][2] * list[sel][3]);

            // 火花
            let fireNum = toDropOld.getExGradeOption();
            // 已強化次數 

            let numStr = fireNum.toString();
            while (numStr.length < 12) {
                numStr = "0" + numStr;
            }
            // 以3個字符為單位分割成4組
            const groups = [];
            for (let i = 0; i < 12; i += 3) {
                groups.push(numStr.slice(i, i + 3));
            }

            // 將每組按長度2 1分割，並整理成數組
            let result = groups.map(group => {
                return [parseInt(group.slice(0, 2)), parseInt(group.slice(2, 3))];
            });
            let fireStr = "";
            for (let i in result) {
                fireStr += exList[result[i][0]][1] + ": " + result[i][1] + " 級\r\n";
            }
            str = "被提取火花:\r\n" + fireStr + "是否確認提取#r(提取後被提取道具會消失)#k";
            if (npc.askYesNo(str) == 1) {
                // 火花
                let newDrop = util.makeItem(toDropNew.getItemId(), 1);
                newDrop.setExGradeOption(fireNum);
                // 力量,智力,敏捷,運氣
                newDrop.setBaseStr(newDrop.getBaseStr() + strNum);
                newDrop.setBaseDex(newDrop.getBaseDex() + dexNum);
                newDrop.setBaseInt(newDrop.getBaseInt() + intNum);
                newDrop.setBaseLuk(newDrop.getBaseLuk() + lukNum);
                // 攻，魔
                newDrop.setPad(newDrop.getPad() + padNum);
                newDrop.setMad(newDrop.getMad() + madNum);
                // 錘子
                newDrop.setIuc(1);
                newDrop.setPuc(5);
                // 已強化次數
                newDrop.setCuc(list[sel][3]);
                newDrop.setRuc(0);
                // 星之力
                newDrop.setChuc(oldChuc);
                // 潛能
                newDrop.setGrade(toDropOld.getGrade());
                newDrop.setOption1(toDropOld.getOption1());
                newDrop.setOption2(toDropOld.getOption2());
                newDrop.setOption3(toDropOld.getOption3());
                newDrop.setOption4(toDropOld.getOption4());
                newDrop.setOption5(toDropOld.getOption5());
                newDrop.setOption6(toDropOld.getOption6());


                // 寶珠
                newDrop.setSoulSocket(toDropOld.getSoulSocket());
                newDrop.setSoulOptionId(toDropOld.getSoulOptionId());
                newDrop.setSoulOption(toDropOld.getSoulOption());


                stage.removeItemBySlot(1, 1);
                stage.removeItemBySlot(1, 2);
                stage.gainItem(newDrop);
                npc.say("繼承成功!");
            }
        }
    } else {
        npc.say(str + "繼承關係如下:\r\n" + str2);
    }




}


start();