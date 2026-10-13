// Created by MetaMS

let flag = true;
while (flag) {
        let str = "要用這些藥材製作靈藥嗎？\r\n\r\n";
        let potSize = parseInt(stage.getTempValue("POT_SIZE"));
        let sX = String(stage.getTempValue("POT_X"));
        let sXCount = parseInt(stage.getTempValue("POT_X_COUNT"));
        let csXCount = stage.getIntQuestRecordEx(504648, sX);

        //check
        let check = true;
        for (let i = 0; i < potSize; i++) {
                let key = String(stage.getTempValue("POT_" + i));
                let count = parseInt(stage.getTempValue("POT_" + i + "_COUNT"));
                let qCount = stage.getIntQuestRecordEx(504648, key);
                if (qCount < count) {
                        check = false;
                }
                str += "#e#fc0xFF662500##i" + getItemIdByKey(key) + ":# #t" + getItemIdByKey(key) + ":# #b" + count + "個#n#k\r\n";
        }
        if (sXCount > 0) {
                if (csXCount < sXCount) {
                        check = false;
                }
                str += "#e#fc0xFF662500##i" + getItemIdByKey(sX) + ":# #t" + getItemIdByKey(sX) + ":# #b" + sXCount + "個#n#k\r\n";
        }

        if (check) {
                if (npc.id(9401988).askYesNo(str)) {
                        for (let i = 0; i < potSize; i++) {
                                let key = String(stage.getTempValue("POT_" + i));
                                let count = parseInt(stage.getTempValue("POT_" + i + "_COUNT"));
                                let qCount = stage.getIntQuestRecordEx(504648, key) - count;
                                stage.updateQuestRecordEx(504648, key, Math.max(0, qCount));
                        }
                        if (sXCount > 0) {
                                csXCount = csXCount - sXCount;
                                stage.updateQuestRecordEx(504648, sX, Math.max(0, csXCount));
                        }
                        let srcOpt = getMyOptionInfo();

                        //Rand new opt

                        let tempOpt = [];
                        let newOpt = "";
                        for (let i = 0; i < potSize; i++) {
                                let key = String(stage.getTempValue("POT_" + i));
                                let count = parseInt(stage.getTempValue("POT_" + i + "_COUNT"));
                                let data = [];
                                let data2 = [];
                                switch (key) {
                                        case "o1":
                                                data = ["0", getRandomValue("0", count, sXCount > 0)];
                                                newOpt += "攻擊力/魔力增加#e +" + data[1] + "#n\r\n";
                                                break;
                                        case "o2":
                                                data = ["1", getRandomValue("1", count, sXCount > 0)];
                                                data2 = ["2", getRandomValue("2", count, sXCount > 0)];
                                                newOpt += "全屬性&HP/MP#e +" + data[1] + "&" + data2[1] + "#n\r\n";
                                                break;
                                        case "o3":
                                                data = ["3", getRandomValue("3", count, sXCount > 0)];
                                                newOpt += "爆擊機率增加#e +" + data[1] + "%#n\r\n";
                                                break;
                                        case "o4":
                                                data = ["4", getRandomValue("4", count, sXCount > 0)];
                                                newOpt += "一般怪物傷害增加#e +" + data[1] + "%#n\r\n";
                                                break;
                                        case "o5":
                                                data = ["5", getRandomValue("5", count, sXCount > 0)];
                                                newOpt += "無視防禦率增加#e +" + data[1] + "%#n\r\n";
                                                break;
                                        case "o6":
                                                data = ["6", getRandomValue("6", count, sXCount > 0)];
                                                newOpt += "BOSS怪物傷害增加#e +" + data[1] + "%#n\r\n";
                                                break;
                                        case "o7":
                                                data = ["7", getRandomValue("7", count, sXCount > 0)];
                                                newOpt += "經驗值獲得量#e +" + data[1] / 100 + "%#n\r\n";
                                                break;
                                        case "o8":
                                                data = ["8", getRandomValue("8", count, sXCount > 0)];
                                                newOpt += "BUFF持續時間增加#e +" + data[1] + "%#n\r\n";
                                                break;
                                }
                                if (data.length > 0) {
                                        tempOpt.push(data);
                                }
                                if (data2.length > 0) {
                                        tempOpt.push(data2);
                                }
                        }
                        let asmStr = "#e好，完成了靈藥。";
                        if (sXCount > 0) {
                                asmStr += "#fc0xFF009900#放入魔法藥材#k，讓湯繼續熬煮。#n";
                        }
                        asmStr += "\r\n#b<先前的BUFF>：\r\n" + srcOpt + "\r\n#e#r<新完成的BUFF>：#n\r\n" + newOpt + "#L0#要再熬煮靈藥。#k#l\r\n#L1##b<選擇<先前的BUFF>。#k#l\r\n#L2##r<選擇<新完成的靈藥BUFF>。#k#l\r\n";
                        stage.setEventUIAction("AnnualEvent_MagicPot_Effect", "Magic");
                        let selection = npc.id(9401988).noEsc().askMenu(asmStr);
                        if (selection == 1) {
                                flag = false;
                                npc.id(9401988).noEsc().next().say("好，就依照你的想法吧。\r\n\r\n#b維持效果：\r\n" + srcOpt + "\r\n※目前BUFF維持時間：" + util.getStringDate(util.getTimeStringToLong(stage.getQuestRecordEx(504639, "EndTime"), "yyyyMMddHHmmss"), "yyyy年 MM月 dd日 HH點 mm分") + " 為止#k");
                        } else if (selection == 2) {
                                flag = false;
                                /* Update Quest RecordEx | Id:504639 | Name: Unknown | Data: "" */
                                stage.updateQuestRecordEx(504639, "");
                                /* Update Quest RecordEx | Id:67009 | Name: [星夜馬戲團] 製作神祕的靈藥說明 | Data: "num=4" */
                                let useCount = stage.getIntQuestRecordEx(67009, "num") + 1;
                                stage.updateQuestRecordEx(67009, "num", useCount);
                                for (let i = 0; i < tempOpt.length; i++) {
                                        let ddd = tempOpt[i];
                                        stage.updateQuestRecordEx(504639, ddd[0], ddd[1]);
                                }
                                let endTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;// 7 days
                                stage.updateQuestRecordEx(504639, "EndTime", util.getStringDate(endTime, "yyyyMMddHHmmss"));

                                stage.updateQuestRecordEx(504684, "Y", util.getStringDate("yy"));
                                stage.updateQuestRecordEx(504684, "M", util.getStringDate("MM"));
                                stage.updateQuestRecordEx(504684, "D", util.getStringDate("dd"));
                                stage.updateQuestRecordEx(504684, "H", util.getStringDate("HH"));
                                stage.updateQuestRecordEx(504684, "N", util.getStringDate("mm"));
                                stage.updateQuestRecordEx(504684, "magic", "0");
                                stage.updateQuestRecordEx(504684, "num", useCount);

                                stage.changeSkillLevel(80010294, -1);
                                stage.changeSkillLevel(80010294, 1);
                                npc.id(9401988).noEsc().next().say("來，喝下靈藥吧。\r\n\r\n#r已套用新BUFF：\r\n" + newOpt + "\r\n#fc0xFF972EFF#※BUFF持續時間：" + util.getStringDate(endTime, "yyyy年 MM月 dd日 HH點 mm分") + " 為止#k");
                        }
                } else {
                        flag = false;
                }
        } else {
                flag = false;
                npc.id(9401988).next().say("藥材數量檢測失敗，請重試！。");
        }
}


