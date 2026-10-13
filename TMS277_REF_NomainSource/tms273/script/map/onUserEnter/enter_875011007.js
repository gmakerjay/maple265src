// Created by MetaMS
// ID:[875011007]
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
dir.scale(1500).x(1200).y(300).setCameraZoom();
eff.uol("Bgm00.img/Silence").changeBGM();
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1000);
eff.duration(2000).setLayerBlind();
dir.setDelay(1000);
dir.setDelay(1000);
stage.setMapTaggedObjectSmoothVisible("entrance", false, 0, 0);
dir.uol("Effect/lynn.img/effect/0_1/0").x(468).y(407).overlay(true).overlayX(-199999).npc(true).notOrigin(true).setEffectPlay();
dir.uol("Effect/lynn.img/effect/0_2/0").x(468).y(407).overlay(true).overlayX(-299999).npc(true).notOrigin(true).setEffectPlay();
eff.uol("Sound/SoundEffWz2.img/Lynn/pan_godown").volume(128).playSoundEffect();
dir.setDelay(2500);
eff.fadeIn(1000).fadeOut(2000).set(true).setOverlapDetail();
dir.scale(1500).x(150).y(300).setCameraZoom();
eff.delay(800).removeOverlapDetail();
dir.setDelay(1200);
dir.uol("Effect/OnUserEff.img/emotion/oh").overlay(true).setEffectPlay();
dir.setDelay(1000);
dir.moveDir(2).moveFixel(300).setForcedMove();
eff.uol("Sound/SoundEff.img/karotte/runningStep").volume(100).playSoundEffect();
dir.setDelay(1000);
dir.setDelay(1000);
npc.id(9401783).ui(1).noEsc().next().say("#face4#…….");
dir.setDelay(300);
eff.blind(true).binary(255).duration(1000).setLayerBlind();
dir.setDelay(1300);
dir.setDelay(500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setVansheeMode(false);
stage.completeQuest(66908);//Quest Name:第一次見面
stage.gainExp(1);
/* Update Quest RecordEx | Id:66908 | Name: 第一次見面 | Data: "exp=give" */
stage.updateQuestRecordEx(66908, "exp", "give");
// Unhandled Message [43] Packet: 2B 01 00 00 00 2E 02 00 00 00 00 00 80 05 BB 46 E6 17 02 2A 00 00 00 00 00 
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(875010000, 1);