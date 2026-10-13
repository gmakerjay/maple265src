// Created by MetaMS
// Quest ID:64600
// [我的小屋]搬家聚会邀请


npc.id(9400921).ui(1).noEsc().next().say("#face0#那現在來邀請居民吧？");
let selection = npc.id(9400921).ui(1).noEsc().askMenu("#face1#如果可以的話，#h0#親自去廣場邀請居民們如何？\r\n#b#L0#好啊！#l\r\n#L1#現在還有點尷尬。#l");
if (selection == 0) {
        npc.id(9400921).ui(1).noEsc().next().say("#face1#好的，那就快去吧！我跟艾咪會簡單地準備一些食物!");
} else if (selection == 1) {
        npc.id(9400921).ui(1).noEsc().next().say("#face1##h0#可以做得很好的。我跟艾咪會簡單地準備一些食物，拿出你的勇氣吧！");
}
stage.startNavigation(871200044, 0, "out00", 0);
npc.startQuest();//Quest Name:[我的小屋]搬家聚会邀请
/* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "2=1;3=1;4=1;entrance=0;7=1;managerXpos=100;managerYpos=100" */
stage.updateQuestRecordExShare(500767, "4", "1");