function getItemIdByKey(key) {
        switch (key) {
                case "o1":
                        return 4037323;
                case "o2":
                        return 4037324;
                case "o3":
                        return 4037325;
                case "o4":
                        return 4037326;
                case "o5":
                        return 4037327;
                case "o6":
                        return 4037328;
                case "o7":
                        return 4037329;
                case "o8":
                        return 4037330;
                case "o9":
                        return 4037331;
        }
}

function getMyOptionInfo() {
        let keys = [
                {id: "0", name: "攻擊力/魔力增加", suffix: "", factor: 1},
                {id: "1", name: "", suffix: "", factor: 1},
                {id: "2", name: "", suffix: "", factor: 1}, // HP/MP included in "1"
                {id: "3", name: "爆擊機率增加", suffix: "%", factor: 1},
                {id: "4", name: "一般怪物傷害增加", suffix: "%", factor: 1},
                {id: "5", name: "無視防禦率增加", suffix: "%", factor: 1},
                {id: "6", name: "BOSS怪物傷害增加", suffix: "%", factor: 1},
                {id: "7", name: "經驗值獲得量", suffix: "%", factor: 0.01},
                {id: "8", name: "BUFF持續時間增加", suffix: "%", factor: 1}
        ];

        let stats = {pad: 0, allStat: 0, hpmp: 0, cr: 0, nbdR: 0, ipdR: 0, bdR: 0, expR: 0, buffTimeR: 0};
        let ret = "";

        keys.forEach(({id, name, suffix, factor}) => {
                let value = stage.getIntQuestRecordEx(504639, id) * factor;
                if (value > 0) {
                        switch (id) {
                                case "0":
                                        stats.pad = value;
                                        break;
                                case "1":
                                        stats.allStat = value;
                                        break;
                                case "2":
                                        stats.hpmp = value;
                                        break;
                                case "3":
                                        stats.cr = value;
                                        break;
                                case "4":
                                        stats.nbdR = value;
                                        break;
                                case "5":
                                        stats.ipdR = value;
                                        break;
                                case "6":
                                        stats.bdR = value;
                                        break;
                                case "7":
                                        stats.expR = value;
                                        break;
                                case "8":
                                        stats.buffTimeR = value;
                                        break;
                        }
                        if (name) {
                                ret += `${name} +${value}${suffix}\r\n`;
                        }
                }
        });
        if (stats.allStat > 0 && stats.hpmp > 0) {
                ret += `全屬性&HP/MP增加 +${stats.allStat}&${stats.hpmp}\r\n`;
        }
        return ret;
}

