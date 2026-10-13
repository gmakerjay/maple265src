// Created by MetaMS
// Event: Monster park

let EXIT_MAP = 951000000;

let allFieldId;
let actStage;
let endTime;
let baseLevel;

function init(attachment) {
        [actStage, allFieldId] = attachment;
        event.initMap(allFieldId);
        for (let i = 0; i < allFieldId.length; i++) {
                event.getMap(allFieldId[i]).reset();
        }
        baseLevel = actStage.getLevel();
        let dungeonType = actStage.getIntQuestRecordEx(7901, "dungeonType") + 1;
        event.setVariable("BASE_EXP", 550 * dungeonType * 10);
        event.setVariable("TOTAL_EXP", 0);
        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        actStage.setEvent(event);
        actStage.changeMap(allFieldId[0], 0);
}

function mobDied(mob) {
        let totalEXP = parseFloat(event.getVariable("TOTAL_EXP"));
        let baseEXP = parseFloat(event.getVariable("BASE_EXP"));
        totalEXP = baseEXP * baseLevel + totalEXP;
        event.setVariable("TOTAL_EXP", totalEXP);
        let idx = parseInt(mob.getMapId() % 1000 / 100);
        let nMap = event.getMap(mob.getMapId());
        if (nMap != null) {
                nMap.blowWeather(5120162, "經驗值獎勵 " + totalEXP + " 累積！", 2);
                /* Update Quest RecordEx | Id:15180 | Name: Unknown | Data: "exp=425037530" */
                actStage.updateQuestRecordEx(15180, "exp", totalEXP);
                switch (mob.getDataId()) {
                        default:
                                let mobSize = nMap.getActiveMobCount();
                                actStage.showScriptProgressMsg("目前剩餘怪物：" + mobSize + "隻");
                                if (mobSize <= 0) {
                                        event.setVariable("Kill" + idx, true);
                                        nMap.showScreenAutoLetterBox("monsterPark/clearF");
                                        nMap.playSoundEffect("Party1/Clear");
                                        let index = allFieldId.indexOf(nMap.getId());
                                        if (index != -1) {
                                                let phase = index + 1;
                                                if (phase == allFieldId.length) {
                                                        actStage.showScriptProgressMsg("全部關卡已經完成，請通過傳送點往外移動。");
                                                }
                                        }
                                }
                                break;
                }
        }
}

function removePlayer(playerId, changeMap) {
        actStage.setEvent(null);
        if (changeMap) {
                actStage.changeMap(EXIT_MAP, 0);
        }
        let tryCount = actStage.getIntQuestRecordExShare(18805, "tryCount") + 1;
        actStage.updateQuestRecordExShare(18805, "tryCount", String(tryCount));
        event.destroyEvent();
}

function playerDisconnected(stage) {
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        if (allFieldId.includes(destination.getId())) {
                actStage.showTimer((endTime - new Date().getTime()) / 1000);
                let index = allFieldId.indexOf(destination.getId());
                if (index != -1) {
                        let phase = index + 1;
                        if (phase == allFieldId.length) {
                                destination.showScreenAutoLetterBox("monsterPark/stageEff/final");
                        } else {
                                destination.showScreenAutoLetterBox("monsterPark/stageEff/stage");
                                destination.showScreenAutoLetterBox("monsterPark/stageEff/number/" + phase);
                        }
                }
        } else {
                removePlayer(stage.getCharacterId(), false);
        }
}

function kick() {
        actStage.setEvent(null);
        actStage.changeMap(EXIT_MAP, 0);
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "kick":
                        kick();
                        break;
        }
}

function deinit() {
        actStage.setEvent(null);
}