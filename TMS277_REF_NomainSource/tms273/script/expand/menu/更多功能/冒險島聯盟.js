/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

// Created by MetaMS
// Quest ID:16014
// 與降龍者會計小姐對話。

let unionHelp = require("maple_union_help");
let selection = npc.id(9010106).askMenu("今天真是個獵龍的好天氣！\r\n關於#b楓之谷聯盟#k業務有什麼可以幫你？\r\n\r\n#L0##b<查看我的楓之谷聯盟信息。>#l\r\n#L1##b<提高楓之谷聯盟級別。>#l\r\n#L2##b<聽取關於楓之谷聯盟的介紹。>#k#l\r\n#L3##b<一周獲得紀念幣排名>#k#l");
if (selection == 0) {
    let info = stage.getMapleUnionInfo();
    npc.id(9010106).next().say("那我就來告訴勇士你的#e楓之谷聯盟#n信息吧？\r\n\r\n#e楓之谷聯盟級別：#n#b#e<" + info[0] + ">#n#k\r\n#e聯盟等級：#n#b#e<" + info[1] + ">#n#k\r\n#e持有聯盟角色：#n#b#e<" + info[2] + ">#n#k\r\n#e攻擊隊隊員：#n#b#e<" + info[3] + " / " + info[4] + "人>#n#k");
} else if (selection == 1) {
    let info = stage.getMapleUnionUpgradeInfo();
    if (info == null) {
        npc.id(9010106).say("當前楓之谷聯盟已經達到最高等級！");
    } else {
        let nowName = info[0];
        let NextName = info[1];
        let nowAttack = parseInt(info[2]);
        let nextAttack = parseInt(info[3]);
        let limitLevel = parseInt(info[4]);
        let nowLevel = parseInt(info[5]);
        let coinCost = parseInt(info[6]);
        let myCoin = stage.getIntQuestRecordExShare(500629, "point");
        if (npc.id(9010106).askYesNo("你要進行#e楓之谷聯盟升級#n嗎？\r\n\r\n#e當前級別：#n#b#e<" + nowName + ">#n#k\r\n#e下一級別：#n#b#e<" + NextName + ">#n#k\r\n#e升級後可投入的攻擊隊隊員增加：#n #b#e<" + nowAttack + "→" + nextAttack + "名>#n#k\r\n\r\n要想升級必須滿足以下條件。\r\n\r\n#e<聯盟等級> #r#e" + limitLevel + "以上#n#k #n\r\n#e<支付幣> #b#e#t4310229# " + coinCost + "個#n#k\r\n\r\n要立即#e升級#n聯盟嗎？")) {
            if (nowLevel < limitLevel) {
                npc.id(9010106).say("目前的#r聯盟等級還不足#k呢？\r\n想要升級，就需要#r更高的聯盟等級#k~\r\n\r\n#e當前聯盟等級：#n#r" + nowLevel + "#k\r\n#e所需聯盟等級：#n#b" + limitLevel + "#k");
            }  else if (stage.upgradeMapleUnionUpgrade()) {
                npc.id(9010106).say("恭喜你！，現在的楓之谷聯盟等級提高了，\r\n#e當前級別：#n#b#e<" + NextName + ">#n#k");
            }
        }
    }
} else if (selection == 2) {
    unionHelp.showHelp(npc);
} else if (selection == 3) {
    npc.id(9010106).say("現在還沒有登錄的每周聯盟幣獲取排名呢？\r\n通過聯盟突襲獲得聯盟幣後，就可以查看排名。");
}