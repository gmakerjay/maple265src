// Created by MetaMS
// ID:[993241030]
// MapName:市中心封印區域入口
// 市中心封印區域入口
let dirStage = stage.getIntQuestRecordEx(26218, "dir");
if (stage.isQuestStarted(26214)) {
        usr.playPortalSE();
        if (dirStage == 6) {
                if (ctx.makeEvent("epic_dungeon_story", false, [stage, 993241400, 993241030]) == null) {
                        npc.me().say("#e#r發生錯誤，請聯系管理員！");
                }
        } else {
                stage.changeMap(993240010, 0);
        }
} else {
        npc.id(3006701).ui(1).next().say("#face0#好像還沒準備好。");
}