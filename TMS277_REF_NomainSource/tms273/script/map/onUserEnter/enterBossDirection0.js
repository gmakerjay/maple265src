// Created by MetaMS
// ID:[863000900]
// MapName:培羅德的頭

stage.resetForcedStat();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().block().setInGameDirectionMode();
dir.uol("Effect/Direction13.img/effect/giantBoss/teleport/0").duration(3200).y(189).setEffectPlay();
dir.setForcedInput(0);
let entity_1 = stage.spawnTempNpc(9390121, 295, 153, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
//stage.setSessionValue("giantBossStr", "45540199");
dir.setDelay(4200);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/1").duration(1500).y(-120).setEffectPlay();
dir.setDelay(1500);
eff.delay(1000).value(30).showTrembleEffect();
dir.uol("Effect/Direction4.img/effect/cannonshooter/User/2").duration(2000).y(-120).overlay(true).setEffectPlay();
dir.setDelay(3000);
eff.delay(1000).value(30).showTrembleEffect();
dir.setDelay(2000);
dir.pixel(400).x(694).y(153).setCameraMove();
dir.setDelay(1124);
dir.setDelay(1624);
dir.setDelay(2000);
stage.setNpcSpecialAction(entity_1, "stand", 0, false);
dir.back(true).pixel(500).setCameraMove();
dir.setDelay(2298);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/3").duration(1500).y(-150).setEffectPlay();
dir.setDelay(2000);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/4").duration(1500).x(200).y(-300).setEffectPlay();
dir.setDelay(2000);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/5").duration(1500).x(200).y(-300).setEffectPlay();
eff.delay(2000).value(30).showTrembleEffect();
dir.setDelay(1600);
stage.setNpcSpecialAction(entity_1, "attack0", 0, false);
eff.delay(1600).value(30).showTrembleEffect();
eff.uol("GiantVellud/Boom").volume(100).playSoundEffect();
dir.setDelay(1600);
dir.setForcedInput(5);
dir.setDelay(1000);
stage.startQuest(17554, "1");//Quest Name:Unknown
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.destroyTempNpc(entity_1);
stage.changeMap(863000910, 0);