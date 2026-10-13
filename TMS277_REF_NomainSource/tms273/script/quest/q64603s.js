// Created by MetaMS
// Quest ID:64603
// [我的小屋]谢谢你，艾丹

let entity_3 = parseInt(stage.getTempValue("entity_3"));
npc.id(9400923).ui(1).noEsc().next().say("#face1#桌子如何？很堅固吧？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b是的，真的非常感謝。");
npc.id(9400923).ui(1).noEsc().next().say("#face0#呵呵，這有這次特！別！地！做給你，要記得感謝我。");
npc.id(9400923).ui(1).noEsc().next().say("#face0#如果壞掉再來找我。會特!別!地幫你維修的。");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b現在好像就已經有點歪歪的… ");
npc.id(9400923).ui(1).noEsc().next().say("#face2#哪裡？哪邊？明明很平穩！");
npc.completeQuest();
stage.destroyTempNpc(entity_3);