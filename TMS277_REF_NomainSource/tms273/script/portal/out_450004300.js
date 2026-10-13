// Created by MetaMS
// ID:[450004600]
// MapName:惡夢時間塔
// 惡夢時間塔

let msg = "已消滅露希妲。要回去嗎？";
if (map.getActiveMobCount() > 0) {
        msg += "\r\n#r※ 未獲得獎勵，現在離開將無法獲得獎勵。";
}
if (npc.ui(1).npcFlip().meFlip().askYesNo(msg)) {
        stage.changeMap(450004000, 0);
}