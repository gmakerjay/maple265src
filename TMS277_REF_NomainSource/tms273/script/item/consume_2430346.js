if (npc.meFlip().askYesNo("確認使用當前騎寵嗎 ? #i" + ctx.getDataId() + "# ") === 1) {
    stage.changeSkillLevel(80012311, 1, new Date().getTime() + 90 * 24 * 60 * 60 * 1000);
    stage.loseItem(ctx.getDataId(), 1);
}
