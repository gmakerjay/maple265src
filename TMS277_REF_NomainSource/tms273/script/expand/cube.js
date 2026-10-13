/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
option = require("option_tabulation");
let grade = {
    19: {
        1: {
            share: [
                {option: 32001, random: 4.75},
                {option: 32002, random: 4.75},
                {option: 32003, random: 4.75},
                {option: 32004, random: 4.75},
                {option: 32005, random: 4.75},
                {option: 32006, random: 4.75},
                {option: 32041, random: 4.75},
                {option: 32042, random: 4.75},
                {option: 32043, random: 4.75},
                {option: 32044, random: 4.75},
                {option: 32045, random: 4.75},
                {option: 32046, random: 4.75},
                {option: 32086, random: 4.75},
                {option: 32091, random: 4.75},
                {option: 32092, random: 4.75},
                {option: 32093, random: 4.75},
                {option: 32094, random: 4.75},
                {option: 32551, random: 4.75},
                {option: 32052, random: 2.5},
                {option: 32054, random: 2.5}
            ]
        }
    },
    20: {
        1: {
            share: [
                {option: 42001, random: 4.0},
                {option: 42002, random: 4.0},
                {option: 42003, random: 4.0},
                {option: 42004, random: 4.0},
                {option: 42005, random: 4.0},
                {option: 42006, random: 4.0},
                {option: 42041, random: 4.0},
                {option: 42042, random: 4.0},
                {option: 42043, random: 4.0},
                {option: 42044, random: 4.0},
                {option: 42045, random: 4.0},
                {option: 42046, random: 4.0},
                {option: 42060, random: 4.0},
                {option: 42086, random: 4.0},
                {option: 42091, random: 4.0},
                {option: 42092, random: 4.0},
                {option: 42093, random: 4.0},
                {option: 42094, random: 4.0},
                {option: 42551, random: 4.0},
                {option: 42656, random: 4.0},
                {option: 42052, random: 2.5},
                {option: 42054, random: 2.5}
            ],
            Cap: [
                {option: 42556, random: 2.5}
            ],
            Glove: [
                {option: 42059, random: 2.5}
            ]
        }
    }
};
let cube = [5062507, 5062031, 5062512];

execute();

