// Created by MetaMS
// ID:[450013100]
// MapName:黑暗神殿

let event = stage.getEvent("boss_blackmage_hard");
if (event != null) {
        switch (map.getId()) {
                case 450013100:
                        if (event.getVariable("boss1") == null) {
                                event.setVariable("boss1", false);
                                let spiritMob = map.makeMob(8880505);
                                map.spawnMob(spiritMob, 0, 85);

                                let wBoss = map.makeMob(8880500);
                                wBoss.setSpiritEntityId(spiritMob.getEntityId());
                                map.spawnMob(wBoss, -350, 85);

                                let bBoss = map.makeMob(8880501);
                                bBoss.setSpiritEntityId(spiritMob.getEntityId());
                                bBoss.setFlip();
                                map.spawnMob(bBoss, 350, 85);

                                map.spawnMob(8880512, 5, 85);
                                map.startEvent();
                        }
                        break;
                case 450013300:
                        if (event.getVariable("boss2") == null) {
                                event.setVariable("boss2", false);
                                map.spawnMob(8880502, 0, 88);
                                map.spawnMob(8880516, -5, 88);
                                map.spawnMob(8880512, 5, 88);
                                map.startEvent();
                        }
                        break;
                case 450013500:
                        if (event.getVariable("boss3") == null) {
                                event.setVariable("boss3", false);
                                map.spawnMob(8880503, -52, 88);
                                map.spawnMob(8880512, 0, 88);
                                map.startEvent();
                        }
                        break;
                case 450013700:
                        if (event.getVariable("boss4") == null) {
                                event.setVariable("boss4", false);
                                let spiritMob = map.makeMob(8880519);
                                map.spawnMob(spiritMob, 0, 218);

                                let boss = map.makeMob(8880504);
                                boss.setSpiritEntityId(spiritMob.getEntityId());
                                map.spawnMob(boss, 0, 218);
                                map.spawnMob(8880512, 0, 218);
                                map.startEvent();
                        }
                        break;
                case 450013750:
                        if (event.getVariable("boss5") == null) {
                                event.setVariable("boss5", false);
                                map.spawnMob(8880518, 0, 218);
                                map.startEvent();
                        }
                        break;
        }
}