/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
option = require("option_tabulation");

let cube = [5062507, 5062031, 5062512];

let potential = {
    1: {
        40045: 7.6923,
        40046: 7.6923,
        40051: 2.5641,
        40052: 2.5641,
        40055: 5.1282,
        40041: 7.6923,
        40042: 7.6923,
        40043: 7.6923,
        40044: 7.6923,
        40070: 5.1282,
        40086: 5.1282,
        42292: 7.6923,
        42602: 5.1282,
        42091: 5.1282,
        42092: 5.1282,
        42093: 5.1282,
        42094: 5.1282
    },
    2: {
        30045: 6.9420,
        30046: 6.9420,
        30051: 4.6280,
        30052: 4.6280,
        30055: 7.2560,
        30041: 6.9420,
        30042: 6.9420,
        30043: 6.9420,
        30044: 6.9420,
        30070: 7.2560,
        30086: 4.6280,
        32091: 4.6280,
        32092: 4.6280,
        32093: 4.6280,
        32094: 4.6280,
        32291: 6.3140,
        32601: 4.6280
    },
    3: {
        30045: 6.9420,
        30046: 6.9420,
        30051: 4.6280,
        30052: 4.6280,
        30055: 7.2560,
        30041: 6.9420,
        30042: 6.9420,
        30043: 6.9420,
        30044: 6.9420,
        30070: 7.2560,
        30086: 4.6280,
        32091: 4.6280,
        32092: 4.6280,
        32093: 4.6280,
        32094: 4.6280,
        32291: 6.3140,
        32601: 4.6280
    }
}
execute();

