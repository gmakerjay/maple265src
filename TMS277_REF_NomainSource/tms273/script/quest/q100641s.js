// Created by Jackson
// Quest ID:100642
// [AWAKE] 剪刀石頭布

if (npc.meFlip().askAccept("#e[ 剪刀石頭布！]#n\r\n\r\n百人剪刀石頭布遊戲即將開啟，要來體驗下樂趣嗎？\r\n\r\n#b（同意後將切換#r頻道#k前往等待地圖）。")) {
    stage.updateQuestRecordEx(100641, "rMap", String(map.getId()));
    if (stage.getChannelId() == 5) {
        stage.changeMap(993030000, 0);
    } else {
        stage.changeChannel(5);
    }
} else {
    /* Response is No */
    npc.meFlip().say("嗯……好的, 你去看看其他遊戲吧。真是遺憾……");
}