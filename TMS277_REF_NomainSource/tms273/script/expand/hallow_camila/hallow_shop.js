// Created by MetaMS

let cSel = npc.id(9063069).askMenu("\r\n歡迎來到萬聖貓精品商店！\r\n#L0# #b#e物色<毛骨悚然的衣架>#n#k #l\r\n#L1# #b#e物色<陰森的攤販>#n#k #l\r\n#L100#現在不物色。#l");
if (cSel == 0) {
        stage.openShop(9063071);
} else if (cSel == 1) {
        stage.openShop(9063073);
}