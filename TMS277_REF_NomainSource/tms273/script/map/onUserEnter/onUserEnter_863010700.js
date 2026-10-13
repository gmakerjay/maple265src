// Created by MetaMS
// ID:[863010700]
// MapName:培羅德的心臟

let event = stage.getEvent("boss_beidler_normal");
if (event != null) {
        let core = event.getVariable("Core");
        stage.showScriptProgressMsg("擊退難度  : " + core);
        eff.uol("giantBoss/enter/70").delay(-1).showScreenAutoLetterBox();
        eff.delay(5000).value(30).showTrembleEffect();
        npc.id(9390124).say("從這裡進入培羅德的心臟來淨化他吧。時間所剩不多，如果沒在時間內完成的話，就什麼也沒有改變了。");
}