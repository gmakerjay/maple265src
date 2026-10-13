// Created by MetaMS
// Quick Move - Profession

if (npc.id(9000087).askYesNo("你想移動到匠人的村莊匠人街嗎？在#b<匠人街>#k可以學習#b採藥、採礦、裝備製作、飾品製作、鍊金術等#k5種專業技術。")) {
        stage.updateQuestRecordEx(7860, "returnMap", map.getId());
        stage.changeMap(910001000, 0);
}