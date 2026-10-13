// Created by MetaMS
// ID:[993240022]
// MapName:雪原封印區域入口


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
eff.blind(true).binary(255).setLayerBlind();
dir.scale(1500).y(200).setCameraZoom();
let entity_1 = stage.spawnTempNpc(3006715, 197, 229, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(3006701, -200, 229, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
stage.setNpcForceFlip(entity_1, -1);
dir.setVansheeMode(true);
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(800);
usr.uol("Voice12.img/HighMountain/S#13_1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#哼，這是泰奴斯那傢伙的最後一塊碎片了嗎？");
usr.uol("Voice12.img/HighMountain/S#13_2.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#長久歲月的惡緣，就在這裡結束。");
usr.uol("Voice12.img/HighMountain/S#13_3.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#話說回來賽蓮那傢伙，完全不見蹤影了…該不會到那裡了吧？");
usr.uol("Voice12.img/HighMountain/S#13_4.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#那也是個問題，我得去看看了。");
dir.duration(1500).scale(1500).timePos(1500).x(100).y(200).value(3).setCameraZoom();
eff.uol("Sound/Skill.img/37121000/Use").volume(100).playSoundEffect();
stage.setNpcSpecialAction(entity_2, "Doorbreak", 1, true);
dir.setDelay(1000);
eff.key("00").uol("Effect/HighMountain.img/effect/Mitra_break_door").x(-10).duration(100).term(-1).action("npc" + entity_1).rx(2).ry(1).value(255).setIllustrationLayer();
stage.setFieldFloating(50, 10, 20, false, 0);//mapId:993240022
usr.uol("SoundEff.img/blackHeaven/explosion2").value(100).playExclSoundWithDownBGM();
dir.setDelay(500);
stage.setNpcSpecialAction(entity_1, "break", -1, true);
stage.setFieldFloating(0, 0, 0, false, 0);//mapId:993240022
dir.setDelay(100);
stage.setNpcSpecialAction(entity_2, "battle", -1, true);
dir.setDelay(500);
dir.setDelay(1000);
eff.blind(true).binary(255).duration(500).type(2).setLayerBlind();
dir.setDelay(500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
/* Update Quest RecordEx | Id:26218 | Name: Unknown | Data: "start=1;dir=8" */
stage.updateQuestRecordEx(26218, "dir", "8");
stage.completeQuest(26215);//Quest Name:[史詩副本] 長久的宿敵
stage.gainExp(1189519364);
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.changeMap(993241050, 0);