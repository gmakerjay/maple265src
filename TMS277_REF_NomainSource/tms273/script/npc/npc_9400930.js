// Created by MetaMS
// ID:[9400930]


let nowTime = new Date().getTime();
let managerType = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + managerType;
let message;
let talks1, anser1;
let talks2, anser2;
if (npcId == 94009201) {
        message = ["#face0#我喜歡在家休息，而艾米喜歡在外面玩。雖然我們是雙胞胎，但是性格完全相反。",
                "#face0#每次有新人搬來的時候，我就感覺很激動。但也會擔心我們艾米會不會又闖出什麼事故……",
                "#face0#水下世界是什麼地方？我看到過在那裡製作的珊瑚燈，真是太神秘了。總有一天，我要去看看。",
                "#face0#沙發似乎越多越好。因為你不知道好友什麼時候會來玩嘛？",
                "#face0#如果卡朋特在，應該就能幫上#h0#的忙，真是可惜。他是我們村子裡最棒的木匠。現在為了尋找木材而出去旅行了。",
                "#face0#只要更改屋頂的顏色，就能改變整個家的氣氛！",
                "#face0#艾米非常喜歡吃東西。我只要看著艾米吃的樣子就飽了。",
                "#face0#艾丹雖然有點調皮，但是個善良的朋友。而且內心還很柔軟。",
                "#face0#米蘭達在運營跳蚤市場之前是個畫家，再之前是作曲家，再之前是攝像師。",
                "#face0#特魯迪真的就像我的親弟弟。因為我是看著他長大的！你知道特魯迪最先說的一句話是什麼嗎？那就是「凱~蒂~」。是不是很可愛？",
                "#face0#你有聽說凱尼斯家進了新的家具的消息嗎？ ",
                "#face0#嗯~那面牆看起來有點空曠呢。至少應該掛一個相框吧！ ",
                "#face0#艾米又去哪裡了，一大早就不見人影了呢，應該不是去了什麼危險的地方吧？",
                "#face0#今天我去廣場，見到了艾丹，我很想知道他有沒有好好使用桌子。",
                "#face0#今天我去參觀了其他朋友的家，果然還是#h0#的家最漂亮。",
                "#face0#艾米已經睡著了。只要一過晚上10點，她就會陷入夢鄉。"];
        talks1 = ["#face0#今天比較閒，所以我正打算去米蘭達的跳蚤市場轉轉，然後去其他家具工坊看看。\r\n說不定能久違地看到有新的家具出現。我也想看看其他人的裝修呢！\r\n\r\n#L0##b為什麼你想要看其他人的裝修？k#l\r\n#L1##b如果有新的家具，那你也告訴我一聲吧。#k#l\r\n#L2##b幫我跟米蘭達問個好。#k#l",
                "#face0#今天我打算去市場買點食材。最近艾米看起來沒什麼力氣，所以我打算做一些特別的食物。在去市場的路上說不定還能找到漂亮的紫羅蘭盆栽呢。\r\n\r\n#L0##b特別的食物是什麼？#k#l\r\n#L1##b一定要是紫羅蘭嗎？#k#l\r\n#L2##b艾米為什麼會沒什麼力氣？#k#l",
                "#face0#我正打算去廣場練習增益。我正在研究能提高持續時間的方法。\r\n\r\n#L0##b你為什麼要去廣場？#k#l\r\n#L1##b這真是個好消息呢！#k#l\r\n#L2##b謝謝你為了我這麼努力。#k#l"];
        anser1 = [["#face1#因為裝修的世界是無窮無盡的！啊，那個人是那樣放置家具的啊，這種家具像這樣擺也很漂亮啊，看著這些就能學習了。這也算是我的小小興趣。", "#face2#我知道了！#h0#如果找到了新的BOSS 家具，一定要記得告訴我哦。", "#face0#嗯~還是#h0#親自去問好比較好哦！你偶爾也可以去廣場玩玩嘛，大家都會很高興的。"],
                ["#face2#充滿了香噴噴的芝士香味的烤橙子&雞腿！光是想像都覺得會很好吃吧？因為我想把艾米喜歡吃的都放進去，所以想了很久。一想到艾米肯定會很喜歡，我就很開心。", "#face1#因為我和艾米的誕生花就是紫羅蘭。要是給艾米這個，她肯定會很開心。", "#face3#嗯……我也不太清楚。艾米不想讓我擔心，所以不怎麼和我說心裡話。"],
                ["#face1#因為既然已經做了，那就應該找其他人練習一下啊！特別是給艾丹增益的話，揮砍就會變得更容易，他特別喜歡呢。", "#face2#謝謝你能這麼開心，我會配合#h0#的腳步，努力成長的。", "#face2#不不，是因為我喜歡所以才做的！我很開心能幫到你。"]];
        talks2 = ["#face0#今天據說是個陰天，風還很大。幸好沒有說要下雨，所以不用太擔心。\r\n\r\n#L0##b你對每天的天氣都很了解呢！#k#l\r\n#L1##b謝謝，今天也是個適合打獵的天氣呢。#k#l\r\n#L2##b現在有了家，就算下雨也沒什麼好擔心的了。#k#l",
                "#face0#今天據說一整天都是晴朗的好天氣呢。一直都是讓人感到舒適的溫度，很適合出去野外活動呢。\r\n\r\n#L0##b埃爾賓要做什麼呢？#k#l\r\n#L1##b謝謝，這是個打獵的好天氣呢！#k#l\r\n#L2##b艾米今天也要去兜風吧。#k#l",
                "#face0#今天據說也是又熱又潮濕。像今天這種天氣一定要注意攝取水分，比起一次性喝大量的水，最好還是少量多次比較好。\r\n\r\n#L0##b謝謝，看來我得帶水出門了。#k#l\r\n#L1##b真是厲害，你怎麼知道的呢？#k#l\r\n#L2##b看來也得多給花澆水了吧？#k#l"];
        anser2 = [["#face0#……這是我的習慣。如果下雨或者天氣不好，就會給我的父母帶來麻煩。所以我就養成了習慣，每天都會想著「希望今天也是個好天氣」然後確認下天氣的情況。", "#face1#注意安全！", "#face2#沒錯，如果下雨了，那就回家休息吧。也可以帶其他朋友來。"],
                ["#face1#陽光很好，所以我正在考慮要不要曬一下杯子呢。然後給花澆澆水，把積攢的家務事都做一下。", "#face1#注意安全！", "#face3#你怎麼知道？！只要天氣好，他就鬧著要去森林裡兜風。\r\n如果遇到危險的人或者動物可怎麼辦啊？"],
                ["#face0#說到這個，我也得給艾米帶點水。估計他沒看天氣就出門了。", "#face2#我是從一本叫《有關育兒的一切》的書上學到的，在那本書上好像真的有世界上所有的知識。我覺得這本書應該被指定為人人都必讀的書呢。", "#face1#雖然在潮濕的時候給一點水就夠了，但是也得看花的具體狀態才知道。"]];
} else {
        message = ["#face0#今天沒有什麼有趣的事情嗎？請跟我說說吧！ ",
                "#face0#別看艾丹那樣，其實他超級~~膽小。剛才看到花盆裡的蟲子都被嚇到了吧？",
                "#face0#今天米蘭達也在噴泉的長椅上畫畫，每天都在努力的她，實力肯定會有所增長的。",
                "#face0#餓啊，#h0#~~。#h0#吃飯了嗎？",
                "#face0#廣場上的人非常多，難道是有我不知道的活動？ ",
                "#face0##h0#，冒險是什麼樣的感覺？",
                "#face0##h0#！你回來了啊？你今天都去了哪兒？ ",
                "#face0##h0#已經吃遍楓之谷世界的食物了呢？真是太羨慕了！什麼是最好吃的？ ",
                "#face0#特魯迪等了很久，然後回去了！他說想見見#h0#呢~\r\n如果你有時間，那就去廣場找特魯迪玩吧。\r\n\r\n",
                "#face0#嗯，魔法真是難呢。增益技能就這麼難，怎樣才能呼風喚雨呢？真正的魔法師真的好棒啊！ ",
                "#face0#今天也辛苦你了，#h0#，是不是很累？躺在椅子上休息一下吧！ ",
                "#face0##h0#最喜歡什麼食物？這是個秘密哦，我最近正在練習做菜呢！嘿嘿",
                "#face0#……看來給凱蒂餵食的人越來越多了。最近它一直在變胖呢~必須增加散步時間了！ ",
                "#face0#別看艾丹那樣，其實他超級~~膽小。剛才看到花盆裡的蟲子都被嚇到了吧？",
                "#face0#嗯……？#h0#？你還沒睡？",
                "#face0#嗯……該來了……啊！#h0#你來了啊？……我正在等父母的聯絡。他們每年都一定會寄信來，看來今年要晚一點了。",
                "#face0#今天米蘭達也在噴泉的長椅上畫畫，每天都在努力的她，實力肯定會有所增長的。",
                "#face0#真是的，不久前我想吃奶油麵包，所以去了趟特魯迪家，結果居然賣完了？看著他們生意這麼好，我應該開心的……但還是有點遺憾啊……本來這是我專屬的美食店呢~！ ",
                "#face0#隔壁好像又搬來了新人！雖然多個鄰居是件好事，但是卻因此連埃爾賓哥哥的面都見不到了。估計他現在正在幫忙進行裝修呢吧？ "];
        talks1 = ["#face1#今天好像很忙呢！陽光實在是太好了。這種時候就應該去廣場上曬太陽才對啊。為了合成維他命C！\r\n\r\n#L0##b……能夠通過陽光獲取的應該是維他命D吧……#k#l\r\n#L1##b好想法！#k#l\r\n#L2##b像今天這樣的好天氣，就會想要打掃呢。#k#l",
                "#face2#今天我要帶著特魯迪和凱蒂去森林裡兜風！去的路上我順便問問有沒有人要一起去~ \r\n艾丹估計肯定會去，但米蘭達可能會說「你們自己去吧」。\r\n\r\n#L0##b雖然我也很想一起去，但是我很忙，所以不行。你們去好好玩吧！#k#l\r\n#L1##b米蘭達如果不去，艾丹也不會去的吧？#k#l\r\n#L2##b森林是不是太危險了？#k#l",
                "#face0#今天我打算在家裡練習一下魔法……為什麼我的實力總是無法提高呢？嚶……\r\n\r\n#L0##b不！比起一開始還是好很多了吧？多虧了艾米，打獵的時候方便多了。#k#l\r\n#L1##b沒錯，似乎還需要多點練習。#k#l\r\n#L2##b實力不強也可以，只要有心意就行了。#k#l"];
        anser1 = [["#face3#啊，我知道哦？我只是隨便說說而已！切，你可不准說出去嘲笑我哦！", "#face2#那我去去就回！你就好好看家吧~~！", "#face1#嗯……嗯……好！我們一起清掃，然後一起去廣場曬太陽吧！#h0#也願意吧？"],
                ["#face0#我就知道會這樣所以沒問。#h0#總是很忙。如果能一起多玩玩就好了……", "#face2#哇！#h0#，你已經完全了解艾丹了啊？", "#face2#沒關係！凱蘭西亞周邊是很安全的。我從四歲開始就在森林裡玩，從來沒有碰到怪物或者壞人！而且如果我遇到危險，#h0#肯定會來吧？"],
                ["#face2#真的嗎？是真的吧？！太好了！我會繼續努力練習的，敬請期待！", "#face3#……果然如此啊……？看來我是沒有才能吧……還是放棄比較好嗎……", "#face1#謝謝……不過我想幫助#h0#！請再等一下。我會努力練習，然後像魔法師一樣施展帥氣的增益的！"]];
        talks2 = ["#face1#今天的天氣適合躺在沙發上喝點溫暖的可可呢！\r\n\r\n#L0##b應該不會下雨吧~？只是艾米累了吧！#k#l\r\n#L1##b世界上哪兒有這種天氣啊！#k#l\r\n#L2##b好啊，謝謝你能告訴我。#k#l",
                "#face2#今天是個適合買好漢堡套餐然後去玩的好天氣呢~~！\r\n\r\n#L0##b你是指天氣溫暖又晴朗吧？#k#l\r\n#L1##b世界上哪兒有這種天氣啊！#k#l\r\n#L2##b好啊，謝謝你能告訴我。#k#l",
                "#face2#今天是讓人想到涼爽的橙汁的天氣呢。要不乾脆種一棵橙子樹吧！要是把親手摘下來的橙子馬上榨汁肯定會很好吃吧？\r\n\r\n#L0##b今天看來會很熱啊，謝謝你能告訴我。#k#l\r\n#L1##b世界上哪兒有這種天氣啊！#k#l\r\n#L2##b你想喝橙汁嗎？#k#l"];
        anser2 = [["#face1#不是的，今天真的有點陰沉啊。可能~會下雨啊，這種天氣就應該待在家裡吧。", "#face1#為什麼沒有呢？天空陰沉沉的~太陽也沒出來，還吹著陰風！這種天氣就應該休息才對。還要再加上可可，你難道不知道嗎？", "#face2#哪裡的話呀！ "],
                ["#face2#叮咚~！#h0#果然聰明！這個天氣也很適合狩獵呢。今天也要加油哦，#h0#！", "#face2#為什麼沒有啊！陽光也很溫暖，風也很涼爽，還沒有霧霾，像今天這種天氣就應該去玩啊！不在這種時候吃漢堡那要到什麼時候才吃？", "#face2#哪裡的話呀！ "],
                ["#face2#叮咚~！外面太熱了。如果要去打獵，一定要小心別中暑了！", "#face4#哈……真是的~~你不知道在大太陽底下汗流浹背之後最好喝的是什麼嗎？水？不對不對。碳酸飲料？不對不對。當然是又甜又涼爽的橙汁了~！如果你去到外面，肯定就會知道我說的是什麼意思了。", "#face2#有點……？剛才我出去了一下，真是很熱啊。還出了汗。這種時候就應該來杯涼爽的橙汁，一下子就能消暑了呢。 "]];
}
let text = message[Math.floor(Math.random() * message.length)];
let resetdate = stage.getQuestRecordExShare(500773, "resetdate");
let nowDate = util.getStringDate("yyyy/MM/dd/HH/mm");
if (nowDate > resetdate) {
        stage.updateQuestRecordExShare(500773, "bonusTalk", "0");
}
let bonusTalk = stage.getIntQuestRecordExShare(500773, "bonusTalk");
if (bonusTalk <= 0) {
        text += "\r\n\r\n #L1##b和#p" + npcId + "#對話#k#l";
}
text += "\r\n\r\n #L99##b查看管家信息#k#l";
let sel = npc.id(npcId).uiMax().askMenu(text);
switch (sel) {
        case 99:
                stage.showSpecialUI(1, "UIHousingManager");
                break;
        case 1:
                let tSel = npc.id(npcId).uiMax().askMenu("#face0#(要說什麼呢？)\r\n\r\n#L0##b#p" + npcId + "#，今天過得怎麼樣？#k#l\r\n#L1##b今天的天氣如何？#k#l\r\n#L2##b#p" + npcId + "#，我有個問題！#k#l");
                switch (tSel) {
                        case 0:
                                howToday();
                                break;
                        case 1:
                                howWeather();
                                break;
                        case 2:
                                let cc = 0;//player.getIntQuestRecordEx(500773, "s5");
                                if (cc < 20) {
                                        npc.id(npcId).ui(1).next().say("#face4#不行~~這是秘密！");
                                } else {
                                        aboutManeger();
                                }
                                break;
                }
                break;
}

