// Created by MetaMS
// ID:[350066000]
// MapName:N/A


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().block().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
dir.setVansheeMode(true);
dir.setDelay(2000);
eff.key("intro").uol("Mob/BossPattern/BossEnterAni.img/suu/1phase").location(4).removeAfter(-1).duration(1).addon(true).setLayerOn();
dir.setDelay(1320);
eff.uol("Sound/Etc.img/Suu1PhaseEnter0").volume(100).playSoundEffect();
dir.setDelay(300);
eff.uol("Sound/Etc.img/Suu1PhaseEnterEff").volume(100).playSoundEffect();
dir.setDelay(5000);
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