// Created by MetaMS
// ID:[863010300]
// MapName:培羅德西邊懸崖下段

let type = map.getId() % 1000
eff.uol("giantBoss/enter/" + parseInt(type / 10)).delay(-1).showScreenAutoLetterBox();
eff.delay(5000).value(30).showTrembleEffect();