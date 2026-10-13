// Created by MetaMS
// MapName:武陵道場

let dojang = require("dojang_spawn");

dojang.spawnBoss(map);
let ss = map.getId() - 925070000;
eff.uol("Dojang/start").volume(100).playSoundEffect();
eff.uol("dojang/start/stage").delay(-1).showScreenAutoLetterBox();
eff.uol("dojang/start/number/" + parseInt(ss / 100)).delay(-1).showScreenAutoLetterBox();