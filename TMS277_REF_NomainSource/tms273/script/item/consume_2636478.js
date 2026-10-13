let marin = [1713004];

marinStart();
 
function marinStart() {
    var txt = "以下裝備任選一件\r\n\r\n";
    for (var i in marin) {
        txt += "#L" + i + "##v" + marin[i] + "##z" + marin[i] + "##l\r\n";
    }
    sel = npc.meFlip().askMenu(txt);

    var txt = "請輸入你想兌換#i" + marin[sel] + "# 的數量 #r（背包剩餘空位" + stage.getFreeSlot(1) + " 個）\r\n";
    num = npc.meFlip().minNum(1).maxNum(stage.getItemQuantity(ctx.getDataId()) > 100 ? 100 : stage.getItemQuantity(ctx.getDataId())).defNum(1).askNumber(txt);
    if (num > stage.getFreeSlot(1)) {
        npc.meFlip().say("抱歉..你只允許兌換 " + stage.getFreeSlot(1) + " 個！沒有額外空間了");
        return;
    }
    stage.gainItem(marin[sel], num);
    stage.loseItem(ctx.getDataId(), num);
    npc.meFlip().say("兌換成功");
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}