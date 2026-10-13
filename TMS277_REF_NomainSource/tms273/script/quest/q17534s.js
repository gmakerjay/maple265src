// Created by MetaMS
// Quest ID:17534
// [培羅德]隨時都可以挑戰！　


npc.next().say("現在給你機會挑戰強大的培羅德。");
npc.next().say("一天可以給你一個能夠入場的鑰匙。");
if (npc.askYesNo("目前持有" + stage.getItemQuantity(4033981) + "個入場鑰匙要領取1個入場鑰匙嗎？")) {
        let date = util.getStringDate("yy/MM/dd");
        /* Response is Yes */
        // Inventory Operation with 1 operations.
        let cDate = stage.getQuestData(17535)
        if (!date.equals(cDate)) {
                if (stage.gainItem(4033981, 1)) {
                        stage.startQuest(17535, date);//Quest Name:Unknown
                        npc.startQuest();
                        npc.completeQuest();
                        npc.say("請確認背包欄位");
                } else {
                        npc.say("背包欄位不足!");
                }
        }
}