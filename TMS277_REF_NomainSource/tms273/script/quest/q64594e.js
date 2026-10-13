// Created by MetaMS
// Quest ID:64594
// [我的小屋]放置沙发！


/* Update Quest RecordEx | Id:64612 | Name: Unknown | Data: "housing=4;furniture=3" */
//stage.updateQuestRecordEx(64612, "housing=4;furniture=3");

if ("1".equals(stage.getQuestData(64594))) {
        npc.id(9400921).ui(1).noEsc().next().say("#face1#呵呵果然…就說我的眼光不會出錯的！");
        npc.id(9400921).ui(1).noEsc().next().say("#face2#利用簡約的灰色調原木床跟布沙發做搭配，打造出極簡的風格！如何？看起來更雅致簡潔了吧？");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b比起剛剛，現在更像個家了。謝謝你，阿爾文！");
        npc.id(9400921).ui(1).noEsc().next().say("#face0#那麼…未來就要住在這邊了吧？");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b應該…是吧？");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#太好了！因為隔壁一直空著，覺得很孤單的說。有個像#h0#一樣帥氣的人搬來，真是太開心了。");
        npc.completeQuest();
} else {
        if (stage.hasItem(2672015, 1)) {
                npc.id(9400921).ui(1).noEsc().next().say("#face1#首先打開背包、雙擊#t2672015:#，移動到#b[家具保管箱]#k。");
        } else {
                npc.id(9400921).ui(1).noEsc().next().say("#face1#在我的小屋選單中按下#b#i3801391##t3801391##k按鈕，確認沙發並進行放置！");
        }
}