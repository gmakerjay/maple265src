/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

const bute = [1122430, 1113306, 1012632, 1022278];
const randomIndex = Math.floor(Math.random() * bute.length);
const randomItem = bute[randomIndex];
stage.gainItem(randomItem, 1);
stage.loseItem(ctx.getDataId(), 1);