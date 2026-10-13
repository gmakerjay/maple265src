
// var number0 = Number(stage.getQuestRecordEx(1489, "0")=="NaN"?"0":stage.getQuestRecordEx(1489, "0"));
// var number = Number(stage.getQuestRecordEx(1489, "0exp")=="NaN"?"0":stage.getQuestRecordEx(1489, "0exp"));
// if (number0 >= 20) {
//     stage.showProgressMessageFont("索爾艾爾達以達到最大值，無法使用", 3, 14, 20, 0);
//     stage.updateQuestRecordEx(1489, "0", 20);
// } else {
//     ctx.consume();
//     if (number + 500 < 1000) {
//         stage.updateQuestRecordEx(1489, "0exp", number + 500);
//     } else {
//         stage.updateQuestRecordEx(1489, "0exp", number + 500 - 1000);
//         stage.updateQuestRecordEx(1489, "0", number0 + 1);
//     }
//     stage.showProgressMessageFont("獲得500索爾艾爾達經驗", 3, 14, 20, 0);
// }

ctx.consume();
stage.gainSolErdaBreath(500);
stage.showProgressMessageFont("獲得500索爾艾爾達經驗", 3, 14, 20, 0);