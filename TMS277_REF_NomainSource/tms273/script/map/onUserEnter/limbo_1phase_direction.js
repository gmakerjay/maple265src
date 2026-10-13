// Created by MetaMS
// ID:[410009000]
// MapName:重現的真理的空間

stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();
dir.setInGameCurNodeEventEnd(true);
eff.uol("Mob/BossPattern/BossEnterAni.img/limbo/1phase/skeleton.skel").value(9001).set(true).key("animation").x(-2).y(-273).z(255).setSkeletonSpine();
dir.setDelay(300);
eff.uol("Sound/Etc.img/Limbo1PhaseEnterEff").volume(100).playSoundEffect();
dir.setDelay(1000);
eff.uol("Sound/Etc.img/Limbo1PhaseEnter0").volume(100).playSoundEffect();
dir.setDelay(5000);
eff.uol("Sound/Etc.img/Limbo1PhaseEnter1").volume(100).playSoundEffect();
dir.setDelay(3000);
eff.uol("Sound/Etc.img/Limbo1PhaseEnter2").volume(100).playSoundEffect();
dir.setDelay(5000);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.changeMap(map.getId() + 100, 0);

function chatEnd() {
        dir.setSkipDirection();
        eff.key("skip").uol("UI/UIWindow8.img/DirectionSkip/effect/transition").duration(100).term(-1).action("cc").loop(true).ry(1).value(255).sub("cc").setIllustrationLayer();
        dir.setDelay(1500);
        dir.setFadeDelay(700);
        dir.block().setInGameDirectionMode();
        stage.changeMap(map.getId() + 100, 0);
}