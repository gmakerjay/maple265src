// Created by MetaMS
// Quest ID:64593
// [我的小屋]要躺会儿吗？


npc.id(9400921).ui(1).noEsc().next().say("#face1#如何？舒服嗎？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b好像是… ");
npc.id(9400921).ui(1).noEsc().next().say("#face2#哈哈，既然都躺下了，不如就休息一下吧？突然想到我有小禮物要給你！等我一下！");
npc.completeQuest();
/* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "2=1;3=1;7=1;managerXpos=100;managerYpos=100" */
stage.updateQuestRecordExShare(500767, "2", "1");
stage.updateQuestRecordExShare(500767, "managerXpos", "100");
stage.updateQuestRecordExShare(500767, "managerYpos", "100");
stage.teleportToPos(5, -132, 114);
// [LP_MyHomeResult] [07 40 00 00 00 9D CD 0A FC 84 1A 4B 01 00 00 00 00 01 0D 00 01 00 01 00 54 3F 0C 01 FF FF FF FF 00 00 00 00 00 ]
// [LP_SpecialCubeResult] [00 00 00 01 00 00 00 00 00 00 00 00 ]