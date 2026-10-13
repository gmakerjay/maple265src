// Created by MetaMS
// Quest ID:504621
// [星夜馬戲團] 大師設計師升級


npc.id(9401981).ui(1).next().say("竟然累積了#b幻想硬幣#k #r4500#k個以上！真厲害！！");
npc.id(9401981).ui(1).next().say("你以大師設計者的身分，展現了優秀的一面。 ");
if (npc.id(9401981).ui(1).askAccept("我為你準備的瞭望台也完成了… 怎麼樣。要看看嗎？\r\n\r\n#b#e※接受時，移動至武陵慶典會場瞭望台，進行劇情演出。#k#n")){
/* Response is Yes */
stage.changeMap(867168016, 0);
}else{
/* Response is No */
npc.id(9401981).ui(1).next().say("如果你的意思是這樣的話，那就沒辦法了。如果改變心意的話再來找我吧！\r\n\r\n#b※ 活動期間\r\n - 2024年11月26日23時59分為止#k！");

}