
let count = stage.getItemQuantity(ctx.getDataId());
stage.modifyHonor(1000 * count);
stage.dropMessage(0x15, "獲得了" + 1000 * count + "點聲望.");
stage.removeItemAll(ctx.getDataId());