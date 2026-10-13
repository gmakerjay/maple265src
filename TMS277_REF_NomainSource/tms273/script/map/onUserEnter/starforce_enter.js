// Created by MetaMS
// ID:[220070000]
// MapName:遺忘的時間之路<1>

if (map.getId() == 220070000) {
        if (stage.isQuestStarted(3463) && !"1".equals(stage.getQuestData(3463))) {
                stage.startQuest(3463, "1");
                /* Update Quest RecordEx | Id:3463 | Name: [拉圖斯]晃動的靈魂探測器 | Data: "1=0" */
                stage.updateQuestRecordEx(3463, "1", "0");
                /* Update Quest RecordEx | Id:25973 | Name: Unknown | Data: "1=0" */
                stage.updateQuestRecordEx(25973, "1", "0");
                npc.me().next().say("(看不到流星掉落的痕跡. 但是怪物好似乎感覺不同…… 試著去狩獵怪物吧.)");
        }
}