// Created by MetaMS
// [排行榜]  |  [9063065]
// MapName:入場準備

if ("1".equals(stage.getQuestRecordEx(503094, "tuto"))) {
        if (npc.id(9063063).askYesNo("勇士，你要查看排名嗎？\r\n\r\n#r※最新排名分數可能須等待十分鐘以上才會更新。")) {
                stage.openUI(1405);
        }
} else {
        stage.showSystemMessage("請先進行<世界最強拳擊王SEASON2>任務。");
}