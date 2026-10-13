// Created by MetaMS
// ID:[2638100]
// MapName:補給庫
// 高級藥材袋

let used = 1;
if (stage.getItemQuantity(2638100) > 1) {
        used = npc.id(9401988).defNum(1).minNum(1).maxNum(stage.getItemQuantity(2638100)).askNumber("\r\n目前持有的#e#b#i2638100:# #t2638100:##k#n：#r#e" + stage.getItemQuantity(2638100) + "#k個#n\r\n\r\n要一次解開幾個呢？");
}
if (stage.getItemQuantity(2638100) < used) {
        npc.id(9401988).next().say("你沒有足夠數量的#e#b#i2638100:# #t2638100:##k");
} else if (used == 1) {
        ctx.consume();
        let rCount = Math.floor(Math.random() * 100) < 15 ? 4 : 3;
        let type = Math.floor(Math.random() * rCount) + 5;
        let count = stage.getIntQuestRecordEx(504648, `o${type + 1}`) + 1;
        let itemId = 4037323 + type;
        stage.updateQuestRecordEx(504648, `o${type + 1}`, count);
        npc.id(9401988).next().say("喔喔，你獲得#b#i" + itemId + ":# #t" + itemId + ":##k 了藥材呢。\r\n把藥材帶來給我，我會用蘊含神祕效果的秘藥製作。");
} else if (used > 1) {
        stage.loseItem(ctx.getDataId(), used);
        let counts = [0, 0, 0, 0];
        for (let i = 0; i < used; i++) {
                let rCount = Math.floor(Math.random() * 100) < 15 ? 4 : 3;
                let type = Math.floor(Math.random() * rCount);
                counts[type]++;
        }
        let str = "獲得的藥材：\r\n";
        const itemIds = [4037328, 4037329, 4037330, 4037331];

        for (let i = 0; i < counts.length; i++) {
                if (counts[i] > 0) {
                        let type = i + 5;
                        let cItemId = itemIds[i];
                        let cCount = counts[i];
                        str += `#b#i${cItemId}:# #t${cItemId}:##k#r${cCount}個#k\r\n`;
                        let count = stage.getIntQuestRecordEx(504648, `o${type + 1}`) + cCount;
                        stage.updateQuestRecordEx(504648, `o${type + 1}`, count);
                }
        }
        str += "把藥材帶來給我，我會用神祕的效果製作藥水。";
        npc.id(9401988).say(str);
}