// Created by MetaMS
// ID:[450013100]
// MapName:黑暗神殿

let event = stage.getEvent("boss_blackmage_extreme");
if (event != null) {
        switch (map.getId()) {
                case 450013910:
                        if (event.getVariable("boss1") == null) {
                                event.setVariable("boss1", false);
                                let spiritMob = map.makeMob(8880535);
                                map.spawnMob(spiritMob, 0, 85);//main dummy boss

                                let wBoss = map.makeMob(8880530);
                                wBoss.setSpiritEntityId(spiritMob.getEntityId());
                                map.spawnMob(wBoss, -350, 85);

                                let bBoss = map.makeMob(8880531);
                                bBoss.setSpiritEntityId(spiritMob.getEntityId());
                                bBoss.setFlip();
                                map.spawnMob(bBoss, 350, 85);

                                map.spawnMob(8880542, 5, 85);
                                map.startEvent();
                        }
                        break;
                case 450013930:
                        if (event.getVariable("boss2") == null) {
                                event.setVariable("boss2", false);
                                map.spawnMob(8880532, 0, 88);
                                map.spawnMob(8880546, -5, 88);
                                map.spawnMob(8880542, 5, 88);
                                map.startEvent();
                        }
                        break;
                case 450013950:
                        if (event.getVariable("boss3") == null) {
                                event.setVariable("boss3", false);
                                map.spawnMob(8880533, -52, 88);
                                map.spawnMob(8880542, 0, 88);
                                map.startEvent();
                        }
                        break;
                case 450013970:
                        if (event.getVariable("boss4") == null) {
                                event.setVariable("boss4", false);
                                let spiritMob = map.makeMob(8880549);
                                map.spawnMob(spiritMob, 0, 218);

                                let boss = map.makeMob(8880534);
                                boss.setSpiritEntityId(spiritMob.getEntityId());
                                map.spawnMob(boss, 0, 218);
                                map.spawnMob(8880542, 0, 218);
                                map.startEvent();
                        }
                        break;
                case 450013980:
                        if (event.getVariable("boss5") == null) {
                                event.setVariable("boss5", false);
                                map.spawnMob(8880548, 0, 218);
                                map.startEvent();
                        }
                        break;
        }
}