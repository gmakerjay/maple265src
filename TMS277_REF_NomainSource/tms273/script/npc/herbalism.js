// Created by MetaMS
// [9031001]
// MapName:匠人街

let selStr = "我是採藥大師 #b斯塔切#k，找我有事嗎？\r\n\r\n";
if (stage.getMakingSkillLevel(92000000) > 0) {
        selStr += "#L2##b提升#e採藥#n等級。#l\r\n#L4##b交換#t2028066#。#k#l";//#L3#採藥初始化。#k#l\r\n
} else {
        selStr += "#L0##b聽取有關#e採藥#n的說明。#l\r\n#L1#學習#e採藥#n。#k#l";
}
let sel = npc.askMenu(selStr);
switch (sel) {
        case 0:
                npc.next().say("採藥是利用鏟子之類的工具，採集地圖上的藥草的技能。把採集到的藥草裝在#p9031007#出售的油瓶中提煉，可以獲得裝備、飾品、鍊金術所需的材料。");
                break;
        case 1:
                if (stage.getLevel() < 30) {
                        npc.say("哎呀，你好像還不夠強，還不能學習專業技術。#b至少必須達到30級2轉以上，龍神必須3轉以上，暗影雙刀必須2轉+以上#k，才能學習專業技術。請你繼續努力，等達到條件之後再來找我。");
                } else if (stage.getMakingSkillLevel(92000000) > 0) {
                        npc.say("你已經學些過#e採藥#n，難道還想學？");
                } else if (!stage.isQuestCompleted(3194)) {
                        npc.say("你對採藥感興趣嗎？想學的話，必須先去見見#b希梅爾#k～在村子入口處就能見到希梅爾了。");
                        /*} else if (getMakingSkillSize() > 2) {
                                npc.say("嗯，你好像已經學習了3種專業技術。真想學習的話，就必須先放棄一種技術。");*/
                } else {
                        let ret = npc.askYesNo("學習#b採藥#k。確定要進行學習嗎？需要#b5000楓幣#k的費用。這些錢你應該有的吧？#b");
                        if (ret == 1) {
                                if (stage.hasMesos(5000)) {
                                        stage.loseMesos(5000);
                                        stage.changeSkillLevel(92000000, 0x1000000);
                                        eff.uol("profession/levelup").playSoundEffect();
                                        usr.uol("Effect/OnUserEff.img/professions/herbalism_levelup").showAvatarOriented();
                                        npc.say("好了，我已經把採藥的基本知識傳授給你了。熟練度積滿後提升至下一等級，就可以學習新的內容。等你積滿熟練度後，再來找我吧。");
                                } else {
                                        npc.say("你的錢不夠啊。想要學習的話，需要#b5000楓幣#k才行。這可是規矩。");
                                }
                        } else {
                                npc.say("你還挺謹慎啊。好吧，想清楚後再來找我吧。");
                        }
                }
                break;
        case 2:
                if (stage.checkMakingSkillExpFull(92000000)) {
                        let ret = npc.askYesNo("你的熟練度積滿了呀，現在是否要提升至下一等級，學習新的內容？");
                        if (ret == 1) {
                                let nLevel = Math.min(10, stage.getMakingSkillLevel(92000000) + 1);
                                stage.changeSkillLevel(92000000, nLevel << 24);
                                eff.uol("profession/levelup").playSoundEffect();
                                usr.uol("Effect/OnUserEff.img/professions/herbalism_levelup").showAvatarOriented();
                                npc.next().say("好了，我已經幫你提升了採藥等級。熟練度積滿後可再提升至下一等級，就可以學習新的內容。等你積滿熟練度後，再來找我吧。");
                        } else {
                                npc.next().say("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
                        }
                } else {
                        npc.next().say("哎呀！你可真貪心。熟練度還不夠。你再去練習練習吧。");
                }
                break;
        case 3:
                if (stage.getMakingSkillLevel(92040000) > 0) {
                        npc.next().say("你學習了鍊金術，現在無法初始化。真想初始化的話，就得先對鍊金術進行初始化。");
                } else {
                        let ret = npc.askYesNo("你想放棄#e採藥#n？是厭倦了嗎？之前積累的等級和熟練度……付出的努力和金錢……都將會變成泡影……你真的要初始化嗎？");
                        if (ret == 1) {
                                stage.setSkillLevel(92000000, -1, -1, false);
                                if (stage.isQuestStarted(3195)) {
                                        stage.removeQuest(3195);
                                }
                                if (stage.isQuestStarted(3196)) {
                                        stage.removeQuest(3196);
                                }
                                npc.next().say("採藥技術已經初始化。如果想重新學習，請再來找我。");
                        } else {
                                npc.next().say("看來你很慎重。好的，你先仔細考慮一下，然後再來找我。");
                        }
                }
                break;
        case 4:
                if (!stage.hasItem(4022023, 100)) {
                        npc.say("#b#t4022023#100個#k可以交換#i2028066:##b#t2028066#1個#k。請你再去搜集一些#t4022023#。");
                } else if (!stage.canHold(2028066, 1)) {
                        npc.say("揹包空間不足。");
                } else {
                        stage.loseItem(4022023, 100);
                        stage.gainItem(2028066, 1);
                        npc.say("兌換成功.");
                }
                break;
}

function getMakingSkillSize() {
        let ret = 0;
        for (let i = 9200; i <= 9204; i++) {
                if (stage.getMakingSkillLevel(i * 10000) > 0) {
                        ret++;
                }
        }
        return ret;
} 