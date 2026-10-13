// Created by MetaMS
// ID:[871000011]
// MapName:小蘑菇屋
if ("1".equals(stage.getQuestRecordExShare(500767, "7"))) {
        let n = stage.getIntQuestRecordExShare(500773, "manager");
        let npcId = 9400920 + n;
        if (stage.onMyHome() || map.getId() / 100000 == 8710) {
                npc.id(npcId).ui(1).next().say("#face3#目前已經在我的小屋了呀!");
        } else {
                let ret = npc.id(npcId).ui(1).next().askYesNo("#face2#你要現在進入我的小屋嗎？");
                if (ret) {
                        stage.updateQuestRecordEx(64590, "rMap", map.getId());
                        stage.enterMyHome();
                }
        }
} else {
        stage.showSystemMessage("不滿足我的小屋入場條件。請確認是否已經執行先行任務。");
}
