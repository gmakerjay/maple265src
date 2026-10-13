// Created by MetaMS
// ID:[867168300]
// MapName:動態視力修煉場


// [LP_InPartyEventResult] [01 ]
// [LP_UserCreateGun] []
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.setVansheeMode(true);

stage.resetForcedStat();

/* Update Quest RecordEx | Id:504629 | Name: Unknown | Data: "date=241113;enter=1;R=0;clear=0" */
stage.updateQuestRecordEx(504629, "enter", "1");
stage.setMapTaggedObjectVisible("stage1", false, 0, 0);
stage.setMapTaggedObjectVisible("stage2", false, 0, 0);
eff.uol("Map/Effect.img/annual_shooting/Shooting_Inside_Back_start/04_Shooting_Inside_Back_start.skel").value(1001).set(true).key("animation2(bigin)").z(255).setSkeletonSpine();
eff.uol("Map/Effect.img/annual_shooting/Shooting_Inside_Stage_start/04_Shooting_Inside_Stage_start.skel").value(1002).set(true).key("animation2(bigin)").z(255).setSkeletonSpine();
eff.uol("Map/Effect.img/annual_shooting/Shooting_Inside_Near/04_Shooting_Inside_Near.skel").value(1003).set(true).key("animation2(bigin)").z(255).setSkeletonSpine();
dir.setInGameCurNodeEventEnd(true);
stage.updateQuestRecordEx(504629, "kill", "0");