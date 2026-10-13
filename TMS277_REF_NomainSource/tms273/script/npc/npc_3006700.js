// Created by MetaMS
// [塞拉札爾]  |  [3006700]
// MapName:賽爾尼溫廣場

if (stage.isQuestCompleted(26217)) {
        if (!"1".equals(stage.getQuestRecordEx(26218, "start"))) {
                npc.id(3006700).say("你好！\r\n我是歌唱著世界真實的吟遊詩人塞拉札爾！");
                npc.id(3006700).next().say("來～現在我傳說的詩琴要開始歌唱了。");
                npc.id(3006700).next().say("今天來為神唱一首頌歌吧？");
                npc.id(3006700).next().say("故事就從很久很久以前沈睡的古代神…");
                npc.id(3006700).next().say("太陽神米特拉降臨在這片大地之時開始。");
                /* Update Quest RecordEx | Id:26218 | Name: Unknown | Data: "start=1" */
                stage.updateQuestRecordEx(26218, "start", "1");
        }
        ctx.showEpicDungeonUI();
} else {
        npc.id(3006700).say("你好！\r\n我是歌唱著世界真實的吟遊詩人塞拉札爾！");
}
