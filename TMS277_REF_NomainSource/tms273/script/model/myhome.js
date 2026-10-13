let myhome = exports;
myhome.askEnter = function (npc, stage) {
        let sel = npc.meFlip().askMenu("#b要去哪裡呢？\r\n#L0#前往我的小屋#l\r\n#L9#離開我的小屋#l");
        if (sel == 0) {
                stage.enterMyHome();
        } else if (sel == 9) {
                let rMap = stage.getIntQuestRecordEx(64590, "rMap")
                stage.changeMap(rMap, 0);
        }
}

myhome.askExit = function (npc, stage) {
        let str = "要去哪裡呢？\r\n";
        if (stage.isQuestStarted(64595)) {
                str += "#L2#移動至廣場#l\r\n";
        } else {
                str += "#L1#移動至廣場#l\r\n";
        }
        str += "#L9#離開我的小屋#l";
        let sel = npc.meFlip().askMenu(str);
        if (sel == 1) {
                stage.changeMap(871000000, 3);
        } else if (sel == 2) {
                stage.changeMap(871000012, 0);
        } else if (sel == 9) {
                let rMap = stage.getIntQuestRecordEx(64590, "rMap")
                stage.changeMap(rMap, 0);
        }
}