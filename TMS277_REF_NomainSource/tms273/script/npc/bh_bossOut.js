// Created by MetaMS


let msg = "要出去了嗎？";
if (map.getActiveMobCount() == 0) {
        msg = "結束戰鬥，" + msg;
}
if (npc.me().askYesNo(msg)) {
        stage.changeMap(350060300, 0);
}