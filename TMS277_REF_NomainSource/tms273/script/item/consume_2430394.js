var marin = [1012632, 1122430, 1113306, 1022278];
var randomIndex = Math.floor(Math.random() * marin.length);
var randomElement = marin[randomIndex];
stage.gainItem(randomElement, 1);
stage.loseItem(ctx.getDataId(), 1);
npc.meFlip().say("恭喜你獲得了 #i" + randomElement + "##z" + randomElement + "#");