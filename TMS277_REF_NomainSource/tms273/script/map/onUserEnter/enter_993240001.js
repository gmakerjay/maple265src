// Created by MetaMS
// ID:[993240001]
// MapName:王宮大廳


stage.resetForcedStat();
let entity_1 = stage.spawnTempNpc(3004430, 50, 220, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(3004431, -240, 220, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
let entity_3 = stage.spawnTempNpc(3004433, -200, 180, 0);
stage.setNpcSpecialAction(entity_3, "summon", 0, false);
let entity_4 = stage.spawnTempNpc(3004435, -300, 180, 0);
stage.setNpcSpecialAction(entity_4, "summon", 0, false);
let entity_5 = stage.spawnTempNpc(3004436, -400, 180, 0);
stage.setNpcSpecialAction(entity_5, "summon", 0, false);
let entity_6 = stage.spawnTempNpc(3004481, -500, 180, 0);
stage.setNpcSpecialAction(entity_6, "summon", 0, false);
let entity_7 = stage.spawnTempNpc(3004439, 600, 180, 1);
stage.setNpcSpecialAction(entity_7, "summon", 0, false);
let entity_8 = stage.spawnTempNpc(3004439, 400, 180, 1);
stage.setNpcSpecialAction(entity_8, "summon", 0, false);
let entity_9 = stage.spawnTempNpc(3004439, 500, 180, 1);
stage.setNpcSpecialAction(entity_9, "summon", 0, false);
let entity_10 = stage.spawnTempNpc(3004434, 150, 220, 1);
stage.setNpcSpecialAction(entity_10, "summon", 0, false);
let entity_11 = stage.spawnTempNpc(3004439, 600, 300, 1);
stage.setNpcSpecialAction(entity_11, "summon", 0, false);
let entity_12 = stage.spawnTempNpc(3004439, 400, 300, 1);
stage.setNpcSpecialAction(entity_12, "summon", 0, false);
let entity_13 = stage.spawnTempNpc(3004439, 500, 300, 1);
stage.setNpcSpecialAction(entity_13, "summon", 0, false);
// [LP_GroupChairSitResult] [54 3F 0C 01 00 00 00 00 00 00 00 ]
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
dir.scale(2000).y(210).setCameraZoom();
dir.setDelay(2500);
eff.duration(800).setLayerBlind();
stage.setFieldFloating(3, 3, 5, true, 500);//mapId:993240001
stage.setNpcSpecialEffect(entity_1, true, {'special15':1,'special16':-1});
eff.uol("Sound/SoundEff.img/cernium3/seren").volume(100).playSoundEffect();
dir.setDelay(4000);
stage.setFieldFloating(0, 0, 0, false, 0);//mapId:993240001
dir.setDelay(1000);
eff.uol("Bgm53/HolyWar").changeBGM();
eff.fadeIn(1000).fadeOut(3000).set(true).setOverlapDetail();
dir.scale(3000).x(50).y(220).setCameraZoom();
stage.setNpcFadeHide(entity_10, 0, 500);
dir.setDelay(1000);
stage.setFieldFloating(3, 3, 8, false, 0);//mapId:993240001
eff.delay(1000).removeOverlapDetail();
dir.setDelay(2000);
npc.id(3004431).ui(1).next().say("#face4#怎麼可能！");
dir.setDelay(1500);
usr.uol("Voice12.img/HighMountain/S#0_1.mp3").value(100).playExclSoundWithDownBGM();
usr.text("#r#fnNanum Gothic ExtraBold##fs26#太陽的火焰從不遺忘復仇。").speed(100).time(2500).local(4).posY(200).align(1).lineSpace(4).showTextEffect();
dir.setDelay(6500);
stage.setFieldFloating(0, 0, 0, false, 0);//mapId:993240001
dir.setDelay(1000);
eff.fadeIn(1000).fadeOut(3000).set(true).setOverlapDetail();
dir.scale(1000).y(90).setCameraZoom();
dir.setDelay(1000);
stage.setFieldFloating(3, 3, 8, false, 0);//mapId:993240001
eff.delay(1000).removeOverlapDetail();
dir.setDelay(1000);
stage.setNpcSpecialEffect(entity_1, true, {'special17':1,'special18':-1});
eff.uol("Sound/SoundEff.img/cernium3/serenAttack").volume(100).playSoundEffect();
eff.term(1000).key("01").z(-20).uol("Effect/Direction23.img/effect2/7").location(4).removeAfter(-1).type(-1).duration(-1).setLayerOn();
dir.setDelay(4000);
eff.blind(true).binary(255).r(240).g(240).b(240).duration(150).setLayerBlind();
dir.setDelay(1000);
eff.uol("Sound/SoundEff.img/morass/tana2").volume(100).playSoundEffect();
dir.setDelay(4000);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.destroyTempNpc(entity_3);
stage.destroyTempNpc(entity_4);
stage.destroyTempNpc(entity_5);
stage.destroyTempNpc(entity_6);
stage.destroyTempNpc(entity_7);
stage.destroyTempNpc(entity_8);
stage.destroyTempNpc(entity_9);
stage.destroyTempNpc(entity_10);
stage.destroyTempNpc(entity_11);
stage.destroyTempNpc(entity_12);
stage.destroyTempNpc(entity_13);
stage.changeMap(993240002, 0);