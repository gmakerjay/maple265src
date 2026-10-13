// Created by MetaMS
// My home manager pos

let n = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + n;
let managerFlip = npc.id(npcId).uiMax().askMenu("#face1# 要改變位置嗎？哪裡比較好呢？\r\n\r\n#r※將當前角色所站之處變更為管家位置。\r\n\r\n#L0##b左視圖#k#l\r\n#L1##b右視圖#k#l");

let entity_0 = stage.getTempValue("entity_0");
stage.destroyTempNpc(entity_0);

let x = stage.getPosX();
let y = stage.getPosY();

stage.updateQuestRecordExShare(500767, "managerXpos", String(x));
stage.updateQuestRecordExShare(500767, "managerYpos", String(y));
stage.updateQuestRecordExShare(500767, "managerFlip", String(managerFlip));

let face = managerFlip == 1 ? 0 : 1;

let m_entID = stage.spawnTempNpc(9400930, x, y, face);
stage.setNpcSpecialAction(m_entID, "summon", 0, false);
stage.addTempValue("entity_0", m_entID);
npc.id(npcId).ui(1).next().say("#face0#好的！以後這裡就是我的位置了啊？");
