/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

execute();

function execute() {
    let txt = "-->炭治郎技能 #s80003731#\r\n\r\n";
    txt += "#d1.#b學習此技能需滿足前置條件\r\n";
    txt += "#d4.#b需支付 10 億楓幣\r\n";
    txt += "\r\n確定學習此技能嗎？確定的話將對你的前置條件進行檢測\r\n";
    if (npc.meFlip().askYesNo(txt)) {
        let unio = stage.getMapleUnionUpgradeInfo();
        txt = "-->炭治郎技能 #s80003731#\r\n\r\n";
        txt += "#d玩家楓幣：#r" + stage.getMesos() + "\r\n\r\n";
        txt += "\t\t\t#b是否立即解除技能封印？\r\n";
        if (npc.meFlip().askYesNo(txt)) {
            let judge = true;
            if (!stage.hasMesos(10E8)) {
                judge = false;
            }
            if (!judge) {
                npc.meFlip().say("抱歉..你些許前置條件沒有達標！");
                return;
            }
            if (stage.getSkillLevel(80003731) > 0) {
                npc.meFlip().say("抱歉..你已有炭治郎技能了!");
                return;
            }
            stage.loseMesos(10E8);
            stage.changeSkillLevel(80003731, 1);
            npc.meFlip().say("技能解封成功！");
        }
    }
}