function getRandomValue(key, count, special) {
        let valueRanges = {
                "0": {normal: [10, 15, 20], high: [20, 30, 40], special: [0, 20, 30], specialHigh: [0, 40, 60]},
                "1": {normal: [10, 20, 30], high: [30, 40, 50], special: [0, 30, 40], specialHigh: [0, 50, 90]},
                "2": {
                        normal: [500, 1000, 1500],
                        high: [1500, 2000, 2500],
                        special: [0, 1500, 2000],
                        specialHigh: [0, 2500, 4500]
                },
                "3": {normal: [5, 10, 15], high: [15, 20, 30], special: [0, 10, 25], specialHigh: [0, 30, 40]},
                "4": {normal: [10, 20, 30], high: [30, 40, 50], special: [0, 20, 35], specialHigh: [0, 50, 70]},
                "5": {normal: [10, 20, 30], high: [30, 40, 50], special: [0, 20, 30], specialHigh: [0, 50, 70]},
                "6": {normal: [10, 20, 30], high: [30, 40, 50], special: [0, 30, 40], specialHigh: [0, 50, 70]},
                "7": {normal: [10, 20, 30], high: [30, 40, 50], special: [0, 30, 40], specialHigh: [0, 50, 100]},
                "8": {normal: [10, 15, 20], high: [20, 30, 40], special: [0, 20, 30], specialHigh: [0, 40, 60]}
        };

        let ranges = valueRanges[key];
        let useHigh = (key === "6" || key === "7" || key === "8") ? count >= 2 : count >= 10;
        let selectedRange = special ? (useHigh ? ranges.specialHigh : ranges.special) : (useHigh ? ranges.high : ranges.normal);

        let [min, base, max] = selectedRange;
        let rng = Math.floor(Math.random() * 100);

        let ret = rng < 30 ? getRandomInRange(min, base) : rng < 90 ? base : getRandomInRange(base, max);

        if (key === "7") ret *= 100;

        return ret;
}

function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
}