
const boxId = 2434974;

const list = [
    [1113211, 30, 1, "天堂", "8%"],
    [2591726, 100, 1, "卡琳", "12%"],
    [2591762, 100, 1, "林波", "12%"],
    [2591709, 100, 1, "卡洛斯", "8%"],
    [2591088, 100, 1, "希納斯", "8%"],
    [2438715, 100, 1, "水晶鳳凰", "8%"],
    [5060025, 150, 2, "豎琴", "8%"],
    [5060048, 150, 2, "蘋果", "8%"],
    [5060086, 150, 1, "畫框", "8%"],
    [5060087, 150, 1, "錦囊", "8%"],
    [2635748, 100, 5, "豪華", "8%"],
    [2430028, 50, 1, "命運", "8%"],
    [2430027, 100, 1, "榮耀", "8%"],
];

function start() {

    let str = `要打開黃金魚嗎:\r\n`;

    if (npc.askYesNo(str) == 1) {

        let item = roll(list);
        stage.loseItem(boxId, 1);
        stage.gainItem(item[0], item[2]);
 
        npc.say("獲得了 #b#v" + item[0] + "##k " + item[2] + "個");
    }
}

start();


function roll(list) {
    // 計算總權重
    let totalWeight = list.reduce((acc, item) => acc + item[1], 0);

    // 生成一個0到totalWeight之間的隨機數
    let randomNum = Math.random() * totalWeight;

    // 根據隨機數，確定抽取的獎品
    let cumulativeWeight = 0;
    for (let i in list) {
        let item = list[i]
        cumulativeWeight += item[1];
        if (randomNum < cumulativeWeight) {
            // 返回抽取的獎品的[id, 數量, 名字]
            return item;
        }
    }

    // 如果沒有成功抽取獎品（例如獎池為空），返回null或者其他適當的值
    return null;
};