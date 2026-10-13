// Created by MetaMS
// ID:[807300210]
// MapName:秘密祭壇
// 秘密祭壇


let event = stage.getEvent("boss_ranmaru_normal");
if (event != null && event.getVariable("npc") == null) {
        event.setVariable("npc", true);
        map.spawnNpc(9130090, -424, -15, 1);
}