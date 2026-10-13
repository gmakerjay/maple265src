// Created by MetaMS
// ID:[350160240]
// MapName:深潭洞穴 混沌
//深潭洞穴 混沌

let event = stage.getEvent("boss_bellum_normal");
if (event != null && event.getVariable("boss") == null) {
        event.setVariable("boss", true);
        let boss = map.makeMob(8930100);
        boss.setFlip();
        map.spawnMob(boss, -190, 443);
        map.blowWeather(5120103, "你這傢伙無視我的警告又來了，我不會再憐憫你了。", 3);
}