var questid = 200100;
let questN = stage.getQuestRecordEx(questid, "questN"); //任务地图
if (questN == null || questN == -1) {
    npc.say("你還沒有接任務，無法使用");
} else {
    stage.changeMap(questN, 0);
    stage.loseItem(2430030, 1)
    // npc.say("已將你指引到藏寶之地");
}