function howToday() {
        let rngIdx1 = Math.floor(Math.random() * talks1.length);
        let tMsg1 = talks1[rngIdx1];
        let aSel1 = npc.id(npcId).uiMax().askMenu(tMsg1);
        npc.id(npcId).ui(1).next().say(anser1[rngIdx1][aSel1]);
        updateManager();
}

function howWeather() {
        let rngIdx2 = Math.floor(Math.random() * talks1.length);
        let tMsg2 = talks2[rngIdx2];
        let aSel2 = npc.id(npcId).uiMax().askMenu(tMsg2);
        npc.id(npcId).ui(1).next().say(anser2[rngIdx2][aSel2]);
        updateManager();
}

function updateManager() {
        let questId = 501465 + managerType;
        let rdate = nowTime + 24 * 60 * 60 * 1000;
        let sText = "#face3##b(和#p" + npcId + "#開心地聊天, #p" + npcId + "#的屬性提高了！)\r\n#b";
        var ss = Math.floor(Math.random() * 4) + 1;
        let src = stage.getIntQuestRecordExShare(500773, "s" + ss);
        let aValue = 2;
        let value = src + aValue;
        switch (ss) {
                case 1:
                        sText += "家務#k屬性提高了#b" + aValue + "#k!" + "#k (" + src + "->#b" + value + "#k)\r\n";
                        break;
                case 2:
                        sText += "美感#k屬性提高了#b" + aValue + "#k!" + "#k (" + src + "->#b" + value + "#k)\r\n";
                        break;
                case 3:
                        sText += "財務管理#k屬性提高了#b" + aValue + "#k!" + "#k (" + src + "->#b" + value + "#k)\r\n";
                        break;
                case 4:
                        sText += "社交術#k屬性提高了#b" + aValue + "#k!" + "#k (" + src + "->#b" + value + "#k)\r\n";
                        break;
        }
        stage.updateQuestRecordExShare(questId, "s" + ss, String(value));
        src = stage.getIntQuestRecordExShare(questId, "s5");
        value = src + 1;
        sText += "親密度#k提高了#b1#k!" + "#k (" + src + "->#b" + value + "#k)\r\n";
        stage.updateQuestRecordExShare(questId, "s5", String(value));
        stage.updateQuestRecordExShare(500773, "bonusTalk", "1");
        stage.updateQuestRecordExShare(500773, "resetdate", util.getStringDate(rdate, "yyyy/MM/dd/HH/mm"));

        npc.id(npcId).ui(1).next().say(sText);
}