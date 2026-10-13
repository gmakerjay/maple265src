// Created by MetaMS
// Boss: Suu

let event = stage.getEvent("boss_suu_normal");
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        map.spawnMob(8881103, 27, 498);//main boss

        map.startEvent();
}