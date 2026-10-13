/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/* marin 50009219 [ 彩虹 → 魔靈 ] 2022-12-6 腳本定製 技術顧問 */
let bute_A = [//這裡是普通的
 //   [2637945, 100000, 1, 1],//1E突破
    [4310156, 10000, 1, 1],//AS幣
    [4001879, 10000, 1, 1],//幻影幣
    [5680724, 20000, 1, 1],//100抵用
    [2636884, 10000, 1, 4],//6轉氣息
    [2432206, 100000, 1, 1],//X
    [2435824, 20000, 1, 1],//V
    [5062009, 80000, 1, 2],//紅
    [5062500, 30000, 1, 1],//綠
    [5062024, 10000, 1, 1],//六
	[2430027, 10000, 1, 1],//5E
    [5062021, 10000, 1, 1],//平等
 //   [4001839, 50000, 100, 150],//星星
]
let bute_B = [//這裡是抽了10次后從第10次從這裏然後進行重置
    [4001715, 10000, 1, 1],//1E
    [4001716, 5000, 1, 1],//10E
    [2633915, 10000, 1, 1],//神秘
    [2636884, 50000, 1, 41],//500氣息
    [2049317, 50000, 1, 1],//17X
    [5062009, 100000, 2, 2],//紅
    [5062500, 100000, 2, 2],//綠
    [5680724, 100000, 3, 3],//100抵用
    [2430027, 10000, 1, 1],//5E
	[2430028, 10000, 1, 1],//5E
    [4009548, 30000, 1, 100]//小核心

]
let log = require('check_log');
marinStart();

function marinStart() {
    var num = parseInt(log.getPQLog(stage, db, "福袋效驗"));
    var chance = Math.floor(Math.random() * 100000);
    var group = [];
    switch (true) {
        case num < 10:
            log.addPQLog(stage, db, "福袋效驗", 1, 365);
            for (var i in bute_A) {
                if (bute_A[i][1] >= chance) group.push(bute_A[i]);
            }
            break;
        default:
            log.resetPQLog(stage, db, "福袋效驗");
            for (var i in bute_B) {
                if (bute_B[i][1] >= chance) group.push(bute_B[i]);
            }
            break;
    }
    txt = "福袋\r\n\r\n";
    if (group.length != 0) {
        var pos = Math.floor(Math.random() * group.length);
        var A = group[pos][0];
        var B = group[pos][2];
        var C = group[pos][3];
        if (C == 0) {
            stage.gainItem(A, B);
        } else {
            stage.gainItem(A, B);
        }
        txt += "#r恭喜#k [ #r抽中#k ] 數量 #b" + marinstring(" ", 4, B.toString()) + "#k 個 - #b#i" + A + "##z" + A + "##k\r\n";
    } else {
        stage.gainItem(2438084, 5);
        txt += "#r恭喜#k [ #r抽中#k ] 數量 #b" + marinstring(" ", 4, parseInt(5).toString()) + "#k 個 - #b#i" + 2438084 + "##z" + 2438084 + "##k\r\n";
    }
    ctx.consume();
    npc.say(txt);
}


function marinstring(charToFill, totalLength, originalString) {
    const lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    const length = originalString.length + lengthOfDoubleByteChars;
    const charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}

