// Created by MetaMS
// ID:[64600]
// MapName:广场
// [我的小屋]搬家聚会邀请


npc.id(9400926).ui(1).noEsc().next().say("#face0#喬遷宴？喬遷宴是什麼？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b搬家之後邀請鄰居來家裡參觀，一起分享食物。特魯迪只要來玩就好。");
npc.id(9400926).ui(1).noEsc().next().say("#face1#哇，特魯迪覺得超讚。我要去喬遷宴！");
/* Update Quest RecordEx | Id:64600 | Name: [我的小屋]搬家聚会邀请 | Data: "NpcSpeech=94009261" */
stage.updateQuestRecordEx(64600, "NpcSpeech=94009261");