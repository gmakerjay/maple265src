// Created by MetaMS
// ID:[993240008]
// MapName:草原封印區域


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
eff.uol("BgmED/highMountain_n").changeBGM();
dir.setVansheeMode(true);
dir.scale(1200).x(-750).y(-70).setCameraZoom();
let entity_1 = stage.spawnTempNpc(3006701, -940, 240, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(3006702, -1130, 240, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
stage.setNpcForceMove(entity_1, 1, 200, 100);
stage.setNpcForceMove(entity_2, 1, 200, 100);
dir.setDelay(500);
eff.duration(1500).setLayerBlind();
dir.duration(5000).scale(1200).timePos(5000).x(-750).y(250).setCameraZoom();
dir.setDelay(1200);
dir.setDelay(5500);
stage.setNpcForceFlip(entity_1, -1);
usr.uol("Voice12.img/HighMountain/S#7_51.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).noEsc().next().say("#face0#…我說你啊，不要抓著我不放，沒聽到我叫你退下嗎？");
usr.uol("Voice12.img/HighMountain/S#7_52.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).npcFlip().noEsc().next().say("#face0#我辦不到。");
usr.uol("Voice12.img/HighMountain/S#7_53.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).npcFlip().noEsc().next().say("#face7#泰奴斯的封印對我們天族而言，是遠古神話中被遺忘的歷史。");
usr.uol("Voice12.img/HighMountain/S#7_54.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).npcFlip().noEsc().next().say("#face0#當它是真實存在並顯然地威脅著大地時，就必須找出事態的根源。");
usr.uol("Voice12.img/HighMountain/S#7_55.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).npcFlip().noEsc().next().say("#face0#就算是已經離開的故鄉，我也不能放著這種模樣不管就離開。");
usr.uol("Voice12.img/HighMountain/S#7_56.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).noEsc().next().say("#face0#我不是叫你別跟過來了嗎？現在站在你旁邊的就是封印了那傢伙的神好嗎？");
usr.uol("Voice12.img/HighMountain/S#7_57.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).npcFlip().noEsc().next().say("#face0#我很清楚，米特拉大人。");
usr.uol("Voice12.img/HighMountain/S#7_58.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006702).ui(1).npcFlip().noEsc().next().say("#face0#但是每個人都有自己的義務，還請您理解。");
usr.uol("Voice12.img/HighMountain/S#7_59.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).noEsc().next().say("#face0#該死，這些天族傢伙們…");
usr.uol("Voice12.img/HighMountain/S#7_60.mp3").value(100).playExclSoundWithDownBGM();
npc.id(3006701).ui(1).noEsc().next().say("#face0#依然固執己見且不聽勸告。");
eff.blind(true).binary(255).duration(500).type(2).setLayerBlind();
dir.setDelay(500);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.changeMap(993240009, 0);