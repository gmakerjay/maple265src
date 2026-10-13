/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

money = require("marin_7");
marin = exports;
let money_skills = {
    1000: 1,
    2500: 2,
    4500: 3,
    7000: 4,
    10000: 5,
    15000: 6,
    20000: 7,
    30000: 8,
    50000: 9,
    88888: 10
}
marin.showinfo = function (npc, stage, db, util, dir) {
    let txt = "當前星語幣：#r" + money.get(stage, db) + "#k\r\n\r\n";
    txt += "#L0#兌換樂豆 or 楓點#l\r\n";
    txt += "#L1#購買套裝#l\r\n";
    txt += "#L2#贊助禮包#l\r\n";
    //txt += "#fc0xFFCD3333##L6#限時三終怪怪合成#l\r\n";
    txt += "#L5##d累計充值技能#l\r\n";
    txt += "#L3##r內地充值渠道#l\r\n";
    txt += "#L4##b國際充值渠道#l\r\n";
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            txt = "#b目前你擁有星語幣：#r" + money.get(stage, db) + "#b 個\r\n";
            txt += "#b當前比例 #r1#b 星語幣 { #r50#b 樂豆 #r100#b 楓點 }\r\n";
            txt += "#b單次兌換滿 #r300#b   星語幣額外贈送 #r10   #b星語幣\r\n";
            txt += "#b單次兌換滿 #r500#b   星語幣額外贈送 #r20   #b星語幣\r\n";
            txt += "#b單次兌換滿 #r1000#b  星語幣額外贈送 #r50   #b星語幣\r\n";
            txt += "#b單次兌換滿 #r2000#b  星語幣額外贈送 #r120  #b星語幣\r\n";
            txt += "#b單次兌換滿 #r3000#b  星語幣額外贈送 #r300  #b星語幣\r\n";
            txt += "#b單次兌換滿 #r5000#b  星語幣額外贈送 #r520  #b星語幣\r\n";
            txt += "#b單次兌換滿 #r10000#b 星語幣額外贈送 #r1111 #b星語幣\r\n";
            let num = npc.meFlip().minNum(1).maxNum(money.get(stage, db)).defNum(1).askNumber(txt);

            if (num > money.get(stage, db)) {
                npc.say("你沒有那麼多星語幣!");
                return;
            }
            txt = txt = "#b目前你擁有星語幣：#r" + money.get(stage, db) + "#b 個\r\n";
            txt += "#b當前消耗 #r" + num + " #b星語幣\r\n\r\n";
            txt += "#b樂豆：#r" + num * 50 + " #b楓點: #r" + num * 100 + "\r\n";
            let bonusPoints = calculateBonusPoints(num);
            if (bonusPoints > 0) {
                txt += "#d額外贈送\r\n";
                txt += "#b樂豆：#r" + bonusPoints * 50 + " #b楓點: #r" + bonusPoints * 100 + "\r\n";
            }
            if (npc.meFlip().askYesNo(txt) !== 1) return;
            money.add(stage, db, -num);
            stage.modifyCurrency(1, num * 50);
            stage.modifyCurrency(2, num * 100);
            if (bonusPoints > 0) {
                stage.modifyCurrency(1, bonusPoints * 50);
                stage.modifyCurrency(2, bonusPoints * 100);
                stage.showProgressMessageFont("額外贈送 樂豆 x " + bonusPoints * 50 + " 楓點 x " + bonusPoints * 100, 5, 20, 23, 0)
            }
            stage.showProgressMessageFont("樂豆 x " + num * 50 + " 楓點 x " + num * 100, 5, 20, 23, 0)
            npc.meFlip().say("兌換成功!");
            break;
        case 1:
            let article = {
                0: {
                    name: "#k佩沙裡洛套（海盜）           #r50星語幣",
                    bute: [1004233, 1052803, 1072971, 1082612, 1102722]
                },
                1: {
                    name: "#k佩沙裡洛套（盜賊）           #r50星語幣",
                    bute: [1102721, 1082611, 1072970, 1052802, 1004232]
                },
                2: {
                    name: "#k佩沙裡洛套（法師）           #r50星語幣",
                    bute: [1102719, 1072968, 1082609, 1004230, 1052800]
                },
                3: {
                    name: "#k佩沙裡洛套（戰士）           #r50星語幣",
                    bute: [1004229, 1052799, 1072967, 1082608, 1102718]
                },
                4: {
                    name: "#k佩沙裡洛套（弓手）           #r50星語幣",
                    bute: [1004231, 1052801, 1072969, 1082610, 1102720]
                }
            }
            txt = "請選擇你購買的職業防具 (#d三潛 全屬性 6%#k)\r\n";
            for (var i in article) {
                var armo = article[i];
                txt += "#L" + i + "#" + armo.name + "#l\r\n";
            }
            let url = npc.meFlip().askMenu(txt);

            if (npc.meFlip().askYesNo("是否立即購買當前套裝?") != 1) return;

            if (money.get(stage, db) < 50) {
                npc.meFlip().say("抱歉..你沒有 50 星語幣");
                return;
            }
            var armorbute = article[sel];
            var items = armorbute.bute;
            for (var i in items) {
                var Equip = util.makeItem(items[i], 1);
                Equip['baseStr'] += 0;
                Equip['baseInt'] += 0;
                Equip['baseLuk'] += 0;
                Equip['baseDex'] += 0;
                Equip['maxHp'] += 0;
                Equip['maxMp'] += 0;
                Equip['chuc'] += 0;
                Equip['grade'] = 19;
                Equip['option1'] = 30086;
                Equip['option2'] = 30086;
                Equip['option3'] = 30086;
                stage.gainItem(Equip);
            }
            money.add(stage, db, -50);
            npc.meFlip().say("恭喜..你購買成功了");
            break;
        case 2:
            article = [];
            txt = "\t\t#e#b贊助禮包 \r\n\r\n#n";
            txt += "#b#L0# 1、新人開荒禮包#l      \r\n\r\n";
            txt += "#b#L1# 2、經驗衝級禮包#l      \r\n\r\n";
            txt += "#b#L2# 3、裝備潛能禮包#l      \r\n\r\n";
            url = npc.meFlip().askMenu(txt);
            switch (url) {
                case 0:
                    article = [
                        [2633912, 1],
                        [2633913, 6],
                        [2049371, 7],
                        [1112956, 1],
                        [2049323, 100],
                        [1012471, 1],
                        [1022277, 1],
                        [1122252, 1],
                        [1672040, 1],
                        [5062019, 88],
                        [5062020, 88],
                        [5062507, 88]
                    ]
                    txt = "新人開荒禮包\r\n\r\n";
                    var meso = 148;
                    break;
                case 1:
                    article = [
                        [1114400, 1],
                        [1122334, 1],
                        [1114401, 1],
                        [1112918, 1]
                    ]
                    txt = "經驗衝級禮包\r\n\r\n";
                    var meso = 200;
                    break;
                case 2:
                    article = [
                        [5062020, 88],
                        [5062019, 88],
                        [5062021, 88],
                        [5062026, 88],
                        [5062507, 88],
                        [5062031, 88],
                        [2049787, 18],
                        [2048307, 88]
                    ]
                    txt = "經驗衝級禮包\r\n\r\n";
                    var meso = 128;
                    break;
            }
            for (var i in article) {
                txt += "#i" + article[i][0] + "##z" + article[i][0] + "# x " + article[i][1] + "\r\n";
            }
            txt += "\r\n";
            txt += "購買當前禮包需消耗 " + meso + " 星語幣，是否立即購買？\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;
            if (money.get(stage, db) < meso) {
                stage.dropAlertNotice("抱歉..你沒有 " + meso + " 星語幣");
                return;
            }
            for (var i in article) {
                stage.gainItem(article[i][0], article[i][1]);
            }
            money.add(stage, db, -meso);
            npc.meFlip().say("購買成功");
            break;
        case 3:
            txt = "充值說明\r\n\r\n";
            txt += "請複製下列鏈接地址到瀏覽器\r\n";
            url = npc.meFlip().minLen(1).maxLen(999).defText("http://985.so/9rsv5").askText(txt);
            break;
        case 4:
            txt = "充值說明\r\n\r\n";
            txt += "請複製下列鏈接地址到瀏覽器\r\n";
            url = npc.meFlip().minLen(1).maxLen(999).defText("http://985.so/9rsfu").askText(txt);
            break;
        case 5:
            txt = "當前累計充值:#r" + money.sum(stage, db) + "#k\r\n\r\n";
            txt += "當前累計充值技能:#s" + 80000257 + "# #blv.#r" + stage.getSkillLevel(80000257) + "#k\r\n";
            txt += "\r\n";
            txt += "#L0#提升等級#l\t\t#L1#技能介紹#l\r\n";
            uns = npc.meFlip().askMenu(txt);
            switch (uns) {
                case 0:
                    if (stage.getSkillLevel(80000257) >= 10) {
                        npc.meFlip().say("抱歉..當前技能最大值 10");
                        return;
                    }
                    let summoney = money.sum(stage, db);
                    let skill_lv = getMoneySkill(summoney);
                    if (skill_lv > 0) {
                        stage.changeSkillLevel(80000257, skill_lv);
                        npc.meFlip().say("提升成功!");
                    } else {
                        txt = "#d抱歉..累充沒有達標!\r\n";
                        npc.meFlip().say(txt);
                    }
                    break;

                case 1:
                    txt = "\r\n";
                    txt += "LV.1 充值1000  星語幣 全屬性+50  攻擊力+20  BOSS傷+10%  無視防禦+10 % 爆傷+2 %\r\n";
                    txt += "LV.2 充值2500  星語幣 全屬性+100 攻擊力+40  BOSS傷+20%  無視防禦+20 % 爆傷+4 %\r\n";
                    txt += "LV.3 充值4500  星語幣 全屬性+150 攻擊力+60  BOSS傷+30%  無視防禦+30 % 爆傷+6 %\r\n";
                    txt += "LV.4 充值7000  星語幣 全屬性+200 攻擊力+80  BOSS傷+40%  無視防禦+40 % 爆傷+8 %\r\n";
                    txt += "LV.5 充值10000 星語幣 全屬性+250 攻擊力+100 BOSS傷+50%  無視防禦+50 % 爆傷+10% 終傷+10%\r\n";
                    txt += "LV.6 充值15000 星語幣 全屬性+300 攻擊力+120 BOSS傷+60%  無視防禦+60 % 爆傷+12% 終傷+12%\r\n";
                    txt += "LV.7 充值20000 星語幣 全屬性+350 攻擊力+140 BOSS傷+70%  無視防禦+70 % 爆傷+14% 終傷+14%\r\n";
                    txt += "LV.8 充值30000 星語幣 全屬性+400 攻擊力+160 BOSS傷+80%  無視防禦+80 % 爆傷+16% 終傷+16%\r\n";
                    txt += "LV.9 充值50000 星語幣 全屬性+450 攻擊力+180 BOSS傷+90%  無視防禦+90 % 爆傷+18% 終傷+18%\r\n";
                    txt += "LV.10充值88888 星語幣 全屬性+500 攻擊力+200 BOSS傷+100% 無視防禦+100% 爆傷+20% 終傷+40%\r\n";
                    npc.meFlip().say(txt);
                    break;
            }
            break;

        case 6:
            stage.runScript("expand/三終");
            break;
    }
}

function getMoneySkill(money) {
    if (money < 1000) {
        return 0;
    } else if (money > 88888) {
        return 10;
    } else {
        let skill = 0;
        for (let key in money_skills) {
            if (money >= key) {
                skill = money_skills[key];
            } else {
                break;
            }
        }
        return skill;
    }
}

function calculateBonusPoints(softCoins) {
    let bonusPoints = 0;
    if (softCoins >= 300 && softCoins < 500) {
        bonusPoints = 10;
    } else if (softCoins >= 500 && softCoins < 1000) {
        bonusPoints = 20;
    } else if (softCoins >= 1000 && softCoins < 2000) {
        bonusPoints = 50;
    } else if (softCoins >= 2000 && softCoins < 3000) {
        bonusPoints = 120;
    } else if (softCoins >= 3000 && softCoins < 5000) {
        bonusPoints = 300;
    } else if (softCoins >= 5000 && softCoins < 10000) {
        bonusPoints = 520;
    } else if (softCoins >= 10000) {
        bonusPoints = 1111;
    }
    return bonusPoints;
}