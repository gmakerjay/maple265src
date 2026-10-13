// Created by MetaMS
// ID:[870001220]
// MapName:地下2層
// 地下1層

let value = stage.getIntQuestRecordEx(66703, "32");
if (value < 1) {
        npc.ui(1).npcFlip().meFlip().next().say("後面很危險，好像還是別進去比較好。\r\n#b※ <每週任務 : 秘密據點調查3> 個人研究#r1等級以上#b研究完成時，即可進入。");
} else {
        stage.enterGuildCastleRoom(ctx.getEntityName(), 1);
}
