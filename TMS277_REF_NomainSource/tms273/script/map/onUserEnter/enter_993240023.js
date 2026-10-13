// Created by MetaMS
// ID:[993240023]
// MapName:保管聖劍的地方


stage.resetForcedStat();
dir.removeAdditionalEffectEx();
eff.blind(true).binary(255).setLayerBlind();
dir.scale(2000).setCameraZoom();
let entity_2 = stage.spawnTempNpc(3006702, 80, -38, 1);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
let entity_3 = stage.spawnTempNpc(3006721, 0, -38, 0);
stage.setNpcSpecialAction(entity_3, "summon", 0, false);
stage.setNpcForceFlip(entity_3, -1);
stage.teleportToPos(3, -238, -60);
dir.setDelay(800);
dir.setVansheeMode(false);
dir.setDelay(800);
eff.duration(1000).setLayerBlind();
dir.setDelay(1200);
npc.id(3006702).ui(1).next().say("#face0#…");
usr.uol("Voice12.img/HighMountain/S#14_20.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#自從古代神在賽爾尼溫敗給敵對者之後…過了很長一段時間。");
usr.uol("Voice12.img/HighMountain/S#14_21.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#世界秩序重新建立，天族一直等待著米特拉大人的再臨。");
usr.uol("Voice12.img/HighMountain/S#14_22.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#不對，他們可能也不知道自己在等待著什麼，只是從中尋找著存在的意義而已。");
usr.uol("Voice12.img/HighMountain/S#14_23.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#同胞們在拋棄高山並離開的那瞬間也是，\r\n比起他們自己的性命，更重視阿索爾。");
usr.uol("Voice12.img/HighMountain/S#14_24.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#賽爾尼溫的神官們各自提出米特拉大人的不同名稱並形成對立。");
usr.uol("Voice12.img/HighMountain/S#14_25.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face5#以神之名、為了神，我一路失去了太多東西。");
usr.uol("Voice12.img/HighMountain/S#14_26.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#將失去了對神的信任以及一切的我攙扶起來的是…");
dir.setDelay(1000);
npc.ui(1).npcFlip().meFlip().next().say("直到最後一刻，才透過他人的協助明白。");
npc.ui(1).npcFlip().meFlip().next().say("賽蓮，真正重要的是…");
npc.ui(1).npcFlip().meFlip().next().say("相信自己。");
usr.uol("Voice12.img/HighMountain/S#14_27.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face1#敵對者大人給我的勇氣。");
dir.setDelay(800);
usr.uol("Voice12.img/HighMountain/S#14_28.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#我現在不想再過著被沒有回應的神約束的人生了。");
usr.uol("Voice12.img/HighMountain/S#14_29.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#不管支配世界的秩序位於何方，大家都為了活下去而盡力，");
usr.uol("Voice12.img/HighMountain/S#14_30.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#只要有那些人存在，我…");
usr.uol("Voice12.img/HighMountain/S#14_31.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#就只能站在守護著這個世界的人那一邊。");
usr.uol("Voice12.img/HighMountain/S#14_32.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#就算需要與米特拉對抗。");
usr.uol("Voice12.img/HighMountain/S#14_33.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).next().say("#face0#我也會那麼做。");
dir.setDelay(1000);
eff.blind(true).binary(255).duration(600).setLayerBlind();
dir.setDelay(700);
/* Update Quest RecordEx | Id:26216 | Name: [史詩副本] 太陽神米特拉 | Data: "dir=1" */
stage.updateQuestRecordEx(26216, "dir", "1");
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
stage.destroyTempNpc(entity_2);
stage.destroyTempNpc(entity_3);
stage.changeMap(993240013, 0);