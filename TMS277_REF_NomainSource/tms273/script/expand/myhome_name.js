// Created by MetaMS
// My home setting

let n = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + n;
let old = stage.getQuestRecordExShare(500763, "name");
if (old == null) {
        old = stage.getCharacterName() + "'的我的小屋";
}
let name = npc.id(npcId).ui(1).minLen(4).maxLen(30).askText("#face0#當前的我的小屋名字為 #b" + old + "#k。你要變更為什麼名字呢？\r\n\r\n");
ctx.setMyHomeName(name);
npc.id(npcId).ui(1).next().say("#face1#我的小屋的名字已變為#b" + name + "#k！");