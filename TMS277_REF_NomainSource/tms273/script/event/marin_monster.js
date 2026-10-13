/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 技術顧問 腳本訂製 劇情製作 DC <alicems_online>
 */
let monsters = [
    [104010200, 2220000, [3 * 60, 6 * 60], "天氣涼快了就會出現紅蝸牛王!", [[189, 2], [478, 250], [611, 489]]],
    [250010503, 7220002, [3 * 60, 6 * 60], "周邊的妖氣慢慢濃厚，可以聽到詭異的貓叫聲。", [[-303, 543], [227, 543], [719, 543]]],
    [250010304, 7220000, [3 * 60, 6 * 60], "隨著微弱的口哨聲，肯德熊出現了。", [[-210, 33], [-234, 393], [-654, 33]]],
    [211041400, 6090000, [3 * 60, 6 * 60], "黑山老妖出現了！", [[1672, 82], [2071, 10], [1417, 57]]],
    [105030500, 8130100, [3 * 60, 6 * 60], "蝙蝠怪出現了。", [[393, 129], [937, 129], [150, 129]]]
];

let spawn = [];

function init() {
    monsters.forEach((monster, i) => {
        spawn[i] = Date.now();
    });
    event.startTimer("respawn", 10 * 1000);
}

function respawn() {
    let nowTime = Date.now();
    monsters.forEach((monster, i) => {
        let [mapId, mobId, timeRange, message, positions] = monster;
        let next = spawn[i];
        if (nowTime > next) {
            let map = event.getMap(mapId);
            if (map) {
                let time = marinRandom(timeRange[0], timeRange[1]);
                let randomIndex = Math.floor(Math.random() * positions.length);
                let [x, y] = positions[randomIndex];
                if (map.getMobCount(mobId) === 0) {
                    map.spawnMob(mobId, x, y);
                }
                spawn[i] = nowTime + 1 * 60 * 1000;
            }
        }
    });
    event.startTimer("respawn", 1 * 60 * 1000);
}

function timerExpired(key) {
    if (key === "respawn") {
        respawn();
    }
}

function marinRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
