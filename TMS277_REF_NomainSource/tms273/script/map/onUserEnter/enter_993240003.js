// Created by MetaMS
// ID:[993240003]
// MapName:通往高山的路


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.setVansheeMode(true);
dir.removeAdditionalEffectEx();
eff.blind(true).binary(255).setLayerBlind();
dir.scale(1000).y(150).setCameraZoom();
let entity_1 = stage.spawnTempNpc(3006701, 65, 450, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
stage.setNpcSpecialAction(entity_1, "Flight_1", -1, true);
stage.setNpcActionLayerRelMove(3006701, 20, -370, 0);
stage.setFieldFloating(5, 5, 5, true, 0);//mapId:993240003
eff.duration(800).setLayerBlind();
dir.setDelay(3000);
usr.uol("Voice12.img/HighMountain/S#2_1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face7#殺了你！我要殺了你！\r\n你踩過的地方、拂過的風還有任何一切，我都要問責！");
usr.uol("Voice12.img/HighMountain/S#2_2.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face7#我要把高山上的所有天族帶走，一次全數消滅！ ");
usr.uol("Voice12.img/HighMountain/S#2_3.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).next().say("#face7#敵對者！！！！！");
stage.resetNpcSpecialAction(entity_1);
stage.setNpcSpecialEffect(entity_1, true, {'Flight_2':1,'None':-1});
eff.uol("Sound/Skill.img/37111003/Use").volume(100).playSoundEffect();
eff.uol("Sound/Skill.img/37111006/Use").volume(100).playSoundEffect();
eff.uol("Sound/Skill.img/37100002/Use").volume(100).playSoundEffect();
dir.setDelay(1000);
stage.setFieldFloating(0, 0, 0, true, 1000);//mapId:993240003
dir.resetCameraZoom();
eff.blind(true).binary(255).duration(2000).setLayerBlind();
stage.setFieldFloating(0, 0, 0, true, 1000);//mapId:993240003
dir.setDelay(4000);
eff.key("00").uol("Effect/HighMountain.img/Illust/9").y(68).duration(500).term(-1).action("none").ry(-1).value(255).setIllustrationLayer();
eff.key("01").uol("Effect/HighMountain.img/Illust/14").y(68).z(1).duration(500).term(-1).action("none").ry(-1).value(255).setIllustrationLayer();
eff.key("02").uol("Effect/HighMountain.img/Illust/15").y(68).z(10).duration(500).term(-1).action("none").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(2000);
usr.uol("Voice12.img/HighMountain/S#2_4.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face6#聽好了，我的信徒們！");
usr.uol("Voice12.img/HighMountain/S#2_5.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face6#在天地之間獨一無二的偉大之人，");
usr.uol("Voice12.img/HighMountain/S#2_6.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face6#踩著敵人們燃燒過後的灰燼君臨的火花！");
usr.uol("Voice12.img/HighMountain/S#2_7.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face6#米特拉我降臨…");
dir.setDelay(2000);
eff.key("03").uol("Effect/HighMountain.img/Illust/13").y(68).z(2).duration(1000).term(-1).action("none").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(1000);
eff.key("04").uol("Effect/HighMountain.img/Illust/11").y(68).z(3).duration(1000).term(-1).action("none").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(1000);
eff.key("05").uol("Effect/HighMountain.img/Illust/12").y(68).z(4).duration(1000).term(-1).action("none").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(3000);
usr.uol("Voice12.img/HighMountain/S#2_8.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face1#…！");
usr.uol("Voice12.img/HighMountain/S#2_9.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face1#那是…泰奴斯的後裔們…？");
usr.uol("Voice12.img/HighMountain/S#2_10.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face1#早就被埋葬在高山下的傢伙們怎麼會…");
usr.uol("Voice12.img/HighMountain/S#2_11.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face6#大神官！騎士團長！全都跑去哪了！");
usr.uol("Voice12.img/HighMountain/S#2_12.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).npcFlip().next().say("#face6#沒有人在嗎！！");
eff.blind(true).binary(255).duration(500).type(2).setLayerBlind();
dir.setDelay(500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.destroyTempNpc(entity_1);
stage.changeMap(993240004, 0);