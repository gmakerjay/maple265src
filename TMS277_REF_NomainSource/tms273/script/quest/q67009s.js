// Created by MetaMS
// Quest ID:67009
// [星夜馬戲團] 製作神祕的靈藥說明


/* Update Quest RecordEx | Id:67010 | Name: [星夜馬戲團] 製作神祕的靈藥掉落控制 | Data: "6=千年深山人蔘根" */
stage.updateQuestRecordEx(67010, "6", "千年深山人蔘根");
/* Update Quest RecordEx | Id:67010 | Name: [星夜馬戲團] 製作神祕的靈藥掉落控制 | Data: "6=千年深山人蔘根;7=巨大的蔘黃" */
stage.updateQuestRecordEx(67010, "7", "巨大的蔘黃");
/* Update Quest RecordEx | Id:67010 | Name: [星夜馬戲團] 製作神祕的靈藥掉落控制 | Data: "6=千年深山人蔘根;7=巨大的蔘黃;8=不凋謝的桃花樹枝" */
stage.updateQuestRecordEx(67010, "8", "不凋謝的桃花樹枝");
if (npc.id(9401988).askYesNo("問我是誰？我就是天才藥水製作師，桃醫仙！\r\n慶典期間可以幫你製作神祕的靈藥。\r\n但是，材料必須親自找來。要用各種藥材熬煮嗎？")) {
        /* Response is Yes */
        //stage.changeSkillLevel(80010294, 1);
        /* Update Quest RecordEx | Id:67009 | Name: [星夜馬戲團] 製作神祕的靈藥說明 | Data: "num=4" */
        stage.updateQuestRecordEx(67009, "num", "4");
        npc.completeQuest();
        stage.startQuest(67010);//Quest Name:[星夜馬戲團] 製作神祕的靈藥掉落控制
        // [LP_UserQuestResult] [0C C2 05 01 00 93 76 8F 00 00 00 00 00 01 ]
} else {
        /* Response is No */
        npc.id(9401988).say("來，以後有需要隨時都可以來歐。\r\n※活動期間：2024年 11月 26日 23點 59分為止");
}
