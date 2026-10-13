// Created by MetaMS
// ID:[870001013]
// MapName:大廳

stage.resetForcedStat();
/*
stage.changeSkillLevel(80010166, -1);
stage.changeSkillLevel(80010167, -1);
stage.changeSkillLevel(80010168, -1);*/
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffect();
eff.blind(true).binary(255).setLayerBlind();
dir.setStandAloneMode(true);
eff.blind(true).binary(255).type(2).setLayerBlind();
dir.scale(2000).x(-800).setCameraZoom();
/* Update Quest RecordEx | Id:16150 | Name: Unknown | Data: "" */
//stage.updateQuestRecordEx(16150, "");
/* Update Quest RecordEx | Id:66044 | Name: Unknown | Data: "" */
//stage.updateQuestRecordEx(66044, "");
/* Update Quest RecordEx | Id:14756 | Name: Unknown | Data: "d=24/03/03/16/21" */
//stage.updateQuestRecordEx(14756, "d=24/03/03/16/21");
/* Update Quest RecordEx | Id:14755 | Name: Unknown | Data: "" */
//stage.updateQuestRecordEx(14755, "");

/* Update Quest RecordEx | Id:52998 | Name: Unknown | Data: "" */
//stage.updateQuestRecordEx(52998, "");

/* Update Quest RecordEx | Id:18790 | Name: Unknown | Data: "mod=96722373933;lastTime=240303004514;damage=1117774880711;cName=Nice破風使者;CID=null;coin=0" */
//stage.updateQuestRecordEx(18790, "mod=96722373933;lastTime=240303004514;damage=1117774880711;cName=Nice破風使者;CID=null;coin=0");
/* Update Quest RecordEx | Id:18098 | Name: Unknown | Data: "lastTime=240303162157;coin=188" */
//stage.updateQuestRecordEx(18098, "lastTime=240303162157;coin=188");
/* Update Quest RecordEx | Id:18098 | Name: Unknown | Data: "lastTime=240303162157;coin=189" */
//stage.updateQuestRecordEx(18098, "lastTime=240303162157;coin=189");

