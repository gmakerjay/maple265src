// Created by MetaMS
// [傳送門]  |  [9091002]
// MapName:暴君的王座

let msg = "要出去了嗎？";
if (map.getActiveMobCount() == 0) {
        msg = "結束戰鬥，" + msg;
}
if (npc.me().askYesNo(msg)) {
        stage.changeMap(811000999, 2);
}