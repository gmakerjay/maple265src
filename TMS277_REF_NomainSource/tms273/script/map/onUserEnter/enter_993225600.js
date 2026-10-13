// Created by MetaMS
// ID:[993225600]
// MapName:<沉睡之樹>


/* Update Quest RecordEx | Id:101488 | Name: [Maple19冒險] 冒險開始 | Data: "MixGolem=0;TauroDefender=0;ZombieMushmom=0;enter=1" */
//stage.updateQuestRecordEx(101488, "MixGolem=0;TauroDefender=0;ZombieMushmom=0;enter=1");
if (!"1".equals(stage.getQuestRecordEx(101488, "enter"))) {
        stage.updateQuestRecordEx(101488, "enter", "1");
        dir.npcId(9062891).duration(3000).text("#e#b真開心！#n#k \r\n一起玩的時間到了！").scale(300).addPopupSay();
        dir.npcId(9062891).duration(7000).text("選擇#e#b喜歡的職業#n#k後，\r\n請點擊下面的#e#b技能圖示#n#k\r\n#e#b儲存想使用的快捷鍵#n#k！").scale(300).addPopupSay();
}
