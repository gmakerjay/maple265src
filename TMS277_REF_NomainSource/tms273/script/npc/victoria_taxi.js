// Created by MetaMS
// [維多利亞計程車]  |  [1012000]
// MapName:弓箭手村


let taxiMaps = [100000000, 101000000, 102000000, 103000000, 104000000, 105000000, 120000100];
let prompt = "請選擇目的地.\r\n#b";
for (let i = 0; i < taxiMaps.length; i++) {
        if (taxiMaps[i] != map.getId()) {
                prompt += "\r\n#L" + i + "##m" + taxiMaps[i] + "##l";
        }
}
npc.id(1012000).next().say("您好~! #p1012000#. 想要往其他村莊安全又快速的移動嗎? 如果是這樣, 為了優先考量滿足顧客, 請使用 #b#p1012000##k. 特別免費! 親切的送你到想要到達的地方.");
let mapIndex = npc.id(1012000).askMenu(prompt);
if (npc.id(1012000).askYesNo("這裡看起來感覺沒有什麼事好做了。真的要移動到 #b#m" + taxiMaps[mapIndex] + "##k 村莊嗎？")) {
        stage.changeMap(taxiMaps[mapIndex], 0);
} else {
        /* Response is No */
        npc.id(1012000).next().say("要是想要移動至其他村莊的話，隨時歡迎使用計程車~");
}