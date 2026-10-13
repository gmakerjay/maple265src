// Created by MetaMS
// ID:[951000300]
// MapName:未知的區域
// 未知的區域


if (npc.id(9071000).askYesNo("要放棄調查未知區域嗎？")) {
        /* Response is Yes */
        npc.id(9071000).next().say("你缺乏毅力喔。如果你要走，我不會攔你。慢走。");
        usr.playPortalSE();
        stage.changeMap(951000400, 0);
}