let totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
num = 1E6 * stage.getItemQuantity(ctx.getDataId());
totalmoney += num;
stage.updateQuestRecordExShare(100000, "totalmoney", totalmoney);
stage.removeItemAll(ctx.getDataId());
stage.dropMessage(0x15, num);
stage.dropAlertNotice("恭喜..你獲得了 " + formatMoney(num));

function formatMoney(amount) {
    return (amount / 1e8).toFixed(2) + '億綁金';
}
