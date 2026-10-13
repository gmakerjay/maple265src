// Created by MetaMS
// ID:[871000010]
// MapName:射手村

dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffectEx();
eff.uol("Bgm00.img/Silence").changeBGM();
let entity_1 = stage.spawnTempNpc(9400928, 3900, 115, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
eff.uol("Bgm00/FloralLife").changeBGM();
cam.setStickToUser();
dir.moveDir(2).moveFixel(230).setForcedMove();
dir.setDelay(1000);
stage.setNpcForceMove(entity_1, -1, 100, 100);
dir.setDelay(2000);
npc.id(9400920).ui(1).noEsc().next().say("#face3#哇…你是看了傳單過來的嗎？真的？");
stage.setNpcForceFlip(entity_1, 1);
dir.setDelay(300);
stage.setNpcForceMove(entity_1, 1, 150, 100);
dir.setDelay(1000);
npc.id(9400920).ui(1).noEsc().next().say("#face2#天啊啊啊啊！不要一直站著快來這裡坐坐！");
dir.setDelay(1000);
dir.moveDir(2).moveFixel(120).setForcedMove();
cam.delay(1000).start(1000).end(2000).x(150).y(100).setScaleRelMove();
dir.setDelay(1000);
stage.setNpcForceFlip(entity_1, -1);
dir.setDelay(300);
npc.id(9400920).ui(1).noEsc().next().say("#face2#看傳單後的您應該很清楚，這並不是什麼金碧輝煌的住宅。而是淡雅舒適並樸素中又相當潔淨溫～暖且又舒適的～～～家。");
npc.id(9400920).ui(1).noEsc().next().say("#face1#想像結束忙錄的一天，躺臥在床上休息的樣子吧。從遠方傳來的鳥叫聲，從窗戶吹進來的徐徐微風。在這裡面可以得到的安穩的休息！幸福不就是這樣嗎？");
npc.id(9400920).ui(1).noEsc().next().say("#face1#家也是充滿回憶的空間，為了可以填滿新屋主的回憶，房間內稍～微清空了。這樣刻意的留白是不是很讓人興奮呢。");

let flag = true;
while (flag) {
        let selection = npc.id(9400920).ui(1).noEsc().askMenu("#face2#這樣的房子只要50萬楓幣！如何？現在就要簽約嗎？\r\n#b#L0# 決定簽約。#l\r\n#L1# 讓我再思考一下。#l\r\n#L2# 如此便宜的價格，令人起疑。#l\r\n#L3# 所準備的台詞，令人起疑。#l");
        switch (selection) {
                case 0:
                        flag = false;
                        npc.id(9400920).ui(1).noEsc().next().say("#face2#太好了！請在這裡簽名吧！");
                        break;
                case 1:
                        npc.id(9400920).ui(1).noEsc().next().say("#face3#嗯～現在後面可是排了很多想簽約的人呢，可沒辦法等您很久的。您也知道這可是非常棒的機會吧？");
                        break;
                case 2:
                        npc.id(9400920).ui(1).noEsc().next().say("#face3#蛤啊？因為太便宜覺得很可疑嗎？…");
                        npc.id(9400920).ui(1).noEsc().next().say("#face3#…都已經跟你說了這些要把這房子給賣出去，但還覺得可疑…無法輕易相信的話，那也沒辦法了。");
                        npc.id(9400920).ui(1).noEsc().next().say("#face3#我的父母是個冒險家。雖然不像勇士您一樣是個有名的冒險家，但是個比誰都還要重視楓之谷世界的和平的人。所以才丟下我和哥哥們離開…(哽咽)");
                        npc.id(9400920).ui(1).noEsc().next().say("#face3#比起怨恨更是多了滿滿的擔心和想念。已經失去聯繫很長時間了…(哽咽)所以我也為了去找爸媽展開冒險，而決定把房子賣掉。你有聽過[急售]嗎？急！售！ ");
                        break;
                case 3:
                        npc.id(9400920).ui(1).noEsc().next().say("#face3#哎唷，您真是多慮!難到你覺得我是把寫在哪裡的台詞背一背說給您聽的嗎？！");
                        npc.id(9400920).ui(1).noEsc().next().say("#face3#這些都是我從心裡說出來的話啊～");
                        break;
        }
}
eff.blind(true).binary(200).duration(1300).setLayerBlind();
dir.setDelay(1600);
dir.setMonologue("#fs30##e[菇菇小屋買賣契約書]");
dir.setMonologue("#fs14#賣方和買方雙方，依據下方標示不動產，會和下方的合約內容一起簽定買賣合約。");
dir.setMonologue("#fs20#\r\n所在地 : 楓之谷世界維多利亞島克蘭西亞村莊菇菇路1-1");
dir.setMonologue("#fs20#買賣金額 : 500,000楓幣");
dir.setMonologue("#fs20#簽約日 : " + util.getStringDate("yyyy/MM/dd"));
dir.setMonologue("#fs12#(因變心想要換錢是絕對！絕對！不可以的喔！)");
dir.setMonologue("#fs15#\r\n賣方：艾咪");
dir.end(true).setMonologue("#fs15#買方：#h0#");
eff.duration(1300).setLayerBlind();
dir.setDelay(1600);
// Inventory Operation with 1 operations.
if (stage.canHold(2630583, 1)) {
        stage.gainItem(2630583, 1);
}
npc.id(9400920).ui(1).noEsc().next().say("#face1#啊，我要給你可立即往家方向移動的#i2630583:##t2630583#，但道具欄似乎沒有位子了！");
npc.id(9400920).ui(1).noEsc().next().say("#face2#沒關係，就算沒有#t2630583#，能夠往家移動的方法有很多喔！");
stage.showSystemMessage("實際楓幣並不會發送跟減少。");
eff.term(900).key("0").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHomeTuto/0").location(4).removeAfter(-1).setLayerOn();
npc.id(9400920).ui(1).noEsc().next().say("#face1#第一種，按下角色快捷列的[前往我的小屋]按鍵移動。");
npc.id(9400920).ui(1).noEsc().next().say("#face1#第二種，在我的角色資訊視窗中，按下[前往我的小屋]按鍵移動。");
eff.term(300).key("0").setLayerOff();
npc.id(9400920).ui(1).noEsc().next().say("#face1#我因還有其它的約，無法一起同行…您自己可以找得到吧？");
npc.id(9400920).ui(1).noEsc().next().say("#face3#那麼祝你有個美好的楓之谷生活！那就下次再見…#fs8#(才怪)…#fs12#喔！");
/* Update Quest RecordEx | Id:64612 | Name: Unknown | Data: "housing=4" */
stage.updateQuestRecordExShare(64612, "housing", "4");
/* Update Quest RecordEx | Id:64612 | Name: Unknown | Data: "housing=4;furniture=2" */
stage.updateQuestRecordExShare(64612, "furniture", "2");
/* Update Quest RecordEx | Id:500763 | Name: [我的小屋]家？家！我的家！ | Data: "season=null;cid=17579860" */
stage.updateQuestRecordExShare(500763, "season", "null");
stage.updateQuestRecordExShare(500763, "cid", stage.getCharacterId());
/* Update Quest RecordEx | Id:500763 | Name: [我的小屋]家？家！我的家！ | Data: "season=null;CID=17579860;cid=17579860" */
stage.updateQuestRecordExShare(500763, "CID", stage.getCharacterId());
/* Update Quest RecordEx | Id:500763 | Name: [我的小屋]家？家！我的家！ | Data: "season=null;name=Nice破風使者;CID=17579860;cid=17579860" */
stage.updateQuestRecordExShare(500763, "name", stage.getCharacterName());

stage.completeQuest(500763);//Quest Name:[我的小屋]家？家！我的家！
stage.completeQuest(64590);//Quest Name:[我的小屋]家？家！我的家！
stage.startQuest(64591);//Quest Name:[我的小屋]通往我的小屋的路
/* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "7=1" */
stage.updateQuestRecordExShare(500767, "7", "1");
/* Update Quest RecordEx | Id:500773 | Name: Unknown | Data: "managerHide=1;resetDate=23/04/26" */
stage.updateQuestRecordExShare(500773, "managerHide", "1");
stage.updateQuestRecordExShare(500773, "resetDate", util.getStringDate("yyyy/MM/dd"));
ctx.createMyHome();
stage.showSystemMessage("[我的小屋]入場方式");
stage.showSystemMessage("1. 按下角色快捷列中的[回家]按鍵即可入場。");
stage.showSystemMessage("2. 按下角色資訊視窗中的[回家]按鍵即可入場。");
stage.showSystemMessage("※ 完成全部的新手任務後，帳號中所有角色皆可使用[我的小屋]功能。");
// Unhandled Ingame Direction Event [26] Packet: 1A BC 02 00 00 
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.destroyTempNpc(entity_1);
let rMap = stage.getIntQuestRecordEx(64590, "rMap")
stage.changeMap(rMap, 0);