// Created by MetaMS
// My home setting

let n = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + n;
let old = stage.getQuestRecordExShare(500763, "name");
if (old == null) {
        old = stage.getCharacterName() + "'的我的小屋";
}
let visitors = stage.getTempValue("visitors");
let likes = stage.getTempValue("likes");
let menu = "#face0#我能幫你做什麼？\r\n\r\n#L0##b查看我的小屋信息#k#l\r\n#L1##b變更我的小屋名稱#k#l\r\n#L2##b變更訪問權限設定#k#l\r\n#L3##b以放大/縮小畫面模式顯示#k#l\r\n#L99##b我的小屋說明#k#l";
let sel = npc.id(npcId).uiMax().askMenu(menu);
switch (sel) {
        case 0:
                let text = "#face0#我的小屋名稱 : #b" + old;
                text += "#k\r\n最多訪問人數 : #b" + visitors;
                text += "#k\r\n收到的點讚數 : #b" + likes;
                text += "#k\r\n購買剩餘時間 : #b";
                text += "#k\r\n\r\n#L0##b確認#k#l";
                npc.id(npcId).uiMax().askMenu(text);
                break;
        case 1:
                let name = npc.id(npcId).ui(1).minLen(4).maxLen(30).askText("#face0#當前的我的小屋名字為 #b" + old + "#k。你要變更為什麼名字呢？\r\n\r\n");
                ctx.setMyHomeName(name);
                npc.id(npcId).ui(1).next().say("#face1#我的小屋的名字已變為#b" + name + "#k！");
                break;
        case 2:
                npc.id(npcId).ui(1).next().say("#face0#當前不支持！");
                break;
        case 3:
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
                break;
        case 99:
                while (true) {
                        infos();
                }
                break;
}

function infos() {
        let qSel = npc.id(npcId).uiMax().askMenu("#face0#你想知道什麼？\r\n\r\n#L0##b我的小屋是？#k#l\r\n#L1##b權限#k#l\r\n#L2##b家具#k#l\r\n#L3##b邀請/訪問#k#l\r\n#L4##b管家#k#l");
        switch (qSel) {
                case 0:
                        npc.id(npcId).ui(1).next().say("#face0#我的小屋是可以自己親手裝飾的，專屬於我的珍貴空間！\r\n請利用各種各樣的#b建築樣式#k和#b家具#k來打造專屬於我的小屋吧！");
                        npc.id(npcId).ui(1).next().say("#face0#我的小屋是#b世界中所有角色共享#k的空間。一旦裝飾好之後，不僅世界中的所有角色都能使用，而且還能邀請其他人來到我的小屋。");
                        break;
                case 1:
                        npc.id(npcId).ui(1).next().say("#face0#點擊我的小屋菜單的#b#i3801390##t3801390##k按鍵，就能更改我的家的#b建築樣式#k和#b建築外形#k。");
                        npc.id(npcId).ui(1).next().say("#face0#在選擇自己喜歡的屋頂或者牆，窗戶的建築外形後，點擊#b應用#k按鍵，就能立刻應用外形。請綜合各種建築外形，創造出專屬");
                        npc.id(npcId).ui(1).next().say("#face0#變更#b建築樣式#k，就能改變整個家的風格和形態！點擊你喜歡的建築圖紙後，選定建築外形，然後點擊#b確認#k按鍵就可以了。");
                        npc.id(npcId).ui(1).next().say("#face0#但是，在選擇新的圖紙時，需要重新翻新建築，所以需要#b1分鐘#k的完成時間，另外請注意，所有家具都會被取消設置！");
                        break;
                case 2:
                        npc.id(npcId).ui(1).next().say("#face0#點擊我的小屋菜單的#b#i3801391##t3801391##k按鍵，打開#b家具保管箱#k時，就能查看擁有的家具。\r\n請利用收集到的各種家具來裝飾自己的家吧！");
                        npc.id(npcId).ui(1).next().say("#face0#在#b家具保管箱#k中選擇喜歡的家具後，點擊#b放置#k按鍵，或者點擊我的小屋菜單的#b#i3801392##t3801392##k按鍵，進入#b放置家具#k模式。");
                        npc.id(npcId).ui(1).next().say("#face0#你可以在#b放置家具#k模式自由地放置你喜歡的家具。請不要忘記，掛在牆上的家具和放在地上的家具是可以重疊放置的！");
                        npc.id(npcId).ui(1).next().say("#face0##b點擊#k特定家具或者按下#b空格#k鍵就能更改#b特別功能#k。親自去探尋一下每個家具都隱藏有什麼樣的功能吧，是不是很有趣？s");
                        break;
                case 3:
                        npc.id(npcId).ui(1).next().say("#face0#可以邀請好友或者訪客進入自己精心裝飾的我的小屋。通過我的小屋菜單的#b#i3801393##t3801393##k按鍵，輸入自己想要邀請的角色名字吧。");
                        npc.id(npcId).ui(1).next().say("#face0#在楓之谷世界中查看#b角色信息#k，或者#b右鍵點擊角色#k就能訪問該角色的我的小屋。\r\n而且在#b好友名單#k或者#b聊天窗口#k #b右鍵點擊角色名字#k也能訪問我的小屋！");
                        npc.id(npcId).ui(1).next().say("#face0#你是不是偶爾也想去全新的地方看看？點擊我的小屋菜單的#b#i3801394##t3801394##k按鍵，就能隨機訪問其他玩家精心裝飾的我的小屋哦！");
                        npc.id(npcId).ui(1).next().say("#face0#但是，請注意每個我的小屋都有同時可訪問人數的上限，有的玩家還會禁止訪客的訪問哦！");
                        break;
                case 4:
                        npc.id(npcId).ui(1).next().say("#face0#精心裝飾的我的小屋，在#h0#出門的時候，需要人來管理吧？這就是我們這樣的#b管家#k存在的理由。");
                        npc.id(npcId).ui(1).next().say("#face0#管家會在我的小屋中待很長時間，\r\n#b1. 每天提供有用的增益或者\r\n2. 購買新的家具又或者\r\n3.為了迎接訪客而做準備#k\r\n等，承擔著多種角色。");
                        npc.id(npcId).ui(1).next().say("#face0#通過#b管家的幫助增益#k，每天可以獲得一次增益，可以對在楓之谷世界的生活起到幫助。雖然可以選擇你想要的增益種類，但是強度和持續時間都會根據#b管家的能力#k而產生變化。");
                        npc.id(npcId).ui(1).next().say("#face0##b家具選購#k是為了獲得新家具的管家的重要任務。為了讓#h0#的家變得更加美麗和豐富，肯定需要更多的家具吧？\r\n但是家具的下單，製作，購買都需要不少時間，需要經常查看選購情況哦。");
                        npc.id(npcId).ui(1).next().say("#face0#為了迎接#b訪客#k，需要管家的幫助。需要和管家討論並確定是否允許訪客的訪問，管家的能力還將決定可以同時訪問的人數。");
                        npc.id(npcId).ui(1).next().say("#face0#雖然這能力屬於不起眼的管家，但是否能夠成長為更加熟練的樣子，很大程度取決於#h0#能否給予不斷的關心。\r\n如果每天都#b和管家對話#k，關心管家，管家就會更加努力，能力也會成長得更快！");
                        break;
        }
}