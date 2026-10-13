// Created by MetaMS
// ID:[410006000]
// MapName:卡羅泰摩天塔

stage.resetForcedStat();
/* Update Quest RecordEx | Id:38250 | Name: Unknown | Data: "eNum=1;Record=1;lastDate=23/09/05;cool=23/07/25/23/05" */
//stage.updateQuestRecordEx(38250, "eNum=1;Record=1;lastDate=23/09/05;cool=23/07/25/23/05");
/* Update Quest RecordEx | Id:38250 | Name: Unknown | Data: "eNum=1;Record=1;lastDate=23/09/05;cool=23/09/05/02/07" */
//stage.updateQuestRecordEx(38250, "eNum=1;Record=1;lastDate=23/09/05;cool=23/09/05/02/07");
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
eff.blind(true).binary(255).setLayerBlind();
dir.setInGameCurNodeEventEnd(true);
eff.postRender(true).uol("Effect/Direction20.img/bossKalos/1phase_spine/skeleton").action("animation").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/SoundEff.img/kalos/1phase").volume(200).playSoundEffect();
dir.setDelay(7000);
eff.key("intro").type(100).offSpineScreen();
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.changeMap(410006020, 0);