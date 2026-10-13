/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let log = require('check_log');
var payUtils = require('constant/payUtils');
let maxLevel = 15;


function start() {
    
    if (log.getEventValue(stage, db, '累充60000技能領取') > 0) {
        maxLevel = 30;
    }
    let currentLevel = stage.getSkillLevel(80000616);
    str = `本角色技能等級: #b${currentLevel}#k 賬號技能點: #b${log.getEventValue(stage, db, "星語谷奧義技能點")}#k\r\n`;
    str += `#L0#學習技能(金幣180E/儲備金180E)#l\r\n`;
    str += `#L1#重置技能(每級12E,回收為賬號技能點)#l\r\n`;
    str += `#L2#技能點學習\r\n`;
    str += `#L3#領取聯盟獎勵(8000/1點技能點)#l\r\n`;
    str += `#L4#領取聯盟獎勵(10000/2點技能點)#l\r\n`;
    str += `#L5#技能介紹#l\r\n`;
    let sel = npc.askMenu(str);

    switch (sel) {
        case 0:
            currentLevel = stage.getSkillLevel(80000616);
            if (currentLevel >= maxLevel) {
                npc.say("已經滿級不需要繼續學習了");
            } else {
                let str2 = `技能: 島主之力\r\n`;
                str2 += `等    級: ${currentLevel} => ${currentLevel + 1}\r\n`;
                str2 += `金    幣: ${stage.getMesos()}\r\n`;
                str2 += `儲 備 金: ${payUtils.getBindMesosShow(db, stage)}\r\n`;
                str2 += `請選擇支付方式:\r\n\r\n`;
                str2 += `#L0#使用 180 億 楓幣#l\r\n`;
                str2 += `#L1#使用 180 億 儲備金#l\r\n`;
                let sel = npc.askMenu(str2);
                switch (sel) {
                    case 0:
                        if (stage.getMesos() < 120_0000_0000) {
                            npc.say('楓幣不足，需要 120 億');
                        } else {
                            if (npc.askYesNo(`是否使用 180 億 楓幣學習技能\r技能等級: ${currentLevel} => ${currentLevel + 1}`)) {
                                stage.loseMesos(180_0000_0000);
                                stage.changeSkillLevel(80000616, (parseInt(currentLevel) + 1))
                                str2 = `學習成功: ${currentLevel} => ${currentLevel + 1}\r\n`;
                                if (currentLevel + 1 >= maxLevel) {
                                    str2 += `#b恭喜您已經學滿島主之力`;
                                }
                                npc.say(str2);
                            }
                        }
                        break;
                    case 1:
                        if (payUtils.getBindMesos(db, stage) < 180_0000_0000) {
                            npc.say('儲備金不足，需要 180 億');
                        } else {
                            if (npc.askYesNo(`是否使用 180 億 儲備金學習技能\r技能等級: ${currentLevel} => ${currentLevel + 1}`)) {
                                payUtils.gainBindMesos(-180_0000_0000, db, stage, '學習島主之力', "");
                                stage.changeSkillLevel(80000616, (parseInt(currentLevel) + 1))
                                str2 = `學習成功: ${currentLevel} => ${currentLevel + 1}\r\n`;
                                if (currentLevel + 1 >= maxLevel) {
                                    str2 += `#b恭喜您已經學滿島主之力`;
                                }
                                npc.say(str2);
                            }
                        }
                        break;
                }
            }
            break;
        case 1:
            let ps = db.select(`select *
                                from character c
                                         left join character_skill_record s on c.id = s.character_id
                                where c.account_id = ${stage.getAccountId()}
                                  and c.id <> ${stage.getCharacterId()}
                                  and s.skill_id = 80000616
                                  and s.option > 0`);
            let cStr = "該功能可重置本角色以外的角色的島主之力\r\n";
            for (let i in ps) {
                let p = ps[i];
                cStr += `#L${i}#${p["name"]} ${ps[i].get("option")}#l\r\n`;
            }
            let cs = npc.askMenu(cStr);
            if (npc.askYesNo(`是否重置<${ps[cs]["name"]}>技能1級, 消耗${12}E`)) {
                let level = ps[cs]["skilllevel"];
                if (!stage.hasMesos(1 * 12_0000_0000)) {
                    npc.say("金幣不足");
                    return;
                }
                stage.loseMesos(1 * 12_0000_0000);
                db.update(`update characters_skills
                           set skilllevel = ${level} - 1
                           where characters_id = ${ps[cs]["id"]}
                             and skillid = 80000616`);
                log.addEventValue(stage, db, "星語谷奧義技能點", 1, -1);
                npc.say("重置成功");
            }
            break;
        case 2:
            let point = log.getEventValue(stage, db, "星語谷奧義技能點");
            let level = stage.getSkillLevel(80000616);
            if (level >= maxLevel) {
                npc.say("已滿級無法繼續學習");
            } else if (point == 0) {
                npc.say("無點數可用");
            } else {
                let cost = Math.min(maxLevel - level, point);
                if (npc.askYesNo(`是否消耗${cost}點技能點學習`)) {
                    // stage.showSystemMessage(-cost)
                    log.addEventValue(stage, db, "星語谷奧義技能點", -cost, -1);
                    stage.changeSkillLevel(80000616, level + cost);
                    npc.say("學習成功");
                }
            }
            break;
        case 3:
            un = stage.getMapleUnionUpgradeInfo();
            if (un[5] < 8000) {
                npc.say("聯盟等級不足8000");
                break;
            } else if (log.getEventValue(stage, db, "星語谷奧義8000") >= 1) {
                npc.say("已領取過");
                break;
            } else {
                log.addEventValue(stage, db, "星語谷奧義8000", 1, -1);
                log.addEventValue(stage, db, "星語谷奧義技能點", 1, -1);
            }
            break;
        case 4:
            un = stage.getMapleUnionUpgradeInfo();
            if (un[5] < 10000) {
                npc.say("聯盟等級不足10000");
                break;
            } else if (log.getEventValue(stage, db, "星語谷奧義10000") >= 1) {
                npc.say("已領取過");
                break;
            } else {
                log.addEventValue(stage, db, "星語谷奧義10000", 1, -1);
                log.addEventValue(stage, db, "星語谷奧義技能點", 3, -1);
            }
            break;
        case 5:
            let str = "#b#e#s80000616#星語谷奧義#k#n\r\n";
            str += `此BUFF是一個可轉移的賬號底子\r\n`;
            str += `- 學習費用：每級180E金幣/180E儲備金。\r\n`;
            str += `- 聯盟獎勵：當您的聯盟積分達到8000/10000時\r\n            可免費獲得1/2級；\r\n`;
            str += `#r1級即可增加5%爆擊率,30級總屬性為:\r\n`;
            str += `+5%爆擊率\r\n`;
            str += `+30%爆擊傷害\r\n`;
            str += `+120%最終傷害\r\n`;
            str += `+120%BOSS傷害\r\n`;
            str += `600全屬性,300攻魔\r\n`;
            str += `本角色技能等級: #b${currentLevel}#k`;
            npc.next().say(str);
            break;

    }
    start();
}

start();
