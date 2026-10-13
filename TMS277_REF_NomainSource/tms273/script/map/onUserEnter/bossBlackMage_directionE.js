// Created by MetaMS
// ID:[450013000]
// MapName:黑暗神殿

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

if (map.getId() == 450013900) {
        eff.uol("Effect/Direction20.img/bossBlackMage/start_spine/blasck_space").action("animation").useKey(true).key("intro").setSpineScreen();
        eff.uol("Sound/SoundEff.img/BM3/boss_start").volume(200).playSoundEffect();
        dir.setDelay(5000);
        eff.term(1000).key("BlackOut").z(13).uol("Map/Effect2.img/BlackOut").location(4).removeAfter(-1).setLayerOn();
        dir.setDelay(1000);
        eff.key("intro").type(100).offSpineScreen();
        eff.term(100).key("BlackOut").setLayerOff();
        dir.setFadeDelay(700);
        //stage.setTemporarySkillSet(0);
        dir.block().setInGameDirectionMode();
        stage.changeMap(450013910, 0);
} else if (map.getId() == 450013920) {
        eff.uol("Effect/Direction20.img/bossBlackMage/start2_spine/skeleton").action("animation").useKey(true).key("intro").setSpineScreen();
        eff.uol("Sound/SoundEff.img/BM3/boss_start2").volume(200).playSoundEffect();
        dir.setDelay(5000);
        eff.term(1000).key("BlackOut").z(13).uol("Map/Effect2.img/BlackOut").location(4).removeAfter(-1).setLayerOn();
        dir.setDelay(1000);
        eff.key("intro").type(100).offSpineScreen();
        eff.term(100).key("BlackOut").setLayerOff();
        dir.setFadeDelay(700);
        //stage.setTemporarySkillSet(0);
        dir.block().setInGameDirectionMode();
        stage.changeMap(450013930, 0);
} else if (map.getId() == 450013940) {
        eff.uol("Effect/Direction20.img/bossBlackMage/space/blasck_space").action("animation").useKey(true).key("intro").setSpineScreen();
        eff.uol("Sound/SoundEff.img/BM3/boss_start3").volume(200).playSoundEffect();
        dir.setDelay(5000);
        eff.term(1000).key("BlackOut").z(13).uol("Map/Effect2.img/BlackOut").location(4).removeAfter(-1).setLayerOn();
        dir.setDelay(1000);
        eff.key("intro").type(100).offSpineScreen();
        eff.term(100).key("BlackOut").setLayerOff();
        dir.setFadeDelay(700);
        //stage.setTemporarySkillSet(0);
        dir.block().setInGameDirectionMode();
        stage.changeMap(450013950, 0);
} else if (map.getId() == 450013960) {
        eff.uol("Effect/Direction20.img/bossBlackMage/start4_spine/black_Phase_3_4").action("animation").useKey(true).key("intro").setSpineScreen();
        eff.uol("Sound/SoundEff.img/BM3/boss_start4").volume(200).playSoundEffect();
        dir.setDelay(5000);
        eff.term(1000).key("BlackOut").z(13).uol("Map/Effect2.img/BlackOut").location(4).removeAfter(-1).setLayerOn();
        dir.setDelay(1000);
        eff.key("intro").type(100).offSpineScreen();
        eff.term(100).key("BlackOut").setLayerOff();
        dir.setFadeDelay(700);
        //stage.setTemporarySkillSet(0);
        dir.block().setInGameDirectionMode();
        stage.changeMap(450013970, 0);
}

function chatEnd() {
        dir.setSkipDirection();
        eff.key("skip").uol("UI/UIWindow8.img/DirectionSkip/effect/transition").duration(100).term(-1).action("cc").loop(true).ry(1).value(255).sub("cc").setIllustrationLayer();
        dir.setDelay(1500);
        dir.block().setInGameDirectionMode();
        if (map.getId() == 450013900) {
                stage.changeMap(450013910, 0);
        } else if (map.getId() == 450013920) {
                stage.changeMap(450013930, 0);
        } else if (map.getId() == 450013940) {
                stage.changeMap(450013950, 0);
        } else if (map.getId() == 450013960) {
                stage.changeMap(450013970, 0);
        }
}