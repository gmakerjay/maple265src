/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
let quest = [];
player = require("check_log");
execute();

function execute() {
    let bute = ["scroll_RED", 'scroll_X', 'scroll_V', 'scroll_DARK', 'scroll_FATE', 'scroll_GLORY'];

    for (let i in bute) {
        let num = parseInt(player.getEventValue(stage, db, bute[i]));
        if (num > 0) {
            let scroll_num = stage.getIntQuestRecordExShare(300000, bute[i]);
            scroll_num += num;
            stage.updateQuestRecordExShare(300000, bute[i], String(scroll_num));
            player.resetEventValue(stage, db, bute[i]);
        }
    }
    
    let txt = "稀有卷軸\r\n\r\n";
    txt += "#L0#楓點抽獎#l　#L1#樂豆抽獎#l　#L2#卷軸倉庫#l　#L3#升級卷軸#l\r\n\r\n";
    txt += "#L4#回收卷軸#l\r\n";
    let sel = npc.meFlip().askMenu(txt);
    switch (sel) {
        case 0:
            marin = {
                0: [2048812, 2048813, 2612019, 2612020, 2613012, 2613013, 2615005, 2615006, 2616000, 2616001],
                1: {
                    85: {
                        pro: 70,
                        key: [2048815, 2048816, 2612055, 2612056, 2613048, 2613049, 2615029, 2615030, 2616059, 2616060]
                    },
                    15: {
                        pro: 30,
                        key: [2048819, 2048820, 2612074, 2612075, 2613062, 2613063, 2615041, 2615042, 2616072, 2616073]
                    }
                },
                2: {
                    85: {
                        pro: 70,
                        key: [2048819, 2048820, 2612074, 2612075, 2613062, 2613063, 2615041, 2615042, 2616072, 2616073]
                    },
                    15: {
                        pro: 30,
                        key: [2048825, 2048826, 2612080, 2612081, 2613068, 2613069, 2615051, 2615052, 2616216, 2616217]
                    }
                }
            }
            while (true) {
                quest[0] = stage.getIntQuestRecordExShare(300000, "key_total");
                quest[1] = stage.getIntQuestRecordExShare(300000, "key_stat");
                quest[2] = stage.getIntQuestRecordExShare(300000, "key_base");
                quest[3] = stage.getIntQuestRecordExShare(300000, "key_small");
                txt = "#b目前累計抽獎：#r" + quest[0] + "#b 次\r\n";
                txt += "#b目前累計獲得超級獎勵 #e#r小獎/大獎 " + quest[1] + " #b#n次\r\n";
                txt += "#b本輪再抽獎 #r" + (5 - quest[3]) + "#b 次#r小獎必得大獎\r\n";
                txt += "#b本輪再抽獎 #r" + (10 - quest[2]) + "#b 次獎勵後必得 #r小獎/大獎\r\n";
                txt += "#b每次抽獎需要 #r50 #b楓點 目前擁有 #r" + stage.getCurrency(2) + " #b點\r\n";
                txt += "\r\n";
                txt += "#b獎勵介紹 [ #r抽中都是自選#b ]\r\n";
                txt += "#b每次沒有獲得#r小獎/大獎#b時給與";
                for (let i in marin[0]) {
                    txt += "#i" + marin[0][i] + "#";
                }
                txt += "\r\n";
                txt += "#b小獎獎勵如下:[#r每次抽取5%概率獲得小獎#b]\r\n";
                txt += "#r" + marin[1][Object.keys(marin[1])[0]].pro + "%";
                for (let i in marin[1][Object.keys(marin[1])[0]].key) {
                    txt += "#i" + marin[1][Object.keys(marin[1])[0]].key[i] + "#";
                }
                txt += "\r\n";
                txt += "#r" + marin[1][Object.keys(marin[1])[1]].pro + "%";
                for (let i in marin[1][Object.keys(marin[1])[1]].key) {
                    txt += "#i" + marin[1][Object.keys(marin[1])[1]].key[i] + "#";
                }
                txt += "\r\n";
                txt += "#b大獎獎勵如下[#r抽到小獎時20%概率#b] 且重置保底概率\r\n";
                txt += "#r" + marin[2][Object.keys(marin[2])[0]].pro + "%";
                for (let i in marin[2][Object.keys(marin[2])[0]].key) {
                    txt += "#i" + marin[2][Object.keys(marin[2])[0]].key[i] + "#";
                }
                txt += "\r\n";
                txt += "#r" + marin[2][Object.keys(marin[2])[1]].pro + "%";
                for (let i in marin[2][Object.keys(marin[2])[1]].key) {
                    txt += "#i" + marin[2][Object.keys(marin[2])[1]].key[i] + "#";
                }
                if (name = npc.meFlip().minLen(1).maxLen(4).defText("是").askText(txt) == "是") {
                    if (stage.getCurrency(2) < 50) {
                        npc.meFlip().say("真可惜..感覺你下一個就是大獎呢！可是你沒有 50 楓點了!");
                        return;
                    }
                    stage.modifyCurrency(2, -50);
                    quest[0] += 1;
                    stage.updateQuestRecordExShare(300000, "key_total", String(quest[0]));
                    quest[2] += 1;
                    stage.updateQuestRecordExShare(300000, "key_base", String(quest[2]));
                    let mode = 0;
                    if ((10 - quest[2]) <= 0) {
                        stage.updateQuestRecordExShare(300000, "key_base", "0");
                        mode = 1;
                    }
                    if ((5 - quest[3]) <= 1) {
                        stage.updateQuestRecordExShare(300000, "key_small", "0");
                        mode = 2;
                    }
                    switch (mode) {
                        case 0:
                            random = marinrandom(0, 100);
                            if (random <= 5) {
                                mode = 1;
                                random = marinrandom(0, 100);
                                if (random <= 10) {
                                    mode = 2;
                                }
                            }
                            break;
                        case 1:
                            random = marinrandom(0, 100);
                            if (random <= 10) mode = 2;
                            break;
                    }
                    quest[0] = stage.getIntQuestRecordExShare(300000, "key_total");
                    quest[1] = stage.getIntQuestRecordExShare(300000, "key_stat");
                    quest[2] = stage.getIntQuestRecordExShare(300000, "key_base");
                    quest[3] = stage.getIntQuestRecordExShare(300000, "key_small");
                    let judge = false;
                    switch (mode) {
                        case 0:
                            count = stage.getIntQuestRecordExShare(300000, "scroll_RED");
                            count += 1;
                            stage.updateQuestRecordExShare(300000, "scroll_RED", String(count));
                            break;
                        case 1:
                            quest[1] += 1;
                            stage.updateQuestRecordExShare(300000, "key_stat", String(quest[1]));
                            quest[3] += 1;
                            stage.updateQuestRecordExShare(300000, "key_small", String(quest[3]));
                            random = marinrandom(0, 100);
                            if (random <= Object.keys(marin[1])[1]) {
                                judge = true;
                                count = stage.getIntQuestRecordExShare(300000, "scroll_V");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_V", String(count));
                                util.broadcastWorldChatMsg(0x16, "[ 稀有卷軸 楓點 ] ：恭喜 " + stage.getCharacterName() + "　抽到 小獎 V 卷軸 累計 ：" + count);
                            } else {
                                count = stage.getIntQuestRecordExShare(300000, "scroll_X");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_X", String(count));
                                util.broadcastWorldChatMsg(0x16, "[ 稀有卷軸 楓點 ] ：恭喜 " + stage.getCharacterName() + "　抽到 小獎 X 卷軸 累計 ：" + count);
                            }
                            break;
                        case 2:
                            quest[1] += 1;
                            stage.updateQuestRecordExShare(300000, "key_stat", String(quest[1]));
                            stage.updateQuestRecordExShare(300000, "key_base", "0");
                            stage.updateQuestRecordExShare(300000, "key_small", "0");
                            random = marinrandom(0, 100);
                            if (random <= Object.keys(marin[2])[1]) {
                                count = stage.getIntQuestRecordExShare(300000, "scroll_DARK");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_DARK", String(count));
                                util.broadcastWorldChatMsg(0x15, "[ 稀有卷軸 楓點 ] ：恭喜 " + stage.getCharacterName() + "　抽到 大獎 黑暗 卷軸 累計 ：" + count);
                            } else {
                                count = stage.getIntQuestRecordExShare(300000, "scroll_V");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_V", String(count));
                                util.broadcastWorldChatMsg(0x16, "[ 稀有卷軸 楓點 ] ：恭喜 " + stage.getCharacterName() + "　抽到 大獎 V 卷軸 累計 ：" + count);
                            }
                            break;
                    }
                }
            }
            break;
        case 1:
            marin = {
                0: [2048815, 2048816, 2612055, 2612056, 2613048, 2613049, 2615029, 2615030, 2616059, 2616060],
                1: {
                    85: {
                        pro: 70,
                        key: [2048819, 2048820, 2612074, 2612075, 2613062, 2613063, 2615041, 2615042, 2616072, 2616073]
                    },
                    15: {
                        pro: 30,
                        key: [2048825, 2048826, 2612080, 2612081, 2613068, 2613069, 2615051, 2615052, 2616216, 2616217]
                    }
                },
                2: {
                    70: {
                        pro: 70,
                        key: [2048825, 2048826, 2612080, 2612081, 2613068, 2613069, 2615051, 2615052, 2616216, 2616217]
                    },
                    20: {
                        pro: 20,
                        key: [2048830, 2048831, 2612082, 2612083, 2613070, 2613071, 2615054, 2615055, 2616218, 2616219]
                    },
                    10: {
                        pro: 10,
                        key: [2048848, 2048849, 2612089, 2612090, 2613076, 2613077, 2615060, 2615061, 2616224, 2616225]
                    }
                }
            }
            while (true) {
                quest[0] = stage.getIntQuestRecordExShare(200001, "key_total");
                quest[1] = stage.getIntQuestRecordExShare(200001, "key_stat");
                quest[2] = stage.getIntQuestRecordExShare(200001, "key_base");
                quest[3] = stage.getIntQuestRecordExShare(200001, "key_small");
                txt = "#b目前累計抽獎：#r" + quest[0] + "#b 次\r\n";
                txt += "#b目前累計獲得超級獎勵 #e#r小獎/大獎 " + quest[1] + " #b#n次\r\n";
                txt += "#b本輪再抽獎 #r" + (5 - quest[3]) + "#b 次#r小獎必得大獎\r\n";
                txt += "#b本輪再抽獎 #r" + (10 - quest[2]) + "#b 次獎勵後必得 #r小獎/大獎\r\n";
                txt += "#b每次抽獎需要 #r50 #樂豆 目前擁有 #r" + stage.getCurrency(1) + " #b點\r\n";
                txt += "\r\n";
                txt += "#b獎勵介紹 [ #r抽中都是自選#b ]\r\n";
                txt += "#b每次沒有獲得#r小獎/大獎#b時給與";
                for (let i in marin[0]) {
                    txt += "#i" + marin[0][i] + "#";
                }
                txt += "\r\n";
                txt += "#b小獎獎勵如下:[#r每次抽取5%概率獲得小獎#b]\r\n";
                txt += "#r" + marin[1][Object.keys(marin[1])[0]].pro + "%";
                for (let i in marin[1][Object.keys(marin[1])[0]].key) {
                    txt += "#i" + marin[1][Object.keys(marin[1])[0]].key[i] + "#";
                }
                txt += "\r\n";
                txt += "#r" + marin[1][Object.keys(marin[1])[1]].pro + "%";
                for (let i in marin[1][Object.keys(marin[1])[1]].key) {
                    txt += "#i" + marin[1][Object.keys(marin[1])[1]].key[i] + "#";
                }
                txt += "\r\n";
                txt += "#b大獎獎勵如下[#r抽到小獎時20%概率#b] 且重置保底概率\r\n";
                txt += "#r" + marin[2][Object.keys(marin[2])[0]].pro + "%";
                for (let i in marin[2][Object.keys(marin[2])[0]].key) {
                    txt += "#i" + marin[2][Object.keys(marin[2])[0]].key[i] + "#";
                }
                txt += "\r\n";
                txt += "#r" + marin[2][Object.keys(marin[2])[1]].pro + "%";
                for (let i in marin[2][Object.keys(marin[2])[1]].key) {
                    txt += "#i" + marin[2][Object.keys(marin[2])[1]].key[i] + "#";
                }
                txt += "\r\n";
                txt += "#r" + marin[2][Object.keys(marin[2])[2]].pro + "%";
                for (let i in marin[2][Object.keys(marin[2])[2]].key) {
                    txt += "#i" + marin[2][Object.keys(marin[2])[2]].key[i] + "#";
                }
                if (name = npc.meFlip().minLen(1).maxLen(4).defText("是").askText(txt) == "是") {
                    if (stage.getCurrency(1) < 50) {
                        npc.meFlip().say("真可惜..感覺你下一個就是大獎呢！可是你沒有 50 樂豆!");
                        return;
                    }
                    stage.modifyCurrency(1, -50);
                    quest[0] += 1;
                    stage.updateQuestRecordExShare(200001, "key_total", String(quest[0]));
                    quest[2] += 1;
                    stage.updateQuestRecordExShare(200001, "key_base", String(quest[2]));
                    let mode = 0;
                    if ((10 - quest[2]) <= 0) {
                        mode = 1;
                        stage.updateQuestRecordExShare(200001, "key_base", "0");
                    }
                    if ((5 - quest[3]) <= 1) {
                        mode = 2;
                        stage.updateQuestRecordExShare(200001, "key_small", "0");
                    }
                    switch (mode) {
                        case 0:
                            random = marinrandom(0, 100);
                            if (random <= 5) {
                                mode = 1;
                                random = marinrandom(0, 100);
                                if (random <= 20) {
                                    mode = 2;
                                }
                            }
                            break;
                        case 1:
                            random = marinrandom(0, 100);
                            if (random <= 20) mode = 2;
                            break;
                    }
                    quest[0] = stage.getIntQuestRecordExShare(200001, "key_total");
                    quest[1] = stage.getIntQuestRecordExShare(200001, "key_stat");
                    quest[2] = stage.getIntQuestRecordExShare(200001, "key_base");
                    quest[3] = stage.getIntQuestRecordExShare(200001, "key_small");
                    let judge = false;
                    switch (mode) {
                        case 0:
                            count = stage.getIntQuestRecordExShare(300000, "scroll_X");
                            count += 1;
                            stage.updateQuestRecordExShare(300000, "scroll_X", String(count));
                            break;
                        case 1:
                            quest[1] += 1;
                            stage.updateQuestRecordExShare(200001, "key_stat", String(quest[1]));
                            quest[3] += 1;
                            stage.updateQuestRecordExShare(200001, "key_small", String(quest[3]));
                            random = marinrandom(0, 100);
                            if (random <= Object.keys(marin[1])[0]) {
                                count = stage.getIntQuestRecordExShare(300000, "scroll_V");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_V", String(count));
                                util.broadcastWorldChatMsg(0x16, "[ 稀有卷軸 樂豆 ] ：恭喜 " + stage.getCharacterName() + "　抽到 小獎 V系列 卷軸 累計 ：" + count);
                            } else {
                                count = stage.getIntQuestRecordExShare(300000, "scroll_DARK");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_DARK", String(count));
                                util.broadcastWorldChatMsg(0x16, "[ 稀有卷軸 樂豆 ] ：恭喜 " + stage.getCharacterName() + "　抽到 小獎 黑暗系列 卷軸 累計 ：" + count);
                            }
                            break;
                        case 2:
                            quest[1] += 1;
                            stage.updateQuestRecordExShare(200001, "key_stat", String(quest[1]));
                            stage.updateQuestRecordExShare(200001, "key_base", "0");
                            stage.updateQuestRecordExShare(200001, "key_small", "0");
                            random = marinrandom(0, 100);
                            if (random <= Object.keys(marin[2])[2]) {
                                count = stage.getIntQuestRecordExShare(300000, "scroll_FATE");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_FATE", String(count));
                                util.broadcastWorldChatMsg(0x15, "[ 稀有卷軸 樂豆 ] ：恭喜 " + stage.getCharacterName() + "　抽到 大獎 命運系列 卷軸 累計 ：" + count);
                            } else if (random > Object.keys(marin[2])[2] && random <= Object.keys(marin[2])[1]) {
                                count = stage.getIntQuestRecordExShare(300000, "scroll_GLORY");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_GLORY", String(count));
                                util.broadcastWorldChatMsg(0x15, "[ 稀有卷軸 樂豆 ] ：恭喜 " + stage.getCharacterName() + "　抽到 大獎 榮耀系列 卷軸 累計 ：" + count);
                            } else {
                                count = stage.getIntQuestRecordExShare(300000, "scroll_DARK");
                                count += 1;
                                stage.updateQuestRecordExShare(300000, "scroll_DARK", String(count));
                                util.broadcastWorldChatMsg(0x15, "[ 稀有卷軸 樂豆 ] ：恭喜 " + stage.getCharacterName() + "　抽到 大獎 黑暗系列 卷軸 累計 ：" + count);
                            }
                            break;
                    }
                }
            }
            break;
        case 2:
            marin = {
                RED: {
                    name: "RED 卷軸",
                    scroll: [2048812, 2048813, 2612019, 2612020, 2613012, 2613013, 2615005, 2615006, 2616000, 2616001]
                },
                X: {
                    name: "X 卷軸",
                    scroll: [2048815, 2048816, 2612055, 2612056, 2613048, 2613049, 2615029, 2615030, 2616059, 2616060]
                },
                V: {
                    name: "V 卷軸",
                    scroll: [2048819, 2048820, 2612074, 2612075, 2613062, 2613063, 2615041, 2615042, 2616072, 2616073]
                },
                DARK: {
                    name: "黑暗 卷軸",
                    scroll: [2048825, 2048826, 2612080, 2612081, 2613068, 2613069, 2615051, 2615052, 2616216, 2616217]
                },
                GLORY: {
                    name: "榮耀 卷軸",
                    scroll: [2048830, 2048831, 2612082, 2612083, 2613070, 2613071, 2615054, 2615055, 2616218, 2616219]
                },
                FATE: {
                    name: "命運 卷軸",
                    scroll: [2048848, 2048849, 2612089, 2612090, 2613076, 2613077, 2615060, 2615061, 2616224, 2616225]
                }
            };

            txt = "卷軸倉庫\r\n\r\n";
            Object.keys(marin).forEach((key, index) => {
                txt += "#L" + index + "##d" + marinString(" ", 10, String(marin[key].name).toString()) + "#r 數量 #d x " + stage.getIntQuestRecordExShare(300000, "scroll_" + key) + "#l\r\n";
            });
            url = npc.meFlip().askMenu(txt);

            while (true) {
                keys = Object.keys(marin);
                key = keys[url];
                value = marin[key];
                txt = "請選擇你想兌換的卷軸\r\n\r\n";
                bute = marin[key].scroll;
                for (let i in bute) {
                    if (i % 4 == 0) txt += "\r\n";
                    txt += "#L" + i + "##i" + bute[i] + ":##l";
                }
                ume = npc.meFlip().askMenu(txt);

                let scroll_num = stage.getIntQuestRecordExShare(300000, "scroll_" + key);
                if (scroll_num <= 0) {
                    npc.meFlip().say("抱歉..該類型卷軸你沒有多餘的!");
                    return;
                }
                txt = "\r\n";
                txt += marin[key].name + " 擁有數量 : #r" + scroll_num + "\r\n\r\n";
                txt += "請輸入你想兌換的數量\r\n ";
                num = npc.meFlip().minNum(1).maxNum(scroll_num).defNum(1).askNumber(txt);
                scroll_num = stage.getIntQuestRecordExShare(300000, "scroll_" + key);
                if (num > scroll_num) {
                    npc.meFlip().say("?????");
                    return;
                }
                if (npc.meFlip().askYesNo("確認兌換 " + num + " 數量這個卷軸嗎?") == 1) {
                    stage.gainItem(bute[ume], num);
                    scroll_num -= num;
                    stage.updateQuestRecordExShare(300000, "scroll_" + key, String(scroll_num));
                    npc.meFlip().say("兌換成功\r\n");
                }
            }
            break;
        case 3:
            while (true) {
                bute = [
                    ["RED 卷軸", "X 卷軸", "RED", 24, "X"],
                    ["X   卷軸", "V 卷軸", "X", 16, "V"],
                    ["黑暗 卷軸", "榮譽 卷軸", "DARK", 8, "GLORY"]
                ]
                txt = "升級卷軸\r\n\r\n";
                for (let i in bute) {
                    txt += "#L" + i + "##b" + bute[i][0] + " #d升級#r " + bute[i][1] + "#l\r\n";
                }
                url = npc.meFlip().askMenu(txt);

                count_1 = stage.getIntQuestRecordExShare(300000, "scroll_" + bute[url][2]);
                count_2 = stage.getIntQuestRecordExShare(300000, "scroll_" + bute[url][4]);
                txt = "\r\n";
                txt += bute[url][0] + " 擁有 " + count_1 + "\r\n";
                txt += bute[url][1] + " 擁有 " + count_2 + "\r\n";
                txt += "\r\n";
                txt += "#b消耗 " + bute[url][3] + " 升級至 1 個 " + bute[url][1] + "\r\n";
                txt += "最多可以升級 #r" + parseInt(count_1 / bute[url][3]) + " 個\r\n";
                txt += "請輸入你升級多少個 " + bute[url][1] + "\r\n ";
                num = npc.meFlip().minNum(1).maxNum(parseInt(count_1 / bute[url][3])).defNum(1).askNumber(txt);

                if (npc.meFlip().askYesNo("確認升級 " + num + " 個 " + bute[url][1] + " 嗎") == 1) {
                    count_1 -= num * bute[url][3];
                    count_2 += num;
                    stage.updateQuestRecordExShare(300000, "scroll_" + bute[url][2], String(count_1));
                    stage.updateQuestRecordExShare(300000, "scroll_" + bute[url][4], String(count_2));
                    npc.meFlip().say("恭喜!");
                }
            }
            break;
        case 4:
            while (true) {
                marin = {
                    RED: {
                        name: "RED 卷軸",
                        scroll: [2048812, 2048813, 2612019, 2612020, 2613012, 2613013, 2615005, 2615006, 2616000, 2616001]
                    },
                    X: {
                        name: "X 卷軸",
                        scroll: [2048815, 2048816, 2612055, 2612056, 2613048, 2613049, 2615029, 2615030, 2616059, 2616060]
                    },
                    V: {
                        name: "V 卷軸",
                        scroll: [2048819, 2048820, 2612074, 2612075, 2613062, 2613063, 2615041, 2615042, 2616072, 2616073]
                    },
                    DARK: {
                        name: "黑暗 卷軸",
                        scroll: [2048825, 2048826, 2612080, 2612081, 2613068, 2613069, 2615051, 2615052, 2616216, 2616217]
                    },
                    GLORY: {
                        name: "榮耀 卷軸",
                        scroll: [2048830, 2048831, 2612082, 2612083, 2613070, 2613071, 2615054, 2615055, 2616218, 2616219]
                    },
                    FATE: {
                        name: "命運 卷軸",
                        scroll: [2048848, 2048849, 2612089, 2612090, 2613076, 2613077, 2615060, 2615061, 2616224, 2616225]
                    }
                };
                txt = "請選擇你想回收的卷軸\r\n\r\n";
                Object.keys(marin).forEach((key, index) => {
                    txt += "#L" + index + "##d" + marinString(" ", 10, String(marin[key].name).toString()) + "#r 數量 #d x " + stage.getIntQuestRecordExShare(300000, "scroll_" + key) + "#l\r\n";
                });
                url = npc.meFlip().askMenu(txt);

                keys = Object.keys(marin);
                key = keys[url];
                value = marin[key];
                txt = "請選擇你想回收的卷軸\r\n\r\n";
                bute = marin[key].scroll;
                for (let i in bute) {
                    if (stage.hasItem(bute[i], 1)) {
                        txt += "#L" + i + "##i" + bute[i] + "# x " + stage.getItemQuantity(bute[i]) + "#l\r\n";
                    }
                }
                ume = npc.meFlip().askMenu(txt);

                scroll_num = stage.getIntQuestRecordExShare(300000, "scroll_" + key);
                txt = "回收說明\r\n\r\n";
                txt += "當前類型的數量:#r" + scroll_num + "#k\r\n";
                txt += "當前卷軸的數量:#r" + stage.getItemQuantity(bute[ume]) + "#k\r\n";
                txt += "\r\n";
                txt += "請輸入你想回收的數量\r\n ";
                num = npc.meFlip().minNum(1).maxNum(stage.getItemQuantity(bute[ume])).defNum(1).askNumber(txt);

                if (!stage.hasItem(bute[ume], num)) {
                    npc.meFlip().say("數量不準確??切勿開啟非法軟件!");
                    return;
                }

                if (npc.meFlip().askYesNo("確認兌換當前操作嗎?") == 1) {
                    stage.loseItem(bute[ume], num);
                    scroll_num += num;
                    stage.updateQuestRecordExShare(300000, "scroll_" + key, String(scroll_num));
                    npc.meFlip().say("回收成功!");
                }
            }
            break;
    }
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}
