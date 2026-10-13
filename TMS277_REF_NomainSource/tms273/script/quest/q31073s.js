// Created by MetaMS
// Quest ID:31073
// [克里塞]塔上面有什麼呢？


let selection = npc.askMenu("#e<組隊任務：克里塞的薛西斯>#n\r\n有人看到我的寵物嗎？\r\n#b#L0# 進入克里塞組隊任務。#l\r\n#L1# 聽米加爾拉的故事。#l\r\n#L2# 接收獎勵。#l\r\n#L3# 確認今天剩下的挑戰次數。#l");
switch (selection) {
        case 0:
                npc.say("不在隊伍狀態的話無法入場。請加入隊伍後再試試看吧。");
                break;
        case 1:
                npc.next().say("我的寵物叫『薛西斯』，是隻非常可愛而且溫順的山羊，但是在幾天前開始變得暴躁，之後就發生奇怪的事情。");
                npc.next().say("感覺在羅馬競技場塔上發生了不好的事情。請到那個地方幫忙確認我所珍貴的寵物在幹嘛？\r\n\r\n - #e等級#n : 110 以上 #r( 推薦等級 : 110 ～ 129 )#k \r\n - #e限制時間#n : 20分\r\n - #e參加人員#n : 1～4名\r\n - #e獲得道具 :\r\n\r\n          #i1022245:# #t1022245#\r\n          #i1022246:# #t1022246##n");
                break;
        case  2:
                npc.next().say("嗯…#h0#現在所擁有的 #t4001844#是 #r0個#k。最少收集 #r80個#k可領取獎勵。");
                break;
        case 3:
                /* Update Quest RecordEx | Id:31069 | Name: Unknown | Data: "count=0" */
                //stage.updateQuestRecordEx(31069, "count=0");
                /* Update Quest RecordEx | Id:31069 | Name: Unknown | Data: "count=0;date=23/12/20" */
                //stage.updateQuestRecordEx(31069, "count=0;date=23/12/20");
                npc.say("#h0#今天剩下的挑戰次數是 #r5次#k。");
                break;
}