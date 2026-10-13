let marin = [
    [5062021, 88],
    [5062026, 88],
    [5062507, 88],
    [5062031, 88],
    [2472001, 88],
    [2636421, 88],
    [4009548, 88],
    [5060048, 8]
]
txt = "\r\n";
for (let i in marin) {
    stage.gainItem(marin[i][0], marin[i][1]);
    txt += "#i" + marin[i][0] + "#x" + marin[i][1];
}
stage.loseItem(ctx.getDataId(), 1);
npc.meFlip().say(txt);















