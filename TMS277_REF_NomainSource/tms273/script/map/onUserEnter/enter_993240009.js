// Created by MetaMS
// ID:[993240009]
// MapName:市中心入口


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
eff.uol("BgmED/highMountain_n").changeBGM();
dir.setVansheeMode(true);
eff.blind(true).binary(255).setLayerBlind();
dir.scale(900).x(-559).y(313).setCameraZoom();
let entity_1 = stage.spawnTempNpc(3006702, -40, -166, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(3006701, 60, -166, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
stage.setNpcFadeHide(entity_1, 0, 0);
stage.setNpcFadeHide(entity_2, 0, 0);
dir.setDelay(500);
dir.duration(6000).scale(900).timePos(6000).x(1382).y(-518).setCameraZoom();
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(4500);
eff.fadeIn(1000).fadeOut(3000).set(true).setOverlapDetail();
dir.scale(1000).x(2147483647).y(2147483647).setCameraZoom();
dir.setCameraReleaseByType(0);
dir.setDelay(300);
eff.delay(1000).removeOverlapDetail();
dir.scale(1500).x(312).y(-70).setCameraZoom();
stage.setNpcFadeHide(entity_1, 255, 800);
stage.setNpcFadeHide(entity_2, 255, 800);
stage.setNpcForceMove(entity_1, 1, 220, 130);
stage.setNpcForceMove(entity_2, 1, 220, 130);
dir.setDelay(2800);
stage.setNpcForceFlip(entity_2, -1);
usr.uol("Voice12.img/HighMountain/S#8_1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).noEsc().next().say("#face0#這前面就是黃金地帶區域。");
usr.uol("Voice12.img/HighMountain/S#8_2.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).noEsc().next().say("#face0#後勤基地、大聖堂還有…我長大的居住區所在地。");
usr.uol("Voice12.img/HighMountain/S#8_3.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).noEsc().next().say("#face0#應該沒有任何天族留下來吧？");
usr.uol("Voice12.img/HighMountain/S#8_4.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).noEsc().next().say("#face5#至少……在這座高山上…並不存在。");
usr.uol("Voice12.img/HighMountain/S#8_5.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).noEsc().next().say("#face2#太好了。");
stage.setNpcForceFlip(entity_2, 1);
usr.uol("Voice12.img/HighMountain/S#8_6.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).noEsc().next().say("#face3#因為我從現在開始要毫不保留地全部粉碎。");
usr.uol("Voice12.img/HighMountain/S#8_7.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).noEsc().next().say("#face4#怎麼會……");
// [LP_PrivateServerValue] [50 6B 00 00 ]
usr.uol("Voice12.img/HighMountain/S#8_8.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).noEsc().next().say("#face3#我不需要介紹，不要妨礙我。");
stage.setNpcForceMove(entity_2, 1, 180, 150);
dir.setDelay(800);
stage.setNpcFadeHide(entity_2, 0, 800);
dir.setDelay(1200);
usr.uol("Voice12.img/HighMountain/S#8_9.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).noEsc().next().say("#face6#哈啊，又走了……");
stage.setNpcForceMove(entity_1, 1, 180, 130);
dir.duration(3000).scale(1500).timePos(3000).x(362).y(-70).setCameraZoom();
dir.setDelay(1200);
eff.blind(true).binary(255).duration(500).type(2).setLayerBlind();
dir.setDelay(500);
dir.setVansheeMode(false);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
/* Update Quest RecordEx | Id:26218 | Name: Unknown | Data: "start=1;dir=4" */
stage.updateQuestRecordEx(26218, "dir", "4");
stage.completeQuest(26212);//Quest Name:[史詩副本] 古代的封印
stage.gainExp(1189519364);
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.changeMap(993241020, 0);