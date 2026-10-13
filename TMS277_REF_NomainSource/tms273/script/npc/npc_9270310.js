// Created by MetaMS
// [休咪]  |  [9270310]
// MapName:維多利亞足球對抗賽 <競技場入口>


let selection = npc.id(9270310).askMenu("#b#e要參加<維多利亞足球對抗賽>#k#n嗎？\r\n\r\n#L0##r參加<維多利亞足球對抗賽>#n#k#l\r\n#L1##r我要返回主賽場。#n#k#l\r\n\r\n#L2##b#e我想確認<我的參加記錄>#k#n。#l\r\n#L99#和休咪對話#l\r\n#L100#現在不想參加。#l");
if (selection == 99) {
        npc.id(9270310).next().say("你會踢球嗎？\r\n我滿會的喔！");
} else if (selection == 2) {
        let win = stage.getIntWorldShareRecord(432, "win");
        let lose = stage.getIntWorldShareRecord(432, "lose");
        let draw = stage.getIntWorldShareRecord(432, "draw");
        npc.id(9270310).next().say("這是#b維多利亞足球對抗賽#k參加記錄！\r\n\r\n#e勝利#n次數：" + win + "次\r\n#e平手#n次數：" + draw + "次\r\n#e失敗#n次數：" + lose + "次");
} else if (selection == 1) {
        if (npc.id(9270310).askYesNo("確定要返回#e#b維多利亞盃主賽場#n#k嗎？")) {
                stage.changeMap(993244300, 0);
        }
} else if (selection == 0) {
        stage.showGameMatchingOpen(0x16);
}
