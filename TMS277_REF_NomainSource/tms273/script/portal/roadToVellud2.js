// Created by MetaMS
// ID:[863000100]
// MapName:愛心樹守護者所在之處
// 愛心樹守護者所在之處

if (stage.isQuestCompleted(17523)) {
        usr.playPortalSE();
        stage.changeMap(863010000, 0);
} else {
        ctx.portalBlock("當前無法進入。");
}