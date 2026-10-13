// Created by MetaMS
// [簡]  |  [9020005]
// MapName:休菲凱曼的招待所

let partyCheck = require("party_check");
let eLog = require("extend_log");

let minPlayers = 1;
let maxPlayers = 6;
let minLevel = 50;
let maxLevel = 300;

let logQuestId = 7928;
let maxEnter = 5;
let onlyOne = false;
let event = "pq_prison_break";

let selection = npc.askMenu("#e<組隊任務：逃脫>#n\r\n\r\n 其實...雖然很想現在就拔腿逃跑...但我無法拒絕他的請求,我正在找能夠救出被關在這城裡空中監獄內的人.\r\n\r\n#b#L0# 我去救關在城裡的冒險家.#l");
switch (selection) {
        case 0:
                npc.next().say("你比看起來還要勇敢。我會告訴你空中監獄在哪，跟我來吧。");
                stage.startQuest(7890, String(map.getId()));//Quest Name:Unknown
                stage.changeMap(921160000, 0);
                break;
}