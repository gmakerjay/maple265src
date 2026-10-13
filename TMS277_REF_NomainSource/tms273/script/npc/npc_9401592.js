// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

let str = "#face0#我是公會城的管理人潘奈迪特。如果需要幫助，請隨時告訴我。\r\n";
if (stage.isQuestCompleted(66661)) {
        str += "#L1# #b貪婪的秘密據點#k 入場#l\r\n";
}
str += "#L4# 登錄公會城設施 #b設計圖#k#l\r\n";
let selection = npc.id(9401592).uiMax().askMenu(str);
if (selection == 1) {
        stage.checkGuildCastle();
        if (stage.isQuestCompleted(66661)) {
                let mobKillCount = stage.getIntQuestRecordEx(66669, "mobKillCount")
                let goal = stage.getIntQuestRecordEx(66669, "goal");
                if (npc.id(9401592).ui(1).askAccept("#face0#如果準備好了， 確定要直接進入#b貪婪的秘密據點#k嗎？\r\n#r※ 進入秘密據點時，所有buff都將初始化，即使使用經驗值增加道具，也不會套用效果。#k")) {
                        if (mobKillCount >= goal) {
                                npc.id(9401592).ui(1).say("#face1#不愧是熱情的城主。但是，本週#b貪婪的秘密據點#k的調查到這邊就夠了。\r\n下週再拜託你了。");
                        } else {
                                /* Response is Yes */
                                /* Update Quest RecordEx | Id:502695 | Name: Unknown | Data: "resetTime=24/12/19/00/00;mobKillMaxAcc=5000;WeeklyEnter=24/12/19/00/00;WeeklyMission=0;myCastle=24/12/15;initialize=1;isGuildMemberAcc=24/12/15;story=1;WeeklyReward=0" */
                                //stage.updateQuestRecordExShare(502695, "resetTime=24/12/19/00/00;mobKillMaxAcc=5000;WeeklyEnter=24/12/19/00/00;WeeklyMission=0;myCastle=24/12/15;initialize=1;isGuildMemberAcc=24/12/15;story=1;WeeklyReward=0");
                                stage.enterGuildCastleRoom("Weekly_0", 0);
                        }
                }
        }
}