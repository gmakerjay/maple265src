// Created by MetaMS
// ID:[450004400]
// MapName:惡夢時間塔

stage.setFadeChange();
stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();
eff.blind(true).uol("Map/Effect3.img/BossLucid/Lucid/lusi").action("animation").setSpineScreen();
eff.uol("Sound/SoundEff.img/ArcaneRiver/lucid_spine").volume(200).playSoundEffect();
dir.setDelay(9000);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
let diff = 50;
if (map.getId() == 450003800) {
        diff = 40;
}
stage.changeMap(map.getId() + diff, 6);


function chatEnd() {
        dir.setSkipDirection();
        eff.key("skip").uol("UI/UIWindow8.img/DirectionSkip/effect/transition").duration(100).term(-1).action("cc").loop(true).ry(1).value(255).sub("cc").setIllustrationLayer();
        dir.setDelay(1500);
        dir.block().setInGameDirectionMode();
        let diff = 50;
        if (map.getId() == 450003800) {
                diff = 40;
        }
        stage.changeMap(map.getId() + diff, 6);
}
