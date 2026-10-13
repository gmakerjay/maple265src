while (stage.getLevel() < 200) {
    if (stage.getLevel() >= 200) break;
    stage.gainExp(ctx.getPersonalityExpByLevel(stage.getLevel()));
}
stage.loseItem(ctx.getDataId(), 1);