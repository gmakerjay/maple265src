let damageSKin = exports;

damageSKin.askUse = function (npc, stage, ctx, skin) {
        let rItemId = stage.getQuestRecordEx(13190, "i");
        let nItemId = ctx.getDataId();
        if (npc.id(9010000).askYesNo("要將目前套用的\r\n#b#i" + rItemId + "：# #t" + rItemId + "：##k取代套用成\r\n#b#i" + nItemId + "：# #t" + nItemId + "：##k嗎？")) {
                if (!stage.checkDamageSkinSave()) {
                        let text = npc.id(9010000).minLen(1).maxLen(8).askText("\r\n將目前套用的#b#i" + rItemId + ":# #t" + rItemId + ":##k\r\n不會儲存在傷害字型欄位裡，變更為新的\r\n傷害字型時#r不可再次使用！#k\r\n\r\n想變更為新的傷害字型的話，請在下方輸入視窗中輸入中文字\r\n#b#e變更#n#k。\r\n\r\n(想再次使用目前使用中的傷害字型時，\r\n請先儲存到傷害字型欄位後再嘗試)\r\n ");
                        if (!"變更".equals(text)) {
                                npc.say("\r\n無法輸入#b變更#k \r\n傷害字型的使用已取消！");
                                return;
                        }
                }
                if (stage.isDamageSkinSave(skin) && !npc.id(9010000).askYesNo("想要使用的#b#i" + nItemId + ":# #t" + nItemId + ":##k，\r\n已經儲存在#b傷害字型儲存欄位#k。\r\n\r\n真的要變更#r傷害字型#k#r嗎#k？")) {
                        return;
                }
                /* Response is Yes */
                ctx.consume();
                stage.updateDamageSkin(skin, nItemId);
                stage.showSystemMessage("傷害字型已變更。");
                npc.id(9010000).next().say("#b#i" + nItemId + ":# #t" + nItemId + ":##k已套用。");
        }
}