// Created by MetaMS
// [旗幟爭奪戰旗子]  |  [9062565]


if (npc.id(9000233).askYesNo("這麽快就要放棄了嗎？送妳到外面嗎？")) {
        /* Response is Yes */
        /* Update Quest RecordEx | Id:66713 | Name: Unknown | Data: "rMap=100000000;myCastle=24/03/21;FlagRace=1;FlagRaceStar=7;lastVisit=129788" */
        //stage.updateQuestRecordEx(66713, "rMap=100000000;myCastle=24/03/21;FlagRace=1;FlagRaceStar=7;lastVisit=129788");
        let exitMap = map.getId() == 942002500 ? 942003002 : map.getId() == 942001500 ? 942003001 : 942003000;
        stage.setActionBar(-1);
        stage.changeMap(exitMap, 0);
}
