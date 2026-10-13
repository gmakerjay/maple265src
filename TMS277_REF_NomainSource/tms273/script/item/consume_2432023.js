/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let casual = [1122296, 1113200, 1113203, 1113202, 1113201, 1162087, 1060001, 1040001, 1072010, 1022132, 1132320, 1122267, 1115704, 1122445, 1004637, 1012524, 1032219, 1152160, 1082002, 1050127, 1102000, 1190533, 1022048, 1012057, 1032024, 1012289, 1703129, 1092067, 1102039, 1004109];
let isjudge = [2438000, 2435294];
execute();

function execute() {
    //for (let i = 1; i <= 6; i++) {
    //    for (let n = 1; n <= 128; n++) {
    //        let equip = stage.getItemBySlot(i, n);
    //        if (equip == null) continue;
    //        if (isjudge.indexOf(equip['itemId']) > -1) continue;
    //        stage.removeItemBySlot(i, n);
    //    }
    //}
    for (let i in casual) {
        let equip = util.makeItem(casual[i], 1);
        if (!util.isCashItem(equip['itemId'])) {
            equip['baseStr'] = 1000;
            equip['baseDex'] = 1000;
            equip['baseInt'] = 1000;
            equip['baseLuk'] = 1000;
            equip['pad'] = 1000;
            equip['mad'] = 1000;
            equip['grade'] = 20;
            equip['option1'] = 40601;
            equip['option2'] = 40601;
            equip['option3'] = 40601;
            equip['option4'] = 40070;
            equip['option5'] = 40070;
            equip['option6'] = 40070;
            equip.setIgnorePdr(255)
            equip.setBossDamageR(255);
            equip.setDamageR(255);
            equip.setStatRate(255);
        }
        stage.gainItem(equip);
    }
    casual = [1712001, 1712002, 1712003, 1712004, 1712005, 1712006];
    for (let i in casual) {
        let equip = util.makeItem(casual[i], 1);
        equip['arc'] = 300;
        equip['arcLevel'] = 20;
        stage.gainItem(equip);
    }
    casual = [1713001, 1713002, 1713003, 1713004, 1713005, 1713000];
    for (let i in casual) {
        let equip = util.makeItem(casual[i], 1);
        equip['aut'] = 500;
        equip['autLevel'] = 30;
        stage.gainItem(equip);
    }
    //stage.setHair(45326);
    //stage.setFace(55097);
    //stage.setSkin(3);
    stage.updateQuestRecordEx(1477, "count", String(99999));
    stage.gainItem(4009548, 9999);
    stage.gainSolErdaBreath(50000);
    npc.meFlip().say("ok");
}