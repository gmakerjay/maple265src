/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
player = require("check_log");
option = require("option_tabulation");
execute();

function execute() {
    let totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
    if (isInputNaN(totalmoney)) {
        stage.updateQuestRecordExShare(100000, "totalmoney", "0");
        totalmoney = 0;
    }
    let txt = "賬戶當前綁定楓幣為：#b" + (totalmoney / 1E8).toFixed(2) + "#k 億\r\n";
    txt += "這裡是綁定楓幣系統 < 賬號通用 >\r\n";
    txt += "可以利用綁定楓幣使用以下功能\r\n";
    txt += "#L0#存入楓幣 ( 存入後不可取出 )#l\r\n";
    txt += "#L1#購買潛能機器人#l\r\n";
    txt += "#L2#保存裝備附加潛能#l\r\n";
    txt += "#L3#獲取強力的屬性技能#l\r\n";
    txt += "#L4#抽取傷害字體#l\r\n";
    txt += "#L5#神秘航海回收中心#l\r\n";
    txt += "#L6#秘法符文真實符文強化#l\r\n";
    let sel = npc.meFlip().askMenu(txt);
    switch (sel) {
        case 0:
            txt = "\r\n";
            txt += "請輸入你想存入的數量 < #r計量單位 #b億#k >\r\n\r\n";
            txt += " ";
            let num = npc.meFlip().minNum(1).maxNum(9999).defNum(1).askNumber(txt);

            if (!stage.hasMesos(num * 1E8)) {
                npc.meFlip().say("抱歉..你沒有那麼多楓幣");
                return;
            }
            totalmoney += num * 1E8;
            stage.updateQuestRecordExShare(100000, "totalmoney", String(totalmoney));
            stage.loseMesos(num * 1E8);
            npc.meFlip().say("存入成功");
            execute();
            break;
        case 1:
            txt = "請選擇你想使用的功能\r\n";
            txt += "#L0#購買可潛能機器人#l\r\n";
            txt += "#L2#返回首頁#l\r\n";
            url = npc.meFlip().askMenu(txt);
            switch (url) {
                case 2:
                    execute();
                    break;

                case 0:
                    marin = [
                        [1662002, 250, true],
                        [1662003, 250, true],

                        [1662002, 350, false],
                        [1662003, 350, false]
                    ]
                    txt = stage.getCharacterName() + " 您好!在這裡可以選擇你想購買的商品,點擊圖片檢視價格購買\r\n";
                    for (var i in marin) {
                        txt += "#L" + i + "##i" + marin[i][0] + "##z" + marin[i][0] + "# [ " + marinString(" ", 3, marin[i][1].toString()) + " ] 億" + (marin[i][2] ? "楓幣" : "綁定金") + "#l\r\n"
                    }
                    txt += "\r\n ";
                    url = npc.meFlip().askMenu(txt);
                    if (npc.meFlip().askYesNo("是否立即購買#i" + marin[url][0] + "# 消耗 " + marin[url][1] + " 億" + (marin[url][2] ? "楓幣" : "綁定金")) != 1) return;
                    var judge = marin[url][2];
                    if (judge) {
                        if (!stage.hasMesos(marin[url][1] * 1E8)) {
                            npc.meFlip().say("抱歉..你沒有 " + marin[url][1] + " 億楓幣");
                            return;
                        }
                        stage.loseMesos(marin[url][1] * 1E8);
                    } else {
                        totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
                        if (totalmoney < marin[url][1] * 1E8) {
                            npc.meFlip().say("抱歉..你沒有 " + marin[url][1] + " 億 綁金");
                            return;
                        }
                        totalmoney -= marin[url][1] * 1E8;
                        stage.updateQuestRecordExShare(100000, "totalmoney", String(totalmoney));
                    }
                    Equip = util.makeItem(marin[url][0], 1);
                    Equip.setGrade(18);
                    Equip['attribute'] = 8;
                    Equip.setOption1(10001);
                    Equip.setOption2(10001);
                    Equip.setOption3(10001);
                    stage.gainItem(Equip);
                    npc.meFlip().say("購買成功");
                    break;
            }
            break;
        case 2:
            txt = "附加潛能保管箱\r\n\r\n";
            txt += "每件專屬物品的附加潛能只允許保留 < 5 >\r\n";
            txt += "儲存附加潛能並不消耗任何綁金\r\n";
            txt += "若替換附加潛能將消耗 5000 萬楓幣\r\n";
            txt += "需保留附加潛能的物品放置 [ 1 ]位置\r\n";
            txt += "\t\t\t#r沒有其他疑問進入保管箱\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            let option_equip = stage.getItemBySlot(1, 1);
            if (option_equip == null) {
                npc.meFlip().say("抱歉..背包[ 1 ]位置沒有任何物品!");
                return;
            }
            stage.dropMessage(0x15, option_equip.getOption4())
            stage.dropMessage(0x15, option_equip.getOption5())
            stage.dropMessage(0x15, option_equip.getOption6())
            txt = "附加潛能保管中心\r\n\r\n";
            txt += "#i" + option_equip['itemId'] + "# #z" + option_equip['itemId'] + "#\r\n";
            for (let i = 1; i <= 5; i++) {
                let equip_custom = getCustomData(option_equip['id'], "marin_key_" + i);
                let equip_resuom = (equip_custom == null || equip_custom == "null") ? true : false;
                txt += "#d#L" + i + "#保管箱 [ #r" + i + "#d ] < " + (equip_resuom ? "#b空閒" : "#r使用中") + " >#l\r\n";
            }
            url = npc.meFlip().askMenu(txt);
            if (option_equip['grade'] != 20) {
                npc.meFlip().say("抱歉..只有 傳說 級別物品才允許使用");
                return;
            }
            equip_custom = getCustomData(option_equip['id'], "marin_key_" + url);
            equip_resuom = (equip_custom == null || equip_custom == "null") ? true : false;

            if (equip_resuom) {
                txt = "附加潛能保管箱\r\n\r\n";
                txt += "#i" + option_equip['itemId'] + "# #z" + option_equip['itemId'] + "#\r\n";
                let result = [];
                let judge = true;
                for (let i = 4; i <= 6; i++) {
                    if (option_equip['option' + i] <= 0) judge = false;
                }
                if (!judge) {
                    npc.meFlip().say("請確保當前物品附加 1 2 3 都有潛能");
                    return;
                }
                for (let i = 4; i <= 6; i++) {
                    result[i] = [];
                    result[i][0] = option_equip['option' + i];
                    let option_name = option.tabulation[result[i][0]][parseInt(util.getItemReqLevel(option_equip['itemId']) / 10)];
                    result[i][1] = "#d" + marinString(" ", 40, String(option_name).toString())
                }
                txt += "#d [ 1 ] " + result[4][1] + "\r\n";
                txt += "#d [ 2 ] " + result[5][1] + "\r\n";
                txt += "#d [ 3 ] " + result[6][1] + "\r\n";
                txt += "\r\n";
                txt += "#r\t\t\t\t確認保留當前附加潛能嗎?\r\n";
                yeno = npc.meFlip().askYesNo(txt);
                if (yeno != 1) return;
                key = [];
                key.push(option_equip.getOption4());
                key.push(option_equip.getOption5());
                key.push(option_equip.getOption6());
                setCustomData(option_equip['id'], "marin_key_" + url, key);
                npc.meFlip().say("恭喜..保留成功");
            } else {
                txt = "附加潛能保管箱\r\n\r\n";
                txt += "#L0##r覆蓋附加潛能#l\t\t\t#L1#刪除附加潛能#l#d\r\n\r\n\r\n";
                txt += "物品：#i" + option_equip['itemId'] + "##z" + option_equip['itemId'] + "#\r\n\r\n";
                Custom = getCustomData(option_equip['id'], "marin_key_" + url);
                customData = Custom.split(",");
                result = [];
                for (let i = 0; i <= 2; i++) {
                    result[i] = [];
                    result[i][0] = customData[i];
                    option_name = option.tabulation[result[i][0]][parseInt(util.getItemReqLevel(option_equip['itemId']) / 10)];
                    result[i][1] = "#d" + marinString(" ", 40, String(option_name).toString())
                }
                txt += "#d [ #r1#d ] #b" + result[0][1] + "\r\n";
                txt += "#d [ #r2#d ] #b" + result[1][1] + "\r\n";
                txt += "#d [ #r3#d ] #b" + result[2][1] + "\r\n";
                rue = npc.meFlip().askMenu(txt);
                switch (rue) {
                    case 0:
                        if (!stage.hasMesos(50000000)) {
                            npc.meFlip().say("抱歉..你沒有 " + 5000 + " 萬 楓幣");
                            return;
                        }
                        stage.loseMesos(50000000);
                        option_equip = stage.getItemBySlot(1, 1);
                        /*
                        key = [];
                        key.push(option_equip.getOption4());
                        key.push(option_equip.getOption5());
                        key.push(option_equip.getOption6());
                        setCustomData(option_equip['id'], "marin_key_" + url, key);
                        */
                        option_equip.setOption4(result[0][0]);
                        option_equip.setOption5(result[1][0]);
                        option_equip.setOption6(result[2][0]);
                        stage.updateItemBySlot(1, 1);

                        npc.meFlip().say("恭喜..替換成功");
                        break;

                    case 1:
                        if (npc.meFlip().askYesNo("確認刪除當前附加潛能保管箱嗎?") == 1) {
                            setCustomData(option_equip['id'], "marin_key_" + url, null);
                            npc.meFlip().say("恭喜..刪除成功");
                        }
                        break;
                }
            }
            break;
        case 3:
            txt = "\r\n";
            txt += "#L0#查看屬性介紹#l\r\n\r\n";
            if (stage.getSkillLevel(80012257) <= 0) {
                txt += "#L1#購買#s80012257##l\r\n";
            } else {
                if (stage.getSkillLevel(80012257) <= 3) {
                    txt += "#L1#提升#s80012257##l\r\n";
                }
            }
            if (player.getEventValue(stage, db, "key_80012257") <= 0) {
                txt += "#L2#共享 <#s80012257#> 賬號共用#l\r\n\r\n";
            }

            if (stage.getSkillLevel(80011480) <= 0) {
                txt += "#L3#購買#s80011480##l\r\n";
            }
            if (player.getEventValue(stage, db, "key_80011480") <= 0) {
                txt += "#L4#共享 <#s80011480#> 賬號共用#l\r\n\r\n";
            }
            url = npc.meFlip().askMenu(txt);

            switch (url) {
                case 0:
                    txt = "";
                    txt += "屬性介紹：對應1/2/3/4級\r\n";
                    txt += "全屬性提升：25/50/75/100\r\n";
                    txt += "攻擊力/魔法力提升：10/20/30/40\r\n";
                    txt += "BOSS傷害提升：5/10/15/25\r\n";
                    txt += "暴擊幾率提升：5/5/5/5\r\n";
                    txt += "暴擊傷害提升：3/6/9/12\r\n";
                    txt += "最終傷害提升：2/4/6/8\r\n";
                    npc.meFlip().say(txt);
                    execute();
                    break;
                case 2:
                    var marin_hrune = [500, 800];
                    if (stage.getSkillLevel(80012257) < 4) {
                        npc.meFlip().say("抱歉..必須將此技能提升至最高階段才允許共享");
                        return;
                    }
                    txt = "";
                    txt += "#s" + 80012257 + "#\r\n ";
                    txt += "共享賬號通用\r\n";
                    txt += "請選擇支付方式：\r\n\r\n";
                    txt += "#r #L1# 使用 " + marin_hrune[0] + " E 楓幣#l\r\n";
                    txt += "#r #L2# 使用 " + marin_hrune[1] + " E 綁定楓幣#l\r\n";
                    run = npc.meFlip().askMenu(txt);
                    if (npc.meFlip().askYesNo("確認將#s80012257#共享至賬號通用並消耗 " + (run == 1 ? marin_hrune[0] : marin_hrune[1]) + " 億 嗎？") == 1) {
                        switch (run) {
                            case 1:
                                if (!stage.hasMesos(marin_hrune[0] * 1E8)) {
                                    npc.meFlip().say("抱歉..你沒有" + marin_hrune[0] + " 億楓幣");
                                    return;
                                }
                                stage.loseMesos(marin_hrune[0] * 1E8);
                                break;

                            case 2:
                                totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
                                if (totalmoney < marin_hrune[1] * 1E8) {
                                    npc.meFlip().say("抱歉..你沒有 " + marin_hrune[1] + " 綁金");
                                    return;
                                }
                                totalmoney -= marin_hrune[1] * 1E8;
                                stage.updateQuestRecordExShare(100000, "totalmoney", String(totalmoney));
                                break;
                        }

                        var Gac = Getacount();
                        if (Gac == null) {
                            npc.meFlip().say("抱歉..你並沒有其他角色可以共享");
                            return;
                        }
                        for (var i in Gac) {
                            db.update("DELETE FROM `character_skill_record` WHERE `character_id` = " + Gac[i].id + " AND `skill_id` = 80012257");
                            db.insert("INSERT INTO `character_skill_record` (`character_id`, `skill_id`, `option`, `expire_date`, `master_level`) VALUES (" + Gac[i].id + ", 80012257, 1, '2078-12-01 00:00:00', 1)");
                        }
                        player.addEventValue(stage, db, "key_80012257", 1, -1);
                        npc.meFlip().say("恭喜...共享成功 立即生效");
                        execute();
                    }
                    break;
                case 1:
                    var marin_hrune = [
                        [250, 250],
                        [250, 250],
                        [250, 250],
                        [250, 250]
                    ]
                    var lvnum = stage.getSkillLevel(80012257);
                    txt = "";
                    txt += "#s" + 80012257 + "#\r\n ";
                    txt += "等級 " + lvnum + " > > " + (lvnum + 1) + "\r\n";
                    txt += "請選擇支付方式：\r\n\r\n";
                    txt += "#r #L1# 使用 " + marin_hrune[lvnum][0] + " E 楓幣 加 " + marin_hrune[lvnum][1] + " E 綁金#l\r\n";
                    run = npc.meFlip().askMenu(txt);

                    if (!stage.hasMesos(marin_hrune[lvnum][0] * 1E8)) {
                        npc.meFlip().say("抱歉..你沒有" + marin_hrune[lvnum][0] + " 億楓幣");
                        return;
                    }
                    totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
                    if (totalmoney < marin_hrune[lvnum][1] * 1E8) {
                        npc.meFlip().say("抱歉..你沒有 " + marin_hrune[lvnum][1] + " 綁金");
                        return;
                    }
                    totalmoney -= marin_hrune[lvnum][1] * 1E8;
                    stage.updateQuestRecordExShare(100000, "totalmoney", String(totalmoney));
                    stage.loseMesos(marin_hrune[lvnum][0] * 1E8);
                    stage.changeSkillLevel(80012257, lvnum + 1);
                    npc.meFlip().say("購買成功");
                    execute();
                    break;

                case 3:
                    var marin_hrune = [500, 500];
                    txt = "";
                    txt += "#s" + 80011480 + "#\r\n ";
                    txt += "等級 0 > > 1\r\n";
                    txt += "請選擇支付方式：\r\n\r\n";
                    txt += "#r #L1# 使用 " + marin_hrune[0] + " E 楓幣 加 " + marin_hrune[1] + " E 綁金#l\r\n";
                    run = npc.meFlip().askMenu(txt);
                    if (!stage.hasMesos(marin_hrune[0] * 1E8)) {
                        npc.meFlip().say("抱歉..你沒有" + marin_hrune[0] + " 億楓幣");
                        return;
                    }
                    totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
                    if (totalmoney < marin_hrune[1] * 1E8) {
                        npc.meFlip().say("抱歉..你沒有 " + marin_hrune[1] + " 綁金");
                        return;
                    }
                    stage.loseMesos(marin_hrune[0] * 1E8);
                    totalmoney -= marin_hrune[1] * 1E8;
                    stage.updateQuestRecordExShare(100000, "totalmoney", String(totalmoney));
                    stage.changeSkillLevel(80011480, 1);
                    npc.meFlip().say("購買成功");
                    execute()
                    break;

                case 4:
                    var marin_hrune = [500, 800];
                    if (stage.getSkillLevel(80011480) < 1) {
                        npc.meFlip().say("抱歉..必須將此技能提升至最高階段才允許共享");
                        return;
                    }
                    txt = "";
                    txt += "#s" + 80011480 + "#\r\n ";
                    txt += "共享賬號通用\r\n";
                    txt += "請選擇支付方式：\r\n\r\n";
                    txt += "#r #L1# 使用 " + marin_hrune[0] + " E 楓幣#l\r\n";
                    txt += "#r #L2# 使用 " + marin_hrune[1] + " E 綁定楓幣#l\r\n";
                    run = npc.meFlip().askMenu(txt);
                    if (npc.meFlip().askYesNo("確認將#s80011480#共享至賬號通用並消耗 " + (run == 1 ? marin_hrune[0] : marin_hrune[1]) + "億 嗎？") == 1) {
                        switch (run) {
                            case 1:
                                if (!stage.hasMesos(marin_hrune[0] * 1E8)) {
                                    npc.meFlip().say("抱歉..你沒有" + marin_hrune[0] + " 億楓幣");
                                    return;
                                }
                                stage.loseMesos(marin_hrune[0] * 1E8);
                                break;

                            case 2:
                                totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
                                if (totalmoney < marin_hrune[1] * 1E8) {
                                    npc.meFlip().say("抱歉..你沒有 " + marin_hrune[1] + " 綁金");
                                    return;
                                }
                                totalmoney -= marin_hrune[1] * 1E8;
                                stage.updateQuestRecordExShare(100000, "totalmoney", String(totalmoney));
                                break;
                        }

                        var Gac = Getacount();
                        if (Gac == null) {
                            npc.meFlip().say("抱歉..你並沒有其他角色可以共享");
                            return;
                        }
                        for (var i in Gac) {
                            db.update("DELETE FROM `character_skill_record` WHERE `character_id` = " + Gac[i].id + " AND `skill_id` = 80011480");
                            db.insert("INSERT INTO `character_skill_record` (`character_id`, `skill_id`, `option`, `expire_date`, `master_level`) VALUES (" + Gac[i].id + ", 80011480, 1, '2078-12-01 00:00:00', 1)");
                        }
                        player.addEventValue(stage, db, "key_80011480", 1, -1);
                        npc.meFlip().say("恭喜...共享成功 立即生效");
                        execute();
                    }
                    break;
            }
        case 4:
            group = [
                2630380, 2635996, 2635966, 2636151, 2439395, 2439572, 2630380, 2630753, 2630969, 2634906, 2438871, 2439337, 2631095, 2631451, 2631893, 2632124, 2632350, 2632288, 2632816, 2635689,
                2633047, 2633074, 2633306, 2633995, 2634020, 2634268, 2634514, 2634728, 2634811, 2634941, 2635128, 2635056, 2635233, 2635469,
                2635794, 2635782, 2435293, 2431965, 2431966, 2431967, 2432131, 2432354, 2432355, 2432465, 2432479, 2432591, 2432592,
                2432836, 2433038, 2433063, 2433178, 2433182, 2433183, 2433184, 2433197, 2433252, 2433804, 2433828, 2433829, 2433830, 2433831,
                2433832, 2433833, 2433980, 2433981, 2434045, 2434051, 2434053, 2434055, 2434057, 2434081, 2434273, 2434274, 2434289, 2434374,
                2434391, 2434528, 2434529, 2434530, 2434542, 2434544, 2434545, 2434546, 2434574, 2434575, 2434654, 2434655, 2434658,
                2434661, 2434710, 2434734, 2434818, 2434824, 2434868, 2434875, 2434877, 2434879, 2434950, 2434951, 2434977,
                2435026, 2435027, 2435028, 2435029, 2435030, 2435043, 2435044, 2435046, 2435047, 2435140, 2435141, 2435158, 2435313,
                2435162, 2435166, 2432640, 2432661, 2432710
            ]
            txt = "                      傷害字體轉蛋機\r\n";
            txt += "- - - - - - - - - - - - - - - - - - - - - - - - - - - \r\n";
            txt += "   使用#b1E楓幣或1.2E綁金#k就可以抽取所有傷害字體如下列所示\r\n";
            txt += "     #L1#綁金 立即抽取#l\r\n\r\n\r\n";
            url = npc.meFlip().askMenu(txt);
            while (true) {
                switch (url) {
                    case 0:
                        if (!stage.hasMesos(1E8)) {
                            stage.dropAlertNotice("抱歉..你沒有 1 億楓幣");
                            return;
                        }
                        stage.loseMesos(1E8);

                        var n = Math.floor(Math.random() * group.length + 1) - 1;
                        stage.gainItem(group[n], 1);
                        npc.meFlip().say("恭喜 抽到了 #i" + group[n] + ":##z" + group[n] + "#");
                        break;
                    case 1:
                        totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
                        if (totalmoney < 120000000) {
                            stage.dropAlertNotice("抱歉..你沒有 1.2 億綁金");
                            return;
                        }
                        totalmoney -= 120000000
                        stage.updateQuestRecordExShare(100000, "totalmoney", String(totalmoney));

                        n = Math.floor(Math.random() * group.length + 1) - 1;
                        stage.gainItem(group[n], 1);
                        npc.meFlip().say("恭喜 抽到了 #i" + group[n] + ":##z" + group[n] + "#");
                        break;
                }
            }
            break;
        case 5:
            marin = {
                /* 航海武器 */
                200: [[1404018,1212115,1404017, 1213017, 1214017, 1222109, 1232109, 1242116, 1252093, 1262017, 1272016, 1292017, 1302333, 1312199, 1332274, 1362135, 1372222, 1382259, 1402251, 1403017, 1412177, 1422184, 1432214, 1442268, 1452252, 1462239, 1472261, 1482216, 1492231, 1522138, 1532144, 1542108, 1552110, 1582017, 1592019]],

                /* 神秘武器 */
                9000: [[1212120, 1213018, 1214018, 1222113, 1232113, 1242121, 1242122, 1252098, 1262039, 1272017, 1282017, 1292018, 1302343, 1312203, 1322255, 1332279, 1342104, 1362140, 1372228, 1382265, 1402259, 1403018, 1412181, 1422189, 1432218,
                    1442274, 1452257, 1462243, 1472265, 1482221, 1492235, 1522143, 1532150, 1542117, 1552119, 1582023, 1592020]],

                /* 航海防具 */
                100: [[1004422, 1004423, 1004424, 1004425, 1004426, 1005823, 1052882, 1052887, 1052888, 1052889, 1052890, 1073030, 1073032, 1073033, 1073034, 1073035, 1082636, 1082637, 1082638, 1082639, 1082640, 1102775, 1102794, 1102795, 1102796, 1102797]],

                /* 神秘防具 */
                4500: [[1004808, 1004809, 1004810, 1004811, 1004812, 1053063, 1053064, 1053065, 1053066, 1053067, 1073158, 1073159, 1073160, 1073161, 1073162, 1082695, 1082696, 1082697, 1082698, 1082699, 1102940, 1102941, 1102942, 1102943, 1102944, 1152196, 1152197, 1152198, 1152199, 1152200]],
            }
            while (true) {
                txt = "#b請選擇你想分解的物品 (#r每周一0點重置次數#b)\r\n\r\n";
                txt += "#d航海 武器or防具 #r" + player.getEventValue(stage, db, "分解_航海") + "#b / #r5次\r\n";
                txt += "#d神秘 武器or防具 #r" + player.getEventValue(stage, db, "分解_神秘") + "#b / #r3次\r\n\r\n";
                var judge = false;
                for (var i = 1; i <= 128; i++) {
                    var Equip = stage.getItemBySlot(1, i);
                    if (Equip != null) {
                        var equipId = Equip['itemId'];
                        var equipType = getEquipType(equipId);
                        if (marin[equipType] && marin[equipType][0].includes(equipId)) {
                            txt += "#L" + i + "##i" + equipId + ":##d背包位置 [ #r" + marinString(" ", 3, i.toString()) + "#d ] #r分解 #b" + marinString(" ", 5, equipType.toString()) + "#k 個 #i2431195##l\r\n";
                            judge = true;
                        }
                    }
                }
                if (!judge) {
                    txt += "#r#e　　抱歉..當前沒有可分解的物品\r\n";
                    npc.meFlip().say(txt);
                    return;
                }
                txt += "\r\n ";
                url = npc.meFlip().askMenu(txt);

                Equip = stage.getItemBySlot(1, url);
                txt = "\r\n";
                txt += "是否確認回收 #i" + Equip['itemId'] + "# 這個物品？\r\n";
                yes = npc.meFlip().askYesNo(txt);

                if (yes != 1) return;

                var equipType = getEquipType(Equip['itemId']);
                if (marin[equipType] && marin[equipType][0].includes(Equip['itemId'])) {
                    switch (parseInt(equipType)) {
                        case 100:
                        case 200:
                            if (player.getEventValue(stage, db, "分解_航海") >= 5) {
                                npc.meFlip().say("抱歉..航海每週只能分解 3 回");
                                return;
                            }
                            player.addEventValue(stage, db, "分解_航海", 1, getDaysUntilNextMonday());
                            break;
                        case 4500:
                        case 9000:
                            if (player.getEventValue(stage, db, "分解_神秘") >= 3) {
                                npc.meFlip().say("抱歉..航海每週只能分解 3 回");
                                return;
                            }
                            player.addEventValue(stage, db, "分解_神秘", 1, getDaysUntilNextMonday());
                            break;
                    }
                    if (stage.getFreeSlot(2) < 1) {
                        npc.meFlip().say("抱歉..你必須空出一個位置");
                        return;
                    }
                    txt = "\r\n";
                    txt += "回收成功\r\n\r\n獲得了 " + equipType + " 個 #i2431195#\r\n";
                    stage.gainItem(2431195, equipType);
                    stage.removeItemBySlot(1, url);
                    npc.meFlip().say(txt);
                }
            }
            break;
        case 6:
            marin = {
                1713000: [7, [2, 2.8, 3.8, 4.5, 5.3, 6.2, 7.1], 1, true],
                1713001: [7, [2, 3, 4, 4.9, 5.9, 6.9, 7.9], 1, true],
                1713002: [7, [2.2, 3.3, 4.3, 5.4, 6.5, 7.6, 8.7], 1, true],

                1712001: [11, [0.08, 0.11, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35, 0.39, 0.43, 0.47], 0, false],
                1712002: [11, [0.11, 0.16, 0.21, 0.26, 0.31, 0.36, 0.41, 0.46, 0.51, 0.56, 0.61], 0, false],
                1712003: [11, [0.15, 0.2, 0.25, 0.3, 0.35, 0.41, 0.46, 0.51, 0.56, 0.61, 0.66], 0, false],
                1712004: [11, [0.17, 0.23, 0.29, 0.35, 0.41, 0.47, 0.52, 0.58, 0.65, 0.77, 0.83], 0, false],
                1712005: [11, [0.17, 0.23, 0.29, 0.35, 0.41, 0.47, 0.52, 0.58, 0.65, 0.77, 0.83], 0, false],
                1712006: [11, [0.17, 0.23, 0.29, 0.35, 0.41, 0.47, 0.52, 0.58, 0.65, 0.77, 0.83], 0, false]
            }
            txt = "需將物品放置[1]位置\r\n";
            txt += "神秘球提升階段 　#r1-11 超過不允許使用#k\r\n";
            txt += "真實符文提升階段 #r1-7  超過不允許使用#k\r\n\r\n";
            txt += "\t\t\t確認無誤開始進行強化\r\n";
            yeno = npc.meFlip().askYesNo(txt);
            if (yeno != 1) return;
            Equip = stage.getItemBySlot(1, 1);
            if (Equip == null) {
                npc.meFlip().say("抱歉[1]位置不能留空");
                return;
            }
            var marin_ARC = marin[Equip['itemId']] || null;
            if (marin_ARC == null) {
                var keys = Object.keys(marin);
                txt = "抱歉..[1]物品並非神秘球系列 or 秘法符文系列 \r\n\r\n";
                for (var i in keys) {
                    txt += "#i" + keys[i] + "#"
                }
                npc.meFlip().say(txt);
                return;
            }
            if ((marin_ARC[3] ? Equip.getAutLevel() : Equip.getArcLevel()) >= marin_ARC[0]) {
                npc.meFlip().say("抱歉..抱歉 " + marin_ARC[0] + " 以上禁止綁金強化");
                return;
            }
            let marin_ARC_MAX = getArcMaxExp((marin_ARC[3] ? Equip.getAutLevel() : Equip.getArcLevel()))[marin_ARC[2]];
            txt = "秘法符文強化中心\r\n\r\n";
            txt += "當前 : #i" + Equip['itemId'] + "##z" + Equip['itemId'] + "#\r\n";
            txt += "級別 : " + (marin_ARC[3] ? Equip.getAutLevel() : Equip.getArcLevel()) + "  ( " + (marin_ARC[3] ? Equip.getAutExp() : Equip.getArcExp()) + "/" + marin_ARC_MAX + " )\r\n";
            txt += "綁金 : " + (marin_ARC[3] ? marin_ARC[1][Equip.getAutLevel() - 1] : marin_ARC[1][Equip.getArcLevel() - 1]) + " 億\r\n\r\n";
            txt += "\t\t\t確認強化當前符文秘法嗎？\r\n";
            yeno = npc.meFlip().askYesNo(txt);
            if (yeno != 1) return;

            if ((marin_ARC[3] ? Equip.getAutExp() : Equip.getArcExp()) < marin_ARC_MAX) {
                npc.meFlip().say("抱歉..你升級經驗沒有達標");
                return;
            }
            totalmoney = parseInt(stage.getQuestRecordExShare(100000, "totalmoney") || 0);
            var usemoney = parseInt((marin_ARC[3] ? marin_ARC[1][Equip.getAutLevel() - 1] : marin_ARC[1][Equip.getArcLevel() - 1]) * 1E8);
            if (totalmoney < usemoney) {
                npc.meFlip().say("抱歉..你沒有" + usemoney / 1E8 + "億綁金");
                return;
            }
            totalmoney -= usemoney
            stage.updateQuestRecordExShare(100000, "totalmoney", String(totalmoney));
            (marin_ARC[3] ? Equip['autExp'] -= marin_ARC_MAX : Equip['arcExp'] -= marin_ARC_MAX);
            (marin_ARC[3] ? Equip.setAutLevel(Equip.getAutLevel() + 1) : Equip.setArcLevel(Equip.getArcLevel() + 1));
            attbute = ['baseStr', 'baseDex', 'baseInt', 'baseLuk'];
            for (let i in attbute) {
                if (Equip[attbute[i]] > 0) {
                    Equip[attbute[i]] += (marin_ARC[3] ? 200 : 100);
                    (marin_ARC[3] ? Equip['aut'] += 10 : Equip['arc'] += 10);
                }
            }
            stage.updateItemBySlot(1, 1);
            npc.meFlip().say("恭喜強化成功了");
            break;
    }
}

