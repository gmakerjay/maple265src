// Created by MetaMS
// event:marriage

// Created by MetaMS

let checkPlayer = 2;

let eventName = "event_marriage";
let event = ctx.getEvent(eventName);
if (event == null) {
        npc.say("#e#r發生錯誤，請聯系管理員！");
        if (stage.isGm()) {
                ctx.makeEvent(eventName, true, null)
                stage.showSystemMessage('加載成功')
        }
} else if (map.getId() == 680000210) {
        main();
}

function main() {
        if (!stage.getCharacterName().equals(event.getVariable("Player0")) && !stage.getCharacterName().equals(event.getVariable("Player1"))) {
                npc.say("賓客請耐心等待。");
        } else if (party == null) {
                npc.say("你的隊伍呢？");
        } else if (stage.getCharacterId() != party.getLeaderId()) {
                npc.say("請你所屬的隊伍之隊長跟我講話。");
        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                npc.say("你的伴侶呢？");
        } else if (party.getMembersCount(map.getId(), 1, 300) < checkPlayer || party.getMembersCount(map.getId(), 1, 300) > checkPlayer) {
                npc.say("隊伍中人數不對喲。");
        } else if ("2".equals(event.getVariable("STATE"))) {
                if (npc.askYesNo("是否現在進行婚禮？")) {
                        let members = party.getLocalMembers();
                        let check = true;
                        let invFull = false;
                        for (let i = 0; i < members.length; i++) {
                                let tStage = members[i];
                                if (!tStage.getCharacterName().equals(event.getVariable("Player0")) && !tStage.getCharacterName().equals(event.getVariable("Player1"))) {
                                        check = false;
                                        break;
                                }
                                if (tStage.getFreeSlot(1) <= 0) {
                                        invFull = true;
                                }
                        }
                        if (check) {
                                if (invFull) {
                                        npc.say("#e#r請檢查雙方背包裝備欄是否已滿。");
                                } else {
                                        event.startTimer("start_ceremony", 10 * 1000);
                                        event.setVariable("STATE", "3");
                                        event.startTimer("kick", 10 * 60 * 1000);
                                        map.showTimer(10 * 60);
                                        util.getMarriage(members[0], members[1], 1112300);
                                }
                        } else {
                                npc.say("#e#r發生錯誤，登記結婚人員不符！！");
                        }
                }
        }
}