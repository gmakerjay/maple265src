let marin = [
    [2636421, 2],
    [4009548, 4],
    [2636479, 10]
]
let player = require("check_log");
marinStart();

function marinStart() {
    let judge = false;
    switch (map.getId()) {
        case 910340500:
            judge = true;
            player.addEventValue(stage, db, "party1")
            break;
        case 922010900:
            judge = true;
            player.addEventValue(stage, db, "party2")
            break;
        case 921160700:
            judge = true;
            player.addEventValue(stage, db, "prison_break")
            break;
        case 920010100:
            judge = true;
            player.addEventValue(stage, db, "party3");
            marin.push([2433970, 1])
            break;
    }
    if (!judge) {
        npc.meFlip().say("抱歉..不在領獎地圖!");
        return;
    }
    for (let i in marin) {
        stage.gainItem(marin[i][0], marin[i][1]);
    }
    npc.noEsc().say("恭喜完成了當前組隊!獎勵已發送到背包");
    stage.changeMap(910002000, 0);
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}