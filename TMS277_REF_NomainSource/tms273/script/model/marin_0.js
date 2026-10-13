/* marin 50009219 2.0 腳本訂製 技術顧問 */
marin_expands = exports
players = require("check_log");
let combination = {
    1: [
        [2434290, 1, 3994979, 10, 10000, null],
        [2048761, 1, 3994979, 368, 10001, null],
        [2472001, 1, 3994979, 15, 10002, null],
        [2049384, 1, 3994979, 100, 10003, null],
        [2049385, 1, 3994979, 110, 10004, null],
        [2049386, 1, 3994979, 150, 10005, null],
        [2049387, 1, 3994979, 250, 10006, null],
        [2049388, 1, 3994979, 400, 10007, null],
        [2049389, 1, 3994979, 1000, 10008, null],
        [2644008, 1, 3994979, 2000, 10009, null],
        [2644059, 1, 3994979, 2001, 10010, "永恆專用"],
        [5064502, 1, 3994979, 369, 10011, "永恆專用"]
    ],
    2: [
        [1000000, 1, 4000001, 10, 30000],
        [1000001, 1, 4000001, 50, 30001]
    ],
    3: [
        [2591008, 1, 3994950, 2590, 20000],
        [1182285, 1, 3994950, 5000, 20001],
        [1202193, 1, 3994950, 1500, 20002],
        [1202287, 1, 3994950, 2500, 20003],
        [2048760, 1, 3994950, 189, 20004],
        [1672075, 1, 3994950, 968, 20005],
        [1202253, 1, 3994950, 1500, 20007],
        [1113211, 1, 3994950, 968, 20008],
        [1342090, 1, 3994950, 968, 20009],
        [1113195, 1, 3994950, 648, 20010],
        [1113196, 1, 3994950, 648, 20011],
        [1122296, 1, 3994950, 768, 20012],
        [1182016, 1, 3994950, 1249, 20013],
        [1182158, 1, 3994950, 1249, 20014],
        [1143012, 1, 3994950, 5000, 20015]
    ],
    4: [
        [1202193, 1, 3994979, 10, 40000],
        [1000001, 1, 3994979, 51, 40001]
    ],
    5: [
        [2434290, 1],
        [5062009, 1],
        [2430402, 5],
        [5062019, 1]
    ]
}
let dayOfMonth = new Date().getDate();
let key_small = [];
let key_big = [];
marin_expands.askmarin = function (npc, stage, db, util) {
    var txt = "稀有道具\r\n\r\n";
    txt += "#L0#必看!活動時間與道具限制#l\r\n";
    txt += "#L1#樂豆抽獎#l\r\n";
    txt += "#L2##i3994950#兌換#l\r\n";
    txt += "#L3##i3994979#兌換#l\r\n";
    txt += "#L4#裝備回收#l\r\n";
    txt += "#L5#獎池變更#l\r\n";
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            txt = "";
            txt += "1.每月1號10號20號圖騰抽獎會有#i1202193##z1202193#的抽獎池\r\n";
            txt += "2.每月1號10號20號裝備抽獎會有#i1052723##z1052723#的抽獎池\r\n";
            txt += "3.每月5號15號25號裝備抽獎會有#i1182285##z1182285#的抽獎池\r\n";
            txt += "4.每月5號15號25號圖騰抽獎會有#i1202287##z1202287#的抽獎池\r\n";
            npc.meFlip().say(txt);
            break;

        case 1:
            marin_execute(npc, stage, db, util, sel);
            break;

        case 2:
            while (true) {
                txt = "抽獎球兌換 ( 抽獎球樂豆抽獎獲得 )\r\n";
                var marin = combination[3];
                for (var i in marin) {
                    txt += "#L" + i + "# 兌換#i" + marin[i][0] + "# 需 #i" + marin[i][2] + "# x " + marin[i][3] + " 個 剩餘數量 " + getDaySum(db, marin[i][4]) + "#l\r\n";
                }
                url = npc.meFlip().askMenu(txt);

                var marin = combination[3];
                txt = "你確定兌換 #i" + marin[url][0] + "# x " + marin[url][1] + " 個 消耗 #i" + marin[url][2] + "# x " + marin[url][3] + " 嗎\r\n";
                yeno = npc.meFlip().askYesNo(txt);
                if (yeno != 1) return;
                var marin = combination[3];
                if (!stage.hasItem(marin[url][2], marin[url][3])) {
                    npc.meFlip().say("抱歉..你並冇有那麼多物品可以消耗");
                    return;
                }
                var marin_day_Sum = getDaySum(db, marin[url][4]);
                if (marin_day_Sum <= 0) {
                    npc.meFlip().say("抱歉..目前沒有存貨了");
                    return;
                }
                addDaySum(db, marin[url][4], -1);
                if (marin[url][0] == 1182285) {
                    var Equip = util.makeItem(marin[url][0], 1);
                    Equip['grade'] = 18;
                    stage.gainItem(Equip);
                } else if (marin[url][0] == 1143012) {
                    var Equip = util.makeItem(marin[url][0], 1);
                    Equip['baseStr'] = 111;
                    Equip['baseDex'] = 111;
                    Equip['baseInt'] = 111;
                    Equip['baseLuk'] = 111;
                    Equip['pad'] = 111;
                    Equip['mad'] = 111;
                    Equip['maxHp'] = 11111;
                    Equip['maxMp'] = 11111;
                    stage.gainItem(Equip);
                } else {
                    stage.gainItem(marin[url][0], marin[url][1]);
                }
                stage.loseItem(marin[url][2], marin[url][3]);
                npc.meFlip().say("恭喜，您已成功兌換");
            }
            break;

        case 3:
            while (true) {
                txt = "請選擇你要兌換的道具(#r每日刷新兌換數量#k)\r\n";
                var marin = combination[1];
                for (var i in marin) {
                    if (marin[i][5] == null) {
                        txt += "#L" + i + "# 兌換#i" + marin[i][0] + "# 需 #i" + marin[i][2] + "# x " + marin[i][3] + " 個 剩餘數量 " + getDaySum(db, marin[i][4]) + "#l\r\n";
                    } else {
                        txt += "#r#L" + i + "# 兌換#i" + marin[i][0] + "# 需 #i" + marin[i][2] + "# x " + marin[i][3] + " 個 剩餘數量 " + getDaySum(db, marin[i][4]) + " ( " + marin[i][5] + " )#l\r\n";
                    }
                }
                url = npc.me().uiMax().askMenu(txt);
                var marin = combination[1];
                txt = "你確定兌換 #i" + marin[url][0] + "# x " + marin[url][1] + " 個 消耗 #i" + marin[url][2] + "# x " + marin[url][3] + " 嗎\r\n";
                yeno = npc.meFlip().askYesNo(txt);
                if (yeno != 1) return;
                var marin = combination[1];
                if (!stage.hasItem(marin[url][2], marin[url][3])) {
                    npc.meFlip().say("抱歉..你並冇有那麼多物品可以消耗");
                    return;
                }
                var marin_day_Sum = getDaySum(db, marin[url][4]);
                if (marin_day_Sum <= 0) {
                    npc.meFlip().say("抱歉..目前沒有存貨了");
                    return;
                }
                addDaySum(db, marin[url][4], -1);
                stage.gainItem(marin[url][0], marin[url][1]);
                stage.loseItem(marin[url][2], marin[url][3]);
                util.broadcastWorldChatMsg(0x13, "[稀有道具] 玩家 " + stage.getCharacterName() + " 使用 " + marin[url][3] + " 個 " + util.getItemName(marin[url][2]) + " 兌換了 " + util.getItemName(marin[url][0]) + " !!");
                npc.meFlip().say("恭喜");
            }
            break;

        case 4:
            while (true) {
                let decompose = {
                    1202193: {
                        ID: 2048761,
                        num: 30,
                        notice: true

                    },
                    1202287: {
                        ID: 2048761,
                        num: 60,
                        notice: true
                    },
                    1182285: {
                        ID: 2048761,
                        num: 111,
                        notice: true
                    },
                    1052723: {
                        ID: 2048761,
                        num: 111,
                        notice: true
                    },
                    1182158: {
                        ID: 3994979,
                        num: 4000,
                        notice: false
                    },
                    1113211: {
                        ID: 3994979,
                        num: 2000,
                        notice: false
                    },
                    1182016: {
                        ID: 3994979,
                        num: 2000,
                        notice: false
                    },
                    1113196: {
                        ID: 3994979,
                        num: 500,
                        notice: false
                    },
                    1113195: {
                        ID: 3994979,
                        num: 400,
                        notice: false
                    },
                    1022226: {
                        ID: 3994979,
                        num: 193,
                        notice: false
                    },
                    1190544: {
                        ID: 3994979,
                        num: 193,
                        notice: false
                    },
                    1012170: {
                        ID: 3994979,
                        num: 193,
                        notice: false
                    },
                    1114300: {
                        ID: 3994979,
                        num: 193,
                        notice: false
                    },
                    1122296: {
                        ID: 3994979,
                        num: 239,
                        notice: false
                    },
                    1672073: {
                        ID: 3994979,
                        num: 193,
                        notice: false
                    },
                    1672077: {
                        ID: 3994979,
                        num: 339,
                        notice: false
                    },
                    1672069: {
                        ID: 3994979,
                        num: 739,
                        notice: false
                    }
                }
                var txt = "分解中心 <#b 請再下列選擇你想分解的物品 #k>\r\n";
                txt += "\t\t#r#L9999#查詢可分解物品與分解材料#l\r\n\r\n"
                var bute = [];
                for (var i = 1; i <= 128; i++) {
                    var Equip = stage.getItemBySlot(1, i);
                    if (Equip == null) continue;
                    if (Equip['expireDate'] != 3439756800000 && Equip['expireDate'] != 3439728000000) continue;
                    var itemId = Equip['itemId'];
                    if (decompose.hasOwnProperty(itemId)) {
                        bute.push([itemId, i, decompose[itemId]['ID'], decompose[itemId]['num'], decompose[itemId]['notice']]);
                    }
                }
                if (bute.length <= 0) {
                    txt += "\r\n";
                    txt += "\t\t\t#r#e抱歉..你沒有可分解的物品\r\n";
                }
                for (var i in bute) {
                    txt += "#L" + i + "##d[ #b" + marinString(" ", 3, bute[i][1].toString()) + "#d ] #i" + bute[i][0] + "# 兌換 #i" + bute[i][2] + "# x " + bute[i][3] + "#l\r\n";
                }
                txt += "\r\n ";
                sel = npc.meFlip().askMenu(txt);

                switch (sel) {
                    case 9999:
                        var txt = "分解詳情如下列所示\r\n\r\n";
                        for (var i in decompose) {
                            txt += "#i" + i + ":# 分解 " + decompose[i]['num'] + " x #i" + decompose[i]['ID'] + "#\r\n";
                        }
                        npc.meFlip().say(txt);
                        break;

                    default:
                        var txt = "是否立即分解 #i" + bute[sel][0] + "#?\r\n";
                        yeno = npc.meFlip().askYesNo(txt);

                        if (yeno != 1) return;

                        stage.removeItemBySlot(1, bute[sel][1]);
                        stage.gainItem(bute[sel][2], bute[sel][3]);
                        if (bute[sel][4]) {
                            util.broadcastChatMsg(0x16, "恭喜玩家 " + stage.getCharacterName() + " 分解了 " + util.getItemName(bute[sel][0]) + " 獲得了 " + bute[sel][3] + " 個 " + util.getItemName(bute[sel][2]) + " !!!");
                        }
                        npc.meFlip().say("分解成功 你獲得了 " + bute[sel][3] + " 個 #i" + bute[sel][2] + "#");
                        break;
                }
            }
            break;

        case 5:
            var txt = "獎池更換\r\n";
            txt += "請選擇需要更換的獎池\r\n";
            txt += "#L0#裝備抽獎#l\r\n";
            txt += "#L1#圖騰抽獎#l\r\n";
            txt += "#L2#靈魂寶珠#l\r\n";
            txt += "#L3#心髒抽獎#l\r\n";
            txt += "\r\n";
            txt += "#L4#主頁麵#l\r\n";
            url = npc.meFlip().askMenu(txt);

            players.resetEventValue(stage, db, "marin_key_Jackpot");
            switch (url) {
                case 0://裝備
                    huneKey(0);
                    break;

                case 1://圖騰
                    huneKey(1);
                    break;

                case 2://靈魂
                    huneKey(2);
                    break;

                case 3://心髒
                    huneKey(3);
                    break;
            }
            players.addEventValue(stage, db, "marin_key_Jackpot", url, 3650);
            marin_execute(npc, stage, db, util, 1);
            break;
    }
}

