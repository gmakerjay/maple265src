

const list = [
    // 輝耀上下
    // [1113341, xxxxxxx, 16, 13], 
    [1122447, 1122296, 17, 12], 
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
    let str = "【根源繼承】\r\n";
    str += `請將需要被提取屬性的#b裝備#k放在#r物品欄第二格子#k\r\n`;
    str += `請將需要被覆蓋屬性的#b裝備#k放在#r物品欄第一格子#k\r\n`;
    str += "-可繼承的屬性有的潛能、火花、捲軸、星力等等\r\n";
    // str += "-剪刀次數重置\r\n";
    str += `-#r屬性數值(火花,星力屬性)自適應裝備等級#k\r\n`;
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
        str2 += `#v${item1}:i##z${item1}:i#(${list[i][3]}) <<<< #v${item2}:i##z${item2}#(${list[i][2]}) \r\n\r\n`;
    }

    if (toDropNew != null && toDropOld != null && toDropOld.getItemId() == exceptOld) {

        if (toDropOld.getCuc() < list[sel][2]) {
            npc.say(`被提取道具捲軸未滿(包含白金/金錘)，無法繼承\r\n#v${toDropOld.getItemId()}# 需要卷軸強化至(+${list[sel][2]})`);
            return;
        }
        str = "【根源繼承】\r\n";
        str += `#r提示: 主體裝備卷軸上限比繼承材料道具低,普通繼承會丟失部分屬性(卷軸加成的屬性根據卷軸次數上限降低)\r\n`
        str += `可以消耗(50W)釣魚點數進行完美繼承,主體道具的卷軸次數會提升至繼承材料道具相同,卷軸屬性完美保留\r\n\r\n#b`
        str += `#L0#普通繼承#l\r\n`
        let myFishPoint = 獲取積分();
        str += `#L1#完美繼承(釣魚點數:${myFishPoint}/500000)#l\r\n`

        let mode = npc.askMenu(str);

        let oldCuc = list[sel][2];
        let newCuc = list[sel][3];
        if (mode == 1) {
            newCuc = oldCuc;
        }

        // 六維
        let toDropOldData = util.makeItem(toDropOld.getItemId(), 1);
        let statList = [['力量'], ['敏捷'], ['智力'], ['幸運'], ['攻擊力'], ['魔  力']];
        statList[0].push(toDropOld.getBaseStr() - toDropOldData.getBaseStr());
        statList[1].push(toDropOld.getBaseDex() - toDropOldData.getBaseDex());
        statList[2].push(toDropOld.getBaseInt() - toDropOldData.getBaseInt());
        statList[3].push(toDropOld.getBaseLuk() - toDropOldData.getBaseLuk());
        statList[4].push(toDropOld.getPad() - toDropOldData.getPad());
        statList[5].push(toDropOld.getMad() - toDropOldData.getMad());
        for (let i in statList) {
            statList[i].push(Math.floor(statList[i][1] / oldCuc * newCuc))
        }

        // let strNum = Math.floor((toDropOld.getBaseStr() - toDropOldData.getBaseStr()) / oldCuc * newCuc);
        // let dexNum = Math.floor((toDropOld.getBaseDex() - toDropOldData.getBaseDex()) / oldCuc * newCuc);
        // let intNum = Math.floor((toDropOld.getBaseInt() - toDropOldData.getBaseInt()) / oldCuc * newCuc);
        // let lukNum = Math.floor((toDropOld.getBaseLuk() - toDropOldData.getBaseLuk()) / oldCuc * newCuc);
        // //  攻，魔
        // let padNum = Math.floor((toDropOld.getPad() - toDropOldData.getPad()) / oldCuc * newCuc);
        // let madNum = Math.floor((toDropOld.getMad() - toDropOldData.getMad()) / oldCuc * newCuc);

        let oldChuc = toDropOld.getChuc(); 


        str = `【根源繼承】(#r${mode == 1 ? '完美繼承' : '普通繼承'}#k)\r\n`;
        str += `卷軸强化次數: ${oldCuc} => ${newCuc}\r\n`
        str += `星力: ${oldChuc} => ${oldChuc}\r\n`
        str += `潛能(繼承等級,屬性自適應升高)\r\n`
        str += `火花(繼承等級,屬性自適應升高)\r\n`
        str += `六維屬性:\r\n`
        for (let i in statList) {
            str += `${statList[i][0]}: ${statList[i][1]} => ${statList[i][2]}\r\n`
        }

        if (mode == 1 && myFishPoint < 500000) {
            npc.say(str + `#r您的釣魚點數不足,需要500000`)
            return;
        }


        if (npc.askYesNo(str + "#b是否確認繼承")) {
            if (mode == 1) {
                消耗積分(500000);
            }


            let newDrop = util.makeItem(toDropNew.getItemId(), 1);
            // 錘子
            newDrop.setIuc(1);
            newDrop.setPuc(5);
            // 已強化次數
            newDrop.setCuc(newCuc);
            newDrop.setRuc(0);


            // 火花
            newDrop.setExGradeOption(toDropOld.getExGradeOption());
            // 力量,智力,敏捷,運氣
            newDrop.setBaseStr(newDrop.getBaseStr() + statList[0][2]);
            newDrop.setBaseDex(newDrop.getBaseDex() + statList[1][2]);
            newDrop.setBaseInt(newDrop.getBaseInt() + statList[2][2]);
            newDrop.setBaseLuk(newDrop.getBaseLuk() + statList[3][2]);
            // 攻，魔
            newDrop.setPad(newDrop.getPad() + statList[4][2]);
            newDrop.setMad(newDrop.getMad() + statList[5][2]);
            
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
            // newDrop.setSoulSocket(toDropOld.getSoulSocket());
            // newDrop.setSoulOptionId(toDropOld.getSoulOptionId());
            // newDrop.setSoulOption(toDropOld.getSoulOption());


            stage.removeItemBySlot(1, 1);
            stage.removeItemBySlot(1, 2);
            stage.gainItem(newDrop);
            npc.say("繼承成功!");  

            // // 星之力
            // let chucNum = toDropOld.getChuc();
            // // toDropOld.setChuc(0);
            // // 力量,智力,敏捷,運氣
            // let toDropOldData = util.makeItem(toDropOld.getItemId(), 1);;
            // let strNum = Math.floor((toDropOld.getBaseStr() - toDropOldData.getBaseStr()) / list[sel][2] * list[sel][3]);
            // let dexNum = Math.floor((toDropOld.getBaseDex() - toDropOldData.getBaseDex()) / list[sel][2] * list[sel][3]);
            // let intNum = Math.floor((toDropOld.getBaseInt() - toDropOldData.getBaseInt()) / list[sel][2] * list[sel][3]);
            // let lukNum = Math.floor((toDropOld.getBaseLuk() - toDropOldData.getBaseLuk()) / list[sel][2] * list[sel][3]);
            // //  攻，魔
            // let padNum = Math.floor((toDropOld.getPad() - toDropOldData.getPad()) / list[sel][2] * list[sel][3]);
            // let madNum = Math.floor((toDropOld.getMad() - toDropOldData.getMad()) / list[sel][2] * list[sel][3]);

            // // 火花
            // let fireNum = toDropOld.getExGradeOption();
            // // 已強化次數  
            // let numStr = fireNum.toString();
            // while (numStr.length < 12) {
            //     numStr = "0" + numStr;
            // }
            // // 以3個字符為單位分割成4組 
            // let result = [];
            // for (let i = 0; i < 4; i++) {
            //     let group = numStr.substring(i * 3, i * 3 + 3);
            //     let attrId = Number(group.substring(0, 2));
            //     let level = Number(group.substring(2, 3));
            //     result.push([attrId, level]);
            // }


            // let fireStr = "";
            // for (let i in result) {
            //     fireStr += exList[result[i][0]][1] + ": " + result[i][1] + " 級\r\n";
            // }
            // str = "被提取火花:\r\n" + fireStr + "是否確認提取#r(提取後被提取道具會消失)#k";
            // if (npc.askYesNo(str) == 1) {
            //     // 火花
            //     let newDrop = util.makeItem(toDropNew.getItemId(), 1);
            //     newDrop.setExGradeOption(fireNum);
            //     // 力量,智力,敏捷,運氣
            //     newDrop.setBaseStr(newDrop.getBaseStr() + strNum);
            //     newDrop.setBaseDex(newDrop.getBaseDex() + dexNum);
            //     newDrop.setBaseInt(newDrop.getBaseInt() + intNum);
            //     newDrop.setBaseLuk(newDrop.getBaseLuk() + lukNum);
            //     // 攻，魔
            //     newDrop.setPad(newDrop.getPad() + padNum);
            //     newDrop.setMad(newDrop.getMad() + madNum);
            //     // 錘子
            //     newDrop.setIuc(1);
            //     newDrop.setPuc(5);
            //     // 已強化次數
            //     newDrop.setCuc(list[sel][3]);
            //     newDrop.setRuc(0);
            //     // 星之力
            //     newDrop.setChuc(oldChuc);
            //     // 潛能
            //     newDrop.setGrade(toDropOld.getGrade());
            //     newDrop.setOption1(toDropOld.getOption1());
            //     newDrop.setOption2(toDropOld.getOption2());
            //     newDrop.setOption3(toDropOld.getOption3());
            //     newDrop.setOption4(toDropOld.getOption4());
            //     newDrop.setOption5(toDropOld.getOption5());
            //     newDrop.setOption6(toDropOld.getOption6());


            //     // 寶珠
            //     newDrop.setSoulSocket(toDropOld.getSoulSocket());
            //     newDrop.setSoulOptionId(toDropOld.getSoulOptionId());
            //     newDrop.setSoulOption(toDropOld.getSoulOption());


            //     stage.removeItemBySlot(1, 1);
            //     stage.removeItemBySlot(1, 2);
            //     stage.gainItem(newDrop);
            //     npc.say("繼承成功!");
            // }
        }
    } else {
        npc.say(str + "繼承關係如下:\r\n" + str2);
    }




}

