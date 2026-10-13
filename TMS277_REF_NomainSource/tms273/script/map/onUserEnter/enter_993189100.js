/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let log = require('check_log');

let casual = [
    [4001714, 5, null],
    [2432022, 1, null],
    [2632959, 1, null],
    [2000005, 999, null],
    [2630127, 1, null],
    [1002186, 1, null],
    [1012057, 1, null],
    [1022048, 1, null],
    [1032024, 1, null],
    [1092064, 1, null],
    [1703129, 1, null],
    [1082102, 1, null],
    [1102039, 1, null],
    [1072153, 1, null],
    [5190000, 1, null],
    [5190001, 1, null],
    [5190006, 1, null],
    [5190010, 1, null],
    [5190002, 1, null],
    [5190003, 1, null],
    [5190011, 1, null]
]

execute();

function execute() {
    if (log.getPQLog(stage, db, "新人認證") > 0) {
        return;
    }
    for (let i in casual) {
        stage.gainItem(casual[i][0], casual[i][1]);
    }
    let equip = util.makeItem(3700663, 1);
    stage.gainItem(equip);

    stage.updateQuestRecordEx(7022, 'c=6;e=1;l=3;s=12');
    stage.gainItem(3090006, 1);

    if (!stage.hasItem(2430154, 1)) {
        stage.gainItem(2430154, 1);
        stage.showSystemMessage("成功領取新手認證書，其中包含獎勵豐厚的頑皮島主線任務");
    }
    stage.gainItem(5150040, 50);
    stage.gainItem(5152053, 50);
    stage.gainItem(2635169, 1);

    equip = util.makeItem(1142358, 1);
    equip['baseStr'] = 111;
    equip['baseDex'] = 111;
    equip['baseInt'] = 111;
    equip['baseLuk'] = 111;
    equip['pad'] = 111;
    equip['mad'] = 111;
    equip['maxHp'] = 10000;
    equip['maxMp'] = 10000;
    equip['pdd'] = 9999;
    equip['attribute'] = 8;
    equip['expireDate'] = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
    stage.gainItem(equip);

    stage.increaseEquipInvSlot(128);
    stage.increaseConsumeInvSlot(128);
    stage.increaseEquipInvSlot(128);
    stage.increaseEtcInvSlot(128);
    stage.increaseInstallInvSlot(128);
    stage.increaseTrunkCapacity(128);
    stage.gainItem(5133000, 30);
    stage.gainItem(5130000, 30);
    stage.completeQuest(6500);
    util.broadcastWorldChatMsg(3, "[星語谷]：萌新 " + stage.getCharacterName() + " 成功降落！快和大家一起愉快的玩耍吧！");
    log.addPQLog(stage, db, '新人認證', 1, -1);
    stage.modifyAp(200 * 5);
}