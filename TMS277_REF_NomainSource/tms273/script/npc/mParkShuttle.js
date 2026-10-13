// Created by MetaMS
// [怪物公園公車]  |  [9071003]
// MapName:弓箭手村

if (map.getId() == 951000000) {
        if (npc.askYesNo("您好， 我們怪物公園接送服務一直為滿足顧客而努力。您要回村莊嗎？")) {
                /* Response is Yes */
                let rMapId = 100000000;
                let rMapLog = String(stage.getQuestData(7900));
                if (rMapLog.length > 0) {
                        rMapId = parseInt(rMapLog);
                }
                stage.startQuest(7900, "");//Quest Name:Unknown
                stage.changeMap(rMapId, 0);
        } else {
                /* Response is No */
                npc.next().say("要離開怪物公園時請利用我。我會平安將你送達的。");
        }
} else {
        if (npc.id(9071003).askYesNo("親愛的客戶我愛您。要移動到總是充滿全新娛樂的休菲凱曼的怪物公園嗎？")) {
                /* Response is Yes */
                stage.startQuest(7900, String(map.getId()));//Quest Name:Unknown
                stage.changeMap(951000000, 1);
        } else {
                /* Response is No */
                npc.id(9071003).next().say("隨時都可利用喔，若改變想法請隨時再度光臨。");
        }
}