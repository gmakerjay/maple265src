// Created by MetaMS
// ID:[871000100]
// MapName:施工现场


/* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "finishTime=60000;1=1;2=1;3=1;4=1;entrance=0;7=1;managerXpos=100;managerYpos=100" */
//stage.updateQuestRecordEx(500767, "finishTime=60000;1=1;2=1;3=1;4=1;entrance=0;7=1;managerXpos=100;managerYpos=100");
/* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "finishTime=60000;1=1;type=0;2=1;3=1;4=1;entrance=0;7=1;managerXpos=100;managerYpos=100" */
//stage.updateQuestRecordEx(500767, "finishTime=60000;1=1;type=0;2=1;3=1;4=1;entrance=0;7=1;managerXpos=100;managerYpos=100");
eff.uol("Sound/PL_Sound.img/myHome/construction").volume(100).playSoundEffect();
if (stage.isQuestStarted(64606) && !"1".equals(stage.getIntQuestRecordEx(64606, "chk"))) {
        /* Update Quest RecordEx | Id:64606 | Name: [我的小屋]建造属于自己的我的小屋 | Data: "chk=1" */
        stage.updateQuestRecordEx(64606, "chk", "1");
        /* Update Quest RecordEx | Id:64606 | Name: [我的小屋]建造属于自己的我的小屋 | Data: "item=0;chk=1" */
        stage.updateQuestRecordEx(64606, "item", "0");
        npc.id(9400920).ui(1).noEsc().next().say("#face3#蛤！房子消失了！？ ");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#請冷靜，艾咪。現在正在打造新家，不用擔心。");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b新家… ");
        npc.id(9400920).ui(1).noEsc().next().say("#face3#呼，嚇死人了！");
        npc.id(9400921).ui(1).noEsc().next().say("#face1##h0#，蓋新家需要消耗1分鐘左右的時間，你可以在此稍作等待，或是去一趟廣場或是楓之谷世界後，再回來也可以。請隨意！");
        let selection = npc.id(9400921).ui(1).noEsc().askMenu("#face1#話說新家想要怎麼佈置呢？\r\n#b#L0#我想佈置溫暖的家。#l\r\n#L1#我想佈置古典精緻的家。#l\r\n#L2#我想佈置自然綠環保的家。#l");
        if (selection == 0) {
                npc.id(9400921).ui(1).noEsc().next().say("#face2#溫暖的家！光是想想就覺得很好呢。");
                npc.id(9400921).ui(1).noEsc().next().say("#face1#裝飾有雕塑的復古家具和高級的大理石，再用能給人溫暖感覺的皮質家具裝飾客廳！ ");
                npc.id(9400920).ui(1).noEsc().next().say("#face1#肯定會很棒的！一定也不能少了象征書香門第的書房吧？");
        } else if (selection == 1) {
                npc.id(9400921).ui(1).noEsc().next().say("#face2#古典精緻的家！光是想想就覺得很好呢。");
                npc.id(9400921).ui(1).noEsc().next().say("#face1#裝飾有雕塑的復古家具和高級的大理石，再用能給人溫暖感覺的皮質家具裝飾客廳！ ");
                npc.id(9400920).ui(1).noEsc().next().say("#face1#肯定會很棒的！一定也不能少了象征書香門第的書房吧？");
        } else if (selection == 2) {
                npc.id(9400921).ui(1).noEsc().next().say("#face2#自然綠環保的家!光想像就覺得很棒。");
                npc.id(9400921).ui(1).noEsc().next().say("#face1#設計一個風能徐徐吹進來的大窗戶，和擺上舒適的吊床就夠了！週圍在被綠油油的植物所包圍的話，感覺就會非常的舒適。");
                npc.id(9400920).ui(1).noEsc().next().say("#face1#真的感覺就超棒的！在用藤蔓裝飾的浴缸再打造一個用水族珊瑚製作的檯燈來裝飾的浴室如何呢？");
        }
        /* Update Quest RecordEx | Id:64606 | Name: [我的小屋]建造属于自己的我的小屋 | Data: "item=3;chk=1" */
        stage.updateQuestRecordEx(64606, "item", selection);
        npc.id(9400921).ui(1).noEsc().next().say("#face2#好主意，艾咪！ ");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b光想就令人興奮啊。");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#現在就快完工了。對了，原本在家裡的家具都會自動進到家具倉庫中，不用擔心。");
        stage.completeQuest(64606);//Quest Name:[我的小屋]建造属于自己的我的小屋
        /* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "finishTime=33967;1=1;type=0;2=1;3=1;4=1;entrance=0;7=1;managerXpos=100;managerYpos=100" */
        //stage.updateQuestRecordExShare(500767, "finishTime", "");
}