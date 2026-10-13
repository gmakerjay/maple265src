// Created by MetaMS
// Quest ID:26217
// [史詩副本] 高山

if (map.getId() == 410000500) {
        npc.id(3006700).ui(1).next().say("#face0#那邊那位，可以過來一下嗎？");
        npc.id(3006700).ui(1).next().say("#face0#對！就是在說那邊那個最帥氣的敵對者，\r\n我就是為了你遠道而來賽爾尼溫！");
        npc.id(3006700).ui(1).next().say("#face0#啊，是說我嗎？");
        npc.id(3006700).ui(1).next().say("#face0#說到我的話，就是在格蘭蒂斯流浪的天才，\r\n抒情歌之神、歌唱世界真實的吟遊詩人。");
        npc.id(3006700).ui(1).next().say("#face0#我叫塞拉札爾！");
        npc.id(3006700).ui(1).next().say("#face0#…………");
        npc.id(3006700).ui(1).next().say("#face0#不是、不是，我不是雜貨商人啦，不要走，聽我說一下。");
        npc.id(3006700).ui(1).next().say("#face0#其實我有個非常特殊的能力。");
        npc.id(3006700).ui(1).next().say("#face0#就是你所好奇的某人的命運。\r\n我可以歌唱出尚未到來的未來以及目前正在某處發生的現在！");
        npc.id(3006700).ui(1).next().say("#face0#…………");
        npc.id(3006700).ui(1).next().say("#face0#我絕對不是因為沒有人聽我新出的抒情歌才這樣的。");
        npc.id(3006700).ui(1).next().say("#face0#那麼，準備好的話再跟我對話吧！");
        npc.startQuest();
        stage.startNavigation(410000500, 1, "3006700", 0);
} else {
        npc.id(3006700).ui(1).next().say("#face0#你好！在格蘭蒂斯流浪的天才，\r\n抒情歌之神、歌唱世界真實的吟遊詩人，");
        npc.id(3006700).ui(1).next().say("#face0#我叫塞拉札爾！");
        npc.id(3006700).ui(1).next().say("#face0#我有為你準備一首新的抒情歌，怎麼樣？");
        npc.id(3006700).ui(1).next().say("#face0#到賽爾尼溫來的話，要不要來找我？");
        npc.id(3006700).ui(1).next().say("#face0#約定好了，你不會失望的。");
        if (npc.id(3006700).ui(1).noEsc().askAccept("接受後我會馬上讓你移動到賽爾尼溫！")) {
                /* Response is Yes */
                npc.startQuest();
                stage.changeMap(410000500, 1);
        } else {
                /* Response is No */
                npc.id(3006700).ui(1).next().say("#face0#如果你改變心意的話，隨時可以回來找我對話。");
        }
}