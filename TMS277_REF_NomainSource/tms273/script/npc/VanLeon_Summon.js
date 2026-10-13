// Created by MetaMS
// [凡雷恩]  |  [2161000]
// MapName:神祇的黃昏

if (party == null || stage.getCharacterId() != party.getLeaderId()) {
        npc.noEsc().next().say("請讓隊長與我交談。");
} else {
        usr.uol("Voice.img/vonleon/0").value(100).playExclSoundWithDownBGM();
        if (npc.noEsc().askAccept("是來擊退我的勇士們嗎…是與黑魔法師敵對的人們嗎... 不論是哪個都沒關係. 互相的目的明確的話就不需再說些什麼了...  \r\n驚慌吧. 這些愚蠢的人們...#k")) {
                let eventName;
                let mobId;
                switch (map.getId()) {
                        case 211070300:
                                eventName = "boss_vanleon_easy";
                                mobId = 8840013;
                                break;
                        case 211070400:
                                eventName = "boss_vanleon_hard";
                                mobId = 8840018;
                                break;
                        case 211070500:
                                eventName = "boss_vanleon_normal";
                                mobId = 8840010;
                                break;
                }
                let event = stage.getEvent(eventName);
                if (event != null && event.getVariable("boss") == null) {
                        event.setVariable("boss", false);
                        map.spawnMob(mobId, -6, -188);
                }
                map.removeNpc(2161000);
        }
}