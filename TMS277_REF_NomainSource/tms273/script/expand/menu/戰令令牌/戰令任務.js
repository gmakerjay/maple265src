/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


var list = [
    // ["在線1小時" ,1,30]
    // ["楓之高校", 5, 5]
     ["廢棄", 15, 1]
    , ["御龍魔", 15, 1]
    , ["逃脫", 15, 1]
    , ["玩具", 15, 1]
    , ["怪物公園", 2, 10]
    , ["跑環", 1, 25]
    , ["每日氣球", 3, 5]
    , ["怪物公園", 10, 7]
    , ["極限怪公", 30, 1]

    // , ["仙橙領地", 1, 10]

]

let xing = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";
var xiaoxingxing = "#fEffect/CharacterEff/1073453/0/0#";
var sb = "#d\t\t\t\t" + xiaoxingxing + "戰令任務(每日)" + xiaoxingxing + "#l\r\n";
for (var i = 0; i < list.length; i++) {
    sb += "#d" + marinstring(" ", 12, String(list[i][0]).toString()) + "每次:#r" + marinstring(" ", 3, (list[i][1].toString())) + "#d 總次數:#r" + marinstring(" ", 3, list[i][2].toString()) + " #d最多:#r" + (list[i][2] * list[i][1]) + "\r\n"
}
npc.say(sb)

function marinstring(charToFill, totalLength, originalString) {
    const lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    const length = originalString.length + lengthOfDoubleByteChars;
    const charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}
