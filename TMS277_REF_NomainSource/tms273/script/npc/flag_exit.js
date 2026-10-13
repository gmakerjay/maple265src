// Created by MetaMS
// [旗幟爭奪戰旗子]  |  [9062565]
// MapName:夜晚的雪原
let weekOfYear = util.getWeekOfYear();
let type = parseInt(Math.floor(weekOfYear % 3));

let selMap = type == 0 ? "夜晚的雪原" : type == 1 ? "夕陽的雪原" : "白晝的雪原";
if ("1".equals(stage.getQuestRecordEx(32581, "complete"))) {
        npc.id(9000233).next().say("你跑完#b" + selMap + "#k啦！看來比我想的還要厲害呢？");
        if (npc.id(9000233).askYesNo("我直接帶你離開賽道。當然，你想要的話，也可以留下來看其他正在奔跑的夥伴。顆顆顆。")) {
                /* Response is Yes */
                /* Update Quest RecordEx | Id:66713 | Name: Unknown | Data: "rMap=100000000;myCastle=24/03/21;FlagRace=1;FlagRaceStar=7;lastVisit=129788" */
                //stage.updateQuestRecordEx(66713, "rMap=100000000;myCastle=24/03/21;FlagRace=1;FlagRaceStar=7;lastVisit=129788");
                let exitMap = map.getId() == 942002500 ? 942003002 : map.getId() == 942001500 ? 942003001 : 942003000;
                stage.setActionBar(-1);
                stage.changeMap(exitMap, 0);
        }
}