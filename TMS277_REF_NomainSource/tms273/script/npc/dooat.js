// Created by MetaMS
// [杜亞特]  |  [2103013]
// MapName:休菲凱曼的招待所

let selection = npc.askMenu("我是守護奈特金字塔的杜亞特。\r\n\r\n#b#L0#聽聽金字塔的介紹。#l\r\n#e#L1#進入至金字塔。#l#n\r\n#L2#尋找組隊。#l\r\n#L3# 把<奈特的祖母綠寶石>兌換為其他道具。#l\r\n#L4# 確認今天剩餘的挑戰次數。#l");
switch (selection) {
        case 0:
                npc.next().say("這裡是混沌和報仇之神奈特的金字塔。 雖然長時間被埋在沙漠深處，但卻藉由奈特的意志而重現在世人面前。 倘若不畏懼未知的混沌與它所帶來的死亡，最好去金字塔挑戰奈特之神的試煉。 結果永遠都是屬於被挑選上的人的…");
                npc.next().say("當你進入金字塔的瞬間，奈特之神的試煉就會立刻展開。 讓持續蜂擁而來的怪物無法接近 #b#e奧裴利斯克#n#k。 在金字塔獲得的關鍵是可以購買 #b眼睛道具#k。");
                npc.next().say("戰勝奈特試煉的人可以取得榮耀，無法戰勝試煉的人則會自取滅亡。 我能夠給你的建議到此為止而已。 剩下的全都取決於你的實力。");
                break;
        case 1:
                npc.next().say("不懂死亡的殘忍， 來我這吧。");
                stage.startQuest(7230, String(map.getId()));//Quest Name:Unknown
                stage.changeMap(926010000, 0);
                break;
        case 2:
                stage.openUIWithOption(7, 1);
                stage.showSystemMessage("使用組隊視窗(快捷鍵 p) 內的 '尋找隊伍'分頁的話無論何時何地都可找到想要的隊伍.");
                break;
        case 3:
                let sel = npc.askMenu("通過奈特之神的試煉，收集 #e#b#t4001623:##k#n的話，可以交換其他道具。要什麼道具呢？\r\n#b\r\n#L0# #i1132013:# #t1132013# #r(需要#t4001623# 40個)#b#l\r\n#L1# #i1072619:# #t1072619# #r(需要#t4001623# 40個)#b#l\r\n#L2# #i1112682:# #t1112682# #r(需要#t4001623# 40個，可使用15天)#b#l");
                if (sel == 0) {
                        npc.say("奈特的祖母綠寶石根本不夠啊。想要 #b#i1132013:##t1132013##k的話，至少需要40個。");
                } else if (sel == 1) {
                        npc.say("奈特的祖母綠寶石根本不夠啊。想要#b#i1072619:##t1072619##k的話，至少需要40個。");
                } else if (sel == 2) {
                        npc.say("奈特的祖母綠寶石根本不夠啊。想要 #b#i1112682:##t1112682##k的話，至少需要40個。");
                }
                break;
        case 4:
                stage.startQuest(7242, "0");//Quest Name:Unknown
                stage.startQuest(7243, "23/12/20");//Quest Name:Unknown
                npc.next().say("今天剩餘的挑戰次數是 5次。");
                break;
}