// Created by MetaMS
// ID:[993240014]
// MapName:雪原封印區域


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
dir.setVansheeMode(true);
let entity_1 = stage.spawnTempNpc(3006706, 0, 640, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(3006701, -300, 640, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
dir.scale(1000).x(-80).y(600).setCameraZoom();
eff.blind(true).binary(255).r(240).g(240).b(240).type(2).setLayerBlind();
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(1400);
stage.setNpcSpecialEffect(entity_2, true, {'Skill_1': 1, 'Skill_2': 1});
stage.setFieldFloating(5, 5, 10, true, 1000);//mapId:993240014
dir.duration(500).scale(1500).timePos(800).x(-50).y(600).value(5).setCameraZoom();
eff.uol("Sound/Skill.img/37101000/Use").volume(100).playSoundEffect();
dir.setDelay(700);
dir.uol("Skill/800035.img/skill/80003574/hit/0").y(-50).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
stage.setNpcSpecialEffect(entity_1, true, {'die': 1, 'none': -1});
eff.uol("Sound/Skill.img/37101001/Use").volume(100).playSoundEffect();
dir.setDelay(300);
dir.uol("Skill/800035.img/skill/80003573/hit/0").y(-50).overlay(true).npc(true).npcId(entity_1).setEffectPlay();
eff.uol("Sound/Mob.img/8644623/Die").volume(100).playSoundEffect();
dir.duration(800).scale(1200).timePos(500).y(580).value(5).setCameraZoom();
dir.setDelay(1800);
eff.uol("Sound/SoundEff.img/BM3/egg1").volume(100).playSoundEffect();
eff.uol("Sound/SoundEff.img/BM3/egg2").volume(100).playSoundEffect();
dir.uol("Effect/HighMountain.img/effect/Tynus_release").duration(-1).y(10).overlay(true).overlayX(-1).npc(true).npcId(entity_1).setEffectPlay();
dir.setDelay(1800);
stage.setNpcFadeHide(entity_1, 0, 100);
stage.setFieldFloating(10, 10, 10, true, 1000);//mapId:993240014
eff.uol("Sound/SoundEff.img/blackHeaven/explosion4").volume(100).playSoundEffect();
dir.duration(3000).scale(800).timePos(3000).y(70).value(5).setCameraZoom();
dir.setDelay(3000);
eff.uol("Sound/SoundEff.img/blackHeaven/explosion3").volume(100).playSoundEffect();
dir.duration(5000).scale(2000).timePos(5000).y(70).value(5).setCameraZoom();
dir.setDelay(1000);
eff.blind(true).binary(255).r(255).g(255).b(255).duration(1500).setLayerBlind();
dir.setDelay(2000);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
/* Update Quest RecordEx | Id:26218 | Name: Unknown | Data: "start=1;dir=10" */
stage.updateQuestRecordEx(26218, "dir", "10");
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.changeMap(993240015, 0);