let marin = [
    4001889, 20, 4001890, 1, 4310249
]

marinStart();

function marinStart() {
    var txt = "冒險家你好呀，我這裡有可能兌換你需要的硬幣哦，只要你準備" + marin[1] + "個#i" + marin[0] + "#,另外加上" + marin[3] + "個#i" + marin[2] + "#我就可以給你一個#i" + marin[4] + "#代幣，是否現在兌換呢？\r\n";
    if (npc.meFlip().askYesNo(txt) != 1) {
        return;
    }
    var txt = "#i" + marin[0] + "# 擁有 " + stage.getItemQuantity(marin[0]) + "\r\n";
    txt += "#i" + marin[2] + "# 擁有 " + stage.getItemQuantity(marin[2]) + "\r\n";
    txt += "\r\n";
    txt += "請輸入你想兌換多少個 #i" + marin[4] + "##z" + marin[4] + "#\r\n";
    num = npc.meFlip().minNum(1).maxNum(999).defNum(0).askNumber(txt);
    var judge = true;
    if (!stage.hasItem(marin[0], marin[1] * num) || !stage.hasItem(marin[2], marin[3] * num)) {
        npc.meFlip().say("抱歉..你沒有 " + marin[1] * num + " 個#i" + marin[0] + "#與 " + marin[3] * num + " 個 #i" + marin[2] + "#");
        return;
    }
    stage.gainItem(marin[4], num);
    stage.loseItem(marin[0], marin[1] * num);
    stage.loseItem(marin[2], marin[3] * num);
    npc.meFlip().say("恭喜兌換了 " + num + " 個 #i" + marin[4] + "#");
}