// Created by MetaMS

let items = [0, 0, 0, 0, 0];
let flag = true;
const npcId = 9401988;

npc.id(npcId).next().say("從#b一般藥材#k中捐獻5個，我會感謝你的心意並給予1個隨機藥材。");

while (flag) {
        let count = items.reduce((a, b) => a + b, 0);
        let str = `選擇要捐獻的藥材。#b(目前選擇的藥材數量：${count}個)#k\r\n`;
        let cStr = "你已經選擇5個了。確認一下是否正確。\r\n";

        items.forEach((item, index) => {
                let itemId = 4037323 + index;
                if (item <= 0) {
                        str += `#L${index}##fc0xFF662500##i${itemId}:# #t${itemId}:##l\r\n`;
                } else {
                        cStr += `#fc0xFF662500##i${itemId}:# #t${itemId}:##k ${item}個\r\n`;
                }
        });

        if (count >= 5) {
                if (npc.id(npcId).askYesNo(cStr)) {
                        handleDonate();
                } else {
                        resetData();
                        npc.id(npcId).next().say("那麼從頭開始選擇吧。");
                }
        } else {
                if (count > 0) {
                        str += "#L5##b想從頭開始選擇。#k#l\r\n";
                }
                let sel = npc.id(npcId).askMenu(str);
                if (sel == 5) {
                        resetData();
                } else {
                        let itemId = 4037323 + sel;
                        let number = npc.id(npcId).defNum(1).maxNum(5).askNumber(`#fc0xFF662500##i${itemId}:# #t${itemId}:##k要捐獻幾個藥材呢？`);
                        if (count + number > 5) {
                                npc.id(npcId).next().say("至今所選的藥材數量已超過5個了耶？總共有5個藥材，可全部選1個。");
                        } else {
                                items[sel] = number;
                        }
                }
        }
}

function handleDonate() {
        let insufficient = items.some((item, index) => item > stage.getIntQuestRecordEx(504648, `o${index + 1}`));
        if (insufficient) {
                flag = false;
                npc.id(npcId).next().say("所選的藥材數量不足!");
                return;
        }

        items.forEach((item, index) => {
                if (item > 0) {
                        let remaining = stage.getIntQuestRecordEx(504648, `o${index + 1}`) - item;
                        stage.updateQuestRecordEx(504648, `o${index + 1}`, remaining);
                }
        });

        let rng = Math.floor(Math.random() * 100) < 15 ? Math.floor(Math.random() * 3) + 6 : Math.floor(Math.random() * 5) + 1;
        let rewardCount = stage.getIntQuestRecordEx(504648, `o${rng}`) + 1;
        let rItemId = 4037322 + rng;
        stage.updateQuestRecordEx(504648, `o${rng}`, rewardCount);

        let selection = npc.id(npcId).askMenu(`謝謝你捐獻。作為獎勵，我會給你#fc0xFF662500##i${rItemId}:# #t${rItemId}:##k藥材。\r\n#r#L0#連續捐獻選擇的藥材#l\r\n#L1##k放棄#l\r\n`);
        if (selection == 1) {
                flag = false;
        }
}

function resetData() {
        items.fill(0);
}