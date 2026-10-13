// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

stage.checkGuildCastle();
if (stage.getIntQuestRecordEx(66669, "WeeklyMission") <= 0) {
        npc.id(9401592).ui(1).next().say("#face0#如果要進行研究，請先完成每周任務。");
} else if (stage.getIntQuestRecordEx(66702, "id") > 0) {
        npc.id(9401592).ui(1).next().say("#face0#※所有研究皆不能同時進行。請完成後再來找我。");
} else {
        npc.uiMax().next().id(9401592).say("#face0##h0#選擇的研究是#b<" + ctx.getEntityName() + ">#k。\r\n在開始研究以前請先確認簡易的註意事項。\r\n\r\n#r<註意事項>#k\r\n※所有研究皆不能同時進行。\r\n#fc0xFFFFFF00#（但如果是公會會長，可以進行共通研究和個人研究各一個。）");
        let ret = npc.id(9401592).ui(1).askAccept("#face0#現在就開始進行選擇的#b<" + ctx.getEntityName() + ">#k研究嗎？");
        if (ret) {
                let lv = stage.getIntQuestRecordEx(66703, ctx.getOption()) + 1;
                let researchTimeCost = parseInt(stage.getTempValue("researchTimeCost"));
                let endTime = new Date().getTime() + researchTimeCost * 60 * 1000;
                let endStr = util.getStringDate(endTime, "yyyyMMddHHmmss");
                let endMSStr = util.getStringDate(endTime, "yyMMddHHmmssSSS");
                stage.updateQuestRecordEx(66702, "end", endStr);
                stage.updateQuestRecordEx(66702, "endMS", endMSStr);
                stage.updateQuestRecordEx(66702, "lv", lv);
                stage.updateQuestRecordEx(66702, "id", ctx.getOption());

                npc.id(9401592).ui(1).say("#face0##b<" + ctx.getEntityName() + "#k的研究已開始。請完成後再來找我。");
        }
}