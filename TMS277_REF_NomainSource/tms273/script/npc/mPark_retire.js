// Created by MetaMS
// [休菲凱曼]  |  [9071005]

if (npc.askYesNo("怎麼啦？這麼快就要走了啊？還有很多有趣的事唷。")) {
        /* Response is Yes */
        npc.next().say("真是個毅力不夠的傢伙，算了，你要走就讓你走吧。");
        /* Update Quest RecordEx | Id:18805 | Name: Unknown | Data: "Td=23/12/29;count=2;T1=204;T2=1413;T3=1005;date=23/12/29;tryCount=3" */
        //stage.updateQuestRecordEx(18805, "Td=23/12/29;count=2;T1=204;T2=1413;T3=1005;date=23/12/29;tryCount=3");
        stage.changeMap(951000000, 0);
} else {
        /* Response is No */
        npc.next().say("好啊！再多玩一會兒。");
}