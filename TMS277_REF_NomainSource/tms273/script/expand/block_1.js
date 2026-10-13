option = require("option_tabulation");

let common = {
    3: {
        0: {
            "032001": 545,
            "032002": 545,
            "032003": 545,
            "032004": 545,
            "032005": 545,
            "032006": 545,
            "032011": 364,
            "032041": 364,
            "032042": 364,
            "032043": 364,
            "032044": 364,
            "032045": 545,
            "032046": 545,
            "032086": 364,
            "032551": 545,
            "032091": 364,
            "032092": 364,
            "032093": 364,
            "032094": 364
        },
        1: {
            "032001": 545,
            "032002": 545,
            "032003": 545,
            "032004": 545,
            "032005": 545,
            "032006": 545,
            "032011": 364,
            "032041": 364,
            "032042": 364,
            "032043": 364,
            "032044": 364,
            "032045": 545,
            "032046": 545,
            "032086": 364,
            "032551": 545,
            "032091": 364,
            "032092": 364,
            "032093": 364,
            "032094": 364
        },
        2: {
            "032045": 698,
            "032046": 698,
            "032051": 465,
            "032053": 465,
            "032057": 465,
            "032059": 698,
            "032060": 698,
            "032061": 698,
            "032062": 698,
            "032070": 233,
            "032087": 465,
            "032291": 233,
            "032601": 233,
            "032201": 698,
            "032206": 698,
            "032091": 465,
            "032092": 465,
            "032093": 465,
            "032094": 465
        },
        3: {
            "032045": 714,
            "032046": 714,
            "032051": 476,
            "032053": 476,
            "032057": 476,
            "032059": 714,
            "032060": 714,
            "032061": 714,
            "032062": 714,
            "032070": 238,
            "032087": 476,
            "032291": 238,
            "032201": 714,
            "032206": 714,
            "032091": 476,
            "032092": 476,
            "032093": 476,
            "032094": 476
        }
    },
    4: {
        0: {
            "042001": 455,
            "042002": 455,
            "042003": 455,
            "042004": 455,
            "042005": 455,
            "042006": 455,
            "042052": 303,
            "042054": 303,
            "042041": 303,
            "042042": 303,
            "042043": 303,
            "042044": 303,
            "042045": 455,
            "042046": 455,
            "042058": 303,
            "042086": 303,
            "042091": 303,
            "042092": 303,
            "042093": 303,
            "042094": 303,
            "042551": 455,
            "042556": 455,
            "042656": 455
        },
        1: {
            "042001": 462,
            "042002": 462,
            "042003": 462,
            "042004": 462,
            "042005": 462,
            "042006": 462,
            "042052": 308,
            "042054": 308,
            "042041": 308,
            "042042": 308,
            "042043": 308,
            "042044": 308,
            "042045": 462,
            "042046": 462,
            "042059": 308,
            "042060": 308,
            "042086": 308,
            "042091": 308,
            "042092": 308,
            "042093": 308,
            "042094": 308,
            "042551": 462,
            "042656": 462
        },
        2: {
            "042001": 476,
            "042002": 476,
            "042003": 476,
            "042004": 476,
            "042005": 476,
            "042006": 476,
            "042052": 317,
            "042054": 317,
            "042041": 317,
            "042042": 317,
            "042043": 317,
            "042044": 317,
            "042045": 476,
            "042046": 476,
            "042060": 317,
            "042086": 317,
            "042091": 317,
            "042092": 317,
            "042093": 317,
            "042094": 317,
            "042551": 476,
            "042656": 476
        },
        3: {
            "042001": 469,
            "042002": 469,
            "042003": 469,
            "042004": 469,
            "042005": 469,
            "042006": 469,
            "042052": 313,
            "042054": 313,
            "042041": 313,
            "042042": 313,
            "042043": 313,
            "042044": 313,
            "042045": 469,
            "042046": 469,
            "042086": 313,
            "042091": 313,
            "042092": 313,
            "042093": 313,
            "042094": 313,
            "042501": 469,
            "042551": 469,
            "042656": 469
        },
        4: {
            "042045": 769,
            "042046": 769,
            "042051": 513,
            "042053": 513,
            "042057": 513,
            "042063": 769,
            "042064": 769,
            "042065": 769,
            "042066": 769,
            "042070": 256,
            "042087": 513,
            "042292": 256,
            "042602": 256,
            "042091": 513,
            "042092": 513,
            "042093": 513,
            "042094": 513
        },
        5: {
            "042045": 732,
            "042046": 732,
            "042051": 488,
            "042053": 488,
            "042057": 488,
            "042060": 488,
            "042063": 732,
            "042064": 732,
            "042065": 732,
            "042066": 732,
            "042070": 244,
            "042087": 488,
            "042292": 244,
            "042602": 244,
            "042091": 488,
            "042092": 488,
            "042093": 488,
            "042094": 488
        },
        6: {
            "042045": 789,
            "042046": 789,
            "042051": 526,
            "042053": 526,
            "042057": 526,
            "042063": 789,
            "042064": 789,
            "042065": 789,
            "042066": 789,
            "042070": 263,
            "042087": 526,
            "042292": 263,
            "042091": 526,
            "042092": 526,
            "042093": 526,
            "042094": 526
        }
    }
}
let cute = 5062512;
let parallel = [null, null];
let iexit = [18, 19];
start();