stage.startQuest(7290, "3700704");//Quest Name:Unknown
let entity_1 = stage.spawnTempNpc(9401599, -950, -100, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(9401602, -880, -100, 1);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
dir.setVansheeMode(true);
dir.setDelay(2000);
usr.text("#e#fs35#這是一場讓人覺得不可能在美麗的王國發生的慘烈又艱苦的戰鬥。").speed(45).time(1500).local(4).align(1).lineSpace(6).enter(3).sub("SampleType04").showTextEffect();
dir.setDelay(5000);
usr.text("#e#fs35##fc0xFFd8d8d8#緊握勝機的龍，貪慾和災害的集合體 #r克雷德#k….").speed(45).time(1500).local(4).align(1).lineSpace(6).enter(3).sub("SampleType04").showTextEffect();
dir.setDelay(5000);
usr.text("#e#fs35##r一旦他吐息，氣息所及處皆引燃烈火。\r\n 一旦他振翅，風暴所及處皆成廢墟。").speed(45).time(2000).local(4).align(1).lineSpace(6).enter(3).sub("SampleType04").showTextEffect();
dir.setDelay(5500);
usr.text("#e#fs35##fc0xFFd8d8d8#孤高之名，聖蒂亞王國名聲遠播。").speed(50).time(1500).local(4).align(1).lineSpace(6).enter(3).sub("SampleType04").showTextEffect();
dir.setDelay(5500);
usr.text("#e#fs38##fc0xFFd8d8d8#所有人都踏上避難之路。 ").speed(50).time(2500).local(4).align(1).lineSpace(6).enter(3).sub("SampleType05").showTextEffect();
dir.setDelay(5500);
dir.setDelay(3000);
eff.key("01").uol("Effect/GuildCastle.img/effect/spine/1/dragonHero_Loop/dragon_hero").set(true).duration(1500).action("animation").loop(true).binary(255).setSkeletonLayer();
dir.setDelay(1000);
usr.text("#fn???? ExtraBold##fs35##e過去被指名為屠龍者的公爵。").speed(50).time(2240).local(7).posY(-30).lineSpace(4).enter(3).leave(300).textType(300).showTextEffect();
dir.setDelay(2740);
usr.text("#fn???? ExtraBold##fs35##e最後瞄準了刀刃．．．沒料到卻徒勞無功。").speed(50).time(3200).local(7).posY(-30).lineSpace(4).enter(3).leave(300).textType(300).showTextEffect();
dir.setDelay(3700);
dir.setDelay(1000);
eff.key("02").uol("Effect/GuildCastle.img/effect/spine/2/dragonHeroBenedict_Loop/dragon_hero").set(true).duration(2000).action("animation").loop(true).binary(255).setSkeletonLayer();
usr.text("#fn???? ExtraBold##fs35##e繼承其遺志的潘奈迪特之劍也被折斷。").speed(50).time(3600).local(7).posY(-30).lineSpace(4).enter(3).leave(300).textType(300).showTextEffect();
dir.setDelay(4100);
eff.key("01").type(1).duration(500).offSkeletonLayer();
dir.setDelay(2000);
eff.key("03").uol("Effect/GuildCastle.img/effect/spine/5/sword/sword").set(true).duration(500).action("animation").loop(true).binary(255).setSkeletonLayer();
dir.setDelay(1500);
eff.uol("Sound/PL_Sound.img/GuildCastle/direction/sword3").volume(100).playSoundEffect();
dir.setDelay(500);
eff.key("02").type(1).duration(1000).offSkeletonLayer();
dir.setDelay(4000);
eff.key("03").type(1).duration(500).offSkeletonLayer();
dir.setDelay(2000);
eff.key("01").delay(100).rx(50).ry(350).uol("Effect/particle/GuildCastle_EnergyStone_1_1").postRender(true).location(-1).setFieldWeather();
eff.key("02").delay(100).rx(50).ry(400).uol("Effect/particle/GuildCastle_EnergyStone_1_2").postRender(true).location(-1).setFieldWeather();
eff.key("03").rx(50).ry(350).uol("Effect/particle/GuildCastle_EnergyStone_1_3").postRender(true).location(-1).setFieldWeather();
dir.setDelay(1500);
npc.id(9401593).ui(1).noEsc().next().say("#face0#請…幫…幫…….我");
npc.id(9401593).ui(1).noEsc().next().say("#face0#不管是誰……\r\n如果聽到聲音的話……….");
dir.setDelay(1000);
eff.blind(true).binary(255).setLayerBlind();
dir.setDelay(1000);
eff.duration(2000).setLayerBlind();
dir.setDelay(1000);
eff.type(1).key("01").delay(1000).setFieldWeather();
eff.type(1).key("02").delay(1000).setFieldWeather();
eff.type(1).key("03").delay(1000).setFieldWeather();
npc.id(9401606).ui(1).noEsc().next().say("#face0#快把手臂繞在我的肩膀上。\r\n現在…不管什麼城堡了！拜託你放棄吧！ ");
eff.term(2000).key("10").setLayerOff();
dir.setDelay(1000);
stage.setNpcSpecialAction(entity_1, "blackOut", -1, false);
eff.uol("Sound/PL_Sound.img/GuildCastle/direction/falldown").volume(100).playSoundEffect();
dir.setDelay(500);
npc.id(9401606).ui(1).noEsc().next().say("#face0##fs20##e爸爸！！！#n");
dir.setDelay(500);
stage.setNpcFadeHide(entity_2, 0, 1000);
stage.setNpcFadeHide(entity_1, 0, 1000);
dir.setDelay(1200);
stage.setNpcForceFlip(entity_2, 1);
stage.setNpcSpecialAction(entity_2, "special4", -1, false);
stage.setNpcFadeHide(entity_2, 255, 800);
dir.setDelay(1900);
eff.blind(true).binary(255).duration(1500).setLayerBlind();
dir.setDelay(2000);
eff.key("04").uol("Effect/GuildCastle.img/effect/spine/3/jackWeep/jack_weep").set(true).duration(2000).action("animation").loop(true).binary(255).setSkeletonLayer();
dir.setDelay(5000);
eff.key("04").type(1).duration(2000).offSkeletonLayer();
dir.setDelay(3000);
eff.blind(true).binary(255).duration(2000).setLayerBlind();
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
// [LP_SetFieldUnknownEffect] [00 00 00 00 ]
// [LP_FieldUnknownValue] [4B 00 00 00 ]
stage.changeMap(870001014, 0);