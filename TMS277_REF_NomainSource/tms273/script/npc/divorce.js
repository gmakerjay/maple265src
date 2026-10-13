// Created by MetaMS
// event:marriage

// Created by MetaMS

let checkPlayer = 2;

let selection = npc.askMenu("#e<離婚>#n\r\nDemo 版本.\r\n\r\n#b#L0# 我們想要離婚。.#l\r\n#L1# 我就過來看看.#l");
switch (selection) {
        case 0:
                if (map.getId() == 680000000) {
                        if (party == null) {
                                npc.say("想要離婚的話需要和對方一起組隊後才能進行。");
                        } else if (stage.getCharacterId() != party.getLeaderId()) {
                                npc.say("請你所屬的隊伍之隊長跟我講話。");
                        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                                npc.say("好像有隊員在其他地方，請把隊員都召集到這裡！");
                        } else if (party.getMembersCount(map.getId(), 1, 300) < checkPlayer || party.getMembersCount(map.getId(), 1, 300) > checkPlayer) {
                                npc.say("你需要有一個#r2#k人的隊伍.!");
                        } else if (!checkMarriage()) {
                                npc.say("請你們雙方檢查下各自的婚姻狀況！");
                        } else if (!isCouple()) {
                                npc.say("你們兩個沒有結婚。");
                        } else if (npc.askYesNo("你們雙方是否要離婚？")) {
                                npc.next().say("考慮清楚了嗎？那現在將為你們辦理手續。")
                                util.divorce(stage.getMarriedId());
                        }
                }
                break;
}


function checkMarriage() {
        let members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let tStage = members[i];
                if (!tStage.isMarried()) {
                        return false;
                }
        }
        return true;
}

function isCouple() {
        let checkId = -1;
        let members = party.getLocalMembers();
        if (members[0].getMarriedId() != members[1].getMarriedId()) {
                return false;
        }
        return true;
}

