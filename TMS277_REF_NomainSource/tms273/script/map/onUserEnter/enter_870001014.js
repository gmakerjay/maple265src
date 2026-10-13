// Created by MetaMS
// ID:[870001014]
// MapName:公爵的辦公室


stage.resetForcedStat();

stage.setBackgroundByTag("thunder", 0, 0);
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
eff.blind(true).binary(235).type(2).setLayerBlind();
stage.startQuest(66796);//Quest Name:Unknown
stage.startQuest(66797);//Quest Name:Unknown
stage.startQuest(66798);//Quest Name:Unknown
stage.startQuest(66716);//Quest Name:Unknown
dir.setVansheeMode(true);
dir.duration(1000).scale(1000).x(400).y(-160).setCameraZoom();
let entity_1 = stage.spawnTempNpc(9401601, 550, 0, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
stage.setMapTaggedObjectSmoothVisible("Office_bg2", false, 0, 0);
stage.setMapTaggedObjectSmoothVisible("Office_L2", false, 0, 0);
stage.setMapTaggedObjectSmoothVisible("Office_R2", false, 0, 0);
stage.setMapTaggedObjectSmoothVisible("Office_C2", false, 0, 0);
dir.setDelay(1000);
usr.text("#e#fs35#能夠引起能量礦石共鳴的人登場，以及\r\n\r\n克雷德的牽制。").speed(55).time(1500).local(4).align(1).lineSpace(6).enter(3).sub("SampleType04").showTextEffect();
dir.setDelay(5000);
eff.key("01").delay(100).rx(50).ry(350).uol("Effect/particle/GuildCastle_EnergyStone_1_1").postRender(true).location(-1).setFieldWeather();
eff.key("02").delay(100).rx(50).ry(400).uol("Effect/particle/GuildCastle_EnergyStone_1_2").postRender(true).location(-1).setFieldWeather();
eff.key("03").rx(50).ry(350).uol("Effect/particle/GuildCastle_EnergyStone_1_3").postRender(true).location(-1).setFieldWeather();
dir.setDelay(2000);
// Unhandled Message [43] Packet: 2B 01 00 00 00 2E 02 00 00 00 00 00 80 05 BB 46 E6 17 02 2A 00 00 00 00 00 
npc.id(9401596).ui(1).noEsc().next().say("#face0##fc0xFFff6600#克雷德#k啊。真的好久沒聽到這個名字了。");
npc.id(9401596).ui(1).noEsc().next().say("#face0#是呀，有人是這麼命名的。");
dir.setDelay(300);
npc.id(9401596).ui(1).noEsc().next().say("#face0#但是，對於龍來說，名字是完全沒用的東西。");
dir.setDelay(500);
npc.id(9401596).ui(1).noEsc().next().say("#face0##r#e#fs20#膽敢任意命名的他們最終只會受罰。");
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1000);
eff.duration(2000).setLayerBlind();
dir.setDelay(1000);
stage.setNpcForceMove(entity_1, -1, 150, 100);
dir.setDelay(800);
cam.delay(2300).start(1000).end(1000).x(300).y(-160).setScaleAbsMove();
dir.setDelay(3000);
npc.id(9401596).ui(1).noEsc().next().say("#face0#我有說我會破壞城堡嗎？ ");
dir.setDelay(1000);
eff.fadeIn(500).fadeOut(500).set(true).setOverlapDetail();
dir.scale(2000).y(-160).setCameraZoom();
eff.delay(1000).removeOverlapDetail();
dir.setDelay(1000);
npc.id(9401596).ui(1).noEsc().next().say("#face0#快看看，能認出主人的城堡。");
dir.setDelay(1500);
stage.completeQuest(66796);//Quest Name:Unknown
stage.setMapTaggedObjectSmoothVisible("Office_bg2", true, 0, 0);
stage.setMapTaggedObjectSmoothVisible("Office_C2", true, 0, 0);
stage.setMapTaggedObjectSmoothVisible("Office_C1", false, 0, 0);
dir.setDelay(500);
stage.setMapTaggedObjectSmoothVisible("Office_bg1", false, 0, 0);
dir.setDelay(2500);
npc.id(9401596).ui(1).noEsc().next().say("#face0##fc0xFFEDAEFF##fs25##e就是這股能量呀！");
dir.setDelay(500);
cam.start(1000).end(1300).x(-650).y(-70).setScaleAbsMove();
stage.completeQuest(66716);//Quest Name:Unknown
stage.completeQuest(66797);//Quest Name:Unknown
stage.setMapTaggedObjectSmoothVisible("Office_L1", false, 0, 0);
stage.setMapTaggedObjectSmoothVisible("Office_L2", true, 0, 0);
dir.setDelay(2500);
cam.start(1000).end(1300).x(850).y(-70).setScaleAbsMove();
stage.completeQuest(66798);//Quest Name:Unknown
stage.setMapTaggedObjectSmoothVisible("Office_R1", false, 0, 0);
stage.setMapTaggedObjectSmoothVisible("Office_R2", true, 0, 0);
dir.setDelay(2500);
eff.fadeIn(500).fadeOut(500).set(true).setOverlapDetail();
dir.scale(1000).timePos(1200).x(300).y(-160).setCameraZoom();
eff.delay(1000).removeOverlapDetail();
dir.setDelay(1000);
npc.id(9401596).ui(1).noEsc().next().say("#face0#不覺得很像#fc0xFFFFFF00#自我恢復#k嗎？");
npc.id(9401596).ui(1).noEsc().next().say("#face0#現在還不遲。給你個機會。\r\n臣服於我的力量，接受我賜予的恩寵。");
npc.id(9401596).ui(1).noEsc().next().say("#face0##fs20##e#r我才是真正的城堡主人。");
stage.setNpcSpecialAction(entity_1, "attack1", 0, false);
eff.uol("Sound/PL_Sound.img/GuildCastle/direction/graderAttack2").volume(100).playSoundEffect();
dir.setDelay(1000);
stage.setBackgroundByTag("thunder", 1, 30);
dir.setDelay(30);
eff.r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(5).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(2).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(3).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.uol("Sound/SoundEff.img/foxvalley/thunder").volume(100).playSoundEffect();
dir.setDelay(30);
stage.setBackgroundByTag("thunder", 0, 30);
dir.setDelay(30);
eff.r(255).g(255).b(255).duration(30).changeFiledObjectColor();
dir.setDelay(30);
eff.type(5).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
eff.type(2).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
eff.type(3).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
dir.setDelay(30);
stage.setBackgroundByTag("thunder", 1, 30);
dir.setDelay(300);
stage.setBackgroundByTag("thunder", 0, 900);
dir.setDelay(300);
eff.r(255).g(255).b(255).duration(90).changeFiledObjectColor();
stage.setBackgroundByTag("thunder", 1, 30);
dir.setDelay(30);
eff.r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(5).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(2).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(3).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.uol("Sound/SoundEff.img/foxvalley/thunder").volume(100).playSoundEffect();
dir.setDelay(30);
stage.setBackgroundByTag("thunder", 0, 30);
dir.setDelay(30);
eff.r(255).g(255).b(255).duration(30).changeFiledObjectColor();
dir.setDelay(30);
eff.type(5).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
eff.type(2).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
eff.type(3).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
dir.setDelay(30);
stage.setBackgroundByTag("thunder", 1, 30);
dir.setDelay(300);
stage.setBackgroundByTag("thunder", 0, 900);
dir.setDelay(300);
eff.r(255).g(255).b(255).duration(90).changeFiledObjectColor();
stage.setBackgroundByTag("thunder", 1, 30);
dir.setDelay(30);
eff.r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(5).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(2).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.type(3).r(200).g(200).b(200).duration(30).changeFiledObjectColor();
eff.uol("Sound/SoundEff.img/foxvalley/thunder").volume(100).playSoundEffect();
dir.setDelay(30);
stage.setBackgroundByTag("thunder", 0, 30);
dir.setDelay(30);
eff.r(255).g(255).b(255).duration(30).changeFiledObjectColor();
dir.setDelay(30);
eff.type(5).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
eff.type(2).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
eff.type(3).r(100).g(100).b(100).duration(30).changeFiledObjectColor();
dir.setDelay(30);
stage.setBackgroundByTag("thunder", 1, 30);
dir.setDelay(300);
stage.setBackgroundByTag("thunder", 0, 900);
dir.setDelay(300);
eff.r(255).g(255).b(255).duration(90).changeFiledObjectColor();
eff.type(1).key("01").delay(1000).setFieldWeather();
eff.type(1).key("02").delay(1000).setFieldWeather();
eff.type(1).key("03").delay(1000).setFieldWeather();
eff.blind(true).binary(200).duration(1500).setLayerBlind();
dir.setDelay(2000);
dir.local(4).align(1).lineSpace(1).value(-90).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs35#無論什麼花言巧語都不會聽信的堅定眼神。");
dir.local(4).align(1).lineSpace(1).value(-90).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs35#得到多數人信任且擁有光明意志的人…");
dir.local(4).align(1).lineSpace(1).value(-90).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs35#與夥伴合力作戰，苦盡甘來，擊敗了克雷德。");
stage.setNpcSpecialAction(entity_1, "die1", 1800, false);
eff.uol("Sound/PL_Sound.img/GuildCastle/direction/graderDie").volume(100).playSoundEffect();
stage.resetNpcSpecialAction(entity_1);
dir.end(true).local(4).align(1).lineSpace(1).decTic(5).data("0xFF000000").setMonologueEx("");
dir.setDelay(1000);
dir.local(4).align(1).lineSpace(1).decTic(5).data("0xFF045b52").setMonologueEx("#e#fs40#成功奪回公爵城。");
dir.end(true).local(4).align(1).lineSpace(1).decTic(5).data("0xFF000000").setMonologueEx("");
eff.uol("Bgm00/Silence").x(5000).changeBGM();
eff.blind(true).binary(150).duration(1500).setLayerBlind();
stage.resetNpcSpecialAction(entity_1);
stage.setNpcSpecialAction(entity_1, "die2", -1, false);
eff.uol("Sound/PL_Sound.img/GuildCastle/direction/graderDamage").volume(100).playSoundEffect();
dir.setDelay(3000);
eff.blind(true).binary(255).duration(1500).setLayerBlind();
dir.setDelay(2000);
dir.setStandAloneMode(false);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
// Unhandled Message [43] Packet: 2B 01 00 00 00 2E 02 00 00 00 00 00 80 05 BB 46 E6 17 02 2A 00 00 00 00 00 
stage.destroyTempNpc(entity_1);
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [23 00 00 00 ]
stage.changeMap(870001015, 0);