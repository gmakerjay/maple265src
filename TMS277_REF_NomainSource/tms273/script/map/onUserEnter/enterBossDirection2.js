// Created by MetaMS
// ID:[863000910]
// MapName:None


stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
eff.delay(800).value(30).showTrembleEffect();
eff.uol("GiantVellud/Boom").volume(100).playSoundEffect();
dir.setDelay(1200);
eff.delay(800).value(30).showTrembleEffect();
eff.uol("GiantVellud/Boom").volume(100).playSoundEffect();
dir.setDelay(800);
eff.delay(1200).value(30).showTrembleEffect();
eff.uol("GiantVellud/Boom").volume(100).playSoundEffect();
dir.setDelay(1600);
dir.setFadeDelay(700);
dir.block().setInGameDirectionMode();
stage.changeMap(863010100, 0);