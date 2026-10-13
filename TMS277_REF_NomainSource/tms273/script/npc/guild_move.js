// Created by MetaMS
// [蕾雅]  |  [2010011]
// MapName:射手村


if (npc.id(2010011).askYesNo("你好，我是負責支援家族工作的蕾雅，\r\n為了方便工作，我正在幫助大家前往家族中心<英雄公館>，\r\n你現在就要前往家族中心<英雄公館>#k嗎？")) {
        /* Response is Yes */
        npc.id(2010011).next().say("好，那我現在就讓你過去。");
        stage.startQuest(26010, map.getId());//Quest Name:Unknown
        stage.changeMap(200000301, 2);
}