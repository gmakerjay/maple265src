// Created by MetaMS
// [森蘭丸]  |  [9130090]
// MapName:秘密祭壇

if (party == null || stage.getCharacterId() != party.getLeaderId()) {
        npc.noEsc().next().say("請讓隊長與我交談。");
} else if (npc.noEsc().askAccept("別再多說了，你能阻止我嗎？#k")) {
        if (map.getId() == 807300110) {
                let event = stage.getEvent("boss_ranmaru_normal");
                if (event != null && event.getVariable("boss") == null) {
                        event.setVariable("boss", false);
                        map.spawnMob(9421581, -424, -15);
                }
                map.removeNpc(9130090);
        } else if (map.getId() == 807300210) {
                let event = stage.getEvent("boss_ranmaru_hard");
                if (event != null && event.getVariable("boss") == null) {
                        event.setVariable("boss", false);
                        map.spawnMob(9421583, -424, -15);
                        event.startTimer("Spawn_R", 60 * 1000);
                        event.startTimer("Spawn_B", 2 * 60 * 1000);
                        event.startTimer("Spawn_P", 3 * 60 * 1000);
                }
                map.removeNpc(9130090);
        }

}
