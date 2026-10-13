// Created by MetaMS
// ID:[993234800]
// MapName:入場準備

stage.resetForcedStat();
map.killAllMob();
stage.showSystemMessage("超過限制時間時，將自動移動至待機室。");
dir.duration(3000).text("好像可以用#r練習用拳擊王機器#k暖身。").scale(300).addPopupSay();
map.spawnMob(9834321, -145, 35);