// Created by MetaMS
// ID:[951000000]
// MapName:怪物公園
// 怪物公園

let minLevel = 105;
let maxLevel = 140;

if (stage.getLevel() > maxLevel || stage.getLevel() < minLevel) {
        npc.defNpc(9071004).say("初級副本#b只有" + minLevel + "級以上，未滿" + maxLevel + "級#k的玩家\r\n可以使用。");
} else {
        ctx.showMonsterParkUI(1);
}