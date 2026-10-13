
var level = stage.getLevel();

if (level >= 200) {
    npc.meFlip().say("超出 200 禁止使用");
} else {
    for (var i = level; i < 200; i++) {
        stage.gainExp(0xfffffffffff);
    }
    stage.loseItem(ctx.getDataId(), 1);
}