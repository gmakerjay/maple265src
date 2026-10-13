start();

function start() {
    let membrs = party.getLocalMembers();
    let txt = "請選擇你想調整的玩家背包 ( 需放置 [ 1 ] 位置 )\r\n";
    txt += "#L1#裝備欄#l\t#L2#消耗欄#l\t#L6#時裝欄#l\r\n";
    let sel = npc.meFlip().askMenu(txt);
    txt = "\r\n";
    for (let i in membrs) {
        if (membrs[i].getCharacterId() === stage.getCharacterId()) continue;
        let equip = membrs[i].getItemBySlot(sel, 1);
        if (equip == null) {
            npc.meFlip().say("抱歉..對方背包內沒有任何物品");
            return;
        }
        txt += "該玩家的物品唯一only:#r" + equip.getId() + "\r\n";
        txt += "#k已自動輸入到下列 請自行複製\r\n\r\n ";
        npc.meFlip().minLen(1).maxLen(30).defText(equip.getId()).askText(txt);
    }
}