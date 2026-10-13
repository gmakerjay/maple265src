// Created by MetaMS
// ID:[410006040]
// MapName:激戰的摩天塔

dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
eff.blind(true).binary(255).setLayerBlind();
dir.setInGameCurNodeEventEnd(true);
eff.postRender(true).uol("Effect/Direction20.img/bossKalos/2phase_spine/skeleton").action("animation").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/SoundEff.img/kalos/2phase").volume(200).playSoundEffect();
dir.setDelay(5000);
eff.key("intro").type(100).offSpineScreen();
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.changeMap(410006060, 0);