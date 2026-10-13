
if (npc.meFlip().askYesNo("確認應用當前膚色嗎?") == 1) {
    player.setSkin(9);
    stage.loseItem(ctx.getDataId(), 1);
}