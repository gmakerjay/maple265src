// Created by MetaMS
// [傳送門]  |  [9091038]
// MapName:沉寂的船艦


if (map.getId() == 350068600 || map.getId() == 350067600 || map.getId() == 350066600) {
        let text = "已消滅史烏。要回去嗎？";
        if (map.getActiveMobCount() > 0) {
                text += "\r\n#r※ 未獲得獎勵。現在離開將無法獲得獎勵。#k";
        }
        if (npc.ui(1).npcFlip().meFlip().askYesNo(text)) {
                stage.changeMap(350060300, 0);
        }
} else {
        if (npc.me().askYesNo("要在這裡退場嗎？")) {
                stage.changeMap(350060300, 0);
        }
}