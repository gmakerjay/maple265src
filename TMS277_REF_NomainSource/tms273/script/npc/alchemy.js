// Created by MetaMS
// [9031005]
// MapName:匠人街

let selStr = "你好。你對鍊金術感興趣嗎？\r\n\r\n";
if (stage.getMakingSkillLevel(92040000) > 0) {
        selStr += "#L2##b提升#e鍊金術#n等級。#l\r\n#L3#鍊金術技術初始化。#k#l";
} else {
        selStr += "#L0##b聽取有關#e鍊金術#n的說明。#l\r\n#L1#學習#e鍊金術#n。#k#l";
}
let sel = npc.askMenu(selStr);
switch (sel) {
        case 0:
                npc.next().say("鍊金術是用草藥的精油製作各種藥水的技術。除了恢復HP和MP的藥水之外，還可以製作各種讓你變強的藥水。還能製作你從來沒有體驗過的神奇藥水。");
                break;
        case 1:
                if (stage.getLevel() < 30) {
                        npc.say("#b至少必須達到30級2轉以上，龍神必須3轉以上，暗影雙刀必須2轉+以上#k，才能學習專業技術。你能達到條件之後再來找我嗎？");
                } else if (stage.getMakingSkillLevel(92040000) > 0) {
                        npc.say("你已經學些過#e鍊金術#n，難道還想學？");
                } else if (!stage.isQuestCompleted(3194)) {
                        npc.say("你對鍊金術感興趣嗎？想學的話，必須先去見見#b希梅爾#k～在村子入口處就能見到希梅爾了。");
                        /*} else if (getMakingSkillSize() > 0) {
                                npc.say("嗯，你好像已經學習了其他的製作技術。真想學習的話，就必須先放棄當前的製作技術。");*/
                } else if (stage.getMakingSkillLevel(92000000) <= 0) {
                        npc.say("鍊金術必須先學習採藥。往右邊走，可以看到在大鍋旁用心提煉草藥的採藥大師#b斯塔切#k，你可以向她學習採藥。");
                } else {
                        let ret = npc.askYesNo("你真的要學習#b鍊金術#k嗎？\r\n學費是#b5000楓幣#k。\r\n#b");
                        if (ret == 1) {
                                if (stage.hasMesos(5000)) {
                                        stage.loseMesos(5000);
                                        stage.changeSkillLevel(92040000, 0x1000000);
                                        eff.uol("profession/levelup").playSoundEffect();
                                        usr.uol("Effect/OnUserEff.img/professions/alchemy_levelup").showAvatarOriented();
                                        npc.say("好！非常好！太棒了！！好了～我已經把鍊金術知識全部傳授給你了。熟練度滿了之後，可以提升鍊金術等級。別忘了到時再來找我。");
                                } else {
                                        npc.say("你的錢不夠啊。想要學習的話，需要#b5000楓幣#k才行。這可是規矩。");
                                }
                        } else {
                                npc.say("什麼！！！鍊金術是非常有用的技術。這都還要考慮？你也太慎重了吧？");
                        }
                }
                break;
        case 2:
                if (stage.getMakingSkillLevel(92040000) >= 12) {
                        npc.next().say("你已經達到最高等級了，不需要在提升了！");
                } else if (stage.checkMakingSkillExpFull(92040000)) {
                        let ret = npc.askYesNo("你的熟練度積滿了呀，現在是否要提升至下一等級，學習新的內容？");
                        if (ret == 1) {
                                let nLevel = Math.min(12, stage.getMakingSkillLevel(92040000) + 1);
                                stage.changeSkillLevel(92040000, nLevel << 24);
                                eff.uol("profession/levelup").playSoundEffect();
                                usr.uol("Effect/OnUserEff.img/professions/alchemy_levelup").showAvatarOriented();
                                npc.next().say("好了，我已經幫你提升了鍊金術等級。熟練度積滿後可再提升至下一等級，就可以學習新的內容。等你積滿熟練度後，再來找我吧。");
                        } else {
                                npc.next().say("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
                        }
                } else {
                        npc.next().say("哎呀！你可真貪心。熟練度還不夠。你再去練習練習吧。");
                }
                break;
        case 3:
                let ret = npc.askYesNo("你想放棄鍊金術？是厭倦了嗎？之前積累的等級和熟練度……付出的努力和金錢……都將會變成泡影……你真的要初始化嗎？");
                if (ret == 1) {
                        stage.changeSkillLevel(92040000, -1);
                        stage.checkMakingSkillEff();
                        npc.next().say("全部初始化了……真可惜。如果你想重新學習的話，可以隨時來找我。");
                } else {
                        npc.next().say("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
                }
                break;
}

function getMakingSkillSize() {
        let ret = 0;
        for (let i = 9202; i <= 9204; i++) {
                if (stage.getMakingSkillLevel(i * 10000) > 0) {
                        ret++;
                }
        }
        return ret;
} 