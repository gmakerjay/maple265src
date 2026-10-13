// Created by MetaMS
// ID:[921174900]
// MapName:激鬥陣地(練習場)
// 激鬥陣地(練習場)

let posX = stage.getPosX();
stage.showSystemMessage("已脫離戰場。請完成戰鬥。");
stage.teleportToPortalId(posX < 0 ? 12 : 13);