// Created by MetaMS
// ID:[450004250]
// MapName:惡夢時間塔


let eventName;
switch (map.getId()) {
        case 450003920:
                eventName = "boss_lucid_easy";
                break;
        case 450004250:
                eventName = "boss_lucid_normal";
                break;
        case 450004550:
                eventName = "boss_lucid_hard";
                break;
        case 450004850://dir
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        switch (map.getId()) {
                case 450003920:
                        map.spawnMob(8880155, 711, -490);
                        map.spawnMob(8880175, 900, -331);
                        map.spawnMob(8880178, 900, -331);
                        map.spawnMob(8880179, 900, -331);
                        map.startEvent();
                        break;
                case 450004250:
                        map.spawnMob(8880150, 711, -490);
                        map.spawnMob(8880175, 900, -331);
                        map.spawnMob(8880178, 900, -331);
                        map.spawnMob(8880179, 900, -331);
                        map.startEvent();
                        break;
                case 450004550:
                        map.spawnMob(8880151, 711, -490);
                        map.spawnMob(8880175, 900, -331);
                        map.spawnMob(8880178, 900, -331);
                        map.spawnMob(8880179, 900, -331);
                        map.startEvent();
                        break;
                case 450004850:

                        break;
        }
}