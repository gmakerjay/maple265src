// Created by MetaMS
// ID:[951000000]
// MapName:怪物公園
// 怪物公園

let minLevel = 260;
let maxLevel = 999;

if (stage.getLevel() < minLevel) {
        npc.say("終極怪物公園#b只有" + minLevel + "級以上#k的玩家\r\n可以使用。");
} else {
        ctx.showMonsterParkUI(0);
}