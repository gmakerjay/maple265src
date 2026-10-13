// Created by MetaMS
// Quest ID:64601
// [我的小屋]开心的搬家聚会


npc.id(9400920).ui(1).noEsc().next().say("#face3#哇！好像已經有人來了！");
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
eff.blind(true).binary(255).duration(500).setLayerBlind();
dir.setDelay(500);
npc.startQuest();
let entity_1 = stage.spawnTempNpc(9400929, -260, 100, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(9400928, -210, 100, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
let entity_3 = stage.spawnTempNpc(9400923, -160, 100, 0);
stage.setNpcSpecialAction(entity_3, "summon", 0, false);
stage.teleportToPos(3, -110, 100);
let entity_4 = stage.spawnTempNpc(9400922, -60, 100, 1);
stage.setNpcSpecialAction(entity_4, "summon", 0, false);
let entity_5 = stage.spawnTempNpc(9400924, -10, 100, 1);
stage.setNpcSpecialAction(entity_5, "summon", 0, false);
let entity_6 = stage.spawnTempNpc(9400935, 40, 100, 1);
stage.setNpcSpecialAction(entity_6, "summon", 0, false);
let entity_7 = stage.spawnTempNpc(9400936, 90, 100, 1);
stage.setNpcSpecialAction(entity_7, "summon", 0, false);
stage.addTempValue("entity_1", entity_1);
stage.addTempValue("entity_2", entity_2);
stage.addTempValue("entity_3", entity_3);
stage.addTempValue("entity_4", entity_4);
stage.addTempValue("entity_5", entity_5);
stage.addTempValue("entity_6", entity_6);
stage.addTempValue("entity_7", entity_7);
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(1400);
dir.setDelay(300);
dir.setDelay(2000);
usr.normal(true).text("#fs15##b謝謝大家來參加。").time(2000).origin(1).lineSpace(4).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(2000);
usr.normal(true).text("這個房子空了很久，有新的人住進來真好。").time(2000).origin(1).lineSpace(4).npcId(9400931).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(2000);
usr.normal(true).text("是吧？有種村莊都充滿活力的感覺！").time(2000).origin(1).lineSpace(4).npcId(9400929).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(2000);
usr.normal(true).text("真雅致。").time(2000).origin(1).lineSpace(4).npcId(9400933).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(2000);
usr.normal(true).text("咦？我做的桌子！真帥氣！哈哈").time(2000).origin(1).lineSpace(4).npcId(9400932).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(2000);
usr.normal(true).text("勇士，我會常來玩的！").time(2000).origin(1).lineSpace(4).npcId(9400935).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(2000);
usr.normal(true).text("特魯迪~~你不跟姐姐玩，只跟勇士玩嗎？").time(2000).origin(1).lineSpace(4).npcId(9400928).chrId(stage.getCharacterId()).showSpeechBalloon();
eff.blind(true).binary(255).duration(500).setLayerBlind();
dir.setDelay(500);
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.destroyTempNpc(entity_7);
npc.completeQuest();
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(1400);
// Unhandled Ingame Direction Event [26] Packet: 1A BC 02 00 00 
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();