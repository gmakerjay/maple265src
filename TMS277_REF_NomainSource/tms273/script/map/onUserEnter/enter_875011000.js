// Created by MetaMS
// ID:[875011000]
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
let entity_1 = stage.spawnTempNpc(9401832, 1334, -215, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(9401780, 826, -408, 1);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
dir.scale(1500).x(1026).y(-250).setCameraZoom();
stage.setBackgroundByTag("tree", 1, 500);
stage.setMapTaggedObjectSmoothVisible("summer", false, 0, 0);
stage.setMapTaggedObjectSmoothVisible("fall", false, 0, 0);
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1000);
eff.duration(2000).setLayerBlind();
dir.setDelay(1000);
dir.setDelay(1000);
stage.setNpcForceMove(entity_2, -1, 50, 60);
dir.setDelay(1000);
dir.uol("Effect/OnUserEff.img/emotionBalloon/exclamation3").y(-30).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
dir.setDelay(500);
usr.uol("VoiceWz2.img/Lynn/1/Female/1").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face3#啊，孩子！危險！");
stage.setNpcForceMove(entity_1, -1, 100, 110);
dir.setDelay(1000);
stage.setNpcSpecialEffect(entity_1, true, {'slide': -1});
dir.setDelay(500);
eff.uol("Sound/SoundEffWz2.img/Lynn/pan_godown").volume(100).playSoundEffect();
dir.setDelay(2500);
usr.uol("VoiceWz2.img/Lynn/1/Female/2").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face5#唉呀呀…");
stage.setNpcForceFlip(entity_2, 1);
dir.setDelay(500);
eff.key("00").uol("Effect/lynn.img/illust/C/0").duration(1000).term(-1).action("cc").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(2000);
eff.blind(true).binary(255).r(240).g(240).b(240).duration(2000).type(2).setLayerBlind();
eff.key("00").duration(5000).offIllustrationLayer();
eff.key("01").uol("Effect/lynn.img/screen/0/0").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
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
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(875011001, 0);