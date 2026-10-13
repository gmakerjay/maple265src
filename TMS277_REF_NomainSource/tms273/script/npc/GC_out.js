// Created by MetaMS
// [傳送門]  |  [9091015]
// MapName:靠近盡頭之處

if (map.getId() == 450012650 || map.getId() == 450012250) {
        let text = "擊退親衛隊長頓凱爾了。要回去嗎？";
        if (map.getActiveMobCount() > 0) {
                text += "\r\n#r※ 未獲得獎勵。現在離開將無法獲得獎勵。#k";
        }
        if (npc.ui(1).npcFlip().meFlip().askYesNo(text)) {
                stage.changeMap(450012200, 2);
        }
} else {
        if (npc.me().askYesNo("攻勢相當不尋常。先撤退重新準備戰鬥會不會比較好呢？")) {
                stage.changeMap(450012200, 2);
        }
}