function execute() {
    let equip = stage.getItemBySlot(1, 1);
    if (equip == null) {
        npc.meFlip().say("抱歉..[ 1 ] 位置不能留空");
        return;
    }
    txt = "附加魔方功能只能用於 #r武器 副武器 徽章#k\r\n";
    txt += "\r\n";
    txt += "附加魔方概率與官方相同請選擇您想使用的魔方\r\n\r\n";
    txt += "#b使用附加魔方的物品放置 [ #r1#b ] 位置\r\n\r\n";
    for (let i in cube) {
        txt += "#L" + i + "##i" + cube[i] + "##l\t";
    }
    sel_0 = npc.meFlip().askMenu(txt);

    //stage.dropMessage(0x15, equip['option4'])
    //stage.dropMessage(0x15, equip['option5'])
    //stage.dropMessage(0x15, equip['option6'])
    if (getitemtype(equip['itemId']) == null) {
        npc.meFlip().say("#r錯誤!#b [ 1 ] 位置的物品並不是 武器 副武器 徽章 範圍!");
        return;
    }
    if (equip['option4'] <= 0) {
        npc.meFlip().say("#r錯誤!#b只能用於有附加潛能的物品上!");
        return;
    }
    switch (sel_0) {
        case 2:
            stage.runScript("expand/block")
            return;
    }
    while (true) {
        let charAT = parseInt(String(equip['option4']).charAt(0));
        if (charAT != 4) {
            npc.meFlip().say("#r錯誤!#b只有傳說附加潛能才允許使用!");
            return;
        }
        txt = "";
        txt += "\t\t#i" + cube[sel_0] + "#\t\t\t\t#i" + equip['itemId'] + "#\r\n";
        txt += "\t#r[ #b" + marinString(" ", 10, stage.getItemQuantity(cube[sel_0]).toString()) + "#r ]"
        txt += "\t\t\t#r[ #b" + marinString(" ", 4, (charAT == 1 ? "特殊" : charAT == 2 ? "稀有" : charAT == 3 ? "罕見" : "傳說").toString()) + "#r ]\r\n";
        txt += "\r\n";
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
        if (!stage.hasItem(cube[sel_0], 1)) {
            npc.meFlip().say("抱歉..你沒有 #i" + cube[sel_0] + "#");
            return;
        }
        if (!stage.hasMesos(1000000)) {
            npc.meFlip().say("抱歉..你沒有 100 萬楓幣");
            return;
        }
        stage.loseItem(cube[sel_0], 1);
        stage.loseMesos(1000000);
        switch (sel_0) {
            case 0:
                if (equip['option4'] > 0) {
                    equip['option4'] = selectObjectByProbability(potential, 1);
                }
                if (equip['option5'] > 0) {
                    option_random = marinrandom(0, 100)
                    //stage.dropMessage(0x15, option_random)
                    if (option_random > 7) {
                        equip['option5'] = selectObjectByProbability(potential, 2);
                    } else {
                        equip['option5'] = selectObjectByProbability(potential, 1);
                    }
                }
                if (equip['option6'] > 0) {
                    option_random = marinrandom(0, 100)
                    //stage.dropMessage(0x16, option_random)
                    if (option_random > 5) {
                        equip['option6'] = selectObjectByProbability(potential, 3);
                    } else {
                        equip['option6'] = selectObjectByProbability(potential, 1);
                    }
                }
                while (equip['option6'] == equip['option5'] && equip['option6'] == equip['option4']) {
                    if (equip['option4'] > 0) {
                        equip['option4'] = selectObjectByProbability(potential, 1);
                    }
                    if (equip['option5'] > 0) {
                        option_random = marinrandom(0, 100)
                        if (option_random > 7) {
                            equip['option5'] = selectObjectByProbability(potential, 2);
                        } else {
                            equip['option5'] = selectObjectByProbability(potential, 1);
                        }
                    }
                    if (equip['option6'] > 0) {
                        option_random = marinrandom(0, 100)
                        if (option_random > 7) {
                            equip['option6'] = selectObjectByProbability(potential, 3);
                        } else {
                            equip['option6'] = selectObjectByProbability(potential, 1);
                        }
                    }
                }
                //stage.dropMessage(0x13, "option4 : " + equip['option4'])
                //stage.dropMessage(0x13, "option5 : " + equip['option5'])
                //stage.dropMessage(0x13, "option6 : " + equip['option6'])
                stage.updateItemBySlot(1, 1);
                break;

            case 1:
                txt = "";
                txt += "\t\t#i" + cube[sel_0] + "#\t\t\t\t#i" + equip['itemId'] + "#\r\n";
                txt += "\t#r[ #b" + marinString(" ", 10, stage.getItemQuantity(cube[sel_0]).toString()) + "#r ]"
                txt += "\t\t\t#r[ #b" + marinString(" ", 4, (equip['grade'] == 18 ? "稀有" : equip['grade'] == 19 ? "罕見" : "傳說").toString()) + "#r ]\r\n";
                txt += "\r\n";
                txt += "#L0##r默認附加潛能\r\n"
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
                option_face[0] = Number(selectObjectByProbability(potential, 1));
                option_random = marinrandom(0, 100)
                if (option_random > 7) {
                    option_face[1] = Number(selectObjectByProbability(potential, 2));
                } else {
                    option_face[1] = Number(selectObjectByProbability(potential, 1));
                }
                option_random = marinrandom(0, 100)
                if (option_random > 7) {
                    option_face[2] = Number(selectObjectByProbability(potential, 3));
                } else {
                    option_face[2] = Number(selectObjectByProbability(potential, 1));
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
                url = npc.meFlip().askMenu(txt);

                switch (url) {
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
                        stage.updateItemBySlot(1, 1);
                        break;
                }
                break;

            case 2:
                stage.runScript("expand/block")
                break;
        }
    }
}

function getitemtype(itemid) {
    const type = Math.floor(itemid / 10000);
    if ([109, 121, 122, 123, 124, 126, 127, 128, 129, 130, 131, 132, 133, 134, 136, 137, 138, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 156, 157, 158, 159, 160, 169, 170, 125, 154, 155].includes(type)) {
        return 1;
    } else if (type == 135) {
        return 2;
    } else if (type == 119) {
        return 3;
    } else {
        return null;
    }
}

function selectObjectByProbability(potential, option) {
    var group = potential[option];
    var keys = Object.keys(group);
    var totalProbability = keys.reduce((sum, objectId) => sum + group[objectId], 0);
    var randomProbability = Math.random() * totalProbability;
    let selectedObject;
    let accumulatedProbability = 0;
    for (var objectId of keys) {
        accumulatedProbability += group[objectId];
        if (randomProbability <= accumulatedProbability) {
            selectedObject = objectId;
            break;
        }
    }
    return selectedObject;
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

function getLeftmostResult(option) {
    let leftmostDigit = parseInt(option.toString()[0]);

    if (leftmostDigit === 4) {
        return "傳說";
    } else if (leftmostDigit === 3) {
        return "罕見";
    } else {
        return "其他";
    }
}