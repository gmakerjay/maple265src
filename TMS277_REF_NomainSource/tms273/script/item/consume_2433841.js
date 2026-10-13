/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let bute = [
    {ID: 1113098, chance: 33333},
    {ID: 1113108, chance: 33333},
    {ID: 1113104, chance: 33333},
    {ID: 1113329, chance: 90000},
    {ID: 1113122, chance: 90000},
    {ID: 1113109, chance: 90000},
    {ID: 1113110, chance: 90000},
    {ID: 1113111, chance: 90000},
    {ID: 1113112, chance: 90000},
    {ID: 1113113, chance: 90000},
    {ID: 1113114, chance: 90000},
    {ID: 1113115, chance: 90000},
    {ID: 1113116, chance: 90000}
]
result = drawItem(bute);
const equip = util.makeItem(result.ID, 1);
equip['level'] = 4;
stage.gainItem(equip);
stage.loseItem(ctx.getDataId(), 1);
npc.meFlip().say("#r你抽到了 #i" + result.ID + "#\r\n");

function drawItem(items) {
    let totalChance = items.reduce((total, item) => total + item.chance, 0);
    let randomChance = Math.random() * totalChance;
    let currentChance = 0;
    let selectedGroup = [];
    for (let i = 0; i < items.length; i++) {
        currentChance += items[i].chance;
        if (randomChance <= currentChance) {
            selectedGroup = items.filter(item => item.chance === items[i].chance);
            break;
        }
    }
    let randomIndex = Math.floor(Math.random() * selectedGroup.length);
    return selectedGroup[randomIndex];
}
