// Created by MetaMS
// ID:[993240005]
// MapName:草原封印區域入口


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
let entity_1 = stage.spawnTempNpc(3006701, -450, 850, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
stage.setNpcForceFlip(entity_1, 1);
eff.blind(true).binary(255).setLayerBlind();
dir.scale(900).y(300).setCameraZoom();
dir.setDelay(300);
dir.duration(5500).scale(1000).timePos(5500).y(850).setCameraZoom();
// [LP_ForcedStatSet] [00 00 01 00 64 00 00 00 ]
stage.setForcedSpeedMax(100);
dir.setVansheeMode(true);
stage.setMapTaggedObjectVisible("clear1", true, 0, 0);
stage.setMapTaggedObjectVisible("clear0", false, 0, 0);
eff.blind(true).binary(255).type(2).setLayerBlind();
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(1400);
dir.setDelay(1500);
usr.uol("Voice12.img/HighMountain/S#4_1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#呼嗚，這裡也很久沒看到了。");
usr.uol("Voice12.img/HighMountain/S#4_2.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#泰奴斯這小子，我是分成三個部分封印在高山下了嗎？");
usr.uol("Voice12.img/HighMountain/S#4_3.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#是我親自封印的，應該不可能有錯啊。");
usr.uol("Voice12.img/HighMountain/S#4_4.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#很好，我要確認一下才行。");
stage.setNpcForceMove(entity_1, 1, 50, 100);
dir.setDelay(1500);
usr.uol("Voice12.img/HighMountain/S#4_5.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#我看看，鑰匙…");
dir.setDelay(1500);
usr.normal(true).text("……").time(2000).origin(1).lineSpace(4).npcId(3006701).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(1000);
dir.duration(3000).scale(1200).timePos(3000).x(-50).y(870).value(5).setCameraZoom();
dir.setDelay(2000);
eff.uol("Sound/Skill.img/37121000/Use").volume(100).playSoundEffect();
stage.setNpcSpecialEffect(entity_1, true, {'Doorbreak': 1, 'Battle': -1});
dir.setDelay(1000);
eff.uol("Sound/SoundEff.img/blackHeaven/explosion2").volume(100).playSoundEffect();
eff.key("00").uol("Effect/HighMountain.img/effect/Mitra_break_door").x(270).y(10).duration(100).term(-1).action("npc" + entity_1).rx(2).ry(1).value(255).setIllustrationLayer();
stage.setFieldFloating(10, 10, 10, true, 0);//mapId:993240005
dir.setDelay(500);
stage.setMapTaggedObjectVisible("clear1", false, 0, 0);
stage.setMapTaggedObjectVisible("clear0", true, 0, 0);
stage.setFieldFloating(0, 0, 0, false, 0);//mapId:993240005
dir.setDelay(1500);
usr.uol("Voice12.img/HighMountain/S#4_6.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face2#當然不需要那種東西。");
usr.uol("Voice12.img/HighMountain/S#4_7.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face3#好，那走吧？");
dir.setDelay(1500);
eff.blind(true).binary(255).duration(500).type(2).setLayerBlind();
dir.setDelay(500);
dir.setDelay(800);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
/* Update Quest RecordEx | Id:26218 | Name: Unknown | Data: "start=1;dir=2" */
stage.updateQuestRecordEx(26218, "dir", "2");
stage.completeQuest(26211);//Quest Name:[史詩副本] 消失的天族
stage.gainExp(1189519364);
stage.destroyTempNpc(entity_1);
stage.resetForcedStat();
stage.changeMap(993241010, 0);