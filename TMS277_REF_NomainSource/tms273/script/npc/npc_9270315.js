// Created by MetaMS
// [瓦蕾莉]  |  [9270315]
// MapName:維多利亞海岸入口

let selection = npc.id(9270315).askMenu("#b#e要去參加<維多利亞船艇競賽>#k#n嗎？\r\n\r\n#L0##r<維多利亞船艇競賽>#n快速開始#k#l\r\n\r\n#L99#和瓦蕾莉對話#l\r\n#L100#現在不想參加。#l");


if (selection == 99) {
        npc.meFlip().next().say("我剛才好像看到什麼了耶？");
        npc.id(9270315).next().say("脫落的螺栓已經修好了，別擔心～\r\n哈哈哈哈～～");
} else if (selection == 0) {
        npc.id(9270315).next().say("使用甩尾和推進器，在競賽中獲勝吧！\r\n\r\n#r※ 為順暢進行遊戲，建議把解析度變更為#e1366x768#n。");
        /* Update Quest RecordEx | Id:16036 | Name: Unknown | Data: "match=0;game=24" */
        //stage.updateQuestRecordEx(16036, "match=0;game=24");
        stage.showGameMatchingOpen(0x18);
}