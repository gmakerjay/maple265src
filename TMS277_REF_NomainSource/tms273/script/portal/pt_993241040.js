// Created by MetaMS
// ID:[993241040]
// MapName:高山雪原入口
// 高山雪原入口

if (stage.isQuestStarted(26215)) {
        if (ctx.makeEvent("epic_dungeon_story", false, [stage, 993241500, map.getId()]) == null) {
                npc.me().say("#e#r發生錯誤，請聯系管理員！");
        }
} else {
        npc.id(3006701).ui(1).next().say("#face0#好像還沒準備好。");
}