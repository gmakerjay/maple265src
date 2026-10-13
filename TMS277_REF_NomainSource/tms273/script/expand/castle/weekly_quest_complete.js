// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

let mobKillCount = stage.getIntQuestRecordEx(66669, "mobKillCount")
let goal = stage.getIntQuestRecordEx(66669, "goal");
if (mobKillCount >= goal) {
        stage.completeQuest(66669);
        stage.updateQuestRecordEx(66669, "WeeklyMission", "1");
        stage.updateQuestRecordExShare(502695, "WeeklyMission", "1");
        ctx.addGuildCastleQuestLog(stage.getGuildId(), stage.getCharacterId(), stage.getCharacterName(), 6);
        npc.id(9401592).ui(1).say("#face1#你完成了本週的公會城任務。感謝你的努力，#h0#。");
}