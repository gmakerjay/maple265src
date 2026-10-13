// Created by MetaMS
// ID:[2633103]
// MapName:弓箭手培訓中心
// 角色名稱變更券

let selection = npc.askMenu("您好！我是可以變更名稱的新名稱先生，需要我幫忙嗎？ \r\n\r\n#b#L0# 角色名稱變更\r\n#L1# 結束對話。");
if (selection == 1) {
        npc.say("那?告辭了！");
} else if (selection == 0) {
        /* Update Quest RecordEx | Id:26606 | Name: Unknown | Data: "" */
        //stage.updateQuestRecordEx(26606, "");
        stage.openUIWithOption(1110, ctx.getDataId());
}