// Created by MetaMS

if (npc.id(2010010).askYesNo("#r每週發送一次#k的#b公會定期支援物資#k已抵達，\r\n要立刻領取支援物資嗎？")) {
        /* Response is Yes */
        // Inventory Operation with 2 operations.
        //stage.gainItem(2002037, 1);
        /* Update Quest RecordEx | Id:101851 | Name: Unknown | Data: "date=24/09/19;gift=0" */
        //stage.updateQuestRecordEx(101851, "date=24/09/19;gift=0");
        /* Update Quest RecordEx | Id:101851 | Name: Unknown | Data: "date=24/09/19;gift=1" */
        //stage.updateQuestRecordEx(101851, "date=24/09/19;gift=1");
        npc.id(2010010).next().say("領取的物品可使用至本週三，\r\n這週也辛苦你了，下週四同樣會有支援物資抵達，那就到時候見了。");
} else {
        npc.id(2010010).next().say("你不打算現在領取嗎？那就等你需要的時候再來找我領取吧。每週可領取一次。");
}