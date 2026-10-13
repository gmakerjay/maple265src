// Created by MetaMS
// ID:[450010900]
// MapName:慾望祭壇

stage.resetForcedStat();
// [LP_JinHillFieldEffect] [03 00 00 00 05 00 00 00 00 00 00 00 01 00 00 00 00 01 00 00 00 00 01 00 00 00 00 01 00 00 00 00 01 ]
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
if (party == null || stage.getCharacterId() == party.getLeaderId()) {
        stage.setSkipGameDirection();
}
eff.blind(true).binary(255).setLayerBlind();
eff.uol("Bgm00.img/Silence").changeBGM();
dir.setDelay(100);
eff.uol("Effect/Direction20.img/effect/BM2_hillahAppear_spine/hillah").action("animation").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/SoundEff.img/BM2/hillahappear").volume(200).playSoundEffect();
dir.setDelay(13000);
eff.term(1000).key("BlackOut").z(13).uol("Map/Effect2.img/BlackOut").location(4).removeAfter(-1).setLayerOn();
dir.setDelay(1000);
eff.key("intro").type(100).offSpineScreen();
eff.term(100).key("BlackOut").setLayerOff();
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
if (map.getId() == 450010900) {
        stage.changeMap(450010930, 0);
} else if (map.getId() == 450010400) {
        stage.changeMap(450010500, 0);
}

function chatEnd() {
        dir.setSkipDirection();
        eff.key("skip").uol("UI/UIWindow8.img/DirectionSkip/effect/transition").duration(100).term(-1).action("cc").loop(true).ry(1).value(255).sub("cc").setIllustrationLayer();
        dir.setDelay(1500);
        dir.block().setInGameDirectionMode();
        if (map.getId() == 450010900) {
                stage.changeMap(450010930, 0);
        } else if (map.getId() == 450010400) {
                stage.changeMap(450010500, 0);
        }

}