function marin_execute(npc, stage, db, util, avenue) {
    switch (avenue) {
        case 1:
            var key = players.getEventValue(stage, db, "marin_key_Jackpot");
            switch (parseInt(key)) {
                case 0://裝備
                    huneKey(0);
                    break;

                case 1://圖騰
                    huneKey(1);
                    break;

                case 2://靈魂
                    huneKey(2);
                    break;

                case 3://心髒
                    huneKey(3);
                    break;
            }
            var txt = "#b當前累計：#r" + players.getEventValue(stage, db, "marin_key_0_0") + " #b次\r\n";
            txt += "#d當前累計超級 #r小獎or大獎#b " + players.getEventValue(stage, db, "marin_key_0_sum") + " #d次\r\n";
            txt += "#d本輪再抽獎 #r" + parseInt(5 - players.getEventValue(stage, db, "marin_key_0_1")) + "#d 次小獎後必得大獎\r\n";
            txt += "#b本輪再抽獎 #r" + parseInt(10 - players.getEventValue(stage, db, "marin_key_0_2")) + " #b次獎勵後必得#r小獎\大獎\r\n";
            txt += "#b本次抽獎需要 #r50#b 樂豆，當前擁有 #r" + stage.getCurrency(1) + "#b 點\r\n";
            txt += "獎勵介紹  (#r 未穿戴過的VIP勛章背包中只能存在一個 #k)\r\n";
            txt += "每次沒有獲得#r小獎/大獎#b時給與#r普通獎勵#b\r\n";
            var reveal = combination[5];
            for (var i in reveal) {
                txt += "[ #i" + reveal[i][0] + "# x " + reveal[i][1] + " ]";
            }
            txt += "\r\n";
            txt += "#b小獎獎勵如下:[#r#e每次抽取2.5%的概率獲得小獎#b#n ]\r\n";
            for (var i in key_small) {
                var item = key_small[i];
                txt += "#b[#r" + item.odds + "%#b#i" + item.ID + "#x" + item.num + "]"
            }
            ;
            txt += "\r\n";
            txt += "#b大獎獎勵如下:[#r#e抽到小獎時10%概率#b#n]\r\n(#r抽到大獎後保底重置)\r\n";
            for (var i in key_big) {
                var item = key_big[i];
                txt += "#b[#r" + item.odds + "%#b#i" + item.ID + "#x" + item.num + "]"
            }
            var name = npc.meFlip().minLen(1).maxLen(2).defText("是").askText(txt);
            if (name != "是") return;
            if (stage.getCurrency(1) < 50) {
                stage.dropAlertNotice("抱歉..你冇有 那麼多 樂豆");
                return;
            }
            stage.gainItem(3994950, 1);
            stage.modifyCurrency(1, -50);
            players.addEventValue(stage, db, "marin_key_0_0", 1, 3650);
            var israndom = marin_is(2.5);
            var big_israndom = marin_is(0.1);
            var key_small_sum = parseInt(players.getEventValue(stage, db, "marin_key_0_1"));
            var small_sum = parseInt(5 - key_small_sum);//小獎判斷
            if (small_sum <= 0) {
                players.resetEventValue(stage, db, "marin_key_0_1");
                players.resetEventValue(stage, db, "marin_key_0_2");
                israndom = true;
                big_israndom = true;
            } else {
                if (israndom) {
                    if (big_israndom) {
                        players.resetEventValue(stage, db, "marin_key_0_2");
                    }
                }
                players.addEventValue(stage, db, "marin_key_0_2", 1, 3650);
            }
            /* 保底機製 */
            var guarantee = parseInt(players.getEventValue(stage, db, "marin_key_0_2"));
            var guarantee_num = parseInt(10 - guarantee);
            if (guarantee_num == 0) {
                players.addEventValue(stage, db, "marin_key_0_1", 1, 3650);
                players.resetEventValue(stage, db, "marin_key_0_2");
                israndom = true;
                var comprehensive = marin_is(0.1);
                if (comprehensive) {
                    big_israndom = true;
                }
            }
            if (israndom) {
                players.addEventValue(stage, db, "marin_key_0_sum", 1, 3650);
                if (big_israndom) {
                    /* 大獎 */
                    players.resetEventValue(stage, db, "marin_key_0_1");
                    var big_random = ramdom_marin(key_big);
                    if (stage.canHold(big_random.ID, big_random.num)) {
                        if (big_random.ID == 1182285) {
                            var Equip = util.makeItem(1182285, 1);
                            Equip['attribute'] = 8;
                            Equip['grade'] = 17;
                            stage.gainItem(Equip);
                        } else {
                            stage.gainItem(big_random.ID, big_random.num);
                        }
                    } else {
                        stage.showBalloonMsg("#r#e背包已滿\r\n\r\n抽獎物品放置倉庫", 200, 10);
                        Insert(db, false, 999, big_random.ID, big_random.num);
                    }
                    util.broadcastWorldChatMsg(23, "恭喜玩家 " + stage.getCharacterName() + " <大獎>..你抽到了 " + util.getItemName(big_random.ID) + " x " + big_random.num)
                } else {
                    /* 小獎 */
                    var small_random = ramdom_marin(key_small);
                    if (stage.canHold(small_random.ID, small_random.num)) {
                        if (small_random.ID == 1182285) {
                            var Equip = util.makeItem(1182285, 1);
                            Equip['attribute'] = 8;
                            Equip['grade'] = 17;
                            stage.gainItem(Equip);
                        } else {
                            stage.gainItem(small_random.ID, small_random.num);
                        }
                    } else {
                        stage.showBalloonMsg("#r#e背包已滿\r\n\r\n抽獎物品放置倉庫", 200, 10);
                        Insert(db, false, 999, small_random.ID, small_random.num);
                    }
                }
            } else {
                var prop = marin_give(combination[5]);
                var marin_ITEMID = prop.itemid;
                var marin_NUM = prop.num;
                if (stage.canHold(marin_ITEMID, marin_NUM)) {
                    if (marin_ITEMID == 1182285) {
                        var Equip = util.makeItem(1182285, 1);
                        Equip['attribute'] = 8;
                        Equip['grade'] = 17;
                        stage.gainItem(Equip);
                    } else {
                        stage.gainItem(marin_ITEMID, marin_NUM);
                    }
                } else {
                    stage.showBalloonMsg("#r#e背包已滿\r\n\r\n抽獎物品放置倉庫", 200, 10);
                    Insert(db, false, 999, marin_ITEMID, marin_NUM);
                }
                stage.dropMessage(3, "恭喜玩家 " + stage.getCharacterName() + " 抽到了 " + util.getItemName(prop.itemid) + " x " + prop.num)
            }
            marin_execute(npc, stage, db, util, 1);
            break;
    }
}

