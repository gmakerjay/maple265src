// Created by MetaMS
// Quest ID:33565
// [烏勒斯]破王的傳言

if (!map.isTeleportLimit()) {
        npc.id(9070100).ui(1).next().say("你好啊！有聽說你非常厲害的傳聞了！");
        npc.id(9070100).ui(1).next().say("當然要介紹一下！我叫做馬瑟爾，從遙遠的聽方聽說破王的傳聞而來到此地。");
        npc.id(9070100).ui(1).next().say("如果想了解大家都懼怕的破王，就來找我吧！");
        npc.id(9070100).ui(1).next().say("如果你有對抗烏勒斯的力量，我馬瑟爾會讓你見識一下什麼叫做'真正的富翁'。");
        if (npc.id(9070100).ui(1).askYesNo("如果有興趣的話，現在就讓你搭乘專用機移動到我的所在地，來這裡好好談一談如何？")) {
                /* Response is Yes */
                npc.id(9070100).ui(1).next().say("很好！我現在就馬上派專用機過去。如果突然有什麼事的話，日後都可以經由次元之鏡來找我。");
                npc.completeQuest();
                stage.startQuest(33553, map.getId());//Quest Name:Unknown
                stage.changeMap(970072200, 0);
        } else {
                /* Response is No */
                npc.id(9070100).ui(1).next().say("你沒有信心挑戰烏勒斯嗎？知道了，如果有興趣的話再來找我說話吧！");
        }
} else {
        npc.ui(1).meFlip().next().say("#r當前無法在此處進行。");
}