// Created by MetaMS
// Quest ID:500763
// [我的小屋]家？家！我的家！

if (!map.isTeleportLimit()) {
        dir.setInGameCurNodeEventEnd(true);
        //stage.setTemporarySkillSet(0);
        dir.lockUI().showUI().setInGameDirectionMode();
        eff.uol("Sound/PL_Sound.img/myHome/flyingPaper").volume(128).playSoundEffect();
        eff.blind(true).binary(150).duration(300).setLayerBlind();
        dir.setDelay(300);
        eff.term(150).key("0").rx(200).ry(-500).z(12).uol("Effect/DirectionWz2.img/effect/myHome/4").location(4).removeAfter(-1).setLayerOn();
        eff.term(600).key("0").rx(-200).ry(400).setLayerMove();
        dir.setDelay(600);
        eff.term(450).key("0").rx(150).ry(300).setLayerMove();
        dir.setDelay(300);
        eff.term(600).key("0").setLayerOff();
        dir.setDelay(300);
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b哇啊，嚇我一跳！這是什麼？");
        eff.term(500).key("1").ry(100).z(12).uol("Effect/DirectionWz2.img/effect/myHome/3").location(7).removeAfter(-1).setLayerOn();
        dir.setDelay(1000);
        eff.term(1000).key("1").ry(-200).setLayerMove();
        dir.setDelay(1500);
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b…要賣弓箭手村菇菇小屋？");
        eff.term(1000).key("1").ry(-300).setLayerMove();
        dir.setDelay(2000);
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b而且那個只要50萬楓幣?!");
        dir.setDelay(300);
        cam.setReturnToUser();
        eff.term(1000).key("1").setLayerOff();
        eff.duration(1000).setLayerBlind();
        // Unhandled Ingame Direction Event [26] Packet: 1A BC 02 00 00
        //stage.setTemporarySkillSet(0);
        dir.block().setInGameDirectionMode();
        let selection = npc.ui(1).npcFlip().meFlip().noEsc().askMenu("#b真不感相信…我終於也在楓之谷世界擁有房子了嗎？\r\n#L0#這不是在作夢吧？在被其它人簽約之前，趕緊去看看吧！#l\r\n#L1#現在比較忙碌，等有空時再去拜訪了。#l\r\n#r※ [我的小屋] 新手任務伺服器內每個帳號只可進行1次，完成新手任務時，伺服器內所有角色就可以使用[我的小屋]。由於劇情進行中時，無法變更進行角色，請慎重決定！\r\n#k※ 接收時，立即移動到任務地區。");
        if (selection == 0) {
                /* Update Quest RecordEx | Id:64590 | Name: [我的小屋]家？家！我的家！ | Data: "rMap=310070000" */
                stage.updateQuestRecordEx(64590, "rMap", map.getId());
                stage.changeMap(871000010, 0);
        }
} else {
        npc.ui(1).meFlip().next().say("#r當前無法在此處進行。");
}