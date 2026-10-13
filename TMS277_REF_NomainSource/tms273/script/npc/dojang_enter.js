// Created by MetaMS
// [蕭公]  |  [2091011]
// MapName:武陵道場入口

let partyCheck = require("party_check");
let eLog = require("extend_log");

if (map.getId() == 925020001) {
        dojangAccept();
} else if (map.getId() == 925070000) {
        if (npc.askYesNo("都還沒入場就氣餒了？\r\n哈哈，力量消失而感到害怕了吧？")) {
                stage.changeMap(925020002, 0);
        } else {
                /* Response is No */
                npc.next().say("搞什麼，一下這樣一下那樣的！但是，待不了多久就會邊哭邊吵著要回去了吧？");
        }
} else {
        if (npc.askYesNo("哼！搞什麼，這麼快就放棄了？所以不是叫他不要逞強了嘛，真的放棄出去了啊？")) {
                stage.changeMap(925020002, 0);
        } else {
                npc.next().say("搞什麼，一下這樣一下那樣的！但是，待不了多久就會邊哭邊吵著要回去了吧？");
        }
}

function dojangAccept() {
        stage.startQuest(3846, util.getStringDate("yy/MM/dd"));
        stage.startQuest(7279, "0");
        let sel = npc.askMenu("找我有什麼事呢？\r\n#b#L0#我想使用武陵道場。#l\r\n#L1#我想使用迷霧森林修練場。#l\r\n");
        if (sel == 0) {
                askDojang();
        } else if (sel == 1) {
                askMistForest();
        }
}

function askMistForest() {
        let minLevel = 200;
        let logQuestId = 100936;
        let maxEnter = stage.isGm() ? 99 : 5;
        let selection = npc.askMenu("武陵深處有我們仙人的專屬秘密修練場。\r\n\r\n (本日剩餘入場次數：#r#e" + (maxEnter - eLog.getPQLog(stage, util, logQuestId, 1)) + "次#k#n)\r\n#b#L0#我想進入迷霧森林修練場。#l\r\n#L1#我想知道關於迷霧森林修練場的資訊。#l\r\n");
        if (selection == 0) {
                if (party == null) {
                        if (npc.askYesNo("迷霧森林修練場僅限在組隊狀態下進入，\r\n需要我幫你創建隊伍嗎？\r\n#b(點擊同意時將創建隊伍。)")) {
                                npc.createParty();
                        } else {
                                npc.say("嗯…既然如此，那你就先自行創建隊伍後再來找我吧。");
                        }
                }
                if (party != null) {
                        if (party.getMembersCount(map.getId(), minLevel, 300) < party.getMembersCount()) {
                                npc.say("你隊員的等級要在" + minLevel + "以上!請確認!");
                        } else if ((name = partyCheck.getNotPQLogCharacter(party, util, logQuestId, 1, maxEnter)) != null) {
                                npc.say("你隊員#r#e" + name + "#n#k進入次數已經達到上限了。");
                        } else if (ctx.makeEvent("forest_training", false, party) == null) {
                                npc.next().say("#e#r發生錯誤，請聯系管理員！");
                        }
                }
        } else if (selection == 1) {
                npc.id(2091011).next().say("\r\n#b#e<迷霧森林修練場>#n#k是給想要超越自身極限的\r\n#b仙人們所設置得專屬秘密修練場#k。\r\n\r\n那是我們仙人使用的秘密空間，#r#e我會特別#k#n公開，\r\n好好感激我吧。");
                npc.id(2091011).next().say("\r\n#b#e在<迷霧森林修練場>#n#k中可創造想要的戰鬥狀況。\r\n調整體力、防禦率等#b能力值#k就能召喚#b仙人岩石怪物#k\r\n。\r\n\r\n變更戰場的#b力量種類#k，也能變更為想要的#b力量數值#k\r\n。");
                npc.id(2091011).next().say("\r\n不過，怪物的設定與戰地設定權限掌握在#r#e隊長手上#k#n。");
                npc.id(2091011).next().say("\r\n所有隊員想要時可讓#bHP與MP全都恢復為最大值 \r\n1次#k。\r\n\r\n #b#e因為是迷霧森林修練場#n#k，所以才有可能嗎？");
                npc.id(2091011).next().say("\r\n不過，因為它是特殊空間，所以無法讓任何人隨便進入。\r\n#r#e200 必須達成等級#k#n與#r#e武陵 30樓層#k#n才能入場。");
                npc.id(2091011).next().say("\r\n修練場只能以#r#e組隊狀態#k#n入場，\r\n而且只能使用#r#e60分鐘#k#n，要多加注意這一點。");
        }
}

