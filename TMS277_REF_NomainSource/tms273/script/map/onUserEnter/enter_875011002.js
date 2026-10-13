// Created by MetaMS
// ID:[875011002]
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
let entity_1 = stage.spawnTempNpc(9401795, 1050, -300, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
stage.setNpcForceFlip(entity_1, 1);
stage.setNpcFadeHide(entity_1, 0, 0);
dir.scale(1500).x(983).y(-600).setCameraZoom();
stage.setMapTaggedObjectSmoothVisible("gaia_0", true, 0, 0);
stage.setMapTaggedObjectSmoothVisible("gaia_1", true, 0, 0);
eff.blind(true).binary(255).r(240).g(240).b(240).type(2).setLayerBlind();
dir.setDelay(1000);
dir.duration(8000).scale(1500).timePos(8000).x(1450).y(-215).setCameraZoom();
eff.duration(200).setLayerBlind();
eff.key("00").uol("Effect/lynn.img/screen/2/1").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
dir.setDelay(3500);
stage.setNpcFadeHide(entity_1, 255, 2000);
stage.setNpcForceMove(entity_1, 1, 270, 120);
dir.setDelay(3500);
dir.uol("Effect/OnUserEff.img/emotion/shade").y(-30).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
dir.uol("Effect/OnUserEff.img/emotion/ddam").x(-20).y(-10).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
dir.setDelay(800);
usr.uol("VoiceWz2.img/Lynn/2/Female/1").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face5#呃啊啊。我為什麼總是做出這麼愚蠢的事情呢？");
usr.uol("VoiceWz2.img/Lynn/2/Female/2").value(100).playExclSoundWithDownBGM();
npc.id(9401792).ui(1).noEsc().next().say("#face0#你為什麼會這麼想？");
usr.uol("VoiceWz2.img/Lynn/2/Female/3").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#那孩子也許會記得我，而且他也不是個小嬰兒了！");
usr.uol("VoiceWz2.img/Lynn/2/Female/4").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#我也想像你一樣。要怎麼樣才能變得更有智慧呢？");
usr.uol("VoiceWz2.img/Lynn/2/Female/5").value(100).playExclSoundWithDownBGM();
npc.id(9401792).ui(1).noEsc().next().say("#face0#大地的守護者啊。你沒必要強迫自己變得聰明。");
dir.setDelay(500);
dir.uol("Effect/OnUserEff.img/emotion/whatl").x(10).y(-10).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
dir.setDelay(500);
usr.uol("VoiceWz2.img/Lynn/2/Female/6").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#…為什麼？");
dir.setDelay(500);
usr.uol("VoiceWz2.img/Lynn/2/Female/7").value(100).playExclSoundWithDownBGM();
npc.id(9401792).ui(1).noEsc().next().say("#face1#因為即使知道了，也會睜一隻眼閉一隻眼。累積了智慧，有時候反而更容易感到害怕。");
usr.uol("VoiceWz2.img/Lynn/2/Female/8").value(100).playExclSoundWithDownBGM();
npc.id(9401792).ui(1).noEsc().next().say("#face0#你不是也有，我所沒有的勇氣嗎。");
usr.uol("VoiceWz2.img/Lynn/2/Female/9").value(100).playExclSoundWithDownBGM();
npc.id(9401792).ui(1).noEsc().next().say("#face0#我雖然有幫助那孩子的轉世的力量，\r\n但沒有膽量離開這裡親自去找他。");
usr.uol("VoiceWz2.img/Lynn/2/Female/10").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#唉。那也是沒辦法的啊！");
usr.uol("VoiceWz2.img/Lynn/2/Female/11").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#身為森林之主的你，如果離開泉眼，支撐這裡的力量也會崩潰的！");
usr.uol("VoiceWz2.img/Lynn/2/Female/12").value(100).playExclSoundWithDownBGM();
npc.id(9401792).ui(1).noEsc().next().say("#face0#哈哈。是沒錯…。\r\n所以我才需要你的幫忙。 ");
usr.uol("VoiceWz2.img/Lynn/2/Female/13").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#是你故事裡提到的那個孩子吧？\r\n找了很久的那孩子。");
usr.uol("VoiceWz2.img/Lynn/2/Female/14").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#歷經幾生與我同生、共死…。");
eff.fadeIn(1000).fadeOut(2000).set(true).setOverlapDetail();
dir.scale(2500).x(1420).y(-180).setCameraZoom();
eff.delay(800).removeOverlapDetail();
dir.setDelay(2000);
stage.setMapTaggedObjectSmoothVisible("gaia_0", false, 0, 0);
dir.setDelay(1000);
npc.id(9401792).ui(1).noEsc().next().say("#face2#…….");
dir.setDelay(1000);
usr.uol("VoiceWz2.img/Lynn/2/Female/15").value(100).playExclSoundWithDownBGM();
npc.id(9401795).ui(1).noEsc().next().say("#face0#…很睏嗎？\r\n又睡著了呢。");
eff.key("01").uol("Effect/lynn.img/screen/3/0").set(true).duration(100).term(-1).action("cc").loop(true).ry(1).value(255).setIllustrationLayer();
dir.setDelay(3960);
eff.blind(true).binary(255).r(240).g(240).b(240).duration(1300).setLayerBlind();
dir.setDelay(1600);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setVansheeMode(false);
// Unhandled Message [43] Packet: 2B 01 00 00 00 2E 02 00 00 00 00 00 80 05 BB 46 E6 17 02 2A 00 00 00 00 00 
stage.destroyTempNpc(entity_1);
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(875011004, 0);