/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

execute();

function execute() {
    let txt = '時裝鐵砧\r\n\r\n';
    txt += "1.使用時裝需消耗 5000萬 楓幣\r\n";
    txt += "2.將時裝 [ 2 ]的外形應用到 [ 1 ]時裝上\r\n";
    txt += "3.只應用外形不包含任何屬性技能且 [ 2 ]時裝消失\r\n";
    txt += "4.當選擇 #r是#k 代表承擔一切後果 ( #b放置錯誤導致丟失損壞 )#k\r\n";
    txt += "5.鐵砧成功無法恢復 ! 請確認時裝擺放位置\r\n";
    if (npc.meFlip().askYesNo(txt) == 1) {
        let equip_A = stage.getItemBySlot(6, 1);
        let equip_B = stage.getItemBySlot(6, 2);
        if (equip_A == null) {
            npc.meFlip().say("抱歉 [ 1 ] 不能留空");
            return;
        }
        if (equip_B == null) {
            npc.meFlip().say("抱歉 [ 2 ] 不能留空");
            return;
        }
        stage.dropMessage(0x15, equip_B['itemId'].toString().slice(-3));
        if (equip_A['itemId'].toString().substring(0, 3) != equip_B['itemId'].toString().substring(0, 3)) {
            npc.meFlip().say("抱歉..[ 1 ] [ 2 ] 必須同類型");
            return;
        }
        txt = "時裝鐵砧\r\n\r\n";
        txt += "主　:#i" + equip_A['itemId'] + "#\r\n";
        txt += "外形:#i" + equip_B['itemId'] + "#\r\n";
        txt += "\r\n";
        txt += "確認變更嗎?\r\n";
        if (npc.meFlip().askYesNo(txt) == 1) {
            if (!stage.hasMesos(50000000)) {
                npc.meFlip().say("抱歉..你沒有 5000 萬楓幣");
                return;
            }
            stage.loseMesos(50000000);
            equip_A['skin'] = equip_B['itemId'].toString().slice(-4);
            stage.updateItemBySlot(6, 1);
            stage.removeItemBySlot(6, 2);
            npc.meFlip().say("成功了");
        }
    }
}