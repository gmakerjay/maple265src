// Created by MetaMS
// Quick Move - Profession

if (npc.id(9000087).askYesNo("你想移動到可以和其他角色交易道具的#b<自由市場>#k嗎？")) {
        stage.updateQuestRecordEx(7600, "rMap", map.getId());
        stage.updateQuestRecordEx(7600, "sp", ctx.getPortalId());
        stage.changeMap(910000000, 0);
}