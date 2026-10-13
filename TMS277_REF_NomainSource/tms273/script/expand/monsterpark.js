/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
let party_event = require("party_event_check");
let log = require("check_log");
let maps = [
    [952010000, 952040000, 952020000, 952030000, 953000000, 953010000, 953020000],
    [952050000, 953030000, 953060000, 953070000, 953080000, 953050000, 953090000],
    [954000000, 954010000, 954020000, 954030000, 954040000, 954050000, 954060000, 954100000, 954103000]
]
let min = [
    [35, 55, 65, 70, 75, 80, 90],
    [100, 110, 120, 130, 135, 140, 145],
    [155, 165, 170, 175, 180, 185, 195, 210, 230]
]
let max = [
    [55, 65, 75, 80, 85, 90, 100],
    [110, 120, 130, 140, 145, 150, 155],
    [165, 175, 180, 185, 190, 195, 275, 300, 300]
]
let mincount = 1;
let maxcount = 6;
let maxenter = 5;

execute();

function execute() {
    let again = gettype();
    if (again >= 3) {
        stage.dropAlertNotice("敬請期待");
        return;
    }
    let txt = "你想進入哪個地方？當前剩餘次數 " + (maxenter - log.getEventValue(stage, db, "mPark")) + "\r\n#b請選擇自己能力範圍之內的地圖#k\r\n";
    for (let i in maps[again]) {
        txt += "#L" + i + "# [ #r" + marinString(" ", 3, min[again][i].toString()) + " #k-#r " + marinString(" ", 3, max[again][i].toString()) + "#k ] #m" + maps[again][i] + "##l\r\n";
    }
    let sel = npc.meFlip().askMenu(txt);
    if (party == null || stage.getCharacterId() != party.getLeaderId()) {
        npc.meFlip().say("你需要一個#r" + mincount + " ~ " + maxcount + " 人的隊伍並且等級範圍在 " + min[again][sel] + " ~ " + max[again][sel] + " 範圍!\r\n\r\n那麼請讓你的隊長與我對話吧!");
        return;
    }
    if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
        npc.meFlip().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
        return;
    }
    if (party.getMembersCount(map.getId(), 1, 300) < mincount || party.getMembersCount(map.getId(), 1, 300) > maxcount) {
        npc.meFlip().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
        return;
    }

    if ((name = party_event.isAllMembersAllowedEvent(party, db, "mPark", maxenter)) != null) {
        npc.meFlip().say("你隊員#r#e" + name + "#n#k次數已經達到上限了。");
        return;
    }
    let members = party.getLocalMembers()
    for (let i in members) {
        log.addEventValue(members[i], db, "mPark");
    }
    if (ctx.makeEvent("mPark", false, [party, maps[again][sel], min[again][sel]]) == null) {
        npc.meFlip().say("#e#r發生錯誤，請聯系管理員！");
    }
}

function gettype() {
    switch (true) {
        case stage.getLevel() <= 115:
            return 0;
        case stage.getLevel() > 115 && stage.getLevel() < 160:
            return 1;
        case stage.getLevel() >= 160 :
            return 2;
    }
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}