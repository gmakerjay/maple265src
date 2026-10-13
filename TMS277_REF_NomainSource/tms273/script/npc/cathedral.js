// Created by MetaMS
// event:marriage

// Created by MetaMS

let checkPlayer = 2;

let eventName = "event_marriage";
let event = ctx.getEvent(eventName);
if (event == null) {
        npc.say("#e#r發生錯誤，請聯系管理員！");
} else if (map.getId() == 680000000) {
        main();
} else if (map.getId() == 680000200) {
        askStart();
}

function askStart() {
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
        } else if ("1".equals(event.getVariable("STATE"))) {
                if (npc.askYesNo("是否現在進入婚禮禮堂？")) {
                        event.startTimer("kick", 30 * 60 * 1000);
                        event.setVariable("STATE", "2");
                        map.transferTo(680000210, 0);
                }
        }
}

function main() {
        let selection = npc.askMenu("#e<結婚>#n\r\nDemo 版本.\r\n\r\n#b#L0# 我們想要結婚.#l\r\n#L1# 我想參加婚禮.#l");
        switch (selection) {
                case 0:
                        if (map.getId() == 680000000) {
                                if (party == null) {
                                        npc.say("想要結婚的話需要和對方一起組隊後才能進行。");
                                } else if (stage.getCharacterId() != party.getLeaderId()) {
                                        npc.say("請你所屬的隊伍之隊長跟我講話。");
                                } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                                        npc.say("好像有隊員在其他地方，請把隊員都召集到這裡！");
                                } else if (party.getMembersCount(map.getId(), 1, 300) < checkPlayer || party.getMembersCount(map.getId(), 1, 300) > checkPlayer) {
                                        npc.say("你需要有一個#r2#k人的隊伍.!");
                                } else if (!checkMarriage()) {
                                        npc.say("請你們雙方檢查下各自的婚姻狀況！");
                                } else if ("0".equals(event.getVariable("STATE"))) {
                                        event.setVariable("STATE", "1");
                                        let members = party.getLocalMembers();
                                        for (let i = 0; i < members.length; i++) {
                                                event.startTimer("kick", 30 * 60 * 1000);
                                                let tStage = members[i];
                                                event.setVariable("Player" + i, tStage.getCharacterName());
                                                tStage.changeMap(680000200, 0);
                                        }
                                        util.broadcastNoticeWithoutPrefix(event.getVariable("Player0") + "與" + event.getVariable("Player1") + "的婚禮即將在" + stage.getChannelId() + "頻道的結婚禮堂進行！", 0)
                                }
                        }
                        break;
                case 1:
                        let state = event.getVariable("STATE");
                        if ("0".equals(state)) {
                                npc.say("#e當前沒有正在準備的婚禮！");
                        } else if ("1".equals(state)) {
                                if (npc.askYesNo("#e當前正在進行#r" + event.getVariable("Player0") + "#k和#r" + event.getVariable("Player1") + "#k的婚禮！\r\n是否參加？")) {
                                        stage.changeMap(680000200, 0);
                                }
                        } else {
                                npc.say("#e婚禮已經在進行了，當前無法再入場！");
                        }
                        break;
        }
}


function checkMarriage() {
        let members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let tStage = members[i];
                if (tStage.isMarried()) {
                        return false;
                }
        }
        return true;
}