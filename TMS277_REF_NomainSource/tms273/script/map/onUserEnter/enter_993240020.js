// Created by MetaMS
// ID:[993240020]
// MapName:高山某處


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.setStandAloneMode(true);
dir.removeAdditionalEffectEx();
dir.setVansheeMode(true);
eff.blind(true).binary(255).setLayerBlind();
dir.scale(1000).y(690).setCameraZoom();
let entity_1 = stage.spawnTempNpc(3006702, 0, 690, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
stage.setNpcSpecialAction(entity_1, "fall", -1, false);
eff.duration(800).setLayerBlind();
dir.setDelay(1200);
stage.setNpcSpecialAction(entity_1, "fall_eye", -1, false);
usr.uol("Voice12.img/HighMountain/S#19_1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).noEsc().next().say("#face0#呃…呃嗯…");
usr.uol("Voice12.img/HighMountain/S#19_2.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).noEsc().next().say("#face0#我失去意識多久…");
eff.value(600).setOverlap();
stage.resetNpcSpecialAction(entity_1);
dir.setDelay(600);
usr.uol("Voice12.img/HighMountain/S#19_3.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).noEsc().next().say("#face0#那是…？");
eff.blind(true).binary(255).duration(300).setLayerBlind();
dir.setDelay(1200);
eff.key("00").uol("Effect/HighMountain.img/Illust/2").duration(800).term(-1).action("cc").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(1200);
usr.uol("Voice12.img/HighMountain/S#19_4.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#高山…！");
usr.uol("Voice12.img/HighMountain/S#19_5.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#泰奴斯…完全被消滅…");
usr.uol("Voice12.img/HighMountain/S#19_6-1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#米特拉您到底是…！");
usr.uol("Voice12.img/HighMountain/S#19_7-1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#做了什麼事…？");
npc.id(3006703).ui(1).noEsc().next().say("#face0#……");
usr.uol("Voice12.img/HighMountain/S#19_8.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#沒有剩下任何東西。");
usr.uol("Voice12.img/HighMountain/S#19_9.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#神也是，故鄉也是，同族也是，責任也是。");
usr.uol("Voice12.img/HighMountain/S#19_10.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#我自由了嗎？");
npc.id(3006703).ui(1).noEsc().next().say("#face0#……");
usr.uol("Voice12.img/HighMountain/S#19_11.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#然而擺脫了一切束縛的現在，我想要的是…");
usr.uol("Voice12.img/HighMountain/S#19_12.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#找到造成這一切的人。");
usr.uol("Voice12.img/HighMountain/S#19_13.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#讓我的同族滅亡的人。");
usr.uol("Voice12.img/HighMountain/S#19_14.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#讓我的故鄉滅亡的人。");
usr.uol("Voice12.img/HighMountain/S#19_15-1.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#杰倫達爾默。");
usr.uol("Voice12.img/HighMountain/S#19_16.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#不管你是何等存在都無所謂，");
usr.uol("Voice12.img/HighMountain/S#19_17.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#不管你的使徒有多少都無所謂，我會找到你…");
eff.key("00").duration(800).offIllustrationLayer();
eff.key("01").uol("Effect/HighMountain.img/Illust/3").duration(800).term(-1).action("cc").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(1200);
usr.uol("Voice12.img/HighMountain/S#19_18.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#讓你付出一切代價。");
usr.uol("Voice12.img/HighMountain/S#19_19.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#這就是我的宿命。");
usr.uol("Voice12.img/HighMountain/S#19_20.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006703).ui(1).noEsc().next().say("#face0#也是唯一的救援。");
eff.key("b0").uol("Map/Effect2.img/BlackOut").duration(1500).term(-1).action("cc").ry(-1).value(100).setIllustrationLayer();
eff.uol("Sound/SoundEff.img/esfera/defence").volume(100).playSoundEffect();
eff.key("02").uol("Effect/HighMountain.img/Illust/16").duration(1500).term(-1).action("cc").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(5000);
eff.key("99").uol("Map/Effect2.img/BlackOut").duration(1500).term(-1).action("cc").loop(true).ry(-1).value(255).setIllustrationLayer();
dir.setDelay(1500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
stage.completeQuest(26216);//Quest Name:[史詩副本] 太陽神米特拉
/* Update Quest RecordEx | Id:503137 | Name: Unknown | Data: "missionState=0000000000000000000000000000000000000000000001" */
//stage.updateQuestRecordEx(503137, "missionState=0000000000000000000000000000000000000000000001");
stage.gainExp(1189519364);
stage.completeQuest(26221);//Quest Name:[史詩副本] 高山
/* Update Quest RecordEx | Id:503172 | Name: Unknown | Data: "ed1Story=1" */
stage.updateQuestRecordEx(503172, "ed1Story", "1");
stage.destroyTempNpc(entity_1);
stage.changeMap(410000500, 1);