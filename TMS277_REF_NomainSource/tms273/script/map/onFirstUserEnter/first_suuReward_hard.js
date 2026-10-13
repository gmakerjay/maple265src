// Created by MetaMS
// Boss: Suu

let event = stage.getEvent("boss_suu_hard");
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        map.spawnMob(8881153, 27, 498);//main boss

        map.startEvent();
}