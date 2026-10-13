let marin = [2430915, 25, 2049512];

marinStart();

function marinStart() {
    if (!stage.hasItem(marin[0], marin[1])) {
        npc.meFlip().say("你沒有 " + marin[1] + " 個#i" + marin[0] + "#");
        return;
    }
    var count = parseInt(stage.getItemQuantity(marin[0]) / marin[1]);
    var maxnum = marin[1] * count;
    while (maxnum > 20000) {
        stage.loseItem(marin[0], -20000);
        maxnum -= 20000;
    }
    stage.loseItem(marin[0], maxnum);
    stage.gainItem(marin[2], count);
    stage.broadcastGachaponMsg( " 兌換了 " + count + " 個",marin[2]);
}