
marinStart();

function marinStart() {
    count = (stage.getItemQuantity(2433970) * 300);
    stage.modifyCurrency(2, count);
     stage.removeItemAll(ctx.getDataId());
    npc.meFlip().say("恭喜您獲得了 #r" + count + " #k楓點");
}
