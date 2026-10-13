// Created by MetaMS
// ID:[5680643]
// MapName:邱比特公園
// 225~249等級經驗值2倍券1回使用券


if (npc.id(9010000).askYesNo("你好，#h0#先生！\r\n目前可以獲得#i5680643:# #t5680643:#  #b1個#k 喔。要現在接收嗎？")) {
        /* Response is Yes */
        if (stage.gainItem(5212002, 1)) {
                ctx.consume();
                npc.id(9010000).next().say("那祝你有愉快的一天。");
        } else {
                npc.id(9010000).say("背包空間不足");
        }
} else {
        /* Response is No */
        npc.id(9010000).say("如果想法有變的話，再跟我說吧！");
}