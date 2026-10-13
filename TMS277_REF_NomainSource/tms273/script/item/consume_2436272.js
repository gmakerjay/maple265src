

for (var i = 0; i < stage.getItemQuantity(ctx.getDataId()); i++) {
    let honor = parseInt(10000);
    stage.modifyHonor(honor);
    stage.showSystemMessage("獲得了" + honor + "點聲望.");
}
     stage.removeItemAll(ctx.getDataId());

