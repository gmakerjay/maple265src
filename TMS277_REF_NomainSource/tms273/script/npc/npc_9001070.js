// // Created by MetaMS
// // Nihal Trade

// Created by MetaMS
// [蕭公]  |  [2091011]
// MapName:武陵道場入口



function start() {
        let str = "我們的師傅在武陵內是最強的人。你想要挑戰他？之後可不要後悔。\r\n"
        str += "#b#L0# 開始跑商。#l\r\n\r\n"
        str += "#L1# 跑商商店。#l\r\n"
         
        let selection = npc.askMenu(str);
        switch (selection) {
                case 0:
                        stage.runScript('expand/menu/跑商/跑商入口');
                        break;
                case 1:
                        stage.runScript('expand/menu/跑商/跑商商店');
                        break;
        }

}
 start();