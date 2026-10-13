// Created by MetaMS
// [艾普莉莎]  |  [9062872]
// MapName:夢想聚集的地方

let players = 4;
let onlyOne = false;

// let selection = npc.id(9062891).askMenu("歡迎你來參加#b#e<Maple19冒險>，#k#n#e請選擇#k#n:\r\n\r\n#L2##b#e<復古炎魔祭壇>#n組隊進行(1～4人挑戰)#k#l\r\n\r\n#L99#現在不想參加。#l");
let selection = npc.id(9062891).askMenu("歡迎你來參加#b#e<Maple19冒險>，#k#n#e請選擇#k#n:\r\n\r\n#L1##b#e<復古地下城>#n組隊進行(1～4人挑戰)#k#l\r\n#L2##b#e<復古炎魔祭壇>#n組隊進行(1～4人挑戰)#k#l\r\n\r\n#L99#現在不想參加。#l");
if (selection != 99) {
        let event = selection == 1 ? "event_blast_dungeon" : "event_blast_frozen";
        let eventName = selection == 1 ? "復古地下城" : "復古炎魔祭壇";
        if (npc.id(9062872).askYesNo("要參加#b#e<Maple19冒險>" + eventName + "#k#n嗎？\r\n\r\n在#eMaple19冒險#n中，只能使用與戰鬥有關的\r\n#r#e限制系統#n#k。\r\n\r\n套用在勇士身上的#e加持效果#n\r\n#e#r可能會消失#k#n，請慎重選擇！")) {
                if (party == null) {
                        if (npc.id(9062891).askYesNo("#b#e必須組成1～4人的隊伍才能組隊進行#n#k！\r\n要我幫你建立隊伍嗎？\r\n#b(同意時將建立隊伍。)")) {
                                npc.createParty();
                        }
                }
                if (party == null) {
                        npc.id(9062891).say("#b#e必須組成1～4人隊伍才能進行團隊遊戲#n#k！\r\n\r\n若是想要挑戰#e個人配對#n，請選擇#r#e快速開始#n#k。");
                } else if (stage.getCharacterId() != party.getLeaderId()) {
                        npc.me().say("請讓你的組隊長和我對話吧!");
                } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                        npc.me().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
                } else if (party.getMembersCount(map.getId(), 1, 300) > players) {
                        npc.me().say("你需要有一個#r" + players + "#k人的隊伍.!");
                } else if (npc.id(9062891).askYesNo("\r\n要立刻參加#b#e<" + eventName + ">#k#n嗎？\r\n\r\n#r※建議在#e1024*768#n以上的解析度進行遊戲。")) {
                        if (ctx.makeEvent(event, onlyOne, party) == null) {
                                npc.me().say("#e#r發生錯誤，請聯系管理員！");
                        }
                }
        } else {
                /* Response is No */
                npc.id(9062872).say("一定要記得陪我玩喔！一言為定！一定要！");
        }
}