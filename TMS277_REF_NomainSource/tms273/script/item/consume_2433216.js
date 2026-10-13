
marinStart();

function marinStart() {
    count = (stage.getItemQuantity(2433216) * 100);
    stage.modifyCurrency(2, count);
     stage.removeItemAll(ctx.getDataId());
    npc.meFlip().say("恭喜您獲得了 #r" + count + " #k楓點");
}
