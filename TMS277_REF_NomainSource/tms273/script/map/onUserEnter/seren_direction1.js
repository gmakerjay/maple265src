// Created by MetaMS
// ID:[410002100]
// MapName:王宮大廳

/* Update Quest RecordEx | Id:39932 | Name: Unknown | Data: "eNum=0;eNumE=0;lastDateE=23/09/05;eNumN=1;Record=1;lastDateN=23/09/05;lastDate=23/09/05" */
//stage.updateQuestRecordEx(39932, "eNum=0;eNumE=0;lastDateE=23/09/05;eNumN=1;Record=1;lastDateN=23/09/05;lastDate=23/09/05");
/* Update Quest RecordEx | Id:39932 | Name: Unknown | Data: "eNum=0;eNumE=0;lastDateE=23/09/05;eNumN=1;Record=1;lastDateN=23/09/05;lastDate=23/09/05;cool=23/09/05/02/06" */
//stage.updateQuestRecordEx(39932, "eNum=0;eNumE=0;lastDateE=23/09/05;eNumN=1;Record=1;lastDateN=23/09/05;lastDate=23/09/05;cool=23/09/05/02/06");
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();
dir.setInGameCurNodeEventEnd(true);
eff.uol("Effect/Direction20.img/bossSeren/1pahse_spine/skeleton").action("animation").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/SoundEff.img/seren/1phase").volume(200).playSoundEffect();
dir.setDelay(11500);
eff.key("intro").type(100).offSpineScreen();
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.changeMap(map.getId() + 20, 0);

function chatEnd() {
        dir.setSkipDirection();
        eff.key("skip").uol("UI/UIWindow8.img/DirectionSkip/effect/transition").duration(100).term(-1).action("cc").loop(true).ry(1).value(255).sub("cc").setIllustrationLayer();
        dir.setDelay(1500);
        dir.block().setInGameDirectionMode();
        stage.changeMap(map.getId() + 20, 0);
}