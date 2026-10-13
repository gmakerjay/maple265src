// Created by MetaMS
// ID:[875011004]
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
dir.scale(1500).x(550).y(-500).setCameraZoom();
// [LP_PlayAmbientSoundEx] [1E 00 53 6F 75 6E 64 45 66 66 57 7A 32 2E 69 6D 67 2F 4C 79 6E 6E 2F 73 6E 6F 77 73 74 6F 72 6D C8 00 00 00 ]
let entity_1 = stage.spawnTempNpc(9401795, 1300, -190, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(9401832, 1300, -190, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
stage.setNpcFadeHide(entity_2, 0, 0);
dir.setForcedFlip(-1);
// [LP_ForcedStatSet] [00 00 01 00 50 00 00 00 ]
stage.setForcedSpeedMax(80);
eff.blind(true).binary(255).r(240).g(240).b(240).type(2).setLayerBlind();
dir.setDelay(1000);
eff.duration(200).setLayerBlind();
eff.key("00").uol("Effect/lynn.img/screen/3/1").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
dir.duration(10000).scale(1500).timePos(10000).x(975).y(-200).value(5).setCameraZoom();
dir.setDelay(2500);
dir.moveDir(1).moveFixel(300).setForcedMove();
eff.uol("Sound/SoundEffWz2.img/Lynn/snow_footstep").volume(100).playSoundEffect();
stage.setNpcForceMove(entity_1, -1, 300, 70);
dir.setDelay(4000);
dir.setForcedFlip(1);
stage.setNpcSpecialEffect(entity_1, true, {'fall': -1});
eff.uol("Sound/SoundEffWz2.img/Lynn/pan_godown").volume(100).playSoundEffect();
dir.setDelay(500);
usr.uol("VoiceWz2.img/Lynn/3/Female/1").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face5#哎呀！");
stage.setUserEmotionLocal(2, 1000, false);
npc.id(9401783).ui(1).noEsc().next().say("#face1#…….");
dir.setDelay(500);
// [LP_ForcedStatSet] [00 00 01 00 50 00 00 00 ]
stage.setForcedSpeedMax(80);
eff.uol("Sound/SoundEffWz2.img/Lynn/snow_footstep").volume(100).playSoundEffect();
dir.moveDir(2).moveFixel(130).setForcedMove();
dir.setDelay(1500);
dir.uol("Effect/OnUserEff.img/emotion/oh").y(-10).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
usr.uol("VoiceWz2.img/Lynn/3/Female/2").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face3#…啊！");
usr.uol("VoiceWz2.img/Lynn/3/Female/3").value(100).playExclSoundWithDownBGM();
npc.id(9401783).ui(1).noEsc().next().say("#face1#你好？");
eff.blind(true).binary(255).r(240).g(240).b(240).duration(1500).type(2).setLayerBlind();
dir.setDelay(1500);
eff.key("01").uol("Effect/lynn.img/illust/C/1").duration(1000).term(-1).action("cc").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(500);
usr.uol("VoiceWz2.img/Lynn/3/Female/4").value(100).playExclSoundWithDownBGM();
npc.id(9401783).ui(1).noEsc().next().say("#face0#我們…以前也見過面吧？");
stage.setNpcFadeHide(entity_1, 0, 1);
stage.setNpcFadeHide(entity_2, 255, 1);
usr.uol("VoiceWz2.img/Lynn/3/Female/5").value(100).playExclSoundWithDownBGM();
npc.id(9401783).ui(1).noEsc().next().say("#face1#我的名字是琳恩。你呢？");
npc.id(9401795).ui(1).noEsc().next().say("#face3#!!!");
eff.key("01").duration(1000).offIllustrationLayer();
eff.duration(1500).setLayerBlind();
dir.setDelay(500);
stage.setNpcForceMove(entity_2, 1, 150, 150);
eff.uol("Sound/SoundEffWz2.img/Lynn/snow_footstep").volume(100).playSoundEffect();
dir.setDelay(1000);
stage.setNpcFadeHide(entity_2, 0, 1000);
stage.setUserEmotionLocal(6, 2000, false);
usr.uol("VoiceWz2.img/Lynn/3/Female/6").value(100).playExclSoundWithDownBGM();
npc.id(9401783).ui(1).noEsc().next().say("#face4#啊…！");
eff.key("02").uol("Effect/lynn.img/screen/0/0").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
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
stage.resetForcedStat();
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(875011005, 0);