function start() {
    let equip = stage.getItemBySlot(1, 1);
    if (equip == null) {
        npc.meFlip().say("#r錯誤!#b只能用於有附加潛能的物品上!");
        return;
    }
    if (iexit.indexOf(getitemtype(equip['itemId'])) > -1) {
        npc.meFlip().say("武器 副武器 徽章 不能使用!");
        return;
    }
    switch (getitemtype(equip['itemId'])) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            parallel[1] = 0;
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
            parallel[1] = 1;
            break;
    }

    switch (getitemtype(equip['itemId'])) {
        case 1:
            parallel[0] = 0;
            break;
        case 5:
            parallel[0] = 1;
            break;
        case 2:
        case 3:
        case 4:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            parallel[0] = 2;
            break;
        case 16:
        case 14:
        case 15:
        case 13:
        case 12:
            parallel[0] = 3;
            break;
    }
    if (parallel[0] == null) {
        npc.meFlip().say("出錯了!!");
        return;
    }
    if (stage.isGm()) {
        var keys = Object.keys(common[4][parallel[0]]);
        for (let i in keys) {
            stage.dropMessage(0x15, Number(keys[i]) + "　" + option.tabulation[Number(keys[i])][parseInt(20) - 1])
        }
    }
    while (true) {
        let sign = [0, 0, 0];
        sign[0] = parseInt(String(equip['option4']).charAt(0));
        sign[1] = parseInt(String(equip['option5']).charAt(0));
        sign[2] = parseInt(String(equip['option6']).charAt(0));

        if (sign[0] != 4) {
            npc.meFlip().say("#r錯誤!#b只有傳說附加潛能才允許使用!");
            return;
        }
        let txt = "";
        txt += "\t\t#i" + cute + "#\t\t\t\t#i" + equip['itemId'] + "#\r\n";
        txt += "\t#r[ #b" + marinString(" ", 10, stage.getItemQuantity(cute).toString()) + "#r ]"
        txt += "\t\t\t#r[ #b" + marinString(" ", 4, (sign[0] == 1 ? "特殊" : sign[0] == 2 ? "稀有" : sign[0] == 3 ? "罕見" : "傳說").toString()) + "#r ]\r\n";
        txt += "\r\n";
        if (equip['option4'] > 0) {
            txt += "#b副潛能 #r" + (stage.isGm() ? "#fc0xFF2E8B57#" + equip['option4'] + "#r　" : "") + option.tabulation[equip['option4']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
        }
        if (equip['option5'] > 0) {
            txt += "#b副潛能 #r" + (stage.isGm() ? "#fc0xFF2E8B57#" + equip['option5'] + "#r　" : "") + option.tabulation[equip['option5']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
        }
        if (equip['option6'] > 0) {
            txt += "#b副潛能 #r" + (stage.isGm() ? "#fc0xFF2E8B57#" + equip['option6'] + "#r　" : "") + option.tabulation[equip['option6']][parseInt(util.getItemReqLevel(equip['itemId']) / 10) - 1] + "\r\n";
        }
        if (npc.meFlip().askYesNo(txt) != 1) return;
        if (!stage.hasItem(cute, 1)) {
            npc.meFlip().say("抱歉..你沒有多餘的#i" + cute + "#");
            return;
        }
        if (!stage.hasMesos(1000000)) {
            npc.meFlip().say("抱歉..你沒有 100W 楓幣");
            return;
        }
        let option_marin = common[4][4];
        equip['option4'] = selectObjectByProbability(common[4], parallel[0]);
        if (equip['option5'] > 0) {
            equip['option5'] = selectObjectByProbability(common[4], parallel[0]);
        }
        if (sign[2] == 3) {
            if (equip['option6'] > 0) {
                equip['option6'] = selectObjectByProbability(common[3], parallel[1]);
            }
        } else {
            if (equip['option6'] > 0) {
                equip['option6'] = selectObjectByProbability(common[4], parallel[0]);
            }
        }
        stage.loseItem(cute, 1);
        stage.loseMesos(1000000);
        stage.updateItemBySlot(1, 1);
    }
}

function selectObjectByProbability(potential, option) {
    const group = potential[option];
    const keys = Object.keys(group);
    const totalProbability = keys.reduce((sum, objectId) => sum + group[objectId], 0);
    const randomProbability = Math.random() * totalProbability;
    let accumulatedProbability = 0;
    const selectedObject = keys.find(objectId => {
        accumulatedProbability += group[objectId];
        return randomProbability <= accumulatedProbability;
    });
    return Number(selectedObject);
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

function getitemtype(itemid) {
    var equip_type = Math.floor(itemid / 10000);
    switch (equip_type) {
        case 100://帽子
            return 1;
        case 104://上衣
            return 2;
        case 106://褲裙
            return 3;
        case 105://套裝
            return 4;
        case 108://手套
            return 5;
        case 107://鞋子
            return 6;
        case 110://披風
            return 7;
        case 113://腰帶
            return 8;
        case 115://護肩
            return 9;
        case 166://機器人
            return 10;
        case 167://心臟
            return 11;
        case 103://耳環
            return 12;
        case 102://眼罩
            return 13;
        case 111://戒指
            return 14;
        case 101://臉飾
            return 15;
        case 112://吊墜
            return 16;
        case 118://胸章
            return 17;
        case 119://徽章
            return 19;
        default:
            var equip_type = Math.floor(equip_type / 10);
            if (equip_type == 12 || equip_type == 13 || equip_type == 14 || equip_type == 15 || equip_type == 17) {
                return 18;
            }
            return -1;
    }
}