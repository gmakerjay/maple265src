// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

let mobKillCount = stage.getIntQuestRecordEx(66669, "mobKillCount")
let goal = stage.getIntQuestRecordEx(66669, "goal");
if (mobKillCount >= goal) {
        if (stage.getIntQuestRecordEx(66669, "WeeklyMission") > 1) {
                npc.id(9401592).ui(1).say("#face1#已經使用楓葉點數額外完成了，無法再次使用。");
        } else if (stage.modifyCurrency(2, 150)) {
                stage.updateQuestRecordEx(66669, "WeeklyMission", "2");
                ctx.addGuildCastleQuestLog(stage.getGuildId(), stage.getCharacterId(), stage.getCharacterName(), 7);
                npc.id(9401592).ui(1).say("#face1#你使用楓葉點數額外完成了本週的公會城任務。感謝你的努力，#h0#。");
        } else {
                npc.id(9401592).ui(1).say("#face1#擁有的楓葉點數不足，請確認。");
        }
} else {
        npc.id(9401592).ui(1).say("#face1#請確認任務完成情況。");
}