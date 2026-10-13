// Created by MetaMS
// ID:[951000000]
// MapName:怪物公園
// 怪物公園

let minPlayers = 1;
let maxPlayers = 6;
let minLevel = 260;
let maxLevel = 300;
let onlyOne = false;
let maxCount = 2;

if (getClearCount(stage) > 0) {
    npc.id(9071000).next().say("\r\n今天已經進行過終極怪物公園。\r\n明天再來吧！");
} else {
    if (party == null) {
        npc.createParty();
    }
    if (party == null) {
        npc.id(9071000).next().say("這裡很危險，必須組隊進入。\r\n#b(只有#r" + minPlayers + "~" + maxPlayers + "#b人以上的隊伍可以申請。)#k");
    } else if (stage.getCharacterId() != party.getLeaderId()) {
        npc.id(9071000).next().say("請讓你的組隊長和我對話吧!");
    } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
        npc.id(9071000).next().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
    } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
        npc.id(9071000).next().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
    } else if (party.getMembersCount(map.getId(), minLevel, maxLevel) < minPlayers) {
        npc.id(9071000).next().say("你隊員的等級要在" + minLevel + "~" + maxLevel + "範圍!請確認!");
    } else if ((name = getNotClearCountCharacter()) != null) {
        npc.id(9071000).next().say("你隊員#r#e" + name + "#n#k今天已經進行過終極怪物公園。");
    } else if (ctx.makeEvent("monster_park_ex", onlyOne, party) == null) {
        npc.id(9071000).next().say("#e#r發生錯誤，請聯系管理員！");
    }
}


function getClearCount(tStage) {
    let count = tStage.getIntQuestRecordExShare(502345, "count");

    let logDate = tStage.getQuestRecordExShare(502345, "date");
    let nowDate = util.getStringDate("yy/MM/dd");
    if (!logDate.equals(nowDate)) {
        count = 0;
        tStage.updateQuestRecordExShare(502345, "date", util.getStringDate("yy/MM/dd"));
        tStage.updateQuestRecordExShare(502345, "count", "0");
        tStage.updateQuestRecordExShare(502345, "tryCount", "0");
    }
    return count;
}

function getNotClearCountCharacter() {
    let members = party.getLocalMembers();
    for (let i = 0; i < members.length; i++) {
        let tStage = members[i];
        let count = getClearCount(tStage);
        if (count >= maxCount) {
            return tStage.getCharacterName();
        }
    }
    return null;
}