function execute() {
    let txt = "潛能中心\r\n\r\n";
    txt += "#r#L0#主副武器/徽章#l\t#L1#防具/飾品#l\t#L2#徽章主潛#l\r\n\r\n";
    txt += "#r#L3#機器人潛能#l\r\n\r\n";
    txt += "附加魔方概率與官方相同請選擇您想使用的魔方\r\n\r\n";
    txt += "#b使用附加魔方的物品放置 [ #r1#b ] 位置\r\n\r\n";
    let sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            stage.runScript("expand/cube_0");
            break;
        case 1:
            txt = "潛能中心\r\n\r\n";
            txt += "\r\n";
            txt += "附加魔方概率與官方相同請選擇您想使用的魔方\r\n\r\n";
            txt += "#b使用附加魔方的物品放置 [ #r1#b ] 位置\r\n\r\n";
            for (let i in cube) {
                txt += "#L" + i + "##i" + cube[i] + "##l\t";
            }
            let url = npc.meFlip().askMenu(txt);

            switch (url) {
                case 2:
                    stage.runScript("expand/block_1")
                    return;
            }
            let equip = stage.getItemBySlot(1, 1);

            if (equip == null) {
                npc.meFlip().say("抱歉..[ 1 ] 位置不能留空");
                return;
            }
            if (equip['option4'] <= 0) {
                npc.meFlip().say("#r錯誤!#b只能用於有附加潛能的物品上!");
                return;
            }
            let genre = form(equip['itemId']);
            if (genre == null) {
                npc.meFlip().say("該物品不能進行潛能 或 選擇的模式不正確");
                return;
            }
            let charAT = parseInt(String(equip['option4']).charAt(0));
            if (charAT != 4) {
                npc.meFlip().say("#r錯誤!#b只有傳說附加潛能才允許使用!");
                return;
            }
            while (true) {
                if (!stage.hasMesos(1000000)) {
                    npc.meFlip().say("抱歉..你沒有 100 萬楓幣");
                    return;
                }
                if (!stage.hasItem(cube[url], 1)) {
                    npc.meFlip().say("抱歉..你沒有 #i" + cube[url] + "#");
                    return;
                }
                stage.loseItem(cube[url], 1);
                stage.loseMesos(1000000);
                switch (url) {
                    case 0:
                        txt = "";
                        txt += "\t\t#i" + cube[url] + "#\t\t\t\t#i" + equip['itemId'] + "#\r\n";
                        txt += "\t#r[ #b" + marinString(" ", 10, stage.getItemQuantity(cube[url]).toString()) + "#r ]"
                        txt += "\t\t\t#r[ #b" + marinString(" ", 4, (charAT == 1 ? "特殊" : charAT == 2 ? "稀有" : charAT == 3 ? "罕見" : "傳說").toString()) + "#r ]\r\n";
                        txt += "\r\n\r\n";
                        if (equip['option4'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[equip['option4']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        if (equip['option5'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[equip['option5']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        if (equip['option6'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[equip['option6']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        if (npc.meFlip().askYesNo(txt) != 1) return;

                        let orient = grade[20][genre[1]];
                        let potentials = orient.share.slice();
                        if (genre[0] in grade[20][1]) {
                            potentials = potentials.concat(grade[20][1][genre[0]]);
                        }

                        equip["option4"] = selectPotential(potentials);
                        let orandom = marinrandom(0, 100);
                        //stage.dropMessage(0x15, " option 4 random :" + orandom)
                        if (orandom > 10) {
                            orient = grade[19][genre[1]];
                            potentials = orient.share.slice();
                            if (genre[0] in grade[19][1]) {
                                potentials = potentials.concat(grade[19][1][genre[0]]);
                            }
                        } else {
                            orient = grade[20][genre[1]];
                            potentials = orient.share.slice();
                            if (genre[0] in grade[20][1]) {
                                potentials = potentials.concat(grade[20][1][genre[0]]);
                            }
                        }

                        equip["option5"] = selectPotential(potentials);
                        orandom = marinrandom(0, 100);
                        //stage.dropMessage(0x15, " option 5 random :" + orandom)
                        if (orandom > 7) {
                            orient = grade[19][genre[1]];
                            potentials = orient.share.slice();
                            if (genre[0] in grade[19][1]) {
                                potentials = potentials.concat(grade[19][1][genre[0]]);
                            }
                        } else {
                            orient = grade[20][genre[1]];
                            potentials = orient.share.slice();
                            if (genre[0] in grade[20][1]) {
                                potentials = potentials.concat(grade[20][1][genre[0]]);
                            }
                        }
                        equip["option6"] = selectPotential(potentials);

                        let isjudge = [40051, 40052, 42052, 42054, 42556, 42059];
                        if (isjudge.includes(equip['option4']) && equip['option4'] === equip['option5'] && equip['option4'] === equip['option6']) {
                            equip["option6"] = selectPotential(potentials);
                        }
                        break;

                    case 1:
                        txt = "";
                        txt += "\t\t#i" + cube[url] + "#\t\t\t\t#i" + equip['itemId'] + "#\r\n";
                        txt += "\t#r[ #b" + marinString(" ", 10, stage.getItemQuantity(cube[url]).toString()) + "#r ]"
                        txt += "\t\t\t#r[ #b" + marinString(" ", 4, (charAT == 1 ? "特殊" : charAT == 2 ? "稀有" : charAT == 3 ? "罕見" : "傳說").toString()) + "#r ]\r\n";
                        txt += "\r\n";
                        txt += "#L0##r默認附加潛能\r\n";
                        if (equip['option4'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[equip['option4']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        if (equip['option5'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[equip['option5']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        if (equip['option6'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[equip['option6']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        txt += "#l\r\n";
                        let option_face = [];
                        orient = grade[20][genre[1]];
                        potentials = orient.share.slice();
                        if (genre[0] in grade[20][1]) {
                            potentials = potentials.concat(grade[20][1][genre[0]]);
                        }

                        option_face[0] = selectPotential(potentials);
                        orandom = marinrandom(0, 100);
                        //stage.dropMessage(0x15, " option 4 random :" + orandom)
                        if (orandom > 10) {
                            orient = grade[19][genre[1]];
                            potentials = orient.share.slice();
                            if (genre[0] in grade[19][1]) {
                                potentials = potentials.concat(grade[19][1][genre[0]]);
                            }
                        } else {
                            orient = grade[20][genre[1]];
                            potentials = orient.share.slice();
                            if (genre[0] in grade[20][1]) {
                                potentials = potentials.concat(grade[20][1][genre[0]]);
                            }
                        }

                        option_face[1] = selectPotential(potentials);
                        orandom = marinrandom(0, 100);
                        //stage.dropMessage(0x15, " option 5 random :" + orandom)
                        if (orandom > 7) {
                            orient = grade[19][genre[1]];
                            potentials = orient.share.slice();
                            if (genre[0] in grade[19][1]) {
                                potentials = potentials.concat(grade[19][1][genre[0]]);
                            }
                        } else {
                            orient = grade[20][genre[1]];
                            potentials = orient.share.slice();
                            if (genre[0] in grade[20][1]) {
                                potentials = potentials.concat(grade[20][1][genre[0]]);
                            }
                        }
                        option_face[2] = selectPotential(potentials);

                        isjudge = [40051, 40052, 42052, 42054, 42556, 42059];
                        if (isjudge.includes(option_face[0]) && option_face[0] === option_face[1] && option_face[0] === option_face[2]) {
                            option_face[2] = selectPotential(potentials);
                        }
                        txt += "#L1##r新的附加潛能\r\n"
                        if (equip['option4'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[option_face[0]][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        if (equip['option5'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[option_face[1]][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        if (equip['option6'] > 0) {
                            txt += "#b副潛能 #r" + option.tabulation[option_face[2]][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                        }
                        txt += "#l\r\n";
                        url_1 = npc.meFlip().askMenu(txt);

                        switch (url_1) {
                            case 1:
                                if (equip['option4'] > 0) {
                                    equip['option4'] = option_face[0]
                                }
                                if (equip['option5'] > 0) {
                                    equip['option5'] = option_face[1]
                                }
                                if (equip['option6'] > 0) {
                                    equip['option6'] = option_face[2]
                                }
                                break;
                        }
                        break;
                }
                //stage.dropMessage(0x16, "option 4 :" + equip['option4']);
                //stage.dropMessage(0x16, "option 5 :" + equip['option5']);
                //stage.dropMessage(0x16, "option 6 :" + equip['option6']);
                stage.updateItemBySlot(1, 1);
            }
            break;
        case 2:
            equip = stage.getItemBySlot(1, 1);
            if (equip['itemId'] != 1190544) {
                npc.meFlip().say("只支持 #i1190544#");
                return;
            }
            txt = "當前功能只有 #i" + equip['itemId'] + "# 才能使用\r\n";
            txt += "#d1.只有潛能屬性 :#b物理攻擊力:+12% / 魔法攻擊力:+12%#k\r\n";
            txt += "#d2.#r才可以變更成:攻擊BOSS怪物時傷害:+40%\r\n\r\n";
            let option_judge = [40051, 40052, 42051, 42053]
            if (option_judge.indexOf(equip['option1']) > -1) {
                txt += "#b滿足條件 #r" + option.tabulation[equip['option1']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
            }
            if (option_judge.indexOf(equip['option2']) > -1) {
                txt += "#b滿足條件 #r" + option.tabulation[equip['option2']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
            }
            if (option_judge.indexOf(equip['option3']) > -1) {
                txt += "#b滿足條件 #r" + option.tabulation[equip['option3']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
            }
            txt += "\r\n";
            txt += "是否立即使用當前功能?\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            if (option_judge.indexOf(equip['option1']) > -1) {
                equip['option1'] = 40603
            }
            if (option_judge.indexOf(equip['option2']) > -1) {
                equip['option2'] = 40603
            }
            if (option_judge.indexOf(equip['option3']) > -1) {
                equip['option3'] = 40603
            }
            stage.updateItemBySlot(1, 1);
            npc.meFlip().say("變更成功!");
            break;
        case 3:
            marin = [1662002, 1662003];
            let grades = {
                18: [20041, 20042, 20043, 20044, 20045, 20046, 20086],
                19: [30041, 30042, 30043, 30044, 30045, 30046, 30086],
                20: [40041, 40042, 40043, 40044, 40045, 40046, 40086]
            };
            txt = "機器人潛能\r\n\r\n";
            txt += "將你想變更潛能的機器人放置 [ 1 ] 位置\r\n";
            txt += "消耗#i5062009# x 1 跟 50萬楓幣\r\n";
            txt += "支持的機器人如下列所示\r\n";
            for (let i in marin) {
                txt += "#i" + marin[i] + "#　";
            }
            if (npc.meFlip().askYesNo(txt) != 1) return;

            equip = stage.getItemBySlot(1, 1);
            if (equip == null) {
                npc.meFlip().say("抱歉..[ 1 ] 位置不能留空");
                return;
            }
            if (marin.indexOf(equip['itemId']) <= -1) {
                npc.meFlip().say("抱歉..支持的機器人如下列所示\r\n#i1662002##i1662003");
                return;
            }
            while (true) {
                txt = "機器人潛能\r\n";
                txt += "#b主潛能 #r" + option.tabulation[equip['option1']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                txt += "#b主潛能 #r" + option.tabulation[equip['option2']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                txt += "#b主潛能 #r" + option.tabulation[equip['option3']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                txt += "\r\n";
                txt += "立即消耗 #i" + 5062009 + "# or 50萬楓幣重置潛能嗎?\r\n";
                if (npc.meFlip().askYesNo(txt) != 1) return;

                if (!stage.hasMesos(500000)) {
                    npc.meFlip().say("抱歉..你沒有 50 萬楓幣");
                    return;
                }
                if (!stage.hasItem(5062009, 1)) {
                    npc.meFlip().say("抱歉..你沒有#i5062009#");
                    return;
                }

                let random = marinrandom(0, 100);
                if (equip['grade'] < 20 && random <= 10) {
                    equip['grade'] += 1;
                }

                let option_key = grades[equip['grade']];
                let options = [];

                if (equip['grade'] === 20) {
                    options.push(option_key[Math.floor(Math.random() * option_key.length)]);

                    if (marinrandom(1, 100) <= 50) {
                        options.push(option_key[Math.floor(Math.random() * option_key.length)]);
                    } else {
                        options.push(grades[19][Math.floor(Math.random() * grades[19].length)]);
                    }

                    if (marinrandom(1, 100) <= 30) {
                        options.push(option_key[Math.floor(Math.random() * option_key.length)]);
                    } else {
                        options.push(grades[19][Math.floor(Math.random() * grades[19].length)]);
                    }
                } else {
                    while (options.length < 3) {
                        let randomIndex = Math.floor(Math.random() * option_key.length);
                        let randomElement = option_key[randomIndex];
                        if (!options.includes(randomElement)) {
                            options.push(randomElement);
                        }
                    }
                }

                equip['option1'] = options[0];
                equip['option2'] = options[1];
                equip['option3'] = options[2];

                stage.loseMesos(500000);
                stage.loseItem(5062009, 1);
                stage.updateItemBySlot(1, 1);

                txt = "機器人潛能\r\n";
                txt += "#b主潛能 #r" + option.tabulation[equip['option1']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                txt += "#b主潛能 #r" + option.tabulation[equip['option2']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
                txt += "#b主潛能 #r" + option.tabulation[equip['option3']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";

                npc.meFlip().say(txt + "\r\n\r\n變更了!");
            }
            break;
    }
}

function selectPotential(potentials) {
    let totalProbability = potentials.reduce((sum, potential) => sum + potential.random, 0);
    let randomValue = Math.random() * totalProbability;
    let selectedPotential = null;

    for (let i = 0; i < potentials.length; i++) {
        randomValue -= potentials[i].random;
        if (randomValue <= 0) {
            selectedPotential = potentials[i].option;
            break;
        }
    }
    return selectedPotential;
}

function form(itemId) {
    let ret = db.select("SELECT * FROM `marin_information` WHERE `id` = '" + itemId + "' LIMIT 0,1;");
    if (ret.length <= 0) {
        return null;
    }
    switch (String(ret[0].get("form"))) {
        case "Accessory":
        case "Cap":
        case "Cape":
        case "Coat":
        case "Face":
        case "Glove":
        case "Longcoat":
        case "Pants":
        case "Ring":
        case "Shoes":
        case "Android":
            return [ret[0].get("form"), 1];

        default:
            return [ret[0].get("form"), null];
    }
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}