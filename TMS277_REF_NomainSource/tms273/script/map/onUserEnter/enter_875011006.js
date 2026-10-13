// Created by MetaMS
// ID:[875011006]
// MapName:森林的路口


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
eff.uol("Bgm00.img/Silence").changeBGM();
dir.uol("SoundEffWz2.img/Lynn/wind").volume(400).value(60).playAmbientSound();
dir.scale(1000).x(1300).y(-300).setCameraZoom();
let entity_1 = stage.spawnTempNpc(9401833, 1000, -150, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(9401839, 1400, -150, 1);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1000);
eff.duration(2000).setLayerBlind();
dir.setDelay(1000);
dir.duration(3500).scale(1500).timePos(3500).x(1200).y(-200).value(2).setCameraZoom();
stage.setNpcForceMove(entity_1, -1, 40, 70);
dir.setDelay(1000);
dir.setDelay(1000);
stage.setNpcForceMove(entity_2, -1, 150, 70);
npc.id(9401795).ui(1).noEsc().next().say("#face3#……!!");
dir.setDelay(2000);
dir.duration(5000).scale(1500).timePos(5000).x(1000).y(-200).value(2).setCameraZoom();
stage.setNpcForceMove(entity_1, -1, 100, 90);
stage.setNpcForceMove(entity_2, -1, 200, 40);
dir.setDelay(6000);
eff.blind(true).binary(255).duration(1000).setLayerBlind();
dir.setDelay(1300);
dir.setDelay(500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setVansheeMode(false);
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(875011007, 0);