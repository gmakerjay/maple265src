// Created by MetaMS
// ID:[160050000]
// MapName:寂靜的祭壇
// 寂靜的祭壇

let msg = "已消滅守護天使綠水靈。要回去嗎？";
if (map.getActiveMobCount() > 0) {
        msg += "\r\n#r※ 未獲得獎勵，現在離開將無法獲得獎勵。";
}
if (npc.ui(1).npcFlip().meFlip().askYesNo(msg)) {
        stage.changeMap(160000000, 2);
}