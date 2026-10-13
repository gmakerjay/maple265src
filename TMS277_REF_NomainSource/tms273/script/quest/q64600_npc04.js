// Created by MetaMS
// ID:[64600]
// MapName:Unknown
// [我的小屋]搬家聚会邀请


npc.id(9400921).ui(1).noEsc().next().say("#face1#回來啦？");
npc.id(9400921).ui(1).noEsc().next().say("#face0#啊，我好像更興奮！對了，還有要邀請的朋友嗎？");
eff.term(900).key("0").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHomeTuto/4").location(4).removeAfter(-1).setLayerOn();
npc.id(9400921).ui(1).noEsc().next().say("#face1#在我的小屋選單中按下#i3801393#按鈕，並輸入想邀請的朋友角色名稱，便可以邀請朋友。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#在#b好友清單#k或#b聊天視窗#k中點擊想要邀請的朋友的角色名稱，接著按下[邀請回家]按鍵即可以進行邀請。");
eff.term(300).key("0").setLayerOff();
let selection = npc.id(9400921).ui(1).noEsc().askMenu("#face1#要邀請朋友嗎？\r\n#b#L0#現在邀請。#l\r\n#L1#之後再邀請。#l");
if (selection == 0) {
        npc.id(9400921).ui(1).noEsc().next().say("#face1#好的，請在邀請朋友後再和我對話！。");
        /* Update Quest RecordEx | Id:64600 | Name: [我的小屋]搬家聚会邀请 | Data: "NpcSpeech=94009261/94009242/94009233/94009214" */
        stage.updateQuestRecordEx(64600, "NpcSpeech=94009261/94009242/94009233/94009214");
} else if (selection == 1) {
        npc.id(9400921).ui(1).noEsc().next().say("#face1#很好，現在只要等大家來就好了。");
        /* Update Quest RecordEx | Id:64600 | Name: [我的小屋]搬家聚会邀请 | Data: "NpcSpeech=94009261/94009242/94009233/94009214" */
        stage.updateQuestRecordEx(64600, "NpcSpeech=94009261/94009242/94009233/94009214");
        stage.completeQuest(64600);//Quest Name:[我的小屋]搬家聚会邀请
}