// Created by MetaMS
// Quest ID:17525
// [培羅德]擊破培羅德的右肩


npc.next().say("當破壞培羅德頭部後，他的力量會減少一半。");
npc.next().say("但這不是件簡單的事情，他的四肢都會保護頭部，要避開四肢直接破壞他的頭部很困難。");
npc.next().say("首先擊敗右肩就可以將他弱化。肩膀如果無法動作，他的防禦就會削減，體力等等的也會減半。但在攻擊頭部時，右臂還是有可能會發動攻擊。");
if (npc.askYesNo("怎麼樣，要試一次看看嗎？")) {
        /* Response is Yes */
        npc.startQuest();
        npc.next().say("首先破壞右肩，暫時性的壓制培羅德。");
} else {
        /* Response is No */
        npc.say("真可惜，當然只憑你的力量是不夠的。");
}