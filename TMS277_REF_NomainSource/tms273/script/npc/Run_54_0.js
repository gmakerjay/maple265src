// Created by MetaMS
// [Unknown]  |  [55]
// MapName:沒落荒野都市

let weekOfYear = util.getWeekOfYear();
let type = parseInt(Math.floor(weekOfYear % 3));

let selMap = type == 0 ? "夜晚的雪原" : type == 1 ? "夕陽的雪原" : "白晝的雪原";

let selection = npc.id(9000233).askMenu("#m要遙遠的世界裡製作時，沒吸引這麼多人．．．你也想要符合我的名字的世界享受旗幟爭奪戰吧？\r\n\r\n本週賽道：#r#e" + selMap + "#n#k\r\n\r\n#b#L1#請送我到旗幟爭奪戰的等待室。#l#k\r\n#b#L2#請告訴我有關旗幟爭奪戰的事。#l#k");
if (selection == 1) {

        if (map.getId() == 942003050) {
                stage.showSystemMessage("已正在參加旗幟爭奪戰。")
        } else if (map.isTeleportLimit()) {
                stage.showSystemMessage("目前無法移動。")
        } else if (npc.id(9000233).askYesNo("現在馬上移動到#b旗幟爭奪戰等待室#k嗎？")) {
                /* Response is Yes */
                /* Update Quest RecordEx | Id:14266 | Name: Unknown | Data: "rMap=410003010" */
                stage.updateQuestRecordEx(14266, "rMap", String(map.getId()));
                stage.closeUI(1257);
                stage.changeMap(942003050, 0);
        }
} else if (selection == 2) {
        stage.runScript("expand/flag_help");
}