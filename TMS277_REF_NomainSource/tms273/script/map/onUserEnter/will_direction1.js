// Created by MetaMS
// ID:[450008100]
// MapName:回折的迴廊

stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();
dir.setInGameCurNodeEventEnd(true);
eff.uol("Effect/Direction20.img/bossWill/intro_spine/skeleton").action("1").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/SoundEff.img/esfera/boss/intro1").volume(200).playSoundEffect();
dir.setDelay(5500);
eff.term(1000).key("BlackOut").z(13).uol("Map/Effect2.img/BlackOut").location(4).removeAfter(-1).setLayerOn();
dir.setDelay(1000);
eff.key("intro").type(100).offSpineScreen();
eff.term(100).key("BlackOut").setLayerOff();
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.changeMap(map.getId() + 50, 4);

function chatEnd() {
        dir.setSkipDirection();
        eff.key("skip").uol("UI/UIWindow8.img/DirectionSkip/effect/transition").duration(100).term(-1).action("cc").loop(true).ry(1).value(255).sub("cc").setIllustrationLayer();
        dir.setDelay(1500);
        dir.block().setInGameDirectionMode();
        stage.changeMap(map.getId() + 50, 4);
}