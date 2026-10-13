// Created by MetaMS
// Nihal Trade

let MapID = [
        993000806,
        993000807,
        993000808,
        993000812,
        993000813,
        993000814,
        993000815,
        993000816,
        993000817,
        993000821,
        993000823,
        993000833,
        993000835,
        993000834,
        993000825,
        993000827,
        993000829,
        993000831];

let event = stage.getEvent("trade_king");
if (event != null) {
        updateWorker();
        if (stage.isQuestCompleted(15348)) {
                stage.removeQuest(15348);
        }
        if (stage.isQuestCompleted(15349)) {
                stage.removeQuest(15349);
        }
        if (stage.isQuestCompleted(15350)) {
                stage.removeQuest(15350);
        }
        if (stage.isQuestCompleted(15351)) {
                stage.removeQuest(15351);
        }
        let type = Math.floor(Math.random() * 10);
        if (stage.isGm()) {
                stage.dropMessage(11, "[Nihal Trade] Spawn Map:" + map.getId() + " On Map:" + MapID.includes(map.getId()) + " Spawn Type:" + type);
        }
        if ((MapID.includes(map.getId()) && (Math.random() < stage.isGm() ? 1 : (1 / 36))) ) {
                let mCount
                switch (type) {
                        case 0: //9001087 Special shop
                                mCount = parseInt(stage.getTempValue("TK_9001087"));
                                if (mCount < 3) {
                                        stage.addTempValue("TK_9001087", String(mCount));
                                        stage.completeQuest(15348);
                                }
                                break;
                        case 2: //9001088 Special shop
                                mCount = parseInt(stage.getTempValue("TK_9001088"));
                                if (mCount < 3) {
                                        stage.addTempValue("TK_9001088", String(mCount));
                                        stage.completeQuest(15349);
                                }
                                break;
                        case 4: //9001088 Special shop
                                mCount = parseInt(stage.getTempValue("TK_9001091"));
                                if (mCount < 3) {
                                        stage.addTempValue("TK_9001091", String(mCount));
                                        stage.completeQuest(15350);
                                }
                                break;
                        case 6: //9001088 Special shop
                                let number = stage.getIntQuestRecordEx(15325, "4");
                                if (number <= 0) {
                                        stage.completeQuest(15351);
                                }
                                break;


                }
        }
 
}

function updateWorker() {
        for (let i = 0; i < 5; i++) {
                stage.setPartner(false, 80001960 + i, 0, false);
        }
        let spawnIdx = 0;
        for (let i = 0; i < 5; i++) {
                let skillId = 80001960 + i;
                let data = stage.getQuestRecordEx(15325, String(i));
                if (data.length > 0) {
                        let count = parseInt(data);
                        for (let z = 0; z < count; z++) {
                                stage.setPartner(true, spawnIdx, skillId, false);
                                spawnIdx++;
                        }
                }
        }
}