function getArcMaxExp(ARCLEVEL) {
    switch (ARCLEVEL) {
        case 1:
            return [12, 29];
        case 2:
            return [15, 76];
        case 3:
            return [20, 141];
        case 4:
            return [27, 224];
        case 5:
            return [36, 325];
        case 6:
            return [47, 444];
        case 7:
            return [60, 581];
        case 8:
            return [75, 736];
        case 9:
            return [92, 29];
        case 10:
            return [111, 29];
        case 11:
            return [132, 29];
        case 12:
            return [155, 29];
    }
}

function getEquipType(equipId) {
    // 根据装备ID判断装备类型
    for (var type in marin) {
        if (marin[type][0].includes(equipId)) {
            return type;
        }
    }
    return 0; // 未知类型
}

function getDaysUntilNextMonday() {
    var today = new Date();
    var currentDayOfWeek = today.getDay();
    var daysUntilNextMonday = 0;
    if (currentDayOfWeek === 1) {
        daysUntilNextMonday = 7;
    } else {
        daysUntilNextMonday = (1 - currentDayOfWeek + 7) % 7;
    }
    return daysUntilNextMonday;
}

function getItemType(itemid) {
    var type = Math.floor(itemid / 10000);
    switch (type) {
        case 114:
            return 0;//稱號
        case 166:
        case 167:
            return 1;//機器人 心臟
        case 118:
            return 2;//徽章
        case 116:
            return 3;//口袋
        default:
            return -1;
    }
}

