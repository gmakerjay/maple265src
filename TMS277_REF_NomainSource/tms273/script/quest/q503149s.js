// Created by MetaMS
// Quest ID:503149
// [楓之谷聯盟] 神秘力量的神器

npc.id(9010106).next().say("嗨，#b勇士#k！歡迎你～\r\n楓葉聯盟有幫助你順利成長嗎？");
npc.id(9010106).next().say("最近我們調查團發現了一種物質，它會散發非常有趣的力量喔！\r\n\r\n這個東西的名字就叫做#fs14##e#r聯盟神器#k#n！");
npc.id(9010106).next().say("只要帶著這種#b具有神秘力量的水晶#k，就能夠紀錄下所有冒險的痕跡喔！\r\n隨著累積的紀錄越多，#b水晶的力量#k也會變得更強大！\r\n\r\n若能夠釋放#b水晶#k的強大力量，還可以使楓葉聯盟的#b能力值#k變得更強喔！");
if (npc.id(9010106).askYesNo("好，那麼話不多說！\r\n你對#fs14##r#e聯盟神器#n#k#fs12#的力量感興趣嗎？")) {
        /* Response is Yes */
        npc.completeQuest();
        /* Update Quest RecordEx | Id:503392 | Name: Unknown | Data: "start=1" */
        stage.updateQuestRecordExShare(503392, "start", "1");
        stage.updateQuestRecordExShare(503392, "level", "1");
        stage.initMapleUnionArtifact();
        npc.id(9010106).next().say("勇士！你現在可以使用#b#e<聯盟神器>#k#n的力量了。\r\n最一開始，我們調查團會先提供你我們找到的#r3顆水晶#k。");
        npc.id(9010106).next().say("這些水晶以後將會#b紀錄#k你所有的聯盟活動歷程。\r\n\r\n你可以透過執行#b#e神器任務#n#k，獲得神器EXP和點數。這些東西不僅能幫助你同時使用更多的水晶，也可以從水晶中釋放更加強大的力量喔！");
        npc.id(9010106).next().say("只不過，水晶的力量並不是永久的，\r\n唯有#b不間斷地紀錄冒險歷程#k，才能夠持續累積水晶的神秘力量！");
        npc.id(9010106).next().say("好了，你趕快去用水晶紀錄冒險，然後用更快的速度強化#b楓葉聯盟#k吧！");
} else {
        /* Response is No */
        npc.id(9010106).say("如果你改變心意的話，隨時可以回來找我喔～");
}