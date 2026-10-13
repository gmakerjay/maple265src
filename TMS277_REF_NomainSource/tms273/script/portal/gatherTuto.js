// Created by MetaMS


let selMenu = [Array("初級採集農場", 910001100, "(銀色藥草堆、紫色藥草堆、銀色礦脈、紫色礦脈)"),
        Array("中級採集農場", 910001150, "(淡藍色藥草堆、褐色藥草堆、淡藍色礦脈、褐色礦脈)"),
        Array("高階採集農場", 910001200, "(翠綠色藥草堆、金光藥草堆、翠綠色礦脈、金光礦脈)"),
        Array("專家採集農場", 910001250, "(海藍色藥草堆、紅色藥草堆、黑色藥草堆、淡紫色藥草堆、海藍色礦脈、紅色礦脈、黑色礦脈、淡紫色礦脈)")];
let flag = false;
if (stage.getMakingSkillLevel(92000000) > 0 || stage.getMakingSkillLevel(92010000) > 0) {
        let menu = "你想去哪裡? \r\n\r\n";
        for (var i = 0; i < selMenu.length; i++) {
                menu += "#b#L" + i + "#" + selMenu[i][0] + "#k" + selMenu[i][2] + "#l\r\n";
        }
        let sel = npc.id(9031000).askMenu(menu);
        stage.changeMap(selMenu[sel][1], 0);
} else {
        npc.id(9031000).next().say("只有學習採礦或藥草採集的人才可以使用哦。");
}

function chatEnd() {
        stage.exclRequest();
}