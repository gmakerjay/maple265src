// Created by MetaMS
// ID:[410007200]
// MapName:失去色彩的秋天

stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
eff.blind(true).binary(255).setLayerBlind();
dir.setInGameCurNodeEventEnd(true);
eff.postRender(true).uol("Effect/Direction20.img/bossKaring/1phase_hondon_spine/skeleton").action("animation").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/SoundEff.img/karing/hondon").volume(200).playSoundEffect();
dir.setDelay(8100);
eff.key("intro").type(100).offSpineScreen();
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.changeMap(map.getId() + 20, 0);