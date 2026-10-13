// Created by MetaMS
// ID:[350067200]
// MapName:N/A


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();

dir.setInGameCurNodeEventEnd(true);

eff.uol("Mob/BossPattern/BossEnterAni.img/suu/2phase/skeleton.skel").value(9001).set(true).key("2phase").z(255).setSkeletonSpine();
eff.uol("Sound/Etc.img/Suu2PhaseEnterEff").volume(100).playSoundEffect();
dir.setDelay(2700);
eff.uol("Sound/Etc.img/Suu2PhaseEnter0").volume(100).playSoundEffect();
dir.setDelay(9300);
eff.uol("Sound/Etc.img/Suu2PhaseEnter1").volume(100).playSoundEffect();
dir.setDelay(6000);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.setFadeChange();
stage.changeMap(map.getId() + 100, 0);

function chatEnd() {
        dir.setSkipDirection();
        eff.key("skip").uol("UI/UIWindow8.img/DirectionSkip/effect/transition").duration(100).term(-1).action("cc").loop(true).ry(1).value(255).sub("cc").setIllustrationLayer();
        dir.setDelay(1500);
        dir.block().setInGameDirectionMode();
        stage.changeMap(map.getId() + 100, 0);
}