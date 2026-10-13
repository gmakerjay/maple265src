// Created by MetaMS
// My home set manager

let npcId = 9400922;
let n = stage.getIntQuestRecordExShare(500773, "manager");

if (n != 2) {//call
        let entity_0 = stage.getTempValue("entity_0");
        stage.destroyTempNpc(entity_0);
        stage.updateQuestRecordExShare(500773, "manager", "0");
        spawnManager();

        npc.id(npcId).ui(1).next().say("#face0#好的，那今後就請多多指教了！");
} else {
        let hide = stage.getIntQuestRecordExShare(500773, "managerHide");
        if (hide == 0) {//进行隐藏
                stage.updateQuestRecordExShare(500773, "managerHide", "2");

                let entity_0 = stage.getTempValue("entity_0");
                stage.destroyTempNpc(entity_0);
                npc.id(npcId).ui(1).next().say("#face0#什麼啊~你要讓我離開一會嗎？切，沒辦法了呢……那你可要快點叫我來哦？");
        } else {//进行显示
                stage.updateQuestRecordExShare(500773, "managerHide", "0");
                spawnManager();
                npc.id(npcId).ui(1).next().say("#face0#你辦完事情了？能回到家可真好呢！");
        }
}

function spawnManager() {
        let x = stage.getIntQuestRecordExShare(500767, "managerXpos");
        let y = stage.getIntQuestRecordExShare(500767, "managerYpos");
        let managerFlip = stage.getIntQuestRecordExShare(500767, "managerFlip") == 1 ? 0 : 1;

        let entity_0 = stage.spawnTempNpc(9400930, x, y, managerFlip);
        stage.setNpcSpecialAction(entity_0, "summon", 0, false);
        stage.addTempValue("entity_0", entity_0);
}