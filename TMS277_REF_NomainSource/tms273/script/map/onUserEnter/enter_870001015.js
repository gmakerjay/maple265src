// Created by MetaMS
// ID:[870001015]
// MapName:主臥室

stage.resetForcedStat();

stage.startQuest(66716);//Quest Name:Unknown
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
let entity_1 = stage.spawnTempNpc(9401600, 150, -30, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
eff.blind(true).binary(255).type(2).setLayerBlind();
dir.scale(2000).y(-300).setCameraZoom();
dir.setVansheeMode(true);
stage.startQuest(66716);//Quest Name:Unknown
cam.delay(5000).start(2000).end(2000).y(-467).setScaleAbsMove();
eff.blind(true).binary(200).setLayerBlind();
dir.setDelay(500);
eff.duration(3000).setLayerBlind();
dir.setDelay(5000);
npc.id(9401592).ui(1).noEsc().next().say("#face0##fc0xFFEDAEFF#能量礦石#k曾經被稱為#b神聖石#k，是王室流傳的聖物。");
npc.id(9401592).ui(1).noEsc().next().say("#face0#因為崇高的事物要妥善保存的觀念，王族放棄了對能量礦石的研究。\r\n迪倫公爵…一直很#r警戒#k能量礦石的力量。");
npc.id(9401592).ui(1).noEsc().next().say("#face0#因為能散發出多少能量還是個未知數，所以我有時候也會害怕。");
npc.id(9401592).ui(1).noEsc().next().say("#face0#請和留在城裡的成員們一起研究這股力量。只是請不要將力量留在#b未知的領域#k。");
stage.setNpcSpecialAction(entity_1, "greet", 0, false);
dir.setDelay(500);
eff.blind(true).binary(200).duration(1500).setLayerBlind();
dir.setDelay(2000);
cam.delay(8000).start(2000).end(2000).x(50).setScaleAbsMove();
dir.local(4).align(1).lineSpace(1).value(-80).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs35#被潘奈迪特勸說成為城主的人和，");
dir.local(4).align(1).lineSpace(1).value(-80).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs35#他的夥伴們的功勞");
dir.local(4).align(1).lineSpace(1).value(-80).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs35#為失去主人的城堡起了一個新名字．．．");
dir.end(true).local(7).align(1).lineSpace(1).data("0xFF000000").setMonologueEx("");
dir.local(4).align(1).lineSpace(1).value(-60).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs35#．．．那個名字就是");
dir.local(4).align(1).lineSpace(1).value(-60).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs40##fc0xFF42ff00#<膩在一起 公會城>#k！#n");
dir.end(true).local(7).align(1).lineSpace(1).data("0xFF000000").setMonologueEx("");
dir.setDelay(1000);
eff.uol("BgmWz2/GuildCastle_HisReminiscence").x(5000).changeBGM();
dir.setDelay(3000);
eff.duration(4500).setLayerBlind();
dir.setDelay(4500);
stage.setNpcForceMove(entity_1, -1, 120, 100);
dir.setDelay(800);
cam.delay(2800).start(2000).end(2500).x(15).y(25).setScaleAbsMove();
dir.setDelay(4000);
usr.normal(true).text("…").time(2500).origin(1).lineSpace(4).npcId(9401600).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(3000);
npc.id(9401592).ui(1).noEsc().next().say("#face0#迪倫，您跟我說過吧。");
dir.setDelay(1000);
npc.id(9401592).ui(1).noEsc().next().say("#face0#要我放下#r罪惡感#k，毫無留戀地離開公爵城。\r\n要我放棄名字#b重新出發#k向楓之谷世界任何一個角落。");
dir.setDelay(500);
npc.id(9401592).ui(1).noEsc().next().say("#face0#我放棄了我的名字，使用了公爵城的名字流浪。");
dir.setDelay(500);
npc.id(9401592).ui(1).noEsc().next().say("#face0#但願不要責怪這份想要保存城的私心。");
usr.normal(true).text("…….").time(1800).origin(1).lineSpace(4).npcId(9401600).chrId(stage.getCharacterId()).showSpeechBalloon();
dir.setDelay(2500);
npc.id(9401592).ui(1).noEsc().next().say("#face0#我擁有的東西中，我拋棄了除了潘奈迪特這個名字以外的所有東西。");
npc.id(9401592).ui(1).noEsc().next().say("#face0#將過去的輝煌，服侍你時所享受的幸福，與龍印象深刻的的戰鬥… 全部拋棄，作為#e#fc0xFF42ff00#<膩在一起>#k#n公會的管理員，履行我的使命。");
dir.setDelay(1000);
npc.id(9401592).ui(1).noEsc().next().say("#face0##b研究#k讓你害怕的力量，阻止他被#r惡意利用#k。");
dir.setDelay(2000);
npc.id(9401592).ui(1).noEsc().next().say("#face0#現在交給我……");
dir.setDelay(1000);
npc.id(9401592).ui(1).noEsc().next().say("#face0#祝你有個好夢。");
dir.setDelay(1000);
stage.setNpcSpecialAction(entity_1, "greet", 0, false);
dir.setDelay(2500);
cam.delay(10000).start(2500).end(1500).x(-200).setScaleAbsMove();
stage.setNpcForceMove(entity_1, -1, 400, 100);
dir.setDelay(3000);
stage.setNpcFadeHide(entity_1, 0, 1500);
dir.setDelay(1500);
eff.blind(true).binary(255).duration(4000).setLayerBlind();
dir.setDelay(5000);
/* Update Quest RecordEx | Id:66704 | Name: Unknown | Data: "master=0;story=1" */
//stage.updateQuestRecordEx(66704, "master=0;story=1");
if (stage.getGuildGrade() == 1) {
        stage.updateQuestRecordEx(66704, "master", "1");
} else {
        stage.updateQuestRecordEx(66704, "master", "0");
}
stage.updateQuestRecordEx(66704, "story", "1");
stage.completeQuest(66716);//Quest Name:Unknown
/* Update Quest RecordEx | Id:502695 | Name: Unknown | Data: "resetTime=24/03/04/00/00;mobKillMaxAcc=5000;WeeklyMission=0;initialize=1;isGuildMemberAcc=24/03/03;story=1;WeeklyReward=0" */
stage.updateQuestRecordEx(502695, "resetTime=24/03/04/00/00;mobKillMaxAcc=5000;WeeklyMission=0;initialize=1;isGuildMemberAcc=24/03/03;story=1;WeeklyReward=0");
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
dir.playMovieURL("https://maplestory-download.beanfun.com/maplestory/download/YouTubeMovie/castle.html");
/* Update Quest RecordEx | Id:66713 | Name: Unknown | Data: "rMap=410007024;FlagRace=0;FlagRaceStar=0;lastVisit=129788" */
//stage.updateQuestRecordEx(66713, "rMap=410007024;FlagRace=0;FlagRaceStar=0;lastVisit=129788");
// Unhandled Message [43] Packet: 2B 01 00 00 00 2E 02 00 00 00 00 00 80 05 BB 46 E6 17 02 2A 00 00 00 00 00 
stage.destroyTempNpc(entity_1);
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [23 00 00 00 ]
stage.changeMap(870000004, 0);