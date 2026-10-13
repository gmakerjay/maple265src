// Created by MetaMS
// Boss Entry

let partyBoss = require("party_boss");

let onlyOne = false;

let minPlayers = 1;
let maxPlayers = 6;

let event = "boss_pinkbeen_";

let startMap = 270050000;

if (map.getId() == startMap) {
        if (party == null) {
                npc.createParty();
        }
        if (party == null) {
                npc.npcFlip().meFlip().say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
        } else if (stage.getCharacterId() != party.getLeaderId()) {
                npc.me().say("請讓你的組隊長和我對話吧!");
        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                npc.me().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
        } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                npc.me().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
        } else if ((name = party.checkBossEventLevel(bossType, difficulty)) != null) {
                npc.me().say("請確認你隊員" + name + "的等級範圍!");
        // } else if (!practiceMode && (name = party.checkBossEventClear(bossType, difficulty)) != null) {
        //         npc.me().say("你隊員#r#e" + name + "#n#k完成次數已經達到上限了。");
        } else if (!practiceMode && (name = party.checkBossEventEnter(bossType, difficulty)) != null) {
                npc.me().say("隊員 #e#r" + name + "#k#n 由於之前所在隊伍尚未結束挑戰，無法進入!");
        // } else if (!practiceMode && (name = party.checkBossEventDone(bossType, difficulty)) != null) {
        //         npc.me().say("隊員 #e#r" + name + "#k#n 由於之前所在隊伍已經完成Boss挑戰，已無法再次進入!");
        } else {
                let members = party.getLocalMembers();
                let aIds = members.map(m => m.getAccountId()).join(',');
                let canJoin = true;
                let str = ``;
                let bossName = `${partyBoss.Name[bossType]}[${partyBoss.difficulty[difficulty]}]`;
                // 每日檢測
                let dayCheck = partyBoss.getBossEventDay(bossName, aIds, db)
                if (dayCheck.length > 0) {
                        canJoin = false;
                        for (let i in dayCheck) {
                                str += "隊員 #e#r" + dayCheck[i].get('p_name') + "#k#n 今日無挑戰次數!\r\n"
                        } 
                }
                // 每周檢測
                let weekCheck = partyBoss.getBossEventWeek(bossName, aIds, db)
                if (canJoin && weekCheck.length > 0) {
                        canJoin = false;
                        for (let i in weekCheck) {
                                str += "隊員 #e#r" + weekCheck[i].get('p_name') + "#k#n 本周無挑戰次數!\r\n"
                        } 
                }

                if (canJoin) { 
                        if (ctx.makeEvent(event + partyBoss.difficulty[difficulty], onlyOne, [party, practiceMode, bossName]) == null) {
                                npc.me().say("#e#r發生錯誤，請聯系管理員！");
                        }
                } else { 
                        npc.me().say(str);
                }
        }
        
        
        
        
}