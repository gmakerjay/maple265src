// Created by MetaMS
// ID:[876000100]
// MapName:大本木商场最高层

let event = stage.getEvent("boss_aufheben");
if (event != null) {
        if (map.getId() == 876000200) {
                event.startTimer("Start_Stage1_Event", 3000);
                let boss = map.makeMob(9601838);
                boss.setForcedMobStat(party.getAverageLevel())
                //boss.changeBaseHp(300000000000);
                map.spawnMob(boss, 109, 307);
        } else if (map.getId() == 876000400) {
                event.startTimer("Start_Stage2_Event", 3000);
                let boss = map.makeMob(9601839);
                boss.setForcedMobStat(party.getAverageLevel())
                //boss.changeBaseHp(300000000000);
                map.spawnMob(boss, 109, 307);
        } else if (map.getId() == 876000600) {
                event.startTimer("Start_Stage3_Event", 3000);
                let boss = map.makeMob(9601840);
                boss.setForcedMobStat(party.getAverageLevel())
                //boss.changeBaseHp(300000000000);
                map.spawnMob(boss, 109, 307);
        } else if (map.getId() == 876000800) {
                event.startTimer("Start_Stage4_Event", 3000);
                let boss = map.makeMob(9601841);
                boss.setForcedMobStat(party.getAverageLevel())
                //boss.changeBaseHp(300000000000);
                map.spawnMob(boss, 109, 307);
        } else if (map.getId() == 876001000) {
                event.startTimer("Start_Stage5_Event", 3000);
                let boss = map.makeMob(9601842);
                boss.setForcedMobStat(party.getAverageLevel())
                //boss.changeBaseHp(300000000000);
                map.spawnMob(boss, 109, 307);
        }
}