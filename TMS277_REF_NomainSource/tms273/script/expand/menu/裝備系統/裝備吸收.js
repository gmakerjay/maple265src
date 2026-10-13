const list = [
    [1182158, [80011159, 80011158], true, [-1, -34], 50_0000_0000, 3], // 奧爾卡
    [1182136, [80011133, 80011133], true, [-1, -34], 50_0000_0000, 3], // 奧爾卡
    [1033000, [80011540], false, [-2, -104]], // LCD耳環
    [1032261, [80011302], false, [-2, -104]], // 內面
    [1113211, [80011247, 80011248, 80011249, 80011250, 80011251], false, [-1, -16]], // 天堂 
];

function reload () {
    let skills = db.select(`select *
                                from zsf_skill_loading
                                where character_id = ${stage.getCharacterId()} and type is null`);
    for (let i in skills) {  
        stage.changeSkillLevel(skills[i].get('skill'), 0);
        stage.changeSkillLevel(skills[i].get('skill'), 1);
    }
}

function start() {
    reload();
    let str = "請選擇操作(#r注:天上的氣息吸收需穿在第一個戒指位#k)\r\n";
    for (let i = 0; i < list.length; i++) {
        str += `#L${i}##b吸收#k #v${list[i][0]}:i##z${list[i][0]}:i##l\r\n`;
    }
    str += "\r\n";
    for (let i = 0; i < list.length; i++) {
        if (list[i][2]) {
            str += `#L${(i + 100)}##r拆卸#k #v${list[i][0]}:i##z${list[i][0]}:i##l\r\n`;
        }
    }

    let selected = npc.askMenu(str);
    if (selected < 100) {
        let skills = db.select(`select *
                                from zsf_skill_loading
                                where character_id = ${stage.getCharacterId()}
                                  and item_id = ${list[selected][0]}`);
        if (skills.length > 0) {
            npc.say("您已經吸收過該裝備了！");
            return;
        } else {
            let toDrop = stage.getItemBySlot(list[selected][3][0], list[selected][3][1]);

            if (toDrop != null && toDrop.getItemId() == list[selected][0]) {
                let str = `是否確認吸收#v${list[selected][0]}:i##z${list[selected][0]}:i#\r\n`;
                str += list[selected][2] ? `#r注意：該裝備為可拆卸裝備，吸收後可還原！#k\r\n` : `#r注意：該裝備為不可拆卸裝備，吸收後不可還原！#k\r\n`;
                let YN = npc.askYesNo(str);
                if (YN == 1) {
                    toDrop = stage.getItemBySlot(list[selected][3][0], list[selected][3][1]);
                    if (toDrop == null || toDrop.getItemId() != list[selected][0]) {
                        npc.say("請確認是否穿戴了該裝備！");
                        return;
                    }
                    stage.removeItemBySlot(list[selected][3][0], list[selected][3][1]);
                    for (let i = 0; i < list[selected][1].length; i++) {
                        stage.changeSkillLevel(list[selected][1][i], 1);
                        db.insert(`insert into zsf_skill_loading (character_id, item_id, skill, level)
                                   values (${stage.getCharacterId()}, ${list[selected][0]},
                                           ${list[selected][1][i]}, 1)`);
                    }
                    npc.say("吸收成功！");
                }
            } else {
                npc.say("請確認是否穿戴了該裝備！");
                return;
            }
        }
    } else {
        selected = selected - 100;
        let skills = db.select(`select *
                                from zsf_skill_loading
                                where character_id = ${stage.getCharacterId()}
                                  and item_id = ${list[selected][0]}`);
        if (skills.length > 0) {
            let str = `是否確認拆卸#v${list[selected][0]}:i##z${list[selected][0]}:i#\r\n`;
            let YN = npc.askYesNo(str);
            if (YN == 1) {
                if (!stage.changeSkillLevel(list[selected][0], 1)) {
                    npc.say("請確認揹包是否有足夠的空間！");
                    return;
                }
                for (let i = 0; i < list[selected][1].length; i++) {
                    stage.changeSkillLevel(list[selected][1][i], 0);
                    db.delete(`delete
                               from zsf_skill_loading
                               where character_id = ${stage.getCharacterId()}
                                 and item_id = ${list[selected][0]}
                                 and skill = ${list[selected][1][i]}`);
                }
                let item = util.makeItem(list[selected][0], 1);
                stage.gainItem(item, 1);
                npc.say("拆卸成功！");
            }
        } else {
            npc.say("您還未吸收過該裝備！");
            return;
        }
    }
}

start();
