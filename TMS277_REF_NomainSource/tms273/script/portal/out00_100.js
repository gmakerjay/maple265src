// Created by MetaMS
// ID:[811000100]
// MapName:本堂1樓
// 本堂1樓

if (npc.id(9130106).askYesNo("還沒打倒濃姬喔. 這樣也要離開比叡山正殿嗎?")) {
        /* Response is Yes */
        usr.playPortalSE();
        stage.changeMap(811000999, 1);
} else {
        /* Response is No */
        npc.id(9130103).ui(1).next().say("#face0#謝謝. 請你一定要打敗它. ");
}
