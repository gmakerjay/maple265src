// Created by MetaMS
// ID:[993240021]
// MapName:市中心封印區域入口


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
eff.blind(true).binary(255).setLayerBlind();
dir.scale(1500).x(250).y(-130).setCameraZoom();
let entity_1 = stage.spawnTempNpc(3006714, 500, -100, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(3006701, 100, -100, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
stage.setNpcForceFlip(entity_1, -1);
dir.setVansheeMode(true);
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(800);
usr.uol("Voice12.img/HighMountain/S#9_1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#這裡還是這樣啊。");
usr.uol("Voice12.img/HighMountain/S#9_2.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#埋在這裡的傢伙…嗯，");
usr.uol("Voice12.img/HighMountain/S#9_3.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#是#b褻瀆#k嗎？");
usr.uol("Voice12.img/HighMountain/S#9_4.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#在那個煩人的傢伙追來之前要趕快清掉才行。");
dir.duration(1500).scale(1500).timePos(1500).x(300).y(-130).value(5).setCameraZoom();
eff.uol("Sound/Skill.img/37121000/Use").volume(100).playSoundEffect();
stage.setNpcSpecialAction(entity_2, "Doorbreak", 1, true);
dir.setDelay(1000);
stage.setFieldFloating(50, 10, 20, true, 500);//mapId:993240021
eff.key("00").uol("Effect/HighMountain.img/effect/Mitra_break_door").x(-10).duration(100).term(-1).action("npc" + entity_1).rx(2).ry(1).value(255).setIllustrationLayer();
usr.uol("SoundEff.img/blackHeaven/explosion2").value(100).playExclSoundWithDownBGM();
dir.setDelay(500);
stage.setNpcSpecialAction(entity_1, "break", -1, true);
stage.setFieldFloating(0, 0, 0, true, 1000);//mapId:993240021
dir.setDelay(100);
stage.setNpcSpecialAction(entity_2, "battle", -1, true);
dir.setDelay(1000);
eff.blind(true).binary(255).duration(500).type(2).setLayerBlind();
dir.setDelay(500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
/* Update Quest RecordEx | Id:26218 | Name: Unknown | Data: "start=1;dir=5" */
stage.updateQuestRecordEx(26218, "dir", "5");
stage.completeQuest(26213);//Quest Name:[史詩副本] 奇妙的同行
stage.gainExp(1189519364);
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.changeMap(993241030, 0);