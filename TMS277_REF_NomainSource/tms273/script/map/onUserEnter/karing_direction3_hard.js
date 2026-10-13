// Created by MetaMS
// ID:[410007280]
// MapName:環繞死亡的四季

stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();
dir.setInGameCurNodeEventEnd(true);
eff.uol("Effect/Direction20.img/bossKaring/3phase_spine/skeleton").action("animation").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/SoundEff.img/karing/3phase").volume(200).playSoundEffect();
dir.setDelay(8200);
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