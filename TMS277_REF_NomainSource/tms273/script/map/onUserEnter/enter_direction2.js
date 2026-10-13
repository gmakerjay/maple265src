// Created by MetaMS
// ID:[350160140]
// MapName:世界樹頂端
// 世界樹頂端

stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();
eff.uol("Bgm00.img/Silence").changeBGM();
dir.setDelay(100);
eff.uol("Map/Effect2.img/DemianIllust/2pahseSp/003").action("animation").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/SoundEff.img/BM3/boss_start").volume(200).playSoundEffect();
dir.setDelay(12500);
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