function askDojang() {
        let logQuestId = 7216;
        let maxEnter = stage.isGm() ? 99 : 1;
        let enterCount = eLog.getEventLog(stage, util, logQuestId, 1);
        let selection = npc.askMenu("我們的師傅在武陵內是最強的人。你想要挑戰他？之後可不要後悔。\r\n#b#L0# 要挑戰武陵道場。#l\r\n#L1# 武陵道場是什麼？#l\r\n#L2# 想要確認武陵道場內可獲得的獎勵。#l\r\n#L3# 想要確認今天剩餘的挑戰次數。#l\r\n#L4# 想要進入武陵身心修練館。#l\r\n#L5# 想要領取武陵道場清算點數。#l\r\n#L6# 想要領取武陵道場排名獎勵。#l\r\n");
        if (selection == 0) {
                if (enterCount >= maxEnter) {
                        npc.say("進入次數已經達到上限了");
                } else {
                        if (party != null && npc.askYesNo("你現在在隊伍當中嗎？武陵道場無法在組隊狀態下入場！要我幫你解除隊伍嗎？\r\n#b(點擊同意時將解除隊伍。)#k")) {
                                npc.disbandParty();
                        }
                        if (party != null) {
                                npc.say("無法以隊伍進場！自己來挑戰啦！難不成是膽小鬼嗎？");
                        }
                        if (npc.askAccept("進入武陵道場的同時，目前所套用的\r\n#fs16##b#e所有Buff效果解除，且靈魂球將初始化#k#fs12##n。\r\n\r\n即使如此你還是真的想要挑戰嗎？")) {
                                if (ctx.makeEvent("dojang_event", false, stage) == null) {
                                        npc.next().say("#e#r發生錯誤，請聯系管理員！");
                                }
                        } else {
                                npc.say("還真是優柔寡斷呢。\r\n這裡不是那麼好對付的地方。慎重考慮後再入場！");
                        }
                }
        } else if (selection == 1) {
                npc.next().say("我們的師傅是武陵裡最強的人。\r\n師父所建立的地方就是這個#b武陵道場#k。");
                npc.next().say("武陵道場#b#e共有100樓#n#k。\r\n越強的人當然能爬到更高的樓層。\r\n不過以你的實力應該很難爬到最頂端吧。");
                npc.next().say("各樓層都有#r各區的各種怪物#k看守。我也不知道詳細情況，\r\n只有師父才知道。");
                npc.next().say("入場後在初始樓層內，你身上持有的#r所有加持效果會解除#k。全憑自己的力量來競爭才公平不是嗎？");
                npc.next().say("停在出入樓層是你的自由，\r\n但是#r計時只停120秒#k，如果想創下更好的紀錄，建議你趕緊準備進入1樓。");
                npc.next().say("#e1～9樓#n，#e11～19樓#n會出現#b一個BOSS#k。\r\n要通過到下一層樓的話，只要擊倒BOSS就可以了。");
                npc.next().say("#e21～29樓#n會出現#b１個BOSS#k與#b屬下５名#k。\r\n需要擊倒BOSS與屬下才能通過到下一層樓。");
                npc.next().say("#e31～39樓#n需要對付#b２個以上的BOSS#k。\r\n不會已經開始害怕發抖了吧？呵呵呵…");
                npc.next().say("#e41樓#n開始又變回只會出現#b１個BOSS#k，不用太過擔心。\r\n但究竟哪個比較容易還不好說呢。呵呵呵呵…");
                npc.next().say("另外途中會有#b菁英BOSS#k出現。\r\n在這裡每#r15秒#k可使用一次藥水。");
                npc.next().say("#e41樓之後#n開始也能每#r15秒#k使用藥水。你問為什麼？你自己親自進去看看就知道了。呵呵呵…");
                npc.next().say("你問每個樓層都有誰？那個你自己親自上去確認吧。\r\n你越強，就能知道越多不是嗎？呵呵呵…");
                npc.next().say("對了，武陵道場內部因為師父設下的結界，在\r\n楓之谷內可以發揮的力量，在這裡只能使用#b10分之1#k。\r\n進去之後不要過於慌張了。");
                npc.next().say("聽懂了的話就快點進去吧。\r\n很想大顯身手對吧？");
        } else if (selection == 2) {
                let txSel = npc.askMenu("武陵道場內可以獲得的獎勵有兩種。\r\n成為各個領域的#r前端排名者#k來獲得獎勵，\r\n或勤奮參加武陵道場，透過獲得的#r點數#k來交換物品。\r\n#b\r\n#L0#詢問排名者獎勵。#l\r\n#L1#詢問參與獎勵(點數)。#l");
                switch (txSel) {
                        case 0:
                                npc.next().say("師傅會每週賜予#b前端排名者#k獎勵。\r\n強大的力量就是我們武陵道場的最高價值，當然得給予相應的獎勵不是嗎？");
                                npc.next().say("為了更公平公正的競爭，根據等級，排名區間也會有所不同。\r\n好好確認你屬於哪個區間吧。\r\n\r\n#e- #b入門#k : 105 ~ 200級\r\n- #r達人#k : 201級以上#n");
                                npc.next().say("雖然是很理所當然的事情，但根據排名區間的不同，獎勵也會不同。\r\n#b所有獎勵會以你目前所屬的排名區間為主來配發#k給你。\r\n你應該不會因為過去在排名者區間為前端排名者，任性來找我討獎勵吧？");
                                npc.next().say("獎勵品項的詳細內容可以透過\r\n#r武陵道場順位表的協助按鍵#k確認。");
                                break;
                        case 1 :
                                npc.next().say("根據你的武陵道場參與度，會配發相應的點數給你。\r\n會用以下兩種基準來配發點數。\r\n\r\n- 每次挑戰時對比#b突破樓層數量#k，依比例配發點數\r\n- 依照自己所屬排名區間的#b上週整體排名百分比#k來配發獎勵\r\n\r\n");
                                npc.next().say("依據樓層數為比例配發的點數來說，會以每1樓基本配發10點，每10樓額外配發100點的方式進行。");
                                npc.next().say("根據排名百分比配發的點數為了讓越往所屬在更強大的人的排名區間，還有達到更好成果，會大方配發的。");
                                npc.next().say("根據排名百分比的點數會依據各個排名區間配發\r\n#b一定百分比內#k的點數，\r\n想要獲得點數的話，就變得更強大吧。呵呵呵..\r\n\r\n#e- #b入門#k : 前50%\r\n- #r達人#k : 前70%#n");
                                npc.next().say("啊，另外點數最多只能持有#b50萬點#k，無法超過。記得養成定期使用的習慣。");
                                break;
                }
        } else if (selection == 3) {
                npc.next().say("今天能參加武陵道場 " + (maxEnter - enterCount) + "次。請牢記。");
        } else if (selection == 4) {
                if (npc.askYesNo("武陵身心修練館已經決定也開放一般人進場了。\r\n但是，只有實力堅強又誠實的人才能進去。把拉歐大叔給你的護身符帶過來，依照護身符內的時間就能知道你進去待多久。\r\n\r\n要進場嗎？\r\n#b(身心修練館能在入場時依照角色的等級自動習得經驗值。")) {
                        /* Response is Yes */
                        if (stage.hasItem(4001851, 1)
                                || stage.hasItem(4001852, 1)
                                || stage.hasItem(4001853, 1)
                                || stage.hasItem(4001854, 1)
                                || stage.hasItem(4001862, 1)
                                || stage.hasItem(4001881, 1)
                                || stage.hasItem(4001882, 1)) {

                        } else {
                                npc.say("必須要有身心修練館入場用的護身符才能進入修練館，去跟我旁邊的拉歐大叔拿吧。");
                        }
                } else {
                        /* Response is No */
                        npc.next().say("嗯？什麼，就說隨你高興怎麼做了。");
                }
        } else if (selection == 5) {
                /* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "" */
                //stage.updateQuestRecordEx(100472, "");
                /* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "dojangRankJob=0" */
                //stage.updateQuestRecordEx(100472, "dojangRankJob=0");
                /* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "dojangRankJob=0;dojangRank2=0" */
                //stage.updateQuestRecordEx(100472, "dojangRankJob=0;dojangRank2=0");
                let lastDate = stage.getQuestRecordEx(3847, "Nenter");
                if (lastDate.length == 0) {
                        npc.say("什麼。你沒有上週挑戰武陵道場的紀錄？\r\n中間有什麼誤會嗎？\r\n\r\n你最後…讓我看看…\r\n你沒有挑戰過武陵道場。");
                } else {
                        let logTime = util.getTimeStringToLong(lastDate, "yy/MM/dd/HH/mm");
                        let wSrtart = util.getWeekStart(logTime);
                        let wEnd = util.getWeekEnd(logTime);
                        npc.say("什麼。你沒有上週挑戰武陵道場的紀錄？\r\n中間有什麼誤會嗎？\r\n\r\n你最後…讓我看看…\r\n#r#e" + util.getStringDate(wSrtart, "yyyy年MM月dd日") + " ~ " + util.getStringDate(wEnd, "yyyy年MM月dd日") + "#k#n 之間有\r\n挑戰過武陵道場。");
                }
        } else if (selection == 6) {
                /* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "" */
                //stage.updateQuestRecordEx(100472, "");
                /* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "dojangRankJob=0" */
                //stage.updateQuestRecordEx(100472, "dojangRankJob=0");
                /* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "dojangRankJob=0;dojangRank2=0" */
                //stage.updateQuestRecordEx(100472, "dojangRankJob=0;dojangRank2=0");
                // let lastDate = stage.getQuestRecordEx(3847, "Nenter");
                // if (lastDate.length == 0) {
                //         npc.say("什麼。你沒有上週挑戰武陵道場的紀錄？\r\n中間有什麼誤會嗎？\r\n\r\n你最後…讓我看看…\r\n你沒有挑戰過武陵道場。");
                // } else {
                //         let logTime = util.getTimeStringToLong(lastDate, "yy/MM/dd/HH/mm");
                //         let wSrtart = util.getWeekStart(logTime);
                //         let wEnd = util.getWeekEnd(logTime);
                //         npc.say("什麼。你沒有上週挑戰武陵道場的紀錄？\r\n中間有什麼誤會嗎？\r\n\r\n你最後…讓我看看…\r\n#r#e" + util.getStringDate(wSrtart, "yyyy年MM月dd日") + " ~ " + util.getStringDate(wEnd, "yyyy年MM月dd日") + "#k#n 之間有\r\n挑戰過武陵道場。");
                stage.runScript('expand/menu/管理功能/道場排行領取');
                // }
        }
}