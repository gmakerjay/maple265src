// Created by MetaMS
// Quest ID:16024
// [新手任務]雙殺


/* Update Quest RecordEx | Id:16027 | Name: [新手任務]技能殺(確認用) | Data: "ComboK=3" */
//stage.updateQuestRecordEx(16027, "ComboK=3");
dir.npcId(9010000).duration(6000).text("#b[說明] Multi kill#k\r\n\r\n成功同時擊殺3之以上怪物的#b[Multi kill]#k了呢！\r\n\r\n成功#b[Multi kill]#k的話，可以獲得 #b追加額外經驗值#k喔！\r\n ").uol("FarmSE.img/boxResult").addPopupSay();
npc.completeQuest();