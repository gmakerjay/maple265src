// Created by MetaMS
// ID:[870001016]
// MapName:主臥室


stage.resetForcedStat();

dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
let entity_1 = stage.spawnTempNpc(9401598, 150, 0, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
eff.blind(true).binary(255).type(2).setLayerBlind();
dir.scale(2000).setCameraZoom();
dir.setForcedFlip(1);
stage.startQuest(66716);//Quest Name:Unknown
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1000);
eff.duration(2000).setLayerBlind();
dir.setDelay(1000);
dir.setDelay(1500);
dir.moveDir(2).moveFixel(200).setForcedMove();
dir.setDelay(1500);
stage.setNpcSpecialAction(entity_1, "eye", 0, false);
dir.uol("Effect/OnUserEff.img/emotion/whatl").x(10).overlay(true).setEffectPlay();
npc.ui(1).npcFlip().meFlip().noEsc().next().say("潘奈迪特！有什麼事嗎？ ");
dir.setDelay(1000);
eff.fadeIn(1000).fadeOut(2000).set(true).setOverlapDetail();
stage.setNpcForceMove(entity_1, -1, 200, 100);
dir.scale(2500).x(-120).y(30).setCameraZoom();
eff.delay(1500).removeOverlapDetail();
dir.setDelay(3500);
stage.setNpcSpecialAction(entity_1, "say", 0, false);
npc.id(9401592).ui(1).noEsc().next().say("#face1#哈哈，馬上就來了啊，#h0#。不用擔心。不是什麼大事。");
dir.setDelay(1300);
// Unhandled User Effect [69] Packet: 45 01 00 00 00 00 00 00 00 00 05 00 A1 4B A1 4B 2E 14 05 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 04 00 00 00 FE 74 8F 00 00 00 00 00 54 3F 0C 01 
stage.setNpcSpecialAction(entity_1, "say", 0, false);
npc.id(9401592).ui(1).noEsc().next().say("#face0#請問，你還有聽說過能量礦石的下落嗎？");
dir.moveDir(2).moveFixel(20).setForcedMove();
dir.setDelay(500);
let selection = npc.ui(1).npcFlip().meFlip().askMenu("那其他的能量礦石呢？\r\n#L0##b不。我是第一次聽說。#l\r\n#L1##b有依稀聽過的印象。#l");
// if (selection == 0)
npc.id(9401592).ui(1).noEsc().next().say("#face0#哈哈，原來如此。\r\n能量礦石是王國中#b僅有兩個的聖物#k，過去國王授予了迪倫公爵一個。");
npc.id(9401592).ui(1).noEsc().next().say("#face3#另外一個則…….");
npc.id(9401592).ui(1).noEsc().next().say("#face0#…….");
npc.id(9401592).ui(1).noEsc().next().say("#face0#他在貪婪之龍#e#fc0xFFff6600#克雷德#k#n的手中。");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("克雷德．．．．．．");
npc.id(9401592).ui(1).noEsc().next().say("#face0#克雷德在這片土地上#b最高、最燦爛的地方#k建造了自己的基地，作為藏身之處。");
stage.setNpcSpecialAction(entity_1, "say", 0, false);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("最高、最燦爛的地方….\r\n是哪裡啊？");
npc.id(9401592).ui(1).noEsc().next().say("#face0#聖蒂亞王城的舊址。");
dir.uol("Effect/OnUserEff.img/emotion/oh").overlay(true).setEffectPlay();
npc.ui(1).npcFlip().meFlip().noEsc().next().say("！！");
eff.fadeIn(1000).fadeOut(2000).set(true).setOverlapDetail();
stage.setNpcForceMove(entity_1, -1, 200, 80);
dir.scale(2000).x(-150).y(30).setCameraZoom();
eff.delay(1500).removeOverlapDetail();
dir.setDelay(500);
cam.delay(3000).start(2000).end(1500).x(-260).y(30).setScaleAbsMove();
dir.setForcedFlip(-1);
dir.setDelay(4000);
stage.setNpcForceFlip(entity_1, 1);
dir.setDelay(500);
npc.id(9401592).ui(1).noEsc().next().say("#face0#我猜想，能量礦石可能位於#r王城的地下深處#k。");
npc.id(9401592).ui(1).noEsc().next().say("#face0#或許克雷德．．．\r\n是將能量之石與自身的力量結合作為#r創造藏身處的動力#k來使用。");
dir.setDelay(500);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("…….");
dir.moveDir(1).moveFixel(50).setForcedMove();
dir.setDelay(500);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("需要找到那個地方嗎？");
dir.setDelay(1500);
// Unhandled User Effect [69] Packet: 45 01 00 00 00 00 00 00 00 00 05 00 A1 4B A1 4B 2E 08 07 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 04 00 00 00 FE 74 8F 00 00 00 00 00 54 3F 0C 01 
npc.id(9401592).ui(1).noEsc().next().say("#face1#謝謝你，但沒關係。 ");
npc.id(9401592).ui(1).noEsc().next().say("#face1#那個地方很久以前就……");
dir.setDelay(1000);
stage.setNpcSpecialAction(entity_1, "say", 0, false);
npc.id(9401592).ui(1).noEsc().next().say("#face0#哈哈，總之。在向#h0#請求幫助之前，我曾進入過他的秘密據點。");
npc.id(9401592).ui(1).noEsc().next().say("#face0#變成碎片散落的王城殘骸和…像洞穴一樣環繞著地下的鐘乳石。\r\n還有像原石一樣鑲嵌的無數能量礦石的氣息……");
npc.id(9401592).ui(1).noEsc().next().say("#face0#那是一個沉重的陰鬱和奇妙的美麗交織在一起的地方。");
dir.setDelay(500);
npc.id(9401592).ui(1).noEsc().next().say("#face0#也許是很麻煩的請求，你能幫我調查那個地方嗎？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("好。知道了。具體要做什麼事呢？");
npc.id(9401592).ui(1).noEsc().next().say("#face0#…謝謝你爽快地幫我。\r\n等等請來大廳找我。到時候會說明給你聽。");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("不會。作為城中的一員，這同時也是為了我自己。");
npc.id(9401592).ui(1).noEsc().next().say("#face1#像#h0#這樣的人是這裡的主人，真是幸運。那麼待會見。");
dir.setDelay(500);
stage.setNpcSpecialAction(entity_1, "greet", 0, false);
dir.setDelay(300);
cam.delay(5000).start(1500).end(1000).y(-400).setScaleAbsMove();
dir.setDelay(3000);
eff.blind(true).binary(255).duration(1500).setLayerBlind();
dir.setDelay(2000);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
stage.startQuest(66661);//Quest Name:[公會城] 另一能量礦石的行蹤
stage.completeQuest(66716);//Quest Name:Unknown
stage.destroyTempNpc(entity_1);

stage.changeMap(870000006, 0);