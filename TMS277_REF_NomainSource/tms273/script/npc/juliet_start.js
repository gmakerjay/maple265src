// Created by MetaMS
// [茱麗葉]  |  [2112003]
// MapName:卡帕萊特祕密之室<入場地圖>

if (map.getId() == 910002000) {
        askEnter();
} else {
        askPQ();
}

function askEnter() {
        // [茱麗葉]  |  [2112003]
        // MapName:休菲凱曼的招待所
        npc.askMenu("各位勇敢的楓之谷冒險家！！ 為了瑪迦提亞城的和平，請一定要幫助我們！！\r\n#b#L0#要聽茱麗葉的故事請往 #m261000021#移動。#l");
        stage.startQuest(7846, String(map.getId()));//Quest Name:Unknown
        stage.changeMap(261000021, 3);
}

function askPQ() {
        let selection = npc.askMenu("#e<組隊任務： 羅密歐與茱麗葉>#n\r\n 瑪迦提亞城現在遭遇到了極大的危機。 各位勇敢的楓之谷冒險家們能不能幫助我們？\r\n#b#L0# 聽取茱麗葉的故事。#l\r\n#L1# 開始任務。#l\r\n#L2# 尋找一起進行的隊友。#l\r\n#L3# 想用卡帕萊特之珠製作項鍊。#l\r\n#L4# 想把兩個項鍊合成一個。#l\r\n#L5# 想知道今天的剩餘挑戰次數。#l");
        switch (selection) {
                case 0:
                        npc.next().say("我，茱麗葉與羅密歐是互相相愛的。 不過我是屬於卡帕萊特，而羅密歐是屬於蒙特鳩的關係，我倆有著無法在一起的命運啊…");
                        npc.next().say("明明剛開始的時候不是像現在這樣彼此敵對的。 所以我們想要當化解卡帕萊特跟蒙特鳩之間不愉快的橋梁。");
                        npc.next().say("雖然到現在付出了許多努力，但可惜的是現在瑪迦提亞城陷入了#b戰爭的危機#k。因為不久前#b卡帕萊特跟蒙特鳩的能源都被偷了#k的關係啊。卡帕萊特跟蒙特鳩現在就是把責任互相推給對方的狀況。");
                        npc.next().say("我透過匿名的通報得知，這是#b第3者#所做的。為了阻止瑪迦提亞城的戰爭，和羅密歐相愛，要找出#b第3者#k阻止他的陰謀才行。");
                        npc.next().say("各位勇敢的楓之谷冒險家！！ 為了瑪迦提亞城的和平，請一定要幫助我們！！\r\n - #e等級#n：70以上 #r( 推薦等級：70 ~ 99 )#k \r\n - #e限制時間#n：20分鐘\r\n - #e參加人員#n：4位\r\n - #e獲得道具#n : \r\n#i1122117:# #t1122117#\r\n(收集到#b卡帕萊特之珠#k #r2個#k 的話，可從 #b茱麗葉#k那獲得)\r\n#i1122118:# #t1122118#\r\n(#b#t1122116##k 1個， 可以跟#b#t1122117##k 1個交換)");
                        break;
                case 1:
                        npc.say("可透過隊長進行。");
                        break;
                case 2:
                        stage.openUIWithOption(7, 1);
                        stage.showSystemMessage("使用組隊視窗(快捷鍵 p) 內的 '尋找隊伍'分頁的話無論何時何地都可找到想要的隊伍.");
                        break;
                case 3:
                        npc.next().say("要做#t1122117#的話，需要 #t4001160# 2個。數量好像不夠喔？");
                        break;
                case 4:
                        npc.next().say("#t1122116#跟#t1122117#要各有一個才可以合成一個喔。");
                        break;
                case 5:
                        npc.next().say("今天剩下的挑戰次數為5次。");
                        break;
        }
}