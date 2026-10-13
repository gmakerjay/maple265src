// Created by MetaMS
// ID:[993241010]
// MapName:草原封印區域入口
// 草原封印區域入口

let dirStage = stage.getIntQuestRecordEx(26218, "dir");
if (stage.isQuestStarted(26212)) {
        usr.playPortalSE();
        if (dirStage == 3) {
                if (ctx.makeEvent("epic_dungeon_story", false, [stage, 993241200, 993241010]) == null) {
                        npc.me().say("#e#r發生錯誤，請聯系管理員！");
                }
        } else {
                stage.changeMap(993240006, 0);
        }
} else {
        npc.id(3006701).ui(1).next().say("#face0#好像還沒準備好。");
}