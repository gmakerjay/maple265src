/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */


marinStart();

function marinStart() {
    var txt = "必須打敗黑魔法師。。。。\r\n\r\n";
    txt += "只要您交給我一些道具，我就幫你合成#i4001895##z4001895#\r\n";
    txt += "才可以和我進行交易。\r\n\r\n";
    txt += "#L0##r兌換#b#i4001895##z4001895# #r[查看詳情]#l\r\n"
    sel = npc.meFlip().askMenu(txt);

    var txt = "#e#d命運碎片需要的材料：#k#n\r\n\r\n";
    txt += "\t" + "#z4001894##i4001894##b\t" + marinString(" ", 5, stage.getItemQuantity(4001894).toString()) + " /  5 個\r\n";
    txt += "\t" + "#d#z4001893##i4001893##b\t    " + marinString(" ", 5, stage.getItemQuantity(4001893).toString()) + " / 10 個\r\n";
    txt += "\r\n";
    txt += "#k#n請輸入兌換數量\r\n ";
    num = npc.meFlip().minNum(1).maxNum(1000).defNum(0).askNumber(txt);
    var marin = [null, null];
    marin[0] = 5 * num;
    marin[1] = 10 * num;
    if (!stage.hasItem(4001894, marin[0]) || !stage.hasItem(4001893, marin[1])) {
        npc.meFlip().say("抱歉..你的#z4001894##i4001894# 或 #z4001893##i4001893# 數量沒有達標");
        return;
    }
    stage.gainItem(4001895, num);
    stage.loseItem(4001894, marin[0]);
    stage.loseItem(4001893, marin[1]);
    npc.meFlip().say("恭喜。。兌換成功");
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}
