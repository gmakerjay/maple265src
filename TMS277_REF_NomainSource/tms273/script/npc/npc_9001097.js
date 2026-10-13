// Created by MetaMS
// Nihal Trade

let event = stage.getEvent("trade_king");
if (event != null && stage.isQuestCompleted(15351)) {
        let number = stage.getIntQuestRecordEx(15325, "4");
        if (number <= 0) {
                if (getWorkerCount() < 5) {
                        let text = "你好，要是你能支付我#r1000#k貨幣的話，那我可以為你服務！";
                        let ret = npc.askYesNo(text);
                        if (ret == 1) {
                                if (modifyCoin(1000)) {
                                        stage.startQuest(15351, 0);
                                        hireWorker(4);
                                        updateWorker();
                                        npc.say("好的！那就為你服務了！");
                                } else {
                                        npc.say("真可惜你沒有那麼多貨幣！！");
                                }
                        }
                } else {
                        npc.say("當前已有5個搬運工了，無法再僱傭！");
                }
        }
}

function updateWorker() {
        for (let i = 0; i < 5; i++) {
                stage.setPartner(false, i, 0, false);
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

function modifyCoin(number) {
        let rCount = number;
        if (getCoin() + getSaveCoin() >= number) {
                if (getSaveCoin() >= number) {
                        rCount -= number;
                        stage.updateQuestRecordEx(15324, "scount", String(Math.max(0, getSaveCoin() - number)));
                } else if (number > getSaveCoin()) {
                        rCount -= getSaveCoin();
                        stage.updateQuestRecordEx(15324, "scount", "0");
                }
                if (rCount > 0) {
                        stage.updateQuestRecordEx(15324, "count", String(Math.max(0, getCoin() - rCount)));
                }
                return true;
        }
        return false;
}

function getCoin() {
        let ret = 0;
        let data = stage.getQuestRecordEx(15324, "count");
        if (data != null) {
                ret = Number(data);
        }
        return ret;
}

function getSaveCoin() {
        let ret = 0;
        let data = stage.getQuestRecordEx(15324, "scount");
        if (data != null) {
                ret = Number(data);
        }
        return ret;
}

function getWorkerCount() {
        let ret = 0;
        for (let i = 0; i < 5; i++) {
                let data = stage.getQuestRecordEx(15325, String(i));
                if (data != null) {
                        ret += Number(data);
                }
        }
        return ret;
}

function hireWorker(type) {
        let data = stage.getQuestRecordEx(15325, String(type));
        if (data != null) {
                let count = Number(data);
                stage.updateQuestRecordEx(15325, String(type), String(Math.min(5, Math.max(0, count + 1))));
        } else {
                stage.updateQuestRecordEx(15325, String(type), "1");
        }
        updateTradeKingInfo();
}

function fireWorker(type) {
        let data = stage.getQuestRecordEx(15325, String(type));
        if (data != null) {
                let count = Number(data);
                stage.updateQuestRecordEx(15325, String(type), String(Math.max(0, count - 1)));
                updateTradeKingInfo();
                return true;
        }
        return false;
}


function updateTradeKingInfo() {
        let data = stage.getQuestRecordEx(15326);//推車
        let type = 0;
        if (data != null) {
                type = Number(data);
        }
        let maxWeight = 10 + (type * 10);
        for (let i = 0; i < 5; i++) {
                data = stage.getQuestRecordEx(15325, String(i));
                if (data != null) {
                        let workerNum = Number(data);
                        let addWeight = getTradeKingWeightAdd(i) * workerNum;
                        maxWeight += addWeight;
                }
        }
        stage.updateQuestRecordEx(15324, "mWeight", String(maxWeight));
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