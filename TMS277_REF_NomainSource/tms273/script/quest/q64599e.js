// Created by MetaMS
// Quest ID:64599
// [我的小屋]装饰我的小屋，开始！

if ("111".equals(stage.getQuestData(64599))) {
        npc.id(9400921).ui(1).noEsc().next().say("#face2#已經佈置完了嗎？");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#哇！終於像個人住的房子了！啊，當然原本也是啦。");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b沒關係。真的終於像個家了！全部都是多虧了阿爾文跟艾咪！謝謝。");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#作為鄰居，這是當然的！之後需要幫助也可以隨時跟我說。");
        npc.id(9400920).ui(1).noEsc().next().say("#face0#不會吧！不會只是用言語來表達謝意吧？應該有其他更好的辦法吧~~像是楓幣？");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b…");
        npc.id(9400921).ui(1).noEsc().next().say("#face3#…");
        npc.id(9400920).ui(1).noEsc().next().say("#face2#開玩笑的。雖然大概有2%左右是真心的。");
        npc.completeQuest();
        npc.id(9400921).ui(1).noEsc().next().say("#face0#那現在來邀請居民吧？");
        let selection = npc.id(9400921).ui(1).noEsc().askMenu("#face1#如果可以的話，#h0#親自去廣場邀請居民們如何？\r\n#b#L0#好啊！#l\r\n#L1#現在還有點尷尬。#l");
        if (selection == 1) {
                npc.id(9400921).ui(1).noEsc().next().say("#face1##h0#可以做得很好的。我跟艾咪會簡單地準備一些食物，拿出你的勇氣吧！");
                stage.startNavigation(871200044, 0, "out00", 0);
                stage.startQuest(64600);//Quest Name:[我的小屋]搬家聚会邀请
                /* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "2=1;3=1;4=1;entrance=0;7=1;managerXpos=100;managerYpos=100" */
                stage.updateQuestRecordExShare(500767, "4", "1");
        }
} else if ("1".equals(stage.getQuestData(64599))) {
        npc.id(9400921).ui(1).noEsc().next().say("#face2#時鐘的位置真的很好，桌子也可以用相同的方式放置。");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#對了，時鐘和墻上的家具都能和地面上的家具重疊設置哦，這樣就能把家裏布置得更好了吧？");
} else if ("11".equals(stage.getQuestData(64599))) {
        npc.id(9400921).ui(1).noEsc().next().say("#face2#桌子的位置真的很好，時鐘也可以用相同的方式放置。");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#對了，時鐘和墻上的家具都能和地面上的家具重疊設置哦，這樣就能把家裏布置得更好了吧？");
} else {
        npc.id(9400921).ui(1).noEsc().next().say("#face0#忘記如何放置了嗎？");
        npc.id(9400921).ui(1).noEsc().next().say("#face0#首先需要雙擊背包中的桌子跟時鐘，將它移動到[家具保管箱]。");
        npc.id(9400921).ui(1).noEsc().next().say("#face0#接著在我的小屋選單中按下#i3801391#按鍵，開啟[家具保管箱]後，選擇想要放置的家具。");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#點擊想要放置的家具的位置後，按下[佈置完成]按鍵就大功告成！再試一次吧？");
}

// Inventory Operation with 1 operations.
// [LP_MyHomeResult] [07 3F 00 00 00 DE 36 69 14 84 1A 4B 01 00 00 00 00 01 07 00 04 00 04 00 D4 D3 6A 00 00 00 00 00 00 00 00 00 90 C5 28 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 90 C5 28 00 01 00 00 00 00 00 ]
/* Update Quest RecordEx | Id:64612 | Name: Unknown | Data: "housing=4;furniture=4" */
//stage.updateQuestRecordEx(64612, "housing=4;furniture=4");
// Inventory Operation with 1 operations.
// [LP_MyHomeResult] [07 3F 00 00 00 DE 36 69 14 84 1A 4B 01 00 00 00 00 01 07 00 05 00 05 00 D5 D3 6A 00 00 00 00 00 00 00 00 00 9A C1 28 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 9A C1 28 00 01 00 00 00 00 00 ]
/* Update Quest RecordEx | Id:64612 | Name: Unknown | Data: "housing=4;furniture=5" */
//stage.updateQuestRecordEx(64612, "housing=4;furniture=5");
// [LP_MyHomeResult] [07 3F 00 00 00 DE 36 69 14 84 1A 4B 01 00 00 00 00 01 07 00 05 00 04 00 D4 D3 6A 00 00 00 00 00 00 00 00 00 90 C5 28 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 90 C5 28 00 00 05 00 D5 D3 6A 00 00 00 00 00 00 00 00 00 9A C1 28 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 9A C1 28 00 00 00 00 00 00 00 ]
// [LP_MyHomeResult] [07 3F 00 00 00 DE 36 69 14 84 1A 4B 01 00 00 00 00 01 07 00 05 00 04 00 D4 D3 6A 00 00 00 00 00 60 EE EB 33 90 C5 28 00 0B 06 89 40 02 00 00 00 06 00 00 00 00 00 90 C5 28 00 00 00 00 00 00 00 ]
// [LP_MyHomeResult] [07 43 00 00 00 AB 8D 27 16 84 1A 4B 01 00 00 00 00 01 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 00 84 1A 4B 01 00 00 00 00 03 00 01 00 00 00 04 00 D4 D3 6A 00 00 00 00 00 05 00 00 00 00 00 06 00 0B 06 89 40 07 00 02 00 00 00 06 00 00 00 08 00 90 C5 28 00 09 00 00 0A 00 00 0B 00 00 0C 00 3F 00 00 00 00 00 00 00 0D 00 00 00 80 3F 00 00 80 3F 00 00 80 3F 0E 00 00 00 00 00 0F 00 00 00 00 00 00 00 00 ]
// [LP_MyHomeResult] [07 44 00 00 00 AB 8D 27 16 84 1A 4B 01 00 00 00 00 01 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 00 84 1A 4B 01 00 00 00 00 03 00 01 00 00 00 04 00 D5 D3 6A 00 00 00 00 00 05 00 00 00 00 00 06 00 0B 06 89 40 07 00 02 00 00 00 02 00 00 00 08 00 9A C1 28 00 09 00 00 0A 00 00 0B 00 00 0C 00 3F 00 00 00 00 00 00 00 0D 00 00 00 80 3F 00 00 80 3F 00 00 80 3F 0E 00 00 00 00 00 0F 00 00 00 00 00 00 00 00 ]
// [LP_MyHomeResult] [07 3F 00 00 00 DE 36 69 14 84 1A 4B 01 00 00 00 00 01 07 00 05 00 05 00 D5 D3 6A 00 00 00 00 00 60 EE EB 33 9A C1 28 00 0B 06 89 40 02 00 00 00 02 00 00 00 00 00 9A C1 28 00 00 00 00 00 00 00 ]
/* Update Quest RecordEx | Id:27039 | Name: Unknown | Data: "6910602855203=230426000000|230426175801|31844|30|558" */
//stage.updateQuestRecordEx(27039, "6910602855203=230426000000|230426175801|31844|30|558");