function huneKey(us) {
    switch (us) {
        case 0://裝備
            key_small = [
                { 'ID': 2048761, 'num': 1, 'weight': 18, 'odds': 18 },
                { 'ID': 4001715, 'num': 1, 'weight': 10, 'odds': 10 },
                { 'ID': 2472001, 'num': 10, 'weight': 25, 'odds': 25 },
                { 'ID': 5062021, 'num': 5, 'weight': 8, 'odds': 8 },
                { 'ID': 5062020, 'num': 5, 'weight': 12, 'odds': 12 },
                { 'ID': 5062507, 'num': 5, 'weight': 10, 'odds': 10 },
                { 'ID': 5062026, 'num': 5, 'weight': 7, 'odds': 7 },
                { 'ID': 5062031, 'num': 5, 'weight': 10, 'odds': 10 }
            ]
            switch (parseInt(dayOfMonth)) {
                case 1:
                case 10:
                case 20:
                    key_big = [
                        { 'ID': 2431739, 'num': 2, 'weight': 37.85, 'odds': 37.85 },
                        { 'ID': 1052723, 'num': 1, 'weight': 0.45, 'odds': 0.95 },
                        { 'ID': 1182016, 'num': 1, 'weight': 1.99, 'odds': 1.89 },
                        { 'ID': 1182158, 'num': 1, 'weight': 1.99, 'odds': 1.89 },
                        { 'ID': 1113211, 'num': 1, 'weight': 3.25, 'odds': 3.15 },
                        { 'ID': 1122296, 'num': 1, 'weight': 5.15, 'odds': 5.05 },
                        { 'ID': 1113196, 'num': 1, 'weight': 5.15, 'odds': 5.05 },
                        { 'ID': 1113195, 'num': 1, 'weight': 6.31, 'odds': 6.31 },
                        { 'ID': 1022226, 'num': 1, 'weight': 9.46, 'odds': 9.46 },
                        { 'ID': 1012170, 'num': 1, 'weight': 9.46, 'odds': 9.46 },
                        { 'ID': 1190544, 'num': 1, 'weight': 9.46, 'odds': 9.46 },
                        { 'ID': 1114300, 'num': 1, 'weight': 9.46, 'odds': 9.46 }
                    ]
                    break;
                case 5:
                case 15:
                case 25:
                    key_big = [
                        { 'ID': 2431739, 'num': 2, 'weight': 37.85, 'odds': 37.85 },
                        { 'ID': 1182285, 'num': 1, 'weight': 0.45, 'odds': 0.95 },
                        { 'ID': 1182016, 'num': 1, 'weight': 1.99, 'odds': 1.89 },
                        { 'ID': 1182158, 'num': 1, 'weight': 1.99, 'odds': 1.89 },
                        { 'ID': 1113211, 'num': 1, 'weight': 3.25, 'odds': 3.15 },
                        { 'ID': 1122296, 'num': 1, 'weight': 5.15, 'odds': 5.05 },
                        { 'ID': 1113196, 'num': 1, 'weight': 5.15, 'odds': 5.05 },
                        { 'ID': 1113195, 'num': 1, 'weight': 6.31, 'odds': 6.31 },
                        { 'ID': 1022226, 'num': 1, 'weight': 9.46, 'odds': 9.46 },
                        { 'ID': 1012170, 'num': 1, 'weight': 9.46, 'odds': 9.46 },
                        { 'ID': 1190544, 'num': 1, 'weight': 9.46, 'odds': 9.46 },
                        { 'ID': 1114300, 'num': 1, 'weight': 9.46, 'odds': 9.46 }

                    ]
                    break;

                default:
                    key_big = [
                        { 'ID': 2431739, 'num': 2, 'weight': 37.85, 'odds': 37.85 },
                        { 'ID': 2632972, 'num': 1, 'weight': 1.89, 'odds': 1.89 },
                        { 'ID': 2438412, 'num': 1, 'weight': 4.42, 'odds': 4.42 },
                        { 'ID': 2644008, 'num': 1, 'weight': 6.31, 'odds': 6.31 },
                        { 'ID': 2049389, 'num': 1, 'weight': 9.46, 'odds': 9.46 },
                        { 'ID': 2630626, 'num': 1, 'weight': 3.47, 'odds': 3.47 },
                        { 'ID': 2630627, 'num': 1, 'weight': 7.57, 'odds': 7.57 },
                        { 'ID': 1032219, 'num': 1, 'weight': 3.15, 'odds': 3.15 },
                        { 'ID': 1122296, 'num': 1, 'weight': 5.05, 'odds': 5.05 },
                        { 'ID': 1113196, 'num': 1, 'weight': 5.05, 'odds': 5.05 },
                        { 'ID': 1113195, 'num': 1, 'weight': 6.31, 'odds': 6.31 },
                        { 'ID': 1022226, 'num': 1, 'weight': 9.46, 'odds': 9.46 },

                    ]
                    break;
            }
            break;

        case 1://圖騰
            key_small = [
                { 'ID': 2048761, 'num': 1, 'weight': 18, 'odds': 8 },
                { 'ID': 4001715, 'num': 1, 'weight': 10, 'odds': 10 },
                { 'ID': 2472001, 'num': 10, 'weight': 25, 'odds': 25 },
                { 'ID': 5062021, 'num': 5, 'weight': 8, 'odds': 8 },
                { 'ID': 5062020, 'num': 5, 'weight': 12, 'odds': 12 },
                { 'ID': 5062507, 'num': 5, 'weight': 10, 'odds': 10 },
                { 'ID': 5062026, 'num': 5, 'weight': 7, 'odds': 7 },
                { 'ID': 5062031, 'num': 5, 'weight': 10, 'odds': 10 }
            ]
            switch (parseInt(dayOfMonth)) {
                case 1:
                case 10:
                case 20:
                    key_big = [
                        { 'ID': 1202193, 'num': 1, 'weight': 1.43, 'odds': 1.43 },
                        { 'ID': 1202299, 'num': 1, 'weight': 1.95, 'odds': 1.95 },
                        { 'ID': 1202282, 'num': 1, 'weight': 2.42, 'odds': 2.42 },
                        { 'ID': 1202284, 'num': 1, 'weight': 2.42, 'odds': 2.42 },
                        { 'ID': 1202283, 'num': 1, 'weight': 2.42, 'odds': 2.42 },
                        { 'ID': 1202285, 'num': 1, 'weight': 2.42, 'odds': 2.42 },
                        { 'ID': 2048779, 'num': 1, 'weight': 28.99, 'odds': 28.99 },
                        { 'ID': 1202295, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202296, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202297, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202298, 'num': 1, 'weight': 14.49, 'odds': 14.49 }
                    ]
                    break;

                case 5:
                case 15:
                case 25:
                    key_big = [
                        { 'ID': 1202287, 'num': 1, 'weight': 1.03, 'odds': 1.43 },
                        { 'ID': 1202299, 'num': 1, 'weight': 1.95, 'odds': 1.95 },
                        { 'ID': 1202282, 'num': 1, 'weight': 2.52, 'odds': 2.42 },
                        { 'ID': 1202284, 'num': 1, 'weight': 2.52, 'odds': 2.42 },
                        { 'ID': 1202283, 'num': 1, 'weight': 2.52, 'odds': 2.42 },
                        { 'ID': 1202285, 'num': 1, 'weight': 2.52, 'odds': 2.42 },
                        { 'ID': 2048779, 'num': 1, 'weight': 28.99, 'odds': 28.99 },
                        { 'ID': 1202295, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202296, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202297, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202298, 'num': 1, 'weight': 14.49, 'odds': 14.49 }
                    ]
                    break;

                default:
                    key_big = [
                        { 'ID': 1202253, 'num': 1, 'weight': 2.98, 'odds': 3.38 },
                        { 'ID': 1202282, 'num': 1, 'weight': 2.52, 'odds': 2.42 },
                        { 'ID': 1202284, 'num': 1, 'weight': 2.52, 'odds': 2.42 },
                        { 'ID': 1202283, 'num': 1, 'weight': 2.52, 'odds': 2.42 },
                        { 'ID': 1202285, 'num': 1, 'weight': 2.52, 'odds': 2.42 },
                        { 'ID': 2048779, 'num': 1, 'weight': 28.99, 'odds': 28.99 },
                        { 'ID': 1202162, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202161, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202163, 'num': 1, 'weight': 14.49, 'odds': 14.49 },
                        { 'ID': 1202164, 'num': 1, 'weight': 14.49, 'odds': 14.49 }
                    ]
                    break;
            }
            break;

        case 2:
            key_small = [
                { 'ID': 2048761, 'num': 1, 'weight': 18, 'odds': 18 },
                { 'ID': 4001715, 'num': 1, 'weight': 10, 'odds': 10 },
                { 'ID': 2472001, 'num': 10, 'weight': 25, 'odds': 25 },
                { 'ID': 5062021, 'num': 5, 'weight': 8, 'odds': 8 },
                { 'ID': 5062020, 'num': 5, 'weight': 12, 'odds': 12 },
                { 'ID': 5062507, 'num': 5, 'weight': 10, 'odds': 10 },
                { 'ID': 5062026, 'num': 5, 'weight': 7, 'odds': 7 },
                { 'ID': 5062031, 'num': 5, 'weight': 10, 'odds': 10 }

            ]
            key_big = [
                { 'ID': 2591008, 'num': 1, 'weight': 1.11, 'odds': 1.91 },
                { 'ID': 2591282, 'num': 1, 'weight': 3.77, 'odds': 3.37 },
                { 'ID': 2591543, 'num': 1, 'weight': 4.63, 'odds': 4.43 },
                { 'ID': 2591600, 'num': 1, 'weight': 4.63, 'odds': 4.43 },
                { 'ID': 2591000, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591001, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591002, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591003, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591004, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591005, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591006, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591007, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591009, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591280, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591281, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591562, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591283, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591284, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591285, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591286, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591287, 'num': 1, 'weight': 4.77, 'odds': 4.77 },
                { 'ID': 2591563, 'num': 1, 'weight': 4.77, 'odds': 4.77 }
            ]
            break;

        case 3:
            key_small = [
                { 'ID': 2048761, 'num': 1, 'weight': 18, 'odds': 18 },
                { 'ID': 4001715, 'num': 1, 'weight': 10, 'odds': 10 },
                { 'ID': 2472001, 'num': 10, 'weight': 25, 'odds': 25 },
                { 'ID': 5062021, 'num': 5, 'weight': 8, 'odds': 8 },
                { 'ID': 5062020, 'num': 5, 'weight': 12, 'odds': 12 },
                { 'ID': 5062507, 'num': 5, 'weight': 10, 'odds': 10 },
                { 'ID': 5062026, 'num': 5, 'weight': 7, 'odds': 7 },
                { 'ID': 5062031, 'num': 5, 'weight': 10, 'odds': 10 }

            ]
            key_big = [
                { 'ID': 1672075, 'num': 1, 'weight': 2.36, 'odds': 2.36 },
                { 'ID': 1672069, 'num': 1, 'weight': 6.89, 'odds': 6.89 },
                { 'ID': 1672077, 'num': 1, 'weight': 9.88, 'odds': 9.88 },
                { 'ID': 1672040, 'num': 1, 'weight': 16.59, 'odds': 16.59 },
                { 'ID': 1672073, 'num': 1, 'weight': 18.68, 'odds': 18.68 },
                { 'ID': 1672007, 'num': 1, 'weight': 19.53, 'odds': 19.53 },
                { 'ID': 1672005, 'num': 1, 'weight': 26.07, 'odds': 26.07 }
            ]
            break;
    }
}

