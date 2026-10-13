// Created by MetaMS
// Quest ID:64599
// [我的小屋]装饰我的小屋，开始！


// Inventory Operation with 1 operations.
if (stage.canHold(2672016, 1)) {
        if (!stage.hasItem(2672016, 1)) {
                stage.gainItem(2672016, 1);
        }
        npc.startQuest();
        npc.id(9400921).ui(1).noEsc().next().say("#face2#將將！我從艾丹那邊拿到了桌子！還是免費的！");
        npc.id(9400921).ui(1).noEsc().next().say("#face0#恩…雖然有~~點小問題，但不到沒辦法使用的程度。");
        npc.id(9400920).ui(1).noEsc().next().say("#face1#我們也在米蘭達小鋪買了時鐘回來！");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#太好了！那來放置一下桌子跟時鐘吧！");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#對了，像時鐘一樣要掛在牆上的家具，可以跟要放在地面的家具重疊放置。這樣應該可以更充分地佈置家裡吧？");
} else {
        npc.id(9400921).ui(1).noEsc().next().say("#face1# 背包空間不足，請清理後在跟我對話吧!");
}