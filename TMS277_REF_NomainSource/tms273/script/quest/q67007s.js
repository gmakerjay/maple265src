// Created by MetaMS
// Quest ID:67007
// [星夜馬戲團] 放出裝滿心願的天燈說明


npc.id(9401986).next().say("武陵桃園的夜空正因為華麗的天燈慶典而閃耀！");
npc.id(9401986).next().say("你心裡多多少少不會有一個願望嗎？");
npc.id(9401986).next().say("利用這個機會，寫上願望後放天燈吧。說不定願望會實現！");
npc.id(9401986).next().say("請拿著充滿願望的天燈，並領取我準備的BUFF！");
npc.id(9401986).next().say("願珍貴的回憶與你的願望能實現~");
/* Update Quest RecordEx | Id:67008 | Name: [星夜馬戲團] 放出裝滿心願的天燈 | Data: "total=0" */
stage.updateQuestRecordEx(67008, "total", "0");
/* Update Quest RecordEx | Id:67008 | Name: [星夜馬戲團] 放出裝滿心願的天燈 | Data: "total=0;lastDate=0" */
stage.updateQuestRecordEx(67008, "lastDate", "0");
npc.completeQuest();