// Created by MetaMS
// ID:[993240015]
// MapName:高山山頂


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.setStandAloneMode(true);
dir.setVansheeMode(true);
dir.removeAdditionalEffectEx();
eff.blind(true).binary(255).r(255).g(255).b(255).setLayerBlind();
dir.scale(1000).y(-300).setCameraZoom();
let entity_1 = stage.spawnTempNpc(3006701, -310, 340, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
dir.setDelay(500);
dir.duration(3000).scale(700).timePos(3000).y(100).value(5).setCameraZoom();
dir.setDelay(500);
eff.duration(800).setLayerBlind();
dir.setDelay(3000);
dir.setDelay(500);
eff.fadeIn(1000).fadeOut(3000).set(true).setOverlapDetail();
dir.scale(1300).x(-310).y(340).setCameraZoom();
eff.delay(1000).removeOverlapDetail();
dir.setDelay(2000);
usr.uol("Voice12.img/HighMountain/S#15_1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().noEsc().next().say("#face2#喂，好久不見了，蠢蛋。");
usr.uol("Voice12.img/HighMountain/S#15_3.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().noEsc().next().say("#face2#沒見面的期間，是誰動了什麼手腳啊？");
usr.uol("Voice12.img/HighMountain/S#15_4.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().noEsc().next().say("#face2#居然卑鄙地廣佈你的後裔們。");
dir.uol("Effect/OnUserEff.img/emotionBalloon/noSpeak").overlay(true).npc(true).npcId(entity_1).setEffectPlay();
dir.setDelay(1500);
stage.setNpcSpecialAction(entity_1, "Battle", -1, true);
dir.setDelay(3000);
usr.uol("Voice12.img/HighMountain/S#15_5.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().noEsc().next().say("#face2#很好，快點結束吧。");
usr.uol("Voice12.img/HighMountain/S#15_6.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().noEsc().next().say("#face3#我挺滿意的那傢伙現在在你肚子裡。");
usr.uol("Voice12.img/HighMountain/S#15_7.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().noEsc().next().say("#face3#我這次會讓你成為灰塵，再也無法復活。");
eff.blind(true).binary(255).duration(500).type(2).setLayerBlind();
dir.setDelay(500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
stage.destroyTempNpc(entity_1);
if (ctx.makeEvent("epic_dungeon_story", false, [stage, 993241700, 993241050]) == null) {
        npc.me().say("#e#r發生錯誤，請聯系管理員！");
}