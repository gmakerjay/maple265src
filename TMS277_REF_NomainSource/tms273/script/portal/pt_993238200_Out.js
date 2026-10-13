// Created by MetaMS
// ID:[993238200]
// MapName:番茄收穫場
// 番茄收穫場


if (npc.id(9063145).askYesNo("你要去哪？\r\n中途離開太可惜了。\r\n\r\n#r※ 若是中途離開，獲得的分數會初始化，無法獲得獎勵。")) {
        /* Response is Yes */
        stage.changeMap(993238001, 0);
}