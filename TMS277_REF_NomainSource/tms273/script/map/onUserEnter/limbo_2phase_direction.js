// Created by MetaMS
// ID:[410009300]
// MapName:重現的邪念的空間


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();
dir.setInGameCurNodeEventEnd(true);
eff.key("intro").uol("Mob/BossPattern/BossEnterAni.img/limbo/2phase").location(4).removeAfter(-1).duration(1).addon(true).setLayerOn();
dir.setDelay(300);
eff.uol("Sound/Etc.img/Limbo2PhaseEnterEff").volume(100).playSoundEffect();
dir.setDelay(1000);
eff.uol("Sound/Etc.img/Limbo2PhaseEnter0").volume(100).playSoundEffect();
dir.setDelay(5000);
eff.uol("Sound/Etc.img/Limbo2PhaseEnter1").volume(100).playSoundEffect();
dir.setDelay(5000);
dir.setDelay(6000);
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