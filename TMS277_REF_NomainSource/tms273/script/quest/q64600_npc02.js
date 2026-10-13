// Created by MetaMS
// ID:[64600]
// MapName:广场
// [我的小屋]搬家聚会邀请


npc.id(9400924).ui(1).noEsc().next().say("#face0#…喬遷宴？");
npc.id(9400924).ui(1).noEsc().next().say("#face0#時鐘掛起來了嗎？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b當然！");
npc.id(9400924).ui(1).noEsc().next().say("#face1#…我知道了。我會準時到的。");
/* Update Quest RecordEx | Id:64600 | Name: [我的小屋]搬家聚会邀请 | Data: "NpcSpeech=94009261/94009242" */
stage.updateQuestRecordEx(64600, "NpcSpeech=94009261/94009242");