function ramdom_marin(arr) {
    var totalWeight = 0;
    for (var i = 0; i < arr.length; i++) {
        totalWeight += arr[i].weight;
    }
    for (var i = 0; i < arr.length; i++) {
        arr[i].probability = arr[i].weight / totalWeight;
    }
    var random = Math.random();
    var probabilitySum = 0;
    for (var i = 0; i < arr.length; i++) {
        probabilitySum += arr[i].probability;
        if (probabilitySum >= random) {
            return arr[i];
        }
    }
}

function marin_give(vsr) {
    var index = Math.floor(Math.random() * vsr.length);
    var itemid = vsr[index][0];
    var num = vsr[index][1];
    return { itemid: itemid, num: num };
}


function marin_is(snum) {
    var random = Math.random();
    var isWin = random <= snum / 100;
    return isWin;
}


function Insert(db, ver, type, itemid, num) {
    switch (ver) {
        case true:
            var sql = "SELECT * FROM `marin_warehouse` WHERE `cid` = '" + stage.getCharacterId() + "' AND `type` = '" + type + "' AND `itemid` = '" + itemid + "' AND `stat` = '" + 0 + "' LIMIT 0,1;";
            var ret = db.select(sql);
            if (ret.length <= 0) {
                var sql = "INSERT INTO `marin_warehouse`(`cid`, `cname`, `type`, `itemid`, `itemname`, `itemnum`, `stat`) VALUES (" + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + type + ", " + itemid + ", '" + util.getItemName(itemid) + "', " + num + ",0);";
                db.insert(sql);
            } else {
                var sid = ret[0].get("id");
                var sql = "UPDATE `marin_warehouse` SET `itemnum` = itemnum+" + num + " WHERE `id` = " + sid + ";";
                db.update(sql);
            }
            break;
        default:
            var sql = "SELECT * FROM `marin_warehouse` WHERE `aid` = '" + stage.getAccountId() + "' AND `type` = '" + type + "' AND `itemid` = '" + itemid + "' AND `stat` = '" + 1 + "' LIMIT 0,1;";
            var ret = db.select(sql);
            if (ret.length <= 0) {
                var sql = "INSERT INTO `marin_warehouse`(`aid`, `aname`, `cid`, `cname`, `type`, `itemid`, `itemname`, `itemnum`, `stat`) VALUES (" + stage.getAccountId() + ", 'NULL'," + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + type + ", " + itemid + ", '" + getItemName(itemid) + "', " + num + ",1);";
                db.insert(sql);
            } else {
                var sid = ret[0].get("id");
                var sql = "UPDATE `marin_warehouse` SET `itemnum` = itemnum+" + num + " WHERE `id` = " + sid + ";";
                db.update(sql);
            }
            break;
    }
}

function getDaySum(db, onlyID) {
    var ret = db.select("SELECT `num` FROM `marin_world` WHERE `onlyid` = '" + onlyID + "' LIMIT 1;");
    return parseInt(ret[0].get("num"));
}

function addDaySum(db, onlyID, DaySum) {
    db.update("UPDATE `marin_world` SET `num` = num+" + DaySum + " WHERE `onlyid` = " + onlyID);
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}