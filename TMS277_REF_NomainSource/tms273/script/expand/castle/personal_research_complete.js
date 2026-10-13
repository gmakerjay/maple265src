// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

if (stage.getIntQuestRecordEx(66702, "id") > 0) {
        let nowTime = new Date().getTime();
        let end = stage.getQuestRecordEx(66702, "end");
        let endTime = util.getTimeStringToLong(end, "yyyyMMddHHmmss");
        if (nowTime >= endTime) {
                let id = stage.getQuestRecordEx(66702, "id");
                let lv = stage.getQuestRecordEx(66702, "lv");
                stage.updateQuestRecordEx(66703, id, lv);
                stage.updateQuestRecordEx(66702, "");
                npc.id(9401592).ui(1).say("#face0##b<" + ctx.getEntityName() + ">#k的研究已完成。\r\n ※研究完成後等級 : #r#e" + lv + "#k#n");
        } else {
                npc.id(9401592).ui(1).next().say("#face0#已經在進行其他研究，請完成該研究或取消進行中的研究之後再重新嘗試。\r\n - 進行中的研究：#b" + ctx.getEntityName() + "#k");
        }
} else {
        npc.id(9401592).ui(1).say("#face0#※你好像沒有進行的研究。");
}