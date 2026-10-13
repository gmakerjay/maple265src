if (stage.getGuildId() > 0) {
    stage.modifyGuildCommitment(marinrandom(300, 300));
    stage.loseItem(ctx.getDataId(), 1);
} else {
    npc.meFlip().say("抱歉..你沒有加入任何公會!");
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}