// Created by MetaMS
// Nihal Trade

if (npc.askYesNo("你不想再進行貿易了，要離開這裡了嗎？")) {
        npc.next().say("好的，那麼我們現在就準備離開了！");
        stage.changeMap(993000837, 0);
}