function getExStr(fireNum) {
    if (fireNum < 1) {
        return '無\r\n'
    }
    // 火花 
    // 已強化次數  
    let numStr = fireNum.toString();
    while (numStr.length < 12) {
        numStr = "0" + numStr;
    }
    // 以3個字符為單位分割成4組 
    let result = [];
    for (let i = 0; i < 4; i++) {
        let group = numStr.substring(i * 3, i * 3 + 3);
        let attrId = Number(group.substring(0, 2));
        let level = Number(group.substring(2, 3));
        result.push([attrId, level]);
    }


    let fireStr = "";
    for (let i in result) {
        fireStr += exList[result[i][0]][1] + ": " + result[i][1] + " 級\r\n";
    }
    return fireStr;
}

function 獲取積分() {
    var sql = ` select * from 釣魚表_積分表 where  character_id = ${stage.getCharacterId()}  `;
    var resultList = db.select(sql)
    var point = -1;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        point = result.get("point");
    }
    return point;
}


function 消耗積分(point) {
    let 積分 = 獲取積分();
    stage.showSystemMessage(`消耗釣魚積分: ${point}  剩餘: ${積分 - point}`)


    var sql = ` update   釣魚表_積分表 set point = point - ${point} where character_id = ${stage.getCharacterId()}  `
    db.update(sql)
}
start();