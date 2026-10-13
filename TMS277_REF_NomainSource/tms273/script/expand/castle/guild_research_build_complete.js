// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

npc.uiMax().next().id(9401592).say("#face0#看來你已經準備好擴建城堡了。\r\n請再仔細確認以下註意事項後，慎重選擇。\r\n\r\n#r<註意事項>#k\r\n※研究完成的瞬間，#r所有的公會成員#k都會暫時#fc0xFF00FFFF#退場#k。\r\n※研究完成後，就無法再恢復到#fc0xFF00FFFF#上一階段#k。\r\n※布置的#fc0xFF00BFFF#房間位置及各種裝飾#k均會#fc0xFF00BFFF#初始化#k為預設狀態。");
let ret = npc.ui(1).id(9401592).askAccept("#face0#現在要立即擴建城堡嗎？");
if (ret) {
        ctx.setGuildCastleResearch(stage.getGuildId(), stage.getCharacterName(), -1, 3);
}