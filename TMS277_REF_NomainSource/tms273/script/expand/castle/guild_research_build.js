// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

if (stage.getIntQuestRecordEx(66669, "WeeklyMission") <= 0) {
        npc.id(9401592).ui(1).next().say("#face0#如果要進行研究，請先完成每周任務。");
} else {
        npc.uiMax().next().id(9401592).say("#face0#您選擇了擴建房間的研究呢。為了要變成全新的城堡，需要做相當大的準備。\r\n詳加確認下方註意事項之後，再做慎重選擇#k。\r\n\r\n#r<註意事項>#k\r\n※研究完成的瞬間，#r所有的公會成員#k都會暫時#fc0xFF00FFFF#退場#k。\r\n※研究完成後，就無法再恢復到#fc0xFF00FFFF#上一階段#k。\r\n※布置的#fc0xFF00BFFF#房間位置及各種裝飾#k均會#fc0xFF00BFFF#初始化#k為預設狀態。");
        npc.uiMax().next().id(9401592).say("#face0##h0#選擇的研究是#b<" + ctx.getEntityName() + ">#k。\r\n在開始研究以前請先確認簡易的註意事項。\r\n\r\n#r<註意事項>#k\r\n※共通研究只有公會會長才能進行\r\n※所有研究皆不能同時進行。\r\n#fc0xFFFFFF00#（但如果是公會會長，可以進行共通研究和個人研究各一個。）");
        let ret = npc.id(9401592).ui(1).askAccept("#face0#現在就開始進行選擇的#b<" + ctx.getEntityName() + ">#k研究嗎？");
        if (ret) {
                ctx.setGuildCastleResearch(stage.getGuildId(), stage.getCharacterName(), ctx.getOption(), 2);
                npc.id(9401592).ui(1).say("#face0##b<" + ctx.getEntityName() + "#k的研究已開始。請完成後再來找我。");
        }
}