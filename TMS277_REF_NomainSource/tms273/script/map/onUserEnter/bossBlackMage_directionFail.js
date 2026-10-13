// Created by MetaMS
// ID:[450013780]
// MapName:巨人的心臟

dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.setVansheeMode(true);
dir.setDelay(100);
eff.blind(true).binary(255).setLayerBlind();
eff.uol("Bgm00.img/Silence").changeBGM();
dir.setDelay(100);
eff.postRender(true).uol("Effect/Direction20.img/bossBlackMage/fail_spine/black").action("animation").useKey(true).key("intro").setSpineScreen();
eff.uol("Sound/Etc.img/BlackMageFailSpine").volume(200).playSoundEffect();
dir.setDelay(4500);
eff.term(1000).key("BlackOut").z(13).uol("Map/Effect2.img/BlackOut").location(4).postRender(true).removeAfter(-1).setLayerOn();
dir.setDelay(300);
eff.key("intro").type(100).offSpineScreen();
eff.term(100).key("BlackOut").setLayerOff();
dir.setVansheeMode(false);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.closeUI(1204);
stage.changeMap(450012500, 1);