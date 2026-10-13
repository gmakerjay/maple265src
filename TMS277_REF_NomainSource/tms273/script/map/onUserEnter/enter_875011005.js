// Created by MetaMS
// ID:[875011005]
// MapName:輪迴的泉眼


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
dir.scale(1000).x(1200).y(-652).setCameraZoom();
let entity_1 = stage.spawnTempNpc(9401832, 900, -225, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
stage.setNpcForceFlip(entity_1, 1);
stage.setNpcFadeHide(entity_1, 0, 0);
stage.setMapTaggedObjectSmoothVisible("fire", false, 0, 0);
stage.setMapTaggedObjectSmoothVisible("gaia_1", true, 0, 0);
stage.setMapTaggedObjectSmoothVisible("gaia_0", false, 0, 0);
eff.blind(true).binary(255).r(240).g(240).b(240).type(2).setLayerBlind();
dir.setDelay(1000);
eff.duration(200).setLayerBlind();
eff.key("00").uol("Effect/lynn.img/screen/0/1").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
dir.duration(5000).scale(1000).timePos(5000).x(1200).y(-300).value(2).setCameraZoom();
dir.setDelay(5000);
stage.setNpcFadeHide(entity_1, 255, 1500);
stage.setNpcForceMove(entity_1, 1, 350, 150);
dir.duration(5000).scale(1000).timePos(5000).x(1400).y(-300).value(2).setCameraZoom();
dir.setDelay(4000);
usr.uol("VoiceWz2.img/Lynn/4/Female/1").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#醒醒啊…！\r\n是你找了很久的孩子。他說他的名字叫#b琳恩#k！");
usr.uol("VoiceWz2.img/Lynn/4/Female/2").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#也許…這次可能會不一樣！");
usr.uol("VoiceWz2.img/Lynn/4/Female/3").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#可是當他問起我的名字時，我就逃走了。\r\n差點#r不由自主的回答了#k。");
usr.uol("VoiceWz2.img/Lynn/4/Female/4").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face4#你不是說過嗎。在這片森林裡有名字的動物…\r\n在森林之子沒有叫出來之前，是不能說出自己的名字。");
usr.uol("VoiceWz2.img/Lynn/4/Female/5").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#因為有可能會再也見不到…森林之子。");
npc.id(9401792).ui(1).noEsc().next().say("#face2#…….");
usr.uol("VoiceWz2.img/Lynn/4/Female/6").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face4#很睏嗎…？");
stage.setMapTaggedObjectSmoothVisible("fire", true, 0, 0);
dir.setDelay(1000);
dir.uol("Effect/OnUserEff.img/emotionBalloon/exclamation3").y(-30).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
dir.setDelay(500);
stage.setMapTaggedObjectSmoothVisible("fire", false, 0, 0);
dir.setDelay(1000);
usr.uol("VoiceWz2.img/Lynn/4/Female/7").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face5#啊！不行。\r\n等等，再等我一下。我…我來…我來拜託那個孩子。");
dir.duration(5000).scale(1000).timePos(5000).x(770).y(-300).value(2).setCameraZoom();
stage.setNpcForceFlip(entity_1, -1);
stage.setNpcForceMove(entity_1, -1, 520, 150);
dir.setDelay(5500);
usr.uol("VoiceWz2.img/Lynn/4/Female/8").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#如果你找的那個孩子，就是森林之子的話。");
dir.uol("Effect/OnUserEff.img/emotionBalloon/noSpeak").y(-10).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
dir.setDelay(1000);
usr.uol("VoiceWz2.img/Lynn/4/Female/9").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face4#那該有多好啊…");
dir.setDelay(1000);
eff.fadeIn(1000).fadeOut(2000).set(true).setOverlapDetail();
dir.scale(2000).x(700).y(-180).setCameraZoom();
// [LP_PrivateServerValue] [0C 10 00 00 ]
eff.delay(800).removeOverlapDetail();
dir.setDelay(1200);
stage.setNpcForceFlip(entity_1, 1);
usr.uol("VoiceWz2.img/Lynn/4/Female/10").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face5#那樣，我們就能互相叫出對方的名字嗎？");
dir.setDelay(1000);
stage.setNpcForceFlip(entity_1, -1);
stage.setNpcForceMove(entity_1, -1, 500, 150);
dir.setDelay(800);
stage.setNpcFadeHide(entity_1, 0, 1500);
dir.setDelay(2000);
eff.uol("Bgm00.img/Silence").x(2500).changeBGM();
dir.setDelay(1000);
eff.fadeIn(1000).fadeOut(2000).set(true).setOverlapDetail();
dir.scale(2000).x(2216).y(-300).setCameraZoom();
eff.delay(800).removeOverlapDetail();
dir.setDelay(2000);
dir.uol("Effect/lynn.img/effect/2/0").x(2392).y(-320).overlay(true).overlayX(-299999).npc(true).notOrigin(true).setEffectPlay();
eff.uol("Sound/SoundEffWz2.img/Lynn/sway").volume(100).playSoundEffect();
dir.setDelay(3000);
eff.blind(true).binary(255).duration(500).setLayerBlind();
dir.setDelay(500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setVansheeMode(false);
// Unhandled Message [43] Packet: 2B 01 00 00 00 2E 02 00 00 00 00 00 80 05 BB 46 E6 17 02 2A 00 00 00 00 00 
stage.destroyTempNpc(entity_1);
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(875011006, 0);