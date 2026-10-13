/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */
let party_event = require("party_event_check");
let log = require("check_log");
let minPlayers = 1;
let maxPlayers = 6;
let minLevel = 200;
let maxLevel = 300;
let maxenter = 5;
let PQLog = "dragon_rider";

execute();

function execute() {
    let sel = npc.askMenu("#e<組隊任務：御龍魔>#n\r\n\r\n年輕人，你能不能幫我做件事？麻煩你去消滅攪亂神木村平靜生活的御龍魔吧。\r\n#b#L0# 1. 我要進入天渡。（" + minLevel + "以上/2名以上）#l\r\n#L1# 2. 我要尋找一起組隊的同伴。#l\r\n#L2# 3. 我想聽介紹。#l\r\n#L3# 4. 我想知道今天的剩餘挑戰次數。#l\r\n#L4# 5. 我想學習#r[飛翔]#b技能。#l\r\n");
    switch (sel) {
        case 0:
            if (party == null) {
                npc.ui(1).npcFlip().meFlip().say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
            } else if (stage.getCharacterId() !== party.getLeaderId()) {
                npc.ui(1).me().next().say("請讓你的組隊長和我對話吧!");
            } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                npc.ui(1).me().next().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
            } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                npc.ui(1).me().next().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
            } else if (party.getMembersCount(map.getId(), minLevel, maxLevel) < minPlayers) {
                npc.ui(1).me().next().say("你隊員的等級要在" + minLevel + "~" + maxLevel + "範圍!請確認!");
            // } else if ((name = party_event.isAllMembersAllowedEvent(party, db, PQLog, maxenter)) != null) {
            //     npc.ui(2).me().next().say("你隊員#r#e" + name + "#n#k次數已經達到上限了。");
            } else {
                let membrs = party.getLocalMembers();
                for (let i in membrs) {
                    let player = membrs[i];
                    let sk = util.getNoviceSkill(1026, player.getJob());
                    if (player.getSkillLevel(sk) <= 0) {
                        npc.id(9020016).say("抱歉..你的隊員 #r" + player.getCharacterName() + "#k 玩家沒有學習 #s1026#!");
                        return;
                    }
                }
                if (ctx.makeEvent("party_dragon_rider", false, party) == null) {
                    npc.ui(1).me().next().say("#e#r發生錯誤，請聯系管理員！");
                }
            }
            break;
        case 1:
            npc.id(9020016).say("請向周圍的朋友們請求組隊。使用尋找組隊(快捷鍵O)功能，可以在任何時間任何地點尋找組隊。敬請參考。");
            break;
        case 2:
            npc.id(9020016).say("#e<組隊任務：御龍魔>#n\r\n\r\n前往#b<天空之門 >#k，搞清楚#r御龍魔#k的真實身份吧。使用#b飛翔#k技能在天空中飛翔，消滅飛龍並進行追蹤，就可以找到御龍魔。\r\n - #e等級#n：" + minLevel + "級以上 \r\n - #e規定時間#n：30分鐘\r\n - #e參加人員#n：3～6名\r\n - #e參加條件#n：學習飛翔技能");
            break;
        case 3:
            let pqtry = maxenter - log.getEventValue(stage, db, PQLog);
            npc.id(9020016).say("今天剩餘挑戰次數是#r" + pqtry + "次#k.");
            break;
        case 4:
            let skillId;
            let ret = npc.id(9020016).askYesNo("學習[飛翔]技能必須付出一定的金幣喲!大約需要:#r2000000#k,那麼你想現在就學習麼?");
            if (ret == 1) {
                let skillId = util.getNoviceSkill(1026, stage.getJob())
                if (stage.getSkillLevel(skillId) <= 0) {
                    if (stage.hasMesos(20000)) {
                        stage.loseMesos(20000);
                        stage.changeSkillLevel(skillId, 1);
                        npc.id(9020016).say("恭喜,你學習了[飛翔]技能!");
                    } else {
                        npc.id(9020016).say("您似乎沒有那麼多的金幣喲！在去努力攢錢吧！");
                    }
                } else {
                    npc.id(9020016).say("你已經獲得了[飛翔]技能了!不需要重新再學習了。");
                }
            }
            break;
        case 5:
            if (stage.getJob() === 15412) {
                stage.gainItem(2631570, 1);
                npc.say("恭喜您成功購買飛行傘。\r\n#v2631570##b飛行傘\r\n#r注：請保留好以上物品...");
            } else {
                npc.say("你的職業不是飛刃沙士、不可以學習  #d請到5轉在找我領取飛翔技能哦");
            }
            break;
    }
}
