// Created by MetaMS
// [小海豚]  |  [9020003]
// MapName:休菲凱曼的招待所

let selection = npc.askMenu("#e<組隊任務 :陷入危險的坎特>#n\r\n出大事了！！坎特好像陷入危險了。說針對海動物的異常行動進行調查之後就沒有再回來了，應該發生什麼事情的。要找坎特。幫助我！!\r\n\r\n#b#L0# 要去找坎特了。#l\r\n#L1#想要拿 #t1022175#。#k\r\n#b#L2#請詳細說明發生什麼事情。#l\r\n#L3#想知道今天剩餘的挑戰次數。#l\r\n\r\n\r\n\r\n");
switch (selection) {
        case 0:
                if (map.getId() == 923040000) {
                        npc.say("水之路的怪物變更粗爆了。太危險所以不能自己一個人進去。想要進去的話，請讓你隊伍的隊長來跟我對話。");
                } else {
                        npc.next().say("謝謝！請跟我一起到危險的海邊。");
                        stage.startQuest(7849, String(map.getId()));//Quest Name:Unknown
                        stage.changeMap(923040000, 1);
                }
                break;
        case 1:
                npc.next().say(" 原來對#i1022175:# #t1022175#有興趣啊...#t1022175#是坎特為了幫助自己調查海洋生物的人所準備的答禮。只要將研究所需要的數量  #b#t4001535# 10個#k帶來，就會給您禮物。#t4001535#是在找到坎特後一起擊退海怒斯時可獲得。要是覺得10個太多，也有#b#t4001535# 5個#k寵物裝備的卷軸，請幫幫坎特吧。");
                let sel = npc.askMenu("要為了坎特的研究，使用#t4001535#嗎？\r\n#b#L0#  #t4001535# 5個 - 寵物相關卷軸 #l\r\n#L1#  #t4001535# 10個 - #i1022175:# #t1022175#  #l");
                npc.say("說謊是不好的，原來連一個都沒有。");
                break;
        case 2:
                npc.next().say("坎特以冒險家帶來的樣品進行研究，但仍感到有所不足，因此說要親自去調查海洋生物的異常行動，而向著危險的海邊去了。出去之後就再也沒消息，目前也還沒回來，很顯然是發生了什麼事。\r\n - #e等級#n : 160以上#r( 推薦等級 : 160 ~ 200 )#k \r\n - #e限制時間#n : 20分鍾\r\n - #e參加人數#n : 2~6名\r\n - #e獲得道具#n :\r\n#i1022175:# #t1022175#");
                break;
        case 3:
                stage.startQuest(7926, "0");//Quest Name:Unknown
                stage.startQuest(7927, util.getStringDate("yy/MM/dd"));//Quest Name:Unknown
                npc.say("今天剩餘的挑戰次數是5次。");
                break;
}