// Created by MetaMS
// ID:[875011001]
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
// [LP_PlayAmbientSoundEx] [19 00 53 6F 75 6E 64 45 66 66 57 7A 32 2E 69 6D 67 2F 4C 79 6E 6E 2F 72 61 69 6E 2C 01 00 00 ]
let entity_1 = stage.spawnTempNpc(9401837, 347, -262, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
stage.setNpcFadeHide(entity_1, 0, 0);
let entity_2 = stage.spawnTempNpc(9401795, 1230, -200, 1);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
stage.setNpcForceFlip(entity_2, 1);
eff.blind(true).binary(255).r(240).g(240).b(240).type(2).setLayerBlind();
dir.setDelay(1000);
eff.duration(200).setLayerBlind();
eff.key("00").uol("Effect/lynn.img/screen/0/1").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
dir.setDelay(1000);
stage.setNpcFadeHide(entity_1, 255, 1000);
dir.setDelay(1300);
stage.setNpcForceFlip(entity_1, 1);
dir.setDelay(1000);
npc.id(9401781).ui(1).noEsc().next().say("#face0#!");
eff.fadeIn(1000).fadeOut(2000).set(true).setOverlapDetail();
dir.scale(1500).x(700).y(-290).setCameraZoom();
stage.destroyTempNpc(entity_1);
let entity_3 = stage.spawnTempNpc(9401837, 850, -200, 1);
stage.setNpcSpecialAction(entity_3, "summon", 0, false);
stage.setNpcForceFlip(entity_3, 1);
stage.setNpcForceMove(entity_3, 1, 255, 60);
eff.delay(2000).removeOverlapDetail();
dir.setDelay(2500);
dir.duration(2000).scale(1500).timePos(5000).x(1000).y(-290).setCameraZoom();
dir.setDelay(3500);
stage.setNpcSpecialEffect(entity_3, true, {'leaf': 1, 'leaf2': -1});
dir.setDelay(2300);
eff.key("01").uol("Effect/lynn.img/illust/F/0").duration(1000).term(-1).action("cc").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(2000);
eff.blind(true).binary(255).r(240).g(240).b(240).duration(2000).type(2).setLayerBlind();
eff.key("01").duration(5000).offIllustrationLayer();
eff.key("02").uol("Effect/lynn.img/screen/1/0").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
dir.setDelay(3960);
eff.blind(true).binary(255).r(240).g(240).b(240).duration(1300).setLayerBlind();
dir.setDelay(1600);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setVansheeMode(false);
// Unhandled Message [43] Packet: 2B 01 00 00 00 2E 02 00 00 00 00 00 80 05 BB 46 E6 17 02 2A 00 00 00 00 00 
stage.destroyTempNpc(entity_2);
stage.destroyTempNpc(entity_3);
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(875011003, 0);