// Created by MetaMS
// Event
// [AWAKE] 賓果

start();

function start(){
	let event = ctx.getEvent("event_bingo");
if (event == null) {
        npc.say("活動未启用！");
} else {
	if(map.getId()==922290000){
		return;
	}
        if ("1".equals(event.getVariable("Open"))) {
                if (npc.noEsc().askAccept("#e[ 百人賓果！]#n\r\n\r\n百人賓果遊戲即將開啟，要來體驗下樂趣嗎？\r\n\r\n#b（同意後將切換#r頻道#k前往等待地圖）。")) {
                        stage.updateQuestRecordEx(100642, "rMap", String(map.getId()));
                        stage.changeMap(922290000, 1);
                } else {
                        /* Response is No */
                        npc.say("嗯……好的, 你去看看其他遊戲吧。真是遺憾……");
                }
        } else {
                npc.say("活動尚未開始！");
        }
}
}