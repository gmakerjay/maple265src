// Created by MetaMS
// ID:[262030100]
// MapName:走廊1
// 走廊1

let key;
let mobId;
switch (map.getId()) {
        case 262030100:
                key = "S1_Summon";
                mobId = 8870003;
                break;
        case 262031100:
                key = "S1_Summon";
                mobId = 8870103;
                break;
        case 262030200:
                key = "S2_Summon";
                mobId = 8870004;
                break;
        case 262031200:
                key = "S2_Summon";
                mobId = 8870104;
                break;
}
if (party == null || stage.getCharacterId() != party.getLeaderId()) {
        stage.showSystemMessage("請讓你的組隊長通過吧!");
} else {
        let event = stage.getEvent();
        if (event != null) {
                let canSummon = event.getVariable(key) == null;
                if (map.getActiveMobCount() > 0) {
                        if (canSummon) {
                                stage.showScriptProgressMsg("為了前往希拉的塔的最頂樓，要將骷髏騎士全部除掉。");
                                stage.showSystemMessage("首先要除掉場地內的所有怪物。");
                        } else {
                                stage.showScriptProgressMsg("因血牙的阻礙無法移動至下一個場所。");
                                stage.showSystemMessage("要除掉血牙才能移動。");
                        }
                } else {
                        if (canSummon) {
                                event.setVariable(key, true)
                                let entity_1 = stage.spawnTempNpc(2184001, -919, 196, 1);//NpcName:entity_1
                                stage.showScriptProgressMsg("血牙察覺到我們入侵了！ 擊退血牙。");
                                stage.destroyTempNpc(entity_1);
                                for (let i = 0; i < 3; i++) {
                                        let mob = map.makeMob(mobId);
                                        mob.setAppearType(0x2B);
                                        map.spawnMob(mob, 777, 196)
                                }
                        } else {
                                map.transferTo(map.getId() + 100, 0)
                        }
                }
        }
}