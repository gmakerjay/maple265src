/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const ringlist = [
    [1113098, 4, '剋制之戒'],
    [1113108, 1, '集成之戒'],
    [1113109, 1, '等級增益S'],
    [1113110, 1, '等級增益D'],
    [1113111, 1, '等級增益I'],
    [1113112, 1, '等級增益L'],
    [1113113, 2, '武器增益S'],
    [1113114, 2, '武器增益D'],
    [1113115, 2, '武器增益I'],
    [1113116, 2, '武器增益L'],
    [1113122, 3, '風險之戒'],
    [1113104, 1, '爆擊傷害戒指	'],
    [1113125, 1, '水晶HM'],
    [1113099, 1, '末日之戒'],
    [1113100, 1, '極限之戒'],
    [1113101, 1, '嗜血之戒'],
    [1113102, 1, '嗜魂之戒'],
    [1113103, 1, '持久之戒'],
    [1113105, 1, '暴擊破甲之戒'],
    [1113106, 1, '暴擊輪換之戒'],
    [1113107, 1, '穩如泰山輪換之戒'],
    [1113117, 1, '迅捷之戒'],
    [1113118, 1, '穿越之戒'],
    [1113119, 1, '護盾消長之戒'],
    [1113120, 1, '反射之戒'],
    [1113121, 1, '消解之戒'],
    [1113123, 1, '水晶H'],
    [1113124, 1, '水晶M'],
    [1113126, 1, '康復穩如泰山之戒'],
    [1113127, 1, '康復防禦之戒'],
    [1113128, 1, '起源之塔增強之戒'],
    [1113243, 1, '龜龜戒指'],
];

const priceList = {
    1: [5, 20, 100, 260],
    2: [8, 32, 160, 416],
    3: [10, 40, 200, 520],
    4: [15, 60, 300, 780]
};

start();

function start() {
    var selStr = "#e#r只要你給我足夠的材料\r\n";
    selStr += "#e#r,我可以幫您無風險合成塔戒\r\n";
    selStr += "請把合成需要的戒指放在放在裝備欄的前四格。\r\n\r\n";
    selStr += `#b#L1#幫我合成#l\r\n`;
    let sel = npc.askMenu(selStr);
    switch (sel) {
        case 1:
            let can = false;
            let toDrop1 = stage.getItemBySlot(1, 1);
            let toDrop2 = stage.getItemBySlot(1, 2);
            let toDrop3 = stage.getItemBySlot(1, 3);
            let toDrop4 = stage.getItemBySlot(1, 4);
            let ringId = 0;
            let level = 0;
            let index = 999;
            let price;
            if (toDrop1 && toDrop2 && toDrop3 && toDrop4) {
                for (let i in ringlist) {
                    if (ringlist[i][0] == toDrop1.getItemId()) {
                        ringId = toDrop1.getItemId();
                        level = toDrop1.getLevel();
                        index = i;
                        price = priceList[ringlist[i][1]];
                        break;
                    }
                }
            }
            if (toDrop1.getItemId() == ringId && toDrop2.getItemId() == ringId && toDrop3.getItemId() == ringId && toDrop4.getItemId() == ringId && toDrop1.getLevel() == level && toDrop2.getLevel() == level && toDrop3.getLevel() == level && toDrop4.getLevel() == level && level < 4) {
                // npc.say(price[level-1]);
                let str = `是否要合成等級:${level + 1} 的#v${ringId}#\r\n`;
                str += `消耗等級:${level} 的#v${ringId}# x 4\r\n`;
                str += `金幣 ${price[level - 1]} E\r\n`;
                if (npc.askYesNo(str) == 1) {
                    if (stage.hasMesos(price[level - 1] * 100000000)) {
                        stage.loseMesos(price[level - 1] * 100000000);
                        stage.removeItemBySlot(1, 1);
                        stage.removeItemBySlot(1, 2);
                        stage.removeItemBySlot(1, 3);
                        stage.removeItemBySlot(1, 4);
                        let toDrop = util.makeItem(ringId, 1);
                        toDrop.setLevel(parseInt(level) + 1);
                        stage.gainItem(toDrop);
                        util.broadcastGachaponMsg(7, `恭喜玩家 <${stage.getCharacterName()}> 合成了 <${level + 1}級${util.getItemName(ringId)}>`);
                        log.addEventValue(stage, db, `戒指合成-${util.getItemName(ringId)}-${level + 1}`, 1, -1);
                        npc.say("合成成功");
                    }
                }
            } else {
                npc.say("裝備欄前四格不符合合成要求。");
                return;
            }
            break;
    }
}
