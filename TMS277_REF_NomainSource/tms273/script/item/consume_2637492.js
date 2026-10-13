const boxId = ctx.getDataId();
const boxName = `紅玉BOSS戒指箱(中級)`;
const rings = [
    [1113329, 20, '持續之戒', [90, 10]],
    [1113098, 50, '克制之戒', [90, 10]],
    [1113108, 100, '集成之戒', [60, 36, 4]],
    [1113109, 100, '等級增益S', [60, 36, 4]],
    [1113110, 100, '等級增益D', [60, 36, 4]],
    [1113111, 100, '等級增益I', [60, 36, 4]],
    [1113112, 100, '等級增益L', [60, 36, 4]],
    [1113113, 60, '武器增益S', [90, 10]],
    [1113114, 60, '武器增益D', [90, 10]],
    [1113115, 60, '武器增益I', [90, 10]],
    [1113116, 60, '武器增益L', [90, 10]],
    [1113122, 100, '風險之戒', [90, 10]],
    [1113104, 100, '爆擊傷害戒指', [60, 36, 4]],
    [1113125, 100, '水晶HM', [60, 36, 4]],
    [1113099, 100, '末日之戒', [60, 36, 4]],
    [1113100, 100, '極限之戒', [60, 36, 4]],
    [1113101, 100, '嗜血之戒', [60, 36, 4]],
    [1113102, 100, '嗜魂之戒', [60, 36, 4]],
    [1113105, 100, '暴擊破甲之戒', [60, 36, 4]],
    [1113106, 100, '暴擊輪換之戒', [60, 36, 4]],
    [1113107, 100, '穩如泰山輪換之戒', [60, 36, 4]],
    [1113117, 100, '迅捷之戒', [60, 36, 4]],
    [1113118, 100, '穿越之戒', [60, 36, 4]],
    [1113119, 100, '護盾消長之戒', [60, 36, 4]],
    [1113120, 100, '反射之戒', [60, 36, 4]],
    [1113121, 100, '消解之戒', [60, 36, 4]],
    [1113123, 100, '水晶H', [60, 36, 4]],
    [1113124, 100, '水晶M', [60, 36, 4]],
    [1113126, 100, '康復穩如泰山之戒', [60, 36, 4]],
    [1113127, 100, '康復防禦之戒', [60, 36, 4]],
    [1113128, 100, '起源之塔增強之戒', [60, 36, 4]],
    [1113103, 100, '持久之戒', [60, 36, 4]],
];

function start() {
    let str = `#v${boxId}:i##z${boxId}:i#\r\n`;
    str += `隨機獲得下列戒指的其中一個，戒指概率均等，等級隨着箱子品級波動\r\n`;
    for (let i = 0; i < rings.length; i++) {
        str += `#v${rings[i][0]}:i#`;
    }
    str += `\r\n#r是否開啟？`;

    if (npc.askYesNo(str) != 1) return;

    if (!stage.hasItem(boxId, 1)) {
        npc.say("箱子不足");
        return;
    }

    if (stage.getFreeSlot(1) < 2) {
        npc.say("背包空間不足");
        return;
    }

    const totalWeight = rings.reduce((sum, item) => sum + item[1], 0);
    const r = Math.random() * totalWeight;
    let selected = null;
    let acc = 0;

    for (let i = 0; i < rings.length; i++) {
        acc += rings[i][1];
        if (r < acc) {
            selected = rings[i];
            break;
        }
    }

    if (!selected) {
        npc.say("獎品抽取失敗。");
        return;
    }

    // 等級抽取
    const levelWeights = selected[3];
    const levelTotal = levelWeights.reduce((sum, w) => sum + w, 0);
    const levelRand = Math.random() * levelTotal;
    let level = 1;
    let levelSum = 0;
    for (let i = 0; i < levelWeights.length; i++) {
        levelSum += levelWeights[i];
        if (levelRand < levelSum) {
            level = i + 1;
            break;
        }
    }

    stage.loseItem(boxId, 1);
    const toDrop = util.makeItem(selected[0], 1);
    toDrop.setLevel(level);
    stage.gainItem(toDrop);

    npc.say(`恭喜獲得！\r\n#v${selected[0]}:i##z${selected[0]}:i#\r\n#r等級：${level}`);
}

start();
