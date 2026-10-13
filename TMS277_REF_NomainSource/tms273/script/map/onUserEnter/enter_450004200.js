// Created by MetaMS
// ID:[450004500]
// MapName:惡夢時間塔

stage.setFadeChange();
stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).r(240).g(240).b(240).setLayerBlind();
dir.setDelay(500);
dir.uol("Map/Effect3.img/BossLucid/Lucid5").x(89).y(36).overlay(true).overlayX(1).npc(true).notOrigin(true).setEffectPlay();
npc.id(3003250).ui(1).noEsc().next().nextDelay(3000).say("#face6#唉唷， 這是怎樣？ 看來夢境落空了～！");
eff.duration(1500).setLayerBlind();
eff.uol("Sound/SoundEff.img/ArcaneRiver/phase2").volume(200).playSoundEffect();
dir.uol("Map/Effect3.img/BossLucid/Lucid2").x(89).y(36).overlay(true).overlayX(10).npc(true).notOrigin(true).setEffectPlay();
dir.uol("Map/Effect3.img/BossLucid/Lucid3").x(-140).y(100).overlay(true).overlayX(11).npc(true).notOrigin(true).setEffectPlay();
dir.uol("Map/Effect3.img/BossLucid/Lucid4").x(89).y(36).overlay(true).overlayX(1).npc(true).notOrigin(true).setEffectPlay();
dir.setDelay(2000);
eff.blind(true).binary(255).r(240).g(240).b(240).duration(1300).setLayerBlind();
dir.setDelay(1600);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
let diff = 50;
if (map.getId() == 450003880) {
        diff = 40;
}
stage.changeMap(map.getId() + diff, 10);

function chatEnd() {
        dir.setSkipDirection();
        eff.key("skip").uol("UI/UIWindow8.img/DirectionSkip/effect/transition").duration(100).term(-1).action("cc").loop(true).ry(1).value(255).sub("cc").setIllustrationLayer();
        dir.setDelay(1500);
        dir.block().setInGameDirectionMode();
        let diff = 50;
        if (map.getId() == 450003880) {
                diff = 40;
        }
        stage.changeMap(map.getId() + diff, 10);
}
