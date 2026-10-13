// Created by MetaMS
// ID:[926010000]
// MapName:金字塔山丘
// 金字塔山丘


let selection = npc.askMenu("我是守護奈特金字塔的杜亞特。\r\n\r\n#b#L0#聽聽金字塔的介紹。#l\r\n#e#L1#進入至金字塔。#l#n\r\n#L2#尋找組隊。#l\r\n#L3# 把<奈特的祖母綠寶石>兌換為其他道具。#l\r\n#L4# 確認今天剩餘的挑戰次數。#l");
switch (selection) {
        case 1:
                let sel = npc.askMenu("不懂死亡的殘忍，選擇吧！\r\n\r\n#b#L2#困難模式#r (90級以上)#b#l");
                if (sel == 2) {
                        let askSel = npc.askMenu("想要進入金字塔的話，就得組隊透過隊長來進行。\r\n#b\r\n#L0# 尋找一起行動的隊員。#l");
                        if (askSel == 0) {
                                stage.openUIWithOption(7, 1);
                                stage.showSystemMessage("使用組隊視窗(快捷鍵 p) 內的 '尋找隊伍'分頁的話無論何時何地都可找到想要的隊伍.");
                        }
                }
                break;
}