// Created by MetaMS
// ID:[2436884]
// MapName:弓箭手培訓中心
// 預設劵

let sel = npc.id(9010106).askMenu("你好，勇士！你用過#r預設劵#k嗎？\r\n\r\n#b預設#k是一種可以提前保存好#r攻擊隊配置狀態#k和#r內部能力值配置狀態#k，以便後續#b隨時加載到戰鬥地圖的功能#k，默認會提供2個不設限的預設，同時還可以額外#r最多再使用3個預設30天#k。\r\n各個欄位#b從現在起最多只能延長180天#k。\r\n\r\n請問要#b解鎖哪個預設，或者延長時長#k呢？\r\n#b#L0# <3號預設> 解鎖#l\r\n#b#L1# <4號預設> 解鎖#l\r\n#b#L2# <5號預設> 解鎖#l\r\n#r#L3#不使用預設券。#l");
switch (sel) {
        case 0:
        case 1:
        case 2:
                let slot = sel + 3;
                let questId = 500011 + sel;
                if (npc.id(9010106).askYesNo("要將#b#e" + slot + "號預設#n#k#r#e解鎖#n#k嗎？#n#k")) {
                        ctx.consume();
                        stage.updateQuestRecordEx(questId, "endDate", "99/01/01/00/00");
                        npc.id(9010106).say("#b#e" + slot + "號預設#n#k已解鎖！");
                } else {
                        npc.id(9010106).say("需要幫助就隨時跟我說！");
                }
                break;
        default:
                npc.id(9010106).say("需要幫助就隨時跟我說！");
                break;
}