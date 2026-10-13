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

let selection = npc.askMenu("#e<組隊任務：逃脫>#n\r\n 其實...雖然很想現在就拔腿逃跑...但我無法拒絕他的請求,我正在找能夠救出被關在這城裡空中監獄內的人.\r\n\r\n#b#L0# 我去救關在城裡的冒險家.#l\r\n#L1# 請告訴我關於監獄的事情.#l\r\n#L2# #t4001534#詳細的狀況.#l\r\n#L3# #b想知道今天剩下的挑戰次數.#l");
switch (selection) {
        case 0:
                if (map.getId() == 921160000) {
                        if (party == null) {
                                if (npc.askYesNo("組隊任務可以組隊參加。請與其他人一起組隊挑戰吧。 若要尋找隊員你可以利用尋找隊伍留言板？")) {
                                        /* Response is Yes */
                                        stage.openUIWithOption(7, 1);
                                        stage.showSystemMessage("使用組隊視窗(快捷鍵 p) 內的 '尋找隊伍'分頁的話無論何時何地都可找到想要的隊伍.");
                                }
                        } else if (stage.getCharacterId() != party.getLeaderId()) {
                                npc.say("這裡非常危險，充滿了可怕的傢伙，自己一個人可能沒辦法吧…想進去的話請你所屬的隊伍之隊長跟我講話。");
                        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                                npc.say("好像有隊員在其他地方，請把隊員都召集到這裡！");
                        } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                                npc.say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
                        } else if (party.getMembersCount(map.getId(), minLevel, maxLevel) < minPlayers) {
                                npc.say("你隊員的等級要在" + minLevel + "~" + maxLevel + "範圍!請確認!");
                        } else if ((name = partyCheck.getNotPQLogCharacter(party, util, logQuestId, 1, maxEnter)) != null) {
                                npc.say("你隊員#r#e" + name + "#n#k完成次數已經達到上限了。");
                        } else if (ctx.makeEvent(event, onlyOne, party) == null) {
                                npc.say("#e#r發生錯誤，請聯系管理員！");
                        }
                } else {
                        npc.next().say("你比看起來還要勇敢。我會告訴你空中監獄在哪，跟我來吧。");
                        stage.startQuest(7890, String(map.getId()));//Quest Name:Unknown
                        stage.changeMap(921160000, 0);
                }
                break;
        case 1:
                npc.next().say("在這座城中有個祕密塔.有許多人被關在塔中的空中監獄裡.得把他們救出來啊... \r\n - #e等級#n : 140以上#r( 推薦等級 : 140 ~ 159 )#k \r\n - #e限制時間#n : 20分\r\n - #e參加人員#n : 3~6名\r\n - #e獲得道具#n :\r\n#i1132094:# #t1132094#\r\n#i1132095:# #t1132095#\r\n#i1132096:# #t1132096#\r\n#i1132097:# #t1132097#\r\n#i1132098:# #t1132098#");
                npc.next().say("如果進去監獄話一定要知道這個. \r\n1. 要躲過障礙離開城塔. \r\n2. 要清除地圖裡的所有警備員. \r\n3. 要脫離阻擋接近監獄的迷宮.\r\n4. 守護門的警備員全部都要擊敗..\r\n5. 要通過前往空中間監獄的最後障礙物.\r\n6. 擊敗警備兵,,找到監獄鑰匙後打開監獄門.\r\n7. 打倒教官亞尼並重新還給被囚禁的人們自由.");
                break;
        case 2:
                npc.next().say("#r#t4001534##k是隱藏之塔的教官所拿著的鑰匙。  收集#b5個#k左右的話，我會給你小禮物。收集了5個，對被關在城裡受盡委屈的人們有著很大的幫助。\r\n#i1132094:# #b#t1132094#, \r\n#i1132095:# #b#t1132095#,\r\n#i1132096:# #b#t1132096#, \r\n#i1132097:# #b#t1132097#, \r\n#i1132098:# #b#t1132098##k");
                break;
        case 3:
                stage.startQuest(7928, "0");//Quest Name:Unknown
                stage.startQuest(7929, util.getStringDate("yy/MM/dd"));//Quest Name:Unknown
                npc.say("今天剩餘的挑戰次數是#r" + (maxEnter - eLog.getPQLog(stage, util, logQuestId, 1)) + "次#k。");
                break;
}