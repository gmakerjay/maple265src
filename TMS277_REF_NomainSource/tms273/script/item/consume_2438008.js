num = stage.getItemQuantity(ctx.getDataId());
stage.modifyCurrency(1, num);
 stage.removeItemAll(ctx.getDataId());
stage.dropAlertNotice("恭喜你領到了 " + num * 10 + " 樂豆點");