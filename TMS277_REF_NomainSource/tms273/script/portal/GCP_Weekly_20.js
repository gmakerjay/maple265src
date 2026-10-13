// Created by MetaMS
// ID:[870001210]
// MapName:地下1層
// 地下1層

let value = stage.getIntQuestRecordEx(66703, "7");
if (value < 1) {
        npc.ui(1).npcFlip().meFlip().next().say("後面很危險，好像還是別進去比較好。\r\n#b※ <每週任務 : 秘密據點調查1> 個人研究#r1等級以上#b研究完成時，即可進入。");
} else {
        stage.enterGuildCastleRoom(ctx.getEntityName(), map.getTemplateFieldId() == 870001210 ? 1 : map.getTemplateFieldId() == 870001230 ? 2 : 3);
}
