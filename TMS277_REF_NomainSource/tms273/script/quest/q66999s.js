// Created by MetaMS
// Quest ID:66999
// [星夜馬戲團] 點綴夜晚的天燈慶典


npc.id(9401981).ui(1).next().say("期盼已久的世紀慶典，夢想與幻想的時間！ ");
npc.id(9401981).ui(1).next().say("錯過今年就要等到明年的\r\n#b星夜馬戲團#k…");
npc.id(9401981).ui(1).next().say("仙人的村莊，武陵桃園！");
npc.ui(1).npcFlip().meFlip().next().say("星夜馬戲團？是誰？");
npc.id(9401981).ui(1).next().say("啊，你看來是第一次聽到星夜馬戲團吧？我們是到處旅行楓之谷世界，為勇士們帶來成就感和夜晚的美麗的一群人！");
npc.id(9401981).ui(1).next().say("怎麼樣。有興趣嗎？來。抓住我的手吧！");
// [LP_GroupChairSitResult] [32 93 0C 01 00 00 00 00 00 00 00 ]
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
eff.key("01").uol("Effect/DirectionWz2.img/effect/annual2024/holdMyHand1").duration(1000).term(-1).action("cc").ry(-1).value(255).setIllustrationLayer();
dir.setDelay(1500);
if (npc.ui(1).npcFlip().meFlip().noEsc().askAccept("#fc0xFFbfbfbf#(戴著可愛手套的休菲凱曼不知為何伸出手。該怎麼辦呢？)\r\n\r\n#b※ 接受時，移動至星夜馬戲團慶典會場，進行劇情演出。")) {
        /* Response is Yes */
        eff.key("02").uol("Effect/DirectionWz2.img/effect/annual2024/holdMyHand2").duration(1500).term(-1).action("cc").ry(-1).value(255).setIllustrationLayer();
        eff.key("01").duration(1500).offIllustrationLayer();
        dir.setDelay(2000);
        npc.id(9401981).ui(1).noEsc().next().say("好選擇！");
        npc.id(9401981).ui(1).noEsc().next().say("不會後悔的夜晚！");
        eff.key("02").duration(2000).offIllustrationLayer();
        dir.setDelay(4000);
        dir.setFadeDelay(700);
        //stage.setTemporarySkillSet(0);
        dir.block().setInGameDirectionMode();
        dir.setStandAloneMode(false);
        /* Update Quest RecordEx | Id:66998 | Name: [星夜馬戲團] 出發前往夜晚的武陵！ | Data: "rMap=450005200" */
        stage.updateQuestRecordEx(66998, "rMap", map.getId());
        npc.completeQuest();
        stage.startQuest(67001);//Quest Name:[星夜馬戲團] 武陵慶典的序幕
        stage.changeMap(867168000, 0);
} else {
        /* Response is No */
        eff.duration(1500).setLayerBlind();
        eff.key("01").duration(1000).offIllustrationLayer();
        dir.setFadeDelay(700);
        //stage.setTemporarySkillSet(0);
        dir.block().setInGameDirectionMode();
        dir.setStandAloneMode(false);
        npc.id(9401981).ui(1).next().say("嘖，什麼事？有急事嗎？準備好再來找我吧。呵呵呵。");
}