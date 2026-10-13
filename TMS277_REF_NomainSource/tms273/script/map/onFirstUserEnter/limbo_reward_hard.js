// Created by MetaMS
// ID:[410009800]
// MapName:解放之樹頂端

let event = stage.getEvent("boss_limbo_hard");
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        map.spawnMob(8881384, 347, 753);
}