// Created by MetaMS
// Quest ID:66661
// [公會城] 另一能量礦石的行蹤

npc.id(9401592).ui(1).next().say("#face0#你好，#h0#。初次正式向您問侯。");
npc.id(9401592).ui(1).next().say("#face0#我的名字是潘奈迪特，身為公會城的總管理者，請到了#h0#以及 #fc0xFF42ff00#<膩在一起 公會城>#k#n公會城的主人們。");
if (npc.id(9401592).ui(1).askAccept("#face0#是這樣子的，我想跟你商量一下關於能量礦石的事。\r\n如果有空的話，可以來主臥房一下嗎？\r\n\r\n#b※接受時移動。 任務完成時，可以進行公會城每週任務。")) {
        /* Response is Yes */
        stage.changeMap(870001016, 0);
} else {
        /* Response is No */
        npc.id(9401592).ui(1).noEsc().next().say("#face1#看來你很忙啊。我隨時等你，所以有時間的時候請來找我。");
}