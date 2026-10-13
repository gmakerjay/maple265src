// Created by MetaMS
// Quest ID:504693
// [星夜馬戲團] 購買魔法藥材


if (npc.id(9401988).askYesNo("我想賣我供應的#fc0xFF009900##i4037331:# #t4037331:##k。\r\n#fc0xFF009900##t4037331:##k的價格是#b#e300,000,000#k#n楓幣。要購買嗎？")) {
        /* Response is Yes */
        if (stage.hasMesos(300000000)) {
                stage.loseMesos(300000000);
                let remaining = stage.getIntQuestRecordEx(504648, "o9") + 1;
                stage.updateQuestRecordEx(504648, "o9", remaining);
        } else {
                npc.id(9401988).next().say("你的楓幣不足耶？下次再來吧。");
                stage.showSystemMessage("楓幣不足。");
        }
}
