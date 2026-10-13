// Created by MetaMS
// ID:[993241000]
// MapName:高山入口
// 高山入口

if (stage.isQuestStarted(26211)) {
        if (ctx.makeEvent("epic_dungeon_story", false, [stage, 993241100, map.getId()]) == null) {
                npc.me().say("#e#r發生錯誤，請聯系管理員！");
        }
} else {
        npc.id(3006701).ui(1).next().say("#face0#好像還沒準備好。");
}