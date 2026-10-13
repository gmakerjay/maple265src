// Created by MetaMS
// [潘奈迪特]  |  [9401592]
// MapName:Unknown

ctx.setGuildCastleResearch(stage.getGuildId(), stage.getCharacterName(), -1, 3);
npc.id(9401592).ui(1).say("#face0##b<" + ctx.getEntityName() + ">#k的研究已完成。\r\n ※研究完成後等級 : #r#e" + ctx.getOption() + "#k#n");