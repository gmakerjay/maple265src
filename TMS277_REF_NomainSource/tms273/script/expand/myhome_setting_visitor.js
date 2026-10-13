// Created by MetaMS
// My home setting

let n = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + n;
let name = stage.getTempValue("Name");
let visitors = stage.getTempValue("visitors");
let likes = stage.getTempValue("likes");

let menu = "#face1#顯示您訪問的我的小屋的信息！\r\n\r\n我的小屋名稱：#b" + name + "#k\r\n訪問人數：#b" + visitors + "名#k\r\n點讚數量：#b" + likes + "個#k\r\n\r\n#L0##b以放大/縮小畫面模式顯示#k#l";
let sel = npc.id(npcId).uiMax().askMenu(menu);
if (sel == 0) {
        let rate = cam.currentRate();
        while (true) {
                let text = "#face1#使用畫面放大/縮小模式，在任意距離中參觀好友的我的小屋吧！\r\n#b(當前倍率：" + rate / 10 + " % )#k\r\n\r\n#L0##b 放大畫面#k#l\r\n#L100# 還原畫面大小為#b100% #k#l\r\n#L1##b 縮小畫面#k#l"
                let selSub = npc.id(npcId).uiMax().askMenu(text);
                if (selSub == 100) {
                        rate = 1000;
                        dir.setInGameCurNodeEventEnd(true);
                        dir.lockUI().showUI().setInGameDirectionMode();
                        cam.type(1).delay(500).rate(rate).setScaleRate();
                        dir.setDelay(500);
                        dir.setInGameDirectionMode();
                } else if (selSub == 0) {
                        if (rate < 2000) {
                                rate += 200;
                                rate = Math.min(2000, rate);
                                dir.setInGameCurNodeEventEnd(true);
                                dir.lockUI().showUI().setInGameDirectionMode();
                                cam.type(1).delay(500).rate(rate).setScaleRate();
                                dir.setDelay(500);
                                dir.setInGameDirectionMode();
                        } else {
                                npc.id(npcId).ui(1).next().say(" #face3#再近就看不到啦！");
                        }
                } else if (selSub == 1) {
                        if (rate > 650) {
                                rate -= 200;
                                rate = Math.max(650, rate);
                                dir.setInGameCurNodeEventEnd(true);
                                dir.lockUI().showUI().setInGameDirectionMode();
                                cam.type(1).delay(500).rate(rate).setScaleRate();
                                dir.setDelay(500);
                                dir.setInGameDirectionMode();
                        } else {
                                npc.id(npcId).ui(1).next().say("#face3#再遠就看不到啦！");
                        }
                }
        }
}
