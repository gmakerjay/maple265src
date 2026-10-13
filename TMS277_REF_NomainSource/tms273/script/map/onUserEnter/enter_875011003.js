// Created by MetaMS
// ID:[875011003]
// MapName:森林入口小屋


// [LP_SetEventUnknown] [00 ]
// [LP_SetEventUIInfoEx] [00 00 00 00 00 ]
// [LP_SetEventUIInfoEx] [01 00 00 00 00 ]
// [LP_SetEventUIInfoEx] [02 00 00 00 00 ]
// [LP_SetEventUIInfoEx] [03 00 00 00 00 ]
stage.resetForcedStat();
// [LP_InitSafeZoneObj] [00 00 00 00 00 ]
// [LP_InitFieldWeather] [00 00 00 00 ]
// [LP_QuestEffectResult] [FA A4 07 00 00 00 00 00 00 ]
// [LP_RunningEventInfo] [00 ]
// [LP_SetPracticeMode] [00 ]
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setVansheeMode(true);
let entity_1 = stage.spawnTempNpc(9401795, 1300, -190, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(9401834, 1154, -190, 1);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
let entity_3 = stage.spawnTempNpc(9401804, 242, -190, 0);
stage.setNpcSpecialAction(entity_3, "summon", 0, false);
stage.setNpcFadeHide(entity_3, 0, 0);
let entity_4 = stage.spawnTempNpc(9401781, 1000, -190, 1);
stage.setNpcSpecialAction(entity_4, "summon", 0, false);
dir.scale(1500).x(916).y(-250).setCameraZoom();
eff.blind(true).binary(255).r(240).g(240).b(240).type(2).setLayerBlind();
dir.setDelay(1000);
eff.duration(200).setLayerBlind();
eff.key("00").uol("Effect/lynn.img/screen/1/1").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
dir.setDelay(1800);
stage.setNpcForceMove(entity_4, -1, 100, 60);
dir.setDelay(500);
stage.setNpcForceMove(entity_1, -1, 100, 70);
dir.setDelay(1500);
usr.normal(true).linkType(1).text("嗯？").time(1500).origin(1).posY(-5).lineSpace(4).npcId(9401781).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(1300);
stage.setNpcSpecialEffect(entity_4, true, {'turn': -1});
dir.setDelay(300);
dir.uol("Effect/OnUserEff.img/emotion/oh").y(-10).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
dir.setDelay(500);
stage.setNpcFadeHide(entity_1, 0, 0);
stage.setNpcSpecialEffect(entity_2, true, {'hide': 1, 'hide2': 1, 'stand': -1});
dir.setDelay(5500);
npc.id(9401781).ui(1).noEsc().next().say("#face1#…….");
dir.setDelay(1000);
stage.resetNpcSpecialAction(entity_4);
dir.setDelay(1000);
stage.setNpcForceMove(entity_4, -1, 200, 60);
dir.setDelay(1000);
stage.setNpcFadeHide(entity_4, 0, 1000);
dir.setDelay(1000);
eff.fadeIn(1000).fadeOut(2000).set(true).setOverlapDetail();
dir.scale(1000).x(766).y(-300).setCameraZoom();
eff.delay(800).removeOverlapDetail();
dir.setDelay(1200);
eff.uol("Sound/SoundEffWz2.img/Lynn/rustle").volume(100).playSoundEffect();
stage.setNpcFadeHide(entity_3, 255, 2000);
stage.setNpcForceMove(entity_3, 1, 100, 70);
dir.setDelay(2000);
npc.id(9401801).ui(1).noEsc().next().say("#face2#…….");
dir.setDelay(1000);
eff.key("01").uol("Effect/lynn.img/screen/2/0").set(true).duration(100).term(-1).action("cc").ry(1).value(255).setIllustrationLayer();
dir.setDelay(3960);
eff.blind(true).binary(255).r(240).g(240).b(240).duration(1300).setLayerBlind();
dir.setDelay(1600);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setVansheeMode(false);
// Unhandled Message [43] Packet: 2B 01 00 00 00 2E 02 00 00 00 00 00 80 05 BB 46 E6 17 02 2A 00 00 00 00 00 
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.destroyTempNpc(entity_3);
stage.destroyTempNpc(entity_4);
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(875011002, 0);