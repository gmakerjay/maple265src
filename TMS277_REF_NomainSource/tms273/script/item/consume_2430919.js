marinStart();

function marinStart() {
    yeno = npc.meFlip().askYesNo("你想完成#e#r口袋欄任務嗎#n#k嗎？！！");
    if (yeno != 1) return;
    stage.completeQuest(6500);
    stage.completeQuest(32240);
    stage.completeQuest(36102);
    stage.loseItem(ctx.getDataId(), 1);
    npc.meFlip().say("恭喜你完成了！");
}
