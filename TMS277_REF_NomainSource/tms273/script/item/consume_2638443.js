/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const item_id = ctx.getDataId();

function start() {
    let str = `是否獲取下列物品《3終傷傲天怪怪卡》: \r\n`;
    str += `#v2871658:i# #z2871658:i# x 1\r\n`;
    if (npc.askYesNo(str) == 1) {
        ctx.consume();
        let gg11 = util.makeItem(2871658, 1);
        gg11.setGrade(4);
        gg11.setLevel(5);
        gg11.setSkill(877);
        gg11.setPotential1(40016);
        gg11.setPotential2(40016);
        gg11.setPotential3(40016);
        stage.gainItem(gg11);
        npc.say('領取成功');
    }
}

start();