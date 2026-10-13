// Created by MetaMS
// [蕾那麗]  |  [2010009]
// MapName:家族中心(英雄公馆)

if (stage.getAllianceId() != 0) {
        AllianceMenu();
} else {
        CommonMenu();
}

function CommonMenu() {
        let selection = npc.askMenu("您好！我叫#b蕾那麗#k。\r\n#b"
                + "#L0#請您告訴我家族聯盟是什麼？#l\r\n"
                + "#L1#要成立家族聯盟的話應該怎麼做？#l\r\n"
                + "#L2#我想成立家族聯盟。#l\r\n");

        switch (selection) {
                case 0:
                        npc.next().say("多個家族結合在一起成立的組織被稱為家族聯盟。我負責管理家族聯盟的有關事務。");
                        break;
                case 1:
                        npc.next().say("想要成立家族聯盟的話，必須有2名家族長組成組隊。其中隊長會成為家族聯盟的盟主。");
                        npc.next().say("2名家族長組隊之後，需要500萬金幣。這是建立家族聯盟所必需的手續費。");
                        npc.next().say("另外還有一個！如果已經加入其他家族聯盟的話，就無法建立新的家族聯盟！");
                        break;
                case 2:
                        if (party == null) {
                                npc.next().say("如果你想建立家族聯盟，那麼請由2名家族長組成組隊。");
                        } else if (stage.getCharacterId() != party.getLeaderId()) {
                                npc.next().say("如果你們想建立家族聯盟，那麼請讓組隊長與我交談！");
                        } else if (party.getMembersCount() != 2) {
                                npc.next().say("必須要有2名家族長組成組隊。");
                        } else if (party.getMembersCount(200000301, 0, 300) != 2) {
                                npc.next().say("請召集所有隊員到這裡。");
                        } else {
                                let members = party.getLocalMembers();
                                let error = "";
                                let oGuildId = 0;
                                let oCharaterId = 0;
                                for (let i = 0; i < members.length; i++) {
                                        let member = members[i];
                                        if (!member.hasGuild()) {
                                                error = "隊伍成員中好像有人沒有家族喲，沒有家族是不能組成一個家族聯盟的!";
                                        } else if (member.getAllianceId() != 0) {
                                                error = "隊伍成員中好像有人已經有家族聯盟了!";
                                        } else if (member.getGuildGrade() != 1) {
                                                error = "隊伍成員中好像有人不是家族族長，必須要是家族族長才能組成一個家族聯盟!";
                                        }
                                        if (member.getGuildId() != stage.getGuildId()) {
                                                oGuildId = member.getGuildId();
                                                oCharaterId = member.getCharacterId();
                                        }
                                }
                                if (error.length != 0) {
                                        npc.next().say(error);
                                } else {
                                        selection = npc.askYesNo("好的,你對家族聯盟感興趣嗎?");
                                        if (selection == 1) {
                                                let allianceName = npc.minLen(4).maxLen(12).askText("請輸入想要建立家族聯盟的名稱。\r\n#b(英文最多12字，中文最多6字)");
                                                selection = npc.askAccept("你確定使用 #b" + allianceName + "#k 做為家族聯盟的名稱嗎？");
                                                if (selection == 1) {
                                                        ctx.createAlliance(allianceName, oCharaterId, stage.getGuildId(), oGuildId);
                                                }
                                        }
                                }
                        }
                        break;
        }
}

function AllianceMenu() {
        let selection = npc.askMenu("您好！我叫#b蕾那麗#k。\r\n#b"
                + "#L0#請您告訴我家族聯盟是什麼？#l\r\n"
                + "#L3#我想增加家族聯盟的家族數量。#l\r\n"
                + "#L4#我想解散家族聯盟。#l");

        switch (selection) {
                case 0:
                        npc.next().say("多個家族結合在一起成立的組織被稱為家族聯盟。我負責管理家族聯盟的有關事務。");
                        break;
                case 3:
                        if (stage.getAllianceGrade() != 1) {
                                npc.next().say("只有家族聯盟盟主可以增加家族數量。");
                        } else {
                                if (ctx.getAllianceCapacity() >= 5) {
                                        npc.next().say("你的聯盟最大家族數已滿,最多可以容納5個家族.");
                                } else {
                                        npc.next().say("當前家族聯盟的最大家族數：#r" + ctx.getAllianceCapacity() + "#k。 再增加一個需要花費#r100萬#k楓幣。");
                                        selection = npc.askYesNo("你想使用#r100萬#k楓幣，增加家族聯盟的最大家族數嗎？");
                                        if (selection == 1) {
                                                if (!stage.hasMesos(1000000)) {
                                                        npc.next().say("你好像沒有足夠的楓幣。");
                                                } else {
                                                        ctx.incAllianceCapacity(1);
                                                        stage.loseMesos(1000000);
                                                        //npc.next().say("好了，家族聯盟容納數增加#r1#k。");
                                                        //npc.say("好了，現在家族聯盟最多可以容納" + ctx.getAllianceCapacity() + "個家族。");
                                                }
                                        } else if (selection == 0) {
                                                npc.next().say("如果你想增加家族聯盟的最大家族數，那麼再來找我。");
                                        }
                                }
                        }
                        break;
                case 4:
                        if (stage.getAllianceGrade() != 1) {
                                npc.next().say("只有家族聯盟盟主可以解散家族聯盟。");
                        } else {
                                selection = npc.askAccept("你確定要解散你的家族聯盟？");
                                if (selection == 1) {
                                        ctx.disbandAlliance();
                                        npc.next().say("家族聯盟已經解散了!");
                                } else if (selection == 0) {
                                        npc.next().say("如果你想解散家族聯盟，那麼再來找我。");
                                }
                        }
                        break;
        }
}