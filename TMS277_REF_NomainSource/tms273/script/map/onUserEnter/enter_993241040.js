// Created by MetaMS
// ID:[993241040]
// MapName:高山雪原入口

stage.resetForcedStat();
if (!stage.isQuestStarted(26215) && !stage.isQuestCompleted(26215)) {
        stage.startQuest(26215);//Quest Name:[史詩副本] 長久的宿敵
        npc.id(3006701).ui(1).noEsc().next().say("#face0#那傢伙…自己先走了啊。");
        npc.id(3006701).ui(1).noEsc().next().say("#face0#這應該不是天族獨自一人能做到什麼事的地方耶。");
        npc.id(3006701).ui(1).noEsc().next().say("#face0#哼，他自己在這裡死去的話，那就代表他也只有這個程度了。");
        npc.id(3006701).ui(1).noEsc().next().say("#face0#……走吧。");
        stage.startNavigation(993241040, 0, "go_to_3rdzone", 0);
}