// Created by MetaMS
// Nihal Trade

let sel = npc.askMenu("我是巨賈哈薩爾！你想要做什麼呢？\r\n#L1##b僱傭搬運工#k#n#l\r\n#L2##b解僱搬運工#k#n#l\r\n#L3##b升級推車#k#n#l\r\n#L4##b儲存貨幣#k#n#l\r\n");
switch (sel) {
        case 1:
                hire();
                break;
        case 2:
                fire();
                break;
        case 3:
                riding();
                break;
        case 4:
                saveCoin();
                break;
}

function hire() {
        if (getWorkerCount() < 5) {
                let text = "來！你需要哪種#b搬運工#k呢？\r\n#e#r持有貨幣：#i4034849#";
                text += getCoin();
                text += "\r\n儲存的貨幣：";
                text += getSaveCoin();
                text += " #n\r\n";
                text += "#L0##v3801023:##b#z3801023# #r#e僱傭費用：100貨幣#k#n#l\r\n";
                text += "#L1##v3801024:##b#z3801024# #r#e僱傭費用：200貨幣#k#n#l\r\n";
                text += "#L2##v3801025:##b#z3801025# #r#e僱傭費用：200貨幣#k#n#l\r\n";
                text += "#L3##v3801026:##b#z3801026# #r#e僱傭費用：300貨幣#k#n#l\r\n";
                text += "#L999##b我現在不需要搬運工#k#n#l\r\n";
                let hSel = npc.askMenu(text);

                if (hSel >= 0 && hSel != 999) {
                        let infoId = 3801023 + hSel;
                        let money = hSel == 0 ? 100 : hSel == 1 ? 200 : hSel * 100;
                        let ret = npc.askYesNo("是否要使用#e#r" + money + "#k貨幣#n僱傭一個#b#v" + infoId + ":##z" + infoId + "#");
                        if (ret == 1) {
                                if (modifyCoin(money)) {
                                        hireWorker(hSel);
                                        npc.next().say("好！你僱傭了一個#b#v" + infoId + ":##z" + infoId + "#");
                                } else {
                                        npc.next().say("你沒有足夠的貨幣！！");
                                }
                        } else {
                                npc.next().say("猶豫不決呀！那等你考慮好了再來！！");
                        }
                }
        } else {
                npc.next().say("當前已有5個搬運工了，無法再僱傭！");
        }
}


function fire() {
        if (getWorkerCount() > 0) {
                let text = "當前已經僱傭#r" + getWorkerCount() + "#k個#b搬運工#k\r\n#e#r請選擇要解僱的搬運工：#n\r\n";
                for (let i = 0; i < 5; i++) {
                        let infoId = 3801023 + i;
                        let data = stage.getQuestRecordEx(15325, String(i));
                        if (data != null) {
                                let count = Number(data);
                                if (count > 0) {
                                        text += "#b#L" + i + "##v" + infoId + ":##z" + infoId + "# #r" + count + "#b個#l\r\n";
                                }
                        }
                }
                text += "#L999##b我現在不想解僱搬運工#k#n#l\r\n";
                let sel = npc.askMenu(text);
                if (sel != 999 && sel >= 0) {
                        let infoId = 3801023 + sel;
                        let ret = npc.askYesNo("是否要解僱一個#b#v" + infoId + ":##z" + infoId + "#");
                        if (ret == 1) {
                                fireWorker(sel);
                                npc.next().say("好！你解僱了一個#v" + infoId + ":##z" + infoId + "#");
                        }
                }
        } else {
                npc.next().say("你都還沒有僱傭搬運工呢！");
        }
}


function riding() {
        let type = 0;
        let ride = 80001950;
        let baseId = 3801028;
        let rideData = stage.getQuestRecordEx(15326);
        if (!"".equals(rideData)) {
                ride = ride + Number(rideData);
                type = Number(rideData);
        }
        let infoId = baseId + type;
        if (ride < 80001952) {
                type += 1;
                let money = type * 500;
                let nextRide = ride + 1;
                let nextInfoId = baseId + type;
                let text = "你現在在使用#b#v" + infoId + ":##b#z" + infoId + "##k啊？\r\n你這個推車再好一點的是";
                text += "#b#v" + nextInfoId + ":##b#z" + nextInfoId + "##k，";
                text += "費用為#r#e" + money + "#k#n個貨幣,你要升級嗎？\r\n";
                text += "持有貨幣：#e#r#i4034849#";
                text += getCoin();
                text += "#n#k\r\n儲存的貨幣：#e#r";
                text += getSaveCoin();
                text += " #n#k\r\n";
                if (npc.askYesNo(text)) {
                        if (modifyCoin(money)) {
                                stage.cancelBuffStat(ride);
                                stage.applySkillBuff(nextRide, 1);
                                stage.updateQuestRecordEx(15326, String(type));
                                updateTradeKingInfo();
                                npc.next().say("好了！你的推車已經升級成#b#v" + nextInfoId + ":##b#z" + nextInfoId + "##k!");
                        } else {
                                npc.next().say("你沒有足夠的貨幣！！");
                        }
                } else {
                        npc.next().say("猶豫不決呀！那等你考慮好了再來！！");
                }
        } else {
                npc.next().say("你現在在使用#b#v" + infoId + ":##b#z" + infoId + "##k啊！已經不能再升級了！");
        }
}


function saveCoin() {
        npc.next().say("我這裡可以幫你保管貨幣，只不過，在我這裡儲存過一次貨幣後就無法再次取走，那些貨幣只能用於在我這裡購買#b搬運工和推車#k。");
        var text = "怎麼樣，想要讓我幫忙儲存貨幣，壯大你的生意資本嗎？儲存費用為#i4034849##e#r貨幣50#n#k個\r\n";
        text += "持有貨幣：#i4034849##r#e";
        text += getCoin();
        text += "#n#k\r\n儲存的貨幣：#r#e";
        text += getSaveCoin();
        let ret = npc.askYesNo(text);
        if (ret == 1) {
                if (getCoin() >= 50) {
                        stage.updateQuestRecordEx(15324, "scount", String(getSaveCoin() + getCoin() - 50));
                        stage.updateQuestRecordEx(15324, "count", "0");
                        npc.next().say("好啦！儲存的貨幣：#e#r" + getSaveCoin() + "#n#k個！");
                } else {
                        npc.next().say("你好像沒有那麼多的貨幣可以儲存哦！");
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
