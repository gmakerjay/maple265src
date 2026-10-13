// Created by MetaMS
// ID:[993240004]
// MapName:高山入口


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
let entity_1 = stage.spawnTempNpc(3006701, 420, 640, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
stage.setNpcForceFlip(entity_1, -1);
stage.setNpcSpecialEffect(entity_1, true, {'God': -1});
stage.setNpcActionLayerRelMove(3006701, -240, -1000, 0);
let entity_2 = stage.spawnTempNpc(3006702, -1750, 630, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
stage.setNpcForceFlip(entity_2, 1);
eff.blind(true).binary(255).setLayerBlind();
dir.scale(900).y(-700).setCameraZoom();
dir.setDelay(300);
dir.duration(8000).scale(900).timePos(8000).y(-200).setCameraZoom();
// [LP_ForcedStatSet] [00 00 01 00 64 00 00 00 ]
stage.setForcedSpeedMax(100);
dir.setVansheeMode(true);
eff.blind(true).binary(255).type(2).setLayerBlind();
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(1400);
dir.setDelay(3000);
eff.fadeIn(1500).fadeOut(1500).set(true).setOverlapDetail();
dir.resetCameraZoom();
eff.delay(1500).removeOverlapDetail();
dir.scale(1200).y(-260).setCameraZoom();
dir.setDelay(1500);
usr.uol("Voice12.img/HighMountain/S#3_1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#該死，我到底是時隔多久睜開眼的？");
usr.uol("Voice12.img/HighMountain/S#3_2.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#心情又更糟了，居然偏偏因為敵對者那小子大聲嚷嚷的放肆嗓音而醒來。");
usr.uol("Voice12.img/HighMountain/S#3_3.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face6#話說回來，天族們都去哪了？");
usr.uol("Voice12.img/HighMountain/S#3_4.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face6#好不容易清掃完的高山居然變成充滿泰奴斯那傢伙走狗的鬼樣。");
usr.uol("Voice12.img/HighMountain/S#3_5.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#呿，到底發生什麼事了？");
usr.uol("Voice12.img/HighMountain/S#3_6.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face0#我必須再次搞清楚現況。");
usr.uol("Voice12.img/HighMountain/S#3_7.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face2#敵對者這傢伙，給我等著，我要讓你知道讓神發怒會有什麼懲罰。");
dir.setDelay(1000);
stage.setFieldFloating(1, 1, 1, true, 0);//mapId:993240004
stage.resetNpcSpecialAction(entity_1);
eff.uol("Sound/SoundEff.img/yumyum/flower").volume(128).playSoundEffect();
stage.setNpcSpecialEffect(entity_1, true, {'Jump': 1});
dir.setDelay(300);
dir.duration(1500).scale(1100).timePos(1500).y(-650).value(5).setCameraZoom();
dir.setDelay(500);
stage.setNpcFadeHide(entity_1, 0, 300);
dir.setDelay(1500);
stage.setFieldFloating(0, 0, 0, false, 0);//mapId:993240004
dir.setDelay(3000);
dir.duration(6000).scale(1300).timePos(6000).x(-1500).y(620).value(5).setCameraZoom();
dir.setDelay(2000);
stage.setNpcForceMove(entity_2, 1, 200, 100);
dir.setDelay(2000);
dir.setDelay(2500);
npc.id(3006702).ui(1).next().say("#face0#…");
usr.uol("Voice12.img/HighMountain/S#3_8.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#結果我還是回到了原點。");
usr.uol("Voice12.img/HighMountain/S#3_9.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#聖劍阿索爾的修復，能夠在這個地方找到答案嗎？");
usr.uol("Voice12.img/HighMountain/S#3_10.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#雖然有可能會成為困難的旅行…");
usr.uol("Voice12.img/HighMountain/S#3_11.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#我們走吧。");
dir.setDelay(800);
stage.setNpcForceMove(entity_2, 1, 300, 100);
dir.duration(7000).scale(1000).timePos(7000).y(-330).value(5).setCameraZoom();
dir.setDelay(7000);
eff.key("00").uol("Effect/HighMountain.img/spine/2/skeleton").set(true).x(-35).y(-120).action("animation").binary(255).setSkeletonLayer();
eff.uol("Sound/SoundEff.img/esfera/defence").volume(100).playSoundEffect();
dir.setDelay(8000);
eff.blind(true).binary(255).duration(500).type(2).setLayerBlind();
dir.setDelay(500);
stage.gainExp(1189519364);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
/* Update Quest RecordEx | Id:26218 | Name: Unknown | Data: "start=1;dir=1" */
stage.updateQuestRecordEx(26218, "dir", "1");
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.resetForcedStat();
stage.changeMap(993241000, 0);