
const upgradeList = [
    [-31, [1162080, 1162081, 1162082, 1162083], [1162080, 1162081, 1162082, 1162083, 1132308], 2]
];


function start () {  
    let str = `請將您需要通過吞噬強化的裝備穿在身上:\r\n`;
    str += `同類物品可互相吞噬(要提升的主體需要穿戴,被吞噬物品放在第一格),當前支持:\r\n`;
    str += ` #r魔導書可以吞噬魔導書或夢幻腰帶,每次提升 六維 x 2\r\n#k`; 

    for (let i in upgradeList) {
        let e = stage.getItemBySlot(-1, upgradeList[i][0]); 
        if (e && upgradeList[i][1].includes(e.getItemId())) {
            str += `#L${i}##v${e.getItemId()}# 吞噬  [${upgradeList[i][2].map(m => '#v'+m+'#').join('')}]#l\r\n`;
        }
    }
    let sel = npc.askMenu(str);
    switch (sel) {
        case 0: 
            let mainEquip = stage.getItemBySlot(-1, upgradeList[sel][0]);
            let subEquip = stage.getItemBySlot(1, 1); 
            if (!mainEquip || !subEquip) {
                npc.say(`請檢查物品\r\n可吞噬的主體裝備:\r\n[${upgradeList[sel][1].map(m => '#v'+m+'#').join('')}]\r\n可被吞噬的裝備:\r\n[${upgradeList[sel][2].map(m => '#v'+m+'#').join('')}]\r\n`)
                return;
            } else if (!(upgradeList[sel][1].includes(mainEquip.getItemId())) || !upgradeList[sel][2].includes(subEquip.getItemId())) {
                npc.say(`請檢查物品\r\n可吞噬的主體裝備:\r\n[${upgradeList[sel][1].map(m => '#v'+m+'#').join('')}]\r\n可被吞噬的裝備:\r\n[${upgradeList[sel][2].map(m => '#v'+m+'#').join('')}]\r\n`)
                return;
            }
            str = `吞噬后,您穿戴的 #v${mainEquip.getItemId()}# 會增加2點六維 \r\n`;
            str += `背包第一格的 #v${subEquip.getItemId()}#會消失\r\n\r\n#r是否確認吞噬?`
            if (npc.askYesNo(str)) {
                stage.removeItemBySlot(1, 1);
                mainEquip.setBaseStr(mainEquip.getBaseStr() + 2);
                mainEquip.setBaseDex(mainEquip.getBaseDex() + 2);
                mainEquip.setBaseInt(mainEquip.getBaseInt() + 2);
                mainEquip.setBaseLuk(mainEquip.getBaseLuk() + 2);
                mainEquip.setPad(mainEquip.getPad() + 2);
                mainEquip.setMad(mainEquip.getMad() + 2);
                stage.updateItemBySlot(-1, upgradeList[sel][0])
                npc.say('吞噬成功')
            }
            break;
    }
}


start();