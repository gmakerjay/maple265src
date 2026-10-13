/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let count = stage.getItemQuantity(ctx.getDataId());
stage.modifyCurrency(2, count * 1000);
stage.removeItemAll(ctx.getDataId());