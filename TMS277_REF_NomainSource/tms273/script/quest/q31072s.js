// Created by MetaMS
// Quest ID:31072
// [克里塞]請幫忙尋找薛西斯。


npc.next().say("冒險家請聽聽我的話好嗎？");
npc.next().say("我的寵物薛西斯好像計畫些什麼。透過部下一直不斷的堆塔。");
npc.next().say("再這樣下去的話，會堆到月亮上去呢… \r\n真不知道塔上會發生什麼事情。");
npc.next().say("我們也無法坐著不管，為了爬到塔上考慮了很多方法，最後想起了#b發射繩子之後快速回收的裝置#k。\r\n但是…");
if (npc.askYesNo("繩子無法支撐我們巨人組的重量…冒險家你的身軀比較小應該可以使用這繩子裝置的. \r\n輕的冒險家可以幫我們嗎?")) {
        /* Response is Yes */
        npc.next().say("真的很感謝你。\r\n透過次元之鏡前往#b休菲凱曼的招待所#k的話，我會把你傳送到克里塞。");
        npc.startQuest();
} else {
        /* Response is No */
        npc.next().say("繩子…是我努力做的呢…");
}
