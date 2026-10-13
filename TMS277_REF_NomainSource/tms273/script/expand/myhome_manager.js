// Created by MetaMS
// My home manager

let n = stage.getIntQuestRecordExShare(500773, "manager");
let hide = stage.getIntQuestRecordExShare(500773, "managerHide");
let npcId = 9400920 + n;
let entity_0 = stage.getTempValue("entity_0");

let menu = "#face0#我能幫你做些什麼呢？\r\n\r\n";
if (hide == 0) {
        menu += "#L1##b隱藏管家#k#l\r\n";
} else {
        menu += "#L1##b顯示管家#k#l\r\n";
}
menu += "#L2##b變更管家#k#l\r\n";
menu += "#L3##b變更管家放置位置#k#l";

let sel = npc.id(npcId).uiMax().askAccept(menu);
switch (sel) {
        case 1:
                if (hide == 0) {//进行隐藏
                        stage.updateQuestRecordExShare(500773, "managerHide", "1");
                        stage.destroyTempNpc(entity_0);
                        npc.id(npcId).ui(1).next().say("#face0#好的，那今后我就先离开咯！");
                } else {//进行显示
                        stage.updateQuestRecordExShare(500773, "managerHide", "0");

                        let x = stage.getIntQuestRecordExShare(500767, "managerXpos");
                        let y = stage.getIntQuestRecordExShare(500767, "managerYpos");
                        let managerFlip = stage.getIntQuestRecordExShare(500767, "managerFlip") == 1 ? 0 : 1;

                        let entity_0 = stage.spawnTempNpc(9400930, x, y, managerFlip);
                        stage.setNpcSpecialAction(entity_0, "summon", 0, false);
                        stage.addTempValue("entity_0", entity_0);
                        npc.id(npcId).ui(1).next().say("#face0#我又回來了！");
                }
                break;
        case 2:
                let str = "#face0#你要變更管家嗎？嗯……\r\n好吧，你要變更為誰呢？\r\n\r\n";
                str += (n == 0 ? "#L1##b#p9400921##k#l" : "#L0##b#p9400920##k#l");
                let nSel = npc.id(npcId).uiMax().askMenu(str);
                npcId = 9400920 + nSel;
                if (nSel == 0) {
                        for (let i = 1; i <= 5; i++) {
                                stage.updateQuestRecordExShare(500773, "b" + i, stage.getQuestRecordExShare(500773, "s" + i));
                                stage.updateQuestRecordExShare(500773, "s" + i, stage.getQuestRecordExShare(500773, "a" + i));
                        }
                } else {
                        for (let i = 1; i <= 5; i++) {
                                stage.updateQuestRecordExShare(500773, "a" + i, stage.getQuestRecordExShare(500773, "s" + i));
                                stage.updateQuestRecordExShare(500773, "s" + i, stage.getQuestRecordExShare(500773, "b" + i));
                        }
                }
                stage.updateQuestRecordExShare(500773, "manager", String(nSel));
                npc.id(npcId).ui(1).next().say("#face0#我又回來了！");
                break;
        case 3:
                let ret = npc.id(npcId).ui(1).next().askYesNo("是否要改變我當前位置到你現在所處的位置？");
                if (ret == 1) {
                        stage.destroyTempNpc(entity_0);
                        let x = stage.getPosX();
                        let y = stage.getPosY();
                        stage.updateQuestRecordExShare(500767, "managerXpos", String(x));
                        stage.updateQuestRecordExShare(500767, "managerYpos", String(y));
                        let entity_0 = stage.spawnTempNpc(9400930, x, y, managerFlip);
                        stage.setNpcSpecialAction(entity_0, "summon", 0, false);
                        stage.addTempValue("entity_0", entity_0);
                        npc.id(npcId).ui(1).next().say("#face0#好的，那今後就在這裡啦！");
                }
                break;
}