function isInputNaN(value) {
    return isNaN(value);
}

function Getacount() {
    var ret = db.select("SELECT `id` FROM `character` WHERE `account_id` = '" + stage.getAccountId() + "' AND `id` <> '" + stage.getCharacterId() + "' LIMIT 0,1000");
    if (ret.length <= 0) {
        return null;
    } else {
        var A = [];
        for (var i in ret) {
            var B = [];
            B['id'] = ret[i].get('id');
            A.push(B);
        }
        return A;
    }
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}

function getCustomData(onyID, data) {
    var sql = "SELECT * FROM `marin_customdata` WHERE `id` = '" + onyID + "' LIMIT 1;";
    var ret = db.select(sql);
    if (ret.length <= 0) {
        return null;
    } else {
        var split = [];
        split = ret[0].get('customData').split(";");
        for (var n in split) {
            var splitB = split[n].split("=");
            if (splitB.length != 2 || !splitB[0].equals(data)) continue;
            return splitB[1];
        }
        return null;
    }
}

function setCustomData(onyID, key, value) {
    var Equip = stage.getItemBySlot(1, 1);
    var sql = "SELECT * FROM `marin_customdata` WHERE `id` = '" + onyID + "' LIMIT 1;";
    var ret = db.select(sql);
    if (ret.length <= 0) {
        db.insert("INSERT INTO `marin_customdata`(`id`, `itemid`, `customData`) VALUES (" + onyID + ", " + Equip['itemId'] + ", '" + key + "=" + value + "');");
        return;
    }
    if (ret[0].get('customData').indexOf(key) <= -1) {
        var info = ret[0].get('customData');
        info = info + ";" + key + "=" + value;
        db.update("UPDATE `marin_customdata` SET `customData` = '" + info + "' WHERE `id` = " + onyID + ";")
        return;
    }
    var split = [];
    split = ret[0].get('customData').split(";");
    var changed = false;
    var newsplit = new StringBuilder();
    for (var n in split) {
        var splitB = split[n].split("=");
        if (splitB.length != 2) continue;
        if (splitB[0].equals(key)) {
            newsplit.append(key);
            newsplit.append("=");
            newsplit.append(value);
            changed = true;
        } else {
            newsplit.append(split[n]);
        }
        newsplit.append(";");
    }
    if (!changed) {
        newsplit.append(key);
        newsplit.append("=");
        newsplit.append(value);
    }
    var ret = db.select(sql);
    var info = ret[0].get('customData');
    var newInfo = key + "=" + value;
    var beforeStat = info.substring(0, info.indexOf(key));
    var from = info.indexOf(";", info.indexOf(key) + key.length);
    var afterStat = from == -1 ? "" : info.substring(from + 1);
    var write = String(beforeStat) + String(newInfo) + (afterStat.length != 0 ? ";" + afterStat : "");
    db.update("UPDATE `marin_customdata` SET `customData` = '" + write + "' WHERE `id` = " + onyID + ";")
}

function StringBuilder() {
    this.arr = new Array();
    this.append = function (str) {
        this.arr.push(str);
    }
    this.tostring = function () {
        return this.arr.join('');
    }
}