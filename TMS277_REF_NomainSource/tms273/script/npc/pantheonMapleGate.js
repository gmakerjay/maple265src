// Created by MetaMS
// [次元傳送門]  |  [3000012]
// MapName:大神殿內部

if (stage.isQuestStarted(38030)) {
        if (npc.askYesNo("透過次元傳送門可移動至楓之谷世界嗎?")) {
                /* Response is Yes */
                stage.startQuest(38030, "clear");//Quest Name:回歸
                stage.changeMap(100000000, 24);
        }
} else if (stage.isQuestStarted(34823)) {
        if (npc.askYesNo("要透過次元之門移動到楓之谷世界嗎?")) {
                /* Response is Yes */
                stage.changeMap(104020000, 2);
        }
} else {
        let slideMenu = require("slide_menu");
        slideMenu.askDefault(npc, stage, map);
}