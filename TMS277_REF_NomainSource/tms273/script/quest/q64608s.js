// Created by MetaMS
// Quest ID:64608
// [我的小屋]当我的管家吧，埃尔宾！


npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b阿爾文！");
npc.id(9400921).ui(1).noEsc().next().say("#face2##h0#，比之前還要寬廣！還有兩層樓！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b對啊，太棒了！想到以後可以慢慢裝飾這裡，就覺得好心動。");
let selection = npc.ui(1).npcFlip().meFlip().noEsc().askMenu("#b所以呢…之後裝飾家裡的時候，希望可以有阿爾文一起幫忙。\r\n#b#L0# 拜託他成為房子的管理員。#l\r\n#L1# 以後也友好的相處吧。#l\r\n#r(※只能雇用1位管理員，雇用後可以透過管理員頁面進行變更。)#l");
if (selection == 0) {
        if (stage.canHold(2672012, 1)) {
                stage.gainItem(2672012, 1);
                npc.id(9400921).ui(1).noEsc().next().say("#face2#… 這是我夢想的瞬間！裝飾家裡，並進行管理是我的專業。交給我吧！");
                npc.id(9400921).ui(1).noEsc().next().say("#face1#以後也請多多指教，#h0#！");
                npc.id(9400921).ui(1).noEsc().next().say("#face1#這是送給#h0#的禮物。你說想要用自然小屋來裝飾，所以我就準備了！有特殊的功能，不要太驚訝！");
                stage.completeQuest(64609);//Quest Name:[我的小屋]当我的管家吧，艾米！
                /* Update Quest RecordEx | Id:64610 | Name: [我的小屋]管家的工作 | Data: "hide=1" */
                stage.updateQuestRecordExShare(64610, "hide", "1");

                /* Update Quest RecordEx | Id:500773 | Name: Unknown | Data: "manager=1;managerHide=1;resetDate=23/04/26" */
                stage.updateQuestRecordExShare(500773, "manager", "1");
                /* Update Quest RecordEx | Id:500773 | Name: Unknown | Data: "manager=1;managerHide=0;resetDate=23/04/26" */
                stage.updateQuestRecordExShare(500773, "managerHide", "0");
                stage.updateQuestRecordExShare(500773, "resetDate", util.getStringDate("yy/MM/dd"));


                /* Update Quest RecordEx | Id:501465 | Name: Unknown | Data: "askR=1;s1=10;bonusTalk=0" */
                stage.updateQuestRecordExShare(501465, "askR", "1");
                stage.updateQuestRecordExShare(501465, "s1", "10");
                stage.updateQuestRecordExShare(501465, "bonusTalk", "0");
                stage.updateQuestRecordExShare(501465, "s3", "13");
                stage.updateQuestRecordExShare(501465, "s4", "2");
                stage.updateQuestRecordExShare(501465, "s5", "11");


                /* Update Quest RecordEx | Id:501466 | Name: Unknown | Data: "askR=1;s1=9;bonusTalk=0" */
                stage.updateQuestRecordExShare(501466, "askR", "1");
                stage.updateQuestRecordExShare(501466, "s1", "9");
                stage.updateQuestRecordExShare(501466, "bonusTalk", "0");
                stage.updateQuestRecordExShare(501466, "s2", "10");
                stage.updateQuestRecordExShare(501466, "s3", "8");
                stage.updateQuestRecordExShare(501466, "s4", "17");
                stage.updateQuestRecordExShare(501466, "s5", "5");

                let x = stage.getIntQuestRecordExShare(500767, "managerXpos");
                let y = stage.getIntQuestRecordExShare(500767, "managerYpos");
                let managerFlip = stage.getIntQuestRecordExShare(500767, "managerFlip") == 1 ? 0 : 1;
                let entity_0 = stage.spawnTempNpc(9400930, x, y, managerFlip);
                stage.setNpcSpecialAction(entity_0, "summon", 0, false);
                stage.addTempValue("entity_0", entity_0);

        } else {
                npc.id(9400921).ui(1).noEsc().next().say("#face1# 背包空間不足，請清理後在跟我對話吧!");
        }
} else if (selection == 1) {
        npc.id(9400921).ui(1).noEsc().next().say("#face1#這個人真是，無趣~~不用擔心，你不說我也打算要每天都來玩的！");
}
