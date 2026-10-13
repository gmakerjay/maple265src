// Created by MetaMS
// ID:[2638099]
// MapName:補給庫
// 一般藥材袋

let used = 1;
if (stage.getItemQuantity(2638099) > 1) {
        used = npc.id(9401988).defNum(1).minNum(1).maxNum(stage.getItemQuantity(2638099)).askNumber("\r\n目前持有的#e#b#i2638099:# #t2638099:##k#n：#r#e" + stage.getItemQuantity(2638099) + "#k個#n\r\n\r\n要一次解開幾個呢？");
}
if (stage.getItemQuantity(2638099) < used) {
        npc.id(9401988).next().say("你沒有足夠數量的#e#b#i2638099:# #t2638099:##k");
} else if (used == 1) {
        ctx.consume();
        let type = Math.floor(Math.random() * 5);
        let count = stage.getIntQuestRecordEx(504648, `o${type + 1}`) + 1;
        let itemId = 4037323 + type;
        stage.updateQuestRecordEx(504648, `o${type + 1}`, count);
        npc.id(9401988).next().say("喔喔，你獲得#b#i" + itemId + ":# #t" + itemId + ":##k 了藥材呢。\r\n把藥材帶來給我，我會用蘊含神祕效果的秘藥製作。");
} else if (used > 1) {
        stage.loseItem(ctx.getDataId(), used);
        let counts = [0, 0, 0, 0, 0];
        for (let i = 0; i < used; i++) {
                let type = Math.floor(Math.random() * 5);
                counts[type]++;
        }
        let str = "獲得的藥材：\r\n";
        const itemIds = [4037323, 4037324, 4037325, 4037326, 4037327];

        for (let i = 0; i < counts.length; i++) {
                if (counts[i] > 0) {
                        str += `#b#i${itemIds[i]}:# #t${itemIds[i]}:##k#r${counts[i]}個#k\r\n`;
                        let count = stage.getIntQuestRecordEx(504648, `o${i + 1}`) + counts[i];
                        stage.updateQuestRecordEx(504648, `o${i + 1}`, count);
                }
        }
        str += "把藥材帶來給我，我會用神祕的效果製作藥水。";
        npc.id(9401988).say(str);
}