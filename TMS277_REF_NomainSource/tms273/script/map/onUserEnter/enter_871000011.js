// Created by MetaMS
// ID:[871000011]
// MapName:小蘑菇屋


dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffectEx();
stage.setMapTaggedObjectVisible("chair02", false, 0, 0);
stage.setMapTaggedObjectVisible("chair03", false, 0, 0);
eff.uol("Sound/PL_Sound.img/myHome/birdsong").volume(100).playSoundEffect();
dir.setDelay(300);
cam.setFreeFromUser();
dir.moveDir(2).moveFixel(720).setForcedMove();
cam.delay(2500).x(400).setRelMove();
dir.setDelay(4500);
eff.blind(true).binary(255).duration(500).setLayerBlind();
dir.setDelay(500);
cam.start(1000).end(2000).x(-80).y(120).setScaleAbsMove();
stage.teleportToPos(3, -270, 110);
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(1400);
dir.setDelay(500);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b…?");
eff.uol("Sound/PL_Sound.img/myHome/wind").volume(100).playSoundEffect();
dir.moveDir(2).moveFixel(250).setForcedMove();
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b是我找錯地方了嗎？");
dir.uol("Effect/OnUserEff.img/emotion/whatl").overlay(true).npc(true).setEffectPlay();
dir.setDelay(1500);
dir.setForcedFlip(-1);
dir.setDelay(500);
dir.moveDir(1).moveFixel(10).setForcedMove();
dir.uol("Effect/OnUserEff.img/emotion/what").overlay(true).npc(true).setEffectPlay();
dir.setDelay(1500);
eff.blind(true).binary(200).duration(1300).setLayerBlind();
dir.setDelay(1600);
dir.end(true).setMonologue("#fs30##e雅致#fs20#又溫馨，稍微有點#fs30#樸素#fs20#...");
dir.end(true).setMonologue("#fs20##e為了讓新家充滿主人的回憶，#fs30#房子裡現在#fs20#有~點#fs30#空曠。");
eff.duration(1300).setLayerBlind();
dir.setDelay(1600);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b…");
dir.uol("Effect/OnUserEff.img/emotion/shade").overlay(true).npc(true).setEffectPlay();
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b…我的50萬楓幣！！！");
dir.uol("Effect/OnUserEff.img/emotion/shade").duration(3000).overlay(true).npc(true).setEffectPlay();
dir.setDelay(500);
dir.moveDir(1).moveFixel(50).setForcedMove();
dir.setDelay(1000);
dir.action(29).actType(-1).duration(1000).setForcedAction();
dir.setDelay(1000);
stage.setMapTaggedObjectVisible("chair01", false, 0, 0);
stage.setMapTaggedObjectVisible("chair02", true, 0, 0);
stage.setMapTaggedObjectAnimation("chair02", 0);
eff.uol("Sound/PL_Sound.img/myHome/crash").volume(100).playSoundEffect();
dir.setForcedInput(4);
dir.uol("Effect/OnUserEff.img/emotion/shade").overlay(true).npc(true).setEffectPlay();
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b…");
usr.normal(true).text("...").time(2000).origin(1).lineSpace(4).chrId(stage.getCharacterId()).showSpeechBalloon();
let entity_1 = stage.spawnTempNpc(9400929, -270, 100, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
dir.setDelay(300);
stage.setNpcForceMove(entity_1, 1, 100, 100);
dir.setDelay(300);
dir.uol("Effect/OnUserEff.img/emotion/oh").overlay(true).npc(true).npcId(664533).setEffectPlay();
dir.setDelay(1000);
npc.id(9400921).ui(1).noEsc().next().say("#face3#嚇死我了，你是哪位？");
dir.setForcedInput(0);
dir.setDelay(1000);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b恩…我是剛搬來的人。");
npc.id(9400921).ui(1).noEsc().next().say("#face3#搬家嗎？恩…我以為那是沒有人的房子，原來不是啊。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#我是住你隔壁的阿爾文。人家說擦肩而過都算是緣分，我們居然可以變成鄰居，很高興認識你！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b很高興認識你…雖然不知道我到底能不能住在這個房子裡，請多多指教。");
npc.id(9400921).ui(1).noEsc().next().say("#face2#恩~~ 看起來很雅致，應該很適合一個人居住吧？稍微整理一下應該就可以了！我會幫忙的，不要擔心。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#首先應該要丟掉這個破碎的椅子。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#這個我來清理，先把床搬到有日照充足窗邊如何？");
eff.term(900).key("0").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHomeTuto/2").location(4).removeAfter(-1).setLayerOn();
npc.id(9400921).ui(1).noEsc().next().say("#face1#我的小屋選單中按下#i3801392##t3801392#，可以進入能夠移動家具的佈置模式。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#在佈置模式中點擊床之後，在想要的位置再次點擊，便完成囉！");
eff.term(300).key("0").setLayerOff();
npc.id(9400921).ui(1).noEsc().next().say("#face2#可以試一下嗎？先把床移動到想要的位置，再跟我對話吧。");
stage.completeQuest(64591);//Quest Name:[我的小屋]通往我的小屋的路
stage.startQuest(64592);//Quest Name:[我的小屋]到洒满阳光的地方去
/* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "3=1;7=1" */
stage.updateQuestRecordExShare(500767, "3", "1");
cam.x(2000).y(1000).setScale();
cam.setReturnToUser();
// Unhandled Ingame Direction Event [26] Packet: 1A BC 02 00 00 
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.destroyTempNpc(entity_1);
stage.enterMyHome();
// Unhandled Message [MS_WorldShareRecordMessage] Packet: 0E FC 00 00 00 1C 00 63 6F 75 6E 74 3D 33 32 38 37 35 3B 54 3D 32 30 32 33 30 34 32 36 31 38 30 31 35 33