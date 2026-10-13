let minNum = 10000;
let maxNum = 10000;
let itemid = ctx.getDataId();

let number = npc.defNum(1).minNum(0).maxNum(99999).askNumber("請輸入使用 #v" + itemid + "##z" + itemid + "# 的數量");

if (stage.hasItem(itemid, number)) {
    stage.loseItem(itemid, number);
    let radnn = Math.floor(Math.random() * (maxNum * number - minNum * number) + (minNum * number));
    stage.modifyHonor(minNum + radnn);
    stage.showSystemMessage("開啟聲望 " + number + " 個，獲得聲望值: " + radnn + " 點");
    npc.say("獲得聲望值: " + radnn + " 點");
} else {
    npc.say("你沒有那麼多 #v" + itemid + "##z" + itemid + "# 哦！");
}