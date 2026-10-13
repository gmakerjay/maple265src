// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

let ret = npc.id(9401592).ui(1).askAccept("#face0#目前還在進行研究，確定要取消研究嗎？取消研究的話先前計算的時間將全數初始化。\r\n\r\n - 進行中的研究： #b" + ctx.getEntityName() + "#k");
if (ret) {
        stage.updateQuestRecordEx(66702, "");
        npc.id(9401592).ui(1).say("#face0#已取消研究:#b" + ctx.getEntityName() + "#k");
}