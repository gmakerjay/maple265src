// Created by MetaMS
// ID:[870001200]
// MapName:入口
// 入口

let value = stage.getIntQuestRecordEx(66703, "7");
if (value < 3) {
        npc.ui(1).npcFlip().meFlip().next().say("後面很危險，好像還是別進去比較好。\r\n#b※ <每週任務 : 秘密據點調查1> 個人研究#r3等級以上#b研究完成時，即可進入。");
} else {
        stage.enterGuildCastleRoom(ctx.getEntityName(), 1);
}