// Created by MetaMS
// PQ:trade king

let mapId;
let tStage, map;
let time = 60;
let ALL_MAP_ID = [];

function init(attachment) {
        tStage = attachment;
        for (let i = 0; i < 36; i++) {
                ALL_MAP_ID.push(993000801 + i);
        }
        //event.initMap(ALL_MAP_ID); //init indie map
        event.startTimer("kick", time * 60 * 1000);
        endTime = new Date().getTime() + time * 60 * 1000;
        tStage.initTradeKingShop();
        let data = tStage.getQuestRecordEx(15326);//推車
        let type = 0;
        if (data != null) {
                type = Number(data);
        }
        let maxWeight = 10 + (type * 10);
        for (let i = 0; i < 5; i++) {
                data = tStage.getQuestRecordEx(15325, String(i));
                if (data != null) {
                        let workerNum = Number(data);
                        let addWeight = getTradeKingWeightAdd(i) * workerNum;
                        maxWeight += addWeight;
                }
        }
        tStage.addTempValue("TK_9001087", "0");
        tStage.addTempValue("TK_9001088", "0");
        tStage.addTempValue("TK_9001091", "0");
        tStage.updateQuestRecordEx(15324, "mWeight", String(maxWeight));
        tStage.setEvent(event);
        tStage.cancelAllBuffStat();
        tStage.changeMap(993000801, 0);
}

function playerDisconnected(stage) {
        event.destroyEvent();
}
function getCoin() {
    var ret = 0;
    var data = tStage.getQuestRecordEx(15324, "count");
    if (data != null) {
        ret = Number(data);
    }
    return ret;
}

function getSaveCoin() {
    var ret = 0;
    var data = tStage.getQuestRecordEx(15324, "scount");
    if (data != null) {
        ret = Number(data);
    }
    return ret;
}
function playerChangedMap(stage, destination) {
        if (ALL_MAP_ID.includes(destination.getId())) {
                stage.showTimer((endTime - new Date().getTime()) / 1000);
                for (let i = 0; i < 5; i++) {
                        stage.cancelBuffStat(80001960 + i);
                }
        } else {
                removePlayer();
                event.destroyEvent();
        }
}

function removePlayer() {
        for (let i = 0; i < 3; i++) {
                tStage.cancelBuffStat(80001950 + i);
        }
        for (let i = 0; i < 5; i++) {
                tStage.cancelBuffStat(80001960 + i);
        }
        tStage.setEvent(null);
}

function kick() {
        removePlayer();
        tStage.changeMap(993000837, 0);
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
        tStage.setEvent(null);
}


function getTradeKingWeightAdd(type) {
        switch (type) {
                case 0:
                        return 10;
                case 1:
                        return 20;
                case 2:
                        return 10;
                case 3:
                        return 15;
                case 4:
                        return 25;
                default:
                        return 10;
        }
}