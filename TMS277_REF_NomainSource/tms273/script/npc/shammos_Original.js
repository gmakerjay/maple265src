// Created by MetaMS
// [邪摩斯]  |  [2022003]
// MapName:休菲凱曼的招待所


let selection = npc.askMenu("#e<組隊任務：侏儒帝王的復活>#n\r\n 好，來的正好。 #b#h0##k。你是為了什麼來找我的呢？呵呵呵#b\r\n#L0# 想要阻擋侏儒帝王雷克斯的復活。#l\r\n#L2# 想要聽取說明。#l\r\n#L3# 想要獲得道具。#l\r\n#L4#想知道可挑戰的次數。#l");
switch (selection) {
        case 0:
                if (map.getId() == 211000002) {
                        npc.next().say("你. 不是隊長啊。請隊長來說話吧。 需要同伴的話在這裡找。");
                        stage.openUIWithOption(7, 1);
                        stage.showSystemMessage("使用組隊視窗(快捷鍵 p) 內的 '尋找隊伍'分頁的話無論何時何地都可找到想要的隊伍.");
                } else {
                        npc.next().say("還是在安靜的地方講話會比較好。跟我來。");
                        stage.startQuest(7847, String(map.getId()));//Quest Name:Unknown
                        stage.changeMap(211000002, 0);
                }
                break;
        case 2:
                npc.say("侏儒帝王 #r#o9300281##k的復活就快到了。 封印#r#o9300281##k的封印石力量漸漸變弱了。 只能到封印#r#o9300281##k的地方阻止他的復活… 需要的話我可以帶你到那個地方，但是你必須保護我的安全。 \r\n - #e等級#n : 170 以上#r( 推薦等級： 170 ～ 189 )#k \r\n - #e限制時間#n ： 20分鐘\r\n - #e參加人員#n ： 2~6位\r\n - #e獲得道具#n ：\r\n#i1032102:# #t1032102#\r\n#i1032103:# #t1032103#\r\n#i1032104:# #t1032104#\r\n#i1902048:# #t1902048#");
                break;
        case 3:
                let selection = npc.askMenu("你想領什麼道具?#b\r\n我想領#L0##i1032102:# #t1032102#.#l\r\n我想領#L1##i1032103:# #t1032103#.#l\r\n我想領#L2##i1032104:# #t1032104#.#l\r\n我想領#L3##i1902048:# #t1902048#.#l");
                if (selection == 0) {
                        npc.next().say("為了獲得#b#t1032102##k需要 #b#t4001530# 5個#k。請快去收集。消滅雷克斯的話就可獲得。");
                } else if (selection == 1) {
                        npc.next().say("為了獲得#b#t1032103##k需要 #b#t4001530# 5個#k。請快去收集。消滅雷克斯的話就可獲得。");
                } else if (selection == 2) {
                        npc.next().say("為了獲得#b#t1032104##k需要 #b#t4001530# 5個#k。請快去收集。消滅雷克斯的話就可獲得。");
                } else if (selection == 3) {
                        npc.next().say("為了獲得#t1902048#需要 #b#t4001530##k 60個。快去收集吧。");
                }
                break;
        case 4:
                stage.startQuest(7924, "0");//Quest Name:Unknown
                stage.startQuest(7925, util.getStringDate("yy/MM/dd"));//Quest Name:Unknown
                npc.say("今天剩餘的挑戰次數是5次。");
                break;
}