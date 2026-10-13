// Created by MetaMS
// [阿杜比斯]  |  [2030013]
// MapName:簡易殘暴炎魔的祭壇入口
// MapName:殘暴炎魔祭壇入口
// MapName:混沌殘暴炎魔祭壇入口

let partyCheck = require("party_check");
let partyBoss = require("party_boss");

let bossType = partyBoss.Zakum;

let onlyOne = false;
let minPlayers = 1;
let maxPlayers = 6;
let minLevel = [115, 155, 190];
let maxLevel = [300, 300, 300];
let event = ["boss_zakum_easy", "boss_zakum_normal", "boss_zakum_chaos"];
let reqItem = [4001796, 4001017, 4001017];

let menu = ["#e<殘暴炎魔簡單模式>#n\r\n殘暴炎魔復活了。若是放任不管，就會引起火山爆發，整個冰原雪域都會變成地獄的。\r\n#b\r\n#L0# 申請進入炎魔容易.(組隊員同時移動.)#l",
        "#e<殘暴炎魔:一般模式>#n\r\n殘暴炎魔復活了。若是放任不管，就會引起火山爆發，整個冰原雪域都會變成地獄的。\r\n#b\r\n#L0# 申請進入炎魔.(組隊員同時移動.)#l",
        "#e<殘暴炎魔： 混沌BOSS>#n\r\n殘暴炎魔復活了。這樣放任不管，會引起火山爆發，讓冰原雪域山脈全體變成地獄。\r\n#b#e(隊員同時移動。)#n#k\r\n#r(混沌殘暴炎魔#e 1週可完成1次#n，完成紀錄會於 #e每週四初始化#n。)\r\n#b\r\n#L0# 申請進入混沌殘暴炎魔。#l"//\r\n#L1# 申請進入混沌殘暴炎魔練習模式。#l
];
if (map.getId() == 211042402 || map.getId() == 211042400 || map.getId() == 211042401) {
        let sel = map.getId() == 211042402 ? 0 : map.getId() == 211042400 ? 1 : 2;
        let selection = npc.askMenu(menu[sel]);
        if (selection == 0) {
                if (party == null) {
                        if (npc.askYesNo("那個地方很危險，你必須先組隊才能進去。你想要創建隊伍以入場嗎？\r\n#b(點擊同意時將創建隊伍。)")) {
                                npc.createParty();
                        }
                }
                if (party == null) {
                        npc.next().say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
                } else if (stage.getCharacterId() != party.getLeaderId()) {
                        npc.next().say("請讓你的組隊長和我對話吧!");
                } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                        npc.next().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
                } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                        npc.next().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
                } else if (party.getMembersCount(map.getId(), minLevel[sel], maxLevel[sel]) < minPlayers) {
                        npc.next().say("你隊員的等級要在" + minLevel[sel] + "~" + maxLevel[sel] + "範圍!請確認!");
                } else if ((name = partyCheck.getNotClearCountCharacter(party, bossType, sel)) != null) {
                        npc.next().say("你隊員#r#e" + name + "#n#k完成次數已經達到上限了。");
                } else {
                        let check = true;
                        if (!partyCheck.checkHaveItem(party, reqItem[sel], 1)) {
                                npc.next().say("#r#e所有隊員#n#k皆沒有殘暴炎魔的祭品#e#b#t" + reqItem[sel] + "##k#n呢，正好我有帶在身上，這就給你們吧。");
                                if (!stage.gainItem(reqItem[sel], 1)) {
                                        check = false;
                                        npc.next().say("背包空間不足!");
                                } else {
                                        npc.next().say("將#b#t4001017##k丟下祭壇即可召喚殘暴炎魔。");
                                }
                        }
                        if (check && ctx.makeEvent(event[sel], onlyOne, party) == null) {
                                npc.next().say("#e#r發生錯誤，請聯系管理員！");
                        }
                }
        }
}