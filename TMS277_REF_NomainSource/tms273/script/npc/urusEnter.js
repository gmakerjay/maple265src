// Created by MetaMS

let partyCheck = require("party_check");
let partyBoss = require("party_boss");

let BOSS_TYPE = partyBoss.Ursus;
let SEL_IDX = 0;

let sel = npc.ui(1).askMenu("#b你想要什麼呢？#k\r\n#L0#快速開始 (透過配對進行 18人挑戰)#l\r\n#L1#隊伍成員（1 ~ 18人挑戰）#l\r\n#L2#確認今天剩下的次數#l");
switch (sel) {
        case 0:
                npc.id(9070100).ui(1).next().say("要記住，若在配對完成後#b取消#k配對，將會有一段時間無法再入場。\r\n若在配對完成時使用#bNPC對話、商店/倉庫/快遞#k等，可能會自動取消配對，此時也會有#fs24##r一段時間不能再入場#fs16##k。");
                npc.id(9070100).ui(1).next().say("另外，進入與離開烏勒斯時套用中的\r\n#fs24##b#e所有Buff效果解除了耶#k#fs16##n。要多加注意喔。");
                npc.ui(1).say("當前未開放此功能。");
                break;
        case 1:
                if (party == null) {
                        npc.id(9070100).ui(1).say("你現在沒有隊伍，如果想以個人名義與其他勇士們一同挑戰烏勒斯的話，請選擇快速開始。");
                } else if (stage.getCharacterId() != party.getLeaderId()) {
                        npc.ui(1).say("請讓隊長和我交談。");
                } else if (stage.checkBossEnterLog(BOSS_TYPE, SEL_IDX)) {
                        npc.ui(1).say("一天只能入場3次，你已經不能在進入了。");
                } else if ((name = partyCheck.getNotEnterCountCharacter(party, BOSS_TYPE, SEL_IDX)) != null) {
                        npc.ui(1).say("你隊員#r#e" + name + "#n#k次數已經達到上限了。");
                } else {
                        npc.id(9070100).ui(1).next().say("要記住，若在配對完成後#b取消#k配對，將會有一段時間無法再入場。\r\n若在配對完成時使用#bNPC對話、商店/倉庫/快遞#k等，可能會自動取消配對，此時也會有#fs24##r一段時間不能再入場#fs16##k。");
                        npc.id(9070100).ui(1).next().say("另外，進入與離開烏勒斯時套用中的\r\n#fs24##b#e所有Buff效果解除了耶#k#fs16##n。請好好告訴隊員。");
                        stage.openUI(295);
                }
                break;
        case 2:
                npc.ui(1).say("今天還可以挑戰3次。但是請不要忘記每個ID進行次數有限。");
                break;
}