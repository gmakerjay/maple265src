// Created by MetaMS
// [傳送門]  |  [9091002]
// MapName:暴君的王座

let msg = "要出去了嗎？";
if (map.getActiveMobCount() == 0) {
        msg = "結束戰鬥，" + msg;
}
if (npc.me().askYesNo(msg)) {
        if (map.getId() == 940100200) {
                stage.changeMap(940100100, 2);
        } else {
                stage.changeMap(401060000, 1);
        }
}