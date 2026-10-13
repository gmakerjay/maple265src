// Created by MetaMS
// [瓦蕾莉]  |  [9270314]
// MapName:主體育場

let loop = true;

while (loop) {
        let selection = npc.id(9270314).askMenu("#b#e想瞭解<維多利亞船艇競賽>#k#n嗎？\r\n\r\n#L0##b#e我要參加<維多利亞船艇競賽>#k#n。#l\r\n#L1##b#e我想瞭解<維多利亞船艇競賽>#k#n。#l\r\n#L2##b#e我想瞭解<我的完成記錄>#k#n。#l\r\n#L3##b#e我想瞭解<活動期間>#k#n。#l\r\n\r\n#L99#和瓦蕾莉對話#l\r\n#L100#沒有其他疑問了。#l");
        if (selection == 100) {
                loop = false;
        } else if (selection == 99) {
                npc.id(9270314).next().say("船身檢查完畢\r\n鎖點檢查完畢\r\n船舵檢查完畢\r\n\r\n嗯…？為什麼還有一個螺絲？");
        } else if (selection == 3) {
                npc.id(9270314).next().say("能駕駛完美船艇的最後機會！\r\n\r\n#r#e[活動期間]#n\r\n - 2025年06月10日下午11點59分為止#k");
        } else if (selection == 2) {
                npc.id(9270314).next().say("#b#e維多利亞船艇競賽#k#n記錄需要實力與技術相輔相成！\r\n\r\n#e完成時間#n：03:05.535\r\n#e最佳單圈時間#n：00:57.656\r\n#e競速點數#n：12\r\n\r\n#e第1名#n：1次\r\n#e第2名#n：0次\r\n#e第3名#n：0次\r\n#e第4名#n：1次\r\n#e第5名#n：0次\r\n#e第6名#n：0次\r\n#e第7名#n：0次\r\n#e第8名#n：2次");
        } else if (selection == 1) {
                npc.id(9270314).next().say("\r\n#b#e<維多利亞船艇競賽>#n#k是8人一起競爭的遊戲！");
                npc.id(9270314).next().say("\r\n#e[操作方法] #n\r\n\r\n我先為你說明操作鍵！\r\n\r\n#fUI/UIMiniGame.img/mapleRacing/tuto/0#");
                npc.id(9270314).next().say("\r\n#e[移動]#n\r\n\r\n按下鍵盤的#r#e上、下、左、右#k#n箭頭按鍵就能移動船艇！\r\n\r\n");
                npc.id(9270314).next().say("\r\n#e[甩尾]#n\r\n\r\n同時按下左、右方向鍵和鍵盤#r#eSHIFT#k#n鍵時，可往選擇的方向開始甩尾！\r\n\r\n在開始入彎前預先開始甩尾即可輕鬆過彎！\r\n\r\n");
                npc.id(9270314).next().say("\r\n#e[起步推進器]-使用起步推進器#n\r\n\r\n抓準起跑信號3、2、1，GO\r\n\r\n快速按下鍵盤的#r#e上箭頭#k#n按鈕，即可在規定時間內發動起步推進器，用更快的速度起跑！\r\n\r\n");
                npc.id(9270314).next().say("\r\n#e[噴射推進器]-使用噴射推進器#n\r\n\r\n抓準甩尾結束的時間點\r\n\r\n再次快速按下鍵盤的#r#e上箭頭#k#n按鍵，即可在規定時間內發動噴射推進器更快地加速！\r\n\r\n");
                npc.id(9270314).next().say("\r\n#e[推進器道具]-補充推進器量條#n\r\n\r\n使用甩尾即可聚集推進器量條！\r\n\r\n甩尾量條的橘色部分代表預計補充的量條，沒有碰撞時會變成黃色並且固定量條！\r\n但是，如果在甩尾中發生碰撞，預計補充的量條就會初始化，必須留意！\r\n\r\n");
                npc.id(9270314).next().say("\r\n#e[推進器道具]-使用推進器#n\r\n\r\n使用推進器時可用更快的速度奔馳！\r\n\r\n在持有推進器道具的狀況下按壓鍵盤#r#eCTRL#k#n鍵，即可在規定時間內發動推進器，用更快的速度奔馳！\r\n\r\n");
                npc.id(9270314).next().say("\r\n#e[點數]#n\r\n\r\n遊戲結束後可根據排名分別獲得#b競速點數#k#n和#b收藏點數#k#n作為獎勵！\r\n\r\n");
                npc.id(9270314).next().say("\r\n#e[點數]-競速點數#n\r\n\r\n累積R競速點數，就能根據分數在收藏書中獲得獎勵！\r\n啊，對了！千萬別忘記也能在成就中獲得憤怒航海的裝飾！\r\n\r\n#r(1st：7點，2nd：5點，3rd：4點，4th：3點，5th~6th：2點，7th~8th 1點)#k\r\n\r\n");
                npc.id(9270314).next().say("\r\n#e[點數]-收藏點數#n\r\n\r\n收藏點數可用來在收藏書中貼上貼紙，貼得越多就能獲得豐厚的獎勵，請努力貼上貼紙吧！\r\n\r\n#r(第1～2名：300點，第3～4名：200點，第5～8名：100點)#k\r\n\r\n");
                npc.id(9270314).next().say("那麼！有關維多利亞船艇競賽的說明到此為止！\r\n盡情狂飆吧！");
        } else if (selection == 0) {
                loop = false;
                if (npc.id(9270314).askYesNo("想參加#b#e<維多利亞船艇競賽>#k#n嗎？\r\n\r\n#e在<維多利亞船艇競賽>#n中，僅限使用和小遊戲有關的\r\n#r#e系統#n#k！\r\n\r\n套用中的#e加持效果#n\r\n#e#r可能會消失#k#n，請慎重選擇！")) {
                        stage.changeMap(993246001, 0);
                } else {
                        /* Response is No */
                        npc.id(9270314).say("別錯過能駕駛完美船艇的機會！\r\n\r\n#r#e[活動期間]#n\r\n - 2025年06月10日下午11點59分為止#k");
                }
        }
}