let event = stage.getEvent();
if (event != null) {

    switch (map.getId()) {
        case 800024004:
            //第一關
            if (event.getVariable("round1Finish") == "1") {
                npc.say("謝謝你冒險家，那麼請趕往下一關吧！")
                stage.changeMap(911000840, 0);
            } else {
                npc.say("請擊敗怪物")
            }
            break;
        case 911000840:
            //第2關
            if (event.getVariable("round2Finish") == "0") {
                npc.say("謝謝你冒險家，那麼請趕往下一關吧！\r\n#r注意：開始第三關將重新計時！\r\n如果被<天狗的影子>碰到可是會被傳送回去的話，可以趴下躲避")
                stage.changeMap(993000000, 0);
                event.setVariable("round2Finish", "1");
            } else {
                npc.say("時間不多！趕緊重新進入下一關消滅怪物！小心天狗！可以趴下躲避！")
                stage.changeMap(993000000, 0);
            }
            break;
        case 993000000:
            //第3關
            if (event.getVariable("round3Finish") == "0") {
                npc.say("趕緊消滅怪物！小心天狗！")
            } else {
                if (stage.getCharacterId() != party.getLeaderId()) {
                    npc.say("請讓隊長來選擇難度")
                } else {
                    var selected = npc.askMenu("通往最後一關的大門已經開啟，請選擇挑戰難度\r\n#L1#簡單#l\r\n#L2#中等#l\r\n#L3#困難#l")
                    event.setVariable("round4selected", selected);
                    var members = event.getVariable("members");
                    for (let dd = 0; dd < members.length; dd++) {
                        members[dd].changeMap(993000500, 0);
                    }
                }
            }
            break;
        case 993000500:
            npc.say("加油冒險家")
            break;
    }

} else {
    npc.say("你不該來這裡")
}