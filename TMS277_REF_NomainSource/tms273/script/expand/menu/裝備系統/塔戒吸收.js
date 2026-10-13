let log = require('check_log');
const list = [
    [1113098, [80001455], false, [1, 1]], // 克制之戒'],
    [1113108, [80001465], false, [1, 1]], // 集成之戒'],
    [1113109, [80001466], false, [1, 1]], // 等級增益S']
    [1113110, [80001467], false, [1, 1]], // 等級增益D']
    [1113111, [80001468], false, [1, 1]], // 等級增益I']
    [1113112, [80001469], false, [1, 1]], // 等級增益L']
    [1113113, [80001470], false, [1, 1]], // 武器增益S']
    [1113114, [80001471], false, [1, 1]], // 武器增益D']
    [1113115, [80001472], false, [1, 1]], // 武器增益I']
    [1113116, [80001473], false, [1, 1]], // 武器增益L']
    [1113122, [80001479], false, [1, 1]], // 風險之戒'],
    [1113104, [80001461], false, [1, 1]], // 爆擊傷害戒80011133
    [1113125, [80000301], false, [1, 1]], // 水晶HM'],
];

function start() {
    let oldLoadList = db.select(`select *
                                 from zsf_skill_loading
                                 where character_id = ${stage.getCharacterId()}
                                   and type = '塔戒'`);
    let skillInfo = {};
    if (oldLoadList.length > 0) {
        for (let i in oldLoadList) {
            skillInfo[`${oldLoadList[i].get("item_id")}`] = oldLoadList[i].get("level");
        }
    }

    let str = `歡迎使用星語谷塔戒服務中心\r\n\r\n`;
    let maxCnt = 1 + parseInt(log.getEventValue(stage, db, "吸收塔戒拓展"));
    str += `當前吸收的塔戒數量: ${oldLoadList.length}/${maxCnt}\r\n`;
    // str += `#r${maxCnt}#k\r\n`;
    switch (maxCnt) {
        case 1:
            str += `#r#L101#拓展第一格額外吸收槽位 需100E#l\r\n\r\n#k`;
            break;
        case 2:
            str += `#r#L102#拓展第二格額外吸收槽位 需150E#l\r\n\r\n#k`;
            break;
        case 3:
            str += `#r#L103#拓展第三格額外吸收槽位 需200E#l\r\n\r\n#k`;
            break;
    }
    str += "請選擇要吸收的戒指\r\n";
    for (let i = 0; i < list.length; i++) {
        str += `#L${i}##v${list[i][0]}:i##z${list[i][0]}:i# `;
        if (skillInfo[`${list[i][0]}`] && skillInfo[`${list[i][0]}`] > 0) {
            str += `#r已吸收(${skillInfo[`${list[i][0]}`]})#k#l\r\n`;
        } else if (oldLoadList.length >= maxCnt) {
            str += `#k位置已滿#l\r\n`;
        } else {
            str += `#b可吸收#k#l\r\n`;
        }
    }
    str += `\r\n#r#L10086#抹除吸收的塔戒#l\r\n#k`
    let selected = npc.askMenu(str);
    switch (selected) {
        case 10086:
            if (oldLoadList.length > 0) {
                let str10086 = '請選擇要抹除的塔戒:\r\n';
                for (let i in oldLoadList) {
                    str10086 += `#L${i}##v${oldLoadList[i].get("item_id")}:i##z${oldLoadList[i].get("item_id")}:i# 等級: ${oldLoadList[i].get('level')}#l\r\n`;

                }
                let sel10086 = npc.askMenu(str10086);
                if (npc.askYesNo(`是否確認抹除該塔戒吸收記錄，戒指不返還\r\n#v${oldLoadList[sel10086].get("item_id")}:i##z${oldLoadList[sel10086].get("item_id")}:i# 等級: ${oldLoadList[sel10086].get("level")}`) == 1) {
                    db.update(`update zsf_skill_loading
                               set type = '刪除'
                               where id = ${oldLoadList[sel10086].get('id')}`);
                    stage.changeSkillLevel(oldLoadList[sel10086].get('skill'), 0);
                    npc.say("抹除成功");
                }
            } else {
                npc.say("沒有可抹除的塔戒");
            }
            break;
        case 101:
            if (stage.getMesos() < 100_0000_0000) {
                npc.say("拓展第一格吸收位需要100E遊戲幣,不然很難辦啊.");
                return;
            } else if (parseInt(log.getEventValue(stage, db, "吸收塔戒拓展")) > 0) {
                npc.say("不要搗亂你明明拓展過。");
                return;
            } else {
                if (npc.askYesNo("確定要我幫你拓展一個塔戒吸收位了么") == 1) {
                    if (stage.getMesos() < 100_0000_0000) {
                        npc.say("你的金幣呢。");
                        return;
                    }
                    stage.loseMesos(100_0000_0000);
                    log.addEventValue(stage, db, "吸收塔戒拓展", 1, -1);
                    npc.say("恭喜你成功拓展一個塔戒槽位");
                    return;
                }
            }
            break;
        case 102:
            if (stage.getMesos() < 150_0000_0000) {
                npc.say("拓展第二格吸收位需要150E遊戲幣,不然很難辦啊.");
                return;
            } else if (parseInt(log.getEventValue(stage, db, "吸收塔戒拓展")) > 1) {
                npc.say("不要搗亂你明明拓展過。");
                return;
            } else {
                if (npc.askYesNo("確定要我幫你拓展第二個塔戒吸收位了么") == 1) {
                    if (stage.getMesos() < 150_0000_0000) {
                        npc.say("你的金幣呢。");
                        return;
                    }
                    stage.loseMesos(150_0000_0000);
                    log.addEventValue(stage, db, "吸收塔戒拓展", 1, -1);
                    npc.say("恭喜你成功拓展第二個塔戒槽位");
                    return;
                }
            }
            break;
        case 103:
            if (stage.getMesos() < 200_0000_0000) {
                npc.say("拓展第三格吸收位需要200E遊戲幣,不然很難辦啊.");
                return;
            } else if (parseInt(log.getEventValue(stage, db, "吸收塔戒拓展")) > 2) {
                npc.say("不要搗亂你明明拓展過。");
                return;
            } else {
                if (npc.askYesNo("確定要我幫你拓展第三個塔戒吸收位了么") == 1) {
                    if (stage.getMesos() < 200_0000_0000) {
                        npc.say("你的金幣呢。");
                        return;
                    }
                    stage.loseMesos(200_0000_0000);
                    log.addEventValue(stage, db, "吸收塔戒拓展", 1, -1);
                    npc.say("恭喜你成功拓展第三個塔戒槽位");
                    return;
                }
            }
            break;
        default:
            let selLevel = skillInfo[`${list[selected][0]}`];
            if (selLevel && parseInt(selLevel) >= 4) {
                if (parseInt(selLevel) > 4) {
                    npc.say("該戒指技能已滿！");
                } else {
                    if ([1113113, 1113114, 1113115, 1113116, 1113098, 1113122].indexOf(list[selected][0]) != -1) {
                        const planList = [
                            [2539001, 1, 5_0000_0000, 10],
                            [2539001, 2, 10_0000_0000, 20],
                            [2539001, 3, 20_0000_0000, 30],
                            [2539001, 4, 35_0000_0000, 40],
                            [2539001, 5, 50_0000_0000, 50],
                        ];
                        let upStr = `#v${list[selected][0]}#請選擇磨練方案\r\n\r\n`;
                        for (let i in planList) {
                            upStr += `#L${i}# #v${planList[i][0]}:i# x #r${planList[i][1]}#k + 金幣: #r${planList[i][2]}#k 成功率: #r${planList[i][3]}%#k#l\r\n`;
                        }
                        let planSel = npc.askMenu(upStr);
                        let itemId = planList[planSel][0];
                        let itemCount = planList[planSel][1];
                        let needMesos = planList[planSel][2];
                        let successRate = planList[planSel][3];
                        if (stage.getItemQuantity(itemId) < itemCount || stage.getMesos() < needMesos) {
                            npc.say("材料不足");
                        } else {
                            let confirmStr = `是否確定要對已吸收的克制之戒進行磨練,請確認消耗\r\n`;
                            confirmStr += `#v${itemId}:i# x ${itemCount} (當前擁有:${stage.getItemQuantity(itemId)})\r\n`;
                            confirmStr += `金幣 x ${formatNumberToMoney(needMesos)} (當前擁有:${formatNumberToMoney(stage.getMesos())})\r\n`;
                            confirmStr += `成功率     ${successRate} %\r\n`;
                            if (npc.askYesNo(confirmStr) == 1) {
                                stage.loseItem(itemId, itemCount);
                                stage.loseMesos(needMesos);
                                let rad = Math.random() * 100;
                                stage.showSystemMessage(rad);
                                if (rad <= parseInt(successRate)) {
                                    stage.changeSkillLevel(list[selected][1][0], 5);
                                    db.update(`update zsf_skill_loading
                                               set level = 5
                                               where character_id = ${stage.getCharacterId()}
                                                 and skill = ${list[selected][1][0]}`);
                                    npc.say("恭喜，磨練成功");
                                } else {
                                    npc.say("很遺憾，希望下次加油");
                                }
                            }
                        }
                    } else {
                        npc.say("目前先吸收后強化功能只支持克制之戒");
                    }
                }
            } else if (oldLoadList.length >= maxCnt) {
                npc.say("塔戒吸收數量達到上限，無法吸收。");
                return;
            } else {
                let toDrop = stage.getItemBySlot(list[selected][3][0], list[selected][3][1]);
                if (toDrop != null && toDrop.getItemId() == list[selected][0] && toDrop.getLevel() >= 4) {
                    let level = toDrop.getLevel()
                    str = `是否確認吸收(${toDrop.getLevel()}級)#v${list[selected][0]}:i##z${list[selected][0]}:i#\r\n`;
                    str += `#r注意：塔戒為不可拆卸裝備，吸收后不可還原！且已吸收的塔戒效果會被覆蓋#k\r\n`;
                    let YN = npc.askYesNo(str);
                    if (YN == 1) {
                        toDrop = stage.getItemBySlot(list[selected][3][0], list[selected][3][1]);
                        if (toDrop == null || toDrop.getItemId() != list[selected][0]) {
                            npc.say("請確認物品欄第一格為4/5級塔戒！");
                            return;
                        }
                        let skills = db.select(`select *
                                                from zsf_skill_loading
                                                where character_id = ${stage.getCharacterId()}
                                                  and type = '塔戒'`);
                        stage.removeItemBySlot(list[selected][3][0], list[selected][3][1]);
                        for (let i = 0; i < list[selected][1].length; i++) {
                            stage.changeSkillLevel(list[selected][1][i], level);

                            db.insert(`insert into zsf_skill_loading (character_id, item_id, skill, level, type)
                                       values (${stage.getCharacterId()}, ${list[selected][0]},
                                               ${list[selected][1][i]}, ${level}, '塔戒')`);
                            db.insert(`insert into zsf_skill_loading_bak (character_id, item_id, skill, level, type)
                                       values (${stage.getCharacterId()}, ${list[selected][0]},
                                               ${list[selected][1][i]}, ${level}, '塔戒')`);
                        }
                        npc.say("吸收成功！");
                    }
                } else {
                    npc.say("請確認是否放在了物品欄第一格！");
                    return;
                }
            }
    }

}

function formatNumberToMoney(n) {
    let str = n.toString();
    let result = '';
    let counter = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        counter++;
        result = str[i] + result;
        if (!(counter % 3) && i !== 0) {
            result = ',' + result;
        }
    }
    return result;
}

start();