// Created by MetaMS
// ID:[954104000]
// MapName:1階段:思想的邊境
// 1階段:思想的邊境

let event = stage.getEvent();
if (event != null) {
        if (map.getActiveMobCount() > 0) {
                stage.showProgressMessageFont("必須消滅平原內所有怪物才能移動到下一個關卡。", 3, 20, 4, 0);//unk:[byte]0
                stage.showSystemMessage("首先打倒場地內所有怪物。");
        } else {
                usr.playPortalSE();
                stage.changeMap(map.getId() + 100, 0);
        }
}