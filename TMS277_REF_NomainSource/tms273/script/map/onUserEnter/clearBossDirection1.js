// Created by MetaMS
// ID:[863000920]
// MapName:培羅德的頭

stage.resetForcedStat();
stage.startQuest(17450, util.getStringDate("yy/MM/dd"));//Quest Name:Unknown
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
let entity_1 = stage.spawnTempNpc(9390125, 5, 38, 1);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
eff.delay(800).value(30).showTrembleEffect();
dir.setDelay(1200);
eff.delay(800).value(30).showTrembleEffect();
dir.setDelay(800);
eff.delay(1200).value(30).showTrembleEffect();
dir.setDelay(1600);
let entity_2 = stage.spawnTempNpc(9390124, 12, -240, 1);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
dir.setDelay(1500);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/6").duration(1500).x(300).y(-120).setEffectPlay();
dir.setDelay(1700);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/7").duration(1500).y(-120).setEffectPlay();
dir.setDelay(1700);
eff.delay(800).value(30).showTrembleEffect();
dir.setDelay(1200);
eff.delay(800).value(30).showTrembleEffect();
dir.setDelay(800);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/8").duration(1500).x(300).y(-220).setEffectPlay();
dir.setDelay(1700);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/9").duration(1500).x(300).y(-220).setEffectPlay();
dir.setDelay(1700);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/10").duration(1500).x(300).y(-220).setEffectPlay();
dir.setDelay(1700);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/11").duration(1500).x(300).y(-220).setEffectPlay();
dir.setDelay(1700);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/12").duration(1500).x(300).y(-220).setEffectPlay();
dir.setDelay(1700);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/13").duration(1500).x(300).y(-220).setEffectPlay();
dir.setDelay(1700);
dir.uol("Effect/Direction13.img/effect/giantBoss/balloonMsg/14").duration(1500).x(300).y(-220).setEffectPlay();
dir.setDelay(1700);
eff.delay(800).value(30).showTrembleEffect();
dir.setDelay(1200);
eff.delay(800).value(30).showTrembleEffect();
dir.setDelay(800);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.changeMap(863010700, 0);