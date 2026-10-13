let demo = [
    {'name': 1113306, 'weight': 5},
    {'name': 1122430, 'weight': 5},
    {'name': 1012632, 'weight': 10},
    {'name': 1022278, 'weight': 10},
    {'name': 1032316, 'weight': 23},
    {'name': 1132308, 'weight': 23},
    {'name': 2633926, 'weight': 24}
];

marinStart();

function marinStart() {
    if (!stage.hasItem(ctx.getDataId(), 50)) {
        npc.meFlip().say("抱歉..你沒有 50 個#i" + ctx.getDataId() + ":#");
        return;
    }
    stage.loseItem(ctx.getDataId(), 50);

    // Check if all weights are equal.
    const allSameWeight = demo.every((item) => item.weight === demo[0].weight);
    let res;

    if (allSameWeight) {
        // If all weights are the same, pick a random index.
        let randomIndex = Math.floor(Math.random() * demo.length);
        res = demo[randomIndex];
    } else {
        // Otherwise, use the weighted random selection as before.
        let weightSum = demo.reduce((prev, currItem) => prev + currItem.weight, 0);
        let random = Math.random() * weightSum;
        let sum = 0;
        for (let item of demo) {
            sum += item.weight;
            if (random < sum) {
                res = item;
                break;
            }
        }
    }

    // Gain the item and broadcast the message.
    stage.gainItem(res.name, 1);
    util.broadcastWorldChatMsg(23, "恭喜玩家 " + stage.getCharacterName() + " 抽到了 牛逼的漆黑物品 " + util.getItemName(res.name) + " 快恭喜Ta吧!!");
    npc.meFlip().say("恭喜 #i" + res.name + ":#");
}