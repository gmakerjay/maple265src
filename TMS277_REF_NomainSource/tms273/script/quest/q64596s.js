// Created by MetaMS
// Quest ID:64596
// [我的小屋]突然拜访


stage.closeUI(0);
stage.closeUI(1);
stage.closeUI(2);
stage.closeUI(3);
stage.closeUI(6);
stage.closeUI(40);
stage.closeUI(202);
stage.closeUI(220);
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().showUI().setInGameDirectionMode();
cam.start(1000).end(2000).x(-80).y(120).setScaleAbsMove();
stage.teleportToPos(3, 0, 100);
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1200);
eff.duration(1000).setLayerBlind();
dir.setDelay(1400);
eff.uol("Sound/PL_Sound.img/myHome/knock1").volume(100).playSoundEffect();
dir.setDelay(1000);
npc.id(9400921).ui(1).noEsc().next().say("#face0#你沒聽到什麼聲音嗎？");
eff.uol("Sound/PL_Sound.img/myHome/knock1").volume(128).playSoundEffect();
dir.setDelay(1000);
npc.id(9400920).ui(1).noEsc().next().say("#face0#…?");
eff.uol("Sound/PL_Sound.img/myHome/knock2").volume(128).playSoundEffect();
dir.setDelay(1000);
npc.id(9400921).ui(1).noEsc().next().say("#face1#好像是誰來了！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b應該沒人會來啊…？");
let entity_1 = stage.spawnTempNpc(9400935, -250, 100, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
dir.setDelay(500);
npc.id(9400926).ui(1).noEsc().next().say("#face0#勇士！");
stage.setNpcForceMove(entity_1, 1, 150, 100);
dir.setDelay(3000);
npc.id(9400926).ui(1).noEsc().next().say("#face0#[#i2010058:##t2010058#50個]\r\n這是禮物..！");
npc.id(9400926).ui(1).noEsc().next().say("#face1#歡迎你來我們村莊！");
// Inventory Operation with 1 operations.
if (!"1".equals(stage.getQuestRecordEx(64696, "give"))) {
        if (stage.canHold(2010058, 50)) {
                stage.gainItem(2010058, 50);
                /* Update Quest RecordEx | Id:64696 | Name: [我的小屋]特鲁迪失踪事件？ | Data: "give=1" */
                stage.updateQuestRecordEx(64696, "give", "1");
        }
}
npc.id(9400920).ui(1).noEsc().next().say("#face1#你~~有得到媽媽的允許嗎？");
npc.id(9400926).ui(1).noEsc().next().say("#face0#當然！");
npc.id(9400921).ui(1).noEsc().next().say("#face2#哇，#h0#真好~特魯迪家的奶油麵包真的很好吃。鬆軟的麵包中充滿柔軟的奶油，咬下一口就在口中流盪…可以說是再次讓人知道，幸福就在不遠之處，到底是什麼樣的感覺！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b…恩…要分一點給你嗎？");
npc.id(9400921).ui(1).noEsc().next().say("#face1#啊，沒關係！應該是給#h0#的喬遷賀禮吧。");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b特魯迪，謝謝！我會好好享用的！");
stage.setNpcForceFlip(entity_1, -1);
stage.setNpcForceMove(entity_1, -1, 100, 100);
npc.id(9400926).ui(1).noEsc().next().say("#face1#哇啊啊啊~~");
stage.destroyTempNpc(entity_1);
cam.x(2000).y(1000).setScale();
cam.setReturnToUser();
// Unhandled Ingame Direction Event [26] Packet: 1A BC 02 00 00
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
npc.id(9400921).ui(1).noEsc().next().say("#face1#看來特魯迪想跟#h0#變熟呢！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b好像沒有可以回禮的東西… ");
npc.id(9400921).ui(1).noEsc().next().say("#face0#恩~要不要辦個喬遷宴？");
npc.id(9400920).ui(1).noEsc().next().say("#face0#喬遷宴？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b喬遷宴？");
npc.id(9400921).ui(1).noEsc().next().say("#face1#邀請村莊的人，招待他們吃飯！可以順便邀請#h0#的好朋友！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b是個好點子！");
npc.id(9400920).ui(1).noEsc().next().say("#face1#哇，一定很好玩！");
npc.id(9400921).ui(1).noEsc().next().say("#face1#好！那要來準備一下嗎？");
npc.completeQuest();